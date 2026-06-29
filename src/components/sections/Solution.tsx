"use client";

import { motion } from "framer-motion";
import {
  SectionEyebrow,
  SectionHeadline,
  SectionBody,
} from "@/components/ui/SectionWrapper";

const highlights = [
  "Full player profiles",
  "Career history",
  "Per-league stats",
  "Scouting summary",
  "Direct contact pathway",
];

export default function Solution() {
  return (
    <section id="solution" className="relative bg-carbon overflow-hidden">
      <div
        className="absolute inset-0 bg-reticle opacity-[0.03] pointer-events-none"
        aria-hidden="true"
      />
      {/* Court line accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-court/10 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10 section-padding">
        <div className="max-w-5xl">
          <SectionEyebrow>THE SOLUTION</SectionEyebrow>
          <SectionHeadline>
            One source of truth for Australian hoops.
          </SectionHeadline>
          <SectionBody className="max-w-3xl">
            Scout AU turns scattered performances into clear, comparable data.
            Search a player and instantly see their full profile, career
            history, per-league stats, scouting summary and a direct contact
            pathway. Discover, track and sign — all in one place.
          </SectionBody>

          {/* Visual highlight chips */}
          <motion.div
            className="flex flex-wrap gap-3 mt-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {highlights.map((h, i) => (
              <motion.span
                key={h}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-carbon-light border border-[#1E2130] text-sm font-body text-ash hover:text-white hover:border-orange-court/30 transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FF5A1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {h}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
