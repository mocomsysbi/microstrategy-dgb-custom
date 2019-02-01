(function(){mstrmojo.requiresCls("mstrmojo.vi.models.DropZonesModel","mstrmojo.array","mstrmojo.hash","mstrmojo.vi.models._DropZoneCommon","mstrmojo.vi.ui.DatasetUnitMenuUtils","mstrmojo.mstr.EnumDSSXMLObjectTypes","mstrmojo.mstr.EnumDSSXMLBaseFormType");mstrmojo.requiresDescs(190,1388,3224,5188,11806,12287,13295,13296,13624,13625,14003,14655,14656,14717);var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,$DATASET_MENU_UTILS=mstrmojo.vi.ui.DatasetUnitMenuUtils,TEMPLATE_METRICS_ID="-1",$EBFT=mstrmojo.mstr.EnumDSSXMLBaseFormType,$FEATURES=mstrmojo.vi.enums.EnumFeatures,$EOBT=mstrmojo.mstr.EnumDSSXMLObjectTypes;mstrmojo.vi.models.TemplateBasedDropZones=mstrmojo.declare(mstrmojo.vi.models.DropZonesModel,[mstrmojo.vi.models._DropZoneCommon],{getClearAllUnitsActions:function getClearAllUnitsActions(){var actions=[],model=this.getHost().model;this.getDropZones().zones.forEach(function(zone){var axis=zone.id;zone.items.forEach(function(item,idx){if(item.did!==TEMPLATE_METRICS_ID){actions.push(model.getRemoveTemplateUnitAction($HASH.copy(item,{axis:axis,unitPos:idx+1})));}});});return actions;},getMultiUnitsMenuItems:function getMultiUnitsMenuItems(cfg,zone,items){var id=this.id;if(!mstrApp.isInVFConfigMode&&$DATASET_MENU_UTILS.getMultiSelectionShortcutMetricFunctions(items).length&&mstrmojo.resolveFeature($FEATURES.INSERT_NEW_METRIC)){cfg.addSubMenuItem(mstrmojo.desc(5188,"Calculation"),"",this.id,function(){return mstrmojo.all[id].getMultipleMetricsCalcMenus(zone,items,false);});cfg.addSeparator();}cfg.addMenuItem(mstrmojo.desc(190,"Remove"),"xt",function(){mstrmojo.all[id].deleteItems(zone,items);});},getExtraUnitMenuItems:function getUnitMenuItems(cfg,zone,item,itemContext){},getUnitMenuItems:function getUnitMenuItems(cfg,zone,item,editableLabelNode){if(!item){throw new Error(this.scriptClass+"::getUnitMenuItems: Item must be provided.");}var items=zone.items,xtabHost=this.getHost(),cnt=items.length,axis=zone.id,itemContext={zone:zone,axis:axis,idx:$ARR.indexOf(items,item),cnt:cnt,item:item,metricsAxis:(this.getHost().gridInfo||{}).tma,useDropzone:false},me=this,id=this.id,isTemplateMx=item.did===TEMPLATE_METRICS_ID,isElemGroup=(item.t===$EOBT.Consolidation&&item.st===12033),isInVFConfigMode=mstrApp.isInVFConfigMode,createDADMPriv=mstrmojo.resolveFeature($FEATURES.INSERT_NEW_METRIC),dModel=this.docModel,did=item.did;if(isElemGroup&&!isInVFConfigMode){cfg.addMenuItem(mstrmojo.desc(13296,"Edit Groups..."),"eg",function(){var cell={otp:item.t,id:did,n:item.n,axis:zone.id,ui:itemContext.idx};xtabHost.derivedElementsEdit(cell);});cfg.addSeparator();}if(!isTemplateMx){if(xtabHost.model.isRecursiveAttribute(item.did)){cfg.addMenuItem(mstrmojo.desc(14655,"Expand All Levels"),"",function(){var data={id:item.did};xtabHost.raExpandAll(data,true);});cfg.addMenuItem(mstrmojo.desc(14656,"Collapse All Levels"),"",function(){var data={id:item.did};xtabHost.raExpandAll(data,false);});cfg.addSeparator();}this.addSortMenu(itemContext,cfg,true);cfg.addSeparator();if(item.t===$EOBT.Metric&&!isInVFConfigMode){if(item.um){cfg.addMenuItem(mstrmojo.desc(3224,"Edit..."),"",function(){me.editDerivedMetric(itemContext);},itemContext);cfg.addSeparator();}if(createDADMPriv){if(dModel.findDatasetIdFromUnit(did)&&!dModel.isFromSolrCube(did)&&!dModel.isFromMDXCube(did)){cfg.addSubMenuItem(mstrmojo.desc(11806,"Aggregate By"),"",id,me.getAggregateByMetricSubMenu,itemContext);cfg.addSeparator();}cfg.addEditorMenuItem(mstrmojo.desc(5188,"Calculation"),id,me.getCalculationEditorCfg,itemContext);cfg.addSubMenuItem(mstrmojo.desc(12287,"Shortcut Metric"),"",id,me.getShortcutMetricSubMenu,itemContext);cfg.addMenuItem(mstrmojo.desc(13624,"Create Metric..."),"",function(){me.newDerivedMetric(itemContext);},itemContext);}}if(item.t===$EOBT.Attribute){var attrId=item.did||"",dataset=attrId?$DATASET_MENU_UTILS.getDatasetFromAttributeId(this.docModel.datasets,attrId):null,isDynamicLinkAttr=this.isDynamicLink(item);if((!dataset||!this.docModel.isMDXDataset(dataset))&&!isInVFConfigMode){if(item.da){cfg.addMenuItem(mstrmojo.desc(3224,"Edit..."),"",function(){me.editDerivedAttribute(itemContext);},itemContext);cfg.addSeparator();}if(((!dataset)||!$DATASET_MENU_UTILS.isCGorCon(item,dataset))&&!isDynamicLinkAttr&&createDADMPriv){cfg.addMenuItem(mstrmojo.desc(13625,"New Attribute..."),"",function(){me.newDerivedAttribute(itemContext);},itemContext);cfg.addMenuItem(mstrmojo.desc(14717,"Create Links..."),"",function(){me.newDynamicLinkAttr(itemContext);},itemContext);}}if(!isInVFConfigMode&&!$DATASET_MENU_UTILS.hasOldDEOverDatasets(item.did,this.docModel.datasets)&&!isDynamicLinkAttr&&item.st!==3076){cfg.addMenuItem(mstrmojo.desc(13295,"Create Groups..."),"eg",function(){var cell={otp:item.t,id:item.did,n:item.n,axis:zone.id,ui:itemContext.idx};xtabHost.derivedElementsEdit(cell);});}}this.getExtraUnitMenuItems(cfg,zone,item,itemContext);cfg.addSeparator();if(me.hasReplaceCandidates(itemContext)&&(!(mstrApp.isAppStatePresentation&&mstrApp.isAppStatePresentation())||!!mstrmojo.resolveFeature($FEATURES.WEB_DRILL_AND_LINK))){cfg.addSubMenuItem(mstrmojo.desc(14003,"Replace With"),"",id,me.getReplaceSubMenu,itemContext);}cfg.addMenuItem(mstrmojo.desc(1388,"Rename"),id,function(){mstrmojo.all[id].renameItem(editableLabelNode,item);});cfg.addMenuItem(mstrmojo.desc(190,"Remove"),"xt",function(){mstrmojo.all[id].deleteItem(zone,itemContext.idx);});}}});}());