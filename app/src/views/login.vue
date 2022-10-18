<template>
  <div>
    <ToBack title="登录" />
    <div class=login-container>
        <div class="content">
            <van-image
                round
                fit="cover"
                width="2rem"
                height="2rem"
                :src="mao"
            />
            <van-cell-group class="input-group">
                <van-field v-model="value" label="用户名" placeholder="请输入用户名" />
                <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
            </van-cell-group>
            <van-button type="primary" block @click="submit" :disabled="loading">
                {{loading?"登录中": "登录"}}</van-button>
            <div class="tips">
                <span class="register" @click="$router.push({path: '/register'})">注册用户</span> | <span
                    @click="handlePassword"
                >忘记密码</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import ToBack from "@/components/toBack"
import { Field, CellGroup, Button, Toast,Notify } from 'vant';
import {mapState} from "vuex";

export default{
  name: "login",
  components: {
    ToBack,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
  },
  data() {
    return {
        value: '',
        password: '',
    }
  },
  mounted() {
    const user = this.$store.state.loginUser.user;
    if(user) {
      Notify(
        { type: 'primary', message: "你已登录",duration: 1000, });
      setTimeout(() => {
        this.$router.back()
      }, 1000);
    }
  },
  computed: {
      ...mapState("loginUser", ["loading"])
    },
  methods: {
    handlePassword() {
      Toast.success('账户已重置，请重新注册');
      localStorage.clear("user");
    },
    async submit() {
      if(this.value && this.password && this.value.length >=1 && this.password.length >= 1) {
        // 尝试登陆
        const resp = await this.$store.dispatch("loginUser/login", {value:this.value, password:this.password});
        if(!resp) {
          Toast.fail('账户或密码错误');
          this.value = "" ;
          this.password = "" ;
          return;
        }
        this.$router.push({
          path: "/"
        })
      }else { 
        Toast.fail('请填写完整');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
        height: calc(100vh - 60px);
        display: flex;
        justify-content: center;
        .content{
            text-align: center;
            padding-top: 70px;
        }
        .input-group{
            margin-top: 20px;
            margin-bottom: 20px;
            background-color: transparent;
        }
        .tips{
            font-size: 14px;
            color: #ccc;
            margin-top: 10px;
            .register{
                color: #f40;
            }
        }
    }
</style>