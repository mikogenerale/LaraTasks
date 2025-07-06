import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/user'
import { sampleUsers } from '@/mocks/users'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>(sampleUsers)

  const totalUsers = computed(() => users.value.length)

  const getUserById = (id: string) => users.value.find((user) => user.id === id)

  const addUser = (user: User) => {
    users.value.push(user)
  }

  const updateUser = (updatedUser: User) => {
    const index = users.value.findIndex((user) => user.id === updatedUser.id)
    if (index !== -1) {
      users.value[index] = { ...updatedUser }
    }
  }

  const deleteUser = (id: string) => {
    users.value = users.value.filter((user) => user.id !== id)
  }

  return {
    users,
    totalUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
  }
})
