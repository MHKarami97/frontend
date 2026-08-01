<template>
  <AppShell>
    <div class="space-y-6"><h1 class="text-2xl font-extrabold">همکاران فروشگاه</h1><div class="card p-5"><form class="grid gap-3 md:grid-cols-2" @submit.prevent="createUser"><input v-model="form.email" class="input" type="email" placeholder="ایمیل" required /><input v-model="form.password" class="input" type="password" placeholder="رمز عبور" required /><button class="btn-primary md:col-span-2">افزودن همکار</button></form><p v-if="errorMessage" class="mt-3 text-sm text-danger">{{ errorMessage }}</p></div><div class="space-y-3"><div v-for="user in users" :key="user.id" class="card p-5"><div class="flex items-center justify-between"><div><div>{{ user.email }}</div><div class="text-xs text-neutral-400">{{ user.role }}</div></div><button v-if="user.role === 'shop_operator'" class="rounded-full bg-danger px-4 py-2 text-sm text-white" @click="removeUser(user.id)">حذف</button></div></div></div></div>
  </AppShell>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';
const users = ref<any[]>([]); const errorMessage = ref(''); const form = reactive({ email: '', password: '' });
const loadUsers = async () => { users.value = await api.get('/api/shop-users'); };
const createUser = async () => { const result = await api.post('/api/shop-users', form); if (result.message && result.message !== 'Operator created') { errorMessage.value = result.message; return; } errorMessage.value = ''; form.email = ''; form.password = ''; await loadUsers(); };
const removeUser = async (id: string) => { await api.delete(`/api/shop-users/${id}`); await loadUsers(); };
onMounted(loadUsers);
</script>
