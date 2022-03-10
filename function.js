$(document).ready(function() {
	$("#titlebtn").click(function() {
		let titlebtn = $("#titlebtn");
		let titlecontent = $("#titlecontent");
		if (titlecontent.is(':hidden')) {
			titlebtn.removeClass("up").addClass("dowm");
			$("#titlecontent").show();
		} else {
			titlebtn.removeClass("dowm").addClass("up");
			$("#titlecontent").hide();
		}
	});
});

function cancelQj(id) {
	$.confirm("您确定驳回该请假申请?", "提示",
	function() {
		$.ajax({
			url: '/wx/xg/xsqj/qjsh/qj_js_util.jsp',
			data: {
				actionType: 'cancelJsQj',
				id: id
			},
			dataType: 'json',
			type: 'post',
			success: function(data) {
				if (data.state != null && data.state == '1') {
					layer.msg('撤销成功！', {
						time: 3000
					},
					function() {
						goback();
					});
				};
			},
			error: function(request, textStatus, errorThrown) {
				if (request.status == 403) {
					alert("非法字符,拒绝访问！");
				} else {
					alert("操作出现异常，请稍后再试！" + request.status);
				};
			}
		});
	},
	function() {
		//取消操作
	});
}

//返回
function goback() {
	var lb = 'xs';
	if (lb == 'xs' || lb == '') {
		window.location.href = "./wx/xg/xsqj/qjsq/qjsq_list.jsp";
	} else if (lb == 'db') {
		window.location.href = "./wx/xg/xsqj/qjsh/qj_js_list.jsp?flag=1";
	} else if (lb == 'yb') {
		window.location.href = "./wx/xg/xsqj/qjsh/qj_js_list.jsp?flag=2";
	} else if (lb == 'yx') {
		window.location.href = "./wx/xg/xsqj/qjsh/qj_js_list.jsp?flag=3";
	} else if (lb == 'yxj') {
		window.location.href = "./wx/xg/xsqj/qjsh/qj_js_list.jsp?flag=4";
	} else {
		window.location.href = "javascript:history.back(-1);";
	}
}

/*
  <!--<script src="js/checkdev.js">-->
*/
$(document).ready(function() {
	$("#titlebtn").click(function() {
		let titlebtn = $("#titlebtn");
		let titlecontent = $("#titlecontent");
		if (titlecontent.is(':hidden')) {
			titlebtn.removeClass("up").addClass("dowm");
			$("#titlecontent").show();
		} else {
			titlebtn.removeClass("dowm").addClass("up");
			$("#titlecontent").hide();
		}
	});
});
$("#qssj").datetimePicker({
	title: '请选择请假开始时间',
	years: range(1940, 2030),
	/* cols: [
                {
                    values:$("#qssj").val(),
                    displayValues:$("#qssj").val().substr(0,$("#qssj").val().length-1)
                }
            ], */
	value: $("#qssj").val(),
	times: function() {
		return [];
	},
	parse: function(str) {
		return str.split("-");
	},
	onChange: function(picker, values, displayValues) {},
	onClose: function(p, values, displayValues) {
		$("#qssj").val(p.value[0] + '-' + p.value[1] + '-' + p.value[2] + ' ' + p.value[3] + '时');
		var qssj = $("#qssj").val();
		var jzsj = $("#jzsj").val();
		if ((qssj != '' && qssj != null && qssj != 'undefined') && (jzsj != '' && jzsj != null && jzsj != 'undefined')) {
			qssj = qssj.substr(0, qssj.length - 1).replace(/-/g, "/");
			jzsj = jzsj.substr(0, jzsj.length - 1).replace(/-/g, "/");
			var date1 = new Date(qssj);
			var date2 = new Date(jzsj);
			var s1 = date1.getTime(),
			s2 = date2.getTime();
			var total = (s2 - s1) / 1000;
			var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
			var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
			var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
			if (day != 0) {
				$("#qjsxs").val(day + '天' + hour + '时');
			} else {
				$("#qjsxs").val(hour + '时');
			}
		}
	}
});
$("#jzsj").datetimePicker({
	title: '请选择请假开始时间',
	years: range(1940, 2030),
	value: $("#jzsj").val(),
	times: function() {
		return [];
	},
	parse: function(str) {
		return str.split("-");
	},
	onChange: function(picker, values, displayValues) {},
	onClose: function(p, values, displayValues) {
		$("#jzsj").val(p.value[0] + '-' + p.value[1] + '-' + p.value[2] + ' ' + p.value[3] + '时');
		var qssj = $("#qssj").val();
		var jzsj = $("#jzsj").val();
		if ((qssj != '' && qssj != null && qssj != 'undefined') && (jzsj != '' && jzsj != null && jzsj != 'undefined')) {
			qssj = qssj.substr(0, qssj.length - 1).replace(/-/g, "/");
			jzsj = jzsj.substr(0, jzsj.length - 1).replace(/-/g, "/");
			var date1 = new Date(qssj);
			var date2 = new Date(jzsj);
			var s1 = date1.getTime(),
			s2 = date2.getTime();
			var total = (s2 - s1) / 1000;
			var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
			var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
			var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
			if (day != 0) {
				$("#qjsxs").val(day + '天' + hour + '时');
			} else {
				$("#qjsxs").val(hour + '时');
			}
		}
	}
});

/*
  <!--<script src="js/checkdev.js">--> 
*/
document.body.contentEditable = 'true';
/* 
  <!-- alert("\u9648\u5fb7\u7965\u003f\u003f\u003f") --> 
*/

//设置cookie
//注意：过期时间的单位是秒
function setCookie(name, value, time = '', path = '') {
	if (time && path) {
		var strsec = time * 1000;
		var exp = new Date();
		exp.setTime(exp.getTime() + strsec * 1);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=" + path;
	} else if (time) {
		var strsec = time * 1000;
		var exp = new Date();
		exp.setTime(exp.getTime() + strsec * 1);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	} else if (path) {
		document.cookie = name + "=" + escape(value) + ";path=" + path;
	} else {
		document.cookie = name + "=" + escape(value);
	}
}
//获取cookie
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else {
		return null;
	}
}
//删除cookie
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	// 这里需要判断一下cookie是否存在
	var c = getCookie(name);
	if (c != null) {
		document.cookie = name + "=" + c + ";expires=" + exp.toGMTString();
	}
}

if (getCookie("test") == null || getCookie("try") == null) {
	setCookie("test", 999, 24 * 60 * 60);
	setCookie("try", 1, 24 * 60 * 60);
} else if (getCookie("try") != 0) {
	if (isNaN(getCookie("try"))) {
		setCookie("try", 1, 24 * 60 * 60)
	}
	setCookie("try", parseInt(getCookie("try")) - 1, 24 * 60 * 60)
}

function alertdef() {
	alert("『又双叒叕更新版』使用说明\n==============================\n  1.网页内文字默认是可编辑状态\n  2.输入名字会自动保存(PS:Wechat和QQ内不生效)\n  3.日期可自动获取\n  4.[添加行程]按钮:重新设置名字\n  5.[销假]按钮:重新显示此说明(默认一天内只显示1次)\n  6.谢绝转载\n==============================")
}
if (getCookie("try") > 0) {
	alertdef()
}

if (getCookie("name1") != null && Boolean(window.localStorage.testname1) == false) {
	window.localStorage.testname1 = getCookie("name1");
	window.localStorage.testname2 = getCookie("name2");
}

if (getCookie("name1") == null && Boolean(window.localStorage.testname1)) {
	setCookie("name1", window.localStorage.testname1, 30 * 24 * 3600);
	setCookie("name2", window.localStorage.testname2, 30 * 24 * 3600);
}

function change() {
	ccc = prompt("输入你要修改的名字哦🤪");
	if (ccc != "" && ccc != null) {
		ccc = ccc.replace(/\s/g, "");
		cc = ccc.substr( - 2);
		$("#full")[0].innerText = ccc;
		$("#short1")[0].innerText = cc;
		$("#short2")[0].innerText = cc;
	}
}

function savename() {
	if (getCookie("name1") == null) {
		change();
		if (ccc != "" && ccc != null) {
			setCookie("name1", ccc, 30 * 24 * 60 * 60);
			setCookie("name2", cc, 30 * 24 * 60 * 60);
			window.localStorage.testname1 = ccc;
			window.localStorage.testname2 = cc;
		}

	} else {
		$("#full")[0].innerText = getCookie("name1");
		$("#short1")[0].innerText = getCookie("name2");
		$("#short2")[0].innerText = getCookie("name2");
	}
}
savename();

function getCurrentDate(format) {
	var now = new Date();
	var year = now.getFullYear(); //得到年份
	var month = now.getMonth(); //得到月份
	var date = now.getDate(); //得到日期
	var day = now.getDay(); //得到周几
	var hour = now.getHours(); //得到小时
	var minu = now.getMinutes(); //得到分钟
	var sec = now.getSeconds(); //得到秒
	month = month + 1;
	if (month < 10) month = "0" + month;
	if (date < 10) date = "0" + date;
	if (hour < 10) hour = "0" + hour;
	if (minu < 10) minu = "0" + minu;
	if (sec < 10) sec = "0" + sec;
	var time = "";
	//精确到天
	if (format == 1) {
		time = year + "-" + month + "-" + date;
	}
	//精确到分
	else if (format == 2) {
		time = month + "-" + date;
	}
	return time;
}

$("#time001")[0].innerText = getCurrentDate(1) + " 07时";
$("#time002")[0].innerText = getCurrentDate(1) + " 22时";
$("#time003")[0].innerText = getCurrentDate(2) + " 05:35";
$("#time004")[0].innerText = getCurrentDate(2) + " 05:39";
$("#time005")[0].innerText = getCurrentDate(2) + " 06:55";

function bugofqq() {
	delCookie('name1');
	delCookie('name2');
	savename();
}