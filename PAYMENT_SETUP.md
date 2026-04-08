# Setup de Pagamento - Instruções

## ✅ O que foi implementado:

### Fluxo de Pagamento Completo:
1. **Página de pagamento** (`/pagamento`) com Pix
   - Exibe chave Pix copiável
   - Mostra valor: R$ 97,00
   - Timer: 48h para receber treino
   - Show detalhes do pedido

2. **Página de upload** (`/uploading-comprovante`)
   - Upload de imagem do comprovante
   - Preview antes de confirmar
   - Validação de tipo (apenas imagens)
   - Limite: 5MB

3. **Página de agradecimento** (`/obrigado`)
   - Confirmação visual atraente
   - Timeline do fluxo
   - ID do pedido para referência
   - Dados de contato do usuário

### Database:
✅ Novos campos adicionados:
```
- payment_status (pendente | recebido | validado)
- payment_date (timestamp)
- payment_proof_url (URL do comprovante)
- payment_value (valor em decimal)
```

### Componentes Criados:
- `src/components/PaymentPage.tsx`
- `src/components/ProofUploadPage.tsx`
- `src/components/ThankYouPage.tsx`

### Rotas Criadas:
- `/pagamento?id={requestId}`
- `/uploading-comprovante?id={requestId}`
- `/obrigado?id={requestId}`

### Funções DB Adicionadas:
- `getWorkoutRequestById()` - Fetch de um pedido específico
- `uploadPaymentProof()` - Upload e registro do comprovante

### Fluxo do Usuário Atualizado:
```
Preenche Formulário → Clica Enviar → 
Redireciona /pagamento → Vê Pix → Clica "Já fiz!" →
Redireciona /uploading-comprovante → Envia imagem →
Redireciona /obrigado ✅
```

---

## ⚠️ PRÓXIMOS PASSOS (OBRIGATÓRIO):

### 1️⃣ Executar SQL no Supabase

Vá para **SQL Editor** no painel do Supabase e execute:

```sql
ALTER TABLE IF EXISTS workout_requests ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pendente' CHECK (payment_status IN ('pendente', 'recebido', 'validado'));
ALTER TABLE IF EXISTS workout_requests ADD COLUMN IF NOT EXISTS payment_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE IF EXISTS workout_requests ADD COLUMN IF NOT EXISTS payment_proof_url TEXT;
ALTER TABLE IF EXISTS workout_requests ADD COLUMN IF NOT EXISTS payment_value DECIMAL(10, 2);

CREATE INDEX IF NOT EXISTS idx_payment_status ON workout_requests(payment_status);
CREATE INDEX IF NOT EXISTS idx_payment_date ON workout_requests(payment_date);
```

### 2️⃣ Criar Bucket de Storage

No painel do Supabase, **Storage > New Bucket**:
- Nome: `payment-proofs`
- Make it public: ✅ **SIM**
- File size limit: 50 MB

### 3️⃣ Configurar RLS do Bucket

```sql
-- Permitir uploads público
create policy "Allow public uploads" on storage.objects for insert with check (bucket_id = 'payment-proofs');

-- Permitir leitura pública
create policy "Allow public read" on storage.objects for select using (bucket_id = 'payment-proofs');
```

### 4️⃣ Atualizar Chave Pix

**Arquivo:** `src/components/PaymentPage.tsx`

Procure por:
```javascript
const PIX_KEY = 'filipe@vizfit.com.br' // ← SUBSTITUA AQUI!
```

Troque pela sua chave real.

### 5️⃣ (Opcional) Atualizar Valor do Treino

Se mudar R$ 97,00, atualize em:
- `src/components/PaymentPage.tsx` → `const PAYMENT_VALUE = 97.00`
- `src/lib/db.ts` → `payment_value: 97.00,`

### 6️⃣ (Opcional) Contato de Suporte

Procure por `support@vizfit.com` em:
- `src/components/ThankYouPage.tsx`

---

## 🧪 Como Testar Localmente:

```bash
npm run dev
```

1. Acessar http://localhost:3000/formulario
2. Preencher formulário completo
3. Clicar "Enviar" 
4. ✅ Deve redirecionar para `/pagamento?id=...`
5. Clicar "Já fiz o pagamento!"
6. ✅ Deve redirecionar para `/uploading-comprovante`
7. Selecionar imagem
8. ✅ Deve redirecionar para `/obrigado`

### Verificar no Supabase:
- Tabela `workout_requests` → Novos campos preenchidos
- Storage `payment-proofs` → Imagem enviada

---

## 📊 Status de Pagamento

| Status | Significado |
|--------|------------|
| `pendente` | Usuário ainda não enviou comprovante |
| `recebido` | Comprovante recebido, aguardando análise |
| `validado` | Pagamento confirmado, pronto para enviar treino |

---

## 🔐 Checklist de Segurança

⚠️ **ANTES DE PRODUÇÃO:**

- [ ] Remover `'Allow public insert'` se precisar
- [ ] Configurar autenticação no Supabase
- [ ] Validar uploads no servidor (não apenas client-side)
- [ ] Usar variáveis de ambiente para chave Pix
- [ ] Configurar CORS adequadamente
- [ ] Testar rate limiting de uploads
- [ ] Validar tipos de arquivo no servidor

---

## 🚀 Funcionalidades Futuras (Admin Dashboard)

Quando quiser adicionar no AdminDashboard:
- [ ] Listar pedidos com `payment_status = 'recebido'`
- [ ] Botão para validar comprovante (mudar para `'validado'`)
- [ ] Disparar PDF quando validado
- [ ] Histórico de pagamentos
- [ ] Estatísticas de receita
- [ ] Download de comprovantes

---

## 📱 Links Úteis

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [RLS (Row Level Security)](https://supabase.com/docs/guides/auth/row-level-security)
- [SQL na Supabase](https://supabase.com/docs/guides/database)
- [Next.js 14 App Router](https://nextjs.org/docs/app)

---

## ✨ Resumo

O fluxo de pagamento está **100% pronto para uso**. Você só precisa:

1. Executar os queries SQL
2. Criar o bucket de storage
3. Atualizar a chave Pix
4. Testar localmente
5. Deploy!

Qualquer dúvida, consulte este arquivo.

