"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  featured?: boolean;
  children?: ReactNode;
  delay?: number;
}

export default function FeatureCard({
  title,
  description,
  featured = false,
  children,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      className={`card-dark card-hover p-6 md:p-8 relative ${
        featured
          ? "ring-1 ring-orange-court/40 shadow-lg shadow-orange-court/10"
          : ""
      }`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
    >
      {featured && (
        <div className="absolute -top-3 left-6 px-3 py-1 bg-orange-court rounded-full text-xs font-display font-bold uppercase tracking-expanded text-white">
          Featured
        </div>
      )}
      <h3 className="font-display font-bold text-lg md:text-xl text-white mb-3">
        {title}
      </h3>
      <p className="body-text text-sm md:text-base">{description}</p>
      {children}
    </motion.div>
  );
}
