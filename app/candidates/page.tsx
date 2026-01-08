import React from "react";
import Sidebar from "@/components/sidebar";
import DashboardLayout from "@/components/dashboard-layout";

export default function Candidates() {
  return (
    <DashboardLayout>
      <div className="flex">
        <Sidebar />
        <div className="p-8">Candidates</div>
      </div>
    </DashboardLayout>
  );
}
