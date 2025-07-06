<template>
  <section class="grid grid-cols-2 gap-3 sm:grid-cols-4">
    <StatsCard v-for="stats in getStatistics()" :key="stats.title" v-bind="stats" />
  </section>
</template>

<script setup lang="ts">
import StatsCard from '@/components/StatsCard.vue'
import { useAuthStore } from '@/stores/auth'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const { user } = storeToRefs(useAuthStore())
const tasksStore = useTasksStore()
const router = useRouter()

const getStatistics = () => {
  if (!user.value) {
    router.replace('/login')
    return
  }

  return tasksStore.getUserStatistics(user.value.id)
}
</script>
