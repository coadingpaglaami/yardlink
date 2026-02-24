" use client";
import { z } from "zod";
import { ServiceDialog } from "./StandartServiceDialogue";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export type Status = "Active" | "Inactive";
export type ServiceType = "Hourly" | "Flat Rate";

export interface Service {
  id: string;
  name: string;
  serviceType: ServiceType;
  defaultPrice: number;
  defaultTime: number; // in minutes
  status: Status;
}

export const serviceSchema = z.object({
  name: z
    .string()
    .min(2, "Service name must be at least 2 characters.")
    .max(100, "Service name must be under 100 characters."),
  defaultPrice: z
    .string()
    .min(1, "Price is required.")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Must be a valid non-negative number.",
    }),
  defaultTime: z
    .string()
    .min(1, "Time is required.")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Must be a positive number.",
    }),
  serviceType: z
    .string()
    .refine((val) => ["Hourly", "Flat Rate"].includes(val), {
      message: "Please select a service type.",
    }),
  status: z.string().refine((val) => ["Active", "Inactive"].includes(val), {
    message: "Please select a status.",
  }),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;

// ─── Initial Data ─────────────────────────────────────────────────────────────

export const initialServices: Service[] = [
  {
    id: "SRV-001",
    name: "Lawn Mowing",
    serviceType: "Hourly",
    defaultPrice: 45,
    defaultTime: 60,
    status: "Active",
  },
  {
    id: "SRV-002",
    name: "Garden Maintenance",
    serviceType: "Flat Rate",
    defaultPrice: 120,
    defaultTime: 90,
    status: "Active",
  },
  {
    id: "SRV-003",
    name: "Tree Trimming",
    serviceType: "Hourly",
    defaultPrice: 85,
    defaultTime: 120,
    status: "Active",
  },
  {
    id: "SRV-004",
    name: "Irrigation Installation",
    serviceType: "Flat Rate",
    defaultPrice: 450,
    defaultTime: 240,
    status: "Inactive",
  },
  {
    id: "SRV-005",
    name: "Seasonal Cleanup",
    serviceType: "Hourly",
    defaultPrice: 65,
    defaultTime: 180,
    status: "Active",
  },
];

export const StandardService = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  function generateId() {
    const num = services.length + 1;
    return `SRV-${String(num).padStart(3, "0")}`;
  }

  function openAddDialog() {
    setEditingService(null);
    setDialogOpen(true);
  }

  function openEditDialog(service: Service) {
    setEditingService(service);
    setDialogOpen(true);
  }

  function handleDelete(id: string) {
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  function handleSubmit(values: ServiceFormValues, id?: string) {
    if (id) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                name: values.name,
                serviceType: values.serviceType as ServiceType,
                defaultPrice: Number(values.defaultPrice),
                defaultTime: Number(values.defaultTime),
                status: values.status as Status,
              }
            : s,
        ),
      );
    } else {
      const newService: Service = {
        id: generateId(),
        name: values.name,
        serviceType: values.serviceType as ServiceType,
        defaultPrice: Number(values.defaultPrice),
        defaultTime: Number(values.defaultTime),
        status: values.status as Status,
      };
      setServices((prev) => [...prev, newService]);
    }
  }

  return (
    <div className="p-6 bg-gray-50 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-800">
          Standard Services
        </h1>
        <Button
          onClick={openAddDialog}
          className="flex items-center gap-1.5 rounded-lg bg-[#2d6a4f] hover:bg-[#245c43] text-white text-sm px-4 py-2"
        >
          <Plus className="w-4 h-4" />
          Add Standard Service
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-[110px_1fr_130px_140px_110px_160px_72px] px-6 py-3 border-b border-gray-100 bg-gray-50/60">
          {[
            "Serial",
            "Service Name",
            "Service Type",
            "Default Price",
            "Default Time",
            "Status",
            "Action",
          ].map((h) => (
            <span
              key={h}
              className="text-xs font-medium text-gray-500 uppercase tracking-wide"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Data rows */}
        {services.map((service, idx) => (
          <div
            key={service.id}
            className={`grid grid-cols-[110px_1fr_130px_140px_110px_160px_72px] items-center px-6 py-4 ${
              idx !== services.length - 1 ? "border-b border-gray-50" : ""
            } hover:bg-gray-50/50 transition-colors`}
          >
            <span className="text-xs text-gray-400 font-mono">
              {service.id}
            </span>
            <span className="text-sm font-medium text-gray-800">
              {service.name}
            </span>
            <div>
              <Badge
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium border-0 ${
                  service.serviceType === "Hourly"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {service.serviceType === "Hourly" ? "Hourly" : "Flat Rate"}
              </Badge>
            </div>
            <span className="text-sm text-gray-700">
              ${service.defaultPrice.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">
              {service.defaultTime} mins
            </span>
            <div>
              <Badge
                className={`rounded-full px-3 py-0.5 text-xs font-medium border-0 ${
                  service.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                    service.status === "Active" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                {service.status}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => openEditDialog(service)}
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Edit"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                aria-label="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-gray-400">
            No services found. Click &ldquo;Add Service&rdquo; to get started.
          </div>
        )}
      </div>

      {/* Reusable Dialog */}
      <ServiceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingService={editingService}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
