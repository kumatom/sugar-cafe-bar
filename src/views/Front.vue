<template>
  <Loading :active="isLoading" :z-index="1070"></Loading>
  <Navbar />
  <div class="main-container">
    <router-view></router-view>
  </div>
  <Footer />
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  inject: ['emitter'],
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    // 調整切換頁面效果 (載入效果)
    changeLoadingStatus(status) {
      this.isLoading = status;
    },
  },
  mounted() {
    this.emitter.on('change-isLoading', (status) => {
      this.changeLoadingStatus(status);
    });
  },
  unmounted() {
    this.emitter.off('change-isLoading', (status) => {
      this.changeLoadingStatus(status);
    });
  },
};
</script>
