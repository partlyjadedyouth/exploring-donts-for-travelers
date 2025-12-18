"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DontRow } from "@/lib/aggregate";
import { colorForLabel } from "@/lib/colors";

type Props = {
  rows: DontRow[];
  cityOrder: string[];
  activityOrder: string[];
  reasonOrder: string[];
};

type Node = {
  label: string;
  total: number;
  y0: number;
  y1: number;
};

type Link = {
  sourceY0: number;
  targetY0: number;
  thickness: number;
  color: string;
};

const MIN_NODE_HEIGHT = 10;
const MIN_LINK_THICKNESS = 4;
const BASE_HEIGHT = 440;
const NODE_WIDTH = 96;
const GAP = 10;

const buildNodes = (
  order: string[],
  totals: Record<string, number>,
  scale: number,
) => {
  const nodes: Record<string, Node> = {};
  let y = 0;
  order.forEach((label) => {
    const total = totals[label] || 0;
    if (total === 0) return;
    const height = Math.max(MIN_NODE_HEIGHT, total * scale);
    nodes[label] = { label, total, y0: y, y1: y + height };
    y += height + GAP;
  });
  return { nodes, height: y };
};

const buildLinks = (
  pairs: Record<string, Record<string, number>>,
  fromNodes: Record<string, Node>,
  toNodes: Record<string, Node>,
  scale: number,
  colorBy: (label: string) => string,
): Link[] => {
  const offsetsFrom: Record<string, number> = {};
  const offsetsTo: Record<string, number> = {};
  const links: Link[] = [];

  Object.entries(pairs).forEach(([from, targets]) => {
    const fromNode = fromNodes[from];
    if (!fromNode) return;
    Object.entries(targets).forEach(([to, value]) => {
      const toNode = toNodes[to];
      if (!toNode || value === 0) return;
      const thickness = Math.max(MIN_LINK_THICKNESS, value * scale);
      const fromOffset = offsetsFrom[from] || 0;
      const toOffset = offsetsTo[to] || 0;
      links.push({
        sourceY0: fromNode.y0 + fromOffset + thickness / 2,
        targetY0: toNode.y0 + toOffset + thickness / 2,
        thickness,
        color: colorBy(to),
      });
      offsetsFrom[from] = fromOffset + thickness;
      offsetsTo[to] = toOffset + thickness;
    });
  });

  return links;
};

const formatPct = (value: number, total: number) =>
  total === 0 ? "0%" : `${Math.round((value / total) * 1000) / 10}%`;

export default function AlluvialCityActivityReason({
  rows,
  cityOrder,
  activityOrder,
  reasonOrder,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(720);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setContainerWidth(Math.max(540, Math.round(entry.contentRect.width)));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { nodes, links, viewHeight, total, viewWidth, columnX } =
    useMemo(() => {
      const totals = {
        city: {} as Record<string, number>,
        activity: {} as Record<string, number>,
        reason: {} as Record<string, number>,
      };
      const cityActivity: Record<string, Record<string, number>> = {};
      const activityReason: Record<string, Record<string, number>> = {};

      rows.forEach((row) => {
        totals.city[row.city] = (totals.city[row.city] || 0) + 1;
        totals.activity[row.activityLabel] =
          (totals.activity[row.activityLabel] || 0) + 1;
        totals.reason[row.reasonLabel] =
          (totals.reason[row.reasonLabel] || 0) + 1;

        const ca = cityActivity[row.city] || (cityActivity[row.city] = {});
        ca[row.activityLabel] = (ca[row.activityLabel] || 0) + 1;

        const ar =
          activityReason[row.activityLabel] ||
          (activityReason[row.activityLabel] = {});
        ar[row.reasonLabel] = (ar[row.reasonLabel] || 0) + 1;
      });

      const total = rows.length || 1;
      const scale = BASE_HEIGHT / total;

      const marginX = 24;
      const nodeWidth = NODE_WIDTH;
      const gap = Math.max(
        40,
        (containerWidth - marginX * 2 - nodeWidth * 3) / 2,
      );
      const columnX: [number, number, number] = [
        marginX,
        marginX + nodeWidth + gap,
        marginX + (nodeWidth + gap) * 2,
      ];
      const viewWidth = columnX[2] + nodeWidth + marginX;

      const cityNodes = buildNodes(cityOrder, totals.city, scale).nodes;
      const activityBuild = buildNodes(activityOrder, totals.activity, scale);
      const activityNodes = activityBuild.nodes;
      const reasonBuild = buildNodes(reasonOrder, totals.reason, scale);
      const reasonNodes = reasonBuild.nodes;

      const linksCityActivity = buildLinks(
        cityActivity,
        cityNodes,
        activityNodes,
        scale,
        (label) => colorForLabel(label),
      );
      const linksActivityReason = buildLinks(
        activityReason,
        activityNodes,
        reasonNodes,
        scale,
        (label) => colorForLabel(label),
      );

      const height = Math.max(
        BASE_HEIGHT,
        activityBuild.height,
        reasonBuild.height,
      );

      return {
        total,
        viewHeight: height,
        viewWidth,
        columnX,
        nodes: {
          city: cityNodes,
          activity: activityNodes,
          reason: reasonNodes,
        },
        links: {
          cityActivity: linksCityActivity,
          activityReason: linksActivityReason,
        },
      };
    }, [activityOrder, cityOrder, containerWidth, reasonOrder, rows]);

  if (rows.length === 0) {
    return (
      <div className="rounded-3xl border border-neutral-100 bg-white p-4 text-sm text-neutral-500 shadow-sm">
        No rows for this selection.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="overflow-visible rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm"
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-900">
            Alluvial Diagram
          </p>
          <p className="text-xs text-neutral-500">
            Ribbons follow the current filters.
          </p>
        </div>
      </div>
      <div className="relative overflow-visible">
        <svg
          className="overflow-visible"
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
          role="img"
        >
          <title>Alluvial diagram of city to activity to reason counts</title>
          {[...links.cityActivity, ...links.activityReason].map((link, idx) => {
            const isLeft = idx < links.cityActivity.length;
            const x0 = isLeft
              ? columnX[0] + NODE_WIDTH
              : columnX[1] + NODE_WIDTH;
            const x1 = isLeft ? columnX[1] : columnX[2];
            const y0 = link.sourceY0;
            const y1 = link.targetY0;
            const width = link.thickness;
            const control = Math.max(32, (x1 - x0) / 2);
            const path = `
              M ${x0} ${y0 - width / 2}
              C ${x0 + control} ${y0 - width / 2}, ${x1 - control} ${y1 - width / 2}, ${x1} ${y1 - width / 2}
              L ${x1} ${y1 + width / 2}
              C ${x1 - control} ${y1 + width / 2}, ${x0 + control} ${y0 + width / 2}, ${x0} ${y0 + width / 2}
              Z
            `;
            return (
              <path
                key={`link-${idx}`}
                d={path}
                fill={link.color}
                fillOpacity={0.2}
                stroke={link.color}
                strokeOpacity={0.35}
              />
            );
          })}

          {(["city", "activity", "reason"] as const).map((column, idx) => {
            const x = columnX[idx];
            const columnNodes = nodes[column];
            return Object.values(columnNodes).map((node) => {
              const height = node.y1 - node.y0;
              const labelColor =
                column === "city" ? "#312e81" : colorForLabel(node.label);
              const pct = formatPct(node.total, total);
              return (
                <g key={`${column}-${node.label}`}>
                  <rect
                    x={x}
                    y={node.y0}
                    width={NODE_WIDTH}
                    height={height}
                    rx={12}
                    fill={
                      column === "city"
                        ? "rgba(79,70,229,0.08)"
                        : colorForLabel(node.label) + "1a"
                    }
                    stroke={
                      column === "city"
                        ? "rgba(79,70,229,0.35)"
                        : colorForLabel(node.label)
                    }
                    strokeWidth={1}
                  />
                  <foreignObject
                    x={x}
                    y={node.y0}
                    width={NODE_WIDTH}
                    height={height}
                    className="pointer-events-none"
                  >
                    <div className="flex h-full w-full flex-col items-center justify-center px-2 text-center">
                      <span
                        className="text-[11px] font-semibold leading-tight"
                        style={{ color: labelColor }}
                      >
                        {node.label}
                      </span>
                      <span className="text-[10px] text-neutral-600 leading-tight">
                        {node.total} • {pct}
                      </span>
                    </div>
                  </foreignObject>
                </g>
              );
            });
          })}
        </svg>
      </div>
    </div>
  );
}
