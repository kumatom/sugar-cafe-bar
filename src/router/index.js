import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  /** 前台頁面 */
  {
    path: '/',
    component: () => import('@/views/Front.vue'),
    children: [
      // 首頁
      {
        path: '',
        name: 'Index',
        component: () => import('@/views/Front/Index.vue'),
      },
      // 好食菜單
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/Front/Menu.vue'),
      },
      // 好食菜單 (產品詳細資訊)
      {
        path: 'product/:productId',
        name: 'Product',
        component: () => import('@/views/Front/ProductDetail.vue'),
      },
      // 關於我們
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/Front/About.vue'),
      },
    ],
  },
  /** 後台頁面 (含登入) */
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/backend',
    name: 'BackEnd',
    component: () => import('@/views/Backend/Backend.vue'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/Backend/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('@/views/Backend/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('@/views/Backend/Coupons.vue'),
      },
    ],
  },
  {
    path: '/backend/:pathMatch(.*)*',
    redirect: { name: 'BackEnd' },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
