<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">服务器详情</block>
		</cu-custom>
		<view class="server-info">
			<view class="">
				<view class="cu-form-group margin-top">
					<view class="title">
						<strong>K2918</strong>
					</view>
					<input name="input" disabled>192.168.111.222</input>
				</view>
				<view class="operation-title">
					操作
				</view>
				<view class="grid col-4 padding-sm bg-white operation">
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm bg-green">网络管理</button>
					</view>
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm bg-blue">重装系统</button>
					</view>
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm bg-green">重启机器</button>
					</view>
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm bg-green">重置BMC</button>
					</view>
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm bg-green">救援系统</button>
					</view>
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm bg-green">救援系统</button>
					</view>
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm bg-green">救援系统</button>
					</view>
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm bg-green">救援系统</button>
					</view>
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm bg-green">救援系统</button>
					</view>
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm bg-green">救援系统</button>
					</view>
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm bg-green">救援系统</button>
					</view>
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm bg-green">救援系统</button>
					</view>
				</view>
				<view class="operation-title">
					配置
				</view>
				<view class="cu-form-group">
					<view class="title">CPU：</view>
					<input name="input" disabled>L5630*1</input>
				</view>
				<view class="cu-form-group">
					<view class="title">内存：</view>
					<input name="input" disabled>DDR3*1</input>
				</view>
				<view class="cu-form-group">
					<view class="title">硬盘：</view>
					<input name="input" disabled>SSD*1</input>
				</view>
				<view class="cu-form-group">
					<view class="title">型号：</view>
					<input name="input" disabled>Dell-C6100</input>
				</view>
				<view class="cu-form-group">
					<view class="title">组内网：</view>
					<input name="input" disabled></input>
					<view class='cu-tag bg-blue radius'>
						否
					</view>
				</view>
			</view>
			<view class="s-title">
				售后备注：
			</view>
			<view class="cu-form-group">
				<textarea disabled value="测试备注" />
			</view>
			<view class="s-title">
				物理备注：
			</view>
			<view class="cu-form-group">
				<textarea disabled value="测试备注"></textarea>
			</view>
			<view class="s-title">
				同步备注：
			</view>
			<view class="cu-form-group">
				<textarea disabled value="测试备注" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textareaAValue: '这是一条售后备注。'
			};
		},
	}
</script>

<style lang="scss">
	.operation-title{
		margin: 15px 15px 10px 15px;
		font-weight: 600;
	}
	.s-title{
		margin: 15px 15px 10px 15px;	
	}
	.server-info{
		.cu-form-group {
			uni-textarea[disabled]{
				color: #333333 !important;
			}
		}
	}
</style>
