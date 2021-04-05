<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/image/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  .check-button{

    overflow: hidden;
    border: 2px solid #aaa;
    border-radius: 50%;
  }

  .check{
    border-color: var(--color-tint);
    background-color: var(--color-tint);
  }
</style>