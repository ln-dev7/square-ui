"use client";

import { useEffect, useState, useRef } from "react";
import { EmailsVerticalSidebar } from "@/components/emails/emails-vertical-sidebar";
import { EmailsVerticalSidebarMobile } from "@/components/emails/emails-vertical-sidebar-mobile";
import { EmailsHeader } from "@/components/emails/emails-header";
import { EmailsHorizontalNav } from "@/components/emails/emails-horizontal-nav";
import { EmailList } from "@/components/emails/email-list";
import { EmailDetail } from "@/components/emails/email-detail";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEmailsStore } from "@/store/emails-store";
import { useIsMobile } from "@/hooks/use-mobile";

export default function EmailsPage() {
  const { emails, selectedEmailId, selectEmail, clearSelectedEmail } =
    useEmailsStore();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    // Select first email on desktop only on initial load
    // Wait for isMobile to be initialized (not undefined)
    if (
      isMobile !== undefined &&
      !isMobile &&
      emails.length > 0 &&
      !selectedEmailId &&
      !hasInitializedRef.current
    ) {
      selectEmail(emails[0].id);
      hasInitializedRef.current = true;
    }
  }, [emails, selectedEmailId, selectEmail, isMobile]);

  const handleEmailClick = (emailId: string) => {
    if (isMobile) {
      selectEmail(emailId);
      setDrawerOpen(true);
    }
  };

  const handleDrawerClose = (open: boolean) => {
    setDrawerOpen(open);
    if (!open) {
      clearSelectedEmail();
    }
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Vertical Sidebar - Desktop */}
        <div className="hidden md:block">
          <EmailsVerticalSidebar />
        </div>

        {/* Vertical Sidebar - Mobile Sheet */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent
            side="left"
            className="w-[240px] p-0 border-none [&>button]:hidden"
          >
            <EmailsVerticalSidebarMobile
              onItemClick={() => setSidebarOpen(false)}
            />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top Header */}
          <EmailsHeader onMobileMenuClick={() => setSidebarOpen(true)} />

          {/* Horizontal Navigation - Hidden on mobile */}
          <div className="hidden md:block">
            <EmailsHorizontalNav />
          </div>

          {/* Content Area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Email List - Full width on mobile */}
            <div className="w-full md:w-[320px] border-r border-border">
              <EmailList onEmailClick={handleEmailClick} />
            </div>

            {/* Email Detail - Hidden on mobile, shown in drawer */}
            <div className="hidden md:block flex-1">
              <EmailDetail />
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <Drawer open={drawerOpen} onOpenChange={handleDrawerClose}>
          <DrawerContent className="h-[90vh]">
            <div className="flex-1 f-full overflow-hidden">
              <EmailDetail />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </TooltipProvider>
  );
}
