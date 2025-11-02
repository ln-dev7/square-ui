import { TaskSidebar } from '@/components/task/task-sidebar';
import { TaskHeader } from '@/components/task/task-header';
import { TaskBoard } from '@/components/task/task-board';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <TaskSidebar />
      <div className="flex-1 flex flex-col overflow-hidden h-screen">
        <TaskHeader />
        <main className="w-full h-full overflow-x-auto">
          <TaskBoard />
        </main>
      </div>
    </SidebarProvider>
  );
}
