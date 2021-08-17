<template>
  <div class="row flex-md-row flex-column mb-3">
    <div class="col-12 col-md-6 mb-4" data-aos="zoom-in" data-aos-duration="1000">
      <img
        class="img-fluid shadow-lg rounded"
        style="opacity:0.9"
        src="@/assets/images/about-1.jpg"
        alt=""
      />
    </div>
    <div
      data-aos="fade-up"
      data-aos-duration="1500"
      class="col-12 col-md-6 mt-4 mb-4
              d-flex align-items-center
              flex-column justify-content-center"
    >
      <h3 class="mb-4">開放 & 便利的空間</h3>
      <p><i class="bi bi-check2"></i> 擁有寬廣的座位與絕佳的視野，與您一起度過悠閒下午</p>
      <p>
        <i class="bi bi-check2"></i> 我們提供
        <strong>Wifi <i class="bi bi-wifi"></i>、充電插座 <i class="bi bi-plug-fill"></i></strong>
        供用餐者使用
      </p>
      <router-link to="/about" v-if="isShowMore">
        <button type="button" class="btn btn-outline-dark btn-lg mt-4">
          了解更多
          <i class="bi bi-arrow-right"></i>
        </button>
      </router-link>
    </div>
  </div>
  <div class="row flex-md-row flex-column-reverse">
    <div
      data-aos="fade-up"
      data-aos-duration="1500"
      class="col-12 col-md-6 mt-4
              d-flex align-items-center
              flex-column justify-content-center"
    >
      <h3 class="mb-4">舒適 & 悠閒的場所</h3>
      <p><i class="bi bi-check2"></i> 本店採半自助式，免收服務費</p>
      <p><i class="bi bi-check2"></i> 餐點一律現點現做，請您耐心等候</p>
      <router-link to="/about" v-if="isShowMore">
        <button type="button" class="btn btn-outline-dark btn-lg mt-4">
          了解更多
          <i class="bi bi-arrow-right"></i>
        </button>
      </router-link>
    </div>
    <div class="col-12 col-md-6 mb-4" data-aos="zoom-in" data-aos-duration="1000">
      <img
        class="img-fluid shadow-lg rounded"
        style="opacity:0.9"
        src="@/assets/images/about-2.jpg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShowMore: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
};
</script>
