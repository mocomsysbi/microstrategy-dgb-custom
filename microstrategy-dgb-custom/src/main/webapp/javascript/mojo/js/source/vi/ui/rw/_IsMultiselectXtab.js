(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.dom","mstrmojo.hash","mstrmojo.css");var $D=mstrmojo.dom,$H=mstrmojo.hash,$A=mstrmojo.array,sameUnitType=function sameUnitType(newC,oldC){var newD=this.getCellForNode(newC),oldD=this.getCellForNode(oldC);return !newD||!oldD||newD.hasOwnProperty("mix")===oldD.hasOwnProperty("mix");},getTableRows=function getTableRows(fill){var rows=[],clonedTbs=this.clonedRowHeader&&this.clonedRowHeader.getTableNode()&&this.clonedRowHeader.getTableNode().tBodies,allTbs=[],i;allTbs.push(this.zone.tableNode.tBodies);if(clonedTbs){allTbs.push(clonedTbs);}$A.forEach(allTbs,function(tbs){$A.forEach(tbs,function(tb){for(i=0;i<tb.childNodes.length;i++){rows.push(tb.childNodes[i]);}if(fill&&tb.childNodes.length<this.zone.rowsPerPage){rows.push.apply(rows,new Array(this.zone.rowsPerPage-tb.childNodes.length));}},this);},this);return rows;},getCell=function getCell(colIx,rowIx){var row=getTableRows.call(this,true)[rowIx],x;for(x=0;x<row.childNodes.length;x++){if(getColIx.call(this,row.childNodes[x])>colIx){return null;}if(getColIx.call(this,row.childNodes[x])===colIx){return row.childNodes[x];}}},getColIx=function getColIx(cell){var cellObj=this.getCellForNode(cell);return cellObj&&cellObj.colIx||0;},ST={REPLACE_ALL:1,REMOVE:2,APPEND:3,TOGGLE:4},CELL_SELECTION={CONTROL:"Ctrl",SHIFT:"Shft",SINGLE:"Single"},getHeaderRowCount=function getHeaderRowCount(){return this.rhsCP.startIndexInContainer;},getNthMergedHeader=function getNthMergedHeader(rowIdx,n){var umObjs=this.rhsCP.getUnmergedCells(rowIdx)||[];if(umObjs.length>n){return umObjs[n];}else{return this.rhsCP.getCell(rowIdx,n-umObjs.length);}},getCellRowIx=function getCellRowIx(cell,headerRowCount,mover){var rowIx=cell.o,dupRowIx=rowIx,gridId=cell._gd,objectId=cell._e&&cell._e.id,nextPrevRow,searchedRow=this.zone.searchRow(rowIx+headerRowCount),limit,colIx=cell.colIx;if(searchedRow!==null){limit=mover===1?searchedRow.max-headerRowCount:searchedRow.min;while(Math.abs(rowIx-limit)>0){nextPrevRow=getNthMergedHeader.call(this,rowIx+mover,colIx);if(!nextPrevRow||objectId!==(nextPrevRow._e&&nextPrevRow._e.id)||(dupRowIx!==nextPrevRow.o&&gridId===nextPrevRow._gd)){break;}rowIx+=mover;}return rowIx+headerRowCount;}else{return null;}},getCellDataUnion=function(cell){var union=this.model.getCellDataUnion(cell),res={},value;$A.forEach(union,function(item){value=item.v;if(res[item.tid]&&res[item.tid][0]&&res[item.tid][0].n){value=res[item.tid][0].n+":"+item.v;}res[item.tid]=[{id:item.eid,n:value}];});return res;},getSiblings=function getSiblings(cell){if(!cell){return null;}if(!this.selectSiblings(cell)){return[cell];}var siblings=[],cellData=this.getCellForNode(cell),gd=this.gridData,gsi=gd.gsi,cn,i,ccd,rows,candidateCell,bk,dk,match,ccdu,cdu,sameArrContent=function(a1,a2){var r=true;if(a1.length===a2.length){$A.forEach((a1||[]),function(v){r=r&&$A.find(a2,"id",v.id)!==-1;return r;});return r;}return false;},cellInfo=this.model.getCellInfo(cellData);if(cellInfo.isMetric){if(gsi.tma===2){cn=cell.parentNode.childNodes;for(i=0;i<cn.length;i++){match=true;ccd=this.getCellForNode(cn[i]);if(ccd&&ccd.hasOwnProperty("mix")){ccdu=getCellDataUnion.call(this,ccd);cdu=getCellDataUnion.call(this,cellData);bk=$H.keyarray(ccdu);dk=$H.keyarray(cdu);if(!!bk.length&&bk.length===dk.length){$A.forEach((bk||[]),function(v){match=match&&sameArrContent(ccdu[v],cdu[v]);return match;},this);}else{match=false;}if(match){siblings.push(cn[i]);}}}}else{siblings.push(cell);}}else{if(this.isSelectAllCell(cell)){siblings.push(cell);}else{if(cellData&&cellData._e&&cellData.axis===1){rows=getTableRows.call(this,false);$A.forEach((rows||[]),function(row){for(i=0;i<=row.childNodes.length;i++){candidateCell=row.childNodes[i];ccd=this.getCellForNode(candidateCell);if(ccd&&ccd._e){if(this.model.compareElementsId(cellData._e.id,ccd._e.id)){siblings.push(candidateCell);}}}},this);}else{if(cellData&&cellData._e&&cellData.axis===2){cn=cell.parentNode.childNodes;for(i=0;i<cn.length;i++){match=true;ccd=this.getCellForNode(cn[i]);if(ccd&&ccd._e){if(cellData._e.id===ccd._e.id){siblings.push(cn[i]);}}}}}}}return siblings;},clearSels=function clearSels(){this.selCells=[];this.clearSelections();},clearSelsForUnit=function clearSelsForUnit(node){var me=this,cell1=me.getCellForNode(node);this.selCells=$A.filter(this.selCells,function(item){var cell2=me.getCellForNode(item);return cell2&&cell1&&(cell2.tui||cell2.ui)!==(cell1.tui||cell1.ui);});this.clearUnitSelections(this.model.data.gts[cell1.axis===1?"row":"col"][cell1.tui||cell1.ui].id);},addCell=function addCell(cell){var isAll=this.isSelectAllCell(cell),cellData=this.getCellForNode(cell),cellInfo=this.model.getCellInfo(cellData),titleInfo=this.model.getCellTitleInfo(cellData);if(!cellData){return ;}if(!isAll){if($A.indexOf(this.selCells,cell)===-1){this.selCells.push(cell);}}else{if(!cellData.hasOwnProperty("mix")){var titleId=cellInfo.isMetric?"Metrics":(titleInfo.title&&titleInfo.title.id),selectorControlMap=this.model.scm,sc=titleId&&selectorControlMap&&selectorControlMap[titleId];if(sc&&(sc.all||sc.showall)){this.addAttributeSelection(titleInfo.title.id,"OA:(All)","all");}}return ;}if(cellData.hasOwnProperty("mix")){this.addMetricValueSelection(getCellDataUnion.call(this,cellData));}else{this.addAttributeSelection(titleInfo.title.id,cellData._e.id,cellData._e.n);}},removeCell=function removeCell(cell){var index=this.selCells.indexOf(cell),cellData=this.getCellForNode(cell);this.selCells.splice(index,1);if(cellData.hasOwnProperty("mix")){this.removeMetricValueSelection(getCellDataUnion.call(this,cellData));}else{this.removeAttributeSelection(this.model.getCellTitleInfo(cellData).title.id,cellData._e.id);}},clearContextMenuSels=function clearContextMenuSels(){this.clearContextMenuHighlights();this.cmSelCells=[];this.clearCxtMnuSelection();},addCellToContextMenuSelection=function addCellToContextMenuSelection(cell,opt){var cellData=this.getCellForNode(cell),titleInfo=this.model.getCellTitleInfo(cellData);if($A.indexOf(this.cmSelCells,cell)===-1){this.cmSelCells.push(cell);if(cellData.hasOwnProperty("mix")){this.addContextMenuMetricValueSelection(getCellDataUnion.call(this,cellData));}else{this.addContextMenuAttributeSelection(titleInfo.title.id,cellData._e.id,opt.n,undefined,undefined,undefined,opt.fm);}}},getContextMenuCellInfo=function(cells){var me=this,cmCell={n:"",fm:""},cellData,cellNameArray=[],name,attrData,attrArr,attrId,fmArray=[],maxNames=0;if(cells.length){$A.forEach(cells,function(cell){cellData=me.getCellForNode(cell);attrData=cellData._e;name=attrData&&attrData.n;if(name){cellNameArray.push(name);}});if(attrData){attrArr=attrData.id.split(";");attrId=attrArr[1];fmArray=$A.map(me.model.getAttributeFormsInTemplate(attrId),function(form){return form.bfid;});cmCell.fm=fmArray.join(";");maxNames=fmArray.length;}if(cellNameArray.length){cmCell.n=cellNameArray.slice(0,maxNames).join(" ");}}return cmCell;},cloneCellFromSelCells=function cloneCellFromSelCells(){var me=this,cellData,titleInfo,cmCell;clearContextMenuSels.call(this);this.cmSelCells=this.selCells.slice(0);$A.forEach(this.cmSelCells,function(cell){cmCell=getContextMenuCellInfo.call(me,getSiblings.call(me,cell));cellData=me.getCellForNode(cell);titleInfo=me.model.getCellTitleInfo(cellData);if(cellData.hasOwnProperty("mix")){me.addContextMenuMetricValueSelection(getCellDataUnion.call(me,cellData));}else{me.addContextMenuAttributeSelection(titleInfo.title.id,cellData._e.id,cmCell.n,undefined,undefined,undefined,cmCell.fm);}});},isSubtotalRelated=function isSubtotalRelated(td){var cell=this.getCellForNode(td);if(cell){return $A.some(this.model.getCellDataUnion(cell),function(item){return item.isSubtotal;});}return false;},modifySelections=function modifySelections(cells,type,singleUnitSelect){var selected,lt,me=this;if($H.isEmpty(cells)&&(!singleUnitSelect&&this.clearAllSelections&&this.clearAllSelections())){clearSels.call(this);}cells=$A.filter((cells||[]),function(cell){return !isSubtotalRelated.call(me,cell);});$A.forEach(cells,function(cell){lt=type;selected=~$A.indexOf(this.selCells,cell);if(ST.TOGGLE===lt){lt=selected?ST.REMOVE:ST.APPEND;}if(ST.REPLACE_ALL===lt){if(singleUnitSelect){clearSelsForUnit.call(this,cell);}else{clearSels.call(this);}type=lt=ST.APPEND;}switch(lt){case ST.APPEND:addCell.call(this,cell);break;case ST.REMOVE:removeCell.call(this,cell);break;}},this);},modifyContextMenuSelections=function modifyContextMenuSelections(cells){var me=this,cmCell;cells=$A.filter((cells||[]),function(cell){return !isSubtotalRelated.call(me,cell);});clearContextMenuSels.call(this);cmCell=getContextMenuCellInfo.call(this,cells);$A.forEach(cells,function(cell){addCellToContextMenuSelection.call(this,cell,cmCell);},this);},selectRange=function selectRange(cColIx,cRowIx,lColIx,lRowIx){var fromRow=Math.min(cRowIx,lRowIx),fromCol=Math.min(cColIx,lColIx),toRow=Math.max(cRowIx,lRowIx),toCol=Math.max(cColIx,lColIx),x,y,cells=[],pushUnique=function(arr,candidates){$A.forEach((candidates||[]),function(candidate){if($A.indexOf(arr,candidate)===-1){arr.push(candidate);}});};for(x=fromCol;x<=toCol;x++){for(y=fromRow;y<=toRow;y++){pushUnique(cells,getSiblings.call(this,getCell.call(this,x,y)));}}modifySelections.call(this,cells,ST.APPEND);},_doSelection=function _doSelection(method,td){var sels,selAll=this.selectorControl&&this.selectorControl.showall,isSingleUnitMultiSelect=!!this.defn.msuc,isAllCell=this.isSelectAllCell(td),cgbs=(this.model.getSelectorControlMapInfo?this.model.getSelectorControlMapInfo():[]),singleUnitSelect=!this.selectorControl&&(cgbs&&cgbs.length>0),ssc,id,cell,ix,isGG=this.parent&&this.parent.defn&&this.parent.defn.t===527;if(isGG){isSingleUnitMultiSelect=!!this.parent.defn.msuc;}if(singleUnitSelect){if(!isSingleUnitMultiSelect){method=CELL_SELECTION.SINGLE;}cell=this.getCellForNode(td);id=cell&&cell.id;ix=$A.find(cgbs,"did",id);if(ix>=0){ssc=cgbs[ix].sc;selAll=ssc.showall||ssc.all;}}if(td.attributes.getNamedItem("ei")!==null&&(singleUnitSelect||(!isSubtotalRelated.call(this,td)&&(selAll||!isAllCell)))){sels=this.getSelectionHash();if($H.isEmpty(sels)){this.selCells=[];}if(td.className.indexOf(this.CELL_HIGHLIGHT)!==-1&&this.selCells.length>0){if(selAll===false&&(method===CELL_SELECTION.SINGLE||method===CELL_SELECTION.CONTROL)&&isUnSelectCell.call(this,td)){return ;}if(method===CELL_SELECTION.SINGLE&&isUnSelectCell.call(this,td)){method=CELL_SELECTION.CONTROL;this.xTabHiddenTextArea.blur();}}this.clearHighlights();this["on"+method+"Select"](td,singleUnitSelect);this.lastSelectedCell=td;if(method!==CELL_SELECTION.SHIFT){this.shiftInfo={lastCell:td,selCells:[].concat(this.selCells)};}this.markSelections();this.endSelections();}else{if(selAll===true&&td.attributes.getNamedItem("ei")===null&&!this.cellMenuOnCloseFlag){clearSels.call(this);this.markSelections();this.endSelections();}}},_doContextMenuSelection=function _doContextMenuSelection(td){var isSelected=false,isAllCell=this.isSelectAllCell(td);if(td.attributes.getNamedItem("ei")!==null&&!isAllCell){isSelected=this.isSelected(td);if(isSelected){cloneCellFromSelCells.call(this);}else{modifyContextMenuSelections.call(this,getSiblings.call(this,td));}this.markContextMenuSelections();}},isUnSelectCell=function isUnSelectCell(td){var tempSelCells=this.selCells,unselectCell=true;if(this.selectSiblings(td)){var firstSelCell=this.getCellForNode(tempSelCells[0]),isMetric=this.model.getCellInfo(firstSelCell).isMetric,firstSelCellIdentifier=isMetric?firstSelCell._ei:firstSelCell._e&&firstSelCell._e.id,firstSelCellTopParentId=isMetric?firstSelCell._tp&&firstSelCell._tp._e&&firstSelCell._tp._e.id:undefined;unselectCell=!$A.some(tempSelCells,function(cell){cell=this.getCellForNode(cell);if(isMetric){return cell._tp._e.id===firstSelCellTopParentId&&cell._ei!==firstSelCellIdentifier;}else{return cell._e&&cell._e.id!==firstSelCellIdentifier;}}.bind(this));}else{if(tempSelCells.length>1){unselectCell=false;}}return unselectCell;};mstrmojo.vi.ui.rw._IsMultiselectXtab=mstrmojo.provide("mstrmojo.vi.ui.rw._IsMultiselectXtab",{_mixinName:"mstrmojo.vi.ui.rw._IsMultiselectXtab",selCells:[],cmSelCells:[],cellMenuOnCloseFlag:false,lastSelectedCell:null,isMultiSelect:false,getLastSelectedCell:function getLastSelectedCell(){return this.lastSelectedCell;},onCtrlSelect:function onCtrlSelect(cell,singleUnitSelect){modifySelections.call(this,getSiblings.call(this,cell),ST.TOGGLE,singleUnitSelect);},onShftSelect:function onShftSelect(currentClickedCell,singleUnitSelect){if(singleUnitSelect){return this.onSingleSelect(currentClickedCell,singleUnitSelect);}var lastClickedCell=this.shiftInfo.lastCell;if(sameUnitType.call(this,currentClickedCell,lastClickedCell)){this.selCells=[].concat(this.shiftInfo.selCells);var headerRowCount=getHeaderRowCount.call(this),fromRowIx,toRowIx,fromCell,toCell,lccCell,cccCell,lccColIx=getColIx.call(this,lastClickedCell),cccColIx=getColIx.call(this,currentClickedCell),lccXtabRowIdx=parseInt(lastClickedCell.getAttribute("r"),10),cccXtabRowIdx=parseInt(currentClickedCell.getAttribute("r"),10),cellInfo=this.model.getCellInfo(this.getCellForNode(currentClickedCell));if(cellInfo.isMetric){fromRowIx=lccXtabRowIdx;toRowIx=cccXtabRowIdx;}else{if(lccColIx===cccColIx){lccCell=this.getCellForNode(lastClickedCell);cccCell=this.getCellForNode(currentClickedCell);}else{var minColIx=Math.min(lccColIx,cccColIx);lccCell=getNthMergedHeader.call(this,lccXtabRowIdx-headerRowCount,minColIx);cccCell=getNthMergedHeader.call(this,cccXtabRowIdx-headerRowCount,minColIx);if(this.zone.searchRow(lccCell.o+headerRowCount)===null){lccCell=this.getCellForNode(lastClickedCell);}if(this.zone.searchRow(cccCell.o+headerRowCount)===null){cccCell=this.getCellForNode(currentClickedCell);}}fromCell=(lccCell.o<cccCell.o)?lccCell:cccCell;fromRowIx=getCellRowIx.call(this,fromCell,headerRowCount,-1);toCell=(lccCell.o>cccCell.o)?lccCell:cccCell;toRowIx=getCellRowIx.call(this,toCell,headerRowCount,1);}selectRange.call(this,lccColIx,fromRowIx,cccColIx,toRowIx);}},onSingleSelect:function onSingleSelect(cell,singleUnitSelect){modifySelections.call(this,getSiblings.call(this,cell),ST.REPLACE_ALL,singleUnitSelect);},handleSelection:function handleSelection(e,hWin,target){var clickedCell=target&&$D.findAncestorByName(target,"td",true,this.viewport),cms=sameUnitType.call(this,clickedCell,this.lastSelectedCell),method;if(!$D.isRMC(e,hWin)){if($D.isMetaKey(hWin,e)&&cms){method=CELL_SELECTION.CONTROL;}else{if($D.shiftKey(hWin,e)&&cms){method=CELL_SELECTION.SHIFT;}else{method=CELL_SELECTION.SINGLE;}}_doSelection.call(this,method,clickedCell);}else{if(!($D.isMetaKey(hWin,e)||$D.shiftKey(hWin,e))){_doContextMenuSelection.call(this,clickedCell);}}},markSelections:function markSelections(){this.highlightCells(this.selCells);},markContextMenuSelections:function markContextMenuSelections(){this.highlightCellsWithContextMenuSelection(this.cmSelCells);},handlesMultiSelection:function handlesMultiSelection(evt){return(this._super&&this._super(evt))||this.isMultiSelect;},isSelected:function isSelected(cell){return $A.indexOf(this.selCells,cell)!==-1;},addSelection:function addSelection(cell){if(!this.isSelected(cell)){_doSelection.call(this,CELL_SELECTION.CONTROL,cell);}},onclick:function onclick(evt){$D.clearBrowserHighlights();clearContextMenuSels.call(this);var target=evt.getTarget&&evt.getTarget();if(this.handlesMultiSelection(evt)){if(mstrApp.isExpress){var clickedCell=target&&$D.findAncestorByName(target,"td",true,this.viewport),a=$D.findAncestorByName(target,"span",true,clickedCell);if(a){this.handleSelection(evt.e,evt.hWin,target);}}else{this.handleSelection(evt.e,evt.hWin,target);}}else{this._super(evt);}this.cellMenuOnCloseFlag=false;},singleUnitSelect:function singleUnitSelect(){var td=this.lastSelectedCell,cell=this.getCellForNode(td);this.defaultAction(td,cell);},getActionCells:function getActionCells(cell){var me=this,res=$A.map($A.filter(this.selCells,function(item){var cell2=me.getCellForNode(item);return cell2&&cell&&(cell2.tui||cell2.ui)===(cell.tui||cell.ui);}),function(tdCell){return me.getCellForNode(tdCell);});if((res.length===0)||!this.model.getCellTitleInfo(cell).isSrcTitle){res=this._super(cell);}return res;},openXtabCellMenu:function openXtabCellMenu(o){var dl=mstrmojo.findAncestor(this,"openXtabCellMenu"),me=this,menuInstance=null;if(this.isInFilterPanel()&&mstrApp&&mstrApp.isInVFInteractMode){dl=this.controller&&this.controller.view;}if(dl){if(o.evt){if($D.isMetaKey(o.hWin,o.evt)){var clickedCell=o.td&&$D.findAncestorByName(o.td,"td",true,this.viewport);this.addSelection(clickedCell);}}menuInstance=dl.openXtabCellMenuWithSelectionStyleControl(o);if(menuInstance){menuInstance.onCloseMenuCallBack=function(){me.clearContextMenuHighlights();me.cellMenuOnCloseFlag=true;};}if(this.parent&&this.parent.selectVIUnit){this.parent.selectVIUnit();}}},highlightCells:function(cells,fromExpression){if(this._super){this._super(cells,fromExpression);}if(fromExpression){this.selCells=cells;}},selectSiblings:function(){return true;},isSelectAllCell:function isSelectAllCell(td){var cell=this.getCellForNode(td),union=cell&&this.model.getCellDataUnion(cell);return !!cell&&(union.length===0||(union.length===1&&!union[0].eid));}});}());