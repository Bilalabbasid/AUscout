"use client";

import ScoutLogo from "@/components/ui/ScoutLogo";

const footerLinks = [
  { label: "app.scout.au", href: "https://app.scout.au" },
  { label: "@scoutauofficial", href: "https://instagram.com/scoutauofficial" },
  { label: "X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="relative bg-carbon border-t border-[#1E2130] overflow-hidden">
      <div
        className="absolute inset-0 bg-reticle opacity-[0.02] pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10 px-6 md:px-12 lg:px-24 py-12 md:py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <ScoutLogo size="sm" />
            <p className="text-steel text-sm font-body tracking-expanded uppercase">
              DISCOVER · TRACK · SIGN
            </p>
          </div>

          {/* Center: Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer links">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ash hover:text-white text-sm font-body transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-court rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Copyright */}
          <p className="text-steel text-xs font-body text-center md:text-right">
            &copy; 2026 Scout AU — Australian basketball, scouted.
          </p>
        </div>
      </div>
    </footer>
  );
}
