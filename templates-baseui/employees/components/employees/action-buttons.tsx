"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon, Add01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

export function ActionButtons() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm" className="gap-2">
        <HugeiconsIcon icon={Download01Icon} className="size-4" />
        Export
      </Button>
      <Button size="sm" className="gap-2">
        <HugeiconsIcon icon={Add01Icon} className="size-4" />
        New Employee
      </Button>
    </div>
  );
}
