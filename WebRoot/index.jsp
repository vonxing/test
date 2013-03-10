<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="keywords"
			content="网站测速,网站速度测试,网速测试,电信,联通,网通,移动、教育网、铁通、监控,CDN,PING,DNS,http,网站测速,速度测试,监控,CDN测速,PING,TRACROUTE,DIG" />
		<meta name="description"
			content="国内最专业最权威的实时网站测速、服务器监控、网络监控、IDC质量评测、PING,DNS,HTTP,CDN测试网站速度监控，遍及国内各省和国外的监测点，包括电信、网通、联通、移动、长城宽带、教育网等线路，测试网站在全国各地和海外的打开速度，全面的报表功能、对比功能、地图展示、柱型图展示等专业测速网站 " />
		<meta http-equiv="pragma" content="no-cache" />
		<title>测试结果 网站速度测试</title>
		<link rel="shortcut icon" href="http://17ce.com./images/favicon.ico" />
		<script type="text/javascript" async="" src="./js/ga.js"></script>
		<script type="text/javascript"
			src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js"></script>
		<style type="text/css"></style>
		<script type="text/javascript" src="./js/swfobject.js"></script>
		<script type="text/javascript" src="./js/fchar.js"></script>
		<script type="text/javascript" src="./js/sort.js"></script>
		<script type="text/javascript" src="./js/history.js"></script>
		<script type="text/javascript" src="./js/common.js" charset="utf-8"></script>
	</head>
	<body>
		<script src="http://tajs.qq.com/jiathis.php?uid=1533954&dm=17ce.com"
			charset="utf-8"></script>
		<link href="./css/jiathis_share.css" rel="stylesheet" type="text/css" />


		<div align="center" id="top">
			<style>
html {
	overflow-y: auto
}

body {
	font: 12px arial;
	text-align: center;
	background: #fff
}

body,p,form,ul,li {
	margin: 0;
	padding: 0;
	list-style: none
}

body,form,#fm {
	position: relative
}

img {
	border: 0
}

h3 {
	font-size: 14px;
	line-height: 15px;
}

a {
	color: #c75f3e;
}

#fm {
	padding-left: 90px;
	text-align: left;
	width: 655px;
	margin: 0 auto
}

.kw {
	width: 350px;
	height: 22px;
	padding: 4px 7px;
	padding: 6px 7px 2px\9;
	font: 16px arial;
	background: url(./images/i-1.0.0.png) no-repeat -304px 0;
	_background-attachment: fixed;
	border: 1px solid #cdcdcd;
	border-color: #9a9a9a #cdcdcd #cdcdcd #9a9a9a;
	vertical-align: top
}

.btn {
	width: 95px;
	height: 32px;
	padding: 0;
	padding-top: 2px\9;
	border: 0;
	background: #ddd url(./images/i-1.0.0.png) no-repeat;
	cursor: pointer
}

.btn_h {
	background-position: -100px 0
}

.kw,.btn_wr {
	margin: 0 5px 0 0
}

.btn_wr {
	width: 97px;
	height: 34px;
	display: inline-block;
	background: url(./images/i-1.0.0.png) no-repeat -202px 0;
	_top: 1px; *
	position: relative
}

#mCon {
	height: 18px;
	line-height: 18px;
	position: absolute;
	right: 7px;
	top: 8px;
	top: 10px\9;
	cursor: pointer;
	padding: 0 18px 0 0;
}

#mCon span {
	color: #00c;
	cursor: default;
	display: block
}

.mytable,.ranktable {
	width: 1000px;
	padding: 0;
	margin: 0;
	border-left: 1px solid #C1DAD7;
}

.mytable caption,.ranktable caption {
	padding: 0 0 5px 0;
	width: 1000px;
	font: italic 12px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	text-align: center;
}

.mytable th {
	font: bold 12px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	color: #4f6b72;
	border-right: 1px solid #C1DAD7;
	border-bottom: 1px solid #C1DAD7;
	border-top: 1px solid #C1DAD7;
	letter-spacing: 2px;
	text-transform: uppercase;
	text-align: center;
	padding: 6px 6px 6px 12px;
	background: #CAE8EA;
}

.ranktable th {
	font: bold 12px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	color: #4f6b72;
	border-right: 1px solid #C1DAD7;
	border-bottom: 1px solid #C1DAD7;
	border-top: 1px solid #C1DAD7;
	letter-spacing: 2px;
	text-transform: uppercase;
	text-align: center;
	padding: 3px 6px 3px 12px;
	background: #CAE8EA;
	line-height: 17px;
	height: 17px;
}

.mytable td {
	border-right: 1px solid #C1DAD7;
	border-bottom: 1px solid #C1DAD7;
	background: #fff;
	font-size: 12px;
	padding: 6px 6px 6px 6px;
	color: #797268;
}

.ranktable td {
	border-right: 1px solid #C1DAD7;
	border-bottom: 1px solid #C1DAD7;
	background: #fff;
	font-size: 11px;
	padding: 3px 6px 3px 6px;
	color: #797268;
	background: #F5FAFA;
	color: #797268;
	line-height: 17px;
	height: 17px;
	white-space: nowrap;
}

.mytable td.alt {
	background: #F5FAFA;
	color: #797268;
}

.mytable tr.alt td,.ranktable tr.alt td {
	background: #ecf6fc;
	color: #4f6b72;
}

.stable td {
	border: none;
	padding: 1px 1px 1px 1px;
}

.Gray {
	color: #333;
	font-size: 12px;
}

a.Gray:link {
	text-decoration: none;
	color: #333;
}

a.Gray:visited {
	color: #333;
	text-decoration: none;
}

a.Gray:hover {
	color: #333;
	text-decoration: underline;
}

a.Gray:active {
	color: #333;
	text-decoration: none;
}

.tab th {
	width: 91px;
	padding: 4px 0 4px 0;
	margin: 0;
}

.tab .on,.tab .nor {
	border: none 0;
}

.tab .on {
	color: #fff;
	background-color: #6FB7FF
}

.tab .nor {
	background-color: #FFF
}

p {
	font-size: 14px;
}

.navon {
	color: #000;
	font-weight: bold;
	text-decoration: none;
	cursor: text;
}

.table_list {
	border: 1px solid #ccc;
	font-size: 12px;
}

.alt {
	background-color: #F8F8F8;
}

.table_list .tit {
	background: #3391D4;
	height: 30px;
	line-height: 30px;
	color: #333333;
	text-align: left;
	padding-left: 20px;
	border-bottom: 1px solid #dddddd;
}

.table_list td {
	height: 28px;
	line-height: 28px;
	color: #000000;
	padding-left: 20px;
}

.tit td {
	color: #FFFFFF;
}

.table_list .red {
	color: #FF0000;
}

.table_list .blue {
	color: #2e7428;
	font-weight: bold;
}

.table_list .bottom {
	background: #f6f6f6;
	color: #2e7428;
}

.hs {
	width: 1200px;
}

.hs a {
	font-size: 14px;
	color: #090;
	cursor: pointer;
	text-decoration: none;
}

.hs .p_check {
	text-align: left;
	display: block;
	cursor: pointer;
	width: 154px;
}

.route-select {
	float: left;
	width: 172px;
	height: 33px;
	_padding-top: 6px;
}

.route-select label {
	color: #000;
	font-family: Tahoma, Geneva, sans-serif;
	font-size: 12px;
	width: 10px;
}

.route-select select {
	width: 128px;
	height: 33px; *
	height: 20px !important; *
	margin-top: 7px;
	padding-top: 8px;
	padding-bottom: 5px; *
	margin-bottom: -3px;
}

* html .route-select select {
	margin-top: 2px;
}

#recent_up li {
	height: 15px;
}

#tblSort th {
	cursor: pointer;
}

.classlist {
	background-color: #F5FBFF;
	border: 1px solid #C9E4F4;
	font-size: 12px;
	left: 0;
	line-height: 30px;
	padding: 1px;
	position: absolute;
	top: 31px;
	width: 362px;
	z-index: 10000;
}

.classlist li {
	height: 30px;
	display: inline;
	float: left;
	width: 100%;
}

#allSitesBoxHdl.classlist li.lis span.list_span_select {
	color: #666666;
	cursor: pointer;
	float: left;
	margin-left: 3px;
	text-align: left;
	width: 180px;
}

#allSitesBoxHdl.classlist li.lis input.list_span_delte,#allSitesBoxHdl.classlist li.lis input.list_span_cancel
	{
	cursor: pointer;
	text-align: center;
	width: 30px;
}

.classlist .lis input {
	border-top: none;
	border-left: none;
	background: none repeat scroll 0 0 #FFFFFF;
	border-bottom: 1px solid #CCCCCC;
	border-right: 1px solid #CCCCCC;
	color: #FF6600;
	cursor: pointer;
	float: right;
	height: 22px;
	line-height: 22px;
	margin: 4px;
	padding: 0;
}

.classlist input,.classlist textarea,.classlist select,.classlist button
	{
	font: 12px/ 16px Tahoma, Arial, sans-serif;
	vertical-align: middle;
}

#allSitesBoxHdl.classlist li.lis input.list_span_saved {
	color: #999999;
	text-align: center;
	width: 30px;
}

#allSitesBoxHdl.classlist li.lis input.list_span_save {
	cursor: pointer;
	text-align: center;
	width: 30px;
}

#u {
	color: #999999;
	padding: 4px 10px 5px 0;
	text-align: right;
}

#u a {
	margin: 0 5px;
}

#u .reg {
	margin: 0;
}

.dbclick {
	-moz-user-select: none;
	cursor: pointer;
}

.br {
	border-right: none;
	text-align: center;
}

.mytable td.br {
	border-right: none;
	text-align: center;
}
</style>


			<p id="17celogo" style="margin-bottom: 22px; margin-top: 12px;">
				<img src="./images/logo.jpg" />
			</p>
			<p id="nv"
				style="margin-bottom: 5px; width: 200px; padding-right: 190px; padding-left: 0px;">
				<a id="index" href="http://17ce.com/" style="">首&nbsp;页</a>&nbsp;&nbsp;
				<a href="javascript:void(0);" id="nav1" class=""
					onclick="switchtype(&#39;1&#39;)">Get</a>&nbsp;&nbsp;
				<a href="javascript:void(0);" id="nav2"
					onclick="switchtype(&#39;2&#39;)" class="navon">Ping</a>&nbsp;&nbsp;
				<a href="javascript:void(0);" id="nav3"
					onclick="switchtype(&#39;3&#39;)" class="">TraceRoute</a>&nbsp;&nbsp;
				<a href="javascript:void(0);" id="nav4"
					onclick="switchtype(&#39;4&#39;)" class="">Dns</a>&nbsp;&nbsp;
				<a href="javascript:void(0);" id="nav5"
					onclick="switchtype(&#39;5&#39;)" class="">Cdn</a>
			</p>
			<script type="text/javascript">window.onload=FillAllSites;</script>
			<div id="fm"
				style="position: relative; padding-left: 90px; width: 655px;">
				<form id="form1" action="" method="post">
					<div class="route-select" id="route-select" style="display: none;">
						<label style="vertical-align: bottom;">
							从&nbsp;
						</label>
						<label style="vertical-align: bottom;">
							&nbsp;到
						</label>
					</div>
					<div class="classlist" style="top: 31px; left: 0px; display: none;"
						id="allSitesBoxHdl">
						<ul id="allSitesBox">
							<li class="lis" onmouseover="changeListBgColor(this, 1)"
								onmouseout="changeListBgColor(this, 0)">
								<span
									onclick="SetInputValue(&#39;url&#39;, &#39;www.scirp.org&#39;)"
									class="list_span_select">www.scirp.org</span>
								<input type="button"
									onclick="DelAllSitesItem(&#39;www.scirp.org&#39;)"
									class="list_span_delte" value="删除"/>
								<input type="button"
									onclick="SaveAllSitesItem(&#39;www.scirp.org&#39;);"
									class="list_span_save" value="保存"/>
							</li>
						</ul>
					</div>
					<input value="ping" type="hidden" name="t" id="t"/>
					<div
						style="EXT-ALIGN: left; height: auto; display: none; border: #84C1FF 1px double; width: 358px; padding: 3px; margin-top: 3px;"
						id="adoptions">
						<label style="margin-right: 8px;">
							<span style="margin-right: 28px;">ISP</span>：
						</label>
						<label>
							<input style="vertical-align: middle; margin-top: 0;" value="0"
								checked="checked" id="isp0"
								onclick="checkall(this,&#39;isp&#39;,&#39;7&#39;)"
								type="checkbox" name="isp"/>
							全部
						</label>
						<label>
							<input style="vertical-align: middle; margin-top: 0;" value="1"
								checked="checked" id="isp1"
								onclick="checksingle(this,&#39;isp&#39;,&#39;7&#39;)"
								type="checkbox" name="isp"/>
							电信
						</label>
						<label>
							<input style="vertical-align: middle; margin-top: 0;" value="2"
								checked="checked" id="isp2"
								onclick="checksingle(this,&#39;isp&#39;,&#39;7&#39;)"
								type="checkbox" name="isp"/>
							联通
						</label>
						<label>
							<input style="vertical-align: middle; margin-top: 0;" value="6"
								checked="checked" id="isp3"
								onclick="checksingle(this,&#39;isp&#39;,&#39;7&#39;)"
								type="checkbox" name="isp"/>
							铁通
						</label>
						<label>
							<input style="vertical-align: middle; margin-top: 0;" value="7"
								checked="checked" id="isp4"
								onclick="checksingle(this,&#39;isp&#39;,&#39;7&#39;)"
								type="checkbox" name="isp"/>
							移动
						</label>
						<br />
						<label style="margin-left: 70px;"></label>
						<label>
							<input style="vertical-align: middle; margin-top: 0;" value="8"
								checked="checked" id="isp5"
								onclick="checksingle(this,&#39;isp&#39;,&#39;7&#39;)"
								type="checkbox" name="isp"/>
							教育网
						</label>
						<label>
							<input style="vertical-align: middle; margin-top: 0;" value="4"
								checked="checked" id="isp6"
								onclick="checksingle(this,&#39;isp&#39;,&#39;7&#39;)"
								type="checkbox" name="isp"/>
							其他
						</label>
						<br/>
						<label style="margin-right: 8px;">
							<span style="margin-right: 23px;">区域</span>：
						</label>
						<label>
							<input style="vertical-align: middle; margin-top: 0;" value="0"
								checked="checked" id="area0"
								onclick="checkall(this,&#39;area&#39;,&#39;4&#39;)"
								type="checkbox" name="area"/>
							全部
						</label>
						<label>
							<input style="vertical-align: middle; margin-top: 0;" value="1"
								checked="checked" id="area1"
								onclick="checksingle(this,&#39;area&#39;,&#39;4&#39;)"
								type="checkbox" name="area"/>
							大陆
						</label>
						<label>
							<input style="vertical-align: middle; margin-top: 0;" value="2"
								checked="checked" id="area2"
								onclick="checksingle(this,&#39;area&#39;,&#39;4&#39;)"
								type="checkbox" name="area"/>
							港澳台
						</label>
						<label>
							<input style="vertical-align: middle; margin-top: 0;" value="3"
								checked="checked" id="area3"
								onclick="checksingle(this,&#39;area&#39;,&#39;4&#39;)"
								type="checkbox" name="area"/>
							国外
						</label>
						<div id="moreadoptions" style="display: none;">
							<br/>
							<label style="margin-right: 5px;">
								请求方式：
							</label>
							<label>
								<input style="vertical-align: middle; margin-top: 0;" value="1"
									checked="checked" type="radio" name="rt" id="rt1"/>
								GET
							</label>
							<label>
								<input style="vertical-align: middle; margin-top: 0;" value="2"
									type="radio" name="rt"/>
								POST
							</label>
							<label>
								<input style="vertical-align: middle; margin-top: 0;" value="3"
									type="radio" name="rt"/>
								HEAD
							</label>
							<br/>
							<label
								style="margin-right: 6px; margin-top: 3px; margin-bottom: 3px;">
								<span style="margin-right: 1px;">nocache</span>：
							</label>
							<label>
								<input style="vertical-align: middle; margin-top: 3px;"
									type="checkbox" name="nocache" id="nocache"/>
							</label>
							<br/>
							<label style="margin-right: 13px;">
								<span style="margin-right: 23px;">host</span>：
							</label>
							<label>
								<input style="vertical-align: middle; margin-top: 0;"
									type="text" name="host" id="host"/>
							</label>
							<br/>
							<label style="margin-right: 13px;">
								<span style="margin-right: 11px;">referer</span>：
							</label>
							<label>
								<input style="vertical-align: middle; margin-top: 0;"
									type="text" name="referer" id="referer"/>
							</label>
							<br/>
							<label style="margin-right: 13px;">
								<span style="margin-right: 11px;">cookie</span>：
							</label>
							<label>
								<input style="vertical-align: middle; margin-top: 0;"
									type="text" name="cookie" id="cookie"/>
							</label>
							<br/>
							<label>
								user-agent：
							</label>
							<label>
								<input style="vertical-align: middle; margin-top: 0;"
									type="text" name="agent" id="agent"/>
							</label>
							<br/>
							<label style="margin-right: 0;">
								<span style="margin-right: 12px;">下载速度</span>：
							</label>
							<label>
								<input style="vertical-align: middle; margin-top: 0;"
									type="text" name="speed" id="downspeed"/>
								(byte/s)
							</label>
						</div>
						<div id="pingadoptions" style="display: inline;">
							<br/>
							<label style="margin-right: 13px;">
								<span style="margin-right: 11px;">发包数</span>：
							</label>
							<label>
								<input style="vertical-align: middle; margin-top: 0;"
									type="text" name="pingcount" id="pingcount"/>
								(最大100)
							</label>
							<br/>
							<label style="margin-right: 0;">
								<span style="margin-right: 12px;">发包大小</span>：
							</label>
							<label>
								<input style="vertical-align: middle; margin-top: 0;"
									type="text" name="pingsize" id="pingsize"/>
								(B)(最大1000B)
							</label>
						</div>
					</div>
					<div id="mCon" style="width: 260px; top: 0px; margin-top: 0px;">
						<span class="btn_wr" id="btn_wr" style="display: inline;"><input
								type="submit"
								onclick="set_nocache(1);submit_query_form();showindex();ajax_check(&#39;content&#39;,&#39;&#39;,&#39;&#39;);return false;"
								value="检测一下" id="su" class="btn" style=""/>
							<input type="submit" value="预加载"
								onclick="set_nocache(0);submit_query_form();showindex();ajax_check(&#39;content&#39;,&#39;&#39;,&#39;&#39;);return false;"
								id="su1" style="display: none; margin-left: 4px;" class="btn"/>
							<input type="hidden" id="su2" value="检测一下"/>
							<input type="button" value="停止检测"
								onclick="stop_check();return false;" id="su3"
								style="display: none;" class="btn"/>
						</span>
						<span style="display: inline; position: absolute; top: 8px;"
							id="rmenu"><a href="javascript:void(0);"
							onclick="opencurl(this)" id="clable" style="display: inline;">对比一下</a>&nbsp;&nbsp;<a
							href="javascript:void(0);" onclick="openhigh()" id="high"
							style="display: inline;">高级</a>&nbsp;&nbsp;<a
							href="http://www.17ce.com/faq/" target="_blank" id="help"
							style="display: inline;">帮助</a>
						</span>
					</div>
				</form>
				<style type="text/css">
/*区域设置css*/
.dialog-areas {
	border: 1px solid #BBBBBB;
	position: absolute;
	z-index: 1000;
	background: none repeat scroll 0 0 #F5FAFA;
	width: 619px;
	margin-left: 0px;
	left: 34px;
	display: none;
}

.dialog-areas ul,.dialog-areas ol {
	list-style: none outside none;
}

.dialog-areas li {
	overflow: visible;
}

.dialog-areas li {
	overflow: hidden;
	width: 100%;
}

.dialog-areas .clearfix:after {
	clear: both;
	content: "";
	display: block;
	height: 0;
}

.dialog-areas .dcity {
	display: block;
	vertical-align: middle;
	z-index: 1;
}

.gcity,.province-list {
	display: inline-block;
}

.ecity {
	float: left;
	height: 30px;
	margin-right: 1px;
	padding-right: 8px;
	position: relative;
	width: 140px;
}

.dialog-areas li span.group-label {
	display: inline-block;
	font-weight: 700;
	margin-right: 5px;
	padding: 5px 0 5px 10px;
	width: 70px;
}

.dialog-areas input,.dialog-areas button {
	vertical-align: middle;
}

.dialog-areas label {
	margin: 0 1px;
}

.province-list {
	width: 619px;
}

.gcity,.province-list {
	display: inline-block;
}

.dialog-areas span.gareas { /*    border: 1px solid #FFFFFF;*/
	display: inline-block;
	height: 17px;
	margin-right: 3px;
	padding: 4px 4px 1px;
	position: relative;
	white-space: nowrap;
}

.dialog-areas .even {
	background-color: #ECF4FF;
}
</style>


				<input type="hidden" id="node_count" value="57"/>
				<div id="msg"
					style="position: absolute; width: 364px; height: auto; border: 1px double #84C1FF; background-color: #F5FAFA; z-index: 1000; border-top: none; display: none;">
					<p
						style="font-size: 12px; margin: 15px auto; text-align: center; color: #FF0000;"></p>
				</div>
			</div>
		</div>
		<div align="center" style="margin-top: 10px;">

			<div id="loading" align="center"
				style="top: 60px; display: none; height: 30px;">
				<span style="font-size: 14px;">正在检测中</span>
				<img id="ldimg" style="position: relative; top: 4px;"
					src="./images/loader2.gif"/>
			</div>

			<div id="shareinfo"
				style="display: block; width: 1130px; padding: 0px 33px 27px 0px; margin-left: 4px; position: relative;">
				<p>
					<input onclick="this.select()"
						style="width: 363px; margin-top: 5px;" type="text" id="resulturl"
						value=""/>
					<span>分享| 发给好友<input type="reset" id="copy" value="复制地址"
							onclick="copyToClipBoard()"/>
					</span>
				</p>
				<p
					style="width: auto; text-align: left; top: 34px; left: -18px; position: absolute;">
					<span style="padding-right: 10px;" id="check_host">检测目标：<a
						href="http://www.scirp.org/" target="_blank">www.scirp.org</a>&nbsp;&nbsp;&nbsp;&nbsp;</span>
				</p>
				<p
					style="display: none; left: 500px; position: absolute; padding-top: 5px;"
					id="speedtime">
					<input type="hidden" name="xmlfile" value="201302041321097204"
						id="xmlfile"/>
					<input id="switchradio1" type="radio" name="result" value="ping"
						checked="checked"
						onclick="set_xmlfile();speedortime(&#39;time&#39;,this.value)"/>
					时间
					<input id="switchradio2" type="radio" name="result" value="ping"
						onclick="set_xmlfile();speedortime(&#39;speed&#39;,this.value)"/>
					速度
				</p>
				<p
					style="width: 252px;; text-align: right; top: 34px; left: 925px; position: absolute;">
					<span id="check_time">检测时间：2013-02-04 13:20:42</span>
				</p>
			</div>
			<div align="center" id="content">
				<table class="mytable hs" cellspacing="0" id="tblSort">
					<thead>
						<tr>
							<th width="12%"
								onclick="sortTable(&#39;tblSort&#39;, 0,&#39;text&#39;)">
								<a href="http://17ce.com/site/ad.html" target="_blank">广告位招租</a>
							</th>
							<th width="10%"
								onclick="sortTable(&#39;tblSort&#39;, 1,&#39;text&#39;)">
								监测点
							</th>
							<th width="2%"
								onclick="sortTable(&#39;tblSort&#39;, 2,&#39;text&#39;)">
								ISP
							</th>
							<th width="5%"
								onclick="sortTable(&#39;tblSort&#39;, 3,&#39;text&#39;)">
								省份
							</th>
							<th width="4%" onclick="sortTable(&#39;tblSort&#39;, 4)">
								解析IP
							</th>
							<th width="13%"
								onclick="sortTable(&#39;tblSort&#39;, 5,&#39;text&#39;)">
								解析IP所在地
							</th>
							<th width="2%"
								onclick="sortTable(&#39;tblSort&#39;, 6,&#39;int&#39;)">
								发送
							</th>
							<th width="2%"
								onclick="sortTable(&#39;tblSort&#39;, 7,&#39;int&#39;)">
								接收
							</th>
							<th width="2%"
								onclick="sortTable(&#39;tblSort&#39;, 8,&#39;int&#39;)">
								丢弃
							</th>
							<th width="7%"
								onclick="sortTable(&#39;tblSort&#39;, 9,&#39;float&#39;)">
								最大时间
							</th>
							<th width="7%"
								onclick="sortTable(&#39;tblSort&#39;, 10,&#39;float&#39;)">
								最小时间
							</th>
							<th width="7%"
								onclick="sortTable(&#39;tblSort&#39;, 11,&#39;color&#39;)">
								平均时间
							</th>
							<th width="7%"
								onclick="sortTable(&#39;tblSort&#39;, 12,&#39;size&#39;)">
								包大小
							</th>
							<th width="8%" align="center">
								详细信息
							</th>
							<th width="12%" align="center">
								操作
							</th>
						</tr>
						<tr>
							<td>
								平均值：
							</td>
							<td>
								&nbsp;
							</td>
							<td>
								&nbsp;
							</td>
							<td>
								&nbsp;
							</td>
							<td style="text-align: center;" id="avSrcipNum">
								共
								<a
									href="http://17ce.com/site/resolveip/1b37b79205a2df71d74aba41074c8e44.html"
									target="_blank"><font size="+1" color="#009900">5</font>
								</a>个独立IP
							</td>
							<td>
								&nbsp;
							</td>
							<td id="avPacketsSent">
								10
							</td>
							<td id="avPacketsRecv">
								9
							</td>
							<td id="avPacketsLost">
								1
							</td>
							<td id="avMax">
								27.868ms
							</td>
							<td id="avMin">
								23.325ms
							</td>
							<td id="avAvg">
								<font color="#00FF40">24.836ms</font>
							</td>
							<td>
								&nbsp;
							</td>
							<td>
								&nbsp;
							</td>
							<td style="text-align: center;">
								共
								<font color="#009900" size="+1">58</font>个点
							</td>
						</tr>
					</thead>
					<tbody>
						<tr id="tr1" class="alt">
							<td></td>
							<td>
								<a style="color: #4F6B72; font-size: 12px;" href=""
									target="_blank" title="提供">CDN4</a>
							</td>
							<td>
								电信
							</td>
							<td>
								美国
							</td>
							<td id="SrcIP1">
								119.61.3.122
							</td>
							<td id="ipfrom1">
								美国 电信
							</td>
							<td id="PacketsSent1">
								10
							</td>
							<td id="PacketsRecv1">
								9
							</td>
							<td id="PacketsLost1">
								1
							</td>
							<td id="Max1">
								32.529ms
							</td>
							<td id="Min1">
								31.622ms
							</td>
							<td id="Avg1">
								<font color="#FDAB02">31.935ms</font>
							</td>
							<td id="DataSize1">
								64B
							</td>
			<td class="dbclick" onselectstart="return false" style="text-align:center;" ondblclick="removeElement2(&#39;1&#39;,this)">
<span style="display:none; text-align:left;" id="1">
PING www.scirp.org<br/>
PING www.scirp.org (119.61.3.122) with 64 bytes of data:<br/>
Reply from 119.61.3.122: bytes=64 time=32ms TTL=112<br/>
Reply from 119.61.3.122: bytes=64 time=32ms TTL=112<br/>
Request timed out.<br/>
Reply from 119.61.3.122: bytes=64 time=32ms TTL=112<br/>
Reply from 119.61.3.122: bytes=64 time=32ms TTL=112<br/>
Reply from 119.61.3.122: bytes=64 time=32ms TTL=112<br/>
Reply from 119.61.3.122: bytes=64 time=32ms TTL=112<br/>
Reply from 119.61.3.122: bytes=64 time=33ms TTL=112<br/>
Reply from 119.61.3.122: bytes=64 time=32ms TTL=112<br/>
Reply from 119.61.3.122: bytes=64 time=32ms TTL=112<br/><br/>
Ping statistics for 119.61.3.122:<br/>
Packets: Sent = 10, Received = 9, Lost = 1 (10% loss),<br/>
Approximate round trip times in milli-seconds:<br/>
Minimum = 32ms, Maximum = 33ms, Average = 32ms</span>
<a id="text1" onclick="removeElement(&#39;1&#39;,this,&#39;1&#39;)" href="javascript:void(0);">查看</a></td>
							<td class="dbclick" onselectstart="return false"
								ondblclick="removeElement4(&#39;1&#39;)">
								<span class="p_check" id="s1"><a
									onclick="point_check(&#39;1&#39;,&#39;s1&#39;,&#39;http&#39;,&#39;0&#39;,&#39;&#39;)"
									href="http://17ce.com/#s1">GET</a>&nbsp;&nbsp;&nbsp;&nbsp;<a
									onclick="point_check(&#39;1&#39;,&#39;s1&#39;,&#39;ping&#39;,&#39;0&#39;,&#39;&#39;)"
									href="#">PING</a>&nbsp;&nbsp;&nbsp;&nbsp;<a
									onclick="point_check(&#39;1&#39;,&#39;s1&#39;,&#39;tracert&#39;,&#39;0&#39;,&#39;&#39;)"
									href="http://17ce.com/#s1">Trace</a>&nbsp;&nbsp;&nbsp;&nbsp;<a
									onclick="point_check(&#39;1&#39;,&#39;s1&#39;,&#39;dig&#39;,&#39;0&#39;,&#39;&#39;)"
									href="http://17ce.com/#s1">Dig</a>
								</span>
							</td>
						</tr>
						<tr class="alt" id="trinfo1">
							<td colspan="15" id="tdinfo1" style="padding: 0px; border: none;">
								<div onselectstart="return false"
									ondblclick="removeElement3(&#39;1&#39;)"
									style="display: none; cursor: pointer; -moz-user-select: none;"
									id="info1"></div>
							</td>
						</tr>
</tbody>
						</table>

						</div>
						<input type="hidden" name="btstatus" id="btstatus" value="1"/>
						<table id="footerinfo" height="42" cellspacing="4" cellpadding="0"
							style="width: 1150px; text-align: center; margin: 0 auto; padding-top: 15px;"
							border="0">
							<tbody>
								<tr>
									<td align="center" class="Gray" id="btinfo1">
										最近测速：
										<a
											href="http://17ce.com/site/http/ff31967bbf0c6abad8301cdd9fccf285.html"
											target="_blank">www.scirp.org</a>&nbsp;&nbsp;
									</td>
								</tr>
								<tr>
									<td align="center" class="Gray" id="btinfo2">
										合作伙伴：&nbsp;&nbsp;
										<div style="display: inline-block;">
											<a href="http://www.scirp.org/" target="_blank">Scientific Research Publish</a>&nbsp;&nbsp;
										</div>
										
									</td>
								</tr>
								<tr style="padding-top: 0;">
									<td align="center" class="Gray"></td>
								</tr>
							</tbody>
						</table>
	</div>
	</body>
</html>