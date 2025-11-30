export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
  hasChevron?: boolean;
}

export const mainMenuItems: MenuItem[] = [
  { id: "ai-assistant", label: "AI Assistant", icon: "wand" },
  { id: "dashboard", label: "Dashboard", icon: "layout-grid" },
  { id: "leads", label: "Leads", icon: "chart-area-line" },
  { id: "emails", label: "Emails", icon: "mail" },
  { id: "calendar", label: "Calendar", icon: "calendar-event" },
  { id: "tasks", label: "Tasks", icon: "note", isActive: true, hasChevron: true },
  { id: "contacts", label: "Contacts", icon: "user-circle" },
];

export const bottomMenuItems: MenuItem[] = [
  { id: "help", label: "Help Center", icon: "help-square-rounded" },
  { id: "settings", label: "Settings", icon: "settings-2" },
];

