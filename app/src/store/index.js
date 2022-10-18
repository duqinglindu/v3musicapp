import { createStore, createLogger } from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'
import loginUser from "./login"

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    loginUser,
  },
  state,
  getters,
  mutations,
  actions,
  strict: debug, //严格模式
  plugins: debug ? [createLogger()] : []  //开发环境下查看提交状态
})
