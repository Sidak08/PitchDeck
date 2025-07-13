"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Menu, X, Trophy } from "lucide-react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { toast } from "sonner";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    role?: string;
  } | null>(null);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(true);
        setUser({
          firstName: res.data.user?.firstName || "",
          lastName: res.data.user?.lastName || "",
          email: res.data.user?.email || "",
          avatar: res.data.user?.avatar || "",
          role: res.data.user?.role || "",
        });
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      setUser(null);
      window.location.href = "/";
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  const ThemeToggle = () => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-8 w-8 px-0"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-border dark:bg-gray-900/80 dark:text-card-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2"
              passHref
              legacyBehavior
            >
              <a className="flex items-center space-x-2">
                <Trophy className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl gradient-text">
                  The Pitch Deck
                </span>
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/competitions"
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Competitions
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/winners"
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Winners
              </Link>
              {isLoggedIn && user ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href={
                      user.role === "competitor"
                        ? "/dashboard/competitor"
                        : user.role === "organizer"
                        ? "/dashboard/organizer"
                        : "/dashboard/admin"
                    }
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-gray-200"
                    >
                      <span className="font-bold text-primary">
                        {user.firstName.charAt(0).toUpperCase()}
                      </span>
                    </Button>
                  </Link>
                  <div className="flex flex-col ml-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user.firstName}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors border border-primary"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-border dark:bg-gray-900">
            <Link
              href="/competitions"
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Competitions
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              href="/winners"
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Winners
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3 space-x-3">
                <ThemeToggle />
                {isLoggedIn && user ? (
                  <div className="flex items-center space-x-2">
                    <Link
                      href={
                        user.role === "competitor"
                          ? "/dashboard/competitor"
                          : user.role === "organizer"
                          ? "/dashboard/organizer"
                          : "/dashboard/admin"
                      }
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-gray-200"
                      >
                        <span className="font-bold text-primary">
                          {user.firstName.charAt(0).toUpperCase()}
                        </span>
                      </Button>
                    </Link>
                    <div className="flex flex-col ml-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={handleLogout}
                    >
                      Log out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant="ghost" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
