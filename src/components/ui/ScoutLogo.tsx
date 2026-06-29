"use client";

import { motion } from "framer-motion";

export default function ScoutLogo({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizes = {
    sm: { icon: 24, text: "text-lg", sub: "text-xs" },
    default: { icon: 32, text: "text-xl", sub: "text-xs" },
    lg: { icon: 40, text: "text-3xl", sub: "text-sm" },
  };

  const s = sizes[size];

  return (
    <motion.div
      className="flex items-center gap-2.5 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Reticle / Crosshair + Basketball Globe Symbol */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Crosshair brackets */}
        <path d="M2 2h6M24 2h6M2 30h6M24 30h6" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 2v6M2 24v6M30 2v6M30 24v6" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Circle */}
        <circle cx="16" cy="16" r="9" stroke="#FFFFFF" strokeWidth="1.7"/>
        {/* Meridian lines */}
        <ellipse cx="16" cy="16" rx="4.5" ry="9" stroke="#FF5A1F" strokeWidth="1" opacity="0.7"/>
        <line x1="7" y1="16" x2="25" y2="16" stroke="#FFFFFF" strokeWidth="1" opacity="0.5"/>
        {/* Basketball curves */}
        <path d="M11.5 16a6 6 0 0 0 9 0" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.4"/>
        <path d="M20.5 16a6 6 0 0 0-9 0" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.4"/>
      </svg>

      {/* Wordmark */}
      <div className="flex items-baseline gap-0.5">
        <span className={`font-display font-black ${s.text} tracking-expanded text-white`}>
          SCOUT
        </span>
        <span className={`font-display font-black ${s.text} tracking-expanded text-orange-court`}>
          AU
        </span>
      </div>
    </motion.div>
  );
}
