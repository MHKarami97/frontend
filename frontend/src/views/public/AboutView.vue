<template>
  <div class="min-h-screen bg-white font-sans selection:bg-fuchsia-100 pb-12">
    
    <!-- Navbar -->
    <header class="border-b border-neutral-100 bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
      <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <RouterLink to="/" class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-l from-primary to-cyan-500">
          زلف دوتا
        </RouterLink>
        <div class="hidden md:flex gap-8 text-sm font-bold text-neutral-600">
          <RouterLink to="/" class="hover:text-primary transition-colors">صفحه اصلی</RouterLink>
          <RouterLink to="/about" class="text-primary">درباره ما</RouterLink>
          <RouterLink to="/contact" class="hover:text-primary transition-colors">تماس با ما</RouterLink>
        </div>
        <div class="flex gap-4">
          <RouterLink class="text-sm font-semibold text-neutral-600 hover:text-primary transition-colors py-2" to="/login">ورود</RouterLink>
          <RouterLink class="btn-primary py-2 px-5 hidden sm:block" to="/register">ثبت‌نام فروشگاه</RouterLink>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
      <h1 class="text-4xl md:text-6xl font-black text-neutral-900 tracking-tight leading-tight">
        ماموریت ما؛<br>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">ساده‌سازی تجارت آنلاین</span>
      </h1>
      <p class="mt-8 text-lg text-neutral-500 leading-relaxed max-w-3xl mx-auto">
        سیستم مدیریت سفارشات «زلف دوتا» با هدف رفع دغدغه‌های روزمره فروشگاه‌های شبکه‌های اجتماعی متولد شد. ما باور داریم که تکنولوژی باید در خدمت رشد کسب‌وکار شما باشد، نه یک بارِ اضافی بر دوش شما.
      </p>
    </section>

    <!-- Core Values -->
    <section class="mx-auto max-w-7xl px-6 py-12">
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-neutral-50 rounded-[2rem] p-8 border border-neutral-100 hover:shadow-lg transition-shadow">
          <div class="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl mb-6">🎯</div>
          <h3 class="text-xl font-bold text-neutral-900 mb-4">تمرکز بر سرعت</h3>
          <p class="text-neutral-500 leading-relaxed">
            معماری سیستم ما مبتنی بر تکنولوژی‌های لبه (Edge Computing) است تا در کسری از ثانیه سفارشات شما را پردازش و ثبت کند.
          </p>
        </div>
        <div class="bg-neutral-50 rounded-[2rem] p-8 border border-neutral-100 hover:shadow-lg transition-shadow">
          <div class="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl mb-6">🔒</div>
          <h3 class="text-xl font-bold text-neutral-900 mb-4">امنیت و حریم خصوصی</h3>
          <p class="text-neutral-500 leading-relaxed">
            داده‌های مالی و اطلاعات مشتریان شما ارزشمندترین دارایی شماست. ما با سیستم‌های رمزنگاری پیشرفته از این داده‌ها محافظت می‌کنیم.
          </p>
        </div>
        <div class="bg-neutral-50 rounded-[2rem] p-8 border border-neutral-100 hover:shadow-lg transition-shadow">
          <div class="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl mb-6">🤝</div>
          <h3 class="text-xl font-bold text-neutral-900 mb-4">پشتیبانی همگام</h3>
          <p class="text-neutral-500 leading-relaxed">
            ما فقط یک نرم‌افزار نمی‌فروشیم، بلکه شریک فکری و فنی شما در مسیر توسعه و افزایش فروش فروشگاهتان هستیم.
          </p>
        </div>
      </div>
    </section>

    <!-- Developer Story / Footer Callout -->
    <section class="mx-auto max-w-5xl px-6 py-16 mt-12">
      <div class="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
        <div class="absolute -left-20 -top-20 w-64 h-64 bg-primary opacity-20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -right-10 bottom-0 w-48 h-48 bg-cyan-500 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
        
        <h2 class="text-3xl font-black mb-6 relative z-10">آماده ارتقای کسب‌وکار خود هستید؟</h2>
        <p class="text-neutral-400 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
          به جمع فروشگاه‌های پیشرو بپیوندید و با شفافیت در پیگیری سفارشات، وفاداری مشتریان خود را تضمین کنید.
        </p>
        <RouterLink to="/register" class="btn-primary py-4 px-8 text-lg relative z-10 shadow-xl shadow-primary/30">
          همین حالا فروشگاه خود را بسازید
        </RouterLink>
      </div>
    </section>

  </div>
</template>
