<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full text-center space-y-6">
      <div class="relative">
        <h1 class="text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-100 leading-none select-none">404</h1>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="bg-white px-4 py-2 rounded-xl shadow-lg border border-neutral-100 rotate-[-5deg]">
            <span class="text-2xl font-black text-primary">مسیر اشتباه!</span>
          </div>
        </div>
      </div>
      
      <div class="space-y-2">
        <h2 class="text-xl font-bold text-neutral-800">صفحه‌ای که به دنبالش بودید پیدا نشد.</h2>
        <p class="text-neutral-500 text-sm leading-relaxed">
          ممکن است آدرس را اشتباه وارد کرده باشید، یا این صفحه از سیستم حذف شده باشد. لطفاً به صفحه اصلی بازگردید.
        </p>
      </div>
      
      <div class="pt-4">
        <RouterLink to="/" class="btn-primary inline-flex items-center gap-2 px-8 py-3.5 shadow-xl shadow-primary/20">
          <svg class="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          بازگشت به خانه
        </RouterLink>
      </div>
    </div>
  </div>
</template>
