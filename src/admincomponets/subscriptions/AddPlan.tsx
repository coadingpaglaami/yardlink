"use client";
import { Subscription } from "./Subscription";
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
import { DatePicker } from "@/components/ui/date-picker";

type AddPlanProps = {
  onAdd: (plan: Subscription) => void;
  onClose: () => void;
};

export const AddPlan = ({ onAdd, onClose }: AddPlanProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const [duration, setDuration] = useState<number>(6);
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const handleAdd = () => {
    if (!name) return;

    const plan: Subscription = {
      name,
      description,
      duration,
      price,
      discount,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined,
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

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Start Date */}
        <div className="flex items-center gap-2">
          <Label className="whitespace-nowrap">Start Date</Label>
          <div className="flex-1  rounded-md p-1">
            <DatePicker date={startDate} setDate={setStartDate} />
          </div>
        </div>

        {/* End Date */}
        <div className="flex items-center gap-2">
          <Label className="whitespace-nowrap">End Date</Label>
          <div className="flex-1 rounded-md p-1">
            <DatePicker date={endDate} setDate={setEndDate} />
          </div>
        </div>
      </div>

      {/* Duration - Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-1">
          <Label>Duration</Label>
          <Select
            value={String(duration)}
            onValueChange={(v) => setDuration(Number(v))}
          >
            <SelectTrigger className="w-full bg-primary/20">
              {duration} months
            </SelectTrigger>
            <SelectContent>
              {[1, 3, 6, 12, 24].map((d) => (
                <SelectItem key={d} value={String(d)}>
                  {d} month{d > 1 ? "s" : ""}
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
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  );
};
