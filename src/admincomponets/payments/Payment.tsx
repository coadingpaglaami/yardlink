/* eslint-disable react-hooks/static-components */
"use client";
  
import { CircleDollarSign, Trash, Search, X } from "lucide-react";
import {
  BarChart,
  BarChartData,
  BarChartProps,
  CardComponent,
} from "../reusable";
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
import {
  useDailyOverview,
  useDeleteUserFinancial,
  useGetStripePayments,
  useGetTransactionSummary,
} from "@/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface PaymentData {
  id: string;
  name: string;
  email: string;
  transactionId: string;
  amount: number;
  time: string;
}

export const Payments = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    userId: number | null;
    paymentId: number | null;
    userName: string;
  }>({
    isOpen: false,
    userId: null,
    paymentId: null,
    userName: "",
  });
  
  const itemsPerPage = 10;
  
  const { data: dailyOverviewData, isLoading: isLoadingOverview } = useDailyOverview();
  const { data: transactionSummaryData, isLoading: isLoadingSummary } = useGetTransactionSummary();
  const { data: stripePaymentsData, isLoading: isLoadingPayments } = useGetStripePayments({
    page,
    limit: itemsPerPage,
  });
  
  const { mutate: deletePayment, isPending: isDeleting } = useDeleteUserFinancial();

  const totalPages = Math.ceil((stripePaymentsData?.count ?? 0) / itemsPerPage);

  // Filter payments based on search
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const filteredPayments = useMemo(() => {
    if (!stripePaymentsData?.results) return [];
    if (!search.trim()) return stripePaymentsData.results;

    return stripePaymentsData.results.filter((payment) =>
      payment.name?.toLowerCase().includes(search.toLowerCase()) ||
      payment.email?.toLowerCase().includes(search.toLowerCase()) ||
      payment.transaction_id?.toLowerCase().includes(search.toLowerCase()) ||
      payment.user_id?.toString().includes(search)
    );
  }, [stripePaymentsData?.results, search]);

  const barChartData: BarChartData[] =
    dailyOverviewData?.daily_income?.map((item) => ({
      label: new Date(item.day).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      value: item.income,
    })) ?? [];

  const barChartProps: BarChartProps = {
    heading: "Stripe Income Overview",
    data: barChartData,
    selectData: [
      { label: "2024", value: "2024" },
      { label: "2025", value: "2025" },
    ],
  };

  const handleDeleteClick = (userId: number, paymentId: number, userName: string) => {
    setDeleteDialog({
      isOpen: true,
      userId,
      paymentId,
      userName,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.userId) return;

    deletePayment(deleteDialog.userId, {
      onSuccess: () => {
        toast.success("Payment record deleted successfully");
        setDeleteDialog({ isOpen: false, userId: null, paymentId: null, userName: "" });
      },
      onError: (error) => {
        toast.error("Failed to delete payment record");
        console.error("Delete error:", error);
      },
    });
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteDialog({ isOpen: false, userId: null, paymentId: null, userName: "" });
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 min-h-screen bg-gray-50">
      {/* Bar Chart */}
      <div className="lg:row-span-2 bg-white rounded-lg shadow-sm p-6">
        {isLoadingOverview ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <BarChart
            heading={barChartProps.heading}
            data={barChartData}
            selectData={barChartProps.selectData}
          />
        )}
      </div>

      {/* Cards */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm">
          <CardComponent
            icon={CircleDollarSign}
            title="Total Transactions"
            total={transactionSummaryData?.transactions.total_transactions ?? 0}
            isLoading={isLoadingSummary}
          />
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          <CardComponent
            icon={CircleDollarSign}
            title="Total Platform Fee (2%)"
            total={transactionSummaryData?.transactions.job_transactions ?? 0}
            isLoading={isLoadingSummary}
          />
        </div>
      </div>

      {/* Search and Table Section */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, email, transaction ID, or user ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>

        {/* Payments Table */}
        <div className="border rounded-md">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingPayments ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-32">
                   
                      <LoadingSkeleton />
                    </TableCell>
                  </TableRow>
                ) : filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-32 text-center text-gray-500">
                      {search ? "No payments found matching your search" : "No payments found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment, idx) => (
                    <TableRow key={payment.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {(page - 1) * itemsPerPage + idx + 1}
                      </TableCell>
                      <TableCell>{payment.user_id}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {payment.id}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {payment.transaction_id?.slice(0, 8)}...
                      </TableCell>
                      <TableCell>{payment.email}</TableCell>
                      <TableCell>{payment.name}</TableCell>
                      <TableCell className="text-right font-medium">
                        ${payment.amount_paid?.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {new Date(payment.date).toLocaleString('en-US', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(
                            payment.user_id,
                            payment.id,
                            payment.name
                          )}
                          className="hover:bg-red-50 hover:text-red-600 transition-colors"
                          disabled={isDeleting}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {!isLoadingPayments && filteredPayments.length > 0 && (
          <div className="mt-6">
            <Pagination
              totalPages={totalPages}
              page={page}
              onChange={(newPage) => setPage(newPage)}
            />
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialog.isOpen} 
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            handleDeleteCancel();
          }
        }}
      >
        <DialogContent className="sm:max-w-md" onEscapeKeyDown={(e) => {
          if (isDeleting) {
            e.preventDefault();
          }
        }}>
          <DialogHeader>
            <DialogTitle className="text-xl">Delete Payment Record</DialogTitle>
            <DialogDescription className="text-gray-500">
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-gray-700">
              Are you sure you want to delete the payment record for{" "}
              <span className="font-semibold">{deleteDialog.userName}</span>?
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Payment ID: {deleteDialog.paymentId}
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={isDeleting}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="w-full sm:w-auto min-w-[100px]"
            >
              {isDeleting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};