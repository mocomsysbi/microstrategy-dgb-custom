(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.dom","mstrmojo.array","mstrmojo.gmaps.MapEnums","mstrmojo.gmaps.MapUtils","mstrmojo.vi.viz.MapHelper");var $MOJO=mstrmojo,$DOM=$MOJO.dom,$HASH=$MOJO.hash,$ARR=$MOJO.array,$GMAPS=$MOJO.gmaps,$MUTIL=$GMAPS.MapUtils,$MH=$MOJO.vi.viz.MapHelper,$EnumThresholdType=$GMAPS.EnumThresholdType,$EnumBaseMapType=$GMAPS.EnumBaseMapType;var allowedTags=["table","tr","th","td"],allowedProps=["class","style"];var PERCENT_TITLE=mstrmojo.desc(14141,"Percent Contribution");function findExtraLatLnFormIndices(){var rowAttributes=this.getDataRows(),numAttributes=rowAttributes&&rowAttributes.length,latLngIndices=[],attribute,attrID,i,forms,form,fidx,attrID2AttrMap={},attrsWithSameID,hasExtraForm,isNotLatLngOnly=function(attr){var result=false;forms=attr.fs;if(!forms){return true;}for(fidx=0;fidx<forms.length;fidx++){form=forms[fidx];if(!$MH.isLatitude(form.fnm,form.fgr)&&!$MH.isLongitude(form.fnm,form.fgr)){result=true;}}if(($MH.isLatitude(attr.n)||$MH.isLongitude(attr.n))&&forms.length===1){result=false;}return result;};for(i=0;i<numAttributes;i++){attribute=rowAttributes[i];attrID=attribute&&attribute.id;if(!attrID2AttrMap[attrID]){attrID2AttrMap[attrID]=[];}attrID2AttrMap[attrID].push(attribute);}for(attrID in attrID2AttrMap){attrsWithSameID=attrID2AttrMap[attrID];hasExtraForm=false;for(i=0;i<attrsWithSameID.length;i++){attribute=attrsWithSameID[i];if(isNotLatLngOnly(attribute)){hasExtraForm=true;}else{attribute.isLatLng=true;}}attrsWithSameID.hasExtraForm=hasExtraForm;}for(i=0;i<numAttributes;i++){attribute=rowAttributes[i];attrID=attribute&&attribute.id;attrsWithSameID=attrID2AttrMap[attrID];if(attrsWithSameID.hasExtraForm&&attribute.isLatLng){latLngIndices.push(i);}}return latLngIndices;}function _isIndexGeoPosition(index,geoColumnIndices){var results=false,i,il;if(!(geoColumnIndices instanceof Array)){return false;}if(index<0){return false;}for(i=0,il=geoColumnIndices.length;i<il;i++){if(index===geoColumnIndices[i]){results=true;break;}}return results;}function _strContainsLatLng(str){return(!!str&&(str.toLowerCase().indexOf("latitude")>-1||str.toLowerCase().indexOf("longitude")>-1));}function _sliceEnabled(){var fn=this.sliceEnabled;if(!!fn&&fn instanceof Function){return fn.call(this);}return false;}function isMapbox(){var map=this.map;return map&&map.scriptClass==="mstrmojo.mapbox.VisMapbox";}mstrmojo.gmaps.layer._InfoWindowHelper=mstrmojo.provide("mstrmojo.gmaps.layer._InfoWindowHelper",{_mixinName:"mstrmojo.gmaps.layer._InfoWindowHelper",showTooltip:function showTooltip(graphics,pos){var tooltipWin=this.getTooltipWin(),TOOLTIP_DOM=tooltipWin&&tooltipWin.domNode,tooltipContent=this.getTooltipContent(graphics),tooltipDropzone=this.dropZones&&this.dropZones.tooltips,isTooltipEmpty=function(){return isMapbox.call(this)&&(!tooltipDropzone||tooltipDropzone.length===0);};if(!TOOLTIP_DOM||!$MUTIL.checkDefined(tooltipContent)||isTooltipEmpty.call(this)||!pos||!$MUTIL.checkVal(pos.x)||!$MUTIL.checkVal(pos.y)){return ;}if(!TOOLTIP_DOM.parentNode){document.body.appendChild(TOOLTIP_DOM);}if($MUTIL.isExpress()){TOOLTIP_DOM.innerHTML=tooltipContent;tooltipWin.moveTo(pos.x,pos.y);tooltipWin.toggle(true);}else{tooltipWin.showDossierTtp(tooltipContent,pos);}},hideTooltip:function hideTooltip(){var parent=this.parent;if(parent){parent.hideTooltip();}},getTooltipWin:function getTooltipWin(){return this.parent&&this.parent.tooltipWin;},getTooltipContent:function getTooltipContent(graphics){var dataRowIdxArr=this.getGraphicsDataRowIndices(graphics)||[],sliceEnabled,attributes,geometry,percent,percentTitle,content;if(!graphics){return ;}if(graphics[0]&&dataRowIdxArr.length===1){sliceEnabled=_sliceEnabled.call(this);attributes=graphics[0].attributes;if(attributes&&sliceEnabled){geometry=graphics[0].geometry;if(geometry&&geometry.getPercentage instanceof Function){percent=geometry.getPercentage();percentTitle=$MUTIL.replaceSpace(PERCENT_TITLE);attributes=$HASH.copy(attributes,{});attributes[percentTitle]=percent;}}if($MUTIL.isExpress()){content=this.generateSimpleInfoDOM(attributes);}else{content=this.generateSimpleInfoObj(attributes);}}else{if(dataRowIdxArr.length>1){if($MUTIL.isExpress()){content=this.generateGridInfoDOM(dataRowIdxArr,graphics[0]&&graphics[0].attributes.columnIndices);}else{content=this.generateGridInfoObj(dataRowIdxArr,graphics[0]&&graphics[0].attributes.columnIndices);}}}return content;},prepareDivs:function prepareDivs(){var table=this.createEmptyGridInfoWindowTable(),cssStyle=this.createInfoTabDivCSSStyle(),infoTabDiv=document.createElement("div");infoTabDiv.id="infoDiv";infoTabDiv.style.paddingTop="3px";infoTabDiv.style.overflow="auto";infoTabDiv.appendChild(table);if($MUTIL.checkDefined(cssStyle)){infoTabDiv.appendChild(cssStyle);}this.infoTabDiv=infoTabDiv;},createEmptyGridInfoWindowTable:function createEmptyGridInfoWindowTable(){var table=document.createElement("table"),tableHead=document.createElement("tHead"),tableBody=document.createElement("tBody");table.className="gridInfoWindowTable";table.setAttribute("cellspacing","0");table.setAttribute("cellpadding","2");table.appendChild(tableHead);table.appendChild(tableBody);return table;},createInfoTabDivCSSStyle:function createInfoTabDivCSSStyle(){var cssStyle=null,m=this.getData(),cssString=m.cssString,node;if(cssString!==undefined){cssStyle=document.createElement("style");cssStyle.type="text/css";node=cssStyle.styleSheet||cssStyle;if($DOM.isWK){if(node.firstChild){node.firstChild.nodeValue=cssString;}else{node.appendChild(document.createTextNode(cssString));}}else{node[$DOM.isIE?"cssText":"innerHTML"]=cssString;}}return cssStyle;},parseCustomInfoWinTplHTML:function parseCustomInfoWinTplHTML(input){var result="",baseIndex=0,startIndex=input.indexOf("${",baseIndex),endIndex=input.indexOf("}",startIndex+1),dataIDNameTable={},rows=this.getDataRows(),cols=this.getDataCols(),macroName,row,col,es,colElement,i,il,j,jl;if(!rows||!cols){return ;}for(i=0,il=rows.length;i<il;i++){row=rows[i];dataIDNameTable[row.id+"|"+row.fid]=row.n;}for(i=0,il=cols.length;i<il;i++){col=cols[i];if(col.otp===-1){es=col.es;for(j=0,jl=es.length;j<jl;j++){colElement=es[j];dataIDNameTable[colElement.id]=colElement.n;}break;}}while(startIndex>=0&&endIndex>startIndex){macroName=input.substring(startIndex+2,endIndex);if(dataIDNameTable.hasOwnProperty(macroName)){result+=input.substring(baseIndex,startIndex+2)+dataIDNameTable[macroName];}else{result+=input.substring(baseIndex,endIndex);}baseIndex=endIndex;startIndex=input.indexOf("${",baseIndex);endIndex=input.indexOf("}",startIndex+1);}result+=input.substring(baseIndex);return $MUTIL.removeHTMLTagsAndProps(result,allowedTags,allowedProps);},getDefaultInfoTplHTML:function getDefaultInfoTplHTML(data,dropZones,skipIndices){if(!data||!dropZones){return"";}var contentHTML='<table class="nonGridInfoWindow">',contentObj=this.tooltipContentObj=[],rowHeaders=this.getDataRowHeaders(),rowTitles=this.getDataRows(),cols=this.getDataCols(),showMetric=this.showMetric(),itemSkip=[],tooltipElements=$ARR.ensureArray(dropZones&&dropZones.tooltips),rowHeaderItems,rowCell,rowCellTitle,k,headerLength,titleLength,lastAttrIdx,attIdx,keepCheck,name,value;if(!$ARR.isArray(rowHeaders)||!rowHeaders[0]||!$ARR.isArray((rowTitles))){return"";}this.extraLatLnFormIndices=findExtraLatLnFormIndices.call(this);rowHeaderItems=rowHeaders[0].items;if(!$ARR.isArray(rowHeaderItems)){return"";}headerLength=rowHeaderItems.length;keepCheck=isMapbox.call(this)?true:(showMetric||skipIndices.length!==headerLength||this.getBaseMapType()===$EnumBaseMapType.Image);titleLength=rowTitles.length;for(k=0;k<headerLength&&keepCheck;k++){if(this._canSkipItem(dropZones,k,skipIndices)){itemSkip[k]=true;}}for(k=headerLength-1;k>=0;k--){if(!itemSkip[k]){break;}}lastAttrIdx=k;for(k=0;k<headerLength;k++){if(itemSkip[k]){continue;}if(!showMetric&&(k===lastAttrIdx)){contentHTML+='<tr class="lastRow">';}else{contentHTML+="<tr>";}rowCell=rowHeaderItems[k];attIdx=titleLength<headerLength?rowCell.tui:k;rowCellTitle=rowTitles[attIdx].n;name=this.getAttributeName(attIdx);value=$MUTIL.replaceSpace(rowCellTitle);contentHTML+="<th>"+name+":</th><td> ${"+value+"}</td>";contentHTML+="</tr>";contentObj.push({n:name,v:$MUTIL.replaceSpace(value)});}if(showMetric){var needPercent=false;if(typeof this.sliceEnabled==="function"){needPercent=this.sliceEnabled();}rowHeaderItems=cols[0].es;headerLength=rowHeaderItems.length;for(k=0;k<headerLength;k++){if(this._canSkipMetricItem(dropZones,k)){continue;}contentHTML+=((k<headerLength-1)||needPercent)?"<tr>":'<tr class="lastRow">';rowCellTitle=rowHeaderItems[k].n;value=$MUTIL.replaceSpace(rowCellTitle);contentHTML+="<th>"+rowCellTitle+":</th><td>${"+value+"}</td>";contentHTML+="</tr>";contentObj.push({n:rowCellTitle,v:value});}if(needPercent){contentHTML+='<tr class="lastRow">';value=$MUTIL.replaceSpace(PERCENT_TITLE);contentHTML+="<th>"+PERCENT_TITLE+":</th><td>${"+value+"}</td>";contentHTML+="</tr>";contentObj.push({n:PERCENT_TITLE,v:value});}}contentHTML+="</table>";return contentHTML;},_canSkipItem:function _canSkipItem(dropZones,idx,skipIndices){var rowTitles=this.getDataRows(),titleLength=rowTitles.length,tooltipElements=dropZones.tooltips,unitId=rowTitles[idx].id,rowHeaders=this.getDataRowHeaders(),rowHeaderItems=rowHeaders&&rowHeaders[0].items,headerLength=rowHeaderItems.length,rowCell=rowHeaderItems[idx],rowCellTitle=titleLength<headerLength?rowTitles[rowCell.tui].n:rowTitles[idx].n,baseMapType=this.getBaseMapType(),isMapBox=isMapbox.call(this),unitNotInTooltipZone=!tooltipElements||mstrmojo.array.indexOf(tooltipElements,unitId)<0;if(isMapBox&&((_isIndexGeoPosition(idx,this.extraLatLnFormIndices))||unitNotInTooltipZone)){return true;}if(unitNotInTooltipZone){if((baseMapType===$EnumBaseMapType.Image||!!dropZones.geoAttribute)&&(_isIndexGeoPosition(idx,skipIndices)||_strContainsLatLng(rowCellTitle))){return true;}}return false;},_canSkipMetricItem:function _canSkipMetricItem(dropZones,idx){var cols=this.getDataCols(),tooltipElements=dropZones.tooltips,metrics=cols&&cols[0]&&cols[0].es,unitId=metrics&&metrics[idx]&&metrics[idx].oid;if(isMapbox.call(this)&&(!tooltipElements||mstrmojo.array.indexOf(tooltipElements,unitId)<0)){return true;}return false;},generateSimpleInfoDOM:function generateSimpleInfoDOM(attributes){if(!this.infoTemplate){return ;}var input=this.infoTemplate.content,result="",baseIndex=0,startIndex=input.indexOf("${",baseIndex),endIndex=input.indexOf("}",startIndex+1),macroName,transformedMacroName;while(startIndex>=0&&endIndex>startIndex){macroName=input.substring(startIndex+2,endIndex);var colonIndex=macroName.indexOf(":");if(colonIndex>=0){transformedMacroName=macroName.substring(0,colonIndex)+" "+macroName.substring(colonIndex+1);}else{transformedMacroName=macroName;}transformedMacroName=$MUTIL.replaceSpace(transformedMacroName);if(attributes.hasOwnProperty(transformedMacroName)){result+=input.substring(baseIndex,startIndex)+attributes[transformedMacroName];}else{if(attributes.hasOwnProperty(macroName)){result+=input.substring(baseIndex,startIndex)+attributes[macroName];}else{result+=input.substring(baseIndex,endIndex+1);}}baseIndex=endIndex+1;startIndex=input.indexOf("${",baseIndex);endIndex=input.indexOf("}",startIndex+1);}result+=input.substring(baseIndex,input.length);return result!==input?result:null;},generateSimpleInfoObj:function generateSimpleInfoObj(attributes){var contentObj=this.tooltipContentObj,infoContent=[],infoNames=[],len=(contentObj&&contentObj.length)||0,i,row,name,value,transformedValue;for(i=0;i<len;i++){row=contentObj[i];name=row.n;value=row.v;var colonIndex=value.indexOf(":");if(colonIndex>=0){transformedValue=value.substring(0,colonIndex)+" "+value.substring(colonIndex+1);}else{transformedValue=value;}transformedValue=$MUTIL.replaceSpace(transformedValue);if(attributes.hasOwnProperty(transformedValue)){value=attributes[transformedValue];}else{if(attributes.hasOwnProperty(value)){value=attributes[value];}}if(infoNames.indexOf(name)===-1){infoContent.push({n:name,v:value});infoNames.push(name);}else{infoContent[infoContent.length-1].v=infoContent[infoContent.length-1].v+" "+value;}}return infoContent;},generateGridInfoDOM:function generateGridInfoDOM(dataRowIdxArr,geoColumnIndices){if(!this.infoTabDiv){this.prepareDivs();}var me=this,div=this.infoTabDiv,table=div.childNodes[0],data=this.data,rows=this.getDataRows(),rowHeaders=this.getDataRowHeaders(),colHeaders=this.getDataColHeaders(),numRowAttributes=rowHeaders&&rowHeaders.length>0?rowHeaders[0].items.length:0,renderTableHeader=function(table){var thead=table.tHead,hasHeader=false,numColAttributes,tr,titleSpan,cell,header,tui,i,idx,td;if(!thead){return hasHeader;}while(thead.rows.length>0){thead.deleteRow(thead.rows.length-1);}tr=thead.insertRow(thead.rows.length);numColAttributes=colHeaders&&colHeaders.length>0?colHeaders[0].items.length:0;for(i=0;i<numRowAttributes;i++){if(me._canSkipItem(me.dropZones,i,geoColumnIndices)){continue;}td=tr.insertCell(tr.cells.length);titleSpan=document.createElement("span");titleSpan.innerHTML=me.getAttributeName(i);td.appendChild(titleSpan);hasHeader=true;}for(i=0;i<numColAttributes;i++){td=tr.insertCell(tr.cells.length);cell=colHeaders[0].items[i];tui=cell.tui;idx=cell.idx;header=data.gts.col[tui].es[idx];titleSpan=document.createElement("span");titleSpan.innerHTML=header.n;td.appendChild(titleSpan);hasHeader=true;}return hasHeader;},renderTableBody=function(table){var tbody=table.tBodies[0],numRows=dataRowIdxArr.length,metricValues=data.gvs.items,numMetrics=!!metricValues?metricValues[0].items.length:0,attributeName,metricValueItem,metricValue,metricRawValue,tr,threshold,thresholdType,rowIndex,rowHeaderItems,cell,i,j,k,td,idx;for(i=0;i<numRows;i++){rowIndex=dataRowIdxArr[i];tr=tbody.insertRow(tbody.rows.length);rowHeaderItems=rowHeaders[rowIndex].items;for(j=0;j<numRowAttributes;j++){if(me._canSkipItem(me.dropZones,j,geoColumnIndices)){continue;}cell=rowHeaderItems[j];if(!cell||cell.idx<0){td=tr.insertCell(tr.cells.length);td.innerHTML=" ";continue;}idx=cell.idx;td=tr.insertCell(tr.cells.length);attributeName=rows[j].es[idx].n;td.innerHTML="    "+attributeName+"    ";}for(k=0;k<numMetrics;k++){metricValueItem=metricValues[rowIndex].items[k];metricValue=metricValueItem&&metricValueItem.v;metricRawValue=metricValueItem&&metricValueItem.rv;threshold=me.getThresholdInfo(rowIndex,k);thresholdType=threshold&&threshold.type;if(!metricRawValue&&!metricValue){continue;}td=tr.insertCell(tr.cells.length);if(thresholdType===$EnumThresholdType.Url||thresholdType===$EnumThresholdType.Text){td.innerHTML="    "+metricRawValue+"    ";}else{td.innerHTML="    "+metricValue+"    ";}}}var tmp,infoHeaderIds=[];for(i=0;i<tbody.rows.length;i++){tmp=tbody.rows[i].innerText;if(infoHeaderIds.indexOf(tmp)>-1){tbody.rows[i].remove();i--;}else{infoHeaderIds.push(tmp);}}};while(!!table&&table.rows.length>0){table.deleteRow(table.rows.length-1);}if(!renderTableHeader(table)){return null;}renderTableBody(table);return div.innerHTML;},generateGridInfoObj:function generateGridInfoObj(dataRowIdxArr,geoColumnIndices){var me=this,infoContent={header:[],body:[],attrCount:0},data=this.data,dropZones=this.dropZones,rows=this.getDataRows(),rowHeaders=this.getDataRowHeaders(),colHeaders=this.getDataColHeaders(),numRowAttributes=rowHeaders&&rowHeaders.length>0?rowHeaders[0].items.length:0,numColAttributes=colHeaders&&colHeaders.length>0?colHeaders[0].items.length:0,renderTableHeader=function(){var infoHeader=infoContent.header,hasHeader=false,infoHeaderIds=[],cell,header,tui,i,idx;for(i=0;i<numRowAttributes;i++){if(me._canSkipItem(dropZones,i,geoColumnIndices)){continue;}if(infoHeaderIds.indexOf(rows[i].id)===-1){infoHeader.push(me.getAttributeName(i));infoHeaderIds.push(rows[i].id);}hasHeader=true;}infoContent.attrCount=infoHeader.length;for(i=0;i<numColAttributes;i++){if(me._canSkipMetricItem(dropZones,i)){continue;}cell=colHeaders[0].items[i];tui=cell.tui;idx=cell.idx;header=data.gts.col[tui].es[idx];infoHeader.push(header.n);hasHeader=true;}return hasHeader;},renderTableBody=function(){var infoBody=infoContent.body,numRows=dataRowIdxArr.length,metricValues=data.gvs.items,numMetrics=metricValues&&metricValues.length>0?metricValues[0].items.length:0,metricValueItem,metricValue,metricRawValue,row,threshold,thresholdType,rowIndex,rowHeaderItems,cell,i,j,k,idx,infoHeaderIds;for(i=0;i<numRows;i++){row=[];infoBody.push(row);rowIndex=dataRowIdxArr[i];rowHeaderItems=rowHeaders[rowIndex].items;infoHeaderIds=[];for(j=0;j<numRowAttributes;j++){if(me._canSkipItem(dropZones,j,geoColumnIndices)){continue;}cell=rowHeaderItems[j];if(!cell||cell.idx<0){row.push("");continue;}idx=cell.idx;if(infoHeaderIds.indexOf(rows[j].id)===-1){row.push(rows[j].es[idx].n);infoHeaderIds.push(rows[j].id);}else{row[row.length-1]=row[row.length-1]+" "+rows[j].es[idx].n;}}for(k=0;k<numMetrics;k++){if(me._canSkipMetricItem(dropZones,k)){continue;}metricValueItem=metricValues[rowIndex].items[k];metricValue=metricValueItem&&metricValueItem.v;metricRawValue=metricValueItem&&metricValueItem.rv;threshold=me.getThresholdInfo(rowIndex,k);thresholdType=threshold&&threshold.type;if(!metricRawValue&&!metricValue){continue;}row.push(metricValue);}}var tmp;infoHeaderIds=[];for(i=0;i<infoBody.length;i++){tmp=infoBody[i].toString();if(infoHeaderIds.indexOf(tmp)>-1){infoBody.splice(i,1);i--;}else{infoHeaderIds.push(tmp);}}};if(!renderTableHeader()){return infoContent;}renderTableBody();return infoContent;},getInfoWindowHTML:function getInfoWindowHTML(){if(this.infoTemplate&&this.infoTemplate.content){return this.infoTemplate.content;}else{return"";}},setInfoWindowHTML:function setInfoWindowHTML(value){this.infoTemplate.content=this.customInfoTemplateHTML=$MUTIL.removeHTMLTagsAndProps(value,allowedTags,allowedProps);},replaceInfoWindowHTMLMacros:function replaceInfoWindowHTMLMacros(input){var result="",baseIndex=0,startIndex=input.indexOf("${",baseIndex),endIndex=input.indexOf("}",startIndex+1),dataNameIDTable={},rows=this.getDataRows(),cols=this.getDataCols(),macroName,row,col,es,colElement,i,il,j,jl;for(i=0,il=rows.length;i<il;i++){row=rows[i];dataNameIDTable[$MUTIL.replaceSpace(row.n)]=row.id+"|"+row.fid;}for(i=0,il=cols.length;i<il;i++){col=cols[i];if(col.otp===-1){es=col.es;for(j=0,jl=es.length;j<jl;j++){colElement=es[j];dataNameIDTable[$MUTIL.replaceSpace(colElement.n)]=colElement.id;}break;}}while(startIndex>=0&&endIndex>startIndex){macroName=input.substring(startIndex+2,endIndex);var colonIndex=macroName.indexOf(":");if(colonIndex>=0){macroName=macroName.substring(0,colonIndex)+" "+macroName.substring(colonIndex+1);}macroName=$MUTIL.replaceSpace(macroName);if(dataNameIDTable.hasOwnProperty(macroName)){result+=input.substring(baseIndex,startIndex+2)+dataNameIDTable[macroName];}else{result+=input.substring(baseIndex,endIndex);}baseIndex=endIndex;startIndex=input.indexOf("${",baseIndex);endIndex=input.indexOf("}",startIndex+1);}result+=input.substring(baseIndex);return result;}});}());