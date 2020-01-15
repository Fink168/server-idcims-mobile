<template>
	<view>
		<!-- 安全码认证 -->
		<view class="cu-modal" :class="modalName=='safetyCode'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">安全码</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="cu-form-group" style="border-bottom: 1px solid #e4e4e4;">
					<input placeholder="请输入安全码" name="input" type="password" v-model="scodeValue"></input>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="submitValidation">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import interfaces from '@/utils/interfaces.js'
	//let getFun = null;
	export default {
		data() {
			return {
				modalName: null,
				scodeValue: '',
				successCallback: '',
				cancelCallback: '',
			};
		},
		methods: {
			// 安全弹窗
			showModal(data, sCallback, cCallback) {
				this.modalName = data
				this.successCallback = sCallback; //确定回调
				this.cancelCallback = cCallback; //取消回调
			},
			//隐藏弹窗
			hideModal(type) {
				this.modalName = null
				if(typeof this.cancelCallback == 'function' && type != 'success'){
					this.cancelCallback();
				}
			},
			//提交验证
			submitValidation(){
				this.$http.post(interfaces.SafetyCode, {securitycode: this.scodeValue}).then(res => {
					if(res.result == 'success'){
						this.hideModal('success');
						this.scodeValue = '';
						if(typeof this.successCallback == 'function'){
							this.successCallback();
						}
					}
				}).catch(error => {})
			},
		}
	}
</script>

<style lang="scss">

</style>
