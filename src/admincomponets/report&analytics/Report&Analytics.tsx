"use client";

import {
  PieChartProps,
  PieChart,
  BarChartProps,
  CardComponent,
  CardProps,
} from "../reusable";
import {
  LineChart,
  LineChartProps,
} from "../overview/LineChart";
import { BarChart } from "../reusable/BarChart";
import { Briefcase, CircleDollarSign } from "lucide-react";

export const RepordtAndAnalytics = () => {
  // -----------------------------
  // Top 2 Cards
  // -----------------------------
  const topCards: CardProps[] = [
    { title: "Active Jobs Today", total: 240, icon: Briefcase },
    { title: "Platform Fee Collected", total: 35, icon: CircleDollarSign },
  ];

  // -----------------------------
  // 12-Month Line Chart
  // -----------------------------
  const lineChartData: LineChartProps = {
    data: [
      { label: "Jan", value: 40 },
      { label: "Feb", value: 60 },
      { label: "Mar", value: 50 },
      { label: "Apr", value: 70 },
      { label: "May", value: 65 },
      { label: "Jun", value: 80 },
      { label: "Jul", value: 75 },
      { label: "Aug", value: 90 },
      { label: "Sep", value: 85 },
      { label: "Oct", value: 100 },
      { label: "Nov", value: 95 },
      { label: "Dec", value: 110 },
    ],
    selectData: [
      { label: "2024", value: "2024" },
      { label: "2025", value: "2025" },
    ],
  };

  // -----------------------------
  // 12-Month Bar Chart
  // -----------------------------
  const barChartProps: BarChartProps = {
    heading: "Monthly Orders",
    data: [
      { label: "Jan", value: 120 },
      { label: "Feb", value: 150 },
      { label: "Mar", value: 170 },
      { label: "Apr", value: 140 },
      { label: "May", value: 190 },
      { label: "Jun", value: 210 },
      { label: "Jul", value: 180 },
      { label: "Aug", value: 200 },
      { label: "Sep", value: 220 },
      { label: "Oct", value: 230 },
      { label: "Nov", value: 250 },
      { label: "Dec", value: 270 },
    ],
    selectData: [
      { label: "2024", value: "2024" },
      { label: "2025", value: "2025" },
    ],
  };

  // -----------------------------
  // Pie Chart 1
  // -----------------------------
  const pieChart1: PieChartProps = {
    heading: "Revenue Breakdown",
    data: [
      { label: "Electronics", value: 45 },
      { label: "Fashion", value: 30 },
      { label: "Grocery", value: 25 },
    ],
    color: [
      { label: "Electronics", hex: "#3B82F6" },
      { label: "Fashion", hex: "#F97316" },
      { label: "Grocery", hex: "#10B981" },
    ],
  };

  // -----------------------------
  // Pie Chart 2
  // -----------------------------
  const pieChart2: PieChartProps = {
    heading: "User Types",
    data: [
      { label: "Admin", value: 20 },
      { label: "Client", value: 50 },
      { label: "Landscaper", value: 30 },
    ],
    color: [
      { label: "Admin", hex: "#F87171" },
      { label: "Client", hex: "#60A5FA" },
      { label: "Landscaper", hex: "#34D399" },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-stretch gap-5 py-16 md:px-6 px-2">
      {/* Left Column */}
      <div className="lg:w-1/2 w-full flex flex-col gap-5">
        {/* Top 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topCards.map((card, index) => (
            <CardComponent key={index} {...card} />
          ))}
        </div>

        {/* Line Chart */}
        <div className="h-full">
          <LineChart
            data={lineChartData.data}
            selectData={lineChartData.selectData}
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:w-1/2 w-full flex flex-col gap-5">
        {/* Bar Chart */}
        <div>
          <BarChart
            heading={barChartProps.heading}
            data={barChartProps.data}
            selectData={barChartProps.selectData}
          />
        </div>

        {/* Two Pie Charts */}
        <div className="flex flex-col md:flex-row gap-5 w-full h-full">
          <div className="md:w-1/2 w-full">
            <PieChart
              heading={pieChart1.heading}
              data={pieChart1.data}
              color={pieChart1.color}
            />
          </div>
          <div className="md:w-1/2 w-full">
            <PieChart
              heading={pieChart2.heading}
              data={pieChart2.data}
              color={pieChart2.color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
