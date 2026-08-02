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
        
        <!-- CLICKABLE CUSTOMER CARDS -->
        <div v-for="customer in customers" :key="customer.id" @click="openCustomerModal(customer)" class="card p-6 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer bg-white group">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div class="font-extrabold text-lg text-neutral-900 group-hover:text-primary transition-colors">{{ customer.name || 'بدون نام' }}</div>
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
      
      <!-- CUSTOMER ORDERS MODAL -->
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm" @click.self="closeModal">
        <div class="bg-white rounded-[2rem] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-[slideUp_0.2s_ease-out]">
          <div class="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
            <div>
              <h3 class="text-xl font-black text-neutral-900">سفارشات {{ selectedCustomer?.name || 'بدون نام' }}</h3>
              <p class="text-sm text-neutral-500 mt-1 font-mono" dir="ltr">{{ selectedCustomer?.phone }}</p>
            </div>
            <button @click="closeModal" class="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-200/50 text-neutral-600 hover:bg-danger hover:text-white transition-colors font-bold text-xl">&times;</button>
          </div>
          
          <div class="p-6 overflow-y-auto flex-1 bg-neutral-50/30">
            <div v-if="loadingModal" class="space-y-3">
               <div v-for="i in 3" :key="'skm'+i" class="skeleton h-20 w-full rounded-2xl"></div>
            </div>
            <div v-else-if="customerOrders.length === 0" class="text-center py-10 text-neutral-400 font-bold">سفارشی برای این مشتری ثبت نشده است.</div>
            <div v-else class="space-y-3">
               <RouterLink v-for="order in customerOrders" :key="order.id" :to="'/orders/'+order.id" class="flex flex-col md:flex-row justify-between md:items-center p-4 border border-neutral-200 rounded-2xl hover:border-primary bg-white transition-colors gap-3 group">
                 <div>
                   <div class="font-mono text-sm font-bold text-neutral-700 group-hover:text-primary transition-colors">{{ order.tracking_token }}</div>
                   <div class="text-xs text-neutral-400 mt-1 font-mono" dir="ltr">{{ new Date(order.created_at).toLocaleString('fa-IR') }}</div>
                 </div>
                 <div class="flex items-center gap-3">
                   <span class="badge" :class="'badge-' + order.status">{{ translateEnum(orderStatusMap, order.status) }}</span>
                   <div class="font-black text-neutral-900">{{ Number(order.total_amount).toLocaleString('fa-IR') }} <span class="font-normal text-xs text-neutral-500">تومان</span></div>
                 </div>
               </RouterLink>
            </div>
          </div>
        </div>
      </div>

    </div>
  </AppShell>
</template>

<style scoped>
@keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';
import { genderMap, orderStatusMap, translateEnum } from '../../utils/mapper';

const customers = ref<any[]>([]); 
const loading = ref(true);

// Modal States
const isModalOpen = ref(false);
const selectedCustomer = ref<any>(null);
const customerOrders = ref<any[]>([]);
const loadingModal = ref(false);

const openCustomerModal = async (customer: any) => {
  selectedCustomer.value = customer;
  isModalOpen.value = true;
  loadingModal.value = true;
  customerOrders.value = await api.get(`/api/customers/${customer.id}/orders`);
  loadingModal.value = false;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedCustomer.value = null;
  customerOrders.value = [];
};

onMounted(async () => { 
  loading.value = true;
  customers.value = await api.get('/api/customers'); 
  loading.value = false;
});
</script>
