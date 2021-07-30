<template>
  <div class="container-lg">
    <!-- 優惠訊息 -->
    <section class="message index-content">
      <div class="card">
        <div class="card-body">
          <h3 class="mb-3">
            <i class="bi bi-exclamation-circle-fill"></i>
            優惠訊息
          </h3>
          <div class="row">
            <div class="col-md-6 col-lg-4 d-flex justify-content-center">
              <img class="img-fluid rounded fade" :src="showItem.imageUrl" width="500" />
            </div>
            <div class="col-md-6 col-lg-8">
              <ul id="message-list" class="list-group list-group-flush">
                <li
                  class="list-group-item list-group-item-action"
                  :class="{ active: showItem.no === 0 }"
                  @click="chageMsgList(0)"
                >
                  <i class="bi bi-arrow-right-short" v-if="showItem.no === 0"></i>
                  慶祝 Sugar Cafe Bar 周年慶，<strong>期間消費全單 85 折 !</strong>
                </li>
                <li
                  class="list-group-item list-group-item-action"
                  :class="{ active: showItem.no === 1 }"
                  @click="chageMsgList(1)"
                >
                  <i class="bi bi-arrow-right-short" v-if="showItem.no === 1"></i>
                  尋寶活動開始囉 ! <br />找到圖片中的「小松鼠」，<strong
                    >並拍照打卡即可享有 9 折優惠 ~</strong
                  >
                </li>
                <li
                  class="list-group-item list-group-item-action"
                  :class="{ active: showItem.no === 2 }"
                  @click="chageMsgList(2)"
                >
                  <i class="bi bi-arrow-right-short" v-if="showItem.no === 2"></i>
                  來一杯咖啡，與您度過悠閒時光
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 推薦菜單 -->
    <section class="product index-content">
      <h3 class="mb-3">
        <i class="bi bi-hand-thumbs-up-fill"></i>
        推薦菜單
      </h3>
      <div class="container-lg">
        <div class="row">
          <!-- 推薦產品清單 -->
          <ProductsCardSwiper :limitCount="3" />
        </div>
      </div>
    </section>
    <!-- 如何前往 -->
    <section class="map index-content">
      <h3 class="mb-3">
        <i class="bi bi-geo-alt-fill"></i>
        如何前往
      </h3>
      <div class="row">
        <!-- 引用 google maps -->
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14457.318278884872!2d121.510763!3d25.0568165!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2efcde4aaa48f134!2sSugar%20Cafe%20Bar!5e0!3m2!1szh-TW!2stw!4v1626619585230!5m2!1szh-TW!2stw"
          width="600"
          height="450"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  </div>
</template>

<script>
import ProductsCardSwiper from '@/components/RecProductsCard_Swiper.vue';

let messageImg;

export default {
  inheritAttrs: false,
  components: {
    ProductsCardSwiper,
  },
  data() {
    return {
      showItem: {
        no: 0,
        imageUrl: '',
      },
      messageList: [
        {
          imageUrl: 'https://i.imgur.com/RqJZAK5.jpg',
        },
        {
          imageUrl: 'https://i.imgur.com/PbFDA2S.jpg',
        },
        {
          imageUrl: 'https://i.imgur.com/xpb12kV.jpg',
        },
      ],
    };
  },
  inject: ['emitter'],
  methods: {
    // 點選優惠訊息切換
    chageMsgList(number) {
      // 編號不同再執行切換
      if (number !== this.showItem.no) {
        this.showItem.no = number;
        messageImg.classList.remove('show');
        setTimeout(() => {
          this.showItem.imageUrl = this.messageList[number].imageUrl;
          messageImg.classList.add('show');
        }, 200);
      }
    },
  },
  mounted() {
    this.showItem.imageUrl = this.messageList[0].imageUrl;
    messageImg = document.querySelector('.message img');
    this.emitter.emit('change-isLoading', true);
    setTimeout(() => {
      this.emitter.emit('change-isLoading', false);
      messageImg.classList.add('show');
    }, 500);
  },
};
</script>
