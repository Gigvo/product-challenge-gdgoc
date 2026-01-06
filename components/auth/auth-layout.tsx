"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export default function AuthLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col">
      <div className="">
        <Button
          onClick={() => router.back()}
          className="absolute top-8 left-8 z-2"
        ></Button>
      </div>
      <div className="flex-1 bg-white flex items-center rounded-t-[2rem] lg:rounded-t-none lg:rounded-l-[2rem] -mt-8 lg:mt-0 lg:-ml-12 relative z-10">
        <div className="w-full h-full flex items-center py-8 px-6 lg:py-12 lg:pl-16 xl:pl-24 lg:pr-16 xl:pr-24">
          <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-6 lg:mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#202E55] to-[#9955A0] bg-clip-text text-transparent mb-3 lg:mb-4">
                {title}
              </h1>
              <p className="text-[#202E55] text-xs lg:text-sm leading-relaxed px-4 lg:px-0">
                {description}
              </p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
