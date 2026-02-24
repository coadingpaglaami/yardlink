import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Service } from "./AddOns";

const serviceSchema = z.object({
  name: z
    .string()
    .min(2, "Service name must be at least 2 characters.")
    .max(100, "Service name must be under 100 characters."),
  defaultPrice: z
    .string()
    .min(1, "Price is required.")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a valid non-negative number.",
    }),
  status: z.enum(["Active", "Inactive"]).describe("Please select a status."),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingService: Service | null;
  onSubmit: (values: ServiceFormValues, id?: string) => void;
}

export const ServiceDialog = ({
  open,
  onOpenChange,
  editingService,
  onSubmit,
}: ServiceDialogProps) => {
  const isEdit = !!editingService;

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: editingService?.name ?? "",
      defaultPrice: editingService ? String(editingService.defaultPrice) : "",
      status: editingService?.status ?? "Active",
    },
    values: {
      name: editingService?.name ?? "",
      defaultPrice: editingService ? String(editingService.defaultPrice) : "",
      status: editingService?.status ?? "Active",
    },
  });

  function handleSubmit(values: ServiceFormValues) {
    onSubmit(values, editingService?.id);
    form.reset();
    onOpenChange(false);
  }

  function handleCancel() {
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-[440px] w-[calc(100vw-2rem)] p-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-gray-900">
            {isEdit ? "Edit Add Ons Service" : "Add Ons Service"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-2"
          >
            {/* Service Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    Service Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Custom Landscaping"
                      className="rounded-lg border-gray-200 text-sm placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#2d6a4f]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Price + Status row */}
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="defaultPrice"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-gray-700">
                      Default Price ($)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="45.00"
                        type="number"
                        min={0}
                        step="0.01"
                        className="rounded-lg border-gray-200 text-sm placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#2d6a4f]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-gray-700">
                      Status
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-lg border-gray-200 text-sm focus:ring-1 focus:ring-[#2d6a4f]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="rounded-lg border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-lg bg-[#2d6a4f] hover:bg-[#245c43] text-white text-sm px-5"
              >
                {isEdit ? "Update Service" : "Save Service"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
