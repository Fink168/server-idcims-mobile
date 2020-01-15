import axios from 'axios'
import store from '@/store'

/**
 * 请求接口日志记录
 */
function _reqlog(req) {
    if (process.env.NODE_ENV === 'development') {
        console.log("请求地址：" + req.url, req.data || req.params)
    }
    //TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${res.config.url}响应结果：`, res)
    }
}

// 创建自定义接口服务实例
const http = axios.create({
    timeout: 300000,  // 不可超过 manifest.json 中配置 networkTimeout的超时时间
    // #ifdef H5
    withCredentials: true,
    // #endif
    headers: {
        'Content-Type': 'application/json',
    },
})

// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
	uni.showLoading({title:"加载中..."})
	if(store.state.token){
		let userData = uni.getStorageSync('userData');
		config.headers['X-Token'] =  userData.token; // 让每个请求携带自定义token
		config.headers['datacenter'] = userData.default_datacenter// 让每个请求携带机房
	}
    _reqlog(config)
    return config
})

// 拦截器 在请求之后拦截
http.interceptors.response.use(response => {
    _reslog(response)
	uni.hideLoading();
	if(response.data.result == 'success'){
		return response.data
	}else{
		// uni.showModal({
		// 	content: response.data.msg,
		// 	showCancel: false,
		// 	success: function (res) {
		// 		uni.removeStorage({
		// 			key: 'userData',
		// 		})
		// 		location.reload()
		// 	}
		// })
		return response.data
	}
}, error => {
	uni.hideLoading();
	// uni.showModal({
	// 	content: error.message,
	// 	showCancel: false,
	// 	success: function (res) {
	// 		uni.removeStorage({
	// 			key: 'userData',
	// 		})
	// 		location.reload()
	// 	}
	// })
	
    return Promise.reject(error.message)
})

export default http