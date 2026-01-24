"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      return res.ok;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      const logged = await checkSession();
      if (mounted) setIsLoggedIn(logged);
    })();

    const onStorage = async () => setIsLoggedIn(await checkSession());
    window.addEventListener("storage", onStorage);

    return () => {
      mounted = false;
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/60 border-b border-sidebar-border">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-semibold text-lg">
            AI Driven Talent Matching
          </span>
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
              <Button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-destructive text-white text-sm"
              >
                Logout
              </Button>
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
