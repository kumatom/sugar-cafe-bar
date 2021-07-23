<template>
  <div class="toast-container position-fixed end-0 float-end" style="z-index: 1500;top:65px">
    <div v-for="(msg, key) in messages" :key="key" class="toast show" role="alert">
      <div class="toast-header bg-secondary text-white" style="height:60px;">
        <!-- <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span> -->
        <i
          class="bi bi-exclamation-circle-fill p-2 rounded me-2 d-inline-block text-primary"
          style="font-size:1.25rem;"
        ></i>
        <strong class="me-auto text-primary" style="font-size:1.25rem;">{{ msg.title }}</strong>
        <button
          type="button"
          class="btn-close"
          @click="clearToast(key)"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body text-center" v-if="msg.content" style="z-index: 1500;font-size:1rem;">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  inject: ['emitter'],
  methods: {
    toastShow() {
      setTimeout(() => {
        this.messages.shift();
      }, 3000);
    },
    clearToast(index) {
      this.messages.splice(index, 1);
    },
  },
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
      this.toastShow();
    });
  },
};
</script>
