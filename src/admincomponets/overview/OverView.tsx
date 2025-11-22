"use client";

import { CardProps } from "../reusable/Card";
import { PieChartProps } from "../reusable";
import { LineChartProps } from "./LineChart";

import { CardComponent } from "../reusable/Card";
import { PieChart } from "../reusable/PieChart";
import { LineChart } from "./LineChart";
import { Briefcase, CircleDollarSign, UserRoundCheck, Users } from "lucide-react";

export const OverView = () => {
  // -----------------------------
  //  CARD DATA (Top - 4 Cards)
  // -----------------------------
  const cardData: CardProps[] = [
    { title: "Total Users", total: 1540, icon: Users },
    { title: "Total Landscaper", total: 320, icon: Users },
    { title: "Total Client", total: 45000, icon: Users },
    { title: "Active subscription", total: 78, icon: Users},
  ];

  // -----------------------------
  //  PIE CHART DATA
  // -----------------------------
  const pieChartData: PieChartProps = {
    heading: "Category Distribution",
    data: [
      { label: "Pro", value: 65 },
      { label: "Basic", value: 35 },
    ],
    color: [
      { label: "Pro", hex: "#3B82F6" },
      { label: "Basic", hex: "#F97316" },
    ],
  };

  // -----------------------------
  //  LINE CHART DATA (Monthly)
  // -----------------------------
  const lineChartData: LineChartProps = {
    data: [
      { label: "Jan", value: 40 },
      { label: "Feb", value: 60 },
      { label: "Mar", value: 30 },
      { label: "Apr", value: 80 },
      { label: "May", value: 55 },
      { label: "Jun", value: 70 },
    ],
    selectData: [
      { label: "2024", value: "2024" },
      { label: "2025", value: "2025" },
    ],
  };

  // -----------------------------
  //  Extra 2 Cards beside Pie Chart
  // -----------------------------
  const sideCardData: CardProps[] = [
    { title: <span className="text-2xl">Active Jobs Today</span>, total: 240, icon: Briefcase },
    { title: <span className="text-2xl">Platform Fee collected</span>, total: 35, icon: CircleDollarSign },
  ];

  // -----------------------------
  // Bottom Card
  // -----------------------------
  const bottomCard: CardProps = {
    title: "Daily Average Active User",
    total: 92,
    icon: UserRoundCheck,
  };

  return (
    <div className="flex flex-col space-y-3.5 py-16 md:px-6 px-2">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((item, i) => (
          <CardComponent key={i} {...item} />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between gap-2">
        {/* LineChart */}
        <div className="w-full lg:w-1/2">
          <LineChart data={lineChartData.data} selectData={lineChartData.selectData} />
        </div>

        <div className="w-full flex flex-col gap-2 lg:w-1/2">
          <div className="flex flex-col w-full md:flex-row md:items-stretch gap-2">
            {/* PieChart */}
            <div className="md:w-1/2 w-full">
              <PieChart
                heading={pieChartData.heading}
                data={pieChartData.data}
                color={pieChartData.color}
              />
            </div>

            {/* Extra 2 Cards */}
            <div className="flex flex-col w-full md:w-1/2 gap-2 ">
              {sideCardData.map((item, i) => (
                <CardComponent key={i} {...item} />
              ))}
            </div>
          </div>

          {/* Bottom single card */}
          <CardComponent {...bottomCard} />
        </div>
      </div>
    </div>
  );
};


// "use client";

// import { CardProps } from "../reusable/Card";
// import { PieChartProps } from "../reusable";
// import { LineChartProps } from "./LineChart";

// import { CardComponent } from "../reusable/Card";
// import { PieChart } from "../reusable/PieChart";
// import { LineChart } from "./LineChart";
// import {
//   Briefcase,
//   CircleDollarSign,
//   UserRoundCheck,
//   Users,
// } from "lucide-react";

// export const OverView = () => {
//   // -----------------------------
//   //  CARD DATA (Top - 4 Cards)
//   // -----------------------------
//   const cardData: CardProps[] = [
//     { title: "Total Users", total: 1540, icon: Users },
//     { title: "Total Landscaper", total: 320, icon: Users },
//     { title: "Total Client", total: 45000, icon: Users },
//     { title: "Active subscription", total: 78, icon: Users },
//   ];

//   // -----------------------------
//   //  PIE CHART DATA
//   // -----------------------------
//   const pieChartData: PieChartProps = {
//     heading: "Category Distribution",
//     data: [
//       { label: "Electronics", value: 45 },
//       { label: "Fashion", value: 30 },
//       { label: "Grocery", value: 25 },
//     ],
//     color: [
//       { label: "Electronics", hex: "#3B82F6" },
//       { label: "Fashion", hex: "#F97316" },
//       { label: "Grocery", hex: "#10B981" },
//     ],
//   };

//   // -----------------------------
//   //  LINE CHART DATA (Monthly)
//   // -----------------------------
//   const lineChartData: LineChartProps = {
//     data: [
//       { label: "Jan", value: 40 },
//       { label: "Feb", value: 60 },
//       { label: "Mar", value: 30 },
//       { label: "Apr", value: 80 },
//       { label: "May", value: 55 },
//       { label: "Jun", value: 70 },
//     ],
//     selectData: [
//       { label: "2024", value: "2024" },
//       { label: "2025", value: "2025" },
//     ],
//   };

//   // -----------------------------
//   //  Extra 2 Cards beside Pie Chart
//   // -----------------------------
//   const sideCardData: CardProps[] = [
//     { title: "Active Jobs Today", total: 240, icon: Briefcase },
//     { title: "Platform Fee collected", total: 35, icon: CircleDollarSign },
//   ];

//   // -----------------------------
//   // Bottom Card
//   // -----------------------------
//   const bottomCard: CardProps = {
//     title: "Daily Average Active User",
//     total: 92,
//     icon: UserRoundCheck,
//   };

//   return (
//     <div className="grid grid-cols-4 grid-rows-5 gap-4">
//       {/* 1–4 → Top Cards */}
//       <div>
//         <CardComponent {...cardData[0]} />
//       </div>
//       <div>
//         <CardComponent {...cardData[1]} />
//       </div>
//       <div>
//         <CardComponent {...cardData[2]} />
//       </div>
//       <div>
//         <CardComponent {...cardData[3]} />
//       </div>

//       {/* 5 → LineChart (Large Block) */}
//       <div className="col-span-2 row-span-3 row-start-2">
//         <LineChart
//           data={lineChartData.data}
//           selectData={lineChartData.selectData}
//         />
//       </div>

//       {/* 6 → PieChart */}
//       <div className="row-span-2 col-start-3 row-start-2">
//         <PieChart
//           heading={pieChartData.heading}
//           data={pieChartData.data}
//           color={pieChartData.color}
//         />
//       </div>

//       {/* 7 → Side card 1 */}
//       <div className="col-start-4 row-start-2">
//         <CardComponent {...sideCardData[0]} />
//       </div>

//       {/* 8 → Side card 2 */}
//       <div className="col-start-4 row-start-3">
//         <CardComponent {...sideCardData[1]} />
//       </div>

//       {/* 9 → Bottom wide card */}
//       <div className="col-span-2 col-start-3 row-start-4">
//         <CardComponent {...bottomCard} />
//       </div>
//     </div>
//   );
// };
