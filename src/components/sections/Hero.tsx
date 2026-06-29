"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  const scrollToForm = () => {
    const el = document.getElementById("waitlist");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-carbon overflow-hidden pt-16">
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-reticle opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      />

      {/* Court line grid overlay */}
      <div
        className="absolute inset-0 court-lines-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Court line accent bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-court/20 to-transparent"
        aria-hidden="true"
      />

      {/* Court line accent top */}
      <div
        className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E2130]/40 to-transparent"
        aria-hidden="true"
      />

      {/* Orb glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-orange-court/[0.04] blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Secondary orb — cooler */}
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-court/[0.02] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Reticle motif corner decorations */}
      <svg
        className="absolute top-20 left-6 md:left-24 w-16 h-16 md:w-24 md:h-24 opacity-[0.15] pointer-events-none"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <path d="M4 4h12M48 4h12M4 60h12M48 60h12" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 4v12M4 48v12M60 4v12M60 48v12" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="32" cy="32" r="18" stroke="#FF5A1F" strokeWidth="1" opacity="0.4"/>
      </svg>
      <svg
        className="absolute bottom-20 right-6 md:right-24 w-16 h-16 md:w-24 md:h-24 opacity-[0.15] pointer-events-none"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <path d="M4 4h12M48 4h12M4 60h12M48 60h12" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 4v12M4 48v12M60 4v12M60 48v12" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="32" cy="32" r="18" stroke="#FF5A1F" strokeWidth="1" opacity="0.4"/>
      </svg>

      {/* Floating spark accents */}
      <div className="absolute top-32 right-[20%] w-1.5 h-1.5 bg-orange-court rounded-full animate-sparkle" aria-hidden="true" />
      <div className="absolute top-[60%] left-[15%] w-1 h-1 bg-orange-court/60 rounded-full animate-sparkle" style={{ animationDelay: "1s" }} aria-hidden="true" />
      <div className="absolute bottom-32 right-[35%] w-1 h-1 bg-orange-court/40 rounded-full animate-sparkle" style={{ animationDelay: "2s" }} aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center py-20">
        {/* Eyebrow */}
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          DISCOVER · TRACK · SIGN
        </motion.p>

        {/* H1 */}
        <motion.h1
          className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95] text-white"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Find the{" "}
          <span className="text-orange-court">next</span>{" "}
          one<span className="text-orange-court">.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          className="body-text max-w-2xl mx-auto mt-8 text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Australia&apos;s basketball player intelligence platform — every NBL
          and NBL1 player, their stats, history and scouting, in one place.
          Scouted in real time.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <Button variant="primary" size="lg" onClick={scrollToForm}>
            Join the Waitlist
          </Button>
        </motion.div>

        {/* Microcopy */}
        <motion.p
          className="text-steel text-sm font-body mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Be first on the court at launch.
        </motion.p>

        {/* Court visual */}
        <motion.div
          className="mt-16 relative max-w-xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Basketball court diagram — premium treatment */}
          <div className="relative w-full aspect-[2.2/1] rounded-2xl border border-[#1E2130] bg-carbon-lighter/30 overflow-hidden backdrop-blur-sm">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 to-transparent pointer-events-none" />

            {/* Court outline */}
            <div className="absolute inset-4 border border-steel/15 rounded-lg" />
            {/* Center line */}
            <div className="absolute top-4 bottom-4 left-1/2 w-px bg-steel/15" />
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full border border-steel/15" />
            {/* Small center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-orange-court/20" />
            {/* Paint area left */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 w-10 md:w-14 h-20 md:h-24 border border-steel/15" />
            {/* Free throw arc left */}
            <div className="absolute top-1/2 left-[56px] md:left-[72px] -translate-y-1/2 w-10 md:w-12 h-20 md:h-24 rounded-r-full border-r border-t border-b border-steel/10" />
            {/* Paint area right */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 w-10 md:w-14 h-20 md:h-24 border border-steel/15" />
            {/* Free throw arc right */}
            <div className="absolute top-1/2 right-[56px] md:right-[72px] -translate-y-1/2 w-10 md:w-12 h-20 md:h-24 rounded-l-full border-l border-t border-b border-steel/10" />
            {/* Three-point arc left */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 w-16 md:w-20 h-28 md:h-32 rounded-r-full border-r border-steel/8" />
            {/* Three-point arc right */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 w-16 md:w-20 h-28 md:h-32 rounded-l-full border-l border-steel/8" />

            {/* Reticle symbol overlaid on court center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="56" height="56" viewBox="0 0 32 32" fill="none" className="opacity-30" aria-hidden="true">
                <path d="M2 2h6M24 2h6M2 30h6M24 30h6" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 2v6M2 24v6M30 2v6M30 24v6" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="16" cy="16" r="9" stroke="#FF5A1F" strokeWidth="1.7"/>
                <ellipse cx="16" cy="16" rx="4.5" ry="9" stroke="#FF5A1F" strokeWidth="1" opacity="0.7"/>
                <line x1="7" y1="16" x2="25" y2="16" stroke="#FF5A1F" strokeWidth="1" opacity="0.5"/>
              </svg>
            </div>

            {/* Orange spark accents on the court */}
            <div className="absolute top-[20%] right-[25%] w-1.5 h-1.5 bg-orange-court rounded-full animate-pulse" />
            <div className="absolute bottom-[25%] left-[30%] w-1 h-1 bg-orange-court rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute top-[35%] left-[20%] w-1 h-1 bg-orange-court/60 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-[20%] right-[15%] w-1 h-1 bg-orange-court/40 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
