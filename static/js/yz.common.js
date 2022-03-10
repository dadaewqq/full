$(function () {
	var tips_index='';
	$("body").on("mouseover",".tips-info",function(){var tips_txt=""; if($(this).next().hasClass("tips-info-text")){tips_txt=$(this).next().html();}else{tips_txt=$(this).data("text");}; if(layer && tips_txt.length>0){tips_index=layer.tips(tips_txt,$(this), {tips: [1, '#417ed2'],time: 60000});};});
	$("body").on("mouseout",".tips-info",function(){if(layer&&tips_index>0){layer.close(tips_index);}});
	//滚动事件
	$(window).scroll(function(){var op=window.parent.topFrame;if(op&&$(window).scrollTop()>100 ){if(op.innerHeight>60){op.triggerTop(100);};};});

	
	
	
	
	
	
	
	
	
	
	/**
	 * 
	 * 以下都需要在该页面引入
		<script type="text/javascript" src="${ctx}/static/js/yz.common.js"></script>
	 * 
	 * 1、在是將要跳去目标页面的标签上添加
	 * class="gcp" data-target="这里写url" data-form="这里写当前页面搜索条件所在的form表单名称"
	 * 
	 * 2、在目标页面的返回按钮上添加
	 * class="gpb"
	 * 
	 * 3、在某个方法中执行回调成功后需要返回上一个页面添加
	 * $('.gpb').click();
	 * 
	 * 
	 */
	$(".gcp").click(function(){
		var the = $(this);
		var target = the.data('target');
		var url = the.data('target').indexOf("?")>-1?the.data('target').substr(0,the.data('target').indexOf("?")):the.data('target');
		var mform = $('form[name='+the.data('form')+']');
		
		if(!mform){
			console.log("execption");
			return ;
		}
		
		//用于封装当前页面的参数
		var formObj={};
		mform.find("input").each(function (index, domEle){
			var t = $(this);
			formObj[t.attr('name')]=t.val();
		});
		mform.find("select").each(function (index, domEle){
			var t = $(this);
			formObj[t.attr('name')] = t.find("option:checked").val();
		});
		
		//解析URL参数进行封装
		var paramsIndex=-1;
		var pObj={};
		if((paramsIndex = target.indexOf('?'))!=-1){
			var currentParams = target.substr(paramsIndex+1,target.length);
			if(currentParams.indexOf('&')){
				var cy = currentParams.split('&');
				for(var a=0;a<cy.length;a++){
					if(cy[a].indexOf('=')){
						var all = cy[a].split('=');
						var k = all[0];
						var v = all[1];
						pObj[k]=v;
					}
				}
			}
		}
		
		//创建新的form对象
		var newform = document.createElement('form');
		newform.method='POST';
		newform.action=url; //待跳转的页面
		newform.style='display:none;';
		newform.name='znewform';
		//为新的form对象组装input
		for(var i=0;i<Object.keys(pObj).length;i++){
			var input = document.createElement('input');
			input.type = 'hidden';
			input.name = Object.keys(pObj)[i];
			input.value = pObj[Object.keys(pObj)[i]];
			newform.appendChild(input);
		}
		
		var sObj = {};
		sObj['mUrl']=window.location.href; //当前URL
		sObj['mParams']=formObj;
		sObj['gUrl']=url; //下一页URL
		sObj['gParams']=pObj;
		
		var pages;
		if(typeof window.sessionStorage=='object'){
			var storage = window.sessionStorage;  //获取storage
			var pageItems = storage.getItem("pageItems");
			if(pageItems){
				pages = JSON.parse(pageItems);
				pages.push(sObj);
			}else{
				pages = new Array();
				pages.push(sObj);
			}
			storage.setItem("pageItems",JSON.stringify(pages)||{});
			console.log(JSON.stringify(pages));
		}
		
		//提交
		document.body.appendChild(newform);
		newform.submit();
		document.body.removeChild(newform);
		
	});
	
	$(".gpb-ref").click(function(){
		var the = $(this);
		//判断是否可以使用sessionStorage
		var npage;
		if(typeof window.sessionStorage=='object'){
			var storage = window.sessionStorage;  //获取storage
			var pageItems = storage.getItem("pageItems");
			if(pageItems){
				var oldPageItems = JSON.parse(pageItems);
				npage = oldPageItems.pop();
				storage.setItem("pageItems",JSON.stringify(oldPageItems)||{});
			}
		}
		
		//创建新的form
		var newform = document.createElement('form');
		newform.method='POST';
		newform.action=npage.mUrl;
		newform.style='display:none;';
		newform.name='newform';
		
		//为新的form对象组装input
		for(var i=0;i<Object.keys(npage.mParams).length;i++){
			var input = document.createElement('input');
			input.type = 'hidden';
			input.name = Object.keys(npage.mParams)[i];
			input.value = npage.mParams[Object.keys(npage.mParams)[i]];
			newform.appendChild(input);
		}
		
		//提交
		document.body.appendChild(newform);
		newform.submit();
		document.body.removeChild(newform);
	});
	
	$(".gpb").click(function(){
		var the = $(this);
		//判断是否可以使用sessionStorage
		var npage;
		if(typeof window.sessionStorage=='object'){
			var storage = window.sessionStorage;  //获取storage
			var pageItems = storage.getItem("pageItems");
			if(pageItems){
				var oldPageItems = JSON.parse(pageItems);
				npage = oldPageItems.pop();
				storage.setItem("pageItems",JSON.stringify(oldPageItems)||{});
			}
		}
		
		//创建新的form
		var newform = document.createElement('form');
		newform.method='POST';
		newform.action=npage.mUrl;
		newform.style='display:none;';
		newform.name='newform';
		
		//为新的form对象组装input
		for(var i=0;i<Object.keys(npage.mParams).length;i++){
			var input = document.createElement('input');
			input.type = 'hidden';
			input.name = Object.keys(npage.mParams)[i];
			input.value = npage.mParams[Object.keys(npage.mParams)[i]];
			newform.appendChild(input);
		}
		
		//提交
		document.body.appendChild(newform);
		newform.submit();
		document.body.removeChild(newform);
	});
	
});

var delFileSub = function(params){
	if(params.filePath==undefined || params.filePath=="") return;
	params.fileType = params.fileType==undefined?"picture":params.fileType;
	$.ajax({
		type:"post", url:'/common/fileDelete.jsp',cache:true, dataType:'json',timeout: 20000, data:params,
		success: function(res){
			if(res.state==1){
			}else{
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("错误"+XMLHttpRequest.status+" "+ errorThrown);
	 	}
	});
};

var checkPath = function(path){	
	var files=/\.bmp$|\.jpg$|\.png$|\.jpeg$\b/; 
	if(!files.test(path.toLowerCase())){return false;	}
	return true;
}
