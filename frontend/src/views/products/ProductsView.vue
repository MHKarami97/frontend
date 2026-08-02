<template>
  <AppShell>
    <div class="space-y-6">
      <h1 class="text-2xl font-extrabold text-neutral-900">مدیریت محصولات</h1>
      
      <div class="card p-6 bg-white shadow-sm border border-neutral-200">
        <h2 class="text-lg font-bold mb-4">افزودن محصول جدید</h2>
        <form class="grid gap-4 md:grid-cols-2" @submit.prevent="createProduct">
          <input v-model="form.title" class="input-field" placeholder="عنوان محصول" :disabled="isLoading || isUploading" required />
          
          <div class="flex flex-col relative">
            <input type="file" accept="image/*" class="input-field py-2 text-neutral-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fuchsia-50 file:text-primary hover:file:bg-fuchsia-100" @change="handleFileUpload" :disabled="isLoading || isUploading" />
            <div v-if="isUploading" class="absolute left-3 top-3 text-xs text-primary font-bold animate-pulse">در حال آپلود...</div>
          </div>
          
          <input v-model.number="form.price" class="input-field" type="number" min="0" placeholder="قیمت (تومان)" :disabled="isLoading || isUploading" required />
          <input v-model="form.description" class="input-field" placeholder="توضیحات کوتاه" :disabled="isLoading || isUploading" />
          
          <button class="btn-primary md:col-span-2 py-3 mt-2" :disabled="isLoading || isUploading">
            {{ isLoading ? 'در حال ثبت...' : 'افزودن محصول' }}
          </button>
        </form>
        <p v-if="errorMessage" class="mt-4 text-sm font-medium text-danger bg-red-50 p-3 rounded-lg">{{ errorMessage }}</p>
      </div>
      
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="product in products" :key="product.id" class="card overflow-hidden transition-all hover:shadow-md">
          <img v-if="product.image_url" :src="product.image_url" class="h-56 w-full object-cover border-b border-neutral-100" />
          <div v-else class="h-56 w-full bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">بدون تصویر</div>
          
          <div class="p-5">
            <div v-if="editingId === product.id" class="space-y-3">
              <input v-model="editForm.title" class="input-field" placeholder="عنوان" />
              <input v-model.number="editForm.price" class="input-field" type="number" placeholder="قیمت" />
              <input v-model="editForm.description" class="input-field" placeholder="توضیحات" />
              <div class="flex gap-2 pt-2">
                <button class="btn-primary flex-1" @click="saveEdit(product.id)">ذخیره</button>
                <button class="btn-ghost border border-neutral-200 flex-1" @click="editingId = ''">انصراف</button>
              </div>
            </div>
            
            <div v-else>
              <div class="font-extrabold text-lg">{{ product.title }}</div>
              <p class="mt-2 text-sm text-neutral-500 line-clamp-2 h-10">{{ product.description || 'بدون توضیحات' }}</p>
              <div class="mt-4 text-primary font-black text-xl">{{ Number(product.price).toLocaleString('fa-IR') }} <span class="text-sm font-normal text-neutral-500">تومان</span></div>
              
              <div class="mt-5 flex gap-2">
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

const form = reactive({ title: '', imageUrl: '', description: '', price: 0 });
const editForm = reactive({ title: '', imageUrl: '', description: '', price: 0 });

const compressImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        let finalWidth = img.width;
        let finalHeight = img.height;
        
        if (img.width > MAX_WIDTH) {
          const scaleSize = MAX_WIDTH / img.width;
          finalWidth = MAX_WIDTH;
          finalHeight = img.height * scaleSize;
        }
        
        canvas.width = finalWidth;
        canvas.height = finalHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, finalWidth, finalHeight);
        
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas compression failed'));
        }, 'image/jpeg', 0.8);
      };
    };
    reader.onerror = error => reject(error);
  });
};

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;
  
  const file = target.files[0];
  isUploading.value = true;
  errorMessage.value = '';
  
  try {
    const compressedBlob = await compressImage(file);
    const formData = new FormData();
    formData.append('file', compressedBlob, file.name);
    
    const token = localStorage.getItem('ordertrack-token');
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '[https://ordertrack-api.example.workers.dev](https://ordertrack-api.example.workers.dev)';
    
    const response = await fetch(`${apiBaseUrl}/api/upload`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData
    });
    
    const resData = await response.json();
    if (resData.url) {
      form.imageUrl = resData.url;
    } else {
      errorMessage.value = 'آپلود با خطا مواجه شد.';
    }
  } catch (err) {
    errorMessage.value = 'خطا در فشرده‌سازی و ارتباط با سرور.';
  } finally {
    isUploading.value = false;
    if(target) target.value = ''; // reset input
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
    Object.assign(form, { title: '', imageUrl: '', description: '', price: 0 });
    await loadProducts();
  } catch (e) {
    errorMessage.value = 'خطا در ثبت محصول';
  } finally {
    isLoading.value = false;
  }
};

const startEdit = (product: any) => { 
  editingId.value = product.id; 
  Object.assign(editForm, { title: product.title, imageUrl: product.image_url || '', description: product.description || '', price: product.price }); 
};

const saveEdit = async (id: string) => { 
  await api.patch(`/api/products/${id}`, editForm); 
  editingId.value = ''; 
  await loadProducts(); 
};

const toggleActive = async (product: any) => { 
  await api.patch(`/api/products/${product.id}`, { isActive: !product.is_active }); 
  await loadProducts(); 
};

const removeProduct = async (id: string) => { 
  await api.delete(`/api/products/${id}`); 
  await loadProducts(); 
};

onMounted(loadProducts);
</script>