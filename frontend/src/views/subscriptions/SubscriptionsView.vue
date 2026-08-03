<template>
  <AppShell>
    <div class="space-y-6">
      <h1 class="text-2xl font-extrabold text-neutral-900">خرید و مدیریت اشتراک</h1>
      
      <div v-if="loading" class="grid gap-6 md:grid-cols-2">
         <div class="skeleton h-64 rounded-3xl"></div>
         <div class="skeleton h-64 rounded-3xl"></div>
      </div>
      
      <div v-else>
         <!-- Active Subscription Status -->
         <div class="bg-white p-6 rounded-[2rem] border border-neutral-200 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
               <div class="text-sm font-bold text-neutral-500 mb-1">وضعیت اشتراک فعلی شما</div>
               <div class="text-2xl font-black" :class="shop.subscription_expires_at ? 'text-success' : 'text-neutral-800'">
                  {{ shop.subscription_expires_at ? 'اشتراک ویژه فعال' : 'نسخه رایگان (پایه)' }}
               </div>
               <div v-if="shop.subscription_expires_at" class="text-sm font-mono text-neutral-500 mt-2 bg-neutral-50 inline-block px-3 py-1 rounded-lg">
                  اعتبار تا: {{ new Date(shop.subscription_expires_at).toLocaleDateString('fa-IR') }}
               </div>
            </div>
            <div class="flex gap-4 text-center">
               <div class="bg-neutral-50 px-4 py-2 rounded-xl"><div class="text-xs text-neutral-500">سقف لینک</div><div class="font-black">{{ shop.daily_link_limit }}</div></div>
               <div class="bg-neutral-50 px-4 py-2 rounded-xl"><div class="text-xs text-neutral-500">سقف محصول</div><div class="font-black">{{ shop.product_limit }}</div></div>
            </div>
         </div>

         <div class="grid md:grid-cols-2 gap-8 items-start">
            
            <!-- Buy New Subscription -->
            <div class="card p-6 border border-neutral-200 bg-neutral-50/50">
               <h2 class="text-lg font-black mb-6 border-b border-neutral-100 pb-4">خرید اشتراک جدید</h2>
               
               <div v-if="hasPending" class="bg-warning/10 text-warning-700 p-4 rounded-xl text-sm font-bold border border-warning/20 text-center">
                  شما یک رسید در حال بررسی دارید. تا تعیین تکلیف آن امکان ارسال رسید جدید وجود ندارد.
               </div>

               <form v-else class="space-y-5" @submit.prevent="submitReceipt">
                  <div class="flex flex-col gap-1.5">
                     <label class="label-text text-primary">۱. انتخاب پلن مورد نظر</label>
                     <select v-model="form.planId" class="input-field" required>
                        <option value="" disabled>انتخاب کنید...</option>
                        <option v-for="plan in plans" :key="plan.id" :value="plan.id">
                           {{ plan.name }} - {{ Number(plan.price).toLocaleString('fa-IR') }} تومان
                        </option>
                     </select>
                  </div>
                  
                  <div v-if="form.planId" class="bg-white p-4 rounded-xl border border-primary/20 text-sm leading-relaxed">
                     لطفاً مبلغ <span class="font-black text-primary">{{ selectedPlanPrice }}</span> را به شماره کارت زیر واریز کرده و عکس رسید را آپلود کنید:
                     <div class="mt-3 font-mono text-center text-lg font-black tracking-widest bg-neutral-100 py-2 rounded-lg" dir="ltr">6037-9911-2233-4455</div>
                     <div class="text-center text-xs text-neutral-400 mt-1">به نام مدیریت پلتفرم زلف دوتا</div>
                  </div>

                  <div class="flex flex-col gap-1.5">
                     <label class="label-text text-primary">۲. آپلود تصویر رسید پرداختی</label>
                     <div class="relative">
                        <input type="file" accept="image/*" class="input-field py-2 text-neutral-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-fuchsia-50 file:text-primary" @change="uploadReceipt" :disabled="isUploading" required />
                        <div v-if="isUploading" class="absolute left-3 top-3 text-xs text-primary font-bold animate-pulse">در حال آپلود...</div>
                     </div>
                  </div>

                  <button class="btn-primary w-full py-3" :disabled="!form.receiptUrl || isSubmitting || isUploading">
                     {{ isSubmitting ? 'در حال ثبت...' : 'ثبت و ارسال برای مدیریت' }}
                  </button>
                  <p v-if="errorMessage" class="text-sm text-danger font-bold text-center mt-2">{{ errorMessage }}</p>
                  <p v-if="successMessage" class="text-sm text-success font-bold text-center mt-2">{{ successMessage }}</p>
               </form>
            </div>

            <!-- History -->
            <div>
               <h2 class="text-lg font-black mb-6">تاریخچه پرداختی‌ها</h2>
               <div v-if="history.length === 0" class="text-neutral-400 text-sm text-center py-8">تاریخچه‌ای موجود نیست.</div>
               <div v-else class="space-y-4">
                  <div v-for="item in history" :key="item.id" class="card p-5 border border-neutral-100 flex gap-4">
                     <img :src="getFullImageUrl(item.receipt_image_url)" class="w-16 h-16 rounded-xl object-cover cursor-pointer hover:opacity-80 transition-opacity border border-neutral-200" @click="openImage(item.receipt_image_url)" />
                     <div class="flex-1">
                        <div class="flex justify-between items-start">
                           <div class="font-black text-neutral-800">{{ item.plan_name }}</div>
                           <span class="badge" :class="{'bg-warning/20 text-warning-700': item.status==='pending', 'bg-success/20 text-success-700': item.status==='approved', 'bg-danger/20 text-danger-700': item.status==='rejected'}">
                              {{ item.status === 'pending' ? 'در حال بررسی' : (item.status === 'approved' ? 'تأیید شد' : 'رد شد') }}
                           </span>
                        </div>
                        <div class="text-xs text-neutral-400 mt-1 font-mono bg-neutral-50 inline-block px-2 py-1 rounded" dir="ltr">{{ new Date(item.created_at).toLocaleString('fa-IR') }}</div>
                        <div v-if="item.admin_note" class="mt-3 text-xs bg-red-50 text-danger-700 p-2 rounded-lg border border-red-100 font-medium">
                           پیام مدیر: {{ item.admin_note }}
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue';
import AppShell from '../../components/layout/AppShell.vue';
import { api, getFullImageUrl, apiBaseUrl } from '../../services/api';

const shop = ref<any>({});
const plans = ref<any[]>([]);
const history = ref<any[]>([]);
const loading = ref(true);

const form = reactive({ planId: '', receiptUrl: '' });
const isUploading = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const selectedPlanPrice = computed(() => {
   const p = plans.value.find(x => x.id === form.planId);
   return p ? Number(p.price).toLocaleString('fa-IR') + ' تومان' : '';
});

const hasPending = computed(() => {
   return history.value.some(h => h.status === 'pending');
});

const loadData = async () => {
   loading.value = true;
   const [sh, pl, hs] = await Promise.all([
      api.get('/api/shop/me'),
      api.get('/api/subscriptions/plans'),
      api.get('/api/subscriptions/history')
   ]);
   shop.value = sh;
   plans.value = pl;
   history.value = hs;
   loading.value = false;
};

const uploadReceipt = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;
  const file = target.files[0];
  isUploading.value = true;
  try {
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('ordertrack-token');
    const response = await fetch(`${apiBaseUrl}/api/upload`, {
      method: 'POST', headers: token ? { 'Authorization': `Bearer ${token}` } : {}, body: formData
    });
    const resData = await response.json();
    if (resData.url) form.receiptUrl = resData.url.split('/').pop() || '';
    else errorMessage.value = 'آپلود خطا داشت.';
  } catch (err) {
    errorMessage.value = 'ارتباط با سرور قطع شد.';
  } finally {
    isUploading.value = false;
  }
};

const submitReceipt = async () => {
   isSubmitting.value = true;
   errorMessage.value = ''; successMessage.value = '';
   try {
      const res = await api.post('/api/subscriptions/purchase', form);
      if(res.message === 'Receipt submitted successfully') {
         successMessage.value = 'رسید شما با موفقیت ثبت شد و در انتظار بررسی مدیریت است.';
         form.planId = ''; form.receiptUrl = '';
         await loadData();
      } else {
         errorMessage.value = res.message;
      }
   } catch(e) {
      errorMessage.value = 'خطا در ثبت درخواست.';
   } finally {
      isSubmitting.value = false;
   }
};

const openImage = (url: string) => {
   window.open(getFullImageUrl(url), '_blank');
};

onMounted(loadData);
</script>
