<template>
  <div class="mx-auto flex min-h-screen max-w-md items-center px-4">
    <div class="card w-full p-6">
      <h1 class="text-2xl font-extrabold">ورود</h1>
      <form class="mt-5 space-y-4" @submit.prevent="submit">
        <input v-model="email" class="input" type="email" placeholder="ایمیل" />
        <input v-model="password" class="input" type="password" placeholder="رمز عبور" />
        <select v-model="scope" class="input">
          <option value="shop">فروشگاه</option>
          <option value="admin">ادمین سیستم</option>
        </select>
        <button class="btn-primary w-full">ورود</button>
      </form>
      <p v-if="message" class="mt-4 text-sm text-neutral-600">{{ message }}</p>
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
const scope = ref<'shop' | 'admin'>('shop');
const message = ref('');
const submit = async () => {
  const result = await store.login(email.value, password.value, scope.value);
  message.value = result.message || '';
  if (result.token) router.push(scope.value === 'admin' ? '/system-admin' : '/dashboard');
};
</script>
