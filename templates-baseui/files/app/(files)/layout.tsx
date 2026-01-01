import { SidebarProvider } from "@/components/ui/sidebar";
import { FilesSidebar } from "@/components/files/sidebar";
import { FilesHeader } from "@/components/files/header";

export default function FilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-sidebar">
      <FilesSidebar />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-xl overflow-hidden flex flex-col items-center justify-start h-full w-full bg-background">
          <FilesHeader />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}

