import type { LoginCredentials, RegisterCredentials } from '@/types/auth'
import { UserRole, type User } from '@/types/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { handleLogin, handleRegister } from '@/api/auth'
import type { LoginResponseDto } from '@/types/dto/login'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import type { RegisterResponseDto } from '@/types/dto/register'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | undefined>(undefined)
  const status = ref<'pending' | 'error' | 'success'>('success')

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === UserRole.ADMIN)
  const isUser = computed(() => user.value?.role === UserRole.USER)

  const router = useRouter()

  const login = async (credentials: LoginCredentials) => {
    status.value = 'pending'
    const response: LoginResponseDto = await handleLogin(credentials)

    if (response.error || !response.data || !response.success) {
      status.value = 'error'
      user.value = undefined
      return response.error?.message
    } else {
      user.value = response.data
      useLocalStorage('user', JSON.stringify(user.value))
      status.value = 'success'
      router.replace('/')
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    status.value = 'pending'
    const response: RegisterResponseDto = await handleRegister(credentials)

    if (response.error || !response.data || !response.success) {
      status.value = 'error'
      user.value = undefined
      return response.error?.message
    } else {
      user.value = response.data
      useLocalStorage('user', JSON.stringify(user.value))
      status.value = 'success'
      router.replace('/')
    }
  }

  const logout = () => {
    user.value = undefined
    status.value = 'success'
    localStorage.removeItem('user')
    router.replace('/login')
  }

  const checkUserSession = (): boolean => {
    const loggedInUser = localStorage.getItem('user')

    if (loggedInUser) {
      user.value = JSON.parse(loggedInUser)
    }

    return !loggedInUser
  }

  return {
    user,
    status,
    isAuthenticated,
    isAdmin,
    isUser,
    login,
    register,
    logout,
    checkUserSession,
  }
})
