"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export interface LineChartData {
  label: string;
  value: number;
}
export interface LineChartProps {
  data: LineChartData[];
  selectData: { label: string; value: string }[];
}

export const LineChart = ({ data, selectData }: LineChartProps) => {
  return (
    <Card className="w-full h-full p-4">
      {/* Top: Heading + Select */}
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>

        <Select>
          <SelectTrigger
            className="w-32 rounded-lg h-9 text-white"
            style={{ backgroundColor: "#81BDFFCC" }} // primary bg
          >
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

      {/* Middle Chart */}
      <CardContent className="h-full">
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <ReLineChart data={data}>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={true}
              />
            </ReLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
