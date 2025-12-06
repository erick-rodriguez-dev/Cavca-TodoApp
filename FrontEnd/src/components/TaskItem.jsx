import { useTaskStore } from '../store/useTaskStore'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

export default function TaskItem({ task }) {
  const { toggleTaskSelection, selectedTasks } = useTaskStore()
  const [isExpanded, setIsExpanded] = useState(false)
  const isSelected = selectedTasks.includes(task._id)

  return (
    <div
      className={`w-full rounded-lg border p-4 transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:shadow-lg'}`}
    >
      <div className="flex items-center justify-between gap-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleTaskSelection(task._id)}
          className="h-5 w-5 cursor-pointer rounded-md border-gray-300 text-blue-600"
          title="Seleccionar tarea"
        />

        <div className="min-w-0 flex-1">
          <div className="flex cursor-pointer items-center justify-between gap-3" onClick={() => setIsExpanded(!isExpanded)}>
            <h3 className={`text-lg font-semibold ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{task.title}</h3>

            <div className="flex gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="rounded-md p-2 text-gray-600 transition-all data-[expanded=true]:rotate-90"
                title={isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
                data-expanded={isExpanded}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-3 space-y-2 border-t border-gray-200 pt-3">
          <p className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-600'}`}>{task.description}</p>
          <p className="text-xs text-gray-400">
            {new Date(task.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      )}
    </div>
  )
}
