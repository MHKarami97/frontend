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
              <div class="font-bold text-neutral-800">ایران، البرز، کرج</div>
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

        <!-- Contact Form (UI Only) -->
        <div class="lg:col-span-3 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-neutral-200/40 border border-neutral-100">
          <h2 class="text-2xl font-black text-neutral-900 mb-8">ارسال پیام مستقیم</h2>
          <form class="space-y-6" @submit.prevent="submitForm">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-1.5">
                <label class="label-text">نام و نام خانوادگی</label>
                <input type="text" class="input-field bg-neutral-50" placeholder="مثلا: علی محمدی" required>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="label-text">ایمیل یا شماره تماس</label>
                <input type="text" class="input-field bg-neutral-50 text-left" dir="ltr" placeholder="0912..." required>
              </div>
            </div>
            
            <div class="flex flex-col gap-1.5">
              <label class="label-text">موضوع پیام</label>
              <select class="input-field bg-neutral-50" required>
                <option value="">انتخاب کنید...</option>
                <option value="support">پشتیبانی فنی</option>
                <option value="sales">خرید پلن و ارتقا</option>
                <option value="suggestion">پیشنهاد امکانات جدید</option>
                <option value="other">سایر موارد</option>
              </select>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="label-text">متن پیام</label>
              <textarea class="input-field bg-neutral-50 h-32 py-3 resize-none" placeholder="پیام خود را بنویسید..." required></textarea>
            </div>

            <button type="submit" class="btn-primary w-full py-4 text-base shadow-lg shadow-primary/20">
              ارسال پیام
            </button>
          </form>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const submitForm = () => {
  alert('این فرم در حال حاضر صرفاً یک رابط کاربری است. لطفا از طریق تلگرام یا ایمیل اقدام نمایید.');
};
</script>
