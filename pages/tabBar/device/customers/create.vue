<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">潜在客户-{{action}}</block>
		</cu-custom>
		<view class="evan-form-show margin-top form-list" :class="$Route.query.info != undefined ? 'form-list-info' : ''">
			<evan-form :hideRequiredAsterisk="hideRequiredAsterisk" ref="formModel" :model="formModel">
				<evan-form-item label="客户经理：" prop="account_manager_id">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="formModel.account_manager_id"
							:picker-key="pickerKey"
							:picker-list="managerArr" 
							@confirm="confirm('account_manager_id', $event)"
							:default-value="[formModel.account_manager_id]">
							<view class="picker">
								{{formModel.account_manager_id | filtersEnums(managerArr) || '请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="客户名称：" prop="clients_name">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="formModel.clients_name" placeholder="请输入客户名称" />
				</evan-form-item>
				<evan-form-item label="客户QQ：" prop="qq">
					<input type="number" class="form-input" placeholder-class="form-input-placeholder" v-model="formModel.qq" placeholder="请输入客户qq" />
				</evan-form-item>
				<evan-form-item label="客户电话：" prop="contact_number">
					<input type="number" class="form-input" placeholder-class="form-input-placeholder" v-model="formModel.contact_number" placeholder="请输入客户电话" />
				</evan-form-item>
				<evan-form-item label="客户网站：" prop="website">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="formModel.website" placeholder="请输入客户网站" />
				</evan-form-item>
				<evan-form-item label="客户类型：" prop="client_type">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="formModel.client_type"
							:picker-key="pickerKey"
							:picker-list="clientTypeArr" 
							@confirm="confirm('client_type', $event)"
							:default-value="[formModel.client_type]">
							<view class="picker">
								{{formModel.client_type | filtersEnums(clientTypeArr) || '请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="是否成交：" prop="is_clinch">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="formModel.is_clinch"
							:picker-key="pickerKey"
							:picker-list="ynArr" 
							@confirm="confirm('is_clinch', $event)"
							:default-value="[formModel.is_clinch]">
							<view class="picker">
								{{formModel.is_clinch | filtersEnums(ynArr) || '请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="是否测试：" prop="is_test">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="formModel.is_test"
							:picker-key="pickerKey"
							:picker-list="ynArr" 
							@confirm="confirm('is_test', $event)"
							:default-value="[formModel.is_test]">
							<view class="picker">
								{{formModel.is_test | filtersEnums(ynArr) || '请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="采购负责人：" prop="is_headof_procurement">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="formModel.is_headof_procurement"
							:picker-key="pickerKey"
							:picker-list="ynArr" 
							@confirm="confirm('is_headof_procurement', $event)"
							:default-value="[formModel.is_headof_procurement]">
							<view class="picker">
								{{formModel.is_headof_procurement | filtersEnums(ynArr) || '请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="跟进计划：" prop="follow_up_plan">
					<view class="cu-form-group fi-form-group">
						<multiple-picker
							class="kao-picker"
							v-model="formModel.follow_up_plan"
							:picker-list="planArr"
							@confirm="confirm('follow_up_plan', $event)"
							:default-value="formModel.follow_up_plan">
							<view class="picker">
								{{formModel.follow_up_plan | filtersEnums(planArr, true) || '请选择'}}
							</view>
						</multiple-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="创建日期：" prop="creation_time">
					<view class="cu-form-group fi-form-group">
						<picker style="width: 100%;" @change="onDateChange" mode="date" v-model="formModel.creation_time" :value="formModel.creation_time" :start="startTimer" end="2020-09-01">
							<view class="picker">{{formModel.creation_time||'请选择创建日期'}}</view>
						</picker>
					</view>
				</evan-form-item>
				<evan-form-item label="客户状态：" prop="status">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="formModel.status"
							:picker-key="pickerKey"
							:picker-list="statusArr" 
							:default-value="[formModel.status]"
							@confirm="confirm('status', $event)">
							<view class="picker">
								{{formModel.status | filtersEnums(statusArr) || '请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="主打产品：" prop="companys_flagship_product">
					<view class="cu-form-group fi-form-group">
						<textarea maxlength="-1" placeholder="请输入主打产品" v-model="formModel.companys_flagship_product"></textarea>
					</view>
				</evan-form-item>
				<evan-form-item label="沟通进度：" prop="communicate_schedule">
					<view class="cu-form-group fi-form-group">
						<textarea maxlength="-1" placeholder="请输入沟通进度" v-model="formModel.communicate_schedule"></textarea>
					</view>
				</evan-form-item>
				<evan-form-item label="意见建议：" prop="opinion">
					<view class="cu-form-group fi-form-group">
						<textarea maxlength="-1" placeholder="请输入意见建议" v-model="formModel.opinion"></textarea>
					</view>
				</evan-form-item>
				<evan-form-item label="备注：" prop="remark">
					<view class="cu-form-group fi-form-group">
						<textarea maxlength="-1" placeholder="请输入备注" v-model="formModel.remark"></textarea>
					</view>
				</evan-form-item>
			</evan-form>
		</view>
		<view class="save bg-white grid col-2" v-if="$Route.query.info == undefined">
			<view @click="cancel" class="cancel">
				<view class="cancel-text">
					取消
				</view>
			</view>
			<view @click="save" class="confirm">
				<view class="confirm-text">
					保存
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { formatDate } from '@/utils/index.js'
	import EvanForm from '@/components/evan-form/evan-form.vue'
	import EvanFormItem from '@/components/evan-form/evan-form-item.vue'
	import interfaces from '@/utils/interfaces.js'
	import MyPicker from '@/components/kao-picker/Picker.vue';
	import MultiplePicker from '@/components/kao-picker/multiple-picker.vue';
	
	export default {
		data() {
			const DATE = formatDate(new Date());
			return {
				action: '新增',
				pickerKey: {value: 'id', label: 'name', children: 'children'},
				hideRequiredAsterisk: false,
				//客户经理
				managerArr: [],
				//客户类型
				clientTypeArr: [],
				//是否数据
				ynArr: [
					{id: 1, name: '是'},
					{id: 2, name: '否'},
				],
				//跟进计划
				planArr: [],
				modalName: null,
				
				//状态
				statusArr: [],
				
				//表单模型
				formModel:{
					account_manager_id: '',
					clients_name: '',
					contact_number: '',
					qq: '',
					website: '',
					client_type: 1,
					is_clinch: 2,
					is_test: 2,
					communicate_schedule: '',
					companys_flagship_product: '',
					is_headof_procurement: 2,
					opinion: '',
					follow_up_plan: [],
					creation_time: DATE,
					remark: '',
					status: 1,
				},
				//表单验证规则
				rules: {
				},
				//表单不验证字段
				noValidation: [
					'contact_number',
					'qq',
					'website',
					'companys_flagship_product',
					'remark',
				],
				//起始日期
				startTimer: DATE,
				
			};
		},
		components: {
			EvanForm,
			EvanFormItem,
			MyPicker,
			MultiplePicker,
		},
		onLoad() {
			this.getEnum();
			this.getPotentialCustomers();
			
			for( var key in this.formModel ){
				//不验证过滤
				if (!this.noValidation.includes(key)) {
					//新增验证参数
					this.rules[key] = {
						required: true,
						message: key + '参数不能为空'
					}
				}
			}
			
			// 这里必须放在$nextTick中，不然h5会找不到this.$refs.form
			this.$nextTick(() => {
				this.$refs.formModel.setRules(this.rules)
			})
			
			if(!this.isEmpty(this.$Route.query.id)){
				this.getDetailData();
				if(this.$Route.query.info == undefined){
					this.action = '编辑';
				}else{
					this.action = '详情';
				}
			}
		},
		methods: {
			//单选处理
			confirm(type, picked) {
			    this.formModel[type] = picked.value
			},
			//提交表单
			save() {
				let submitAddress = this.$Route.query.id ? '/update' : '/create';
				this.$refs.formModel.validate((res) => {
					if (res) {
						this.$http.post(interfaces.PotentialCustomers + submitAddress, this.formModel).then(res => {
							if(res.result == 'success'){
								uni.showToast({
									title: res.msg
								})
							}
						}).catch(error => {
							uni.showToast({
								title: res.msg,
								duration: 2000
							})
						})
					}
				})
			},
			cancel(){
				uni.navigateBack({
					delta: 1
				});
			},
			//获取枚举数据
			getEnum(){
				let data = "CLIENT_TYPE,FOLLOW_UP_PLAN,CUSTOMER_STATUS"
				this.$http.post(interfaces.Enum, {name: data}).then(res => {
					if(res.result == 'success'){
						this.clientTypeArr = res.data['CLIENT_TYPE'] //类型
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
			
			//详情数据
			getDetailData(){
				this.$http.post(interfaces.PotentialCustomers + '/detail', {id: this.$Route.query.id}).then(res => {
					if(res.result == 'success'){
						this.formModel = res.data
					}
				}).catch(error => {})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.submit-btn{
		width: 100%;
		position: fixed;
		bottom: 0;
		button{
			border-radius: 0;
		}
	}
	.form-list{
		margin-bottom: 140upx;
	}
	.form-list-info{
		margin-bottom: 30upx;
	}
	.save{
		width: 100%;
		position: fixed;
		bottom: 0;
		padding: 8upx;
		border-top: 1px solid #ddd;
	}
	.cancel, .confirm{
		padding: 8upx;
	}
	.cancel-text{
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		border: 1px solid #ddd;
	}
	.confirm-text{
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		background: #1da2ff;
		color: #fff;
	}
</style>
