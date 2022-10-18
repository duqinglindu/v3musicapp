import {registerApi,loginApi} from "@/api"

export default{
    namespaced: true,
    state: {
        loading: false, 
        user: null,
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setUser(state,payload) {
            state.user = payload;
        }
    },
    actions: {
        async register(ctx, payload) { // 注册
            ctx.commit("setLoading", true);
            const resp = await registerApi(payload);
            ctx.commit("setLoading", false);
            return resp;
        },
        async login(ctx, payload) {  //登录
            ctx.commit("setLoading", true); //登录中
            const resp = await loginApi(payload);
            resp && ctx.commit("setUser", resp);
            ctx.commit("setLoading", false);
            return resp;
        },
        async loginOut(ctx) {
            ctx.commit("setLoading", true);
            await loginOut();
            ctx.commit("setUser", null);
            ctx.commit("setLoading", false);
        }
    }
}