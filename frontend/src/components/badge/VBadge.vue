<template>
  <span class="inline-block text-xs font-medium px-3 py-1 rounded-full">
    {{ text }}
  </span>
</template>

<script setup lang="ts">
type Props = {
  text: string
}

defineProps<Props>()
</script>
