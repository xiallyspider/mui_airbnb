var exploreVm = new Vue({
	el: "#explore-content",
	data: function() {
		return {
			
		}
	},
	mounted: function() {
		var self = this;
		mui.init({
			swipeBace: false
		});
		mui.plusReady(function () {
		    self.initPage();
		})
	},
	methods: {
		initPage:function() {
			this.initSlider();
		},
		initSlider: function() {
			var _self = plus.webview.getLaunchWebview();
			var style = {
				top:'0px',
				left:'0px',
				height:'230px',
				width:'100%',
				position:'absolute',
				images:[
					{src:'../imgs/index/banner1.jpg'},
					{src:'../imgs/index/banner2.jpg'},
					{src:'../imgs/index/banner3.jpg'},
					{src:'../imgs/index/banner4.jpg'}
					]
				}
			var view = new plus.nativeObj.ImageSlider('slider',style);
			_self.append(view);
		},
	}
})