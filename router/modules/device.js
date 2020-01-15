const device = [
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/tabBar/device/device',
		name: 'device',
		meta: {
			title: '设备管理',
		},
	},{
		path: '/pages/tabBar/device/access-control/list',
		name: 'access-control',
		meta: {
			title: '门禁管理',
		},
	},{
		path: '/pages/tabBar/device/customers/list',
		name: 'customers',
		meta: {
			title: '潜在客户',
		},
	},{
		path: '/pages/tabBar/device/customers/create',
		name: 'customers-create',
		meta: {
			title: '潜在客户-新增',
		},
	},{
		path: '/pages/tabBar/device/user/user',
		name: 'user',
		meta: {
			title: '用户管理',
		},
	},{
		path: '/pages/tabBar/device/user/create',
		name: 'user',
		meta: {
			title: '用户管理编辑',
		},
	},{
		path: '/pages/tabBar/device/version',
		name: 'version',
		meta: {
			title: '检查版本',
		},
	},
]
export default device