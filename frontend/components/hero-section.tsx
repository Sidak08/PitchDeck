"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Users, Award, ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AnimatedElement,
  AnimatedText,
  FloatingElements,
  ParallaxElement,
} from "@/components/animations";
import { motion } from "framer-motion";

export function HeroSection() {
  // Check if site is under construction
  const isUnderConstruction =
    process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === "true";

  // No longer need this function as we're replacing it with a dropdown
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#D9D9D9] via-white to-[#D9D9D9] dark:from-[#0c1a2e] dark:via-[#102338] dark:to-[#152a45] dark:text-white relative overflow-hidden">
      <FloatingElements count={12} />
      <ParallaxElement speed={0.2} className="absolute inset-0">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-pattern.jpg')] bg-cover bg-center mix-blend-overlay"></div>
      </ParallaxElement>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center animate-fade-in">
          <AnimatedElement animation="slideUp" delay={0.2}>
            <div className="text-4xl sm:text-6xl font-bold font-serif text-black mb-6 dark:text-card-foreground">
              <AnimatedText
                text="The All-in-One Platform"
                animation="letterByLetter"
                className="gradient-text inline-block"
                staggerChildren={0.02}
              />
              <br />
              <AnimatedText
                text="for Case Competitions"
                animation="wordByWord"
                staggerChildren={0.1}
                delay={1.2}
              />
            </div>
          </AnimatedElement>
          <AnimatedElement animation="fadeIn" delay={1.8}>
            <p className="text-xl text-black mb-8 max-w-3xl mx-auto dark:text-gray-300">
              Discover, apply to, and host business case competitions. Connect
              with top high school talent and compete for amazing prizes.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="slideUp" delay={2.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/competitions">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="text-lg px-8 py-3 bg-[#19613F] hover:bg-[#2CA15F] dark:shadow-[0_0_15px_rgba(44,161,95,0.4)] w-full sm:w-auto"
                  >
                    Explore Cases
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="py-3 bg-transparent border-[#19613F] text-[#19613F] hover:bg-[#19613F] hover:text-white w-full sm:w-auto text-wrap px-2 sm:px-6"
                    >
                      <span className="text-center text-base sm:text-lg">
                        National Executive Recruitment
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <a
                        href="https://forms.gle/EpMfZ9W7YWezhoL56"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        Apply Now
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a
                        href="https://docs.google.com/document/d/17UVO4x1qkW-bstwDQ_oEX6tDxiYXryjoCwtVffZXmmE/edit?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        Info Document
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            </div>
          </AnimatedElement>

          {/* Stats Section - Only shown when not in construction mode */}
          {!isUnderConstruction && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <AnimatedElement animation="zoom" delay={2.6} duration={0.5}>
                <motion.div
                  className="text-center p-5 bg-white/50 dark:bg-[#1a3047]/70 rounded-lg shadow-sm backdrop-blur-sm dark:border dark:border-[#2CA15F]/20"
                  whileHover={{
                    y: -8,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <div className="flex justify-center mb-4">
                    <motion.div
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Trophy className="h-12 w-12 text-[#19613F]" />
                    </motion.div>
                  </div>
                  <motion.h3
                    className="text-3xl font-bold font-serif text-[#2CA15F] mb-2 dark:text-card-foreground"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3.0, duration: 0.5 }}
                  >
                    <AnimatedText
                      text="50+"
                      animation="highlight"
                      delay={3.2}
                    />
                  </motion.h3>
                  <p className="text-black dark:text-gray-300">
                    Active Competitions
                  </p>
                </motion.div>
              </AnimatedElement>

              <AnimatedElement animation="zoom" delay={2.8} duration={0.5}>
                <motion.div
                  className="text-center p-5 bg-white/50 dark:bg-[#1a3047]/70 rounded-lg shadow-sm backdrop-blur-sm dark:border dark:border-[#2CA15F]/20"
                  whileHover={{
                    y: -8,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <div className="flex justify-center mb-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Users className="h-12 w-12 text-[#19613F]" />
                    </motion.div>
                  </div>
                  <motion.h3
                    className="text-3xl font-bold font-serif text-[#2CA15F] mb-2 dark:text-card-foreground"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3.2, duration: 0.5 }}
                  >
                    <AnimatedText
                      text="5,000+"
                      animation="highlight"
                      delay={3.4}
                    />
                  </motion.h3>
                  <p className="text-black dark:text-gray-300">
                    Student Competitors
                  </p>
                </motion.div>
              </AnimatedElement>

              <AnimatedElement animation="zoom" delay={3.0} duration={0.5}>
                <motion.div
                  className="text-center p-5 bg-white/50 dark:bg-[#1a3047]/70 rounded-lg shadow-sm backdrop-blur-sm dark:border dark:border-[#2CA15F]/20"
                  whileHover={{
                    y: -8,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <div className="flex justify-center mb-4">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Award className="h-12 w-12 text-[#19613F]" />
                    </motion.div>
                  </div>
                  <motion.h3
                    className="text-3xl font-bold font-serif text-[#2CA15F] mb-2 dark:text-card-foreground"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3.4, duration: 0.5 }}
                  >
                    <AnimatedText
                      text="$250K+"
                      animation="highlight"
                      delay={3.6}
                    />
                  </motion.h3>
                  <p className="text-black dark:text-gray-300">
                    Total Prize Money
                  </p>
                </motion.div>
              </AnimatedElement>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
