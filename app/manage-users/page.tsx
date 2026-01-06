import React from "react";
import Sidebar from "@/components/sidebar";
import AddUserForm from "@/modules/auth/add-user";

export default function ManageUsers() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8">
        <h3>User Management</h3>
        <AddUserForm />
      </div>
    </div>
  );
}
