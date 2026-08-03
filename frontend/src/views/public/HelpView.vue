<template>
  <div class="min-h-screen bg-neutral-50 font-sans selection:bg-cyan-100 pb-12">
    <!-- Navbar -->
    <header class="border-b border-neutral-100 bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
      <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <RouterLink to="/" class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-l from-primary to-cyan-500">زلف دوتا</RouterLink>
        <div class="hidden md:flex gap-8 text-sm font-bold text-neutral-600">
          <RouterLink to="/" class="hover:text-primary transition-colors">صفحه اصلی</RouterLink>
          <RouterLink to="/help" class="text-primary">راهنمای استفاده</RouterLink>
          <RouterLink to="/about" class="hover:text-primary transition-colors">درباره ما</RouterLink>
        </div>
        <div class="flex gap-4">
          <RouterLink class="btn-primary py-2 px-5 hidden sm:block" to="/register">ثبت‌نام فروشگاه</RouterLink>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-4xl px-6 pt-32 pb-16">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-black text-neutral-900 mb-4 tracking-tight">چگونه از سیستم استفاده کنیم؟</h1>
        <p class="text-neutral-500 text-lg">آموزش قدم به قدم تبدیل شدن به یک فروشگاه حرفه‌ای</p>
      </div>

      <div class="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent">
        
        <!-- Step 1 -->
        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-white shadow-xl shadow-primary/20 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-primary font-black text-xl">1</div>
          <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-[2rem] shadow-sm border border-neutral-100">
            <h3 class="font-black text-xl text-neutral-900 mb-3">ثبت نام و ایجاد فروشگاه</h3>
            <p class="text-neutral-500 leading-relaxed text-sm">ابتدا در سیستم ثبت‌نام کنید. یک نام و شناسه یکتا (لینک) برای فروشگاه خود انتخاب کنید. پس از ثبت‌نام، حساب شما فوراً ساخته می‌شود.</p>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-white shadow-xl shadow-primary/20 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-primary font-black text-xl">2</div>
          <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-[2rem] shadow-sm border border-neutral-100">
            <h3 class="font-black text-xl text-neutral-900 mb-3">افزودن محصولات</h3>
            <p class="text-neutral-500 leading-relaxed text-sm">از منوی پنل، به بخش «محصولات» بروید. تصاویر، توضیحات و قیمت محصولات خود را وارد کنید تا پایگاه داده فروشگاه شما شکل بگیرد.</p>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-white shadow-xl shadow-primary/20 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-primary font-black text-xl">3</div>
          <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-[2rem] shadow-sm border border-neutral-100">
            <h3 class="font-black text-xl text-neutral-900 mb-3">ثبت سفارش مشتری</h3>
            <p class="text-neutral-500 leading-relaxed text-sm">وقتی در دایرکت یا واتساپ سفارشی گرفتید، به بخش «سفارش‌ها» بروید. شماره مشتری را بزنید، محصول را انتخاب کنید و دکمه ثبت را بزنید.</p>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-primary shadow-xl shadow-primary/40 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white font-black text-xl">✓</div>
          <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-gradient-to-br from-primary to-fuchsia-500 p-8 rounded-[2rem] shadow-lg text-white">
            <h3 class="font-black text-xl mb-3">ارسال لینک پیگیری</h3>
            <p class="text-white/80 leading-relaxed text-sm">پس از ثبت، سیستم یک لینک پیگیری اختصاصی به شما می‌دهد. آن را برای مشتری کپی کنید تا خودش در لحظه وضعیت بسته و کد پستی را چک کند!</p>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>
