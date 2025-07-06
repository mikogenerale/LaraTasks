<template>
  <div class="bg-white max-w-xl mx-auto rounded-xl p-6">
    <h2 class="font-bold text-3xl text-center mb-6">Create new Tasks</h2>
    <form @submit.prevent="handleAddTask" class="flex flex-col gap-3">
      <FormInput type="text" :with-label="true" label="Title *" v-model="task.title" />
      <FormTextarea :with-label="true" label="Description *" v-model="task.description" />
      <FormSelect
        :options="PRIORITIES"
        :with-label="true"
        label="Priority *"
        v-model="task.priority"
      />
      <div class="mt-6 flex gap-2 flex-col sm:flex-row">
        <VButton type="submit" text="Add Task" class="w-full py-2" :disabled="!canSubmit" />
        <VButton type="button" text="Cancel" class="w-full py-2 bg-red-500" @click="closeModal" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Priority, Task } from '@/types/task'
import FormTextarea from '../form/FormTextarea.vue'
import FormSelect from '../form/FormSelect.vue'
import VButton from '../button/VButton.vue'
import FormInput from '../form/FormInput.vue'
import { PRIORITIES } from '@/constants/priorities'
import { computed, reactive } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useModal } from '@/composables/useModal'

const task = reactive<{
  title: string
  description: string
  priority: Priority
}>({
  title: '',
  description: '',
  priority: 'high',
})

const canSubmit = computed(() => {
  return !!task.title && !!task.description
})

const router = useRouter()
const tasksStore = useTasksStore()
const { user } = useAuthStore()
const { closeModal } = useModal()

const refreshFormValues = () => {
  task.title = ''
  task.description = ''
  task.priority = 'high'
}

const handleAddTask = () => {
  if (!canSubmit.value) {
    return 'Cannot be empty'
  }

  if (!user) {
    router.replace('/login')
    return
  }

  const totalTasks = tasksStore
    .getUserStatistics(user.id)
    .find((stats) => stats.id === 'total-tasks')

  console.log(totalTasks)

  const newTask: Task = {
    id: crypto.randomUUID(),
    user_id: user.id,
    order: !totalTasks ? 1 : Number(totalTasks.value) + 1,
    completedAt: null,
    ...task,
  }

  tasksStore.addTask(newTask)
  closeModal()
  refreshFormValues()
}
</script>
