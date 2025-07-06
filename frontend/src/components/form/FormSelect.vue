<template>
  <div class="flex flex-col gap-1">
    <label v-if="withLabel" :for="label" class="text-sm text-gray-700">
      {{ label }}
    </label>
    <select
      :id="label"
      class="border rounded-md py-1.5 px-3 outline-blue-500 text-sm"
      v-model="formInputModel"
    >
      <option disabled value="">-- Select --</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
type Option = {
  label: string
  value: string
}

type Props = {
  label?: string
  withLabel?: boolean
  options: Option[]
}

defineProps<Props>()
const formInputModel = defineModel<string>()
</script>
