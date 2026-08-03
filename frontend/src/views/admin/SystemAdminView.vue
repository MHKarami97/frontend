<template>
  <div class="mx-auto max-w-7xl px-4 py-10 md:px-8 pb-20">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8 bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 relative overflow-hidden">
      <div class="absolute -left-10 -top-10 w-32 h-32 bg-primary opacity-5 rounded-full blur-2xl"></div>
      <div class="relative z-10">
        <h1 class="text-3xl font-black text-neutral-900">پنل مدیریت کل سیستم</h1>
        <p class="text-neutral-500 mt-2">کنترل مرکزی زیرساخت و درآمد زلف</p>
      </div>
      <button class="btn-ghost text-danger font-bold border border-red-100 bg-red-50 hover:bg-red-100 px-6 py-3 rounded-2xl relative z-10 w-full md:w-auto" @click="handleLogout">خروج امن</button>
    </div>
    
    <div class="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
       <button @click="activeTab = 'dashboard'" class="px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap" :class="activeTab==='dashboard' ? 'bg-neutral-900 text-white shadow-lg' : 'bg-white text-neutral-500 border border-neutral-200 hover:bg-neutral-50'">داشبورد و گزارشات</button>
       <button @click="activeTab = 'shops'" class="px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap" :class="activeTab==='shops' ? 'bg-neutral-900 text-white shadow-lg' : 'bg-white text-neutral-500 border border-neutral-200 hover:bg-neutral-50'">مدیریت فروشگاه‌ها</button>
       <button @click="activeTab = 'receipts'" class="px-6 py-3 rounded-xl font-bold transition-all relative whitespace-nowrap" :class="activeTab==='receipts' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white text-neutral-500 border border-neutral-200 hover:bg-neutral-50'">
          بررسی فیش‌های واریزی
          <span v-if="receipts.filter(r=>r.status==='pending').length > 0" class="absolute -right-2 bg-danger text-white w-6 h-6 flex items-center justify-center rounded-full text-xs animate-bounce">{{receipts.filter(r=>r.status==='pending').length}}</span>
       </button>
    </div>

    <!-- TAB: DASHBOARD & REPORTS (NEW) -->
    <div v-if="activeTab === 'dashboard'" class="space-y-6">
       <!-- High-level Stats -->
       <div v-if="loadingStats" class="grid gap-6 md:grid-cols-4">
          <div v-for="i in 4" :key="'sk1'+i" class="card p-6 skeleton h-32"></div>
       </div>
       <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
         <div class="card p-6 bg-gradient-to-br from-primary to-fuchsia-600 text-white shadow-lg shadow-primary/20">
           <div class="text-sm font-bold opacity-80 mb-2">درآمد خالص پلتفرم (حق‌اشتراک‌ها)</div>
           <div class="text-4xl font-black">{{ Number(stats.platform_revenue || 0).toLocaleString('fa-IR') }} <span class="text-sm font-normal">تومان</span></div>
         </div>
         <div class="card p-6 bg-neutral-900 text-white">
           <div class="text-sm font-bold text-neutral-400 mb-2">کل فروشگاه‌های ثبت شده</div>
           <div class="text-4xl font-black">{{ stats.total_shops || 0 }} <span class="text-sm font-normal text-neutral-500">فروشگاه</span></div>
           <div class="mt-3 flex gap-4 text-xs font-bold">
             <span class="text-success">{{ stats.active_shops || 0 }} فعال</span>
             <span class="text-warning">{{ stats.pending_shops || 0 }} در انتظار</span>
           </div>
         </div>
         <div class="card p-6 border-l-4 border-l-cyan-500 bg-white">
           <div class="text-sm font-bold text-neutral-500 mb-2">حجم تراکنش فروشگاه‌ها</div>
           <div class="text-3xl font-black text-neutral-900">{{ Number(stats.total_revenue || 0).toLocaleString('fa-IR') }} <span class="text-sm font-normal text-neutral-500">تومان</span></div>
         </div>
         <div class="card p-6 border-l-4 border-l-fuchsia-500 bg-white">
           <div class="text-sm font-bold text-neutral-500 mb-2">کل سفارشات پردازش شده</div>
           <div class="text-3xl font-black text-neutral-900">{{ Number(stats.total_orders || 0).toLocaleString('fa-IR') }} <span class="text-sm font-normal text-neutral-500">سفارش</span></div>
         </div>
       </div>

       <!-- Actionable Analytics -->
       <div class="grid lg:grid-cols-2 gap-6 mt-8">
          <div class="card p-6 border border-neutral-200">
             <h3 class="text-lg font-black text-neutral-900 mb-6 flex items-center gap-2">
               <span class="text-2xl">🏆</span> ۵ فروشگاه برتر (پردرآمدترین‌ها)
             </h3>
             <div v-if="loadingStats" class="space-y-4">
                <div v-for="i in 5" :key="'sk2'+i" class="skeleton h-12 w-full rounded-xl"></div>
             </div>
             <div v-else class="space-y-3">
                <div v-if="!stats.top_shops || stats.top_shops.length === 0" class="text-neutral-400 text-sm py-4 text-center">داده‌ای موجود نیست</div>
                <div v-for="(shop, index) in stats.top_shops" :key="shop.name" class="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors border border-neutral-100">
                   <div class="flex items-center gap-4">
                      <div class="w-8 h-8 rounded-full bg-white font-black text-neutral-500 flex items-center justify-center shadow-sm border border-neutral-200">{{ index + 1 }}</div>
                      <div>
                         <div class="font-bold text-neutral-900">{{ shop.name }}</div>
                         <div class="text-xs text-neutral-500 mt-1">{{ shop.total_orders }} سفارش موفق</div>
                      </div>
                   </div>
                   <div class="text-primary font-black">{{ Number(shop.revenue).toLocaleString('fa-IR') }} <span class="text-xs font-normal text-neutral-500">تومان</span></div>
                </div>
             </div>
          </div>
          
          <div class="card p-6 border border-neutral-200 bg-neutral-900 text-white relative overflow-hidden">
             <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
             <h3 class="text-lg font-black mb-6 relative z-10">خلاصه وضعیت سیستم</h3>
             <div v-if="!loadingStats" class="relative z-10 space-y-4">
                <div class="flex justify-between items-center border-b border-neutral-800 pb-4">
                   <span class="text-neutral-400 font-bold">کل محصولات تعریف شده</span>
                   <span class="font-black text-xl">{{ stats.total_products || 0 }}</span>
                </div>
                <div class="flex justify-between items-center border-b border-neutral-800 pb-4">
                   <span class="text-neutral-400 font-bold">تعداد مشتریان یکتای ثبت شده</span>
                   <span class="font-black text-xl">{{ stats.total_customers || 0 }}</span>
                </div>
                <div class="bg-primary/20 border border-primary/30 p-4 rounded-2xl mt-6">
                   <p class="text-sm leading-relaxed text-primary-100">
                      <strong>تحلیل سیستمی:</strong> نسبت مشتریان یکتا به سفارشات نشان‌دهنده نرخ بازگشت (Retention) فروشگاه‌ها در پلتفرم شماست.
                   </p>
                </div>
             </div>
          </div>
       </div>
    </div>

    <!-- TAB: SHOPS -->
    <div v-if="activeTab === 'shops'">
       <div class="mt-6 space-y-4">
          <div v-if="loadingShops" class="space-y-4">
             <div v-for="i in 3" :key="'sk3'+i" class="card p-6 skeleton h-32"></div>
          </div>
          
          <div v-else>
            <div v-if="shops.length === 0" class="text-center py-10 text-neutral-500">فروشگاهی یافت نشد.</div>
            <div v-for="shop in shops" :key="shop.id" class="card p-6 border-2 mb-4" :class="{'border-warning/50': shop.status === 'pending', 'border-danger/50': shop.status === 'banned', 'border-transparent': shop.status === 'active'}">
              <div class="grid gap-6 md:grid-cols-6 items-end">
                <div class="md:col-span-2">
                  <div class="font-black text-xl">{{ shop.name }}</div>
                  <div class="mt-1 font-mono text-sm text-neutral-500">{{ shop.email }}</div>
                  <div class="mt-2 badge" :class="{'bg-warning/20 text-warning': shop.status === 'pending', 'bg-success/20 text-success': shop.status === 'active', 'bg-danger/20 text-danger': shop.status === 'banned'}">
                    {{ translateEnum(shopStatusMap, shop.status) }}
                  </div>
                  <div v-if="shop.subscription_expires_at" class="mt-2 text-xs text-primary font-bold bg-fuchsia-50 inline-block px-2 py-1 rounded">انقضا اشتراک: {{ new Date(shop.subscription_expires_at).toLocaleDateString('fa-IR') }}</div>
                </div>
                <div class="flex flex-col gap-1.5"><label class="label-text">لینک روزانه</label><input v-model.number="shop.daily_link_limit" class="input-field h-10 text-center bg-neutral-50" type="number" min="1" :disabled="shop.isSaving" /></div>
                <div class="flex flex-col gap-1.5"><label class="label-text">سقف محصول</label><input v-model.number="shop.product_limit" class="input-field h-10 text-center bg-neutral-50" type="number" min="1" :disabled="shop.isSaving" /></div>
                <div class="flex flex-col gap-1.5"><label class="label-text">سقف اپراتور</label><input v-model.number="shop.operator_limit" class="input-field h-10 text-center bg-neutral-50" type="number" min="0" :disabled="shop.isSaving" /></div>
                <div class="flex flex-col gap-3 justify-end h-full">
                  <div class="flex gap-2">
                    <button class="btn-primary w-full py-2 text-xs bg-success shadow-none" @click="saveShop(shop, 'active')" :disabled="shop.isSaving">فعال‌سازی</button>
                    <button class="btn-secondary text-danger border-danger w-full py-2 text-xs" @click="saveShop(shop, 'banned')" :disabled="shop.isSaving">مسدود</button>
                  </div>
                  <button class="btn-secondary w-full py-2 text-xs bg-neutral-900 text-white border-neutral-900" @click="saveShop(shop)" :disabled="shop.isSaving">ذخیره مقادیر</button>
                </div>
              </div>
            </div>
          </div>
       </div>
    </div>

    <!-- TAB: RECEIPTS -->
    <div v-if="activeTab === 'receipts'" class="space-y-6">
       <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button @click="receiptFilter = 'pending'; loadReceipts()" class="btn-secondary rounded-full whitespace-nowrap" :class="{'bg-warning/10 text-warning border-warning': receiptFilter==='pending'}">در انتظار بررسی</button>
          <button @click="receiptFilter = 'approved'; loadReceipts()" class="btn-secondary rounded-full whitespace-nowrap" :class="{'bg-success/10 text-success border-success': receiptFilter==='approved'}">تأیید شده‌ها</button>
          <button @click="receiptFilter = 'rejected'; loadReceipts()" class="btn-secondary rounded-full whitespace-nowrap" :class="{'bg-danger/10 text-danger border-danger': receiptFilter==='rejected'}">رد شده‌ها</button>
       </div>

       <div v-if="loadingReceipts" class="space-y-4">
          <div v-for="i in 2" :key="'sk4'+i" class="card p-6 skeleton h-48"></div>
       </div>
       <div v-else-if="receipts.length === 0" class="text-center py-10 text-neutral-500 font-bold">رسیدی در این وضعیت یافت نشد.</div>
       
       <div v-for="rec in receipts" :key="rec.id" class="card p-6 border-l-8" :class="{'border-l-warning': rec.status==='pending', 'border-l-success': rec.status==='approved', 'border-l-danger': rec.status==='rejected'}">
          <div class="flex flex-col lg:flex-row gap-8">
             <div class="w-full lg:w-48 shrink-0">
                <div class="text-xs text-neutral-400 font-bold mb-2">تصویر فیش (کلیک برای بزرگنمایی)</div>
                <img :src="getFullImageUrl(rec.receipt_image_url)" @click="openImage(rec.receipt_image_url)" class="w-full aspect-[1/2] object-cover rounded-2xl cursor-pointer border border-neutral-200 hover:shadow-lg transition-shadow" />
             </div>
             
             <div class="flex-1 space-y-4">
                <div class="flex flex-col sm:flex-row justify-between border-b border-neutral-100 pb-4 gap-4">
                   <div>
                      <h3 class="font-black text-xl text-neutral-900">{{ rec.shop_name }}</h3>
                      <div class="text-sm font-mono text-neutral-500 mt-1">{{ rec.shop_email }}</div>
                      <div class="text-xs text-neutral-400 font-mono mt-1 bg-neutral-50 inline-block px-2 py-1 rounded" dir="ltr">{{ new Date(rec.created_at).toLocaleString('fa-IR') }}</div>
                   </div>
                   <div class="sm:text-left">
                      <div class="text-sm font-bold text-primary">{{ rec.plan_name }}</div>
                      <div class="text-xl font-black">{{ Number(rec.price).toLocaleString('fa-IR') }} <span class="text-xs font-normal text-neutral-500">تومان</span></div>
                   </div>
                </div>

                <div v-if="rec.status === 'pending'" class="bg-neutral-50 p-5 rounded-2xl border border-neutral-200">
                   <label class="label-text">توضیح یا دلیل رد (به کاربر نمایش داده می‌شود)</label>
                   <input v-model="rec.tempNote" type="text" class="input-field mb-4 bg-white" placeholder="مثال: فیش ناخوانا است..." />
                   
                   <div class="flex flex-col sm:flex-row gap-3">
                      <button @click="reviewReceipt(rec, 'approved')" class="btn-primary flex-1 bg-success py-3 shadow-lg shadow-success/20 border-none">تأیید فیش و فعال‌سازی پلن</button>
                      <button @click="reviewReceipt(rec, 'rejected')" class="btn-secondary flex-1 border-danger text-danger hover:bg-red-50 py-3">رد کردن فیش</button>
                   </div>
                   <div class="text-xs text-neutral-400 mt-3 text-center">توجه: با تأیید فیش، سقف امکانات فروشگاه بلافاصله به پلن مربوطه ارتقا یافته و تاریخ انقضای {{ rec.duration_days }} روزه تنظیم می‌گردد.</div>
                </div>

                <div v-else class="bg-neutral-50 p-4 rounded-xl text-sm border border-neutral-100">
                   <span class="font-bold">توضیح ثبت شده:</span> {{ rec.admin_note || 'ندارد' }}
                </div>
             </div>
          </div>
       </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { api, getFullImageUrl } from '../../services/api';
import { useAuthStore } from '../../stores/auth';
import { shopStatusMap, translateEnum } from '../../utils/mapper';

const router = useRouter();
const store = useAuthStore();
const activeTab = ref('dashboard');
const receiptFilter = ref('pending');

const stats = ref<any>({}); 
const shops = ref<any[]>([]); 
const receipts = ref<any[]>([]); 

const loadingStats = ref(true);
const loadingShops = ref(true);
const loadingReceipts = ref(false);

const loadStats = async () => {
  loadingStats.value = true;
  stats.value = await api.get('/api/admin/stats');
  loadingStats.value = false;
};

const loadShops = async () => {
  loadingShops.value = true;
  const result = await api.get(`/api/admin/shops`); 
  shops.value = result.map((s: any) => ({ ...s, isSaving: false }));
  loadingShops.value = false;
};

const loadReceipts = async () => {
  loadingReceipts.value = true;
  const res = await api.get(`/api/admin/receipts?status=${receiptFilter.value}`);
  receipts.value = res.map((r: any) => ({ ...r, tempNote: '' }));
  loadingReceipts.value = false;
};

const setFilter = async (value: string) => { 
  // Shop status filter removed for simpler view, but logic remains if needed
  await loadShops(); 
};

const saveShop = async (shop: any, status?: 'active' | 'banned') => { 
  shop.isSaving = true;
  await api.patch(`/api/admin/shops/${shop.id}`, { 
    status, dailyLinkLimit: shop.daily_link_limit, productLimit: shop.product_limit, operatorLimit: shop.operator_limit
  }); 
  await loadShops(); 
  if(!status) loadStats(); 
};

const reviewReceipt = async (rec: any, status: 'approved' | 'rejected') => {
   if(status === 'rejected' && !rec.tempNote) {
      alert('برای رد کردن فیش، حتما باید دلیل آن را در باکس توضیحات بنویسید.');
      return;
   }
   await api.post(`/api/admin/receipts/${rec.id}/review`, { status, adminNote: rec.tempNote });
   await loadReceipts();
   await loadShops(); // Refresh shop limits
   await loadStats(); // Refresh platform revenue
};

const openImage = (url: string) => { window.open(getFullImageUrl(url), '_blank'); };
const handleLogout = async () => { await store.logout(); router.push('/admin-login'); };

onMounted(() => {
  loadStats();
  loadShops();
  loadReceipts();
});
</script>
