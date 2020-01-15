<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">用户管理</block>
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
			<view class="">
				<text v-if="hidecloseSearchBtn" class="cuIcon-roundclosefill lg margin-right" @tap="closeSearch"></text>
			</view>
		</view>
		<view class="cu-list menu-avatar" style="margin-top: 120upx;">
			<view 
				class="cu-item" 
				v-for="(item,index) in ListArr" 
				:key="index"
				@tap="createOrEdit(item, null)">
				<view class="cu-avatar lg bg-white" 
				:style="[{backgroundImage:'url(/static/img/common/avatar.png)'}]">
					<view v-if="item.onlinestatus == 1" class="cu-tag badge badge-success"></view>
					<view v-if="item.onlinestatus == 2" class="cu-tag badge"></view>
				</view>
				<view class="content">
					<view class="text-black">{{item.realname}}</view>
					<view class="text-gray text-sm">{{item.username}} | {{item.name}}</view>
				</view>
				<view class="action list-action grid col-2" style="z-index: 50;">
					<view class="text-blue" @tap.stop="createOrEdit(item, 'info')">详情</view>
					<view class="text-red" @tap.stop="remove(item)">删除</view>
				</view>
			</view>
		</view>
		<view class="text-center text-gray loading-text">{{loadingText}}</view>
		<view class="mask" v-if="isSearch"></view>
	</view>
</template>

<script>
	import interfaces from '@/utils/interfaces.js'
	
	export default {
		data() {
			return {
				modalName: null,
				currentUrl: this.$Route.path,
				ListArr: [],
				statusArr: [
					{id: 1, name: '正常'},
					{id: 2, name: '禁用'},
					{id: 3, name: '冻结'},
				],
				CustomBar: this.CustomBar,
				//分页
				listQuery: {
					limit: 10,
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
				//等待文本
				loadingText: '正在加载...',
				
			};
		},
		onLoad() {
			this.getList();
		},
		methods: {
			//获取数据
			getList(){
				let _self = this, params = Object.assign({}, _self.listQuery);
				if(_self.searchVal){
					params = {}
					params.search = _self.searchVal
				}
				
				_self.$http.post(interfaces.User + '/list', params).then(res => {
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
			//编辑用户
			createOrEdit(item, info){
				let url = '/pages/tabBar/device/user/create'
				if(!this.isEmpty(item)){
					if(info != null){
						this.$Router.push({ path: url, query:{id: item.id, info} })
					}else{
						this.$Router.push({ path: url, query:{id: item.id} })
					}
					return false;
				}
				console.log(url);
				this.$Router.push({ path: url })
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
		},
	}
</script>

<style lang="scss" scoped>
	.cu-list.menu-avatar{
		.cu-item {
			.list-action{
				width: 150px;
				line-height: 50px;
			}
			.action uni-view+uni-view{
				margin: 0;
				border-left: 1px dashed #ddd;
			}
		}
	}
</style>
