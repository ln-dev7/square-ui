import { EmployeesSidebar } from "@/components/employees/sidebar";
import { EmployeesHeader } from "@/components/employees/header";
import { EmployeesContent } from "@/components/employees/content";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function EmployeesPage() {
  return (
    <SidebarProvider className="bg-sidebar">
      <EmployeesSidebar />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col items-center justify-start bg-container h-full w-full bg-background">
          <EmployeesHeader />
          <EmployeesContent />
        </div>
      </div>
    </SidebarProvider>
  );
}
