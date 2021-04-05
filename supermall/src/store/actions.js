export default {
  addCart(context, payload){

    return new Promise((resolve,reject) => {
          //查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    //判断oldProduct
    if(oldProduct){

      context.commit('addCounter', oldProduct)    //已有的数量加一
      resolve('当前的商品数量+1')
    }else{
      payload.count = 1
      context.commit('addToCart', payload)        //新商品加入
      resolve('成功加入购物车')
    }
    })
  }

}