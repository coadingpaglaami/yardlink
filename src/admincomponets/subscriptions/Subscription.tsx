// "use client";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { DialogTrigger } from "@radix-ui/react-dialog";
// import { ClockFading, Filter, Plus, Search } from "lucide-react";
// import { useState } from "react";
// import { ManagePlan } from "./ManagePlan";
// import { AddPlan } from "./AddPlan";

// const data = [
//   { title: "Total Subscriptions", total: 2540 },
//   { title: "Pro Plans", total: 890 },
//   { title: "Basic Plans", total: 1650 },
//   { title: "Expired", total: 120 },
//   { title: "Monthly Revenue", total: 48464 },
// ];

// interface subscriptionItem {
//   id: string; // format #12543
//   name: string; // demo user created
//   subStatus: "Active" | "Expired"; // green text for active red for expired
//   planType: "Pro" | "Basic"; // orangee for pro blue for basic
//   duration: number; // in months
//   price: number; // in USD
//   subscription: Subscripion;
// }

// interface Subscripion {
//   name: string;
//   duration: number;
//   price: number;
//   discount?: number;
//   startDate?: string; // format mm/dd/yyyy
//   endDate?: string; // format mm/dd/yyyy
//   description?: string;
// }

// export const Subscriptions = () => {
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState<"Pro" | "Basic" | "All">("All");
//   const [manageDialog, setManageDialog] = useState(false);
//   const [addPlanDialog, setAddPlanDialog] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   return (
//     <div className="flex flex-col gap-5 py-16 md:px-6 px-2">
//       <div className="flex flex-col md:justify-between md:flex-row gap-2">
//         <div className="flex flex-col md:flex-row gap-3">
//           <div className="relative w-64">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <Input
//               placeholder="Search"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild className=" bg-white text-black/60">
//               <Button className="flex items-center gap-2 px-4 py-2 rounded-md shadow-md">
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M5 12V4M19 20V17M5 20V16M19 13V4M12 7V4M12 20V11"
//                     stroke="black"
//                     strokeLinecap="round"
//                   />
//                   <path
//                     d="M5 16C6.10457 16 7 15.1046 7 14C7 12.8954 6.10457 12 5 12C3.89543 12 3 12.8954 3 14C3 15.1046 3.89543 16 5 16Z"
//                     stroke="black"
//                     strokeLinecap="round"
//                   />
//                   <path
//                     d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
//                     stroke="black"
//                     strokeLinecap="round"
//                   />
//                   <path
//                     d="M19 17C20.1046 17 21 16.1046 21 15C21 13.8954 20.1046 13 19 13C17.8954 13 17 13.8954 17 15C17 16.1046 17.8954 17 19 17Z"
//                     stroke="black"
//                     strokeLinecap="round"
//                   />
//                 </svg>

//                 <span className="text-sm font-medium">Filter By</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-32">
//               {(["Pro", "Basic", "All"] as const).map((status, index, arr) => (
//                 <DropdownMenuItem
//                   key={status}
//                   onClick={() => {
//                     setFilter(status);
//                     setCurrentPage(1);
//                   }}
//                   className={index === arr.length - 1 ? "border-b" : ""}
//                 >
//                   {status}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//         <div className="flex flex-col gap-3 md:flex-row">
//           <Dialog open={manageDialog} onOpenChange={setManageDialog}>
//             <DialogTrigger>
//               <Button variant={"dark_green"}>
//                 Manage Plan <ClockFading className="w-4 h-4 ml-2" />
//               </Button>
//               <DialogContent>
//                 {/* Manage Plan Content Here */}
//                 <ManagePlan />
//               </DialogContent>
//             </DialogTrigger>
//           </Dialog>
//           <Dialog open={addPlanDialog} onOpenChange={setAddPlanDialog}>
//             <DialogTrigger>
//               <Button>
//                 Add Plan <Plus className="w-4 h-4 ml-2" />
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               {/* Manage Plan Content Here */}
//               <AddPlan />
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
//         {data.map((item, index) => (
//           <div
//             className="flex flex-col items-center justify-between border border-gray-400 rounded-lg p-4"
//             key={index}
//           >
//             <span className="text-lg font-medium">{item.title}</span>
//             <span className="text-2xl font-bold">{item.total}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker"; // adjust if your repo uses a different name
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ChevronLeft, ChevronRight, Plus, Pause, Play, Trash, Clock } from "lucide-react";

/* --------------------
   Types / Interfaces
   -------------------- */

export interface Subscription {
  name: string;
  duration: number; // months
  price: number;
  discount?: number;
  startDate?: string; // mm/dd/yyyy
  endDate?: string; // mm/dd/yyyy
  description?: string;
}

interface SubscriptionItem {
  id: string; // format #12543
  name: string;
  subStatus: "Active" | "Expired";
  planType: "Pro" | "Basic";
  duration: number;
  price: number;
  subscription: Subscription;
  startDate: string;
  endDate: string;
  isPaused: boolean;
  email: string;
  avatarColorIndex?: number;
}

/* --------------------
   Demo data generation (85 items)
   -------------------- */
const generateSubscriptions = (n = 85): SubscriptionItem[] => {
  const plans: Subscription[] = [
    { name: "Pro 6m", duration: 6, price: 60, discount: 5, description: "Pro plan 6 months" },
    { name: "Pro 12m", duration: 12, price: 100, discount: 10, description: "Pro plan yearly" },
    { name: "Basic 3m", duration: 3, price: 30, description: "Basic 3 months" },
    { name: "Basic 1m", duration: 1, price: 12, description: "Monthly Basic" },
  ];

  return Array.from({ length: n }).map((_, i) => {
    const plan = plans[i % plans.length];
    const start = new Date();
    start.setMonth(start.getMonth() - (i % 6));
    const end = new Date(start);
    end.setMonth(end.getMonth() + plan.duration);

    const fmt = (d: Date) =>
      `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}`;

    return {
      id: `#${12543 + i}`,
      name: `Demo User ${i + 1}`,
      email: `demo${i + 1}@example.com`,
      subStatus: i % 10 === 0 ? "Expired" : "Active",
      planType: i % 2 === 0 ? "Pro" : "Basic",
      duration: plan.duration,
      price: plan.price,
      subscription: plan,
      startDate: fmt(start),
      endDate: fmt(end),
      isPaused: i % 7 === 0,
      avatarColorIndex: i % 6,
    };
  });
};

const demoSubscriptions = generateSubscriptions(85);

/* --------------------
   UI helpers
   -------------------- */
const avatarBg = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-indigo-500",
];
export const Subscriptions = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"Pro" | "Basic" | "All">("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [data, setData] = useState<SubscriptionItem[]>(demoSubscriptions);

  // dialogs state
  const [addPlanOpen, setAddPlanOpen] = useState(false);
  const [managePlanOpen, setManagePlanOpen] = useState(false);

  const [extendDialog, setExtendDialog] = useState<{ index: number } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ type: "pause" | "delete"; index: number } | null>(null);

  // plans state (for Manage/Add)
  const [plans, setPlans] = useState<Subscription[]>(
    Array.from(new Set(data.map((d) => d.subscription.name))).map((name) => {
      const d = data.find((x) => x.subscription.name === name)!;
      return { ...d.subscription };
    })
  );

  // memo filtered
  const filtered = useMemo(() => {
    return data.filter(
      (d) =>
        (filter === "All" || d.planType === filter) &&
        (d.name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase()))
    );
  }, [data, filter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const pageData = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  /* ---- Add plan handler ---- */
  const handleAddPlan = (plan: Subscription) => {
    setPlans((p) => [plan, ...p]);
  };

  const handleRemovePlans = (selected: Subscription[]) => {
    setPlans((p) => p.filter((pl) => !selected.includes(pl)));
  };

  /* ---- Extend / Pause / Delete handlers ---- */
  const handleExtend = (indexOnPage: number, payload: { start?: string; end?: string; duration?: number; price?: number }) => {
    const globalIndex = (page - 1) * itemsPerPage + indexOnPage;
    setData((prev) => {
      const copy = [...prev];
      const item = copy[globalIndex];
      if (!item) return prev;
      item.startDate = payload.start ?? item.startDate;
      item.endDate = payload.end ?? item.endDate;
      item.duration = payload.duration ?? item.duration;
      item.price = payload.price ?? item.price;
      copy[globalIndex] = { ...item };
      return copy;
    });
    setExtendDialog(null);
  };

  const handlePauseToggle = (indexOnPage: number) => {
    const globalIndex = (page - 1) * itemsPerPage + indexOnPage;
    setData((prev) => {
      const copy = [...prev];
      copy[globalIndex] = { ...copy[globalIndex], isPaused: !copy[globalIndex].isPaused };
      return copy;
    });
    setConfirmDialog(null);
  };

  const handleDelete = (indexOnPage: number) => {
    const globalIndex = (page - 1) * itemsPerPage + indexOnPage;
    setData((prev) => prev.filter((_, i) => i !== globalIndex));
    setConfirmDialog(null);
  };

  /* ---- Render ---- */
  return (
    <div className="flex flex-col gap-6 py-16 md:px-6 px-2">
      {/* Top controls */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 items-start md:items-center">
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input className="pl-10" placeholder="Search by name or email" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2 px-3 py-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">{filter}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              {(["Pro", "Basic", "All"] as const).map((s, i, arr) => (
                <DropdownMenuItem
                  key={s}
                  onClick={() => {
                    setFilter(s);
                    setPage(1);
                  }}
                  className={i === arr.length - 1 ? "border-b" : ""}
                >
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3">
          <Dialog open={managePlanOpen} onOpenChange={setManagePlanOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Manage Plans
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage Plans</DialogTitle>
              </DialogHeader>
              <ManagePlanDialog plans={plans} onRemove={handleRemovePlans} onClose={() => setManagePlanOpen(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={addPlanOpen} onOpenChange={setAddPlanOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Plan
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Plan</DialogTitle>
              </DialogHeader>

              <AddPlanDialog onAdd={handleAddPlan} onClose={() => setAddPlanOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {[
          { title: "Total Subscriptions", total: data.length },
          { title: "Pro Plans", total: data.filter((d) => d.planType === "Pro").length },
          { title: "Basic Plans", total: data.filter((d) => d.planType === "Basic").length },
          { title: "Expired", total: data.filter((d) => d.subStatus === "Expired").length },
          { title: "Monthly Revenue", total: data.reduce((s, d) => s + d.price, 0) },
        ].map((c, i) => (
          <Card key={i} className="border">
            <CardContent className="flex flex-col items-center gap-2 py-6">
              <div className="text-sm font-medium">{c.title}</div>
              <div className="text-2xl font-bold">{c.total}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial</TableHead>
                <TableHead>Update</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Subscription Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Plan Name</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {pageData.map((row, idx) => {
                const serial = (page - 1) * itemsPerPage + idx + 1;
                return (
                  <TableRow key={row.id}>
                    <TableCell>{serial}</TableCell>
                    <TableCell>{serial}</TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${avatarBg[row.avatarColorIndex ?? 0]}`}>
                        {row.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{row.name}</div>
                        <div className="text-sm text-muted-foreground">{row.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={row.subStatus === "Active" ? "success" : "destructive"}>{row.subStatus}</Badge>
                        <Badge variant={row.planType === "Pro" ? "secondary" : "outline"}>{row.planType}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>{row.startDate}</TableCell>
                    <TableCell>{row.endDate}</TableCell>
                    <TableCell>{row.subscription.name}</TableCell>
                    <TableCell className="flex gap-2">
                      {/* Extend */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExtendDialog({ index: idx })}
                      >
                        Extend
                      </Button>

                      {/* Pause/Play */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setConfirmDialog({ type: "pause", index: idx })}
                      >
                        {row.isPaused ? <Play className="w-4 h-4 text-green-500" /> : <Pause className="w-4 h-4 text-yellow-500" />}
                      </Button>

                      {/* Delete */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setConfirmDialog({ type: "delete", index: idx })}
                      >
                        <Trash className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        <Button variant="outline" size="icon" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          <ChevronLeft />
        </Button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          return (
            <Button key={p} variant={p === page ? "default" : "outline"} size="sm" onClick={() => setPage(p)}>
              {p}
            </Button>
          );
        })}

        <Button variant="outline" size="icon" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
          <ChevronRight />
        </Button>
      </div>

      {/* Extend Dialog */}
      {extendDialog && (
        <Dialog open onOpenChange={() => setExtendDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Extend Subscription</DialogTitle>
            </DialogHeader>

            {/* centered user info */}
            <div className="flex flex-col items-center gap-3 py-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${avatarBg[(page - 1) * itemsPerPage + (extendDialog.index) % avatarBg.length]}`}>
                {data[(page - 1) * itemsPerPage + extendDialog.index].name.charAt(0)}
              </div>
              <div className="text-lg font-medium">{data[(page - 1) * itemsPerPage + extendDialog.index].name}</div>
              <div className="text-sm text-muted-foreground">{data[(page - 1) * itemsPerPage + extendDialog.index].email} • {data[(page - 1) * itemsPerPage + extendDialog.index].planType}</div>
            </div>

            {/* disabled inputs with labels */}
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Start Date</Label>
                  <Input value={data[(page - 1) * itemsPerPage + extendDialog.index].startDate} disabled />
                </div>
                <div className="flex-1">
                  <Label>End Date</Label>
                  <Input value={data[(page - 1) * itemsPerPage + extendDialog.index].endDate} disabled />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Duration (months)</Label>
                  <Input value={String(data[(page - 1) * itemsPerPage + extendDialog.index].duration)} disabled />
                </div>
                <div className="flex-1">
                  <Label>Price (USD)</Label>
                  <Input value={String(data[(page - 1) * itemsPerPage + extendDialog.index].price)} disabled />
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <Button variant="outline" onClick={() => setExtendDialog(null)}>Cancel</Button>
                <Button onClick={() => {
                  // example: extend by one month
                  const idxGlobal = (page - 1) * itemsPerPage + extendDialog.index;
                  const item = data[idxGlobal];
                  const newEnd = new Date(item.endDate);
                  newEnd.setMonth(newEnd.getMonth() + 1);
                  const fmt = (d: Date) => `${String(d.getMonth() + 1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")}/${d.getFullYear()}`;
                  handleExtend(extendDialog.index, { end: fmt(newEnd), duration: item.duration + 1 });
                }}>Extend</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirm Dialog (Pause/Delete) */}
      {confirmDialog && (
        <Dialog open onOpenChange={() => setConfirmDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {confirmDialog.type === "pause"
                  ? data[(page - 1) * itemsPerPage + confirmDialog.index].isPaused ? "Play Subscription?" : "Pause Subscription?"
                  : "Delete Subscription?"}
              </DialogTitle>
            </DialogHeader>

            <div className="flex justify-center gap-4 mt-4">
              <Button variant="outline" onClick={() => setConfirmDialog(null)}>Cancel</Button>
              <Button onClick={() => {
                if (confirmDialog.type === "pause") handlePauseToggle(confirmDialog.index);
                else handleDelete(confirmDialog.index);
              }}>
                {confirmDialog.type === "pause" ? (data[(page - 1) * itemsPerPage + confirmDialog.index].isPaused ? "Play" : "Pause") : "Delete"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};