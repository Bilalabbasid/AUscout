"use client";

import { motion } from "framer-motion";
import {
  SectionEyebrow,
  SectionHeadline,
  SectionBody,
} from "@/components/ui/SectionWrapper";

const problems = [
  {
    num: "1",
    text: "Scattered across league sites, socials and DMs",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    num: "2",
    text: "No clean, per-league stats you can actually compare",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    num: "3",
    text: "No direct line to the player or their agent",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    num: "4",
    text: "The long tail — NBL1 and rep talent — is basically invisible",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ),
  },
];

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative bg-carbon-light overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-reticle opacity-[0.03] pointer-events-none"
        aria-hidden="true"
      />
      {/* Court line accent top */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-court/10 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10 section-padding">
        <div className="max-w-4xl">
          <SectionEyebrow>THE PROBLEM</SectionEyebrow>
          <SectionHeadline>Talent is everywhere. The data isn&apos;t.</SectionHeadline>
          <SectionBody>
            Finding a player today means ten browser tabs — league sites,
            Instagram, spreadsheets, group chats and word of mouth.
            There&apos;s no single source of truth. By the time you&apos;ve
            pieced it together, someone else has already made the call.
          </SectionBody>

          {/* Numbered problem points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            {problems.map((p, i) => (
              <motion.div
                key={p.num}
                className="flex items-start gap-4 p-5 rounded-xl bg-carbon/50 border border-[#1E2130]/50 group hover:border-steel/20 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-court/10 flex items-center justify-center text-orange-court/60 group-hover:text-orange-court group-hover:bg-orange-court/15 transition-all duration-300">
                  {p.icon}
                </div>
                <div>
                  <span className="font-display font-black text-xs text-orange-court/50 uppercase tracking-expanded mb-1 block">
                    {String(p.num).padStart(2, "0")}
                  </span>
                  <p className="body-text text-sm md:text-base">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
