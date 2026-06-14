import React from "react";
import { statuses } from "@/mock-data/statuses";

export function renderStatusIcon(statusId: string): React.ReactElement | null {
  const selectedItem = statuses.find((item) => item.id === statusId);
  if (selectedItem) {
    const Icon = selectedItem.icon;
    return <Icon />;
  }
  return null;
}

export function getStatusById(statusId: string) {
  return statuses.find((item) => item.id === statusId);
}
