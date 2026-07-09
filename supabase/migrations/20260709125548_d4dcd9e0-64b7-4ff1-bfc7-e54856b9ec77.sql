
-- Tighten permissions on reservations: only allow INSERT for public roles, and add validation
REVOKE ALL ON public.reservations FROM anon, authenticated;
GRANT INSERT ON public.reservations TO anon, authenticated;
GRANT ALL ON public.reservations TO service_role;

DROP POLICY IF EXISTS "Anyone can create a reservation" ON public.reservations;

CREATE POLICY "Public can submit reservations with valid data"
ON public.reservations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 120
  AND length(btrim(phone)) BETWEEN 3 AND 40
  AND (email IS NULL OR length(email) <= 200)
  AND (note IS NULL OR length(note) <= 1000)
  AND guests BETWEEN 1 AND 50
  AND date >= CURRENT_DATE
  AND length(btrim(time)) BETWEEN 1 AND 20
);
