"use client";

import React, { useState } from "react";
import Sidebar from "./sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} onToggle={() => setOpen((v) => !v)} />
      {/* mobile overlay behind sidebar, click to close */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <main
        className={`ml-0 w-full transition-all duration-300 p-4 lg:p-8 ${
          open ? "lg:ml-[250px]" : "lg:ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
