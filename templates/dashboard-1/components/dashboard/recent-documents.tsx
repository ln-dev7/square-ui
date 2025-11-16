"use client";

import {
  Search,
  FileText,
  Mail,
  CheckSquare,
  File,
  Upload,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDashboardStore } from "@/store/dashboard-store";

const iconMap = {
  files: FileText,
  mail: Mail,
  checklist: CheckSquare,
  file: File,
};

export function RecentDocuments() {
  const { documents } = useDashboardStore();

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card max-h-[400px] flex flex-col">
      <div className="flex items-center justify-between px-4 pt-[15px] pb-4 flex-wrap gap-2">
        <h2 className="text-[15px] font-normal text-foreground tracking-[-0.45px]">
          Recent Documents
        </h2>

        <div className="relative">
          <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground z-10" />
          <Input
            placeholder="Search files..."
            className="h-7 w-[140px] sm:w-[180px] md:w-[235px] pl-8 pr-2 text-sm text-muted-foreground"
          />
        </div>
      </div>

      <div className="px-[14px] pb-4 overflow-y-auto flex-1">
        <div className="space-y-[8px]">
          {documents.map((doc) => {
            const Icon = iconMap[doc.icon as keyof typeof iconMap] || FileText;
            return (
              <div
                key={doc.id}
                className="relative h-[46px] rounded-[10px] border border-border bg-sidebar hover:bg-sidebar-accent"
              >
                <table className="w-full h-full border-collapse table-fixed">
                  <colgroup>
                    <col className="w-full sm:w-[50%] md:w-[40%]" />
                    <col className="hidden sm:table-column md:w-[25%]" />
                    <col className="hidden md:table-column md:w-[20%]" />
                    <col className="hidden lg:table-column lg:w-[15%]" />
                  </colgroup>
                  <tbody>
                    <tr className="h-full">
                      <td className="px-[7px] py-0 align-middle text-left">
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 items-center justify-center rounded-[6px] border border-border bg-background shrink-0">
                            <Icon className="size-[18px] text-muted-foreground" />
                          </div>
                          <p className="text-[15px] font-normal text-foreground tracking-[-0.45px]">
                            {doc.name}
                          </p>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-[7px] py-0 align-middle text-left">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-[26px] shrink-0">
                            <AvatarImage
                              src={doc.authorAvatar}
                              alt={doc.author}
                            />
                            <AvatarFallback>
                              {doc.author.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-[15px] font-normal text-foreground tracking-[-0.45px] whitespace-nowrap">
                            {doc.author}
                          </span>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-[7px] py-0 align-middle text-left">
                        <div className="flex items-center gap-2">
                          <Upload className="size-4 text-muted-foreground shrink-0" />
                          <span className="text-[14px] font-normal text-muted-foreground tracking-[-0.42px] whitespace-nowrap">
                            {doc.uploadedAt}
                          </span>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-[7px] py-0 align-middle text-left">
                        <span className="text-[15px] font-normal text-muted-foreground tracking-[-0.45px] whitespace-nowrap">
                          {doc.size}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-card to-transparent rounded-br-xl rounded-bl-xl" />
    </div>
  );
}
