<template>
  <div class="mx-auto max-w-7xl px-4 py-8 md:px-8">
    <h1 class="text-2xl font-extrabold">پنل ادمین سیستم</h1>
    <div class="mt-5 grid gap-4 md:grid-cols-4"><div class="card p-5"><div class="text-sm text-neutral-500">کل فروشگاه‌ها</div><div class="mt-2 text-3xl font-extrabold">{{ stats.total_shops || 0 }}</div></div><div class="card p-5"><div class="text-sm text-neutral-500">فعال</div><div class="mt-2 text-3xl font-extrabold">{{ stats.active_shops || 0 }}</div></div><div class="card p-5"><div class="text-sm text-neutral-500">در انتظار تایید</div><div class="mt-2 text-3xl font-extrabold">{{ stats.pending_shops || 0 }}</div></div><div class="card p-5"><div class="text-sm text-neutral-500">کل درآمد</div><div class="mt-2 text-3xl font-extrabold">{{ Number(stats.total_revenue || 0).toLocaleString('fa-IR') }}</div></div></div>
    <div class="mt-6 flex flex-wrap gap-2"><button class="btn-secondary" @click="setFilter('')">همه</button><button class="btn-secondary" @click="setFilter('pending')">در انتظار</button><button class="btn-secondary" @click="setFilter('active')">فعال</button><button class="btn-secondary" @click="setFilter('banned')">بن‌شده</button></div>
    <div class="mt-6 space-y-3"><div v-for="shop in shops" :key="shop.id" class="card p-5"><div class="grid gap-4 md:grid-cols-6"><div><div class="font-bold">{{ shop.name }}</div><div class="text-sm text-neutral-500">{{ shop.email }}</div><div class="text-xs text-neutral-400">{{ shop.status }}</div></div><input v-model.number="shop.daily_link_limit" class="input" type="number" min="1" /><input v-model.number="shop.product_limit" class="input" type="number" min="1" /><input v-model.number="shop.operator_limit" class="input" type="number" min="0" /><label class="flex items-center gap-2 text-sm"><input v-model="shop.expose_order_source" type="checkbox" /> نمایش منبع سفارش</label><div class="flex gap-2"><button class="btn-secondary" @click="saveShop(shop, 'active')">تایید</button><button class="rounded-full bg-neutral-900 px-4 py-3 text-white" @click="saveShop(shop, 'banned')">بن</button></div><button class="rounded-full border-2 border-neutral-300 px-4 py-3" @click="saveShop(shop)">ذخیره</button></div></div></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '../../services/api';
const stats = ref<Record<string, number>>({}); const shops = ref<any[]>([]); const filter = ref('');
const load = async () => { stats.value = await api.get('/api/admin/stats'); const query = filter.value ? `?status=${filter.value}` : ''; shops.value = await api.get(`/api/admin/shops${query}`); };
const setFilter = async (value: string) => { filter.value = value; await load(); };
const saveShop = async (shop: any, status?: 'active' | 'banned') => { await api.patch(`/api/admin/shops/${shop.id}`, { status, dailyLinkLimit: Number(shop.daily_link_limit), productLimit: Number(shop.product_limit), operatorLimit: Number(shop.operator_limit), exposeOrderSource: Boolean(shop.expose_order_source) }); await load(); };
onMounted(load);
</script>
