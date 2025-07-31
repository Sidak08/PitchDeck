"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import {
  AnimatedElement,
  AnimatedText,
  FloatingElements,
  ParallaxElement,
} from "@/components/animations";
import { motion } from "framer-motion";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement newsletter signup API
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Successfully subscribed!", {
        description:
          "You'll receive updates about new competitions and opportunities.",
      });
      setEmail("");
    } catch {
      toast.error("Subscription failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#19613F] dark:bg-[#102338] dark:text-white relative overflow-hidden">
      <FloatingElements count={15} minSize={10} maxSize={80} />

      <ParallaxElement speed={0.4} className="absolute inset-0">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/newsletter-bg.jpg')] bg-cover bg-center mix-blend-overlay"></div>
      </ParallaxElement>

      {/* Animated abstract shapes */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#2CA15F]/20 blur-3xl -translate-y-1/2 translate-x-1/3"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#2CA15F]/10 blur-3xl translate-y-1/3 -translate-x-1/4"
        animate={{ scale: [1, 0.8, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      ></motion.div>
      <motion.div
        className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-[#2CA15F]/15 blur-2xl -translate-y-1/2"
        animate={{ x: [-10, 10, -10], y: [10, -10, 10] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      ></motion.div>
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-[#2CA15F]/20 blur-xl"
        animate={{ x: [10, -10, 10], scale: [1, 1.1, 1] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      ></motion.div>
      <motion.div
        className="absolute top-1/4 right-1/3 w-16 h-16 rounded-full bg-[#2CA15F]/25 blur-lg"
        animate={{ y: [-5, 5, -5], opacity: [0.25, 0.35, 0.25] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      ></motion.div>

      {/* Dark mode shapes */}
      <motion.div
        className="hidden dark:block absolute top-0 right-0 w-72 h-72 rounded-full bg-[#193252]/30 blur-3xl -translate-y-1/3 translate-x-1/4"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="hidden dark:block absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#193252]/20 blur-3xl translate-y-1/4"
        animate={{ scale: [1, 0.9, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      ></motion.div>
      <motion.div
        className="hidden dark:block absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-[#193252]/25 blur-2xl"
        animate={{ rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      ></motion.div>
      <AnimatedElement
        animation="slideUp"
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.2,
          }}
        >
          <motion.div
            className="p-3 bg-[#D9D9D9]/10 rounded-full"
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={{
              y: [0, -10, 0],
              boxShadow: [
                "0 0 0 rgba(217, 217, 217, 0.4)",
                "0 0 20px rgba(217, 217, 217, 0.4)",
                "0 0 0 rgba(217, 217, 217, 0.4)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Mail className="h-12 w-12 text-[#D9D9D9]" />
          </motion.div>
        </motion.div>
        <AnimatedElement animation="slideUp" delay={0.3}>
          <div className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-sm">
            <AnimatedText
              text="Stay in the"
              animation="wordByWord"
              staggerChildren={0.1}
            />{" "}
            <motion.span
              className="text-white relative inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.span
                className="relative inline-block"
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Loop
              </motion.span>
              <motion.span
                className="absolute bottom-1 left-0 w-full h-1 bg-[#2CA15F]/60 -z-10"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.5 }}
              ></motion.span>
            </motion.span>
          </div>
        </AnimatedElement>
        <AnimatedElement animation="fadeIn" delay={0.6}>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get notified about new competitions, application deadlines, and
            exclusive opportunities for case competitors.
          </p>
        </AnimatedElement>

        <AnimatedElement animation="zoom" delay={0.8}>
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto bg-white/10 p-5 rounded-xl backdrop-blur-sm border border-white/20 shadow-xl relative z-10"
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/90 border-0 focus:border-0 focus-visible:ring-2 focus-visible:ring-[#2CA15F] focus-visible:ring-offset-1 dark:bg-[#1a3047]/90 dark:text-white rounded-lg h-11"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isLoading}
                variant="secondary"
                className="bg-[#2CA15F] text-white hover:bg-[#19613F] shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg font-medium h-11 px-6 dark:shadow-[0_0_15px_rgba(44,161,95,0.4)]"
              >
                {isLoading ? (
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Subscribing...
                  </motion.span>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </motion.div>
          </motion.form>
        </AnimatedElement>
        <AnimatedElement animation="fadeIn" delay={1.2}>
          <motion.div
            className="mt-8 flex items-center justify-center text-white/90"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <motion.span
              className="text-sm backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10"
              whileHover={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                scale: 1.03,
              }}
              transition={{ duration: 0.3 }}
            >
              We respect your privacy and will never share your information
            </motion.span>
          </motion.div>
        </AnimatedElement>
      </AnimatedElement>
    </section>
  );
}
