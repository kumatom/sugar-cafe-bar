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
      // 建立訂單 (結帳)
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/Front/Order.vue'),
      },
      // 關於我們
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/Front/About.vue'),
      },
      {
        path: '/product/:pathMatch(.*)*',
        component: () => import('@/views/Front/NotFoundProduct.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/Front/NotFound.vue'),
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
    component: () => import('@/views/Backend/Backend.vue'),
    children: [
      {
        path: '',
        name: 'products',
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
  // {
  //   path: '/backend/:pathMatch(.*)*',
  //   redirect: { name: 'BackEnd' },
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
