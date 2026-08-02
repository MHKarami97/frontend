<template>
  <div class="mx-auto max-w-7xl px-4 py-10 md:px-8">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-black text-neutral-900">پنل مدیریت کل سیستم</h1>
        <p class="text-neutral-500 mt-2">کنترل مرکزی زیرساخت OrderTrack</p>
      </div>
      <button class="btn-ghost text-danger border border-red-100 hover:bg-red-50" @click="logout">خروج امن</button>
    </div>
    
    <div class="grid gap-6 md:grid-cols-4">
      <div class="card p-6 bg-neutral-900 text-white">
        <div class="text-sm font-bold text-neutral-400">کل فروشگاه‌ها</div>
        <div class="mt-3 text-4xl font-black">{{ stats.total_shops || 0 }}</div>
      </div>
      <div class="card p-6 border-l-4 border-l-success">
        <div class="text-sm font-bold text-neutral-500">فروشگاه‌های فعال</div>
        <div class="mt-3 text-4xl font-black text-success">{{ stats.active_shops || 0 }}</div>
      </div>
      <div class="card p-6 border-l-4 border-l-warning">
        <div class="text-sm font-bold text-neutral-500">در انتظار تایید</div>
        <div class="mt-3 text-4xl font-black text-warning">{{ stats.pending_shops || 0 }}</div>
      </div>
      <div class="card p-6 bg-primary text-white">
        <div class="text-sm font-bold opacity-80">درآمد کل سیستم</div>
        <div class="mt-3 text-3xl font-black">{{ Number(stats.total_revenue || 0).toLocaleString('fa-IR') }} <span class="text-sm font-normal">تومان</span></div>
      </div>
    </div>
    
    <div class="mt-10 flex gap-3 overflow-x-auto pb-2">
      <button class="btn-secondary rounded-full" :class="{'bg-neutral-100 border-neutral-300': filter === ''}" @click="setFilter('')">همه فروشگاه‌ها</button>
      <button class="btn-secondary rounded-full text-warning border-warning" :class="{'bg-warning/10': filter === 'pending'}" @click="setFilter('pending')">در انتظار بررسی</button>
      <button class="btn-secondary rounded-full text-success border-success" :class="{'bg-success/10': filter === 'active'}" @click="setFilter('active')">فروشگاه‌های فعال</button>
      <button class="btn-secondary rounded-full text-danger border-danger" :class="{'bg-danger/10': filter === 'banned'}" @click="setFilter('banned')">فروشگاه‌های مسدود</button>
    </div>
    
    <div class="mt-6 space-y-4">
      <div v-for="shop in shops" :key="shop.id" class="card p-6 border-2" :class="{'border-warning/50': shop.status === 'pending', 'border-danger/50': shop.status === 'banned'}">
        <div class="grid gap-6 md:grid-cols-6 items-end">
          <div class="md:col-span-2">
            <div class="font-black text-xl">{{ shop.name }}</div>
            <div class="mt-1 font-mono text-sm text-neutral-500">{{ shop.email }}</div>
            <div class="mt-2 badge" :class="{'bg-warning/20 text-warning': shop.status === 'pending', 'bg-success/20 text-success': shop.status === 'active', 'bg-danger/20 text-danger': shop.status === 'banned'}">
              {{ translateEnum(shopStatusMap, shop.status) }}
            </div>
          </div>
          
          <div class="flex flex-col gap-1.5">
             <label :for="'limLink_' + shop.id" class="label-text">سقف لینک روزانه</label>
             <input :id="'limLink_' + shop.id" v-model.number="shop.daily_link_limit" class="input-field h-10 text-center" type="number" min="1" />
          </div>
          
          <div class="flex flex-col gap-1.5">
             <label :for="'limProd_' + shop.id" class="label-text">سقف محصول</label>
             <input :id="'limProd_' + shop.id" v-model.number="shop.product_limit" class="input-field h-10 text-center" type="number" min="1" />
          </div>
          
          <div class="flex flex-col gap-1.5">
             <label :for="'limOp_' + shop.id" class="label-text">سقف اپراتور</label>
             <input :id="'limOp_' + shop.id" v-model.number="shop.operator_limit" class="input-field h-10 text-center" type="number" min="0" />
          </div>
          
          <div class="flex flex-col gap-3 justify-end h-full">
            <div class="flex gap-2">
              <button class="btn-primary w-full py-2 text-xs" @click="saveShop(shop, 'active')">تایید / فعال‌سازی</button>
              <button class="btn-secondary text-danger border-danger w-full py-2 text-xs" @click="saveShop(shop, 'banned')">مسدود کردن</button>
            </div>
            <button class="btn-secondary w-full py-2 text-xs" @click="saveShop(shop)">ذخیره محدودیت‌ها</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '../../services/api';
import { useAuthStore } from '../../stores/auth';
import { shopStatusMap, translateEnum } from '../../utils/mapper';

const router = useRouter();
const store = useAuthStore();
const stats = ref<Record<string, number>>({}); 
const shops = ref<any[]>([]); 
const filter = ref('');

const load = async () => { 
  stats.value = await api.get('/api/admin/stats'); 
  const query = filter.value ? `?status=${filter.value}` : ''; 
  shops.value = await api.get(`/api/admin/shops${query}`); 
};

const setFilter = async (value: string) => { filter.value = value; await load(); };

const saveShop = async (shop: any, status?: 'active' | 'banned') => { 
  await api.patch(`/api/admin/shops/${shop.id}`, { 
    status, 
    dailyLinkLimit: Number(shop.daily_link_limit), 
    productLimit: Number(shop.product_limit), 
    operatorLimit: Number(shop.operator_limit), 
    exposeOrderSource: Boolean(shop.expose_order_source) 
  }); 
  await load(); 
};

const logout = async () => {
  await store.logout();
  router.push('/admin-login');
};

onMounted(load);
</script>
