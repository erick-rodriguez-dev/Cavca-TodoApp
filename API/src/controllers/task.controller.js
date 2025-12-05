import TaskModel from '../models/task.model.js'

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({})
    res.status(200).json(tasks)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
}

export const createTask = async (req, res) => {
  const newTask = new TaskModel(req.body)

  try {
    const task = await newTask.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' })
  }
}

export const updateTask = async (req, res) => {
  const { id } = req.params

  try {
    const task = await TaskModel.findByIdAndUpdate(id, req.body, { new: true })
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' })
  }
}

export const deleteTask = async (req, res) => {
  const { id } = req.params

  try {
    await TaskModel.findByIdAndDelete(id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' })
  }
}
