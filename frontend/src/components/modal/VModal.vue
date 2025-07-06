<template>
  <section
    class="flex items-center justify-center px-6 fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-xs transition-opacity duration-300"
    :class="modal.show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    @click.prevent="closeModal"
  >
    <div @click.stop class="w-full">
      <component :is="registry[getComponentRegistryName()]" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useModal } from '@/composables/useModal'
import AddTask from '@/components/modal/AddTaskForm.vue'
import DefaultModal from './DefaultModal.vue'

const { modal, closeModal } = useModal()

const registry = {
  'add-task-form': AddTask,
  default: DefaultModal,
}

const getComponentRegistryName = () => modal.value.component ?? 'default'
</script>
