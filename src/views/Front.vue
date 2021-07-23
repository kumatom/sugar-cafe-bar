<template>
  <Navbar />
  <div class="main-container">
    <router-view></router-view>
  </div>
  <Footer />
</template>

<style lang="scss">
@import '@/assets/all';
</style>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>
