'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getWorkoutRequestById } from '@/lib/db'
import { WorkoutRequest } from '@/types'

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const requestId = searchParams.get('id')
  const [request, setRequest] = useState<WorkoutRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const PIX_KEY = 'jusoper@gmail.com' // Substitua pela chave Pix real
  const PAYMENT_VALUE = 59.00
  const DEADLINE_MINUTES = 30

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

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_KEY)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleProceedToUpload = () => {
    if (requestId) {
      router.push(`/uploading-comprovante?id=${requestId}`)
    }
  }

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

  if (error || !request) {
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
    <div className="min-h-screen bg-navy-dark text-text-primary p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
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

        {/* Main Content */}
        <div className="bg-gradient-to-b from-blue-secondary/10 to-blue-secondary/5 backdrop-blur-sm rounded-2xl p-8 border border-blue-secondary/30">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-off-white mb-2">Bora fazer o pagamento!</h1>
            <p className="text-blue-secondary">Você tem <span className="font-bold text-orange-primary">{DEADLINE_MINUTES}min</span> para efetuar o Pix</p>
          </div>

          {/* Payment Info */}
          <div className="bg-navy-dark/50 rounded-xl p-6 mb-8 border border-blue-secondary/20">
            <div className="flex justify-between items-center mb-4">
              <span className="text-blue-secondary">Seu Treino Personalizado</span>
              <span className="text-white font-semibold">R$ {PAYMENT_VALUE.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t border-blue-secondary/30 pt-4 flex justify-between items-center">
              <span className="text-off-white font-bold">Total:</span>
              <span className="text-2xl font-bold text-orange-primary">R$ {PAYMENT_VALUE.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Pix Section */}
          <div className="bg-navy-dark/50 rounded-xl p-6 mb-8 border border-orange-primary/30">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-off-white mb-2">Chave PIX para pagamento</h2>
              <p className="text-blue-secondary text-sm">Copie e cole a chave no seu banco</p>
            </div>

            {/* Pix Key Box */}
            <div className="bg-navy-dark rounded-lg p-4 mb-4 border border-blue-secondary/30">
              <p className="text-off-white/60 text-xs mb-2 uppercase tracking-wide">Chave Pix</p>
              <p className="text-off-white font-mono text-sm break-all mb-4">{PIX_KEY}</p>
              <button
                onClick={handleCopyPix}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  copied
                    ? 'bg-green-500/30 text-green-300 border border-green-500/50'
                    : 'bg-orange-primary hover:bg-orange-primary/90 text-navy-dark border border-orange-primary'
                }`}
              >
                {copied ? '✓ Copiado!' : 'Copiar Chave Pix'}
              </button>
            </div>

            {/* Instructions */}
            <div className="bg-blue-secondary/10 rounded-lg p-4 border border-blue-secondary/20">
              <p className="text-off-white/80 text-sm leading-relaxed">
                💡 <span className="font-semibold">Como fazer:</span> Abra seu banco, selecione PIX, escolha &quot;Chave Aleatória&quot; ou &quot;e-mail&quot;, 
                cole a chave acima e confirme o pagamento. Pronto!
              </p>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-navy-dark/50 rounded-xl p-6 mb-8 border border-blue-secondary/20">
            <p className="text-blue-secondary text-sm mb-2">Pedido para:</p>
            <p className="text-off-white font-semibold text-lg">{request.name}</p>
            <p className="text-blue-secondary text-sm mt-2">Apto: {request.apartment}</p>
          </div>

          {/* Next Steps Button */}
          <button
            onClick={handleProceedToUpload}
            className="w-full bg-orange-primary hover:bg-orange-primary/90 text-navy-dark font-bold py-4 rounded-lg transition-all mb-4"
          >
            Já fiz o pagamento!
          </button>

          <p className="text-center text-blue-secondary text-sm">
            Você irá anexar o comprovante do Pix na próxima tela
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-secondary/5 rounded-xl p-6 border border-blue-secondary/20">
          <div className="flex gap-4">
            <div className="text-orange-primary text-2xl flex-shrink-0">ℹ️</div>
            <div>
              <h3 className="text-off-white font-bold mb-2">Não recebeu?</h3>
              <p className="text-blue-secondary text-sm mb-3">
                Se não receber o treino em 48h após validarmos seu comprovante, entre em contato conosco!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
