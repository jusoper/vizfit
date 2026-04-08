# 📋 Checklist de Setup - VizFit MVP

## ✅ Etapa 1: Instalação Inicial

- [ ] Node.js v18+ instalado (`node --version`)
- [ ] npm instalado (`npm --version`)
- [ ] Projeto clonado/extraído em `/Users/jusope/Desktop/vizfit`

## ✅ Etapa 2: Dependências

- [ ] Rodou `npm install` com sucesso
- [ ] Pasta `node_modules/` criada

## ✅ Etapa 3: Supabase

- [ ] Conta criada em [supabase.com](https://supabase.com/)
- [ ] Projeto Supabase criado
- [ ] SQL da tabela executado (`database.sql`)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` copiado para `.env.local`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` copiado para `.env.local`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` copiado para `.env.local`

## ✅ Etapa 4: Desenvolvimento Local

- [ ] Rodou `npm run dev`
- [ ] Acessou http://localhost:3000
- [ ] Landing page carregou corretamente
- [ ] Clicou em "Quero meu treino" → formulário abriu
- [ ] Preencheu formulário completo → pedido foi salvo no Supabase

## ✅ Etapa 5: Admin Dashboard

- [ ] Acessou http://localhost:3000/admin
- [ ] Viu os pedidos em formato Kanban
- [ ] Conseguiu alterar status de um pedido
- [ ] Pedido apareceu na coluna correta

## ❓ Opcional: Integrações Futuras

- [ ] WhatsApp: Instalou Twilio (quando ready)
- [ ] Email: Instalou SendGrid (quando ready)
- [ ] Pagamento: Integrou Mercado Pago (quando ready)
- [ ] Vídeos: Configurou Storage no Supabase (quando ready)

## 🚀 Etapa 6: Deploy (Quando pronto para IR AO AR)

- [ ] Criou conta em [vercel.com](https://vercel.com/)
- [ ] Conectou repo ao Vercel
- [ ] Configurou variáveis de ambiente em Vercel
- [ ] Deploy automático funcionando
- [ ] Site live em URL própria

## 📝 Testes Básicos

### Landing Page Checklist
```
[ ] Header com logo e menu
[ ] Headline: "Treino personalizado para academia do seu prédio"
[ ] Fluxo explicado: 1. Preenche → 2. Felipe revisa → 3. Recebe PDF
[ ] CTA "Quero meu treino" clicável
[ ] Seção "Por que escolher?" com 3 benefícios
[ ] Preço: R$ 59,90
[ ] Footer com copyright
```

### Formulário Checklist
```
[ ] Passo 1: Nome + Apartamento
  [ ] Validação obrigatória
[ ] Passo 2: Objetivo (radio buttons)
  [ ] Emagrecimento, Hipertrofia, Resistência, Condicionamento
[ ] Passo 3: Nível (radio buttons)
  [ ] Iniciante, Intermediário, Avançado
[ ] Passo 4: Frequência + Duração (botões)
  [ ] 3, 4, 5, 6 dias/semana
  [ ] 30, 45, 60, 90 minutos
[ ] Passo 5: Restrições + Equipamento + Contato
  [ ] Textarea para restrições
  [ ] Radio: Aparelhos, Peso livre, Ambos
  [ ] Radio: WhatsApp ou Email
  [ ] Input para número/email
[ ] Botão "Enviar" → Alerta de confirmação
[ ] Redirecionamento para home
[ ] Dados aparecem no Supabase
```

### Admin Dashboard Checklist
```
[ ] 4 colunas: Recebido, Em Revisão, Pronto, Enviado
[ ] Botões de filtro por status
[ ] Cards dos pedidos em cada coluna
[ ] Dados visíveis: Nome, Apartamento, Objetivo, Nível, etc.
[ ] Botão "Editar Status" em cada card
[ ] Modal de edição: status dropdown + notes textarea
[ ] Atualização reflete no Kanban em tempo real
```

---

## 🔍 Troubleshooting

| Problema | Solução |
|----------|---------|
| npm: command not found | Reinstale Node.js com Homebrew |
| CORS Error ao salvar | Verifique `.env.local` com credenciais corretas |
| Página branca | Limpe cache: `rm -rf .next && npm run dev` |
| Supabase não conecta | Teste a URL em Supabase Dashboard |
| Tailwind não funciona | Rode `npm install -D tailwindcss` |

---

## 📞 Próximas Ações Recomendadas

### Imediatamente (MVP)
1. [ ] Completar checklist acima
2. [ ] Testar formulário → Supabase
3. [ ] Testar admin dashboard

### Curto Prazo (1-2 semanas)
1. [ ] Integrar WhatsApp/Email automáticos
2. [ ] Criar template de PDF melhorado
3. [ ] Implementar geração automática de PDF
4. [ ] Adicionar autenticação para Felipe

### Médio Prazo (1 mês)
1. [ ] Integrar pagamento Pix
2. [ ] Upload de vídeos dos exercícios
3. [ ] Notificações em tempo real
4. [ ] Relatórios/Analytics

### Longo Prazo (Roadmap)
1. [ ] App mobile (React Native)
2. [ ] Integração com wearables
3. [ ] Marketplace de personals
4. [ ] Sistema de avaliações

---

## 📚 Documentação Importante

- **SETUP.md** - Instruções detalhadas de setup
- **README.md** - Visão geral do projeto
- **CUSTOMIZATION.md** - Como customizar cores, textos, integrações
- **database.sql** - Estrutura do banco de dados

---

## 🎯 Objetivo Final

```
┌─────────────────────────────────────────────┐
│  LANDING PAGE (/)`                           │
│  ✓ Headline clara                          │
│  ✓ Fluxo explicado                         │
│  ✓ CTA "Quero meu treino"                  │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  FORMULÁRIO (/formulario)                    │
│  ✓ 5 passos com progresso                  │
│  ✓ Coleta dados do usuário                 │
│  ✓ Salva em Supabase                       │
│  ✓ Confirma por email/WhatsApp             │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  ADMIN DASHBOARD (/admin)                    │
│  ✓ Kanban com status                       │
│  ✓ Felipe revisa pedidos                   │
│  ✓ Gera PDF customizado                    │
│  ✓ Envia para usuário                      │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  USUÁRIO RECEBE TREINO                       │
│  ✓ PDF por email/WhatsApp                  │
│  ✓ Links de vídeos dos exercícios          │
│  ✓ Começa a treinar!                       │
└─────────────────────────────────────────────┘
```

---

## ✨ Sucesso!

Quando tudo estiver funcionando, você terá um **MVP funcional** pronto para:
- 📱 Receber inscrições de moradores
- 👤 Felipe revisar e gerar treinos
- 📄 Entregar PDFs personalizados
- 💪 Ajudar pessoas a treinar melhor

Parabéns! 🎉

---

**Última atualização:** 8 de abril de 2026
**Versão:** 0.1.0 (MVP)
