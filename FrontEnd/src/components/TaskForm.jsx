import { useState } from 'react'
import { useTaskStore } from '../store/useTaskStore'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

export default function TaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const addTask = useTaskStore((state) => state.addTask)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error('Por favor ingresa un título')
      return
    }

    try {
      await addTask({
        title,
        description: description || 'Sin descripción',
      })
      setTitle('')
      setDescription('')
      setIsExpanded(false)
      toast.success('Tarea creada exitosamente')
    } catch (error) {
      toast.error(error.message || 'Error al crear la tarea')
    }
  }

  return (
    <div
      className="group w-full rounded-xl border-2 border-slate-100 bg-white p-4 shadow-sm transition-all data-[focused=true]:border-green-500"
      data-focused={isFocused}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300"
          >
            <Plus size={20} />
          </button>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => {
              setIsExpanded(true)
              setIsFocused(true)
            }}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none hover:group-hover:border-green-200"
            placeholder="Titulo de la tarea..."
          />

          {isExpanded && (
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false)
                setDescription('')
              }}
              className="text-sm text-gray-500 transition-colors hover:text-gray-700"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full resize-none bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
              placeholder="Descripcion (opcional)"
              rows="3"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false)
                  setTitle('')
                  setDescription('')
                }}
                className="rounded-lg px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button type="submit" className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600">
                Agregar
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
