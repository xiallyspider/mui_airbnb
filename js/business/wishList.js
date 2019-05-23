var wlVm = new Vue({
	el: '#mui-content',
	data: function() {
		return {
			
		}
	},
	mounted: function() {
		var self = this;
		mui.init({
			swipeBack: false
		});
		mui.plusReady(function () {
		    self.initPage();
		})
	},
	methods: {
		initPage( ) {
		
		}
	}
})