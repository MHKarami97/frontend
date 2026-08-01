<template>
  <AppShell>
    <div v-if="order" class="space-y-6">
      <RouterLink to="/orders" class="text-sm text-primary">بازگشت</RouterLink>
      <div class="card p-5">
        <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"><div><h1 class="text-xl font-extrabold">{{ order.product_title_snapshot }}</h1><div class="mt-1 text-sm text-neutral-500">{{ order.tracking_token }}</div></div><div class="text-sm text-neutral-600">{{ Number(order.total_amount).toLocaleString('fa-IR') }} تومان</div></div>
        <div class="mt-4 grid gap-3 text-sm text-neutral-600 md:grid-cols-2"><div>مشتری: {{ order.customer_name_snapshot || 'بدون نام' }}</div><div>شهر: {{ order.customer_city || 'نامشخص' }}</div><div>جنسیت: {{ order.customer_gender || 'نامشخص' }}</div><div>منبع سفارش: {{ order.order_source }}</div><div>تعداد: {{ order.quantity }}</div><div>یادداشت: {{ order.notes || '-' }}</div></div>
      </div>
      <div class="card p-5">
        <h2 class="text-lg font-bold">ویرایش سفارش</h2>
        <form class="mt-4 grid gap-3 md:grid-cols-2" @submit.prevent="updateOrder">
          <select v-model="editForm.status" class="input"><option value="pending">در انتظار</option><option value="confirmed">تأییدشده</option><option value="processing">در حال پردازش</option><option value="shipped">ارسال‌شده</option><option value="delivered">تحویل‌شده</option><option value="cancelled">لغوشده</option></select>
          <input v-model="editForm.postalTracking" class="input" placeholder="کد پیگیری پستی" />
          <input v-model="editForm.city" class="input" placeholder="شهر" />
          <select v-model="editForm.gender" class="input"><option value="">جنسیت</option><option value="male">مرد</option><option value="female">زن</option><option value="other">سایر</option></select>
          <input v-model.number="editForm.quantity" class="input" type="number" min="1" placeholder="تعداد" />
          <input v-model="editForm.customerName" class="input" placeholder="نام مشتری" />
          <input v-model="editForm.notes" class="input md:col-span-2" placeholder="یادداشت" />
          <button class="btn-primary md:col-span-2">ذخیره تغییرات</button>
        </form>
      </div>
      <div class="card p-5"><h2 class="text-lg font-bold">تاریخچه وضعیت</h2><div class="mt-4 space-y-3"><div v-for="log in logs" :key="log.created_at" class="rounded-2xl border border-neutral-200 p-4"><div class="font-bold">{{ log.status }}</div><div class="mt-1 text-sm text-neutral-500">{{ log.note }}</div></div></div></div>
    </div>
  </AppShell>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';
const route = useRoute(); const order = ref<any>(null); const logs = ref<any[]>([]); const editForm = reactive({ status: 'pending', postalTracking: '', city: '', gender: '', quantity: 1, notes: '', customerName: '' });
const load = async () => { const result = await api.get(`/api/orders/${route.params.id}`); order.value = result.order; logs.value = result.logs; Object.assign(editForm, { status: result.order.status, postalTracking: result.order.postal_tracking || '', city: result.order.customer_city || '', gender: result.order.customer_gender || '', quantity: result.order.quantity, notes: result.order.notes || '', customerName: result.order.customer_name_snapshot || '' }); };
const updateOrder = async () => { await api.patch(`/api/orders/${route.params.id}`, editForm); await load(); };
onMounted(load);
</script>
