<template>
  <div class="min-h-screen bg-white font-sans selection:bg-fuchsia-100">
    
    <!-- Navbar -->
    <header class="border-b border-neutral-100 bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
      <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <RouterLink to="/" class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-l from-primary to-cyan-500">
          زلف دوتا
        </RouterLink>
        <div class="hidden md:flex gap-8 text-sm font-bold text-neutral-600">
          <RouterLink to="/" class="text-primary">صفحه اصلی</RouterLink>
          <RouterLink to="/about" class="hover:text-primary transition-colors">درباره ما</RouterLink>
          <RouterLink to="/contact" class="hover:text-primary transition-colors">تماس با ما</RouterLink>
        </div>
        <div class="flex gap-4">
          <RouterLink class="text-sm font-semibold text-neutral-600 hover:text-primary transition-colors py-2" to="/login">ورود فروشگاه</RouterLink>
          <RouterLink class="btn-primary py-2 px-5 hidden sm:block" to="/register">ثبت‌نام</RouterLink>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="mx-auto max-w-7xl px-6 pt-32 pb-20 md:pt-48 md:pb-32 text-center">
      <span class="inline-flex rounded-full bg-fuchsia-50 px-5 py-2 text-sm font-bold text-primary mb-6 border border-fuchsia-100">
        🚀 راه‌حل جامع مدیریت سفارش‌های سوشال مدیا
      </span>
      <h1 class="mx-auto max-w-4xl text-5xl md:text-7xl font-black leading-tight text-neutral-900 tracking-tight">
        فروش خود را به یک <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">تجربه حرفه‌ای</span> تبدیل کنید.
      </h1>
      <p class="mx-auto mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-neutral-500">
        بدون نیاز به زیرساخت پیچیده، سفارشات اینستاگرام و تلگرام خود را ثبت کنید و به مشتریان لینک رهگیری اختصاصی بدهید. شفافیت بیشتر، فروش بیشتر.
      </p>
      <div class="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <RouterLink class="btn-primary text-lg px-8 py-4 shadow-xl shadow-primary/20" to="/register">شروع رایگان</RouterLink>
        <button @click="scrollToFeatures" class="btn-secondary text-lg px-8 py-4 bg-white cursor-pointer hover:bg-neutral-50 transition-colors">
          آشنایی با امکانات
        </button>
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

    <!-- Footer -->
    <footer class="bg-neutral-50 py-12 border-t border-neutral-200 text-center">
      <div class="text-2xl font-black text-neutral-900 mb-4">زلف دوتا</div>
      <p class="text-neutral-500 text-sm mb-6">تمامی حقوق برای پلتفرم رهگیری سفارشات محفوظ است.</p>
      <p class="text-neutral-500 text-sm mb-3">طراحی توسط <a href="https://mhkarami97.ir">mhkarami97</a></p>
      <div class="flex items-center justify-center gap-6 mb-8">
        <RouterLink to="/about" class="text-sm font-bold text-neutral-500 hover:text-primary transition-colors">درباره ما</RouterLink>
        <RouterLink to="/contact" class="text-sm font-bold text-neutral-500 hover:text-primary transition-colors">تماس با ما</RouterLink>
      </div>    
    </footer>
  </div>
</template>
<script setup lang="ts">
const scrollToFeatures = () => {
  const element = document.getElementById('features');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>
