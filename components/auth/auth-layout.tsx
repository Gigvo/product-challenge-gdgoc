"use client";

import { ReactNode } from "react";
import { Gemini } from "@lobehub/icons";

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
  return (
    <div className="flex flex-row">
      <div className="min-h-screen flex flex-col flex-1">
        <div className="flex-1 flex items-center rounded-t-[2rem] lg:rounded-t-none lg:rounded-l-[2rem] -mt-8 lg:mt-0 lg:-ml-12 relative z-10">
          <div className="w-full h-full flex items-center py-8 px-6 lg:py-12 lg:pl-16 xl:pl-24 lg:pr-16 xl:pr-24">
            <div className="w-full max-w-2xl mx-auto">
              <div className="text-center mb-6 lg:mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold  mb-3 lg:mb-4">
                  {title}
                </h1>
                <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed px-4 lg:px-0">
                  {description}
                </p>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 items-center justify-center bg-gradient-to-b from-background to-muted/20 max-lg:hidden">
        <h3 className="font-bold text-2xl">AI Powered Recruitment</h3>
        <div className="flex flex-row gap-2">
          <p>with</p>
          <div className="flex flex-row gap-1 items-center">
            <Gemini.Color size={24} />
            <Gemini.Text size={24} />
          </div>
        </div>
        <p className="text-center text-muted-foreground w-[70%] mt-2">
          Streamline your hiring process with intelligent CV screening,
          automated skill extraction, and advanced candidate matching—making
          recruitment smarter and faster.
        </p>
        <div className="flex flex-row gap-8 my-8">
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="font-bold text-2xl">95%</p>
            <p className="text-sm text-gray-300">Accuracy Rate</p>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="font-bold text-2xl">3x Faster</p>
            <p className="text-sm text-gray-300">Recruitment Process</p>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="font-bold text-2xl">100%</p>
            <p className="text-sm text-gray-300">Automated Screening</p>
          </div>
        </div>
      </div>
    </div>
  );
}
