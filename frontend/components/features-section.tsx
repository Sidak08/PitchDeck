"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Search, Calendar, Trophy, Users, BookOpen, Award } from "lucide-react";
import {
  AnimatedElement,
  FloatingElements,
  ParallaxElement,
} from "@/components/animations";
import { motion } from "framer-motion";

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
      <FloatingElements count={8} minSize={60} maxSize={150} />
      <ParallaxElement speed={-0.2} className="absolute inset-0">
        <div className="absolute inset-0 opacity-5 bg-[url('/images/competition-pattern.jpg')] bg-cover bg-center mix-blend-overlay"></div>
      </ParallaxElement>
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedElement animation="slideUp" delay={0.2}>
          <div className="text-center mb-16">
            <motion.div
              className="text-3xl sm:text-4xl font-bold text-black mb-4 dark:text-card-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Everything You Need to Succeed
            </motion.div>
            <motion.p
              className="text-xl text-black max-w-3xl mx-auto dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              From discovering competitions to hosting your own, we provide all
              the tools you need for case competition success.
            </motion.p>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedElement
              key={index}
              animation="zoom"
              delay={0.3 + index * 0.1}
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Card className="border-[#19613F]/20 backdrop-blur-sm bg-white/80 dark:bg-[#1a3047]/80 dark:border-[#2CA15F]/20 dark:hover:shadow-[0_0_15px_rgba(44,161,95,0.2)]">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="p-3 bg-[#19613F]/10 rounded-lg flex items-center justify-center"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        animate={{
                          y: [0, 5, 0],
                          rotate: [0, 5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: index * 0.2,
                        }}
                      >
                        <feature.icon className="h-7 w-7 text-[#19613F]" />
                      </motion.div>
                      <div className="text-xl font-bold">{feature.title}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-black dark:text-gray-200 text-base">
                      {feature.description}
                    </CardDescription>
                    <motion.div
                      className="mt-4 h-1 bg-[#2CA15F] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "4rem" }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: 0.5 + index * 0.1,
                        ease: "easeOut",
                      }}
                    ></motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
