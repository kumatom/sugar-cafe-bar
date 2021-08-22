<template>
  <div class="container">
    <div class="not-found">
      <div class="row">
        <div class="col-12 text-center">
          <img src="@/assets/images/logo-scb.png" class="mb-3" alt="小松鼠" />
          <h1>糟糕，小松鼠找不到你的頁面!</h1>
          <router-link to="/">
            <button type="button" class="text-nowrap btn btn-dark w-100 py-2 mt-3">
              回首頁
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
