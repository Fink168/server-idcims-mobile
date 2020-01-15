const api = "/api";
const interfaces = {
	// 登录
	Login: api + "/site/login",
	//获取用户信息
	UserInfo: api + "/sys/user/get-user-info",
	//获取机房
	Datacenter: api + "/sys/user/source-dtacenter",
	//安全码认证
	SafetyCode: api + '/device/server/security-code-verification',
	//端口隔离
	portIsolationSwitch: api + '/device/server/port-isolation-switch',
	//获取枚举
	Enum: api + '/sys/setting/enum-detail',
	//获取枚举
	HardwareConfig: api + '/device/server-hardware-config-model/source',
	//门禁管理
	JanitorUser: api + '/datacenterdevice/janitoruser',
	//门禁管理-开门
	Janitor: api + '/datacenterdevice/janitor',
	//API日志
	apiLog: api + '/log/ilog',
	//潜在客户
	PotentialCustomers: api + '/sales/potential-customers',
	//获取用户
	User: api + '/sys/user',
	//服务器列表
	Server: api + '/device/server',
	
	
	
}
module.exports = interfaces;