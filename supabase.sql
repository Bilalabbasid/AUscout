-- ============================================
-- SCOUT AU — WAITLIST TABLE (Supabase SQL)
-- ============================================
-- Run this in the Supabase SQL Editor to create
-- the waitlist table with proper constraints and
-- Row Level Security.

-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.waitlist (
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

-- 2. Index on email for fast lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist (email);

-- 3. Index on created_at for chronological queries
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist (created_at DESC);

-- 4. Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- 5. Service role bypass (used by API route)
CREATE POLICY "Service role can do everything"
  ON public.waitlist
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 6. Anon can insert (for client-side submissions if needed)
CREATE POLICY "Anon can insert"
  ON public.waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 7. No read access for anon/authenticated (privacy)
CREATE POLICY "No public read"
  ON public.waitlist
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- ============================================
-- VERIFICATION QUERIES (run after creation)
-- ============================================

-- Check table structure:
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'waitlist'
-- ORDER BY ordinal_position;

-- Check policies:
-- SELECT * FROM pg_policies WHERE tablename = 'waitlist';

-- Test insert (as service_role):
-- INSERT INTO public.waitlist (full_name, email, phone, role, leagues, consent)
-- VALUES ('Test User', 'test@example.com', '+61 400 000 000', 'Agent', ARRAY['NBL'], true);
