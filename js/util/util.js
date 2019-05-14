var util = {
	options: {
		ACTIVE_COLOR: "#FF5B61",
		NORMAL_COLOR: "#211717",
		subpages: ["html/explore.html", "html/wishList.html", "html/story.html", "html/messageBox.html", "html/login.html"]
	},
	// drawNative: function(id, styles, tags) {
	// 	var view = new plus.nativeObj.View(id, styles, tags);
	// 	return view;
	// },
	initSubpage: function(aniShow) {
		var subpage_style = {
				top: 0,
				bottom: 51
			},
			subpages = util.options.subpages,
			_self = plus.webview.currentWebview(),
			temp = {};
			
		// 兼容android上添加titleNView 和 设置沉浸模式会遮盖webview内容
		if(mui.os.android) {
			if(plus.navigator.isImmersedStatusbar()) {
				subpage_style.top += plus.navigator.getStatusbarHeight();
			}
			if(_self.getTitleNView()) {
				subpage_style.top += 40;
			}
		}
		
		// 初始化第一个tab项为首次显示
		temp[self.id] = "true";
		mui.extend(aniShow, temp);
		// 初始化首个tab按钮
		util.toggleNview(0);
		
		for(var i = 0, len = subpages.length; i < len; i++) {
			if(!plus.webview.getWebviewById(subpages[i])) {
				var sub = plus.webview.create(subpages[i],subpages[i], subpage_style);
				_self.append(sub);
				sub.hide();
			}
		}
		
	},
	/**	
	 * 点击切换tab窗口 
	 */
	changeSubpage: function(targetPage, activePage, aniShow) {
		//若为iOS平台或非首次显示，则直接显示
		if(mui.os.ios || aniShow[targetPage]) {
			plus.webview.show(targetPage);
		} else {
			//否则，使用fade-in动画，且保存变量
			var temp = {};
			temp[targetPage] = "true";
			mui.extend(aniShow, temp);
			plus.webview.show(targetPage, "fade-in", 300);
		}
		//隐藏当前 除了第一个父窗口
		if(activePage !== plus.webview.getLaunchWebview()) {
			plus.webview.hide(activePage);
		}
	},
	toggleNview: function(currIndex) {
		// mui.alert("运行到这里" + currIndex)
		currIndex = currIndex * 2;
		// 当前icon和文本都需要重绘
		util.updateSubNView(currIndex, util.options.ACTIVE_COLOR);
		util.updateSubNView(currIndex + 1, util.options.ACTIVE_COLOR);
		//重绘未选中tag至平常状态
		for( var i = 0; i < 10; i++) {
			if(i !== currIndex && i !== currIndex + 1) {
				util.updateSubNView(i, util.options.NORMAL_COLOR);
			}
		}
	},
	updateSubNView: function(currIndex, color) {
		var _self = plus.webview.currentWebview(),
			nviewEvent = plus.nativeObj.View.getViewById('tabBar'),
			nviewObj = _self.getStyle().subNViews[0],
			currTag = nviewObj.tags[currIndex];
			
			// mui.alert(nviewObj.tags[currIndex])
			
		nviewEvent.drawText(currTag.text, currTag.position, util.changeColor(currTag.textStyles, color), currTag.id)
		
	},
	changeColor: function(obj, color) {
		obj.color = color;
		return obj;
	}
}