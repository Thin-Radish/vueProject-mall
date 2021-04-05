<template>
  <div id="home">
    <nav-bar id="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
        :titles="['流行', '经典', '新款']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl_1"
        v-show="isTabFixed"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
            
      <home-swiper :banners="banners"
      @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '经典', '新款']"
        @tabClick="tabClick"
        ref="tabControl_2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

     <!-- 在我们需要监听一个组件的原生事件时，必须给对应的事件加上 native修饰符，才能进行监听 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>                           
  </div>
</template>

<script>
import HomeSwiper from "./childComps/homeSwiper";
import RecommendView from "./childComps/recommendView";
import FeatureView from "./childComps/featureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop"

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils"

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] }, //带''  的属性为变量
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop", //默认为pop
      isShowBackTop:false,
      tabOffsetTop: 0,
      isTabFixed:false,
      saveY: 0
    };
  },

  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },

  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
  },

  created() {
    //created()里面只调用
    //1.请求多个数据
    this.getHomeMultidata_m();

    //2.请求商品数据
    this.getHomeGoods_m("pop");
    this.getHomeGoods_m("new");
    this.getHomeGoods_m("sell");

    
  },
  mounted(){
    //1.监听item中图片加载完成
    // this.$bus.$on('itemImageLoad',()=>{                         //要点是把握住，每个vue实例的原型对象上都有$emit和$on
    //   this.$refs.scroll && this.$refs.scroll.refresh()          //this.$refs.scroll进行了一次过滤  
    // })                                                          //要拿到dom或者$refs不能在created()函数里

    //1.监听item中图片加载完成(防抖动后)
    const refresh = debounce(this.$refs.scroll.refresh,200)  //this.$refs.scroll.refresh()千万不要这么写，不然传入的是函数返回值
    this.$bus.$on('homeItemImageLoad',()=>{                        
      refresh()          
    })      
   
    


  },
  computed: {   
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
 
  methods: {
    /**
     * 事件监听相关方法
     */
    
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl_1.currentIndex = index
      this.$refs.tabControl_2.currentIndex = index
    },
    backClick(){
      //scrollTo前两个参数为坐标  后面为时间
      this.$refs.scroll.scrollTo(0,0,500)                                    //访问$refs.scroll组件的scrollTo方法
    },
    contentScroll(position){
      //1.判断Backtop是否显示
      this.isShowBackTop = (-position.y)>1500                                // position.y     为负值 
      //2决定 tabcontroll是否吸项(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
      
    }, 
    loadMore(){
      this.getHomeGoods_m(this.currentType)
    },
    swiperImageLoad(){

      //获取 tabcontrol的 offsettop
      //所有的组件都有一个属性$e1:用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabControl_2.$el.offsetTop
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata_m() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods_m(type) {
      const page = this.goods[type].page + 1; //因为type是变量，所以只能用对象【变量】的形式 //不一样 .属性  点后面不能是变量
      getHomeGoods(type, page).then((res) => {        //调用一次加载一次
        this.goods[type].list.push(...res.data.list); //可变参数
        this.goods[type].page += 1; //加载完一组数据后页码加一

        this.$refs.scroll.finishPullUp()          //这样才能执行下一次的上拉加载更多
      });
    },
  },
};
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  #home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;

    z-index: 1; */
  }
  .tab-control {
    position: relative;

  }

  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;

  }
  /* .content{
    height: calc(100% - 93px);  注意：calc 函数里运算符两边要留空格，不然会出问题！！！
    margin-top: 44px;
    overflow: hidden;
  } */

</style>