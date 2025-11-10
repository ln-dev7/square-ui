"use client";

import { format } from "date-fns";
import {
  SparklesIcon,
  ArchiveIcon,
  Settings2Icon,
  Trash2Icon,
  MailPlusIcon,
  FolderOpenIcon,
  MoreVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  CircleArrowOutUpRightIcon,
  ReceiptTextIcon,
  ShieldIcon,
  XIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
  FileIcon,
  ImageIcon,
  FileArchiveIcon,
  ClockIcon,
  CheckCheckIcon,
  CalendarIcon,
  TagIcon,
  FilterIcon,
  Volume2Icon,
} from "lucide-react";
import { useEmailsStore } from "@/store/emails-store";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VerifiedIcon } from "@/components/ui/verified-icon";
import { cn } from "@/lib/utils";

function getFileIcon(type: string) {
  if (type.includes("pdf")) {
    return FileTextIcon;
  } else if (type.includes("word") || type.includes("document")) {
    return FileTextIcon;
  } else if (type.includes("excel") || type.includes("spreadsheet")) {
    return FileSpreadsheetIcon;
  } else if (type.includes("powerpoint") || type.includes("presentation")) {
    return FileTextIcon;
  } else if (
    type.includes("image") ||
    type.includes("png") ||
    type.includes("jpg") ||
    type.includes("jpeg")
  ) {
    return ImageIcon;
  } else if (type.includes("zip") || type.includes("archive")) {
    return FileArchiveIcon;
  }
  return FileIcon;
}

function getFileGradient(type: string) {
  if (type.includes("pdf")) {
    return { start: "#f75936", end: "#a73a24" };
  } else if (type.includes("word") || type.includes("document")) {
    return { start: "#2b5797", end: "#1e3d6b" };
  } else if (type.includes("excel") || type.includes("spreadsheet")) {
    return { start: "#217346", end: "#165530" };
  } else if (type.includes("powerpoint") || type.includes("presentation")) {
    return { start: "#d04423", end: "#9b3319" };
  } else if (
    type.includes("image") ||
    type.includes("png") ||
    type.includes("jpg") ||
    type.includes("jpeg")
  ) {
    return { start: "#8b5cf6", end: "#6d28d9" };
  } else if (type.includes("zip") || type.includes("archive")) {
    return { start: "#f59e0b", end: "#d97706" };
  }
  return { start: "#6b7280", end: "#4b5563" };
}

export function EmailDetail() {
  const {
    emails,
    selectedEmailId,
    toggleStar,
    clearSelectedEmail,
    selectEmail,
  } = useEmailsStore();
  const email = emails.find((e) => e.id === selectedEmailId);

  // Get current email index
  const currentIndex = emails.findIndex((e) => e.id === selectedEmailId);
  const isFirstEmail = currentIndex === 0;
  const isLastEmail = currentIndex === emails.length - 1;

  // Navigation functions
  const goToPreviousEmail = () => {
    if (!isFirstEmail && currentIndex > 0) {
      selectEmail(emails[currentIndex - 1].id);
    }
  };

  const goToNextEmail = () => {
    if (!isLastEmail && currentIndex < emails.length - 1) {
      selectEmail(emails[currentIndex + 1].id);
    }
  };

  if (!email) {
    return (
      <div className="flex h-full items-center justify-center bg-card">
        <div className="text-center text-muted-foreground">
          <p>Select an email to read</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex items-center justify-between border-b border-border px-3 md:px-6 py-3 md:py-4">
        <div className="hidden lg:flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <SparklesIcon className="size-4 text-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>AI Assistant</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <ArchiveIcon className="size-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Archive</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <Settings2Icon className="size-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as spam</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <Trash2Icon className="size-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <MailPlusIcon className="size-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as unread</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <FolderOpenIcon className="size-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Move to folder</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <MoreVerticalIcon className="size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuItem>
                <ClockIcon className="size-4 mr-2" />
                Snooze
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCheckIcon className="size-4 mr-2" />
                Add to Tasks
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CalendarIcon className="size-4 mr-2" />
                Create event
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <TagIcon className="size-4 mr-2" />
                  Label as
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Work</DropdownMenuItem>
                  <DropdownMenuItem>Personal</DropdownMenuItem>
                  <DropdownMenuItem>Important</DropdownMenuItem>
                  <DropdownMenuItem>Travel</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <FilterIcon className="size-4 mr-2" />
                Filter messages like these
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Volume2Icon className="size-4 mr-2" />
                Mute
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings2Icon className="size-4 mr-2" />
                Switch to advanced toolbar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex lg:hidden items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon-sm">
            <SparklesIcon className="size-4 text-foreground" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <MoreVerticalIcon className="size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>
                <ArchiveIcon className="size-4" />
                <span>Archive</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings2Icon className="size-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <Trash2Icon className="size-4" />
                <span>Delete</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <MailPlusIcon className="size-4" />
                <span>Mark as unread</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FolderOpenIcon className="size-4" />
                <span>Move to folder</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={clearSelectedEmail}
            className="hidden md:flex"
          >
            <XIcon className="size-4 text-muted-foreground" />
          </Button>
          <p className="hidden sm:block text-[11px] md:text-[13px] text-muted-foreground whitespace-nowrap">
            {currentIndex + 1} from {emails.length}
          </p>
          <div className="flex items-center gap-0.5 md:gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={goToPreviousEmail}
              disabled={isFirstEmail}
            >
              <ChevronLeftIcon
                className={cn(
                  "size-4",
                  isFirstEmail
                    ? "text-muted-foreground/30"
                    : "text-muted-foreground"
                )}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={goToNextEmail}
              disabled={isLastEmail}
            >
              <ChevronRightIcon
                className={cn(
                  "size-4",
                  isLastEmail
                    ? "text-muted-foreground/30"
                    : "text-muted-foreground"
                )}
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b border-border px-3 md:px-6 py-3 md:py-4">
        <div className="flex items-start md:items-center justify-between gap-2 md:gap-4">
          <div className="flex items-start md:items-center gap-2 md:gap-2.5 flex-1 min-w-0">
            <Avatar className="size-8 md:size-10 shrink-0">
              <AvatarImage src={email.from.avatar} alt={email.from.name} />
              <AvatarFallback>{email.from.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="font-medium text-sm md:text-base text-foreground truncate">
                  {email.from.name}
                </p>
                {email.from.verified && (
                  <VerifiedIcon className="size-3 md:size-4 shrink-0" />
                )}
              </div>
              <p className="text-[12px] md:text-[14px] text-muted-foreground truncate">
                <span className="hidden sm:inline">From: </span>
                <span className="text-foreground">{email.from.email}</span>
              </p>
              <p className="text-[11px] md:hidden text-muted-foreground mt-0.5">
                {format(email.date, "MMM dd, yyyy")}
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <p className="hidden lg:block text-[14px] text-muted-foreground opacity-70 whitespace-nowrap">
              {format(email.date, "MMMM dd, yyyy hh:mm")}
            </p>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => toggleStar(email.id)}
            >
              <StarIcon
                className={cn(
                  "size-4",
                  email.starred
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-muted-foreground"
                )}
              />
            </Button>
            <Button variant="ghost" size="icon-sm" className="hidden lg:flex">
              <CircleArrowOutUpRightIcon className="size-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon-sm" className="hidden lg:flex">
              <ReceiptTextIcon className="size-4 text-muted-foreground" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <MoreVerticalIcon className="size-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="lg:hidden">
                  <CircleArrowOutUpRightIcon className="size-4" />
                  <span>Reply</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="lg:hidden">
                  <ReceiptTextIcon className="size-4" />
                  <span>Forward</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="lg:hidden" />
                <DropdownMenuItem>
                  <ArchiveIcon className="size-4" />
                  <span>Archive</span>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon className="size-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex md:hidden items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => toggleStar(email.id)}
            >
              <StarIcon
                className={cn(
                  "size-4",
                  email.starred
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-muted-foreground"
                )}
              />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <MoreVerticalIcon className="size-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <CircleArrowOutUpRightIcon className="size-4" />
                  <span>Reply</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ReceiptTextIcon className="size-4" />
                  <span>Forward</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <ArchiveIcon className="size-4" />
                  <span>Archive</span>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon className="size-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 md:px-6 py-3 md:py-4">
        <p className="mb-3 md:mb-4 text-[18px] md:text-[20px] font-medium leading-tight tracking-tight text-foreground">
          {email.subject}
        </p>

        <div className="whitespace-pre-wrap text-[13px] md:text-[14px] leading-relaxed tracking-tight text-foreground/80 dark:text-[#cccccc]">
          {email.body}
        </div>

        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-4 md:mt-6">
            <div className="mb-2 flex items-center gap-1.5">
              <p className="text-[12px] md:text-[13px] font-semibold text-foreground">
                Attachment
              </p>
              <div className="flex items-center gap-0.5">
                <p className="text-[11px] md:text-[12px] text-muted-foreground">
                  Secure by
                </p>
                <p className="text-[11px] md:text-[12px] text-foreground">
                  data.ai
                </p>
                <ShieldIcon className="size-3 md:size-4 text-[#38bdf8]" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {email.attachments.map((attachment) => {
                const FileIconComponent = getFileIcon(attachment.type);
                const gradient = getFileGradient(attachment.type);

                return (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-2 rounded-md border border-border bg-muted px-2 md:px-3 py-1.5"
                  >
                    <div
                      className="size-5 md:size-6 shrink-0 flex items-center justify-center rounded"
                      style={{
                        background: `linear-gradient(135deg, ${gradient.start}, ${gradient.end})`,
                      }}
                    >
                      <FileIconComponent className="size-3 md:size-3.5 text-white" />
                    </div>
                    <div className="leading-tight">
                      <p className="text-[12px] md:text-[13px] font-medium text-foreground truncate max-w-[150px] md:max-w-none">
                        {attachment.name}
                      </p>
                      <p className="text-[11px] md:text-[12px] text-muted-foreground">
                        {attachment.size}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
