"use client";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import DashboardLayout from "../dashboard-layout/DashboardLayout";
import HomeLayout from "../home-layout/HomeLayout";

function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {isDashboard ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        <HomeLayout>{children}</HomeLayout>
      )}
    </>
  );
}

export default Layout;
