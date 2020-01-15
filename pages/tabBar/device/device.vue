<template>
	<view class="person">
		<view class="person-head">
			<view class="cu-avatar xl round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
			<view class="person-head-box">
				<view class="person-head-nickname">超级管理员</view>
				<view class="person-head-username">邮箱：slimmer9501@168.com</view>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item arrow">
				<view class="content" @tap="toTarget('/access-control/list')">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">门禁管理</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content" @tap="toTarget('/customers/list')">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">潜在客户</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content" @tap="toTarget('/user/user')">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">用户管理</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content" @tap="toTarget('version')">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">检查版本</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toTarget(url){
				this.$Router.push({ path: '/pages/tabBar/device'+url})
			}
		}
	}
</script>

<style scoped>
	uni-page-body{
		background: #FFFFFF !important;
		height: 100%;
	}
	.person-head {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 300upx;
		padding-left: 40upx;
		background: linear-gradient(to right, #365fff, #36bbff);
	}
	.person-head-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		margin-left: 20upx;
	}
	
	.person-head-nickname {
		font-size: 36upx;
		font-weight: 500;
		color: #fff;
	}
	
	.person-head-username {
		font-size: 28upx;
		font-weight: 500;
		color: #fff;
		margin-top: 20upx;
	}
	
	.person-list {
		line-height: 0;
	}
</style>
