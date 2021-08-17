<template>
  <div class="sticky-top" style="background:#c2b188d1 !important;">
    <div class="container-lg">
      <nav class="navbar px-0 navbar-expand-lg navbar-light">
        <router-link
          to="/"
          class="navbar-brand position-absolute scb-logo"
          style="left: 50%; transform: translate(-50%, -50%); top: 50%;"
        >
          <img src="@/assets/images/logo-scb.png" alt="" width="45" class="me-3" />
          <span class="scb-nav-title text-secondary">Sugar Cafe' Bar</span>
        </router-link>
        <button
          id="navMenuBtn"
          class="btn btn-primary d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas-sm-menu"
          aria-controls="offcanvas-sm-menu"
        >
          <i class="bi bi-list" style="font-size:1.5rem;"></i>
        </button>

        <!-- 自製手機版選單 -->
        <div
          class="offcanvas offcanvas-start d-lg-none"
          tabindex="-1"
          id="offcanvas-sm-menu"
          aria-labelledby="offcanvas-sm-menuLabel"
        >
          <div class="offcanvas-header">
            <h3 class="offcanvas-title" id="offcanvas-sm-menuLabel">導覽選單</h3>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{ active: pageName === navItem.menu.page }"
                  :to="navItem.menu.url"
                  data-bs-dismiss="offcanvas"
                >
                  <i class="bi bi-basket me-2"></i>
                  {{ navItem.menu.name }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{ active: pageName === navItem.about.page }"
                  :to="navItem.about.url"
                  data-bs-dismiss="offcanvas"
                >
                  <i class="bi bi-shop me-2"></i>
                  {{ navItem.about.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <!-- 自製手機版選單 END-->

        <div class="collapse navbar-collapse" id="navbarNav">
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
                :to="navItem.menu.url"
              >
                {{ navItem.menu.name }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: pageName === navItem.about.page }"
                :to="navItem.about.url"
              >
                {{ navItem.about.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 購物車按鈕 -->
        <div class="d-flex me-3 fun-bar d-none d-md-block">
          <a
            href="#"
            id="nav-cart-btn"
            class="d-block cart-btn"
            data-bs-toggle="offcanvas"
            data-bs-target="#cartListWrapper"
            aria-controls="cartListWrapper"
            @click.prevent="getCart"
          >
            <i class="bi bi-cart-fill"></i>
            <span class="cart-quantity" v-if="cart?.carts?.length">{{ cart?.carts?.length }}</span>
          </a>
        </div>
        <!-- 訂餐清單(cart-warpper) -->
        <div
          class="offcanvas offcanvas-end cart-wrapper"
          tabindex="-1"
          id="cartListWrapper"
          aria-labelledby="cartListWrapperLabel"
        >
          <div class="offcanvas-header">
            <h3 class="offcanvas-title" id="cartListWrapperLabel">訂餐清單</h3>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div
            class="offcanvas-body"
            :class="{ 'd-flex align-items-center': !cart?.carts?.length }"
          >
            <div class="cart-none-content" v-if="!cart?.carts?.length">
              <h2 class="fw-bold mb-3">還沒點餐嗎?</h2>
              <router-link to="/menu">
                <button type="button" class="btn btn-secondary btn-md" data-bs-dismiss="offcanvas">
                  立即點餐
                  <i class="bi bi-arrow-right"></i>
                </button>
              </router-link>
            </div>
            <!-- 這裡產生訂餐清單 -->
            <div class="card mb-3" v-for="cart in cart.carts" :key="cart.id">
              <div class="row g-0">
                <div class="col-4 d-flex align-items-center justify-content-center">
                  <a
                    href="#"
                    @click.prevent="viewProductDetail(cart.product_id)"
                    data-bs-dismiss="offcanvas"
                  >
                    <img class="img-fluid" :src="cart.product.imageUrl" />
                  </a>
                </div>
                <div class="col-8">
                  <div class="card-body">
                    <p class="card-title">
                      {{ cart.product.title }}
                    </p>
                    <p class="price">
                      NT${{ $filters.currency(cart.product.price) }} / {{ cart.product.unit }}
                    </p>
                  </div>
                </div>
                <div class="card-footer">
                  <h5 class="text-primary text-end price">
                    <div
                      class="spinner-border spinner-border-sm text-primary me-2"
                      role="status"
                      v-if="loadingStatus.loadingItem === cart.id"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    小計 : NT${{ $filters.currency(cart.product.price * cart.qty) }}
                  </h5>
                  <div class="row align-items-center">
                    <div class="col-4">
                      <button
                        type="button"
                        class="text-nowrap btn btn-secondary text-primary w-100"
                        :disabled="loadingStatus.loadingItem === cart.id"
                        @click="deleteCart(cart.id)"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                    <div class="col-8">
                      <div class="input-group my-3 bg-light rounded">
                        <div class="input-group-prepend">
                          <button
                            class="btn btn-outline-dark border-0 py-2"
                            type="button"
                            :disabled="cart.qty === 1 || loadingStatus.loadingItem === cart.id"
                            @click="updateCart(cart, -1)"
                          >
                            <i class="bi bi-dash"></i>
                          </button>
                        </div>
                        <input
                          type="text"
                          class="form-control border-0 text-center my-auto shadow-none bg-light"
                          placeholder=""
                          v-model.number="cart.qty"
                          disabled
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-dark border-0 py-2"
                            type="button"
                            :disabled="loadingStatus.loadingItem === cart.id"
                            @click="updateCart(cart, 1)"
                          >
                            <i class="bi bi-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="card"
            v-if="cart?.carts?.length"
            style="width: 100%;
                      background: #524538;
                      padding:1rem;
                      border-radius: 0;"
          >
            <div class="text-primary text-center mb-2" v-if="cart?.carts[0]?.coupon">
              已套用優惠券
              <span>
                {{ cart?.carts[0]?.coupon.code }}
                ({{ cart?.carts[0]?.coupon.title }})
              </span>
            </div>
            <div
              class="mb-2 text-light text-end"
              :class="{ 'd-flex justify-content-between': cart?.carts[0]?.coupon }"
            >
              <h5>
                總計 : <span class="price">NT${{ $filters.currency(cart.total) }}</span>
              </h5>
              <h5 class="text-danger" v-if="cart?.carts[0]?.coupon">
                折扣後 : <span class="price">NT${{ $filters.currency(cart.final_total) }}</span>
              </h5>
            </div>
            <router-link to="/order">
              <button
                type="button"
                class="btn btn-primary w-100 py-3"
                style="font-size:1.25rem;"
                data-bs-dismiss="offcanvas"
              >
                結帳去
                <i class="bi bi-arrow-right"></i>
              </button>
            </router-link>

            <button type="button" class="btn btn-dark text-primary mt-3" @click="deleteCart('all')">
              <div
                class="spinner-border spinner-border-sm text-primary"
                role="status"
                v-if="loadingStatus.loadingItem === 'all'"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <div :class="{ 'd-none': loadingStatus.loadingItem === 'all' }">
                清空訂餐清單
                <i class="bi bi-trash"></i>
              </div>
            </button>
          </div>
        </div>
        <!-- 訂餐清單(cart-warpper) END -->
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
              <button type="button" class="btn btn-secondary btn-lg">
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
            <h1>
              <router-link :to="navItem.menu.url">
                {{ navItem.menu.name }}
              </router-link>
              / {{ navItem.product.name }}
            </h1>
          </section>
        </div>
      </div>
    </div>
  </div>
  <!-- 懸浮購物車按鈕 -->
  <div class="floating-cart-btn d-md-none">
    <a
      id="floating-cart-btn"
      class="d-block cart-btn"
      data-bs-toggle="offcanvas"
      data-bs-target="#cartListWrapper"
      aria-controls="cartListWrapper"
      @click.prevent="getCart"
    >
      <i class="bi bi-cart-fill"></i>
      <span class="cart-quantity" v-if="cart?.carts?.length">{{ cart?.carts?.length }}</span>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // API路徑
      baseAPI: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      // Loading物件
      loadingStatus: {
        loadingItem: '',
      },
      navItem: {
        index: {
          url: '/',
          name: '首頁',
          page: 'Index',
        },
        menu: {
          url: '/menu',
          name: '好食菜單',
          page: 'Menu',
        },
        product: {
          url: '/product',
          name: '詳細資訊',
          page: 'Product',
        },
        about: {
          url: '/about',
          name: '關於我們',
          page: 'About',
        },
      },
      pageName: '',
      cart: {},
      tips: {
        data: {
          success: false,
          message: '糟糕，目前沒有可以更新的餐點哦!',
        },
      },
    };
  },
  watch: {
    // 監聽 route 參數變化 (換頁)
    $route() {
      // console.log(this.$route);
      this.chagePage();
    },
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    // 切換頁面
    chagePage() {
      this.pageName = this.$route.name;
    },
    // 取得訂餐清單
    getCart() {
      const api = `${this.baseAPI}/cart`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data;
          }
        })
        .catch(() => {
          this.setTips(false, '糟糕，無法取得訂餐清單!');
          this.$httpMessageState(this.tips, '訂餐清單取得');
        });
    },
    // 更新訂餐清單
    updateCart(cart, qty) {
      this.loadingStatus.loadingItem = cart.id;
      const computeQty = cart.qty + qty;
      // console.log(computeQty);
      if (computeQty >= 1) {
        const cartItem = {
          product_id: cart.product.id,
          qty: computeQty,
        };
        const api = `${this.baseAPI}/cart/${cart.id}`;
        this.$http
          .put(api, { data: cartItem })
          .then((res) => {
            // console.log(res);
            if (res.data.success) {
              // ...
            } else {
              this.$httpMessageState(this.tips, '訂餐清單');
            }
            this.loadingStatus.loadingItem = '';
            // 更新購物車
            this.getCart();
          })
          .catch(() => {
            this.loadingStatus.loadingItem = '';
            this.setTips(false, '糟糕，無法更新訂餐清單!');
            this.$httpMessageState(this.tips, '訂餐清單更新');
          });
      }
    },
    // 刪除訂餐清單 (單一/全部)
    deleteCart(id) {
      this.loadingStatus.loadingItem = id;
      let api = `${this.baseAPI}/carts`;
      if (id !== 'all') {
        api = `${this.baseAPI}/cart/${id}`;
      }

      this.$http
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            // ...
          } else {
            this.tips.data.message = '糟糕，目前沒有可刪除的餐點哦!';
            this.$httpMessageState(this.tips, '訂餐清單');
          }
          this.getCart();
          this.loadingStatus.loadingItem = '';
        })
        .catch(() => {
          this.loadingStatus.loadingItem = '';
          this.setTips(false, '糟糕，無法刪除訂餐清單!');
          this.$httpMessageState(this.tips, '訂餐清單刪除');
        });
    },
    // 檢視產品詳細資訊
    viewProductDetail(productId) {
      this.$router.push(`/product/${productId}`);
    },
  },
  mounted() {
    this.getCart();
    this.chagePage();
    // 註冊取得訂餐清單事件
    this.emitter.on('get-cart', () => {
      this.getCart();
    });
  },
  unmounted() {
    // 移除註冊取得訂餐清單事件
    this.emitter.off('get-cart', () => {
      this.getCart();
    });
  },
};
</script>
