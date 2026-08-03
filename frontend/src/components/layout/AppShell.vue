<template>
  <div class="mx-auto flex min-h-screen flex-col md:flex-row bg-background">
    
    <header class="md:hidden sticky top-0 z-40 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-neutral-100 px-5 py-3 shadow-sm">
      <div class="font-black text-lg text-transparent bg-clip-text bg-gradient-to-l from-primary to-cyan-500">زلف دوتا</div>
      <button @click="handleLogout" class="text-xs font-bold text-danger bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-colors">خروج امن</button>
    </header>

    <aside class="hidden w-72 border-l border-neutral-100 bg-white p-6 md:flex md:flex-col sticky top-0 h-screen shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div class="mb-8 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-l from-primary to-cyan-500">زلف دوتا</div>
      
      <nav class="space-y-2 text-sm font-semibold flex-1">
        <RouterLink class="block rounded-2xl px-4 py-3 text-neutral-600 hover:bg-fuchsia-50 hover:text-primary transition-colors" active-class="bg-fuchsia-50 text-primary" to="/dashboard">داشبورد</RouterLink>
        <RouterLink class="block rounded-2xl px-4 py-3 text-neutral-600 hover:bg-fuchsia-50 hover:text-primary transition-colors" active-class="bg-fuchsia-50 text-primary" to="/orders">سفارش‌ها</RouterLink>
        <RouterLink v-if="role !== 'shop_operator'" class="block rounded-2xl px-4 py-3 text-neutral-600 hover:bg-fuchsia-50 hover:text-primary transition-colors" active-class="bg-fuchsia-50 text-primary" to="/products">محصولات</RouterLink>
        <RouterLink v-if="role !== 'shop_operator'" class="block rounded-2xl px-4 py-3 text-neutral-600 hover:bg-fuchsia-50 hover:text-primary transition-colors" active-class="bg-fuchsia-50 text-primary" to="/customers">مشتریان</RouterLink>
        <RouterLink v-if="role !== 'shop_operator'" class="block rounded-2xl px-4 py-3 text-neutral-600 hover:bg-fuchsia-50 hover:text-primary transition-colors" active-class="bg-fuchsia-50 text-primary" to="/reports">آمار</RouterLink>
        <RouterLink v-if="role === 'shop_owner'" class="block rounded-2xl px-4 py-3 text-neutral-600 hover:bg-fuchsia-50 hover:text-primary transition-colors" active-class="bg-fuchsia-50 text-primary" to="/shop-users">همکاران</RouterLink>
        
        <!-- NEW SUBSCRIPTIONS LINK -->
        <RouterLink v-if="role === 'shop_owner'" class="block rounded-2xl px-4 py-3 text-neutral-600 hover:bg-fuchsia-50 hover:text-primary transition-colors bg-gradient-to-r hover:from-fuchsia-50 hover:to-transparent mt-4 border border-transparent hover:border-fuchsia-100" active-class="bg-fuchsia-50 text-primary border-fuchsia-100 shadow-sm" to="/subscriptions">
          ⭐ خرید و مدیریت اشتراک
        </RouterLink>
      </nav>

      <div class="pt-6 border-t border-neutral-100 mt-auto">
        <button @click="handleLogout" class="w-full flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-danger hover:bg-red-50 transition-colors">
          <span>خروج از حساب</span>
          <span class="text-xl leading-none font-light">&times;</span>
        </button>
      </div>
    </aside>

    <main class="flex-1 p-5 pb-24 md:p-8"><slot /></main>

    <nav class="fixed bottom-0 left-0 right-0 grid grid-cols-6 border-t border-neutral-100 bg-white/90 backdrop-blur-lg px-2 py-2 md:hidden z-50 safe-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
      <RouterLink class="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-neutral-400 hover:text-primary transition-colors" active-class="text-primary font-bold" to="/dashboard"><span class="text-xs">خانه</span></RouterLink>
      <RouterLink class="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-neutral-400 hover:text-primary transition-colors" active-class="text-primary font-bold" to="/orders"><span class="text-xs">سفارش</span></RouterLink>
      <RouterLink class="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-neutral-400 hover:text-primary transition-colors" active-class="text-primary font-bold" to="/products"><span class="text-xs">محصول</span></RouterLink>
      <RouterLink class="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-neutral-400 hover:text-primary transition-colors" active-class="text-primary font-bold" to="/customers"><span class="text-xs">مشتری</span></RouterLink>
      <RouterLink class="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-neutral-400 hover:text-primary transition-colors" active-class="text-primary font-bold" to="/reports"><span class="text-xs">آمار</span></RouterLink>
      <RouterLink v-if="role === 'shop_owner'" class="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-fuchsia-400 hover:text-primary transition-colors" active-class="text-primary font-bold" to="/subscriptions"><span class="text-xs text-center leading-tight">خرید<br>اشتراک</span></RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const role = localStorage.getItem('ordertrack-role') || '';
const router = useRouter();
const store = useAuthStore();

const handleLogout = async () => {
  await store.logout();
  router.push('/login');
};
</script>
