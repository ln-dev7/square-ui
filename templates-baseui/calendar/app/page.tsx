import { CalendarSidebar } from "@/components/calendar/calendar-sidebar";
import { CalendarHeader } from "@/components/calendar/calendar-header";
import { CalendarControls } from "@/components/calendar/calendar-controls";
import { CalendarView } from "@/components/calendar/calendar-view";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider className="bg-sidebar">
      <CalendarSidebar />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col items-center justify-start bg-container h-full w-full bg-background">
          <div className="w-full">
            <CalendarHeader />
            <CalendarControls />
          </div>
          <div className="flex-1 overflow-hidden w-full">
            <CalendarView />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
