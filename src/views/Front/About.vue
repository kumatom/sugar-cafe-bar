<template>
  <div class="container-lg">
    <div class="banner-view-about">
      <div class="row">
        <div class="col-12 col-md-6 px-3 d-flex align-items-center">
          <img class="img-fluid rounded" src="@/assets/images/msg-1.jpg" />
        </div>
        <div class="col-12 col-md-6 about-info text-white">
          <h2 class="mb-4">關於 Sugar Cafe Bar</h2>
          <p>
            Sugar Cafe Bar 是座落於 <strong>大稻埕碼頭附近</strong> 的咖啡廳。<br /><br />
            本店<strong>一樓為糖果鋪</strong>，販賣各式各樣的傳統零食與餅乾，因位於迪化街內，<strong
              >是每年過年必買年貨之一</strong
            >
            !<br /><br />
            咖啡廳位於二樓，<strong>提供午餐、下午茶及晚餐</strong>，與您度過悠閒的下午，緩解您一天的壓力。
          </p>
          <div class="mb-md-0 mb-1 text-primary">
            <hr />
            <p class="mb-1">
              <i class="bi bi-telephone-fill me-2"></i>
              02-2558-8306
            </p>
            <p class="mb-1">
              <i class="bi bi-geo-alt-fill me-2"></i>
              103台北市大同區民生西路350號2樓
            </p>
            <p class="mb-1">
              <i class="bi bi-clock-fill me-2"></i>
              營業時間 : 11:00 ~ 20:30 (每週一公休)
            </p>
          </div>
        </div>
      </div>
    </div>
    <AboutInfo :isShowMore="false" />
  </div>
</template>

<script>
import AboutInfo from '@/components/AboutDetail.vue';

export default {
  components: {
    AboutInfo,
  },
};
</script>
