<template>
  <AppShell>
    <div>
      <h1 class="text-2xl font-extrabold mb-6">مشتریان</h1>
      <div class="space-y-4">
        <div v-for="customer in customers" :key="customer.id" class="card p-6">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div class="font-extrabold text-lg">{{ customer.name || 'بدون نام' }}</div>
              <div class="mt-2 text-sm text-neutral-500 font-mono">{{ customer.phone }}</div>
              <div class="mt-1 text-sm text-neutral-400">{{ customer.city || 'شهر نامشخص' }} • {{ translateEnum(genderMap, customer.gender) }}</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-bold text-neutral-800">{{ customer.orders_count }} سفارش</div>
              <div class="text-sm text-primary font-black">{{ Number(customer.total_spent).toLocaleString('fa-IR') }} تومان</div>
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
onMounted(async () => { customers.value = await api.get('/api/customers'); });
</script>
