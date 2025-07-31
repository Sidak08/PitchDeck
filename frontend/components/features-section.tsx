import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Calendar, Trophy, Users, BookOpen, Award } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Discover Competitions",
    description:
      "Browse through hundreds of case competitions from top business schools and organizations.",
  },
  {
    icon: Calendar,
    title: "Easy Application",
    description:
      "Apply to multiple competitions with streamlined forms and track your application status.",
  },
  {
    icon: Trophy,
    title: "Host Your Own",
    description:
      "Organize and manage your own case competitions with our comprehensive hosting tools.",
  },
  {
    icon: Users,
    title: "Team Formation",
    description:
      "Connect with other competitors and form teams for collaborative competitions.",
  },
  {
    icon: BookOpen,
    title: "Resources & Prep",
    description:
      "Access case study materials, frameworks, and preparation guides from industry experts.",
  },
  {
    icon: Award,
    title: "Recognition",
    description:
      "Showcase your achievements and build your profile with competition wins and participation.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#D9D9D9] dark:bg-gradient-to-br dark:from-[#102338] dark:via-[#152a45] dark:to-[#193252] dark:text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('/images/competition-pattern.jpg')] bg-cover bg-center mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 dark:text-card-foreground">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto dark:text-gray-300">
            From discovering competitions to hosting your own, we provide all
            the tools you need for case competition success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 border-[#19613F]/20 hover:scale-105 backdrop-blur-sm bg-white/80 dark:bg-[#1a3047]/80 dark:border-[#2CA15F]/20 dark:hover:shadow-[0_0_15px_rgba(44,161,95,0.2)]"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-[#19613F]/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-7 w-7 text-[#19613F]" />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black dark:text-gray-200 text-base">
                  {feature.description}
                </CardDescription>
                <div className="mt-4 w-16 h-1 bg-[#2CA15F] rounded-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
