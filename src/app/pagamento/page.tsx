'use client'

import { Suspense } from 'react'
import PaymentPage from '@/components/PaymentPage'

function LoadingFallback() {
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

export default function PagamentoRoute() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentPage />
    </Suspense>
  )
}
