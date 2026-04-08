# 🏗️ VizFit - MVP Estrutura Completa

## 📊 Arquitetura do Projeto

```
vizfit/
│
├── 📄 Arquivos de Configuração
│   ├── package.json               → Dependências NPM
│   ├── tsconfig.json              → Configuração TypeScript
│   ├── tailwind.config.ts         → Configuração Tailwind CSS
│   ├── postcss.config.js          → PostCSS config
│   ├── next.config.js             → Configuração Next.js
│   ├── .eslintrc.json             → Linter config
│   ├── .gitignore                 → Arquivos ignorados
│   └── .env.example               → Template de variáveis
│
├── 📝 Documentação
│   ├── README.md                  → Visão geral
│   ├── SETUP.md                   → Setup completo
│   ├── CUSTOMIZATION.md           → Como customizar
│   ├── CHECKLIST.md               → Checklist setup
│   └── ARCHITECTURE.md            → Este arquivo
│
├── 📂 Pasta Public
│   └── public/                    → Imagens, favicon, etc.
│
├── 📂 Pasta Source (SRC)
│   │
│   ├── 🎨 Componentes React
│   │   ├── LandingPage.tsx         → Página inicial
│   │   ├── WorkoutForm.tsx         → Formulário 5 passos
│   │   └── AdminDashboard.tsx      → Kanban admin
│   │
│   ├── 📄 Páginas Next.js (Routing)
│   │   ├── app/
│   │   │   ├── layout.tsx          → Layout raiz
│   │   │   ├── page.tsx            → / (home)
│   │   │   ├── formulario/
│   │   │   │   └── page.tsx        → /formulario
│   │   │   └── admin/
│   │   │       └── page.tsx        → /admin
│   │   └── api/                   → (APIs futuras)
│   │
│   ├── 🔧 Utilitários (lib)
│   │   ├── supabase.ts            → Cliente Supabase
│   │   ├── db.ts                  → Funções database
│   │   ├── pdf.ts                 → Geração de PDF
│   │   ├── email.ts               → (Futuro)
│   │   ├── notifications.ts       → (Futuro)
│   │   └── storage.ts             → (Futuro)
│   │
│   ├── 📋 Tipos TypeScript
│   │   └── types/
│   │       └── index.ts           → Interfaces
│   │
│   └── 🎨 Estilos
│       └── styles/
│           └── globals.css        → Estilos globais
│
├── 🗄️ Banco de Dados
│   └── database.sql               → SQL para criar tabelas
│
└── 🚀 Scripts
    └── setup.sh                   → Script automático setup
```

---

## 🔄 Fluxo de Dados

```
[USUÁRIO FINAL]
      │
      ├─→ Landing Page (/)
      │       │
      │       └─→ Clica "Quero meu treino"
      │
      └─→ Formulário (/formulario)
              │
              ├─→ Preenche 5 passos
              │   (Nome, Objetivo, Nível, Frequência, Contato)
              │
              ├─→ Clica "Enviar"
              │
              └─→ Salva em Supabase
                   │
                   ├─→ INSERT em workout_requests
                   │
                   └─→ Confirmação ao usuário


[FELIPE - ADMIN]
      │
      └─→ Dashboard (/admin)
              │
              ├─→ Vê Kanban com todos os pedidos
              │   (Recebido → Em Revisão → Pronto → Enviado)
              │
              ├─→ Clique em "Editar Status"
              │   ├─→ Seleciona novo status
              │   ├─→ Adiciona observações
              │   └─→ Salva
              │
              ├─→ UPDATE em workout_requests
              │
              └─→ Pedido muda de coluna no Kanban


[COMUNICAÇÃO - FUTURO]
      │
      ├─→ WhatsApp/Email enviado
      │   └─→ Twilio/SendGrid
      │
      └─→ PDF gerado e anexado
          └─→ jsPDF
```

---

## 📊 Banco de Dados

### Tabela: `workout_requests`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID único do pedido |
| name | TEXT | Nome do morador |
| apartment | TEXT | Número do apartamento |
| objective | TEXT | Objetivo (emagrecimento, hipertrofia, etc) |
| level | TEXT | Nível (iniciante, intermediário, avançado) |
| frequency | INT | Dias por semana (3-6) |
| duration | INT | Minutos por sessão (30-90) |
| restrictions | TEXT | Lesões/restrições |
| equipment_preference | TEXT | Aparelhos/Peso livre/Ambos |
| contact_method | TEXT | Email ou WhatsApp |
| contact_value | TEXT | Email ou telefone |
| status | TEXT | recebido/em_revisao/pronto/enviado |
| notes | TEXT | Observações do Felipe |
| pdf_url | TEXT | Link do PDF gerado |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Última atualização |

---

## 🎯 URLs e Rotas

| URL | Componente | Função |
|-----|-----------|---------|
| `/` | LandingPage | Página inicial, CTA |
| `/formulario` | WorkoutForm | Formulário 5 passos |
| `/admin` | AdminDashboard | Painel Kanban Felipe |

---

## 🔐 Variáveis de Ambiente

```
NEXT_PUBLIC_SUPABASE_URL        → URL do projeto Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY   → Key pública do Supabase
SUPABASE_SERVICE_ROLE_KEY       → Key privada do Supabase
```

---

## 📦 Dependências Principais

### Frontend
- **Next.js 14**: Framework React com server-side rendering
- **React 18**: Biblioteca UI
- **TypeScript**: Tipagem estática

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: Processador CSS
- **Autoprefixer**: Prefixos CSS automáticos

### Database
- **Supabase JS**: Cliente Supabase
- **@supabase/supabase-js**: Acesso ao banco

### PDF
- **jsPDF**: Geração de PDFs
- **html2canvas**: Conversão HTML → imagem

---

## 🔄 Ciclo de Desenvolvimento

### Fase 1: Setup (Agora ✅)
```
[✅] Criação estrutura projeto
[✅] Configuração Next.js + Tailwind
[✅] templates components
[✅] Documentação
[⏳] Seu setup local
```

### Fase 2: Desenvolvimento Local
```
[ ] npm install
[ ] Configurar Supabase
[ ] npm run dev
[ ] Testar fluxo completo
[ ] Validar Kanban admin
```

### Fase 3: Integrações
```
[ ] Integrar WhatsApp/Email
[ ] Geração automática PDF
[ ] Autenticação Felipe
[ ] Sistema de pagamento
```

### Fase 4: Deployment
```
[ ] Build production
[ ] Deploy Vercel
[ ] Teste em produção
[ ] Domínio personalizado
```

---

## 🚀 Como Continuar

### 1️⃣ Setup Imediato (30 min)
```bash
# Terminal
cd /Users/jusope/Desktop/vizfit
chmod +x setup.sh
./setup.sh
npm run dev
```

### 2️⃣ Configurar Supabase (15 min)
- Criar projeto em [supabase.com](https://supabase.com/)
- Executar SQL de `database.sql`
- Copiar credenciais para `.env.local`

### 3️⃣ Testar Localmente (15 min)
- Acessar http://localhost:3000
- Preencher formulário completo
- Verificar em Supabase se salvou
- Testar admin dashboard

### 4️⃣ Customizar (1 hora)
- Editar cores em `tailwind.config.ts`
- Editar textos em componentes
- Adicionar logo/imagens

### 5️⃣ Deploy (30 min)
- Criar conta Vercel
- Conectar repo
- Configurar env vars
- Deploy!

---

## 💡 Dicas Rápidas

### Para editar cores
📁 `tailwind.config.ts` (linhas 7-10)

### Para editar textos
📁 `src/components/LandingPage.tsx` (principal)
📁 `src/components/WorkoutForm.tsx` (formulário)

### Para adicionar campos ao formulário
📁 `src/components/WorkoutForm.tsx` (linhas 22-32)
📁 `src/types/index.ts` (type WorkoutRequest)

### Para customizar PDF
📁 `src/lib/pdf.ts` (função generateTrainingPDF)

---

## 🔗 Integrações Disponíveis

### Comunicação
- Twilio WhatsApp/SMS
- SendGrid Email
- Firebase Cloud Messaging

### Pagamento
- Mercado Pago (Pix)
- Stripe
- PayPal

### Armazenamento
- Supabase Storage (vídeos)
- AWS S3
- Cloudinary (imagens)

### Analytics
- Google Analytics
- Mixpanel
- Segment

---

## 📞 Documentação Referência

```
Para...                    Veja o arquivo...
────────────────────────────────────────────
Setup completo            → SETUP.md
Customizar                → CUSTOMIZATION.md
Checklist                 → CHECKLIST.md
Visão geral               → README.md
Estrutura BD              → database.sql
```

---

## ✨ Próximas Milestones

```
🎯 MVP (Agora)
├─ Landing + Formulário
├─ Admin Kanban
└─ Supabase integrado

🎯 v1.0 (1 mês)
├─ WhatsApp automático
├─ Geração PDF automática
├─ Autenticação Felipe
└─ Pagamento Pix

🎯 v1.5 (2 meses)
├─ Upload vídeos exercícios
├─ Relatórios/Analytics
├─ Notificações real-time
└─ Mobile responsivo melhorado

🎯 v2.0 (3+ meses)
├─ App mobile (React Native)
├─ Wearables integration
├─ Marketplace personals
└─ Sistema avaliações
```

---

**Status:** 🟢 MVP Pronto para Setup
**Versão:** 0.1.0
**Data:** 8 de abril de 2026

Você está 10 passos adiante! 🎉
