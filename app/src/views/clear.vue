<template>
  <div>
    <ToBack title="清理缓存" />
    <div class="btn">
      <van-button plain type="warning" block
      @click="clickHander"
      >点击清理</van-button>
    </div>
    
  </div>
</template>
<script>
import ToBack from "@/components/toBack"
import { Button,Toast,Notify } from 'vant';


export default{
  components: {
    ToBack,
    [Button.name]: Button,
  },
  setup(){
    function clickHander() {
      const toast = Toast.loading({
        duration: 0,
        forbidClick: true,
        message: `正在清理`,
      });

      let second = 2;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast.message = `正在清理：剩余 ${second} 秒`;
        } else {
          clearInterval(timer);
          Toast.clear();
          Notify({ type: 'success', message: '清理成功', duration: 1000, });
        }
      }, 1000);
    }
    return {
      clickHander,
    }
  }
}
</script>

<style lang="scss" scoped>
.btn{
  padding: 25px 20px;
}
  .van-button{
    background-color: transparent;
  }
</style>