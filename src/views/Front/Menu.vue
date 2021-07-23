<template>
  <Loading :active="isLoading" :z-index="1070"></Loading>
  <section class="menuClass menu-content">
    <div class="container-fluid">
      <div class="row justify-content-center my-auto menu-fun-bar">
        <!-- 菜單類別 -->
        <div
          v-for="category in categoryList"
          class="text-center"
          :class="category.column"
          :key="category.id"
        >
          <div class="menu-fun-bar-item">
            <a
              :class="{ active: currentCategory === category.id }"
              @click="changeCategory(category.id)"
            >
              <h3>
                <i :class="category.icon"></i>
                <p class="menu-fun-bar-item-text">
                  {{ category.name }}<br />
                  <span class="comment">{{ category.comment }}</span>
                </p>
              </h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 菜單 -->
  <section class="product menu-content">
    <div class="container-lg">
      <div class="row gy-3 gx-3">
        <!-- 產品清單 -->
        <div v-for="product in filterProducts" class="col-6 col-md-4 col-lg-3" :key="product.id">
          <ProductCard :product="product"> </ProductCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// '產品卡片' 元件
import ProductCard from '@/components/ProductCard.vue';

export default {
  inheritAttrs: false,
  components: {
    ProductCard,
  },
  data() {
    return {
      isLoading: false,
      // API路徑
      baseAPI: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      currentCategory: 0,
      categoryList: [
        {
          id: 0,
          name: '店長推薦',
          icon: 'bi bi-star-fill',
          comment: '不吃不行',
          column: 'col-6 col-md-3 col-lg-2',
        },
        {
          id: 1,
          name: '好香',
          icon: 'bi bi-droplet-fill',
          comment: '最愛甜食',
          column: 'col-6 col-md-3 col-lg-2',
        },
        {
          id: 2,
          name: '好食',
          icon: 'bi bi-egg-fill',
          comment: '吃飽滿足',
          column: 'col-4 col-md-3 col-lg-2',
        },
        {
          id: 3,
          name: '好喝',
          icon: 'bi bi-cup-straw',
          comment: '不可不喝',
          column: 'col-4 col-md-3 col-lg-2',
        },
        {
          id: 4,
          name: '好點',
          icon: 'bi bi-hand-index-fill',
          comment: '不夠再點',
          column: 'col-4 col-md-3 col-lg-2',
        },
      ],
      products: [],
      filterProducts: [],
    };
  },
  methods: {
    // 更改Loading狀態
    chageLoadingStatus(status) {
      this.isLoading = status;
    },
    // 自動置頂
    autoScrollTop() {
      document.querySelector('html').scrollTop = 0;
    },
    // 切換產品類別
    changeCategory(key) {
      this.currentCategory = key;
      this.getfilterCategoryProducts();
    },
    // 取得對應類別產品
    getfilterCategoryProducts() {
      this.filterProducts = [];
      this.products.forEach((item) => {
        // 取得目前選取的 '類別代號'
        const id = this.currentCategory;
        const category = this.categoryList.filter((obj) => obj.id === id);
        const { name } = category[0];
        // 檢查是否有相同類別的產品
        const isCheck = id === 0 ? item.title.includes(name) : name === item.category;
        if (isCheck) {
          const tempItem = { ...item };
          // 檢查是否已加入至購物車
          tempItem.isAddCart = false;
          this.filterProducts.push(tempItem);
        }
      });
    },
    // 取得產品清單
    getProducts() {
      const api = `${this.baseAPI}/products/all`;
      this.chageLoadingStatus(true);
      this.$http
        .get(api)
        .then((response) => {
          this.chageLoadingStatus(false);
          if (response.data.success) {
            this.products = response.data.products;
            // 取得(類別) 產品清單
            this.getfilterCategoryProducts();
          } else {
            // this.$httpMessageState(response, '產品列表');
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  mounted() {
    this.getProducts();
    this.autoScrollTop();
  },
};
</script>
