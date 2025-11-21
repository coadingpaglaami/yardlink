"use client";

import { useState } from "react";
import {
  Mail as Email,
  Play,
  Pause,
  Trash,
  Filter,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Label } from "@/components/ui/label";

interface LandscaperData {
  profileImage?: string;
  id: string;
  name: string;
  email: string;
  subStatus: "Pro" | "Basic" | "All";
  stripStatus: "Linkend" | "Not Linked";
  lastActive: string;
  isPaused: boolean;
}

// Generate 50+ demo data dynamically
const demoData: LandscaperData[] = Array.from({ length: 55 }).map((_, i) => ({
  profileImage: "",
  id: `#${12543 + i}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  subStatus: i % 3 === 0 ? "Pro" : i % 3 === 1 ? "Basic" : "All",
  stripStatus: i % 2 === 0 ? "Linkend" : "Not Linked",
  lastActive: i % 2 === 0 ? "Today 4:40 pm" : `${i} hours ago`,
  isPaused: i % 4 === 0,
}));

const profileColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
];

export const Landscaper = () => {
  const [messageDialog, setMessageDialog] = useState<null | number>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    type: "pause" | "delete";
    index: number;
  } | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"Pro" | "Basic" | "All">("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = demoData.filter(
    (item) =>
      (filter === "All" || item.subStatus === filter) &&
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-5 py-16 md:px-6 px-2">
      {/* Search + Filter */}
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2 px-4 py-2 rounded-md shadow-md">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">{filter}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            {(["Pro", "Basic", "All"] as const).map((status, index, arr) => (
              <DropdownMenuItem
                key={status}
                onClick={() => {
                  setFilter(status);
                  setCurrentPage(1);
                }}
                className={index === arr.length - 1 ? "border-b" : ""}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <Card className="bg-transparent">
        <CardContent className="overflow-x-auto p-0">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>Serial</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Stripe</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((item, index) => (
                <TableRow key={item.id} className="border-none">
                  <TableCell>
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell>
                    {item.profileImage ? (
                      <Image
                        src={item.profileImage}
                        alt={item.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                          profileColors[index % profileColors.length]
                        }`}
                      >
                        {item.name[0].toUpperCase()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.subStatus}</TableCell>
                  <TableCell
                    className={
                      item.stripStatus === "Linkend"
                        ? "text-blue-500 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {item.stripStatus}
                  </TableCell>
                  <TableCell>{item.lastActive}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMessageDialog(index)}
                    >
                      <Email className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setConfirmDialog({ type: "pause", index })}
                    >
                      {item.isPaused ? (
                        <Play className="w-4 h-4 text-green-500" />
                      ) : (
                        <Pause className="w-4 h-4 text-yellow-500" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setConfirmDialog({ type: "delete", index })
                      }
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <Button
          size="icon"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <ChevronLeft />
        </Button>
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          return (
            <Button
              key={page}
              size="sm"
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          );
        })}
        <Button
          size="icon"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Message Dialog */}
      {messageDialog !== null && (
        <Dialog open onOpenChange={() => setMessageDialog(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-center">Send Message</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <Label htmlFor="subject" className="text-sm font-medium mb-3">
                  Subject
                </Label>
                <Input id="subject" placeholder="Enter subject" />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="message" className="text-sm font-medium mb-3 ">
                  Message
                </Label>
                <Input
                  id="message"
                  placeholder="Enter message"
                  className="h-24 placeholder:items-start"
                />
              </div>
            </div>

            <DialogFooter className="flex justify-center mt-4">
              <Button
                variant={"dark_green"}
                className="block mx-auto"
                onClick={() => setMessageDialog(null)}
              >
                Send
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirm Dialog */}
      {confirmDialog && (
        <Dialog open onOpenChange={() => setConfirmDialog(null)}>
          <DialogContent className="sm:max-w-xs text-center">
            <DialogHeader>
              <DialogTitle className="text-center">
                {confirmDialog.type === "pause"
                  ? demoData[confirmDialog.index].isPaused
                    ? "Play this landscaper?"
                    : "Pause this landscaper?"
                  : "Delete this landscaper?"}
              </DialogTitle>
            </DialogHeader>
            <DialogFooter className="block mx-auto space-x-6 mt-4">
              <Button variant="green" onClick={() => setConfirmDialog(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // handle action
                  setConfirmDialog(null);
                }}
                variant="red"
              >
                {confirmDialog.type === "pause"
                  ? demoData[confirmDialog.index].isPaused
                    ? "Play"
                    : "Pause"
                  : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
