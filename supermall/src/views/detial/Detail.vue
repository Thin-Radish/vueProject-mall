<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
    <scroll class="contnet" ref="scroll"  @scroll="contnetScroll" :probe-type="3"> 
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-images-info :images-info="imagesInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo"  ref="comment"/>
      <goods-list :goods="recommends" ref="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailImagesInfo from "./childComps/DetailImagesInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar';

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop"
// import Toast from 'components/common/toast/Toast';

import { getDetail,getRecommend,Goods,Shop,GoodsParams } from "network/detail";
import { debounce } from "common/utils";



export default {
  name:"Detail",        
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo, 
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
    // Toast,
  },

  data() {
    return { 
      iid: null,
      topImages: [],
      goods: {},
      shop:{},
      imagesInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs: [],
      getthemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      // message:'',
      // show:false,
    };
  },
  created() {

    //1.保存传入的iid
    this.iid = this.$route.params.iid;

    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);

      //1.获取数据
      const data = res.result

      //2.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages

      //3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //4.创建店铺信息对象
      this.shop = new Shop(data.shopInfo)

      //5.保存商品的详情数据
      this.imagesInfo = data.detailInfo

      //6.获取参数信息
      this.paramInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)

      //7.取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

      //1.第一次获取，值不对
      //值不对的原因：this.refs.params.$el压根没有渲染
      // this.themeTopYs = []

      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop) // $el拿到的是组件的根div
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)



      // this.$nextTick(()=>{

      //   //2.第二次获取：值不对
      //   //值不对的原因：图片没有计算在类
      //   //根据最新的数据，对应的DoM是已经被渲染出来
      //   //但是图片依然是没有加载完(目前获取到 offsettop不包含其中的图片)
      //   //获取详情页标题的高度
      //   this.themeTopYs = []

      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop) // $el拿到的是组件的根div
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)

      // })
  
    });

    //3.请求推荐数据
    getRecommend().then(res=>{
      this.recommends = res.data.list
    })

    //4.给getthemeTopY赋值
    this.getthemeTopY = debounce(()=>{
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop) // $el拿到的是组件的根div
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      // console.log(this.themeTopYs);

      this.themeTopYs.push(Number.MAX_VALUE)         //加入一个最大的数，遍历时防止越界
    },500)


  },
  methods:{
    imgLoad(){
      this.$refs.scroll.refresh()

      this.getthemeTopY()
    },

    titleClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contnetScroll(position){
      //1.获取y
      const positionY = -position.y

      //2.positionY和主题中的y值对比
      let length = this.themeTopYs.length
      for(let i = 0; i<length-1; i++){
        if( (this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      //backTop是否出现
      this.isShowBackTop = positionY> 800     
    },
     backClick(){
      //scrollTo前两个参数为坐标  后面为时间
      this.$refs.scroll.scrollTo(0,0,500)                                    //访问$refs.scroll组件的scrollTo方法
    },
    addToCart(){
      //1.获取购物车需要展示的商品信息
      const product ={}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid 
      product.count = 0

      //2.将商品添加到购物车里  
      // this.$store.cartList.push(product)    //不能直接改store的值，需要在mutations里
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res => {
        // this.show = true
        // this.message = res

        // setTimeout(()=>{
        //   this.show = false
        //   this.message = ''
        // },1500)
        this.$toast.show(res, 2000)
      })


    }
  },
  mounted(){

    //重新刷新scroll的高度
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on('detailItemImageLoad',()=>{                        
      refresh()          
    }) 
  },
  // updata(){
  //   //数据一更新就调用这个函数
  // }

};
</script>

<style scoped>

  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .contnet{
    height: calc(100% - 44px - 49px);
  }

</style>