<template>
  <div class="wrapper">
    <ul class="content">
    <li>1分类列表*</li>
    <li>2分类列表*</li>
    <li>3分类列表*</li>
    <li>4分类列表*</li>
    <li>5分类列表*</li>
    <li>6分类列表*</li>
    <li>7分类列表*</li>
    <li>8分类列表*</li>
    <li>9分类列表*</li>
    <li>10分类列表*</li>
    <li>11分类列表*</li>
    <li>12分类列表*</li>
    <li>13分类列表*</li>
    <li>14分类列表*</li>
    <li>15分类列表*</li>
    <li>16分类列表*</li>
    <li>17分类列表*</li>
    <li>18分类列表*</li>
    <li>19分类列表*</li>
    <li>20分类列表*</li>
    <li>21分类列表*</li>
    <li>22分类列表*</li>
    <li>23分类列表*</li>
    <li>24分类列表*</li>
    <li>25分类列表*</li>
    <li>26分类列表*</li>
    <li>27分类列表*</li>
    <li>28分类列表*</li>
    <li>29分类列表*</li>
    <li>30分类列表*</li>
    <li>31分类列表*</li>
    <li>32分类列表*</li>
    <li>33分类列表*</li>
    <li>34分类列表*</li>
    <li>35分类列表*</li>
    <li>36分类列表*</li>
    <li>37分类列表*</li>
    <li>38分类列表*</li>
    <li>39分类列表*</li>
    <li>40分类列表*</li>
    <li>41分类列表*</li>
    <li>42分类列表*</li>
    <li>43分类列表*</li>
    <li>44分类列表*</li>
    <li>45分类列表*</li>
    <li>46分类列表*</li>
    <li>47分类列表*</li>
    <li>48分类列表*</li>
    <li>49分类列表*</li>
    <li>50分类列表*</li>
    <li>51分类列表*</li>
    <li>52分类列表*</li>
    <li>53分类列表*</li>
    <li>54分类列表*</li>
    <li>55分类列表*</li>
    <li>56分类列表*</li>
    <li>57分类列表*</li>
    <li>58分类列表*</li>
    <li>59分类列表*</li>
    <li>60分类列表*</li>
    <li>61分类列表*</li>
    <li>62分类列表*</li>
    <li>63分类列表*</li>
    <li>64分类列表*</li>
    <li>65分类列表*</li>
    <li>66分类列表*</li>
    <li>67分类列表*</li>
    <li>68分类列表*</li>
    <li>69分类列表*</li>
    <li>70分类列表*</li>
    <li>71分类列表*</li>
    <li>72分类列表*</li>
    <li>73分类列表*</li>
    <li>74分类列表*</li>
    <li>75分类列表*</li>
    <li>76分类列表*</li>
    <li>77分类列表*</li>
    <li>78分类列表*</li>
    <li>79分类列表*</li>
    <li>80分类列表*</li>
    <li>81分类列表*</li>
    <li>82分类列表*</li>
    <li>83分类列表*</li>
    <li>84分类列表*</li>
    <li>85分类列表*</li>
    <li>86分类列表*</li>
    <li>87分类列表*</li>
    <li>88分类列表*</li>
    <li>89分类列表*</li>
    <li>90分类列表*</li>
    <li>91分类列表*</li>
    <li>92分类列表*</li>
    <li>93分类列表*</li>
    <li>94分类列表*</li>
    <li>95分类列表*</li>
    <li>96分类列表*</li>
    <li>97分类列表*</li>
    <li>98分类列表*</li>
    <li>99分类列表*</li>
    <li>100分类列表*</li>
  </ul></div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    data(){
      return {
        scroll:null
      }
    },
    created() {
     
    },
    mounted() {

      //默认情况下 Bscroll是不可以实时的监听滚动位置
      //probe 侦测
      //0和1都是不侦测  
      //2:在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
      //3:只要滚动都侦测
      this.scroll = new BScroll(document.querySelector(".wrapper"),{
        probeType:3,
        click:true,
        pullUpLoad:true
      })

      this.scroll.on('scroll',(position)=>{    //scroll监听滚动
        // console.log(position);
      })

      this.scroll.on('pullingUp',()=>{
        //发送网络请求，请求更多页的数据
        //等数据请求完成，并且将新的数据展示出来后
        console.log('上拉加载更多');
        setTimeout(()=>{
          this.scroll.finishPullUp()       //这个函数执行完才能加载下一个上拉加载更多
        },1000)
      })
    },
  }
</script>

<style scoped>
  .wrapper{
    width:100%;
    height: 300px;                   /*必须要有一个固定的高度*/
    background-color: red;
  }
</style>