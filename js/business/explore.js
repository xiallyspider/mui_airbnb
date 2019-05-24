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
			self.initEvent();
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
				height:'220px',
				width:'100%',
				position:'absolute',
				images:[
					{src:'../imgs/index/banner1.jpg'},
					{src:'../imgs/index/banner2.jpg'},
					{src:'../imgs/index/banner3.jpg'},
					{src:'../imgs/index/banner4.jpg'}
					]
				};
			var tags = [{
					id: 'explore',
					tag: 'font',
					position: {
						top: '80px',
						left: '-60px'
					},
					text: '发现更多的乐趣',
					textStyles: {
						color: '#eeeeee',
						size: '28px',
						weight: 'bold'
					}
				}
			];
			var view = new plus.nativeObj.ImageSlider('slider',style, tags);
			_self.append(view);
		},
		initEvent: function() {
			document.getElementById('tab-hourse-src').addEventListener('tap', function(e) {
				mui.alert("运行到这里")
				this.classList.add('active');
				document.getElementById('tab-experence').classList.remove('active');
			})
		}
	}
})