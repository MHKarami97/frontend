<template>
  <AppShell>
    <!-- Overlay Success for Order -->
    <div v-if="showSuccess" class="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div class="bg-white p-12 rounded-3xl text-center shadow-2xl border border-neutral-100 max-w-md w-full animate-[slideUp_0.3s_ease-out]">
        <div class="text-6xl mb-6">📦</div>
        <h2 class="text-2xl font-extrabold text-neutral-900 mb-2">سفارش ثبت شد!</h2>
        <p class="text-neutral-500 mb-6">کد رهگیری برای مشتری ایجاد گردید.</p>
        <div class="h-2 bg-neutral-100 rounded-full overflow-hidden">
          <div class="h-full bg-primary animate-[progress_2.5s_ease-in-out_1]"></div>
        </div>
      </div>
    </div>

    <!-- FULL PAGE SKELETON (Prevent White Screen) -->
    <div v-if="initialLoading" class="space-y-6">
      <div class="flex items-center justify-between mb-8">
        <div class="skeleton w-32 h-8 rounded-xl"></div>
        <div class="skeleton w-64 h-12 rounded-2xl"></div>
      </div>
      <div class="card p-6 grid gap-5 md:grid-cols-2">
         <div v-for="i in 8" :key="'sk1'+i" class="skeleton h-12 w-full rounded-2xl"></div>
      </div>
      <div class="space-y-3">
         <div v-for="i in 3" :key="'sk2'+i" class="card p-5 h-24 skeleton rounded-2xl"></div>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div v-else class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-extrabold">سفارش‌ها</h1>
        <div class="w-full max-w-xs">
           <label for="searchOrders" class="sr-only">جستجو</label>
           <input id="searchOrders" v-model="search" class="input-field" placeholder="جستجو (نام، کد)..." @input="debounceLoadOrders" />
        </div>
      </div>
      
      <div class="card p-6 border border-neutral-200">
        <h2 class="text-lg font-bold mb-5">ثبت سفارش جدید</h2>
        <form class="grid gap-5 md:grid-cols-2" @submit.prevent="createOrder">
          
          <!-- SMART CUSTOMER LOOKUP -->
          <div class="flex flex-col gap-1.5 relative md:col-span-2">
            <label for="phone" class="label-text text-primary">شماره موبایل (الزامی - جستجوی هوشمند)</label>
            <input id="phone" v-model="form.phone" @focus="showCustomerDropdown = true" @blur="showCustomerDropdown = false" class="input-field text-left font-mono border-primary/50 shadow-sm shadow-primary/10" dir="ltr" placeholder="09..." autocomplete="off" required :disabled="isSubmitting" />
            
            <div v-if="showCustomerDropdown && filteredCustomers.length > 0" class="absolute top-[75px] left-0 right-0 z-50 bg-white border border-neutral-200 rounded-2xl shadow-xl max-h-48 overflow-y-auto animate-[slideDown_0.2s_ease-out]">
               <div v-for="c in filteredCustomers" :key="c.id" @mousedown.prevent="selectCustomer(c)" class="p-3 hover:bg-fuchsia-50 cursor-pointer border-b border-neutral-100 last:border-0 transition-colors flex justify-between items-center">
                  <div>
                    <div class="font-bold text-sm text-neutral-900">{{ c.name || 'مشتری بدون نام' }}</div>
                    <div class="text-xs text-neutral-500 mt-1">{{ c.city || 'شهر نامشخص' }}</div>
                  </div>
                  <div class="text-sm font-mono text-primary font-bold">{{ c.phone }}</div>
               </div>
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="customerName" class="label-text">نام مشتری</label>
            <input id="customerName" v-model="form.customerName" class="input-field" :disabled="isSubmitting" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="city" class="label-text">شهر</label>
            <input id="city" v-model="form.city" class="input-field" :disabled="isSubmitting" />
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="gender" class="label-text">جنسیت</label>
            <select id="gender" v-model="form.gender" class="input-field" :disabled="isSubmitting">
              <option value="">انتخاب نشده</option>
              <option v-for="(label, key) in genderMap" :key="key" :value="key">{{ label }}</option>
            </select>
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="orderSource" class="label-text text-primary">منبع سفارش (الزامی)</label>
            <select id="orderSource" v-model="form.orderSource" class="input-field" required :disabled="isSubmitting">
              <option v-for="(label, key) in sourceMap" :key="key" :value="key">{{ label }}</option>
            </select>
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="productId" class="label-text text-primary">انتخاب محصول (الزامی)</label>
            <select id="productId" v-model="form.productId" class="input-field" required :disabled="isSubmitting">
              <option value="" disabled>محصول را انتخاب کنید</option>
              <option v-for="product in products" :key="product.id" :value="product.id">{{ product.title }} ({{ Number(product.price).toLocaleString('fa-IR') }}ت)</option>
            </select>
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="quantity" class="label-text">تعداد</label>
            <input id="quantity" v-model.number="form.quantity" class="input-field" type="number" min="1" :disabled="isSubmitting" />
          </div>

          <div class="flex flex-col gap-1.5 md:col-span-2">
            <label for="notes" class="label-text">یادداشت خصوصی</label>
            <input id="notes" v-model="form.notes" class="input-field" :disabled="isSubmitting" />
          </div>
          
          <button class="btn-primary md:col-span-2 py-3 mt-2 shadow-lg shadow-primary/20" :disabled="isSubmitting">
            {{ isSubmitting ? 'در حال ثبت...' : 'ایجاد سفارش و تولید لینک' }}
          </button>
        </form>
        <p v-if="errorMessage" class="mt-4 rounded-xl bg-red-50 p-4 text-sm text-danger font-bold">{{ errorMessage }}</p>
      </div>
      
      <div class="space-y-3 relative">
        <div v-if="loadingOrders" class="space-y-3 absolute inset-0 bg-white/50 backdrop-blur-sm z-10">
           <div v-for="i in 3" :key="'sk3'+i" class="card p-5 h-24 skeleton rounded-2xl"></div>
        </div>

        <div>
          <div v-if="orders.length === 0 && !loadingOrders" class="text-center py-8 text-neutral-400">سفارشی یافت نشد.</div>
          <RouterLink v-for="order in orders" :key="order.id" :to="`/orders/${order.id}`" class="card block p-5 hover:border-primary transition-colors mb-3">
            <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div class="font-extrabold text-lg text-neutral-900">{{ order.product_title_snapshot }}</div>
                <div class="mt-1 text-sm font-mono text-neutral-500 bg-neutral-100 inline-block px-2 py-1 rounded">{{ order.tracking_token }}</div>
                <div class="mt-2 text-xs text-neutral-400">منبع: <span class="font-bold text-neutral-600">{{ translateEnum(sourceMap, order.order_source) }}</span></div>
              </div>
              <div class="flex flex-col md:items-end gap-2">
                <span class="badge" :class="'badge-' + order.status">{{ translateEnum(orderStatusMap, order.status) }}</span>
                <div class="text-sm font-black text-primary">{{ Number(order.total_amount).toLocaleString('fa-IR') }} تومان</div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </AppShell>
</template>

<style scoped>
@keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';
import { orderStatusMap, genderMap, sourceMap, translateEnum } from '../../utils/mapper';

const router = useRouter();
const orders = ref<any[]>([]); 
const products = ref<any[]>([]); 
const customers = ref<any[]>([]); 
const errorMessage = ref(''); 
const search = ref('');

const initialLoading = ref(true);
const loadingOrders = ref(false);
const isSubmitting = ref(false);
const showSuccess = ref(false);
const showCustomerDropdown = ref(false);
let searchTimeout: any = null;

const form = reactive({ customerName: '', phone: '', city: '', gender: '', productId: '', quantity: 1, orderSource: 'instagram', notes: '' });

// Smart Customer Filter
const filteredCustomers = computed(() => {
  if (!form.phone) return [];
  const q = form.phone.toLowerCase();
  return customers.value.filter(c => c.phone.includes(q) || (c.name && c.name.toLowerCase().includes(q)));
});

const selectCustomer = (c: any) => {
  form.phone = c.phone;
  form.customerName = c.name || '';
  form.city = c.city || '';
  form.gender = c.gender || '';
  showCustomerDropdown.value = false;
};

const loadOrders = async () => { 
  loadingOrders.value = true;
  const query = search.value ? `?q=${encodeURIComponent(search.value)}` : ''; 
  orders.value = await api.get(`/api/orders${query}`); 
  loadingOrders.value = false;
};

const debounceLoadOrders = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => { loadOrders(); }, 500); 
};

const createOrder = async () => { 
  isSubmitting.value = true;
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
    isSubmitting.value = false;
  }
  await loadOrders(); 
};

onMounted(async () => { 
  initialLoading.value = true;
  // بارگذاری موازی اطلاعات اولیه برای جلوگیری از وقفه
  const [prods, custs, ords] = await Promise.all([
    api.get('/api/products'),
    api.get('/api/customers'),
    api.get('/api/orders')
  ]);
  products.value = prods;
  customers.value = custs;
  orders.value = ords;
  initialLoading.value = false;
});
</script>
