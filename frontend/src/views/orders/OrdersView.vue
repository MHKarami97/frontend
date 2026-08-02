<template>
  <AppShell>
    <div v-if="showSuccess" class="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div class="bg-white p-12 rounded-3xl text-center shadow-2xl border border-neutral-100 max-w-md w-full">
        <div class="text-6xl mb-6">📦</div>
        <h2 class="text-2xl font-extrabold text-neutral-900 mb-2">سفارش ثبت شد!</h2>
        <p class="text-neutral-500 mb-6">کد رهگیری برای مشتری ایجاد گردید.</p>
        <div class="h-2 bg-neutral-100 rounded-full overflow-hidden">
          <div class="h-full bg-primary animate-[progress_2.5s_ease-in-out_1]"></div>
        </div>
      </div>
    </div>

    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-extrabold">سفارش‌ها</h1>
        <div class="w-full max-w-xs">
           <label for="searchOrders" class="sr-only">جستجو</label>
           <input id="searchOrders" v-model="search" class="input-field" placeholder="جستجو (نام، کد، کالا)..." @input="loadOrders" />
        </div>
      </div>
      
      <div class="card p-6">
        <h2 class="text-lg font-bold mb-5">ثبت سفارش جدید</h2>
        <form class="grid gap-5 md:grid-cols-2" @submit.prevent="createOrder">
          
          <div class="flex flex-col gap-1.5">
            <label for="customerName" class="label-text">نام مشتری</label>
            <input id="customerName" v-model="form.customerName" class="input-field" :disabled="isLoading" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="phone" class="label-text text-primary">شماره موبایل (الزامی)</label>
            <input id="phone" v-model="form.phone" class="input-field text-left font-mono" dir="ltr" placeholder="09..." required :disabled="isLoading" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="city" class="label-text">شهر</label>
            <input id="city" v-model="form.city" class="input-field" :disabled="isLoading" />
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="gender" class="label-text">جنسیت</label>
            <select id="gender" v-model="form.gender" class="input-field" :disabled="isLoading">
              <option value="">انتخاب نشده</option>
              <option v-for="(label, key) in genderMap" :key="key" :value="key">{{ label }}</option>
            </select>
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="orderSource" class="label-text text-primary">منبع سفارش (الزامی)</label>
            <select id="orderSource" v-model="form.orderSource" class="input-field" required :disabled="isLoading">
              <option v-for="(label, key) in sourceMap" :key="key" :value="key">{{ label }}</option>
            </select>
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="productId" class="label-text text-primary">انتخاب محصول (الزامی)</label>
            <select id="productId" v-model="form.productId" class="input-field" required :disabled="isLoading">
              <option value="" disabled>محصول را انتخاب کنید</option>
              <option v-for="product in products" :key="product.id" :value="product.id">{{ product.title }}</option>
            </select>
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="quantity" class="label-text">تعداد</label>
            <input id="quantity" v-model.number="form.quantity" class="input-field" type="number" min="1" :disabled="isLoading" />
          </div>

          <div class="flex flex-col gap-1.5 md:col-span-2">
            <label for="notes" class="label-text">یادداشت خصوصی سفارش</label>
            <input id="notes" v-model="form.notes" class="input-field" :disabled="isLoading" />
          </div>
          
          <button class="btn-primary md:col-span-2 py-3 mt-2" :disabled="isLoading">
            {{ isLoading ? 'در حال ثبت...' : 'ایجاد سفارش و تولید لینک' }}
          </button>
        </form>
        <p v-if="errorMessage" class="mt-4 rounded-xl bg-red-50 p-4 text-sm text-danger">{{ errorMessage }}</p>
      </div>
      
      <div class="space-y-3">
        <RouterLink v-for="order in orders" :key="order.id" :to="`/orders/${order.id}`" class="card block p-5 hover:border-primary transition-colors">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div class="font-extrabold text-lg">{{ order.product_title_snapshot }}</div>
              <div class="mt-1 text-sm font-mono text-neutral-500">{{ order.tracking_token }}</div>
              <div class="mt-1 text-xs text-neutral-400">منبع: {{ translateEnum(sourceMap, order.order_source) }}</div>
            </div>
            <div class="flex flex-col md:items-end gap-2">
              <span class="badge" :class="'badge-' + order.status">{{ translateEnum(orderStatusMap, order.status) }}</span>
              <div class="text-sm font-bold">{{ Number(order.total_amount).toLocaleString('fa-IR') }} تومان</div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </AppShell>
</template>

<style scoped>
@keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
</style>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';
import { orderStatusMap, genderMap, sourceMap, translateEnum } from '../../utils/mapper';

const router = useRouter();
const orders = ref<any[]>([]); 
const products = ref<any[]>([]); 
const errorMessage = ref(''); 
const search = ref('');
const isLoading = ref(false);
const showSuccess = ref(false);
const form = reactive({ customerName: '', phone: '', city: '', gender: '', productId: '', quantity: 1, orderSource: 'instagram', notes: '' });

const loadOrders = async () => { 
  const query = search.value ? `?q=${encodeURIComponent(search.value)}` : ''; 
  orders.value = await api.get(`/api/orders${query}`); 
};

const loadProducts = async () => { products.value = await api.get('/api/products'); };

const createOrder = async () => { 
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const result = await api.post('/api/orders', form); 
    if (result.trackingToken) { 
      showSuccess.value = true;
      Object.assign(form, { customerName: '', phone: '', city: '', gender: '', productId: '', quantity: 1, orderSource: 'instagram', notes: '' });
      setTimeout(() => { showSuccess.value = false; router.push(`/orders/${result.orderId}`); }, 2500);
    } else { 
      errorMessage.value = result.message || 'خطا در ثبت سفارش'; 
    } 
  } catch (error) {
    errorMessage.value = 'خطا در برقراری ارتباط با سرور.';
  } finally {
    isLoading.value = false;
  }
  await loadOrders(); 
};

onMounted(async () => { await loadProducts(); await loadOrders(); });
</script>
