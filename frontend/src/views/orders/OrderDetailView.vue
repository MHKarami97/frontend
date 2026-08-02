<template>
  <AppShell>
    <div v-if="order" class="space-y-6">
      <RouterLink to="/orders" class="text-sm font-bold text-primary transition-transform hover:-translate-x-1 inline-block">&rarr; بازگشت به لیست سفارش‌ها</RouterLink>
      
      <div class="card p-6 border-t-4 border-t-primary shadow-sm">
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between border-b border-neutral-100 pb-5 mb-5">
          <div class="space-y-2">
            <h1 class="text-2xl font-black text-neutral-900">{{ order.product_title_snapshot }}</h1>
            <div class="flex items-center gap-2">
               <span class="font-mono text-sm text-neutral-600 bg-neutral-100 px-3 py-1 rounded-lg border border-neutral-200">{{ order.tracking_token }}</span>
               <span class="badge" :class="'badge-' + order.status">{{ translateEnum(orderStatusMap, order.status) }}</span>
            </div>
          </div>
          <div class="text-left">
             <div class="text-sm text-neutral-500 mb-1">مبلغ کل سفارش</div>
             <div class="text-2xl font-black text-primary">{{ Number(order.total_amount).toLocaleString('fa-IR') }} <span class="text-sm font-normal">تومان</span></div>
          </div>
        </div>
        
        <!-- NEW: Tracking Link Generator -->
        <div class="bg-fuchsia-50/50 rounded-2xl p-4 border border-fuchsia-100 mb-6">
           <label class="label-text text-primary mb-2 block">لینک پیگیری مشتری</label>
           <div class="flex flex-col sm:flex-row items-center gap-2">
              <input type="text" readonly :value="trackingUrl" class="input-field text-left font-mono text-sm bg-white border-fuchsia-200 text-neutral-600" dir="ltr" @focus="$event.target.select()" />
              <button @click="copyTrackingLink" class="btn-primary py-3 px-6 whitespace-nowrap w-full sm:w-auto shadow-md shadow-primary/20">
                 {{ linkCopied ? '✔ کپی شد' : 'کپی لینک' }}
              </button>
           </div>
        </div>

        <div class="grid gap-5 text-sm md:grid-cols-2 lg:grid-cols-3 bg-neutral-50 p-5 rounded-2xl border border-neutral-100">
          <div><span class="text-neutral-400 block text-xs mb-1">مشتری</span> <span class="font-bold text-neutral-800">{{ order.customer_name_snapshot || 'بدون نام' }}</span></div>
          <div><span class="text-neutral-400 block text-xs mb-1">شهر</span> <span class="font-bold text-neutral-800">{{ order.customer_city || 'نامشخص' }}</span></div>
          <div><span class="text-neutral-400 block text-xs mb-1">جنسیت</span> <span class="font-bold text-neutral-800">{{ translateEnum(genderMap, order.customer_gender) }}</span></div>
          <div><span class="text-neutral-400 block text-xs mb-1">منبع سفارش</span> <span class="font-bold text-neutral-800">{{ translateEnum(sourceMap, order.order_source) }}</span></div>
          <div><span class="text-neutral-400 block text-xs mb-1">تعداد محصول</span> <span class="font-bold text-neutral-800">{{ order.quantity }} عدد</span></div>
          <div class="md:col-span-2 lg:col-span-3"><span class="text-neutral-400 block text-xs mb-1">یادداشت محرمانه</span> <span class="font-bold text-neutral-800">{{ order.notes || 'ندارد' }}</span></div>
        </div>
      </div>
      
      <div class="card p-6">
        <h2 class="text-lg font-black mb-5 text-neutral-800">ویرایش و تغییر وضعیت</h2>
        <form class="grid gap-5 md:grid-cols-2 lg:grid-cols-3" @submit.prevent="updateOrder">
          <div class="flex flex-col gap-1.5 lg:col-span-3">
            <label for="editStatus" class="label-text">تغییر وضعیت سفارش</label>
            <div class="flex flex-wrap gap-2 mt-1">
               <button v-for="(label, key) in orderStatusMap" :key="key" type="button" @click="editForm.status = key" 
                       class="px-4 py-2 rounded-xl text-sm font-bold border transition-all"
                       :class="editForm.status === key ? 'bg-primary text-white border-primary shadow-md shadow-primary/30' : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'">
                 {{ label }}
               </button>
            </div>
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="editPostal" class="label-text">کد پیگیری پستی</label>
            <input id="editPostal" v-model="editForm.postalTracking" class="input-field text-left font-mono" dir="ltr" placeholder="مثال: 123456789" :disabled="isLoading" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="editCity" class="label-text">شهر</label>
            <input id="editCity" v-model="editForm.city" class="input-field" :disabled="isLoading" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="editGender" class="label-text">جنسیت</label>
            <select id="editGender" v-model="editForm.gender" class="input-field" :disabled="isLoading">
              <option value="">نامشخص</option>
              <option v-for="(label, key) in genderMap" :key="key" :value="key">{{ label }}</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="editQuantity" class="label-text">تعداد</label>
            <input id="editQuantity" v-model.number="editForm.quantity" type="number" min="1" class="input-field" :disabled="isLoading" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="editCustomerName" class="label-text">نام مشتری</label>
            <input id="editCustomerName" v-model="editForm.customerName" class="input-field" :disabled="isLoading" />
          </div>
          <div class="flex flex-col gap-1.5 lg:col-span-3">
            <label for="editNotes" class="label-text">یادداشت</label>
            <input id="editNotes" v-model="editForm.notes" class="input-field" :disabled="isLoading" />
          </div>
          <div class="lg:col-span-3 flex justify-end mt-2">
            <button class="btn-primary py-3 px-8 shadow-lg shadow-primary/20 w-full sm:w-auto" :disabled="isLoading">
              {{ isLoading ? 'در حال ذخیره اطلاعات...' : 'ذخیره تغییرات' }}
            </button>
          </div>
        </form>
      </div>
      
      <div class="card p-6">
        <h2 class="text-lg font-black mb-6 text-neutral-800">تاریخچه (Log)</h2>
        <div class="relative border-r-2 border-neutral-100 pr-6 space-y-6">
          <div v-for="(log, index) in logs" :key="log.created_at" class="relative group">
            <span class="absolute -right-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm" :class="index === logs.length - 1 ? 'bg-primary ring-4 ring-primary/20' : 'bg-neutral-300'"></span>
            <div class="bg-neutral-50 border border-neutral-100 rounded-2xl p-4 hover:border-primary/30 transition-colors">
              <div class="flex justify-between items-start">
                 <div>
                    <div class="font-black text-neutral-900">{{ translateEnum(orderStatusMap, log.status) }}</div>
                    <div class="text-sm text-neutral-600 mt-1">{{ orderLogMap, log.note }}</div>
                 </div>
                 <div class="text-xs text-neutral-400 font-mono bg-white px-2 py-1 rounded-md border border-neutral-100" dir="ltr">
                    {{ new Date(log.created_at).toLocaleString('fa-IR', { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' }) }}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';
import { orderStatusMap, genderMap, sourceMap, translateEnum } from '../../utils/mapper';

const route = useRoute(); 
const order = ref<any>(null); 
const logs = ref<any[]>([]); 
const isLoading = ref(false);
const linkCopied = ref(false);

const trackingUrl = computed(() => {
  if (!order.value?.tracking_token) return '';
  const origin = window.location.origin;
  const path = window.location.pathname;
  return `${origin}${path}#/track/${order.value.tracking_token}`;
});

const editForm = reactive({ status: 'pending', postalTracking: '', city: '', gender: '', quantity: 1, notes: '', customerName: '' });

const copyTrackingLink = async () => {
  if (!trackingUrl.value) return;
  try {
    await navigator.clipboard.writeText(trackingUrl.value);
    linkCopied.value = true;
    setTimeout(() => { linkCopied.value = false; }, 2000);
  } catch (err) {
    console.error('Failed to copy', err);
  }
};

const load = async () => { 
  const result = await api.get(`/api/orders/${route.params.id}`); 
  order.value = result.order; 
  logs.value = result.logs; 
  Object.assign(editForm, { 
    status: result.order.status, 
    postalTracking: result.order.postal_tracking || '', 
    city: result.order.customer_city || '', 
    gender: result.order.customer_gender || '', 
    quantity: result.order.quantity, 
    notes: result.order.notes || '', 
    customerName: result.order.customer_name_snapshot || '' 
  }); 
};

const updateOrder = async () => { 
  isLoading.value = true;
  await api.patch(`/api/orders/${route.params.id}`, editForm); 
  await load(); 
  isLoading.value = false;
};

onMounted(load);
</script>
