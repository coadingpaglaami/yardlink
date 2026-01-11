"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SubscriptionPlan } from "@/interfaces/subscripion";

type AddPlanProps = {
  onAdd: (
    plan: Pick<
      SubscriptionPlan,
      "name" | "description" | "duration" | "price" | "discount"
    >
  ) => void;
  onClose: () => void;
  loading?: boolean;
};

export const AddPlan = ({ onAdd, onClose,loading }: AddPlanProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const [duration, setDuration] = useState<string>("monthly");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const handleAdd = () => {
    if (!name) return;

    const plan: Pick<
      SubscriptionPlan,
      "name" | "description" | "duration" | "price" | "discount"
    > = {
      name,
      description,
      duration,
      price,
      discount,
    };

    onAdd(plan);
    onClose();
  };

  return (
    <div className="space-y-5">
      {/* Plan Name */}
      <div className="flex items-center gap-1">
        <Label htmlFor="plan-name" className="whitespace-nowrap">
          Plan Name
        </Label>
        <Input
          id="plan-name"
          className="bg-primary/20"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Pro 6m"
        />
      </div>

      {/* Description */}
      <div className="flex items-start gap-2">
        <Label htmlFor="plan-desc">Description</Label>
        <textarea
          id="plan-desc"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border rounded-md p-2 bg-primary/20"
        />
      </div>

      {/* Duration - Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-1">
          <Label>Duration</Label>
          <Select
            value={String(duration)}
            onValueChange={(v) => setDuration(v)}
          >
            <SelectTrigger className="w-full bg-primary/20 rounded-md">
              {duration}
            </SelectTrigger>
            <SelectContent>
              {["monthly", "yearly"].map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Label className="whitespace-nowrap">Price (USD)</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="0"
            className="bg-primary/20"
          />
        </div>
      </div>

      {/* Discount */}
      <div className="flex items-center gap-1">
        <Label className="whitespace-nowrap">Discount (%)</Label>
        <Input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          placeholder="0"
          className="bg-primary/20"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleAdd} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </Button>
      </div>
    </div>
  );
};
