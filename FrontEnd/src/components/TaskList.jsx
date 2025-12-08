import { useTaskStore } from '../store/useTaskStore'
import { AnimatePresence } from 'motion/react'
import TaskItem from './TaskItem'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function TaskList() {
  const { tasks, isLoading, error } = useTaskStore()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl bg-white px-6 py-12 text-center text-gray-400 shadow-sm">
        <p>No hay tareas. ¡Crea una nueva tarea para comenzar!</p>
      </div>
    )
  }

  const pendingTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <div className="w-full space-y-3">
      <AnimatePresence initial={false}>
        {pendingTasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
        {completedTasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </AnimatePresence>
    </div>
  )
}
