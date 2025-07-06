import type { ModalValue, ComponentRegistry } from '@/types/modal'
import { ref } from 'vue'

const modal = ref<ModalValue>({
  show: false,
  component: undefined,
})

export const useModal = () => {
  const openModal = (component: ComponentRegistry) => {
    modal.value.component = component
    modal.value.show = true
  }

  const closeModal = () => {
    modal.value.show = false
  }

  return {
    modal,
    openModal,
    closeModal,
  }
}
