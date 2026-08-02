<template>
  <div class="mx-auto flex min-h-screen max-w-md items-center px-4 relative">
    
    <!-- Overlay Success -->
    <div v-if="showSuccess" class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md">
      <div class="bg-white p-10 rounded-3xl text-center shadow-2xl transform scale-100 transition-all border border-neutral-100">
        <div class="text-6xl mb-6">🎉</div>
        <h2 class="text-2xl font-extrabold text-neutral-900 mb-2">ثبت‌نام با موفقیت انجام شد!</h2>
        <p class="text-neutral-500">حساب شما ایجاد شد و در انتظار تایید ادمین می‌باشد.</p>
        <div class="mt-6 text-sm text-primary animate-pulse">در حال انتقال به صفحه اصلی...</div>
      </div>
    </div>

    <div class="card w-full p-8 shadow-lg">
      <h1 class="text-2xl font-extrabold text-center mb-8">ایجاد فروشگاه جدید</h1>
      <form class="space-y-4" @submit.prevent="submit">
        <input v-model="name" class="input-field" placeholder="نام فروشگاه" :disabled="isLoading" required />
        <input v-model="slug" class="input-field" placeholder="Slug (لینک یکتا)" pattern="[a-z0-9-]+" title="فقط حروف کوچک انگلیسی، اعداد و خط تیره" :disabled="isLoading" required />
        <input v-model="email" class="input-field" type="email" placeholder="ایمیل معتبر" :disabled="isLoading" required />
        <input v-model="password" class="input-field" type="password" placeholder="رمز عبور (حداقل ۸ کاراکتر)" minlength="8" :disabled="isLoading" required />
        
        <button class="btn-primary w-full py-3 mt-4" :disabled="isLoading">
          {{ isLoading ? 'در حال ایجاد حساب...' : 'ثبت‌نام' }}
        </button>
      </form>
      <p v-if="message && !showSuccess" class="mt-4 text-sm text-danger text-center">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '../../services/api';

const router = useRouter();
const name = ref('');
const slug = ref('');
const email = ref('');
const password = ref('');
const message = ref('');
const isLoading = ref(false);
const showSuccess = ref(false);

const submit = async () => {
  isLoading.value = true;
  message.value = '';
  try {
    const result = await api.post('/api/auth/register', { 
      name: name.value, 
      slug: slug.value, 
      email: email.value, 
      password: password.value 
    });
    
    if (result.message === 'Shop registered and pending approval') {
      showSuccess.value = true;
      setTimeout(() => {
        router.push('/');
      }, 3500);
    } else {
      message.value = result.message || 'خطا در ثبت نام';
    }
  } catch (error) {
    message.value = 'ارتباط با سرور با مشکل مواجه شد';
  } finally {
    isLoading.value = false;
  }
};
</script>