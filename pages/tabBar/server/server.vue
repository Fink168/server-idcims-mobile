<template>
	<view>
		<view class="cu-bar bg-blue-l search">
			<view class="action" v-if="!isSearch">
				<text>首页</text>
			</view>
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="请输入搜索关键词" confirm-type="search" @focus="search" @input="inputChange" v-model="searchVal" @confirm="doSearch(false)" :adjust-position="false"></input>
				<text class="cuIcon-roundclosefill text-gray" v-if="isClear" @tap="claerVal"></text>
			</view>
			<view class="">
				<text v-if="hidecloseSearchBtn" class="cuIcon-roundclosefill lg margin-right" @tap="closeSearch"></text>
			</view>
			<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big114004.jpg); margin-right: 10px;"></view>
		</view>
		<!-- 列表 -->
		<uni-card mode="header" note="true" v-for="(item,index) in listArr" :key="index" @longtap="ejectMenu">
			<template v-slot:header>
				<view class="header-box">
					<view class="cu-list menu">
						<view class="cu-item list-item">
							<view class="content">
								<text class="text-bold">{{item.tag}}</text>
							</view>
							<view class="action">
								<view class="text-grey">{{item.main_ip}}({{item.ipquantity}})</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<view class="flex justify-center">
				<view class="flex-twice">
					<button class="cu-btn bg-blue sm round" data-target="safetyCode" @tap="getNetwork(18)">网络管理</button>
				</view>
				<view class="flex-twice">
					<button class="cu-btn bg-blue sm round" @tap="showModal" data-target="safetyCode">救援系统</button>
				</view>
				<view class="flex-twice">
					<button class="cu-btn bg-blue sm round" @tap="showModal" data-target="safetyCode">重置BMC</button>
				</view>
				<view class="flex-twice">
					<fui-switchs text="开机|关机" :sid="0" @change="switchchange"></fui-switchs>
				</view>
			</view>
			<template v-slot:footer>
				<view class="footer-box">
					<view class="footer-left">{{item.aftersale_note}}</view>
					<view class="footer-right">更多</view>
				</view>
			</template>
		</uni-card>
		<view class="text-center text-gray loading-text">{{loadingText}}</view>
		<!-- 安全码认证 -->
		<safety-code ref="safetyCode"></safety-code>
		<!-- 遮罩层 -->
		<view class="mask" v-if="isSearch"></view>
		<!-- 悬浮球 -->
		<uni-fab
			:pattern="pattern"
			:content="content"
			:horizontal="horizontal"
			:vertical="vertical"
			:direction="direction"
			@trigger="trigger">
			</uni-fab>
	</view>
</template>

<script>
	import pageHeader from '../home/pageHeader.vue'
	import safetyCode from '@/components/safety-code.vue'
	import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import uniCard from '@/components/uni-ui/uni-card/uni-card.vue'
	import fuiSwitchs from '@/components/fui-switchs/fui-switchs.vue'
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	
	
	import interfaces from '@/utils/interfaces.js'
	
	export default {
		data() {
			return {
				pattern: {
					buttonColor: '#69a2ff',
				},
				content: [
					{
						iconPath: '/static/img/common/create.svg',
						text: '新增',
					}
				],
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'horizontal',
				
				//列表数据
				listArr: [],
				//分页
				listQuery: {
					limit: 5,
					page: 1,
				},
				loadingText: '正在加载...',
				//当前路由（用于搜索跳转）
				currentUrl: this.$Route.path,
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
			pageHeader,
			HMfilterDropdown,
			uniCard,
			fuiSwitchs,
			safetyCode,
			uniFab,
		},
		onLoad() {
			this.getList();
		},
		methods: {
			//获取列表
			getList(){
				let _self = this, params = Object.assign({}, _self.listQuery);
				if(this.searchVal){
					params.search = this.searchVal
				}
				
				_self.$http.post(interfaces.Server + '/list', params).then(res => {
					if(res.result == 'success'){
						if(_self.listQuery.page > 1){
							if(res.data.records.length > 0){
								res.data.records.forEach(item => {
									_self.listArr.push(item);
								})
							}else{
								_self.loadingText = "我是有底线的";
							}
						}else{
							_self.listArr = res.data.records;
							if(res.data.records.length <= 3){
								_self.loadingText = "暂无更多数据";
							}
						}
					}
				})
			},
			//下拉刷新
			onPullDownRefresh(){
				setTimeout(() => {
					this.listQuery.page = 1;
					this.loadingText = "加载中...";
					this.listArr = [];
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
				if(this.searchVal != ''){
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
				plus.runtime.openURL(encodeURI(this.currentUrl));
				//#endif
				//#ifdef H5
				window.location.href = this.currentUrl
				//#endif
			},
			//执行搜索
			doSearch(){
				//#ifdef APP-PLUS
				plus.runtime.openURL(encodeURI(this.currentUrl + '?search=' + this.searchVal));
				//#endif
				//#ifdef H5
				window.location.href = this.currentUrl +'?search=' + this.searchVal
				//#endif
			},
			
			
			
			
			//长按弹出菜单
			ejectMenu(){
				console.log(888);
			},
			// 安全弹窗
			showModal(e) {
				this.$refs.safetyCode.showModal(e.currentTarget.dataset.target);
			},
			getNetwork(id){
				this.$Router.push({ path: '/pages/tabBar/server/network', query: { id: 18}})
			},
			//确认事件
			confirm(){},
			
			//开机-关机事件
			switchchange(){},
			
			//悬浮球事件
			trigger(){
				this.$Router.push({ path: '/pages/tabBar/server/create' })
			},
		}
	}
</script>

<style lang="scss">
	.cu-bar{
		z-index: 1000;
	}
	.flex-twice .sm{
		font-size: $uni-font-size-sm;
	}
	.list-item{
		padding-bottom: 24upx;
		border-bottom: 1px solid #e4e4e4;
	}
	.place{
		background-color: #ffffff;
		height: 80upx;
	}
</style>
