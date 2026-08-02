<template>
  <div class="mx-auto flex min-h-screen max-w-md items-center px-4">
    <div class="card w-full p-8 text-center shadow-lg border-t-4 border-t-primary">
      <h1 class="text-2xl font-extrabold text-neutral-800">ورود به پنل فروشگاه</h1>
      <p class="text-sm text-neutral-500 mt-2">مدیریت سفارشات و پیگیری مشتریان</p>
      
      <form class="mt-8 space-y-5" @submit.prevent="submit">
        <input v-model="email" class="input-field" type="email" placeholder="ایمیل" :disabled="isLoading" required />
        <input v-model="password" class="input-field" type="password" placeholder="رمز عبور" :disabled="isLoading" required />
        
        <button class="btn-primary w-full py-3 text-base" :disabled="isLoading">
          {{ isLoading ? 'در حال بررسی...' : 'ورود به حساب' }}
        </button>
      </form>
      <p v-if="message" class="mt-4 text-sm text-danger font-medium">{{ message }}</p>
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
    const result = await store.login(email.value, password.value, 'shop');
    if (result.token) {
      router.push('/dashboard');
    } else {
      message.value = result.message || 'خطا در ورود';
    }
  } catch (error) {
    message.value = 'ارتباط با سرور برقرار نشد.';
  } finally {
    isLoading.value = false;
  }
};
</script>