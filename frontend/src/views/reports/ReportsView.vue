<template>
  <AppShell>
    <div class="space-y-6">
      <h1 class="text-2xl font-extrabold mb-8">گزارش‌ها و تحلیل‌ها</h1>
      
      <!-- Finance Skeletons -->
      <div v-if="loadingFinance" class="grid gap-4 md:grid-cols-3">
        <div v-for="i in 3" :key="i" class="card p-6">
          <div class="skeleton h-4 w-1/3 mb-4"></div>
          <div class="skeleton h-8 w-2/3"></div>
        </div>
      </div>
      <!-- Finance Content -->
      <div v-else class="grid gap-4 md:grid-cols-3">
        <div class="card p-6 bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/20">
          <div class="text-sm font-bold opacity-80">فروش این هفته</div>
          <div class="mt-3 text-3xl font-black">{{ Number(finance.weekly?.revenue || 0).toLocaleString('fa-IR') }} <span class="text-sm font-normal">تومان</span></div>
        </div>
        <div class="card p-6 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/20">
          <div class="text-sm font-bold opacity-80">فروش این ماه</div>
          <div class="mt-3 text-3xl font-black">{{ Number(finance.monthly?.revenue || 0).toLocaleString('fa-IR') }} <span class="text-sm font-normal">تومان</span></div>
        </div>
        <div class="card p-6 bg-gradient-to-br from-neutral-800 to-neutral-900 text-white shadow-lg">
          <div class="text-sm font-bold opacity-80">فروش امسال</div>
          <div class="mt-3 text-3xl font-black">{{ Number(finance.yearly?.revenue || 0).toLocaleString('fa-IR') }} <span class="text-sm font-normal">تومان</span></div>
        </div>
      </div>
      
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Demographics sections -->
        <div class="card p-6">
          <h2 class="font-extrabold text-lg border-b border-neutral-100 pb-4 mb-4">تفکیک شهر</h2>
          <div v-if="loadingDemographics" class="space-y-3"><div v-for="i in 4" :key="i" class="skeleton h-10 w-full rounded-xl"></div></div>
          <div v-else class="space-y-3 text-sm">
            <div v-if="demographics.byCity?.length === 0" class="text-neutral-400 text-center py-4">داده‌ای موجود نیست</div>
            <div v-for="item in demographics.byCity" :key="item.city" class="flex items-center justify-between bg-neutral-50 p-3 rounded-xl">
              <span class="font-bold">{{ item.city || 'نامشخص' }}</span><span class="text-primary">{{ item.count }} سفارش</span>
            </div>
          </div>
        </div>
        
        <div class="card p-6">
          <h2 class="font-extrabold text-lg border-b border-neutral-100 pb-4 mb-4">تفکیک جنسیت</h2>
          <div v-if="loadingDemographics" class="space-y-3"><div v-for="i in 3" :key="i" class="skeleton h-10 w-full rounded-xl"></div></div>
          <div v-else class="space-y-3 text-sm">
            <div v-if="demographics.byGender?.length === 0" class="text-neutral-400 text-center py-4">داده‌ای موجود نیست</div>
            <div v-for="item in demographics.byGender" :key="item.gender" class="flex items-center justify-between bg-neutral-50 p-3 rounded-xl">
              <span class="font-bold">{{ translateEnum(genderMap, item.gender) }}</span><span class="text-primary">{{ item.count }} سفارش</span>
            </div>
          </div>
        </div>
        
        <div class="card p-6">
          <h2 class="font-extrabold text-lg border-b border-neutral-100 pb-4 mb-4">منبع سفارش</h2>
          <div v-if="loadingDemographics" class="space-y-3"><div v-for="i in 4" :key="i" class="skeleton h-10 w-full rounded-xl"></div></div>
          <div v-else class="space-y-3 text-sm">
            <div v-if="demographics.bySource?.length === 0" class="text-neutral-400 text-center py-4">داده‌ای موجود نیست</div>
            <div v-for="item in demographics.bySource" :key="item.source" class="flex items-center justify-between bg-neutral-50 p-3 rounded-xl">
              <span class="font-bold">{{ translateEnum(sourceMap, item.source) }}</span><span class="text-primary">{{ item.count }} سفارش</span>
            </div>
          </div>
        </div>
        
        <div class="card p-6">
          <h2 class="font-extrabold text-lg border-b border-neutral-100 pb-4 mb-4">محصولات پرفروش</h2>
          <div v-if="loadingDemographics" class="space-y-3"><div v-for="i in 5" :key="i" class="skeleton h-10 w-full rounded-xl"></div></div>
          <div v-else class="space-y-3 text-sm">
            <div v-if="demographics.topProducts?.length === 0" class="text-neutral-400 text-center py-4">داده‌ای موجود نیست</div>
            <div v-for="item in demographics.topProducts" :key="item.title" class="flex items-center justify-between bg-neutral-50 p-3 rounded-xl">
              <span class="font-bold truncate w-3/4">{{ item.title }}</span><span class="text-primary">{{ item.count }} عدد</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card p-6">
        <h2 class="font-extrabold text-lg border-b border-neutral-100 pb-4 mb-4">مشتریان وفادار (برتر)</h2>
        <div v-if="loadingCustomers" class="space-y-3"><div v-for="i in 5" :key="i" class="skeleton h-12 w-full rounded-xl"></div></div>
        <div v-else class="space-y-3 text-sm">
          <div v-if="topCustomers.length === 0" class="text-neutral-400 text-center py-4">مشتری ثبت نشده است</div>
          <div v-for="item in topCustomers" :key="item.id" class="flex items-center justify-between bg-neutral-50 p-3 rounded-xl">
            <span class="font-bold">{{ item.name || item.phone }}</span><span class="text-primary font-bold">{{ item.orders_count }} سفارش</span>
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
import { genderMap, sourceMap, translateEnum } from '../../utils/mapper';

const demographics = ref<any>({ byCity: [], byGender: [], bySource: [], topProducts: [] }); 
const finance = ref<any>({}); 
const topCustomers = ref<any[]>([]);

const loadingFinance = ref(true);
const loadingDemographics = ref(true);
const loadingCustomers = ref(true);
const CACHE_TIME = 300000;

const loadFinance = async () => {
  loadingFinance.value = true;
  finance.value = await api.get('/api/reports/finance', CACHE_TIME);
  loadingFinance.value = false;
};

const loadDemographics = async () => {
  loadingDemographics.value = true;
  demographics.value = await api.get('/api/reports/demographics', CACHE_TIME);
  loadingDemographics.value = false;
};

const loadCustomers = async () => {
  loadingCustomers.value = true;
  topCustomers.value = await api.get('/api/reports/top-customers', CACHE_TIME);
  loadingCustomers.value = false;
};

onMounted(() => { 
  // تفکیک کال‌ها برای استیت‌های جداگانه
  loadFinance();
  loadDemographics();
  loadCustomers();
});
</script>
