# 📁 Estrutura de Pastas - VizFit

> Organização clara e intuitiva do projeto

```
vizfit/
│
├── 📄 Documentação
│   ├── README.md                 # Visão geral do projeto
│   ├── COMECE_AQUI.md           # Guia de início rápido ⭐
│   ├── SETUP.md                 # Instruções de setup
│   ├── ARCHITECTURE.md          # Arquitetura técnica
│   ├── CUSTOMIZATION.md         # Como customizar
│   ├── ESTRUTURA_PASTAS.md     # Este arquivo
│   ├── CHECKLIST.md             # Checklist de implementação
│   ├── STATUS.md                # Status do projeto
│   └── database.sql             # SQL do banco de dados
│
├── ⚙️ Configuração
│   ├── package.json             # Dependências NPM
│   ├── tsconfig.json            # TypeScript config
│   ├── next.config.js           # Next.js config
│   ├── tailwind.config.ts       # Tailwind CSS config
│   ├── postcss.config.js        # PostCSS config
│   ├── .env.example             # Template de variáveis
│   ├── .env.local               # Variáveis (não commitar) 🔐
│   ├── .eslintrc.json           # ESLint config
│   └── .gitignore               # Git ignore list
│
├── 📂 public/                    # Arquivos estáticos
│   └── images/
│       ├── logos/
│       │   └── vizfit-logo.png  # Logo da marca ✨
│       └── icons/               # Ícones (futuro)
│
├── 📂 src/                       # Código fonte
│   │
│   ├── components/              # React Components
│   │   ├── LandingPage.tsx      # Página inicial com logo
│   │   ├── WorkoutForm.tsx      # Formulário com logo
│   │   └── AdminDashboard.tsx   # Painel do admin
│   │
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Layout raiz
│   │   ├── page.tsx             # / (Home - LandingPage)
│   │   ├── formulario/
│   │   │   └── page.tsx         # /formulario (WorkoutForm)
│   │   └── admin/
│   │       └── page.tsx         # /admin (AdminDashboard)
│   │
│   ├── lib/                     # Funções utilitárias
│   │   ├── supabase.ts          # Cliente Supabase
│   │   ├── db.ts                # Funções database
│   │   └── pdf.ts               # Geração de PDF
│   │
│   ├── types/                   # TypeScript types
│   │   └── index.ts             # Interfaces e types
│   │
│   └── styles/                  # Estilos globais
│       └── globals.css          # CSS global
│
├── 🔧 Scripts
│   └── setup.sh                 # Script de setup automático
│
└── 📁.github/                   # GitHub config
    └── copilot-instructions.md  # Instruções do Copilot
```

---

## 🎯 Organização por Propósito

### 📄 **Documentação** (Raiz do projeto)
Todos os arquivos `.md` ficam na raiz para fácil acesso:
- `COMECE_AQUI.md` - Primeiro arquivo a ler
- `README.md` - Overview do projeto
- `SETUP.md` - Instruções passo a passo
- `ARQUITETURA.md` - Detalhes técnicos
- `CUSTOMIZATION.md` - Personalizações
- `ESTRUTURA_PASTAS.md` - Este mapa

### ⚙️ **Configuração** (Raiz do projeto)
Arquivos de config na raiz para fácil localização:
- `package.json` - Dependências
- `tsconfig.json` - TypeScript
- `next.config.js` - Next.js
- `tailwind.config.ts` - Tailwind
- `.env.local` - Variáveis secretas (não commitar)

### 📂 **public/** - Arquivos Estáticos
```
public/
├── images/           # Imagens otimizadas
│   ├── logos/       # Logos da marca
│   └── icons/       # Ícones SVG/PNG
```
- Servidos na raiz da URL (`/images/logos/vizfit-logo.png`)
- Logo integrado em LandingPage e WorkoutForm

### 📂 **src/components/** - Componentes React
```
components/
├── LandingPage.tsx      # Página de vendas (com logo)
├── WorkoutForm.tsx      # Formulário 5 passos (com logo)
└── AdminDashboard.tsx   # Painel Kanban
```

### 📂 **src/app/** - Rotas Next.js (App Router)
```
app/
├── layout.tsx              # Layout raiz (metadata, fonts)
├── page.tsx                # Rota / (home)
├── formulario/page.tsx     # Rota /formulario
└── admin/page.tsx          # Rota /admin
```

### 📂 **src/lib/** - Lógica e Utilitários
```
lib/
├── supabase.ts  # Cliente Supabase inicializado
├── db.ts        # Funções CRUD do banco
└── pdf.ts       # Geração de PDFs
```

### 📂 **src/types/** - TypeScript Types
```
types/
└── index.ts     # Todas as interfaces TypeScript
```

### 📂 **src/styles/** - Estilos
```
styles/
└── globals.css  # Estilos globais (Tailwind)
```

---

## 🖼️ Logo no Projeto

O logo foi integrado em dois lugares principais:

### 1️⃣ **Landing Page** (`LandingPage.tsx`)
```
Header da página
└── Logo VizFit (clicável, leva para home)
    └── Headline "Treino personalizado..."
```

### 2️⃣ **Formulário** (`WorkoutForm.tsx`)
```
Topo do formulário
└── Logo VizFit (clicável, leva para home)
    └── "Seu Treino Personalizado"
```

**Arquivo:** `public/images/logos/vizfit-logo.png`

---

## ✨ Padrões de Organização

### 🎯 **Por Funcionalidade**
- `components/` - Componentes reutilizáveis
- `app/` - Rotas/páginas
- `lib/` - Lógica compartilhada

### 🎯 **Por Tecnologia**
- `styles/` - CSS/Tailwind
- `types/` - TypeScript
- `lib/supabase.ts` - Banco de dados

### 🎯 **Por Contexto**
- `public/` - Assets públicos
- `src/` - Código privado
- Raiz - Config + documentação

---

## 📝 Como Adicionar Novos Arquivos

### Novo Component React
```bash
# Crie em src/components/
src/components/MeuComponente.tsx
```

### Nova Página/Rota
```bash
# Crie em src/app/
src/app/minha-rota/page.tsx
```

### Nova Imagem/Logo
```bash
# Coloque em public/images/
public/images/logos/novo-logo.png
public/images/icons/novo-icon.svg
```

### Nova Função Utilitária
```bash
# Adicione em src/lib/
src/lib/minha-utilidade.ts
```

---

## 🚀 Estrutura Otimizada para:
✅ Fácil navegação  
✅ Escalabilidade futura  
✅ Padrão Next.js  
✅ Separação de responsabilidades  
✅ TypeScript stricto  
✅ Tailwind CSS  
✅ Supabase integration  

