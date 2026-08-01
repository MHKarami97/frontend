import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('../views/public/LandingPage.vue') },
  { path: '/login', component: () => import('../views/auth/LoginView.vue') },
  { path: '/register', component: () => import('../views/auth/RegisterView.vue') },
  { path: '/dashboard', component: () => import('../views/dashboard/DashboardView.vue') },
  { path: '/orders', component: () => import('../views/orders/OrdersView.vue') },
  { path: '/orders/:id', component: () => import('../views/orders/OrderDetailView.vue') },
  { path: '/products', component: () => import('../views/products/ProductsView.vue') },
  { path: '/customers', component: () => import('../views/customers/CustomersView.vue') },
  { path: '/reports', component: () => import('../views/reports/ReportsView.vue') },
  { path: '/shop-users', component: () => import('../views/admin/ShopUsersView.vue') },
  { path: '/system-admin', component: () => import('../views/admin/SystemAdminView.vue') },
  { path: '/track/:token', component: () => import('../views/public/TrackOrderView.vue') }
];

const router = createRouter({ history: createWebHashHistory(), routes });
router.beforeEach((to) => {
  const token = localStorage.getItem('ordertrack-token');
  const role = localStorage.getItem('ordertrack-role');
  const publicPaths = ['/', '/login', '/register'];
  const isTrackingPage = to.path.startsWith('/track/');
  if (publicPaths.includes(to.path) || isTrackingPage) return true;
  if (!token) return '/login';
  if (to.path === '/system-admin' && role !== 'system_admin') return '/dashboard';
  if (role === 'shop_operator' && ['/products', '/customers', '/reports', '/shop-users'].includes(to.path)) return '/orders';
  return true;
});
export default router;
