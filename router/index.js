import modules from './modules'
import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'

Vue.use(Router)
//初始化
const router = new Router({
	encodeURI:false, //	不编码传输
    routes: [...modules]//路由表
});

const whiteList = ['login']
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	var userData = uni.getStorageSync('userData') || '';
	if (userData.token) { // 确定是否有令牌
		if (to.name === 'login') { //存在令牌并且在登录页时返回主页
			next({ path: '/' })
		}else{
			next();
		}
	}else{
		if(whiteList.indexOf(to.name) !== -1){ //判断是否白名单,直接进入
			next();
		}else{
			next({
				path: '/pages/login/login',
				NAVTYPE: 'pushTab'
			});
		}
	}
		
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})
export default router;