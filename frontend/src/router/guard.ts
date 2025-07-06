import { useAuthStore } from '@/stores/auth'
import { UserRole } from '@/types/user'
import { storeToRefs } from 'pinia'
import type { NavigationGuard } from 'vue-router'

export const navigationGuard: NavigationGuard = async (to, from, next) => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  authStore.checkUserSession()

  // Redirect authenticated users away from /login
  if (to.path === '/login' && user.value) {
    if (authStore.isAdmin) {
      return next({ name: 'AdminHomeView' })
    }
    if (authStore.isUser) {
      return next({ name: 'UserHomeView' })
    }
  }

  // Protect routes that require auth
  if (to.meta.requiresAuth) {
    if (!user.value) {
      return next({ name: 'Login' })
    }

    if (authStore.isAdmin && to.path !== '/admin') {
      return next({ name: 'AdminHomeView' })
    }
    if (authStore.isUser && to.path !== '/') {
      return next({ name: 'UserHomeView' })
    }

    // Check allowed roles
    if (to.meta.roles) {
      const roles = to.meta.roles as UserRole[]
      if (!roles.includes(user.value.role)) {
        return next({ name: 'Unauthorized' })
      }
    }
  }

  next()
}
