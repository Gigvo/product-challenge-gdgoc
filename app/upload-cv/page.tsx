import React from "react";
import Sidebar from "@/components/sidebar";
import DashboardLayout from "@/components/dashboard-layout";

export default function UploadCV() {
  return (
    <DashboardLayout>
      <div className="flex">
        <Sidebar />
        <div className="p-8">UploadCV</div>
      </div>
    </DashboardLayout>
  );
}
