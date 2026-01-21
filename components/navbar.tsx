import React from "react";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const isLoggedIn = !!token;
  return (
    <div className="border-b border-white  fixed h-20 w-full flex flex-row justify-between p-4">
      <p>AI Recruitment Platform</p>
      <div className="flex flex-row gap-4">
        {isLoggedIn ? (
          <>
            <Link href="/auth/logout">
              <Button>Logout</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </>
        ) : (
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
