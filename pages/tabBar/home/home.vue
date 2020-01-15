<template>
	<view>
		<!-- 状态栏 -->
		<page-status></page-status>
		<!-- 自定义顶部导航栏 -->
		<pageHeader />
		<!-- 设备快捷入口 -->
		<view class="device">
			<view class="device-item" @tap="target('/pages/tabBar/device/access-control/list')">
				<view class="img">
					<image src="../../../static/img/home/home-1.svg" mode=""></image>
				</view>
				<view class="text">
					门禁管理
				</view>
			</view>
			<view class="device-item">
				<view class="img">
					<image src="../../../static/img/home/home-2.svg" mode=""></image>
				</view>
				<view class="text">
					潜在客户管理
				</view>
			</view>
			<view class="device-item">
				<view class="img">
					<image src="../../../static/img/home/home-3.svg" mode=""></image>
				</view>
				<view class="text">
					用户管理
				</view>
			</view>
		</view>
		<view class="m-widget">
			<view class="bg-white title-bar mt-20" >
				<view class="title-dot-light">柠檬服务器概览</view>
			</view>
			<view class="charts" >
				<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
			</view>
		</view>
		<view class="m-widget">
			<view class="bg-white title-bar mt-20" >
				<view class="title-dot-light">柠檬电源概览</view>
			</view>
			<view class="charts" >
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
			</view>
		</view>
		
		<view class="m-widget">
			<view class="bg-white title-bar mt-20" >
				<view class="title-dot-light">柠檬设备类型销售统计</view>
			</view>
			<view class="wrap sales">
				<t-table @change="change">
					<t-tr>
						<t-th>序号</t-th>
						<t-th>姓名</t-th>
						<t-th>年龄</t-th>
						<t-th>爱好</t-th>
					</t-tr>
					<t-tr v-for="item in tableList" :key="item.id">
						<t-td>{{ item.id + 1 }}</t-td>
						<t-td>{{ item.name }}</t-td>
						<t-td>{{ item.age }}</t-td>
						<t-td>{{ item.hobby }}</t-td>
					</t-tr>
				</t-table>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import pageHeader from './pageHeader.vue'
	import uCharts from '@/components/u-charts/u-charts.js';
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	var _self;
	var canvaPie = null
	var canvaColumn = null;
		
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:'',
				tableList: [{
						id: 0,
						name: '张三',
						age: '19',
						hobby: '游泳'
					},
					{
						id: 1,
						name: '李四',
						age: '21',
						hobby: '绘画'
					},
					{
						id: 2,
						name: '王二',
						age: '29',
						hobby: '滑板'
					},
					{
						id: 3,
						name: '码字',
						age: '20',
						hobby: '蹦极'
					}
				]
			};
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onLoad() {
			//console.log(mapState.token);
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		components: {
			pageHeader,
			tTable,
			tTh,
			tTr,
			tTd
		},
		methods: {
			//跳转
			target(path){
				this.$Router.push({path})
			},
			getServerData(){
				// uni.request({
				// 	url: 'https://www.ucharts.cn/data.json',
				// 	data:{
				// 	},
				// 	success: function(res) {
				// 		console.log(res.data.data)
				// 		let Pie={series:[]};
				// 		//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				// 		Pie.series=res.data.data.Pie.series;
				// 		_self.showPie("canvasPie",Pie);
				// 	},
				// 	fail: () => {
				// 		_self.tips="网络错误，小程序端请检查合法域名";
				// 	},
				// });
				
				let data = {
					"series": [{
					"name": "使用",
					"data": 30
					}, {
					"name": "试用",
					"data": 20
					}, {
					"name": "到期",
					"data": 18
					}, {
					"name": "挂起",
					"data": 28
					}, {
					"name": "正常",
					"data": 8
					}, {
					"name": "故障",
					"data": 20
					}]
				}
				let Pie={series:[]};
				Pie.series= data.series
				_self.showPie("canvasPie",Pie);
				
				
				
				let Power = {
					"categories": ["总数","租用", "托管"],
					"series": [{
						"name": "总数",
						"data": [50, 30, 36]
					},{
						"name": "开机",
						"data": [36, 22, 41]
					}, {
						"name": "关机",
						"data": [40, 16, 20]
					}]
				}
				
				Power.categories = Power.categories;
				Power.series = Power.series;
				_self.showPower("canvasColumn",Power);
			},
			showPie(canvasId,chartData){
				canvaPie=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'pie',
					fontSize:12,
					legend:{show:true},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
						  lableWidth:15
						}
					},
				});
			},
			showPower(canvasId,chartData){
				canvaColumn=new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'column',
					legend:{show:true},
					fontSize:12,
					background:'#FFFFFF',
					pixelRatio:1,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: this.cWidth,
					height: this.cHeight,
					extra: {
						column: {
							type:'group',
							width: 20
						}
					  }
				});
			},
			touchPie(e){
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
			touchColumn(e){
				canvaColumn.showToolTip(e, {
					format: function (item, category) {
						if(typeof item.data === 'object'){
							return category + ' ' + item.name + ':' + item.data.value 
						}else{
							return category + ' ' + item.name + ':' + item.data 
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	//快捷设备
	.device{
		display: grid;
		grid-gap: 20rpx;
		grid-template-columns: repeat(auto-fit, minmax(200rpx, 1fr));
		grid-template-rows: repeat(auto-fit, 200rpx);
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 40rpx 20rpx;
		background: #FFFFFF;
		.device-item{
			padding: 20rpx;
			display: flex;
			flex-wrap: wrap;
			background: linear-gradient(180deg, rgba(115, 185, 255, 1) 0%, rgba(115, 185, 255, 1) 0%, rgba(102, 153, 255, 1) 100%, rgba(102, 153, 255, 1) 100%);
			.img {
				width: 100%;
				display: flex;
				justify-content: center;
				
				image {
					width: 11vw;
					height: 11vw;
				}
			}
			.text {
				margin-top: 16rpx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24rpx;
				color: #FFFFFF;
			}
		}
	}
	
	// 统计图
	.m-widget{display:flex; flex-direction:column !important;}
	.mt-20{margin-top:20upx;}
	.bg-white{background:#FFFFFF;}
	.title-bar{width:100%; padding:30upx 2%; flex-wrap:nowrap;}
	.title-dot-light{border-left: 5upx solid #6699ff; padding-left: 10upx; font-size: 30upx;color: #000000}
	.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
	.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
	
	// 销售统计
	.sales{
		background: #FFFFFF;
		padding: 0 2% 30upx 2%;
	}
	
	// 库存
	.stock{
		display: grid;
		grid-gap: 20rpx;
		grid-template-columns: repeat(auto-fit, minmax(200rpx, 1fr));
		grid-template-rows: repeat(auto-fit, 200rpx);
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 40rpx 20rpx;
		background: #FFFFFF;
		.stock-item{
			padding: 20rpx;
			display: flex;
			flex-wrap: wrap;
		}
	}
	
</style>
