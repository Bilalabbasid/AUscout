import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://scout.au";

export const metadata: Metadata = {
  title: {
    default: "Scout AU — Australia's Basketball Player Intelligence Platform",
    template: "%s | Scout AU",
  },
  description:
    "Discover, track and sign Australian basketball talent. Every NBL and NBL1 player, their stats, history and scouting, in one place. Scouted in real time.",
  keywords: [
    "basketball",
    "Australia",
    "NBL",
    "NBL1",
    "scouting",
    "player intelligence",
    "basketball stats",
    "Australian basketball",
  ],
  authors: [{ name: "Scout AU" }],
  creator: "Scout AU",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "Scout AU",
    title: "Scout AU — Australia's Basketball Player Intelligence Platform",
    description:
      "Discover, track and sign Australian basketball talent. Every NBL and NBL1 player, their stats, history and scouting, in one place.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Scout AU — DISCOVER · TRACK · SIGN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scout AU — Australia's Basketball Player Intelligence Platform",
    description:
      "Discover, track and sign Australian basketball talent. Every NBL and NBL1 player in one place.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-carbon text-white font-body antialiased">
        {children}
      </body>
    </html>
  );
}
