<template>
  <AppShell>
    <!-- Overlay Success for Order -->
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
        <h1 class="text-2xl font-extrabold">مدیریت سفارش‌ها</h1>
        <input v-model="search" class="input-field max-w-xs" placeholder="جستجو (نام، محصول یا توکن)..." @input="loadOrders" />
      </div>
      
      <div class="card p-6 border border-neutral-200">
        <h2 class="text-lg font-bold mb-5">ثبت سفارش جدید</h2>
        <form class="grid gap-4 md:grid-cols-2" @submit.prevent="createOrder">
          <input v-model="form.customerName" class="input-field" placeholder="نام مشتری" :disabled="isLoading" />
          <input v-model="form.phone" class="input-field text-left font-mono" placeholder="شماره موبایل (مثلا 0912...)" required :disabled="isLoading" />
          <input v-model="form.city" class="input-field" placeholder="شهر" :disabled="isLoading" />
          
          <select v-model="form.gender" class="input-field" :disabled="isLoading">
            <option value="">جنسیت</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
            <option value="other">سایر</option>
          </select>
          
          <select v-model="form.orderSource" class="input-field" required :disabled="isLoading">
            <option value="instagram">اینستاگرام</option>
            <option value="telegram">تلگرام</option>
            <option value="whatsapp">واتساپ</option>
            <option value="website">وب‌سایت</option>
            <option value="other">سایر</option>
          </select>
          
          <select v-model="form.productId" class="input-field" required :disabled="isLoading">
            <option value="">انتخاب محصول (اجباری)</option>
            <option v-for="product in products" :key="product.id" :value="product.id">{{ product.title }}</option>
          </select>
          
          <input v-model.number="form.quantity" class="input-field" type="number" min="1" placeholder="تعداد" :disabled="isLoading" />
          <input v-model="form.notes" class="input-field md:col-span-2" placeholder="یادداشت خصوصی سفارش" :disabled="isLoading" />
          
          <button class="btn-primary md:col-span-2 py-3 mt-2" :disabled="isLoading">
            {{ isLoading ? 'در حال ثبت سیستم...' : 'ایجاد سفارش و تولید لینک' }}
          </button>
        </form>
        <p v-if="errorMessage" class="mt-4 rounded-xl bg-red-50 p-4 text-sm font-bold text-danger border border-red-100">{{ errorMessage }}</p>
      </div>
      
      <div class="space-y-3">
        <RouterLink v-for="order in orders" :key="order.id" :to="`/orders/${order.id}`" class="card block p-5 hover:border-primary transition-colors">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div class="font-extrabold text-lg text-neutral-800">{{ order.product_title_snapshot }}</div>
              <div class="mt-1 text-sm font-mono text-neutral-500 bg-neutral-100 inline-block px-2 py-1 rounded">{{ order.tracking_token }}</div>
            </div>
            <div class="flex flex-col md:items-end gap-1">
              <span class="badge" :class="'badge-' + order.status">{{ order.status }}</span>
              <div class="text-sm font-bold text-neutral-700">{{ Number(order.total_amount).toLocaleString('fa-IR') }} تومان</div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </AppShell>
</template>

<style scoped>
@keyframes progress {
  0% { width: 0%; }
  100% { width: 100%; }
}
</style>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';

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
      
      setTimeout(() => {
        showSuccess.value = false;
        router.push(`/orders/${result.orderId}`);
      }, 2500);
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