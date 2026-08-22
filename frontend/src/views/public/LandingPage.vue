<template>
  <div class="min-h-screen bg-white font-sans selection:bg-fuchsia-100">
    <header class="border-b border-neutral-100 bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
      <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <RouterLink to="/" class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-l from-primary to-cyan-500">زلف دوتا</RouterLink>
        
        <!-- Desktop Nav -->
        <div class="hidden md:flex gap-8 text-sm font-bold text-neutral-600">
          <!-- <button @click="scrollTo('plans')" class="hover:text-primary transition-colors">تعرفه‌ها</button> -->
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
        <!-- <button @click="scrollTo('plans'); isMobileMenuOpen=false" class="text-lg font-black text-neutral-800 text-right w-full border-b border-neutral-100 pb-4">تعرفه‌ها و اشتراک‌ها</button> -->
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
        <button @click="scrollTo('features')" class="btn-secondary text-lg px-8 py-4 bg-white cursor-pointer hover:bg-neutral-50">نحوه کارکرد سیستم</button>
      </div>
    </section>

     <!-- Testimonials / About -->
    <section class="py-24 mx-auto max-w-7xl px-6">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-3xl font-extrabold text-neutral-900 mb-6">درباره پلتفرم ما</h2>
          <p class="text-neutral-600 leading-8 text-lg mb-6 text-justify">
            پلتفرم ما با درک عمیق از چالش‌های فروشگاه‌های شبکه اجتماعی طراحی شده است. ما معماری را انتخاب کردیم تا سریع‌ترین و سبک‌ترین تجربه را روی موبایل داشته باشید.
          </p>
          <ul class="space-y-4 font-medium text-neutral-700">
            <li class="flex items-center gap-3"><span class="text-primary">✔</span> سرعت بی‌نظیر</li>
            <li class="flex items-center gap-3"><span class="text-primary">✔</span> دارای نسخه رایگان</li>
            <li class="flex items-center gap-3"><span class="text-primary">✔</span> امنیت بالای داده‌های مشتریان</li>
          </ul>
        </div>
        <div class="bg-gradient-to-br from-neutral-900 to-neutral-800 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-primary opacity-20 rounded-full blur-3xl pointer-events-none"></div>
          <p class="text-xl text-neutral-300 leading-relaxed italic mb-8 relative z-10">
             "از زمانی که از این سیستم استفاده می‌کنم، بار پشتیبانی دایرکت‌های اینستاگرام من ۶۰ درصد کاهش یافته و مشتریانم اعتماد بسیار بیشتری به پیج پیدا کرده‌اند."
          </p>
          <div class="flex items-center gap-4 relative z-10">
            <div class="w-12 h-12 bg-neutral-600 rounded-full flex items-center justify-center text-white font-medium select-none">M</div>
            <div>
              <div class="text-white font-bold">فروشگاه لباس ماهور</div>
              <div class="text-sm text-neutral-400">مشتری نسخه Pro</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section id="features" class="bg-neutral-50 py-24 border-y border-neutral-100">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-extrabold text-neutral-900">چرا زلف دوتا؟</h2>
          <p class="mt-4 text-neutral-500 text-lg">ابزارهای قدرتمند با کاربری فوق‌العاده ساده.</p>
        </div>
        
        <div class="grid gap-8 md:grid-cols-3">
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 hover:shadow-lg transition-shadow">
            <div class="w-14 h-14 bg-fuchsia-100 rounded-2xl flex items-center justify-center text-3xl mb-6">🔗</div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3">لینک اختصاصی رهگیری</h3>
            <p class="text-neutral-500 leading-relaxed">
              دیگر نیازی به پاسخگویی دائم به سوال "سفارش من کجاست؟" نیست. مشتری به صورت لحظه‌ای از وضعیت آگاه می‌شود.
            </p>
          </div>
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 hover:shadow-lg transition-shadow">
            <div class="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center text-3xl mb-6">📊</div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3">گزارش‌های تحلیلی</h3>
            <p class="text-neutral-500 leading-relaxed">
              تفکیک فروش بر اساس شهر، جنسیت و منبع سفارش. بهترین محصولات خود را بشناسید و روی آن‌ها تمرکز کنید.
            </p>
          </div>
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 hover:shadow-lg transition-shadow">
            <div class="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl mb-6">👥</div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3">مدیریت تیم و همکاران</h3>
            <p class="text-neutral-500 leading-relaxed">
              دسترسی محدود به اپراتورها برای ثبت سفارش بدون افشای اطلاعات حیاتی مالی فروشگاه (در نسخه Pro).
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING PLANS -->
    <!-- <section id="plans" class="bg-neutral-50 py-24 border-y border-neutral-100">
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
    </section> -->

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
