<template>
  <div class="card product-card">
    <div class="product-img">
      <img class="img-fluid" :src="product.imageUrl" height="220" />
      <div class="mask">
        <a @click.prevent="viewProductDetail(product.id)">
          詳細資訊
        </a>
      </div>
    </div>
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h5>{{ product.title }}</h5>
        <span class="badge rounded-pill bg-primary h5">{{ product.category }}</span>
      </div>
      <p class="text-white">{{ product.description }}</p>
    </div>
    <div class="card-footer">
      <span class="price">NT${{ $filters.currency(product.price) }} / {{ product.unit }}</span>
      <hr />
      <div class="d-flex justify-content-end">
        <button type="button" v-if="product.isAddCart" class="btn btn-primary btn-md disabled">
          已加入訂餐
          <i class="bi bi-check-circle-fill"></i>
        </button>
        <button type="button" v-else class="btn btn-primary btn-md" @click.prevent="addCart">
          加入訂餐
          <i class="bi bi-plus-circle"></i>
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
    // 加入至購物車 (訂餐清單)
    addCart() {
      // console.log(this.product.id);
      this.tips.data.success = true;
      this.tips.data.message = `${this.product.title} 已加入至訂餐清單!`;
      this.$httpMessageState(this.tips, '加入訂餐清單');
    },
    // 檢視產品詳細資訊
    viewProductDetail(productId) {
      this.$router.push(`/product/${productId}`);
    },
  },
};
</script>
