<template>
  <div class="cart-wrapper">
    <div class="cart-wrapper-header">
      <i class="bi bi-arrow-right" @click="toggleShowCartWrapper"></i>
      <h3>訂餐清單 (1)</h3>
    </div>
    <div class="cart-wrapper-container">
      <div class="card"></div>
    </div>
  </div>
  <div class="sticky-top" style="background:#c2b188d1 !important;">
    <div class="container">
      <nav class="navbar px-0 navbar-expand-lg navbar-light">
        <router-link
          to="/"
          class="navbar-brand position-absolute"
          style="left: 50%; transform: translate(-50%, -50%); top: 50%;"
        >
          <img src="https://i.imgur.com/kUYxttR.png" alt="" width="45" class="me-3" />
          <span class="scb-nav-title text-secondary">Sugar Cafe' Bar</span>
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-filter-left" style="font-size:2rem;"></i>
        </button>

        <div class="collapse navbar-collapse custom-header-md-open" id="navbarNav">
          <ul class="navbar-nav">
            <li class="d-inline-block d-lg-none">
              <button
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                class="btn float-end close-btn"
              >
                <i class="bi bi-x-circle-fill" style="font-size:3rem;"></i>
              </button>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: pageName === navItem.menu.page }"
                to="/menu"
              >
                {{ navItem.menu.name }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: pageName === navItem.about.page }"
                to="/about"
              >
                {{ navItem.about.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 購物車按鈕 -->
        <div class="d-flex me-3 fun-bar">
          <a class="d-block" @click="toggleShowCartWrapper">
            <i class="bi bi-cart-fill"></i>
            <span class="cart-quantity">1</span>
          </a>
        </div>
      </nav>
    </div>
  </div>
  <div class="bg-primary banner-area">
    <div class="position-absolute scb-nav"></div>
    <div class="container d-flex flex-column banner">
      <div class="row justify-content-center my-auto banner-text">
        <div class="col-12 text-center">
          <section id="bannerView-index" v-if="pageName === 'Index'">
            <h1>與你一起享受悠閒時光</h1>
            <router-link to="/menu">
              <button type="button" class="btn btn-secondary btn-md">
                立即訂餐
                <!-- <i class="bi bi-chevron-right"></i> -->
              </button>
            </router-link>
          </section>
          <section id="bannerView-menu" v-if="pageName === navItem.menu.page">
            <h1>{{ navItem.menu.name }}</h1>
          </section>
          <section id="bannerView-about" v-if="pageName === navItem.about.page">
            <h1>{{ navItem.about.name }}</h1>
          </section>
          <section id="bannerView-product" v-if="pageName === navItem.product.page">
            <h1>{{ navItem.product.name }}</h1>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let cartWrapper = null;

export default {
  data() {
    return {
      isShowCartWrapper: false,
      navItem: {
        menu: {
          name: '好食菜單',
          page: 'Menu',
        },
        product: {
          name: '好食菜單/詳細資訊',
          page: 'Product',
        },
        about: {
          name: '關於我們',
          page: 'About',
        },
      },
      pageName: '',
    };
  },
  watch: {
    // 監聽 route 參數變化 (換頁)
    $route() {
      this.chagePage();
    },
  },
  methods: {
    // 切換頁面
    chagePage() {
      this.pageName = this.$route.name;
    },
    toggleShowCartWrapper() {
      if (!this.isShowCartWrapper) {
        cartWrapper.classList.add('show');
        this.isShowCartWrapper = true;
      } else {
        cartWrapper.classList.remove('show');
        this.isShowCartWrapper = false;
      }
    },
  },
  created() {
    this.chagePage();
  },
  mounted() {
    cartWrapper = document.querySelector('.cart-wrapper');
  },
};
</script>
