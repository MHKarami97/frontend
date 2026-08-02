<template>
  <div class="mx-auto max-w-2xl px-4 py-8 md:px-8">
    <div class="card overflow-hidden shadow-2xl">
      <div class="bg-gradient-to-r from-fuchsia-600 to-cyan-500 p-8 text-white relative">
        <div class="text-sm font-semibold opacity-80">پیگیری سفارش</div>
        <h1 class="mt-2 text-3xl font-black">{{ data.shopName || 'پردازش...' }}</h1>
        <p class="mt-3 text-sm font-mono bg-black/20 inline-block px-3 py-1 rounded-lg">{{ data.trackingToken }}</p>
      </div>
      
      <div class="p-8">
        <div class="flex flex-col sm:flex-row gap-6">
          <!-- Mapping full URL correctly here -->
          <img v-if="data.product?.imageUrl" :src="getFullImageUrl(data.product.imageUrl)" class="h-32 w-32 rounded-2xl object-cover border border-neutral-100 shadow-sm" />
          <div v-else class="h-32 w-32 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400">بدون عکس</div>
          
          <div class="flex-1">
            <div class="font-black text-xl text-neutral-900">{{ data.product?.title }}</div>
            <p class="mt-2 text-sm text-neutral-500 leading-relaxed">{{ data.product?.description }}</p>
            <div class="mt-4 grid grid-cols-2 gap-4 text-sm bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
              <div><span class="text-neutral-400 block mb-1">تعداد</span> <span class="font-bold">{{ data.product?.quantity }}</span></div>
              <div><span class="text-neutral-400 block mb-1">مبلغ کل</span> <span class="font-bold text-primary">{{ Number(data.product?.totalAmount || 0).toLocaleString('fa-IR') }}</span></div>
              <div v-if="data.orderSource" class="col-span-2"><span class="text-neutral-400 block mb-1">ثبت از طریق</span> <span class="font-bold">{{ translateEnum(sourceMap, data.orderSource) }}</span></div>
            </div>
          </div>
        </div>
        
        <div class="mt-8 rounded-2xl bg-fuchsia-50 p-6 border border-fuchsia-100 text-center">
          <div class="text-xs text-fuchsia-600 font-bold mb-1">وضعیت فعلی سفارش</div>
          <div class="text-2xl font-black text-primary">{{ translateEnum(orderStatusMap, data.status) }}</div>
        </div>
        
        <div v-if="data.postalTracking" class="mt-4 rounded-2xl bg-neutral-800 text-white p-6 text-center">
          <div class="text-xs text-neutral-400 font-bold mb-1">کد پیگیری پستی</div>
          <div class="text-xl font-mono tracking-widest">{{ data.postalTracking }}</div>
        </div>
        
        <div class="mt-10">
          <h3 class="font-bold text-lg mb-6">تاریخچه سفارش</h3>
          <div class="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
            
            <div v-for="item in data.timeline" :key="item.created_at" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"/></svg>
              </div>
              <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] card p-4">
                <div class="font-bold text-neutral-800">{{ translateEnum(orderStatusMap, item.status) }}</div>
                <div class="text-sm text-neutral-500 mt-1">{{ item.note }}</div>
                <div class="text-xs text-neutral-400 mt-2" dir="ltr">{{ new Date(item.created_at).toLocaleString('fa-IR') }}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api, getFullImageUrl } from '../../services/api';
import { orderStatusMap, sourceMap, translateEnum } from '../../utils/mapper';

const route = useRoute(); 
const data = ref<any>({ timeline: [], product: {} });

onMounted(async () => { data.value = await api.get(`/api/track/${route.params.token}`); });
</script>
