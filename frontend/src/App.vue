<template>
  <div class="min-h-screen bg-background text-neutral-900 relative">
    <router-view />
    <ReloadPrompt />
  </div>
</template>

<script setup lang="ts">
import ReloadPrompt from './components/layout/ReloadPrompt.vue';
</script>
