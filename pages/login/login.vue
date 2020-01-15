<template>
	<view class="login">
		<cover-image src="/static/img/login/bg.png"></cover-image>
		<view class="content">
			<view class="logo">
				服务器管理系统
			</view>
			<view class="login-form">
				<view class="item phone">
					<image class="icon left" src="/static/img/login/icon_phone.png" mode="widthFix"></image>
					<input v-model="loginFrom.username" class="uni-input" focus placeholder="手机号" placeholder-class="input-placeholder"/>
					<image class="icon right" src="/static/img/login/icon_phone_right.png" mode="widthFix"></image>
				</view>
				<view class="item password">
					<image class="icon left" src="/static/img/login/icon_pwd.png" mode="widthFix"></image>
					<input type="password" v-model="loginFrom.password" class="uni-input" placeholder="密码" placeholder-class="input-placeholder"/>
					<image class="icon right" src="/static/img/login/icon_pwd_right.png" mode="widthFix"></image>
				</view>
				<view class="btn">
					<text @tap="submitLogin">登录</text>
				</view>
				<view class="forgot-pwd"><text>忘记密码？</text></view>
			</view>
			
			<view class="login-third">
				<view class="text">
					<image src="/static/img/login/icon_line.png" mode="widthFix"></image>
				</view>
				<view class="flex">
					<image src="/static/img/login/icon_weibo.png" mode="widthFix"></image>
					<image src="/static/img/login/icon_wechat.png" mode="widthFix"></image>
					<image src="/static/img/login/icon_qq.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-ui/uni-icons/uni-icons.vue"
	import interfaces from '@/utils/interfaces.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	export default {
		data() {
			return {
				loginFrom:{
					username: 'admin',
					password: 'Test2019..',
				} 
			}
		},
		onLoad() {
		},
		components: {uniIcons},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			//登录
			submitLogin(){
				if (this.loginFrom.username.length < 0) {
					uni.showToast({
						icon: 'none',
						title: '账号不能为空！'
					});
					return;
				}
				if (this.loginFrom.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符！'
					});
					return;
				}
				this.$http.post(interfaces.Login, this.loginFrom).then(res => {
					this.login(res.data);
					if (res.result == 'success') {
						this.$Router.push('/pages/tabBar/home/home')
					}else{
						uni.showModal({
							content: res.msg,
							showCancel: false,
						})
					}
				}).catch(error => {})
			},
		}
	}
</script>

<style scoped>
	.content {position: absolute; top: 0;width: 100%;}
	.logo {
		text-align: center; 
		margin: 96rpx auto 73rpx auto;
		font-size: 48rpx;
		color: #FFFFFF;
	}
	.logo image {width: 50%;}
	.login-form {width: 630rpx; margin: auto;}
	.login-form .item {
		width: 630rpx;
		height: 84rpx;
		border-radius: 6rpx;
		margin-bottom: 33rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #4781e2;
	}
	.login-form input {color: #fff; height: 84rpx; line-height: 84rpx;}
	.login-form .item .icon{width: 36rpx; height: 40rpx;}
	.input-placeholder {color: #fff; line-height: 84rpx; height: 84rpx; margin: auto;}
	.login-form .btn{ margin: 43rpx auto 22rpx auto;
		text-align: center;
		height: 84rpx;
		line-height: 84rpx;
		border-radius: 6rpx;
		background-color: #6ea0f8;
	}
	.forgot-pwd {text-align: right;}
	.login-third .text{margin: 137rpx auto 106rpx auto; text-align: center; }
	
	.login-third .flex{text-align: center; display: flex; justify-content: space-around; }
	.login-third .flex image {width: 88rpx; height: 88rpx;}
	text{
		height: 30rpx;
		font-family: PingFang-SC-Regular;
		font-size: 32rpx;
		font-weight: bold;
		font-stretch: normal;
		line-height: 40rpx;
		letter-spacing: 3rpx;
		color: #ffffff;
	}
</style>
