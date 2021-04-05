<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt=""  @load.once="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>


<script>
  import { Swiper, SwiperItem } from "components/common/swiper/index";

  export default {
    props:{
      banners:{
        type:Array,
        defualt(){
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem,
    },
    data(){
      return{
        isLoad : false
      }
    },
    methods:{
      imageLoad(){
        if( !this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
        
      }
    }
  };
</script>

<style>
</style>