<template>
  <AppShell>
    <div class="space-y-6">
      <h1 class="text-2xl font-extrabold text-neutral-900">مدیریت محصولات</h1>
      
      <div class="card p-6 border border-neutral-200">
        <h2 class="text-lg font-bold mb-5">افزودن محصول جدید</h2>
        <form class="grid gap-5 md:grid-cols-2" @submit.prevent="createProduct">
          
          <div class="flex flex-col gap-1.5">
            <label for="prodTitle" class="label-text">عنوان محصول</label>
            <input id="prodTitle" v-model="form.title" class="input-field" placeholder="نام محصول" :disabled="isLoading || isUploading" required />
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="prodImage" class="label-text">تصویر محصول</label>
            <div class="relative">
              <!-- اضافه شدن ref برای دسترسی به اینپوت در جاوااسکریپت -->
              <input id="prodImage" ref="fileInputRef" type="file" accept="image/*" class="input-field py-2 text-neutral-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fuchsia-50 file:text-primary hover:file:bg-fuchsia-100" @change="handleFileUpload" :disabled="isLoading || isUploading" />
              <div v-if="isUploading" class="absolute left-3 top-3 text-xs text-primary font-bold animate-pulse">در حال آپلود...</div>
            </div>
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="prodPrice" class="label-text">قیمت (تومان)</label>
            <input id="prodPrice" v-model.number="form.price" class="input-field" type="number" min="0" placeholder="مثال: 50000" :disabled="isLoading || isUploading" required />
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="prodDesc" class="label-text">توضیحات کوتاه</label>
            <input id="prodDesc" v-model="form.description" class="input-field" placeholder="ویژگی‌ها..." :disabled="isLoading || isUploading" />
          </div>
          
          <button class="btn-primary md:col-span-2 py-3 mt-2" :disabled="isLoading || isUploading">
            {{ isLoading ? 'در حال ثبت...' : 'افزودن محصول' }}
          </button>
        </form>
        <p v-if="errorMessage" class="mt-4 text-sm font-medium text-danger bg-red-50 p-3 rounded-lg">{{ errorMessage }}</p>
      </div>
      
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="product in products" :key="product.id" class="card overflow-hidden">
          <img v-if="product.image_url" :src="product.image_url" class="h-56 w-full object-cover border-b border-neutral-100" />
          <div v-else class="h-56 w-full bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">بدون تصویر</div>
          
          <div class="p-6">
            <div v-if="editingId === product.id" class="space-y-4">
              <div class="flex flex-col gap-1.5">
                <label :for="'editTitle_' + product.id" class="label-text">عنوان</label>
                <input :id="'editTitle_' + product.id" v-model="editForm.title" class="input-field" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label :for="'editPrice_' + product.id" class="label-text">قیمت</label>
                <input :id="'editPrice_' + product.id" v-model.number="editForm.price" class="input-field" type="number" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label :for="'editDesc_' + product.id" class="label-text">توضیحات</label>
                <input :id="'editDesc_' + product.id" v-model="editForm.description" class="input-field" />
              </div>
              
              <div class="flex gap-3 pt-2">
                <button class="btn-primary flex-1" @click="saveEdit(product.id)">ذخیره</button>
                <button class="btn-secondary flex-1" @click="editingId = ''">انصراف</button>
              </div>
            </div>
            
            <div v-else>
              <div class="font-extrabold text-lg">{{ product.title }}</div>
              <p class="mt-2 text-sm text-neutral-500 line-clamp-2 h-10">{{ product.description || 'بدون توضیحات' }}</p>
              <div class="mt-4 text-primary font-black text-xl">{{ Number(product.price).toLocaleString('fa-IR') }} <span class="text-sm font-normal text-neutral-500">تومان</span></div>
              
              <div class="mt-6 flex gap-2">
                <button class="btn-secondary flex-1 py-2 text-xs" @click="startEdit(product)">ویرایش</button>
                <button class="rounded-xl font-semibold bg-neutral-100 px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-200 transition-colors" @click="toggleActive(product)">
                  {{ product.is_active ? 'غیرفعال کن' : 'فعال کن' }}
                </button>
                <button class="rounded-xl font-semibold bg-red-50 text-danger px-4 py-2 text-xs hover:bg-red-100 transition-colors" @click="removeProduct(product.id)">حذف</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';

const products = ref<any[]>([]);
const errorMessage = ref('');
const editingId = ref('');
const isLoading = ref(false);
const isUploading = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);

const form = reactive({ title: '', imageUrl: '', description: '', price: 0 });
const editForm = reactive({ title: '', imageUrl: '', description: '', price: 0 });

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;
  const file = target.files[0];
  isUploading.value = true;
  try {
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('ordertrack-token');
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ordertrack-api.mhkarami97.workers.dev';
    
    const response = await fetch(`${apiBaseUrl}/api/upload`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData
    });
    
    const resData = await response.json();
    if (resData.url) {
      // ایجاد URL مطلق برای Zod
      const baseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
      form.imageUrl = resData.url.startsWith('http') ? resData.url : `${baseUrl}${resData.url}`;
    } else {
      errorMessage.value = 'آپلود با خطا مواجه شد.';
    }
  } catch (err) {
    errorMessage.value = 'خطا در ارتباط با سرور.';
  } finally {
    isUploading.value = false;
    // حذف ریست شدن اینپوت از اینجا، تا کاربر ببیند فایل انتخاب شده است
  }
};

const loadProducts = async () => { products.value = await api.get('/api/products'); };

const createProduct = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const result = await api.post('/api/products', form);
    if (result.message && result.message !== 'Product created') {
      errorMessage.value = result.message;
      return;
    }
    // پاک کردن فرم پس از موفقیت
    Object.assign(form, { title: '', imageUrl: '', description: '', price: 0 });
    if (fileInputRef.value) fileInputRef.value.value = ''; // حالا اینپوت را خالی می‌کنیم
    
    // پاک کردن کش داشبورد چون آمار محصولات تغییر کرده
    api.clearCache('/api/reports/summary');
    await loadProducts();
  } catch (e) { errorMessage.value = 'خطا در ثبت محصول'; }
  finally { isLoading.value = false; }
};

const startEdit = (product: any) => { 
  editingId.value = product.id; 
  Object.assign(editForm, { title: product.title, imageUrl: product.image_url || '', description: product.description || '', price: product.price }); 
};

const saveEdit = async (id: string) => { await api.patch(`/api/products/${id}`, editForm); editingId.value = ''; await loadProducts(); };
const toggleActive = async (product: any) => { await api.patch(`/api/products/${product.id}`, { isActive: !product.is_active }); await loadProducts(); };
const removeProduct = async (id: string) => { await api.delete(`/api/products/${id}`); api.clearCache('/api/reports/summary'); await loadProducts(); };

onMounted(loadProducts);
</script>