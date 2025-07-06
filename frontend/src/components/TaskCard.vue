<template>
  <div
    class="flex gap-6 relative bg-white p-4 rounded-xl shadow-sm border border-zinc-300"
    :class="taskCompleted ? 'line-through opacity-70' : ''"
    :data-task-id="data.id"
    :draggable="true"
    @dragstart.stop="onDragStart"
  >
    <button
      v-if="!isEditing"
      class="mb-2 self-start w-5 aspect-square text-xs rounded-full border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
      :class="
        taskCompleted
          ? 'bg-green-500 border-green-600 text-white hover:bg-green-600 focus:ring-green-300'
          : 'bg-white border-zinc-400 text-zinc-700 hover:bg-zinc-100 focus:ring-zinc-300'
      "
      @click="toggleCompleted"
    ></button>

    <button
      v-if="!isEditing && authStore.isAdmin"
      class="absolute top-4 right-4"
      @click="taskStore.removeTask(data.id)"
    >
      <Trash2 :size="18" class="text-red-500" />
    </button>

    <div class="space-y-2 flex-1 flex flex-col">
      <div v-if="isEditing">
        <input
          v-model="editableTask.title"
          class="font-semibold text-base border border-zinc-300 rounded-md px-2 py-1 w-full outline-blue-400"
        />
      </div>
      <h2 v-else class="font-semibold text-base">{{ data.title }}</h2>

      <div v-if="isEditing">
        <textarea
          v-model="editableTask.description"
          class="text-sm border border-zinc-300 rounded-md px-2 py-1 w-full min-h-[60px] outline-blue-400"
        />
      </div>
      <p v-else class="text-sm">{{ data.description }}</p>

      <div v-if="!isEditing" class="flex items-center justify-start gap-2 mt-4">
        <PriorityBadge :text="data.priority" />
        <StatusBadge :text="taskCompleted ? 'completed' : 'pending'" />
      </div>

      <div v-else>
        <label for="priority-filter"> Priority: </label>
        <select
          id="priority-filter"
          class="p-1 border border-zinc-400 rounded-xl text-sm"
          v-model="editableTask.priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div v-if="!taskCompleted" class="flex gap-4 justify-end">
        <button
          v-if="!isEditing"
          @click="isEditing = true"
          class="text-sm text-blue-500 hover:underline"
        >
          Edit
        </button>

        <template v-else>
          <button @click="saveChanges" class="text-sm text-blue-600 hover:underline">Save</button>
          <button @click="cancelEdit" class="text-sm text-red-500 hover:underline">Cancel</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Task } from '@/types/task'
import PriorityBadge from './badge/PriorityBadge.vue'
import StatusBadge from './badge/StatusBadge.vue'
import { Trash2 } from 'lucide-vue-next'
import { useTasksStore } from '@/stores/tasks'
import { useAuthStore } from '@/stores/auth'

type Props = {
  data: Task
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'save', payload: Task): void
  (e: 'drag-start', id: string): void
  (e: 'delete', payload: Task): void
}>()

const taskStore = useTasksStore()
const authStore = useAuthStore()

const taskCompleted = computed(() => props.data.completedAt !== null)

const isEditing = ref(false)
const editableTask = ref({ ...props.data })

const cancelEdit = () => {
  editableTask.value = { ...props.data }
  isEditing.value = false
}

const saveChanges = () => {
  emit('save', { ...editableTask.value })
  isEditing.value = false
}

const toggleCompleted = () => {
  editableTask.value = {
    ...editableTask.value,
    completedAt: taskCompleted.value ? null : new Date(),
  }

  emit('save', { ...editableTask.value })
  isEditing.value = false
}

const onDragStart = (event: DragEvent) => {
  event.dataTransfer?.setData('text/plain', props.data.id)
  emit('drag-start', props.data.id)
}
</script>
