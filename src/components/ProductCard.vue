<template>
  <div class="card product-card">
    <div class="product-card-touch" @click="viewProductDetail(product.id)">
      <div class="product-img">
        <img class="img-fluid" :src="product.imageUrl" height="220" :alt="product.imageUrl" />
        <div class="mask">
          <a href="#" @click.prevent="viewProductDetail(product.id)">
            詳細資訊
          </a>
        </div>
      </div>
      <div class="card-body">
        <span class="badge rounded-pill bg-primary mb-3">{{ product.category }}</span>
        <h5>{{ product.title }}</h5>
        <p class="text-white">{{ product.description }}</p>
      </div>
    </div>
    <div class="card-footer">
      <span class="price">NT${{ $filters.currency(product.price) }} / {{ product.unit }}</span>
      <hr />
      <div class="d-flex justify-content-end">
        <button
          type="button"
          class="btn btn-primary btn-lg"
          :disabled="loadingStatus.loadingItem === product.id"
          @click.prevent="addCart"
        >
          <div
            class="spinner-border spinner-border-sm"
            role="status"
            v-if="loadingStatus.loadingItem === product.id"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
          <div :class="{ 'd-none': loadingStatus.loadingItem === product.id }">
            加入訂餐
            <i class="bi bi-plus-circle"></i>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // API路徑
      baseAPI: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      // Loading物件
      loadingStatus: {
        loadingItem: '',
      },
      qty: 1,
      tips: {
        data: {
          success: false,
          message: '該商品已加入至訂餐清單囉~',
        },
      },
    };
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    // 設定通知訊息
    setTips(status, message) {
      this.tips = {
        data: {
          success: status,
          message,
        },
      };
    },
    // 加入至購物車 (訂餐清單)
    addCart() {
      this.loadingStatus.loadingItem = this.product.id;
      const cartItem = {
        product_id: this.product.id,
        qty: this.qty,
      };
      const api = `${this.baseAPI}/cart`;
      this.$http
        .post(api, { data: cartItem })
        .then((res) => {
          if (res.data.success) {
            this.setTips(true, `${this.product.title} 已加入至訂餐清單!`);
            this.$httpMessageState(this.tips, '加入訂餐清單');
            this.loadingStatus.loadingItem = '';
            // 取得訂餐清單
            this.emitter.emit('get-cart');
          }
        })
        .catch(() => {
          this.loadingStatus.loadingItem = '';
          this.setTips(false, '糟糕，無法加入訂餐清單!');
          this.$httpMessageState(this.tips, '訂餐清單加入');
        });
    },
    // 檢視產品詳細資訊
    viewProductDetail(productId) {
      this.$router.push(`/product/${productId}`);
    },
  },
};
</script>
