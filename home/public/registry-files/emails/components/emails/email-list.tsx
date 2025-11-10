"use client";

import { format } from "date-fns";
import { useEmailsStore } from "@/store/emails-store";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { VerifiedIcon } from "@/components/ui/verified-icon";
import { cn } from "@/lib/utils";

interface EmailListProps {
  onEmailClick?: (emailId: string) => void;
}

export function EmailList({ onEmailClick }: EmailListProps) {
  const { emails, selectedEmailId, selectEmail } = useEmailsStore();

  const handleEmailClick = (emailId: string) => {
    selectEmail(emailId);
    onEmailClick?.(emailId);
  };

  if (emails.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-card">
        <div className="text-center text-muted-foreground">
          <p>No emails found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="size-3.5 rounded border border-border" />
          <p className="text-sm font-medium text-foreground">Inbox</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {emails.map((email, index) => {
          const isSelected = selectedEmailId === email.id;
          const isRead = email.read;

          return (
            <button
              key={email.id}
              onClick={() => handleEmailClick(email.id)}
              className={cn(
                "flex w-full gap-2.5 border-b border-border p-4 text-left transition-colors hover:bg-muted/70",
                isSelected && "bg-muted",
                !isRead && "bg-muted/50"
              )}
            >
              <div className={cn("flex w-full gap-2.5")}>
                <Avatar className="mt-1.5 size-7 shrink-0">
                  <AvatarImage src={email.from.avatar} alt={email.from.name} />
                  <AvatarFallback>{email.from.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center gap-1">
                        <p
                          className={cn(
                            "truncate text-[14px] tracking-tight",
                            !isRead || isSelected
                              ? "font-medium text-foreground"
                              : "text-foreground"
                          )}
                        >
                          {email.from.name}
                        </p>
                        {email.from.verified && (
                          <VerifiedIcon className="size-4 shrink-0" />
                        )}
                      </div>
                      <p className="truncate text-[12px] tracking-tight text-[#38bdf8]">
                        {email.from.email}
                      </p>
                    </div>
                    <p
                      className={cn(
                        "shrink-0 text-[12px] tracking-tight",
                        !isRead
                          ? "font-medium text-foreground"
                          : "text-foreground"
                      )}
                    >
                      {format(email.date, "MMM dd")}
                    </p>
                  </div>

                  <div className="mt-1.5 space-y-0.5">
                    <p className="line-clamp-2 text-[12px] leading-relaxed tracking-tight text-foreground">
                      {email.body}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
