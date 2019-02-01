(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._HasLayout","mstrmojo.dom","mstrmojo.desc","mstrmojo.string","mstrmojo.Button","mstrmojo.vi._MonitorsAppState","mstrmojo.vi.ui._HasMask","mstrmojo.vi.ui._IsDropTarget","mstrmojo.vi.ui.toolbars.Toolbar","mstrmojo.vi.models.EnumDragSources");mstrmojo.requiresClsP("mstrmojo.vi.ui","_IsViPanel");var $ARR=mstrmojo.array,$DOM=mstrmojo.dom,$HASH=mstrmojo.hash,ENUM_SOURCE=mstrmojo.vi.models.EnumDragSources,$FN_EMPTY=mstrmojo.emptyFn,$CMD_MAP={};var $CONTENTPANEL_COMMAND="ToggleContentsPanel",$DISPLAYPANEL_COMMAND="DisplayPanel",$GALLERY_PANEL="galleryPanel",$FORMAT_PANEL="propertiesPanel",itemMarkup;function getPanel(type){var panel=this[type];if(panel){return panel;}return this.docCtrl.getViPanel(type);}function getRootMenuBarItems(name){var menubarModelData=mstrApp.toggleViewBarModelData||mstrApp.menubarModelData,menubarItems=menubarModelData&&menubarModelData.items||[],results=[];$ARR.forEach(menubarItems,function(item){if(item.n===name){results=item.items;return false;}});return results;}function getTbEnabledState(cmd){return true;}function getTbToggleState(cmd,cmdId){var docModel=this.model,controller=docModel.controller,rootCtrl=controller.rootCtrl,view=rootCtrl.view,panel;if(cmd===$CONTENTPANEL_COMMAND){return view.isCPVisible;}else{panel=getPanel.call(rootCtrl,cmdId);return panel&&panel.getOpenStatus();}}function getTbToggleHandler(cmd,cmdId,state){var rootCtrl=mstrApp.rootCtrl,view=rootCtrl.view;if(cmd===$CONTENTPANEL_COMMAND){return function(){view.setIsCPVisible(state);};}else{return function(){rootCtrl.setPanelDisplay(cmdId,state);};}}function getDragSourceFrom(context){var dragData=context&&context.src&&context.src.data;return dragData&&dragData.src;}function getToolbarVisibleState(cmd,commandId){if(cmd===$DISPLAYPANEL_COMMAND&&(commandId===$GALLERY_PANEL||commandId===$FORMAT_PANEL)){return mstrApp.allowWebDashboardDesign();}return true;}mstrmojo.vi.ui.ToggleViewBar=mstrmojo.declare(mstrmojo.vi.ui.toolbars.Toolbar,[mstrmojo._HasLayout,mstrmojo.vi.ui._IsViPanel,mstrmojo.vi._MonitorsAppState,mstrmojo.vi.ui._HasMask,mstrmojo.vi.ui._IsDropTarget],{scriptClass:"mstrmojo.vi.ui.ToggleViewBar",getItemMarkup:function getItemMarkup(item){var currentItemMkp;currentItemMkp=itemMarkup=itemMarkup||this._super(item).replace("{@en@n}",'<div><div class="btn"><div class="icn"></div></div></div>');return currentItemMkp;},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx);if(item.active){props.addCls("active");}return props;},markupMethods:{onheightChange:mstrmojo.Widget.heightMarkupMethod,onwidthChange:mstrmojo.Widget.widthMarkupMethod,onvisibleChange:function onvisibleChange(){this.domNode.style.display=(this.visible)?this.cssDisplay:"none";mstrApp.rootCtrl.view.toggleToggleViewBar(this.visible);},onisMaskedChange:function onisMaskedChange(){this.onisMaskedChange();}},useRichTooltip:true,updateTooltipConfig:function updateTooltipConfig(evt){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),position=$DOM.position(target),domPos=$DOM.position(this.domNode);if(this.richTooltip){$HASH.copy({posType:mstrmojo.tooltip.POS_TOPLEFT,cssClass:"vi-regular vi-tooltip-C",top:position.y-6,left:domPos.x+domPos.w+6},this.richTooltip);}},generateToolbar:function generateToolbar(){var toggleViewItems=getRootMenuBarItems("view"),$this=this;var tbCfg=new mstrmojo.ui.menus.ToolbarConfig(),_renderIdx=0;toggleViewItems.forEach(function(button){var cmd=button.cmd,buttonId=button.n,buttonDesc=button.desc,buttonDescOff=button.descOff,enabled;if(cmd!==$DISPLAYPANEL_COMMAND&&cmd!==$CONTENTPANEL_COMMAND||!getToolbarVisibleState(cmd,buttonId)){return ;}$CMD_MAP[buttonId]=_renderIdx++;enabled=getTbEnabledState.call($this,cmd);tbCfg.addToggleToolbarButton({on:buttonDesc,off:buttonDescOff,ttpOn:mstrmojo.desc(16022,"Click to Close ####").replace("####",buttonDesc),ttpOff:mstrmojo.desc(16021,"Click to Open ####").replace("####",buttonDesc)},buttonId+(enabled?"":" disabled"),(enabled?getTbToggleHandler(cmd,buttonId,true):$FN_EMPTY),(enabled?getTbToggleHandler(cmd,buttonId,false):$FN_EMPTY),$this.id,getTbToggleState.call($this,cmd,buttonId));});this.set("toolbarCfg",tbCfg);},onRender:function onRender(){this._super();if(mstrApp.isAppStateSelection()){this.set("isMasked",true);}},onAppStateChange:function onAppStateChange(evt){this._super(evt);var isTargetingMode=mstrApp.isAppStateSelection();this.set("isMasked",isTargetingMode);},allowDrop:function allowDrop(context){var srcZones=[ENUM_SOURCE.VIZ_EDITOR];return srcZones.indexOf(getDragSourceFrom(context))>-1;},ondrop:function ondrop(context){if(getDragSourceFrom(context)===ENUM_SOURCE.VIZ_EDITOR){var dragData=context.src.data;dragData.onRemove(dragData.items&&dragData.items.length>1?dragData.items:dragData.item);}},getDropAvatarIcon:function getDropAvatarIcon(context){return getDragSourceFrom(context)===ENUM_SOURCE.VIZ_EDITOR?"remove":"move";}});}());