# 🚀 Guia Completo de Setup - VizFit

## Pré-requisitos

Você precisa ter acesso a:
- **Mac/Windows/Linux** com terminal
- **[VS Code](https://code.visualstudio.com/)** (recomendado)
- Conta **[Supabase](https://supabase.com/)** (gratuita)

---

## Passo 1: Instalar Node.js e npm

### macOS (com Homebrew)

Se não tiver Homebrew:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Depois instale Node.js:
```bash
brew install node
```

Verifique:
```bash
node --version
npm --version
```

### Windows
Baixe do [nodejs.org](https://nodejs.org/) e execute o instalador.

---

## Passo 2: Instalar Dependências do Projeto

Abra o terminal na pasta do projeto e execute:

```bash
cd /Users/jusope/Desktop/vizfit
npm install
```

Ou execute o script de setup automaticamente:

```bash
chmod +x setup.sh
./setup.sh
```

---

## Passo 3: Configurar Supabase

### 3.1 Criar Projeto Supabase

1. Acesse [supabase.com](https://supabase.com/) e faça login
2. Clique em "New Project"
3. Preencha os dados:
   - **Name**: vizfit
   - **Database Password**: crie uma senha forte
   - **Region**: [escolha a mais próxima]
4. Espere o projeto ser criado (2-3 minutos)

### 3.2 Criar Tabelas do Banco

1. No dashboard Supabase, vá para **SQL Editor**
2. Clique em **New Query**
3. Copie e cole este SQL (veja `database.sql`):

```sql
CREATE TABLE workout_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  apartment TEXT NOT NULL,
  objective TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('iniciante', 'intermediário', 'avançado')),
  frequency INTEGER NOT NULL CHECK (frequency >= 1 AND frequency <= 7),
  duration INTEGER NOT NULL,
  restrictions TEXT,
  equipment_preference TEXT NOT NULL CHECK (equipment_preference IN ('aparelhos', 'peso_livre', 'ambos')),
  contact_method TEXT NOT NULL CHECK (contact_method IN ('email', 'whatsapp')),
  contact_value TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'recebido' CHECK (status IN ('recebido', 'em_revisao', 'pronto', 'enviado')),
  notes TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_status ON workout_requests(status);
CREATE INDEX idx_created_at ON workout_requests(created_at DESC);
CREATE INDEX idx_apartment ON workout_requests(apartment);

-- Habilitar RLS (Row Level Security) para segurança
ALTER TABLE workout_requests ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública (desabilitar em produção!)
CREATE POLICY "Allow public read" ON workout_requests FOR SELECT USING (true);

-- Permitir inserts públicos
CREATE POLICY "Allow public insert" ON workout_requests FOR INSERT WITH CHECK (true);

-- Permitir updates (para Felipe no admin)
CREATE POLICY "Allow updates" ON workout_requests FOR UPDATE USING (true);
```

4. Clique em **Run** ✅

### 3.3 Copiar Credenciais Supabase

1. No dashboard, vá para **Settings** → **API**
2. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role key** → `SUPABASE_SERVICE_ROLE_KEY`

### 3.4 Configurar Arquivo .env.local

No projeto, edite `.env.local` e preencha:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

---

## Passo 4: Rodar o Projeto

No terminal:

```bash
npm run dev
```

Acesse: **http://localhost:3000**

---

## Estrutura de Páginas

| Página | URL | Descrição |
|--------|-----|-----------|
| Landing | `/` | Página inicial com CTA |
| Formulário | `/formulario` | Form com 5 passos |
| Admin | `/admin` | Dashboard Kanban |

---

## Fluxo Completo de Uso

### 1. Usuário Final
```
1. Acessa / (landing)
2. Clica em "Quero meu treino"
3. Preenche formulário em 5 passos
4. Recebe confirmação por email/WhatsApp (manual por enquanto)
```

### 2. Felipe (Admin)
```
1. Acessa /admin
2. Ve pedidos em formato Kanban
3. Clica em "Editar Status" para cada pedido
4. Move de "Recebido" → "Em Revisão" → "Pronto"
5. Ao marcar como "Pronto", adiciona observações
6. Quando "Enviado", status final é atualizado
```

### 3. Banco de Dados
- Todos os pedidos salvos em `workout_requests`
- Pode consultar em Supabase → Table Editor

---

## Próximos Passos (Futuro)

- [ ] Integração WhatsApp/Telegram (twillio)
- [ ] Upload de vídeos dos exercícios
- [ ] Geração automática de PDF
- [ ] Sistema de pagamento (Stripe/Pix)
- [ ] Autenticação para Felipe
- [ ] Notificações em tempo real (WebSockets)

---

## Troubleshooting

### "Erro: npm: command not found"
- Reinstale Node.js usando Homebrew ou o instalador oficial
- Reinicie o terminal/computador após instalação

### "Erro de conexão com Supabase"
- Verifique se `.env.local` está preenchido corretamente
- Teste as credenciais em [supabase.com](https://supabase.com/)

### "Porta 3000 já está em uso"
```bash
npm run dev -- -p 3001
```

### "Styled incorretamente"
- Certifique que Tailwind CSS está instalado: `npm list tailwindcss`
- Limpe cache: `rm -rf .next && npm run dev`

---

## Contato / Suporte

Qualquer dúvida, verifique:
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
