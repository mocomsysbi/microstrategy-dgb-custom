(function(){mstrmojo.requiresClsP("mstrmojo","Editor","HBox","Box","Button","dom","css","desc","hash","array");mstrmojo.requiresCls("mstrmojo.vi.controllers.CustomSortModeActionMgr");var $NWB=mstrmojo.Button.newWebButton,$DOM=mstrmojo.dom,$CSS=mstrmojo.css,$DESC=mstrmojo.desc,$ARR=mstrmojo.array,$HASH=mstrmojo.hash,TOOLBAR_HEIGHT=36,TOOLBAR_MIN_WIDTH=600;mstrmojo.requiresDescs(1442,221,5705,134);function addVizBox(){var vizBox=this.vizBox=this.model.createVizBoxForCustomSort(this.nodeKey,{width:this.width,height:(parseInt(this.height)-TOOLBAR_HEIGHT-this.spacer)+"px",left:"0px",top:this.spacer+"px"});this.visContainer.addChildren(vizBox);var controller=vizBox.boxContent.controller,oid=controller.model.oid,oldKey=oid+"."+(this.oldNodeKey||this.srcViz.k),pos=(controller.getScrollPosition(oldKey))||{x:0,y:0},newKey=oid+"."+this.nodeKey;controller.addScrollPosition(newKey,pos.x,pos.y);return vizBox;}function adjustTitleBar(){var ttlNode=this.titleContainerNode,style=ttlNode.style,pos=$DOM.position(ttlNode);if(pos.w<TOOLBAR_MIN_WIDTH){style.width=TOOLBAR_MIN_WIDTH+"px";style.position="relative";style.left=(pos.w-TOOLBAR_MIN_WIDTH)/2+"px";style.border="solid 1px rgba(68,70,73,0.2)";}}function adjustPosition(){var vpPos=$DOM.position(mstrApp.rootCtrl.view.domNode),tbPos=$DOM.position(this.titleContainerNode),ePos=$DOM.position(this.editorNode),delta;if(vpPos.w>=tbPos.w){if(tbPos.x<vpPos.x){delta=ePos.x-tbPos.x;this.set("left",(vpPos.x+delta)+"px");}else{if(tbPos.x+tbPos.w>vpPos.x+vpPos.w){delta=tbPos.x+tbPos.w-(ePos.x+ePos.w)+8;this.set("left",(vpPos.x+vpPos.w-ePos.w-delta)+"px");}}}}function updateEditorSize(){var editorNodeStyle=this.editorNode.style;editorNodeStyle.width=this.width;editorNodeStyle.height=this.height;}function selectVizBox(){this.vizBox.toggleBoxSelection(true);}function applySortToSrcViz(callback){var silentActions=this.actionMgr.getSlientActionsBefore();if(silentActions.length>0){var customSortActions=$ARR.map(silentActions,function(act){return act&&act.submitAction;}),customSortAct=this.wrapCustomSortAction(customSortActions,false),srcViz=this.srcViz,extras={hideCancel:true};srcViz.model.customSort(customSortAct,srcViz.controller._getXtabCallback(srcViz,$HASH.copy(callback)),extras);}}function applySortToSrcVizAndCSViz(){var silentActions=this.actionMgr.getContSlientActionsBefore(),me=this,callback={success:function(res,request){if(silentActions.length>0){var customSortActions=$ARR.map(silentActions,function(act){return act&&act.submitAction;}),customSortAct=me.wrapCustomSortAction(customSortActions,true),xtab=me.vizBox.boxContent,extras={hideCancel:true,noUpdate:true,preserveStid:true,noDeltaXML:true},dataService=xtab.model.getDataService();dataService.submitUpdates(dataService.getUpdateTemplateAction(xtab.k,customSortAct),xtab.controller._getXtabCallback(xtab),extras);}}};applySortToSrcViz.call(this,callback);}mstrmojo.vi.ui.rw.CustomSortDisplayPanel=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.vi.ui.rw.CustomSortDisplayPanel",cssClass:"mstrmojo-CustomSortDisplayPanel",actionMgr:null,init:function init(props){this.actionMgr=new mstrmojo.vi.controllers.CustomSortModeActionMgr({csDisplayPanel:this});this._super(props);},postBuildRendering:function postBuildRendering(){this.getVizBox();var rtn=this._super();if(!this._listenerProc){var me=this,timeoutId=null,fn=this._listenerProc=function(e){window.clearTimeout(timeoutId);timeoutId=window.setTimeout(function(){adjustPosition.call(me);},150);};$DOM.attachEvent(window,"resize",fn);}return rtn;},destroy:function destroy(ignoreDom){if(this._listenerProc){$DOM.detachEvent(window,"resize",this._listenerProc);}this._super(ignoreDom);},children:[{scriptClass:"mstrmojo.HBox",slot:"titlebarNode",alias:"leftBox",cssClass:"left title",children:[{scriptClass:"mstrmojo.Label",text:$DESC(5705,"Custom Sort")}]},{scriptClass:"mstrmojo.HBox",slot:"titlebarNode",alias:"urBox",cssClass:"left icons",children:[{scriptClass:"mstrmojo.Widget",markupString:'<div id="{@id}" class="icn {@cssClass}" mstrAttach:click></div>',alias:"undo",cssClass:"undo disabled",enabled:false,onclick:function(){if(this.enabled){var floatingPanel=this.parent.parent;floatingPanel.actionMgr.undo();}},bindings:{enabled:function(){return !!this.parent.parent.canUndo;}},onenabledChange:function(){$CSS.toggleClass(this.domNode,"disabled",!this.enabled);}},{scriptClass:"mstrmojo.Widget",alias:"redo",cssClass:"redo disabled",enabled:false,markupString:'<div id="{@id}" class="icn {@cssClass}" mstrAttach:click></div>',onclick:function(){if(this.enabled){var floatingPanel=this.parent.parent;floatingPanel.actionMgr.redo();}},bindings:{enabled:function(){return !!this.parent.parent.canRedo;}},onenabledChange:function(){$CSS.toggleClass(this.domNode,"disabled",!this.enabled);}}]},{scriptClass:"mstrmojo.HBox",slot:"titlebarNode",alias:"btnBox",cssClass:"btnBox",children:[$NWB($DESC(1442,"OK"),function(){if(this.enabled){var floatingPanel=this.parent.parent;floatingPanel.removeCSViz(function(){applySortToSrcViz.call(floatingPanel);floatingPanel.close();},false);}},true,{alias:"savebtn",enabled:false,bindings:{enabled:function(){return this.parent.parent.canApply;}}}),$NWB($DESC(134,"Apply"),function(){if(this.enabled){var floatingPanel=this.parent.parent,actionMgr=floatingPanel.actionMgr;applySortToSrcVizAndCSViz.call(floatingPanel);actionMgr.appendHistUnsilentActions(actionMgr.getUnslientActionsBefore());actionMgr.reset();}},true,{enabled:false,bindings:{enabled:function(){return this.parent.parent.canApply;}}}),$NWB($DESC(221,"Cancel"),function(){var floatingPanel=this.parent.parent;floatingPanel.removeCSViz(null,true);floatingPanel.close();})]},{scriptClass:"mstrmojo.Box",alias:"visContainer",slot:"containerNode"}],oldNodeKey:null,nodeKey:null,vizBox:null,model:null,srcPanelKey:null,srcLayoutKey:null,srcViz:null,srcUnit:null,srcAxis:-1,getVizBox:function getVizBox(){return this.vizBox=this.vizBox||addVizBox.call(this);},setVizBoxPortalStateRestore:function setVizBoxPortalStateRestore(){this.getVizBox().defn.ds=0;},onOpen:function onOpen(){updateEditorSize.call(this);adjustTitleBar.call(this);selectVizBox.call(this);adjustPosition.call(this);var xtab=this.vizBox.boxContent,selCells=xtab.selCells||[];$ARR.forEach(selCells,function(cell){xtab.handleSelection({},null,cell);xtab.clearHighlights();});},onClose:function onClose(){var vizBox=this.vizBox,docModel=this.model;if(vizBox.boxContent.cellHoverMgr.removeCue){vizBox.boxContent.cellHoverMgr.removeCue();}mstrmojo.dnd.enable();delete this.actionMgr;delete this.silentMask;this.destroy();},removeCSViz:function removeCSViz(callback,slient){var docModel=this.model,extras,cb;if(slient){extras={config:{silent:true}};}else{extras={hideCancel:true};}extras.style={params:{treesToRender:0}};extras=$HASH.copy({noUpdate:true,preserveStid:true,noDeltaXML:true},extras);if(callback){cb={success:function(){callback();}};}var rmAction=docModel.getRemoveUnitAction(this.vizBox);rmAction.clearTargets=true;docModel.getDataService().submitUpdates(rmAction,cb,extras);},recreateCSVizForUndo:function recreateCSVizForUndo(splitUnsilentUTActions,silentActions,callback){var docModel=this.model,xtabModel=this.srcViz.model,dataService=xtabModel.getDataService(),newVizKey=docModel.getNextKey(),actions,me=this;var rmAction=docModel.getRemoveUnitAction(this.vizBox);rmAction.clearTargets=true;actions=[rmAction];var i=0,len=splitUnsilentUTActions.length,extraActions;if(i<len){extraActions=splitUnsilentUTActions[i];i++;}actions=actions.concat(xtabModel.getCreateCSVizActions(this.srcUnit,this.srcAxis,newVizKey,extraActions));var cbFinishAllActions=function(res){var layoutKey=me.srcLayoutKey,panelKey=me.srcPanelKey,resData=res.data,layoutData=$ARR.filterOne(resData.layouts,function(layout){return layout.k===layoutKey;});docModel.controller.view.updateXtabStyles(layoutKey,layoutData.xtabStyles);docModel.updateDefnCache(res.defn,[newVizKey,panelKey]);docModel.updateDataCache(resData,docModel.getTargetDefn(newVizKey));me.oldNodeKey=me.nodeKey;me.nodeKey=newVizKey;me.vizBox.destroy();delete me.vizBox;me.setVizBoxPortalStateRestore();var vizBox=me.getVizBox();vizBox.render();var currentIndex=0,totalSActions=(silentActions||[]).length,performSilentActionsRecursively=function(){if(currentIndex<totalSActions){silentActions[currentIndex++].perform(false,performSilentActionsRecursively,true);}else{mstrApp.hideWait(true);var mgr=me.actionMgr;if(mgr.hasFailedSorts()){var failedStartIndex=mgr.getActionsCount()-mgr.getFailedSortsCount();mgr.actions.splice(failedStartIndex);mgr.pos=failedStartIndex-1;me.updateStatus();mgr.showFailedSortsAndReset();if(callback&&callback.fail){callback.fail();}}else{if(callback&&callback.success){callback.success();}}}};performSilentActionsRecursively();},cbSendActionsRecursively=function(){dataService.submitUpdates(actions,{success:function(res,request){if(i<len){actions=dataService.getUpdateTemplateAction(newVizKey,splitUnsilentUTActions[i]);i++;cbSendActionsRecursively();}else{cbFinishAllActions(res);}}},{style:{params:{treesToRender:3}},noUpdate:true,preserveStid:true,noDeltaXML:true,hideCancel:true});};cbSendActionsRecursively();},wrapCustomSortAction:function wrapCustomSortAction(actions,forCSViz){var unit=this.srcUnit,axis=forCSViz?1:this.srcAxis,ROW_AXIS=1,subTotalsPos=this.srcViz.model.data.gts[((this.srcAxis===ROW_AXIS)?"row":"col")+"SubPos"];return{act:"customSortAddActions",unitType:unit.otp,unitId:unit.id,axis:axis,subTotalsPos:[subTotalsPos],actions:actions};},maskSilently:function maskSilently(mask){var silentMask=this.silentMask;if(!silentMask){var curtainNode=this.curtainNode,tmp=document.createElement("div");tmp.innerHTML=curtainNode.outerHTML;tmp.firstChild.style.zIndex=this.zIndex+1;tmp.firstChild.style.opacity="0";tmp.firstChild.style.display="none";silentMask=this.silentMask=this.domNode.appendChild(tmp.firstChild);}silentMask.style.display=mask?"block":"none";},updateStatus:function updateStatus(){var actionMgr=this.actionMgr;this.set("canUndo",actionMgr.pos>=0);this.set("canRedo",(actionMgr.actions.length-1)>actionMgr.pos);this.set("canApply",actionMgr.getSlientActionsBefore().length>0);}});}());