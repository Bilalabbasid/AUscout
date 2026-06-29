"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  variant?: "carbon" | "carbon-light";
  id?: string;
}

export default function SectionWrapper({
  children,
  className = "",
  variant = "carbon",
  id,
}: SectionWrapperProps) {
  const bg = variant === "carbon-light" ? "bg-carbon-light" : "bg-carbon";

  return (
    <section id={id} className={`${bg} relative overflow-hidden ${className}`}>
      {/* Reticle texture overlay */}
      <div
        className="absolute inset-0 bg-reticle opacity-[0.03] pointer-events-none"
        aria-hidden="true"
      />
      {/* Court line accents */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-court/10 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10 section-padding">{children}</div>
    </section>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.p
      className="eyebrow mb-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.p>
  );
}

export function SectionHeadline({ children }: { children: ReactNode }) {
  return (
    <motion.h2
      className="section-headline max-w-4xl"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {children}
    </motion.h2>
  );
}

export function SectionBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      className={`body-text max-w-2xl mt-6 ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {children}
    </motion.p>
  );
}
