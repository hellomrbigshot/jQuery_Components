;(function ($) {
	// body...
	var Carousel = function 
	(poster) {
		var self =this;
		this.poster = poster;
		this.posterItemMain = poster.find("ul.poster-list");
		this.nextBtn = poster.find(".poster-next-btn");
		this.prevBtn = poster.find(".poster-prev-btn");
		this.posterItems = poster.find("li.poster-item");
		this.posterFirstItem = this.posterItems.first();
		this.posterLastItem = this.posterItems.last();
		this.rotateFlag = true;
		//设置默认参数
		this.setting = {
			'width': 1000, //宽度
			'height': 270, //高度
			'posterWidth': 640, //第一帧的宽度
			'posterHeight': 270, //第一帧的高度
			'scale': 0.9, //记录显示比例关系
			'speed': 500,
			'delay': 5000,
			'verticalAlign': 'middle',
			'autoPlay': false,
		}
		$.extend(this.setting,this.getSetting());
		console.log(this.setting);
		this.setSettingValue();
		this.setPosterPos();
		this.nextBtn.click(function() {
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouseRotate("left");
			}
			

		});
		this.prevBtn.click(function () {
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouseRotate("right");
			}
		})
		//是否开启自动播放
		if(this.setting.autoPlay){
			this.autoPlay();
			this.poster.hover(function () {
				clearInterval(self.timer);
			},function () {
				self.autoPlay();
			})
		}
	};
	Carousel.prototype = {
		//自动播放
		autoPlay: function () {
			var self = this;
			this.timer = window.setInterval(function () {
				// body...
				self.nextBtn.click();
			}, self.setting.delay);
		},
		//设置剩余的帧的位置关系
		setPosterPos:function () {
			var self = this;
			var sliceItems = this.posterItems.slice(1),
				sliceSize = sliceItems.size()/2,
				rightSlice = sliceItems.slice(0,sliceItems.length/2),
				leftSlice = sliceItems.slice(sliceSize),
				level = Math.floor(this.posterItems.size()/2);
			var level_2 = level;
			var rw = this.setting.posterWidth,
				rh = this.setting.posterHeight,
				gap = ((this.setting.width - this.setting.posterWidth)/2)/level;
				console.log(gap);
			//设置右边帧的位置关系和宽度高度
			rightSlice.each(function (i) {
				console.log(i);
				level--;
				var j = i;
				rw = rw*self.setting.scale;
				rh = rh*self.setting.scale;
				$(this).css({
					zIndex:level,
					width:rw,
					height:rh,
					opacity:1/(++j),
					left: self.setting.width -rw -(level_2-1-i)*gap,
					top: self.setVerticalAlign(rh)
					// top:tt
				})

			});
			var lw = rightSlice.last().width(),
				lh = rightSlice.last().height(),
				level_3 = Math.floor(this.posterItems.size()/2);
			//设置左边帧的位置关系和宽度高度
			leftSlice.each(function(i) {
				
				$(this).css({
					zIndex: i,
					width:lw,
					height:lh,
					opacity:1/level_3,
					left: gap * i,
					top: self.setVerticalAlign(lh)
				})
				level_3--;
				lw = lw/self.setting.scale;
				lh = lh/self.setting.scale;
			});
		},
		setVerticalAlign:function (height) {
			var verticalType = this.setting.verticalAlign,
			top = 0;
			if(verticalType == 'middle'){
				top = (this.setting.height - height) /2;
			}else if(verticalType == 'top'){
				top = 0;
			}else if(verticalType == 'bottom'){
				top = this.setting.height - height;
			}else{
				top = (this.setting.height - height) /2;
			}
			return top;
		},
		//设置配置参数值去控制基本的宽度高度...
		setSettingValue:function () {
			this.poster.css({
				width:this.setting.width,
				height:this.setting.height
			});
			this.posterItemMain.css({
				width:this.setting.width,
				height:this.setting.height
			});
			//计算上下切换按钮的宽度
			var w = (this.setting.width - this.setting.posterWidth) /2

			this.nextBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.length/2)
			});
			this.prevBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.length/2)
			})
			this.posterFirstItem.css({
				left:w,
				zIndex:Math.floor(this.posterItems.length/2)
			})

		},
		//获取人工配置参数
		getSetting:function 
		() {
			var setting = JSON.parse(this.poster.attr('data-setting'));
			return setting;
		},
		carouseRotate:function (dir) {
			//循环
			var _this_ = this,
				zIndexArr = [];
			if(dir=="left"){
				this.posterItems.each(function() {
					var self = $(this),
					prev = self.prev().get(0)?self.prev():_this_.posterLastItem,
					width = prev.width(),
					height = prev.height(),
					zIndex = prev.css("zIndex"),
					opacity = prev.css("opacity"),
					right = prev.css("right"),
					left = prev.css("left"),
					top = prev.css("top");
					zIndexArr.push(zIndex);
					self.animate({
						width:width,
						height:height,
						opacity:opacity,
						right:right,
						left:left,
						top:top
					},_this_.setting.speed,function () {
						_this_.rotateFlag = true;
					})
				});
				console.log(zIndexArr);
				this.posterItems.each(function(i) {
					$(this).css("zIndex",zIndexArr[i]);
				});
			}else if(dir=="right"){
				this.posterItems.each(function() {
					var self = $(this),
					next = self.next().get(0)?self.next():_this_.posterFirstItem,
					width = next.width(),
					height = next.height(),
					zIndex = next.css("zIndex"),
					opacity = next.css("opacity"),
					right = next.css("right"),
					left = next.css("left"),
					top = next.css("top");
					zIndexArr.push(zIndex);
					self.animate({
						width:width,
						height:height,
						opacity:opacity,
						right:right,
						left:left,
						top:top
					},_this_.setting.speed,function () {
						_this_.rotateFlag = true;
					})
				});

				this.posterItems.each(function(i) {
					$(this).css("zIndex",zIndexArr[i]);
				})
				
			}
		}
	}
	Carousel.init = function (posters) {
		var _this_ = this;
		posters.each(function(index, el) {
			new _this_($(this));
		});
	}
	window['Carousel'] = Carousel;
})(jQuery);