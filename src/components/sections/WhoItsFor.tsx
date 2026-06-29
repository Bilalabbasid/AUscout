"use client";

import { motion } from "framer-motion";
import {
  SectionEyebrow,
  SectionHeadline,
} from "@/components/ui/SectionWrapper";

const audiences = [
  {
    title: "Agents",
    description:
      "Manage your roster, surface new talent, and reach decision-makers first.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "GMs / Front Office",
    description:
      "Your whole prospect pipeline, tracked and rated in one board.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
        <path d="M14 15h3" />
        <path d="M14 18h2" />
      </svg>
    ),
  },
  {
    title: "Coaches",
    description:
      "Scout opponents and talent with clean, comparable data.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    title: "Players",
    description:
      "Claim your profile. Get seen by the people who sign.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

export default function WhoItsFor() {
  return (
    <section id="who" className="relative bg-carbon overflow-hidden">
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionEyebrow>WHO IT&apos;S FOR</SectionEyebrow>
            <SectionHeadline>Built for everyone in the game.</SectionHeadline>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {audiences.map((a, i) => (
              <motion.div
                key={a.title}
                className="card-dark card-hover p-6 md:p-8 text-center group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-court/10 mb-5 group-hover:bg-orange-court/15 group-hover:scale-110 transition-all duration-300">
                  {a.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  {a.title}
                </h3>
                <p className="body-text text-sm">{a.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
