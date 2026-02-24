'use client';
import { useState } from "react";
import { ServiceDialog, ServiceFormValues } from "./AddOnesDialogue";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Service {
  id: string;
  name: string;
  defaultPrice: number;
  status: Status;
}
export type Status = "Active" | "Inactive";

const initialServices: Service[] = [
  { id: "SRV-001", name: "Lawn Mowing", defaultPrice: 45, status: "Active" },
  {
    id: "SRV-002",
    name: "Garden Maintenance",
    defaultPrice: 120,
    status: "Active",
  },
  { id: "SRV-003", name: "Tree Trimming", defaultPrice: 85, status: "Active" },
  {
    id: "SRV-004",
    name: "Irrigation Installation",
    defaultPrice: 450,
    status: "Inactive",
  },
  {
    id: "SRV-005",
    name: "Seasonal Cleanup",
    defaultPrice: 65,
    status: "Active",
  },
];

export const AddOnsServiceTable = () => {
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
      // Edit
      setServices((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                name: values.name,
                defaultPrice: Number(values.defaultPrice),
                status: values.status,
              }
            : s,
        ),
      );
    } else {
      // Add
      const newService: Service = {
        id: generateId(),
        name: values.name,
        defaultPrice: Number(values.defaultPrice),
        status: values.status,
      };
      setServices((prev) => [...prev, newService]);
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-800">
          Add Ons Services
        </h1>
        <Button
          onClick={openAddDialog}
          className="flex items-center gap-1.5 rounded-lg bg-[#2d6a4f] hover:bg-[#245c43] text-white text-sm px-4 py-2"
        >
          <Plus className="w-4 h-4" />
          Add Add Ons
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[120px_1fr_160px_180px_80px] px-6 py-3 border-b border-gray-100 bg-gray-50/60">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Serial
          </span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Add Ons Service Name
          </span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Default Price
          </span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Status
          </span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide text-right">
            Action
          </span>
        </div>

        {/* Rows */}
        {services.map((service, idx) => (
          <div
            key={service.id}
            className={`grid grid-cols-[120px_1fr_160px_180px_80px] items-center px-6 py-4 ${
              idx !== services.length - 1 ? "border-b border-gray-50" : ""
            } hover:bg-gray-50/50 transition-colors`}
          >
            <span className="text-xs text-gray-400 font-mono">
              {service.id}
            </span>
            <span className="text-sm font-medium text-gray-800">
              {service.name}
            </span>
            <span className="text-sm text-gray-700">
              ${service.defaultPrice.toFixed(2)}
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
            <div className="flex items-center justify-end gap-1">
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

      {/* Dialog */}
      <ServiceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingService={editingService}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
