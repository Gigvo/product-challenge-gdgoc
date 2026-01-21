"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  UserPlus,
  Home,
} from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Job Vacancies",
    href: "/job-vacancies",
    icon: Briefcase,
  },
  { name: "Candidates", href: "/candidates", icon: Users },
  {
    name: "Manage Users",
    href: "/manage-users",
    icon: UserPlus,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };
  return (
    <aside className="h-screen w-[20%] min-w-[250px] z-40 flex flex-col justify-between rounded-r-xl fixed left-0 top-0 bg-sidebar text-sidebar-foreground">
      <div>
        <p className="text-xl font-bold p-4 border-b">
          AI Driven Talent Matching
        </p>
        <div className="flex flex-col gap-4 p-2 mt-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium hover:text-sidebar-primary hover:bg-sidebar-accent rounded-lg ${isActive ? "text-sidebar-primary bg-sidebar-accent" : ""}`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <p className="text-lg">{item.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <Button
        className="rounded-br-xl rounded-l-[0] rounded-tr-[0]"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </aside>
  );
}
