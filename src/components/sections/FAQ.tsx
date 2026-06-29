"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionEyebrow, SectionHeadline } from "@/components/ui/SectionWrapper";

const faqs = [
  {
    q: "When does Scout AU launch?",
    a: "We're rolling out access in waves — agents, clubs and players first. Join the waitlist to be in the first group.",
  },
  {
    q: "Which leagues are covered?",
    a: "NBL and NBL1 at launch, with more of the Australian pathway to follow.",
  },
  {
    q: "Is it free?",
    a: "Players can claim and manage their profile for free. Agents, GMs and clubs get advanced tools on a paid plan — waitlist members get founding pricing.",
  },
  {
    q: "Who is it for?",
    a: "Anyone who discovers, tracks or signs Australian basketball talent — agents, GMs, coaches and players.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Your contact details and private notes are protected and never shared without your permission.",
  },
];

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-[#1E2130] last:border-b-0"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-orange-court rounded group"
        aria-expanded={open}
      >
        <span className="font-display font-bold text-base md:text-lg text-white pr-4 group-hover:text-orange-court/90 transition-colors duration-200">
          {question}
        </span>
        <motion.div
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-carbon-light border border-[#1E2130] flex items-center justify-center group-hover:border-orange-court/30 transition-colors duration-200"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
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
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="body-text text-sm md:text-base pb-5 md:pb-6 pr-12">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative bg-carbon overflow-hidden">
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <SectionHeadline>Quick answers.</SectionHeadline>
          </div>

          <div className="card-dark p-6 md:p-8">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                question={faq.q}
                answer={faq.a}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
