<template>
  <div class="set-container">
    <ToBack title="设置"/>
  </div>
  <ul>
    <router-link  :to="item.path" v-for="item in linkObj" :key="item.name">
      <li>
      {{item.name}}
    </li>
    </router-link>
  </ul>
</template>

<script>
import ToBack from "@/components/toBack"
import {ref} from "vue"
var obj = [
      {name:"账号管理", path:"/userEdit"},
      {name:"登录", path:"/login"},
      {name:"清理缓存",path:"/clear"}
    ]
export default {
  components:{
    ToBack,
  },
  setup() {
    const linkObj = ref(obj)
    return {
      linkObj
    }
  },
}
</script>

<style lang="scss" scoped>
ul{
  padding: 0 15px;
}
  li{
    line-height: 30px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ccc;
    position: relative;
    &::after{
      content: ">";
      position: absolute;
      right: 15px;
      font-size: 22px;
    }
  }
</style>