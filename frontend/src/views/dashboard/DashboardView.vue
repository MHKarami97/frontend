<template>
  <AppShell>
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-extrabold">داشبورد</h1>
        <p class="mt-1 text-sm text-neutral-500">{{ shop.name || 'فروشگاه' }} / {{ shop.slug || '-' }}</p>
      </div>
      <div class="grid gap-4 md:grid-cols-4">
        <div class="card p-5"><div class="text-sm text-neutral-500">کل سفارش‌ها</div><div class="mt-2 text-3xl font-extrabold">{{ summary.total_orders || 0 }}</div></div>
        <div class="card p-5"><div class="text-sm text-neutral-500">کل فروش</div><div class="mt-2 text-3xl font-extrabold">{{ Number(summary.total_revenue || 0).toLocaleString('fa-IR') }}</div></div>
        <div class="card p-5"><div class="text-sm text-neutral-500">تحویل‌شده</div><div class="mt-2 text-3xl font-extrabold">{{ summary.delivered_count || 0 }}</div></div>
        <div class="card p-5"><div class="text-sm text-neutral-500">در انتظار</div><div class="mt-2 text-3xl font-extrabold">{{ summary.pending_count || 0 }}</div></div>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="card p-5">
          <h2 class="font-bold">تنظیمات نمایش در لینک خریدار</h2>
          <label class="mt-4 flex items-center justify-between rounded-2xl border border-neutral-200 p-4 text-sm"><span>نمایش منبع سفارش</span><input v-model="exposeOrderSource" type="checkbox" class="h-5 w-5" /></label>
          <button class="btn-primary mt-4" @click="saveSettings">ذخیره تنظیمات</button>
        </div>
        <div class="card p-5">
          <h2 class="font-bold">سقف پلن فعلی</h2>
          <div class="mt-4 space-y-2 text-sm text-neutral-600">
            <div class="flex justify-between"><span>لینک روزانه</span><span>{{ shop.daily_link_limit || 0 }}</span></div>
            <div class="flex justify-between"><span>محصول</span><span>{{ shop.product_limit || 0 }}</span></div>
            <div class="flex justify-between"><span>همکار</span><span>{{ shop.operator_limit || 0 }}</span></div>
          </div>
        </div>
      </div>
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
const load = async () => {
  summary.value = await api.get('/api/reports/summary');
  shop.value = await api.get('/api/shop/me');
  exposeOrderSource.value = Boolean(shop.value.expose_order_source);
};
const saveSettings = async () => {
  await api.patch('/api/shop/settings', { exposeOrderSource: exposeOrderSource.value });
  await load();
};
onMounted(load);
</script>
