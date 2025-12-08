import { useEffect } from 'react'
import { useTaskStore } from './store/useTaskStore'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { Sun } from 'lucide-react'

import { Toaster } from 'sonner'

function App() {
  const fetchTasks = useTaskStore((state) => state.fetchTasks)
  const tasks = useTaskStore((state) => state.tasks)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const getFormattedDate = () => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    const now = new Date()
    const dayName = days[now.getDay()]
    const day = now.getDate()
    const monthName = months[now.getMonth()]

    return `${dayName}, ${day} De ${monthName}`
  }

  return (
    <div className="min-h-screen bg-[#f5f3f0] py-8">
      <Toaster richColors />
      <div className="mx-auto max-w-3xl px-4">
        <header className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-sm text-gray-600">
            <Sun />
            <span>{getFormattedDate()}</span>
          </div>
          <h1 className="mb-2 font-serif text-4xl text-gray-800">Mis Tareas</h1>
          <p className="text-gray-600">Mantén tu día organizado</p>
        </header>

        <main className="space-y-6">
          <TaskForm />

          <div className="text-sm font-medium tracking-wider text-gray-500 uppercase">TASKS — {tasks.filter((task) => !task.completed).length}</div>

          <TaskList />
        </main>
      </div>
    </div>
  )
}

export default App
