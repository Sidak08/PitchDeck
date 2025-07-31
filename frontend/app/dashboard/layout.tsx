"use client";

import { ReactNode } from "react";
import { useTheme } from "next-themes";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark" : ""} data-theme={theme}>
      <div className="min-h-screen bg-[#D9D9D9] text-foreground flex flex-col">
        <main className="flex-1 bg-[#D9D9D9] dark:bg-gradient-to-br dark:from-[#102338] dark:via-[#152a45] dark:to-[#193252]">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
