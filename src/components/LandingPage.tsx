'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy-dark text-text-primary">
      {/* Header */}
      <header className="border-b border-orange-primary/20 bg-navy-dark sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center hover:opacity-80 transition">
              <Image
                src="/images/logos/vizfit-logo.png"
                alt="VizFit Logo"
                width={120}
                height={40}
                priority
                className="h-auto w-auto"
              />
            </Link>
            <nav className="hidden sm:flex gap-8">
              <a href="#como-funciona" className="text-off-white hover:text-orange-primary transition">Como funciona</a>
              <a href="#por-que" className="text-off-white hover:text-orange-primary transition">Recursos</a>
              <a href="#quem-somos" className="text-off-white hover:text-orange-primary transition">Quem somos</a>
              <a href="#oferta" className="text-off-white hover:text-orange-primary transition">Oferta</a>
            </nav>
          </div>
        </div>
      </header>

      {/* SEÇÃO 1: HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Conteúdo em 2 colunas 50/50 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Coluna Esquerda - Texto */}
          <div>
            {/* Título Principal */}
            <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight text-off-white">
              Treino Personalizado para o Seu Prédio
            </h1>

            {/* Subtítulo com Credibilidade */}
            <p className="text-xl text-blue-secondary font-semibold mb-2">
              Criado com IA e validado por personal trainer com CREF
            </p>

            {/* Linha de Reforço (ESSENCIAL) */}
            <p className="text-lg text-off-white/80 mb-8">
              Considera os equipamentos do seu prédio, seu nível e suas limitações
            </p>

            {/* Bullet Points - 3 no máximo */}
            <div className="space-y-2 mb-10">
              <div className="flex items-start gap-3">
                <span className="text-orange-primary text-2xl flex-shrink-0">✓</span>
                <span className="text-off-white">Sem mensalidade de personal</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-primary text-2xl flex-shrink-0">✓</span>
                <span className="text-off-white">Pronto em até 48h</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-primary text-2xl flex-shrink-0">✓</span>
                <span className="text-off-white">Do iniciante ao avançado</span>
              </div>
            </div>

            {/* Linha Forte */}
            <p className="text-xl text-orange-primary font-bold mb-8">
              Você só precisa seguir o treino.<br></br>A gente cuida do resto.
            </p>

            {/* CTA Principal */}
            <Link
              href="/formulario"
              className="inline-block bg-orange-primary text-off-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-accent-orange-dark transition transform hover:scale-105 shadow-2xl mb-4"
            >
              Quero gerar meu treino
            </Link>

            {/* Subtexto CTA */}
            <p className="text-sm text-off-white/60 mb-8">
              Leva menos de 2 minutos
            </p>

            {/* Prova Social */}
            <div className="flex items-center gap-2 text-off-white/70 text-sm">
              <span className="text-base">👥</span>
              <span>Moradores já usando no prédio</span>
            </div>
          </div>

          {/* Coluna Direita - Mockup (placeholder) */}
          <div className="hidden md:flex justify-center items-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-primary/50 to-orange-primary/20 rounded-full blur-3xl"></div>
            <Image
              src="/images/icons/vizfit-phone.png"
              alt="VizFit no celular - Seu treino personalizado"
              width={2500}
              height={3200}
              priority
              className="w-auto h-auto max-w-md drop-shadow-2xl relative z-10"
            />
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: COMO FUNCIONA */}
      <section id="como-funciona" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-off-white">
          Como funciona
        </h2>

        {/* 3 Passos */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Passo 1 */}
          <div className="bg-blue-secondary/10 rounded-xl p-8 backdrop-blur-sm border border-blue-secondary/20 hover:border-orange-primary/50 transition">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-primary/20 border-2 border-orange-primary mb-6">
              <span className="text-2xl font-bold text-orange-primary">1</span>
            </div>
            <h3 className="text-xl font-bold text-off-white mb-3">
              Responda a anamnese
            </h3>
            <p className="text-off-white/80 text-sm">
              2 minutos para conhecer seus objetivos, restrições e sua rotina de treinos
            </p>
          </div>

          {/* Passo 2 */}
          <div className="bg-blue-secondary/10 rounded-xl p-8 backdrop-blur-sm border border-blue-secondary/20 hover:border-orange-primary/50 transition">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-primary/20 border-2 border-orange-primary mb-6">
              <span className="text-2xl font-bold text-orange-primary">2</span>
            </div>
            <h3 className="text-xl font-bold text-off-white mb-3">
              IA monta seu treino → Personal revisa e ajusta
            </h3>
            <p className="text-off-white/80 text-sm">
              Inteligência artificial cria seu treino. Personal Trainer revisa e ajusta
            </p>
          </div>

          {/* Passo 3 */}
          <div className="bg-blue-secondary/10 rounded-xl p-8 backdrop-blur-sm border border-blue-secondary/20 hover:border-orange-primary/50 transition">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-primary/20 border-2 border-orange-primary mb-6">
              <span className="text-2xl font-bold text-orange-primary">3</span>
            </div>
            <h3 className="text-xl font-bold text-off-white mb-3">
              Receba seu treino pronto
            </h3>
            <p className="text-off-white/80 text-sm">
              Com instruções claras e tudo o que você precisa para começar
            </p>
          </div>
        </div>

        {/* Linha de Confiança - Destaque */}
        <div className="bg-gradient-to-r from-orange-primary/15 to-transparent rounded-xl p-6 border-l-4 border-orange-primary max-w-3xl mx-auto">
          <p className="text-lg text-off-white font-semibold flex items-center gap-3">
            <span className="text-2xl">✔</span>
            Nada é enviado sem validação profissional (CREF 207438-G/SP)
          </p>
        </div>
      </section>

      {/* SEÇÃO 3: RECURSOS */}
      <section id="por-que" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-off-white">
          Recursos
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 - Personalização Real */}
          <div className="bg-blue-secondary/10 rounded-2xl p-8 backdrop-blur-sm border border-blue-secondary/20 hover:border-orange-primary hover:transform hover:scale-105 transition">
            <div className="text-5xl mb-6">🧠</div>
            <h3 className="text-2xl font-bold text-orange-primary mb-3">
              Personalização real
            </h3>
            <p className="text-off-white/80">
              Treino adaptado ao seu nível, objetivo e limitações
            </p>
          </div>

          {/* Card 2 - Academia do Prédio (MUITO FORTE) */}
          <div className="bg-blue-secondary/10 rounded-2xl p-8 backdrop-blur-sm border border-blue-secondary/20 hover:border-orange-primary hover:transform hover:scale-105 transition ring-2 ring-orange-primary/30">
            <div className="text-5xl mb-6">🏢</div>
            <h3 className="text-2xl font-bold text-orange-primary mb-3">
              Feito para sua academia
            </h3>
            <p className="text-off-white/80">
              Montado com base nos equipamentos que você realmente tem acesso
            </p>
            <p className="text-orange-primary text-xs font-semibold mt-4 uppercase tracking-wide">
              ⚡ Diferencial forte
            </p>
          </div>

          {/* Card 3 - Revisado por Profissional */}
          <div className="bg-blue-secondary/10 rounded-2xl p-8 backdrop-blur-sm border border-blue-secondary/20 hover:border-orange-primary hover:transform hover:scale-105 transition">
            <div className="text-5xl mb-6">👨‍🏫</div>
            <h3 className="text-2xl font-bold text-orange-primary mb-3">
              Revisado por profissional
            </h3>
            <p className="text-off-white/80">
              Ajustado por personal trainer formado para garantir segurança
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: QUEM SOMOS */}
      <section id="quem-somos" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-off-white">
          Quem somos
        </h2>
        <p className="text-center text-lg text-blue-secondary font-semibold mb-16">
          Moradores criando uma forma mais simples de treinar no próprio prédio
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Felipe */}
          <div className="bg-blue-secondary/10 rounded-2xl p-8 backdrop-blur-sm border border-blue-secondary/20">
            <div className="mb-6 w-24 h-24 rounded-full overflow-hidden border-4 border-orange-primary/30">
              <Image
                src="/images/icons/felipe.jpeg"
                alt="Felipe"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-orange-primary mb-2">
              Felipe Vazzoler
            </h3>
            <p className="text-off-white/60 text-sm font-semibold mb-4">
              Personal trainer
            </p>
            <ul className="space-y-2 text-off-white/80">
              <li className="flex items-start gap-2">
                <span className="text-orange-primary flex-shrink-0">•</span>
                <span>Formado em Educação Física</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-primary flex-shrink-0">•</span>
                <span>Responsável por revisar e validar todos os treinos</span>
              </li>
            </ul>
          </div>

          {/* Julia */}
          <div className="bg-blue-secondary/10 rounded-2xl p-8 backdrop-blur-sm border border-blue-secondary/20">
            <div className="mb-6 w-24 h-24 rounded-full overflow-hidden border-4 border-orange-primary/30">
              <Image
                src="/images/icons/julia.jpeg"
                alt="Julia"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-orange-primary mb-2">
              Julia Soares
            </h3>
            <p className="text-off-white/60 text-sm font-semibold mb-4">
              Engenheira de IA
            </p>
            <ul className="space-y-2 text-off-white/80">
              <li className="flex items-start gap-2">
                <span className="text-orange-primary flex-shrink-0">•</span>
                <span>Responsável pela tecnologia de personalização</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Final Conectando */}
        <div className="mt-12 bg-gradient-to-r from-orange-primary/10 to-blue-secondary/10 rounded-xl p-8 border border-orange-primary/20 text-center max-w-3xl mx-auto">
          <p className="text-lg text-off-white font-semibold">
            Criamos o VizFit para facilitar o treino dos moradores, sem complicação e sem custo alto
          </p>
        </div>
      </section>

      {/* SEÇÃO 5: OFERTA */}
      <section id="oferta" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-b from-orange-primary/20 to-blue-secondary/10 rounded-3xl p-12 text-center backdrop-blur-sm border-2 border-orange-primary max-w-2xl mx-auto">
          <p className="text-orange-primary font-bold text-lg mb-4 uppercase tracking-wide">
            Oferta de lançamento para moradores
          </p>

          <p className="text-off-white/80 text-base mb-6">
            Acesso inicial com preço reduzido
          </p>

          <p className="text-7xl font-black text-orange-primary mb-6">
            R$ 59,00
          </p>

          <div className="bg-off-white/5 rounded-xl p-6 mb-8 border border-off-white/10">
            <p className="text-off-white text-lg">
              ✓ Treinos personalizados<br/>
              ✓ Revisão do personal (CREF)<br/>
              ✓ Entrega direto no WhatsApp
            </p>
          </div>

          <p className="text-orange-primary font-bold text-base mb-8 uppercase tracking-wide">
            ⚡ Disponível apenas para os primeiros moradores
          </p>

          <Link
            href="/formulario"
            className="inline-block bg-orange-primary text-off-white font-bold py-4 px-12 rounded-lg text-lg hover:bg-accent-orange-dark transition transform hover:scale-105 shadow-2xl mb-4"
          >
            Quero meu treino
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-orange-primary/20 mt-20 bg-navy-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center text-off-white/60">
            <p>© 2026 VizFit - Treinos Personalizados do Condomínio</p>
            <p className="text-sm mt-2">Desenvolvido por Felipe Vazzoler & Julia Soares</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
