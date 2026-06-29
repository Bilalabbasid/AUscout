"use client";

import { motion } from "framer-motion";
import {
  SectionEyebrow,
  SectionHeadline,
} from "@/components/ui/SectionWrapper";

const features = [
  {
    title: "Player Profiles",
    description:
      "Bio, measurements, position and a clean season breakdown: scoring, playmaking, defence, athleticism, at a glance.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Per-League Stats",
    description:
      "NBL and NBL1 kept separate. FG%, 3P%, FT% and full box score — no mixed averaging across levels.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: "Career & Team History",
    description:
      "Track a player across teams, leagues and seasons as they move.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Player Ratings",
    description:
      "A single, comparable rating out of 100, so you can sort the signal from the noise.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: "Natural Language Search",
    description:
      "Ask in plain English and get the answer instantly. StatMuse-style querying for Australian basketball.",
    featured: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: "Direct Contact Pathway",
    description: "Reach players and agents in-app. Discover, track — and sign.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    title: "Shareable Stat Cards",
    description:
      "Auto-generated player cards turn a standout night into a graphic built for the group chat.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
];

const exampleQueries = [
  "Who averaged the most points in NBL1 West in 2025?",
  "Show Australian NCAA players averaging 15+ PPG this season",
  "Who led the NBL in three-pointers made last season?",
];

export default function Features() {
  return (
    <section id="features" className="relative bg-carbon-light overflow-hidden">
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
          <SectionEyebrow>FEATURES</SectionEyebrow>
          <SectionHeadline>
            Everything you need in one platform.
          </SectionHeadline>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {features.map((f, i) =>
              f.title === "Natural Language Search" ? (
                /* Featured NL Search card — spans full width */
                <motion.div
                  key={f.title}
                  className="card-dark p-6 md:p-8 md:col-span-2 lg:col-span-3 relative border-orange-court/30 animate-border-glow"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-orange-court rounded-full text-xs font-display font-bold uppercase tracking-expanded text-white">
                    Featured
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-court/10 flex items-center justify-center text-orange-court">
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg md:text-xl text-white mb-2">
                        {f.title}
                      </h3>
                      <p className="body-text text-sm md:text-base max-w-2xl">
                        {f.description}
                      </p>
                    </div>
                  </div>

                  {/* Mock search bar */}
                  <div className="mt-6 max-w-2xl">
                    <div className="flex items-center gap-3 bg-carbon border border-[#1E2130] rounded-xl px-4 py-3.5 group hover:border-orange-court/30 transition-colors duration-300">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#5B6472"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 group-hover:stroke-orange-court transition-colors duration-300"
                        aria-hidden="true"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                      </svg>
                      <span className="text-steel text-sm font-body">
                        Ask Scout AU anything…
                      </span>
                      {/* Blinking cursor */}
                      <span className="w-px h-4 bg-orange-court/50 animate-pulse" />
                    </div>

                    {/* Example result rows */}
                    <div className="mt-3 space-y-2">
                      {exampleQueries.map((q, qi) => (
                        <motion.div
                          key={qi}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-carbon-lighter/50 border border-[#1E2130]/30 text-sm font-body text-ash hover:text-white hover:border-orange-court/30 hover:bg-carbon-lighter transition-all duration-300 cursor-default group/row"
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.6 + qi * 0.12 }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FF5A1F"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="flex-shrink-0 opacity-60 group-hover/row:opacity-100 transition-opacity"
                            aria-hidden="true"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>&ldquo;{q}&rdquo;</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Standard feature card */
                <motion.div
                  key={f.title}
                  className="card-dark card-hover p-6 md:p-8 relative group"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="w-11 h-11 rounded-xl bg-orange-court/10 flex items-center justify-center text-orange-court mb-5 group-hover:bg-orange-court/15 transition-colors duration-300">
                    {f.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-white mb-3">
                    {f.title}
                  </h3>
                  <p className="body-text text-sm md:text-base">{f.description}</p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
