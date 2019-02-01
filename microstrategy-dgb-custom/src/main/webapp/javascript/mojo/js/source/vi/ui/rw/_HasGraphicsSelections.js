(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.array","mstrmojo.vi.ui.rw._HasVisSelections");var $ARR=mstrmojo.array,$H=mstrmojo.hash,SELECTION_TYPE=mstrmojo.vi.ui.rw.SelectionType;function addAttributeInfoByRowIndex(rowIndex){var gridData=this.getDataModel(),titles=gridData&&gridData.getRowTitles(),attrFormIndices=this.getAttrFormIndices(),oneAttrForms,oneAttrFormCount,attrCount=attrFormIndices.length,formCount,selObjInfo,rowItems,rowItem,attrIndex,formIndex,i,attrTitle,attrName,attrID,attrElemName,attrElemID;rowItems=gridData.getRowHeaders(rowIndex);formCount=rowItems.size();selObjInfo=[];for(attrIndex=0;attrIndex<attrCount;attrIndex++){oneAttrForms=attrFormIndices[attrIndex];oneAttrFormCount=oneAttrForms.length;attrTitle=titles.getTitle(attrIndex);attrName=attrTitle.getName();attrID=attrTitle.getUnitId();for(i=0;i<oneAttrFormCount;i++){formIndex=oneAttrForms[i];if(formIndex<formCount){rowItem=rowItems.getHeader(formIndex);if(rowItem.t&&rowItem.h.stt===1){return[];}attrElemName=rowItem.getName();attrElemID=rowItem.getElementId();selObjInfo.push({n:attrName,nid:attrID,v:attrElemName,vid:attrElemID});}}}return selObjInfo;}function addMetricInfoByRowIndex(rowIndex){var gridData=this.getDataModel(),titles=gridData&&gridData.getRowTitles(),attrFormIndices=this.getAttrFormIndices(),oneAttrForms,oneAttrFormCount,attrCount=attrFormIndices.length,formCount,selObjInfo,rowItems,rowItem,attrIndex,formIndex,i,attrTitle,attrName,attrID,attrElemName,attrElemID;rowItems=gridData.getRowHeaders(rowIndex);formCount=rowItems.size();selObjInfo=[];for(attrIndex=0;attrIndex<attrCount;attrIndex++){oneAttrForms=attrFormIndices[attrIndex];oneAttrFormCount=oneAttrForms.length;attrTitle=titles.getTitle(attrIndex);attrName=attrTitle.getName();attrID=attrTitle.getUnitId();for(i=0;i<oneAttrFormCount;i++){formIndex=oneAttrForms[i];if(formIndex<formCount){rowItem=rowItems.getHeader(formIndex);if(rowItem.t&&rowItem.h.stt===1){continue;}attrElemName=rowItem.getName();attrElemID=rowItem.getElementId();selObjInfo.push({n:attrName,tid:attrID,v:attrElemName,eid:attrElemID});}}}return selObjInfo;}mstrmojo.vi.ui.rw._HasGraphicsSelections=mstrmojo.provide("mstrmojo.vi.ui.rw._HasGraphicsSelections",{_mixinName:"mstrmojo.vi.ui.rw._HasGraphicsSelections",init:function(props){if(this._super){this._super(props);}this._selectedGraphicsInfo={};},shouldEnableSelectedGraphics:function shouldEnableSelectedGraphics(){return mstrApp&&mstrApp.isEmbedded;},getDataModel:function getDataModel(){var data=this.model.data;return this.addDisposable(new mstrmojo.models.template.DataInterface(data));},addSelectedGraphicInfo:function addSelectedGraphicInfo(key,graphicInfo){if(!this.shouldEnableSelectedGraphics()){return ;}if(!this._selectedGraphicsInfo){this._selectedGraphicsInfo={};}this._selectedGraphicsInfo[key]=graphicInfo;},removeSelectedGraphicInfo:function removeSelectedGraphicInfo(key){if(!this.shouldEnableSelectedGraphics()){return ;}if(!this._selectedGraphicsInfo||!this._selectedGraphicsInfo[key]){return ;}delete this._selectedGraphicsInfo[key];},clearSelectedGraphicInfo:function clearSelectedGraphicInfo(){if(!this.shouldEnableSelectedGraphics()){return ;}this._selectedGraphicsInfo={};},getSelectedGraphicsInfo:function getSelectedGraphicsInfo(){if(!this.shouldEnableSelectedGraphics()){return ;}var graphicsInfo=[];$H.forEach(this._selectedGraphicsInfo,function(graphicInfo){graphicsInfo.push(graphicInfo);});return graphicsInfo;},addRowIndicesSelection:function addRowIndicesSelection(rowIndices){if(!this.shouldEnableSelectedGraphics()){return ;}var rowInfo,me=this;$ARR.forEach(rowIndices,function(rowIndex){rowInfo=addAttributeInfoByRowIndex.call(me,rowIndex);if(rowInfo.length>0){me.addSelectedGraphicInfo(rowIndex,rowInfo);}});}});}());