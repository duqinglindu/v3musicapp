<template>
    <ToBack title="注册" />
  <div class="register-container">
      <div class="content">
          <van-form @submit="onSubmit">
              <van-field
                  v-model="username"
                  name="username"
                  label="用户名"
                  placeholder="用户名"
                  :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <van-field
                  v-model="password"
                  type="password"
                  name="password"
                  label="密码"
                  placeholder="密码"
                  :rules="[{ required: true, message: '密码长度需要大于6',pattern }]"
              />
              <van-field 
                  name="phoneNumber"
              
              v-model="tel" type="tel" label="手机号" :rules="[{required: true, 
              message: '请输入正确的手机号',
                  pattern: phoneNumber,
              }]" />
              <van-radio-group v-model="radio" direction="horizontal" id="xinbie">
                  <span>性别</span>
                  <van-radio name="1">男</van-radio>
                  <van-radio name="2">女</van-radio>
              </van-radio-group>
              <div style="margin: 16px;">
                  <van-button round block type="info" native-type="submit"
                      :disabled="loading"
                  >{{loading?"提交中": "提交"}}</van-button>
              </div>
          </van-form>
      </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ToBack from "@/components/toBack"

import { Notify, Form, Field, CellGroup, Button, RadioGroup, Radio } from 'vant';
export default {
  data() {
    return {
      username: '',
      password: '',
      tel: "",
      radio: '1',
      pattern:  /[\d\D]{6}/,
      phoneNumber: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
    };
  },
  components: {
    ToBack,
    [Form.name]: Form,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
  },  
  computed: {
    ...mapState("loginUser", ["loading"]) //loading
  },
  methods: {
    async onSubmit(values) {
      const resp = await this.$store.dispatch("loginUser/register", 
      {radio: this.radio, ...values, })
      if(!resp) {
        Notify('你已经注册过了');
        setTimeout(()=> {
          this.$router.push({
          path: "/login",
          })
        }, 400)
        return;
      }
      Notify(
        { type: 'primary', message: "注册成功" });
      setTimeout(()=> {
        this.$router.push({
          path: "/login",
        })
      }, 400)
    },
  },
}
</script>

<style lang="scss" scoped>
  .register-container {
      height: calc(100vh - 60px);
      display: flex;
      justify-content: center;
      .content{
          text-align: center;
          padding-top: 70px;
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
  .van-cell{
    background: none;
    color: azure !important;
  }
  .van-button{
    color: #000;
  }
</style>