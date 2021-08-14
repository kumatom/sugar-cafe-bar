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

    <!-- 關於我們 -->
    <section class="about index-content">
      <h3 class="mb-3" data-aos="fade-right" data-aos-duration="1000">
        <i class="bi bi-shop"></i>
        關於我們
      </h3>
      <AboutInfo />
    </section>

    <!-- 推薦菜單 -->
    <section class="product index-content">
      <h3 class="mb-3" data-aos="fade-right" data-aos-duration="1000">
        <i class="bi bi-hand-thumbs-up-fill"></i>
        推薦菜單
      </h3>
      <div
        class="container-lg"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-anchor-placement="top-bottom"
      >
        <div class="row">
          <!-- 推薦產品清單 -->
          <ProductsCardSwiper :limitCount="4" />
        </div>
      </div>
    </section>
    <!-- 如何前往 -->
    <section class="map index-content">
      <h3
        class="mb-3"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <i class="bi bi-geo-alt-fill"></i>
        如何前往
      </h3>
      <div class="row">
        <!-- 引用 google maps -->
        <iframe
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
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
  <!-- 訂閱我們 -->
  <section class="subscription index-content">
    <div class="container-lg py-5">
      <div class="row">
        <div
          class="col-12 col-md-6 mb-3"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <h3 class="mb-3">
            <i class="bi bi-megaphone-fill"></i>
            訂閱我們
          </h3>
          <Form v-slot="{ errors }" @submit="onSubscribe">
            <div class="input-group mb-3">
              <Field
                id="email"
                name="訂閱信箱"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['訂閱信箱'] && isVerifyEmail }"
                :disabled="loadingStatus.loadingItem === 'email'"
                placeholder="請輸入訂閱電子信箱 (e.g. example@gmail.com)"
                rules="email|required"
                v-model="subscriptionEmail"
                @focus="isVerify(true)"
              ></Field>
              <button
                class="btn btn-secondary"
                type="submit"
                id="button-sub"
                :disabled="loadingStatus.loadingItem === 'email'"
                @click="isVerify(true)"
              >
                <div
                  class="spinner-border spinner-border-sm"
                  role="status"
                  v-if="loadingStatus.loadingItem === 'email'"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                立即訂閱
              </button>
              <ErrorMessage name="訂閱信箱" class="invalid-feedback"></ErrorMessage>
            </div>
          </Form>
        </div>
        <div
          class="col-12 col-md-6"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <h3 class="text-center">
            喜歡我們，也幫我們按個讚哦
            <a
              href="https://www.facebook.com/SugarCafeBar25588306"
              target="_blank"
              class="text-dark"
            >
              <i class="bi bi-hand-thumbs-up-fill"></i>
            </a>
          </h3>
          <div class="d-flex justify-content-center">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FSugarCafeBar25588306&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=437526387015576"
              width="340"
              height="300"
              style="border:none;overflow:hidden"
              scrolling="no"
              frameborder="0"
              allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductsCardSwiper from '@/components/RecProductsCard_Swiper.vue';
import AboutInfo from '@/components/AboutDetail.vue';

let messageImg;
let mainContainer;

export default {
  inheritAttrs: false,
  components: {
    ProductsCardSwiper,
    AboutInfo,
  },
  data() {
    return {
      // Loading物件
      loadingStatus: {
        loadingItem: '',
      },
      isVerifyEmail: true,
      subscriptionEmail: '',
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
      tips: {
        data: {
          success: true,
          message: '感謝您的訂閱，喜歡我們也幫我們按個讚!',
        },
      },
    };
  },
  inject: ['emitter', '$httpMessageState'],
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
    // 訂閱電子信箱
    onSubscribe() {
      this.loadingStatus.loadingItem = 'email';
      // 1秒後顯示「訂閱成功!」
      setTimeout(() => {
        this.loadingStatus.loadingItem = '';
        this.$httpMessageState(this.tips, '訂閱');
        this.isVerifyEmail = false;
        this.subscriptionEmail = '';
      }, 1000);
    },
    // 設定訂閱電子信箱是否驗證
    isVerify(verify) {
      this.isVerifyEmail = verify;
    },
  },
  mounted() {
    // 初始化「優惠訊息」
    this.showItem.imageUrl = this.messageList[0].imageUrl;
    messageImg = document.querySelector('.message img');
    this.emitter.emit('change-isLoading', true);
    setTimeout(() => {
      this.emitter.emit('change-isLoading', false);
      messageImg.classList.add('show');
    }, 500);

    // main-container 套用 mb-0
    mainContainer = document.querySelector('.main-container');
    mainContainer.classList.add('mb-0');
  },
  unmounted() {
    // main-container 移除 mb-0
    mainContainer.classList.remove('mb-0');
  },
};
</script>
