var ips;
var xmlfile;
var xmlhttp;
var timeoutob;

function show_node_list()
{
	var nodelist=document.getElementById('node_list');
	if(nodelist.style.display=='none'||!nodelist.style.display)
	{
		nodelist.style.display='block';
		var is_check_node=document.getElementById('sid').value;
		cnodes = new Array;
		cnodes = is_check_node.split(",");
		var isc=0;
		var nn=document.getElementById('node_count').value;
		var node;
		var node2;
		var k=nn;
		while(nn)
		{
			node=document.getElementById('n_list_'+nn);
			if(jQuery.inArray(node.value,cnodes)!=-1)
			{
				node.checked="checked";	
				isc++;
			}
			if(isc>=3)
			{
				while(k)
				{
					node2=document.getElementById('n_list_'+k);	
					if(!node2.checked)
					{
						node2.disabled="disabled";
					}
					k--;
				}
				break;
			}
			nn--;
		}		
	}
	else
	{
		nodelist.style.display='none';
	}
}

function add_node(ele)
{
	var nn=document.getElementById('node_count').value; 
	var k=nn;
	var node;
	var cip=0;
	var node2;
	var node_list_info='';
	var input_info='';
	var lab;
	if(ele.checked)
	{
		//检查当前已选数目 如果大于等于3 则禁止选择其他
		while(k)
		{
			node=document.getElementById('n_list_'+k);
			lab=document.getElementById('lab_'+k);
			if(node.checked)
			{
				if(!node_list_info)
				{
					node_list_info+=node.value;
					input_info+=lab.innerHTML;
				}
				else
				{
					node_list_info+=','+node.value;
					input_info+=','+lab.innerHTML;
				}
				cip++;
			}
			k--;
		}
		if(cip>=3)
		{
			k=nn;
			while(k)
			{
				node2=document.getElementById('n_list_'+k);	
				if(!node2.checked)
				{
					node2.disabled="disabled";
				}
				k--;
			}			
		}
	}
	else
	{
		while(k)
		{
			node=document.getElementById('n_list_'+k);	
			lab=document.getElementById('lab_'+k);
			if(node.checked)
			{
				if(!node_list_info)
				{
					node_list_info+=node.value;
					input_info+=lab.innerHTML;
				}
				else
				{
					node_list_info+=','+node.value;
					input_info+=','+lab.innerHTML;
				}
				cip++;
			}
			k--;
		}
		if(cip>=2)
		{
			k=nn;
			while(k)
			{
				node2=document.getElementById('n_list_'+k);	
				if(!node2.checked)
				{
					node2.disabled="";
				}
				k--;
			}			
		}		
	}
	document.getElementById('sid').value=node_list_info;
	if(!input_info)
	{
		input_info='请选择监测点';
	}
	document.getElementById('input_info').value=input_info;
	document.getElementById('input_info').title=input_info;
}

function ajax_check(pos,type,sid)
{
	if(document.getElementById('sid').disabled==false)
	{
		tracet_check();
	}
	else
	{
		var xmlhttp;
		var postdata;
		var backdata;
		var url=escape(document.getElementById('url').value);
		var curl=escape(document.getElementById('curl').value);
		var t;
		var isparr='';
		var areaarr='';
		var rt;
		var host=document.getElementById('host').value;
		var referer=document.getElementById('referer').value;
		var cookie=document.getElementById('cookie').value;
		var agent=document.getElementById('agent').value;
		var speed=document.getElementById('downspeed').value;
		var isp=document.getElementsByName("isp");
		var area=document.getElementsByName("area");
		var pingcount=document.getElementById('pingcount').value;
		var pingsize=document.getElementById('pingsize').value;	
		var nocache=document.getElementById('nocache');
		//var cdnopen=document.getElementById('cdnopen');
		if(nocache.checked == true)
		{
			nocache=1;
		}
		else
		{
			nocache=0;
		}		
		if(type)
		{
			t=type;
		}
		else
		{
			t=document.getElementById('t').value;
		}
		if(t=='ping')
		{
			if(!ping_filter(pingcount,pingsize))
			return false;	
		}
		for (var i=0;i<isp.length;i++ )
		{
			if(isp[i].checked == true)
			{
			isparr+='isp[]='+isp[i].value+'&';
			} 
		}
		for (var i=0;i<area.length;i++ )
		{
			if(area[i].checked == true)
			{
			areaarr+='area[]='+area[i].value+'&';
			} 
		}		
		var rtarr=document.getElementsByName("rt"); 
		for (var i=0;i<rtarr.length;i++ )
		{
			if(rtarr[i].checked == true)
			{
			rt=rtarr[i].value;
			break;
			} 
		}
		postdata="&url="+url;
		postdata+="&curl="+curl;
		postdata+="&rt="+rt;
		postdata+="&nocache="+nocache;
		//postdata+="&cdnopen="+cdnopen;
		postdata+="&host="+host;
		postdata+="&referer="+referer;
		postdata+="&cookie="+cookie;
		postdata+="&agent="+agent;
		postdata+="&speed="+speed;
		postdata+="&pingcount="+pingcount;
		postdata+="&pingsize="+pingsize;
		postdata+="&"+areaarr;
		if(sid)
		{
			postdata+="&sid="+sid;
		}
		else
		{
			postdata+="&"+isparr;
		}
		document.getElementById('loading').style.display="block";
		document.getElementById('shareinfo').style.display="none";
		document.getElementById('content').innerHTML='';
		document.getElementById('flash').style.display="none";
		document.getElementById('switchradio1').checked="checked";		
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{	
				backdata=xmlhttp.responseText;
				var objTEST=eval("("+backdata+")");
				if(objTEST.message)
				{
					document.getElementById('loading').style.display="none";
					document.getElementById('content').innerHTML=objTEST.message;
					check_end();
				}
				else
				{
					ips=objTEST.fullips;
					document.getElementById('resulturl').value=objTEST.shareurl;
					set_recent_check(objTEST.recent);
					render_table(objTEST,t);
				}
			}
		}
		xmlhttp.open("POST","/site/"+t,true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(postdata);
	}
}

function stop_check()
{
	check_end();
	var loading=document.getElementById('loading');
	if(loading)
	{
		loading.style.display='none';
	}
	xmlhttp.abort();
	clearTimeout(timeoutob);
	var tds = document.getElementsByTagName("td");
	for (x in tds)
	{
		if(tds[x].innerHTML=='<img src="/smedia/images/ld.gif">')
		{
			tds[x].innerHTML='*';
		}
		else if(tds[x].innerHTML=='<img src="/smedia/images/wait.gif">')
		{
			tds[x].innerHTML='未返回数据';
		}
	}
}

function check_end()
{
	var su=document.getElementById('su');
	var su1=document.getElementById('su1');
	var su2=document.getElementById('su2');
	var su3=document.getElementById('su3');
	var t=document.getElementById('t').value;
	su.disabled='';
	su1.disabled='';	
	var nocache=document.getElementById('nocache');	
	if(nocache.checked)
	{
		if(t=='cdn')
		su.value='刷新';
		else if(t=='tracert')
		su.value='追踪';
		else
		su.value='检测一下';		
	}
	else
	{
		su1.value=su2.value;
	}
	su3.style.display='none';
	su.style.display='';
	if(t=='cdn')
	su1.style.display='';
	//if(t=='tracert')
	//	document.getElementById('content').innerHTML='没有返回数据';
	//}
}

function ping_filter(pingcount,pingsize)
{
	if(pingcount>100&&pingsize>1000)
	{
		$("#msg p").html("发包数不能大于100<br>发包大小不能大于1000B");
		$("#msg").slideDown("slow");
		setTimeout('$("#msg").slideUp("slow")',3000);		
		return false;
	}
	else if(pingcount>100)
	{
		$("#msg p").html("发包数不能大于100");
		$("#msg").slideDown("slow");
		setTimeout('$("#msg").slideUp("slow")',3000);		
		return false;
	}
	else if(pingsize>1000)
	{
		$("#msg p").html("发包大小不能大于1000B");
		$("#msg").slideDown("slow");
		setTimeout('$("#msg").slideUp("slow")',3000);
		return false;
	}
	else
	{
		return true;
	}
}

function render_table(objTEST,t)
{
	switch (t)
   	{
		case 'http':
		http_render_table(objTEST,t);
		break
		case 'ping':
		ping_render_table(objTEST,t);
		break
		case 'tracert':
		tracert_render_table(objTEST,t);
		break
		case 'dns':
		dns_render_table(objTEST,t);
		break
		case 'cdn':
		cdn_render_table(objTEST,t);
		break		
		default:
		alert('无效检测类型');		
	}
}

function dns_render_table(objTEST,t)
{	
	if(objTEST.hasOwnProperty('item')&&objTEST.hasOwnProperty('citem'))
	{
		document.getElementById('content').innerHTML=dns_vs_render_table(objTEST);
		document.title=objTEST.item.title+' '+objTEST.citem.title+' DNS对比测试结果 网站速度测试 17CE';
		ajax_fresh(t,objTEST.item.tid,0,objTEST.citem.tid,0,0);
		document.getElementById('tid').value=objTEST.item.tid;
		document.getElementById('ctid').value=objTEST.citem.tid;
		document.getElementById('switchradio1').value="dns2";
		document.getElementById('switchradio2').value="dns2";
	}
	else
	{	
		document.getElementById('content').innerHTML=dns_single_render_table(objTEST.fullips,objTEST.adlist);
		document.title=objTEST.title+' DNS测试结果 网站速度测试 17CE';
		ajax_fresh(t,objTEST.tid,0,'','','');
		document.getElementById('tid').value=objTEST.tid;
		document.getElementById('switchradio1').value="dns";
		document.getElementById('switchradio2').value="dns";
	}	
}

function http_render_table(objTEST,t)
{
	if(objTEST.hasOwnProperty('item')&&objTEST.hasOwnProperty('citem'))
	{
		document.getElementById('content').innerHTML=http_vs_render_table(objTEST);
		document.title=objTEST.item.title+' '+objTEST.citem.title+' GET对比测试结果 网站速度测试 17CE';
		ajax_fresh(t,objTEST.item.tid,0,objTEST.citem.tid,0,0);
		document.getElementById('tid').value=objTEST.item.tid;
		document.getElementById('ctid').value=objTEST.citem.tid;
		document.getElementById('switchradio1').value="http2";
		document.getElementById('switchradio2').value="http2";
	}
	else
	{	
		document.getElementById('content').innerHTML=http_single_render_table(objTEST.fullips,objTEST.adlist);
		document.title=objTEST.title+' GET测试结果 网站速度测试 17CE';
		ajax_fresh(t,objTEST.tid,0,'','','');
		document.getElementById('tid').value=objTEST.tid;
		document.getElementById('switchradio1').value="http";
		document.getElementById('switchradio2').value="http";
	}
}

function cdn_render_table(objTEST,t)
{
	document.getElementById('content').innerHTML=cdn_single_render_table(objTEST.fullips,objTEST.adlist);
	document.title=objTEST.title+' CDN测试结果 网站速度测试 17CE';
	ajax_fresh(t,objTEST.tid,0,'','','');
	document.getElementById('tid').value=objTEST.tid;
	document.getElementById('switchradio1').value="cdn";
	document.getElementById('switchradio2').value="cdn";
}

function ping_render_table(objTEST,t)
{
	if(objTEST.hasOwnProperty('item')&&objTEST.hasOwnProperty('citem'))
	{
		document.getElementById('content').innerHTML=ping_vs_render_table(objTEST);
		document.title=objTEST.item.title+' '+objTEST.citem.title+' PING对比测试结果 网站速度测试 17CE';
		ajax_fresh(t,objTEST.item.tid,0,objTEST.citem.tid,0,0);
		document.getElementById('tid').value=objTEST.item.tid;
		document.getElementById('ctid').value=objTEST.citem.tid;
		document.getElementById('switchradio1').value="ping2";
		document.getElementById('switchradio2').value="ping2";
	}
	else
	{	
		document.getElementById('content').innerHTML=ping_single_render_table(objTEST.fullips,objTEST.adlist);
		document.title=objTEST.title+' PING测试结果 网站速度测试 17CE';
		ajax_fresh(t,objTEST.tid,0,'','','');
		document.getElementById('tid').value=objTEST.tid;
		document.getElementById('switchradio1').value="ping";
		document.getElementById('switchradio2').value="ping";
	}
}

function ajax_fresh(t,tid,num,ctid,cnum,diffnum)
{
	var postdata;
	var newtid;
	var newctid;
	postdata='tid='+tid;
	postdata+='&&num='+num;
	if(ctid)
	{
		postdata+='&&ctid='+ctid;
		postdata+='&&cnum='+cnum;
		postdata+='&&diffnum='+diffnum;
	}
	if (window.XMLHttpRequest)
  	{// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp=new XMLHttpRequest();
  	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
  	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{	
			var backdata=xmlhttp.responseText;		
			var fresh=eval("("+backdata+")");
			
			if(fresh.message)
			{
				document.getElementById('content').innerHTML=fresh.message;
			}			
			else if(fresh.hasOwnProperty('item')&&fresh.hasOwnProperty('citem'))
			{
				switch (t)
				{
					case 'http':
					http_vs_ajax_fresh(fresh,t,tid,num,ctid,cnum,diffnum);
					break
					case 'ping':
					ping_vs_ajax_fresh(fresh,t,tid,num,ctid,cnum,diffnum);
					break
					case 'tracert':
					tracert_vs_ajax_fresh(fresh,t,tid,num,ctid,cnum,diffnum);
					break
					case 'dns':
					dns_vs_ajax_fresh(fresh,t,tid,num,ctid,cnum,diffnum);
					break					
					default:
					alert('无效检测类型');		
				}				
			}
			else
			{	
				switch (t)
				{
					case 'http':
					http_ajax_fresh(fresh,t,tid,num);
					break
					case 'ping':
					ping_ajax_fresh(fresh,t,tid,num);
					break
					case 'tracert':
					tracert_ajax_fresh(fresh,t,tid,num);
					break
					case 'dns':
					dns_ajax_fresh(fresh,t,tid,num);
					break
					case 'cdn':
					cdn_ajax_fresh(fresh,t,tid,num);
					break					
					default:
					alert('无效检测类型');
				}	
			}
		}
	}
	xmlhttp.open("POST","/site/ajaxfresh",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(postdata);	
}

function dns_vs_ajax_fresh(fresh,t,tid,num,ctid,cnum,diffnum)
{
	var newtid=document.getElementById('tid').value;
	var newctid=document.getElementById('ctid').value;
	if(fresh.item.tid==newtid&&fresh.citem.tid==newctid)
	{
		if(parseInt(fresh.item.num)>num&&fresh.item.freshdata)
		{
			dns_fresh_table(fresh.item.freshdata,'');
		}
		if(parseInt(fresh.citem.num)>cnum&&fresh.citem.freshdata)
		{
			dns_fresh_table(fresh.citem.freshdata,'c');
		}
		if(parseInt(fresh.diffnum)>diffnum&&fresh.diffdata)
		{
			dns_fresh_diff_table(fresh.diffdata);
		}		
		if(fresh.item.taskstatus=='3'&&fresh.citem.taskstatus=='3')
		{
			dns_vs_fresh_over(fresh);
			check_end();
		}
		else
		{	
			timeoutob=setTimeout("ajax_fresh('"+t+"','"+tid+"','"+fresh.item.num+"','"+ctid+"','"+fresh.citem.num+"','"+fresh.diffnum+"')",5000);	
		}
	}	
}

function http_vs_ajax_fresh(fresh,t,tid,num,ctid,cnum,diffnum)
{
	var newtid=document.getElementById('tid').value;
	var newctid=document.getElementById('ctid').value;
	if(fresh.item.tid==newtid&&fresh.citem.tid==newctid)
	{
		if(parseInt(fresh.item.num)>num&&fresh.item.freshdata)
		{
			http_fresh_table(fresh.item.freshdata,'');
		}
		if(parseInt(fresh.citem.num)>cnum&&fresh.citem.freshdata)
		{
			http_fresh_table(fresh.citem.freshdata,'c');
		}
		if(parseInt(fresh.diffnum)>diffnum&&fresh.diffdata)
		{
			http_fresh_diff_table(fresh.diffdata);
		}		
		if(fresh.item.taskstatus=='3'&&fresh.citem.taskstatus=='3')
		{
			http_vs_fresh_over(fresh);
			check_end();
		}
		else
		{	
			timeoutob=setTimeout("ajax_fresh('"+t+"','"+tid+"','"+fresh.item.num+"','"+ctid+"','"+fresh.citem.num+"','"+fresh.diffnum+"')",5000);	
		}
	}	
}

function ping_vs_ajax_fresh(fresh,t,tid,num,ctid,cnum,diffnum)
{
	var newtid=document.getElementById('tid').value;
	var newctid=document.getElementById('ctid').value;
	if(fresh.item.tid==newtid&&fresh.citem.tid==newctid)
	{
		if(parseInt(fresh.item.num)>num&&fresh.item.freshdata)
		{
			ping_fresh_table(fresh.item.freshdata,'');
		}
		if(parseInt(fresh.citem.num)>cnum&&fresh.citem.freshdata)
		{
			ping_fresh_table(fresh.citem.freshdata,'c');
		}
		if(parseInt(fresh.diffnum)>diffnum&&fresh.diffdata)
		{
			ping_fresh_diff_table(fresh.diffdata);
		}		
		if(fresh.item.taskstatus=='3'&&fresh.citem.taskstatus=='3')
		{
			ping_vs_fresh_over(fresh);
			check_end();
		}
		else
		{	
			timeoutob=setTimeout("ajax_fresh('"+t+"','"+tid+"','"+fresh.item.num+"','"+ctid+"','"+fresh.citem.num+"','"+fresh.diffnum+"')",5000);	
		}
	}	
}

function dns_ajax_fresh(fresh,t,tid,num)
{
	var newtid=document.getElementById('tid').value;
	if(fresh.tid==newtid)
	{
		if(parseInt(fresh.num)>num&&fresh.freshdata)
		{
			dns_fresh_table(fresh.freshdata,'');
		}			
		if(fresh.taskstatus=='3')
		{
			dns_fresh_over(fresh);
			check_end();
		}
		else
		{	
			timeoutob=setTimeout("ajax_fresh('"+t+"','"+tid+"','"+fresh.num+"','','','')",5000);	
		}
	}	
}

function http_ajax_fresh(fresh,t,tid,num)
{
	var newtid=document.getElementById('tid').value;
	if(fresh.tid==newtid)
	{
		if(parseInt(fresh.num)>num&&fresh.freshdata)
		{
			http_fresh_table(fresh.freshdata,'');
		}			
		if(fresh.taskstatus=='3')
		{
			http_fresh_over(fresh);
			check_end();
		}
		else
		{	
			timeoutob=setTimeout("ajax_fresh('"+t+"','"+tid+"','"+fresh.num+"','','','')",5000);	
		}
	}	
}

function cdn_ajax_fresh(fresh,t,tid,num)
{
	var newtid=document.getElementById('tid').value;
	if(fresh.tid==newtid)
	{
		if(parseInt(fresh.num)>num&&fresh.freshdata)
		{
			cdn_fresh_table(fresh.freshdata,'');
		}			
		if(fresh.taskstatus=='3')
		{
			cdn_fresh_over(fresh);
			check_end();
		}
		else
		{	
			timeoutob=setTimeout("ajax_fresh('"+t+"','"+tid+"','"+fresh.num+"','','','')",5000);	
		}
	}	
}

function ping_ajax_fresh(fresh,t,tid,num)
{
	var newtid=document.getElementById('tid').value;
	if(fresh.tid==newtid)
	{
		if(parseInt(fresh.num)>num&&fresh.freshdata)
		{
			ping_fresh_table(fresh.freshdata,'');
		}			
		if(fresh.taskstatus=='3')
		{
			ping_fresh_over(fresh);
			check_end();
		}
		else
		{	
			timeoutob=setTimeout("ajax_fresh('"+t+"','"+tid+"','"+fresh.num+"','','','')",5000);	
		}
	}	
}

function set_recent_check(data)
{
	var btinfo1=document.getElementById("btinfo1");
	var btstatus=document.getElementById("btstatus");
	var html='最近测速：';
	for (x in data)
	{
		html+='<a href="/site/'+data[x]['type']+'/'+data[x]['tid']+'.html" target="_blank">'+data[x]['host']+'</a>&nbsp;&nbsp;';
	}
	if(btstatus.value==1)
	{
		btinfo1.innerHTML=html;
	}
	else
	{
		document.getElementById("btinfo2").innerHTML=btinfo1.innerHTML;
		btinfo1.innerHTML=html;	
		btstatus.value=1;
	}
}

function dns_vs_fresh_over(fresh)
{
	document.getElementById("check_host").innerHTML=check_item_str(fresh.item,fresh.citem);
	document.getElementById("check_time").innerHTML='检测时间：'+fresh.item.check_time;
	if(fresh.item.average_data.NsLookup)
	{
		document.getElementById("av_SrcIP").innerHTML='共<a href="/site/resolveip/'+fresh.item.tid+'.html" target="_blank"><font size="+1" color="#009900">'+fresh.item.average_data.SrcipNum+'</font></a>个独立IP';
		document.getElementById("av_NsLookup").innerHTML=fresh.item.average_data.NsLookup;
	}	
	document.getElementById("diff_av_SrcIP").innerHTML='&nbsp;';
	if(fresh.item.average_data.diffNsLookup)
	{
		document.getElementById("diff_av_NsLookup").innerHTML=font_color(fresh.item.average_data.diffNsLookup,1);
	}
	if(fresh.citem.average_data.NsLookup)
	{
		document.getElementById("c_av_SrcIP").innerHTML='共<a href="/site/resolveip/'+fresh.citem.tid+'.html" target="_blank"><font size="+1" color="#009900">'+fresh.citem.average_data.SrcipNum+'</font></a>个独立IP';
		document.getElementById("c_av_NsLookup").innerHTML=fresh.citem.average_data.NsLookup;
	}
	var srcip;
	for (x in ips)
	{	
		srcip=document.getElementById("SrcIP"+ips[x]['sid']);
		if(srcip.innerHTML.match("gif"))
		{
			srcip.innerHTML='监测点未响应';
		}
		srcip=document.getElementById("cSrcIP"+ips[x]['sid']);
		if(srcip.innerHTML.match("gif"))
		{
			srcip.innerHTML='监测点未响应';
		}		
	}
	document.getElementById('speedtime').style.display="none";
	document.getElementById('loading').style.display="none";
	document.getElementById('shareinfo').style.display="block";
}

function http_vs_fresh_over(fresh)
{
	document.getElementById("check_host").innerHTML=check_item_str(fresh.item,fresh.citem);
	document.getElementById("check_time").innerHTML='检测时间：'+fresh.item.check_time;
	//document.getElementById("av_SrcIP").innerHTML='&nbsp;';
	if(fresh.item.average_data.TotalTime)
	{
		document.getElementById("av_TotalTime").innerHTML=totaltime_color(fresh.item.average_data.TotalTime);
		document.getElementById("av_SrcIP").innerHTML='共<a href="/site/resolveip/'+fresh.item.tid+'.html" target="_blank"><font size="+1" color="#009900">'+fresh.item.average_data.SrcipNum+'</font></a>个独立IP';
		document.getElementById("av_NsLookup").innerHTML=fresh.item.average_data.NsLookup;
		document.getElementById("av_ConnectTime").innerHTML=fresh.item.average_data.ConnectTime;
		document.getElementById("av_downtime").innerHTML=fresh.item.average_data.downtime;
		document.getElementById("av_speed").innerHTML=speed_color(fresh.item.average_data.speed);	
	}	
	document.getElementById("diff_av_SrcIP").innerHTML='&nbsp;';
	if(fresh.item.average_data.diffTotalTime)
	{
		document.getElementById("diff_av_toteltime").innerHTML=font_color(fresh.item.average_data.diffTotalTime,1);
		document.getElementById("diff_av_NsLookup").innerHTML=font_color(fresh.item.average_data.diffNsLookup,1);
		document.getElementById("diff_av_ConnectTime").innerHTML=font_color(fresh.item.average_data.diffConnectTime,1);
		document.getElementById("diff_av_downtime").innerHTML=font_color(fresh.item.average_data.diffdowntime,1);
		document.getElementById("diff_av_speed").innerHTML=font_color(fresh.item.average_data.diffspeed,0);
	}
	//document.getElementById("c_av_SrcIP").innerHTML='&nbsp;';
	if(fresh.citem.average_data.TotalTime)
	{
		document.getElementById("c_av_TotalTime").innerHTML=totaltime_color(fresh.citem.average_data.TotalTime);
		document.getElementById("c_av_SrcIP").innerHTML='共<a href="/site/resolveip/'+fresh.citem.tid+'.html" target="_blank"><font size="+1" color="#009900">'+fresh.citem.average_data.SrcipNum+'</font></a>个独立IP';
		document.getElementById("c_av_NsLookup").innerHTML=fresh.citem.average_data.NsLookup;
		document.getElementById("c_av_ConnectTime").innerHTML=fresh.citem.average_data.ConnectTime;
		document.getElementById("c_av_downtime").innerHTML=fresh.citem.average_data.downtime;
		document.getElementById("c_av_speed").innerHTML=speed_color(fresh.citem.average_data.speed);	
	}
	var srcip;
	for (x in ips)
	{	
		srcip=document.getElementById("SrcIP"+ips[x]['sid']);
		if(srcip.innerHTML.match("gif"))
		{
			srcip.innerHTML='监测点未响应';
		}
		srcip=document.getElementById("cSrcIP"+ips[x]['sid']);
		if(srcip.innerHTML.match("gif"))
		{
			srcip.innerHTML='监测点未响应';
		}
		srcip=document.getElementById("diffSrcIP"+ips[x]['sid']);
		if(srcip.innerHTML.match("gif"))
		{
			srcip.innerHTML='监测点未响应';
		}		
	}
	xmlfile=fresh.xmlfile;
	document.getElementById('xmlfile').value=fresh.xmlfile;
	if(xmlfile)
	{	
		var so = new SWFObject("/smedia/auto_resizing_chart/amcolumn.swf", "chart_time", "1200", "500", "8", "#FFFFFF");
		so.addParam("wmode", "transparent");
		so.addVariable("path", "/smedia/auto_resizing_chart/");
		so.addVariable("settings_file", escape("/smedia/auto_resizing_chart/setting_time/"+xmlfile+".xml"));
		so.addVariable("data_file", escape("/smedia/auto_resizing_chart/data_time/"+xmlfile+".xml"));
		so.addVariable("preloader_color", "#999999");
		so.write("flashcontent");		
		document.getElementById('flash').style.display="block";
		document.getElementById('amchart').style.display="block";
		document.getElementById('chinamap').style.display="none";
		document.getElementById('speedtime').style.display="block";
	}
	document.getElementById('loading').style.display="none";
	document.getElementById('shareinfo').style.display="block";
}

function ping_vs_fresh_over(fresh)
{
	document.getElementById("check_host").innerHTML=check_item_str(fresh.item,fresh.citem);
	document.getElementById("check_time").innerHTML='检测时间：'+fresh.item.check_time;
	document.getElementById("av_SrcIP").innerHTML='共<a href="/site/resolveip/'+fresh.item.tid+'.html" target="_blank"><font size="+1" color="#009900">'+fresh.item.average_data.SrcipNum+'</font></a>个独立IP';
	document.getElementById("av_PacketsSent").innerHTML=fresh.item.average_data.PacketsSent;
	document.getElementById("av_PacketsRecv").innerHTML=fresh.item.average_data.PacketsRecv;
	document.getElementById("av_PacketsLost").innerHTML=fresh.item.average_data.PacketsLost;
	document.getElementById("av_Max").innerHTML=fresh.item.average_data.Max;
	document.getElementById("av_Min").innerHTML=fresh.item.average_data.Min;
	document.getElementById("av_Avg").innerHTML=avg_color(fresh.item.average_data.Avg);
	
	document.getElementById("diff_av_SrcIP").innerHTML='&nbsp;';
	document.getElementById("diff_av_PacketsSent").innerHTML=font_color(fresh.item.average_data.diffPacketsSent,0);
	document.getElementById("diff_av_PacketsRecv").innerHTML=font_color(fresh.item.average_data.diffPacketsRecv,0);
	document.getElementById("diff_av_PacketsLost").innerHTML=font_color(fresh.item.average_data.diffPacketsLost,0);
	document.getElementById("diff_av_Max").innerHTML=font_color(fresh.item.average_data.diffMax,1);
	document.getElementById("diff_av_Min").innerHTML=font_color(fresh.item.average_data.diffMin,1);
	document.getElementById("diff_av_Avg").innerHTML=font_color(fresh.item.average_data.diffAvg,1);
	
	document.getElementById("c_av_SrcIP").innerHTML='共<a href="/site/resolveip/'+fresh.citem.tid+'.html" target="_blank"><font size="+1" color="#009900">'+fresh.citem.average_data.SrcipNum+'</font></a>个独立IP';
	document.getElementById("c_av_PacketsSent").innerHTML=fresh.citem.average_data.PacketsSent;
	document.getElementById("c_av_PacketsRecv").innerHTML=fresh.citem.average_data.PacketsRecv;
	document.getElementById("c_av_PacketsLost").innerHTML=fresh.citem.average_data.PacketsLost;
	document.getElementById("c_av_Max").innerHTML=fresh.citem.average_data.Max;
	document.getElementById("c_av_Min").innerHTML=fresh.citem.average_data.Min;	
	document.getElementById("c_av_Avg").innerHTML=avg_color(fresh.citem.average_data.Avg);	
	var srcip;
	for (x in ips)
	{	
		srcip=document.getElementById("SrcIP"+ips[x]['sid']);
		if(srcip.innerHTML.match("gif"))
		{
			srcip.innerHTML='监测点未响应';
		}
		srcip=document.getElementById("cSrcIP"+ips[x]['sid']);
		if(srcip.innerHTML.match("gif"))
		{
			srcip.innerHTML='监测点未响应';
		}
		srcip=document.getElementById("diffSrcIP"+ips[x]['sid']);
		if(srcip.innerHTML.match("gif"))
		{
			srcip.innerHTML='监测点未响应';
		}		
	}
	xmlfile=fresh.xmlfile;
	document.getElementById('xmlfile').value=fresh.xmlfile;
	if(xmlfile)
	{		
		var so = new SWFObject("/smedia/ping_auto_resizing_chart/amcolumn.swf", "chart_time", "1200", "500", "8", "#FFFFFF");
		so.addParam("wmode", "transparent");
		so.addVariable("path", "/smedia/ping_auto_resizing_chart/");
		so.addVariable("settings_file", escape("/smedia/ping_auto_resizing_chart/setting_time/"+xmlfile+".xml"));
		so.addVariable("data_file", escape("/smedia/ping_auto_resizing_chart/data_pingtime/"+xmlfile+".xml"));
		so.addVariable("preloader_color", "#999999");
		so.write("flashcontent");		
		document.getElementById('flash').style.display="block";
		document.getElementById('amchart').style.display="block";
		document.getElementById('chinamap').style.display="none";
		document.getElementById('speedtime').style.display="none";
	}
	document.getElementById('loading').style.display="none";


	document.getElementById('shareinfo').style.display="block";
}

function dns_fresh_over(fresh)
{
	document.getElementById("check_host").innerHTML=check_item_str(fresh,'');
	document.getElementById("check_time").innerHTML='检测时间：'+fresh.check_time;
	document.getElementById("avSrcipNum").innerHTML='共<a href="/site/resolveip/'+fresh.tid+'.html" target="_blank"><font size="+1" color="#009900">'+fresh.average_data.SrcipNum+'</font></a>个独立IP';
	document.getElementById("avNsLookup").innerHTML=fresh.average_data.NsLookup;
	var srcip;
	for (x in ips)
	{	
		srcip=document.getElementById("SrcIP"+ips[x]['sid']);
		if(srcip.innerHTML.match("gif"))
		{
			srcip.innerHTML='监测点未响应';
		}

	}
	document.getElementById('speedtime').style.display="none";
	document.getElementById('loading').style.display="none";
	document.getElementById('shareinfo').style.display="block";
}

function href_string(str)
{
	if(str.match(/:\/\//i))
	{
		return str;
	}
	else
	{
		return 'http://'+str;	
	}	
}

function check_item_str(item,citem)
{
	var check_host='检测目标：<a href="';
	check_host+=href_string(item.url);
	check_host+='" target="_blank">';
	if(item.host)
	{
		check_host+=item.host;
	}
	else
	{
		check_host+=item.srcip;
	}
	check_host+='</a>&nbsp;&nbsp;&nbsp;&nbsp;';
	if(citem)
	{
		check_host+='<a href="';

		check_host+=href_string(citem.url);
		check_host+='" target="_blank">';
		if(citem.host)
		{
			check_host+=citem.host;
		}
		else
		{
			check_host+=citem.srcip;
		}
		check_host+='</a>';
	}
	return check_host;
}

function http_fresh_over(fresh)
{
	document.getElementById("check_host").innerHTML=check_item_str(fresh,'');
	document.getElementById("check_time").innerHTML='检测时间：'+fresh.check_time;
	document.getElementById("avSrcipNum").innerHTML='共<a href="/site/resolveip/'+fresh.tid+'.html" target="_blank"><font size="+1" color="#009900">'+fresh.average_data.SrcipNum+'</font></a>个独立IP';
	document.getElementById("avTotalTime").innerHTML=totaltime_color(fresh.average_data.TotalTime);
	document.getElementById("avNsLookup").innerHTML=fresh.average_data.NsLookup;
	document.getElementById("avConnectTime").innerHTML=fresh.average_data.ConnectTime;
	document.getElementById("avdowntime").innerHTML=fresh.average_data.downtime;
	document.getElementById("avspeed").innerHTML=speed_color(fresh.average_data.speed);
	var srcip;
	for (x in ips)
	{	
		srcip=document.getElementById("SrcIP"+ips[x]['sid']);
		if(srcip.innerHTML.match("gif"))
		{
			srcip.innerHTML='监测点未响应';
		}

	}
	xmlfile=fresh.xmlfile;
	document.getElementById('xmlfile').value=fresh.xmlfile;
	if(xmlfile)
	{
		var so = new SWFObject("/smedia/amcolumn/amcolumn.swf", "amcolumn_time", "1200", "500", "8", "#FFFFFF");
		so.addParam("wmode", "transparent");
		so.addVariable("path", "/smedia/amcolumn/");
		so.addVariable("settings_file", encodeURIComponent("/smedia/amcolumn/setting_time/"+xmlfile+".xml"));
		so.addVariable("data_file", encodeURIComponent("/smedia/amcolumn/data_time/"+xmlfile+".xml"));
		so.addVariable("preloader_color", "#999999");
		so.write("flashcontent");		
		document.getElementById("chinamap").innerHTML='<param name="wmode" value="transparent"><embed wmode="transparent" width="1200" height="500" flashvars="mapWidth=420&amp;mapHeight=330&amp;debugMode=0&amp;DOMId=Map1Id&amp;registerWithJS=0&amp;scaleMode=noScale&amp;lang=EN&amp;dataURL=/smedia/fushionmapChina/data_time/'+xmlfile+'.xml" allowscriptaccess="always" quality="high" name="Map1Id" id="Map1Id" src="/smedia/fushionmapChina/Chinamap.swf?" type="application/x-shockwave-flash"></embed>';
		document.getElementById('flash').style.display="block";
		document.getElementById('amchart').style.display="block";
		document.getElementById('chinamap').style.display="block";
		document.getElementById('speedtime').style.display="block";
	}
	document.getElementById('loading').style.display="none";
	document.getElementById('shareinfo').style.display="block";
}

function cdn_fresh_over(fresh)
{
	document.getElementById("check_host").innerHTML=check_item_str(fresh,'');
	document.getElementById("check_time").innerHTML='检测时间：'+fresh.check_time;
	document.getElementById("avSrcipNum").innerHTML='共<a href="/site/resolveip/'+fresh.tid+'.html" target="_blank"><font size="+1" color="#009900">'+fresh.average_data.SrcipNum+'</font></a>个独立IP';
	document.getElementById("avTotalTime").innerHTML=totaltime_color(fresh.average_data.TotalTime);
	document.getElementById("avNsLookup").innerHTML=fresh.average_data.NsLookup;
	document.getElementById("avConnectTime").innerHTML=fresh.average_data.ConnectTime;
	document.getElementById("avdowntime").innerHTML=fresh.average_data.downtime;
	document.getElementById("avspeed").innerHTML=speed_color(fresh.average_data.speed);
	var srcip;
	for (x in ips)
	{	
		srcip=document.getElementById("SrcIP"+ips[x]['sid']);
		if(srcip.innerHTML.match("gif"))
		{
			srcip.innerHTML='监测点未响应';
		}

	}
	xmlfile=fresh.xmlfile;
	document.getElementById('xmlfile').value=fresh.xmlfile;
	if(xmlfile)
	{
		var so = new SWFObject("/smedia/amcolumn/amcolumn.swf", "amcolumn_time", "1200", "500", "8", "#FFFFFF");
		so.addParam("wmode", "transparent");
		so.addVariable("path", "/smedia/amcolumn/");
		so.addVariable("settings_file", encodeURIComponent("/smedia/amcolumn/setting_time/"+xmlfile+".xml"));
		so.addVariable("data_file", encodeURIComponent("/smedia/amcolumn/data_time/"+xmlfile+".xml"));
		so.addVariable("preloader_color", "#999999");
		so.write("flashcontent");		
		document.getElementById("chinamap").innerHTML='<param name="wmode" value="transparent"><embed wmode="transparent" width="1200" height="500" flashvars="mapWidth=420&amp;mapHeight=330&amp;debugMode=0&amp;DOMId=Map1Id&amp;registerWithJS=0&amp;scaleMode=noScale&amp;lang=EN&amp;dataURL=/smedia/fushionmapChina/data_time/'+xmlfile+'.xml" allowscriptaccess="always" quality="high" name="Map1Id" id="Map1Id" src="/smedia/fushionmapChina/Chinamap.swf?" type="application/x-shockwave-flash"></embed>';
		document.getElementById('flash').style.display="block";
		document.getElementById('amchart').style.display="block";
		document.getElementById('chinamap').style.display="block";
		document.getElementById('speedtime').style.display="block";
	}
	document.getElementById('loading').style.display="none";
	document.getElementById('shareinfo').style.display="block";
}

function ping_fresh_over(fresh)
{
	document.getElementById("check_host").innerHTML=check_item_str(fresh,'');
	document.getElementById("check_time").innerHTML='检测时间：'+fresh.check_time;
	document.getElementById("avSrcipNum").innerHTML='共<a href="/site/resolveip/'+fresh.tid+'.html" target="_blank"><font size="+1" color="#009900">'+fresh.average_data.SrcipNum+'</font></a>个独立IP';
	document.getElementById("avPacketsSent").innerHTML=fresh.average_data.PacketsSent;
	document.getElementById("avPacketsRecv").innerHTML=fresh.average_data.PacketsRecv;
	document.getElementById("avPacketsLost").innerHTML=fresh.average_data.PacketsLost;
	document.getElementById("avMax").innerHTML=fresh.average_data.Max;
	document.getElementById("avMin").innerHTML=fresh.average_data.Min;
	document.getElementById("avAvg").innerHTML=avg_color(fresh.average_data.Avg);
	var srcip;
	for (x in ips)
	{	
		srcip=document.getElementById("SrcIP"+ips[x]['sid']);
		if(srcip.innerHTML.match("gif"))
		{
			srcip.innerHTML='监测点未响应';
		}
	}
	xmlfile=fresh.xmlfile;
	document.getElementById('xmlfile').value=fresh.xmlfile;
	if(xmlfile)
	{
		var so = new SWFObject("/smedia/ping_amcolumn/amcolumn.swf", "amcolumn_time", "1200", "500", "8", "#FFFFFF");
		so.addParam("wmode", "transparent");
		so.addVariable("path", "/smedia/ping_amcolumn/");
		so.addVariable("settings_file", encodeURIComponent("/smedia/ping_amcolumn/setting_time/"+xmlfile+".xml"));
		so.addVariable("data_file", encodeURIComponent("/smedia/ping_amcolumn/data_time/"+xmlfile+".xml"));
		so.addVariable("preloader_color", "#999999");
		so.write("flashcontent");
		document.getElementById("chinamap").innerHTML='<param name="wmode" value="transparent"><embed wmode="transparent" width="1200" height="500" flashvars="mapWidth=420&amp;mapHeight=330&amp;debugMode=0&amp;DOMId=Map1Id&amp;registerWithJS=0&amp;scaleMode=noScale&amp;lang=EN&amp;dataURL=/smedia/ping_fushionmapChina/data_time/'+xmlfile+'.xml" allowscriptaccess="always" quality="high" name="Map1Id" id="Map1Id" src="/smedia/ping_fushionmapChina/Chinamap.swf?" type="application/x-shockwave-flash"></embed>';
		document.getElementById('flash').style.display="block";
		document.getElementById('amchart').style.display="block";
		document.getElementById('chinamap').style.display="block";
		document.getElementById('speedtime').style.display="none";
	}
	document.getElementById('loading').style.display="none";
	document.getElementById('shareinfo').style.display="block";
}

function dns_fresh_diff_table(data)
{	
    for (x in data)
	{
		document.getElementById("diffNsLookup"+x).innerHTML=font_color(data[x]['diffNsLookup'],1);
	} 	
}

function http_fresh_diff_table(data)
{	
    for (x in data)
	{
		document.getElementById("diffSrcIP"+x).innerHTML='&nbsp;';
		document.getElementById("difftoteltime"+x).innerHTML=font_color(data[x]['difftoteltime'],1);
		document.getElementById("diffNsLookup"+x).innerHTML=font_color(data[x]['diffNsLookup'],1);
		document.getElementById("diffConnectTime"+x).innerHTML=font_color(data[x]['diffConnectTime'],1);
		document.getElementById("diffdowntime"+x).innerHTML=font_color(data[x]['diffdowntime'],1);
		document.getElementById("diffspeed"+x).innerHTML=font_color(data[x]['diffspeed'],0);
	} 	
}

function ping_fresh_diff_table(data)
{	
    for (x in data)
	{
		document.getElementById("diffSrcIP"+x).innerHTML='&nbsp;';
		document.getElementById("diffPacketsSent"+x).innerHTML=font_color(data[x]['diffPacketsSent'],0);
		document.getElementById("diffPacketsRecv"+x).innerHTML=font_color(data[x]['diffPacketsRecv'],0);
		document.getElementById("diffPacketsLost"+x).innerHTML=font_color(data[x]['diffPacketsLost'],0);
		document.getElementById("diffMax"+x).innerHTML=font_color(data[x]['diffMax'],1);
		document.getElementById("diffMin"+x).innerHTML=font_color(data[x]['diffMin'],1);
		document.getElementById("diffAvg"+x).innerHTML=font_color(data[x]['diffAvg'],1);
	} 	
}

function font_color(data,k)
{
	var html;
	var fdata=parseFloat(data);
	if((fdata>0&&k==1)||(fdata<0&&k==0))
	{
		html='<font color="#FF0000">'+data+'</font>';
	}
	else if((fdata<0&&k==1)||(fdata>0&&k==0))
	{
		html='<font color="#009900">'+data+'</font>';
	}
	else
	{
		html=data;
	}
	return html;
}

function ipfrom_color(ipfrom,sid,pre)
{
	var ispname=document.getElementById("ispname"+sid).innerHTML;
	var province=document.getElementById("province"+sid).innerHTML;
	var new_ipfrom='';
	if(ipfrom.match(ispname)&&ipfrom.match(province))
	{
		new_ipfrom=ipfrom.fontcolor("#060");
	}
	else if(ipfrom.match(ispname)||(ispname=='其他'&&ipfrom.match(province)))
	{
		new_ipfrom=ipfrom.fontcolor("#0C3");
	}
	else
	{
		new_ipfrom=ipfrom.fontcolor("#F00");
	}
	return new_ipfrom;
}

function totaltime_color(totaltime)
{
	var tt=parseFloat(totaltime);
	totaltime=totaltime.toString();
	if(tt<=1)
	{
		totaltime=totaltime.fontcolor("#008000");
	}
	else if(tt<=2&&tt>1)
	{
		totaltime=totaltime.fontcolor("#00FF40");
	}
	else if(tt<=3&&tt>2)
	{
		totaltime=totaltime.fontcolor("#FDAB02");
	}
	else if(tt<=5&&tt>3)
	{
		totaltime=totaltime.fontcolor("#ff6600");
	}
	else
	{
		totaltime=totaltime.fontcolor("#D50000");
	}	
	return totaltime;
}

function avg_color(avg)
{
	var tt=parseFloat(avg);
	avg=avg.toString();
	if(tt<=10)
	{
		avg=avg.fontcolor("#008000");
	}
	else if(tt<=30&&tt>10)
	{
		avg=avg.fontcolor("#00FF40");
	}
	else if(tt<=50&&tt>30)
	{
		avg=avg.fontcolor("#FDAB02");
	}
	else if(tt<=100&&tt>50)
	{
		avg=avg.fontcolor("#ff6600");
	}
	else
	{
		avg=avg.fontcolor("#D50000");
	}	
	return avg;
}

function speed_color(speed)
{
	var speed_value=unit_convert(speed)/1024;
	if(speed_value>=500)
	{
		speed=speed.fontcolor("#008000");
	}
	else if(speed_value<500&&speed_value>=100)
	{
		speed=speed.fontcolor("#00FF40");
	}
	else if(speed_value<100&&speed_value>=50)
	{
		speed=speed.fontcolor("#FDAB02");
	}
	else if(speed_value<50&&speed_value>=20)
	{
		speed=speed.fontcolor("#ff6600");
	}
	else
	{
		speed=speed.fontcolor("#D50000");
	}	
	return speed;	
}

function http_fresh_table(data,pre)
{	
    for (x in data)
	{	
		document.getElementById(pre+"SrcIP"+data[x]['sid']).innerHTML=data[x]['SrcIP']['srcip'];
		document.getElementById(pre+"ipfrom"+data[x]['sid']).innerHTML=data[x]['SrcIP']['ipfrom'];
		document.getElementById(pre+"HttpCode"+data[x]['sid']).innerHTML=data[x]['HttpCode'];
		document.getElementById(pre+"TotalTime"+data[x]['sid']).innerHTML=totaltime_color(data[x]['TotalTime']);
		document.getElementById(pre+"NsLookup"+data[x]['sid']).innerHTML=data[x]['NsLookup'];
		document.getElementById(pre+"ConnectTime"+data[x]['sid']).innerHTML=data[x]['ConnectTime'];
		document.getElementById(pre+"downtime"+data[x]['sid']).innerHTML=data[x]['downtime'];
		document.getElementById(pre+"FileSize"+data[x]['sid']).innerHTML=data[x]['FileSize'];
		document.getElementById(pre+"realsize"+data[x]['sid']).innerHTML=data[x]['realsize'];
		document.getElementById(pre+"speed"+data[x]['sid']).innerHTML=speed_color(data[x]['speed']);
		document.getElementById(pre+data[x]['sid']).innerHTML=data[x]['HpptHead'];
	}
}

function cdn_fresh_table(data,pre)
{
	var trinfo;
	var trnum;
	var trnum2;
	var tr;
	var cla;
	var sid;
    for (x in data)
	{
		trinfo=data[x];
		tr='';
		for (y in trinfo)
		{
			sid='';
			sid=trinfo[y]['sid'];
			trnum=document.getElementById(pre+"trnum"+trinfo[y]['sid']).value;
			cla=document.getElementById('tr'+trinfo[y]['sid']).className;
			if(trnum==1)
			{
				document.getElementById(pre+"SrcIP"+trinfo[y]['sid']).innerHTML=trinfo[y]['SrcIP']['srcip'];
				document.getElementById(pre+"ipfrom"+trinfo[y]['sid']).innerHTML=trinfo[y]['SrcIP']['ipfrom'];
				document.getElementById(pre+"HttpCode"+trinfo[y]['sid']).innerHTML=trinfo[y]['HttpCode'];
				document.getElementById(pre+"TotalTime"+trinfo[y]['sid']).innerHTML=totaltime_color(trinfo[y]['TotalTime']);
				document.getElementById(pre+"NsLookup"+trinfo[y]['sid']).innerHTML=trinfo[y]['NsLookup'];
				document.getElementById(pre+"ConnectTime"+trinfo[y]['sid']).innerHTML=trinfo[y]['ConnectTime'];
				document.getElementById(pre+"downtime"+trinfo[y]['sid']).innerHTML=trinfo[y]['downtime'];
				document.getElementById(pre+"FileSize"+trinfo[y]['sid']).innerHTML=trinfo[y]['FileSize'];
				document.getElementById(pre+"realsize"+trinfo[y]['sid']).innerHTML=trinfo[y]['realsize'];
				document.getElementById(pre+"speed"+trinfo[y]['sid']).innerHTML=speed_color(trinfo[y]['speed']);
				document.getElementById(pre+trinfo[y]['sid']+'-1').innerHTML=trinfo[y]['HpptHead'];
			}
			else
			{
				tr+='<tr class="'+cla+'">';
				tr+='<td>'+trinfo[y]['SrcIP']['srcip']+'</td>';
				tr+='<td>'+trinfo[y]['SrcIP']['ipfrom']+'</td>';
				tr+='<td>'+trinfo[y]['HttpCode']+'</td>';
				tr+='<td>'+totaltime_color(trinfo[y]['TotalTime'])+'</td>';
				tr+='<td>'+trinfo[y]['NsLookup']+'</td>';
				tr+='<td>'+trinfo[y]['ConnectTime']+'</td>';
				tr+='<td>'+trinfo[y]['downtime']+'</td>';
				tr+='<td>'+trinfo[y]['FileSize']+'</td>';
				tr+='<td>'+trinfo[y]['realsize']+'</td>';
				tr+='<td>'+speed_color(trinfo[y]['speed'])+'</td>';
				tr+='<td class="dbclick" onselectstart="return false" style="text-align:center;" ondblclick="cdn_oc_db(\''+trinfo[y]['sid']+'\',this,'+trnum+')"><span style="display:none; text-align:left;" id="'+trinfo[y]['sid']+'-'+trnum+'">'+trinfo[y]['HpptHead']+'</span><a id="text'+trinfo[y]['sid']+'-'+trnum+'" onclick="cdn_oc(\''+trinfo[y]['sid']+'\',this,'+trnum+')" href="javascript:void(0);">查看</a></td>';
				tr+='</tr>';	
				tr+='<tr class="'+cla+'" id="trinfo'+trinfo[y]['sid']+'-'+trnum+'"><td colspan="11" id="tdinfo'+trinfo[y]['sid']+'-'+trnum+'" style="padding:0px; border:none;"><div onselectstart="return false" ondblclick="cdn_oc_db_info(\''+trinfo[y]['sid']+'\','+trnum+')" style="display:none;cursor:pointer;-moz-user-select:none;" id="info'+trinfo[y]['sid']+'-'+trnum+'"></div></td></tr>';
			}
			if(trnum==1)
			trnum2=trnum;
			else
			trnum2=trnum*2;
			document.getElementById(pre+"link"+trinfo[y]['sid']).rowSpan=trnum2;
			document.getElementById(pre+"name"+trinfo[y]['sid']).rowSpan=trnum2;
			document.getElementById(pre+"ispname"+trinfo[y]['sid']).rowSpan=trnum2;
			document.getElementById(pre+"province"+trinfo[y]['sid']).rowSpan=trnum2;
			document.getElementById(pre+"op"+trinfo[y]['sid']).rowSpan=trnum2;
			trnum++;
			document.getElementById(pre+"trnum"+trinfo[y]['sid']).value=trnum;
		}
		if(tr)
		{
			$("#trinfo"+sid+"-1").after(tr);
		}		
	}
}

function dns_fresh_table(data,pre)
{
	var SrcIP_arr;
	var SrcIP_str;
	if(data)
	{
		for (x in data)
		{	
			SrcIP_arr=data[x]['SrcIP'];
			SrcIP_str='';
			for (y in SrcIP_arr)
			{
				SrcIP_str+=ipfrom_color(SrcIP_arr[y]['srcip']+" ["+SrcIP_arr[y]['ipfrom']+"]",data[x]['sid'],pre)+"<br>";
			}
			document.getElementById(pre+"SrcIP"+data[x]['sid']).innerHTML=SrcIP_str;
			document.getElementById(pre+"NsLookup"+data[x]['sid']).innerHTML=data[x]['NsLookup'];
		}	
	}
}

function ping_fresh_table(data,pre)
{	
    for (x in data)
	{	
		document.getElementById(pre+"SrcIP"+data[x]['sid']).innerHTML=data[x]['SrcIP']['srcip'];
		document.getElementById(pre+"ipfrom"+data[x]['sid']).innerHTML=data[x]['SrcIP']['ipfrom'];		
		document.getElementById(pre+"PacketsSent"+data[x]['sid']).innerHTML=data[x]['PacketsSent'];
		document.getElementById(pre+"PacketsRecv"+data[x]['sid']).innerHTML=data[x]['PacketsRecv'];
		document.getElementById(pre+"PacketsLost"+data[x]['sid']).innerHTML=data[x]['PacketsLost'];
		document.getElementById(pre+"Max"+data[x]['sid']).innerHTML=data[x]['Max'];
		document.getElementById(pre+"Min"+data[x]['sid']).innerHTML=data[x]['Min'];
		document.getElementById(pre+"Avg"+data[x]['sid']).innerHTML=avg_color(data[x]['Avg']);
		document.getElementById(pre+"DataSize"+data[x]['sid']).innerHTML=data[x]['DataSize'];
		document.getElementById(pre+data[x]['sid']).innerHTML=data[x]['PingStr'];
	}
}

function dns_single_render_table(data,adlist)
{
	var tableinfo;
	var trinfo='';
	var adlink='';
	var adlinkname='';	
	tableinfo='<table class="mytable hs" cellspacing="0" style="width:1200px;" id="tblSort">';
	tableinfo+='<thead><tr><th width="14%" onclick="sortTable(\'tblSort\', 0,\'text\')"><a href="/site/ad.html" target="_blank">广告位招租</a></th><th width="20%" onclick="sortTable(\'tblSort\', 1,\'text\')">监测点</th><th width="7%" onclick="sortTable(\'tblSort\', 2,\'text\')">ISP</th><th width="7%" onclick="sortTable(\'tblSort\', 3,\'text\')">省份</th><th width="7%" onclick="sortTable(\'tblSort\', 4,\'float\')">解析时间</th><th width="35%">解析IP</th><th width="10%" align="center">操作</th></tr>';
	var tnum=0;
    for (x in data)
	{
		adlink='';
		adlinkname='';
		if(adlist[x])
		{
			adlink=decodeURI(adlist[x]['link']);
			adlinkname=decodeURI(adlist[x]['linkname']);			
		}		
		trinfo+='<tr id="tr'+data[x]['sid']+'" ';
		if((tnum%2)==0){ trinfo+=' class="alt"';}
		trinfo+='>';
		trinfo+='<td><a href="'+adlink+'" target="_blank">'+adlinkname+'</a></td>';
		trinfo+='<td><a style="color:#4F6B72; font-size:12px;" href="'+decodeURI(data[x]['link'])+'" target="_blank" title="'+decodeURI(data[x]['linkname'])+'提供">'+decodeURI(data[x]['name'])+'</a></td>';
		trinfo+='<td id="ispname'+data[x]['sid']+'">'+decodeURI(data[x]['isp'])+'</td>';
		trinfo+='<td id="province'+data[x]['sid']+'">'+decodeURI(data[x]['province'])+'</td>';
        trinfo+='<td id="NsLookup'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="SrcIP'+data[x]['sid']+'"><img src="/smedia/images/ld.gif"></td>';
        trinfo+='<td class="dbclick" onselectstart="return false" ondblclick="removeElement4(\''+data[x]['sid']+'\')"><span class="p_check" id="s'+data[x]['sid']+'"><a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'http\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">GET</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'ping\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">PING</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'tracert\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">Trace</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'dig\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">Dig</a></span></td>';
		trinfo+='</tr>';
		trinfo+='<tr class="alt" id="trinfo'+data[x]['sid']+'"><td colspan="15" id="tdinfo'+data[x]['sid']+'" style="padding:0px; border:none;"><div onselectstart="return false" ondblclick="removeElement3(\''+data[x]['sid']+'\')" style="display:none;cursor:pointer;-moz-user-select:none;" id="info'+data[x]['sid']+'"></div></td></tr>';	
		tnum++;
	}
    tableinfo+='<tr><td>平均值：</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td id="avNsLookup">*</td><td style="text-align:center;" id="avSrcipNum">*</td><td style="text-align:center;">共<font color="#009900" size="+1">'+tnum+'</font>个点</td></tr></thead>';
	tableinfo+=trinfo;	
	tableinfo+='</table>';
	return tableinfo;
}

function http_single_render_table(data,adlist)
{
	var tableinfo;
	var trinfo='';
	var adlink='';
	var adlinkname='';
	tableinfo='<table class="mytable hs" cellspacing="0" id="tblSort">';
	tableinfo+='<thead><tr><th width="15%" onclick="sortTable(\'tblSort\', 0,\'text\')"><a href="/site/ad.html" target="_blank">广告位招租</a></th><th width="10%" onclick="sortTable(\'tblSort\', 1,\'text\')">监测点</th><th width="2%" onclick="sortTable(\'tblSort\', 2,\'text\')">ISP</th><th width="6%" onclick="sortTable(\'tblSort\', 3,\'text\')">省份</th><th width="4%" onclick="sortTable(\'tblSort\', 4)">解析IP</th><th width="8%" onclick="sortTable(\'tblSort\', 5,\'text\')">解析IP所在地</th><th width="4%" onclick="sortTable(\'tblSort\', 6,\'int\')">Http状态</th><th width="3%" onclick="sortTable(\'tblSort\', 7,\'color\')">总时间</th><th width="5%" onclick="sortTable(\'tblSort\', 8,\'float\')">解析时间</th><th width="4%" onclick="sortTable(\'tblSort\', 9,\'float\')">连接时间</th><th width="4%" onclick="sortTable(\'tblSort\', 10,\'float\')">下载时间</th><th width="8%" onclick="sortTable(\'tblSort\', 11,\'size\')">下载大小</th><th width="8%" onclick="sortTable(\'tblSort\', 12,\'size\')">文件大小</th><th width="7%" onclick="sortTable(\'tblSort\', 13,\'speed\')">下载速度</th><th width="2%" align="center">Http Head</th><th width="10%" align="center">操作</th></tr>';
	var tnum=0;
    for (x in data)
	{
		adlink='';
		adlinkname='';
		if(adlist[x])
		{
			adlink=decodeURI(adlist[x]['link']);
			adlinkname=decodeURI(adlist[x]['linkname']);			
		}
		trinfo+='<tr id="tr'+data[x]['sid']+'" ';
		if((tnum%2)==0){ trinfo+=' class="alt"';}
		trinfo+='>';
		trinfo+='<td><a href="'+adlink+'" target="_blank">'+adlinkname+'</a></td>';
		trinfo+='<td><a style="color:#4F6B72; font-size:12px;" href="'+decodeURI(data[x]['link'])+'" target="_blank" title="'+decodeURI(data[x]['linkname'])+'提供">'+decodeURI(data[x]['name'])+'</a></td>';		
		trinfo+='<td id="ispname'+data[x]['sid']+'">'+decodeURI(data[x]['isp'])+'</td>';
		trinfo+='<td id="province'+data[x]['sid']+'">'+decodeURI(data[x]['province'])+'</td>';
        trinfo+='<td id="SrcIP'+data[x]['sid']+'"><img src="/smedia/images/ld.gif"></td>';
		trinfo+='<td id="ipfrom'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="HttpCode'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="TotalTime'+data[x]['sid']+'">*</td>';
        trinfo+='<td id="NsLookup'+data[x]['sid']+'">*</td>';			
		trinfo+='<td id="ConnectTime'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="downtime'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="FileSize'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="realsize'+data[x]['sid']+'">*</td>';
        trinfo+='<td id="speed'+data[x]['sid']+'">*</td>';
		trinfo+='<td class="dbclick" onselectstart="return false" style="text-align:center;" ondblclick="removeElement2(\''+data[x]['sid']+'\',this)"><span style="display:none; text-align:left;" id="'+data[x]['sid']+'">*</span><a id="text'+data[x]['sid']+'" onclick="removeElement(\''+data[x]['sid']+'\',this,\'1\')" href="javascript:void(0);">查看</a></td>'; 
        trinfo+='<td class="dbclick" onselectstart="return false" ondblclick="removeElement4(\''+data[x]['sid']+'\')"><span class="p_check" id="s'+data[x]['sid']+'"><a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'http\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">GET</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'ping\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">PING</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'tracert\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">Trace</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'dig\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">Dig</a></span></td>';
		trinfo+='</tr>';
		trinfo+='<tr class="alt" id="trinfo'+data[x]['sid']+'"><td colspan="16" id="tdinfo'+data[x]['sid']+'" style="padding:0px; border:none;"><div onselectstart="return false" ondblclick="removeElement3(\''+data[x]['sid']+'\')" style="display:none;cursor:pointer;-moz-user-select:none;" id="info'+data[x]['sid']+'"></div></td></tr>';
		tnum++;
	}   
    tableinfo+='<tr><td>平均值：</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td style="text-align:center;" id="avSrcipNum">*</td><td>&nbsp;</td><td>&nbsp;</td><td id="avTotalTime">*</td><td id="avNsLookup">*</td><td id="avConnectTime">*</td><td id="avdowntime">*</td><td>&nbsp;</td><td>&nbsp;</td><td id="avspeed">*</td><td>&nbsp;</td><td style="text-align:center;">共<font color="#009900" size="+1">'+tnum+'</font>个点</td></tr></thead>';
	tableinfo+=trinfo;
	tableinfo+='</table>';
	return tableinfo;
}

function cdn_single_render_table(data,adlist)
{
	var tableinfo;
	var cla;
	var trinfo='';
	var adlink='';
	var adlinkname='';	
	tableinfo='<table class="mytable hs" cellspacing="0" id="tblSort">';
	tableinfo+='<thead><tr><th width="15%" onclick="sortTable(\'tblSort\', 0,\'text\')"><a href="/site/ad.html" target="_blank">广告位招租</a></th><th width="8%" onclick="sortTable(\'tblSort\', 1,\'text\')">监测点</th><th width="2%" onclick="sortTable(\'tblSort\', 2,\'text\')">ISP</th><th width="6%" onclick="sortTable(\'tblSort\', 3,\'text\')">省份</th><th width="4%" onclick="sortTable(\'tblSort\', 4)">解析IP</th><th width="7%" onclick="sortTable(\'tblSort\', 5,\'text\')">解析IP所在地</th><th width="4%" onclick="sortTable(\'tblSort\', 6,\'int\')">Http状态</th><th width="3%" onclick="sortTable(\'tblSort\', 7,\'color\')">总时间</th><th width="5%" onclick="sortTable(\'tblSort\', 8,\'float\')">解析时间</th><th width="4%" onclick="sortTable(\'tblSort\', 9,\'float\')">连接时间</th><th width="4%" onclick="sortTable(\'tblSort\', 10,\'float\')">下载时间</th><th width="8%" onclick="sortTable(\'tblSort\', 11,\'size\')">下载大小</th><th width="10%" onclick="sortTable(\'tblSort\', 12,\'size\')">文件大小</th><th width="7%" onclick="sortTable(\'tblSort\', 13,\'speed\')">下载速度</th><th width="2%" align="center">Http Head</th><th width="11%" align="center">操作</th></tr>';
	var tnum=0;
    for (x in data)
	{
		adlink='';
		adlinkname='';
		if(adlist[x])
		{
			adlink=decodeURI(adlist[x]['link']);
			adlinkname=decodeURI(adlist[x]['linkname']);			
		}		
		cla='';
		if((tnum%2)==0){ cla=' class="alt"';}		
		trinfo+='<tr id="tr'+data[x]['sid']+'" '+cla+'>';
		trinfo+='<td rowspan="1" id="link'+data[x]['sid']+'"><a href="'+adlink+'" target="_blank">'+adlinkname+'</a></td>';
		trinfo+='<td rowspan="1" id="name'+data[x]['sid']+'"><a style="color:#4F6B72; font-size:12px;" href="'+decodeURI(data[x]['link'])+'" target="_blank" title="'+decodeURI(data[x]['linkname'])+'提供">'+decodeURI(data[x]['name'])+'</a></td>';
		trinfo+='<td rowspan="1" id="ispname'+data[x]['sid']+'">'+decodeURI(data[x]['isp'])+'</td>';
		trinfo+='<td rowspan="1" id="province'+data[x]['sid']+'">'+decodeURI(data[x]['province'])+'</td>';
        trinfo+='<td id="SrcIP'+data[x]['sid']+'"><img src="/smedia/images/ld.gif"></td>';
		trinfo+='<td id="ipfrom'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="HttpCode'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="TotalTime'+data[x]['sid']+'">*</td>';
        trinfo+='<td id="NsLookup'+data[x]['sid']+'">*</td>';			
		trinfo+='<td id="ConnectTime'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="downtime'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="FileSize'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="realsize'+data[x]['sid']+'">*</td>';		
        trinfo+='<td id="speed'+data[x]['sid']+'">*</td>';
		trinfo+='<td class="dbclick" onselectstart="return false" style="text-align:center;" ondblclick="cdn_oc_db(\''+data[x]['sid']+'\',this,\'1\')"><span style="display:none; text-align:left;" id="'+data[x]['sid']+'-1">*</span><a id="text'+data[x]['sid']+'-1" onclick="cdn_oc(\''+data[x]['sid']+'\',this,\'1\')" href="javascript:void(0);">查看</a></td>'; 
        trinfo+='<td rowspan="1" id="op'+data[x]['sid']+'" class="dbclick" onselectstart="return false" ondblclick="removeElement4(\''+data[x]['sid']+'\')"><span class="p_check" id="s'+data[x]['sid']+'"><a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'http\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">GET</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'ping\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">PING</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'tracert\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">Trace</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'dig\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">Dig</a></span></td>';
		trinfo+='</tr>';
		trinfo+='<tr  '+cla+' id="trinfo'+data[x]['sid']+'-1"><td colspan="11" id="tdinfo'+data[x]['sid']+'-1" style="padding:0px; border:none;"><div onselectstart="return false" ondblclick="cdn_oc_db_info(\''+data[x]['sid']+'\',\'1\')" style="display:none;cursor:pointer;-moz-user-select:none;" id="info'+data[x]['sid']+'-1"></div></td></tr>';
		trinfo+='<tr  '+cla+' id="trinfo'+data[x]['sid']+'"><td colspan="16" id="tdinfo'+data[x]['sid']+'" style="padding:0px; border:none;"><div onselectstart="return false" ondblclick="removeElement3(\''+data[x]['sid']+'\')" style="display:none;cursor:pointer;-moz-user-select:none;" id="info'+data[x]['sid']+'"></div></td></tr>';		
		trinfo+='<input type="hidden" id="trnum'+data[x]['sid']+'" value="1" />';
		tnum++;
	}   
    tableinfo+='<tr><td>平均值：</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td style="text-align:center;" id="avSrcipNum">*</td><td>&nbsp;</td><td>&nbsp;</td><td id="avTotalTime">*</td><td id="avNsLookup">*</td><td id="avConnectTime">*</td><td id="avdowntime">*</td><td>&nbsp;</td><td>&nbsp;</td><td id="avspeed">*</td><td>&nbsp;</td><td style="text-align:center;">共<font color="#009900" size="+1">'+tnum+'</font>个点</td></tr></thead>';
	tableinfo+=trinfo;
	tableinfo+='</table>';
	return tableinfo;
}

function ping_single_render_table(data,adlist)
{
	var tableinfo;
	var trinfo='';
	var adlink='';
	var adlinkname='';	
	tableinfo='<table class="mytable hs" cellspacing="0" id="tblSort">';
	tableinfo+='<thead><tr><th width="12%" onclick="sortTable(\'tblSort\', 0,\'text\')"><a href="/site/ad.html" target="_blank">广告位招租</a></th><th width="10%" onclick="sortTable(\'tblSort\', 1,\'text\')">监测点</th><th width="2%" onclick="sortTable(\'tblSort\', 2,\'text\')">ISP</th><th width="5%" onclick="sortTable(\'tblSort\', 3,\'text\')">省份</th><th width="4%" onclick="sortTable(\'tblSort\', 4)">解析IP</th><th width="13%" onclick="sortTable(\'tblSort\', 5,\'text\')">解析IP所在地</th><th width="2%" onclick="sortTable(\'tblSort\', 6,\'int\')">发送</th><th width="2%" onclick="sortTable(\'tblSort\', 7,\'int\')">接收</th><th width="2%" onclick="sortTable(\'tblSort\', 8,\'int\')">丢弃</th><th width="7%" onclick="sortTable(\'tblSort\', 9,\'float\')">最大时间</th><th width="7%" onclick="sortTable(\'tblSort\', 10,\'float\')">最小时间</th><th width="7%" onclick="sortTable(\'tblSort\', 11,\'color\')">平均时间</th><th width="7%" onclick="sortTable(\'tblSort\', 12,\'size\')">包大小</th><th width="8%" align="center">详细信息</th><th width="12%" align="center">操作</th></tr>';
	var tnum=0;
    for (x in data)
	{	
		adlink='';
		adlinkname='';
		if(adlist[x])
		{
			adlink=decodeURI(adlist[x]['link']);
			adlinkname=decodeURI(adlist[x]['linkname']);			
		}	
		trinfo+='<tr id="tr'+data[x]['sid']+'" ';
		if((tnum%2)==0){ trinfo+=' class="alt"';}
		trinfo+='>';
		trinfo+='<td><a href="'+adlink+'" target="_blank">'+adlinkname+'</a></td>';
		trinfo+='<td><a style="color:#4F6B72; font-size:12px;" href="'+decodeURI(data[x]['link'])+'" target="_blank" title="'+decodeURI(data[x]['linkname'])+'提供">'+decodeURI(data[x]['name'])+'</a></td>';
		trinfo+='<td>'+decodeURI(data[x]['isp'])+'</td>';
		trinfo+='<td>'+decodeURI(data[x]['province'])+'</td>';
        trinfo+='<td id="SrcIP'+data[x]['sid']+'"><img src="/smedia/images/ld.gif"></td>';
		trinfo+='<td id="ipfrom'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="PacketsSent'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="PacketsRecv'+data[x]['sid']+'">*</td>';
        trinfo+='<td id="PacketsLost'+data[x]['sid']+'">*</td>';			
		trinfo+='<td id="Max'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="Min'+data[x]['sid']+'">*</td>';
		trinfo+='<td id="Avg'+data[x]['sid']+'">*</td>';
        trinfo+='<td id="DataSize'+data[x]['sid']+'">*</td>';
		trinfo+='<td class="dbclick" onselectstart="return false" style="text-align:center;" ondblclick="removeElement2(\''+data[x]['sid']+'\',this)"><span style="display:none; text-align:left;" id="'+data[x]['sid']+'">*</span><a id="text'+data[x]['sid']+'" onclick="removeElement(\''+data[x]['sid']+'\',this,\'1\')" href="javascript:void(0);">查看</a></td>'; 
        trinfo+='<td class="dbclick" onselectstart="return false" ondblclick="removeElement4(\''+data[x]['sid']+'\')"><span class="p_check" id="s'+data[x]['sid']+'"><a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'http\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">GET</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'ping\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">PING</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'tracert\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">Trace</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'dig\',\'0\',\'\')"  href="#s'+data[x]['sid']+'">Dig</a></span></td>';
		trinfo+='</tr>';
		trinfo+='<tr class="alt" id="trinfo'+data[x]['sid']+'"><td colspan="15" id="tdinfo'+data[x]['sid']+'" style="padding:0px; border:none;"><div onselectstart="return false" ondblclick="removeElement3(\''+data[x]['sid']+'\')" style="display:none;cursor:pointer;-moz-user-select:none;" id="info'+data[x]['sid']+'"></div></td></tr>';
		tnum++;
	}   
    tableinfo+='<tr><td>平均值：</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td style="text-align:center;" id="avSrcipNum">*</td><td>&nbsp;</td><td id="avPacketsSent">*</td><td id="avPacketsRecv">*</td><td id="avPacketsLost">*</td><td id="avMax">*</td><td id="avMin">*</td><td id="avAvg">*</td><td>&nbsp;</td><td>&nbsp;</td><td style="text-align:center;">共<font color="#009900" size="+1">'+tnum+'</font>个点</td></tr></thead>';
	tableinfo+=trinfo;
	tableinfo+='</table>';
	return tableinfo;
}

function tracert_single_render_table(data)
{
	var tableinfo='';
    for (x in data)
	{		
		tableinfo+='<table width="1100px" class="table_list" style="margin-bottom:10px;">';
		tableinfo+='<tbody>';
		tableinfo+='<tr class="tit">';
		tableinfo+='<td colspan="8">监测点：'+decodeURI(data[x]['fullname'])+data[x]['sid']+'</td> ';       
		tableinfo+='</tr>';
		tableinfo+='<tr class="tit">';
		tableinfo+='<td width="6%">序号</td>';
		tableinfo+='<td width="7%">IP</td>';
		tableinfo+='<td width="20%">IP所在地</td>';
		tableinfo+='<td width="7%">丢包率</td>';
		tableinfo+='<td width="7%">最大时间</td>';
		tableinfo+='<td width="7%">最小时间</td>';
		tableinfo+='<td width="7%">平均时间</td>';
		tableinfo+='<td width="39%">平均时间比</td>';               
		tableinfo+='</tr>';
		tableinfo+='<tr id="sid'+data[x]['sid']+'">';
		tableinfo+='<td colspan="8"><img src="/smedia/images/wait.gif"></td>';        
		tableinfo+='</tr>';
		tableinfo+='</tbody>';
		tableinfo+='</table>';
	}
	return tableinfo;
}

function http_vs_render_table(objTEST)
{
	var tableinfo;
	var trinfo='';
	var data=objTEST.fullips;
	var adlist=objTEST.adlist;
	var adlink='';
	var adlinkname='';	
	tableinfo='<table class="mytable hs"  cellspacing="0" style="width:1300px;">';
    tableinfo+='<tr><th width="3%"><a href="/site/ad.html" target="_blank">广告位招租</a></th><th width="3%">监测点</th><th width="2%">ISP</th><th width="2%">省份</th><th width="10%">地址</th><th width="8%">解析IP</th><th width="23%">解析IP所在地</th><th width="3%">Http状态</th><th width="3%">总时间</th><th width="3%">解析时间</th><th width="3%">连接时间</th><th width="3%">下载时间</th><th width="8%">下载大小</th><th width="8%">文件大小</th><th width="4%">下载速度</th><th width="2%" align="center">Http Head</th><th width="12%" align="center">操作</th></tr>';
	var tnum=0;
    for (x in data)
	{ 
		adlink='';
		adlinkname='';
		if(adlist[x])
		{
			adlink=decodeURI(adlist[x]['link']);
			adlinkname=decodeURI(adlist[x]['linkname']);			
		}	
		trinfo+='<tr id="tr'+data[x]['sid']+'" ';
		if((tnum%2)==0){ trinfo+=' class="alt"';}
		trinfo+='>';
		trinfo+='<td><a href="'+adlink+'" target="_blank">'+adlinkname+'</a></td>';		
		trinfo+='<td><a style="color:#4F6B72; font-size:12px;" href="'+decodeURI(data[x]['link'])+'" target="_blank" title="'+decodeURI(data[x]['linkname'])+'提供">'+decodeURI(data[x]['name'])+'</a></td>';
		trinfo+='<td>'+decodeURI(data[x]['isp'])+'</td>';
		trinfo+='<td>'+decodeURI(data[x]['province'])+'</td>';
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;">'+(objTEST.item.url)+'</td></tr><tr><td style="border-right:none;">'+(objTEST.citem.url)+'</td></tr><tr><td style="border:none;">差值</td></tr></table></td>';                
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="SrcIP'+data[x]['sid']+'"><img src="/smedia/images/ld.gif"></td></tr><tr><td style="border-right:none;" id="cSrcIP'+data[x]['sid']+'"><img src="/smedia/images/ld.gif"></td></tr><tr><td style="border:none;" id="diffSrcIP'+data[x]['sid']+'"><img src="/smedia/images/ld.gif"></td></tr></table></td>';
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="ipfrom'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cipfrom'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="HttpCode'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cHttpCode'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="TotalTime'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cTotalTime'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;" id="difftoteltime'+data[x]['sid']+'">*</td></tr></table></td>';
        trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="NsLookup'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cNsLookup'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;" id="diffNsLookup'+data[x]['sid']+'">*</td></tr></table></td>';      
        trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="ConnectTime'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cConnectTime'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;" id="diffConnectTime'+data[x]['sid']+'">*</td></tr></table></td>';        			
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="downtime'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cdowntime'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;" id="diffdowntime'+data[x]['sid']+'">*</td></tr></table></td>';
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="FileSize'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cFileSize'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';		
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="realsize'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="crealsize'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';			
        trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="speed'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cspeed'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;" id="diffspeed'+data[x]['sid']+'">*</td></tr></table></td>';        
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td class="dbclick br" onselectstart="return false" ondblclick="com_removeElement2(\''+data[x]['sid']+'\',this,\'\')"><span style="display:none; text-align:left;" id="'+data[x]['sid']+'">*</span><a id="text'+data[x]['sid']+'" onclick="com_removeElement(\''+data[x]['sid']+'\',this,\'1\',\'\')" href="javascript:void(0);">查看</a></td></tr><tr><td class="dbclick br" onselectstart="return false" ondblclick="com_removeElement2(\''+data[x]['sid']+'\',this,\'c\')"><span style="display:none; text-align:left;" id="c'+data[x]['sid']+'">*</span><a id="ctext'+data[x]['sid']+'" onclick="com_removeElement(\''+data[x]['sid']+'\',this,\'1\',\'c\')" href="javascript:void(0);">查看</a></td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';	        
	trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td class="dbclick br" onselectstart="return false" ondblclick="com_removeElement4(\''+data[x]['sid']+'\',\'\')"><span class="p_check" id="s'+data[x]['sid']+'"><a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'http\',\'1\',\'\')"  href="#s'+data[x]['sid']+'">GET</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'ping\',\'1\',\'\')"  href="#s'+data[x]['sid']+'">PING</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'tracert\',\'1\',\'\')"  href="#s'+data[x]['sid']+'">Trace</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'dig\',\'1\',\'\')"  href="#s'+data[x]['sid']+'">Dig</a></span></td></tr><tr><td class="dbclick br" onselectstart="return false" ondblclick="com_removeElement4(\''+data[x]['sid']+'\',\'c\')"><span class="p_check" id="cs'+data[x]['sid']+'"><a onclick="point_check(\''+data[x]['sid']+'\',\'cs'+data[x]['sid']+'\',\'http\',\'1\',\'c\')"  href="#cs'+data[x]['sid']+'">GET</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'cs'+data[x]['sid']+'\',\'ping\',\'1\',\'c\')"  href="#cs'+data[x]['sid']+'">PING</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'cs'+data[x]['sid']+'\',\'tracert\',\'1\',\'c\')"  href="#cs'+data[x]['sid']+'">Trace</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'cs'+data[x]['sid']+'\',\'dig\',\'1\',\'c\')"  href="#cs'+data[x]['sid']+'">Dig</a></span></td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';
    trinfo+='</tr>'; 
	trinfo+='<tr class="alt" id="trinfo'+data[x]['sid']+'"><td colspan="17" id="tdinfo'+data[x]['sid']+'" style="padding:0px; border:none;"><div onselectstart="return false" ondblclick="com_removeElement3(\''+data[x]['sid']+'\',\'\')" style="display:none;cursor:pointer;-moz-user-select:none;" id="info'+data[x]['sid']+'"></div></td></tr>';
	trinfo+='<tr class="alt" id="ctrinfo'+data[x]['sid']+'"><td colspan="17" id="ctdinfo'+data[x]['sid']+'" style="padding:0px; border:none;"><div onselectstart="return false" ondblclick="com_removeElement3(\''+data[x]['sid']+'\',\'c\')" style="display:none;cursor:pointer;-moz-user-select:none;" id="cinfo'+data[x]['sid']+'"></div></td></tr>';
	tnum++;
	}	
	tableinfo+='<tr><td>平均值：</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;">'+(objTEST.item.url)+'</td></tr><tr><td style="border-right:none;">'+(objTEST.citem.url)+'</td></tr><tr><td style="border:none;">差值</td></tr></table></td>';								
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_SrcIP"><img src="/smedia/images/ld.gif"></td></tr><tr><td style="border-right:none;" id="c_av_SrcIP"><img src="/smedia/images/ld.gif"></td></tr><tr><td style="border:none;" id="diff_av_SrcIP"><img src="/smedia/images/ld.gif"></td></tr></table></td>';
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;">&nbsp;</td></tr><tr><td style="border-right:none;">&nbsp;</td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;">&nbsp;</td></tr><tr><td style="border-right:none;">&nbsp;</td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_TotalTime">*</td></tr><tr><td style="border-right:none;" id="c_av_TotalTime">*</td></tr><tr><td style="border:none;" id="diff_av_toteltime">*</td></tr></table></td>';

	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_NsLookup">*</td></tr><tr><td style="border-right:none;" id="c_av_NsLookup">*</td></tr><tr><td style="border:none;" id="diff_av_NsLookup">*</td></tr></table></td>';      
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_ConnectTime">*</td></tr><tr><td style="border-right:none;" id="c_av_ConnectTime">*</td></tr><tr><td style="border:none;" id="diff_av_ConnectTime">*</td></tr></table></td>';        			
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_downtime">*</td></tr><tr><td style="border-right:none;" id="c_av_downtime">*</td></tr><tr><td style="border:none;" id="diff_av_downtime">*</td></tr></table></td>';
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;">&nbsp;</td></tr><tr><td style="border-right:none;">&nbsp;</td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';	
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;">&nbsp;</td></tr><tr><td style="border-right:none;">&nbsp;</td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';	
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_speed">*</td></tr><tr><td style="border-right:none;" id="c_av_speed">*</td></tr><tr><td style="border:none;" id="diff_av_speed">*</td></tr></table></td>';        
	tableinfo+='<td>&nbsp;</td>';	        
	tableinfo+='<td style="text-align:center;">共<font color="#009900" size="+1">'+tnum+'</font>个点</td>';
    tableinfo+='</tr>';
	tableinfo+=trinfo;
 	tableinfo+='</table>';
	return tableinfo;
}

function dns_vs_render_table(objTEST)
{
	var tableinfo;
	var trinfo='';
	var data=objTEST.fullips;
	var adlist=objTEST.adlist;
	var adlink='';
	var adlinkname='';	
	tableinfo='<table class="mytable hs"  cellspacing="0" style="width:1200px;">';
    tableinfo+='<tr><th width="12%"><a href="/site/ad.html" target="_blank">广告位招租</a></th><th width="12%">监测点</th><th width="7%">ISP</th><th width="7%">省份</th><th width="12%">地址</th><th width="7%">解析时间</th><th width="33%">解析IP</th><th width="10%" align="center">操作</th></tr>';
	var tnum=0;
    for (x in data)
	{  
		adlink='';
		adlinkname='';
		if(adlist[x])
		{
			adlink=decodeURI(adlist[x]['link']);
			adlinkname=decodeURI(adlist[x]['linkname']);			
		}	
		trinfo+='<tr id="tr'+data[x]['sid']+'" ';
		if((tnum%2)==0){ trinfo+=' class="alt"';}
		trinfo+='>';
		trinfo+='<td><a href="'+adlink+'" target="_blank">'+adlinkname+'</a></td>';
		trinfo+='<td><a style="color:#4F6B72; font-size:12px;" href="'+decodeURI(data[x]['link'])+'" target="_blank" title="'+decodeURI(data[x]['linkname'])+'提供">'+decodeURI(data[x]['name'])+'</a></td>';
		trinfo+='<td id="ispname'+data[x]['sid']+'">'+decodeURI(data[x]['isp'])+'</td>';
		trinfo+='<td id="province'+data[x]['sid']+'">'+decodeURI(data[x]['province'])+'</td>';
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;">'+(objTEST.item.url)+'</td></tr><tr><td style="border-right:none;">'+(objTEST.citem.url)+'</td></tr><tr><td style="border:none;">差值</td></tr></table></td>';
        trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="NsLookup'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cNsLookup'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;" id="diffNsLookup'+data[x]['sid']+'">*</td></tr></table></td>';      		
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="SrcIP'+data[x]['sid']+'"><img src="/smedia/images/ld.gif"></td></tr><tr><td style="border-right:none;" id="cSrcIP'+data[x]['sid']+'"><img src="/smedia/images/ld.gif"></td></tr><tr><td style="border:none;" id="diffSrcIP'+data[x]['sid']+'">&nbsp;</td></tr></table></td>';
	trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td class="dbclick br" onselectstart="return false" ondblclick="com_removeElement4(\''+data[x]['sid']+'\',\'\')"><span class="p_check" id="s'+data[x]['sid']+'"><a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'http\',\'1\',\'\')"  href="#s'+data[x]['sid']+'">GET</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'ping\',\'1\',\'\')"  href="#s'+data[x]['sid']+'">PING</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'tracert\',\'1\',\'\')"  href="#s'+data[x]['sid']+'">Trace</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'dig\',\'1\',\'\')"  href="#s'+data[x]['sid']+'">Dig</a></span></td></tr><tr><td class="dbclick br" onselectstart="return false" ondblclick="com_removeElement4(\''+data[x]['sid']+'\',\'c\')"><span class="p_check" id="cs'+data[x]['sid']+'"><a onclick="point_check(\''+data[x]['sid']+'\',\'cs'+data[x]['sid']+'\',\'http\',\'1\',\'c\')"  href="#cs'+data[x]['sid']+'">GET</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'cs'+data[x]['sid']+'\',\'ping\',\'1\',\'c\')"  href="#cs'+data[x]['sid']+'">PING</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'cs'+data[x]['sid']+'\',\'tracert\',\'1\',\'c\')"  href="#cs'+data[x]['sid']+'">Trace</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'cs'+data[x]['sid']+'\',\'dig\',\'1\',\'c\')"  href="#cs'+data[x]['sid']+'">Dig</a></span></td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';
    trinfo+='</tr>'; 
	trinfo+='<tr class="alt" id="trinfo'+data[x]['sid']+'"><td colspan="16" id="tdinfo'+data[x]['sid']+'" style="padding:0px; border:none;"><div onselectstart="return false" ondblclick="com_removeElement3(\''+data[x]['sid']+'\',\'\')" style="display:none;cursor:pointer;-moz-user-select:none;" id="info'+data[x]['sid']+'"></div></td></tr>';
	trinfo+='<tr class="alt" id="ctrinfo'+data[x]['sid']+'"><td colspan="16" id="ctdinfo'+data[x]['sid']+'" style="padding:0px; border:none;"><div onselectstart="return false" ondblclick="com_removeElement3(\''+data[x]['sid']+'\',\'c\')" style="display:none;cursor:pointer;-moz-user-select:none;" id="cinfo'+data[x]['sid']+'"></div></td></tr>';
	tnum++;
	}	
	tableinfo+='<tr><td>平均值：</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;">'+(objTEST.item.url)+'</td></tr><tr><td style="border-right:none;">'+(objTEST.citem.url)+'</td></tr><tr><td style="border:none;">差值</td></tr></table></td>';
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_NsLookup">*</td></tr><tr><td style="border-right:none;" id="c_av_NsLookup">*</td></tr><tr><td style="border:none;" id="diff_av_NsLookup">*</td></tr></table></td>';   
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_SrcIP"><img src="/smedia/images/ld.gif"></td></tr><tr><td style="border-right:none;" id="c_av_SrcIP"><img src="/smedia/images/ld.gif"></td></tr><tr><td style="border:none;" id="diff_av_SrcIP">&nbsp;</td></tr></table></td>';        
	tableinfo+='<td style="text-align:center;">共<font color="#009900" size="+1">'+tnum+'</font>个点</td>';
    tableinfo+='</tr>';
	tableinfo+=trinfo;
 	tableinfo+='</table>';
	return tableinfo;
}

function ping_vs_render_table(objTEST)
{
	var tableinfo;
	var trinfo='';
	var data=objTEST.fullips;
	var adlist=objTEST.adlist;
	var adlink='';
	var adlinkname='';	
	tableinfo='<table class="mytable hs"  cellspacing="0" style="width:1200px;">';
    tableinfo+='<tr><th width="17%"><a href="/site/ad.html" target="_blank">广告位招租</a></th><th width="12%">监测点</th><th width="2%">ISP</th><th width="2%">省份</th><th width="3%">地址</th><th width="3%">解析IP</th><th width="9%">解析IP所在地</th><th width="2%">发送</th><th width="2%">接收</th><th width="2%">丢弃</th><th width="6%">最大时间</th><th width="6%">最小时间</th><th width="8%">平均时间</th><th width="9%">包大小</th><th width="6%" align="center">详细信息</th><th width="11%" align="center">操作</th></tr>';
	var tnum=0;
    for (x in data)
	{  
		adlink='';
		adlinkname='';
		if(adlist[x])
		{
			adlink=decodeURI(adlist[x]['link']);
			adlinkname=decodeURI(adlist[x]['linkname']);			
		}	
		trinfo+='<tr id="tr'+data[x]['sid']+'" ';
		if((tnum%2)==0){ trinfo+=' class="alt"';}
		trinfo+='>';
		trinfo+='<td><a href="'+adlink+'" target="_blank">'+adlinkname+'</a></td>';
		trinfo+='<td><a style="color:#4F6B72; font-size:12px;" href="'+decodeURI(data[x]['link'])+'" target="_blank" title="'+decodeURI(data[x]['linkname'])+'提供">'+decodeURI(data[x]['name'])+'</a></td>';
		trinfo+='<td>'+decodeURI(data[x]['isp'])+'</td>';
		trinfo+='<td>'+decodeURI(data[x]['province'])+'</td>';
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;">'+(objTEST.item.url)+'</td></tr><tr><td style="border-right:none;">'+(objTEST.citem.url)+'</td></tr><tr><td style="border:none;">差值</td></tr></table></td>';                
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="SrcIP'+data[x]['sid']+'"><img src="/smedia/images/ld.gif"></td></tr><tr><td style="border-right:none;" id="cSrcIP'+data[x]['sid']+'"><img src="/smedia/images/ld.gif"></td></tr><tr><td style="border:none;" id="diffSrcIP'+data[x]['sid']+'"><img src="/smedia/images/ld.gif"></td></tr></table></td>';
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="ipfrom'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cipfrom'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="PacketsSent'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cPacketsSent'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;" id="diffPacketsSent'+data[x]['sid']+'">*</td></tr></table></td>';
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="PacketsRecv'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cPacketsRecv'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;" id="diffPacketsRecv'+data[x]['sid']+'">*</td></tr></table></td>';
        trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="PacketsLost'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cPacketsLost'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;" id="diffPacketsLost'+data[x]['sid']+'">*</td></tr></table></td>';      
        trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="Max'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cMax'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;" id="diffMax'+data[x]['sid']+'">*</td></tr></table></td>';        			
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="Min'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cMin'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;" id="diffMin'+data[x]['sid']+'">*</td></tr></table></td>';
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="Avg'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cAvg'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;" id="diffAvg'+data[x]['sid']+'">*</td></tr></table></td>';
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="DataSize'+data[x]['sid']+'">*</td></tr><tr><td style="border-right:none;" id="cDataSize'+data[x]['sid']+'">*</td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';		        
		trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td class="dbclick br" onselectstart="return false" ondblclick="com_removeElement2(\''+data[x]['sid']+'\',this,\'\')"><span style="display:none; text-align:left;" id="'+data[x]['sid']+'">*</span><a id="text'+data[x]['sid']+'" onclick="com_removeElement(\''+data[x]['sid']+'\',this,\'1\',\'\')" href="javascript:void(0);">查看</a></td></tr><tr><td class="dbclick br" onselectstart="return false" ondblclick="com_removeElement2(\''+data[x]['sid']+'\',this,\'c\')"><span style="display:none; text-align:left;" id="c'+data[x]['sid']+'">*</span><a id="ctext'+data[x]['sid']+'" onclick="com_removeElement(\''+data[x]['sid']+'\',this,\'1\',\'c\')" href="javascript:void(0);">查看</a></td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';	        
	trinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td class="dbclick br" onselectstart="return false" ondblclick="com_removeElement4(\''+data[x]['sid']+'\',\'\')"><span class="p_check" id="s'+data[x]['sid']+'"><a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'http\',\'1\',\'\')"  href="#s'+data[x]['sid']+'">GET</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'ping\',\'1\',\'\')"  href="#s'+data[x]['sid']+'">PING</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'tracert\',\'1\',\'\')"  href="#s'+data[x]['sid']+'">Trace</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'s'+data[x]['sid']+'\',\'dig\',\'1\',\'\')"  href="#s'+data[x]['sid']+'">Dig</a></span></td></tr><tr><td class="dbclick br" onselectstart="return false" ondblclick="com_removeElement4(\''+data[x]['sid']+'\',\'c\')"><span class="p_check" id="cs'+data[x]['sid']+'"><a onclick="point_check(\''+data[x]['sid']+'\',\'cs'+data[x]['sid']+'\',\'http\',\'1\',\'c\')"  href="#cs'+data[x]['sid']+'">GET</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'cs'+data[x]['sid']+'\',\'ping\',\'1\',\'c\')"  href="#cs'+data[x]['sid']+'">PING</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'cs'+data[x]['sid']+'\',\'tracert\',\'1\',\'c\')"  href="#cs'+data[x]['sid']+'">Trace</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="point_check(\''+data[x]['sid']+'\',\'cs'+data[x]['sid']+'\',\'dig\',\'1\',\'c\')"  href="#cs'+data[x]['sid']+'">Dig</a></span></td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';
    trinfo+='</tr>'; 
	trinfo+='<tr class="alt" id="trinfo'+data[x]['sid']+'"><td colspan="16" id="tdinfo'+data[x]['sid']+'" style="padding:0px; border:none;"><div onselectstart="return false" ondblclick="com_removeElement3(\''+data[x]['sid']+'\',\'\')" style="display:none;cursor:pointer;-moz-user-select:none;" id="info'+data[x]['sid']+'"></div></td></tr>';
	trinfo+='<tr class="alt" id="ctrinfo'+data[x]['sid']+'"><td colspan="16" id="ctdinfo'+data[x]['sid']+'" style="padding:0px; border:none;"><div onselectstart="return false" ondblclick="com_removeElement3(\''+data[x]['sid']+'\',\'c\')" style="display:none;cursor:pointer;-moz-user-select:none;" id="cinfo'+data[x]['sid']+'"></div></td></tr>';
	tnum++;
	}	
	tableinfo+='<tr><td>平均值：</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;">'+(objTEST.item.url)+'</td></tr><tr><td style="border-right:none;">'+(objTEST.citem.url)+'</td></tr><tr><td style="border:none;">差值</td></tr></table></td>';								
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_SrcIP"><img src="/smedia/images/ld.gif"></td></tr><tr><td style="border-right:none;" id="c_av_SrcIP"><img src="/smedia/images/ld.gif"></td></tr><tr><td style="border:none;" id="diff_av_SrcIP"><img src="/smedia/images/ld.gif"></td></tr></table></td>';
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;">&nbsp;</td></tr><tr><td style="border-right:none;">&nbsp;</td></tr><tr><td style="border:none;">&nbsp;</td></tr></table></td>';
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_PacketsSent">*</td></tr><tr><td style="border-right:none;" id="c_av_PacketsSent">*</td></tr><tr><td style="border:none;" id="diff_av_PacketsSent">*</td></tr></table></td>';
    tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_PacketsRecv">*</td></tr><tr><td style="border-right:none;" id="c_av_PacketsRecv">*</td></tr><tr><td style="border:none;" id="diff_av_PacketsRecv">*</td></tr></table></td>';      
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_PacketsLost">*</td></tr><tr><td style="border-right:none;" id="c_av_PacketsLost">*</td></tr><tr><td style="border:none;" id="diff_av_PacketsLost">*</td></tr></table></td>';        			
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_Max">*</td></tr><tr><td style="border-right:none;" id="c_av_Max">*</td></tr><tr><td style="border:none;" id="diff_av_Max">*</td></tr></table></td>';
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_Min">*</td></tr><tr><td style="border-right:none;" id="c_av_Min">*</td></tr><tr><td style="border:none;" id="diff_av_Min">*</td></tr></table></td>';
	tableinfo+='<td style="margin:0;padding:0;"><table style="width:100%" border="0"><tr><td style="border-right:none;" id="av_Avg">*</td></tr><tr><td style="border-right:none;" id="c_av_Avg">*</td></tr><tr><td style="border:none;" id="diff_av_Avg">*</td></tr></table></td>';      
	tableinfo+='<td>&nbsp;</td>';
	tableinfo+='<td>&nbsp;</td>';
	tableinfo+='<td style="text-align:center;">共<font color="#009900" size="+1">'+tnum+'</font>个点</td>';
    tableinfo+='</tr>';
	tableinfo+=trinfo;
 	tableinfo+='</table>';
	return tableinfo;
}

function speedortime(testtype,t)
{
	switch (t)
	{
		case 'http':
		http_speedortime(testtype);
		break
		case 'ping':
		ping_speedortime(testtype);
		break
		case 'tracert':
		tracert_speedortime(testtype);
		break
		case 'http2':
		http2_speedortime(testtype);
		break
		case 'ping2':
		ping2_speedortime(testtype);
		break		
		default:
		http_speedortime(testtype);		
	}	
	document.getElementById('flash').style.display="block";
	document.getElementById('amchart').style.display="block";		
}

function http2_speedortime(testtype)
{
	var so = new SWFObject("/smedia/auto_resizing_chart/amcolumn.swf", "chart_time", "1200", "500", "8", "#FFFFFF");
	so.addParam("wmode", "transparent");
	so.addVariable("path", "/smedia/auto_resizing_chart/");
	so.addVariable("settings_file", escape("/smedia/auto_resizing_chart/setting_"+testtype+"/"+xmlfile+".xml"));
	so.addVariable("data_file", escape("/smedia/auto_resizing_chart/data_"+testtype+"/"+xmlfile+".xml"));
	so.addVariable("preloader_color", "#999999");
	so.write("flashcontent");		
}

function http_speedortime(testtype)
{
	var so = new SWFObject("/smedia/amcolumn/amcolumn.swf", "amcolumn_time", "1200", "500", "8", "#FFFFFF");
	so.addParam("wmode", "transparent");
	so.addVariable("path", "/smedia/amcolumn/");
	so.addVariable("settings_file", encodeURIComponent("/smedia/amcolumn/setting_"+testtype+"/"+xmlfile+".xml"));
	so.addVariable("data_file", encodeURIComponent("/smedia/amcolumn/data_"+testtype+"/"+xmlfile+".xml"));
	so.addVariable("preloader_color", "#999999");
	so.write("flashcontent");		
	document.getElementById("chinamap").innerHTML='<param name="wmode" value="transparent"><embed wmode="transparent" width="1200" height="500" flashvars="mapWidth=420&amp;mapHeight=330&amp;debugMode=0&amp;DOMId=Map1Id&amp;registerWithJS=0&amp;scaleMode=noScale&amp;lang=EN&amp;dataURL=/smedia/fushionmapChina/data_'+testtype+'/'+xmlfile+'.xml" allowscriptaccess="always" quality="high" name="Map1Id" id="Map1Id" src="/smedia/fushionmapChina/Chinamap.swf?" type="application/x-shockwave-flash"></embed>';
	document.getElementById('chinamap').style.display="block";
}

function ping_speedortime(testtype)
{
	var so = new SWFObject("/smedia/ping_amcolumn/amcolumn.swf", "amcolumn_time", "1200", "500", "8", "#FFFFFF");
	so.addParam("wmode", "transparent");
	so.addVariable("path", "/smedia/ping_amcolumn/");
	so.addVariable("settings_file", encodeURIComponent("/smedia/ping_amcolumn/setting_"+testtype+"/"+xmlfile+".xml"));
	so.addVariable("data_file", encodeURIComponent("/smedia/ping_amcolumn/data_"+testtype+"/"+xmlfile+".xml"));
	so.addVariable("preloader_color", "#999999");
	so.write("flashcontent");
	document.getElementById("chinamap").innerHTML='<param name="wmode" value="transparent"><embed wmode="transparent" width="1200" height="500" flashvars="mapWidth=420&amp;mapHeight=330&amp;debugMode=0&amp;DOMId=Map1Id&amp;registerWithJS=0&amp;scaleMode=noScale&amp;lang=EN&amp;dataURL=/smedia/ping_fushionmapChina/data_'+testtype+'/'+xmlfile+'.xml" allowscriptaccess="always" quality="high" name="Map1Id" id="Map1Id" src="/smedia/ping_fushionmapChina/Chinamap.swf?" type="application/x-shockwave-flash"></embed>';
	document.getElementById('chinamap').style.display="block";
}

function tracet_check()
{
	var sid
	sid=document.getElementById('sid').value;
	var pos='content';
	var t='tracert';
	var xmlhttp;
	var postdata;	
	var url=document.getElementById('url').value;	
	postdata="&url="+url;
	postdata+="&sid="+sid;
	document.getElementById('node_list').style.display="none";
	document.getElementById('shareinfo').style.display="none";
	document.getElementById('flash').style.display="none";
	document.getElementById(pos).style.display='block';
	document.getElementById(pos).innerHTML='<img align="absmiddle" src="/smedia/images/loading.gif"><span>正在加载数据,请稍候……</span>';
	if (window.XMLHttpRequest)
  	{// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp=new XMLHttpRequest();
  	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
  	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			backdata=xmlhttp.responseText;
			var objTEST=eval("("+backdata+")");
			if(objTEST.message)
			{
				document.getElementById(pos).innerHTML=objTEST.message;
				check_end();
			}
			else
			{
				var tableinfo=tracert_single_render_table(objTEST.fullips);
				document.getElementById(pos).innerHTML=tableinfo;
				document.getElementById('tid').value=objTEST.tid;
				ips=objTEST.fullips;
				document.title=objTEST.title+' TRACER测试结果 网站速度测试 17CE';
				set_recent_check(objTEST.recent);
				ajax_fresh(t,objTEST.tid,0,'','','');	
			}			
		}
	}
	xmlhttp.open("POST","/site/"+t,true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(postdata);	
}

function tracert_ajax_fresh(fresh,t,tid,num)
{
	var newtid=document.getElementById('tid').value;
	if(fresh.tid==newtid)
	{
		if(parseInt(fresh.num)>num&&fresh.freshdata)
		{
			tracert_fresh_table(fresh.freshdata);
		}			
		if(fresh.taskstatus=='3')
		{
			tracert_fresh_over(fresh);
			check_end();
		}
		else
		{	
			timeoutob=setTimeout("ajax_fresh('"+t+"','"+tid+"','"+fresh.num+"','','','')",5000);	
		}
	}
}

function tracert_fresh_over(fresh)
{
	var srcip;
	for (x in ips)
	{	
		srcip=document.getElementById("sid"+ips[x]['sid']);
		if(srcip.style.display!='none')
		{
			srcip.innerHTML='未返回数据';
		}

	}
}

function tracert_fresh_table(data)
{
	var html;
	var TraRouteAry;
	var key;
	var percent;
	var trclass;
	var maxavg;
	var width;
	for (x in data)
	{
		html='';
		TraRouteAry='';
		key=1;
		percent='';
		trclass='';
		TraRouteAry=data[x]['TraRouteAry'];
		maxavg='';
		for (z in TraRouteAry)
		{
			if(TraRouteAry[z]['Avg']>maxavg)
			{
				maxavg=TraRouteAry[z]['Avg'];
			}
		}
		for (y in TraRouteAry)
		{
			width='';
			if((key%2)==0)
			{ 
				trclass=' class="alt"';
			}
			else
			{
				trclass='';
			}
			percent='';
			if(TraRouteAry[y]['Ip']=='0.0.0.0'||TraRouteAry[y]['Ip']=='')
			{
				html+='<tr'+trclass+'><td>'+key+'</td><td>*</td><td>*</td><td>*</td><td>*</td><td>*</td><td>*</td><td>*</td></tr>';
				width=0;
			}
			else
			{	
				if(parseInt(TraRouteAry[y]['PacketsSent']))
				{
					percent=Math.round((parseInt(TraRouteAry[y]['PacketsLost'])/parseInt(TraRouteAry[y]['PacketsSent']))*10000)/100;
					percent+='%';
					width=parseInt(TraRouteAry[y]['Avg']/maxavg*392);
					if(width<1&&TraRouteAry[y]['PacketsLost']!=TraRouteAry[y]['PacketsSent'])
					{
						width=1;
					}
				}
				else
				{
					percent='*';
					width=0;
				}
				html+="<tr"+trclass+"><td>"+key+"</td><td>"+TraRouteAry[y]['Ip']['srcip']+"</td><td>"+TraRouteAry[y]['Ip']['ipfrom']+"</td><td>"+percent+"</td><td>"+assemble_data(TraRouteAry[y]['Max'])+"</td><td>"+assemble_data(TraRouteAry[y]['Min'])+"</td><td>"+assemble_data(TraRouteAry[y]['Avg'])+"</td><td><div style='background-color:#2DB200; width:"+width+"px; height:15px;'></div></td></tr>";		
			}
			key++;
		}
		$("#sid"+data[x]['sid']).after(html);
		document.getElementById("sid"+data[x]['sid']).style.display='none';
	}
}

function point_check(sid,pos,t,cp,c)
{
	var testele=document.getElementById('text'+sid);
	testele?testele.innerHTML='查看':'';
	var ctestele=document.getElementById('ctext'+sid);
	ctestele?ctestele.innerHTML='查看':'';	
	
	var tdinfoele=document.getElementById(c+'tdinfo'+sid);
	tdinfoele.style.padding='6px';
	tdinfoele.style.borderBottom='1px solid #C1DAD7';
	tdinfoele.style.borderRight='1px solid #C1DAD7';	
	$("#"+c+'info'+sid).html("<img align=\"absmiddle\" src=\"./images/loading.gif\"><span>正在加载数据,请稍候……</span>");
	$("#"+c+"info"+sid).slideDown(1000);
	var url="get?ip=www.scirp.org&type="+t;
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
		 	var html='';
			document.getElementById(c+'info'+sid).innerHTML=result;
		 }
	});
//	var xmlhttp;
//	var postdata;
//	if (sid<0)
//	{
//		return;
//	}
//	var url;
//	if(pos.search(/c/)==-1)
//	{
//		url=document.getElementById('url').value;		
//	}
//	else
//	{
//		url=document.getElementById('curl').value;		
//	}
//	var rt;
//	var host=document.getElementById('host').value;
//	var referer=document.getElementById('referer').value;
//	var cookie=document.getElementById('cookie').value;
//	var agent=document.getElementById('agent').value;
//	var speed=document.getElementById('downspeed').value;
//	var pingcount=document.getElementById('pingcount').value;
//	var pingsize=document.getElementById('pingsize').value;	
//	var rtarr=document.getElementsByName("rt"); 
//	for (var i=0;i<rtarr.length;i++ )
//	{
//		if(rtarr[i].checked == true)
//		{
//			rt=rtarr[i].value;
//			break;
//		} 
//	}
//	if(t=='ping')
//	{
//		if(!ping_filter(pingcount,pingsize))
//		return false;			
//	}	
//	postdata="&url="+url;
//	postdata+="&rt="+rt;
//	postdata+="&host="+host;
//	postdata+="&referer="+referer;
//	postdata+="&cookie="+cookie;
//	postdata+="&agent="+agent;
//	postdata+="&speed="+speed;
//	postdata+="&pingcount="+pingcount;
//	postdata+="&pingsize="+pingsize;	
//	postdata+="&sid="+sid;
//	
//	var cl;
//	if(cp)
//	cl=16;
//	else
//	cl=15;
//	$("#"+c+"info"+sid).slideDown(1000);	
//	var tdinfoele=document.getElementById(c+'tdinfo'+sid);
//	tdinfoele.style.padding='6px';
//	tdinfoele.style.borderBottom='1px solid #C1DAD7';
//	tdinfoele.style.borderRight='1px solid #C1DAD7';	
//	document.getElementById(c+'info'+sid).innerHTML='<img align="absmiddle" src="/smedia/images/loading.gif"><span>正在加载数据,请稍候……</span>';
//	if (window.XMLHttpRequest)
//  	{// code for IE7+, Firefox, Chrome, Opera, Safari
//  		xmlhttp=new XMLHttpRequest();
//  	}
//	else
//	{// code for IE6, IE5
//		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//	}
//	xmlhttp.onreadystatechange=function()
//  	{
//		if (xmlhttp.readyState==4 && xmlhttp.status==200)
//		{
//			backdata=xmlhttp.responseText;
//			var objTEST=eval("("+backdata+")");
//			alert(objTEST.message);
//			if(objTEST.message)
//			{
//				document.getElementById(c+'info'+sid).innerHTML=objTEST.message;
//			}
//			else
//			{
//				setTimeout("point_ajax_fresh('"+sid+"','"+t+"','"+objTEST.tid+"','0','"+cl+"','"+c+"')",1000);	
//			}			
//		}
//	}
//	xmlhttp.open("POST","get?ip=www.scirp.org&type="+t,true);
//	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//	xmlhttp.send(postdata);
}

function point_ajax_fresh(pos,t,tid,num,cl,c)
{
	var newpos;
	if(pos=='content')
	newpos=pos;
	else
	newpos=c+'info'+pos;
	var postdata;
	var newtid;
	var newctid;
	postdata='tid='+tid;
	postdata+='&&num='+num;
	if (window.XMLHttpRequest)
  	{// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp=new XMLHttpRequest();
  	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
  	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{	
			var backdata=xmlhttp.responseText;		
			var fresh=eval("("+backdata+")");
			
			if(fresh.message)
			{
				document.getElementById(newpos).innerHTML=fresh.message;
				check_end();
			}
			else
			{				
				if(parseInt(fresh.num)>num&&fresh.freshdata)
				{
					var html='';
					switch (t)
					{
						case 'http':
						html=point_http_ajax_fresh(fresh.freshdata);
						break
						case 'ping':
						html=point_ping_ajax_fresh(fresh.freshdata);
						break
						case 'tracert':
						if(document.getElementById('sid').disabled==false)
						{
							html=point_tracert_ajax_fresh(fresh.freshdata,'2');
						}
						else if(document.getElementById('t').value=='dns')
						{
							html=point_tracert_ajax_fresh(fresh.freshdata,'3');
						}
						else
						{
							html=point_tracert_ajax_fresh(fresh.freshdata,'1');
						}
						break
						case 'dig':
						html=point_dig_ajax_fresh(fresh.freshdata);
						break						
						default:
						html='无效检测类型';		
					}
					document.getElementById(newpos).innerHTML=html;
				}
				else
				{
					if(fresh.taskstatus=='3')
					{
						document.getElementById(newpos).innerHTML='没有返回数据';
						check_end();
					}
					else
					{	
						switch (t)
						{
							case 'http':
							setTimeout("point_ajax_fresh('"+pos+"','"+t+"','"+tid+"','"+fresh.num+"','"+cl+"','"+c+"')",2000);	
							break
							case 'ping':
							setTimeout("point_ajax_fresh('"+pos+"','"+t+"','"+tid+"','"+fresh.num+"','"+cl+"','"+c+"')",5000);	
							break
							case 'tracert':
							if(document.getElementById('sid').disabled==false)
							{
								timeoutob=setTimeout("point_ajax_fresh('"+pos+"','"+t+"','"+tid+"','"+fresh.num+"','"+cl+"','"+c+"')",5000);
							}
							else
							{
								setTimeout("point_ajax_fresh('"+pos+"','"+t+"','"+tid+"','"+fresh.num+"','"+cl+"','"+c+"')",5000);
							}
							break
							case 'dig':
							setTimeout("point_ajax_fresh('"+pos+"','"+t+"','"+tid+"','"+fresh.num+"','"+cl+"','"+c+"')",5000);	
							break							
							default:
							setTimeout("point_ajax_fresh('"+pos+"','"+t+"','"+tid+"','"+fresh.num+"','"+cl+"','"+c+"')",5000);	
						}					
					}		
				}	
			}
		}
	}
	xmlhttp.open("POST","/site/ajaxfresh",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(postdata);	
}

function point_dig_ajax_fresh(data)
{
	var html='';
	for (x in data)
	{
		html=data[x]['diginfo'];
	}
	return html;	
}

function point_tracert_ajax_fresh(data,type)
{
	var html='';
	var TraRouteAry='';
	var key=1;
	var percent='';
	for (x in data)
	{
		TraRouteAry=data[x]['TraRouteAry'];
	}
	switch(type)
	{
		case '1':
		html+='<table class="mytable stable" style="border:none;"><tr class="tit"><td width="10%">序号</td><td width="10%">最大时间</td><td width="10%">最小时间</td><td width="10%">平均时间</td><td width="10%">丢包率</td><td width="15%">IP</td><td width="35%">IP所在地</td></tr>';
		break
		case '2':
		html+='<table class="table_list" width="900px"><tr class="tit"><td width="7%">序号</td><td width="10%">最大时间</td><td width="10%">最小时间</td><td width="10%">平均时间</td><td width="10%">丢包率</td><td width="13%">IP</td><td width="40%">IP所在地</td></tr>';
		break
		case '3':
		html+='<table class="mytable stable" style="border:none;"><tr class="tit"><td width="6%">序号</td><td width="11%">最大时间</td><td width="11%">最小时间</td><td width="11%">平均时间</td><td width="10%">丢包率</td><td width="13%">IP</td><td width="38%">IP所在地</td></tr>';
		break
		default:
		html+='<table class="mytable stable" style="border:none;"><tr class="tit"><td width="10%">序号</td><td width="10%">最大时间</td><td width="10%">最小时间</td><td width="10%">平均时间</td><td width="10%">丢包率</td><td width="15%">IP</td><td width="35%">IP所在地</td></tr>';		
	}
	for (y in TraRouteAry)
	{	
		percent='';
		if(TraRouteAry[y]['Ip']=='0.0.0.0'||TraRouteAry[y]['Ip']=='')
		{
			html+='<tr><td>'+key+'</td><td>*</td><td>*</td><td>*</td><td>*</td><td>*</td><td>*</td></tr>';
		}
		else
		{	
			if(parseInt(TraRouteAry[y]['PacketsSent']))
			{
				percent=Math.round((parseInt(TraRouteAry[y]['PacketsLost'])/parseInt(TraRouteAry[y]['PacketsSent']))*10000)/100;
				percent+='%';
			}
			else
			{
				percent='*';
			}
			html+="<tr><td>"+key+"</td><td>"+assemble_data(TraRouteAry[y]['Max'])+"</td><td>"+assemble_data(TraRouteAry[y]['Min'])+"</td><td>"+assemble_data(TraRouteAry[y]['Avg'])+"</td><td>"+percent+"</td><td>"+TraRouteAry[y]['Ip']['srcip']+"</td><td>"+TraRouteAry[y]['Ip']['ipfrom']+"</td></tr>";		
		}
		key++;
	}
	html+='</table>';
	check_end();
	return html;	
}

function assemble_data(data)
{
	var backdata;
	if(parseFloat(data))
	{
		backdata=Math.round(parseFloat(data)*1000*1000)/1000;
		backdata+='ms';
		return backdata;
	}
	else
	{
		return '*';
	}
}

function point_ping_ajax_fresh(data)
{
	var html='';
	for (x in data)
	{
		html=data[x]['PingStr'];
	}
	return html;
}

function point_http_ajax_fresh(data)
{
	var html='';
	for (x in data)
	{
		html+='解析IP:'+data[x]['SrcIP']['srcip']+'<br>';
		html+='Http状态:'+data[x]['HttpCode']+'<br>';
		html+='总时间:'+data[x]['TotalTime']+'<br>';
		html+='解析时间:'+data[x]['NsLookup']+'<br>';
		html+='连接时间:'+data[x]['ConnectTime']+'<br>';
		html+='下载时间:'+data[x]['downtime']+'<br>';
		html+='下载大小:'+data[x]['FileSize']+'<br>';
		html+='文件大小:'+data[x]['realsize']+'<br>';
		html+='下载速度:'+data[x]['speed']+'<br>';
		html+='HttpHead:<br>'+data[x]['HpptHead']+'<br>';
	}
	return html;
}

function showindex()
{
	if(document.getElementById('index'))
	{
		document.getElementById('index').style.display='';
	}
}
function set_xmlfile()
{	
	var xmlfilename=document.getElementById('xmlfile').value;
	if(xmlfilename)
	{
		xmlfile=xmlfilename;
	}
}
function copyToClipBoard()
{
	var clipBoardContent="";
	document.getElementById('resulturl').select();
	clipBoardContent=document.getElementById('resulturl').value;
	if (document.all)
	{ //判断Ie
		window.clipboardData.setData("Text",clipBoardContent);
		alert("复制成功，发给好朋友吧！");
	}
	else
	{
		alert("您的浏览器不支持剪贴板操作，请自行复制。"); 
	}
}

function cdn_oc(sid,ele,num)
{
	var dis
	var tdinfoele=document.getElementById('tdinfo'+sid+'-'+num);
	var infoele=document.getElementById('info'+sid+'-'+num);
	dis=infoele.style.display;
	var n=document.getElementById("link"+sid).rowSpan;
	if(dis=='none')
	{
		infoele.innerHTML=document.getElementById(sid+'-'+num).innerHTML;
		tdinfoele.style.padding='6px';
		tdinfoele.style.borderBottom='1px solid #C1DAD7';
		tdinfoele.style.borderRight='1px solid #C1DAD7';		
		$("#info"+sid+'-'+num).slideToggle(500);
		ele?ele.innerHTML='收起':'';
		if(n==1)
		set_rowspan(sid,2);
	}
	else
	{	
		$("#info"+sid+'-'+num).slideToggle(500);
		tdinfoele.style.padding='0px';
		tdinfoele.style.border='none';
		ele?ele.innerHTML='查看':'';
		if(n==2)
		set_rowspan(sid,1);	s		
	}
}

function set_rowspan(sid,n)
{
	document.getElementById("link"+sid).rowSpan=n;
	document.getElementById("name"+sid).rowSpan=n;
	document.getElementById("ispname"+sid).rowSpan=n;
	document.getElementById("province"+sid).rowSpan=n;
	document.getElementById("op"+sid).rowSpan=n;	
}

function cdn_oc_db(sid,ele,num)
{
	var ele2=ele.lastChild;
	cdn_oc(sid,ele2,num);
}

function cdn_oc_db_info(sid,num)
{
	var ele3=document.getElementById('text'+sid+'-'+num);
	cdn_oc(sid,ele3,num);
}

function removeElement(num,ele,type)
{
	var dis
	var tdinfoele=document.getElementById('tdinfo'+num);
	var infoele=document.getElementById('info'+num);
	dis=infoele.style.display;
	if(dis=='none')
	{
		infoele.innerHTML=document.getElementById(num).innerHTML;
		tdinfoele.style.padding='6px';
		tdinfoele.style.borderBottom='1px solid #C1DAD7';
		tdinfoele.style.borderRight='1px solid #C1DAD7';		
		$("#info"+num).slideToggle(500);
		ele?ele.innerHTML='收起':'';
	}
	else
	{
		if(dis&&ele&&ele.innerHTML=='查看'&&type)
		{
			infoele.innerHTML=document.getElementById(num).innerHTML;
			ele?ele.innerHTML='收起':'';
		}
		else
		{
			$("#info"+num).slideToggle(500);
			tdinfoele.style.padding='0px';
			tdinfoele.style.border='none';
			//infoele.innerHTML='';
			ele?ele.innerHTML='查看':'';
		}
	}
}

function removeElement2(num,ele)
{
	var ele2=ele.lastChild;
	removeElement(num,ele2,1);
}

function removeElement3(num)
{
	var ele3=document.getElementById('text'+num);
	removeElement(num,ele3,0);
}

function removeElement4(num)
{
	var dis
	var tdinfoele=document.getElementById('tdinfo'+num);
	var infoele=document.getElementById('info'+num);
	dis=infoele.style.display;
	if(dis=='none')
	{
		tdinfoele.style.padding='6px';
		tdinfoele.style.borderBottom='1px solid #C1DAD7';
		tdinfoele.style.borderRight='1px solid #C1DAD7';		
		$("#info"+num).slideToggle(500);
	}
	else
	{
		$("#info"+num).slideToggle(500);
		tdinfoele.style.padding='0px';
		tdinfoele.style.border='none';
	}	
	var ele3=document.getElementById('text'+num);
	ele3?ele3.innerHTML='查看':'';
}

function com_removeElement(num,ele,type,c)
{	
	var dis
	var tdinfoele=document.getElementById(c+'tdinfo'+num);
	var infoele=document.getElementById(c+'info'+num);
	dis=infoele.style.display;	
	if(dis=='none')
	{		
		infoele.innerHTML=document.getElementById(c+num).innerHTML;
		tdinfoele.style.padding='6px';
		tdinfoele.style.borderBottom='1px solid #C1DAD7';
		tdinfoele.style.borderRight='1px solid #C1DAD7';		
		$("#"+c+"info"+num).slideToggle(500);
		ele?ele.innerHTML='收起':'';		
	}
	else
	{
		if(dis&&ele&&ele.innerHTML=='查看'&&type)
		{
			infoele.innerHTML=document.getElementById(c+num).innerHTML;
			ele?ele.innerHTML='收起':'';			
		}
		else
		{			
			$("#"+c+"info"+num).slideToggle(500);
			tdinfoele.style.padding='0px';
			tdinfoele.style.border='none';
			ele?ele.innerHTML='查看':'';			
		}
	}
}

function com_removeElement4(num,c)
{
	var dis
	var tdinfoele=document.getElementById(c+'tdinfo'+num);
	var infoele=document.getElementById(c+'info'+num);
	dis=infoele.style.display;
	if(dis=='none')
	{
		tdinfoele.style.padding='6px';
		tdinfoele.style.borderBottom='1px solid #C1DAD7';
		tdinfoele.style.borderRight='1px solid #C1DAD7';		
		$("#"+c+"info"+num).slideToggle(500);
	}
	else
	{
		$("#"+c+"info"+num).slideToggle(500);
		tdinfoele.style.padding='0px';
		tdinfoele.style.border='none';
	}	
	var ele3=document.getElementById(c+'text'+num);
	ele3?ele3.innerHTML='查看':'';
}

function com_removeElement2(num,ele,c)
{
	var ele2=ele.lastChild;
	com_removeElement(num,ele2,1,c);
}

function com_removeElement3(num,c)
{
	var ele3=document.getElementById(c+'text'+num);
	com_removeElement(num,ele3,0,c);
}

function openclose(position)
{
	var dis;
	var ele=document.getElementById(position);
	dis=ele.style.display;
	if(dis=='block')
	{
		ele.style.display='none';
	}
	else if(dis=='none')
	{
		ele.style.display='block';
	}
}
function opencurl(ele)
{
	var dis
	dis=document.getElementById('curl').style.display;
	testtype=document.getElementById('t').value;
	clear_moreadoptions();
	if(dis=='block')
	{
		document.getElementById('curl').style.display='none';
		document.getElementById('curl').value='';
		ele.innerHTML='对比一下';
		if(testtype=='http')
		{
			document.getElementById('moreadoptions').style.display='inline';
			document.getElementById('pingadoptions').style.display='none';
		}
		else if(testtype=='ping')
		{
			document.getElementById('pingadoptions').style.display='inline';
			document.getElementById('moreadoptions').style.display='none';
		}
	}
	else if(dis=='none')
	{
		document.getElementById('curl').style.display='block';
		ele.innerHTML='取消对比';
		document.getElementById('moreadoptions').style.display='none';
	}
	setmargin();	
}
function openhigh()
{
	var adoptions
	var curl
	var testtype
	testtype=document.getElementById('t').value;
	curl=document.getElementById('curl').style.display;
	adoptions=document.getElementById('adoptions').style.display;
	clear_adoptions();
	if(curl=='block'||(testtype!='http'&&testtype!='cdn'))
	{
		document.getElementById('moreadoptions').style.display='none';
	}
	else
	{
		document.getElementById('moreadoptions').style.display='inline';
	}
	if(adoptions=='block')
	{
		document.getElementById('adoptions').style.display='none';
	}
	else if(adoptions=='none')
	{
		document.getElementById('adoptions').style.display='block';
	}
	if(testtype=='ping')
	{
		document.getElementById('pingadoptions').style.display='inline';
	}
	else
	{
		document.getElementById('pingadoptions').style.display='none';
	}	
	setmargin();
}
function checkall(cbox,type,num)
{
	var k=1;
	var isp;	
	if(!cbox.checked)
	{
		cbox.checked=false;
		while(k<num)
		{
			isp=type+k;
			document.getElementById(isp).checked=false;
			k++;
		}
	}
	else
	{
		cbox.checked=true;
		while(k<num)
		{
			isp=type+k;
			document.getElementById(isp).checked=true;
			k++;
		}	
	}
}
function checksingle(cbox,type,num)
{
	if(!cbox.checked)
	{
		document.getElementById(type+'0').checked=false;
	}
	else
	{		
		var k=1;
		var cboxnum=0;
		var isp;	
		while(k<num)
		{
			isp=type+k;
			if(document.getElementById(isp).checked)
			{
				cboxnum++;
			}
			k++;			
		}
		if(cboxnum==(num-1))
		{
		document.getElementById(type+'0').checked=true;
		}
	}	
}

function hide_ping()
{
	document.getElementById('pingadoptions').style.display='none';
	document.getElementById("pingcount").value='';
	document.getElementById("pingsize").value='';
	setmargin();
}

function show_ping()
{
	document.getElementById('pingadoptions').style.display='inline';
	setmargin();
}

function hidemore()
{
	document.getElementById('moreadoptions').style.display='none';
	clear_moreadoptions();
	setmargin();
}
function showmore()
{
	var dis
	dis=document.getElementById('curl').style.display;
	clear_moreadoptions();
	if(dis=='block')
	{
		document.getElementById('moreadoptions').style.display='none';
	}
	else if(dis=='none')
	{
		document.getElementById('moreadoptions').style.display='inline';
	}
	setmargin();
}
function clear_moreadoptions()
{	
	document.getElementById('rt1').checked=true;
	document.getElementById("host").value='';
	document.getElementById("referer").value='';
	document.getElementById("cookie").value='';
	document.getElementById("agent").value='';
	document.getElementById("downspeed").value='';
	document.getElementById("pingcount").value='';
	document.getElementById("pingsize").value='';
}
function clear_adoptions()
{
	document.getElementById('isp0').checked=true;
	document.getElementById('isp1').checked=true;
	document.getElementById('isp2').checked=true;
	document.getElementById('isp3').checked=true;
	document.getElementById('isp4').checked=true;
	document.getElementById('isp5').checked=true;
	document.getElementById('isp6').checked=true;	
	clear_moreadoptions();
}
function setmargin()
{
	var defaultheight
	var nowheight
	var cha
	defaultheight=32;	
	nowheight=document.getElementById('fm').offsetHeight;
	cha=nowheight-defaultheight;
	if(cha>0)
	{	
		document.getElementById('mCon').style.marginTop=cha+'px';
	}
	else
	{
		document.getElementById('mCon').style.marginTop='0px';
	}
}
function checkips(checkurl)
{
	var url=checkurl;
	var pos;
	var result;
	url=url.replace(/\s/g,"");
	url=url.replace(/http.*\/\//gi,"");
	pos=url.indexOf("/");
	if(pos>0)
	{
		url=url.substr(0,pos);
	}
	result=checkip(url);
	if(result)
	{
		document.getElementById("host").disabled=false;
	}
	else
	{
		document.getElementById("host").disabled=true;
	}
}
function checkip(ip)
{
	var str = ip;
	str = str.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/g);
	if (str == null)
	{
		return false;
	}
	else if (RegExp.$1>255 || RegExp.$2>255 || RegExp.$3>255 || RegExp.$4>255)
	{
		return false;
	}
	else
	{
		return true;
	}
}
function switchtype(type)
{
	switch(type)
	{		
		case '1':
		document.getElementById('nav1').className='navon';
		document.getElementById('nav2').className='';
		document.getElementById('nav3').className='';
		document.getElementById('nav4').className='';
		document.getElementById('nav5').className='';
		document.getElementById('t').value='http';
		common_case_set();
		hide_ping();
		showmore();
		break;
		case '2':
		document.getElementById('nav1').className='';
		document.getElementById('nav2').className='navon';
		document.getElementById('nav3').className='';
		document.getElementById('nav4').className='';
		document.getElementById('nav5').className='';
		document.getElementById('t').value='ping';
		common_case_set();
		show_ping();
		hidemore();
		break;
		case '3':
		document.getElementById('nav1').className='';
		document.getElementById('nav2').className='';
		document.getElementById('nav3').className='navon';
		document.getElementById('nav4').className='';
		document.getElementById('nav5').className='';
		document.getElementById('t').value='tracert';
		t_case_set();
		hide_ping();
		hidemore();
		break;
		case '4':
		document.getElementById('nav1').className='';
		document.getElementById('nav2').className='';
		document.getElementById('nav3').className='';
		document.getElementById('nav4').className='navon';
		document.getElementById('nav5').className='';
		document.getElementById('t').value='dns';
		//dns_case_set();
		common_case_set();
		hide_ping();
		hidemore();
		break;
		case '5':
		document.getElementById('nav1').className='';
		document.getElementById('nav2').className='';
		document.getElementById('nav3').className='';
		document.getElementById('nav4').className='';
		document.getElementById('nav5').className='navon';
		document.getElementById('t').value='cdn';
		//dns_case_set();
		common_case_set();
		hide_ping();
		showmore();
		document.getElementById('su1').style.display='';
		document.getElementById('su').value='刷新';	
		rmenu_set(0,1,1);
		break;		
		default:
		document.getElementById('nav1').className='navon';
		document.getElementById('nav2').className='';
		document.getElementById('nav3').className='';
		document.getElementById('nav4').className='';
		document.getElementById('t').value='http';
		common_case_set();
		hide_ping();
		showmore();
		break;
	}
}

function set_nocache(y)
{
	var nocache=document.getElementById('nocache');
	var su=document.getElementById('su');
	var su1=document.getElementById('su1');
	var su2=document.getElementById('su2');
	var su3=document.getElementById('su3');
	var t=document.getElementById('t').value;
	if(y)
	{
		nocache.checked=true;
		su2.value=su.value;
		if(t=='cdn')
		su.value='刷新中';
		else if(t=='tracert')
		su.value='追踪中';
		else
		su.value='检测中';
	}
	else
	{
		nocache.checked=false;
		su2.value=su1.value;
		su1.value=su1.value+'中';
	}
	su3.style.display='';
	su1.style.display='none';
	su.style.display='none';
	su.disabled='disabled';
	su1.disabled='disabled';	
}

function t_case_set()
{
	document.getElementById('su1').style.display='none';
	document.getElementById('curl').value='';
	document.getElementById('curl').style.display='none';
	document.getElementById('adoptions').style.display='none';
	document.getElementById('clable').innerHTML='对比一下';
	rmenu_set(0,0,1);
	clear_adoptions();
	document.getElementById('mCon').style.width='120px';
	document.getElementById('fm').style.width='690px';
	document.getElementById('fm').style.paddingLeft='15px';
	document.getElementById('route-select').style.display='block';
	document.getElementById('nv').style.paddingRight='0px';
	document.getElementById('nv').style.paddingLeft='20px';
	document.getElementById('sid').disabled=false;
	document.getElementById('su').value='追踪';
}

function cdn_case_set()
{
	common_case_set();
	hide_ping();
	showmore();
	document.getElementById('su1').style.display='';
	document.getElementById('su').value='刷新';	
	rmenu_set(0,1,1);
}

function common_case_set()
{
	rmenu_set(1,1,1);
	document.getElementById('su1').style.display='none';
	document.getElementById('route-select').style.display='none';
	document.getElementById('mCon').style.width='260px';
	document.getElementById('fm').style.paddingLeft='90px';
	document.getElementById('fm').style.width='655px';
	document.getElementById('sid').disabled=true;
	document.getElementById('nv').style.paddingRight='190px';
	document.getElementById('nv').style.paddingLeft='0px';
	document.getElementById('su').value='检测一下';	
}

function dns_case_set()
{
	document.getElementById('curl').value='';
	document.getElementById('curl').style.display='none';
	document.getElementById('clable').innerHTML='对比一下';
	rmenu_set(0,1,1);
	document.getElementById('mCon').style.width='85px';
	document.getElementById('fm').style.paddingLeft='15px';
	document.getElementById('fm').style.width='655px';
	document.getElementById('route-select').style.display='none';	
	document.getElementById('mCon').style.width='260px';	
	document.getElementById('fm').style.paddingLeft='90px';	
	document.getElementById('sid').disabled=true;
	document.getElementById('nv').style.paddingRight='190px';
	document.getElementById('nv').style.paddingLeft='0px';
	document.getElementById('su').value='检测一下';	
}

function rmenu_set(clable,high,help)
{
	var none='none';
	var inline='inline';
	document.getElementById('clable').style.display=(clable?inline:none);
	document.getElementById('high').style.display=(high?inline:none);
	document.getElementById('help').style.display=(help?inline:none);
}

function changerank(rank)
{	
	switch(rank)
	{
		case "rank1":
		document.getElementById("rank1").style.display='block';
		document.getElementById("rank2").style.display='none';
		document.getElementById("rank3").style.display='none';
		document.getElementById("m1").className='on';
		document.getElementById("m2").className='nor';
		document.getElementById("m3").className='nor';
		break;
		case "rank2":
		document.getElementById("rank2").style.display='block';
		document.getElementById("rank1").style.display='none';
		document.getElementById("rank3").style.display='none';
		document.getElementById("m1").className='nor';
		document.getElementById("m2").className='on';
		document.getElementById("m3").className='nor';		
		break;		
		case "rank3":
		document.getElementById("rank3").style.display='block';
		document.getElementById("rank1").style.display='none';
		document.getElementById("rank2").style.display='none';
		document.getElementById("m1").className='nor';
		document.getElementById("m2").className='nor';
		document.getElementById("m3").className='on';		
		break;
	}
}