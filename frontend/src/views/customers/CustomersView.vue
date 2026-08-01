<template>
  <AppShell>
    <div><h1 class="text-2xl font-extrabold">مشتریان</h1><div class="mt-5 space-y-3"><div v-for="customer in customers" :key="customer.id" class="card p-5"><div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"><div><div class="font-bold">{{ customer.name || 'بدون نام' }}</div><div class="mt-1 text-sm text-neutral-500">{{ customer.phone }} - {{ customer.city || 'نامشخص' }} - {{ genderLabel(customer.gender) }}</div></div><div class="text-sm text-neutral-600">{{ customer.orders_count }} سفارش / {{ Number(customer.total_spent).toLocaleString('fa-IR') }} تومان</div></div></div></div></div>
  </AppShell>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';
const customers = ref<any[]>([]); const genderLabels: Record<string, string> = { male: 'مرد', female: 'زن', other: 'سایر' }; const genderLabel = (value: string) => genderLabels[value] || 'نامشخص';
onMounted(async () => { customers.value = await api.get('/api/customers'); });
</script>
