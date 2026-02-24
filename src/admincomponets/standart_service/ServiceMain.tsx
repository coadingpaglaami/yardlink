"use client";
import { useState } from "react";
import { AddOnsServiceTable } from "./AddOns";
import { StandardService } from "./StandardService";
import { Button } from "@/components/ui/button";

export const ServiceMain = () => {
  const [services, setServices] = useState<"standard" | "addOnes">("standard");

  return (
    <div className="py-16 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-2.5 ">
        <Button
          onClick={() => setServices("standard")}
          variant={services === "standard" ? "default" : "outline"}
        >
          Standard Services
        </Button>
        <Button
          onClick={() => setServices("addOnes")}
          variant={services === "addOnes" ? "default" : "outline"}
        >
          Add Ons
        </Button>
      </div>
      <div className="flex flex-col gap-1.5 ">
        <span className="text-xl font-semibold "> All Services</span>
        <p className="text-sm text-gray-600">
          Manage your standard and add-on services here. You can add, edit, or
          delete services as needed to keep your offerings up to date.
        </p>
      </div>

      {services === "standard" ? <StandardService /> : <AddOnsServiceTable />}
    </div>
  );
};
