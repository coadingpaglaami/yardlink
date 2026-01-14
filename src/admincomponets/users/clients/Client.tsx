"use client";

import { useState } from "react";
import { Play, Pause, Trash, Search } from "lucide-react";
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
import { Pagination } from "@/admincomponets/reusable/Pagination";
import { GetUsersParams } from "@/interfaces/user";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  usePauseUserMutation,
} from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";

const profileColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
];

export const Client = () => {
  const [confirmDialog, setConfirmDialog] = useState<{
    type: "pause" | "delete";
    index: number;
  } | null>(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const params: GetUsersParams = {
    role: "client",
    search: search || undefined,
  };

  const {
    data: apiData,
    isLoading,
    isError,
    refetch,
  } = useGetUsersQuery(params);

  const deleteUserMutation = useDeleteUserMutation();

  const handleConfirmDelete = (userId: number) => {
    if (!confirmDialog || confirmDialog.type !== "delete") return;

    deleteUserMutation.mutate(userId, {
      onSuccess: () => {
        refetch(); // refresh list
        setConfirmDialog(null); // close dialog
      },
      onError: (error) => {
        console.error("Delete failed:", error);
      },
    });
  };

  const { mutate: pauseUserMutate } = usePauseUserMutation();

  const handlePauseUser = (userId: number, is_active: boolean) => {
    if (!confirmDialog || confirmDialog.type !== "pause") return;
    pauseUserMutate(
      { userId, action: is_active ? "pause" : "unpause" },
      {
        onSuccess: () => {
          refetch(); // refresh list
          setConfirmDialog(null); // close dialog
        },
        onError: (error) => {
          console.error("Pause/Activate failed:", error);
        },
      }
    );
  };
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">Error loading Client. Please try again.</p>
      </div>
    );
  }
  // const filteredData = demoData.filter(
  //   (item) =>
  //     item.name.toLowerCase().includes(search.toLowerCase()) ||
  //     item.email.toLowerCase().includes(search.toLowerCase())
  // );

  const clients = apiData?.data || [];

  const totalPages = Math.max(1, Math.ceil(clients.length / itemsPerPage));
  const pageData = clients.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
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
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10"
          />
        </div>
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
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: itemsPerPage }).map((_, index) => (
                    <TableRow key={index} className="border-none">
                      <TableCell>
                        <Skeleton className="h-4 w-8" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-48" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-40" />
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-8 w-8 rounded" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </TableCell>
                    </TableRow>
                  ))
                : pageData.map((item, index) => {
                    const isPaused = !item.is_active;
                    return (
                      <TableRow key={item.id} className="border-none">
                        <TableCell>
                          {(page - 1) * itemsPerPage + index + 1}
                        </TableCell>
                        <TableCell>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                              profileColors[index % profileColors.length]
                            }`}
                          >
                            {item.name[0].toUpperCase()}
                          </div>
                        </TableCell>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone || "N/A"}</TableCell>
                        <TableCell>
                          {item.address
                            ? `${item.address.slice(0, 20)}${
                                item.address.length > 20 ? "..." : ""
                              }`
                            : "N/A"}
                        </TableCell>

                        <TableCell className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setConfirmDialog({ type: "pause", index })
                            }
                          >
                            {!isPaused ? (
                              <Play className="w-4 h-4 text-green-500" />
                            ) : (
                              <Pause className="w-4 h-4 text-yellow-500" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setConfirmDialog({ type: "delete", index });
                            }}
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
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => setPage(p)}
      />

      {/* Confirm Dialog */}
      {confirmDialog && (
        <Dialog open onOpenChange={() => setConfirmDialog(null)}>
          <DialogContent className="sm:max-w-xs text-center">
            <DialogHeader>
              <DialogTitle className="text-center">
                {confirmDialog.type === "pause"
                  ? pageData[confirmDialog.index].is_active
                    ? "Play this Client?"
                    : "Pause this Client?"
                  : "Delete this Client?"}
              </DialogTitle>
            </DialogHeader>
            <DialogFooter className="block mx-auto space-x-6 mt-4">
              <Button variant="green" onClick={() => setConfirmDialog(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // handle action
                  if (confirmDialog.type === "delete") {
                    handleConfirmDelete(pageData[confirmDialog.index].id);
                  }
                  if (confirmDialog.type === "pause") {
                    handlePauseUser(
                      pageData[confirmDialog.index].id,
                      pageData[confirmDialog.index].is_active
                    );
                  }
                  setConfirmDialog(null);
                }}
                variant="red"
              >
                {confirmDialog.type === "pause"
                  ? pageData[confirmDialog.index].is_active
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
