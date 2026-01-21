import React from "react";
import Sidebar from "@/components/sidebar";
import AddUserForm from "@/modules/auth/add-user";
import DashboardLayout from "@/components/dashboard-layout";

export default function ManageUsers() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h3 className="font-bold text-3xl mb-8">User Management</h3>
        <AddUserForm />
      </div>
    </DashboardLayout>
  );
}
