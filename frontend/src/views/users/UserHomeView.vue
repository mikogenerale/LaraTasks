<template>
  <main class="p-6 max-w-3xl mx-auto flex flex-col gap-6">
    <section class="flex gap-6">
      <div class="flex-1 flex flex-col gap-2">
        <h1 class="font-bold text-3xl">Your Tasks</h1>
        <p>You have tasks waiting for your attention.</p>
      </div>
      <VButton
        type="button"
        text="Log out"
        class="py-2 px-6 w-fit self-start bg-red-500 font-semibold"
        @click="authStore.logout"
      />
    </section>

    <!-- Progress Cards -->
    <ProgressSection />

    <VButton
      type="button"
      text="+ Add Tasks"
      class="py-2 px-6 w-fit self-end"
      @click="openModal('add-task-form')"
    />

    <!-- Search  -->
    <SearchSection @update:filters="handleUpdateFilter" />

    <!-- Task list -->
    <TasksSection :data="filteredTasks" />
  </main>
</template>

<script setup lang="ts">
import type { Priority, SearchFilter } from '@/types/task'
import VButton from '@/components/button/VButton.vue'
import ProgressSection from '@/components/user/ProgressSection.vue'
import SearchSection from '@/components/user/SearchSection.vue'
import TasksSection from '@/components/user/TasksSection.vue'

import { useModal } from '@/composables/useModal'
import { useAuthStore } from '@/stores/auth'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const tasksStore = useTasksStore()
const authStore = useAuthStore()

const router = useRouter()
const { user } = storeToRefs(useAuthStore())
const { openModal } = useModal()

const filters = ref<SearchFilter>({
  userId: user.value?.id ?? '',
  query: '',
  status: 'all',
  priority: 'all',
})

const filteredTasks = computed(() => {
  return tasksStore.filterTasks(filters.value).sort((taskA, taskB) => {
    const isACompleted = taskA.completedAt !== null
    const isBCompleted = taskB.completedAt !== null

    if (!isACompleted && isBCompleted) return -1
    if (isACompleted && !isBCompleted) return 1

    return taskA.order - taskB.order
  })
})

const handleUpdateFilter = (payload: {
  query: string
  status: 'all' | 'pending' | 'completed'
  priority: Priority | 'all'
}) => {
  if (!user.value) {
    router.replace('/login')
    return
  }
  filters.value = { userId: user.value.id, ...payload }
}
</script>
