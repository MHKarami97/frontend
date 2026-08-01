<template>
  <div class="mx-auto flex min-h-screen max-w-md items-center px-4">
    <div class="card w-full p-6">
      <h1 class="text-2xl font-extrabold">ثبت‌نام فروشگاه</h1>
      <form class="mt-5 space-y-4" @submit.prevent="submit">
        <input v-model="name" class="input" placeholder="نام فروشگاه" />
        <input v-model="slug" class="input" placeholder="slug انگلیسی" />
        <input v-model="email" class="input" type="email" placeholder="ایمیل" />
        <input v-model="password" class="input" type="password" placeholder="رمز عبور" />
        <button class="btn-primary w-full">ثبت‌نام</button>
      </form>
      <p v-if="message" class="mt-4 text-sm text-neutral-600">{{ message }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { api } from '../../services/api';
const name = ref('');
const slug = ref('');
const email = ref('');
const password = ref('');
const message = ref('');
const submit = async () => {
  const result = await api.post('/api/auth/register', { name: name.value, slug: slug.value, email: email.value, password: password.value });
  message.value = result.message || 'انجام شد';
};
</script>
