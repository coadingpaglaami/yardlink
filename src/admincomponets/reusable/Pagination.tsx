"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  const buildPages = () => {
    const pages: (number | string)[] = [];
    const last = totalPages;

    // First 3 pages
    for (let i = 1; i <= Math.min(3, last); i++) {
      pages.push(i);
    }

    // Leading dots
    if (page > 5) pages.push("...");

    // Current -1, current, current +1
    for (let i = page - 1; i <= page + 1; i++) {
      if (i > 3 && i < last - 1) pages.push(i);
    }

    // Ending dots
    if (page < last - 4) pages.push("...");

    // Last 2 pages
    if (last > 3) {
      pages.push(last - 1);
      pages.push(last);
    }

    return pages;
  };

  const pages = buildPages();

  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      {/* Previous */}
      <Button
        variant="outline"
        size="icon"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Page numbers */}
      {pages.map((pg, idx) =>
        pg === "..." ? (
          <span key={idx} className="px-2 text-muted-foreground">
            ...
          </span>
        ) : (
          <Button
            key={pg}
            size="sm"
            variant={pg === page ? "default" : "outline"}
            onClick={() => onChange(pg as number)}
          >
            {pg}
          </Button>
        )
      )}

      {/* Next */}
      <Button
        variant="outline"
        size="icon"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
