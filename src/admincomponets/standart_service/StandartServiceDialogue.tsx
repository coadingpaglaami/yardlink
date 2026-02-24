import { Service, ServiceFormValues, serviceSchema } from "./StandardService";
import { useForm } from "react-hook-form";
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
    values: {
      name: editingService?.name ?? "",
      defaultPrice: editingService ? String(editingService.defaultPrice) : "",
      defaultTime: editingService ? String(editingService.defaultTime) : "",
      serviceType: editingService?.serviceType ?? "Hourly",
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
      <DialogContent className="sm:w-[480px] w-[calc(100vw-2rem)] p-0 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-gray-900">
              {isEdit ? "Edit Standard Service" : "Add Standard Service"}
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Form body */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="px-6 py-5 space-y-4">
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

              {/* Price + Time row */}
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
                  name="defaultTime"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm text-gray-700">
                        Default Time (min)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="60"
                          type="number"
                          min={1}
                          step="1"
                          className="rounded-lg border-gray-200 text-sm placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#2d6a4f]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Service Type + Status row */}
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm text-gray-700">
                        Service Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-lg border-gray-200 text-sm focus:ring-1 focus:ring-[#2d6a4f]">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Hourly">Hourly Rate</SelectItem>
                          <SelectItem value="Flat Rate">Flat Rate</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/60 flex justify-end gap-2">
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
