<template>
  <div class="min-h-screen bg-neutral-50 pb-12">
    <!-- Modern Hero Header -->
    <div class="bg-neutral-900 text-white pb-20 pt-8 px-4 relative overflow-hidden">
      <div class="absolute -right-20 -top-20 w-64 h-64 bg-primary opacity-20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -left-10 bottom-0 w-48 h-48 bg-cyan-500 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-sm font-semibold mb-6">
           <svg class="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/></svg>
           سیستم پیگیری سفارش
        </div>
        <h1 class="text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">{{ data.shopName || 'در حال جستجو...' }}</h1>
        <p class="mt-4 text-neutral-400 font-mono tracking-widest text-lg">{{ data.trackingToken }}</p>
      </div>
    </div>

    <div class="mx-auto max-w-3xl px-4 -mt-12 relative z-20 space-y-6">
      
      <!-- Current Status Card (Glassmorphism) -->
      <div class="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-xl shadow-neutral-200/50 border border-white">
         <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex-1 w-full">
               <div class="text-sm font-bold text-neutral-500 mb-1">وضعیت فعلی مرسوله</div>
               <div class="text-3xl font-black text-primary">{{ translateEnum(orderStatusMap, data.status) }}</div>
            </div>
            
            <div v-if="data.postalTracking" class="w-full md:w-auto bg-neutral-50 rounded-2xl p-4 border border-neutral-100 flex items-center justify-between gap-4">
               <div>
                  <div class="text-xs font-bold text-neutral-400 mb-1">کد رهگیری پُست</div>
                  <div class="font-mono text-lg font-black text-neutral-800 tracking-widest">{{ data.postalTracking }}</div>
               </div>
               <button @click="copyPostal" class="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-primary hover:bg-primary hover:text-white transition-colors">
                  <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  <svg v-else class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
               </button>
            </div>
         </div>
      </div>

      <!-- Product Details Card -->
      <div class="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-neutral-100">
        <h3 class="text-lg font-black text-neutral-800 mb-6 flex items-center gap-2">
           <svg class="w-5 h-5 text-neutral-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/></svg>
           جزئیات محصول
        </h3>
        <div class="flex flex-col sm:flex-row gap-6 items-start">
          <div class="w-full sm:w-32 shrink-0 aspect-square rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-100 flex items-center justify-center">
             <img v-if="data.product?.imageUrl" :src="getFullImageUrl(data.product.imageUrl)" class="w-full h-full object-cover" />
             <svg v-else class="w-10 h-10 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          
          <div class="flex-1 w-full space-y-4">
            <div>
               <div class="font-black text-xl text-neutral-900">{{ data.product?.title || 'در حال دریافت...' }}</div>
               <p class="mt-1 text-sm text-neutral-500 leading-relaxed">{{ data.product?.description || 'بدون توضیحات' }}</p>
            </div>
            
            <div class="grid grid-cols-2 gap-3">
               <div class="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  <div class="text-xs text-neutral-400 font-bold mb-1">تعداد</div>
                  <div class="font-black text-neutral-800">{{ data.product?.quantity || 1 }} <span class="font-normal text-sm">عدد</span></div>
               </div>
               <div class="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  <div class="text-xs text-neutral-400 font-bold mb-1">مبلغ پرداخت شده</div>
                  <div class="font-black text-primary">{{ Number(data.product?.totalAmount || 0).toLocaleString('fa-IR') }} <span class="font-normal text-sm text-neutral-500">تومان</span></div>
               </div>
            </div>
          </div>
        </div>
      </div>
        
      <!-- Modern Timeline Stepper -->
      <div class="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-neutral-100">
         <h3 class="text-lg font-black text-neutral-800 mb-8 flex items-center gap-2">
            <svg class="w-5 h-5 text-neutral-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/></svg>
            مسیر پیگیری
         </h3>
         
         <div class="relative pl-4 pr-6 border-r-2 border-neutral-100 space-y-8">
            <div v-for="(item, index) in data.timeline" :key="item.created_at" class="relative">
               <!-- Stepper Dot -->
               <span class="absolute -right-[33px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm" :class="index === data.timeline.length - 1 ? 'bg-primary ring-4 ring-primary/20' : 'bg-neutral-300'"></span>
               
               <div>
                  <div class="flex items-center gap-3">
                     <div class="font-black text-neutral-900 text-lg" :class="{'text-primary': index === data.timeline.length - 1}">{{ translateEnum(orderStatusMap, item.status) }}</div>
                     <span v-if="index === data.timeline.length - 1" class="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">آخرین وضعیت</span>
                  </div>
                  <div class="text-sm text-neutral-500 mt-1.5 font-medium">{{ item.note }}</div>
                  <div class="text-xs text-neutral-400 mt-2 flex items-center gap-1 font-mono" dir="ltr">
                     <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                     {{ new Date(item.created_at).toLocaleString('fa-IR', { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'short', day: 'numeric' }) }}
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      <!-- Footer Branding -->
      <div class="text-center pb-8 pt-4">
         <div class="text-xs text-neutral-400 font-medium">قدرت گرفته از سیستم مدیریت فروشگاه</div>
         <div class="text-sm font-black text-neutral-300 mt-1 tracking-widest">OrderTrack</div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api, getFullImageUrl } from '../../services/api';
import { orderStatusMap, translateEnum } from '../../utils/mapper';

const route = useRoute(); 
const data = ref<any>({ timeline: [], product: {} });
const copied = ref(false);

const copyPostal = async () => {
   if(!data.value.postalTracking) return;
   await navigator.clipboard.writeText(data.value.postalTracking);
   copied.value = true;
   setTimeout(() => copied.value = false, 2000);
}

onMounted(async () => { 
   data.value = await api.get(`/api/track/${route.params.token}`); 
});
</script>
