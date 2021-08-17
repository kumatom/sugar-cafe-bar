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
        return 4;
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
    // 是否隨機挑選產品
    isRandom: {
      type: Boolean,
      default() {
        return false;
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
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
      tips: {
        data: {
          success: false,
          message: '糟糕，無法取得推薦清單!',
        },
      },
    };
  },
  inject: ['$httpMessageState'],
  methods: {
    // 取得隨機產品清單
    getRandomProducts() {
      let str = '';
      const number = [];
      for (let i = 0; i < this.limitCount; i += 1) {
        str = Math.round(Math.random() * 10);
        for (let j = 0; j < number.length; j += 1) {
          if (number[j] === str) {
            number.splice(j, 1);
            i -= 1;
          }
        }
        number.push(str);
      }

      number.forEach((num) => {
        this.products.forEach((item, key) => {
          if (key === num) {
            this.filterProducts.push(item);
          }
        });
      });

      // console.log(number);
    },
    // 取得推薦清單 (店長推薦)
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

            // 判斷是否取得隨機產品
            if (this.isRandom) {
              this.getRandomProducts();
            } else {
              this.products.forEach((item) => {
                if (recStrCategory !== '') {
                  // 取得不包含產品本身的推薦產品 (同類別)
                  if (item.id !== this.filterProduct.id && item.category === recStrCategory) {
                    if (this.productCount < this.limitCount) {
                      const tempItem = { ...item };
                      this.filterProducts.push(tempItem);
                      this.productCount += 1;
                    }
                  }
                } else if (item.title.includes(this.recStr)) {
                  // 產品筆數限制
                  if (this.productCount < this.limitCount) {
                    const tempItem = { ...item };
                    this.filterProducts.push(tempItem);
                    this.productCount += 1;
                  }
                }
              });
              // console.log(this.filterProducts);
            }
          } else {
            this.$httpMessageState(response, '取得推薦清單');
          }
        })
        .catch(() => {
          this.$httpMessageState(this.tips, '取得推薦清單');
        });
    },
  },
  mounted() {
    // console.log(this.limitCount);
    this.getProducts();
  },
};
</script>
