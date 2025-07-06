<template>
  <VBadge :text="text" :class="getBadgeColor" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VBadge from './VBadge.vue'

type BadgeType = 'pending' | 'completed'

type Props = {
  text: BadgeType
}

const props = defineProps<Props>()

const getBadgeColor = computed(() => {
  switch (props.text) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700'
    case 'completed':
      return 'bg-green-100 text-green-700'
    default:
      return 'bg-gray-500'
  }
})
</script>
