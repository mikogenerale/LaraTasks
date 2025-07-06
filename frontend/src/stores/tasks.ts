import { sampleTasks } from '@/mocks/tasks'
import type { SearchFilter, Task } from '@/types/task'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>(sampleTasks)

  const getTasksByUserId = (userId: string): Task[] => {
    return tasks.value.filter((task) => task.user_id === userId)
  }

  const addTask = (task: Task) => {
    tasks.value.push(task)
  }

  const updateTask = (task: Task) => {
    // We could an axios api in here to hit the backend for task update,
    // but we will simulate in pinia store for now.

    const index = tasks.value.findIndex((t) => t.id === task.id)
    console.log(index)

    if (index === -1) {
      return 'Task not found'
    }

    tasks.value[index] = task
  }

  const removeTask = (taskId: string) => {
    const index = tasks.value.findIndex((task) => task.id === taskId)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  }

  const filterTasks = (options: SearchFilter): Task[] => {
    return tasks.value.filter((task) => {
      if (task.user_id !== options.userId) return false

      const matchesPriority =
        !options.priority || options.priority === 'all' || task.priority === options.priority

      const matchesStatus =
        !options.status ||
        options.status === 'all' ||
        (options.status === 'completed' && task.completedAt !== null) ||
        (options.status === 'pending' && task.completedAt === null)

      const matchesQuery =
        !options.query ||
        task.title.toLowerCase().includes(options.query.trim().toLowerCase()) ||
        task.description.toLowerCase().includes(options.query.trim().toLowerCase())

      return matchesPriority && matchesStatus && matchesQuery
    })
  }

  const getUserStatistics = (userId: string) => {
    const userTasks = tasks.value.filter((task) => task.user_id === userId)

    const total = userTasks.length
    const completed = userTasks.filter((task) => task.completedAt !== null).length
    const pending = total - completed
    const progress = total > 0 ? `${Math.round((completed / total) * 100)}%` : '0%'

    const statistics = [
      {
        id: 'total-tasks',
        title: 'Total tasks',
        value: total.toString(),
      },
      {
        id: 'completed-tasks',
        title: 'Completed',
        value: completed.toString(),
      },
      {
        id: 'pending-tasks',
        title: 'Pending',
        value: pending.toString(),
      },
      {
        id: 'progress',
        title: 'Progress',
        value: progress,
      },
    ]

    return statistics
  }

  return {
    tasks,
    getTasksByUserId,
    getUserStatistics,
    addTask,
    updateTask,
    removeTask,
    filterTasks,
  }
})
