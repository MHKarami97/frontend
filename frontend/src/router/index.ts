import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('../views/public/LandingPage.vue') },
  { path: '/about', component: () => import('../views/public/AboutView.vue') },
  { path: '/contact', component: () => import('../views/public/ContactView.vue') },
  { path: '/help', component: () => import('../views/public/HelpView.vue') },
  { path: '/login', component: () => import('../views/auth/LoginView.vue') },
  { path: '/admin-login', component: () => import('../views/auth/AdminLoginView.vue') },
  { path: '/register', component: () => import('../views/auth/RegisterView.vue') },
  { path: '/dashboard', component: () => import('../views/dashboard/DashboardView.vue') },
  { path: '/orders', component: () => import('../views/orders/OrdersView.vue') },
  { path: '/orders/:id', component: () => import('../views/orders/OrderDetailView.vue') },
  { path: '/products', component: () => import('../views/products/ProductsView.vue') },
  { path: '/customers', component: () => import('../views/customers/CustomersView.vue') },
  { path: '/reports', component: () => import('../views/reports/ReportsView.vue') },
  { path: '/shop-users', component: () => import('../views/admin/ShopUsersView.vue') },
  { path: '/subscriptions', component: () => import('../views/subscriptions/SubscriptionsView.vue') },
  { path: '/system-admin', component: () => import('../views/admin/SystemAdminView.vue') },
  { path: '/track/:token', component: () => import('../views/public/TrackOrderView.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('../views/public/NotFoundView.vue') }
];

const router = createRouter({ history: createWebHashHistory(), routes });

router.beforeEach((to) => {
  const token = localStorage.getItem('ordertrack-token');
  const role = localStorage.getItem('ordertrack-role');
  
  const publicPaths = ['/', '/login', '/admin-login', '/register', '/about', '/contact', '/help'];
  const isTrackingPage = to.path.startsWith('/track/');
  
  if (publicPaths.includes(to.path) || isTrackingPage || to.path.startsWith('/404') || to.matched.length === 0) return true;
  if (!token) return '/login';
  if (to.path === '/system-admin' && role !== 'system_admin') return '/dashboard';
  if (role === 'shop_operator' && ['/products', '/customers', '/reports', '/shop-users', '/subscriptions'].includes(to.path)) return '/orders';
  
  return true;
});

export default router;
