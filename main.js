import Vue from 'vue'
import App from './App'
import router from './router'
import { RouterMount } from 'uni-simple-router'

// 全局注册组件
import store from './store'
Vue.prototype.$store = store

import http from './utils/https.js'
Vue.prototype.$http = http

import status from './components/status.vue'
Vue.component('page-status',status)

import cuCustom from './components/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import { isEmpty } from '@/utils/index' //验证类
Vue.prototype.isEmpty = isEmpty

// 注册全局的过滤器.
import * as filters from './filters'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

//下拉选择插件
// import LbPicker from '@/components/lb-picker'
// import UniIcons from '@/components/uni-ui/uni-icons/uni-icons'
// Vue.component("lb-picker", LbPicker)
// Vue.component("uni-icons", UniIcons)

//消息组件
import messages from "@/components/uni-ui/uni-messages/messages.vue"
Vue.component("messages", messages)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
