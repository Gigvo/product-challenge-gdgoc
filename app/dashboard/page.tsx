import React from "react";
import Sidebar from "@/components/sidebar";
import DashboardLayout from "@/components/dashboard-layout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex">
        <Sidebar />
      </div>
    </DashboardLayout>
  );
}
