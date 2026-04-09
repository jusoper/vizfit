'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { saveWorkoutRequest } from '@/lib/db'

const STEPS = [
  {
    id: 1,
    title: 'Nome, Email e Apartamento',
    fields: ['name', 'email', 'apartment'],
  },
  {
    id: 2,
    title: 'Dados Físicos e Objetivos',
    fields: ['weight', 'height', 'general_objectives'],
  },
  {
    id: 3,
    title: 'Objetivo de Treino',
    fields: ['objective'],
  },
  {
    id: 4,
    title: 'Sua Experiência',
    fields: ['level'],
  },
  {
    id: 5,
    title: 'Frequência e Duração',
    fields: ['frequency', 'duration'],
  },
  {
    id: 6,
    title: 'Informações Importantes',
    fields: ['restrictions', 'equipment_preference', 'contact_method', 'contact_value'],
  },
]

export default function WorkoutForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    apartment: '',
    weight: '',
    height: '',
    general_objectives: '',
    objective: 'emagrecimento',
    level: 'iniciante',
    frequency: 3,
    duration: 60,
    restrictions: '',
    equipment_preference: 'ambos',
    contact_method: 'whatsapp',
    contact_value: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validateStep = (stepNumber: number): boolean => {
    const stepFields = STEPS[stepNumber - 1].fields
    
    for (const field of stepFields) {
      // restrictions é opcional, então não precisa validar
      if (field === 'restrictions') continue
      
      const value = formData[field as keyof typeof formData]
      
      // Validar campos vazios ou nulos
      if (value === '' || value === null || value === undefined) {
        setError(`Por favor, preencha o campo obrigatório.`)
        return false
      }
      
      // Validar se é um texto vazio (após trim)
      if (typeof value === 'string' && value.trim() === '') {
        setError(`Por favor, preencha o campo obrigatório.`)
        return false
      }
    }
    
    setError('')
    return true
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    const numericFields = ['frequency', 'duration', 'weight', 'height']
    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? (value ? parseInt(value, 10) : '') : value,
    }))
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    // Validar último step também
    if (!validateStep(currentStep)) {
      return
    }
    
    setLoading(true)
    setError('')

    try {
      const result = await saveWorkoutRequest({
        name: formData.name,
        email: formData.email,
        apartment: formData.apartment,
        weight: typeof formData.weight === 'number' ? formData.weight : parseInt(formData.weight as string, 10),
        height: typeof formData.height === 'number' ? formData.height : parseInt(formData.height as string, 10),
        general_objectives: formData.general_objectives,
        objective: formData.objective,
        level: formData.level as any,
        frequency: formData.frequency,
        duration: formData.duration,
        restrictions: formData.restrictions,
        equipment_preference: formData.equipment_preference as any,
        contact_method: formData.contact_method as any,
        contact_value: formData.contact_value,
      })

      // Redirecionar para página de pagamento
      router.push(`/pagamento?id=${result.id}`)
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar pedido')
    } finally {
      setLoading(false)
    }
  }

  const step = STEPS[currentStep - 1]

  return (
    <div className="min-h-screen bg-navy-dark text-text-primary p-4">
      <div className="max-w-xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8 mt-4 hover:opacity-80 transition">
          <Image
            src="/images/logos/vizfit-logo.png"
            alt="VizFit Logo"
            width={140}
            height={46}
            priority
            className="h-auto w-auto"
          />
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-off-white">Seu Treino Personalizado</h1>
          <p className="text-blue-secondary font-semibold">Passo {currentStep} de {STEPS.length}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-blue-secondary/20 rounded-full h-2">
          <div
            className="bg-orange-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-blue-secondary/10 backdrop-blur-sm rounded-xl p-8 border border-blue-secondary/30">
          <h2 className="text-2xl font-bold mb-6 text-off-white">{step.title}</h2>

          {error && (
            <div className="bg-accent-orange-dark/20 border border-orange-primary text-off-white p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6 mb-8">
            {/* Step 1 */}
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-off-white">Nome Completo*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 bg-navy-dark/40 border border-blue-secondary/50 rounded-lg text-off-white placeholder-off-white/40 focus:outline-none focus:ring-2 focus:ring-orange-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-off-white">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu.email@gmail.com"
                    className="w-full px-4 py-3 bg-navy-dark/40 border border-blue-secondary/50 rounded-lg text-off-white placeholder-off-white/40 focus:outline-none focus:ring-2 focus:ring-orange-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-off-white">Apartamento*</label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    required
                    placeholder="Ex: 101, 502"
                    className="w-full px-4 py-3 bg-navy-dark/40 border border-blue-secondary/50 rounded-lg text-off-white placeholder-off-white/40 focus:outline-none focus:ring-2 focus:ring-orange-primary"
                  />
                </div>
              </>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-off-white">Peso (kg)*</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    placeholder="Ex: 75"
                    step="1"
                    min="0"
                    className="w-full px-4 py-3 bg-navy-dark/40 border border-blue-secondary/50 rounded-lg text-off-white placeholder-off-white/40 focus:outline-none focus:ring-2 focus:ring-orange-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-off-white">Altura (cm)*</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                    placeholder="Ex: 180"
                    step="1"
                    min="0"
                    className="w-full px-4 py-3 bg-navy-dark/40 border border-blue-secondary/50 rounded-lg text-off-white placeholder-off-white/40 focus:outline-none focus:ring-2 focus:ring-orange-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-off-white">Seus objetivos gerais*</label>
                  <textarea
                    name="general_objectives"
                    value={formData.general_objectives}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Mais volume na perna e definir o abdômen"
                    className="w-full px-4 py-3 bg-navy-dark/40 border border-blue-secondary/50 rounded-lg text-off-white placeholder-off-white/40 focus:outline-none focus:ring-2 focus:ring-orange-primary h-24 resize-none"
                  />
                </div>
              </>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div>
                <label className="block text-sm font-semibold mb-4 text-off-white">Qual é seu objetivo?*</label>
                <div className="space-y-3">
                  {['emagrecimento', 'hipertrofia', 'condicionamento'].map((obj) => (
                    <label key={obj} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="objective"
                        value={obj}
                        checked={formData.objective === obj}
                        onChange={handleChange}
                        className="w-4 h-4 accent-orange-primary"
                      />
                      <span className="capitalize text-off-white group-hover:text-orange-primary transition">{obj}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 */}
            {currentStep === 4 && (
              <div>
                <label className="block text-sm font-semibold mb-4 text-off-white">Qual é seu nível de experiência?*</label>
                <div className="space-y-3">
                  {['iniciante', 'intermediário', 'avançado'].map((lvl) => (
                    <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="level"
                        value={lvl}
                        checked={formData.level === lvl}
                        onChange={handleChange}
                        className="w-4 h-4 accent-orange-primary"
                      />
                      <span className="capitalize text-off-white group-hover:text-orange-primary transition">{lvl}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5 */}
            {currentStep === 5 && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-off-white">Quantos dias por semana você vai treinar?*</label>
                  <div className="flex gap-2">
                    {[3, 4, 5, 6].map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, frequency: freq }))}
                        className={`flex-1 py-3 rounded-lg font-semibold transition ${
                          formData.frequency === freq
                            ? 'bg-orange-primary text-off-white'
                            : 'bg-blue-secondary/20 border border-blue-secondary/50 text-off-white hover:bg-blue-secondary/30'
                        }`}
                      >
                        {freq}x
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-off-white">Quanto tempo você tem disponível?*</label>
                  <div className="flex gap-2">
                    {[30, 45, 60, 90].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, duration: dur }))}
                        className={`flex-1 py-3 rounded-lg font-semibold transition ${
                          formData.duration === dur
                            ? 'bg-orange-primary text-off-white'
                            : 'bg-blue-secondary/20 border border-blue-secondary/50 text-off-white hover:bg-blue-secondary/30'
                        }`}
                      >
                        {dur}min
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Step 6 */}
            {currentStep === 6 && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-off-white">Você tem alguma restrição ou lesão?</label>
                  <textarea
                    name="restrictions"
                    value={formData.restrictions}
                    onChange={handleChange}
                    placeholder="Ex: artrite no joelho, tendinite no ombro (deixe em branco se nenhuma)"
                    className="w-full px-4 py-3 bg-navy-dark/40 border border-blue-secondary/50 rounded-lg text-off-white placeholder-off-white/40 focus:outline-none focus:ring-2 focus:ring-orange-primary h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-4 text-off-white">Você prefere treinar com?*</label>
                  <div className="space-y-3">
                    {['aparelhos', 'peso_livre', 'ambos'].map((pref) => (
                      <label key={pref} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="equipment_preference"
                          value={pref}
                          checked={formData.equipment_preference === pref}
                          onChange={handleChange}
                          className="w-4 h-4 accent-orange-primary"
                        />
                        <span className="capitalize text-off-white group-hover:text-orange-primary transition">{pref === 'peso_livre' ? 'Peso livre' : pref === 'aparelhos' ? 'Aparelhos' : 'Ambos'}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-4 text-off-white">Seu WhatsApp para receber o treino*</label>
                  <input
                    type="text"
                    name="contact_value"
                    value={formData.contact_value}
                    onChange={handleChange}
                    required
                    placeholder="(11) 99999-9999"
                    className="w-full px-4 py-3 bg-navy-dark/40 border border-blue-secondary/50 rounded-lg text-off-white placeholder-off-white/40 focus:outline-none focus:ring-2 focus:ring-orange-primary"
                  />
                </div>
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex-1 py-3 bg-blue-secondary/20 border border-blue-secondary/50 rounded-lg font-semibold text-off-white hover:bg-blue-secondary/40 transition"
              >
                ← Voltar
              </button>
            )}
            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 py-3 bg-orange-primary text-off-white font-semibold rounded-lg hover:bg-accent-orange-dark transition"
              >
                Próximo →
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-orange-primary text-off-white font-semibold rounded-lg hover:bg-accent-orange-dark transition disabled:opacity-50"
              >
                {loading ? '⏳ Enviando...' : '✅ Enviar'}
              </button>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-blue-secondary text-sm">
          <p>Seus dados são 100% seguros e utilizados apenas para gerar seu treino</p>
        </div>
      </div>
    </div>
  )
}
