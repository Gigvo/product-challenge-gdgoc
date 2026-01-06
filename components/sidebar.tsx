import React, { use } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Upload,
  UserPlus,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    adminOnly: false,
  },
  {
    name: "Job Vacancies",
    href: "/job-vacancies",
    icon: Briefcase,
    adminOnly: false,
  },
  { name: "Candidates", href: "/candidates", icon: Users, adminOnly: false },
  { name: "Upload CV", href: "/upload-cv", icon: Upload, adminOnly: false },
  {
    name: "Manage Users",
    href: "/manage-users",
    icon: UserPlus,
    adminOnly: true,
  },
];

export default function Sidebar() {
  return (
    <div className="h-screen w-[20%] left-0 flex flex-col gap-6 bg-gray-200">
      <p className="text-xl font-bold p-4">AI Driven Talent Matching</p>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <item.icon className="w-5 h-5 mr-3" />
          <p className="text-lg">{item.name}</p>
        </Link>
      ))}
    </div>
  );
}
