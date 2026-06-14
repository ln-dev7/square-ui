import { PayrollsSidebar } from "@/components/payrolls/sidebar";
import { PayrollsHeader } from "@/components/payrolls/header";
import { PayrollsContent } from "@/components/payrolls/content";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PayrollsPage() {
  return (
    <SidebarProvider className="bg-sidebar">
      <PayrollsSidebar />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col items-center justify-start bg-container h-full w-full bg-background">
          <PayrollsHeader />
          <PayrollsContent />
        </div>
      </div>
    </SidebarProvider>
  );
}
