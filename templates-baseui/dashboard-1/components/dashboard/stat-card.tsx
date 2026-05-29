"use client";

import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserGroupIcon,
  ClipboardIcon,
  Wallet01Icon,
  File01Icon,
} from "@hugeicons/core-free-icons";

const iconMap = {
  users: UserGroupIcon,
  clipboard: ClipboardIcon,
  wallet: Wallet01Icon,
  invoice: File01Icon,
};

interface StatCardProps {
  title: string;
  value: string;
  icon: keyof typeof iconMap;
}

export function StatCard({ title, value, icon }: StatCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-medium text-foreground">{value}</p>
        </div>
        <div className="flex size-16 items-center justify-center rounded-lg bg-muted border border-border">
          <HugeiconsIcon icon={Icon} className="size-8 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
