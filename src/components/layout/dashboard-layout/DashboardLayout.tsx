import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <p>nav</p>
      {children}
    </div>
  );
}

export default DashboardLayout;
