<!-- views/UnauthorizedView.vue -->
<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-center p-6">
    <h1 class="text-7xl font-bold text-yellow-500">401</h1>
    <p class="text-2xl font-semibold mt-4">Unauthorized Access</p>
    <p class="text-gray-600 mt-2">You don’t have permission to view this page.</p>
    <router-link
      to="/login"
      class="mt-6 inline-block bg-yellow-500 text-white px-5 py-2 rounded-md hover:bg-yellow-600 transition"
    >
      Login
    </router-link>
  </div>
</template>
