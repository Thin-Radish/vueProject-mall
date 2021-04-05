<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message, duration=1500) {     //添加一个默认值
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;

  color: #fff;
  font-size: 14px;
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>