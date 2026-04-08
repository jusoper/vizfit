# VizFit - MVP de Treino Personalizado

Plataforma web para treino personalizado no condomínio, gerenciado pelo personal trainer Felipe.

## Tecnologias

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **PDF Generation**: jsPDF + html2canvas
- **Deployment**: Vercel

## Instalação

```bash
npm install
```

## Variáveis de Ambiente

Copie `.env.example` para `.env.local` e configure:

```bash
NEXT_PUBLIC_SUPABASE_URL=seu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_service_role
```

## Desenvolvimento

```bash
npm run dev
```

Acesso em `http://localhost:3000`

## Funcionalidades

### 1. Landing Page (`/`)
- Headline clara e objetiva
- Explicação do fluxo
- CTA "Quero meu treino"
- Informações de preço e benefícios

### 2. Formulário de Entrada (`/formulario`)
- Progresso visual em 5 passos
- Campos: nome, apartamento, objetivo, nível, frequência, duração, restrições, equipamento, contato
- Confirmação automática ao enviar

### 3. Dashboard Admin (`/admin`)
- Visão Kanban dos pedidos
- Filtros por status
- Edição de status e observações
- Integração Supabase

## Estrutura do Projeto

```
vizfit/
├── public/                 # Arquivos estáticos
├── src/
│   ├── app/               # Páginas Next.js
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── formulario/
│   │   ├── admin/
│   │   └── api/           # APIs (futuro)
│   ├── components/        # Componentes React
│   ├── lib/              # Funções utilitárias
│   │   ├── supabase.ts
│   │   ├── db.ts         # Operações database
│   │   └── pdf.ts        # Geração PDF
│   ├── types/            # TypeScript types
│   └── styles/           # Estilos globais
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Setup do Banco de Dados (Supabase)

### Tabela: `workout_requests`

```sql
CREATE TABLE workout_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  apartment TEXT NOT NULL,
  objective TEXT NOT NULL,
  level TEXT NOT NULL,
  frequency INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  restrictions TEXT,
  equipment_preference TEXT NOT NULL,
  contact_method TEXT NOT NULL,
  contact_value TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'recebido',
  notes TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_status ON workout_requests(status);
CREATE INDEX idx_created_at ON workout_requests(created_at DESC);
```

## Próximos Passos

- [ ] Integração de email/WhatsApp para confirmação automática
- [ ] Upload e integração de vídeos dos exercícios
- [ ] Geração automática de PDF após Felipe revisar
- [ ] Sistema de pagamento (Pix)
- [ ] Autenticação para Felipe acessar apenas admin
- [ ] Notificações em tempo real

## Deploy

```bash
npm run build
npm run start
```

Para deploy em Vercel:
```bash
vercel
```
