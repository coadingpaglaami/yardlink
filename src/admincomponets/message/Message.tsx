"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, Filter, Mail, Search, Trash } from "lucide-react";
import { Pagination } from "../reusable/Pagination";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MessageData {
  name: string;
  email: string;
  message: string;
  category: "All" | "General" | "Report";
  date: string;
  status: "New" | "Read" | "Replied";
}

const demoMessages: MessageData[] = Array.from({ length: 120 }).map((_, i) => ({
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
  category: i % 2 === 0 ? "General" : "Report",
  date: `2025/11/${(i % 30) + 1}`,
  status: i % 3 === 0 ? "New" : i % 3 === 1 ? "Read" : "Replied",
}));

export const Message = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "General" | "Report">("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedMessage, setSelectedMessage] = useState<MessageData | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ index: number } | null>(null);
  const [notificationDialog, setNotificationDialog] = useState(false);

  const filteredMessages = useMemo(() => {
    return demoMessages.filter(
      (m) =>
        (filter === "All" || m.category === filter) &&
        (m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, filter]);

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const pageData = filteredMessages.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const newCount = demoMessages.filter((m) => m.status === "New").length;

  return (
    <div className="flex flex-col gap-6 py-16 md:px-6 px-2">
      {/* Top controls */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 items-start md:items-center">
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <Input
              placeholder="Search by name or email"
              className="pl-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2 px-3 py-2">
                <span className="text-sm font-medium">Filter By</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              {(["All", "General", "Report"] as const).map((f) => (
                <DropdownMenuItem
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    setPage(1);
                  }}
                >
                  {f}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Dialog open={notificationDialog} onOpenChange={setNotificationDialog}>
          <DialogTrigger>
            <Button className="flex items-center gap-2 justify-center p-3 rounded-lg text-black/50 hover:bg-[#03771C40] bg-[#03771C40]">
              <Bell /> Push Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <DialogHeader>
              <DialogTitle>Push Notification</DialogTitle>
            </DialogHeader>
            <div className="flex gap-4 justify-end">
              <Select defaultValue="Client">
                <SelectTrigger className="w-fit">Client</SelectTrigger>
                <SelectContent>
                  <SelectItem value="Client">Client</SelectItem>
                  <SelectItem value="Landscaper">Landscaper</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notification Text</Label>
              <Input placeholder="Enter message" />
            </div>
            <div className="flex justify-center">
              <Button>Send</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}

        <div className="text-sm font-medium p-2 border border-green-300 rounded-lg">You have {newCount} New Messages</div>
   

      {/* Shadcn Table */}
      <div className="overflow-x-auto">
          <div className="flex items-center gap-3">
 <Mail /> Message ({demoMessages.length})
          </div>
         
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((m, idx) => (
              <TableRow key={idx}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell className="line-clamp-2">{m.message}</TableCell>
                <TableCell className={m.category === "General" ? "text-green-600 font-medium" : "text-orange-500 font-medium"}>
                  {m.category}
                </TableCell>
                <TableCell>{m.date}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-lg font-medium ${
                      m.status === "New"
                        ? "bg-yellow-100 text-yellow-800"
                        : m.status === "Read"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {m.status}
                  </span>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedMessage(m)}>
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteDialog({ index: idx })}>
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination totalPages={totalPages} page={page} onChange={(p) => setPage(p)} />

      {/* Message Dialog */}
      {selectedMessage && (
        <Dialog open onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="space-y-4">
            <DialogHeader>
              <DialogTitle>Message from {selectedMessage.name}</DialogTitle>
            </DialogHeader>
            <div className="flex justify-between">
              <div>
                <div className="text-sm font-medium">From</div>
                <div>{selectedMessage.name}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Date</div>
                <div>{selectedMessage.date}</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Email</div>
              <div>{selectedMessage.email}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Message</div>
              <div className="border rounded-lg p-2">{selectedMessage.message}</div>
            </div>
            <div className="space-y-2">
              <Label>Reply</Label>
              <Input placeholder="Type your reply..." className="border-green-500" />
            </div>
            <div className="flex justify-center">
              <Button>Send</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Dialog */}
      {deleteDialog && (
        <Dialog open onOpenChange={() => setDeleteDialog(null)}>
          <DialogContent className="space-y-4">
            <DialogHeader>
              <DialogTitle>Delete Message?</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setDeleteDialog(null)}>
                Cancel
              </Button>
              <Button onClick={() => setDeleteDialog(null)}>Delete</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
