-- SQL para criar as tabelas no Supabase
-- Copie e cole no SQL Editor do Supabase

-- Criar tabela de pedidos de treino
CREATE TABLE IF NOT EXISTS workout_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  apartment TEXT NOT NULL,
  weight DECIMAL(5, 2) NOT NULL,
  height DECIMAL(5, 2) NOT NULL,
  general_objectives TEXT NOT NULL,
  objective TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('iniciante', 'intermediário', 'avançado')),
  frequency INTEGER NOT NULL CHECK (frequency >= 1 AND frequency <= 7),
  duration INTEGER NOT NULL,
  restrictions TEXT,
  equipment_preference TEXT NOT NULL CHECK (equipment_preference IN ('aparelhos', 'peso_livre', 'ambos')),
  contact_method TEXT NOT NULL CHECK (contact_method IN ('whatsapp')),
  contact_value TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'recebido' CHECK (status IN ('recebido', 'em_revisao', 'pronto', 'enviado')),
  notes TEXT,
  pdf_url TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pendente' CHECK (payment_status IN ('pendente', 'recebido', 'validado')),
  payment_date TIMESTAMP WITH TIME ZONE,
  payment_proof_url TEXT,
  payment_value DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Adicionar coluna email se a tabela já existir (execute este comando se a tabela já existe)
ALTER TABLE IF EXISTS workout_requests ADD COLUMN IF NOT EXISTS email TEXT;

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_status ON workout_requests(status);
CREATE INDEX IF NOT EXISTS idx_created_at ON workout_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_apartment ON workout_requests(apartment);

-- Habilitar RLS (Row Level Security) para segurança
ALTER TABLE workout_requests ENABLE ROW LEVEL SECURITY;

-- Remover policies antigas se existirem (para evitar conflitos)
DROP POLICY IF EXISTS "Allow public read" ON workout_requests;
DROP POLICY IF EXISTS "Allow public insert" ON workout_requests;
DROP POLICY IF EXISTS "Allow updates" ON workout_requests;

-- Permitir leitura pública (desabilitar em produção!)
CREATE POLICY "Allow public read" ON workout_requests FOR SELECT USING (true);

-- Permitir inserts públicos
CREATE POLICY "Allow public insert" ON workout_requests FOR INSERT WITH CHECK (true);

-- Permitir updates (para Felipe no admin)
CREATE POLICY "Allow updates" ON workout_requests FOR UPDATE USING (true);

-- Tabela opcional para exercícios de template (futura)
-- CREATE TABLE exercise_templates (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   name TEXT NOT NULL,
--   description TEXT,
--   video_url TEXT,
--   muscle_groups TEXT[], -- Array de grupos musculares
--   difficulty TEXT CHECK (difficulty IN ('fácil', 'médio', 'difícil')),
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- Tabela opcional para treinos salvo (futura)
-- CREATE TABLE workouts (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   request_id UUID REFERENCES workout_requests(id) ON DELETE CASCADE,
--   exercises JSONB NOT NULL, -- Array de exercícios com séries/reps
--   notes TEXT,
--   pdf_url TEXT,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );
