(function(){mstrmojo.requiresCls("mstrmojo.vi.ui.BoxPanel","mstrmojo._HasBuilder","mstrmojo._IsPanelStack","mstrmojo.vi.ui.rw._IsPanelStack","mstrmojo.vi.ui.rw._HasBufferSlice","mstrmojo.ui.menus._HasMenuPopup","mstrmojo.ui.menus.MenuConfig","mstrmojo.Label","mstrmojo.Button","mstrmojo.vi.ui.PanelPortlet","mstrmojo.vi.ui.DatasetUnitMenuUtils","mstrmojo.vi.models.PanelFormatSaver","mstrmojo.ui.CheckList","mstrmojo.vi.ui._HasMask","mstrmojo.array","mstrmojo.dom","mstrmojo.css","mstrmojo.string","mstrmojo.vi.ui.rw.selectors.EnumVizSelectorMode");mstrmojo.requiresDescs(134,1143,3581,3582,11473,11474,11815,11816,11817,11818,14594);var $ARR=mstrmojo.array,$DOM=mstrmojo.dom,$NWB=mstrmojo.Button.newWebButton,$STR=mstrmojo.string,UNIT_TYPE_MAP={att:12,mx:4},FILTER_MODE={CLEAR_TARGET:1,TARGET_ALL_BELOW:2},$FUNC=mstrmojo.func,$WRAP=$FUNC.wrapMethods,$DS_UTILS=mstrmojo.vi.ui.DatasetUnitMenuUtils,$VIZ_SELECTOR_MODE=mstrmojo.vi.ui.rw.selectors.EnumVizSelectorMode;function getFilterKeys(filterDefinitions){return(filterDefinitions||[]).map(function(filterDef){return filterDef.ckey;});}function getAddFilterEditorConfig(){var model=this.model,existingFiltersDefinitions=this.getFilterDefinitions(),unitCheckLists=[],unitMap={},id=this.id;function addEditorChild(title,unitType){var items=model.getDatasetUnits([unitType],function(unit){var t=unit.t;if(!unitMap[unit.did]&&(t===12||t===4||t===1||t===47)){if($ARR.find(existingFiltersDefinitions,"srcid",unit.did)<0&&unit.hide){return false;}unitMap[unit.did]=true;return true;}return false;});items=$DS_UTILS.getSortedDatasetUnits(items);if(!items.length){return ;}var units=(model.datasetsSettings&&model.datasetsSettings.units)||{};items=items.filter(function(unit){return !(units[unit.n]&&units[unit.n].completeHide)&&$DS_UTILS.isValidAddToFP(model,unit,true);});var selectedIndices={};(items||[]).forEach(function(item,idx){if($ARR.find(existingFiltersDefinitions,"srcid",item.did)>-1){selectedIndices[idx]=true;}});var ds=model.datasets,key,dscount=0;for(key in ds){if(ds.hasOwnProperty(key)&&ds[key].did){++dscount;}}var list=new mstrmojo.ui.CheckList({cssClass:"units",items:items.map(function(item){item.tt=item.n+" ("+item.ds+")";item.css=$DS_UTILS.getUnitCssClass(item);return item;}),selectedIndices:selectedIndices,useRichTooltip:true,showTooltip:function showTooltip(evt,win){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),item=this.getItemFromTarget(target),child=target.firstChild,pos;target.setAttribute("title","");if(target.offsetWidth<child.offsetWidth||dscount>0){pos=$DOM.position(this.getItemNodeFromTarget(target));this.richTooltip={posType:mstrmojo.tooltip.POS_TOPLEFT,cssClass:"vi-regular vi-tooltip-C",content:item.tt,top:pos.y,left:pos.x+pos.w+18};mstrmojo.ui.CheckList.prototype.showTooltip.apply(this,evt,win);}}});unitCheckLists.push({scriptClass:"mstrmojo.vi.ui.PanelPortlet",title:title,children:[list],t:UNIT_TYPE_MAP[unitType],getSelectedItems:function(){return(list.getSelectedItems()||[]).filter(function(item){return $ARR.find(existingFiltersDefinitions,"srcid",item.did)===-1;});},getUnselectedFiltersDefns:function(){var type=this.t;return existingFiltersDefinitions.filter(function(defn){return !(units[defn.ttl]&&units[defn.ttl].completeHide)&&($ARR.find(list.getSelectedItems()||[],"did",defn.srcid)===-1)&&(defn.srct===type||type===12&&defn.srct===47);}).sort(function(a,b){var getZIndex=function(a){return(a.fmts&&a.fmts["z-index"])||0;};return(getZIndex(a)>getZIndex(b))?1:-1;});},updateListScrollbars:function(){list.updateScrollbars();}});}addEditorChild(mstrmojo.desc(3581,"Attributes"),"att");addEditorChild(mstrmojo.desc(3582,"Metrics"),"mx");return new mstrmojo.ui.menus.EditorConfig({data:{},cssClass:"showFilters",contents:unitCheckLists,onOpen:function(){unitCheckLists.forEach(function(portlet){portlet.updateListScrollbars();});},fnOk:function(){var unitsToAdd=[],definitionsToDelete=[];unitCheckLists.forEach(function(portlet){unitsToAdd=unitsToAdd.concat(portlet.getSelectedItems());definitionsToDelete=definitionsToDelete.concat(portlet.getUnselectedFiltersDefns());});mstrmojo.all[id].model.changeFilterStackSelectors(unitsToAdd,definitionsToDelete);}});}function updateAutoApply(value){var fps=this,model=fps.model,dataService=model.getDataService(),callback=$WRAP({success:function(){value=!value;fps.set("autoApply",value);fps.defn.set("cas",value);fps.widgetResized();}},model.getRebuildCallback()),puKeys=[];model.execute({execute:function(){var update=dataService.newUpdate(this);if(value){fps.applyBufferedSlices(true,update,puKeys);}fps.set("autoApply",value);fps.defn.set("cas",value);update.addActions(model.getUnitFormatAction(fps,1,{FormattingLayout:{CtlAutoSubmit:(value?1:0)}}));update.addCallbacks({success:mstrmojo.emptyFn});update.submit();fps.widgetResized();},urInfo:{extraPuKeys:puKeys,callback:callback}});}function openMenu(){var stack=this,menuCfg=new mstrmojo.ui.menus.MenuConfig({supportsScroll:true,isHostedWithin:false,maxHeight:$DOM.getMaxScrollHeight()}),hasFilters=!!this.getFilters().length,isPresentationMode=mstrApp.isAppStatePresentation(),isPauseMode=mstrApp.isAppStatePause(),EXPANDED=0,COLLAPSED=1,anyHasDS=function anyHasDS(ds){return !!stack.getFilterDefinitions().filter(function(item){return item.ds===ds;}).length;};if(!isPresentationMode){if(this.model.getDatasetUnits(["mx","att"]).length){var id=stack.id;menuCfg.addEditorMenuItem(mstrmojo.desc(11815,"Add Filters"),id,getAddFilterEditorConfig);menuCfg.addMenuItem(mstrmojo.desc(15288,"Add Visualization Filter..."),"",function(){var docModel=stack.model,container=docModel.addVisFilterContainer(),title=docModel.getNextVisFilterTitle();docModel.addVisualizationSelector(container,$VIZ_SELECTOR_MODE.CONFIGURATION,title);mstrApp.getRootController().enterVizFilterConfigMode(title,false);});}else{menuCfg.addDisabledMenuItem(mstrmojo.desc(11815,"Add Filters"));menuCfg.addDisabledMenuItem(mstrmojo.desc(15288,"Add Visualization Filter..."));}}if(hasFilters){menuCfg.addMenuItem(mstrmojo.desc(14594,"Unset All Filters"),"cf",function(){stack.clearBuffSlices();stack.contents.clearAllFilter();stack.applyBufferedSlices();});}menuCfg.addSeparator();if(!isPresentationMode){if(!isPauseMode){menuCfg.addToggleMenuItem(mstrmojo.desc(11818,"Auto-apply Filters"),"atc",function(){updateAutoApply.call(this,true);},function(){updateAutoApply.call(this,false);},stack.id,stack.autoApply);menuCfg.addSeparator();}var fnUpdFiltering=function(fm){var fps=this.ctxt,nodeKey=fps.k,model=fps.model,actions=model.getDataService().getChangeFilteringAction(fps.k,fm,true,[nodeKey]),callback={success:function(doc){model.partialUpdate(doc.data,model.getTargetDefn(nodeKey),doc.defn,getFilterKeys(fps.getFilterDefinitions()));}},extras={style:{params:{treesToRender:3}}};model.execute({execute:function(){this.submit(actions,callback,extras);},urInfo:{treesToRender:3}});};menuCfg.addMenuItem(mstrmojo.desc(11474,"Target All Filters Below"),"",function(){fnUpdFiltering.call(this,FILTER_MODE.TARGET_ALL_BELOW);},this);menuCfg.addMenuItem(mstrmojo.desc(11473,"Clear All Targeting"),"",function(){fnUpdFiltering.call(this,FILTER_MODE.CLEAR_TARGET);},this);menuCfg.addSeparator();}if(hasFilters){var enableExpand=anyHasDS(COLLAPSED),enableCollapse=anyHasDS(EXPANDED);menuCfg[enableExpand?"addMenuItem":"addDisabledMenuItem"](mstrmojo.desc(11816,"Expand All"),"fea",enableExpand?function(){stack.contents.toggleFilters(false);}:null,null);menuCfg[enableCollapse?"addMenuItem":"addDisabledMenuItem"](mstrmojo.desc(11817,"Collapse All"),"fca",enableCollapse?function(){stack.contents.toggleFilters(true);}:null,null);}if(!isPresentationMode){menuCfg.addSeparator();this.addHelpTopicMenuItem(menuCfg,mstrmojo.desc(1143,"Help"),"filter_panel.htm");}menuCfg.hostId=stack.id;menuCfg.isHostedWithin=false;menuCfg.hostElement=stack.fpsTitleBar.menuBtn.domNode;if(menuCfg.hasMenuItems()){stack.openPopup(menuCfg.newInstance());}}mstrmojo.vi.ui.rw.FilterPanelStack=mstrmojo.declare(mstrmojo.vi.ui.BoxPanel,[mstrmojo._HasBuilder,mstrmojo._IsPanelStack,mstrmojo.vi.ui.rw._IsPanelStack,mstrmojo.vi.ui.rw._HasBufferSlice,mstrmojo.ui.menus._HasMenuPopup,mstrmojo.vi._MonitorsAppState,mstrmojo.vi.ui._HasMask],{scriptClass:"mstrmojo.vi.ui.rw.FilterPanelStack",markupMethods:{onvisibleChange:function(){if(this.visible){this.domNode.style.display=this.cssDisplay;this.getFilters().forEach(function(selector){selector.refresh();});}else{this.domNode.style.display="none";this.onStatusChange();}}},title:"",k:"",contents:null,applyEnabled:false,editTitleOnDoubleClick:true,setOpenStatus:function setOpenStatus(isOpen,noSave,update,skipReLayout){if(!noSave){if(update){var model=this.model,actions=update.actions;actions.push(model.getUnitFormatAction(this,1,{FormattingAppearance:{Visible:true}}));}else{mstrmojo.vi.models.PanelFormatSaver.getPanelSaver(this.model,{visible:{set:"FormattingAppearance",name:"Visible"}},this).saveProperty("visible",true);}}if(!isOpen){this.onStatusChange();}this._super(isOpen,noSave,update,skipReLayout);},getOpenStatus:function getOpenStatus(){return this.parent;},children:[{scriptClass:"mstrmojo.Box",slot:"controlNode",alias:"fpsTitleBar",cssClass:"fp-titlebar",ignoreLayout:true,children:[{scriptClass:"mstrmojo.EditableLabel",cssClass:"fp-title",alias:"fpsTitle",editOnClick:false,useRichTooltip:true,bindings:{text:function(){return this.parent.parent.title;},editOnDoubleClick:function(){return this.parent.parent.editTitleOnDoubleClick;}},updateTooltipConfig:function updateTooltipConfig(evt){var target=evt.target,position=$DOM.position(target);this.richTooltip={posType:mstrmojo.tooltip.POS_TOPLEFT,cssClass:"vi-regular vi-tooltip-A",content:$STR.encodeHtmlString(this.parent.parent.title),top:position.y+position.h+3,left:position.x+4};},onTextEditComplete:function(textChanged,oldText){if(textChanged){var fp=this.parent.parent;fp.titleEdited(this.text,oldText);}},getLayoutOffsets:function getLayoutOffsets(){return{h:2,w:2};}},{scriptClass:"mstrmojo.Button",alias:"menuBtn",cssClass:"fp-menu",onclick:function(){openMenu.call(this.parent.parent);}}]},{scriptClass:"mstrmojo.Box",slot:"controlNode",alias:"fpsBtnBar",cssClass:"fp-btnbar",ignoreLayout:true,bindings:{visible:"!this.parent.autoApply"},children:[$NWB(mstrmojo.desc(134,"Apply"),function(){this.parent.parent.applyBufferedSlices();},true,{alias:"applyBtn",bindings:{enabled:"this.parent.parent.applyEnabled"}})]}],layoutConfig:{h:{controlNode:"auto",containerNode:"100%"},w:{controlNode:"100%",containerNode:"100%"},xt:true},init:function init(props){this._super(props);this.controller.view.attachEventListener("destroyLayout",this.id,function(evt){var filterStackType=mstrmojo.vi.models.VIComponentMap.TYPES.FILTER_STACK;if(this.builder.getLayoutVIMap(evt.key).getComponentKey(filterStackType)===this.k){this.destroy();}});if(mstrApp.isAppStatePause&&mstrApp.isAppStatePause()){this.defn.set("cas",false);}this.set("autoApply",this.isAutoApply());this.set("title",this.model.getCurrentLayoutDef().title||"");this.set("editTitleOnDoubleClick",mstrApp.allowWebDashboardDesign());},postBuildRendering:function postBuildRendering(){this._super();if(this.contents){this.contents.attachEventListener("filterPanelUpdated",this.id,this.updateScrollbars);}},postBuildDom:function postBuildDom(){if(this._super){this._super();}if(mstrApp.isAppStatePause&&mstrApp.isAppStatePause()&&this.model&&this.model.hasRADataset()){this.set("isMasked",true);}},updateScrollbars:function updateScrollbars(){this._super();},getFilterDefinitions:function getFilterDefinitions(){return this.getFilters().map(function(selector){return selector.defn;});},getFilters:function getFilters(){var contents=this.contents;return contents?(contents.children||[]).map(function(child){return child.selector;}):[];},isEmpty:function isEmpty(){var hasFilter;try{hasFilter=this.node.data.panels[0].objects[0];}catch(e){}return !!hasFilter;},isAutoApply:function isAutoApply(){var defn=this.defn||this.node.defn;if(defn.cas===undefined){var model=this.model;return !model.hasMDXRADataset(model.datasets);}return defn.cas;},getFilterBySrcId:function getFilterBySrcId(srcid){return this.getFilters().filter(function(filter){return filter.defn.srcid===srcid;})[0];},widgetResized:function widgetResized(){if(this.hasRendered){this.containerNode.style.height=parseInt(this.height,10)-this.controlNode.offsetHeight+"px";}this._super();var titleLabel=this.fpsTitleBar&&this.fpsTitleBar.fpsTitle;if(titleLabel&&titleLabel.widgetResized){titleLabel.widgetResized();}},titleEdited:function titleEdited(text,oldText){var model=this.model;model.changeCurrLytTabTtl(text,oldText);},onscroll:function onscroll(){this._super();var filterPortlets=this.contents&&this.contents.children;if(filterPortlets&&filterPortlets[0]){filterPortlets[0].updateForScroll();}},onAppStateChange:function onAppStateChange(evt){var appStates=mstrmojo.vi.VisualInsightApp.APP_STATES,pauseMode=appStates.PAUSE,isPauseMode=mstrApp.isAppStatePause(),wasPauseMode=!!(evt.valueWas&pauseMode);if(isPauseMode!==wasPauseMode){if(isPauseMode){this.casValue=this.defn&&this.defn.cas;this.set("autoApply",false);this.defn.set("cas",false);}else{this.defn.set("cas",this.casValue);delete this.casValue;this.set("autoApply",this.isAutoApply());}if(this.model&&this.model.hasRADataset()){this.set("isMasked",isPauseMode);}}},onStatusChange:function onStatusChange(){var filterPortlets=this.contents&&this.contents.children;if(filterPortlets&&filterPortlets[0]){filterPortlets[0].closeVisSelectorPanel();}}});}());