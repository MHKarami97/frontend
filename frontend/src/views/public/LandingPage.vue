<template>
  <div class="min-h-screen bg-white font-sans selection:bg-fuchsia-100">
    <header class="border-b border-neutral-100 bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
      <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <RouterLink to="/" class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-l from-primary to-cyan-500">زلف دوتا</RouterLink>
        
        <!-- Desktop Nav -->
        <div class="hidden md:flex gap-8 text-sm font-bold text-neutral-600">
          <button @click="scrollTo('plans')" class="hover:text-primary transition-colors">تعرفه‌ها</button>
          <RouterLink to="/help" class="hover:text-primary transition-colors">راهنمای استفاده</RouterLink>
          <RouterLink to="/about" class="hover:text-primary transition-colors">درباره ما</RouterLink>
        </div>
        
        <!-- Desktop CTA -->
        <div class="hidden md:flex gap-4">
          <RouterLink class="text-sm font-semibold text-neutral-600 hover:text-primary transition-colors py-2" to="/login">ورود</RouterLink>
          <RouterLink class="btn-primary py-2 px-5" to="/register">ثبت‌نام</RouterLink>
        </div>

        <!-- Mobile Hamburger -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden text-neutral-600 p-2">
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Mobile Fullscreen Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-0 w-full h-screen bg-white/95 backdrop-blur-3xl border-t border-neutral-100 p-6 flex flex-col gap-6 animate-[slideDown_0.2s_ease-out]">
        <button @click="scrollTo('plans'); isMobileMenuOpen=false" class="text-lg font-black text-neutral-800 text-right w-full border-b border-neutral-100 pb-4">تعرفه‌ها و اشتراک‌ها</button>
        <RouterLink to="/help" @click="isMobileMenuOpen=false" class="text-lg font-black text-neutral-800 border-b border-neutral-100 pb-4">راهنمای استفاده</RouterLink>
        <RouterLink to="/about" @click="isMobileMenuOpen=false" class="text-lg font-black text-neutral-800 border-b border-neutral-100 pb-4">درباره ما</RouterLink>
        <RouterLink to="/contact" @click="isMobileMenuOpen=false" class="text-lg font-black text-neutral-800 border-b border-neutral-100 pb-4">تماس با ما</RouterLink>
        
        <div class="mt-8 flex flex-col gap-4">
          <RouterLink to="/login" @click="isMobileMenuOpen=false" class="btn-secondary w-full text-center py-4 text-lg">ورود به پنل</RouterLink>
          <RouterLink to="/register" @click="isMobileMenuOpen=false" class="btn-primary w-full text-center py-4 text-lg shadow-xl shadow-primary/20">ثبت‌نام فروشگاه</RouterLink>
        </div>
      </div>
    </header>

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-20 text-center">
      <h1 class="mx-auto max-w-4xl text-5xl md:text-7xl font-black leading-tight text-neutral-900 tracking-tight">
        فروش خود را به یک <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">تجربه حرفه‌ای</span> تبدیل کنید.
      </h1>
      <p class="mx-auto mt-8 max-w-2xl text-lg text-neutral-500">بدون نیاز به زیرساخت پیچیده، سفارشات خود را ثبت کنید و به مشتریان لینک رهگیری اختصاصی بدهید.</p>
      <div class="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <RouterLink class="btn-primary text-lg px-8 py-4" to="/register">شروع رایگان</RouterLink>
        <button @click="scrollTo('plans')" class="btn-secondary text-lg px-8 py-4 bg-white cursor-pointer hover:bg-neutral-50">نحوه کارکرد سیستم</button>
      </div>
    </section>

    <!-- PRICING PLANS -->
    <section id="plans" class="bg-neutral-50 py-24 border-y border-neutral-100">
      <div class="mx-auto max-w-5xl px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-extrabold text-neutral-900">تعرفه‌ها و اشتراک‌ها</h2>
          <p class="mt-4 text-neutral-500 text-lg">بسته به بزرگی فروشگاهتان، پلن مناسب خود را انتخاب کنید.</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 items-center">
          <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-neutral-200">
            <h3 class="text-xl font-black text-neutral-800">نسخه پایه</h3>
            <div class="mt-4 text-3xl font-black text-neutral-900">رایگان</div>
            <ul class="mt-8 space-y-4 text-sm text-neutral-600 font-medium">
              <li class="flex gap-2"><span>✔</span> ۵۰ لینک پیگیری روزانه</li>
              <li class="flex gap-2"><span>✔</span> تا ۵۰ محصول</li>
              <li class="flex gap-2 text-neutral-400"><span>✖</span> بدون اپراتور (فقط مدیر)</li>
            </ul>
          </div>
          
          <div class="bg-gradient-to-b from-neutral-900 to-neutral-800 p-8 rounded-[2rem] shadow-2xl border-none text-white relative transform md:-translate-y-4">
            <div class="absolute -top-4 right-8 bg-gradient-to-r from-primary to-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-full">محبوب‌ترین</div>
            <h3 class="text-xl font-black text-neutral-100">پلن حرفه‌ای</h3>
            <div class="mt-4 text-4xl font-black text-white">150<span class="text-xl font-normal opacity-70">هزارتومان/ماه</span></div>
            <ul class="mt-8 space-y-4 text-sm text-neutral-300 font-medium">
              <li class="flex gap-2"><span class="text-primary">✔</span> ۲۰۰ لینک پیگیری روزانه</li>
              <li class="flex gap-2"><span class="text-primary">✔</span> تا ۲۰۰ محصول</li>
              <li class="flex gap-2"><span class="text-primary">✔</span> ۲ اپراتور فروشگاه</li>
            </ul>
          </div>
          
          <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-neutral-200">
            <h3 class="text-xl font-black text-neutral-800">پلن VIP</h3>
            <div class="mt-4 text-3xl font-black text-neutral-900">300<span class="text-base font-normal text-neutral-500">هزارتومان/ماه</span></div>
            <ul class="mt-8 space-y-4 text-sm text-neutral-600 font-medium">
              <li class="flex gap-2"><span class="text-cyan-500">✔</span> ۱۰۰۰ لینک پیگیری روزانه</li>
              <li class="flex gap-2"><span class="text-cyan-500">✔</span> تا ۱۰۰۰ محصول</li>
              <li class="flex gap-2"><span class="text-cyan-500">✔</span> ۵ اپراتور فروشگاه</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-neutral-900 text-neutral-400 py-12 text-center text-sm">
       <div class="text-2xl font-black text-white mb-6">زلف دوتا</div>
       <p class="text-neutral-500 text-sm mb-3">طراحی توسط <a href="https://mhkarami97.ir">mhkarami97</a></p>
       <div class="flex justify-center gap-6 mb-6">
          <button @click="scrollTo('plans')" class="hover:text-white transition-colors">تعرفه‌ها</button>
          <RouterLink to="/help" class="hover:text-white transition-colors">راهنمای استفاده</RouterLink>
          <RouterLink to="/about" class="hover:text-white transition-colors">درباره ما</RouterLink>
       </div>
       <p>© تمامی حقوق محفوظ است.</p>
    </footer>
  </div>
</template>

<style scoped>
@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
</style>

<script setup lang="ts">
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};
</script>
