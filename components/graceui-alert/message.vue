<template>
	<view>
		<graceuiAlert :show="show" :msg="msg" :msgtype="msgtype"></graceuiAlert>
	</view>
</template>

<script>
	import graceuiAlert from '@/components/graceui-alert/graceui-alert.vue';
	var alertTimer = null;
	
	export default {
		data() {
			return {
				show : false,
				msg : '这是一条提醒消息',
				msgtype : 'info'
			}
		},
		methods: {
			success(msg, timer=2000){
				this.show    = true;
				this.msgtype = "success";
				this.msg     = msg;
				//延迟关闭
				var _self = this;
				if (alertTimer != null) { clearTimeout(alertTimer);}
				alertTimer = setTimeout(function(){_self.show = false; _self.msg = '';}, timer);
			},
			error(msg, timer=2000) {
				this.show    = true;
				this.msgtype = "error";
				this.msg     = msg;
				//延迟关闭
				var _self = this;
				if (alertTimer != null) { clearTimeout(alertTimer); }
				alertTimer = setTimeout(function(){_self.show = false; _self.msg = '';}, timer);
			},
			info(msg, timer=2000) {
				this.show    = true;
				this.msgtype = "msg";
				this.msg     = msg;
				//延迟关闭
				var _self = this;
				if (alertTimer != null) { clearTimeout(alertTimer); }
				alertTimer = setTimeout(function(){_self.show = false; _self.msg = '';}, timer);
			}
		},
		components : {
			graceuiAlert
		}
	}
</script>

<style lang="scss">
	
</style>
