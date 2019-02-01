(function(){mstrmojo.requiresCls("mstrmojo.DocSelector","mstrmojo.vi.ui.rw._HasVisSelections","mstrmojo.vi.ui.rw.selectors._IsMultiUnitControl","mstrmojo.vi.ui.rw.selectors._BrushesAndHighlights","mstrmojo.hash","mstrmojo.array","mstrmojo.func","mstrmojo.VisUtility","mstrmojo.PerformanceLogOutput");var $MOJO=mstrmojo,$HASH=$MOJO.hash,$RW=$MOJO.vi.ui.rw,$VisUtility=$MOJO.VisUtility,$_HasVisSelections=$RW._HasVisSelections,$_IsMultiUnitControl=$RW.selectors._IsMultiUnitControl,$_BrushesAndHighlights=$RW.selectors._BrushesAndHighlights,$WRAP=mstrmojo.func.wrapMethods,$PerfLog=$MOJO.PerformanceLogOutput;function generateSelectionDataFromExp(nodeData){var gtsModel,selectedData,exp=nodeData.sc.exp,nds=exp&&exp.nds,gts=nodeData&&nodeData.gts,nodeKey=nodeData&&nodeData.k,docXtabModel=mstrmojo.DocXtabModel.prototype,scope=$HASH.copy($_HasVisSelections,{k:nodeKey,model:docXtabModel});if(!nodeData||!gts||!exp||!nds||nds.length<=0){return{};}gtsModel=(gts.row||[]).concat(gts.col||[]);$VisUtility.modifyScExp(exp,gtsModel,docXtabModel,{});selectedData=$_IsMultiUnitControl.getSelectorDataFromExpression(exp);scope.addSelectionsFromExpression(selectedData);return scope.getSelectionHash();}mstrmojo.VisDocSelector=mstrmojo.declare(mstrmojo.DocSelector,null,{scriptClass:"mstrmojo.VisDocSelector",postBuildRendering:function postBuildRendering(){this._super();var me=this,docModel=me.model,filterPortlet=me.parent;if(filterPortlet&&filterPortlet.refreshFilterSummaryBar){filterPortlet.refreshFilterSummaryBar();}if(docModel){this.clearSelectorListener=docModel.attachEventListener("clearSelector",this.id,function(evt){if(evt.k===me.k){var visSelectorBox=this.content;if(visSelectorBox){visSelectorBox.updateSummaryText({});}}});}},onAppStateChange:function onAppStateChange(evt){var appStates=mstrmojo.vi.VisualInsightApp.APP_STATES,pauseMode=appStates.PAUSE,isPauseMode=mstrApp.isAppStatePause&&mstrApp.isAppStatePause(),wasPauseMode=!!(evt.valueWas&pauseMode);if(isPauseMode!==wasPauseMode){var filterPortlet=this.parent;if(filterPortlet){filterPortlet.updateSummaryBar();}}},getWidgetConfig:function getWidgetConfig(selectorContainer,selectorStyle,defn,elements){var data=selectorContainer.node&&selectorContainer.node.data,sc=data&&data.sc,cfg=this._super(selectorContainer,selectorStyle,defn,elements);if(sc){cfg.exp=sc&&sc.exp;cfg.include=sc.include;}return cfg;},getSelectionInfo:function getSelection(){var selectionCache,data=this.node&&this.node.data,sc=data&&data.sc,exp=sc&&sc.exp;if(exp&&exp.nds){return generateSelectionDataFromExp(data);}selectionCache=$_HasVisSelections.getSelectionCache.call(this);return selectionCache&&selectionCache._viSelections;},updateWidget:function updateWidget(selectorContainer){var selectorWidget=this._super(selectorContainer);if(selectorWidget){selectorWidget.include=this.include;if(selectorWidget.updateSummaryText){selectorWidget.updateSummaryText(this.getSelectionInfo());}}return selectorWidget;},clearSelector:function clearSelector(applyNow){$PerfLog.startTimer({functionName:"VisFilter.unsetFilter",purpose:"from Unset filter to End"},"timerid_VisFilter_unsetFilter");var evt,filterPortlet=this.parent,visSelectorBox=this.content,data=this.node&&this.node.data,sc=data&&data.sc,sid=(data&&(data.sid!==undefined))?data.sid:1,selections=this.getSelectionInfo(),noSelection=!selections||Object.keys(selections).length===0;if(filterPortlet&&filterPortlet.closeVisSelectorPanel){filterPortlet.closeVisSelectorPanel();}if(!sc||noSelection){return ;}evt={ck:sc.ck,ct:sc.ct,ctlKey:sc.ckey,selections:[],sid:sid,tks:sc.tks,type:521,isNavigation:false,ignoreTargetData:true};evt[applyNow?"forceApply":"forceBuffer"]=true;sc.exp=null;$_HasVisSelections.setSelectionCache.call(this,{});$_BrushesAndHighlights.clearSelections.call(this);this.slice(evt);if(visSelectorBox){visSelectorBox.updateSummaryText({});}},update:function update(node){if(mstrApp.isInVFInteractMode){var filterPortlet=this.parent;if(filterPortlet){filterPortlet.updateVizSelectorPanel();}}this._super(node);},supportsInclude:function supportsInclude(){return true;},applySelections:function applySelections(rEvt){rEvt.include=this.include;this.slice(rEvt);},initControlInfo:function initControlInfo(){this._super();var node=this.node,data=node&&node.data,sc=data&&data.sc;if(sc){$HASH.copyProps(["allselected","ckey","ck","tks","style","showall","ct","include"],sc,this);}},onincludeChange:function onincludeChange(evt){var include=evt.value,model=this.model,fps=this.isInFilterPanel()&&this.getFilterPanel(),update=model.getDataService().newUpdate(fps);this.include=include;if(fps&&fps._bufferedSlices){fps.applyBufferedSlices(true,update);}var me=this,k=this.node.k,ds=model.getDataService(),sliceCallback=model.getSliceCallback({type:parseInt(this.type,10),src:this.k,ck:this.ck,ctlKey:this.ckey,tks:this.tks,include:this.include,changeInclude:true}),actions=[ds.getSelectorIncludeAction({ck:this.ck,ckey:this.ckey,type:this.type,include:include})],callback=$WRAP(sliceCallback,{success:function(res){me.set("wait",false);model.partialUpdate(res.data,model.getTargetDefn(k));}});var deferredEvt=this.deferredEvt;if(!!deferredEvt){model.sliceDeferred(update,deferredEvt);}actions[0].partialRetrieval=ds.newRetrievalKeysConfig().addNode(k);actions=!!deferredEvt?actions.concat(update.actions):(update.actions||[]).concat(actions);this.set("wait",true);model.controller.cmdMgr.execute({execute:function(){this.submit(actions,callback);},urInfo:{extraPuKeys:me.ck.split("\u001E").slice(1),treesToRender:3}});},generateSummaryText:function(itemCount){if(this.include){return itemCount>1?mstrmojo.desc(15291,"## data points included").replace("##",itemCount):mstrmojo.desc(15292,"1 data point included");}else{return itemCount>1?mstrmojo.desc(15293,"## data points excluded").replace("##",itemCount):mstrmojo.desc(15294,"1 data point excluded");}}});}());