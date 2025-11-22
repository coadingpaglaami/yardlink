"use client";

import { CircleDollarSign, Trash, Search } from "lucide-react";
import { BarChart, BarChartProps, CardComponent } from "../reusable";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Pagination } from "../reusable/Pagination";

interface PaymentData {
  id: string;
  name: string;
  email: string;
  transactionId: string;
  amount: number;
  time: string;
}

const demoPayments: PaymentData[] = Array.from({ length: 200 }).map((_, i) => ({
  id: `#${12543 + i}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  transactionId: `#TR${12543 + i}`,
  amount: Math.floor(Math.random() * 1000) + 100,
  time: `2025/11/${(i % 30) + 1} ${10 + (i % 12)}:30`,
}));

export const Payments = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPayments = useMemo(
    () =>
      demoPayments.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.email.toLowerCase().includes(search.toLowerCase()) ||
          p.id.includes(search) ||
          p.transactionId.includes(search)
      ),
    [search]
  );

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const pageData = filteredPayments.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const barChartProps: BarChartProps = {
    heading: "Stripe Income Overview",
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

  return (
    <div className="grid grid-cols-2 h-[calc(100vh-80px)] gap-4 py-16 md:px-6 px-2">
      {/* Bar Chart */}
      <div className="row-span-2">
        <BarChart
          heading={barChartProps.heading}
          data={barChartProps.data}
          selectData={barChartProps.selectData}
        />
      </div>

      {/* Cards */}
      <div>
        <CardComponent
          icon={CircleDollarSign}
          title="Total Transaction"
          total={87524}
        />
      </div>
      <div className="col-start-2 row-start-2">
        <CardComponent
          icon={CircleDollarSign}
          title="Total Transaction"
          total={75461}
        />
      </div>

      {/* Search */}
      <div className="col-span-2 row-start-3">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10"
          />
        </div>
      </div>

      {/* Payments Table */}
   <div className="col-span-2 row-start-4 border rounded-md shadow-sm flex flex-col">
  {/* Table Header */}
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  </div>

  {/* Table Body - Scrollable */}
  <div className="overflow-auto max-h-36">
    <Table>
      <TableBody>
        {pageData.map((p, idx) => (
          <TableRow key={p.id}>
            <TableCell>{(page - 1) * itemsPerPage + idx + 1}</TableCell>
            <TableCell>{p.id}</TableCell>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.email}</TableCell>
            <TableCell>{p.transactionId}</TableCell>
            <TableCell>${p.amount.toFixed(2)}</TableCell>
            <TableCell>{p.time}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>

  {/* Pagination - stays visible */}
 
    <Pagination
      totalPages={totalPages}
      page={page}
      onChange={(newPage) => setPage(newPage)}
    />
</div>
    </div>
  );
};
