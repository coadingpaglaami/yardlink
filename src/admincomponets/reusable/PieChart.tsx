"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface PieChartData {
  label: string;
  value: number;
}
export interface PieChartProps {
  heading: string;
  data: PieChartData[];
  color: { label: string; hex: string }[];
}

export const PieChart = ({ data, heading, color }: PieChartProps) => {
  return (
    <Card className="w-full p-4">
      {/* Heading */}
      <CardHeader className="pb-6">
        <CardTitle className="text-lg font-semibold">{heading}</CardTitle>
      </CardHeader>

      {/* Chart */}
      <CardContent>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={55} // DONUT CENTER
                outerRadius={90}
                
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={color[index]?.hex || "#000"} />
                ))}
              </Pie>

              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        {/* Color Legend */}
        <div className="flex flex-wrap gap-4 mt-6">
          {color.map((c, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: c.hex }}
              ></span>
              <span className="text-sm">{c.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
