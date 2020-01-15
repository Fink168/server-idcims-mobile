<template>
	<view>
		<cu-custom bgColor="bg-blue-l" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">潜在客户</block>
			<block slot="right">
				<view class="lg cuIcon-roundadd" style="font-size: 40upx; padding-right: 30upx;" @tap="createOrEdit(null, null)"></view>
			</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="请输入搜索关键词" confirm-type="search" @focus="search" @input="inputChange" v-model="searchVal" @confirm="doSearch(false)" :adjust-position="false"></input>
				<text class="cuIcon-roundclosefill text-gray" v-if="isClear" @tap="claerVal"></text>
			</view>
			<view class="basis-xs screen">
				<text v-if="hidecloseSearchBtn" class="cuIcon-roundclosefill lg margin-right" @tap="closeSearch"></text>
				<view class='cu-tag screen-text' @tap="showDrawer">筛选</view>
				<uni-drawer :visible="visible" :mode="mode">
					<view class="danger-header bg-gray text-left padding-left-sm">
						<text class="text-gray">筛选</text>
					</view>
					<view class="danger-body text-left padding-left-sm">
						<view class="margin-tb-sm">
							<text class="text-gray text-xs">客户类型</text>
						</view>
						<view class="grid col-3 text-center">
							<view 
								class="radius select-item padding-tb-sm" 
								v-for="(item, index) in typeArr"
								:key="index"
								:class="filterVla.clienttype == item.id ? 'bg-blue checked' : 'bg-gray'"
								@tap="handleFilter(item, 'type')">
								{{item.name}}
							</view>
						</view>
						
						<view class="margin-tb-sm">
							<text class="text-gray text-xs">跟进计划</text>
						</view>
						<view class="grid col-3 text-center">
							<view 
								class="radius select-item padding-tb-sm" 
								v-for="(item, index) in planArr"
								:key="index"
								:class="filterVla.followupplan == item.id ? 'bg-blue checked' : 'bg-gray'"
								@tap="handleFilter(item, 'plan')">
								{{item.name}}
							</view>
						</view>
						
						<view class="margin-tb-sm">
							<view class="fl">
								<text class="text-gray text-xs">客户经理</text>
							</view>
							<view class="lg text-gray fr margin-right" :class="isFixedBox == true ? 'cuIcon-fold' : 'cuIcon-unfold'" @tap="showMore"></view>
							<view class="clearfix margin-tb-sm"></view>
						</view>
						<view class="grid col-3 text-center" :class="isFixedBox == true ? '' : 'fixed-box'" >
							<view 
								class="radius select-item padding-tb-sm" 
								v-for="(item, index) in managerArr"
								:key="index"
								:class="filterVla.accountmanagerid == item.id ? 'bg-blue checked' : 'bg-gray'"
								@tap="handleFilter(item, 'manager')">
								{{item.name}}
							</view>
						</view>
						
					</view>
					<view class="danger-footer">
						<button class="cu-btn c-btn bg-orange" @tap="reset">重置</button>
						<button class="cu-btn c-btn bg-blue-l" @tap="ok">确定</button>
					</view>
				</uni-drawer>
			</view>
		</view>
		<view class="" v-if="ListArr.length > 0">
			<view v-for="(item, index) in ListArr" :key="index"  @tap="createOrEdit(item, null)">
				<uni-card class="margin-top" mode="header" note="true">
					<template v-slot:header>
						<view class="header-box">
							<view class="left-tag" :class="item.is_clinch == 1 ? 'bg-green' : 'bg-red'">
								<text>{{item.is_clinch == 1 ? '已成交' : '未成交'}}</text>
							</view>
							<view class="cu-list menu">
								<view class="cu-item list-item" :class="modalName=='move-box-' + index ?'move-cur':''" :data-target="'move-box-' + index">
									<view class="content">
										<view class="text-title text-bold" style="width: 300upx">
											{{item.account_manager_id | filtersEnums(managerArr)}}-{{item.clients_name}}
										</view>
									</view>
									<view class="action">
										<view class="cu-tag light bg-orange radius">{{item.status | filtersEnums(statusArr)}}</view>
									</view>
								</view>
							</view>
						</view>
					</template>
					<view class="flex ">
						<view class="text-content text-left" style="max-width: 100%;">
							<view class="">
								意见：<text class="text-gray">{{item.opinion}}</text>
							</view>
							<view class="margin-top-xs">
								进度：<text class="text-gray">{{item.communicate_schedule}}</text>
							</view>
							<view class="margin-top-xs">
								备注：<text class="text-gray">{{item.note}}</text>
							</view>
							
						</view>
					</view>
					<template v-slot:footer>
						<view class="footer-box">
							<view class="footer-left">
								<text class="lg text-gray cuIcon-countdown"></text>
								<text style="padding-left: 2px;">{{item.creation_time}}</text>
							</view>
							<view class="footer-right" @tap.stop="createOrEdit(item, 'info')">更多</view>
						</view>
					</template>
				</uni-card>
			</view>
			<view class="text-center text-gray loading-text">{{loadingText}}</view>
		</view>
		<view v-else>
			<view class="margin-top bg-white" style="height: calc(100vh - 80px); line-height: calc(100vh - 100px); width: 100%; background-size: 100% 100%;">
				<view class="text-center cuIcon-emoji">
					<text>哎呀！找不数据啦</text>
				</view>
			</view>
		</view>
		
		<view class="mask" v-if="isSearch"></view>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-ui/uni-card/uni-card.vue'
	import uniDrawer from '@/components/uni-ui/uni-drawer/uni-drawer.vue'
	import interfaces from '@/utils/interfaces.js'
	
	export default {
		data() {
			return {
				modalName: null,
				CustomBar: this.CustomBar,
				//侧边弹窗状态
				visible: false,
				//侧边弹窗方向
				mode: 'right',
				typeArr: [],
				planArr: [],
				managerArr: [],
				statusArr: [],
				//只显示当前用户数据
				currentuser: '',
				//过滤值
				filterVla: {
					clienttype: this.$Route.query.clienttype != undefined ? this.$Route.query.clienttype : '',
					followupplan : this.$Route.query.followupplan != undefined ? this.$Route.query.followupplan : '',
					accountmanagerid : this.$Route.query.accountmanagerid != undefined ? this.$Route.query.accountmanagerid : '',
				},
				isFixedBox: false,
				//等待文本
				loadingText: '正在加载...',
				//列表数据
				ListArr: [],
				//分页
				listQuery: {
					limit: 5,
					page: 1,
				},
				//搜索条件
				searchVal: this.$Route.query.search != undefined ? this.$Route.query.search : '',
				//是否启动搜索
				isSearch: false,
				//是否为可清除状态
				isClear: false,
				//是否显示关闭搜索按钮
				hidecloseSearchBtn: false,
			};
		},
		components: {
			uniCard,
			uniDrawer,
		},
		onLoad() {
			this.getEnum();
			this.getPotentialCustomers();
			this.getList();
		},
		methods:{
			//获取列表
			getList(){
				let _self = this, params = Object.assign({}, _self.listQuery);
				if(_self.searchVal){
					params = {}
					params.search = _self.searchVal
				}
				//筛选
				if(!_self.isEmpty(_self.filterVla.clienttype) || !_self.isEmpty(_self.filterVla.followupplan) || !_self.isEmpty(_self.filterVla.accountmanagerid)){
					params.page = 1
					params.limit = 100
					params= Object.assign({}, params, _self.filterVla);
				}
				//请求
				_self.$http.post(interfaces.PotentialCustomers + '/list', params).then(res => {
					if(res.result == 'success'){
						if(_self.listQuery.page > 1){
							if(res.data.records.length > 0){
								res.data.records.forEach(item => {
									_self.ListArr.push(item);
								})
							}else{
								_self.loadingText = "我是有底线的";
							}
						}else{
							_self.ListArr = res.data.records;
							if(res.data.records.length <= 3){
								_self.loadingText = "暂无更多数据";
							}
						}
					}
				}).catch(error => {})
				
				//每次需要关闭搜索所有状态
				_self.isSearch = false
			},
			//下拉刷新
			onPullDownRefresh(){
				setTimeout(() => {
					this.listQuery.page = 1;
					this.loadingText = "加载中...";
					this.LogArr = [];
					this.getList();
					uni.stopPullDownRefresh();
				},800)
			},
			// 上拉加载
			onReachBottom(){
				this.listQuery.page++;
				this.getList();
			},
			//搜索
			search(){
				this.isSearch = true
				this.hidecloseSearchBtn = true
				//是否存在值
				if(!this.isEmpty(this.searchVal)){
					this.isClear = true;
				}
			},
			//清除搜索条件
			claerVal(){
				this.searchVal = '';				
				this.isClear = false;
			},
			//监听搜索输入状态
			inputChange(){
				//兼容引入组件时传入参数情况
				var val = event.detail ? event.detail.value : event;
				if (!val) {
					this.isClear = false;
					return;
				}
				this.isClear = true;
			},
			//关闭搜索
			closeSearch(){
				this.isSearch = false
				this.hidecloseSearchBtn = false
				//#ifdef APP-PLUS
				plus.runtime.openURL(encodeURI('/pages/tabBar/device/customers/list'));
				//#endif
				//#ifdef H5
				window.location.href = '/pages/tabBar/device/customers/list'
				//#endif
			},
			//执行搜索
			doSearch(){
				//#ifdef APP-PLUS
				plus.runtime.openURL(encodeURI('/pages/tabBar/device/customers/list?search=' + this.searchVal));
				//#endif
				//#ifdef H5
				window.location.href = '/pages/tabBar/device/customers/list?search=' + this.searchVal
				//#endif
			},
			//显示过滤
			showDrawer(){
				this.visible = !this.visible
			},
			//重置
			reset(){
				this.filterVla = {
					clienttype: '',
					followupplan : '',
					accountmanagerid : '',
				}
				//#ifdef APP-PLUS
				plus.runtime.openURL(encodeURI('/pages/tabBar/device/customers/list'));
				//#endif
				//#ifdef H5
				window.location.href = '/pages/tabBar/device/customers/list'
				//#endif
				this.showMore()
			},
			//确定
			ok(){
				let paramsData ='?clienttype='+this.filterVla.clienttype+'&followupplan='+this.filterVla.followupplan+'&accountmanagerid='+this.filterVla.accountmanagerid;
				//#ifdef APP-PLUS
				plus.runtime.openURL(encodeURI('/pages/tabBar/device/customers/list' + paramsData));
				//#endif
				//#ifdef H5
				window.location.href = '/pages/tabBar/device/customers/list' + paramsData
				//#endif
			},
			//获取枚举数据
			getEnum(){
				let data = "CLIENT_TYPE,FOLLOW_UP_PLAN,CUSTOMER_STATUS"
				this.$http.post(interfaces.Enum, {name: data}).then(res => {
					if(res.result == 'success'){
						this.typeArr = res.data['CLIENT_TYPE'] //类型
						this.planArr = res.data['FOLLOW_UP_PLAN'] //进度
						this.statusArr = res.data['CUSTOMER_STATUS'] //状态
					}
				}).catch(error => {})
			},
			//获取客户经理
			getPotentialCustomers(){
				this.$http.post(interfaces.PotentialCustomers + '/source').then(res => {
					if(res.result == 'success'){
						this.managerArr = res.data.data //经理
					}
				}).catch(error => {})
			},
			//处理过滤
			handleFilter(item, action){
				switch (action){
					case 'type':
						this.filterVla.clienttype = this.filterVla.clienttype != item.id ? item.id : ''
						break;
					case 'plan':
						this.filterVla.followupplan = this.filterVla.followupplan != item.id ? item.id : ''
						break;
					case 'manager':
						this.filterVla.accountmanagerid = this.filterVla.accountmanagerid != item.id ? item.id : ''
						break;
					default:
						break;
				}
			},
			//显示固定盒子
			showMore(){
				this.isFixedBox = !this.isFixedBox;
			},
			//新增
			createOrEdit(item, info){
				if(!this.isEmpty(item)){
					if(info != null){
						this.$Router.push({ path: '/pages/tabBar/device/customers/create', query:{id: item.id, info}})
					}else{
						this.$Router.push({ path: '/pages/tabBar/device/customers/create', query:{id: item.id}})
					}
					return false;
				}
				this.$Router.push({ path: '/pages/tabBar/device/customers/create'})
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding-top: 50px;
	}
	.header-box{
		position: relative;
		width: 100%;
		height: auto;
		overflow: hidden;
		.left-tag {
			position: absolute;
			width: 200upx;
			height: 44upx;
			text-align: center;
			-webkit-transform: rotate(-40deg);
			transform: rotate(-40deg);
			top: 16upx;
			left: -60upx;
			z-index: 1;
			padding-top: 1px
		}
		.text-title{
			margin-left: 60upx;
			white-space: normal;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box !important;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			word-break: break-all;
			-webkit-box-align: initial !important;
		}
	}
	.loading-text{
		height: 40upx;
		line-height: 40upx;
		margin: 30upx auto;
	}
	.mask{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.3);
	}
</style>
