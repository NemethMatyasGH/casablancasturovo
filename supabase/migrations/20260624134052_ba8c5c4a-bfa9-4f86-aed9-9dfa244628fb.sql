
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  guests INTEGER NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.reservations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reservations TO authenticated;
GRANT ALL ON public.reservations TO service_role;

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a reservation"
  ON public.reservations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
