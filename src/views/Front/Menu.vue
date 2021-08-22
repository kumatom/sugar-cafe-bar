<template>
  <section class="menuClass menu-content">
    <div class="container-fluid">
      <div class="row justify-content-center my-auto menu-fun-bar">
        <!-- 菜單類別 -->
        <div
          v-for="category in categoryList"
          class="text-center d-none d-md-block"
          :class="category.column"
          :key="category.id"
        >
          <!-- 一般選單 -->
          <div class="menu-fun-bar-item">
            <a
              href="#"
              :class="{ active: currentCategory === category.id }"
              @click.prevent="changeCategory(category.id)"
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
        <!-- 手機版選單 -->
        <div class="menu-fun-bar-select d-md-none">
          <h5 class="text-white">目前選取的菜單</h5>
          <div class="show-menu-item">
            <i :class="smallMenu.icon" class="text-primary"></i>
            <h3 class="d-inline text-primary mx-3">
              {{ smallMenu.name }} <span>({{ smallMenu.comment }})</span>
            </h3>
          </div>
          <button
            type="button"
            class="btn btn-primary btn-lg float-end"
            data-bs-toggle="offcanvas"
            data-bs-target="#smallMenuCategory"
            aria-controls="smallMenuCategory"
          >
            切換菜單
            <i class="bi bi-arrow-left-right"></i>
          </button>
          <div
            class="offcanvas offcanvas-bottom"
            tabindex="-1"
            id="smallMenuCategory"
            aria-labelledby="smallMenuCategoryLabel"
          >
            <div class="offcanvas-header">
              <h3 class="offcanvas-title text-primary" id="smallMenuCategoryLabel">菜單類別</h3>
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body small">
              <div class="row gx-1 gy-3">
                <div class="col-6" v-for="category in categoryList" :key="category.id">
                  <div class="menu-fun-bar-item">
                    <a
                      href="#"
                      :class="{ active: currentCategory === category.id }"
                      @click.prevent="changeCategory(category.id)"
                      data-bs-dismiss="offcanvas"
                    >
                      <h3>
                        <i :class="category.icon"></i>
                        <p>
                          {{ category.name }}<br />
                          <span class="comment">{{ category.comment }}</span>
                        </p>
                      </h3>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 手機版選單 END-->
      </div>
    </div>
  </section>

  <!-- 菜單內容 -->
  <section class="product menu-content">
    <div class="container-fluid">
      <div class="row justify-content-center gy-3 gx-3">
        <!-- 產品清單 -->
        <div
          v-for="product in filterProducts"
          class="col-12 col-sm-6 col-md-4 col-xl-3"
          :key="product.id"
        >
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
  inject: ['emitter', '$httpMessageState'],
  data() {
    return {
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
      // 手機版選單資訊
      smallMenu: {},
      tips: {
        data: {
          success: false,
          message: '糟糕，取不到菜單哦!',
        },
      },
    };
  },
  methods: {
    // 切換菜單類別
    changeCategory(key) {
      this.currentCategory = key;
      this.smallMenu = { ...this.categoryList[key] };
      this.getfilterCategoryProducts();
    },
    // 取得對應類別產品 (菜單)
    getfilterCategoryProducts() {
      this.filterProducts = [];
      this.products.forEach((item) => {
        // 取得目前選取的 '類別代號'
        const id = this.currentCategory;
        const category = this.categoryList.filter((obj) => obj.id === id);
        const { name } = category[0];
        // 檢查是否有相同類別的產品(菜單)
        const isCheck = id === 0 ? item.title.includes(name) : name === item.category;
        if (isCheck) {
          const tempItem = { ...item };
          this.filterProducts.push(tempItem);
        }
      });
    },
    // 取得菜單
    getProducts() {
      const api = `${this.baseAPI}/products/all`;
      this.emitter.emit('change-isLoading', true);
      this.$http
        .get(api)
        .then((response) => {
          this.emitter.emit('change-isLoading', false);
          if (response.data.success) {
            this.products = response.data.products;
            // 取得(菜單類別)
            this.getfilterCategoryProducts();
          } else {
            this.$httpMessageState(response, '菜單取得');
          }
        })
        .catch(() => {
          this.$httpMessageState(this.tips, '菜單取得');
        });
    },
  },
  mounted() {
    this.getProducts();
    // 預設菜單類別為第一筆
    this.changeCategory(0);
  },
};
</script>
