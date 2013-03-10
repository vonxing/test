function submit_query_form() 
{
	$('#allSitesBoxHdl')[0].style.display = 'none';
	set_domain_cookie('url');
	set_domain_cookie('curl');
	FillAllSites();
}

function set_domain_cookie(url)
{
	var query_domain = getdomain(document.getElementById(url).value);
	if (query_domain) 
	{
		query_domain=query_domain;
		var allSites = $.cookie('allSites');
		if (!allSites)
		{
			$.cookie('allSites', query_domain, {domain: '.17ce.com'}); 
		} 
		else 
		{
			var allSitesA = allSites.split('|');
			if(allSitesA.length<10)
			{
				if(!allSites.match(query_domain))
				{
 					allSites=query_domain+'|'+allSites;
				}				
			}
			$.cookie('allSites', allSites, {domain: '.17ce.com'}); 
		}
	}	
}

function getdomain(url) {
	_url = url.toLowerCase(); 
    if (_url.indexOf("http://") >= 0) {
	    var _url = url.replace("http://", "");
	}
    if (_url.indexOf("/") >= 0) {
		var _domain_arr = _url.split("/");
		var _domain = _domain_arr[0];
	} else {
		var _domain = _url;
	}
	_domain = _domain.trim();
	_domain = _domain.replace(" ", "");
    return _domain;
}

//打开DIV层
function DisplayAllSitesBox(t) {
	if ($('#allSitesBoxHdl')[0].style.display == 'none'&&$("#allSitesBox").html()) 
	{
		$('#allSitesBoxHdl')[0].style.display = '';
		if(t==1)
		{
			$('#allSitesBoxHdl')[0].style.top="31px";
		}
		else
		{
			$('#allSitesBoxHdl')[0].style.top="63px";
		}
		if($('#t').val() == 'tracert')
		{
			$('#allSitesBoxHdl')[0].style.left="172px";
		}
		else
		{
			$('#allSitesBoxHdl')[0].style.left="0px";
		}
	}
}
//变色
function changeListBgColor(obj, s) {
	if (s == 1) {
		obj.style.backgroundColor='#EDF6FB';
	} else {
		obj.style.backgroundColor='#F5FBFF';
	}
}
//赋值
function SetInputValue(id, str)
{
	var top=$('#allSitesBoxHdl')[0].style.top;
	if(top=="31px")
	{
		$('#'+id).val(str);		
	}
	else
	{
		$('#c'+id).val(str);
	}
	$('#allSitesBoxHdl')[0].style.display='none';
}
function FillAllSites() {
	var allSites = $.cookie('allSites');
	var boxhtml = '';
	if (allSites) {
		var allSitesA = allSites.split('|');
		for (i = 0; i < allSitesA.length; i++) {
			var tmpArr = allSitesA[i].split(',');
			var tmpSite = tmpArr[0];
			var tmpState = tmpArr[1];
			
			if (allSitesA[i].indexOf(',1') >= 0) {
				boxhtml += "<li class=\"lis\" onmouseover=\"changeListBgColor(this, 1)\" onmouseout=\"changeListBgColor(this, 0)\"><span onclick=\"SetInputValue('url', '"+tmpSite+"')\" class=\"list_span_select\">" + tmpSite + "</span><input type=\"button\" onclick=\"DelAllSitesItem('"+tmpSite+"')\" class=\"list_span_cancel\" value=\"取消\"></span><input type=\"button\" class=\"list_span_saved\" value=\"已存\"></li>";
			} else if (allSitesA[i].indexOf(',-1') >= 0) {
				//
			} else {
				boxhtml += "<li class=\"lis\" onmouseover=\"changeListBgColor(this, 1)\" onmouseout=\"changeListBgColor(this, 0)\"><span onclick=\"SetInputValue('url', '"+tmpSite+"')\" class=\"list_span_select\">" + tmpSite + "</span><input type=\"button\" onclick=\"DelAllSitesItem('"+tmpSite+"')\" class=\"list_span_delte\" value=\"删除\"></span><input type=\"button\" onclick=\"SaveAllSitesItem('" + tmpSite + "');\" class=\"list_span_save\" value=\"保存\"></li>";
			}
			
		}
	}
	$("#allSitesBox").html(boxhtml);
}
function DelAllSitesItem(value) {
	var newSites = [];
	var allSites = $.cookie('allSites');
	var allSitesA = allSites.split('|');
	for (i = 0; i < allSitesA.length; i++) {
		var tmpArr = allSitesA[i].split(',');
		var tmpSite = tmpArr[0];
		var tmpState = tmpArr[1];

		if (value != tmpSite){
			newSites.push(allSitesA[i]);
		}
	}
	if (newSites.length > 0) {
		allSites = newSites.join('|');
	} else {
		allSites = null;
	}
	$.cookie('allSites', allSites, {path: '/', domain: '.17ce.com'});
	FillAllSites();
}
function SaveAllSitesItem(value) {
	var newSites = [];
	var newSites1 = [];
	var newSites0 = [];
	var allSites = $.cookie('allSites');
	if (allSites){
		var allSitesA = allSites.split('|');
		for (i = 0; i < allSitesA.length; i++) {
			var tmpArr = allSitesA[i].split(',');
			var tmpSite = tmpArr[0];
			var tmpState = tmpArr[1];

			if (value != tmpSite){
				newSites0.push(allSitesA[i]);
			} else {
				newSites1.push(tmpSite+',1');
			}
		}
		newSites = newSites1.concat(newSites0);
		if (newSites.length > 0) {
			allSites = newSites.join('|');
		} else {
			allSites = null;
		}
	} else {
		allSites = null;
	}
	$.cookie('allSites', allSites, {path: '/', domain: '.17ce.com'});
	FillAllSites('allSites');
}
//document.getElementById("allSitesBox").onmouseout = function() {
//document.getElementById("allSitesBox").style.display='none';
//}
$(document).mousedown(
	function(event){
		if (event.target.id != 'site' && event.target.parentNode.className != 'lis' && $('#allSitesBoxHdl')[0].style.display != 'none') {
			$('#allSitesBoxHdl')[0].style.display = 'none';
		}
	}
);
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 7 * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};