;(function ($) {
	var upLoadFile = function(el,ops){
		this.el = el;
		this.ops = $.extend($.fn.uploadFile.defaults,ops||{});
		console.log(this.ops);
		this.init();
	};
	upLoadFile.prototype = {
		init:function(){
			var self = this;
			this.el.append('<div class="file"> <form enctype="multipart/form-data" class="form-file"> <a class="file">添加附件 <input type="file" name="division_detail_path" id="file_value" class="left"> </a> <button type="button" class="sendFile">导入</button> <div class="showFileName inactive_1"></div> <div class="showDownloadName inactive_1"></div> <br> </form> </div>');
			this.el.find("[type=file]").change(function(event) {
				console.log($(this).val());
				self.el.find(".showFileName").html($(this).val()).removeClass("inactive_1");
			});
			this.el.find(".sendFile").click(function(event) {
				if(!self.el.find(".showFileName").html()){
					alert("请选择文件！");
					return false;
				}
				if(self.el.find(".single_file_p").length == self.ops.maxSize){
					alert("当前允许上传的文件已达到限制次数！无法继续上传");
					self.el.find("[type=file]").val("");
					self.el.find(".showFileName").val("").addClass('inactive_1');
					return false;
				}
				$(".file").ajaxSubmit({
					url:self.ops.uploadUrl,
					type:'POST',
					dataType:'json',
					success:function(data){
						if(data.status=="1"){
							self.el.find(".showDownloadName").append('<p class="single_file_p"><span>'+self.el.find(".showFileName").html()+'</span><a class="downloadFile" href="'+downloadUrl+data.msg+'">下载</a><a class="deleteFile">删除</a></p>').removeClass("inactive_1");
							self.el.find(".showFileName").html("").addClass("inactive_1");
						}else{
							alert("文件上传失败！"+data.msg);
						}
					},
					error:function(){
						alert("网络请求发生错误！");
					}
				})
				

			});
			// this.el.on("click",".downloadFile",function(el){
				
			// });
			this.el.on("click",".deleteFile",function(el){
				$(this).parents(".single_file_p").remove();
			});
		}
	}
	$.fn.uploadFile = function (options){
		this.each(function(){
			new upLoadFile($(this),options);
		})
	},
	$.fn.uploadFile.defaults = {
		uploadUrl:'http://www.baidu.com',
		downloadUrl:'http://www.baidu.com',
		maxSize: 5,
		allowDelete:false
	}
})(jQuery)