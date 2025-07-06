<template>
  <button
    v-bind="props"
    class="bg-blue-500 text-white rounded-lg py-1 px-3 cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
type Props = {
  text: string
  type?: 'button' | 'submit' | 'reset' // optional with default fallback
  disabled?: boolean
}

defineEmits<{ (e: 'click'): void }>()
const props = defineProps<Props>()
</script>
