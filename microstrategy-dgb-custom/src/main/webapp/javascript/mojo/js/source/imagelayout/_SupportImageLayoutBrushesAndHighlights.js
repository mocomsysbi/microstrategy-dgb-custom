(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.vi.ui.rw._HasVisSelections","mstrmojo.VisUtility");var $ARRAY=mstrmojo.array;var $U=mstrmojo.VisUtility;var SELECTION_TYPE=mstrmojo.vi.ui.rw.SelectionType;var SELECTOR_ACTION=2;function getAttIndexFromId(attId){var attIndex=-1;var attrs=this.modelData.gts.row||[],len=attrs.length,i;for(i=0;i<len;i++){if(attrs[i].id===attId){attIndex=i;}}return attIndex;}mstrmojo.imagelayout._SupportImageLayoutBrushesAndHighlights=mstrmojo.provide("mstrmojo.imagelayout._SupportImageLayoutBrushesAndHighlights",{_mixinName:"mstrmojo.imagelayout._SupportImageLayoutBrushesAndHighlights",prepareSelectedNodesInfo:function(transformSelectionFn){this.clearSelections();var selection=this.getSelectionObjInfo(this.defaultSelectedObjs);if(transformSelectionFn instanceof Function){selection=transformSelectionFn.call(this,selection);}$ARRAY.forEach(selection,function(nodes){var metricCandidate={};$ARRAY.forEach(nodes,function(node){metricCandidate[node.tid]=[{id:node.eid,n:node.v}];},this);this.addMetricValueSelection(metricCandidate);},this);},prepareSelectedContextMenuNodesInfo:function(){var selection=this.getSelectionObjInfo(this.contextMenuSelection);$ARRAY.forEach(selection,function(nodes){var metricCandidate={};$ARRAY.forEach(nodes,function(node){metricCandidate[node.tid]=[{id:node.eid,n:node.v}];},this);this.addContextMenuMetricValueSelection(metricCandidate);},this);},highlight:function(selType,data){if(this._super){this._super.apply(this,arguments);}this.clearSelections();this.defaultSelectedObjs={};var me=this,hash,dataUnit,modelData=me.modelData,gts=modelData&&modelData.gts,rowH=gts&&gts.row,layoutAttrIndex=me.layoutAttrIndex,layoutAttr=layoutAttrIndex>-1&&rowH[layoutAttrIndex],layoutAttrID=layoutAttr&&layoutAttr.id,selectedLayoutAttr,selectedLayoutIdx=-1,areaBubbleAttrIndex=me.areaBubbleAttrIndex,areaBubbleAttr=areaBubbleAttrIndex>-1&&rowH[areaBubbleAttrIndex],areaBubbleAttrID=areaBubbleAttr&&areaBubbleAttr.id,selectedAreaBubbleAttr,selectedAreaBubbleAttrName,areaBubbleAttrElem;for(hash in data){if(data.hasOwnProperty(hash)){dataUnit=data[hash];if(layoutAttr){selectedLayoutAttr=dataUnit[layoutAttrID]&&dataUnit[layoutAttrID][0];if(selectedLayoutAttr){var fsCnt=layoutAttr.fs.length;$ARRAY.forEach(layoutAttr.es,function(layoutAttrElem,idx){if(layoutAttrElem.id===selectedLayoutAttr.id){selectedLayoutIdx=Math.floor(idx/fsCnt);return false;}return true;});}}if(areaBubbleAttr){selectedAreaBubbleAttr=dataUnit[areaBubbleAttrID]&&dataUnit[areaBubbleAttrID][0];selectedAreaBubbleAttrName=selectedAreaBubbleAttr&&selectedAreaBubbleAttr.n;$ARRAY.forEach(me.mapLineScopes,function(mapLineScope,idx){if(selectedLayoutIdx===idx||selectedLayoutIdx===-1){if(selectedAreaBubbleAttrName){areaBubbleAttrElem=mapLineScope.areaBubbleAttrElems[selectedAreaBubbleAttrName.toLowerCase()];if(areaBubbleAttrElem){me.defaultSelectedObjs[areaBubbleAttrElem.lineIndex]={hdrIndex:areaBubbleAttrElem.hdrIndex,touchVal:selectedAreaBubbleAttrName};}}else{if(selectedLayoutIdx>-1){for(var areaBubbleAttrElemName in mapLineScope.areaBubbleAttrElems){areaBubbleAttrElem=mapLineScope.areaBubbleAttrElems[areaBubbleAttrElemName];me.defaultSelectedObjs[areaBubbleAttrElem.lineIndex]={hdrIndex:areaBubbleAttrElem.hdrIndex,touchVal:areaBubbleAttrElemName};}}}}});}}}this.highlightMiniCharts();},singleUnitSelect:function singleUnitSelect(){var doAttributeSelection=this.getSelections().length>0||this.clearSelectionsFlag;if(this.clearSelectionsFlag){delete this.clearSelectionsFlag;}if(doAttributeSelection){var findUnitIdWithSC=function(){var scm=this.model.scm,scmKeys=Object.keys(scm||{}),unitId=(scmKeys&&scmKeys[0])||"",row=this.model.data.gts.row,col=this.model.data.gts.col;$ARRAY.forEach(row.concat(col),function(unit){if(scmKeys.indexOf(unit.id)!==-1){unitId=unit.id;return false;}});return unitId;};var prepareCell=function(){var selectionInfo={};selectionInfo.tid=findUnitIdWithSC.call(this);selectionInfo.eid="";selectionInfo.isClearAll=false;selectionInfo.anchor=this.domNode;selectionInfo.at=SELECTOR_ACTION;selectionInfo.selections=this.getSelections();selectionInfo.selectionType=this.getSelectionType();return selectionInfo;};var selctionInfo=prepareCell.call(this);this.performAction([selctionInfo]);}},clearSelections:function(flag){this.clearSelectionsFlag=true;if(this._super){this._super();}}});}());