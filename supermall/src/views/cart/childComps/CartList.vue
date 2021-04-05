<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :product = "item" />
  </div>
</template>

<script>
import CartListItem from './CartListItem';

export default {
  components: {
    CartListItem,
  },
  computed: {
    cartList() {
      return this.$store.state.cartList;
    },
  },
};
</script>

<style scoped>

</style>