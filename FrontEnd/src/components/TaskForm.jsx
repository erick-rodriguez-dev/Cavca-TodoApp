import { useState } from 'react'
import { useTaskStore } from '../store/useTaskStore'

export default function TaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const addTask = useTaskStore((state) => state.addTask)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      alert('Por favor completa todos los campos')
      return
    }

    try {
      await addTask({ title, description })
      setTitle('')
      setDescription('')
    } catch {
      alert('Error al crear la tarea')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col rounded-lg bg-slate-100 p-6">
      <div className="flex-1">
        <h2 className="mb-4 text-xl font-bold text-gray-800">Nueva Tarea</h2>

        <div className="mb-4">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-b border-b-gray-300 py-2 outline-none"
            placeholder="Titulo"
          />
        </div>

        <div className="mb-4">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full pb-2 outline-none"
            placeholder="Descripcion"
            rows="3"
          />
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            setTitle('')
            setDescription('')
          }}
          className="w-full cursor-pointer rounded-md border border-red-500 px-4 py-2 font-medium text-red-500 transition-colors hover:bg-red-600 hover:text-white"
        >
          Descartar Tarea
        </button>
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-green-500 px-4 py-2 font-medium text-white transition-colors hover:bg-green-600"
        >
          Agregar Tarea
        </button>
      </div>
    </form>
  )
}
