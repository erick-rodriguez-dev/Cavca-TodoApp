import { useTaskStore } from '../store/useTaskStore'
import { Check, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function TaskItem({ task }) {
  const { updateTask, deleteTask } = useTaskStore()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggleComplete = async () => {
    try {
      await updateTask(task._id, { completed: !task.completed })
      toast.success(task.completed ? 'Tarea marcada como pendiente' : 'Tarea completada')
    } catch (error) {
      toast.error(error.message || 'Error al actualizar la tarea')
    }
  }

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        await deleteTask(task._id)
        toast.success('Tarea eliminada exitosamente')
      } catch (error) {
        toast.error(error.message || 'Error al eliminar la tarea')
      }
    }
  }

  return (
    <div className="group w-full overflow-hidden">
      <div className="rounded-2xl bg-white p-5 transition-all">
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggleComplete}
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 transition-all hover:border-gray-400"
            title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
          >
            {task.completed && <Check />}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className={`text-base leading-tight font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                  {task.title}
                </h3>
                {task.description && task.description !== 'Sin descripción' && (
                  <p className={`mt-1 text-sm ${task.completed ? 'text-gray-300' : 'text-gray-500'}`}># {task.description}</p>
                )}
              </div>

              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={handleDelete}
                  className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  title="Eliminar tarea"
                >
                  <Trash2 size={16} />
                </button>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`rounded-full p-1.5 text-gray-400 transition-all hover:bg-gray-100 ${isExpanded ? 'rotate-90' : ''}`}
                  title={isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {isExpanded && (
              <div className="mt-3 border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-400">
                  Creada el{' '}
                  {new Date(task.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
