(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._HasBuilder","mstrmojo._HasLayout","mstrmojo.vi.controllers.EnumLayoutSelectorPosition","mstrmojo.vi.ui._HasBoxLayout","mstrmojo.vi.ui._IsBoxLayoutChild","mstrmojo.ui._HasUITheme","mstrmojo.vi._MonitorsAppState","mstrmojo.vi._MonitorsLayoutMode","mstrmojo.vi.ui.PageByPanel","mstrmojo.vi.controllers.EnumEvents","mstrmojo.vi.ui.rw._SavesChildPositions","mstrmojo.vi.models.VIComponentMap","mstrmojo.vi.ui.tabs.LayoutTabStrip");var $ENUM_VI_TYPES=mstrmojo.vi.models.VIComponentMap.TYPES,LAYOUT_SELECTOR_POSITION=mstrmojo.vi.controllers.EnumLayoutSelectorPosition,EVENTS=mstrmojo.vi.controllers.EnumEvents,PAGE_BY_PANEL_HEIGHT="45px",pageByAlias="pageByPanel",tabBarAlias="selector",pageBySlot="pageByNode";function onContentPanelVisibleChange(evt){var model=this.model,rootCtrl=mstrApp.rootCtrl,selectorPosition=model.tsp;if(selectorPosition!==LAYOUT_SELECTOR_POSITION.LEFT&&this.k===this.model.getCurrentLayoutKey()){this.toggleSelectorVisibility(!evt.visible);}rootCtrl.generateToolbar();}function updatePageByPanel(){var pageByPanel=this.pageByPanel,pageByStack;if(pageByPanel){pageByStack=pageByPanel.pageByStack;pageByPanel.set("visible",pageByStack&&pageByStack.visible);}}function updateSelectorPosition(){var selector=this.selector,model=this.model,rootCtrl=mstrApp.rootCtrl,view=rootCtrl.view,selectorPosition=model.tsp,hasRendered=selector.hasRendered,isVisible=view.isCPVisible,parent=this.parent,showTOC=!parent||parent.showTOC!==false,slot;if(!showTOC&&selectorPosition===LAYOUT_SELECTOR_POSITION.LEFT){selectorPosition=LAYOUT_SELECTOR_POSITION.BOTTOM;}showTOC=selectorPosition===LAYOUT_SELECTOR_POSITION.LEFT;slot=showTOC?"":(selectorPosition!==LAYOUT_SELECTOR_POSITION.TOP?"bottom":"top");if(hasRendered||slot){this.removeChildren(selector);}selector.slot=slot+"CtrlNode";selector.set("alignPosition",selectorPosition);if(hasRendered||slot){this.addChildren([selector]);}if(mstrApp.supportFeature(mstrmojo.vi.enums.EnumFeatures.SUPPORT_TOC_UPDATEPOISITION)){model.controller.rootCtrl.setPanelDisplay("tocPanel",showTOC&&isVisible);}if(this.k===this.model.getCurrentLayoutKey()){this.toggleSelectorVisibility(showTOC||!isVisible);}}mstrmojo.vi.ui.rw.DocLayout=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasBuilder,mstrmojo._HasLayout,mstrmojo.vi.ui._HasBoxLayout,mstrmojo.vi.ui._IsBoxLayoutChild,mstrmojo.vi._MonitorsAppState,mstrmojo.vi._MonitorsLayoutMode,mstrmojo.vi.ui.rw._SavesChildPositions],{scriptClass:"mstrmojo.vi.ui.rw.DocLayout",markupString:'<div id="{@id}" class="mstrmojo-VIDocLayout"><div class="mstrmojo-VIDocument-top-selector"></div><div class="mstrmojo-VIDocLayout-pageby"></div><div class="mstrmojo-VIDocLayout-content {@cssClass}" style="{@cssText}"></div><div class="mstrmojo-VIDocument-selector"></div><div class="mstrmojo-VIDND-mask"></div></div>',markupSlots:{topCtrlNode:function(){return this.domNode.firstChild;},pageByNode:function(){return this.domNode.childNodes[1];},containerNode:function(){return this.domNode.childNodes[2];},bottomCtrlNode:function(){return this.domNode.childNodes[3];},maskNode:function(){return this.domNode.lastChild;}},layoutConfig:{h:{topCtrlNode:"auto",pageByNode:"auto",containerNode:"100%",bottomCtrlNode:"auto",maskNode:"auto"},w:{topCtrlNode:"100%",pageByNode:"100%",containerNode:"100%",bottomCtrlNode:"100%",maskNode:"100%"},xt:true},init:function init(props){this._super(props);var id=this.id;this.builder.getLayoutVIMap(this.k).attachEventListener("viCompBuilt",id,function(evt){if(evt.type===$ENUM_VI_TYPES.PAGEBY_STACK){this.pageByPanel.setPageByStack(evt.widget);}});var DARK_THEME_NAME=mstrmojo.ui._HasUITheme.EnumThemeNames.DARK_THEME;if(!!mstrApp.isWSStyling&&(mstrApp.getThemeClassName()===DARK_THEME_NAME||mstrApp.rootCtrl.isDarkThemeSelected())){mstrmojo.css.addWidgetCssClass(this,DARK_THEME_NAME);}else{mstrmojo.css.removeWidgetCssClass(this,DARK_THEME_NAME);}this.model.attachEventListener("tspChange",this.id,updateSelectorPosition);if(mstrApp.supportFeature(mstrmojo.vi.enums.EnumFeatures.SUPPORT_TOC_UPDATEPOISITION)){mstrApp.rootCtrl.view.attachEventListener(EVENTS.CONTENTS_PANEL_VISIBILITY_CHANGE,this.id,onContentPanelVisibleChange);}},onRender:function onRender(){this._super();updatePageByPanel.call(this);updateSelectorPosition.call(this);if(!this.selector.children){this.selector.setTabs(this.parent.parent._layouts,this.model.getCurrentLayoutKey());}},onAppStateChange:function onAppStateChange(evt){var presentationMode=mstrmojo.vi.VisualInsightApp.APP_STATES.PRESENTATION;if(mstrApp.isAppStatePresentation()||evt.valueWas&presentationMode){updateSelectorPosition.call(this);}},postCalculateBoxLayout:function postCalculateBoxLayout(layoutCfg,outerDimensions){var sectionWidth=parseInt(this.docSection.width,10)||0,breakpointWidth=mstrmojo.vi.ui.rw.DocRelativePanel.getLayoutBreakPoint();if(mstrApp.isWSStyling&&!mstrApp.isAppStatePresentation()){if(sectionWidth===breakpointWidth&&mstrApp.isLayoutModePreview()){outerDimensions.left=Math.max(outerDimensions.width-breakpointWidth,0)/2;}}return layoutCfg;},applyBoxSize:function applyBoxSize(height,width,top,left){this._super(height,width,top,left);if(!this.boxLayoutConfig){var boxCfg=this.boxLayoutConfig=new mstrmojo.vi.ui.BoxLayoutConfig({hostId:this.id,identifier:"id"});var rootBox=boxCfg.box=boxCfg.getNewRootBox(true);boxCfg.addNewChild(rootBox,100,this.id);}this.buildBoxLayout();},alias:"docLayout",selector:null,pageByPanel:null,docSection:null,dropZone:true,resizeOrReposition:mstrmojo.emptyFn,getIdentifier:function getIdentifier(){return"layout";},getSplitterHost:function getSplitterHost(){return this.containerNode;},children:[{scriptClass:"mstrmojo.vi.ui.PageByPanel",alias:pageByAlias,slot:pageBySlot,height:PAGE_BY_PANEL_HEIGHT,zIndex:2},{scriptClass:"mstrmojo.vi.ui.tabs.LayoutTabStrip",alias:tabBarAlias}],_set_children:function setCh(n,v,silent){if(v!==this.children){var pageByComponent=this[pageByAlias];if(pageByComponent){v.push(pageByComponent);}var tabBarComponent=this[tabBarAlias];if(tabBarComponent){v.push(tabBarComponent);}}return this._super(n,v,silent);},getTargetDropZone:function getTargetDropZone(context){var boxPosition=context.boxCache[this.id];return context.tgt.pos.x-boxPosition.x<boxPosition.w/2?"Left":"Right";},getViPanel:function getViPanel(type){return(type==="pageByPanel")?this[pageByAlias]:((type==="selector")?this[tabBarAlias]:null);},toggleSelectorVisibility:function toggleSelectorVisibility(showTOC){var selectorNode=this.selector.domNode;if(selectorNode){var tocPanel=mstrApp.rootCtrl.tocPanel,isSingleChapter=tocPanel&&tocPanel.chapterCount===1,isMultipPages=tocPanel&&tocPanel.pageCount>1;selectorNode.style.setProperty("display",showTOC||mstrApp.isVisBuilder||(mstrApp.isAppStatePresentation()&&isSingleChapter&&isMultipPages)?"none":"block");this.doLayout();}},viPanelChangedVisibility:function viPanelChangedVisibility(panel){var boxCfg=this.boxLayoutConfig;if(panel.visible){boxCfg.addDropBox(this.docSection,"Top",{box:{boxId:String(panel.id),cfg:panel.getBoxConfiguration()}});}else{boxCfg.deleteBox(panel);}}});}());