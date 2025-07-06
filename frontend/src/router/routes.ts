import { UserRole } from '@/types/user'
import AdminHomeView from '@/views/admin/AdminHomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import UnauthorizedView from '@/views/UnauthorizedView.vue'
import UserHomeView from '@/views/users/UserHomeView.vue'

export const routes = [
  // Users View
  {
    path: '/',
    name: 'UserHomeView',
    component: UserHomeView,
    meta: {
      requiresAuth: true,
      roles: [UserRole.USER, UserRole.ADMIN],
    },
  },

  // Admin View
  {
    path: '/admin',
    name: 'AdminHomeView',
    component: AdminHomeView,
    meta: {
      requiresAuth: true,
      roles: [UserRole.ADMIN],
    },
  },

  // Authentication Views
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: {
      requireAuth: false,
    },
  },

  // Unauthorized route
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: UnauthorizedView,
  },

  //Not Found route
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: NotFoundView,
  },
]
