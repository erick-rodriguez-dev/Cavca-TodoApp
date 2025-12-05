import { create } from 'zustand'
import { getTask, createTask, updateTask, deleteTask } from '../lib/fetch'

export const useTaskStore = create((set) => ({
  tasks: [],
  isLoading: false,
  error: null,
  selectedTasks: [],

  fetchTasks: async () => {
    set({ isLoading: true, error: null })
    try {
      const tasks = await getTask()
      set({ tasks, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  addTask: async (taskData) => {
    set({ isLoading: true, error: null })
    try {
      const newTask = await createTask(taskData)
      set((state) => ({
        tasks: [...state.tasks, newTask],
        isLoading: false,
      }))
      return newTask
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  toggleTask: async (taskId) => {
    try {
      const task = useTaskStore.getState().tasks.find((t) => t._id === taskId)
      if (!task) return

      const updatedTask = await updateTask(taskId, {
        completed: !task.completed,
      })

      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === taskId ? updatedTask : t)),
      }))
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  removeTask: async (taskId) => {
    try {
      await deleteTask(taskId)
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== taskId),
      }))
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  toggleTaskSelection: (taskId) => {
    set((state) => ({
      selectedTasks: state.selectedTasks.includes(taskId) ? state.selectedTasks.filter((id) => id !== taskId) : [...state.selectedTasks, taskId],
    }))
  },

  clearSelection: () => {
    set({ selectedTasks: [] })
  },

  selectAllTasks: () => {
    set((state) => ({
      selectedTasks: state.tasks.map((t) => t._id),
    }))
  },

  deleteSelectedTasks: async () => {
    const { selectedTasks } = useTaskStore.getState()
    try {
      await Promise.all(selectedTasks.map((id) => deleteTask(id)))
      set((state) => ({
        tasks: state.tasks.filter((t) => !selectedTasks.includes(t._id)),
        selectedTasks: [],
      }))
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  completeSelectedTasks: async () => {
    const { selectedTasks, tasks } = useTaskStore.getState()
    try {
      const updates = selectedTasks.map((id) => {
        const task = tasks.find((t) => t._id === id)
        return updateTask(id, { completed: !task.completed })
      })
      const updatedTasks = await Promise.all(updates)

      set((state) => ({
        tasks: state.tasks.map((t) => {
          const updated = updatedTasks.find((ut) => ut._id === t._id)
          return updated || t
        }),
        selectedTasks: [],
      }))
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },
}))
