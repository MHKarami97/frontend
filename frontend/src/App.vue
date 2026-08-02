<template>
  <div class="min-h-screen bg-background text-neutral-900 relative">
    <router-view />
    
    <!-- کامپوننت سراسری برای هندل کردن آپدیت‌های PWA -->
    <ReloadPrompt />
  </div>
</template>

<script setup lang="ts">
import ReloadPrompt from './components/layout/ReloadPrompt.vue';
</script>
