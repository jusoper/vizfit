import jsPDF from 'jspdf'
import { Exercise } from '@/types'

export function generateTrainingPDF(
  userName: string,
  apartment: string,
  exercises: Exercise[],
  notes: string
): jsPDF {
  const doc = new jsPDF()
  const pageHeight = doc.internal.pageSize.getHeight()
  let yPosition = 20

  // Título
  doc.setFontSize(18)
  doc.text('TREINO PERSONALIZADO', doc.internal.pageSize.getWidth() / 2, yPosition, {
    align: 'center',
  })
  yPosition += 15

  // Informações do usuário
  doc.setFontSize(12)
  doc.text(`Aluno: ${userName}`, 20, yPosition)
  yPosition += 8
  doc.text(`Apartamento: ${apartment}`, 20, yPosition)
  yPosition += 15

  // Exercícios
  doc.setFontSize(14)
  doc.text('EXERCÍCIOS', 20, yPosition)
  yPosition += 10

  doc.setFontSize(11)
  exercises.forEach((exercise, index) => {
    if (yPosition > pageHeight - 30) {
      doc.addPage()
      yPosition = 20
    }

    doc.text(`${index + 1}. ${exercise.name}`, 20, yPosition)
    yPosition += 7
    doc.setFontSize(10)
    doc.text(`Séries: ${exercise.sets} | Repetições: ${exercise.reps}`, 25, yPosition)
    yPosition += 6

    if (exercise.instructions) {
      doc.text(`Instruções: ${exercise.instructions}`, 25, yPosition, { maxWidth: 160 })
      yPosition += 10
    }

    if (exercise.video_url) {
      doc.setTextColor(0, 0, 255)
      doc.text(`Vídeo: ${exercise.video_url}`, 25, yPosition)
      doc.setTextColor(0, 0, 0)
      yPosition += 7
    }

    doc.setFontSize(11)
    yPosition += 3
  })

  // Observações do Felipe
  if (notes) {
    yPosition += 10
    if (yPosition > pageHeight - 40) {
      doc.addPage()
      yPosition = 20
    }
    doc.setFontSize(12)
    doc.text('OBSERVAÇÕES DO PERSONAL', 20, yPosition)
    yPosition += 8
    doc.setFontSize(10)
    doc.text(notes, 20, yPosition, { maxWidth: 170 })
  }

  // Rodapé
  doc.setFontSize(9)
  doc.text('Realizado com ❤️ para Academia do Condomínio', 20, pageHeight - 10, {
    align: 'center',
  })

  return doc
}
