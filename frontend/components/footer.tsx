import Link from "next/link";
import { Trophy, Mail } from "lucide-react";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer
      className={`bg-[#19613F] text-white dark:bg-gradient-to-br dark:from-[#102338] dark:via-[#0f2030] dark:to-[#0c1a2e] dark:text-white py-12 px-4 sm:px-6 lg:px-8 dark:border-t dark:border-[#2CA15F]/20 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="h-8 w-8 text-[#2CA15F] dark:text-[#3dd67f] dark:drop-shadow-[0_0_5px_rgba(44,161,95,0.5)]" />
              <span className="font-bold text-xl">The Pitch Deck</span>
            </div>
            <p className="text-[#D9D9D9] mb-4 max-w-md dark:text-gray-300">
              The all-in-one platform to discover, apply to, and host business
              case competitions.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-[#D9D9D9] dark:text-gray-300">
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
                  className="text-[#D9D9D9] hover:text-[#2CA15F] dark:text-gray-200 dark:hover:text-[#3dd67f] transition-colors"
                >
                  Competitions
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#D9D9D9] hover:text-[#2CA15F] dark:text-gray-200 dark:hover:text-[#3dd67f] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/winners"
                  className="text-[#D9D9D9] hover:text-[#2CA15F] dark:text-gray-200 dark:hover:text-[#3dd67f] transition-colors"
                >
                  Past Winners
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#D9D9D9] hover:text-[#2CA15F] dark:text-gray-200 dark:hover:text-[#3dd67f] transition-colors"
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
                  className="text-[#D9D9D9] hover:text-[#2CA15F] dark:text-gray-200 dark:hover:text-[#3dd67f] transition-colors"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-[#D9D9D9] hover:text-[#2CA15F] dark:text-gray-200 dark:hover:text-[#3dd67f] transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-[#D9D9D9] hover:text-[#2CA15F] dark:text-gray-200 dark:hover:text-[#3dd67f] transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#D9D9D9] hover:text-[#2CA15F] dark:text-gray-200 dark:hover:text-[#3dd67f] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[#D9D9D9] hover:text-[#2CA15F] dark:text-gray-200 dark:hover:text-[#3dd67f] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2CA15F] mt-8 pt-8 text-center text-[#D9D9D9] dark:border-[#3dd67f]/30">
          <p>&copy; 2025 The Pitch Deck. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
