import Link from "next/link";
import { Trophy, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white dark:bg-gray-900 dark:text-card-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">The Pitch Deck</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md dark:text-gray-300">
              The all-in-one platform to discover, apply to, and host business
              case competitions.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-300">
                <Mail className="h-4 w-4" />
                <span>hello@thepitchdeck.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/competitions"
                  className="text-gray-400 hover:text-white dark:text-gray-300 dark:hover:text-card-foreground transition-colors"
                >
                  Competitions
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white dark:text-gray-300 dark:hover:text-card-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/winners"
                  className="text-gray-400 hover:text-white dark:text-gray-300 dark:hover:text-card-foreground transition-colors"
                >
                  Past Winners
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white dark:text-gray-300 dark:hover:text-card-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="font-semibold text-lg mb-4">For Students</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/auth/signup"
                  className="text-gray-400 hover:text-white dark:text-gray-300 dark:hover:text-card-foreground transition-colors"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-400 hover:text-white dark:text-gray-300 dark:hover:text-card-foreground transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-gray-400 hover:text-white dark:text-gray-300 dark:hover:text-card-foreground transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white dark:text-gray-300 dark:hover:text-card-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white dark:text-gray-300 dark:hover:text-card-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 The Pitch Deck. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
