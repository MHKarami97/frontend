<template>
  <AppShell>
    <div class="space-y-6">
      <div class="flex items-center justify-between"><h1 class="text-2xl font-extrabold">سفارش‌ها</h1><input v-model="search" class="input max-w-xs" placeholder="جستجو" @input="loadOrders" /></div>
      <div class="card p-5">
        <h2 class="text-lg font-bold">ثبت سفارش جدید</h2>
        <form class="mt-4 grid gap-3 md:grid-cols-2" @submit.prevent="createOrder">
          <input v-model="form.customerName" class="input" placeholder="نام مشتری" />
          <input v-model="form.phone" class="input" placeholder="شماره موبایل" required />
          <input v-model="form.city" class="input" placeholder="شهر" />
          <select v-model="form.gender" class="input"><option value="">جنسیت</option><option value="male">مرد</option><option value="female">زن</option><option value="other">سایر</option></select>
          <select v-model="form.orderSource" class="input" required><option value="instagram">Instagram</option><option value="telegram">Telegram</option><option value="whatsapp">WhatsApp</option><option value="website">Website</option><option value="other">Other</option></select>
          <select v-model="form.productId" class="input" required><option value="">انتخاب محصول (اجباری)</option><option v-for="product in products" :key="product.id" :value="product.id">{{ product.title }}</option></select>
          <input v-model.number="form.quantity" class="input" type="number" min="1" placeholder="تعداد" />
          <input v-model="form.notes" class="input md:col-span-2" placeholder="یادداشت" />
          <button class="btn-primary md:col-span-2">ایجاد سفارش و لینک</button>
        </form>
        <p v-if="createdTrackingUrl" class="mt-4 break-all rounded-xl bg-fuchsia-50 p-3 text-sm text-primary">{{ createdTrackingUrl }}</p>
        <p v-if="errorMessage" class="mt-4 rounded-xl bg-red-50 p-3 text-sm text-danger">{{ errorMessage }}</p>
      </div>
      <div class="space-y-3">
        <RouterLink v-for="order in orders" :key="order.id" :to="`/orders/${order.id}`" class="card block p-5"><div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"><div><div class="font-bold">{{ order.product_title_snapshot }}</div><div class="mt-1 text-sm text-neutral-500">{{ order.tracking_token }}</div></div><div class="text-sm text-neutral-600">{{ order.status }} - {{ Number(order.total_amount).toLocaleString('fa-IR') }}</div></div></RouterLink>
      </div>
    </div>
  </AppShell>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';
const orders = ref<any[]>([]); const products = ref<any[]>([]); const createdTrackingUrl = ref(''); const errorMessage = ref(''); const search = ref('');
const form = reactive({ customerName: '', phone: '', city: '', gender: '', productId: '', quantity: 1, orderSource: 'instagram', notes: '' });
const loadOrders = async () => { const query = search.value ? `?q=${encodeURIComponent(search.value)}` : ''; orders.value = await api.get(`/api/orders${query}`); };
const loadProducts = async () => { products.value = await api.get('/api/products'); };
const createOrder = async () => { const result = await api.post('/api/orders', form); if (result.trackingToken) { createdTrackingUrl.value = `${window.location.origin}${window.location.pathname}#/track/${result.trackingToken}`; errorMessage.value = ''; } else { errorMessage.value = result.message || 'خطا'; } await loadOrders(); };
onMounted(async () => { await loadProducts(); await loadOrders(); });
</script>
