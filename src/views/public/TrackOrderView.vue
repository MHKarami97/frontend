<template>
  <div class="mx-auto max-w-2xl px-4 py-8 md:px-8">
    <div class="card overflow-hidden">
      <div class="bg-gradient-to-r from-fuchsia-500 to-cyan-400 p-6 text-white">
        <div class="text-sm">پیگیری سفارش</div>
        <h1 class="mt-2 text-2xl font-extrabold">{{ data.shopName || 'OrderTrack' }}</h1>
        <p class="mt-2 text-sm">{{ data.trackingToken }}</p>
      </div>
      <div class="p-5">
        <div class="flex gap-4">
          <img v-if="data.product?.imageUrl" :src="data.product.imageUrl" class="h-24 w-24 rounded-2xl object-cover" />
          <div>
            <div class="font-bold">{{ data.product?.title }}</div>
            <p class="mt-2 text-sm text-neutral-600">{{ data.product?.description }}</p>
            <div class="mt-3 text-sm text-neutral-500">تعداد: {{ data.product?.quantity }}</div>
            <div class="mt-1 text-sm text-neutral-500">مبلغ: {{ Number(data.product?.totalAmount || 0).toLocaleString('fa-IR') }} تومان</div>
            <div v-if="data.orderSource" class="mt-1 text-sm text-neutral-500">منبع سفارش: {{ data.orderSource }}</div>
          </div>
        </div>
        <div class="mt-6 rounded-2xl bg-fuchsia-50 p-4 text-primary">وضعیت فعلی: {{ data.status }}</div>
        <div v-if="data.postalTracking" class="mt-4 rounded-2xl bg-neutral-100 p-4 text-sm">کد پیگیری پستی: {{ data.postalTracking }}</div>
        <div class="mt-6 space-y-3">
          <div v-for="item in data.timeline" :key="item.created_at" class="rounded-2xl border border-neutral-200 p-4">
            <div class="font-bold">{{ item.status }}</div>
            <div class="mt-1 text-sm text-neutral-500">{{ item.note }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '../../services/api';

const route = useRoute();
const data = ref<any>({ timeline: [], product: {} });
onMounted(async () => {
  data.value = await api.get(`/api/track/${route.params.token}`);
});
</script>
