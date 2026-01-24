"use client";

import React, { useEffect, useState, useRef } from "react";
type Props = {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  delay?: number;
};

export default function Reveal({
  children,
  className = "",
  once = true,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = window.setTimeout(() => setVisible(true), delay);
          if (once) observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [delay, once]);

  return (
    <div
      ref={ref}
      className={`${className} transform transition-all duration-700 ease-out will-change-transform ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-95"
      }`}
    >
      {children}
    </div>
  );
}
