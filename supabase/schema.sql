-- ============================================================================
-- NESTISH WEB - SUPABASE DATABASE SCHEMA (RESET & CREATE)
-- ============================================================================

-- 0. LIMPEZA DE OBJETOS EXISTENTES (Permite re-executar o script sem erros)
DROP TABLE IF EXISTS public.bookings CASCADE;
DROP TABLE IF EXISTS public.properties CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

DROP TYPE IF EXISTS public.booking_status CASCADE;
DROP TYPE IF EXISTS public.property_status CASCADE;
DROP TYPE IF EXISTS public.property_nature CASCADE;

-- 1. EXTENSÕES NECESSÁRIAS
CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMERADOS (ENUMS)
CREATE TYPE public.property_nature AS ENUM (
  'quinta',
  'monte_alentejano',
  'villa',
  'apartamento',
  'casa_de_campo',
  'glamping',
  'chalet',
  'herdade'
);

CREATE TYPE public.property_status AS ENUM ('draft', 'active', 'archived');
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

-- 3. TABELA DE PERFIS (PROFILES)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone_number TEXT,
  is_host BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. TABELA DE PROPRIEDADES (PROPERTIES)
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  nature public.property_nature NOT NULL,
  status public.property_status NOT NULL DEFAULT 'draft',
  
  -- Localização
  location_address TEXT NOT NULL,
  location_city TEXT NOT NULL,
  location_region TEXT NOT NULL,
  location_country TEXT NOT NULL DEFAULT 'Portugal',
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),

  -- Capacidade e Preço
  price_per_night NUMERIC(10, 2) NOT NULL CHECK (price_per_night > 0),
  cleaning_fee NUMERIC(10, 2) DEFAULT 0.00 CHECK (cleaning_fee >= 0),
  max_guests INT NOT NULL CHECK (max_guests > 0),
  bedrooms INT NOT NULL CHECK (bedrooms >= 0),
  beds INT NOT NULL CHECK (beds >= 0),
  bathrooms NUMERIC(3, 1) NOT NULL CHECK (bathrooms >= 0),

  -- Comodidades
  amenities JSONB NOT NULL DEFAULT '[]'::jsonb,
  images TEXT[] NOT NULL DEFAULT '{}',

  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. TABELA DE RESERVAS (BOOKINGS) - ANTI DOUBLE-BOOKING
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  guest_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  booking_dates DATERANGE NOT NULL,
  status public.booking_status NOT NULL DEFAULT 'pending',
  guests_count INT NOT NULL CHECK (guests_count > 0),
  
  price_per_night NUMERIC(10, 2) NOT NULL,
  total_nights INT NOT NULL CHECK (total_nights > 0),
  total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),

  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

  CONSTRAINT prevent_double_booking EXCLUDE USING gist (
    property_id WITH =,
    booking_dates WITH &&
  ) WHERE (status != 'cancelled')
);

-- 6. ÍNDICES DE PERFORMANCE
CREATE INDEX idx_properties_nature ON public.properties(nature);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_city ON public.properties(location_city);
CREATE INDEX idx_bookings_property_dates ON public.bookings USING gist (property_id, booking_dates);

-- 7. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perfis são visíveis publicamente" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Utilizadores podem editar o seu próprio perfil" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Propriedades ativas são visíveis a todos" 
  ON public.properties FOR SELECT 
  USING (status = 'active' OR auth.uid() = host_id);

CREATE POLICY "Anfitriões podem inserir as suas propriedades" 
  ON public.properties FOR INSERT 
  WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Anfitriões podem atualizar as suas propriedades" 
  ON public.properties FOR UPDATE 
  USING (auth.uid() = host_id);

CREATE POLICY "Hóspedes e Anfitriões podem ver as suas reservas" 
  ON public.bookings FOR SELECT 
  USING (
    auth.uid() = guest_id OR 
    auth.uid() IN (SELECT host_id FROM public.properties WHERE id = property_id)
  );

CREATE POLICY "Hóspedes autenticados podem criar reservas" 
  ON public.bookings FOR INSERT 
  WITH CHECK (auth.uid() = guest_id);