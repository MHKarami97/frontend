<template>
  <div
    v-if="needRefresh"
    class="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] w-11/12 max-w-md"
    role="alert"
    aria-live="assertive"
  >
    <div class="card p-5 lg:p-6 bg-white shadow-2xl border-2 border-primary/20 flex flex-col gap-4 animate-[slideUp_0.4s_ease-out]">
      <div class="flex items-start gap-4">
        <div class="bg-fuchsia-50 text-primary p-3 rounded-2xl shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <div>
          <h3 class="font-black text-neutral-900 text-lg tracking-tight">نسخه جدید سیستم آماده است!</h3>
          <p class="text-sm text-neutral-500 mt-1.5 leading-relaxed">امکانات جدیدی به اپلیکیشن اضافه شده است. برای استفاده از آخرین تغییرات و رفع باگ‌ها، صفحه را بروزرسانی کنید.</p>
        </div>
      </div>
      <div class="flex gap-3 mt-2">
        <button @click="updateServiceWorker()" class="btn-primary flex-1 py-2.5 text-sm shadow-md shadow-primary/20">
          بروزرسانی الان
        </button>
        <button @click="close" class="btn-secondary flex-1 py-2.5 text-sm border-neutral-200 text-neutral-600 hover:bg-neutral-100">
          بعداً
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// استفاده از ماژول مجازی Vite PWA برای دسترسی به استیت سرویس ورکر
import { useRegisterSW } from 'virtual:pwa-register/vue'

const {
  needRefresh,
  updateServiceWorker,
} = useRegisterSW()

const close = async () => {
  needRefresh.value = false
}
</script>

<style scoped>
@keyframes slideUp {
  from { opacity: 0; transform: translate(-50%, 20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
</style>
