"use client";

import { format } from "date-fns";
import {
  Pen,
  FileText,
  Layers,
  Trash2,
  X,
  ArrowUpRight,
  CheckCircle2,
  Bell,
  Calendar as CalendarIcon,
  Phone,
  Users,
  FilePlus,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Event } from "@/mock-data/events";
import { useState } from "react";
import { Kbd } from "@/components/ui/kbd";

interface EventSheetProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatTime(time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return format(date, "EEEE, MMMM dd");
}

function getMeetingCode(link?: string): string {
  if (!link) return "";
  const match = link.match(/\/[a-z-]+$/);
  if (match) {
    return match[0].slice(1).replace(/-/g, " ").toUpperCase();
  }
  return "dra-jhgg-mvn";
}

function getParticipantName(participantId: string): string {
  const names: Record<string, string> = {
    user1: "James Brown",
    user2: "Sophia Williams",
    user3: "Arthur Taylor",
    user4: "Emma Wright",
    user5: "Leonel Ngoya",
  };

  return (
    names[participantId] ||
    participantId.charAt(0).toUpperCase() + participantId.slice(1)
  );
}

function getParticipantEmail(participantId: string): string {
  const emails: Record<string, string> = {
    user1: "james11@gmail.com",
    user2: "sophia.williams@gmail.com",
    user3: "arthur@hotmail.com",
    user4: "emma@outlook.com",
    user5: "leonelngoya@gmail.com",
  };

  return emails[participantId] || `${participantId}@gmail.com`;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function EventSheet({ event, open, onOpenChange }: EventSheetProps) {
  const [rsvpStatus, setRsvpStatus] = useState<"yes" | "no" | "maybe" | null>(
    null
  );

  if (!event) return null;

  const dateStr = formatDate(event.date);
  const startTimeStr = formatTime(event.startTime);
  const endTimeStr = formatTime(event.endTime);
  const timezone = event.timezone || "GMT+7 Pontianak";
  const meetingCode = getMeetingCode(event.meetingLink);

  const organizer = event.participants[0] || "user1";
  const organizerName = getParticipantName(organizer);
  const organizerEmail = getParticipantEmail(organizer);
  const otherParticipants = event.participants.slice(1);

  const mockParticipants = [
    {
      id: organizer,
      name: organizerName,
      email: organizerEmail,
      isOrganizer: true,
      rsvp: "yes" as const,
    },
    ...otherParticipants.slice(0, 3).map((p) => ({
      id: p,
      name: getParticipantName(p),
      email: getParticipantEmail(p),
      isOrganizer: false,
      rsvp: "yes" as const,
    })),
    {
      id: "user5",
      name: "Leonel Ngoya",
      email: "leonelngoya@gmail.com",
      isOrganizer: false,
      rsvp: rsvpStatus || ("yes" as const),
      isYou: true,
    },
  ];

  const yesCount = mockParticipants.filter((p) => p.rsvp === "yes").length;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[560px] overflow-y-auto p-0 border-l border-r border-t [&>button]:hidden"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 pt-4 pb-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 hover:bg-muted"
                >
                  <Pen className="size-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 hover:bg-muted"
                >
                  <FileText className="size-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 hover:bg-muted"
                >
                  <Layers className="size-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 hover:bg-muted"
                >
                  <Trash2 className="size-4 text-muted-foreground" />
                </Button>
              </div>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 rounded-full bg-muted hover:bg-muted"
                >
                  <X className="size-4 text-muted-foreground" />
                </Button>
              </SheetClose>
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <SheetTitle className="text-xl font-semibold text-foreground leading-normal">
                {event.title}
              </SheetTitle>
              <div className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground">
                <span>{dateStr}</span>
                <span className="size-1 rounded-full bg-muted-foreground" />
                <span>
                  {startTimeStr} - {endTimeStr}
                </span>
                <span className="size-1 rounded-full bg-muted-foreground" />
                <span>{timezone}</span>
              </div>
            </div>

            <Button variant="outline">
              <span>Propose new time</span>
              <ArrowUpRight className="size-4" />
            </Button>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-4 max-w-[512px] mx-auto">
              <div className="flex flex-col gap-4">
                {mockParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-start gap-3 relative"
                  >
                    <Avatar className="size-7 border-[1.4px] border-background shrink-0">
                      <AvatarImage
                        src={`https://api.dicebear.com/9.x/glass/svg?seed=${participant.id}`}
                      />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 relative">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1 relative">
                            <p className="text-[13px] font-medium text-foreground leading-[18px]">
                              {participant.name}
                            </p>
                            {participant.isOrganizer && (
                              <span className="text-[10px] font-medium text-cyan-500 px-0.5 py-0.5 rounded-full">
                                Organizer
                              </span>
                            )}
                            {participant.isYou && (
                              <span className="text-[10px] font-medium text-foreground px-0.5 py-0.5 rounded-full">
                                You
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground leading-none">
                            {participant.email}
                          </p>
                        </div>
                        <CheckCircle2 className="size-3 text-green-500 shrink-0 absolute right-0 top-[17px]" />
                      </div>
                      {participant.isYou && (
                        <div className="mt-3 flex gap-1.5 bg-muted/50 rounded-lg p-1.5">
                          <Button
                            variant={rsvpStatus === "yes" ? "default" : "ghost"}
                            size="sm"
                            className={`flex-1 h-[30px] text-xs font-medium ${
                              rsvpStatus === "yes"
                                ? "bg-foreground text-background hover:bg-foreground/90 shadow-sm"
                                : "text-muted-foreground"
                            }`}
                            onClick={() => setRsvpStatus("yes")}
                          >
                            Yes
                          </Button>
                          <Button
                            variant={rsvpStatus === "no" ? "default" : "ghost"}
                            size="sm"
                            className={`flex-1 h-[30px] text-xs font-medium ${
                              rsvpStatus === "no"
                                ? "bg-foreground text-background hover:bg-foreground/90 shadow-sm"
                                : "text-muted-foreground"
                            }`}
                            onClick={() => setRsvpStatus("no")}
                          >
                            No
                          </Button>
                          <Button
                            variant={
                              rsvpStatus === "maybe" ? "default" : "ghost"
                            }
                            size="sm"
                            className={`flex-1 h-[30px] text-xs font-medium ${
                              rsvpStatus === "maybe"
                                ? "bg-foreground text-background hover:bg-foreground/90 shadow-sm"
                                : "text-muted-foreground"
                            }`}
                            onClick={() => setRsvpStatus("maybe")}
                          >
                            Maybe
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {event.meetingLink && (
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="size-6 shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-full"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
                          fill="#22C55E"
                        />
                      </svg>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground flex-1">
                      Meeting in Google Meet
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Code: {meetingCode}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 h-8 bg-foreground text-background hover:bg-foreground/90 text-xs font-medium gap-2 shadow-sm"
                      onClick={() => {
                        if (event.meetingLink) {
                          window.open(event.meetingLink, "_blank");
                        }
                      }}
                    >
                      <span>Join Google Meet meeting</span>
                      <div className="flex gap-0.5">
                        <Kbd className="bg-white/14 text-white text-[10.8px] px-1.5 py-1 rounded">
                          ⌘
                        </Kbd>
                        <Kbd className="bg-white/14 text-white text-[10.8px] px-1.5 py-1 rounded w-[18px]">
                          J
                        </Kbd>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-2 text-xs border-border"
                      onClick={() => {
                        if (event.meetingLink) {
                          copyToClipboard(event.meetingLink);
                        }
                      }}
                    >
                      <LinkIcon className="size-4" />
                      <span>Copy link</span>
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="p-1">
                    <Bell className="size-4" />
                  </div>
                  <span>Reminder: 30min before</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="p-1">
                    <CalendarIcon className="size-4" />
                  </div>
                  <span>Organizer: {organizerEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="p-1">
                    <Phone className="size-4" />
                  </div>
                  <span>(US) +1 904-330-1131</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="p-1">
                    <Users className="size-4" />
                  </div>
                  <span>
                    {mockParticipants.length} persons
                    <span className="mx-1">•</span>
                    {yesCount} yes
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="p-1">
                    <FilePlus className="size-4" />
                  </div>
                  <span>Notes from Organizer</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground leading-[1.6]">
                  During today&apos;s daily check-in, we had an in-depth
                  discussion about the MVP (Minimum Viable Product). We agreed
                  on the core features that need to be included, focusing on the
                  AI-conducted interviews and the memoir compilation
                  functionality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
