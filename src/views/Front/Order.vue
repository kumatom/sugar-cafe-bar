<template>
  <div class="container-lg order-container" v-if="cart.carts">
    <div class="card h-100">
      <div class="card-header">
        <ul class="nav nav-pills nav-justified">
          <li class="nav-item">
            <div class="nav-link" :class="{ active: stepStatus.createOrder }">
              <i class="bi bi-list-check"></i>
              <h5>建立訂單</h5>
            </div>
          </li>
          <li class="nav-item">
            <div
              class="nav-link"
              :class="{
                active: stepStatus.checkOrder && !stepStatus.createOrder,
                disabled: !stepStatus.checkOrder && !stepStatus.success,
              }"
            >
              <i class="bi bi-credit-card-fill"></i>
              <h5>確認及付款</h5>
            </div>
          </li>
          <li class="nav-item">
            <div
              class="nav-link"
              :class="{ active: stepStatus.success, disabled: !stepStatus.success }"
            >
              <i class="bi bi-check-circle-fill"></i>
              <h5>訂單完成</h5>
            </div>
          </li>
        </ul>
      </div>
      <div class="card-body ">
        <div class="pt-3">
          <div class="container-lg">
            <div class="row justify-content-center flex-md-row flex-column-reverse">
              <!-- Step 1 : 填寫訂餐資訊 -->
              <div class="col-md-6 col-lg-7" v-if="stepStatus.createOrder">
                <div class="my-1">
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
                      <label for="name" class="form-label">
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
                      <label for="payment" class="form-label">
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
                    <div class="col-12 col-lg-8 mt-4 mb-4">
                      <span>
                        <i class="bi bi-arrow-right-circle-fill"></i>
                        周年慶期間消費輸入「SUGAR85」可享全單85折優惠 !
                      </span>
                      <Form v-slot="{ errors }" @submit="onDiscount">
                        <div class="input-group mb-3">
                          <Field
                            id="coupon"
                            name="優惠券"
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': errors['優惠券'] }"
                            :disabled="loadingStatus.loadingItem === 'coupon'"
                            placeholder="請輸入優惠碼"
                            v-model="discountCode"
                          ></Field>
                          <button
                            class="btn btn-light"
                            type="submit"
                            id="button-coupon"
                            :disabled="!discountCode"
                          >
                            <span v-if="cart?.carts[0]?.coupon">
                              已套用優惠券 <i class="bi bi-check-circle-fill text-dark"></i>
                            </span>
                            <span v-else>套用優惠券</span>
                          </button>
                        </div>
                      </Form>
                    </div>
                    <div class="col-12 bottom-0">
                      <div class="float-start">
                        <router-link to="/menu">
                          <button type="button" class="btn btn-secondary btn-lg">
                            <i class="bi bi-arrow-left"></i>
                            繼續點餐
                          </button>
                        </router-link>
                      </div>
                      <div class="float-end">
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
              <div class="col-md-6 col-lg-5">
                <div class="border p-4 mb-4 bg-light order-detail">
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
                      <div class="d-flex flex-column">
                        <p class="text-muted mb-0">
                          <small>NT${{ $filters.currency(cart.product.price) }}</small>
                        </p>
                        <!-- 檢查是否有套用優惠券 -->
                        <p class="mb-0 text-end" v-if="cart.coupon">
                          <del class="me-2">NT${{ $filters.currency(cart.total) }}</del>
                          <span class="h5 text-danger"
                            >NT${{ $filters.currency(cart.final_total, 2) }}</span
                          >
                        </p>
                        <p class="mb-0 text-end" v-else>NT${{ $filters.currency(cart.total) }}</p>
                      </div>
                    </div>
                  </div>

                  <table class="table mt-4 border-top border-bottom text-muted">
                    <tbody>
                      <tr v-if="cart?.carts[0]?.coupon">
                        <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">
                          已使用優惠券
                        </th>
                        <td class="text-end border-0 px-0 pt-4">
                          {{ cart?.carts[0]?.coupon.code }} <br />
                          ({{ cart?.carts[0]?.coupon.title }})
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="border-0 px-0 pt-4 pb-4 font-weight-normal">
                          付款方式
                        </th>
                        <td class="text-end border-0 px-0 pt-4 pb-4">{{ form.user.payment }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-flex justify-content-between mt-4">
                    <p class="mb-0 h4 fw-bold">總計</p>
                    <p class="mb-0 h4 fw-bold">NT${{ $filters.currency(cart.total) }}</p>
                  </div>
                  <div
                    class="d-flex justify-content-between mt-2 text-danger"
                    v-if="cart?.carts[0]?.coupon"
                  >
                    <p class="mb-0 h4 fw-bold">折扣後</p>
                    <p class="mb-0 h4 fw-bold">NT${{ $filters.currency(cart.final_total) }}</p>
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
let isFirst = true;
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
      discountCode: '',
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
    // 設定通知訊息
    setTips(status, message) {
      this.tips = {
        data: {
          success: status,
          message,
        },
      };
    },
    // 取得優惠券
    getDisCount(code) {
      const api = `${this.baseAPI}/coupon`;

      const discountData = {
        code,
      };

      this.emitter.emit('change-isLoading', true);
      this.$http
        .post(api, { data: discountData })
        .then((res) => {
          this.emitter.emit('change-isLoading', false);
          this.$httpMessageState(res, '套用優惠券');
          if (res.data.success) {
            this.getCart();
            // 總計 (扣除折扣價)
            this.discountCode = '';
          }
        })
        .catch(() => {
          this.setTips(false, '糟糕，無法套用此優惠券!');
          this.$httpMessageState(this.tips, '套用優惠券');
        });
    },
    // 取得訂餐明細
    getCart() {
      const api = `${this.baseAPI}/cart`;
      this.loadingStatus.loadingItem = 'coupon';

      this.emitter.emit('change-isLoading', true);
      this.$http
        .get(api)
        .then((res) => {
          this.loadingStatus.loadingItem = '';
          this.emitter.emit('change-isLoading', false);
          if (res.data.success) {
            this.cart = res.data.data;
            if (!this.cart.carts.length) {
              this.$httpMessageState(this.tips, '建立訂單');
              this.$router.push('/');
            } else if (isFirst) {
              // 再次套用優惠券 (確認是否有套用)
              if (this.cart?.carts[0]?.coupon) {
                this.getDisCount(this.cart?.carts[0]?.coupon.code);
              }
              isFirst = false;
            }
          } else {
            this.$httpMessageState(res, '建立訂單');
          }
        })
        .catch(() => {
          this.setTips(false, '糟糕，無法取得訂餐明細!');
          this.$httpMessageState(this.tips, '訂餐明細取得');
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
          .catch(() => {
            this.setTips(false, '糟糕，建立訂單失敗!');
            this.$httpMessageState(this.tips, '建立訂單');
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
        .catch(() => {
          this.setTips(false, '糟糕，付款程序失敗了!');
          this.$httpMessageState(this.tips, '付款');
        });
    },
    onDiscount() {
      this.getDisCount(this.discountCode);
    },
    // 自訂驗證 : 電話號碼
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '請輸入正確的電話號碼';
    },
  },
  mounted() {
    isFirst = true;
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
