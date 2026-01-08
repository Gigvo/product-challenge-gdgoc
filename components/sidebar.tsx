import React from "react";
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
    <aside className="h-screen w-[20%] min-w-[250px] flex flex-col gap-6 border-r border-gray-200 pt-10 fixed left-0 top-0 bg-sidebar text-sidebar-foreground">
      <p className="text-xl font-bold p-4">AI Driven Talent Matching</p>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex items-center px-4 py-2 text-sm font-medium hover:text-sidebar-primary hover:bg-sidebar-accent"
        >
          <item.icon className="w-5 h-5 mr-3" />
          <p className="text-lg">{item.name}</p>
        </Link>
      ))}
    </aside>
  );
}
