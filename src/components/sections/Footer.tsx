"use client";

import ScoutLogo from "@/components/ui/ScoutLogo";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/scoutauofficial",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.902-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-carbon border-t border-[#1E2130] overflow-hidden">
      <div
        className="absolute inset-0 bg-reticle opacity-[0.02] pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10 px-6 md:px-12 lg:px-24 py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main footer row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Logo + tagline */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <ScoutLogo size="sm" />
              <p className="text-steel text-xs font-body tracking-expanded uppercase">
                DISCOVER · TRACK · SIGN
              </p>
            </div>

            {/* Center: App link */}
            <a
              href="https://app.scout.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ash hover:text-white text-sm font-body transition-colors duration-200"
            >
              app.scout.au
            </a>

            {/* Right: Social icons */}
            <nav className="flex items-center gap-2" aria-label="Social links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 rounded-lg border border-[#1E2130] flex items-center justify-center text-steel hover:text-white hover:border-orange-court/40 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-court"
                >
                  {link.icon}
                </a>
              ))}
            </nav>
          </div>

          {/* Bottom: copyright */}
          <div className="mt-8 pt-6 border-t border-[#1E2130]/60">
            <p className="text-steel text-xs font-body text-center">
              &copy; 2026 Scout AU — Australian basketball, scouted.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
