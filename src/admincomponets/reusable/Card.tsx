'use client';
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface CardProps {
  icon: LucideIcon;
  title: string | ReactNode;
  total: number;
  isLoading?: boolean;
}

export const CardComponent = ({ icon: Icon, title, total, isLoading }: CardProps) => {
  return (
    <Card className="p-4 flex flex-row items-center justify-between h-full">
      
      {/* Left: Title + Total */}
      <div className="flex flex-col justify-between gap-5 ">
        <h2 className="text-sm font-medium">{title}</h2>
        <p className="text-xl font-semibold">{isLoading ? "Loading..." : total}</p>
      </div>

      {/* Right: Icon */}
      <div className="p-3 bg-primary text-white rounded-md">
        <Icon className="w-5 h-5" />
      </div>

    </Card>
  );
};