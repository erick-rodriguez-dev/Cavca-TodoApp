import { useEffect } from 'react'
import { useTaskStore } from './store/useTaskStore'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const fetchTasks = useTaskStore((state) => state.fetchTasks)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <div className="min-h-screen bg-white">
      <div className="h-screen w-full p-4">
        <main className="flex h-full flex-col justify-between gap-4 md:flex-row-reverse">
          <TaskForm />
          <TaskList />
        </main>
      </div>
    </div>
  )
}

export default App
