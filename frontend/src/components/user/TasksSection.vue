<template>
  <section class="relative space-y-3" @dragover.prevent @drop="handleDrop">
    <TransitionGroup
      tag="div"
      class="space-y-3 relative"
      enter-active-class="transition-all duration-1000 ease-out"
      enter-from-class="opacity-0 -translate-x-1000 sm:-translate-x-2000"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-500 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-500"
      move-class="transition-transform duration-300 ease-in-out"
    >
      <TaskCard
        v-for="task in data"
        :key="task.id"
        :data="task"
        @save="handleUpdateTask"
        @drag-start="dragTaskId = $event"
      />
    </TransitionGroup>
  </section>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task'

import TaskCard from '../TaskCard.vue'

import { useTasksStore } from '@/stores/tasks'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

type Props = {
  data: Task[]
}
defineProps<Props>()

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
const dragTaskId = ref<string | null>(null)

const handleUpdateTask = (payload: Task) => {
  console.log(payload)
  tasksStore.updateTask(payload)
}

const handleDrop = (e: DragEvent) => {
  const targetId = (e.target as HTMLElement).closest('[data-task-id]')?.getAttribute('data-task-id')
  if (!dragTaskId.value || !targetId || dragTaskId.value === targetId) return

  const from = tasks.value.find((t) => t.id === dragTaskId.value)
  const to = tasks.value.find((t) => t.id === targetId)

  if (!from || !to) {
    return
  }

  const tempFrom = from.order
  from.order = to.order
  to.order = tempFrom

  dragTaskId.value = null
}
</script>
