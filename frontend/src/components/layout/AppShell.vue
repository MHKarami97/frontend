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

    <!-- FLOATING PILL MOBILE NAV -->
    <nav class="fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xl border border-white shadow-2xl shadow-neutral-300/50 rounded-full px-2 py-2 md:hidden z-50 flex items-center justify-between overflow-x-auto scrollbar-hide safe-bottom">
      <RouterLink class="flex-shrink-0 flex items-center gap-2 rounded-full px-3 py-2.5 text-neutral-400 hover:text-primary transition-all duration-300 active-nav-item" active-class="bg-primary text-white shadow-md shadow-primary/20" to="/dashboard">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        <span class="text-xs font-bold whitespace-nowrap nav-text hidden">خانه</span>
      </RouterLink>
      
      <RouterLink class="flex-shrink-0 flex items-center gap-2 rounded-full px-3 py-2.5 text-neutral-400 hover:text-primary transition-all duration-300 active-nav-item" active-class="bg-primary text-white shadow-md shadow-primary/20" to="/orders">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
        <span class="text-xs font-bold whitespace-nowrap nav-text hidden">سفارشات</span>
      </RouterLink>
      
      <RouterLink class="flex-shrink-0 flex items-center gap-2 rounded-full px-3 py-2.5 text-neutral-400 hover:text-primary transition-all duration-300 active-nav-item" active-class="bg-primary text-white shadow-md shadow-primary/20" to="/products">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
        <span class="text-xs font-bold whitespace-nowrap nav-text hidden">محصولات</span>
      </RouterLink>
      
      <RouterLink class="flex-shrink-0 flex items-center gap-2 rounded-full px-3 py-2.5 text-neutral-400 hover:text-primary transition-all duration-300 active-nav-item" active-class="bg-primary text-white shadow-md shadow-primary/20" to="/customers">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        <span class="text-xs font-bold whitespace-nowrap nav-text hidden">مشتریان</span>
      </RouterLink>
      
      <RouterLink class="flex-shrink-0 flex items-center gap-2 rounded-full px-3 py-2.5 text-neutral-400 hover:text-primary transition-all duration-300 active-nav-item" active-class="bg-primary text-white shadow-md shadow-primary/20" to="/reports">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        <span class="text-xs font-bold whitespace-nowrap nav-text hidden">آمار</span>
      </RouterLink>
      
      <RouterLink v-if="role === 'shop_owner'" class="flex-shrink-0 flex items-center gap-2 rounded-full px-3 py-2.5 text-neutral-400 hover:text-primary transition-all duration-300 active-nav-item" active-class="bg-primary text-white shadow-md shadow-primary/20" to="/subscriptions">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
        <span class="text-xs font-bold whitespace-nowrap nav-text hidden">اشتراک</span>
      </RouterLink>
    </nav>
  </div>
</template>

<style>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

/* Magic expansion for bottom nav */
.active-nav-item.router-link-active .nav-text {
  display: block;
}
</style>

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
