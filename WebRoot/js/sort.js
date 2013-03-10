// JavaScript Document
//转换器，将列的字段类型转换为可以排序的类型：String,int,float
function convert(sValue, sDataType) 
{
	var value;
    switch(sDataType) 
	{
        case "int":
			value=parseInt(sValue);
			if(value)
			return value;
			else
			return 0;
			break;
		case "color":	
        case "float":
			value=parseFloat(sValue);
			if(value)
			return value;
			else
			return 0;
			break;
        case "date":
			return new Date(Date.parse(sValue));
			break;
        case "speed":
		case "size":
			return unit_convert(sValue);
			break;
		case "text":
			return makePy(sValue);
			break;		
        default:
			value=sValue.toString();
			if(value)
			return value;
			else
			return '';
    }
}

function unit_convert(value)
{
	var f=parseFloat(value);
	if(f)
	{
		var u=value.replace(f,"");
		u=u.toLocaleUpperCase();
		switch(u)
		{
			case 'B':
			case 'B/S':
				return f;
				break;
			case 'KB':
			case 'KB/S':
				return f*1024;
				break;
			case 'MB':
			case 'MB/S':
				return f*1024*1024;
				break;
			case 'GB':
			case 'GB/S':
				return f*1024*1024*1024;
				break;
			case 'TB':
			case 'TB/S':
				return f*1024*1024*1024*1024;
				break;
			default:
				return f;
		}	
	}
	else
	{
		return 0;	
	}	
}

//排序函数产生器，iCol表示列索引，sDataType表示该列的数据类型
function generateCompareTRs(iCol, sDataType) 
{        
    return  function compareTRs(oTR1, oTR2) 
	{
		var va1;
		var va2;
		if(!oTR1.cells[iCol].firstChild)
		{
			va1=0;
		}
		else if(sDataType=='color'||sDataType=='speed')
		{
			if(!oTR1.cells[iCol].firstChild.firstChild)
			va1=0;
			else
			va1=oTR1.cells[iCol].firstChild.firstChild.nodeValue;			
		}
		else
		{
			va1=oTR1.cells[iCol].firstChild.nodeValue;
		}
		
		if(!oTR2.cells[iCol].firstChild)
		{
			va2=0;		
		}
		else if(sDataType=='color'||sDataType=='speed')
		{
			if(!oTR2.cells[iCol].firstChild.firstChild)
			va2=0;
			else
			va2=oTR2.cells[iCol].firstChild.firstChild.nodeValue;			
		}
		else
		{
			va2=oTR2.cells[iCol].firstChild.nodeValue;		
		}
		var vValue1 = convert(va1, sDataType);
		var vValue2 = convert(va2, sDataType);      
		if (vValue1 < vValue2)
		{
			return -1;
		} 
		else if (vValue1 > vValue2)
		{
			return 1;
		} 
		else 
		{
			return 0;
		}
    };
}
            
//排序方法
function sortTable(sTableID, iCol, sDataType) 
{
    var oTable = document.getElementById(sTableID);
    var oTBody = oTable.tBodies[0];
    var colDataRows = oTBody.rows;
    var aTRs = new Array; 
	var aTRs2 = new Array;
    //将所有列放入数组
	var k=0;
    for (var i=0; (i < colDataRows.length/2); i++) 
	{
        aTRs[k] = colDataRows[2*i];
		//aTRs2[k] = colDataRows[2*i+1];
		k++;
    }     
    //判断最后一次排序的列是否与现在要进行排序的列相同，是的话，直接使用reverse()逆序
    if (oTable.sortCol == iCol) 
	{
        aTRs.reverse();
    } 
	else 
	{
        //使用数组的sort方法，传进排序函数
        aTRs.sort(generateCompareTRs(iCol, sDataType));
    }        
    var oFragment = document.createDocumentFragment();
    for (var i=0; i < aTRs.length; i++) 
	{
		var str=aTRs[i].id;
		var str2=str.replace(/tr/,"trinfo");
		var infoele=document.getElementById(str2);
		if((i%2)==0)
		{
			aTRs[i].className="alt";
			infoele.className="alt";
		}
		else
		{
			aTRs[i].className="";
			infoele.className="";
		}
        oFragment.appendChild(aTRs[i]);
		oFragment.appendChild(infoele);
    }      
    oTBody.appendChild(oFragment);
    //记录最后一次排序的列索引
    oTable.sortCol = iCol;
}

//排序方法
function admin_sortTable(sTableID, iCol, sDataType) 
{
    var oTable = document.getElementById(sTableID);
    var oTBody = oTable.tBodies[0];
    var colDataRows = oTBody.rows;
    var aTRs = new Array;  
    //将所有列放入数组
    for (var i=0; i < colDataRows.length; i++) 
	{
        aTRs[i] = colDataRows[i];
    }     
    //判断最后一次排序的列是否与现在要进行排序的列相同，是的话，直接使用reverse()逆序
    if (oTable.sortCol == iCol) 
	{
        aTRs.reverse();
    } 
	else 
	{
        //使用数组的sort方法，传进排序函数
        aTRs.sort(generateCompareTRs(iCol, sDataType));
    }        
    var oFragment = document.createDocumentFragment();
    for (var i=0; i < aTRs.length; i++) 
	{	
		if((i%2)==0)
		aTRs[i].className="alt";
		else
		aTRs[i].className="";
        oFragment.appendChild(aTRs[i]);
    }      
    oTBody.appendChild(oFragment);
    //记录最后一次排序的列索引
    oTable.sortCol = iCol;
}