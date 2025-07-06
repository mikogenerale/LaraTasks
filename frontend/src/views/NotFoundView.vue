<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
    <h1 class="text-7xl font-bold text-blue-600">404</h1>
    <p class="text-2xl font-semibold mt-4">Page Not Found</p>
    <p class="text-gray-600 mt-2">Sorry, the page you are looking for doesn’t exist.</p>
    <router-link
      to="/"
      class="mt-6 inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
    >
      Go Home
    </router-link>
  </div>
</template>
