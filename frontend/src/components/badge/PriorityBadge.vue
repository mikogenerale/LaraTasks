<template>
  <VBadge :text="text" class="text-white" :class="getBadgeColor" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VBadge from './VBadge.vue'

type BadgeType = 'low' | 'medium' | 'high'

type Props = {
  text: BadgeType
}

const props = defineProps<Props>()

const getBadgeColor = computed(() => {
  switch (props.text) {
    case 'low':
      return 'bg-green-600'
    case 'medium':
      return 'bg-amber-600'
    case 'high':
      return 'bg-red-600'
    default:
      return 'bg-gray-500'
  }
})
</script>
