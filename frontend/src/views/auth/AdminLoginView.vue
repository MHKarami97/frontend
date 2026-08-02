<template>
  <div class="mx-auto flex min-h-screen max-w-md items-center px-4">
    <div class="card w-full p-8 text-center bg-neutral-900 border-none shadow-2xl">
      <h1 class="text-2xl font-extrabold text-white">ورود مدیریت کل</h1>
      <p class="text-sm text-neutral-400 mt-2">کنترل مرکزی سیستم زلف</p>
      
      <form class="mt-8 text-right space-y-5" @submit.prevent="submit">
        <div class="flex flex-col gap-1.5">
          <label for="adminEmail" class="label-text text-neutral-300">ایمیل مدیریت</label>
          <input id="adminEmail" v-model="email" class="w-full h-12 px-4 bg-neutral-800 border-none rounded-2xl text-sm text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-primary/50" type="email" placeholder="admin@ordertrack.com" dir="ltr" :disabled="isLoading" required />
        </div>
        
        <div class="flex flex-col gap-1.5">
          <label for="adminPassword" class="label-text text-neutral-300">رمز عبور</label>
          <input id="adminPassword" v-model="password" class="w-full h-12 px-4 bg-neutral-800 border-none rounded-2xl text-sm text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-primary/50" type="password" placeholder="••••••••" dir="ltr" :disabled="isLoading" required />
        </div>
        
        <button class="btn-primary w-full py-3 text-base shadow-lg shadow-primary/30 mt-2" :disabled="isLoading">
          {{ isLoading ? 'در حال تأیید...' : 'ورود امن' }}
        </button>
      </form>
      <p v-if="message" class="mt-4 text-sm text-red-400 font-medium">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const store = useAuthStore();
const email = ref('');
const password = ref('');
const message = ref('');
const isLoading = ref(false);

const submit = async () => {
  isLoading.value = true;
  message.value = '';
  try {
    const result = await store.login(email.value, password.value, 'admin');
    if (result.token) router.push('/system-admin');
    else message.value = result.message || 'اعتبارنامه نامعتبر است';
  } catch (error) {
    message.value = 'ارتباط با سرور برقرار نشد.';
  } finally {
    isLoading.value = false;
  }
};
</script>
