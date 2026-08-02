<template>
  <div class="mx-auto flex min-h-screen flex-col md:flex-row">
    <aside class="hidden w-72 border-l border-neutral-200 bg-white p-6 md:block">
      <div class="mb-6 text-2xl font-extrabold text-primary">OrderTrack</div>
      <nav class="space-y-3 text-sm">
        <RouterLink class="block rounded-xl px-4 py-3 hover:bg-fuchsia-50" to="/dashboard">داشبورد</RouterLink>
        <RouterLink class="block rounded-xl px-4 py-3 hover:bg-fuchsia-50" to="/orders">سفارش‌ها</RouterLink>
        <RouterLink v-if="role !== 'shop_operator'" class="block rounded-xl px-4 py-3 hover:bg-fuchsia-50" to="/products">محصولات</RouterLink>
        <RouterLink v-if="role !== 'shop_operator'" class="block rounded-xl px-4 py-3 hover:bg-fuchsia-50" to="/customers">مشتریان</RouterLink>
        <RouterLink v-if="role !== 'shop_operator'" class="block rounded-xl px-4 py-3 hover:bg-fuchsia-50" to="/reports">آمار</RouterLink>
        <RouterLink v-if="role === 'shop_owner'" class="block rounded-xl px-4 py-3 hover:bg-fuchsia-50" to="/shop-users">همکاران</RouterLink>
      </nav>
    </aside>
    <main class="flex-1 p-4 pb-24 md:p-8"><slot /></main>
    <nav class="fixed bottom-0 left-0 right-0 grid grid-cols-5 border-t border-neutral-200 bg-white px-2 py-2 md:hidden">
      <RouterLink class="rounded-xl px-2 py-2 text-center text-xs" to="/dashboard">خانه</RouterLink>
      <RouterLink class="rounded-xl px-2 py-2 text-center text-xs" to="/orders">سفارش</RouterLink>
      <RouterLink class="rounded-xl px-2 py-2 text-center text-xs" to="/products">محصول</RouterLink>
      <RouterLink class="rounded-xl px-2 py-2 text-center text-xs" to="/customers">مشتری</RouterLink>
      <RouterLink class="rounded-xl px-2 py-2 text-center text-xs" to="/reports">آمار</RouterLink>
    </nav>
  </div>
</template>
<script setup lang="ts">
const role = localStorage.getItem('ordertrack-role') || '';
</script>
