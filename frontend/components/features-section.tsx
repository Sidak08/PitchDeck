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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 dark:text-card-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 dark:text-card-foreground">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
            From discovering competitions to hosting your own, we provide all
            the tools you need for case competition success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
