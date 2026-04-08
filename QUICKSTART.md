# ⏱️ Guia de 30 Minutos - VizFit Funcionando

Siga este guia passo a passo para ter o VizFit rodando localmente em ~30 minutos.

---

## 🔴 FASE 1: Preparação (5 min)

### Passo 1.1: Verifique Node.js
Abra seu terminal e execute:
```bash
node --version
npm --version
```

**Esperado:** versão 18+ do Node e npm funcionando

**Se não tiver:**
```bash
# macOS
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
```

---

## 🟡 FASE 2: Setup Supabase (10 min)

### Passo 2.1: Criar Projeto
1. Acesse [supabase.com](https://supabase.com/)
2. Clique **"Sign Up"** (ou faça login)
3. Clique **"New Project"**
4. Preencha:
   - Name: `vizfit`
   - Database Password: `SenhaForte123!`
   - Region: `São Paulo` (ou mais perto de você)
5. Clique **"Create new project"** e **aguarde 3 min**

### Passo 2.2: Criar Tabelas
1. No dashboard Supabase, vá para **"SQL Editor"**
2. Clique **"New Query"**
3. **Copie tudo** de `database.sql` (no projeto)
4. **Cole** na query do Supabase
5. Clique **"Run"** ✅

### Passo 2.3: Copiar Credenciais
1. No dashboard, vá para **"Settings"** → **"API"**
2. Copie:
   - `Project URL` (ex: https://xxxxx.supabase.co)
   - `Anon public key` (a chave pública)
   - `Service role key`
3. **Não feche esta aba** - você vai precisar em breve

---

## 🟢 FASE 3: Configurar Projeto Local (10 min)

### Passo 3.1: Terminal
Abra seu terminal na pasta do projeto:
```bash
cd /Users/jusope/Desktop/vizfit
```

### Passo 3.2: Instalar Dependências
```bash
npm install
```

Isso vai **demorar 2-3 minutos**. Aguarde até ver:
```
added XXX packages in Xs
```

### Passo 3.3: Configurar .env.local
1. Abra o arquivo `.env.local` (no projeto)
2. Descomente as linhas (remova `#`)
3. Cole as credenciais do Supabase que você copiou:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

4. **Salve** o arquivo (Ctrl+S ou Cmd+S)

---

## 🟢 FASE 4: Rodar Projeto (5 min)

### Passo 4.1: Inicie o Servidor
No terminal:
```bash
npm run dev
```

**Esperado:** Mensagem como:
```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Passo 4.2: Abra no Navegador
Vá para: **http://localhost:3000**

**Esperado:** Página roxa com "Treino personalizado para academia do seu prédio" 🎉

---

## 🟢 FASE 5: Teste Completo (10 min)

### Teste 5.1: Landing Page
- [ ] Acesse http://localhost:3000
- [ ] Veja headline
- [ ] Leia sobre benefícios
- [ ] Clique **"Quero meu treino"**

### Teste 5.2: Formulário
- [ ] Página do formulário abriu?
- [ ] Vê "Passo 1 de 5"?
- [ ] Preencha:
  - Nome: "João Silva"
  - Apartamento: "101"
- [ ] Clique **"Próximo →"**
- [ ] Continue preenchendo:
  - Objetivo: "Hipertrofia"
  - Nível: "Intermediário"
  - Frequência: 4 dias
  - Duração: 60 minutos
  - Restrições: "Nenhuma"
  - Equipamento: "Ambos"
  - Contato: WhatsApp
  - Número: "(11) 99999-9999"
- [ ] Clique **"✅ Enviar"**
- [ ] Veja alerta de confirmação ✅

### Teste 5.3: Admin Dashboard
- [ ] Acesse http://localhost:3000/admin
- [ ] Vê 4 colunas (Recebido, Em Revisão, Pronto, Enviado)?
- [ ] Vê o pedido que acabou de enviar?
- [ ] Clique **"✏️ Editar Status"** no pedido
- [ ] Mude para "Em Revisão"
- [ ] Adicione nota: "Treino aprovado"
- [ ] Clique para salvar
- [ ] Pedido moveu de coluna? ✅

### Teste 5.4: Banco de Dados
1. Volte para Supabase
2. Vá para **"Table Editor"**
3. Clique em **"workout_requests"**
4. **Veja seu pedido lá!** ✅

---

## ✅ Se Tudo Funcionou

```
    ╔════════════════════════════════════╗
    ║                                    ║
    ║     🎉 PARABÉNS! 🎉               ║
    ║                                    ║
    ║  Seu MVP de Treino está RODANDO!   ║
    ║                                    ║
    ║  ✅ Landing Page                   ║
    ║  ✅ Formulário                     ║
    ║  ✅ Admin Dashboard                ║
    ║  ✅ Banco de Dados                 ║
    ║                                    ║
    ║  Próximo: Customizar e Deploy      ║
    ║                                    ║
    ╚════════════════════════════════════╝
```

---

## 🆘 Problems? Siga aqui

### "npm: command not found"
```bash
# Reinstale Node.js
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
```

### "Cannot find module '@supabase/supabase-js'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
# Acesse http://localhost:3001
```

### "Conexão com Supabase falhou"
- Verifique `.env.local` - está preenchido?
- Teste as credenciais em [Supabase Dashboard](https://supabase.com)
- Erro de tipografia? Copie novamente

### "Styling está quebrado"
```bash
rm -rf .next
npm run dev
```

### "Formulário não salva"
- Console aberto? (F12)
- Vê erro vermelho?
- Verifique `.env.local` com credenciais corretas
- Teste BD direto no Supabase

---

## 📚 Próximos Passos (Após ter funcionando)

1. **Customizar cores**
   - Edite `tailwind.config.ts`

2. **Editar textos**
   - Edite `src/components/LandingPage.tsx`

3. **Adicionar integração WhatsApp**
   - Veja `CUSTOMIZATION.md`

4. **Deploy para o ar**
   - Veja `SETUP.md` seção Deploy

---

## ⏱️ Cronômetro

```
Fase 1 (Prep):       0-5 min   ✓
Fase 2 (Supabase):   5-15 min  ✓
Fase 3 (Local):     15-25 min  ✓
Fase 4 (Run):       25-30 min  ✓
Fase 5 (Test):      30-40 min  ✓
─────────────────────────────────
TOTAL:              ~40 min   🎉
```

---

## 🎯 Checklist Rápido

- [ ] Node.js instalado
- [ ] Conta Supabase criada
- [ ] Projeto Supabase criado
- [ ] `database.sql` executado
- [ ] Credenciais copiadas
- [ ] `.env.local` preenchido
- [ ] `npm install` concluído
- [ ] `npm run dev` rodando
- [ ] Landing page abre
- [ ] Form abre
- [ ] Form salva em Supabase
- [ ] Admin dashboard mostra pedido
- [ ] Status pode ser alterado

---

## 🚀 Sucesso!

```bash
# Último comando
npm run dev

# Abra seu navegador
http://localhost:3000
```

**Pronto? Vamos começar! 💪**

---

**Tempo estimado:** 30-40 minutos
**Dificuldade:** ⭐ Iniciante
**Resultado:** MVP 100% Funcional 🎉
