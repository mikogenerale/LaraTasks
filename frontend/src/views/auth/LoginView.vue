<template>
  <main class="w-screen h-screen flex justify-center items-center px-6 sm:px-0">
    <form
      class="flex flex-col gap-4 bg-white h-fit max-w-md w-full shadow-md p-8 rounded-xl"
      @submit.prevent="handleFormSubmit"
    >
      <h1 class="text-2xl font-bold text-center">Login to your account.</h1>
      <p
        v-if="errorMessage"
        class="border border-red-500 bg-red-100 p-2 text-red-500 rounded text-center text-sm italic"
      >
        {{ errorMessage }}
      </p>
      <FormInput type="email" :with-label="true" label="Email" v-model="email" />
      <FormInput type="password" :with-label="true" label="Password" v-model="password" />
      <VButton
        :text="status === 'pending' ? 'Logging in...' : 'Login'"
        type="submit"
        class="mt-4 py-2"
        :disabled="!canSubmit"
      />
      <p class="text-sm text-center">
        Don't have an account?
        <RouterLink to="/register" class="text-blue-400"> Register </RouterLink>
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
const errorMessage = ref<string>()

const isValidEmail = computed(() => !!email.value)
const isValidPassword = computed(() => !!password.value)
const canSubmit = computed(() => isValidEmail.value && isValidPassword.value)

const authStore = useAuthStore()
const { status } = storeToRefs(authStore)

const handleFormSubmit = async () => {
  if (!email.value || !password.value) {
    return
  }
  errorMessage.value = await authStore.login({
    email: email.value,
    password: password.value,
  })
}
</script>
