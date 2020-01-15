<template>
	<view>
		<view @tap="showModal()">
		    <slot></slot>
		</view>
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action" @tap="hideModal">取消</view>
					<view class="action text-blue" @tap="confirm">确定</view>
				</view>
				<view class="modal-content">
					<view class="grid col-3 padding-sm">
						<view v-for="(item,index) in list" class="padding-xs" :key="index">
							<button 
								class="cu-btn orange lg block" 
								:class="item.checked ? 'checked':'line-gray'" 
								@tap="ChooseCheckbox"
								:data-value="item.id"> 
								{{item.name}}
							</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				list: [],
				timer: '',
			};
		},
		props:[
			'pickerList',
			'defaultValue',
		],
		mounted() {
			let _self = this;
			this.timer = setTimeout(() => {
				_self.list = Object.assign([], _self.pickerList);
				for (let i = 0, lenI = _self.list.length; i < lenI; ++i) {
					for (let j = 0, lenJ = _self.defaultValue.length; j < lenJ; ++j) {
						if (_self.list[i].id == _self.defaultValue[j]) {
							_self.$set(_self.list[i], "checked", true)
							break;
						}else{
							_self.$set(_self.list[i], "checked", false)
						}
					}
				}
			},2000)
		},
		methods:{
			showModal(e) {
				this.modalName = 'bottomModal'
			},
			hideModal(e) {
				this.modalName = null
			},
			ChooseCheckbox(e) {
				let values = e.currentTarget.dataset.value;
				console.log(values);
				for (let i = 0, lenI = this.list.length; i < lenI; ++i) {
					if (this.list[i].id == values) {
						this.$set(this.list[i], "checked", !this.list[i].checked)
						break
					}
				}
			},
			confirm(e) {
				let picked = [];
				for (let i = 0, lenI = this.list.length; i < lenI; ++i) {
					if (this.list[i].checked ) {
						picked.push(this.list[i].id)
					}
				}
			    this.$emit('confirm', {value: picked})
			    this.hideModal()
			},
		},
		beforeDestroy() {
			clearTimeout(this.timer);
		},
	}
</script>

<style lang="scss" scoped>
	.checked{
		background: url('/static/img/common/checked.svg') no-repeat right bottom;
		background-size: auto auto;
		border: 1px solid #00a4ff;
		background-size: 21px 21px;
		color: #00a4ff;
	}
</style>
