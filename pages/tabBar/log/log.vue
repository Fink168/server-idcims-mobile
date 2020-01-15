<template>
	<view>
		<view class="cu-bar bg-blue-l search">
			<view class="action">
				<text>首页</text>
			</view>
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" v-model="searchVal" :adjust-position="false" type="text" placeholder="搜索标签、IP、备注" confirm-type="search"></input>
				
			</view>
			<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big114004.jpg); margin-right: 10px;"></view>
		</view>
		<!-- 导航 -->
		<view class="flex">
			<view class="basis-xl" style="max-width: 80%;">
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" :class="index == TabCur ? 'text-green cur' : ''" v-for="(item,index) in navArr" :key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</scroll-view>
			</view>
			<view class="basis-xs screen">
				<view class='cu-tag screen-text' @tap="showDrawer">筛选</view>
				<uni-drawer :visible="visible" :mode="mode">
					<view class="danger-header bg-gray text-left padding-left-sm">
						<text class="text-gray">筛选</text>
					</view>
					<view class="danger-body text-left padding-left-sm">
						<view class="margin-tb-sm">
							<text class="text-gray text-xs">所在平台</text>
						</view>
						<view class="select-box text-center">
							<view 
								class="radius select-item padding-tb-sm"
								:class="platformVla == item ? 'light bg-blue' : 'bg-gray'"
								v-for="(item,index) in platformArr" 
								:key="index" 
								@tap="selectPlatform(item)">
								{{item}}
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
		<!-- 列表 -->
		<uni-card mode="header" note="true" v-for="(item, index) in LogArr" :key="index">
			<template v-slot:header>
				<view class="header-box">
					<view class="cu-list menu">
						<view class="cu-item list-item" :class="modalName=='move-box-' + index ?'move-cur':''" :data-target="'move-box-' + index">
							<view class="content">
								<view class="text-title text-bold" style="width: 300upx">
									{{item.visitors}}
								</view>
							</view>
							<view class="action">
								<view class="text-grey">{{item.ip}}</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<view class="flex justify-center">
				<view class="text-content" style="max-width: 100%;">
					<text>{{item.description}}</text>
				</view>
			</view>
			<template v-slot:footer>
				<view class="footer-box">
					<view class="footer-right">{{item.platform}}</view>
				</view>
			</template>
		</uni-card>
		<view class="text-center text-gray loading-text">{{loadingText}}</view>
	</view>
</template>

<script>
	import pageHeader from '../home/pageHeader.vue'
	import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import uniCard from '@/components/uni-ui/uni-card/uni-card.vue'
	import fuiSwitchs from '@/components/fui-switchs/fui-switchs.vue'
	import interfaces from '@/utils/interfaces.js'
	import uniDrawer from '@/components/uni-ui/uni-drawer/uni-drawer.vue'
	
	export default {
		data() {
			return {
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				loadingText: '正在加载...',
				filterDropdownValue: '',
				//导航参数
				navArr: [
					'API日志',
					'弱电日志',
					'内网安全日志',
				],
				TabCur: 0,
				scrollLeft: 0,
				//列表数据
				LogArr: [],
				//分页
				listQuery: {
					limit: 5,
					page: 1,
				},
				//搜索条件
				searchVal: this.$Route.query.search != undefined ? this.$Route.query.search : '',
				//侧边弹窗状态
				visible: false,
				//侧边弹窗方向
				mode: 'right',
				//平台数据
				platformArr: ["dcmanager", "fireline", "lemontele", "python-script", "server-idcims", "whmcs-dev-whmcs", "wtt"],
				//所选平台
				platformVla: '',
			};
		},
		components: {
			pageHeader,
			HMfilterDropdown,
			uniCard,
			fuiSwitchs,
			uniDrawer
		},
		onLoad() {
			this.getList();
		},
		methods: {
			//导航拖动
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			//获取日志列表
			getList(){
				let _self = this, params = Object.assign({}, _self.listQuery);
				if(this.searchVal){
					params.search = this.searchVal
				}
				if(this.platformVla){
					params.platform = this.platformVla
				}
				
				_self.$http.post(interfaces.apiLog, params).then(res => {
					if(res.result == 'success'){
						if(this.listQuery.page > 1){
							res.data.records.forEach(item => {
								_self.LogArr.push(item);
							})
						}else{
							_self.LogArr = res.data.records;
						}
					}
				})
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
			//点击触发搜索
			InputFocus(){
				this.$Router.push({ path: '/pages/tabBar/log/search', query: {search: this.searchVal}})
			},
			//侧边弹窗
			showDrawer(){
				this.visible = !this.visible
			},
			//根据平台过滤
			selectPlatform(item){ //刷新条件会丢失
				this.platformVla = item;
				this.getList();
			},
			//重置
			reset(){
				this.platformVla = '';
				this.getList()
			},
			//确定
			ok(){
				this.visible = !this.visible
			}
		}
	}
</script>

<style lang="scss">
	.top-nav{
		width: 80%;
	}
	.text-title{
		white-space: normal;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-break: break-all;
		-webkit-box-align: initial !important;
	}
	.text-content{
		word-break:break-all;
	}
	.loading-text{
		height: 60upx;
	}
	.cu-bar{
		z-index: 102;
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
