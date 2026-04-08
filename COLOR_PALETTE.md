# 🎨 Paleta de Cores Vizfit

Paleta profissional de cores focada em **confiança, tecnologia e movimento** com azul e laranja.

## Cores Principais

| Função | Cor | Hex | Tailwind | Uso |
|--------|-----|-----|----------|-----|
| Base neutra / fundo | Branco | `#FFFFFF` | `bg-neutral-white` | Páginas, cards, PDFs – clean e legível |
| Fundo light | Cinza muito claro | `#F5F7FA` | `bg-bg-light` | Backgrounds alternos, seções |
| Texto principal | Preto profissional | `#1A1A1A` | `text-text-primary` | Texto principal, headers, emphasis |
| Texto secundário | Cinza médio | `#4F5B6C` | `text-text-secondary` | Informações secundárias, descrições |
| Texto terciário | Cinza claro | `#8B95A8` | `text-text-tertiary` | Placeholders, hints, informações terciárias |
| **CTA / Movimento** | **Laranja energético** | **`#FF8C42`** | **`bg-accent-orange`** | **Botões primários, CTAs, actions ("Quero meu treino")** |
| CTA hover | Laranja escuro | `#E67E22` | `bg-accent-orange-dark` | Estado hover dos botões orange |
| **Confiança / Tech** | **Azul profissional** | **`#0052CC`** | **`bg-primary-blue`** | **Buttons secundários, headers, links, destaques tecnológicos** |
| Azul hover | Azul escuro | `#003D99` | `bg-primary-blue-dark` | Estado hover dos botões blue |
| Azul background | Azul claro | `#E3F2FD` | `bg-primary-blue-light` | Highlights, badges, info boxes com azul |
| Azul fundo escuro | Azul escuro | `#1F3A70` | `bg-dark-blue` | Backgrounds de cards premium, gradientes |

## Exemplos de Uso

### Botão Principal (CTA) - Laranja
```jsx
<button className="bg-accent-orange text-neutral-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-orange-dark">
  Quero meu treino
</button>
```

### Botão Secundário - Azul
```jsx
<button className="bg-primary-blue text-neutral-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-blue-dark">
  Saiba mais
</button>
```

### Cabeçalho com Destaque Azul
```jsx
<h1 className="text-text-primary text-3xl font-bold">
  Transforme seu <span className="text-primary-blue">corpo</span>
</h1>
```

### Card Premium com Azul
```jsx
<div className="bg-primary-blue-light border-l-4 border-primary-blue p-4 rounded">
  <h3 className="text-text-primary font-semibold">Treino Profissional</h3>
  <p className="text-text-secondary text-sm">Personalizado com IA</p>
</div>
```

### Card com Destaque Laranja
```jsx
<div className="bg-accent-orange-light border-l-4 border-accent-orange p-4 rounded">
  <h3 className="text-text-primary font-semibold">🚀 Ação Rápida</h3>
  <p className="text-text-secondary text-sm">Comece seu treino agora</p>
</div>
```

## Variações de Opacidade

Todas as cores suportam variações com opacidade usando Tailwind:
- `bg-energy-green/50` (50% opacity)
- `text-tech-blue/75` (75% opacity)
- Etc.

## Contraste e Acessibilidade

- ✅ Texto escuro (`#1A1A1A`) sobre fundo claro (`#FFFFFF` / `#F5F7FA`) - WCAG AAA
- ✅ Texto sobre `accent-orange` / `primary-blue` - use `text-neutral-white`
- ✅ Cores não devem ser a única forma de comunicar informação (ex: sempre adicione ícones ou texto nos status de treino)
- ✅ Azul `#0052CC` + Laranja `#FF8C42` têm contraste visual forte

## Estratégia Visual

- **Azul**: Profissionalismo, confiança, tecnologia, seções informativas
- **Laranja**: Energia, movimento, ação, CTAs principais
- **Cinzas**: Hierarquia de informação, backgrounds
- **Efeito**: Combina confiança técnica com movimento energético

## Atualizado em
- Data: 8 de abril de 2026
- Versão: 2.0 (Professional Blue & Orange)
