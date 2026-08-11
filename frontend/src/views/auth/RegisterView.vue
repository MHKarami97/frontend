<template>
  <div class="mx-auto flex min-h-screen max-w-md items-center px-4 relative">
    <div v-if="showSuccess" class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md">
      <div class="bg-white p-10 rounded-3xl text-center shadow-2xl border border-neutral-100">
        <div class="text-6xl mb-6">🎉</div>
        <h2 class="text-2xl font-extrabold text-neutral-900 mb-2">ثبت‌نام با موفقیت انجام شد!</h2>
        <p class="text-neutral-500">حساب شما ایجاد شد و در انتظار تایید ادمین می‌باشد.</p>
        <div class="mt-6 text-sm text-primary animate-pulse">در حال انتقال به صفحه اصلی...</div>
      </div>
    </div>

    <div class="card w-full p-8 shadow-lg">
      <h1 class="text-2xl font-extrabold text-center mb-8">ایجاد فروشگاه جدید</h1>
      <form class="space-y-4" @submit.prevent="submit">
        <div class="flex flex-col gap-1.5">
          <label for="shopName" class="label-text">نام فروشگاه (حداقل 3 کاراکتر)</label>
          <input id="shopName" v-model="name" class="input-field" placeholder="مثلاً: فروشگاه لباس ماهور" minlength="3" :disabled="isLoading" required />
        </div>
        
        <div class="flex flex-col gap-1.5">
          <label for="shopSlug" class="label-text">شناسه یکتا (حداقل 3 کاراکتر)</label>
          <input id="shopSlug" v-model="slug" class="input-field" placeholder="فقط حروف انگلیسی و خط تیره" dir="ltr" pattern="[a-z0-9-]+" title="فقط حروف کوچک انگلیسی، اعداد و خط تیره" :disabled="isLoading" required />
        </div>
        
        <div class="flex flex-col gap-1.5">
          <label for="shopEmail" class="label-text">ایمیل</label>
          <input id="shopEmail" v-model="email" class="input-field" type="email" placeholder="example@domain.com" dir="ltr" :disabled="isLoading" required />
        </div>
        
        <div class="flex flex-col gap-1.5">
          <label for="shopPassword" class="label-text">رمز عبور</label>
          <input id="shopPassword" v-model="password" class="input-field" type="password" placeholder="حداقل ۸ کاراکتر" dir="ltr" minlength="8" :disabled="isLoading" required />
        </div>
        
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

const translateBackendError = (msg: string) => {
  if (msg === 'Shop already exists') return 'فروشگاهی با این ایمیل یا شناسه یکتا قبلاً ثبت شده است.';
  if (msg.includes('slug')) return 'شناسه یکتا نامعتبر است (فقط از حروف انگلیسی، اعداد و خط تیره استفاده کنید).';
  if (msg.includes('password')) return 'رمز عبور باید حداقل ۸ کاراکتر باشد.';
  if (msg.includes('email')) return 'فرمت ایمیل وارد شده نامعتبر است.';
  return msg || 'خطا در ثبت‌نام. لطفاً اطلاعات را بررسی کنید.';
};

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
    
    // اگر پاسخ 200 یا 201 باشد و پیام موفقیت آمیز باشد
    if (result.message === 'Shop registered and pending approval') {
      showSuccess.value = true;
      setTimeout(() => router.push('/'), 3500);
    } else {
      // استفاده از مپر برای خطاهای 400 یا 409 که ساختار JSON دارند
      message.value = translateBackendError(result.message);
    }
  } catch (error: any) {
    // خطاهای شبکه یا خطاهایی که در fetch رخ می‌دهند
    message.value = error.message || 'اتصال اینترنت خود را بررسی کنید.';
  } finally {
    isLoading.value = false;
  }
};
</script>
