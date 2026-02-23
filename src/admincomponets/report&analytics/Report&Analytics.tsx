"use client";

import {
  PieChartProps,
  PieChart,
  BarChartProps,
  CardComponent,
  CardProps,
} from "../reusable";
import { LineChart, LineChartProps } from "../overview/LineChart";
import { BarChart } from "../reusable/BarChart";
import { Briefcase, CircleDollarSign } from "lucide-react";
import { useGetStripePayments, useGetUsersList, usePaymentRatio } from "@/hooks";

export const RepordtAndAnalytics = () => {
  const { data: paymentRatio } = usePaymentRatio();
  const { data: usersList } = useGetUsersList();
  // -----------------------------
  // Top 2 Cards
  // -----------------------------
  const topCards: CardProps[] = [
    {
      title: "Active Jobs Today",
      total: usersList?.summary?.active_jobs || 0,
      icon: Briefcase,
    },
    {
      title: "Platform Fee Collected",
      total: usersList?.summary?.platform_fee_collected || 0,
      icon: CircleDollarSign,
    },
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
    heading: "Active Vs Inactive",
    data: [
      { label: "Active", value: 80 },
      { label: "Inactive", value: 20 },
    ],
    color: [
      { label: "Active", hex: "#3B82F6" },
      { label: "Inactive", hex: "#F97316" },
    ],
  };

  // -----------------------------
  // Pie Chart 2
  // -----------------------------
  const pieChart2: PieChartProps = {
    heading: "Strip Vs Cash",
    data: [
      { label: "Strip", value: paymentRatio?.stripe?.amount || 0 },
      { label: "Cash", value: paymentRatio?.cash?.amount || 0 },
    ],
    color: [
      { label: "Strip", hex: "#F87171" },
      { label: "Cash", hex: "#60A5FA" },
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
