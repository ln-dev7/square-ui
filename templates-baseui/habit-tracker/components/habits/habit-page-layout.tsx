import { SidebarProvider } from "@/components/ui/sidebar";
import { HabitSidebar } from "@/components/habits/habit-sidebar";
import { HabitHeader } from "@/components/habits/habit-header";

export function HabitPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-sidebar">
      <HabitSidebar />
      <div className="h-svh overflow-hidden w-full">
        <div className="overflow-hidden flex flex-col h-full w-full bg-background">
          <HabitHeader />
          <main className="w-full flex-1 overflow-auto">
            <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
