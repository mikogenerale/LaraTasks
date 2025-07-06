import { createRouter, createWebHistory } from 'vue-router'
import { navigationGuard } from './guard'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach(navigationGuard)

export default router
