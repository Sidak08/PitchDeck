"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Trophy, Star } from "lucide-react";
import {
  AnimatedElement,
  AnimatedText,
  FloatingElements,
  ParallaxElement,
} from "@/components/animations";
import { motion } from "framer-motion";

// TODO: Replace with actual data from backend
const pastWinners = [
  {
    id: 1,
    name: "Sarah Chen",
    competition: "Harvard Business School Case Competition 2023",
    image: "/images/winner1.jpg",
    prize: "$5,000",
    school: "Phillips Academy",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    competition: "Wharton High School Case Challenge",
    image: "/images/winner2.jpg",
    prize: "$3,000",
    school: "Stuyvesant High School",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    competition: "Stanford Business Case Competition",
    image: "/images/winner3.jpg",
    prize: "$4,000",
    school: "Thomas Jefferson High School",
  },
  {
    id: 4,
    name: "David Kim",
    competition: "MIT Sloan Case Competition",
    image: "/images/winner4.jpg",
    prize: "$2,500",
    school: "Bronx Science",
  },
];

export function PastWinnersSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gradient-to-br dark:from-[#152a45] dark:via-[#193252] dark:to-[#1d3a5f] dark:text-white relative overflow-hidden">
      <FloatingElements count={6} minSize={20} maxSize={100} />
      <ParallaxElement speed={0.3} className="absolute inset-0">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/winner-celebration.jpg')] bg-cover bg-center mix-blend-overlay"></div>
      </ParallaxElement>
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedElement animation="slideUp" delay={0.2}>
          <div className="text-center mb-16">
            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ rotate: -10, scale: 0.5, opacity: 0 }}
              whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: 0.3,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Trophy className="h-12 w-12 text-[#19613F] mr-3" />
              </motion.div>
            </motion.div>
            <AnimatedText
              text="Celebrating Our Champions"
              animation="wordByWord"
              className="text-3xl sm:text-4xl font-bold text-black mb-4 dark:text-white"
              staggerChildren={0.1}
            />
            <motion.p
              className="text-xl text-black max-w-3xl mx-auto dark:text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Meet the talented students who have excelled in case competitions
              and made their mark in the business world.
            </motion.p>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pastWinners.map((winner, index) => (
            <AnimatedElement
              key={winner.id}
              animation="slideUp"
              delay={0.3 + index * 0.15}
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Card className="border-[#19613F]/20 bg-white dark:bg-[#1a3047]/90 dark:border-[#2CA15F]/20 dark:hover:shadow-[0_0_15px_rgba(44,161,95,0.3)]">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="relative w-24 h-24 mx-auto mb-4 ring-4 ring-[#2CA15F] rounded-full"
                      whileHover={{ scale: 1.1 }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + index * 0.1,
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      <Image
                        src={winner.image || "/placeholder.svg"}
                        alt={winner.name}
                        fill
                        className="rounded-full object-cover"
                      />
                      <motion.div
                        className="absolute -bottom-2 -right-2 bg-[#19613F] rounded-full p-1"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.8 + index * 0.1,
                          type: "spring",
                          stiffness: 500,
                        }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Star className="h-4 w-4 text-white" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    >
                      <h3 className="font-semibold text-lg text-black mb-2 dark:text-white">
                        {winner.name}
                      </h3>
                      <p className="text-sm text-[#19613F] font-medium mb-2 dark:text-[#2CA15F]">
                        {winner.school}
                      </p>
                      <p className="text-sm font-medium mb-3 text-black dark:text-gray-300">
                        {winner.competition}
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-[#2CA15F]/20 text-[#19613F] dark:bg-[#2CA15F]/30 dark:text-white"
                        >
                          <motion.div
                            animate={{ y: [0, -2, 0] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              repeatType: "mirror",
                            }}
                          >
                            <Trophy className="h-3 w-3 mr-1" />
                          </motion.div>
                          {winner.prize} Winner
                        </Badge>
                      </motion.div>
                    </motion.div>
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
