<template>
  <div class="flex flex-col gap-1">
    <label v-if="withLabel" :for="label" class="text-sm"> {{ label }} </label>
    <input
      :type="type"
      :placeholder="placeholder"
      :id="label"
      class="border rounded-md py-1 px-2 outline-blue-500"
      v-model="formInputModel"
    />
  </div>
</template>

<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'

type Props = {
  type: InputTypeHTMLAttribute
  placeholder?: string
  withLabel?: boolean
  label: string
}

defineProps<Props>()
const formInputModel = defineModel()
</script>
