# Customizações e Configurações - VizFit

## 1. Cores da Marca

Se quiser mudar as cores principais, edite `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#6366f1',    // Azul atual
      secondary: '#8b5cf6',  // Roxo atual
    },
  },
},
```

**Cores sugeridas:**
- Verde (treino): `primary: '#10b981'`
- Gold (premium): `primary: '#f59e0b'`
- Azul (profissional): `primary: '#3b82f6'` (atual)

---

## 2. Textos e Mensagens

### Landing Page
Edite `src/components/LandingPage.tsx`:
- Linha 14: Headline principal
- Linha 16: Subtítulo
- Linha 27-35: Explicação do fluxo

### Formulário
Edite `src/components/WorkoutForm.tsx`:
- Linha 22-32: Títulos dos passos
- Linha 105: Mensagem de confirmação

---

## 3. Horário de Entrega

Edite o texto "até 48h" em:
- Landing Page (linha 34)
- Formulário (linha 172)

---

## 4. Preço

Edite em `LandingPage.tsx` (linhas 93-103):

```typescript
<p className="text-5xl font-bold mb-2">R$ 59,90</p>
<p className="text-lg text-indigo-100 mb-6">
  3 treinos personalizados<br/>+ revisão do Felipe
</p>
```

---

## 5. Informações de Contato

Adicione WhatsApp/Email do Felipe em:
- README.md
- Footer da Landing Page
- Email da confirmação (quando integrar)

---

## 6. Integração de Notificações

### Para WhatsApp (Exemplo com Twilio)

1. **Instale Twilio**:
```bash
npm install twilio
```

2. **Configure as credenciais** em `.env.local`:
```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+5511999999999
```

3. **Crie a função** em `src/lib/notifications.ts`:
```typescript
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function sendWhatsApp(to: string, message: string) {
  try {
    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${to}`,
      body: message,
    })
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error)
  }
}
```

4. **Use na função de submissão** em `WorkoutForm.tsx`:
```typescript
await sendWhatsApp(
  formData.contact_value,
  `✅ Recebemos seu pedido!\n\nFilipe vai revisar e você receberá seu treino em até 48h.\n\nID: ${result.id}`
)
```

### Para Email (Exemplo com SendGrid)

1. **Instale SendGrid**:
```bash
npm install @sendgrid/mail
```

2. **Configure em `.env.local`**:
```
SENDGRID_API_KEY=your_api_key_here
```

3. **Crie a função** em `src/lib/email.ts`:
```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function sendConfirmationEmail(to: string, userName: string, requestId: string) {
  const msg = {
    to,
    from: 'noreply@vizfit.com.br',
    subject: '✅ Seu pedido de treino foi recebido!',
    html: `
      <h2>Olá ${userName}!</h2>
      <p>Recebemos seu pedido com sucesso!</p>
      <p><strong>ID do pedido:</strong> ${requestId}</p>
      <p>Felipe vai revisar seu treino e você receberá em até 48 horas.</p>
      <p>Qualquer dúvida, responda este email!</p>
      <p>💪 Bora treinar?</p>
    `,
  }

  await sgMail.send(msg)
}
```

---

## 7. Integração de Pagamento (Pix)

Para adicionar Pix:

1. **Instale uma lib de Pix**:
```bash
npm install mercadopago
```

2. **Crie componente de pagamento** em `src/components/PaymentButton.tsx`

3. **Redirecione após pagamento bem-sucedido**

---

## 8. Upload de Vídeos

Para permitir Felipe fazer upload de vídeos dos exercícios:

1. **Use Supabase Storage**:
```typescript
// src/lib/storage.ts
import { supabase } from './supabase'

export async function uploadExerciseVideo(file: File) {
  const filename = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from('exercise-videos')
    .upload(filename, file)

  if (error) throw error
  return data
}
```

2. **Adicione bucket no Supabase**:
   - Settings → Storage
   - New bucket: `exercise-videos`
   - Torne público

---

## 9. Geração de PDF Automática

Complementar `src/lib/pdf.ts` com mais detalhes:

```typescript
// Adicionar em pdf.ts
export function generatePDFWithImages(
  userData: WorkoutRequest,
  exercises: Exercise[],
  imagePath?: string
) {
  const doc = new jsPDF()
  // ... adicionar imagens dos exercícios
  // ... adicionar logo/branding
  return doc
}
```

---

## 10. Adicionar Logo/Imagem

1. **Adicione a imagem** em `public/logo.png`

2. **Use no componente**:
```typescript
import Image from 'next/image'

<Image 
  src="/logo.png" 
  alt="VizFit Logo" 
  width={100} 
  height={100} 
/>
```

---

## 11. Segurança com Autenticação

Para proteger a página `/admin` com senha/login:

1. **Instale Supabase Auth**:
```bash
npm install @supabase/auth-helpers-nextjs
```

2. **Crie página de login** em `src/app/admin/login/page.tsx`

3. **Proteja a rota** com middleware em `middleware.ts`

---

## 12. Analytics

Para rastrear conversões:

```bash
npm install gtag
```

Adicione em `layout.tsx`:
```typescript
<Script
  strategy="lazyOnload"
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
/>
<Script strategy="lazyOnload">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>
```

---

## 13. Deploy em Produção

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Alternativas
- Netlify
- Railway
- Render

---

## 14. Domínio Personalizado

Após deploy:
1. Compre domínio (godaddy, namecheap, etc)
2. Configure DNS para apontar para o host
3. Configure HTTPS automático

---

## 15. Localização

Para traduzir para outro idioma, edite textos em:
- `src/components/LandingPage.tsx`
- `src/components/WorkoutForm.tsx`
- `src/components/AdminDashboard.tsx`
- `database.sql` (constraints)

---

## Estrutura Final Customizável

```
vizfit/
├── public/
│   ├── logo.png              # ← Adicione logo aqui
│   └── favicon.ico           # ← Mude ícone
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx   # ← Customize cores, textos
│   │   ├── WorkoutForm.tsx   # ← Customize campos, passos
│   │   └── AdminDashboard.tsx
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── db.ts
│   │   ├── pdf.ts            # ← Customize template PDF
│   │   ├── email.ts          # ← ← Adicione
│   │   ├── notifications.ts  # ← ← Adicione
│   │   └── storage.ts        # ← ← Adicione
│   └── styles/
│       └── globals.css       # ← Customize fonts, temas
├── .env.local                # ← Preencha credenciais
├── tailwind.config.ts        # ← Customize cores
└── next.config.js
```

---

## Referência Rápida

| Arquivo | O que customizar |
|---------|-----------------|
| `LandingPage.tsx` | Headlines, cores, benefícios |
| `WorkoutForm.tsx` | Campos, passos, validações |
| `AdminDashboard.tsx` | Interface Kanban |
| `tailwind.config.ts` | Paleta de cores |
| `.env.local` | Credenciais Supabase |
| `database.sql` | Tabelas, validações |
| `SETUP.md` | Instruções de deployment |

---

Qualquer dúvida, consulte a documentação oficial dos frameworks utilizados!
