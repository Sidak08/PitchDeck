import { SignupForm } from "@/components/auth/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Trophy } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D9D9D9] dark:bg-gradient-to-br dark:from-[#102338] dark:via-[#152a45] dark:to-[#193252] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-10">
        <div className="text-center">
          <Link
            href="/"
            className="flex items-center justify-center space-x-3 mb-8"
          >
            <Trophy className="h-9 w-9 text-[#19613F] dark:text-[#2CA15F]" />
            <span className="font-bold text-xl gradient-text">
              The Pitch Deck
            </span>
          </Link>
        </div>

        <Card className="border-[#19613F]/20 dark:border-[#2CA15F]/30 dark:bg-gray-900/90 dark:backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-center">
              Create Account
            </CardTitle>
            <CardDescription className="text-center pt-2">
              Join The Pitch Deck community today
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <SignupForm />
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-[#19613F] hover:text-[#2CA15F] dark:text-[#2CA15F] dark:hover:text-[#3dd67f]"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
