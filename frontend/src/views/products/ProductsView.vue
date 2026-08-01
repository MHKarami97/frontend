<template>
  <AppShell>
    <div class="space-y-6">
      <h1 class="text-2xl font-extrabold">محصولات</h1>
      <div class="card p-5"><form class="grid gap-3 md:grid-cols-2" @submit.prevent="createProduct"><input v-model="form.title" class="input" placeholder="عنوان" required /><input v-model="form.imageUrl" class="input" placeholder="آدرس عکس" /><input v-model.number="form.price" class="input" type="number" min="0" placeholder="قیمت" required /><input v-model="form.description" class="input" placeholder="توضیح" /><button class="btn-primary md:col-span-2">افزودن محصول</button></form><p v-if="errorMessage" class="mt-3 text-sm text-danger">{{ errorMessage }}</p></div>
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><div v-for="product in products" :key="product.id" class="card overflow-hidden"><img v-if="product.image_url" :src="product.image_url" class="h-48 w-full object-cover" /><div class="p-5"><div v-if="editingId === product.id" class="space-y-2"><input v-model="editForm.title" class="input" /><input v-model="editForm.imageUrl" class="input" /><input v-model.number="editForm.price" class="input" type="number" /><input v-model="editForm.description" class="input" /><div class="flex gap-2"><button class="btn-primary flex-1" @click="saveEdit(product.id)">ذخیره</button><button class="btn-secondary flex-1" @click="editingId = ''">انصراف</button></div></div><div v-else><div class="font-bold">{{ product.title }}</div><p class="mt-2 text-sm text-neutral-600">{{ product.description }}</p><div class="mt-3 text-primary font-extrabold">{{ Number(product.price).toLocaleString('fa-IR') }} تومان</div><div class="mt-3 flex gap-2"><button class="btn-secondary flex-1" @click="startEdit(product)">ویرایش</button><button class="rounded-full bg-neutral-900 px-4 py-2 text-sm text-white" @click="toggleActive(product)">{{ product.is_active ? 'غیرفعال' : 'فعال' }}</button><button class="rounded-full bg-danger px-4 py-2 text-sm text-white" @click="removeProduct(product.id)">حذف</button></div></div></div></div></div>
    </div>
  </AppShell>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';
const products = ref<any[]>([]); const errorMessage = ref(''); const editingId = ref(''); const form = reactive({ title: '', imageUrl: '', description: '', price: 0 }); const editForm = reactive({ title: '', imageUrl: '', description: '', price: 0 });
const loadProducts = async () => { products.value = await api.get('/api/products'); };
const createProduct = async () => { const result = await api.post('/api/products', form); if (result.message && result.message !== 'Product created') { errorMessage.value = result.message; return; } errorMessage.value = ''; Object.assign(form, { title: '', imageUrl: '', description: '', price: 0 }); await loadProducts(); };
const startEdit = (product: any) => { editingId.value = product.id; Object.assign(editForm, { title: product.title, imageUrl: product.image_url || '', description: product.description || '', price: product.price }); };
const saveEdit = async (id: string) => { await api.patch(`/api/products/${id}`, editForm); editingId.value = ''; await loadProducts(); };
const toggleActive = async (product: any) => { await api.patch(`/api/products/${product.id}`, { isActive: !product.is_active }); await loadProducts(); };
const removeProduct = async (id: string) => { await api.delete(`/api/products/${id}`); await loadProducts(); };
onMounted(loadProducts);
</script>
