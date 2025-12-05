import axios from 'axios'

const baseURLSA = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY

const API = axios.create({
  baseURL: baseURLSA,
  headers: {
    'x-api-key': apiKey
  }
})

export async function getTask() {
  try {
    const response = await API.get('/tasks')
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function createTask(taskData) {
  try {
    const response = await API.post('/tasks', taskData)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function updateTask(taskId, updatedData) {
  try {
    const response = await API.put(`/tasks/${taskId}`, updatedData)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function deleteTask(taskId) {
  try {
    const response = await API.delete(`/tasks/${taskId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
