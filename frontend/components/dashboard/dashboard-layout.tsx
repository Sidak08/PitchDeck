"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Trophy,
  Home,
  Calendar,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  BarChart3,
  Users,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "competitor" | "organizer" | "admin";
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  } | null>(null);

  useEffect(() => {
    // Fetch user info for profile display
    fetch("http://localhost:5000/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser({
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            avatar: data.user.avatar || undefined,
          });
        }
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      window.location.href = "/";
    } catch {}
  };

  const getNavigationItems = () => {
    switch (role) {
      case "competitor":
        return [
          { name: "Dashboard", href: "/dashboard/competitor", icon: Home },
          {
            name: "Competitions",
            href: "/dashboard/competitor/competitions",
            icon: Trophy,
          },
          {
            name: "Applications",
            href: "/dashboard/competitor/applications",
            icon: Calendar,
          },
          {
            name: "Profile",
            href: "/dashboard/competitor/profile",
            icon: User,
          },
        ];
      case "organizer":
        return [
          { name: "Dashboard", href: "/dashboard/organizer", icon: Home },
          {
            name: "My Competitions",
            href: "/dashboard/organizer/competitions",
            icon: Trophy,
          },
          {
            name: "Create Competition",
            href: "/dashboard/organizer/create",
            icon: Plus,
          },
          {
            name: "Analytics",
            href: "/dashboard/organizer/analytics",
            icon: BarChart3,
          },
        ];
      case "admin":
        return [
          { name: "Dashboard", href: "/dashboard/admin", icon: Home },
          {
            name: "Applications",
            href: "/dashboard/admin/applications",
            icon: Calendar,
          },
          { name: "Users", href: "/dashboard/admin/users", icon: Users },
          {
            name: "Analytics",
            href: "/dashboard/admin/analytics",
            icon: BarChart3,
          },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  // Ensure consistent rendering between server and client
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return null or a loading state until client-side hydration is complete
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#D9D9D9] dark:bg-gradient-to-br dark:from-[#102338] dark:via-[#152a45] dark:to-[#193252]"></div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D9D9D9] dark:bg-gradient-to-br dark:from-[#102338] dark:via-[#152a45] dark:to-[#193252] flex flex-col lg:flex-row overflow-hidden">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-900 dark:text-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex flex-col pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <Trophy className="h-8 w-8 text-[#19613F] dark:text-[#2CA15F]" />
                <Link href="/">
                  <span className="ml-2 font-bold text-xl gradient-text cursor-pointer">
                    The Pitch Deck
                  </span>
                </Link>
              </div>
              <nav className="mt-5 space-y-1 px-2 py-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-[#19613F] dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-[#2CA15F]"
                  >
                    <item.icon className="mr-4 h-6 w-6" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
        <div className="h-auto sticky top-0 flex flex-col bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-800 shadow-md">
          <div className="flex flex-col pt-5 pb-4">
            <div className="flex items-center flex-shrink-0 px-4">
              <Trophy className="h-8 w-8 text-[#19613F] dark:text-[#2CA15F]" />
              <Link href="/">
                <span className="ml-2 font-bold text-xl gradient-text cursor-pointer">
                  The Pitch Deck
                </span>
              </Link>
            </div>
            <nav className="mt-5 px-4 space-y-2 py-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-[#19613F] dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-[#2CA15F]"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div
          suppressHydrationWarning
          className="sticky top-0 z-50 flex-shrink-0 flex h-16 bg-white dark:bg-gray-900 dark:text-white shadow-md"
        >
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#2CA15F] lg:hidden dark:border-gray-700 dark:text-gray-300"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600 dark:text-gray-300 dark:focus-within:text-gray-200">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    {/* Search icon can go here */}
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link
                    href={
                      role === "competitor"
                        ? "/dashboard/competitor"
                        : role === "organizer"
                          ? "/dashboard/organizer"
                          : "/dashboard/admin"
                    }
                  >
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Avatar className="h-8 w-8 border border-[#19613F]/20 dark:border-[#2CA15F]/30">
                        <AvatarImage
                          src={
                            user?.avatar ||
                            "/placeholder.svg?height=32&width=32"
                          }
                          alt="User"
                        />
                        <AvatarFallback>
                          {user ? user.firstName.charAt(0).toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user ? `${user.firstName} ${user.lastName}` : "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user ? user.email : "user@example.com"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <main
          suppressHydrationWarning
          className="flex-1 bg-[#D9D9D9] dark:bg-gradient-to-br dark:from-[#102338] dark:via-[#152a45] dark:to-[#193252] min-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <div className="py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
