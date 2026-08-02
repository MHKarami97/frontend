<template>
  <AppShell>
    <div>
      <h1 class="text-2xl font-extrabold mb-6">مشتریان</h1>
      
      <div v-if="loading" class="space-y-4">
         <div v-for="i in 6" :key="i" class="card p-6 flex flex-col md:flex-row justify-between gap-4">
            <div class="space-y-2 w-full md:w-1/2">
               <div class="skeleton h-6 w-1/2"></div>
               <div class="skeleton h-4 w-1/3"></div>
               <div class="skeleton h-4 w-1/4"></div>
            </div>
            <div class="space-y-2 w-full md:w-1/4 text-right">
               <div class="skeleton h-4 w-full md:ml-auto"></div>
               <div class="skeleton h-6 w-3/4 md:ml-auto"></div>
            </div>
         </div>
      </div>

      <div v-else class="space-y-4">
        <div v-if="customers.length === 0" class="text-center py-10 text-neutral-400">هیچ مشتری یافت نشد.</div>
        <div v-for="customer in customers" :key="customer.id" class="card p-6 hover:shadow-md transition-shadow">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div class="font-extrabold text-lg">{{ customer.name || 'بدون نام' }}</div>
              <div class="mt-2 text-sm text-neutral-500 font-mono" dir="ltr">{{ customer.phone }}</div>
              <div class="mt-1 text-sm text-neutral-400">{{ customer.city || 'شهر نامشخص' }} • {{ translateEnum(genderMap, customer.gender) }}</div>
            </div>
            <div class="md:text-right">
              <div class="text-sm font-bold text-neutral-800">{{ customer.orders_count }} سفارش</div>
              <div class="text-lg text-primary font-black mt-1">{{ Number(customer.total_spent).toLocaleString('fa-IR') }} <span class="text-sm font-normal text-neutral-500">تومان</span></div>
            </div>
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
import { genderMap, translateEnum } from '../../utils/mapper';

const customers = ref<any[]>([]); 
const loading = ref(true);

onMounted(async () => { 
  loading.value = true;
  customers.value = await api.get('/api/customers'); 
  loading.value = false;
});
</script>
