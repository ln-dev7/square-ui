import { TasksSidebar } from "@/components/tasks/sidebar/tasks-sidebar";
import { TasksHeader } from "@/components/tasks/header/tasks-header";
import { TasksMain } from "@/components/tasks/tasks-main";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      <TasksSidebar />
      <div className="flex-1 flex flex-col overflow-hidden h-screen">
        <TasksHeader />
        <main className="flex-1 overflow-auto">
          <TasksMain />
        </main>
      </div>
    </SidebarProvider>
  );
}
