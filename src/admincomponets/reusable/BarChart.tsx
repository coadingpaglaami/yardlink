"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface BarChartData {
  label: string;
  value: number;
}

export interface BarChartProps {
  heading: string;
  data:BarChartData[];
  selectData: { label: string; value: string }[];
}

export const BarChart = ({ heading, data, selectData }: BarChartProps) => {
  return (
    <Card className="w-full p-4">
      {/* Top Header Row */}
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="text-lg font-semibold">{heading}</CardTitle>

        {/* Rounded Full Select */}
        <Select>
          <SelectTrigger className="w-32 rounded-full h-9 bg-primary">
            <SelectValue placeholder="Select" />
          </SelectTrigger>

          <SelectContent>
            {selectData.map((item, i) => (
              <SelectItem key={i} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      {/* Chart Section */}
      <CardContent>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ReBarChart data={data}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="value" radius={[6, 6, 0, 0]} />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
