<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">服务器-新增</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" 
					:class="index==TabCur?'text-blue cur':''" 
					v-for="(item, index) in title" 
					:key="index" 
					@tap="tabSelect" 
					:data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view class="evan-form-show margin-top">
			<evan-form :hideRequiredAsterisk="hideRequiredAsterisk" ref="form1" :model="form1">
				<evan-form-item label="设备标签：" prop="tag">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="form1.tag" placeholder="请输入设备标签" />
				</evan-form-item>
				<evan-form-item label="数据标签：" prop="data_tag">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="form1.data_tag" placeholder="请输入数据标签" />
				</evan-form-item>
				<evan-form-item label="业务类型：" prop="business_type">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="form1.business_type"
							:picker-key="pickerKey"
							:picker-list="businessTypeArr" 
							@confirm="confirm('singleColumn', $event)"
							:default-value="[form1.business_type]">
							<view class="picker" v-if="businessTypeArr.length > 0">
								{{businessTypeArr[1].name}}
							</view>
							<view class="picker" v-else>
								{{'请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="使用类型：" prop="use_type">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="form1.use_type"
							:picker-key="pickerKey"
							:picker-list="useTypeArr" 
							@confirm="confirm('singleColumn', $event)"
							:default-value="[form1.use_type]">
							<view class="picker" v-if="useTypeArr.length > 0">
								{{useTypeArr[2].name}}
							</view>
							<view class="picker" v-else>
								{{'请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="RAID：" prop="raid">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="form1.raid"
							:picker-key="pickerKey"
							:picker-list="raidArr" 
							@confirm="confirm('singleColumn', $event)"
							:default-value="[form1.raid]">
							<view class="picker" v-if="raidArr.length > 0">
								{{raidArr[raidArr.length-1].name}}
							</view>
							<view class="picker" v-else>
								{{'请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="上架日期：" prop="added_time">
					<view class="cu-form-group fi-form-group">
						<picker style="width: 100%;" @change="onDateChange" mode="date" v-model="form1.added_time" :value="form1.added_time" :start="startTimer" end="2020-09-01">
							<view class="picker">{{form1.added_time||'请选择上架日期'}}</view>
						</picker>
					</view>
				</evan-form-item>
				<evan-form-item label="网卡数量：" prop="port_num">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="form1.port_num" placeholder="请输入网卡数量" />
				</evan-form-item>
				<evan-form-item label="电源状态：" prop="power_status">
					<radio-group  @change="powerStatusChange" style="float: right;">
						<view class="cu-form-group fi-form-group">
							<view>
								<radio class='radio' checked="true" value="1" style="transform: scale(0.6)" ></radio>
							</view>
							<view style="padding: 0 20px 0 10px;">开机</view>
							<view>
								<radio class='radio' value="2" style="transform: scale(0.6)" ></radio>
							</view>
							<view style="padding: 0 20px 0 10px;">关机</view>
							<view>
								<radio class='radio' value="3" style="transform: scale(0.6)" ></radio> 
							</view>
							<view style="padding: 0 0 0 10px;">异常</view>
						</view>
					</radio-group>
				</evan-form-item>
				<evan-form-item label="所属机房：" prop="datacenter_id">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="form1.datacenter_id"
							:picker-key="pickerKey"
							:picker-list="datacenterArr" 
							@confirm="confirm('singleColumn', $event)"
							:default-value="[form1.datacenter_id]">
							<view class="picker">
								{{'请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="所属机柜：" prop="cabinet_id">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="form1.cabinet_id"
							:picker-key="pickerKey"
							:picker-list="cabinetArr" 
							@confirm="confirm('singleColumn', $event)"
							:default-value="[form1.cabinet_id]">
							<view class="picker">
								{{'请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="机柜尺寸：" prop="size">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="form1.size" placeholder="请输入机柜尺寸" />
				</evan-form-item>
				<evan-form-item label="机柜位置：" prop="position">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="form1.position" placeholder="请输入机柜位置" />
				</evan-form-item>
				<view class="margin-top">
					<evan-form-item label="硬件类型：" prop="hardware_type">
						<view class="cu-form-group fi-form-group">
							<my-picker
								class="kao-picker"
								v-model="form1.hardware_type"
								:picker-key="pickerKey"
								:picker-list="hardwareTypeArr" 
								@confirm="confirm('singleColumn', $event)"
								:default-value="[form1.hardware_type]">
								<view class="picker">
									{{'请选择'}}
								</view>
							</my-picker>
						</view>
					</evan-form-item>
					<hardware :hardware-form="form1" hardware-data="hardwareData"/>
				</view>
				<view class="margin-top">
					<evan-form-item label="是否限制：" prop="is_ipmi_allowall">
						<view class="cu-form-group fi-form-group">
							<my-picker
								class="kao-picker"
								v-model="form1.is_ipmi_allowall"
								:picker-key="pickerKey"
								:picker-list="isAllowallArr" 
								@confirm="confirm('singleColumn', $event)"
								:default-value="[form1.is_ipmi_allowall]">
								<view class="picker">
									{{'请选择'}}
								</view>
							</my-picker>
						</view>
					</evan-form-item>
				</view>
				<evan-form-item label="IPMI交换机：" prop="ipmi_switch_id">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="form1.ipmi_switch_id"
							:picker-key="pickerKey"
							:picker-list="ipmiSwitchArr" 
							@confirm="confirm('singleColumn', $event)"
							:default-value="[form1.ipmi_switch_id]">
							<view class="picker">
								{{'请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="交换机卡槽：" prop="ipmi_port_extend_id">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="form1.ipmi_port_extend_id"
							:picker-key="pickerKey"
							:picker-list="ipmiPortExtendArr" 
							@confirm="confirm('singleColumn', $event)"
							:default-value="[form1.ipmi_port_extend_id]">
							<view class="picker">
								{{'请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="交换机端口：" prop="ipmi_port">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="form1.ipmi_port"
							:picker-key="pickerKey"
							:picker-list="ipmiPortArr" 
							@confirm="confirm('singleColumn', $event)"
							:default-value="[form1.ipmi_port]">
							<view class="picker">
								{{'请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="IP段：" prop="ipmi_ipsegment_id">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="form1.ipmi_ipsegment_id"
							:picker-key="pickerKey"
							:picker-list="ipmiIpsegmentArr" 
							@confirm="confirm('singleColumn', $event)"
							:default-value="[form1.ipmi_ipsegment_id]">
							<view class="picker">
								{{'请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="IP：" prop="ipmi_ip_id">
					<view class="cu-form-group fi-form-group">
						<my-picker
							class="kao-picker"
							v-model="form1.ipmi_ip_id"
							:picker-key="pickerKey"
							:picker-list="ipmiIpArr"
							@confirm="confirm('singleColumn', $event)"
							:default-value="[form1.ipmi_ip_id]">
							<view class="picker">
								{{'请选择'}}
							</view>
						</my-picker>
					</view>
				</evan-form-item>
				<evan-form-item label="IPMI用户名：" prop="ipmi_username">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="form1.ipmi_username" placeholder="请输入IPMI用户名" />
				</evan-form-item>
				<evan-form-item label="IPMI密码：" prop="ipmi_password">
					<input type="password" class="form-input" placeholder-class="form-input-placeholder" v-model="form1.ipmi_password" placeholder="请输入IPMI密码" />
				</evan-form-item>
			</evan-form>
		</view>
		<view class=" margin-top">
			<button @click="save" class="evan-form-show__button">保存</button>
		</view>
	</view>
</template>

<script>
	import { formatDate } from '@/utils/index.js'
	import EvanForm from '@/components/evan-form/evan-form.vue'
	import EvanFormItem from '@/components/evan-form/evan-form-item.vue'
	import interfaces from '@/utils/interfaces.js'
	import MyPicker from '@/components/kao-picker/Picker.vue';
	import Hardware from './hardware.vue';
	
	export default {
		data() {
			const DATE = formatDate(new Date());
			return {
				pickerKey: {value: 'id', label: 'name', children: 'children'},
				hideRequiredAsterisk: false,
				TabCur: 0,
				title:[
					'01硬件信息',
					'02网卡信息',
					'03软件信息',
				],
				form1:{
					tag:'',
					data_tag:'',
					business_type: 2	,
					use_type: 3,
					raid: 99,
					datacenter_id:'',
					cabinet_id:'',
					size:'',
					hardware_type:'',
					position: '',
					port_num:'',
					power_status: 2,
					added_time: DATE,
					cpu:[
						{
							stock_in_id:'',
							quantity:'1',
						}
					],
					ram:[
						{
							stock_in_id:'',
							quantity:'1',
						}
					],
					harddisk:[
						{
							stock_in_id:'',
							quantity:'1',
						}
					],
					is_ipmi_allowall: 1,
					ipmi_switch_id:'',
					ipmi_port_extend_id:'',
					ipmi_port:'',
					ipmi_ipsegment_id: 0,
					ipmi_ip_id:'',
					ipmi_ip:'',
					ipmi_username:'',
					ipmi_password:'',
				},
				rules: {
					tag: {
						required: true,
						message: '请输入设备标签'
					},
					data_tag: {
						required: true,
						message: '请输入数据标签'
					},
					added_time: {
						required: true,
						message: '请选择上架时间'
					},
					business_type: {
						required: true,
						message: '请选择业务类型'
					},
					use_type: {
						required: true,
						message: '请选择业务类型'
					},
					raid: {
						required: true,
						message: '请选择RAID'
					},
					port_num: {
						required: true,
						message: '请输入网卡数量'
					},
					datacenter_id: {
						required: true,
						message: '请选择所属机房'
					},
					cabinet_id: {
						required: true,
						message: '请选择所属机柜'
					},
					size: {
						required: true,
						message: '请选择所属机柜大小'
					},
				},
				startTimer: DATE,
				businessTypeArr: [],
				useTypeArr: [],
				raidArr: [],
				datacenterArr: [],
				cabinetArr: [],
				hardwareTypeArr: [],
				hardwareData: {
					cpu:[], //cpu
					ran:[], //内存
					harddisk:[], //硬盘
				},
				isAllowallArr: [ //是否解除联动限制
					{id: 1, name: '限制'},
					{id: 2, name: '解除'},
				],
				ipmiSwitchArr: [],
				ipmiPortExtendArr: [],
				ipmiPortArr: [],
				ipmiIpsegmentArr: [],
				ipmiIpArr: [],
				
			};
		},
		components: {
			EvanForm,
			EvanFormItem,
			MyPicker,
			Hardware,
		},
		onLoad() {
			// 这里必须放在$nextTick中，不然h5会找不到this.$refs.form
			this.$nextTick(() => {
				this.$refs.form1.setRules(this.rules)
			})
			this.getEnum();
			this.getHardware();
		},
		methods: {
			confirm(type, picked) {
			    this.demos[type].picked = picked
			},
			// 选择操作步骤
			tabSelect(e){
				this.TabCur = e.currentTarget.dataset.id;
			},
			//修改业务类型
			changeBusinessType(e){
				//this.form1.business_type = e.detail.value
				this.form1.use_type = e.detail.value
				console.log('可以传data-xx:xx',e.currentTarget.dataset.index,'\n默认传过来的是下标：',e.detail.value,'\n也可以传普通json传过来的id等：',e.currentTarget.dataset.id);
			},
			//上架时间修改
			onDateChange(){
			
			},
			//电源状态
			powerStatusChange(){
				
			},
			//提交表单
			save() {
				this.$refs.form1.validate((res) => {
					if (res) {
						uni.showToast({
							title: '验证通过'
						})
					}
				})
			},
			//获取枚举数据
			getEnum(){
				let data = "SERVER_BUSINESS_TYPE,SERVER_USE_TYPE,SERVER_RAID,SERVER_POWER_STATUS,SERVER_HARDWARE_TYPE,IPSEGMENTUSAGETYPE,THEIPSEGMENTTYPEIPUSESTATUS,DEVICE_SERVER_USE_STATUS"
				this.$http.post(interfaces.Enum, {name: data}).then(res => {
					if(res.result == 'success'){
						this.businessTypeArr = res.data['SERVER_BUSINESS_TYPE'] //业务类型
						this.useTypeArr = res.data['SERVER_USE_TYPE'] //使用类型
						this.raidArr = res.data['SERVER_RAID'] //RAID
					}
				}).catch(error => {})
			},
			//获取硬件CPU 内存 硬盘
			getHardware(){
				this.$http.post(interfaces.HardwareConfig).then(res => {
					var data = res.data;
					this.hardwareData.cpu = data.cpu;
					this.hardwareData.ram = data.ram;
					this.hardwareData.harddisk = data.harddisk;
				})
			},
		}
	}
</script>

<style lang="scss">
	
</style>
