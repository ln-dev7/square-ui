"use client";

import { ProjectsSidebar } from "@/components/projects/projects-sidebar";
import { ProjectsTopBar } from "@/components/projects/projects-topbar";
import { ProjectsHeader } from "@/components/projects/projects-header";
import { ProjectsTimeline } from "@/components/projects/projects-timeline";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider className="bg-sidebar">
      <ProjectsSidebar />
      <div className="h-svh overflow-hidden lg:py-2 lg:pr-2 w-full">
        <div className="lg:border lg:rounded-2xl overflow-hidden flex flex-col items-center justify-start bg-container h-full w-full bg-background">
          <ProjectsTopBar />
          <ProjectsHeader />
          <ProjectsTimeline />
        </div>
      </div>
    </SidebarProvider>
  );
}
