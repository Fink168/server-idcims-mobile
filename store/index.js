import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		forcedLogin: true, //是否需要强制登录
		hasLogin: false,
		token: '',
		datacenter: '',
	},
	mutations: {
		updateToken(state, user){
			state.token = user.token;
			state.datacenter = user.datacenter;
		},
		login(state, user) {
			state.hasLogin = true;
			state.token = user.token;
			state.datacenter = user.datacenter;
			
			uni.setStorage({
				key: 'userData',
				data: user
			})
		},
		logout(state) {
			state.hasLogin = false;
			state.token = ''
			state.datacenter = ''
			uni.removeStorage({
				key: 'userData',
			})
		}
	}
})

export default store
