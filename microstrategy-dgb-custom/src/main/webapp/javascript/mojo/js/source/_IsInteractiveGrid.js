(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.array","mstrmojo.hash","mstrmojo.StickySections","mstrmojo.VisTextTooltip","mstrmojo.VisChartUtils");var $D=mstrmojo.dom,$H=mstrmojo.hash,$A=mstrmojo.array,$THEMES=["white","black","transparent","gray"],SELECTED_ROW="ig-selected-row";var SELECTOR_ACTION=2;function isIGFullscreen(){return(this.isFullScreenWidget||!this.isDocXtab);}function getAncestorBgColor(widget){var bgColor=null,me=widget,docModel=me.model&&me.model.docModel,parent=me.gridData&&me.gridData.parent;if(parent&&docModel&&docModel.defn&&docModel.defn.layouts&&docModel.defn.layouts.length>0){var layouts=docModel.defn.layouts,layout;var i;for(i in layouts){if(layouts[i].loaded){layout=layouts[i];}}if(layout&&layout.hasOwnProperty("units")){var units=layout.units;while(parent){var pk=parent.k||null;if(units[pk]&&units[pk].fmts&&units[pk].fmts["background-color"]){bgColor=units[pk].fmts["background-color"];break;}else{parent=parent.parent||null;}}if(!bgColor){if(layout.fmts&&layout.fmts["background-color"]){bgColor=layout.fmts["background-color"];}}}}return bgColor;}function cleanUpMXVP(){var gd=this.gridData,chs=gd.ghs.chs;if(chs.items&&chs.items.length){var mx=gd.ghs.chs.items[0].items,vp=gd.vp,cols=vp.cols,cg=cols.cg,cws=cols.cws,cgc=cg.cgc,i,j,hasMx=false,remove=[];for(i=0;i<cgc;i++){var col=cg[i],mxCount=-1;$H.forEach(col,function(v,k){if(/[mMiIxX]([0-9])+$/.test(k)){for(j=0;j<mx.length;j++){if(mx[j].mix==v){col[k]=j;mxCount++;break;}}if(mx[col[k]]===undefined||j===mx.length){delete col[k];return ;}hasMx=true;}});if(hasMx){var lastEmpty=[];for(j=0;j<col.cl;j++){if(col["mix"+j]===undefined){lastEmpty.push(j);}else{if(lastEmpty.length>0){col["mix"+lastEmpty.splice(0,1)]=col["mix"+j];delete col["mix"+j];}}}col.cl=++mxCount;if(col.cl===0){remove.push(i);}}else{if(!col.attForms){remove.push(i);}}hasMx=false;}for(i=remove.length-1;i>=0;i--){delete cg[remove[i]];for(j=remove[i];j<cgc;j++){cg[j]=cg[j+1];}delete cg[j-1];cws.splice(remove[i],1);cg.cgc--;}}}function setupDefaultProps(){var DAF_DELIMITER=":",gd=this.gridData,gts=gd.gts,chs=gd.ghs.chs,row=gts.row,firstTitle=row[0],hasMetrics=gts.col&&gts.col.length>0,vp={bn:"0",gr:"0",ar:"1",ct:"1",daf:firstTitle.id+DAF_DELIMITER+firstTitle.fid,cols:{cws:[{w:"100"}],cg:{cgc:1}}},gdAxis=["row"],gdES=[gts.row],idx,len;if(hasMetrics){gdAxis=["row","col"];gdES=[gts.row,chs.items[0].items];vp.cols={cws:[{w:"50"},{w:"50"}],cg:{cgc:2}};}var cg=vp.cols.cg;for(idx=0,len=cg.cgc;idx<len;idx++){var axis=gdAxis[idx],i;cg[idx]={tg:true,cl:gdES[idx].length,cc:0,sh:true};if(axis==="col"){for(i=0;i<gdES[idx].length;i++){cg[idx]["mix"+i]=gdES[idx][i].mix;}}else{cg[idx].attForms=[];for(i=0;i<gdES[idx].length;i++){cg[idx].attForms[i]={idx:i,n:""};}}}this.gridData.vp=vp;}function findStackedCells(tr,trs){var c,i,iLen,cn,findTR=function(direction,row,collection){var j,jLen,r=row[direction+"Sibling"],cell;if(r){for(j=0,jLen=r.cells.length;j<jLen;j++){cell=r.cells[j];if((direction==="next"&&/stack-bottom-last/.test(cell.className))||(direction==="previous"&&/stack-top/.test(cell.className))){collection.push(r);return ;}}collection.push(r);findTR(direction,r,collection);}};trs.push(tr);for(i=0,iLen=tr.cells.length;i<iLen;i++){c=tr.cells[i];cn=c.className;if(/stack/.test(cn)){if(/stack-top/.test(cn)){findTR("next",tr,trs);break;}else{if(/stack-bottom-last/.test(cn)){findTR("previous",tr,trs);break;}else{if(/stack-middle|stack-bottom/.test(cn)){findTR("next",tr,trs);findTR("previous",tr,trs);break;}}}}}return trs;}function addSelection(rows){$A.forEach(rows,function(row){mstrmojo.css.addClass(row,SELECTED_ROW);});}function removeSelection(){var rows=$H.copy(document.getElementsByClassName(SELECTED_ROW));$A.forEach(rows,function(row){mstrmojo.css.removeClass(row,SELECTED_ROW);});}function handleAction(target){var td=$D.findAncestorByAttr(target,"ei",true,this.domNode),node=td&&td.node,cell=this.getCellForNode(node);if(node&&node.className.indexOf("iggroup")>0){return true;}if(this.isInteractiveGrid()&&this.igToggle(cell)){return true;}if(!cell){return true;}var isNullValue=!(cell&&cell._e&&cell._e.n);if($D.contains(this._BR,target)&&!isNullValue){removeSelection();if(this.isReselectedTD(cell)&&this.hasSelectAll(cell)){return false;}var row=$D.findAncestorByName(target,"tr",true);if($D.contains(this._BR,row)){addSelection(findStackedCells(row,[]));}}return false;}mstrmojo._IsInteractiveGrid=mstrmojo.provide("mstrmojo._IsInteractiveGrid",{_mixinName:"mstrmojo._IsInteractiveGrid",cssClass:"mstrmojo-InteractiveGrid",enableMagnifier:false,utils:mstrmojo.VisChartUtils,isTransparentTheme:false,ancesterBgColor:undefined,scrollerConfig:{scrollPast:false},isInteractiveGrid:function(){return(this.gridData.vp&&this.gridData.vp.cols)?true:false;},preBuildRendering:function preBuildRendering(){if(this.gridData.eg){return this._super();}if(!this.isInteractiveGrid()){setupDefaultProps.call(this);}cleanUpMXVP.call(this);var me=this,parent=this.parent,setProp=function(propName){me[propName]=me[propName]||((parent&&parent[propName])?parent[propName]:480);};setProp("height");setProp("width");var theme=isNaN(this.gridData.vp.ct)?1:parseInt(this.gridData.vp.ct,10);this.cssClass="mstrmojo-InteractiveGrid "+$THEMES[theme];if(theme===2){this.isTransparentTheme=true;this.ancesterBgColor=getAncestorBgColor(this);if(this.utils.isLightColor(this.ancesterBgColor)){this.cssClass+=" light";}else{this.cssClass+=" dark";}}this.scrollboxNodeOverflow="overflow:hidden;";var returnVal=(this._super?this._super():true);this.cssDefault=(this.cssDefault==="")?"r-cssDefault":"";return returnVal;},postBuildRendering:function pstBR(){if(this._super){this._super();}var gd=this.gridData,vp=gd&&gd.vp,gts=gd&&gd.gts,cws=gts&&gts.cws,stickySection=this.stickySections,groupNode;if(vp&&cws&&vp.gr==="1"&&cws.length>1){groupNode=stickySection&&stickySection.lastChild;if(groupNode){if(this.isTransparentTheme&&this.ancesterBgColor){groupNode.style.backgroundColor=this.ancesterBgColor;}else{if(vp.gb){var elementNode=groupNode.lastChild;if(elementNode){elementNode.style.cssText+="; background-color: #"+vp.gb+" !important";}}}}}},getKey:function getKey(){return this.gridData.k;},isReselectedTD:function isReselectedTD(cell){if(this.IGCurrentSelectedCell&&cell&&this.IGCurrentSelectedCell===cell){return true;}else{return false;}},hasSelectAll:function hasSelectAll(cell){var model=this.model,actionType=cell&&cell.at,MX="Metrics",shouldDeselectCurrentCell=false;if(actionType){if(actionType&SELECTOR_ACTION){var titleInfo=model.getCellTitleInfo(cell),title=titleInfo&&titleInfo.title,titleId=title&&title.id,selectorControlMap=model.scm;var sc=(titleId&&selectorControlMap[titleId])||selectorControlMap[MX];if(sc){var xtab=model.xtab;shouldDeselectCurrentCell=(xtab.allowToggleSelections&&sc.all);}}}return shouldDeselectCurrentCell;},renderChildren:function renderChildren(){this.prepareCWSCalculation();if(this._super){this._super();}this.createStickySections();var BR=this.zones._BR,hilitedCells=BR.hiliteCellsMap,rows={},trs=[];$H.forEach(hilitedCells,function(cell,key){$A.forEach(cell.pos,function(ro){BR.clearHilites(key);rows[ro.row]=ro.row;});});if(!$H.isEmpty(rows)){$H.forEach(rows,function(v){trs.push(BR.domNode.firstChild.rows[v]);});addSelection(findStackedCells(trs[0],[]));}},useDomToCalculateOffsets:function useDomToCalculateOffsets(){var cp=this.zones._BR.cp;if(cp&&(cp.groupEnabled||cp.stackLevels>1)){return true;}return(this._super||this._super())||false;},prepareCWSCalculation:function prepareCWSCalculation(){var fmts=this.getFormats&&this.getFormats(),width=(!isIGFullscreen.call(this))?parseInt(fmts.width,10):parseInt(this.width,10);this.zones._BR.cp.gridWidth=width;this.zones._TR.cp.gridWidth=width;},createStickySections:function createStickySections(){var gd=this.gridData,fmts=this.getFormats&&this.getFormats();if(this.isInteractiveGrid()&&(gd.vp.gr==="1"&&gd.gts.cws.length>1)){mstrmojo.requiresCls("mstrmojo.StickySections");var node=this._TR,slotName="stickySections";this.addSlots({stickySections:node});if(!this.ss){var cell=this.zones._BR.cp.getResolvedGroupHeader(0,0),cssClass="iggroup xtab-td",DPICONVERSION={132:-22,160:-27,213:-35,240:-40,320:-53},marginBottom=DPICONVERSION[mstrMobileApp.getDeviceDPI()]||-27,width=(!isIGFullscreen.call(this))?(parseInt(fmts.width,10)+"px"):"100%",cssText="width: "+width+";z-index: 2; position: relative;margin-bottom:"+marginBottom+"px;";this.ss=new mstrmojo.StickySections({currentSectionTitle:cell.n||cell.v,cssClass:cssClass,slot:slotName,cssText:cssText});this.addChildren(this.ss);}}},performActionForXtab:function performActionForXtab(touch){return handleAction.call(this,touch&&touch.target)||(this._super&&this._super(touch));},igToggle:function igToggle(cell){if(!this.isInteractiveGrid()||!cell){return false;}var e=cell&&cell._e,otp=(cell&&cell.otp)||(e&&e.otp);if(otp){var i,j,cols=this.gridData.vp.cols,cg=cols.cg,mix=cell.mix,OBJECT_TYPE_METRIC=4,OBJECT_TYPE_ATTR=12,adjCol=function(currentCol,colPos){var _return=false;if(currentCol.tg&&currentCol.cl>1){var cc=currentCol.cc,cur=currentCol.cc,start=0,end=currentCol.cl,diff=currentCol.cc=(++cur>=(end+start))?start:cur,colgroup=[this._TR.getElementsByTagName("COLGROUP")[0],this._BR.getElementsByTagName("COLGROUP")[0]];$A.forEach(colgroup,function(c){var wPx=c.childNodes[colPos+cc].style.width;c.childNodes[colPos+cc].style.width="0";c.childNodes[colPos+diff].style.width=wPx;});_return=true;}return _return;},currentCol,attFm,count=0,returnVal=false;if(cell&&cell.otp===OBJECT_TYPE_ATTR){for(i=0;i<cg.cgc;i++){currentCol=cg[i];attFm=currentCol.attForms;if(attFm){for(j=0;j<currentCol.cl;j++){if(attFm[j]&&(attFm[j].idx===(cell.ci||cell.ui))){returnVal=adjCol.call(this,currentCol,count);}}}count+=currentCol.tg?currentCol.cl:1;}}else{if(e&&e.otp===OBJECT_TYPE_METRIC){for(i=0;i<cg.cgc;i++){currentCol=cg[i];if(currentCol["mix"+currentCol.cc]===mix){returnVal=adjCol.call(this,currentCol,count);}count+=currentCol.tg?currentCol.cl:1;}}}return returnVal;}return false;},getHACP:function getHACP(){var hacp=(this.isInteractiveGrid())?new mstrmojo.InteractiveGridHACP():this._super();hacp.onDemandIF=!!(this.onDemandIF&&this.gridData.rw);return hacp;},onheightChange:function onheightChange(){if(isIGFullscreen.call(this)&&this.scrollboxNode){this.scrollboxNode.style.height=(parseInt(this.height,10)-this._TR.clientHeight)+"px";}if(this._super){this._super();}},onwidthChange:function onwidthChange(){if(isIGFullscreen.call(this)){var w=this.width;if(this.hasRendered){this.unrender();this.width=w;this.render();}}else{if(this._super){this._super();}}},defaultAction:function defaultAction(td,tCell){var _returnVal=false;if(this._super){_returnVal=this._super(td,tCell);}this.model.sti=null;return _returnVal;},onclick:function onclick(evt){},touchSelectBegin:function touchSelectBegin(touch){var tch=touch;var touchTd=mstrmojo.dom.findAncestorByName(touch.target,"td",true,this.domNode);var hasImg=this.hasImgTag(touchTd);var touchArea=mstrmojo.dom.findAncestorByAttr(touch.target,"trType",true,this.domNode);if(touchTd&&touchArea&&!hasImg){var textWidth=this.getTextWidth(touchTd,touchTd.className);if(textWidth>touchTd.offsetWidth-30){if(!this.visTextTooltip){var ph=document.createElement("div");this.domNode.appendChild(ph);this.visTextTooltip=new mstrmojo.VisTextTooltip({placeholder:ph,targetDiv:touchTd,boundary:this.domNode,touchAreaType:touchArea.value});this.visTextTooltip.render();this.visTextTooltip.updateContent(touchTd,touchArea.value,touchTd.innerText);}else{this.visTextTooltip.targetDiv=touchTd;this.visTextTooltip.touchAreaType=touchArea.value;this.visTextTooltip.updateContent(touchTd,touchArea.value,touchTd.innerText);}}}},touchSelectEnd:function touchSelectEnd(touch){var tch=touch;if(this.visTextTooltip&&this.visTextTooltip.domNode){this.visTextTooltip.toggle(false);}},hasImgTag:function hIT(touchTd){var child=touchTd&&touchTd.childNodes.length>0&&touchTd.childNodes[0];if(child&&child.nodeName.toLowerCase()==="div"){var grandChild=child.childNodes.length>0&&child.childNodes[0];if(grandChild&&grandChild.nodeName.toLowerCase()==="div"){var img=grandChild.childNodes.length>1&&grandChild.childNodes[1];if(img&&img.nodeName.toLowerCase()==="img"){return true;}}}return false;},getTextWidth:function gtw(dom,className,fontName,fontSize,fontSizeUnit,bold){var childNodes=dom.childNodes;var table=null,selfTextDom=null;if(childNodes.length>0&&childNodes[0].nodeName.toLowerCase()==="#text"){table=document.createElement("table");selfTextDom=document.createElement("td");table.appendChild(selfTextDom);}else{if(childNodes.length>0&&childNodes[0].nodeName.toLowerCase()==="span"){selfTextDom=document.createElement("span");selfTextDom.style="z-index:-10;visibility:hidden;-webkit-text-size-adjust: none;";}else{return -1;}}if(selfTextDom.className!==className||""){selfTextDom.className=className||"";}if(selfTextDom.style.fontFamily!==fontName||""){selfTextDom.style.fontFamily=fontName||"";}var fsUnit=fontSizeUnit||"pt";if(fontSize){selfTextDom.style.fontSize=fontSize+fsUnit;}else{selfTextDom.style.fontSize="";}if(bold){if(selfTextDom.style.fontWeight!=="bold"){selfTextDom.style.fontWeight="bold";}}else{if(selfTextDom.style.fontWeight!==""){selfTextDom.style.fontWeight="";}}selfTextDom.innerHTML=dom.innerText;var ret=-1;if(table){this.domNode.appendChild(table);ret=selfTextDom.offsetWidth-30;this.domNode.removeChild(table);}else{this.domNode.appendChild(selfTextDom);ret=selfTextDom.offsetWidth;this.domNode.removeChild(selfTextDom);}return ret;},unrender:function unrender(ignoreDom){if(this.visTextTooltip&&this.visTextTooltip.destroy){this.visTextTooltip.destroy();delete this.visTextTooltip;}var stickySection=this.ss;if(stickySection){this.removeChildren(stickySection,true);stickySection.destroy();delete this.ss;}this._super(ignoreDom);}});}());