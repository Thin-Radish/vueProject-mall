import Toast from "./Toast"

const obj={}

obj.install = function(Vue){           //install默认会传过来一个vue参数


  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)        //这里为最原始的组件创造

  //2.new的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastContrustor()

  //3.将组件对象，手动挂载到一个元素上
  toast.$mount(document.createElement("div"))      //这里手动创建一个div挂载上去

  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj