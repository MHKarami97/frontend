<template>
  <AppShell>
    <div v-if="order" class="space-y-6">
      <RouterLink to="/orders" class="text-sm font-bold text-primary">&rarr; بازگشت به لیست</RouterLink>
      
      <div class="card p-6">
        <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-neutral-100 pb-4 mb-4">
          <div>
            <h1 class="text-xl font-extrabold">{{ order.product_title_snapshot }}</h1>
            <div class="mt-1 font-mono text-sm text-neutral-500">{{ order.tracking_token }}</div>
          </div>
          <div class="text-lg font-black text-primary">{{ Number(order.total_amount).toLocaleString('fa-IR') }} تومان</div>
        </div>
        
        <div class="grid gap-4 text-sm md:grid-cols-2">
          <div><span class="text-neutral-400 block text-xs">مشتری</span> {{ order.customer_name_snapshot || 'بدون نام' }}</div>
          <div><span class="text-neutral-400 block text-xs">شهر</span> {{ order.customer_city || 'نامشخص' }}</div>
          <div><span class="text-neutral-400 block text-xs">جنسیت</span> {{ translateEnum(genderMap, order.customer_gender) }}</div>
          <div><span class="text-neutral-400 block text-xs">منبع سفارش</span> {{ translateEnum(sourceMap, order.order_source) }}</div>
          <div><span class="text-neutral-400 block text-xs">تعداد</span> {{ order.quantity }} عدد</div>
          <div class="md:col-span-2"><span class="text-neutral-400 block text-xs">یادداشت</span> {{ order.notes || '-' }}</div>
        </div>
      </div>
      
      <div class="card p-6">
        <h2 class="text-lg font-bold mb-5">ویرایش سفارش</h2>
        <form class="grid gap-5 md:grid-cols-2" @submit.prevent="updateOrder">
          
          <div class="flex flex-col gap-1.5">
            <label for="editStatus" class="label-text">وضعیت سفارش</label>
            <select id="editStatus" v-model="editForm.status" class="input-field" :disabled="isLoading">
              <option v-for="(label, key) in orderStatusMap" :key="key" :value="key">{{ label }}</option>
            </select>
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
          
          <div class="flex flex-col gap-1.5 md:col-span-2">
            <label for="editNotes" class="label-text">یادداشت</label>
            <input id="editNotes" v-model="editForm.notes" class="input-field" :disabled="isLoading" />
          </div>
          
          <button class="btn-primary md:col-span-2 py-3 mt-2" :disabled="isLoading">
            {{ isLoading ? 'در حال ذخیره...' : 'ذخیره تغییرات' }}
          </button>
        </form>
      </div>
      
      <div class="card p-6">
        <h2 class="text-lg font-bold mb-4">تاریخچه وضعیت</h2>
        <div class="space-y-4">
          <div v-for="log in logs" :key="log.created_at" class="flex gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 relative">
            <div class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-full rounded-r-2xl" :class="{'bg-primary': true}"></div>
            <div>
              <div class="font-bold text-neutral-800">{{ translateEnum(orderStatusMap, log.status) }}</div>
              <div class="mt-1 text-sm text-neutral-500">{{ log.note }}</div>
              <div class="mt-2 text-xs text-neutral-400" dir="ltr">{{ new Date(log.created_at).toLocaleString('fa-IR') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';
import { orderStatusMap, genderMap, sourceMap, translateEnum } from '../../utils/mapper';

const route = useRoute(); 
const order = ref<any>(null); 
const logs = ref<any[]>([]); 
const isLoading = ref(false);

const editForm = reactive({ status: 'pending', postalTracking: '', city: '', gender: '', quantity: 1, notes: '', customerName: '' });

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
