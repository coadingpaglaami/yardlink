"use client";

import { useState } from "react";
import { Play, Pause, Trash, Filter, Search } from "lucide-react";
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
import { Pagination } from "@/admincomponets/reusable/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteUserMutation,
  UseGetSubscriptionPlan,
  useGetUsersQuery,
  usePauseUserMutation,
} from "@/hooks";
import type { GetUsersParams, LandscaperPlan } from "@/interfaces/user";

const profileColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
];

export const Landscaper = () => {
  const [confirmDialog, setConfirmDialog] = useState<{
    type: "pause" | "delete";
    index: number;
  } | null>(null);
  const [search, setSearch] = useState("");
  const { data: subscriptionPlan } = UseGetSubscriptionPlan();
  const [filter, setFilter] = useState<string>("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // API Params
  const params: GetUsersParams = {
    role: "landscaper",
    search: search || undefined,
    plan: filter !== "All" ? (filter as LandscaperPlan) : undefined,
  };

  const {
    data: apiData,
    isLoading,
    isError,
    refetch,
  } = useGetUsersQuery(params);
  const deleteUserMutation = useDeleteUserMutation();
  const { mutate: pauseUserMutate } = usePauseUserMutation();

  const users = apiData?.data || [];

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentData = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        <p className="text-red-500">
          Error loading landscapers. Please try again.
        </p>
      </div>
    );
  }

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
              setCurrentPage(1);
            }}
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
          <DropdownMenuContent className="w-64">
            <DropdownMenuItem
              onClick={() => {
                setFilter("All");
                setCurrentPage(1);
              }}
              className="font-medium"
            >
              All Plans
            </DropdownMenuItem>
            {subscriptionPlan?.results.map((plan) => (
              <DropdownMenuItem
                key={plan.id}
                onClick={() => {
                  setFilter(plan.name);
                  setCurrentPage(1);
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <span>{plan.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {plan.price}৳ — {plan.duration}
                  </span>
                </div>
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
                <TableHead>ID</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subscription</TableHead>
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
                : currentData.map((item, index) => {
                    const isPaused = !item.is_active;

                    return (
                      <TableRow key={item.id} className="border-none">
                        <TableCell>
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </TableCell>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                              profileColors[index % profileColors.length]
                            }`}
                          >
                            {item.name[0].toUpperCase()}
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.name.slice(0, 1).toUpperCase() +
                            item.name.slice(1)}
                        </TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.landscaper_plan || "None"}</TableCell>
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
                              <Pause className="w-4 h-4 text-yellow-500" />
                            ) : (
                              <Play className="w-4 h-4 text-green-500" />
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
        page={currentPage}
        totalPages={totalPages}
        onChange={(p) => setCurrentPage(p)}
      />

      {/* Message Dialog */}

      {/* Confirm Dialog */}
      {confirmDialog && (
        <Dialog open onOpenChange={() => setConfirmDialog(null)}>
          <DialogContent className="sm:max-w-xs text-center">
            <DialogHeader>
              <DialogTitle className="text-center">
                {confirmDialog.type === "pause"
                  ? currentData[confirmDialog.index].is_active
                    ? "Pause this landscaper?"
                    : "Activate this landscaper?"
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
                  if (confirmDialog.type === "delete") {
                    handleConfirmDelete(currentData[confirmDialog.index].id);
                  }
                  if (confirmDialog.type === "pause") {
                    handlePauseUser(
                      currentData[confirmDialog.index].id,
                      currentData[confirmDialog.index].is_active
                    );
                  }
                }}
                variant="red"
              >
                {confirmDialog.type === "pause"
                  ? currentData[confirmDialog.index].is_active
                    ? "Pause"
                    : "Activate"
                  : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
