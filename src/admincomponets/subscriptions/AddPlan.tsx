import { SubscriptionManager } from "framer-motion";
import { Subscription } from "./Subscription";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type AddPlanProps = {
  onAdd: (plan: Subscription) => void;
  onClose: () => void;
};

export const AddPlan=()=>{
const [name, setName] = useState("");

  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [duration, setDuration] = useState<number | undefined>(6);
  const [price, setPrice] = useState<number | undefined>(0);
  const [discount, setDiscount] = useState<number | undefined>(0);

  const handleAdd = () => {
    if (!name) return;
    const plan: Subscription = {
      name,
      description,
      duration: duration ?? 0,
      price: price ?? 0,
      discount: discount ?? 0,
      startDate,
      endDate,
    };
    onAdd(plan);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="plan-name">Plan Name</Labe>
          <Input id="plan-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Pro 6m" />
        </div>
      </div>

      <div>
        <Label htmlFor="plan-desc">Description</Label>
        <textarea id="plan-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Start Date</Label>
          <DatePicker
            value={startDate}
            onChange={(d: any) => setStartDate(d ? String(d) : undefined)}
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <Label>End Date</Label>
          <DatePicker
            value={endDate}
            onChange={(d: any) => setEndDate(d ? String(d) : undefined)}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Duration</Label>
          <Select value={String(duration ?? "")} onValueChange={(v) => setDuration(Number(v))}>
            <SelectTrigger className="w-full">
              <span>{duration ?? ""} months</span>
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

        <div className="flex-1">
          <Label>Price (USD)</Label>
          <Input
            type="number"
            value={price ?? ""}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Discount (%)</Label>
          <Input
            type="number"
            value={discount ?? ""}
            onChange={(e) => setDiscount(Number(e.target.value))}
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  );
};
