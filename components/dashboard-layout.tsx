import React from "react";
import Sidebar from "./sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-[20%] w-[80%] p-8">{children}</main>
    </div>
  );
}
