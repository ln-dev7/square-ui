import { create } from "zustand";
import {
  format,
  startOfWeek,
  addWeeks,
  subWeeks,
  addDays,
  getDay,
} from "date-fns";
import { Event, events, addEvent as addEventToStore } from "@/mock-data/events";

interface CalendarState {
  currentWeekStart: Date;
  searchQuery: string;
  eventTypeFilter: "all" | "with-meeting" | "without-meeting";
  participantsFilter: "all" | "with-participants" | "without-participants";
  goToNextWeek: () => void;
  goToPreviousWeek: () => void;
  goToToday: () => void;
  goToDate: (date: Date) => void;
  setSearchQuery: (query: string) => void;
  setEventTypeFilter: (
    filter: "all" | "with-meeting" | "without-meeting"
  ) => void;
  setParticipantsFilter: (
    filter: "all" | "with-participants" | "without-participants"
  ) => void;
  addEvent: (event: Omit<Event, "id">) => void;
  getCurrentWeekEvents: () => Event[];
  getWeekDays: () => Date[];
}

const BASE_WEEK_START = new Date("2024-02-04");

function getDayOfWeek(date: Date): number {
  const day = getDay(date);
  return day === 0 ? 6 : day - 1;
}

function getEventsForWeek(startDate: Date): Event[] {
  const weekEvents: Event[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDay = addDays(startDate, i);
    const currentDayOfWeek = getDayOfWeek(currentDay);

    events.forEach((event) => {
      const eventDate = new Date(event.date);
      const eventDayOfWeek = getDayOfWeek(eventDate);

      if (eventDayOfWeek === currentDayOfWeek) {
        const eventDateStr = format(currentDay, "yyyy-MM-dd");
        weekEvents.push({
          ...event,
          id: `${event.id}-${eventDateStr}`,
          date: eventDateStr,
        });
      }
    });
  }

  return weekEvents;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentWeekStart: startOfWeek(new Date(), { weekStartsOn: 1 }),
  searchQuery: "",
  eventTypeFilter: "all",
  participantsFilter: "all",

  goToNextWeek: () =>
    set((state) => ({
      currentWeekStart: addWeeks(state.currentWeekStart, 1),
    })),

  goToPreviousWeek: () =>
    set((state) => ({
      currentWeekStart: subWeeks(state.currentWeekStart, 1),
    })),

  goToToday: () =>
    set({
      currentWeekStart: startOfWeek(new Date(), { weekStartsOn: 1 }),
    }),

  goToDate: (date: Date) =>
    set({
      currentWeekStart: startOfWeek(date, { weekStartsOn: 1 }),
    }),

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setEventTypeFilter: (filter: "all" | "with-meeting" | "without-meeting") =>
    set({ eventTypeFilter: filter }),
  setParticipantsFilter: (
    filter: "all" | "with-participants" | "without-participants"
  ) => set({ participantsFilter: filter }),

  addEvent: (event: Omit<Event, "id">) => {
    addEventToStore(event);
  },

  getCurrentWeekEvents: () => {
    const state = get();
    let weekEvents = getEventsForWeek(state.currentWeekStart);

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      weekEvents = weekEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.participants.some((p) => p.toLowerCase().includes(query))
      );
    }

    if (state.eventTypeFilter === "with-meeting") {
      weekEvents = weekEvents.filter((event) => event.meetingLink);
    } else if (state.eventTypeFilter === "without-meeting") {
      weekEvents = weekEvents.filter((event) => !event.meetingLink);
    }

    if (state.participantsFilter === "with-participants") {
      weekEvents = weekEvents.filter((event) => event.participants.length > 0);
    } else if (state.participantsFilter === "without-participants") {
      weekEvents = weekEvents.filter(
        (event) => event.participants.length === 0
      );
    }

    return weekEvents;
  },

  getWeekDays: () => {
    const state = get();
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(state.currentWeekStart, i));
    }
    return days;
  },
}));
