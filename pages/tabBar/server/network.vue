<template>
	<view>
		<message ref="message"></message>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">网络管理</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">标签</view>
				<input placeholder="请输入标签标签" name="input" disabled value="K70104"><view class="text-grey">禁止编辑</view></input>
			</view>
			<view class="cu-form-group">
				<view class="title">主交换机&端口</view>
				<input placeholder="主交换机&端口" name="input" disabled value="K70104[47]"><view class="text-grey">禁止编辑</view></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">上传带宽</view>
				<input placeholder="请输入上传带宽" name="input" value="10"><button class='cu-btn bg-green shadow sm'>修改</button></input>
			</view>
			<view class="cu-form-group">
				<view class="title">下载带宽</view>
				<input placeholder="请输入下载带宽" name="input" value="10"><button class='cu-btn bg-green shadow sm'>修改</button></input>
			</view>
			<view class="cu-form-group">
				<view class="title">设置VLAN</view>
				<picker @change="PickerChange" :value="index" :range="vlan">
					<view class="picker">
						{{vlan[index]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">端口速率</view>
				<input placeholder="请输入端口速率" name="input" value="100">
				<button class='cu-btn bg-green shadow sm' @tap="portRate">修改</button>
				</input>
			</view>
			<view class="cu-form-group">
				<view class="title">端口隔离</view>
				<switch @change="portIsolationM" :class="portIsolation?'checked':''" :checked="portIsolation?true:false" data-target="safetyCode"></switch>
			</view>
			<view class="cu-form-group">
				<view class="title">端口</view>
				<switch @change="portM" :class="port?'checked':''" :checked="port?true:false" data-target="safetyCode"></switch>
			</view>
			<view class="cu-form-group">
				<view class="title">虚拟化</view>
				<switch @change="virtualizationM" :class="virtualization?'checked':''" :checked="virtualization?true:false" data-target="safetyCode"></switch>
			</view>
		</form>
		<!-- 安全码认证 -->
		<safety-code ref="safetyCode"></safety-code>
	</view>
</template>

<script>
	import safetyCode from '@/components/safety-code.vue'
	import interfaces from '@/utils/interfaces.js'
	import message from '@/components/graceui-alert/message.vue';
	
	export default {
		data() {
			return {
				index: 1,
				vlan: [1,2,3,4,5,6],
				portIsolation: false,
				port: false,
				virtualization: false,
			};
		},
		components:{
			safetyCode,
			message, 
		},
		methods: {
			// 安全弹窗
			showModal(e, sCallback, cCallback) {
				this.$refs.safetyCode.showModal(e.currentTarget.dataset.target, sCallback ,cCallback);
			},
			//端口速率
			portRate(){
				this.$refs.message.error('修改失败11111111111111111111111111111111111！', 60000)
			},
			//设置vlan
			PickerChange(e) {
				this.index = e.detail.value
			},
			//端口隔离	
			portIsolationM(e){
				let _self = this;
				_self.portRate();
				// _self.showModal(e, function(){
				// 	console.log('我触发了确定');
				// 	_self.portIsolation = e.detail.value
				// 	_self.$http.post(interfaces.portIsolationSwitch, {
				// 		id: _self.$Route.query.id,
				// 		action: "onportisolation",
				// 	}).then(res => {
				// 		if(res.result == 'success'){
				// 			console.log('开启成功');
				// 		}
				// 	}).catch(error => {
				// 		console.log('开启失败');
				// 	})
				// },function(){
				// 	console.log('我触发了取消');
				// 	_self.portIsolation = false
				// 	location.reload()
					
				// });
				
			},
			//端口
			portM(e){
				this.port = e.detail.value
			},
			//虚拟化
			virtualizationM(e){
				this.virtualization = e.detail.value
			}
		},
	}
</script>

<style lang="scss">

</style>
