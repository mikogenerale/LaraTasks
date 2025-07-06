<template>
  <div class="relative bg-white p-4 rounded-xl shadow-sm space-y-1 border-zinc-300">
    <h2 class="font-bold text-3xl">{{ value }}</h2>
    <p class="text-xs">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string
  value: string
}

defineProps<Props>()
</script>
