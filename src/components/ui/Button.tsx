"use client";

import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "default" | "lg";
  children: ReactNode;
  loading?: boolean;
  href?: string;
}

export default function Button({
  variant = "primary",
  size = "default",
  children,
  loading = false,
  href,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-expanded rounded-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-court disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-orange-court text-white hover:bg-orange-court-hover active:scale-[0.98] shadow-lg shadow-orange-court/20 hover:shadow-orange-court/30",
    secondary:
      "bg-transparent text-white border border-[#1E2130] hover:border-orange-court/50 hover:text-orange-court active:scale-[0.98]",
    ghost:
      "bg-transparent text-ash hover:text-white hover:bg-carbon-lighter active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs tracking-expanded",
    default: "px-7 py-3.5 text-sm tracking-expanded",
    lg: "px-9 py-4 text-base tracking-expanded",
  };

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  const button = (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            className="opacity-25"
          />
          <path
            d="M4 12a8 8 0 018-8"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-75"
          />
        </svg>
      )}
      {children}
    </button>
  );

  if (href) {
    return (
      <motion.a href={href} {...motionProps} className="inline-block">
        {button}
      </motion.a>
    );
  }

  return <motion.span {...motionProps}>{button}</motion.span>;
}
