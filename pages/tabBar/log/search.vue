<template>
	<view class="content bg-blue-l">
		<view class="search-box">
			<!-- mSearch组件 如果使用原样式，删除组件元素-->
			<!-- <mSearch class="mSearch-input-box" :mode="2" button="inside" :placeholder="defaultKeyword" @search="doSearch(false)" @input="inputChange" @confirm="doSearch(false)" v-model="keyword"></mSearch> -->
			<!-- 原样式 如果使用原样式，恢复下方注销代码 -->
			<view class="cu-bar search" style="min-height: 0; width: 100%;">
				<view class="action" @tap="BackPage">
					<text class="cuIcon-back_android"></text> 
				</view>
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" focus :placeholder="defaultKeyword" @input="inputChange" v-model="keyword" @confirm="doSearch(false)" :adjust-position="false">
					<text class="cuIcon-roundclosefill text-gray" v-if="isClear" @tap="claerVal"></text>
				</view>
				<view class="action">
					<button class="cu-btn bg-green round" @tap="doSearch">搜索</button>
				</view>
			</view>
			<!-- 原样式 end -->
		</view>
		<view class="search-keyword" @touchstart="blur">
			<scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
				<view class="keyword-entry" hover-class="keyword-entry-tap" v-for="row in keywordList" :key="row.keyword">
					<view class="keyword-text" @tap="doSearch(row.keyword)">
						<rich-text :nodes="row.htmlStr"></rich-text>
					</view>
					<view class="keyword-img" @tap="setkeyword(row)">
						<image src="/static/img/search/back.png"></image>
					</view>
				</view>
			</scroll-view>
			<scroll-view class="keyword-box" v-show="!isShowKeywordList" scroll-y>
				<view class="keyword-block" v-if="oldKeywordList.length>0">
					<view class="keyword-list-header">
						<view>历史搜索</view>
						<view>
							<image @tap="oldDelete" src="/static/img/search/delete.png"></image>
						</view>
					</view>
					<view class="keyword">
						<view v-for="(keyword,index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view>
					</view>
				</view>
				<!-- <view class="keyword-block">
					<view class="keyword-list-header">
						<view>热门搜索</view>
						<view>
							<image @tap="hotToggle" :src="'/static/img/search/attention'+forbid+'.png'"></image>
						</view>
					</view>
					<view class="keyword" v-if="forbid==''">
						<view v-for="(keyword,index) in hotKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view>
					</view>
					<view class="hide-hot-tis" v-else>
						<view>当前搜热门搜索已隐藏</view>
					</view>
				</view> -->
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import interfaces from '@/utils/interfaces.js'
	export default {
		data() {
			return {
				defaultKeyword: "",
				keyword: this.$Route.query.search != undefined ? this.$Route.query.search : '',
				oldKeywordList: [],
				//hotKeywordList: [],
				keywordList: [],
				//forbid: '',
				isShowKeywordList: false,
				isClear: false,
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
			},
			blur(){
				uni.hideKeyboard()
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				this.defaultKeyword = "请输入搜索关键词";
				if(!this.isEmpty(this.keyword)){
					this.isShowKeywordList = true;
					this.isClear = true;
				}
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			}, 
			//监听输入
			inputChange(event) {
				//兼容引入组件时传入参数情况
				var keyword = event.detail?event.detail.value:event;
				if (!keyword) {
					this.isShowKeywordList = false;
					this.isClear = false;
					return;
				}
				this.isShowKeywordList = true;
				this.isClear = true;
			},
			//顶置关键字
			setkeyword(data) {
				this.keyword = data.keyword;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						}
					}
				});
			},
			//执行搜索
			doSearch(key) {
				if(!this.isEmpty(this.keyword)){
					this.saveKeyword(this.keyword); //保存为历史 
				}
				//#ifdef APP-PLUS
				plus.runtime.openURL(encodeURI('/pages/tabBar/log/log?search=' + this.keyword));
				//#endif
				//#ifdef H5
				window.location.href = '/pages/tabBar/log/log?search=' + this.keyword
				//#endif
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			},
			//返回
			BackPage() {
				//#ifdef APP-PLUS
				plus.runtime.openURL(encodeURI('/pages/tabBar/log/log'));
				//#endif
				//#ifdef H5
				window.location.href = '/pages/tabBar/log/log'
				//#endif
			},
			//清除
			claerVal(){
				this.keyword = '';
				this.isShowKeywordList = false;
				this.isClear = false;
				//#ifdef APP-PLUS
				plus.runtime.openURL(encodeURI('/pages/tabBar/log/search?search=' + this.keyword));
				//#endif
				//#ifdef H5
				window.location.href = '/pages/tabBar/log/search?search=' + this.keyword
				//#endif
			},
		},
	}
</script>
<style scoped>
	.search-box {width:100%; padding:15upx 0;display:flex;justify-content:space-between;}
	.search-keyword {width:100%;background-color:rgb(242,242,242);border-top-left-radius: 30upx; border-top-right-radius: 30upx;}
	.keyword-list-box {height:calc(100vh - 110upx);padding-top:10upx;border-radius:20upx 20upx 0 0;background-color:#fff;}
	.keyword-entry-tap {background-color:#eee;}
	.keyword-entry {width:94%;height:80upx;margin:0 3%;font-size:30upx;color:#333;display:flex;justify-content:space-between;align-items:center;border-bottom:solid 1upx #e7e7e7;}
	.keyword-entry image {width:60upx;height:60upx;}
	.keyword-entry .keyword-text,.keyword-entry .keyword-img {height:80upx;display:flex;align-items:center;}
	.keyword-entry .keyword-text {width:90%;}
	.keyword-entry .keyword-img {width:10%;justify-content:center;}
	.keyword-box {height:calc(100vh - 110upx);border-radius:20upx 20upx 0 0;background-color:#fff;}
	.keyword-box .keyword-block {padding:10upx 0;}
	.keyword-box .keyword-block .keyword-list-header {width:94%;padding:10upx 3%;font-size:27upx;color:#333;display:flex;justify-content:space-between;}
	.keyword-box .keyword-block .keyword-list-header image {width:40upx;height:40upx;}
	.keyword-box .keyword-block .keyword {width:94%;padding:3px 3%;display:flex;flex-flow:wrap;justify-content:flex-start;}
	.keyword-box .keyword-block .hide-hot-tis {display:flex;justify-content:center;font-size:28upx;color:#6b6b6b;}
	.keyword-box .keyword-block .keyword>view {display:flex;justify-content:center;align-items:center;border-radius:60upx;padding:0 20upx;margin:10upx 20upx 10upx 0;height:60upx;font-size:28upx;background-color:rgb(242,242,242);color:#6b6b6b;}
</style>
