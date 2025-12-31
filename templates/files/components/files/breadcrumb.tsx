"use client";

import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useFilesStore } from "@/store/files-store";
import { cn } from "@/lib/utils";

export function Breadcrumb() {
  const pathname = usePathname();
  const { folders } = useFilesStore();

  const getViewName = () => {
    if (pathname === "/starred") return "Starred";
    if (pathname === "/recent") return "Recent";
    if (pathname === "/shared") return "Shared";
    if (pathname === "/trash") return "Trash";
    if (pathname.startsWith("/folder/")) {
      const folderId = pathname.split("/folder/")[1];
      const folder = folders.find((f) => f.id === folderId);
      return folder?.name || "Folder";
    }
    return null;
  };

  const viewName = getViewName();

  return (
    <nav className="flex items-center gap-1 text-sm">
      <Link
        href="/"
        className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors",
          pathname === "/"
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        <Home className="size-4" />
        <span>My Files</span>
      </Link>
      {viewName && (
        <>
          <ChevronRight className="size-4 text-muted-foreground" />
          <span className="px-2 py-1 font-medium">{viewName}</span>
        </>
      )}
    </nav>
  );
}
