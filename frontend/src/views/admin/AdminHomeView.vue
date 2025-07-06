<template>
  <div class="flex h-screen">
    <aside
      class="fixed sm:relative flex flex-col justify-between h-screen w-full max-w-[250px] bg-white border-r border-gray-200 p-4 overflow-y-auto transition-transform duration-300 z-40 shadow-md sm:shadow-none"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'"
    >
      <div>
        <h2 class="text-md font-semibold text-black mb-3">Users</h2>

        <ul class="space-y-1">
          <li
            v-for="u in users"
            :key="u.id"
            @click="
              () => {
                selectUser(u)
                sidebarOpen = false
              }
            "
            class="p-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center gap-2 hover:bg-blue-100"
            :class="{
              'bg-blue-100 text-blue-900 font-medium': selectedUser?.id === u.id,
              'bg-white text-gray-700': selectedUser?.id !== u.id,
            }"
          >
            <div
              class="w-8 h-8 rounded-full bg-blue-300 text-blue-700 flex items-center justify-center text-sm font-semibold uppercase"
            >
              {{ u.firstName[0] }}
            </div>
            <span>{{ u.id === user?.id ? 'Me' : u.firstName }}</span>
          </li>
        </ul>
      </div>

      <!-- Bottom: Logout -->
      <div class="pt-4 border-t border-gray-100 mt-6">
        <VButton
          text="Logout"
          class="w-full text-sm bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
          @click="authStore.logout"
        />
      </div>
    </aside>

    <!-- Overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/30 z-30 sm:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Tasks Section -->
    <main class="flex-1 p-6 max-w-5xl overflow-x-hidden mx-auto no-scrollbar">
      <div v-if="selectedUser">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-xl font-bold mb-1">
              {{
                selectedUser.id === user?.id ? 'My Tasks' : 'Tasks for ' + selectedUser.firstName
              }}
            </h1>
            <p class="text-sm text-gray-500 mb-6">{{ selectedUser.email }}</p>
          </div>

          <AlignRight class="sm:hidden cursor-pointer" @click="sidebarOpen = true" />
        </div>

        <TasksSection :data="getTasksByUserId(selectedUser.id)" />
      </div>
      <div v-else class="text-gray-500 text-sm">Select a user to view their tasks.</div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/user'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import { useTasksStore } from '@/stores/tasks'
import { useAuthStore } from '@/stores/auth'
import TasksSection from '@/components/user/TasksSection.vue'
import { AlignRight } from 'lucide-vue-next'
import VButton from '@/components/button/VButton.vue'

const usersStore = useUsersStore()
const tasksStore = useTasksStore()
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
const { users } = storeToRefs(usersStore)
const { tasks } = storeToRefs(tasksStore)

const selectedUser = ref<User | undefined>(user.value)
const sidebarOpen = ref(false)

const selectUser = (user: User) => {
  selectedUser.value = user
}

const getTasksByUserId = (userId: string) => {
  return tasks.value
    .filter((task) => task.user_id === userId)
    .sort((taskA, taskB) => {
      const isACompleted = taskA.completedAt !== null
      const isBCompleted = taskB.completedAt !== null

      // Push completed tasks to the bottom
      if (!isACompleted && isBCompleted) return -1
      if (isACompleted && !isBCompleted) return 1

      // If both are same status, sort by order
      return taskA.order - taskB.order
    })
}
</script>
