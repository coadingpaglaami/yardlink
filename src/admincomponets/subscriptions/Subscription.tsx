"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, Pause, Play, Trash, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddPlan } from "./AddPlan";
import { ManagePlan } from "./ManagePlan";
import { Pagination } from "../reusable/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UseCreateSubscriptionPlan,
  useDeletePlanMutation,
  useExtendSubscriptionMutation,
  UseGetSubscriptionPlan,
  useListOfSubscriptionsQuery,
} from "@/hooks";
import { Subscription, SubscriptionPlan } from "@/interfaces/subscripion";
import { format } from "date-fns";
import { da } from "date-fns/locale";

/* --------------------
   Types / Interfaces
   -------------------- */

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
  const [filter, setFilter] = useState<string>("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const subscriptionPlan = UseGetSubscriptionPlan();
  const { data: userSubscripion, refetch } = useListOfSubscriptionsQuery({
    page: page,
    search: search,
    limit: itemsPerPage,
  });
  const extendSubscriptionMutation = useExtendSubscriptionMutation();
  const [data, setData] = useState<Subscription[]>(
    userSubscripion?.subscriptions || []
  );
  console.log(data);

  const createSubscriptionPlan = UseCreateSubscriptionPlan();
  const { mutate: deleteMutate } = useDeletePlanMutation();

  // Extend dialog state with selected subscription data
  const [extendDialog, setExtendDialog] = useState<{
    open: boolean;
    subscription: Subscription | null;
    extendDays: string;
  }>({
    open: false,
    subscription: null,
    extendDays: "30",
  });

  const [confirmDialog, setConfirmDialog] = useState<{
    type: "pause" | "delete";
    index: number;
  } | null>(null);

  // dialogs state
  const [addPlanOpen, setAddPlanOpen] = useState(false);
  const [managePlanOpen, setManagePlanOpen] = useState(false);

  const totalPages = Math.max(
    1,
    Math.ceil(userSubscripion?.count || 1 / itemsPerPage)
  );
  const pageData = userSubscripion?.subscriptions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  /* ---- Add plan handler ---- */
  const handleAddPlan = (
    plan: Pick<
      SubscriptionPlan,
      "name" | "description" | "price" | "discount" | "duration"
    >
  ) => {
    createSubscriptionPlan.mutate({
      description: plan.description,
      duration: plan.duration,
      discount: plan.discount,
      name: plan.name,
      price: plan.price,
    });
    subscriptionPlan.refetch();
  };

  const handleRemovePlans = (selected: SubscriptionPlan[]) => {
    console.log("Remove plans:", selected);
    selected.map((s) => {
      deleteMutate(s.id);
    });
  };

  /* ---- Extend handler ---- */
  const handleExtend = async () => {
    if (!extendDialog.subscription) return;

    try {
      await extendSubscriptionMutation.mutateAsync({
        userId: extendDialog.subscription.plan,
        days: parseInt(extendDialog.extendDays),
      });

      // Refresh the data
      refetch();

      // Close dialog
      setExtendDialog({
        open: false,
        subscription: null,
        extendDays: "30",
      });
    } catch (error) {
      console.error("Failed to extend subscription:", error);
      // Handle error (show toast, etc.)
    }
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
            <Input
              className="pl-10"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2 px-3 py-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">{filter}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              {subscriptionPlan?.data?.map((s, i, arr) => (
                <DropdownMenuItem
                  key={s.id}
                  onClick={() => {
                    setFilter(s.name);
                    setPage(1);
                  }}
                  className={i === arr.length - 1 ? "border-b" : ""}
                >
                  {s.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3">
          <Dialog open={managePlanOpen} onOpenChange={setManagePlanOpen}>
            <DialogTrigger asChild>
              <Button variant="dark_green" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Manage Plans
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage Plans</DialogTitle>
              </DialogHeader>
              <ManagePlan
                plans={subscriptionPlan.data || []}
                onRemove={handleRemovePlans}
                onClose={() => setManagePlanOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Dialog
            open={addPlanOpen}
            onOpenChange={(open) => {
              if (createSubscriptionPlan.isPending) return; // ❌ prevent close while loading
              setAddPlanOpen(open);
            }}
          >
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

              <AddPlan
                onAdd={handleAddPlan}
                onClose={() => setAddPlanOpen(false)}
                loading={createSubscriptionPlan.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto max-w-[80vw]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">
                  Subscription Status
                </TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Plan Name</TableHead>
                <TableHead>
                  <span className="flex justify-center">Action</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {pageData?.map((row, idx) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{row.user}</TableCell>
                    <TableCell>{row.user_email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                            avatarBg[row.id ?? 0 % avatarBg.length]
                          }`}
                        >
                          {row.user_name.charAt(0).toUpperCase()}
                        </div>
                        {row.user_name.slice(0, 1).toUpperCase() +
                          row.user_name.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Badge
                          variant={
                            row.status === "active"
                              ? "secondary"
                              : "destructive"
                          }
                          className={
                            row.status === "active"
                              ? "bg-green-500 text-white"
                              : ""
                          }
                        >
                          {row.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(row.start_date), "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(row.end_date), "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell>{row.plan_name}</TableCell>
                    <TableCell className="flex gap-2">
                      {/* Extend */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setExtendDialog({
                            open: true,
                            subscription: row,
                            extendDays: "30",
                          })
                        }
                      >
                        <svg
                          width="27"
                          height="18"
                          viewBox="0 0 27 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.66667 9.32911C6.95467 9.32911 8 10.3744 8 11.6624V14.9958C8 15.6146 7.75417 16.2081 7.31658 16.6457C6.879 17.0833 6.28551 17.3291 5.66667 17.3291H2.33333C1.7145 17.3291 1.121 17.0833 0.683418 16.6457C0.245833 16.2081 0 15.6146 0 14.9958V11.6624C0 10.3744 1.04533 9.32911 2.33333 9.32911H5.66667ZM15 9.32911C16.288 9.32911 17.3333 10.3744 17.3333 11.6624V14.9958C17.3333 15.6146 17.0875 16.2081 16.6499 16.6457C16.2123 17.0833 15.6188 17.3291 15 17.3291H11.6667C11.0478 17.3291 10.4543 17.0833 10.0168 16.6457C9.57917 16.2081 9.33333 15.6146 9.33333 14.9958V11.6624C9.33333 10.3744 10.3787 9.32911 11.6667 9.32911H15ZM24.3333 9.32911C25.6213 9.32911 26.6667 10.3744 26.6667 11.6624V14.9958C26.6667 15.6146 26.4208 16.2081 25.9833 16.6457C25.5457 17.0833 24.9522 17.3291 24.3333 17.3291H21C20.3812 17.3291 19.7877 17.0833 19.3501 16.6457C18.9125 16.2081 18.6667 15.6146 18.6667 14.9958V11.6624C18.6667 10.3744 19.712 9.32911 21 9.32911H24.3333ZM5.66667 11.3291H2.33333C2.24493 11.3291 2.16014 11.3642 2.09763 11.4267C2.03512 11.4893 2 11.574 2 11.6624V14.9958C2 15.1811 2.14933 15.3291 2.33333 15.3291H5.66667C5.75507 15.3291 5.83986 15.294 5.90237 15.2315C5.96488 15.169 6 15.0842 6 14.9958V11.6624C6 11.574 5.96488 11.4893 5.90237 11.4267C5.83986 11.3642 5.75507 11.3291 5.66667 11.3291ZM15 11.3291H11.6667C11.5783 11.3291 11.4935 11.3642 11.431 11.4267C11.3685 11.4893 11.3333 11.574 11.3333 11.6624V14.9958C11.3333 15.1811 11.4827 15.3291 11.6667 15.3291H15C15.0884 15.3291 15.1732 15.294 15.2357 15.2315C15.2982 15.169 15.3333 15.0842 15.3333 14.9958V11.6624C15.3333 11.574 15.2982 11.4893 15.2357 11.4267C15.1732 11.3642 15.0884 11.3291 15 11.3291ZM24.3333 11.3291H21C20.9116 11.3291 20.8268 11.3642 20.7643 11.4267C20.7018 11.4893 20.6667 11.574 20.6667 11.6624V14.9958C20.6667 15.1811 20.816 15.3291 21 15.3291H24.3333C24.4217 15.3291 24.5065 15.294 24.569 15.2315C24.6316 15.169 24.6667 15.0842 24.6667 14.9958V11.6624C24.6667 11.574 24.6316 11.4893 24.569 11.4267C24.5065 11.3642 24.4217 11.3291 24.3333 11.3291ZM7.96 4.95978L12.6267 0.29311C12.7944 0.125324 13.0162 0.0226104 13.2526 0.00331514C13.4891 -0.0159801 13.7247 0.0493995 13.9173 0.187777L14.0307 0.282444L18.8333 4.94911C19.014 5.12508 19.1214 5.36278 19.1342 5.61462C19.147 5.86646 19.0642 6.11384 18.9024 6.30721C18.7405 6.50058 18.5116 6.62567 18.2614 6.65742C18.0113 6.68918 17.7584 6.62525 17.5533 6.47844L17.44 6.38378L13.344 2.40378L9.37333 6.37311C9.19467 6.55039 8.95572 6.65377 8.70419 6.66263C8.45265 6.67149 8.20703 6.58517 8.01633 6.4209C7.82564 6.25663 7.7039 6.02649 7.67542 5.77642C7.64693 5.52634 7.7138 5.27472 7.86267 5.07178L7.96 4.95978Z"
                            fill="#0067D8"
                          />
                        </svg>
                      </Button>

                      {/* Delete */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setConfirmDialog({ type: "delete", index: idx })
                        }
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

      {/* Extend Dialog */}
      {extendDialog.open && extendDialog.subscription && (
        <Dialog
          open={extendDialog.open}
          onOpenChange={(open) => {
            if (!open) {
              setExtendDialog({
                open: false,
                subscription: null,
                extendDays: "30",
              });
            }
          }}
        >
          <DialogContent className="max-w-lg w-full">
            <DialogHeader>
              <DialogTitle>Extend Subscription</DialogTitle>
            </DialogHeader>

            {/* centered user info */}
            <div className="flex flex-col items-center gap-3 py-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${
                  avatarBg[extendDialog.subscription.id % avatarBg.length]
                }`}
              >
                {extendDialog.subscription.user_email.charAt(0)}
              </div>
              <div className="text-lg font-medium">
                {extendDialog.subscription.user_email}
              </div>
              <div className="text-sm text-muted-foreground">
                {extendDialog.subscription.user_email} •{" "}
                {extendDialog.subscription.plan_name}
              </div>
            </div>

            {/* disabled inputs with labels */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <Label className="whitespace-nowrap">Start Date</Label>
                  <Input
                    value={format(
                      new Date(extendDialog.subscription.start_date),
                      "yyyy-MM-dd"
                    )}
                    className="bg-primary/20"
                    disabled
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="whitespace-nowrap">End Date</Label>
                  <Input
                    value={format(
                      new Date(extendDialog.subscription.end_date),
                      "yyyy-MM-dd"
                    )}
                    className="bg-primary/20"
                    disabled
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 flex items-center gap-2">
                  <Label className="whitespace-nowrap">Remaining Days</Label>
                  <Input
                    value={String(extendDialog.subscription.remaining_days)}
                    className="bg-primary/20"
                    disabled
                  />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <Label className="whitespace-nowrap">Plan</Label>
                  <Input
                    value={extendDialog.subscription.plan_name}
                    className="bg-primary/20"
                    disabled
                  />
                </div>
              </div>

              <div className="flex-1 flex items-center gap-2">
                <Label className="whitespace-nowrap">Extend By</Label>
                <Select
                  value={extendDialog.extendDays}
                  onValueChange={(value) => {
                    setExtendDialog((prev) => ({
                      ...prev,
                      extendDays: value,
                    }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 Days</SelectItem>
                    <SelectItem value="90">20 Days</SelectItem>
                    <SelectItem value="180">40 Days</SelectItem>
                    <SelectItem value="360">60 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    setExtendDialog({
                      open: false,
                      subscription: null,
                      extendDays: "30",
                    })
                  }
                  disabled={extendSubscriptionMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleExtend}
                  disabled={extendSubscriptionMutation.isPending}
                >
                  {extendSubscriptionMutation.isPending
                    ? "Extending..."
                    : "Extend"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirm Dialog (Delete) */}
      {confirmDialog && (
        <Dialog open onOpenChange={() => setConfirmDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">
                Delete Subscription?
              </DialogTitle>
            </DialogHeader>

            <div className="flex justify-center gap-4 mt-4">
              <Button variant="outline" onClick={() => setConfirmDialog(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (confirmDialog.type === "delete")
                    handleDelete(confirmDialog.index);
                }}
                variant={"red"}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
