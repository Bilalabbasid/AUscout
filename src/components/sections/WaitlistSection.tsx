"use client";

import { SectionEyebrow, SectionHeadline } from "@/components/ui/SectionWrapper";
import WaitlistForm from "@/components/sections/WaitlistForm";

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="relative bg-carbon-light overflow-hidden">
      <div
        className="absolute inset-0 bg-reticle opacity-[0.03] pointer-events-none"
        aria-hidden="true"
      />

      {/* Court line accent top */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-court/10 to-transparent"
        aria-hidden="true"
      />

      {/* Orange glow accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-court/[0.03] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Corner reticle decorations */}
      <svg
        className="absolute top-12 right-12 w-16 h-16 opacity-10 pointer-events-none hidden md:block"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <path d="M4 4h12M48 4h12M4 60h12M48 60h12" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 4v12M4 48v12M60 4v12M60 48v12" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <div className="relative z-10 section-padding">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <SectionEyebrow>WAITLIST</SectionEyebrow>
          <SectionHeadline>Be first on the list.</SectionHeadline>
          <p className="body-text mt-6">
            Scout AU is launching soon. Join the waitlist for early access
            before anyone else — and first look at the players everyone&apos;s
            about to talk about.
          </p>
        </div>

        <WaitlistForm />
      </div>
    </section>
  );
}
