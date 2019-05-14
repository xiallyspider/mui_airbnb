var indexVm = new Vue({
	el: "#mui-content",
	data: function() {
		return {
			
		}
	},
	mounted: function() {
		var self = this;
		mui.init({
			swipeBack: false
		});
		mui.plusReady(function() {
			self.initEvent();
			self.initTab();
		})
	},
	methods: {
		initEvent: function() {
			var self = this;
			mui('#sendSMS').on('tap','#mui-content',function(){
			  self.sendSMS();
			}) 
		},
		sendSMS: function() {
			// var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
			// msg.to = ['', ''];
			// msg.body = "短信发送测试";
			// plus.messaging.sendMessage(msg, this.successSMS, this.errorSMS);
		},
		successSMS: function() {
			mui.alert("发送成功！");
		},
		errorSMS: function() {
			mui.alert("发送失败");
		},
		initTab: function () {
			var _self = plus.webview.currentWebview();
		
			// 创建子webview窗口并初始化
			var aniShow = {};
			util.initSubpage(aniShow);
			
			var nview = plus.nativeObj.View.getViewById('tabBar'),
			activePage = plus.webview.currentWebview(),
			targetPage,
			subPages = util.options.subpages,
			pageW = window.innerWidth,
			currIndex = 0;
			
			nview.addEventListener('click', function(e) {
				var clientX = e.clientX;
				if(clientX > 0 && clientX <= parseInt(pageW * 0.20)) {
					currIndex = 0;
				} else if(clientX > clientX <= parseInt(pageW * 0.20) && clientX <= parseInt(pageW * 0.4) ) {
					currIndex = 1;
				} else if(clientX > clientX <= parseInt(pageW * 0.40) && clientX <= parseInt(pageW * 0.6) ) {
					currIndex = 2;
				}  else if(clientX > clientX <= parseInt(pageW * 0.60) && clientX <= parseInt(pageW * 0.8) ) {
					currIndex = 3;
				} else {
					currIndex = 4;
				}
				// mui.alert(currIndex)
				//匹配对应tab窗口
				if(currIndex > 0) {
					targetPage = plus.webview.getWebviewById(subPages[currIndex]);
				} else {
					targetPage = plus.webview.currentWebview();
				}
				
				if(targetPage == activePage) {
					return;
				}
				//底部选项卡切换
				util.toggleNview(currIndex);
				// 子页面切换
				util.changeSubpage(targetPage, activePage, aniShow);
				//更新当前活跃的页面
				activePage = targetPage;
			})
		}
	}
})