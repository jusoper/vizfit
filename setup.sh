#!/bin/bash

# VizFit Setup Script para macOS

echo "🚀 VizFit Installation Setup"
echo "============================\n"

# 1. Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "📦 Node.js não encontrado. Instalando via Homebrew..."
    
    # Instalar Homebrew se não existir
    if ! command -v brew &> /dev/null; then
        echo "📦 Homebrew não encontrado. Instalando..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    # Instalar Node.js
    brew install node
else
    echo "✅ Node.js já instalado: $(node --version)"
fi

# 2. Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado mesmo com Node.js instalado"
    exit 1
else
    echo "✅ npm já instalado: $(npm --version)"
fi

# 3. Ir para o diretório do projeto
cd /Users/jusope/Desktop/vizfit

# 4. Instalar dependências
echo "\n📥 Instalando dependências do projeto..."
npm install

# 5. Criar arquivo .env.local
if [ ! -f .env.local ]; then
    echo "\n🔐 Criando arquivo .env.local..."
    cp .env.example .env.local
    echo "⚠️  IMPORTANTE: Configure as variáveis Supabase em .env.local"
fi

# 6. Resumo
echo "\n✅ Setup Completo!"
echo "============================\n"
echo "Próximos passos:"
echo "1. Configure as variáveis Supabase em .env.local"
echo "2. Execute: npm run dev"
echo "3. Acesse: http://localhost:3000"
