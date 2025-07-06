<template>
  <main class="w-screen h-screen flex flex-col justify-center items-center px-6 sm:px-0">
    <form
      class="flex flex-col gap-4 bg-white h-fit max-w-md w-full shadow-md p-8 rounded-xl"
      @submit.prevent="handleFormSubmit"
    >
      <h1 class="text-2xl font-bold text-center">Create an account.</h1>
      <p
        v-if="errorMessage"
        class="border border-red-500 bg-red-100 p-2 text-red-500 rounded text-center text-sm italic"
      >
        {{ errorMessage }}
      </p>
      <FormInput type="email" :with-label="true" label="Email" v-model="email" />
      <FormInput type="password" :with-label="true" label="Password" v-model="password" />
      <FormInput
        type="password"
        :with-label="true"
        label="Confirm Password"
        v-model="confirmPassword"
      />

      <VButton
        :text="status === 'pending' ? 'Creating your account...' : 'Register'"
        type="submit"
        class="mt-4 py-2 text-sm"
        :disabled="!canSubmit"
      />
      <p class="text-sm text-center">
        Already have account?
        <RouterLink to="/login" class="text-blue-400"> Login </RouterLink>
      </p>
    </form>
  </main>
</template>

<script setup lang="ts">
import VButton from '@/components/button/VButton.vue'
import FormInput from '@/components/form/FormInput.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')

const errorMessage = ref<string>()

const isValidEmail = computed(() => !!email.value)
const isValidPassword = computed(() => !!password.value)

const canSubmit = computed(() => {
  const passwordMatch = password.value === confirmPassword.value
  return isValidEmail.value && isValidPassword.value && passwordMatch
})

const authStore = useAuthStore()
const { status } = storeToRefs(authStore)

const handleFormSubmit = async () => {
  if (!email.value || !password.value) {
    return
  }

  errorMessage.value = await authStore.register({
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  })
}
</script>
