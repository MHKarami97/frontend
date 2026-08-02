<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppShell from '../../components/layout/AppShell.vue';
import { api } from '../../services/api';

const summary = ref<Record<string, number>>({});
const shop = ref<any>({});
const exposeOrderSource = ref(true);

const load = async () => {
  // استفاده از کش ۲ دقیقه‌ای
  summary.value = await api.get('/api/reports/summary', 120000);
  shop.value = await api.get('/api/shop/me', 120000);
  exposeOrderSource.value = Boolean(shop.value.expose_order_source);
};

const saveSettings = async () => {
  await api.patch('/api/shop/settings', { exposeOrderSource: exposeOrderSource.value });
  // پس از تغییر تنظیمات، کش مربوط به shop/me را باطل می‌کنیم
  api.clearCache('/api/shop/me');
  await load();
};

onMounted(load);
</script>