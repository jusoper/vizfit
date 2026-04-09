'use client'

import { useEffect, useState, useCallback } from 'react'
import { getWorkoutRequests, updateWorkoutRequestStatus } from '@/lib/db'
import { WorkoutRequest } from '@/types'

const STATUS_COLORS: Record<string, string> = {
  recebido: 'bg-blue-100 text-blue-800',
  em_revisao: 'bg-yellow-100 text-yellow-800',
  pronto: 'bg-green-100 text-green-800',
  enviado: 'bg-purple-100 text-purple-800',
}

const STATUS_LABELS: Record<string, string> = {
  recebido: 'Recebido',
  em_revisao: 'Em Revisão',
  pronto: 'Pronto',
  enviado: 'Enviado',
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState<WorkoutRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState<string>('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState('')

  const loadRequests = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getWorkoutRequests({
        status: filtro || undefined,
      })
      setRequests(data)
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err)
    } finally {
      setLoading(false)
    }
  }, [filtro])

  useEffect(() => {
    loadRequests()
  }, [loadRequests])

  const handleStatusChange = async (id: string, newStatus: WorkoutRequest['status']) => {
    try {
      await updateWorkoutRequestStatus(id, newStatus, editingNotes)
      setEditingId(null)
      setEditingNotes('')
      loadRequests()
    } catch (err) {
      console.error('Erro ao atualizar status:', err)
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard - Pedidos de Treino</h1>
          <p className="text-gray-600">Gerencie todos os pedidos de treino para Felipe revisar</p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Filtrar por Status</h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFiltro('')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filtro === '' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Todos ({requests.length})
            </button>
            {Object.entries(STATUS_LABELS).map(([key, label]) => {
              const count = requests.filter((r) => r.status === key).length
              return (
                <button
                  key={key}
                  onClick={() => setFiltro(key)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    filtro === key ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {label} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(STATUS_LABELS).map(([statusKey, statusLabel]) => (
            <div key={statusKey} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{statusLabel}</h2>
              <div className="space-y-4">
                {requests
                  .filter((r) => r.status === statusKey)
                  .map((request) => (
                    <div
                      key={request.id}
                      className="bg-white rounded-lg p-4 border-l-4 border-primary shadow hover:shadow-md transition"
                    >
                      <div className="mb-3">
                        <h3 className="font-bold text-gray-900">{request.name}</h3>
                        <p className="text-sm text-gray-600">Apt. {request.apartment}</p>
                      </div>

                      <div className="text-sm space-y-1 mb-3 bg-gray-50 p-2 rounded">
                        <p>
                          <strong>Objetivo:</strong> {request.objective}
                        </p>
                        <p>
                          <strong>Nível:</strong> {request.level}
                        </p>
                        <p>
                          <strong>Peso:</strong> {request.weight} kg
                        </p>
                        <p>
                          <strong>Altura:</strong> {request.height} cm
                        </p>
                        <p>
                          <strong>Objetivos Gerais:</strong> {request.general_objectives}
                        </p>
                        <p>
                          <strong>Frequência:</strong> {request.frequency}x/semana
                        </p>
                        <p>
                          <strong>Duração:</strong> {request.duration}min
                        </p>
                        <p>
                          <strong>Contato:</strong> {request.contact_method === 'whatsapp' ? '📱' : '✉️'} {request.contact_value}
                        </p>
                      </div>

                      {request.restrictions && (
                        <div className="text-sm bg-red-50 p-2 rounded mb-3 border border-red-200">
                          <strong>⚠️ Restrições:</strong> {request.restrictions}
                        </div>
                      )}

                      {editingId === request.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editingNotes}
                            onChange={(e) => setEditingNotes(e.target.value)}
                            placeholder="Observações do Felipe..."
                            className="w-full text-sm p-2 border rounded"
                            rows={3}
                          />
                          <select
                            defaultValue={request.status}
                            onChange={(e) =>
                              handleStatusChange(
                                request.id!,
                                e.target.value as WorkoutRequest['status']
                              )
                            }
                            className="w-full text-sm p-2 border rounded"
                          >
                            {Object.entries(STATUS_LABELS).map(([key, label]) => (
                              <option key={key} value={key}>
                                {label}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => setEditingId(null)}
                            className="w-full text-sm bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingId(request.id!)
                            setEditingNotes(request.notes || '')
                          }}
                          className="w-full text-sm bg-primary text-white px-2 py-1 rounded hover:bg-primary/80 transition"
                        >
                          ✏️ Editar Status
                        </button>
                      )}

                      <div className="text-xs text-gray-500 mt-3">
                        {new Date(request.created_at!).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
