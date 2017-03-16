/*
* 多选下拉框组件
* $("div").multipleSelect(arr1,arr2)
* arr1为下拉列表的值，格式为[{reason_id:...,reason_name:...}]
* arr2可不填，为默认选中的值
*/
;(function ($) {
	var selectOptions = function(el,ops,selected){
		this.el = el;
		this.ops = $.extend($.fn.multipleSelect.defaults,ops||{});
		this.selected_options = selected;
		console.log(this.ops);
		this.init();
		this.events();
	};
	selectOptions.prototype = {
		init: function(){
			var self = this;
			this.el.css("position", "relative");
			this.el.append('<select class="multiple-select"></select>');
			this.el.append('<div class="multiple-select-list-div"><ul class="option-list"><li><button class="multiple-select-all">全选</button><button class="multiple-select-no">全不选</button></li></ul></div>');
			$.each(this.ops, function(key, value) {
				self.el.find(".option-list").append('<li><input name="selected_checkbox" type="checkbox" value="'+value['reason_id']+'"><span>'+value['reason_name']+'</span></li>');
			})
			if(this.selected_options.length > 0) {
				this.el.find(".multiple-select li").each(function (index) {
					if($.inArray($(this).find("input").val(),self.selected_options) != '-1') {
						$(this).find("input").prop("checked", true);
					}
				})
				this.el.find(".multiple-select").data('value', selected_options);
			}
			this.el.find(".multiple-select").css({
				'width': '100%',
				'height': '18px'
			})
			this.el.find(".multiple-select-list-div").css({
				'position': 'absolute',
				'left': '0',
				'right': '0',
				'top': '20px',
				'borderWidth': '1px',
				'borderStyle': 'solid',
				'borderColor': '#cdcdcd',
				'padding': '5px'
			})
			this.el.find(".multiple-select-list-div").find("ul").css({
				'listStyle': 'none',
				'padding': '0',
				'margin': '0'
			})
			this.el.find(".multiple-select-list-div").find("li span").css({
				'display': 'inline-block',
				'wordBreak': 'break-all'
			})
			this.el.find(".multiple-select-no").css({
				'marginLeft': '10px'
			})
			this.el.find(".multiple-select-list-div").hide();
		},
		events: function() {
			var self = this;
			// 点击select下拉框隐藏显示
			this.el.find('.multiple-select').click(function(event) {
				self.el.find(".multiple-select-list-div").toggle();
				event.stopPropagation();
				console.log(self.el.find(".multiple-select").data('value'));
			});
			// 全选
			this.el.find('.multiple-select-all').click(function(event) {
				self.el.find(".multiple-select-list-div").find("input").prop("checked", true);
				var arr = [];
				self.el.find("input:checked").each(function (index) {
					arr.push($(this).val());
				})
				self.el.find(".multiple-select").data('value', arr);
				console.log(self.el.find(".multiple-select").data('value'));
			});
			// 全不选
			this.el.find('.multiple-select-no').click(function(event) {
				self.el.find(".multiple-select-list-div").find("input[name=selected_checkbox]").prop("checked", false);
				self.el.find(".multiple-select").data('value', []);
				console.log(self.el.find(".multiple-select").data('value'));
			});
			// 隐藏
			$("body").click(function(event) {
				console.log(true);
				self.el.find(".multiple-select-list-div").hide();
			});

			// 防止事件冒泡
			self.el.find(".multiple-select-list-div").click(function(event) {
				event.stopPropagation();
			});

			// 改变事件
			self.el.find(".multiple-select-list-div").find("input").click(function(event) {
				var arr = [];
				self.el.find("input:checked").each(function (index) {
					arr.push($(this).val());
				})
				self.el.find(".multiple-select").data('value', arr);
				console.log(self.el.find(".multiple-select").data('value'));
			});
		}
	}
	$.fn.multipleSelect = function (options, arr){
		var selected_arr = arr?arr:[];
		this.each(function(){
			new selectOptions($(this),options, selected_arr);
		})
	}
	$.fn.multipleSelect.defaults = {};
})(jQuery)