(function(){mstrmojo.requiresCls("mstrmojo.vi.ui.rw.Xtab","mstrmojo.vi.ui._CustomSortXtabCellHoverMgr","mstrmojo.vi.ui.rw.CustomSortAvatar");mstrmojo.requiresClsP("mstrmojo","array","dom","css");var $ARR=mstrmojo.array,$DOM=mstrmojo.dom,$HASH=mstrmojo.hash,$CSS=mstrmojo.css;function getSortAction(movedNode,toNode,before,flag){var movedCell=this.getCellForNode(movedNode),toCell=toNode&&this.getCellForNode(toNode);return{e:movedCell._e.id,rele:toCell&&toCell._e&&toCell._e.id,before:before,flag:flag?1:0};}mstrmojo.vi.ui.rw.CustomSortXtab=mstrmojo.declare(mstrmojo.vi.ui.rw.Xtab,null,{scriptClass:"mstrmojo.vi.ui.rw.CustomSortXtab",cssClass:"mstrmojo-CustomSortXtab",cellHoverMgr:"mstrmojo.vi.ui._CustomSortXtabCellHoverMgr",isCustomSort:true,selCells:null,appliedSortActions:null,cachedSortActions:null,init:function init(props){this.appliedSortActions=[];this.cachedSortActions=[];this._super(props);},getAppliedSortActions:function getAppliedSortActions(){return $HASH.clone(this.appliedSortActions);},getAllSortActions:function getAllSortActions(){var appliedSortActions=$HASH.clone(this.appliedSortActions),cachedSortActions=$HASH.clone(this.cachedSortActions);return appliedSortActions.concat(cachedSortActions);},scrolled:function scrolled(){var scrollboxNode=this.scrollboxNode,zoneNode=this.zone&&this.zone.domNode;if(scrollboxNode&&zoneNode){return $DOM.position(scrollboxNode).y!==$DOM.position(zoneNode).y;}},validCustomSortTgtRow:function validCustomSortTgtRow(tgtRow){var movingRow=$DOM.findAncestorByName(this.selCells&&this.selCells[0],"tr",true,this.zone.tableNode),tgtRowIndex=tgtRow&&tgtRow.rowIndex,movingRowIndex=movingRow&&movingRow.rowIndex;if(tgtRowIndex===undefined||movingRowIndex===undefined){return false;}return !(tgtRowIndex===0&&this.scrolled()||movingRowIndex===tgtRowIndex||movingRowIndex===tgtRowIndex+1);},getRelElementInfo:function getRelElementInfo(target){var before,relEle;if($DOM.checkTagName(target,"td")){var tr=$DOM.findAncestorByName(target,"tr"),table=$DOM.findAncestorByName(tr,"table"),isFirst=tr.rowIndex===0,isLast=tr.rowIndex===table.rows.length-1,cell=this.getCellForNode(target);if(isFirst){before=false;}else{if(isLast){before=true;}else{before=cell.hcd&&!cell.epd;}}if(isFirst||isLast){relEle=null;}else{relEle=before?table.getElementsByTagName("tr")[tr.rowIndex+1].cells[target.cellIndex]:target;}}return{before:before,relEle:relEle};},getActionMgr:function getActionMgr(){var csDisplayPanel=this.getCSDisplayPanel(),actionMgr=csDisplayPanel&&csDisplayPanel.actionMgr;return actionMgr;},getCSDisplayPanel:function getCSDisplayPanel(){return this.parent.parent.parent;},delegateToActionMgr:function delegateToActionMgr(updateTemplateActions,callback,extras,config){var actionMgr=this.getActionMgr(),amAction=actionMgr.wrapUnsilentAction($ARR.ensureArray(updateTemplateActions),callback,extras,config);actionMgr.execute(amAction);},onclick:function onclick(evt){var target=evt.getTarget&&evt.getTarget(),e=evt.e,rmc=e.button===2||$DOM.isMac()&&$DOM.ctrlKey(evt.hWin,e)&&e.button===0;if(!target||rmc){return ;}var isSorting=this.isSorting(),td=$DOM.checkTagName(target,"td")?target:$DOM.findAncestorByName(target,"td");if(target.hasAttribute("rabtn")&&!isSorting){this._super(evt);}else{if(td&&td.classList.contains("xtab-td")){var selCells=this.selCells||[],tgtRow=$DOM.findAncestorByName(td,"tr"),me=this;if(isSorting){if(this.validCustomSortTgtRow(tgtRow)){$ARR.forEach(selCells,function(cell){me.handleSelection({},null,cell);me.clearHighlights();var relEleInfo=me.getRelElementInfo(td),actionMgr=me.getActionMgr(),utSortAction=getSortAction.call(me,cell,relEleInfo.relEle,relEleInfo.before,0),sortAction=actionMgr.wrapCustomSortAction(utSortAction,cell,relEleInfo.relEle);actionMgr.execute(sortAction);});this.cellHoverMgr.toggleCueDisplay(false);this.toggleSortingStatus(false);}}else{if(tgtRow.rowIndex>0){this.resetRAcellsHighlight();this.handleSelection(evt.e,evt.hWin,td);var hightlightCells=[];$ARR.forEach(tgtRow&&tgtRow.children,function(node){if($DOM.checkTagName(node,"td")){hightlightCells.push(node);}});this.highlightCells(hightlightCells);this.toggleSortingStatus(true,td);}}}}},isSorting:function isSorting(){return(this.selCells||[]).length>0;},cancelSortingSelection:function cancelSortingSelection(){var selCells=this.selCells||[],me=this;$ARR.forEach(selCells,function(cell){me.handleSelection({},null,cell);me.clearHighlights();});this.cellHoverMgr.toggleCueDisplay(false);this.toggleSortingStatus(false);},handleSelection:function handleSelection(e,hWin,target){var td=$DOM.findAncestorByName(target,"td",true,this.viewport);if(td){var SEL_CLASS_STRING="xtabSel",selCells=$ARR.filter(this.selCells,function(cell){return cell!==td;}),selected=selCells.length<(this.selCells||[]).length;$CSS.toggleClass(td,SEL_CLASS_STRING,!selected);if(selected){this.selCells=selCells;}else{this.selCells=this.selCells||[];this.selCells.push(td);}}},toggleSortingStatus:function toggleSortingStatus(sorting,node){this.toggleSortingClass(sorting);this.toggleAvatar(sorting,node);},toggleSortingClass:function toggleSortingClass(sorting){$CSS.toggleClass(this.domNode,"sorting",sorting);},toggleAvatar:function toggleAvatar(sorting,node){var csAvatar=this.csAvatar,me=this;if(sorting){if(!csAvatar){csAvatar=this.csAvatar=new mstrmojo.vi.ui.rw.CustomSortAvatar({zIndex:30,onclick:function(evt){var target=evt.getTarget&&evt.getTarget(),classList=target&&target.classList;if(classList.contains("icon")&&classList.contains("close")){me.cancelSortingSelection();this.close();}}});this.addDisposable(csAvatar);}var cell=this.getCellForNode(node),boxPos=$DOM.position(this.parent.domNode),pos=$DOM.position(this.zone.tableNode),top=boxPos.y+14,left=pos.x+pos.w+14,AVATAR_WIDTH=168;if(left+AVATAR_WIDTH>boxPos.x+boxPos.w){left=boxPos.x+boxPos.w-AVATAR_WIDTH;}csAvatar.open(null,{text:cell.v||(cell._e&&cell._e.n),top:top+"px",left:left+"px"});}else{if(csAvatar){csAvatar.close();}}},getCallbackForRACollapseExpand:function getCallbackForRACollapseExpand(cInfo){var panel=this.getCSDisplayPanel();return{success:function(){panel.getVizBox().boxContent.highlightRAcells(cInfo,true);}};},highlightGroupCells:function highlightGroupCells(icCollection,fromExpression){if(this.getActionMgr().getContSlientActionsBefore().length>0){var tableNode=this.zone.tableNode,tgtEIs=[],nodes=[];$ARR.forEach(icCollection,function(ics){tgtEIs=tgtEIs.concat($ARR.map(ics,function(ic){return ic._ei;}));});if(tgtEIs.length>0){$ARR.forEach(tableNode.getElementsByTagName("td"),function(td){var ei=parseInt(td.getAttribute("ei"),10);if(tgtEIs.indexOf(ei)>-1){nodes.push(td);if(nodes.length===tgtEIs.length){return false;}}});}this.highlights=this.highlights.concat(nodes);$ARR.forEach(nodes,function(node,idx){var gbCss=mstrmojo.vi.ui.rw._XtabHighlights.GROUP_BORDER_CSS,css=[gbCss.cssClass],trs=tableNode.getElementsByTagName("tr"),rowIndex=node.parentElement.rowIndex,cellIndex=node.cellIndex,hasPreSibling=nodes[idx-1]&&nodes[idx-1]===(trs[rowIndex-1]&&trs[rowIndex-1].cells[cellIndex]),hasNextSibling=nodes[idx+1]&&nodes[idx+1]===(trs[rowIndex+1]&&trs[rowIndex+1].cells[cellIndex]);if(hasPreSibling){if(hasNextSibling){css.push(gbCss.midVert);}else{css.push(gbCss.bottom);}}else{if(hasNextSibling){css.push(gbCss.top);}}$CSS.addClass(node,css);});}else{return this._super(icCollection,fromExpression);}}});}());