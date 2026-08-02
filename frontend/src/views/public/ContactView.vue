<template>
  <div class="min-h-screen bg-neutral-50 font-sans selection:bg-cyan-100 pb-12">
    
    <!-- Navbar -->
    <header class="border-b border-neutral-100 bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
      <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <RouterLink to="/" class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-l from-primary to-cyan-500">
          زلف دوتا
        </RouterLink>
        <div class="hidden md:flex gap-8 text-sm font-bold text-neutral-600">
          <RouterLink to="/" class="hover:text-primary transition-colors">صفحه اصلی</RouterLink>
          <RouterLink to="/about" class="hover:text-primary transition-colors">درباره ما</RouterLink>
          <RouterLink to="/contact" class="text-primary">تماس با ما</RouterLink>
        </div>
        <div class="flex gap-4">
          <RouterLink class="text-sm font-semibold text-neutral-600 hover:text-primary transition-colors py-2" to="/login">ورود</RouterLink>
          <RouterLink class="btn-primary py-2 px-5 hidden sm:block" to="/register">ثبت‌نام فروشگاه</RouterLink>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="mx-auto max-w-7xl px-6 pt-32 pb-16">
      
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h1 class="text-4xl font-black text-neutral-900 mb-4">ارتباط با تیم پشتیبانی</h1>
        <p class="text-neutral-500 text-lg">برای راهنمایی، گزارش خطا یا درخواست امکانات اختصاصی با ما در ارتباط باشید.</p>
      </div>

      <div class="grid lg:grid-cols-5 gap-10 items-start">
        
        <!-- Contact Info Cards -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm flex items-center gap-5 hover:border-primary/30 transition-colors">
            <div class="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-2xl shrink-0">📍</div>
            <div>
              <div class="font-bold text-neutral-400 text-xs mb-1">دفتر مرکزی</div>
              <div class="font-bold text-neutral-800">ایران، تهران</div>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm flex items-center gap-5 hover:border-primary/30 transition-colors">
            <div class="w-14 h-14 bg-fuchsia-50 text-fuchsia-500 rounded-2xl flex items-center justify-center text-2xl shrink-0">✉️</div>
            <div>
              <div class="font-bold text-neutral-400 text-xs mb-1">ایمیل پشتیبانی</div>
              <div class="font-bold text-neutral-800 font-mono" dir="ltr">info@mhkarami97.ir</div>
            </div>
          </div>

          <a href="https://t.me/mhkaami97" target="_blank" class="bg-gradient-to-r from-[#2AABEE] to-[#229ED9] p-6 rounded-[2rem] shadow-lg shadow-blue-500/20 flex items-center gap-5 hover:-translate-y-1 transition-transform group cursor-pointer block">
            <div class="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center text-2xl shrink-0">💬</div>
            <div class="text-white">
              <div class="font-bold text-white/70 text-xs mb-1">پشتیبانی سریع تلگرام</div>
              <div class="font-black text-lg" dir="ltr">@mhkarami97</div>
            </div>
          </a>
        </div>

        <!-- Contact Form (Formspree Integration) -->
        <div class="lg:col-span-3 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-neutral-200/40 border border-neutral-100">
          <h2 class="text-2xl font-black text-neutral-900 mb-8">ارسال پیام مستقیم</h2>
          
          <div v-if="status === 'success'" class="bg-emerald-50 border border-emerald-100 text-emerald-700 p-6 rounded-2xl text-center space-y-2 animate-[slideUp_0.3s_ease-out]">
            <div class="text-4xl mb-2">✅</div>
            <div class="font-black text-lg">پیام شما با موفقیت ارسال شد!</div>
            <div class="text-sm">تیم پشتیبانی ما به زودی با شما تماس خواهد گرفت.</div>
            <button @click="status = 'idle'" class="mt-4 text-emerald-600 text-sm font-bold underline">ارسال پیام جدید</button>
          </div>

          <form v-else class="space-y-6" @submit.prevent="submitForm">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-1.5">
                <label for="name" class="label-text">نام و نام خانوادگی</label>
                <input id="name" v-model="form.name" type="text" class="input-field bg-neutral-50" placeholder="مثلا: علی محمدی" :disabled="status === 'submitting'" required>
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="contact" class="label-text">ایمیل یا شماره تماس</label>
                <input id="contact" v-model="form.contact" type="text" class="input-field bg-neutral-50 text-left" dir="ltr" placeholder="0912..." :disabled="status === 'submitting'" required>
              </div>
            </div>
            
            <div class="flex flex-col gap-1.5">
              <label for="subject" class="label-text">موضوع پیام</label>
              <select id="subject" v-model="form.subject" class="input-field bg-neutral-50" :disabled="status === 'submitting'" required>
                <option value="">انتخاب کنید...</option>
                <option value="پشتیبانی فنی">پشتیبانی فنی</option>
                <option value="خرید پلن و ارتقا">خرید پلن و ارتقا</option>
                <option value="پیشنهاد امکانات جدید">پیشنهاد امکانات جدید</option>
                <option value="سایر موارد">سایر موارد</option>
              </select>
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="message" class="label-text">متن پیام</label>
              <textarea id="message" v-model="form.message" class="input-field bg-neutral-50 h-32 py-3 resize-none" placeholder="پیام خود را بنویسید..." :disabled="status === 'submitting'" required></textarea>
            </div>

            <p v-if="status === 'error'" class="text-sm text-danger font-bold bg-red-50 p-3 rounded-xl border border-red-100">
              متأسفانه خطایی در ارسال پیام رخ داد. لطفاً دوباره تلاش کنید.
            </p>

            <button type="submit" class="btn-primary w-full py-4 text-base shadow-lg shadow-primary/20" :disabled="status === 'submitting'">
              {{ status === 'submitting' ? 'در حال ارسال...' : 'ارسال پیام' }}
            </button>
          </form>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const form = reactive({
  name: '',
  contact: '',
  subject: '',
  message: ''
});

const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle');

const submitForm = async () => {
  status.value = 'submitting';
  
  try {
    const response = await fetch('https://formspree.io/f/meeybyby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        نام: form.name,
        شماره_تماس_یا_ایمیل: form.contact,
        موضوع: form.subject,
        پیام: form.message
      })
    });

    if (response.ok) {
      status.value = 'success';
      // Reset form fields
      form.name = '';
      form.contact = '';
      form.subject = '';
      form.message = '';
    } else {
      status.value = 'error';
    }
  } catch (error) {
    status.value = 'error';
  }
};
</script>
