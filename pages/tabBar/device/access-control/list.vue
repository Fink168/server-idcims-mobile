<template>
	<view>
		<cu-custom bgColor="bg-blue-l" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">门禁管理</block>
		</cu-custom>
		<view v-if="doorsArr.length > 0">
			<view class="grid col-2 text-center">
				<view 
					class="radius select-item padding-tb-sm" 
					v-for="(door, index) in doorsArr"
					:key="door.id"
					@tap="open(door)">
					<view class="padding-lr-sm">
						<view class="bg-white padding-tb-lg">
							<view v-if="door.door_status == 1" class="cu-avatar xl round bg-green">
								<image class="img" src="../../../../static/img/device/open_doors.svg"></image>
							</view>
							<view v-if="door.door_status == 2" class="cu-avatar xl round bg-red">
								<image class="img" src="../../../../static/img/device/close_doors.svg"></image>
							</view>
							<view v-if="door.door_status == 3" class="cu-avatar xl round bg-yellow">
								<image class="img" src="/static/img/device/fault_doors.svg"></image>
							</view>
							<view class="text-green margin-top" v-if="door.link_status == 2">已连接</view>
							<view class="text-red margin-top" v-if="door.link_status == 1">未连接</view>
							<view class="margin-tb-xs">
								{{door.tag}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="margin-top bg-white" style="height: calc(100vh - 80px); line-height: calc(100vh - 80px); width: 100%; background-size: 100% 100%;">
			<view class="text-center ">
				<text>暂无数据</text>
			</view>
		</view>
		<!-- 提示 -->
		<messages ref="FXmessages" @complete="FXmessages = $refs.FXmessages" ></messages>
	</view>
</template>

<script>
	import interfaces from '@/utils/interfaces.js'
	
	export default {
		data() {
			return {
				doorsArr: [],
			};
		},
		onLoad() {
			this.getJanitor();
		},
		methods:{
			//门禁管理
			getJanitor(){
				this.$http.post(interfaces.JanitorUser+'/list').then(res => {
					if(res.result == 'success'){
						this.doorsArr = res.data.doors;
					}
				})
			},
			//开门
			open(row){
				this.$http.post(interfaces.Janitor+'/extend', {
					action: "unbolt",
					tags: [row.tag],
					open_delay: 10
				}).then(res => {
					if(res.result == 'success'){
						this.FXmessages.success(res.msg)
					}else{
						this.FXmessages.error(res.msg)
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	.bg-red-copy{
		background: #f66;
	}
	.img{
		width: 30px;
		height: 30px;
	}
</style>
