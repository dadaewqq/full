window.onerror=fnErrorTrap;
function fnErrorTrap(sMsg,sUrl,sLine){
	var fnErrorTrapcwxx="路径："+sUrl+",错误信息："+sMsg;
	$.ajax({
		url:'/yqfk/wx/xg/yz-mobile/cw_util.jsp',
		data:{actionType:'addcwxx',cwxx:fnErrorTrapcwxx,},
		dataType:'json',
		type:'post',
		success:function(data){
			
		}
	})
}	