<template>
	<view>
		<view class="header">
			<!-- 面包屑 -->
			<view class="addr">
				{{position}}
			</view>
			<view class="center"></view>
			<!-- 提示信息 -->
			<view class="icon-btn">
				<view class="icon iconfont">
					<uni-drawer :visible="visible" :mode="mode">
						<view class="cu-header bg-gray">
							切换机房
						</view>
						<view class="cu-list menu solid-bottom">
							<view class="cu-item arrow" v-for="item in datacenterData" :key="item.id">
								<view class="content">
									<image src="/static/img/topBar/lemontele.svg" class="png" mode="aspectFit"></image>
									<text class="text-grey">{{item.name}}</text>
								</view>
							</view>
						</view>
						<view class="cu-list menu logout-btn">
							<view class="cu-item" @tap="submitLogout">
								<view class="content">
									<button class="cu-btn round bg-green shadow" style="width: 100%;">
										<text class="cuIcon-upload"></text>
										退出
									</button>
								</view>
							</view>
						</view>
						
					</uni-drawer>
					<view class="cu-avatar round" style="background-image:url(../../../static/img/topBar/lemontele.svg); margin-right: 10px; background-color: transparent;" @tap="showDrawer"></view>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
	</view>

</template>

<script>
	import uniDrawer from '@/components/uni-ui/uni-drawer/uni-drawer.vue'
	import { mapMutations, mapState } from 'vuex'
	import interfaces from '@/utils/interfaces.js'

	export default {
		data() {
			return {
				position: "首页",
				visible: false,
				mode: 'right',
				datacenterData: [],
			}
		},
		mounted() {
			const _self = this;
			_self.getDatacenter();
		},
		computed: mapState(['datacenter']),
		components: {
			uniDrawer
		},
		methods:{
			...mapMutations(['logout']),
			showDrawer(){
				this.visible = !this.visible
			},
			//获取机房数据
			getDatacenter(){
				this.$http.post(interfaces.Datacenter, {}).then(res => {
					this.datacenterData = res.data;
				}).catch(error => {})
			},
			//退出登录
			submitLogout(){
				this.logout();
				this.$Router.push('/pages/login/login')
			}
				
		}
	}
</script>

<style lang="scss">
	.header {
		width: 100%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		z-index: 10;
		background-color: #69a2ff;
		top: 0;
		// 条件编译 设置离顶部的高度
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */

		.addr {
			width: 120upx;
			height: 64upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;
			float: left;
			color: #ffffff;
		}
		.center{
			width: 100%;
		}
		.icon-btn {
			width: 64rpx;
			height: 64upx;
			flex-shrink: 0;
			display: flex;
			float: right;
			.datacenter {
				width: 64upx;
				height: 64upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 64upx;
			}
		}
	}

	.place {
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.cu-list.menu>.cu-item .content>uni-image{
		vertical-align: bottom;
	}
	.logout-btn{
		position: absolute;
		bottom: 100upx;
		left: 0; 
		right: 0;
		width: 200px;
		margin: auto;
	}
	.cu-header{
		height: 50px;
		line-height: 50px;
	}
</style>
