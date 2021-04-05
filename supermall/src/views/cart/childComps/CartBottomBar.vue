<template>
  <div class="bottom-bar">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"/>
      <span>全选</span>
      <div class="total-price">
        合计：{{totalPrice}}
      </div>
      <div class="calculate">
        去计算({{checkLength}})
      </div>
  </div>
</template>

<script>
  import checkButton from "components/content/checkButton/CheckButton"
  export default {
    components: {
      checkButton,
    },
    computed:{
      totalPrice(){
        return '￥'+this.$store.state.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue, item)=>{
          return item.price * item.count + preValue
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        return  this.$store.state.cartList.every(item => item.checked)
      }
    },
    methods:{
    checkClick(){
      if(this.isSelectAll){ 
        this.$store.state.cartList.forEach(item => item.checked = false);
      }else{
        this.$store.state.cartList.forEach(item => item.checked = true);
      }
    }
  }
  }
  
</script>

<style scope
    CheckButtond>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    line-height: 40px;

    display: flex;
    align-items: center;
    
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 22px;
    /* margin-right: 5px; */
    margin-left: 10px;
  }
  .total-price{
    margin-left: 20px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    color: #fff;
    text-align: center;
    background-color: red;
  }
</style>