<template>
  <section
    class="flex flex-col gap-3 bg-white p-4 rounded-xl shadow-sm space-y-1 border border-zinc-300"
  >
    <div class="flex gap-2 flex-1">
      <input
        type="text"
        class="border border-zinc-400 rounded-lg py-2 px-3 w-full"
        placeholder="Search Tasks..."
        v-model="searchQuery"
      />
    </div>

    <div class="flex gap-4 items-center">
      <div>
        <label for="status-filter"> Status: </label>
        <select
          id="status-filter"
          class="p-1 border border-zinc-400 rounded-xl text-sm"
          v-model="filters.status"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>
        <label for="priority-filter"> Priority: </label>
        <select
          id="priority-filter"
          class="p-1 border border-zinc-400 rounded-xl text-sm"
          v-model="filters.priority"
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { Priority } from '@/types/task'
import { watchDebounced } from '@vueuse/core'

const emits = defineEmits<{
  (
    e: 'update:filters',
    filters: {
      query: string
      status: 'all' | 'pending' | 'completed'
      priority: Priority | 'all'
    },
  ): void
}>()

const searchQuery = ref<string>('')

const filters = reactive<{
  status: 'all' | 'completed' | 'pending'
  priority: Priority | 'all'
}>({
  status: 'all',
  priority: 'all',
})

const applyFilters = () => {
  emits('update:filters', {
    query: searchQuery.value,
    status: filters.status,
    priority: filters.priority,
  })
}

watchDebounced(searchQuery, applyFilters, { debounce: 200 })
watch(() => [filters.status, filters.priority], applyFilters, { immediate: true })
</script>
