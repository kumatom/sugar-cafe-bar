<template>
  <div class="bg-dark py-5 scb-footer">
    <div class="container-lg">
      <div
        class="d-flex flex-column
              flex-md-row
              justify-content-center
              text-primary h5"
      >
        <div class="mb-4">
          <p class="mb-2">
            <i class="bi bi-check2 me-2"></i>
            提供 Wifi <i class="bi bi-wifi"></i> / 充電插座 <i class="bi bi-plug-fill"></i>
          </p>
          <p class="mb-0">
            <i class="bi bi-x me-2"></i>
            免收服務費 <i class="bi bi-cash-stack"></i> / 禁帶外食 <i class="bi bi-bag-fill"></i>
          </p>
        </div>
      </div>
      <div
        class="d-flex
                align-items-center
                justify-content-center
                justify-content-md-end
                text-white mb-md-7 mb-4"
      >
        <ul class="d-flex list-unstyled mb-0 h4">
          <li>
            <!-- facebook 粉絲專頁 (_blank) -->
            <a
              href="https://www.facebook.com/SugarCafeBar25588306"
              target="_blank"
              class="text-white mx-3"
            >
              <i class="bi bi-facebook h3"></i>
            </a>
          </li>
        </ul>
      </div>
      <div
        class="d-flex flex-column
              flex-md-row
              justify-content-between
              align-items-md-end
              align-items-start
              text-white"
      >
        <div class="mb-md-0 mb-1">
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
        <p class="mb-0">© 2021 Sugar Cafe Bar 版權所有(非商業用).</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scb-footer {
  letter-spacing: 0.25rem;
  @media (max-width: 992px) {
    letter-spacing: 0;
  }
}
</style>
