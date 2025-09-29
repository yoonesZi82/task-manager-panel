import React from "react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavbarDashboard from "./navbar-dashboard/NavbarDashboard";
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="!rounded-xl">
        <NavbarDashboard />
        <main className="py-5 w-full h-full container">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
