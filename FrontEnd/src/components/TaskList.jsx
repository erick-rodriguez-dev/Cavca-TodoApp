import { useTaskStore } from '../store/useTaskStore'
import { Trash2, Check, X } from 'lucide-react'

import TaskItem from './TaskItem'

export default function TaskList() {
  const { tasks, isLoading, error, selectedTasks, deleteSelectedTasks, completeSelectedTasks, clearSelection } = useTaskStore()

  const handleDeleteSelected = async () => {
    if (window.confirm(`¿Estás seguro de eliminar ${selectedTasks.length} tarea(s)?`)) {
      try {
        await deleteSelectedTasks()
      } catch {
        alert('Error al eliminar las tareas')
      }
    }
  }

  const handleCompleteSelected = async () => {
    try {
      await completeSelectedTasks()
    } catch {
      alert('Error al actualizar las tareas')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-red-700">
        <p className="font-medium">Error: {error}</p>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-gray-300 bg-gray-100 px-6 py-8 text-center text-gray-600">
        <p className="text-lg">No hay tareas. ¡Crea una nueva tarea para comenzar!</p>
      </div>
    )
  }

  const pendingTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <div className="w-full space-y-4">
      <div className="sticky top-0 z-10 rounded-lg pt-2">
        <h1 className="text-2xl font-bold">TODO APP</h1>
        <div
          className="flex items-center justify-between gap-4 transition-all data-[visible=false]:pointer-events-none data-[visible=false]:opacity-0"
          data-visible={selectedTasks.length > 0}
        >
          <p className="font-semibold text-blue-900">{selectedTasks.length} tarea(s) seleccionada(s)</p>
          <div className="flex gap-2">
            <button
              onClick={handleCompleteSelected}
              className="flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
              title="Cambiar estado de tareas seleccionadas"
            >
              <Check size={16} />
              Cambiar estado
            </button>
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
              title="Eliminar tareas seleccionadas"
            >
              <Trash2 size={16} />
              Eliminar
            </button>
            <button
              onClick={clearSelection}
              className="flex items-center gap-2 rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-600"
              title="Cancelar selección"
            >
              <X size={16} />
              Cancelar
            </button>
          </div>
        </div>
      </div>

      {pendingTasks.length > 0 && (
        <div>
          <h2 className="mb-3 text-xl font-bold text-gray-800">Tareas Pendientes ({pendingTasks.length})</h2>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h2 className="mb-3 text-xl font-bold text-gray-800">Tareas Completadas ({completedTasks.length})</h2>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
