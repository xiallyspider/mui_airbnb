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
			self.initPage();
			self.initEvent();
			self.initTab();
		})
	},
	methods: {
		initPage: function() {
			this.initPageStyle();
		},
		initPageStyle:function () {
			plus.navigator.setStatusBarStyle("dark");
			plus.navigator.setStatusBarBackground('#FFFFFF');//设置状态栏的颜色
		},
		
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
				var view = plus.nativeObj.View.getViewById('slider');
				if(clientX > 0 && clientX <= parseInt(pageW * 0.20)) {
					currIndex = 0;
					view.show();
				} else if(clientX > clientX <= parseInt(pageW * 0.20) && clientX <= parseInt(pageW * 0.4) ) {
					currIndex = 1;
					view.hide();
				} else if(clientX > clientX <= parseInt(pageW * 0.40) && clientX <= parseInt(pageW * 0.6) ) {
					currIndex = 2;
					view.hide();
				}  else if(clientX > clientX <= parseInt(pageW * 0.60) && clientX <= parseInt(pageW * 0.8) ) {
					currIndex = 3;
					view.hide();
				} else {
					currIndex = 4;
					view.hide();
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