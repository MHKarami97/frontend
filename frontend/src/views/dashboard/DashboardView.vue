<template>
  <AppShell>
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-extrabold">داشبورد</h1>
        <div v-if="loadingShop" class="skeleton h-4 w-32 mt-2"></div>
        <p v-else class="mt-1 text-sm text-neutral-500">{{ shop.name || 'فروشگاه' }} / {{ shop.slug || '-' }}</p>
      </div>
      
      <!-- Summary Skeletons -->
      <div v-if="loadingSummary" class="grid gap-4 md:grid-cols-4">
        <div v-for="i in 4" :key="i" class="card p-6">
          <div class="skeleton h-4 w-1/2 mb-3"></div>
          <div class="skeleton h-8 w-3/4"></div>
        </div>
      </div>
      <!-- Summary Content -->
      <div v-else class="grid gap-4 md:grid-cols-4">
        <div class="card p-5"><div class="text-sm text-neutral-500">کل سفارش‌ها</div><div class="mt-2 text-3xl font-extrabold">{{ summary.total_orders || 0 }}</div></div>
        <div class="card p-5"><div class="text-sm text-neutral-500">کل فروش</div><div class="mt-2 text-3xl font-extrabold text-primary">{{ Number(summary.total_revenue || 0).toLocaleString('fa-IR') }}</div></div>
        <div class="card p-5"><div class="text-sm text-neutral-500">تحویل‌شده</div><div class="mt-2 text-3xl font-extrabold text-success">{{ summary.delivered_count || 0 }}</div></div>
        <div class="card p-5"><div class="text-sm text-neutral-500">در انتظار</div><div class="mt-2 text-3xl font-extrabold text-warning">{{ summary.pending_count || 0 }}</div></div>
      </div>

      <!-- Settings & Limits -->
      <div class="grid gap-4 md:grid-cols-2">
        <div class="card p-5">
          <h2 class="font-bold">تنظیمات نمایش در لینک خریدار</h2>
          <div v-if="loadingShop" class="mt-4 space-y-4">
             <div class="skeleton h-14 w-full rounded-2xl"></div>
             <div class="skeleton h-12 w-1/3 rounded-2xl"></div>
          </div>
          <div v-else>
            <label class="mt-4 flex items-center justify-between rounded-2xl border border-neutral-200 p-4 text-sm cursor-pointer hover:bg-neutral-50 transition-colors">
              <span>نمایش منبع سفارش</span>
              <input v-model="exposeOrderSource" type="checkbox" class="w-5 h-5 accent-primary" />
            </label>
            <button class="btn-primary mt-4" @click="saveSettings" :disabled="isSaving">
              {{ isSaving ? 'در حال ذخیره...' : 'ذخیره تنظیمات' }}
            </button>
          </div>
        </div>
        
        <!-- <div class="card p-5">
          <h2 class="font-bold">سقف پلن فعلی</h2>
          <div v-if="loadingShop" class="mt-4 space-y-3">
             <div class="skeleton h-5 w-full"></div>
             <div class="skeleton h-5 w-full"></div>
             <div class="skeleton h-5 w-full"></div>
          </div>
          <div v-else class="mt-4 space-y-3 text-sm text-neutral-600">
            <div class="flex justify-between items-center p-2 bg-neutral-50 rounded-lg"><span>لینک روزانه</span><span class="font-black">{{ shop.daily_link_limit || 0 }}</span></div>
            <div class="flex justify-between items-center p-2 bg-neutral-50 rounded-lg"><span>محصول</span><span class="font-black">{{ shop.product_limit || 0 }}</span></div>
            <div class="flex justify-between items-center p-2 bg-neutral-50 rounded-lg"><span>همکار</span><span class="font-black">{{ shop.operator_limit || 0 }}</span></div>
          </div>
        </div> -->
      </div>

      <!-- NEW: Support & Upsell Banner -->
   <!--    <div class="card p-6 lg:p-8 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white shadow-xl relative overflow-hidden border-none mt-4">
        
        <div class="absolute -left-10 -top-10 w-40 h-40 bg-primary opacity-20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-cyan-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="w-full md:w-auto">
            <h2 class="text-xl font-black text-white">نیاز به امکانات بیشتر یا پشتیبانی دارید؟</h2>
            <p class="mt-2 text-sm text-neutral-400 leading-relaxed max-w-xl">
              برای ارتقاء سقف لینک‌های روزانه، اضافه کردن همکاران جدید به فروشگاه، یا دریافت راهنمایی‌های فنی، تیم پشتیبانی زلف همواره در کنار شماست.
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a href="https://t.me/mhkarami97" target="_blank" class="flex items-center justify-center gap-2 bg-[#2AABEE]/10 hover:bg-[#2AABEE]/20 text-[#2AABEE] border border-[#2AABEE]/30 px-5 py-3 rounded-2xl transition-colors font-bold text-sm w-full sm:w-auto">
              <span>تلگرام پشتیبانی</span>
              <span dir="ltr">@mhkarami97</span>
            </a>
            <a href="tel:0210000000" class="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-3 rounded-2xl transition-colors font-bold text-sm w-full sm:w-auto">
              <span>تماس تلفنی</span>
              <span dir="ltr">021-00000000</span>
            </a>
          </div>
        </div>
      </div> -->

    </div>
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';

const summary = ref<Record<string, number>>({});
const shop = ref<any>({});
const exposeOrderSource = ref(true);

const loadingSummary = ref(true);
const loadingShop = ref(true);
const isSaving = ref(false);

const loadSummary = async () => {
  loadingSummary.value = true;
  summary.value = await api.get('/api/reports/summary', 120000);
  loadingSummary.value = false;
};

const loadShop = async () => {
  loadingShop.value = true;
  shop.value = await api.get('/api/shop/me', 120000);
  exposeOrderSource.value = Boolean(shop.value.expose_order_source);
  loadingShop.value = false;
};

const saveSettings = async () => {
  isSaving.value = true;
  await api.patch('/api/shop/settings', { exposeOrderSource: exposeOrderSource.value });
  api.clearCache('/api/shop/me');
  await loadShop();
  isSaving.value = false;
};

onMounted(() => {
  loadSummary();
  loadShop();
});
</script>
