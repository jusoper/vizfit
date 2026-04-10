export interface WorkoutRequest {
  id?: string;
  name: string;
  email: string;
  apartment: string;
  age: number;
  weight: number;
  height: number;
  general_objectives: string;
  objective: string;
  level: 'iniciante' | 'intermediário' | 'avançado';
  frequency: number;
  duration: number;
  restrictions: string;
  equipment_preference: 'aparelhos' | 'peso_livre' | 'ambos';
  contact_method: 'whatsapp';
  contact_value: string;
  status: 'recebido' | 'em_revisao' | 'pronto' | 'enviado';
  created_at?: string;
  notes?: string;
  pdf_url?: string;
  payment_status?: 'pendente' | 'recebido' | 'validado';
  payment_date?: string;
  payment_proof_url?: string;
  payment_value?: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  instructions?: string;
  video_url?: string;
}

export interface Workout {
  id: string;
  request_id: string;
  exercises: Exercise[];
  notes: string;
  created_at: string;
}
