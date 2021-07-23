<template>
  <Loading :active="isLoading" :z-index="1070"></Loading>
  <!-- v-if="product.id" 用於判斷產品是否載入完成 -->
  <div class="container-lg productDetail-container" v-if="product.id">
    <div class="row mb-3">
      <div class="col-md-6 productDetail-img mb-3">
        <img :src="product.imageUrl" class="img-fluid rounded" width="500" />
      </div>
      <div class="col-md-6 productDetailInfo">
        <span class="badge rounded-pill bg-secondary h5">{{ product.category }}</span>
        <h2>{{ product.title }}</h2>
        <p class="h5 mb-0 text-muted text-end">
          <del>NT$ {{ $filters.currency(product.origin_price) }} / {{ product.unit }} </del>
        </p>
        <p class="h3 fw-bold text-end">
          NT$ {{ $filters.currency(product.price) }} / {{ product.unit }}
        </p>
        <div class="row align-items-center">
          <div class="col-6">
            <div class="input-group my-3 bg-light rounded">
              <div class="input-group-prepend">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  @click.prevent="dashNumber"
                >
                  <i class="bi bi-dash"></i>
                </button>
              </div>
              <input
                type="text"
                class="form-control border-0 text-center my-auto shadow-none bg-light"
                placeholder=""
                v-model.number="cart.quantity"
                disabled
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  @click.prevent="addNumber"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-6">
            <button type="button" class="text-nowrap btn btn-dark w-100 py-2">
              加入訂餐
              <i class="bi bi-plus-circle"></i>
            </button>
          </div>
        </div>
        <div class="product-description" v-if="product.description">
          <span>好食說明</span>
          <p>{{ product.description }}</p>
          <!-- <p>{{ product.content }}</p> -->
        </div>
      </div>
    </div>
    <!-- 好食推薦 -->
    <section class="product-recommand">
      <h3 class="mb-3">
        <i class="bi bi-hand-thumbs-up-fill"></i>
        好食推薦
      </h3>
      <div class="container-lg">
        <div class="row">
          <!-- 好食推薦清單 -->
          <ProductsCardSwiper :limitCount="999" :filterProduct="recProduct" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductsCardSwiper from '@/components/RecProductsCard_Swiper.vue';

export default {
  components: {
    ProductsCardSwiper,
  },
  data() {
    return {
      isLoading: false,
      // API路徑
      baseAPI: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      // 產品
      product: {},
      productId: '',
      cart: {
        quantity: 1,
      },
      recProduct: {
        name: '',
        category: '',
      },
    };
  },
  watch: {
    // 監聽 route 參數變化 (切換推薦產品)
    $route() {
      // 取得產品ID
      this.productId = this.$route.params.productId;
      this.getProduct();
    },
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    // 更改Loading狀態
    chageLoadingStatus(status) {
      this.isLoading = status;
    },
    // 自動置頂
    autoScrollTop() {
      document.querySelector('html').scrollTop = 0;
    },
    // 取得單一產品
    getProduct() {
      this.chageLoadingStatus(true);
      const api = `${this.baseAPI}/product/${this.productId}`;
      this.$http
        .get(api)
        .then((response) => {
          this.chageLoadingStatus(false);
          if (response.data.success) {
            // 取得單一產品
            const tempItem = { ...response.data.product };
            // 檢查是否有加入購物車
            tempItem.isAddCart = true;
            this.product = { ...tempItem };
            // 取得推薦產品資訊
            this.recProduct = {
              name: this.product.title,
              category: this.product.category,
            };
            this.autoScrollTop();
            // console.log(this.product);
          } else {
            // this.$httpMessageState(response, '產品列表');
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    dashNumber() {
      if (this.cart.quantity > 1) {
        this.cart.quantity -= 1;
      }
    },
    addNumber() {
      this.cart.quantity += 1;
    },
  },
  mounted() {
    // 取得產品ID
    this.productId = this.$route.params.productId;
    // 載入單一產品
    this.getProduct();
    // console.log(this.$route);
  },
};
</script>
