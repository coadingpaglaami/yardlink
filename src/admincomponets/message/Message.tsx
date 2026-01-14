"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, Search, Trash } from "lucide-react";
import { Pagination } from "../reusable/Pagination";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import {
  useAllMessagesQuery,
  useReplyMutation,
  useDeleteMessageMutation,
} from "@/hooks/query"; // ← adjust path to where you put the hooks

import { Message as MessagePreview } from "@/interfaces/message";

export const Message = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedMessage, setSelectedMessage] = useState<MessagePreview | null>(
    null
  );
  const [replyText, setReplyText] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ── Fetch messages ────────────────────────────────────────────────
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useAllMessagesQuery({
    page,
    limit: itemsPerPage,
    search: search.trim() || undefined,
  });

  const messages = response?.results || [];
  const totalCount = response?.count || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  console.log(response);
  const newCount = messages.filter((m) => m.status === "New").length;

  // ── Mutations ─────────────────────────────────────────────────────
  const replyMutation = useReplyMutation();
  const deleteMutation = useDeleteMessageMutation();

  const handleSendReply = () => {
    if (!selectedMessage || !replyText.trim()) return;

    replyMutation.mutate(
      {
        messageId: selectedMessage.id,
        admin_reply: replyText.trim(),
      },
      {
        onSuccess: () => {
          toast.success("Reply sent successfully");
          setReplyText("");
          setSelectedMessage(null);
          refetch();
        },
        onError: () => {
          toast.error("Failed to send reply");
        },
      }
    );
  };

  const handleDelete = () => {
    if (!deleteId) return;

    deleteMutation.mutate(deleteId, {
      onSuccess: () => {
        toast.success("Message deleted successfully");
        setDeleteId(null);
        refetch();
      },
      onError: () => {
        toast.error("Failed to delete message");
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 py-16 md:px-6 px-2">
      {/* Top controls */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 items-start md:items-center">
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name or email"
              className="pl-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* Push Notification Button - placeholder */}
        <Button className="flex items-center gap-2 justify-center p-3 rounded-lg text-black/50 hover:bg-[#03771C40] bg-[#03771C40]">
          <Bell />
          Push Notification
        </Button>
      </div>

      {/* New messages count */}
      <div className="text-sm font-medium p-2 border border-green-300 rounded-lg">
        You have {newCount} New Message{newCount !== 1 ? "s" : ""}
      </div>

      {/* Messages title + table */}
      <div className="overflow-x-auto">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5" />
          <span className="text-lg font-medium">Messages ({totalCount})</span>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  Array(itemsPerPage)
                    .fill(0)
                    .map((_, i) => (
                      <TableRow key={i}>
                        {Array(6)
                          .fill(0)
                          .map((__, j) => (
                            <TableCell key={j}>
                              <Skeleton className="h-6 w-full" />
                            </TableCell>
                          ))}
                      </TableRow>
                    ))
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-red-600"
                    >
                      Failed to load messages
                    </TableCell>
                  </TableRow>
                ) : messages.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-muted-foreground"
                    >
                      No messages found
                    </TableCell>
                  </TableRow>
                ) : (
                  messages.map((msg) => (
                    <TableRow key={msg.id}>
                      <TableCell className="font-medium">{msg.name}</TableCell>
                      <TableCell>{msg.email}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {msg.message}
                      </TableCell>
                      <TableCell>
                        {format(
                          new Date(msg.created_at),
                          "MMM d, yyyy • h:mm a"
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            msg.status === "New" ? "default" : "secondary"
                          }
                          className={
                            msg.status === "New"
                              ? "bg-yellow-500 hover:bg-yellow-500 text-white"
                              : "bg-green-600 hover:bg-green-600"
                          }
                        >
                          {msg.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedMessage(msg)}
                          disabled={replyMutation.isPending}
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(msg.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Pagination */}
      {totalPages > 1 && !isLoading && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}

      {/* View / Reply Dialog */}
      {selectedMessage && (
        <Dialog open onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Message from {selectedMessage.name}</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-6 py-4">
              <div>
                <Label className="text-sm font-medium">From</Label>
                <p>{selectedMessage.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <p>{selectedMessage.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Received</Label>
                <p>{format(new Date(selectedMessage.created_at), "PPPp")}</p>
              </div>
              {selectedMessage.replied_at && (
                <div>
                  <Label className="text-sm font-medium">Replied</Label>
                  <p>{format(new Date(selectedMessage.replied_at), "PPPp")}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Message</Label>
              <div className="border rounded-lg p-4 bg-gray-50 whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Label>Reply</Label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                className="w-full min-h-[120px] border rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={replyMutation.isPending}
              />
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedMessage(null)}
                disabled={replyMutation.isPending}
              >
                Close
              </Button>
              <Button
                onClick={handleSendReply}
                disabled={replyMutation.isPending || !replyText.trim()}
              >
                {replyMutation.isPending ? "Sending..." : "Send Reply"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <Dialog open onOpenChange={() => setDeleteId(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Message?</DialogTitle>
            </DialogHeader>
            <p className="py-4 text-sm text-muted-foreground">
              This action cannot be undone.
            </p>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteId(null)}
                disabled={deleteMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
