<template>
  <div class="container">
    <div class="not-found">
      <div class="row">
        <div class="col-12 text-center">
          <i class="bi bi-bag-x-fill"></i>
          <h1>糟糕，你要找的產品不存在哦!</h1>
          <router-link to="/menu">
            <button type="button" class="text-nowrap btn btn-dark w-100 py-2 mt-3">
              回好食菜單
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
