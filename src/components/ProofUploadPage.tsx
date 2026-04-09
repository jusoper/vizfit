'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getWorkoutRequestById, uploadPaymentProof } from '@/lib/db'
import { WorkoutRequest } from '@/types'

export default function ProofUploadPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const requestId = searchParams.get('id')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [request, setRequest] = useState<WorkoutRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipos de arquivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem (PNG, JPG, etc)')
      return
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo 5MB.')
      return
    }

    setSelectedFile(file)
    setError('')

    // Criar preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (!selectedFile || !requestId) {
      setError('Selecione um arquivo para continuar')
      return
    }

    setUploading(true)
    setError('')

    try {
      await uploadPaymentProof(requestId, selectedFile)
      router.push(`/obrigado?id=${requestId}`)
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar comprovante')
    } finally {
      setUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
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

  if (error && !selectedFile) {
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
        <div className="bg-gradient-to-b from-blue-secondary/10 to-blue-secondary/5 backdrop-blur-sm rounded-2xl p-8 border border-blue-secondary/30">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-off-white mb-2">Comprovante do Pix</h1>
            <p className="text-blue-secondary">Nos envie a captura de tela do seu Pix realizado</p>
          </div>

          {/* File Upload Area */}
          <div className="mb-8">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {!preview ? (
              <button
                onClick={triggerFileInput}
                className="w-full border-2 border-dashed border-blue-secondary/40 rounded-xl p-8 hover:border-orange-primary/60 hover:bg-orange-primary/5 transition-all cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">📸</div>
                  <h3 className="text-off-white font-bold mb-2">Clique para anexar imagem</h3>
                  <p className="text-blue-secondary text-sm">Ou arraste e solte aqui</p>
                  <p className="text-off-white/40 text-xs mt-3">PNG, JPG, até 5MB</p>
                </div>
              </button>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden bg-navy-dark/50 border border-blue-secondary/20">
                  <Image
                    src={preview}
                    alt="Preview do comprovante"
                    width={400}
                    height={400}
                    className="w-full h-auto max-h-96 object-cover"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={triggerFileInput}
                    className="flex-1 py-3 rounded-lg font-semibold border border-blue-secondary/50 text-blue-secondary hover:bg-blue-secondary/10 transition-all"
                  >
                    Trocar imagem
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="flex-1 bg-orange-primary hover:bg-orange-primary/90 disabled:bg-orange-primary/50 text-navy-dark font-semibold py-3 rounded-lg transition-all"
                  >
                    {uploading ? 'Enviando...' : 'Confirmar'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-accent-orange-dark/20 border border-orange-primary text-off-white p-4 rounded-lg mb-6">
              ⚠️ {error}
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-secondary/10 rounded-xl p-6 border border-blue-secondary/20">
            <h3 className="text-off-white font-bold mb-3">O que deve estar na captura:</h3>
            <ul className="text-blue-secondary text-sm space-y-2">
              <li>✓ Comprovante de PIX enviado ou recebido</li>
              <li>✓ Valor: R$ 59,00</li>
              <li>✓ Data e hora do pagamento</li>
              <li>✓ Chave PIX utilizada</li>
            </ul>
          </div>

          {/* User Info */}
          {request && (
            <div className="mt-8 bg-navy-dark/50 rounded-xl p-6 border border-blue-secondary/20">
              <p className="text-blue-secondary text-sm mb-2">Pedido para:</p>
              <p className="text-off-white font-semibold text-lg">{request.name}</p>
              <p className="text-blue-secondary text-sm mt-2">Apto: {request.apartment}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
