<template>
  <AppShell>
    <div class="space-y-6">
      <h1 class="text-2xl font-extrabold">گزارش‌ها</h1>
      <div class="grid gap-4 md:grid-cols-3"><div class="card p-5"><div class="text-sm text-neutral-500">فروش این هفته</div><div class="mt-2 text-2xl font-extrabold">{{ Number(finance.weekly?.revenue || 0).toLocaleString('fa-IR') }}</div></div><div class="card p-5"><div class="text-sm text-neutral-500">فروش این ماه</div><div class="mt-2 text-2xl font-extrabold">{{ Number(finance.monthly?.revenue || 0).toLocaleString('fa-IR') }}</div></div><div class="card p-5"><div class="text-sm text-neutral-500">فروش این سال</div><div class="mt-2 text-2xl font-extrabold">{{ Number(finance.yearly?.revenue || 0).toLocaleString('fa-IR') }}</div></div></div>
      <div class="grid gap-4 md:grid-cols-2"><div class="card p-5"><h2 class="font-bold">تفکیک شهر</h2><div class="mt-3 space-y-2 text-sm"><div v-for="item in demographics.byCity" :key="item.city" class="flex items-center justify-between"><span>{{ item.city }}</span><span>{{ item.count }}</span></div></div></div><div class="card p-5"><h2 class="font-bold">تفکیک جنسیت</h2><div class="mt-3 space-y-2 text-sm"><div v-for="item in demographics.byGender" :key="item.gender" class="flex items-center justify-between"><span>{{ item.gender }}</span><span>{{ item.count }}</span></div></div></div><div class="card p-5"><h2 class="font-bold">منبع سفارش</h2><div class="mt-3 space-y-2 text-sm"><div v-for="item in demographics.bySource" :key="item.source" class="flex items-center justify-between"><span>{{ item.source }}</span><span>{{ item.count }}</span></div></div></div><div class="card p-5"><h2 class="font-bold">محصولات پرفروش</h2><div class="mt-3 space-y-2 text-sm"><div v-for="item in demographics.topProducts" :key="item.title" class="flex items-center justify-between"><span>{{ item.title }}</span><span>{{ item.count }}</span></div></div></div></div>
      <div class="card p-5"><h2 class="font-bold">مشتریان برتر</h2><div class="mt-3 space-y-2 text-sm"><div v-for="item in topCustomers" :key="item.id" class="flex items-center justify-between"><span>{{ item.name || item.phone }}</span><span>{{ item.orders_count }} سفارش</span></div></div></div>
    </div>
  </AppShell>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';
const demographics = ref<any>({ byCity: [], byGender: [], bySource: [], topProducts: [] }); const finance = ref<any>({}); const topCustomers = ref<any[]>([]);
onMounted(async () => { demographics.value = await api.get('/api/reports/demographics'); finance.value = await api.get('/api/reports/finance'); topCustomers.value = await api.get('/api/reports/top-customers'); });
</script>
