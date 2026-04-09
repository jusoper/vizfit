'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getWorkoutRequestById } from '@/lib/db'
import { WorkoutRequest } from '@/types'

export default function ThankYouPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const requestId = searchParams.get('id')
  const [request, setRequest] = useState<WorkoutRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRequest = async () => {
      if (!requestId) {
        setError('ID do pedido não encontrado')
        setLoading(false)
        return
      }

      try {
        const data = await getWorkoutRequestById(requestId)
        setRequest(data)
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar pedido')
      } finally {
        setLoading(false)
      }
    }

    fetchRequest()
  }, [requestId])

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-dark flex items-center justify-center">
        <div className="text-off-white text-center">
          <div className="animate-spin mb-4">
            <div className="w-8 h-8 border-4 border-orange-primary border-t-transparent rounded-full"></div>
          </div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-navy-dark text-text-primary p-4">
        <div className="max-w-xl mx-auto text-center mt-20">
          <h1 className="text-2xl font-bold text-off-white mb-4">Erro ao carregar</h1>
          <p className="text-blue-secondary mb-8">{error}</p>
          <Link href="/" className="text-orange-primary hover:text-orange-primary/80 font-semibold">
            Voltar para início
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-dark text-text-primary p-4 flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <Link href="/" className="flex justify-center mb-4 sm:mb-8 mt-2 sm:mt-4 hover:opacity-80 transition">
          <Image
            src="/images/logos/vizfit-logo.png"
            alt="VizFit Logo"
            width={140}
            height={46}
            priority
            className="h-auto w-auto"
          />
        </Link>

        {/* Main Content */}
        <div className="bg-gradient-to-b from-blue-secondary/10 to-blue-secondary/5 backdrop-blur-sm rounded-2xl p-8 border border-blue-secondary/30 text-center">
          {/* Success Icon */}
          <div className="text-6xl mb-6 animate-bounce">✅</div>

          {/* Main Message */}
          <h1 className="text-4xl font-bold text-off-white mb-4">Obrigado!</h1>
          <p className="text-xl text-blue-secondary mb-2">Recebemos seu comprovante de pagamento</p>
          <p className="text-blue-secondary mb-8">
            Estamos analisando e em breve seu treino chegará! 🚀
          </p>

          {/* Timeline */}
          <div className="bg-navy-dark/50 rounded-xl p-8 mb-8 border border-blue-secondary/20 text-left">
            <h2 className="text-off-white font-bold mb-6 text-center">O que acontece agora?</h2>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-primary/30 border border-orange-primary">
                    <span className="text-orange-primary font-bold">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-off-white font-semibold mb-1">Validando seu comprovante</h3>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-primary/20 border border-orange-primary/50">
                    <span className="text-orange-primary/70 font-bold">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-off-white font-semibold mb-1">Montando seu treino personalizado</h3>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-primary/20 border border-orange-primary/50">
                    <span className="text-orange-primary/70 font-bold">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-off-white font-semibold mb-1">Recebendo seu PDF do treino por WhatsApp</h3>
                  <p className="text-off-white/50 text-xs mt-2">Total: até 48 horas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-orange-primary/10 rounded-xl p-6 mb-8 border border-orange-primary/30">
            <h3 className="text-off-white font-bold mb-2">📱 Seus detalhes</h3>
            <p className="text-blue-secondary text-sm mb-1">WhatsApp: {request?.contact_value}</p>
          </div>



          {/* CTA Button */}
          <Link
            href="/"
            className="inline-block bg-orange-primary hover:bg-orange-primary/90 text-navy-dark font-bold py-4 px-8 rounded-lg transition-all"
          >
            Voltar para Início
          </Link>
        </div>


      </div>
    </div>
  )
}
