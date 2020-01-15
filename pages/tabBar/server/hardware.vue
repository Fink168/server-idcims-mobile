<template>
	<view>
		<view class="list uni-row uni-flex margin-top">
		    <view class="uni-flex uni-flex-item">
		        <view class="uni-flex uni-row color-nav" style="writing-mode:tb-rl">
					CPU
		        </view>
		
				<view class="uni-flex-item">
					<view class="li uni-flex-item" v-for="(item, i) in hardwareForm.cpu" :key="i">
						<view class="uni-row uni-flex" style="justify-content: space-between;background: #fff; padding: 32upx 20upx;">
							<view class="uni-flex" style="align-self: center;padding-right: 5px; flex-basis: 400upx;">
								<view class="cu-form-group fi-form-group">
									型号：<my-picker
										class="kao-picker"
										style="width: 100px;;"
										v-model="item.stock_in_id"
										:picker-key="pickerKey"
										:picker-list="hardwareData.cpu" 
										@confirm="confirm('singleColumn', $event)"
										:default-value="[item.stock_in_id]">
										<view class="picker">
											{{'请选择'}}
										</view>
									</my-picker>
								</view>
							</view>
							<view class="uni-flex" style="align-self: center;">
								<view class="cu-form-group fi-form-group">
									数量：
									<input 
									class="uni-flex-item" 
									type="text" 
									v-model="item.quantity"
									placeholder="数量" 
									style="background: #f3f3f3;padding: 5px;flex: 1;" />
								</view>
							</view>
							<view class="uni-flex cuIcon-deletefill lg text-red" style="align-self: center; margin-left: 10px;" @tap="delTable('cpu',i)"></view>
						</view>	
					</view>
					<view class="li uni-flex-item" @tap="addItem('cpu')">
						<view class="uni-row uni-flex" style="justify-content: center;background: #fff;padding: 10px;">
							添加
						</view>
					</view>
				</view>
		    </view>
		</view>
		<view class="list uni-row uni-flex margin-top">
		    <view class="uni-flex uni-flex-item">
		        <view class="uni-flex uni-row color-nav" style="writing-mode:tb-rl">
					内存
		        </view>
		
				<view class="uni-flex-item">
					<view class="li uni-flex-item" v-for="(item, i) in hardwareForm.ram" :key="i">
						<view class="uni-row uni-flex" style="justify-content: space-between;background: #fff; padding: 32upx 20upx;">
							<view class="uni-flex" style="align-self: center;padding-right: 5px; flex-basis: 400upx;">
								<view class="cu-form-group fi-form-group">
									型号：<my-picker
										class="kao-picker"
										style="width: 100px;;"
										v-model="item.stock_in_id"
										:picker-key="pickerKey"
										:picker-list="hardwareData.ram" 
										@confirm="confirm('singleColumn', $event)"
										:default-value="[item.stock_in_id]">
										<view class="picker">
											{{'请选择'}}
										</view>
									</my-picker>
								</view>
							</view>
							<view class="uni-flex" style="align-self: center;">
								<view class="cu-form-group fi-form-group">
									数量：
									<input 
									class="uni-flex-item" 
									type="text" 
									v-model="item.quantity"
									placeholder="数量" 
									style="background: #f3f3f3;padding: 5px;flex: 1;" />
								</view>
							</view>
							<view class="uni-flex cuIcon-deletefill lg text-red" style="align-self: center; margin-left: 10px;" @tap="delTable('ram',i)"></view>
						</view>
					</view>
					<view class="li uni-flex-item" @tap="addItem('ram')">
						<view class="uni-row uni-flex" style="justify-content: center;background: #fff;padding: 10px;">
							添加
						</view>
					</view>
				</view>
		    </view>
		</view>
		<view class="list uni-row uni-flex margin-top">
		    <view class="uni-flex uni-flex-item">
		        <view class="uni-flex uni-row color-nav" style="writing-mode:tb-rl">
					硬盘
		        </view>
		
				<view class="uni-flex-item">
					<view class="li uni-flex-item" v-for="(item, i) in hardwareForm.harddisk" :key="i">
						<view class="uni-row uni-flex" style="justify-content: space-between;background: #fff; padding: 32upx 20upx;">
							<view class="uni-flex" style="align-self: center;padding-right: 5px; flex-basis: 400upx;">
								<view class="cu-form-group fi-form-group">
									型号：<my-picker
										class="kao-picker"
										style="width: 100px;;"
										v-model="item.stock_in_id"
										:picker-key="pickerKey"
										:picker-list="hardwareData.harddisk" 
										@confirm="confirm('singleColumn', $event)"
										:default-value="[item.stock_in_id]">
										<view class="picker">
											{{'请选择'}}
										</view>
									</my-picker>
								</view>
							</view>
							<view class="uni-flex" style="align-self: center;">
								<view class="cu-form-group fi-form-group">
									数量：
									<input 
									class="uni-flex-item" 
									type="text" 
									v-model="item.quantity"
									placeholder="数量" 
									style="background: #f3f3f3;padding: 5px;flex: 1;" />
								</view>
							</view>
							<view class="uni-flex cuIcon-deletefill lg text-red" style="align-self: center; margin-left: 10px;" @tap="delTable('harddisk',i)"></view>
						</view>
					</view>
					<view class="li uni-flex-item" @tap="addItem('harddisk')">
						<view class="uni-row uni-flex" style="justify-content: center;background: #fff;padding: 10px;">
							添加
						</view>
					</view>
				</view>
		    </view>
		</view>
	</view>
</template>

<script>
	import MyPicker from '@/components/kao-picker/Picker.vue';
	export default {
		components: {
			MyPicker,
		},
		props:[
			'hardwareForm',
			'hardwareData',
		],
		data() {
			return {
				pickerKey: {value: 'id', label: 'name', children: 'children'},
			};
		},
		methods: {
			confirm(type, picked) {
			    this.demos[type].picked = picked
			},
			addItem(type){
				this.hardwareForm[type].push({
				    stock_in_id: '',
				    quantity: '1',
				})
			},
			delTable(type, index) {
				this.hardwareForm[type] = this.hardwareForm[type].filter((item, i) => {
				    if (i != index) {
				        return type;
				    }
				})
			}
		}
	}
</script>

<style lang="scss">
	.color-nav {
	    flex-direction: column;
	    box-sizing: border-box;
	    width: 0px;
	    padding: 5px 12px;
	    justify-content: center;
	    align-items: center;
		background: #0A98D5;
		color: #ffffff;
	}
	.red {
	    border: 1px solid #DD524D;
	}
	
	.list {
	    box-sizing: border-box;
	
	    .li {
	        padding: 1px 0;
	        box-sizing: border-box;
	    }
	}
</style>
