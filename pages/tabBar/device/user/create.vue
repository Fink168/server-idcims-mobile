<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">用户管理-{{action}}</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="flex-sub text-center margin-tb-sm" @tap="addAvatar">
				<view class="solids avatar" v-if="defaultAvatar" :style="[{backgroundImage:'url(/static/img/common/avatar.png)','background-size': '100%'}]">
				</view>
				<view v-else class="solids avatar">
					<text class="cuIcon-cameraadd" ></text>
				</view>
				<view class="text-gray">点击设置头像</view>
			</view>
		</view>
		<view class="evan-form-show form-list" :class="$Route.query.info != undefined ? 'form-list-info' : ''">
			<evan-form :hideRequiredAsterisk="hideRequiredAsterisk" ref="userFrom" :model="userFrom">
				<evan-form-item label="账号：" prop="username">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="userFrom.username" placeholder="请输入账号" />
				</evan-form-item>
				<evan-form-item label="密码：" prop="password_hash">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="userFrom.password_hash" placeholder="请输入密码" />
				</evan-form-item>
				<view class="margin-top">
					<evan-form-item label="姓名：" prop="realname">
						<input class="form-input" v-model="userFrom.realname" placeholder="请输入姓名" placeholder-class="form-input-placeholder" />
					</evan-form-item>
				</view>
				<evan-form-item label="邮箱：" prop="email">
					<input class="form-input" v-model="userFrom.email" placeholder="请输入邮箱" placeholder-class="form-input-placeholder" />
				</evan-form-item>
				<evan-form-item label="安全码：" prop="securitycode">
					<input class="form-input" v-model="userFrom.securitycode" placeholder="请输入安全码" placeholder-class="form-input-placeholder" />
				</evan-form-item>
				<evan-form-item label="手机号：" prop="mobile">
					<input class="form-input" v-model="userFrom.mobile" placeholder="请输入手机号" placeholder-class="form-input-placeholder" />
				</evan-form-item>
				<evan-form-item label="作为上级：" prop="superior_userid" :disabled="superiorUseridDisabled">
					<radio-group  @change="powerStatusChange" style="float: right;" v-model="userFrom.mobile">
						<view class="cu-form-group fi-form-group">
							<view>
								<radio class='radio' value="1" style="transform: scale(0.6)" :checked="userFrom.superior_userid== 1 ?true:false"></radio>
							</view>
							<view style="padding: 0 20px 0 10px;">是</view>
							<view>
								<radio class='radio' value="2" style="transform: scale(0.6)" :checked="userFrom.superior_userid==2?true:false"></radio>
							</view>
							<view style="padding: 0 20px 0 10px;">否</view>
						</view>
					</radio-group>
				</evan-form-item>
				<evan-form-item label="所属上级：" prop="parentid" :disabled="superiorsDisabled">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="userFrom.parentid"
							:picker-key="pickerKey"
							:picker-list="parentArr"
							@confirm="confirm('parentid', $event)"
							:default-value="[userFrom.parentid]">
							<view class="picker">
								{{userFrom.parentid | filtersEnums(parentArr) || '请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="语言：" prop="language">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="userFrom.language"
							:picker-key="pickerKey"
							:picker-list="languageArr"
							@confirm="confirm('language', $event)"
							:default-value="[userFrom.language]">
							<view class="picker">
								{{userFrom.language | filtersEnums(languageArr) || '请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="角色：" prop="roleid">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="userFrom.roleid"
							:picker-key="pickerKey"
							:picker-list="roleArr"
							@confirm="confirm('roleid', $event)"
							:default-value="[userFrom.roleid]">
							<view class="picker">
								{{userFrom.roleid | filtersEnums(roleArr) || '请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="编号：" prop="code">
					<input class="form-input" v-model="userFrom.code" placeholder="请输入编号" placeholder-class="form-input-placeholder" />
				</evan-form-item>
				<evan-form-item label="默认机房：" prop="default_datacenter">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="userFrom.default_datacenter"
							:picker-key="pickerKey"
							:picker-list="defaultDatacenterArr"
							@confirm="confirm('default_datacenter', $event)"
							:default-value="[userFrom.default_datacenter]">
							<view class="picker">
								{{userFrom.default_datacenter | filtersEnums(defaultDatacenterArr) || '请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="管理机房：" prop="switchable_datacenter">
					<view class="cu-form-group fi-form-group">
						<multiple-picker
							class="kao-picker"
							v-model="userFrom.switchable_datacenter"
							:picker-list="switchableDatacenterArr"
							@confirm="confirm('switchable_datacenter', $event)"
							:default-value="userFrom.switchable_datacenter">
							<view class="picker">
								{{userFrom.switchable_datacenter | filtersEnums(switchableDatacenterArr, true) || '请选择'}}
							</view>
						</multiple-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="财务系统：" prop="auth_whmcs">
					<view class="cu-form-group fi-form-group">
						<multiple-picker
							class="kao-picker"
							v-model="userFrom.auth_whmcs"
							:picker-list="authWhmcsArr"
							@confirm="confirm('auth_whmcs', $event)"
							:default-value="userFrom.auth_whmcs">
							<view class="picker">
								{{userFrom.auth_whmcs | filtersEnums(authWhmcsArr, true) || '请选择'}}
							</view>
						</multiple-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="全部客户：" prop="is_viewall_clientinfo">
					<radio-group  @change="powerStatusChange" style="float: right;">
						<view class="cu-form-group fi-form-group">
							<view>
								<radio class='radio' value="1" style="transform: scale(0.6)" :checked="userFrom.is_viewall_clientinfo==1?true:false" ></radio>
							</view>
							<view style="padding: 0 20px 0 10px;">可查看</view>
							<view>
								<radio class='radio' value="2" style="transform: scale(0.6)" :checked="userFrom.is_viewall_clientinfo==2?true:false" ></radio>
							</view>
							<view style="padding: 0 20px 0 10px;">不可看</view>
						</view>
					</radio-group>
				</evan-form-item>
				<evan-form-item label="潜在客户：" prop="is_viewall_potentialclientinfo">
					<radio-group  @change="powerStatusChange" style="float: right;">
						<view class="cu-form-group fi-form-group">
							<view>
								<radio class='radio' value="1" style="transform: scale(0.6)" :checked="userFrom.is_viewall_potentialclientinfo==1?true:false" ></radio>
							</view>
							<view style="padding: 0 20px 0 10px;">可查看</view>
							<view>
								<radio class='radio' value="2" style="transform: scale(0.6)" :checked="userFrom.is_viewall_potentialclientinfo==2?true:false" ></radio>
							</view>
							<view style="padding: 0 20px 0 10px;">不可看</view>
						</view>
					</radio-group>
				</evan-form-item>
				<evan-form-item label="用户状态：" prop="state">
					<radio-group  @change="powerStatusChange" style="float: right;">
						<view class="cu-form-group fi-form-group">
							<view>
								<radio class='radio' value="2" style="transform: scale(0.6)" :checked="userFrom.state == 2 ? true : false" ></radio>
							</view>
							<view style="padding:0 10px;">正常</view>
							<view>
								<radio class='radio' value="1" style="transform: scale(0.6)" :checked="userFrom.state == 1 ? true : false" ></radio>
							</view>
							<view style="padding: 0 10px;">冻结</view>
							<view>
								<radio class='radio' value="-1" style="transform: scale(0.6)" :checked="userFrom.state == -1 ? true : false" ></radio>
							</view>
							<view style="padding: 0 10px;">删除</view>
						</view>
					</radio-group>
				</evan-form-item>
			</evan-form>
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
	</view>
</template>

<script>
	import EvanForm from '@/components/evan-form/evan-form.vue'
	import EvanFormItem from '@/components/evan-form/evan-form-item.vue'
	import MyPicker from '@/components/kao-picker/Picker.vue';
	import MultiplePicker from '@/components/kao-picker/multiple-picker.vue';
	import interfaces from '@/utils/interfaces.js'
	
	export default {
		data() {
			return {
				//当前动作（新增，编辑，详情）
				action: '新增', 
				hideRequiredAsterisk: false,
				pickerKey: {value: 'id', label: 'name', children: 'children'},
				userFrom: {
					username: '',
					password_hash: '',
					realname: '',
					email: '',
					securitycode: '',
					mobile: '',
					parentid: '',
					superior_userid: 2,
					roleid: '',
					headportraiturl: 'images/system/avatar.png',
					language: 1,
					countrycode: "86",
					state:2,
					default_datacenter: '',
					code:'',
					auth_whmcs: [],
					switchable_datacenter:[],
					is_viewall_potentialclientinfo: 2,
					is_viewall_clientinfo: 2,
				},
				titleText: {
					username: '账号',
					password_hash: '密码',
					realname: '姓名',
					email: '邮箱',
					securitycode: '安全码',
					mobile: '手机号',
					countrycode: "手机区号",
					superior_userid: '是否作为上级',
					parentid: '所属上级',
					roleid: '所属角色',
					headportraiturl: '头像',
					language: '语言',
					state: '状态',
					default_datacenter: '默认机房',
					code:'编码',
					auth_whmcs: '管理财务系统',
					switchable_datacenter: '管理机房',
					is_viewall_clientinfo: '全部客户',
					is_viewall_potentialclientinfo: '全部潜在客户',
				},
				parentArr: [],
				languageArr: [],
				roleArr: [],
				defaultDatacenterArr: [],
				switchableDatacenterArr: [],
				authWhmcsArr: [],
				rules: {},
				//表单不验证字段
				noValidation: [
					'code',
					'headportraiturl',
				],
				//是否禁用所属上级
				superiorsDisabled: false,
				//是否禁用作为上级
				superiorUseridDisabled: false,
				//默认头像
				defaultAvatar: false,
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
			this.getDrop();
			this.getDefaultDatacenter();
			this.getRoleList();
			this.getSuperiors();
			if(this.$Route.query.info == undefined){
				this.handleBs();
			}
			
			// 这里必须放在$nextTick中，不然h5会找不到this.$refs.form
			this.$nextTick(() => {
				this.$refs.userFrom.setRules(this.rules)
			})
			
			for( var key in this.userFrom ){
				//不验证过滤
				if (!this.noValidation.includes(key)) {
					//新增验证参数
					this.rules[key] = {
						required: true,
						message: this.titleText[key] + '不能为空'
					}
				}
			}
			
			//是否获取详情数据
			if(!this.isEmpty(this.$Route.query.id)){
				this.defaultAvatar = true;
				this.getDetailData();
				if(this.$Route.query.info == undefined){
					this.action = '编辑';
				}else{
					this.action = '详情';
				}
			}
		},
		methods:{
			chooseImage(){
				
			},
			//单选处理
			confirm(type, picked) {
			    this.userFrom[type] = picked.value
			},
			save(){
				let submitAddress = this.$Route.query.id ? '/update' : '/create';
				this.$refs.userFrom.validate((res) => {
					if (res) {
						this.$http.post(interfaces.User + submitAddress, this.userFrom).then(res => {
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
			addAvatar(){
				uni.showActionSheet({
				    itemList: ['拍照', '从手机相册选择', '使用默认头像'],
				    success: (e) => {
						switch(e.tapIndex){
							case 0:
								uni.showToast({
									title: '功能正在开发中',
									duration: 2000
								})
								break;
							case 1:
								uni.showToast({
									title: '功能正在开发中',
									duration: 2000
								})
								break;
							case 2:
								this.defaultAvatar = true;
								break;
							default:
								break;
						}
				    }
				})
			},
			//获取枚举数据
			getEnum(){
				let data = "LANGUAGE,PLATWHMCSCODE";
				this.$http.post(interfaces.Enum, {name: data}).then(res => {
					if(res.result == 'success'){
						this.languageArr = res.data['LANGUAGE'] //语言
						this.authWhmcsArr = res.data['PLATWHMCSCODE'] //管理财务系统
					}
				}).catch(error => {})
			},
			//获取管理机房
			getDrop(){
				this.$http.post(interfaces.User + '/source-dtacenter').then(res => {
					this.switchableDatacenterArr = res.data
				});
			},
			//获取more机房
			getDefaultDatacenter(){
				this.$http.post(interfaces.User + '/datacenter-and-user-data').then(res => {
					this.defaultDatacenterArr = res.data.datacente_list
				});
			},
			//获取角色列表
			getRoleList(){
				this.$http.post(interfaces.User + '/source').then(res => {
					this.roleArr = res.data
				}).catch(() => {});
			},
			//获取所属上级
			getSuperiors(id){
				this.$http.post(interfaces.User + '/all-superior-userid', {id}).then(res => {
					this.parentArr = res.data.data
					if(res.data.editable == 2){ //是否禁用上级选项（1是，2否）
						this.superiorsDisabled = true;
					}else{
						this.superiorsDisabled = false;
					}
				}).catch(() => {});
			},
			//处理是否作为上级
			handleBs(){
				this.$http.post(interfaces.User + '/edit-superior-userid').then(res => {
					if(res.data.superior_userid == 1){//是否作为上级（1是，2否）
						this.superiorUseridDisabled = false;
					}else{
						this.superiorUseridDisabled = true;
					}
				}).catch(() => {});
			},
			//详情数据
			getDetailData(){
				this.$http.post(interfaces.User + '/detail', {id: this.$Route.query.id}).then(res => {
					if(res.result == 'success'){
						this.userFrom = res.data
					}
				}).catch(error => {})
			},
		}
	}
</script>

<style lang="scss">
	.avatar{
		width: 120upx;
		height: 120upx;
		line-height: 120upx;
		border-radius: 50% !important;
		margin: 20upx auto;
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
