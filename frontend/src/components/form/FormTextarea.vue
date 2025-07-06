<template>
  <div class="flex flex-col gap-1">
    <label v-if="withLabel" :for="label" class="text-sm text-gray-700">
      {{ label }}
    </label>
    <textarea
      :id="label"
      :placeholder="placeholder"
      class="border rounded-md py-1.5 px-3 outline-blue-500 resize-y min-h-[100px] text-sm"
      v-model="formInputModel"
    />
  </div>
</template>

<script setup lang="ts">
type Props = {
  placeholder?: string
  withLabel?: boolean
  label?: string
}

defineProps<Props>()
const formInputModel = defineModel<string>()
</script>
