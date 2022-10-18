<template>
  <div>
    <ToBack title="账号管理" />
    <div class="prompt" v-if="show">
      <van-empty image="error" description="你还没有登录哦~" />
      <div style="text-align: center;">
          <van-button type="primary" 
          @click.stop="loginHandler"
          >去登录</van-button>
      </div>
    </div>  
    <div class="userEdit-container" v-else>
        <!-- 用户设置 -->
        <div class="content">
            <van-form>
                <van-field
                readonly
                    v-model="username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                readonly
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field readonly v-model="tel" type="tel" label="手机号" :rules="[{required: true, message: '请输入手机号'}]" />
                <van-radio-group readonly v-model="radio" direction="horizontal" id="xinbie">
                    <span>性别</span>
                    <van-radio readonly name="1">男</van-radio>
                    <van-radio readonly name="2">女</van-radio>
                </van-radio-group>
                <div>
                    <van-button type="danger" 
                    @click.stop="handleCLick"
                    >退出登录</van-button>
                </div>
            </van-form>
        </div>
    </div>
  </div>
</template>

<script>
import ToBack from "@/components/toBack"
import { Form, Field, CellGroup, Button, RadioGroup, Radio,Empty  } from 'vant';

export default{
  components: {
    ToBack,
    [Form.name]: Form,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Empty.name]: Empty,
  },
  data() {
        return {
            username: '',
            password: '',
            tel: "",
            radio: '1',
            show: true,
        };
    },
    activated() {
        const user = this.$store.state.loginUser.user;
        if(user) {
            this.username = user.username;
            this.password = user.password;
            this.tel = user.phoneNumber;
            this.radio = user.radio
            this.show = false;
        } else {
          this.show = true;
        }
    },
    methods: {
        handleCLick() {
            this.$store.commit("loginUser/setUser", null)
            this.$router.push({
                path: "/",
            })
        },
        loginHandler() {
          this.$router.push({
                path: "/login",
            })
        }
    },
}
</script>

<style lang="scss" scoped>
  .userEdit-container {
        height: calc(100vh - 60px);
        display: flex;
        justify-content: center;
        .content{
            text-align: center;
            padding-top: 20px;
        }
    }
    #xinbie{
        margin-left: 15px;
        margin-top: 5px;
        margin-bottom: 15px;
        &>span{
            margin-right: 20px;
        }
    }
    .info-btn{
        margin-right: 10px;
    }
</style>