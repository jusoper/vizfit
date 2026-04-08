# 🚀 Checklist de Implementação - Fluxo de Pagamento

## ✅ Desenvolvimento (Concluído)

- [x] Criar componente `PaymentPage.tsx` (Pix + valor)
- [x] Criar componente `ProofUploadPage.tsx` (upload de imagem)
- [x] Criar componente `ThankYouPage.tsx` (obrigado/timeline)
- [x] Criar rotas `/pagamento`, `/uploading-comprovante`, `/obrigado`
- [x] Atualizar `WorkoutForm.tsx` para redirecionar para `/pagamento`
- [x] Adicionar campos de pagamento no `database.sql`
- [x] Atualizar tipos TypeScript
- [x] Adicionar funções `getWorkoutRequestById()` e `uploadPaymentProof()` em `lib/db.ts`
- [x] Build: ✅ Compilou sem erros

---

## ⏭️ Próximos Passos (Configure isto agora!)

### NO SEU SUPABASE:

#### [ ] 1. Executar SQL de Atualização (5 min)
Vá para **SQL Editor** e cole:
```sql
ALTER TABLE IF EXISTS workout_requests ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pendente' CHECK (payment_status IN ('pendente', 'recebido', 'validado'));
ALTER TABLE IF EXISTS workout_requests ADD COLUMN IF NOT EXISTS payment_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE IF EXISTS workout_requests ADD COLUMN IF NOT EXISTS payment_proof_url TEXT;
ALTER TABLE IF EXISTS workout_requests ADD COLUMN IF NOT EXISTS payment_value DECIMAL(10, 2);
CREATE INDEX IF NOT EXISTS idx_payment_status ON workout_requests(payment_status);
CREATE INDEX IF NOT EXISTS idx_payment_date ON workout_requests(payment_date);
```

#### [ ] 2. Criar Bucket de Storage (2 min)
- Vá para **Storage** > **New Bucket**
- Nome: `payment-proofs`
- Make it public: ✅ SIM
- Click **Create bucket**

#### [ ] 3. Configurar RLS do Bucket (3 min)
Vá para o bucket `payment-proofs` > **Policies** > **New Policy**
```sql
create policy "Allow public uploads" on storage.objects for insert with check (bucket_id = 'payment-proofs');
create policy "Allow public read" on storage.objects for select using (bucket_id = 'payment-proofs');
```

---

### NO SEU CÓDIGO:

#### [ ] 4. Atualizar Chave Pix (1 min)
**Arquivo:** `src/components/PaymentPage.tsx`
**Linha ~15:**
```javascript
const PIX_KEY = 'filipe@vizfit.com.br' // ← MUDE AQUI!
```

#### [ ] 5. (Opcional) Atualizar Valor (1 min)
Se mudar R$ 97,00, atualize:
- `src/components/PaymentPage.tsx` linha ~16: `const PAYMENT_VALUE = 97.00`
- `src/lib/db.ts` linha ~13: `payment_value: 97.00,`

#### [ ] 6. (Opcional) Contato de Suporte (1 min)
Procure por `support@vizfit.com` em `src/components/ThankYouPage.tsx`

---

## 🧪 Testar Localmente

```bash
npm run dev
```

**Fluxo de teste:**
1. Acessar http://localhost:3000/formulario
2. Preencher TODOS os campos (6 passos)
3. Clicar "Enviar" → deve ir para `/pagamento?id=...`
4. Clicar "Já fiz o pagamento!" → deve ir para `/uploading-comprovante`
5. Clicar "Clique para anexar imagem" e selecionar qualquer PNG/JPG
6. Clicar "Confirmar" → deve ir para `/obrigado`

**Verificar resultado:**
- Supabase > `workout_requests` → Novos campos preenchidos
- Supabase > Storage > `payment-proofs` → Imagem lá

---

## 📋 Roteiro Recomendado

| Passo | O que fazer | Tempo |
|-------|-----------|-------|
| 1 | Executar SQL | 5 min |
| 2 | Criar bucket | 2 min |
| 3 | Setup RLS | 3 min |
| 4 | Atualizar Pix | 1 min |
| 5 | Testar localmente | 10 min |
| 6 | Fazer deploy | 5 min |
| **TOTAL** | | **26 min** ⚡ |

---

## 🎯 Status

| Item | Status |
|------|--------|
| **Frontend** | ✅ Pronto |
| **Backend** | ✅ Pronto |
| **Build** | ✅ Sem erros |
| **Supabase Setup** | ⏳ Manual (você faz) |
| **Chave Pix** | ⏳ Manual (você configura) |
| **Deploy** | ⏳ Próximo passo |

---

## 🎓 Documentação Completa

Ver arquivo: `PAYMENT_SETUP.md`

---

## 💬 Resumo

✨ **Tudo está pronto para funcionar!**

Você só precisa fazer 4 coisas rapidinhas no Supabase + atualizar a chave Pix = 11 minutos total até estar 100% funcional.

**Bora lá!** 🚀
