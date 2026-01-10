import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SubscriptionPlan } from "@/interfaces/subscripion";

type ManagePlanProps = {
  plans: SubscriptionPlan[];
  onRemove: (selected: SubscriptionPlan[]) => void;
  onClose: () => void;
};
export const ManagePlan = ({ plans, onRemove, onClose }: ManagePlanProps) => {
  const [selected, setSelected] = useState<Record<number, boolean>>({});

    console.log(plans)
  const toggle = (i: number) => setSelected((s) => ({ ...s, [i]: !s[i] }));

  const handleRemove = () => {
    const sel = Object.entries(selected)
      .filter(([, v]) => v)
      .map(([k]) => plans[Number(k)]);
    onRemove(sel);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div>
        {plans.map((p, i) => (
          <div
            key={i}
            className={`grid  gap-3 border rounded p-3 mb-2 ${p.discount ? "grid-cols-5":"grid-cols-4"} bg-primary/10 items-center`}
          >
            <Checkbox
              checked={!!selected[i]}
              onCheckedChange={() => toggle(i)}
            />
        
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-muted-foreground">
                {p.duration} 
              </div>
              <span>${p.final_price}</span>
              {Number(p.discount) > 0 && (
                <div className="text-sm">{p.discount}% off</div>
              )}

          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};
