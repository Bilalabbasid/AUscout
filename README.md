# Scout AU — Landing Page + Waitlist

Australia's basketball player intelligence platform.  
**Tagline: DISCOVER · TRACK · SIGN**

---

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** (custom design system)
- **Framer Motion** (scroll/entrance animations)
- **Supabase** (waitlist data storage)
- **Resend** (email notifications on signup)

---

## Quick Start

### 1. Install dependencies

```bash
cd scout-au
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Open the **SQL Editor** and run the entire contents of `supabase.sql`.
3. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Set up Resend (optional — for email notifications)

1. Go to [resend.com](https://resend.com) and create an account.
2. Create an API key → `RESEND_API_KEY`.
3. Verify a sending domain or use Resend's onboarding domain.
4. Set `NOTIFY_EMAIL_TO` to the address that should receive signup notifications.
5. Set `NOTIFY_EMAIL_FROM` to your verified sending address (e.g., `Scout AU <noreply@scout.au>`).

> **Note:** If Resend keys are not configured, the waitlist still works — signups are stored in Supabase, just without email notifications.

### 4. Configure environment

```bash
cp .env.example .env.local
```

Fill in your keys in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
NOTIFY_EMAIL_TO=hello@scout.au
NOTIFY_EMAIL_FROM=Scout AU <noreply@scout.au>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Build & Deploy

### Production build

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push the repo to GitHub.
2. In [Vercel](https://vercel.com), click **New Project** → import your repo.
3. Add all environment variables from `.env.example`.
4. Deploy. Vercel auto-detects Next.js.

---

## File Structure

```
scout-au/
├── public/
│   ├── favicon.svg          # Reticle + basketball globe favicon
│   └── reticle.svg          # Tiled reticle/crosshair background pattern
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── waitlist/
│   │   │       └── route.ts # POST — Supabase insert + Resend notification
│   │   ├── globals.css      # Tailwind + design system + court/reticle motifs
│   │   ├── layout.tsx       # Root layout + SEO metadata + Open Graph tags
│   │   └── page.tsx         # Landing page (composes all sections)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx         # Primary/secondary/ghost button
│   │   │   ├── FeatureCard.tsx    # Reusable feature card
│   │   │   ├── ScoutLogo.tsx      # SCOUT AU wordmark + reticle SVG symbol
│   │   │   └── SectionWrapper.tsx # Eyebrow/Headline/Body helpers
│   │   └── sections/
│   │       ├── Navbar.tsx          # Fixed nav with scroll-to-form CTA
│   │       ├── Hero.tsx            # Full-viewport hero + court visual
│   │       ├── Problem.tsx         # "Talent is everywhere…"
│   │       ├── Solution.tsx        # "One source of truth…"
│   │       ├── Features.tsx        # 7 feature cards (NL Search featured)
│   │       ├── WhoItsFor.tsx       # 4 audience tiles
│   │       ├── WaitlistSection.tsx # Section wrapper around the form
│   │       ├── WaitlistForm.tsx    # Full form + validation + honeypot + submit
│   │       ├── FAQ.tsx             # Accordion FAQ (5 items)
│   │       └── Footer.tsx          # Links + copyright
│   └── lib/
│       ├── supabase.ts     # Supabase client (public + admin/service role)
│       ├── validation.ts   # Form validation logic + TypeScript types
│       └── rateLimit.ts    # In-memory rate limiter (5 req/min per IP)
├── supabase.sql            # SQL to create the waitlist table + RLS policies
├── .env.example            # All required environment variables
├── tailwind.config.ts      # Custom colors, fonts, animations
├── postcss.config.js       # PostCSS (Tailwind + Autoprefixer)
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
└── package.json
```

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Carbon | `#0C0D10` | Base background |
| Carbon Light | `#14151A` | Alternating sections |
| Carbon Lighter | `#1A1C22` | Card backgrounds |
| White | `#FFFFFF` | Primary text |
| Steel | `#5B6472` | Secondary text |
| Ash | `#9CA0AB` | Body text |
| Court Orange | `#FF5A1F` | CTAs, accents, key numbers |
| Archivo (Bold/Black) | Google Fonts | All display/headlines (uppercase, tight tracking) |
| Inter | Google Fonts | Body, UI, form fields |

---

## Waitlist Form

Fields:
- Full name (required)
- Email (required, validated client + server)
- Phone (required, +61 default)
- "I am a…" (required select: Agent, GM / Front Office, Coach, Player, Other)
- League interest (optional checkboxes: NBL, NBL1, NCAA / Other)
- Optional message (textarea)
- Consent checkbox (required)

Behaviour:
- Client-side validation with animated inline errors
- Loading spinner on submit
- Success confirmation: "You're locked in. 🎯"
- Duplicate emails treated as success (no error)
- Honeypot spam protection (hidden field)
- Rate limiting (5 requests/minute per IP)
- Resend email notification to team on each signup

---

## Supabase Table

```sql
CREATE TABLE public.waitlist (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE,
  phone       TEXT NOT NULL,
  role        TEXT NOT NULL,
  leagues     TEXT[] DEFAULT '{}',
  message     TEXT DEFAULT '',
  consent     BOOLEAN NOT NULL DEFAULT false
);
```

Full SQL with indexes and RLS policies in `supabase.sql`.

---

## License

Private — Scout AU.
