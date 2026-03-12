"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface DashboardChartDataItem {
  name: string;
  görüntülenme: number;
  beğeni: number;
}

interface DashboardChartProps {
  blogViews: number;
  blogLikes: number;
  projectViews: number;
  projectLikes: number;
}

export function DashboardChart({
  blogViews,
  blogLikes,
  projectViews,
  projectLikes,
}: DashboardChartProps) {
  const data: DashboardChartDataItem[] = [
    { name: "Blog", görüntülenme: blogViews, beğeni: blogLikes },
    { name: "Proje", görüntülenme: projectViews, beğeni: projectLikes },
  ];

  return (
    <div className="h-[280px] min-h-[200px] w-full" style={{ color: "var(--color-text-primary)" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : String(v))}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              color: "var(--color-text-primary)",
            }}
            labelStyle={{ color: "var(--color-text-secondary)" }}
            formatter={(value) => [typeof value === "number" ? value.toLocaleString("tr-TR") : String(value ?? ""), ""]}
            labelFormatter={(label) => label}
          />
          <Legend
            wrapperStyle={{ fontSize: 12 }}
            formatter={(value) => (
              <span style={{ color: "var(--color-text-secondary)" }}>{value}</span>
            )}
          />
          <Bar
            dataKey="görüntülenme"
            fill="var(--color-primary)"
            radius={[4, 4, 0, 0]}
            name="Görüntülenme"
          />
          <Bar
            dataKey="beğeni"
            fill="var(--color-accent)"
            radius={[4, 4, 0, 0]}
            name="Beğeni"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
