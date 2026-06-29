"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ScoutLogo from "@/components/ui/ScoutLogo";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById("waitlist");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-carbon/90 backdrop-blur-xl border-b border-[#1E2130]/50"
          : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="focus-visible:outline-none" aria-label="Scout AU Home">
          <ScoutLogo size="sm" />
        </a>

        {/* CTA */}
        <Button variant="primary" size="sm" onClick={scrollToForm}>
          Join the Waitlist
        </Button>
      </div>
    </motion.nav>
  );
}
