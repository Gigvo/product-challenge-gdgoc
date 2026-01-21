import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const isLoggedIn = !!token;

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/60 border-b border-sidebar-border">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-md p-2 bg-gradient-to-br from-primary to-accent text-white">
            <span className="font-bold">AI</span>
          </div>
          <span className="font-semibold text-lg">AI Recruitment</span>
        </Link>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-md bg-card/50 border border-border text-sm hover:bg-card"
              >
                Dashboard
              </Link>
              <Link
                href="/auth/logout"
                className="px-4 py-2 rounded-md bg-destructive text-white text-sm"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-primary to-accent text-white text-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
