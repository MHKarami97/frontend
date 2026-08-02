<template>
  <AppShell>
    <div class="space-y-6">
      <h1 class="text-2xl font-extrabold text-neutral-900">همکاران و اپراتورها</h1>
      
      <div class="card p-6 border border-neutral-200">
        <h2 class="text-lg font-bold mb-5">افزودن همکار جدید</h2>
        <form class="grid gap-5 md:grid-cols-2" @submit.prevent="createUser">
          <div class="flex flex-col gap-1.5">
            <label for="opEmail" class="label-text">ایمیل همکار</label>
            <input id="opEmail" v-model="form.email" class="input-field" type="email" placeholder="email@domain.com" dir="ltr" required :disabled="isLoading" />
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="opPass" class="label-text">رمز عبور اختصاصی</label>
            <input id="opPass" v-model="form.password" class="input-field" type="password" placeholder="••••••••" dir="ltr" required :disabled="isLoading" />
          </div>
          
          <button class="btn-primary md:col-span-2 py-3 mt-2" :disabled="isLoading">
            {{ isLoading ? 'در حال ثبت...' : 'افزودن دسترسی اپراتور' }}
          </button>
        </form>
        <p v-if="errorMessage" class="mt-4 text-sm font-bold text-danger bg-red-50 p-4 rounded-xl border border-red-100">{{ errorMessage }}</p>
      </div>
      
      <div class="space-y-4 mt-8">
        <h2 class="text-lg font-bold">لیست دسترسی‌ها</h2>
        <div v-for="user in users" :key="user.id" class="card p-5">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-bold text-lg font-mono">{{ user.email }}</div>
              <div class="mt-1 badge bg-fuchsia-50 text-primary border border-fuchsia-100">{{ translateEnum(roleMap, user.role) }}</div>
            </div>
            <button v-if="user.role === 'shop_operator'" class="btn-secondary text-danger border-danger hover:bg-red-50" @click="removeUser(user.id)" :disabled="isLoading">لغو دسترسی</button>
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
import { roleMap, translateEnum } from '../../utils/mapper';

const users = ref<any[]>([]); 
const errorMessage = ref(''); 
const isLoading = ref(false);
const form = reactive({ email: '', password: '' });

const loadUsers = async () => { users.value = await api.get('/api/shop-users'); };

const createUser = async () => { 
  isLoading.value = true;
  errorMessage.value = '';
  const result = await api.post('/api/shop-users', form); 
  if (result.message && result.message !== 'Operator created') { 
    errorMessage.value = result.message; 
    isLoading.value = false;
    return; 
  } 
  form.email = ''; form.password = ''; 
  await loadUsers(); 
  isLoading.value = false;
};

const removeUser = async (id: string) => { 
  isLoading.value = true;
  await api.delete(`/api/shop-users/${id}`); 
  await loadUsers(); 
  isLoading.value = false;
};

onMounted(loadUsers);
</script>
