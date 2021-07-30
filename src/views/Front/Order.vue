<template>
  <div class="container-lg order-container">
    <div class="card h-100">
      <div class="card-header">
        <ul class="nav nav-pills nav-justified">
          <li class="nav-item">
            <a class="nav-link" :class="{ active: stepStatus.createOrder }">
              <i class="bi bi-list-check"></i>
              <span class="d-none d-md-inline mx-3">建立訂單</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{
                active: stepStatus.checkOrder && !stepStatus.createOrder,
                disabled: !stepStatus.checkOrder && !stepStatus.success,
              }"
            >
              <i class="bi bi-credit-card-fill"></i>
              <span class="d-none d-md-inline mx-3">確認及付款</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: stepStatus.success, disabled: !stepStatus.success }"
            >
              <i class="bi bi-check-circle-fill"></i>
              <span class="d-none d-md-inline mx-3">訂單完成</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="card-body ">
        <div class="pt-5 pb-7">
          <div class="container-lg">
            <div class="row justify-content-center flex-md-row flex-column-reverse">
              <!-- Step 1 : 填寫訂餐資訊 -->
              <div class="col-md-6 col-lg-7" v-if="stepStatus.createOrder">
                <div class="my-3 justify-content-center">
                  <Form v-slot="{ errors }" class="row gx-3" @submit="onSubmit">
                    <h3 class="mb-4">訂餐資訊</h3>
                    <div class="mb-3 col-12 col-sm-6">
                      <label for="email" class="form-label">
                        Email
                        <span class="text-danger">*</span>
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        class="form-control"
                        :class="{ 'is-invalid': errors['email'] }"
                        placeholder="請輸入 Email"
                        rules="email|required"
                        v-model="form.user.email"
                      ></Field>
                      <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="mb-3 col-6">
                      <label for="姓名" class="form-label">
                        姓名
                        <span class="text-danger">*</span>
                      </label>
                      <Field
                        id="name"
                        name="姓名"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors['姓名'] }"
                        placeholder="請輸入姓名"
                        rules="required"
                        v-model="form.user.name"
                      ></Field>
                      <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="mb-3 col-6">
                      <label for="phone" class="form-label">
                        電話
                        <span class="text-danger">*</span>
                      </label>
                      <Field
                        id="phone"
                        name="phone"
                        type="tel"
                        class="form-control"
                        :class="{ 'is-invalid': errors['phone'] }"
                        placeholder="請輸入電話"
                        rule="required"
                        :rules="isPhone"
                        v-model="form.user.tel"
                      ></Field>
                      <ErrorMessage name="phone" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="mb-3 col-6">
                      <label for="付款方式" class="form-label">
                        付款方式
                        <span class="text-danger">*</span>
                      </label>
                      <Field
                        id="payment"
                        name="付款方式"
                        class="form-select"
                        :class="{ 'is-invalid': errors['付款方式'] }"
                        placeholder="請選擇付款方式"
                        v-model="form.user.payment"
                        as="select"
                        rules="required"
                      >
                        <option value="" disabled>請選擇付款方式</option>
                        <option value="現金">現金</option>
                        <option value="信用卡">信用卡</option>
                      </Field>
                      <ErrorMessage name="付款方式" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="mb-3 col-12">
                      <label for="message" class="form-label">備註</label>
                      <Field
                        id="message"
                        name="message"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors['message'] }"
                        placeholder="請輸入備註"
                        v-model="form.message"
                        as="textarea"
                      ></Field>
                      <ErrorMessage name="message" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="text-end">
                      <button
                        type="submit"
                        class="btn btn-primary btn-lg"
                        :disabled="loadingStatus.loadingItem == 'submit'"
                      >
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                          v-if="loadingStatus.loadingItem == 'submit'"
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>
                        下一步
                        <i class="bi bi-arrow-right"></i>
                      </button>
                    </div>
                  </Form>
                </div>
              </div>

              <!-- Step 2 : 確認及付款 -->
              <div
                class="col-md-6 col-lg-7"
                v-if="stepStatus.checkOrder && !stepStatus.createOrder"
              >
                <div class="my-3 row">
                  <h3 class="mb-4">確認訂餐資訊</h3>
                  <div class="mb-3 col-12 col-sm-6">
                    <label for="email" class="form-label">Email</label>
                    <p class="h5 text-white">{{ form.user.email }}</p>
                  </div>
                  <div class="mb-3 col-6">
                    <label for="name" class="form-label">姓名</label>
                    <p class="h5 text-white">{{ form.user.name }}</p>
                  </div>
                  <div class="mb-3 col-6">
                    <label for="phone" class="form-label">電話</label>
                    <p class="h5 text-white">{{ form.user.tel }}</p>
                  </div>
                  <div class="mb-3 col-6">
                    <label for="payment" class="form-label">付款方式</label>
                    <p class="h5 text-white">{{ form.user.payment }}</p>
                  </div>
                  <div class="mb-3 col-12">
                    <label for="message" class="form-label">備註</label>
                    <p class="h5 text-white">{{ form.message }}</p>
                  </div>
                  <div class="col-12">
                    <div class="float-start">
                      <button type="button" class="btn btn-primary btn-lg" @click="onPreStep">
                        <i class="bi bi-arrow-left"></i>
                        上一步
                      </button>
                    </div>
                    <div class="float-end">
                      <button
                        type="button"
                        class="btn btn-primary btn-lg"
                        :disabled="loadingStatus.loadingItem == 'payment'"
                        @click="onSendOrder"
                      >
                        <div
                          class="spinner-border spinner-border-sm"
                          role="status"
                          v-if="loadingStatus.loadingItem == 'payment'"
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>
                        確認付款
                        <i class="bi bi-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3 : 訂單完成 -->
              <div class="my-3 col-md-6 col-lg-7" v-if="stepStatus.success">
                <h1 class="mb-3 text-primary">
                  <i class="bi bi-check-circle-fill"></i>
                  付款成功!
                </h1>
                <h5>訂單編號 : {{ order.orderId }}</h5>
                <h5>付款日期 : {{ $filters.date(order.create_at) }}</h5>
                <div class="float-start">
                  <router-link to="/">
                    <button type="button" class="btn btn-primary btn-lg mt-4">
                      <i class="bi bi-house"></i>
                      回首頁
                    </button>
                  </router-link>
                </div>
              </div>

              <!-- 訂餐明細 -->
              <div class="col-md-6 col-lg-5 order-detail">
                <div class="border p-4 mb-4 bg-light">
                  <h4 class="mb-4">訂餐明細</h4>

                  <div class="d-flex mb-3" v-for="cart in cart.carts" :key="cart.id">
                    <img
                      :src="cart.product.imageUrl"
                      class="me-2"
                      style="width: 48px; height: 48px; object-fit: cover"
                    />
                    <div class="w-100">
                      <div class="d-flex justify-content-between fw-bold">
                        <p class="mb-0">{{ cart.product.title }}</p>
                        <p class="mb-0">x {{ $filters.currency(cart.qty) }}</p>
                      </div>
                      <div class="d-flex justify-content-between">
                        <p class="text-muted mb-0">
                          <small>NT$ {{ $filters.currency(cart.product.price) }}</small>
                        </p>
                        <p class="mb-0">
                          NT$ {{ $filters.currency(cart.product.price * cart.qty) }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <table class="table mt-4 border-top border-bottom text-muted">
                    <tbody>
                      <tr>
                        <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">小計</th>
                        <td class="text-end border-0 px-0 pt-4">
                          NT$ {{ $filters.currency(orderSubTotal) }}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">優惠折扣</th>
                        <td class="text-end border-0 px-0 pt-4">
                          - NT${{ $filters.currency(discount) }}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">
                          付款方式
                        </th>
                        <td class="text-end border-0 px-0 pt-0 pb-4">{{ form.user.payment }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-flex justify-content-between mt-4">
                    <p class="mb-0 h4 fw-bold">總計</p>
                    <p class="mb-0 h4 fw-bold">NT$ {{ $filters.currency(orderTotal) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let navCartBtn;
let floatingCartBtn;
export default {
  inject: ['emitter', '$httpMessageState'],
  data() {
    return {
      // API路徑
      baseAPI: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      // Loading物件
      loadingStatus: {
        loadingItem: '',
      },
      orderSubTotal: 0,
      orderTotal: 0,
      discount: 0,
      cart: {},
      form: {
        user: {
          address: '僅限內用及外帶',
        },
      },
      stepStatus: {
        createOrder: true,
        checkOrder: false,
        success: false,
      },
      tips: {
        data: {
          success: false,
          message: '糟糕，您還沒有點餐哦!',
        },
      },
      order: {},
    };
  },
  methods: {
    setTips(status, message) {
      this.tips = {
        data: {
          success: status,
          message,
        },
      };
    },
    totalOrderAmount() {
      let tempTotal = 0;
      this.cart.carts.forEach((cart) => {
        tempTotal += cart.qty * cart.product.price;
      });
      this.orderSubTotal = tempTotal;
    },
    // 取得優惠券
    getDisCount() {
      const api = `${this.baseAPI}/coupon`;

      const discountData = {
        code: 'SUGAR85',
      };

      this.emitter.emit('change-isLoading', true);
      this.$http
        .post(api, { data: discountData })
        .then((res) => {
          this.emitter.emit('change-isLoading', false);
          if (res.data.success) {
            this.$httpMessageState(res, '套用優惠券');

            // 總計 (扣除折扣價)
            this.orderTotal = res.data.data.final_total;
            this.discount = this.orderSubTotal - this.orderTotal;
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 取得訂餐清單
    getCart() {
      const api = `${this.baseAPI}/cart`;

      this.emitter.emit('change-isLoading', true);
      this.$http
        .get(api)
        .then((res) => {
          this.emitter.emit('change-isLoading', false);
          if (res.data.success) {
            this.cart = res.data.data;
            if (!this.cart.carts.length) {
              this.$httpMessageState(this.tips, '建立訂單');
              this.$router.push('/');
            } else {
              // 套用優惠券
              this.getDisCount();

              // 小計
              this.totalOrderAmount();
            }
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 下一步 (確認及付款)
    onSubmit() {
      this.stepStatus.createOrder = false;
      this.stepStatus.checkOrder = true;
    },
    // 回上一步 (建立訂單)
    onPreStep() {
      this.stepStatus.createOrder = true;
      // this.stepStatus.checkOrder = false;
    },
    // 送出訂單
    onSendOrder() {
      const api = `${this.baseAPI}/order`;
      this.loadingStatus.loadingItem = 'payment';
      this.emitter.emit('change-isLoading', true);

      if (this.cart.carts.length) {
        this.$http
          .post(api, { data: this.form })
          .then((res) => {
            if (res.data.success) {
              this.order = { ...res.data };
              this.setTips(true, `訂單編號 : ${this.order.orderId} 已建立`);
              this.$httpMessageState(this.tips, '建立訂單');
              // 付款
              this.onPayOrder();
            } else {
              this.$httpMessageState(res, '建立訂單');
            }
          })
          .catch((err) => {
            console.dir(err);
          });
      }
    },
    // 確認付款
    onPayOrder() {
      const api = `${this.baseAPI}/pay/${this.order.orderId}`;

      this.$http
        .post(api)
        .then((res) => {
          this.loadingStatus.loadingItem = '';
          this.emitter.emit('change-isLoading', false);
          if (res.data.success) {
            this.stepStatus.checkOrder = false;
            this.stepStatus.success = true;
            this.setTips(true, `訂單編號 : ${this.order.orderId} 已付款`);
            this.$httpMessageState(this.tips, '付款');

            // 取得訂餐清單 (刷新)
            this.emitter.emit('get-cart');
          } else {
            this.$httpMessageState(res, '付款');
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 自訂驗證 : 電話號碼
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '請輸入正確的電話號碼';
    },
  },
  mounted() {
    this.getCart();

    // 進入訂單畫面時，隱藏 [購物車] 按鈕
    navCartBtn = document.querySelector('#nav-cart-btn');
    floatingCartBtn = document.querySelector('#floating-cart-btn');
    navCartBtn.classList.add('d-none');
    floatingCartBtn.classList.add('d-none');
  },
  unmounted() {
    // 離開訂單畫面時，顯示 [購物車] 按鈕
    navCartBtn.classList.remove('d-none');
    floatingCartBtn.classList.remove('d-none');
  },
};
</script>
