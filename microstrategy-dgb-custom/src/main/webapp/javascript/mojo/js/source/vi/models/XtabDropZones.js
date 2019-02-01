(function(){mstrmojo.requiresCls("mstrmojo.vi.models.TemplateBasedDropZones","mstrmojo.vi.models.EnumDragSources","mstrmojo.express.ui.SubtotalsWidget","mstrmojo.array","mstrmojo.func","mstrmojo.hash","mstrmojo.vi.ui.DatasetUnitMenuUtils","mstrmojo.VisEnum");mstrmojo.requiresDescs(101,122,144,190,1018,2453,2968,3224,3573,3582,3647,5188,7974,7975,7976,7978,7979,8138,11099,11609,11610,11667,11806,11908,12193,12194);var $ARR=mstrmojo.array,$DU=mstrmojo.vi.ui.DatasetUnitMenuUtils,$H=mstrmojo.hash,$WRAP=mstrmojo.func.wrapMethods,METRICS=-1,ROWS=1,COLUMNS=2,TEMPLATE_METRICS_ID="-1",STRUCTURE_ALIASES=[null,"rows","cols"],ENUM_TARGET=mstrmojo.vi.models.DropZonesModel.ENUM_TARGET_POSITION;mstrmojo.vi.models.XtabDropZonesMenuContextType=null;mstrmojo.vi.models.DropZonePivotItemType=null;function getHost(){return mstrmojo.all[this.hostId];}function getHostStructure(){return getHost.call(this).gridInfo||{};}function addPageByPartialUpdateKey(actions){var pageByKey=getHost.call(this).model.docModel.getVIComponentKey(mstrmojo.vi.models.VIComponentMap.TYPES.PAGEBY_PANEL);if(pageByKey){actions.forEach(function(action){var partialRetrieval=action.partialRetrieval=action.partialRetrieval||{},nodes=partialRetrieval.nodes=partialRetrieval.nodes||[];nodes.push(pageByKey);});}}function getAdjustedPivotUnitAction(item,zone,idx,axis,isDrag,originAxis){var xtab=getHost.call(this),id,type,originIdx;if(item.did!==TEMPLATE_METRICS_ID){id=item.did;type=item.t;}if(isDrag){var itemIdx=this.getUnitIndexInZone(zone,item);if(itemIdx!==-1){originAxis=axis;originIdx=itemIdx;if(itemIdx<idx){idx--;}}else{originIdx=item._renderIdx;}}return xtab.model.getPivotUnitAction(axis,idx,id,type,originAxis,originIdx);}function pivotUnits(itemInfo,isDrag,actions,removeReplacedItems){var xtab=getHost.call(this),pivotActions=[],altActions=[],offset=0,me=this;if(actions){pivotActions=$H.copy(actions,pivotActions);altActions=$H.copy(actions,altActions);}$ARR.forEach(itemInfo.items,function(item){pivotActions.push(getAdjustedPivotUnitAction.call(me,item,itemInfo.zone,itemInfo.idx+(offset++),itemInfo.axis,isDrag,itemInfo.originAxis));});if(itemInfo.axis===COLUMNS){itemInfo.items.forEach(function(item){var itmCnt=item.cardg>0?item.cardg:item.card;if(!itmCnt||itmCnt<=me.CARDLIMIT){altActions.push(getAdjustedPivotUnitAction.call(me,item,itemInfo.zone,itemInfo.idx+(offset++),itemInfo.axis,isDrag,itemInfo.originAxis));}});}var cbFunc=function(){xtab.controller.submitUndoRedoTemplateUpdates(xtab,pivotActions,me.getUpdateCallback());},altCbFunc=function(){xtab.controller.submitUndoRedoTemplateUpdates(xtab,altActions,me.getUpdateCallback());};if(itemInfo.axis===COLUMNS){this.checkAndWarnLargeItemsForAddUnits(itemInfo.items,cbFunc,altCbFunc,true,itemInfo.zone);}else{me.checkAndWarnForOutlineAddUnits(itemInfo.items,itemInfo.axis,cbFunc,mstrmojo.emptyFn,removeReplacedItems);}}function getSubtotalEditorCfg(itemContext){var xtab=getHost.call(this),gridData=xtab?xtab.gridData.gts:undefined,data=gridData[itemContext.axis===COLUMNS?"col":"row"][itemContext.idx],cfgEditor=xtab.getBasicSubtotalEditorConfig(data.ast),me=this;cfgEditor.fnOk=xtab.getOnSubtotalsChangeFn(cfgEditor,data,me.getUpdateCallback());return cfgEditor;}function getUnitPosition(unit){var zones=this.getDropZones().zones,res={};zones.forEach(function(zone){(zone.items||[]).forEach(function(zoneUnit,ix){if(zoneUnit.did===unit.did){res.index=ix;res.axis=zone.id;}if(zoneUnit.did===-1){res.metricAxis=zone.id;}});});return res;}function getDeleteAllMetricsActions(model,datasetId){var actions=[],undoActions=[],mx=getHostStructure.call(this).mx,i=mx.length-1,mi;for(i;i>=0;i--){mi=getUnitPosition.call(this,mx[i]);actions.push(model.getRemoveTemplateUnitAction($H.copy(mx[i],{axis:mi.axis,unitPos:mi.index+1})));if(undoActions){undoActions.push(model.getAddTemplateUnitAction($H.copy(mx[i],{t:4}),datasetId||this.docModel.findDatasetIdFromUnit(mx[i]),mi.metricAxis,mi.index));}}undoActions.reverse();return{actions:actions,undoActions:undoActions};}function isPivot(context){return context.src.data.src===mstrmojo.vi.models.EnumDragSources.VIZ_EDITOR;}function iterateRowsAndColumns(fnHandler){var hostStructure=getHostStructure.call(this);[ROWS,COLUMNS].forEach(function(axis){hostStructure[STRUCTURE_ALIASES[axis]].forEach(function(unit,idx){fnHandler.call(this,axis,unit,idx);},this);},this);}function clearAll(){var host=getHost.call(this),model=host.model,actions=[],allActions;iterateRowsAndColumns.call(this,function(axis,unit,idx){if(unit.did===TEMPLATE_METRICS_ID){allActions=getDeleteAllMetricsActions.call(this,model);actions=actions.concat(allActions.actions);}else{unit.axis=axis;unit.unitPos=idx+1;actions.push(model.getRemoveTemplateUnitAction(unit));}});host.controller.submitUndoRedoTemplateUpdates(host,actions,this.getUpdateCallback());}function getDeleteActions(xtab,item){var model=xtab.model,actions=[];if(item.did===TEMPLATE_METRICS_ID){actions=actions.concat(getDeleteAllMetricsActions.call(this,model).actions);}else{actions=[model.getRemoveTemplateUnitAction(item)];}return actions;}function getAddAction(xtab,item,zoneId,datasetId,idx){return[xtab.model.getAddTemplateUnitAction(item,datasetId,zoneId,idx)];}mstrmojo.vi.models.XtabDropZones=mstrmojo.declare(mstrmojo.vi.models.TemplateBasedDropZones,null,{CARDLIMIT:mstrmojo.VisEnum.VIS_CARDLIMIT.GRID,getDropZones:function getDropZones(){var xtabStructure=getHostStructure.call(this);return{n:getHost.call(this).defn.ttl,zones:[this.getZone(mstrmojo.desc(2968,"Rows"),ROWS,xtabStructure.rows,false,{title:mstrmojo.desc(11668)}),this.getZone(mstrmojo.desc(122,"Columns"),COLUMNS,xtabStructure.cols,false,{title:mstrmojo.desc(11668)}),this.getZone(mstrmojo.desc(3582,"Metrics"),METRICS,xtabStructure.mx,false,{title:mstrmojo.desc(13827)})]};},getAvatarIconClass:function getAvatarIconClass(){return"viXtab";},canSwapAxis:function canSwapAxis(){return true;},swapAxis:function swapAxis(){var host=getHost.call(this),actions=[],altActions=[],unitsAxes={},rowZone={};this.getDropZones().zones.every(function(zone){rowZone=(zone.id===ROWS)?zone:null;return !rowZone;});iterateRowsAndColumns.call(this,function(axis,unit){unitsAxes[axis]=true;});iterateRowsAndColumns.call(this,function(axis,unit,idx){var currentItem=null,isMetrics=unit.did===TEMPLATE_METRICS_ID,targetAxis=axis===ROWS?COLUMNS:ROWS,action=host.model.getPivotUnitAction(targetAxis,idx,isMetrics?"":unit.did,isMetrics?"":unit.t,axis,idx);actions.push(action);if(targetAxis===COLUMNS){rowZone.items.every(function(item){currentItem=(item.did===unit.did)?item:null;return !currentItem;});var itmCnt=currentItem.cardg>0?currentItem.cardg:currentItem.card;if(!itmCnt||itmCnt<=this.CARDLIMIT){altActions.push(action);}}else{altActions.push(action);}});var me=this,cb=function(){host.controller.submitUndoRedoTemplateUpdates(host,actions,me.getUpdateCallback());},altCb=function(){host.controller.submitUndoRedoTemplateUpdates(host,altActions,me.getUpdateCallback());};var moveSubTotalAction=host.model.getMoveSubTotalAction(undefined,undefined,host.k,true);if(actions.length){if(moveSubTotalAction){actions.push(moveSubTotalAction);if(altActions.length){altActions.push(moveSubTotalAction);}}this.checkAndWarnLargeItemsForAddUnits(rowZone.items,cb,altCb,true,rowZone);return ;}cb();},canDefineSubtotals:function canDefineSubtotals(){var gsi=this.getHostModel().gsi,mx=gsi&&gsi.mx;return mx&&mx.length>0;},hasVisibleSubtotals:function hasVisibleSubtotals(){var gsi=this.getHostModel().gsi;return gsi&&gsi.hassb&&!gsi.hidesb;},showQuickSubtotals:function showQuickSubtotals(){var host=getHost.call(this),gsi=this.getHostModel().gsi,gridModel=host.model;if(gsi.hassb){if(gsi.hidesb){host.controller.submitUndoRedoTemplateUpdates(host,gridModel.getShowDefinedSubtotalsAction());}return ;}host.controller.submitUndoRedoTemplateUpdates(host,this.getShowQuickTotalAction());},getShowQuickTotalAction:function getShowQuickTotalAction(){var host=getHost.call(this),gsi=this.getHostModel().gsi,gridModel=host.model;var actions=[],axis=gsi.tma===ROWS?COLUMNS:ROWS;gsi[STRUCTURE_ALIASES[axis]].forEach(function(unit){actions.push(gridModel.getShowTotalsUnitAction(unit.did,unit.t,[-10],[]));});var moveSubTotalAction=gridModel.getMoveSubTotalAction(undefined,undefined,host.k);if(moveSubTotalAction){actions.push(moveSubTotalAction);}return actions;},hideDefinedSubtotals:function hideDefinedSubtotals(){var host=getHost.call(this);host.controller.submitUndoRedoTemplateUpdates(host,{act:"hideDefinedSubtotals"});},clearAllSubtotals:function(){var host=getHost.call(this);host.controller.submitUndoRedoTemplateUpdates(host,{act:"clearAllSubtotals"});},getExtraUnitMenuItems:function getExtraUnitMenuItems(cfg,zone,item,itemContext){var me=this,id=this.id;cfg.addSeparator();if(this.showNumberFormat(item)){cfg.addEditorMenuItem(mstrmojo.desc(13237,"Number Format"),id,this.getNumberFormatEditorCfg,itemContext);}this.buildThresholdMenuOptions(cfg,itemContext,false);if(item.t===12||item.t===14||(item.t===47&&item.st===12033)){cfg.addEditorMenuItem(mstrmojo.desc(6193,"Show Totals"),id,getSubtotalEditorCfg,itemContext);}else{if(item.t===4){cfg.addToggleMenuItem(mstrmojo.desc(6193,"Show Totals"),"",function(){this.showQuickSubtotals();},function(){this.hideDefinedSubtotals();},id,this.hasVisibleSubtotals());}}if(this.shouldShowDisplayFormsMenu(item)){cfg.addEditorMenuItem(mstrmojo.desc(11908,"Display Attribute Forms"),this.id,function(){return me.getDisplayFormsMenu(item);});}},getMultiUnitsMenuItems:function getMultiUnitsMenuItems(cfg,zone,items){var id=this.id,axis=zone.id;if(axis!==METRICS){var text=(axis===ROWS)?mstrmojo.desc(13262,"Move to Column Header"):mstrmojo.desc(13263,"Move to Row Header");cfg.addMenuItem(text,"xt",function(){pivotUnits.call(mstrmojo.all[id],{items:items,zone:zone,axis:axis===ROWS?COLUMNS:ROWS,idx:0},false);});cfg.addSeparator();}this._super(cfg,zone,items);},getAllowDropInfo:function getAllowDropInfo(zone,dragItems,idx,edge,context){var baseInfo=this._super(zone,dragItems,idx,edge,context),isMetricsZone=zone.id===METRICS,me=this,gsi=getHostStructure.call(me);return $H.copy({allowedItems:baseInfo.allowedItems.filter(function(item){var docModel=me.docModel,xtabModel=me.getHost().model;if(item.t===4){if(item.did===TEMPLATE_METRICS_ID){if(isMetricsZone){return false;}}else{if(!isMetricsZone&&gsi.mx&&gsi.mx.length){return false;}}}else{if(isMetricsZone){return false;}else{if(xtabModel.hasSameRecursiveAttributeGroup(item)){return false;}}}return true;})},baseInfo);},getHostModel:function getHostModel(){return this.getHost().gridData;},unitsDropped:function unitsDropped(zone,context,dropInfo){var xtab=this.getHost(),model=xtab.model,items=dropInfo.allowedItems,datasetId=context.getCtxtDragData&&context.getCtxtDragData().dsid,idx=dropInfo.idx,edge=dropInfo.edge,actions=[],altActions=[],axis=zone.id,removeReplacedItems=[],srcItems=zone.items;if(srcItems.length){if(edge===ENUM_TARGET.ON&&dropInfo.removeReplaced){var tgtItem=srcItems[idx];removeReplacedItems=[tgtItem];if(tgtItem.did===TEMPLATE_METRICS_ID){actions=actions.concat(getDeleteAllMetricsActions.call(this,model,datasetId).actions);}else{tgtItem.axis=axis;tgtItem.unitPos=idx+1;actions.push(model.getRemoveTemplateUnitAction(tgtItem));}}else{if(edge===ENUM_TARGET.BELOW){idx++;}}}else{idx=0;}if(isPivot(context)){pivotUnits.call(this,{items:items,zone:zone,axis:axis,idx:idx,originAxis:context.src.data.srcZoneId},true,actions,removeReplacedItems);return ;}var hasMetric=false,newFmtUnits=[];items.reverse().forEach(function(item){var isMetric=this.isMetric(item),forceAddToMx=isMetric&&zone.id!==METRICS&&hasMetric,tgtZoneId=forceAddToMx?METRICS:zone.id,tgtIdx=forceAddToMx?0:idx,altTgtZoneId=forceAddToMx?METRICS:(zone.id===1?COLUMNS:ROWS),altTgtIdx=-1;altActions=actions.concat(getAddAction.call(this,xtab,item,altTgtZoneId,datasetId,altTgtIdx));actions=actions.concat(getAddAction.call(this,xtab,item,tgtZoneId,datasetId,tgtIdx));if(isMetric){newFmtUnits.push(item);}hasMetric=hasMetric||isMetric;},this);if(hasMetric){actions.push(xtab.model.getValuesDefaultFormatGridZoneAction(newFmtUnits,true));}var dm=model.docModel,controller=dm.controller,me=this,cbFunc=function(){controller.submitUndoRedoUpdates(actions,null,$WRAP(context.callback,controller._getXtabCallback(xtab),{success:function(res){dm.partialUpdate(res.data,dm.getUnitDefinitions(xtab.k));}},me.getUpdateCallback()));},altCbFunc=function(){controller.submitUndoRedoUpdates(altActions,null,$WRAP(context.callback,controller._getXtabCallback(xtab),{success:function(res){dm.partialUpdate(res.data,dm.getUnitDefinitions(xtab.k));}},me.getUpdateCallback()));};actions=(context.actions||[]).concat(this.getUpdateTemplateAction(actions));altActions=(context.actions||[]).concat(this.getUpdateTemplateAction(altActions));addPageByPartialUpdateKey.call(this,actions);addPageByPartialUpdateKey.call(this,altActions);var deferredExecuteGenerator=function(hookVFUnset){return function(){if(hookVFUnset){actions=me.docModel.wrapUnsetVisualizationFilterAction(actions);altActions=me.docModel.wrapUnsetVisualizationFilterAction(altActions);}if(axis===COLUMNS){me.checkAndWarnLargeItemsForAddUnits(items,cbFunc,altCbFunc,true,zone);}else{me.checkAndWarnForOutlineAddUnits(items,axis,cbFunc,mstrmojo.emptyFn,removeReplacedItems);}};};this.docModel.checkAndNotifyVFChangeOnDZUnitsUpdate({actions:actions,zm:me},deferredExecuteGenerator(true),deferredExecuteGenerator(false));},deleteItem:function deleteItem(zone,idx){this.changeZoneUnits(zone,[zone.items[idx]]);},deleteItems:function deleteItems(zone,items){this.changeZoneUnits(zone,items);},changeZoneUnits:function changeZoneUnits(zone,remove,add){var me=this,xtab=getHost.call(this),actions=[];remove=remove||[];add=add||[];add.forEach(function(item){actions=actions.concat(getAddAction.call(this,xtab,item,zone.id,item.dsId,zone.items.length-remove.length));},this);remove.forEach(function(item){item.axis=zone.id;item.unitPos=this.getUnitIndexInZone(zone,item)+1;actions=actions.concat(getDeleteActions.call(this,xtab,item));},this);addPageByPartialUpdateKey.call(this,actions);this.docModel.checkAndNotifyVFChangeOnDZUnitsUpdate({actions:actions,zm:me},function(){var view=xtab,controller=view.controller,dataService=controller&&controller.dataService();actions=me.docModel.wrapUnsetVisualizationFilterAction(dataService.getUpdateTemplateAction(view.k,actions));view.controller.submitUndoRedoTemplateWithCallback(view,actions,me.getUpdateCallback());},function(){xtab.controller.submitUndoRedoTemplateUpdates(xtab,actions,me.getUpdateCallback());});},getZoneAddCandidates:function getZoneAddCandidates(zone){return this.docModel.getDatasetUnits(zone.id===-1?["mx"]:["att"]);},clearAllUnits:function clearAllUnits(){clearAll.call(this);},canSupportImageThreshold:function canSupportImageThreshold(){return true;}});}());