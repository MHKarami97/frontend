<template>
  <div class="mx-auto max-w-7xl px-4 py-10 md:px-8 pb-20">
    <div class="flex justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border border-neutral-100">
      <div>
        <h1 class="text-3xl font-black text-neutral-900">پنل مدیریت کل سیستم</h1>
        <p class="text-neutral-500 mt-2">کنترل مرکزی زیرساخت OrderTrack</p>
      </div>
      <button class="btn-ghost text-danger font-bold border border-red-100 bg-red-50 hover:bg-red-100 px-6 py-3 rounded-2xl" @click="handleLogout">خروج امن</button>
    </div>
    
    <div class="flex gap-4 mb-8">
       <button @click="activeTab = 'shops'" class="px-6 py-3 rounded-xl font-bold transition-all" :class="activeTab==='shops' ? 'bg-neutral-900 text-white shadow-lg' : 'bg-white text-neutral-500 border border-neutral-200 hover:bg-neutral-50'">مدیریت فروشگاه‌ها</button>
       <button @click="activeTab = 'receipts'" class="px-6 py-3 rounded-xl font-bold transition-all relative" :class="activeTab==='receipts' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white text-neutral-500 border border-neutral-200 hover:bg-neutral-50'">
          بررسی فیش‌های واریزی
          <span v-if="receipts.filter(r=>r.status==='pending').length > 0" class="absolute -top-2 -right-2 bg-danger text-white w-6 h-6 flex items-center justify-center rounded-full text-xs animate-bounce">{{receipts.filter(r=>r.status==='pending').length}}</span>
       </button>
    </div>

    <!-- TAB: SHOPS -->
    <div v-if="activeTab === 'shops'">
       <!-- Previous shops logic exactly as before -->
       <div class="grid gap-6 md:grid-cols-4 mb-10">
          <div class="card p-6 bg-neutral-900 text-white"><div class="text-sm font-bold text-neutral-400">کل فروشگاه‌ها</div><div class="mt-3 text-4xl font-black">{{ stats.total_shops || 0 }}</div></div>
          <div class="card p-6 border-l-4 border-l-success"><div class="text-sm font-bold text-neutral-500">فعال</div><div class="mt-3 text-4xl font-black text-success">{{ stats.active_shops || 0 }}</div></div>
          <div class="card p-6 border-l-4 border-l-warning"><div class="text-sm font-bold text-neutral-500">در انتظار تایید</div><div class="mt-3 text-4xl font-black text-warning">{{ stats.pending_shops || 0 }}</div></div>
          <div class="card p-6 bg-primary text-white"><div class="text-sm font-bold opacity-80">درآمد کل سیستم</div><div class="mt-3 text-3xl font-black">{{ Number(stats.total_revenue || 0).toLocaleString('fa-IR') }} <span class="text-sm font-normal">تومان</span></div></div>
       </div>

       <div class="mt-6 space-y-4">
          <div v-for="shop in shops" :key="shop.id" class="card p-6 border-2 mb-4" :class="{'border-warning/50': shop.status === 'pending', 'border-danger/50': shop.status === 'banned'}">
            <div class="grid gap-6 md:grid-cols-6 items-end">
              <div class="md:col-span-2">
                <div class="font-black text-xl">{{ shop.name }}</div>
                <div class="mt-1 font-mono text-sm text-neutral-500">{{ shop.email }}</div>
                <div v-if="shop.subscription_expires_at" class="mt-1 text-xs text-primary font-bold">انقضا اشتراک: {{ new Date(shop.subscription_expires_at).toLocaleDateString('fa-IR') }}</div>
              </div>
              <div class="flex flex-col gap-1.5"><label class="label-text">لینک روزانه</label><input v-model.number="shop.daily_link_limit" class="input-field h-10 text-center" type="number" min="1" :disabled="shop.isSaving" /></div>
              <div class="flex flex-col gap-1.5"><label class="label-text">سقف محصول</label><input v-model.number="shop.product_limit" class="input-field h-10 text-center" type="number" min="1" :disabled="shop.isSaving" /></div>
              <div class="flex flex-col gap-1.5"><label class="label-text">سقف اپراتور</label><input v-model.number="shop.operator_limit" class="input-field h-10 text-center" type="number" min="0" :disabled="shop.isSaving" /></div>
              <div class="flex flex-col gap-3 justify-end h-full">
                <div class="flex gap-2">
                  <button class="btn-primary w-full py-2 text-xs bg-success" @click="saveShop(shop, 'active')" :disabled="shop.isSaving">فعال‌سازی</button>
                  <button class="btn-secondary text-danger border-danger w-full py-2 text-xs" @click="saveShop(shop, 'banned')" :disabled="shop.isSaving">مسدود</button>
                </div>
                <button class="btn-secondary w-full py-2 text-xs bg-neutral-900 text-white border-neutral-900" @click="saveShop(shop)" :disabled="shop.isSaving">ذخیره مقادیر</button>
              </div>
            </div>
          </div>
       </div>
    </div>

    <!-- TAB: RECEIPTS -->
    <div v-if="activeTab === 'receipts'" class="space-y-6">
       <div class="flex gap-2">
          <button @click="receiptFilter = 'pending'; loadReceipts()" class="btn-secondary rounded-full" :class="{'bg-warning/10 text-warning border-warning': receiptFilter==='pending'}">در انتظار بررسی</button>
          <button @click="receiptFilter = 'approved'; loadReceipts()" class="btn-secondary rounded-full" :class="{'bg-success/10 text-success border-success': receiptFilter==='approved'}">تأیید شده‌ها</button>
          <button @click="receiptFilter = 'rejected'; loadReceipts()" class="btn-secondary rounded-full" :class="{'bg-danger/10 text-danger border-danger': receiptFilter==='rejected'}">رد شده‌ها</button>
       </div>

       <div v-if="receipts.length === 0" class="text-center py-10 text-neutral-500 font-bold">رسیدی در این وضعیت یافت نشد.</div>
       
       <div v-for="rec in receipts" :key="rec.id" class="card p-6 border-l-8" :class="{'border-l-warning': rec.status==='pending', 'border-l-success': rec.status==='approved', 'border-l-danger': rec.status==='rejected'}">
          <div class="flex flex-col lg:flex-row gap-8">
             <div class="w-full lg:w-48 shrink-0">
                <div class="text-xs text-neutral-400 font-bold mb-2">تصویر فیش (کلیک برای بزرگنمایی)</div>
                <img :src="getFullImageUrl(rec.receipt_image_url)" @click="openImage(rec.receipt_image_url)" class="w-full aspect-[1/2] object-cover rounded-2xl cursor-pointer border border-neutral-200 hover:shadow-lg transition-shadow" />
             </div>
             
             <div class="flex-1 space-y-4">
                <div class="flex justify-between border-b border-neutral-100 pb-4">
                   <div>
                      <h3 class="font-black text-xl text-neutral-900">{{ rec.shop_name }}</h3>
                      <div class="text-sm font-mono text-neutral-500 mt-1">{{ rec.shop_email }}</div>
                      <div class="text-xs text-neutral-400 font-mono mt-1 bg-neutral-50 inline-block px-2 py-1 rounded" dir="ltr">{{ new Date(rec.created_at).toLocaleString('fa-IR') }}</div>
                   </div>
                   <div class="text-left">
                      <div class="text-sm font-bold text-primary">{{ rec.plan_name }}</div>
                      <div class="text-xl font-black">{{ Number(rec.price).toLocaleString('fa-IR') }} <span class="text-xs font-normal">تومان</span></div>
                   </div>
                </div>

                <div v-if="rec.status === 'pending'" class="bg-neutral-50 p-5 rounded-2xl border border-neutral-200">
                   <label class="label-text">توضیح یا دلیل رد (به کاربر نمایش داده می‌شود)</label>
                   <input v-model="rec.tempNote" type="text" class="input-field mb-4" placeholder="مثال: فیش ناخوانا است..." />
                   
                   <div class="flex gap-3">
                      <button @click="reviewReceipt(rec, 'approved')" class="btn-primary flex-1 bg-success py-3 shadow-lg shadow-success/20">تأیید فیش و فعال‌سازی پلن</button>
                      <button @click="reviewReceipt(rec, 'rejected')" class="btn-secondary flex-1 border-danger text-danger hover:bg-red-50 py-3">رد کردن فیش</button>
                   </div>
                   <div class="text-xs text-neutral-400 mt-3 text-center">توجه: با تأیید فیش، سقف امکانات فروشگاه بلافاصله به پلن مربوطه ارتقا یافته و تاریخ انقضای {{ rec.duration_days }} روزه تنظیم می‌گردد.</div>
                </div>

                <div v-else class="bg-neutral-50 p-4 rounded-xl text-sm">
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
const activeTab = ref('shops');
const receiptFilter = ref('pending');

const stats = ref<Record<string, number>>({}); 
const shops = ref<any[]>([]); 
const receipts = ref<any[]>([]); 

const loadStats = async () => { stats.value = await api.get('/api/admin/stats'); };
const loadShops = async () => { 
  const result = await api.get('/api/admin/shops'); 
  shops.value = result.map((s: any) => ({ ...s, isSaving: false })); 
};
const loadReceipts = async () => {
  const res = await api.get(`/api/admin/receipts?status=${receiptFilter.value}`);
  receipts.value = res.map((r: any) => ({ ...r, tempNote: '' }));
};

const saveShop = async (shop: any, status?: 'active' | 'banned') => { 
  shop.isSaving = true;
  await api.patch(`/api/admin/shops/${shop.id}`, { 
    status, dailyLinkLimit: shop.daily_link_limit, productLimit: shop.product_limit, operatorLimit: shop.operator_limit
  }); 
  await loadShops(); 
};

const reviewReceipt = async (rec: any, status: 'approved' | 'rejected') => {
   if(status === 'rejected' && !rec.tempNote) {
      alert('برای رد کردن فیش، حتما باید دلیل آن را در باکس توضیحات بنویسید.');
      return;
   }
   await api.post(`/api/admin/receipts/${rec.id}/review`, { status, adminNote: rec.tempNote });
   await loadReceipts();
   await loadShops(); // Refresh shop limits in background
};

const openImage = (url: string) => { window.open(getFullImageUrl(url), '_blank'); };

const handleLogout = async () => { await store.logout(); router.push('/admin-login'); };

onMounted(() => { loadStats(); loadShops(); loadReceipts(); });
</script>
