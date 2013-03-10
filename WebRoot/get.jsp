<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>get</title>
		<script type="text/javascript"
			src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js"></script>
		<script type="text/javascript" src="./js/common.js" charset="utf-8"></script>
		<style>
body {
	font-size: 14px;
	font-family: "宋体", Verdana, Arial, Helvetica, sans-serif;
	text-align: center;
	padding: 0;
	margin: 0;
	color: #000;
	background: #fff;
}

.bold {
	font-weight: bold;
	border-bottom: 1px solid #99bbe8;
}

a:link {
	color: #0000FF;
	font-size: 14px;
	text-decoration: none
}

a:visited {
	color: #0000FF;
}

a:hover {
	color: #0000FF;
}

a:active {
	color: #0000FF;
}

.content {
	width: 1200px;
	margin: 0 auto;
}

.content td {
	padding: 5px;
	text-align: center
}

.title {
	display: inline;
	text-align: center;
	padding: 0 3px;
	cursor: pointer;
}

#masterdiv tr {
	display: none
}
</style>
		<script language="javascript" type="text/javascript"> 
window.onload=function(){  
    var tr=document.getElementsByTagName("tr"),c="#fff",c2;  
    for(var j=0;j<tr.length;j++){  
    if(j>0&&(j/2+"a").length>2){c="#fff"}  
    else if(j==0){c="#5B3300";tr[j].style.fontWeight="bold"}  
    else{c="#eef5fd"}tr[j].style.backgroundColor=c;  
    tr[j].onmouseover=function(){c2=this.style.backgroundColor;this.style.backgroundColor="#dbe7fd";};    
    tr[j].onmouseout=function(){this.style.backgroundColor=c2;};  
    }  
}  

if (document.getElementById){
    document.write('<style type="text/css">\n')
    document.write('.submenu{display: none;}\n')
    document.write('</style>\n')
    }

    function SwitchMenu(idName,type){
    if(document.getElementById){
   		var el = document.getElementById(idName);
   	 var ar = document.getElementById("masterdiv").getElementsByTagName("span");
	$("#"+idName).html("<img align=\"absmiddle\" src=\"./images/loading.gif\"><span>正在加载数据,请稍候……</span>");
	$("#"+idName).slideDown(1000);
	var url="get?ip=www.scirp.org&type="+type;
	var result;
	$.ajax({
		 type: "get",
		 url: url,
		 async: true,
		 error: function(msg){
		 	result=msg;
		 },
		 success: function(msg){ 
		 	result=msg;
		 },
		 beforeSend: function(){ 
		 },
		 complete:function(){
			document.getElementById(idName).innerHTML=result;
		 }
	});


   	 
    if(el.style.display != "block"){
    	for (var i=0; i<ar.length; i++){
   		 if (ar[i].className=="submenu") 
   		 ar[i].style.display = "none";
   		 }
    	el.style.display = "block";
    }else{
    	el.style.display = "none";
   	 }
    }
	}

 function   show(idName){
	 if(document.getElementById){
	   		var el = document.getElementById(idName);
	 }
	 var ar = document.getElementById("masterdiv").getElementsByTagName("span");
	  if(el.style.display != "block"){
	    	for (var i=0; i<ar.length; i++){
	   		 if (ar[i].className=="submenu") 
	   		 ar[i].style.display = "none";
	   		 }
	    	el.style.display = "block";
	    }else{
	    	el.style.display = "none";
	   	 }
 }
 function remove(idName){
	 if(document.getElementById){
	   		var el = document.getElementById(idName);
	 }
	 var ar = document.getElementById("masterdiv").getElementsByTagName("span");
	  if(el.style.display != "block"){
	    	for (var i=0; i<ar.length; i++){
	   		 if (ar[i].className=="submenu") 
	   		 ar[i].style.display = "none";
	   		 }
	    	el.style.display = "block";
	    }else{
	    	el.style.display = "none";
	   	 }
 }
</script>
	</head>
	<body>
		<div class="content">
			<div
				style="float: left; width: 800px; padding: 20px 0; padding-left: 400px;">
				<span style="float: left; padding: 5px 7px 0 0"><input
						type="text" name="textfield"
						style="border: 1px solid #888; padding: 0 5px; width: 290px; height: 30px; background: url(http://su.bdimg.com/static/superpage/img/spis_e3348b0e.png) no-repeat" />
				</span>
				<span style="float: left"><input type="submit" name="Submit"
						value="提 交"
						style="font-size: 14px; cursor: pointer; border: 0; width: 95px; height: 37px; background: url(http://su.bdimg.com/static/superpage/img/spis_e3348b0e.png) no-repeat 0 -30px" />
				</span>
			</div>
			<div style="float: left; width: 1200px;">
				<table width="100%" border="0" cellpadding="0" cellspacing="1"
					bgcolor="#99bbe8" id="table1">
					<tr>
						<td bgcolor="#dbe7fd" class="bold">
							监测点
						</td>
						<td bgcolor="#dbe7fd" class="bold">
							ISP
						</td>
						<td bgcolor="#dbe7fd" class="bold">
							省份
						</td>
						<td bgcolor="#dbe7fd" class="bold">
							解析IP
						</td>
						<td bgcolor="#dbe7fd" class="bold">
							解析IP所在地
						</td>
						<td bgcolor="#dbe7fd" class="bold">
							Http状态
						</td>
						<td bgcolor="#dbe7fd" class="bold">
							总时间
						</td>
						<td bgcolor="#dbe7fd" class="bold">
							解析时间
						</td>
						<td bgcolor="#dbe7fd" class="bold">
							连接时间
						</td>
						<td bgcolor="#dbe7fd" class="bold">
							下载时间
						</td>
						<td bgcolor="#dbe7fd" class="bold">
							下载大小
						</td>
						<td bgcolor="#dbe7fd" class="bold">
							文件大小
						</td>
						<td bgcolor="#dbe7fd" class="bold">
							下载速度
						</td>
						<td bgcolor="#dbe7fd" class="bold">
							Http Head
						</td>
						<td bgcolor="#dbe7fd" class="bold">
							操作
						</td>
					</tr>
					<tr>
						<td>
							上海市电信
						</td>
						<td>
							电信
						</td>
						<td>
							上海市
						</td>
						<td>
							61.172.244.108
						</td>
						<td>
							上海市 电信ADSL
						</td>
						<td>
							<font color="#FF0066">200</font>
						</td>
						<td>
							<font color="#009999">0.442s</font>
						</td>
						<td>
							0.002s
						</td>
						<td>
							0.003s
						</td>
						<td>
							0.438s
						</td>
						<td>
							70.916KB
						</td>
						<td>
							162.07KB
						</td>
						<td>
							<font color="#9900CC">162.07KB/s</font>
						</td>
						<td>
							<div class="title" onClick="show('sub1')">
								查看
							</div>
						</td>
						<td>
							<div class="title" onClick="SwitchMenu('sub1','get')">
								GEI
							</div>
							<div class="title" onClick="SwitchMenu('sub1','ping')">
								PING
							</div>
							<div class="title" onClick="SwitchMenu('sub1','trace')">
								Trace
							</div>
						</td>
					</tr>
					<tr id="masterdiv">
						<td colspan="15"
							style="padding: 0 0 0 10px; line-height: 22px; text-align: left;">
							<span class="submenu" id="sub1" onclick="remove('sub1')"> 1111111111111 </span>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</body>
</html>
