import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="border-b border-white  fixed h-20 w-full flex flex-row justify-between p-4">
      <p>AI Recruitment Platform</p>
      <div className="flex flex-row gap-4">
        <Link href={"/auth/login"}>
          <Button variant="outline">Sign In</Button>
        </Link>
        <Link href={"/auth/register"}>
          <Button variant="outline">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
