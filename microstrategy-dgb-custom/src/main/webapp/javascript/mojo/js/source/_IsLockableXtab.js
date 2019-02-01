(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.XtabZone","mstrmojo.css","mstrmojo.hash","mstrmojo.dom");var LOCK_OFF=0,LOCK_ROW=1,LOCK_COL=2,LOCK_BOTH=3,LOCK_TYPE_SLOT={1:"_BL",2:"_TR",3:"_TL"},NO_VALUE_ROW=1,NO_VALUE_COL=2,PROPS={position:"absolute",overflow:"hidden",width:"auto"},PROPS_CLONE_CURTAIN={position:"absolute",top:0,left:0},$CSS=mstrmojo.css,$H=mstrmojo.hash,$D=mstrmojo.dom;function insertTbody(tableNode,tbody,idx,phase){if(phase){tableNode.replaceChild(tbody,tableNode.tBodies[idx]);}else{tableNode.appendChild(tbody);}}function InvalidaFstValueCell(context){context.offsetCellNode=null;context.fstValueCellValidation=null;}function getFstValueCellOffset(){var offset={x:0,y:0};if(this.lockHeadersCase&&!this.offsetCellNode&&!this.fstValueCellValidation){var dimension=this.titlesCP.getSpanDimension(),rc=dimension.nRow,cc=dimension.nCol,tableNode=this.scrollboxNode.firstChild.firstChild,offsetRowNode=tableNode&&tableNode.rows[rc];if(rc===0||cc===0){this.lockHeadersCase=LOCK_OFF;return null;}if(!tableNode.rows.length){return null;}if(!offsetRowNode){this.fstValueCellValidation|=NO_VALUE_ROW;this.lockHeadersCase&=NO_VALUE_ROW;offsetRowNode=tableNode.rows[0];}var offsetRowCells=offsetRowNode&&offsetRowNode.cells,len=(offsetRowCells&&offsetRowCells.length)||0,offsetCellNode,i,count;for(i=count=0;i<len&&count<cc;i++){count+=offsetRowCells[i].colSpan||1;}offsetCellNode=offsetRowCells&&offsetRowCells[i];if(!offsetCellNode){this.fstValueCellValidation|=NO_VALUE_COL;this.lockHeadersCase&=NO_VALUE_COL;this.offsetCellNode=offsetRowCells&&offsetRowCells[0];}else{this.offsetCellNode=offsetCellNode;}var me=this;var adjustClip=function(){me._adjustClipSize();};var setOnLoadForImages=function(node,numHeader){var i,j,imgElements,imgChild;for(i=0;i<numHeader;i++){imgElements=node.rows[i].getElementsByTagName("img");for(j=0;j<imgElements.length;j++){imgChild=imgElements[j];imgChild.onload=adjustClip;imgChild.onerror=adjustClip;}}};setOnLoadForImages(tableNode,rc||0);}if(this.lockHeadersCase){var pe=$D.position(this.offsetCellNode),pr=$D.position(this.scrollboxNode.firstChild);offset.x=pe.x-pr.x;offset.y=pe.y-pr.y;}return offset;}function savePageToFragment(tbody,idx,phase,bFilled){if(this.parent.isAutoTableLayout()&&this.isRendered()){if(!this.fragment){this.fragment=document.createDocumentFragment();}if(bFilled){var t=tbody.cloneNode(true);if(!this.renderedPages){initRenderedPages.call(this);}if(phase&&this.renderedPages[idx]){var page=this.renderedPages[idx],tableNode=this.getTableNode();if(page.parentNode===tableNode){tableNode.replaceChild(t,page);}else{this.fragment.replaceChild(t,page);}}else{this.fragment.appendChild(t);}this.renderedPages[idx]=t;}}}function isRectEqual(rect1,rect2){for(var prop in rect1){if(rect1[prop]!=rect2[prop]){return false;}}return true;}function appendFragment(){var fragment=this.fragment,tbody,tbodyIdx,i;if(fragment&&fragment.childNodes.length>0&&this.isRendered()){var tableNode=this.getTableNode();if(this.parent.isOutlineMode){while(fragment.childNodes.length>0){tbody=fragment.childNodes[0];tbodyIdx=parseInt(tbody.getAttribute("n"),10);if(tableNode.tBodies[tbodyIdx]){tableNode.replaceChild(tbody,tableNode.tBodies[tbodyIdx]);}else{tableNode.appendChild(tbody);}}}else{tableNode.appendChild(fragment);}}}function cellHoverMgrSupport(){var xtabClonedNodes=this.xtabClonedNodes,cellHoverMgr=this.cellHoverMgr,xtabCN,isRendered,idx,zk;if(!cellHoverMgr){return ;}for(idx in xtabClonedNodes){xtabCN=xtabClonedNodes[idx];zk=xtabCN.getID();isRendered=xtabCN.isRendered();if(!this.zones[zk]&&isRendered){this.zones[zk]={tableNode:xtabCN.getTableNode()};if(typeof (cellHoverMgr)!="string"){cellHoverMgr.addMgrElement(zk);}}}}function addClonedTableNodeToZone(lockType,tableNode){var p=this.parent,z=p&&p.zone;if(tableNode&&z&&z.addCoverTable){z.addCoverTable(lockType,tableNode);}}function setCurtainNodeSize(props,clipRect,maxSize){props.width=((maxSize&&maxSize.width<clipRect.right)?maxSize.width:clipRect.right)+"px";props.height=((maxSize&&maxSize.height<clipRect.bottom)?maxSize.height:clipRect.bottom)+"px";}function initRenderedPages(){this.renderedPages={};var table=this.getTableNode(),tbodies=table.tBodies,fragment=this.fragment,fragChildren=fragment&&fragment.children,renderedPages=this.renderedPages,len,i,saveTbody=function(tbody){var n=tbody.getAttribute("n")||0;renderedPages[n]=tbody;};for(i=0,len=tbodies.length;i<len;++i){saveTbody(tbodies[i]);}for(i=0,len=(fragChildren&&fragChildren.length)||0;i<len;++i){saveTbody(fragChildren[i]);}}function replaceTDNode(pos,tbody,node){var tr=tbody&&tbody.rows[pos.row],td=tr&&tr.cells[pos.cell];if(td&&node!==td){tr.replaceChild(node.cloneNode(true),td);}}function onCellUpdatedWithFragment(pos,node){if(this.isRendered()){if(!this.renderedPages){initRenderedPages.call(this);}replaceTDNode(pos,this.renderedPages[pos.page||0],node);}}mstrmojo.XtabZoneWithClonedCover=mstrmojo.declare(mstrmojo.XtabZone,null,{scriptClass:"mstrmojo.XtabZoneWithClonedCover",isAutoTBLayout:null,addCoverTable:function addCoverTable(type,node){if(!this.coverTableNodes){this.coverTableNodes={};}this.coverTableNodes[LOCK_TYPE_SLOT[type]]=node;},getClonedNodesByPositions:function getClonedNodesByPositions(pos){var coverTableNodes=this.coverTableNodes,_TL=coverTableNodes&&coverTableNodes[LOCK_TYPE_SLOT[LOCK_BOTH]],_TR=coverTableNodes&&coverTableNodes[LOCK_TYPE_SLOT[LOCK_COL]],_BL=coverTableNodes&&coverTableNodes[LOCK_TYPE_SLOT[LOCK_ROW]],tnpz=[_TL,_TR,_BL],ps,cell,arr=[],getCellByPos=function(node,pos){var tbody=node&&node.tBodies[pos.page||0],row=tbody&&tbody.rows[pos.row];return row&&row.cells[pos.cell];};for(var i in pos){ps=pos[i];if(ps.page&&_BL){cell=getCellByPos(_BL,ps);cell&&arr.push(cell);}else{for(var idx in tnpz){if(tnpz[idx]){cell=getCellByPos(tnpz[idx],ps);cell&&arr.push(cell);}}}}return arr;},setHilites:function setHilites(key,node){var ei=node.getAttribute("ei"),pos=this.eiMap[ei]||(this.posMap[ei]&&[this.posMap[ei]])||[],hiliteCellsMap=this.hiliteCellsMap,p=this.parent,nodes=this.getNodesByPositions(pos),hiliteNode=function(node){$CSS.addClass(node,"sc_"+p.k);};if(!hiliteCellsMap[key]){hiliteCellsMap[key]={pos:[],nodes:[]};}if(!nodes.length){hiliteNode(node);hiliteCellsMap[key].nodes.push(node);}else{if(pos.length!==0){var clonedNodes=this.getClonedNodesByPositions(pos),mapPos=hiliteCellsMap[key].pos;nodes=clonedNodes.concat(nodes);for(var i in nodes){hiliteNode(nodes[i]);}hiliteCellsMap[key].pos=mapPos.concat(pos);}}},clearHilites:function clearHilites(key){var hc=this.hiliteCellsMap[key],ns=hc&&hc.nodes,pos=(ns&&ns.length===0&&hc.pos)||[],p=this.parent;if(pos.length!==0){ns=this.getNodesByPositions(pos);ns=ns.concat(this.getClonedNodesByPositions(pos));}for(var i in ns){$CSS.removeClass(ns[i],"sc_"+p.k);}this.hiliteCellsMap[key]={nodes:[],pos:[]};},isAutoTableLayout:function isAutoTableLayout(){if(this.isAutoTBLayout===null&&this.tableNode){this.isAutoTBLayout=(this.tableNode.style.tableLayout!=="fixed");}return this.isAutoTBLayout;},unrender:function unrender(ignoreDom){this.coverTableNodes={};this.isAutoTBLayout=null;this._super(ignoreDom);}});mstrmojo.XtabClonedNode=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.XtabClonedNode",domNode:null,left:0,top:0,lockType:LOCK_OFF,scrollDM:mstrmojo.emptyFn,refreshNode:mstrmojo.emptyFn,createDomNode:function createDomNode(){var fragment=this._getClonedFragment();this.containerNode.appendChild(fragment);addClonedTableNodeToZone.call(this,this.lockType,this.getTableNode());},getID:function getID(){return this.id;},getTableSize:function getTableSize(){var table=this.parent.zone.tableNode,dimProp=this.parent.hasCustomScrollbar?"offset":"client";return{width:table[dimProp+"Width"],height:table[dimProp+"Height"]};},isRendered:function isRendered(){return !!this.domNode;},getTableNode:function getTableNode(){return this.isRendered()?this.domNode.firstChild.firstChild:null;},destroy:function destroy(ignoreDom){if(this.isRendered()){this.unrender(true);}this._super(ignoreDom);},unrender:function unrender(ignoreDom){this.domNode=null;this.lastClipRect=null;this._super&&this._super(ignoreDom);},insertPage:function insertPage(tbody,idx,phase,bFilled){if(this.isRendered()){insertTbody(this.getTableNode(),tbody.cloneNode(true),idx,phase);}},_getClipStr:function _getClipStr(clipRect){this.lastClipRect=clipRect;return"rect("+clipRect.top+"px, "+clipRect.right+"px, "+clipRect.bottom+"px, "+clipRect.left+"px)";},adjustClip:function adjustClip(offset){var clipRect=this._getClipRect&&this._getClipRect(offset);if(this.isRendered()){if(this.getTableNode().offsetHeight>this.domNode.offsetHeight){this.domNode.style.height=this.getTableNode().offsetHeight+"px";}if(clipRect&&!(this.lastClipRect&&isRectEqual(clipRect,this.lastClipRect))){this.domNode.style.clip=this._getClipStr(clipRect);var props={};setCurtainNodeSize(props,clipRect,this.getTableSize());$H.copy(props,this.curtainNode.style);}}this.offset=offset;}});mstrmojo.XtabClonedRowHeader=mstrmojo.declare(mstrmojo.XtabClonedNode,null,{scriptClass:"mstrmojo.XtabClonedRowHeader",lockType:LOCK_ROW,interactiveCellsArray:[],interactivePosArray:[],dicGroupKey:[],init:function init(props){this._super(props);if((this.lockHeadersCase&LOCK_ROW)&&this.left){this.createDomNode();}},_getClipRect:function _getClipRect(offset){var dimProp=this.parent.hasCustomScrollbar?"offset":"client";offset=offset||this.offset;return{top:0,right:offset.x||0,bottom:this.toCloneNode[dimProp+"Height"],left:0};},_clearLocalData:function _clearLocalData(){this.interactiveCellsArray=[];this.interactivePosArray=[];this.dicGroupKey=[];},_getClonedFragment:function _getClonedFragment(){var fragment=document.createDocumentFragment(),node=this.toCloneNode.cloneNode(true),curtainNode=document.createElement("div"),props=$H.clone(PROPS),curtainNodeProps=$H.clone(PROPS_CLONE_CURTAIN),clipRect=this._getClipRect();props.clip=this._getClipStr(clipRect);props.zIndex=2;if(this.parent.zone&&this.parent.zone.autoFitWindow){props.width="100%";}props.overflowY="hidden";node.id=this.getID();$H.copy(props,node.style);$H.copy({top:-this.top+"px"},node.firstChild.style);this.domNode=node;setCurtainNodeSize(curtainNodeProps,clipRect,this.getTableSize());curtainNodeProps.zIndex=1;$H.copy(curtainNodeProps,curtainNode.style);this.curtainNode=curtainNode;fragment.appendChild(node);fragment.appendChild(curtainNode);return fragment;},scrollDM:function scrollDM(left,top,nodeToClip){var shouldClipLockableXtab=this.parent.shouldClipLockableXtab,clipRect;if(this.lockHeadersCase&LOCK_ROW){if(!this.isRendered()){this.top=top;this.createDomNode();this.domNode.style.width="100%";this.domNode.style.height="100%";var me=this;setTimeout(function(){me._updateDICGroup();},10);}else{var childNodeToClip=this.domNode.firstChild,childNodeStyle=childNodeToClip.style;childNodeStyle.top=-top+"px";this.top=top;if(shouldClipLockableXtab){if(childNodeStyle.position!=="absolute"){childNodeStyle.position="absolute";childNodeStyle.width="100%";}if(this.lockHeadersCase&LOCK_COL){clipRect={top:this.offset.y+top,right:this.offset.x,bottom:childNodeToClip.offsetHeight,left:0};childNodeStyle.clip=this._getClipStr(clipRect);}}}if(shouldClipLockableXtab&&this.isRendered()){var tableNode=this.getTableNode();clipRect={top:0,right:Math.max(tableNode.offsetWidth,nodeToClip.offsetWidth),bottom:Math.max(tableNode.offsetHeight,nodeToClip.offsetHeight),left:this.offset.x+left};var nodeToClipStyle=nodeToClip.style,nodeToClipParentStyle=nodeToClip.parentNode.style;if(nodeToClipStyle.position!=="absolute"){if(isNaN(parseInt(nodeToClipParentStyle.width,10))){nodeToClipParentStyle.width=nodeToClip.parentNode.offsetWidth+"px";}if(isNaN(parseInt(nodeToClipParentStyle.height,10))){nodeToClipParentStyle.height=nodeToClip.parentNode.offsetHeight+"px";}nodeToClipStyle.position="absolute";nodeToClipStyle.width="100%";if(isNaN(parseInt(nodeToClipParentStyle.width,10))){nodeToClipParentStyle.width=clipRect.right+"px";}}nodeToClipStyle.clip=this._getClipStr(clipRect);}}},_updateDICGroup:function _updateDICGroup(){var p=this.parent;if(this.interactivePosArray.length&&this.interactiveCellsArray.length){p.destroyDICGroup(this.dicGroupKey);p.configureCellsAction(this.interactiveCellsArray,0,this.interactivePosArray,true);}this._clearLocalData();},addTempDICInfo:function addTempDICInfo(cell,pos){if(!this.isRendered()){this.interactiveCellsArray.push(cell);this.interactivePosArray.push(pos);}},addGroupKey:function addGroupKey(gk){if(!this.isRendered()){this.dicGroupKey.push(gk);}},onCellUpdated:function onCellUpdated(pos,node){if(this.isRendered()){var tn=this.getTableNode(),tb=tn&&tn.tBodies[pos.page||0],tr=tb&&tb.rows[pos.row],td=tr&&tr.cells[pos.cell];if(td&&node!==td){tr.replaceChild(node.cloneNode(true),td);}}},unrender:function unrender(ignoreDom){this._clearLocalData();this._super&&this._super(ignoreDom);}});mstrmojo.XtabClonedColHeader=mstrmojo.declare(mstrmojo.XtabClonedNode,null,{scriptClass:"mstrmojo.XtabClonedColHeader",lockType:LOCK_COL,init:function init(props){this._super(props);if(this.lockHeadersCase&LOCK_COL){this.createDomNode();}},_getClipRect:function _getClipRect(offset){var dimProp=this.parent.hasCustomScrollbar?"offset":"client";offset=offset||this.offset;return{top:0,right:this.toCloneNode[dimProp+"Width"],bottom:offset.y||0,left:0};},_getClonedFragment:function _getClonedFragment(){var fragment=document.createDocumentFragment(),node=this.toCloneNode.cloneNode(true),curtainNode=document.createElement("div"),props=$H.clone(PROPS),curtainNodeProps=$H.clone(PROPS_CLONE_CURTAIN),clipRect=this._getClipRect();props.clip=this._getClipStr(clipRect);props.zIndex=4;if(this.parent.zone&&this.parent.zone.autoFitWindow){props.width="100%";}node.id=this.getID();$H.copy(props,node.style);$H.copy({left:-this.left+"px"},node.firstChild.style);this.domNode=node;setCurtainNodeSize(curtainNodeProps,clipRect,this.getTableSize());curtainNodeProps.zIndex=3;$H.copy(curtainNodeProps,curtainNode.style);this.curtainNode=curtainNode;fragment.appendChild(node);fragment.appendChild(curtainNode);return fragment;},scrollDM:function scrollDM(left,top,nodeToClip){var shouldClipLockableXtab=this.parent.shouldClipLockableXtab,clipRect;if(this.lockHeadersCase&LOCK_COL){var tableNode=this.getTableNode();var childNodeToClip=this.domNode.firstChild,childNodeStyle=childNodeToClip.style;this.domNode.style.width="100%";this.domNode.style.height="100%";childNodeStyle.left=-left+"px";this.left=left;if(shouldClipLockableXtab){if(childNodeStyle.position!=="absolute"){childNodeStyle.position="absolute";childNodeStyle.width="100%";}if(this.lockHeadersCase&LOCK_ROW){clipRect=this._getClipRect();clipRect.left=left+this.offset.x;clipRect.right=Math.max(childNodeToClip.offsetWidth,tableNode.offsetWidth);childNodeStyle.clip=this._getClipStr(clipRect);}}if(shouldClipLockableXtab){clipRect={top:this.offset.y+nodeToClip.parentElement.scrollTop,right:Math.max(tableNode.offsetWidth,nodeToClip.offsetWidth),bottom:Math.max(tableNode.offsetHeight,nodeToClip.offsetHeight),left:0};if(this.lockHeadersCase&LOCK_ROW){clipRect.left=this.offset.x+left;}var nodeToClipStyle=nodeToClip.style,nodeToClipParentStyle=nodeToClip.parentNode.style;if(nodeToClipStyle.position!=="absolute"){if(isNaN(parseInt(nodeToClipParentStyle.width,10))){nodeToClipParentStyle.width=nodeToClip.parentNode.offsetWidth+"px";}if(isNaN(parseInt(nodeToClipParentStyle.height,10))){nodeToClipParentStyle.height=nodeToClip.parentNode.offsetHeight+"px";}nodeToClipStyle.position="absolute";nodeToClipStyle.width="100%";if(isNaN(parseInt(nodeToClipParentStyle.width,10))){nodeToClipParentStyle.width=tableNode.offsetWidth+"px";}}nodeToClipStyle.clip=this._getClipStr(clipRect);}}},insertPage:savePageToFragment,refreshNode:appendFragment,onCellUpdated:onCellUpdatedWithFragment,unrender:function unrender(ignoreDom){this._super(ignoreDom);this.fragment=null;this.renderedPages=null;}});mstrmojo.XtabClonedTitle=mstrmojo.declare(mstrmojo.XtabClonedNode,null,{scriptClass:"mstrmojo.XtabClonedTitle",_getClipRect:function _getClipRect(offset){offset=offset||this.offset;return{top:0,right:offset.x||0,bottom:offset.y||0,left:0};},init:function init(props){this._super(props);if(this.lockHeadersCase===LOCK_BOTH&&this.left){this.createDomNode();}},_getClonedFragment:function _getClonedFragment(){var fragment=document.createDocumentFragment(),node=this.toCloneNode.cloneNode(true),curtainNode=document.createElement("div"),props=$H.clone(PROPS),curtainNodeProps=$H.copy(PROPS_CLONE_CURTAIN),clipRect=this._getClipRect();props.clip=this._getClipStr(clipRect);props.zIndex=6;if(this.parent.zone&&this.parent.zone.autoFitWindow){props.width="100%";}$H.copy(props,node.style);node.firstChild.style.left=0;node.id=this.getID();this.domNode=node;setCurtainNodeSize(curtainNodeProps,clipRect,this.getTableSize());curtainNodeProps.zIndex=5;$H.copy(curtainNodeProps,curtainNode.style);this.curtainNode=curtainNode;fragment.appendChild(node);fragment.appendChild(curtainNode);return fragment;},scrollDM:function scrollDM(left,top,nodeToClip){if(this.lockHeadersCase===LOCK_BOTH&&!this.isRendered()){this.createDomNode();this.domNode.style.width="100%";this.domNode.style.height="100%";}if(this.parent.shouldClipLockableXtab&&this.isRendered()){var childStyle=this.domNode.firstChild.style;if(childStyle.position!=="absolute"){childStyle.position="absolute";childStyle.width="100%";}childStyle.clip=this._getClipStr(this._getClipRect());}},insertPage:savePageToFragment,refreshNode:appendFragment,onCellUpdated:onCellUpdatedWithFragment,unrender:function unrender(ignoreDom){this._super(ignoreDom);this.fragment=null;this.renderedPages=null;}});mstrmojo._IsLockableXtab={_mixinName:"mstrmojo._IsLockableXtab",initLock:function initLock(props){var offset=getFstValueCellOffset.call(this),toCloneNode=this.scrollboxNode;if(this.lockHeadersCase&&toCloneNode&&offset){var fragment=document.createElement("div"),ps=$H.copy(props,{containerNode:fragment,toCloneNode:toCloneNode,offset:offset,lockHeadersCase:this.lockHeadersCase,parent:this});if(!this.xtabClonedNodes){this.xtabClonedNodes=[];}if(this.lockHeadersCase&LOCK_ROW){if(!this.clonedRowHeader){this.clonedRowHeader=this.addDisposable(new mstrmojo.XtabClonedRowHeader(ps));this.xtabClonedNodes.push(this.clonedRowHeader);}}if(this.lockHeadersCase&LOCK_COL){if(!this.clonedColHeader){this.clonedColHeader=this.addDisposable(new mstrmojo.XtabClonedColHeader(ps));this.xtabClonedNodes.push(this.clonedColHeader);}}if(this.lockHeadersCase===LOCK_BOTH){if(!this.clonedTitle){var colHeader=this.clonedColHeader,dm=colHeader.domNode,fg=colHeader.fragment;ps.toCloneNode=dm||ps.toCloneNode;ps.fragment=fg&&fg.cloneNode();this.clonedTitle=this.addDisposable(new mstrmojo.XtabClonedTitle(ps));this.xtabClonedNodes.push(this.clonedTitle);}}var dimProp=this.hasCustomScrollbar?"offset":"client",styleProps={top:0,left:0,position:"absolute",overflow:"hidden",width:toCloneNode[dimProp+"Width"]+"px",height:toCloneNode[dimProp+"Height"]+"px"};$H.copy(styleProps,fragment.style);this.tableContainerNode.appendChild(fragment);this.lockFragment=fragment;cellHoverMgrSupport.call(this);}},getColClonedZone:function getColClonedZone(){return this.clonedColHeader&&this.clonedColHeader.domNode.firstChild;},createZone:function createZone(cfg){return new mstrmojo.XtabZoneWithClonedCover(cfg||{});},getStickedTableNodes:function getStickedTableNodes(){var xtabClonedNodes=this.xtabClonedNodes,tableNodes=[];if(xtabClonedNodes instanceof Array){for(var idx in xtabClonedNodes){var clonedNode=xtabClonedNodes[idx];if(clonedNode.isRendered()){tableNodes.push(clonedNode.getTableNode());}}}return tableNodes;},_adjustClipSize:function _adjustClipSize(){if(this.lockHeadersCase){var xtabClonedNodes=this.xtabClonedNodes;if(xtabClonedNodes&&xtabClonedNodes.length){var offset=getFstValueCellOffset.call(this);this.lockFragment.style.width=(this.hasCustomScrollbar?parseInt(this.scrollboxNode.style.width,10):this.scrollboxNode.clientWidth)+"px";this.lockFragment.style.height=this.scrollboxNode.clientHeight+"px";for(var idx in xtabClonedNodes){xtabClonedNodes[idx].adjustClip(offset);}}}},_refreshClonedNodes:function _refreshClonedNodes(){var xtabClonedNodes=this.xtabClonedNodes,tableNode=this.scrollboxNode.firstChild.firstChild,rc=this.titlesCP.getSpanDimension().nRow,row=tableNode&&(tableNode.rows[rc]||tableNode.rows[0]),cells=row&&row.cells,len=cells&&cells.length,cellsRBOffsetLeft=[],isChanged=!this.lastCellsRBOffsetLeft,idx;for(idx=0;idx<len;++idx){var offsetWidth=cells[idx].offsetWidth;cellsRBOffsetLeft.push(offsetWidth);if(!isChanged){isChanged=(this.lastCellsRBOffsetLeft[idx]!=offsetWidth);}}this.lastCellsRBOffsetLeft=cellsRBOffsetLeft;if(isChanged){for(idx in xtabClonedNodes){xtabClonedNodes[idx].refreshNode();}this._adjustClipSize();this.alignLockNodes(this.scrollboxLeft,this.scrollboxTop);}else{this._adjustClipSize();}},alignLockNodes:function alignLockNodes(left,top){var xtabClonedNodes=this.xtabClonedNodes;if(xtabClonedNodes&&xtabClonedNodes.length){for(var idx in xtabClonedNodes){xtabClonedNodes[idx].scrollDM(left,top,this.scrollboxNode.firstChild);}cellHoverMgrSupport.call(this);}},isAutoTableLayout:function isAutoTableLayout(){return this.zone.isAutoTableLayout();},onPageRendered:function onPageRendered(tbody,idx,phase,bFilled){this._super&&this._super(tbody,idx,phase,bFilled);if(phase&&idx===0){InvalidaFstValueCell(this);}var xtabClonedNodes=this.xtabClonedNodes;if(xtabClonedNodes&&xtabClonedNodes.length){for(var nIdx in xtabClonedNodes){xtabClonedNodes[nIdx].insertPage(tbody,idx,phase,bFilled);}}},gridPagesRendered:function gridPagesRendered(){this._super&&this._super();if(!this.lockHeadersCase){return ;}if(!this.xtabClonedNodes){this.initLock();}else{if(this.isAutoTableLayout()){this._refreshClonedNodes();}}},onCellUpdated:function onCellUpdated(cell,node){var z=this.zone,pos=z.posMap[cell._ei],tb=z.tableNode.tBodies[pos.page||0],xtabClonedNodes=this.xtabClonedNodes;replaceTDNode(pos,tb,node);for(idx in xtabClonedNodes){xtabClonedNodes[idx].onCellUpdated(pos,node);}if(this.isAutoTableLayout()){this._refreshClonedNodes();}},unrender:function unrender(ignoreDom){var xtabClonedNodes=this.xtabClonedNodes,idx;if(xtabClonedNodes&&xtabClonedNodes.length){for(idx in xtabClonedNodes){xtabClonedNodes[idx].unrender(true);}}this.zones=null;InvalidaFstValueCell(this);this.lockFragment=null;this.xtabClonedNodes=null;this.clonedColHeader=null;this.clonedRowHeader=null;this.clonedTitle=null;this.lastCellsRBOffsetLeft=null;this._super(ignoreDom);}};})();