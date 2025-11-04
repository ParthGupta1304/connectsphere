"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(3, 3, 3, 0)", "rgba(3, 3, 3, 0.8)"]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "border-b border-white/10 shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2"
          >
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-rose-500 rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-[#030303] p-2 rounded-lg border border-white/10">
                  <Home className="h-5 w-5 text-white" />
                </div>
              </motion.div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/80">
                ConnectSphere
              </span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex items-center gap-8"
          >
            <Link
              href="/"
              className="text-white/60 hover:text-white transition-colors relative group"
            >
              <span>Home</span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-indigo-500 to-rose-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <Link
              href="/features"
              className="text-white/60 hover:text-white transition-colors relative group"
            >
              <span>Features</span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-indigo-500 to-rose-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <Link
              href="/about"
              className="text-white/60 hover:text-white transition-colors relative group"
            >
              <span>About</span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-indigo-500 to-rose-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10"
                asChild
              >
                <Link href="/login">Login</Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="relative overflow-hidden bg-white text-black hover:bg-white/90 font-semibold group"
                asChild
              >
                <Link href="/get-started">
                  <span className="relative z-10">Get Started</span>
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-indigo-500 to-rose-500"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* <span className="relative z-10 group-hover:text-white transition-colors">
                    Get Started
                  </span> */}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.nav>
  );
}
