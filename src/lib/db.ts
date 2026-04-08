import { WorkoutRequest } from '@/types'
import { supabase } from './supabase'

export async function saveWorkoutRequest(data: Omit<WorkoutRequest, 'id' | 'created_at' | 'status' | 'payment_status'>) {
  const { data: result, error } = await supabase
    .from('workout_requests')
    .insert([
      {
        ...data,
        status: 'recebido',
        payment_status: 'pendente',
        payment_value: 97.00, // Valor padrão do treino
        created_at: new Date().toISOString(),
      },
    ])
    .select()

  if (error) {
    throw new Error(`Failed to save request: ${error.message}`)
  }

  return result?.[0]
}

export async function getWorkoutRequestById(id: string) {
  const { data, error } = await supabase
    .from('workout_requests')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch request: ${error.message}`)
  }

  return data as WorkoutRequest
}

export async function uploadPaymentProof(requestId: string, file: File) {
  const fileName = `${requestId}-${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from('payment-proofs')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw new Error(`Failed to upload proof: ${error.message}`)
  }

  // Atualizar registro com URL do comprovante
  const { data: urlData } = supabase.storage
    .from('payment-proofs')
    .getPublicUrl(fileName)

  const { error: updateError } = await supabase
    .from('workout_requests')
    .update({
      payment_proof_url: urlData.publicUrl,
      payment_status: 'recebido',
      payment_date: new Date().toISOString(),
    })
    .eq('id', requestId)

  if (updateError) {
    throw new Error(`Failed to update payment: ${updateError.message}`)
  }

  return urlData.publicUrl
}

export async function getWorkoutRequests(filters?: {
  status?: string
  limit?: number
}) {
  let query = supabase.from('workout_requests').select('*')

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  const { data, error } = await query.order('created_at', { ascending: false }).limit(filters?.limit || 100)

  if (error) {
    throw new Error(`Failed to fetch requests: ${error.message}`)
  }

  return data as WorkoutRequest[]
}

export async function updateWorkoutRequestStatus(id: string, status: WorkoutRequest['status'], notes?: string) {
  const updateData: any = { status }
  if (notes) updateData.notes = notes

  const { data, error } = await supabase
    .from('workout_requests')
    .update(updateData)
    .eq('id', id)
    .select()

  if (error) {
    throw new Error(`Failed to update request: ${error.message}`)
  }

  return data?.[0]
}
