"use client";

import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActionButtons() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm" className="gap-2">
        <Download className="size-4" />
        Export
      </Button>
      <Button size="sm" className="gap-2">
        <Plus className="size-4" />
        New Employee
      </Button>
    </div>
  );
}

