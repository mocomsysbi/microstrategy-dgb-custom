(function(){mstrmojo.requiresCls("mstrmojo.vi._MonitorsAppState","mstrmojo.vi.ui.PanelPortlet","mstrmojo.dom","mstrmojo.hash","mstrmojo.css");var $CSS=mstrmojo.css,$HASH=mstrmojo.hash,$DOM=mstrmojo.dom;function hideCollapseIcon(){$CSS.toggleClass(this.titleBar.leftToolNode,"hidden",this.hideCollapse);}mstrmojo.vi.ui.DatasetPortlet=mstrmojo.declare(mstrmojo.vi.ui.PanelPortlet,[mstrmojo.vi._MonitorsAppState],{scriptClass:"mstrmojo.vi.ui.DatasetPortlet",cssClass:"docdataset-unitlist-portlet",suffix:"",showTitleBarContextMenu:true,init:function init(props){this._super(props);if(mstrApp.isWSStyling){this.paddingCfg.paddingLeft=3;}this.addChildren([this.getDatasetTypeCfg(props.dataset)]);if(this.dataset&&this.dataset.unpublished){this.unpublished=true;}},getDatasetTypeCfg:function(dataset){var datasetType=(dataset.dsm===1)?mstrmojo.desc(14453,"In memory"):mstrmojo.desc(14452,"Live");if(dataset.connInfo&&dataset.dsm===2){datasetType+="("+dataset.connInfo.isn+")";}return{scriptClass:"mstrmojo.Label",markupString:'<div id="{@id}" class="mstrmojo-Label {@cssClass}" style="{@cssText}" title="{@title} "mstrAttach:click,contextmenu></div>',slot:"titlebarNode",alias:"typeBar",text:datasetType,cssClass:"dataset-type",useRichTooltip:true,oncontextmenu:function(evt){$DOM.preventDefault(window,evt.e);var DatasetPortlet=this.parent,CollapsibleTitleBar=$HASH.walk("parent.titleBar",this),target=$HASH.walk("src.parent.titleBar.lblTitle.domNode",evt);if(CollapsibleTitleBar&&$DOM.contains(CollapsibleTitleBar.textNode,target,true,CollapsibleTitleBar.domNode)){evt.cancel();CollapsibleTitleBar.tbToolbar.closePopup();var menuCfg=CollapsibleTitleBar.getMenuConfig();if(menuCfg){menuCfg.hostId=CollapsibleTitleBar.tbToolbar.id;menuCfg.hostElement=CollapsibleTitleBar.tbToolbar.domNode;menuCfg.position=$DOM.getMousePosition(evt.e,evt.hWin);DatasetPortlet.preOpenContextMenu();CollapsibleTitleBar.tbToolbar.openPopup(menuCfg.newInstance());menuCfg.position=null;}}},updateTooltipConfig:function updateTooltipConfig(e){this.parent.titleBar.updateTooltipConfig(e);this.richTooltip=this.parent.titleBar.richTooltip;}};},postBuildRendering:function(){this._super();hideCollapseIcon.call(this);$CSS.toggleClass(this.domNode,"unpublished",this.unpublished);},getTitleBarCfg:function getTitleBarCfg(){var cfg=this._super(),me=this;if(this.suffix&&this.suffix.length>0){cfg.getTitleChildren=function(){return[{scriptClass:"mstrmojo.Label",slot:"textNode",alias:"suffixNode",cssClass:"suffix",text:me.suffix}].concat(this.constructor.prototype.getTitleChildren.call(this));};}cfg.layoutConfig=(!!mstrApp.isWSStyling)?{w:{leftToolNode:"auto",textNode:"100%",rightToolNode:"auto"},h:{leftToolNode:"26px",textNode:"26px",rightToolNode:"26px",containerNode:"26px"},xt:true}:{w:{leftToolNode:"auto",textNode:"100%",rightToolNode:"auto"},h:{leftToolNode:"22px",textNode:"22px",rightToolNode:"22px",containerNode:"22px"},xt:true};return cfg;},onAppStateChange:function onAppStateChange(evt){this._super(evt);var pauseMode=mstrmojo.vi.VisualInsightApp.APP_STATES.PAUSE,wasPauseMode=!!(evt.valueWas&pauseMode),isPauseMode=mstrApp.isAppStatePause();if(wasPauseMode!==isPauseMode){this.generateToolbar();}if(!!mstrApp.isWSStyling&&!mstrApp.isAppStatePresentation()&&this.parent.parent.visible){this.titleBar.refresh();}}});mstrmojo._HasMarkup.addMarkupMethods(mstrmojo.vi.ui.DatasetPortlet,{onhideCollapseChange:function(){hideCollapseIcon.call(this);}});}());