<!-- 推薦產品清單 -->
<template>
  <swiper
    :options="swiperOptions"
    :breakpoints="breakpoints"
    navigation
    :pagination="{ clickable: true }"
  >
    <swiper-slide v-for="product in filterProducts" :key="product.id">
      <ProductCard :product="product"> </ProductCard>
    </swiper-slide>
    <div class="swiper-pagination"></div>
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
// import Swiper core and required modules
import SwiperCore, {
  Navigation, Pagination, Scrollbar, A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

// '產品卡片' 元件
import ProductCard from './ProductCard.vue';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default {
  components: {
    Swiper,
    SwiperSlide,
    ProductCard,
  },
  props: {
    // 限制項目筆數
    limitCount: {
      type: Number,
      default() {
        return 3;
      },
    },
    // 篩選產品
    filterProduct: {
      type: Object,
      default() {
        return {
          name: '',
          category: '',
        };
      },
    },
  },
  watch: {
    // 監聽是否有變動推薦產品
    filterProduct() {
      // console.log(this.filterProduct);
      this.getProducts();
    },
  },
  data() {
    return {
      // API路徑
      baseAPI: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      // 推薦產品
      products: [],
      filterProducts: [],
      recStr: '店長推薦',
      productCount: 1,
      // Swiper
      swiperOptions: {
        pagination: '.swiper-pagination',
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    };
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    // 取得產品清單 (店長推薦)
    getProducts() {
      const api = `${this.baseAPI}/products/all`;
      this.$http
        .get(api)
        .then((response) => {
          if (response.data.success) {
            this.products = response.data.products;
            // 判斷是否有推薦產品類別
            const recStrCategory = this.filterProduct.category !== '' ? this.filterProduct.category : '';
            // 取得推薦產品
            this.productCount = 0;
            this.filterProducts = [];
            this.products.forEach((item) => {
              if (recStrCategory !== '') {
                // 取得不包含產品本身的推薦產品
                if (item.category === recStrCategory && item.title !== this.filterProduct.name) {
                  if (this.productCount < this.limitCount) {
                    const tempItem = { ...item };
                    // tempItem.isAddCart = true;
                    this.filterProducts.push(tempItem);
                    this.productCount += 1;
                  }
                }
              } else if (item.title.includes(this.recStr)) {
                // 產品筆數限制
                if (this.productCount < this.limitCount) {
                  const tempItem = { ...item };
                  // tempItem.isAddCart = true;
                  this.filterProducts.push(tempItem);
                  this.productCount += 1;
                }
              }
            });
            // console.log(this.filterProducts);
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
    // console.log(this.limitCount);
    this.getProducts();
  },
};
</script>
