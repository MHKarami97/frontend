<template>
  <div>
    <section class="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
      <div class="grid items-center gap-8 md:grid-cols-2">
        <div>
          <span class="inline-flex rounded-full bg-fuchsia-100 px-4 py-2 text-sm font-bold text-primary">PWA مدیریت سفارش موبایل‌محور</span>
          <h1 class="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">مدیریت سفارش، پیگیری خریدار و گزارش فروش در یک اپ</h1>
          <p class="mt-4 text-base leading-8 text-neutral-600 md:text-lg">مناسب فروشگاه‌های اینستاگرام، تلگرام، واتساپ و وب‌سایت؛ با لینک یکتای پیگیری، مدیریت محصول، مشتری، آمار شهری و جنسیتی و امکانات Pro.</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <RouterLink class="btn-primary" to="/register">ثبت‌نام فروشگاه</RouterLink>
            <RouterLink class="btn-secondary" to="/login">ورود</RouterLink>
          </div>
        </div>
        <div class="card p-5">
          <div class="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 p-6 text-white shadow-sm">
            <div class="text-sm">امکانات Pro</div>
            <ul class="mt-4 space-y-3 text-sm leading-7">
              <li>افزایش سقف لینک روزانه</li>
              <li>افزایش تعداد محصولات</li>
              <li>افزایش تعداد همکاران فروشگاه</li>
              <li>گزارش‌های دقیق‌تر و مقایسه زمانی</li>
              <li>مدیریت کامل از پنل ادمین سیستم</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
