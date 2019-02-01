(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.ui.menus._HasMenuPopup","mstrmojo.vi._MonitorsAppState","mstrmojo.vi._MonitorsLayoutMode","mstrmojo._HasOwnAvatar","mstrmojo.vi.ui._IsDropTarget","mstrmojo.EditableLabel","mstrmojo.ui.menus.MenuConfig","mstrmojo.css");var $CSS=mstrmojo.css,$DOM=mstrmojo.dom,DRAG_TAB_CLASS="draggedTab",POST_DRAG_CLASS="stopDragging",ACT_RENAME=1,ACT_MOVE=2,ACT_DUPLICATE=4,ACT_DELETE=8,ACT_NEW_TAB=16;function getPopupHandler(isOpen){return function(){$CSS.toggleClass(this.tabStripMenuNode,"active",isOpen);};}function openMenu(menuPosition){var menuCfg=new mstrmojo.ui.menus.MenuConfig({supportsScroll:true,maxHeight:$DOM.getMaxScrollHeight()}),menuActionsFlag=this.getMenuActions(),idx=this.index,id=this.id,tabCount=this.total,tabStrip=this.parent,currentTab=function(){var tabs=tabStrip&&tabStrip.getTabs();return tabs&&tabs.length>idx?tabs[idx]:mstrmojo.all[id];};if((menuActionsFlag&ACT_NEW_TAB)>0){this.addNewTabMenuItem(menuCfg);}if((menuActionsFlag&ACT_DUPLICATE)>0){var dupString=mstrmojo.desc(3397,"Duplicate"),tabStripType=this.parent.scriptClass;if(tabStripType.indexOf("LayoutTabStrip")>=0){dupString=mstrmojo.desc(15022,"Duplicate Chapter");}else{if(tabStripType.indexOf("PanelTabStrip")>=0){dupString=mstrmojo.desc(14923,"Duplicate Page");}}menuCfg.addMenuItem(dupString,"dup",function(){currentTab().tabDuplicated();});}if((menuActionsFlag&ACT_MOVE)>0){if(idx){menuCfg.addMenuItem(mstrmojo.desc(5362,"Move Left"),"lft",function(){currentTab().tabMoved(true);});}if(idx<tabCount-1){menuCfg.addMenuItem(mstrmojo.desc(5363,"Move Right"),"rgt",function(){currentTab().tabMoved(false);});}}menuCfg.addSeparator();if((menuActionsFlag&ACT_RENAME)>0){menuCfg.addMenuItem(mstrmojo.desc(1388,"Rename"),"rnm",function(){currentTab().lbl.set("isEditing",true);});}if((menuActionsFlag&ACT_DELETE)>0){if(tabCount>1){menuCfg.addMenuItem(mstrmojo.desc(629,"Delete"),"cls",function(){currentTab().tabDeleted();});}}var customMenuCfg=this.getCustomMenu();if(customMenuCfg&&customMenuCfg.hasMenuItems()){menuCfg.addSeparator();menuCfg.absorbMenuItems(customMenuCfg);}menuCfg.addPopupHandlers(this.id,getPopupHandler(true),getPopupHandler(false));this.showTabMenu(this.updateMenuCfg(menuCfg),menuPosition);}mstrmojo.vi.ui.tabs.Tab=mstrmojo.declare(mstrmojo.Container,[mstrmojo.ui.menus._HasMenuPopup,mstrmojo._HasOwnAvatar,mstrmojo.vi.ui._IsDropTarget,mstrmojo.vi._MonitorsAppState,mstrmojo.vi._MonitorsLayoutMode],{scriptClass:"mstrmojo.vi.ui.tabs.Tab",markupString:'<div id="{@id}" class="mstrmojo-VITab unselectable {@cssClass}" style="{@cssText}" unselectable="on" mstrAttach:contextmenu,click><div><div class="mstrmojo-VITab-tab"></div><div class="mstrmojo-VITab-menu"></div></div></div>',markupSlots:{containerNode:function containerNode(){return this.domNode.firstChild.firstChild;},menuBtnNode:function menuBtnNode(){return this.domNode.firstChild.lastChild;}},markupMethods:{ontitleChange:function ontitleChange(){this.lbl.set("text",this.title);},onisSelectedChange:function onisSelectedChange(){mstrmojo.css.toggleClass(this.domNode,"selected",this.isSelected);},onzIndexChange:function onzIndexChange(){this.domNode.style.zIndex=this.zIndex;}},zIndex:1,menuBtnNode:null,lbl:null,title:"",index:-1,total:-1,isSelected:false,isCutoff:false,isHidden:false,isLeftMost:false,isRightMost:false,leftEdgeHiddenWidth:0,rightEdgeHiddenWidth:0,children:[{scriptClass:"mstrmojo.EditableLabel",alias:"lbl",editOnClick:false,onTextEditComplete:function onTextEditComplete(textChanged,oldText){if(textChanged){this.parent.titleEdited(this.text,oldText);}}}],postBuildRendering:function postBuildRendering(){var isValidMode=this.isValidMode();if(!isValidMode||(mstrApp.isLayoutModePreview&&mstrApp.isLayoutModePreview())){this.draggable=false;}this.lbl.set("editOnDoubleClick",isValidMode);this._super();},oncontextmenu:function oncontextmenu(evt){this.onclick(evt);evt.preventDefault();},onclick:function onclick(evt){var tabNode=this.domNode;if($CSS.hasClass(tabNode,POST_DRAG_CLASS)){$CSS.removeClass(tabNode,POST_DRAG_CLASS);return ;}var postClickFn=function(){if(this.isValidMode()){this.postTabClicked(this,evt);}};if(!this.isSelected){this.tabSelected({success:postClickFn.bind(this)});}else{postClickFn.call(this);}},postTabClicked:function postTabClicked(tab,evt){tab=this.findSelectedTab(this)||tab;var menuBtn=tab.menuBtnNode,menuButtonClicked=evt.getTarget().className===menuBtn.className,menuPositionObj;if(menuButtonClicked){menuPositionObj=$DOM.position(menuBtn);}if(evt.name==="contextmenu"||(menuButtonClicked&&!(menuPositionObj.x||menuPositionObj.y))){menuPositionObj={x:evt.e.clientX,y:evt.e.clientY};}if(menuPositionObj){openMenu.call(tab,menuPositionObj);}},getMenuActions:function getMenuActions(){return 0;},getCustomMenu:function getCustomMenu(){return null;},isDragValid:function isDragValid(){return this.parent.children.length>1&&!this.lbl.isEditing&&this.isValidMode();},createAvatar:function createAvatar(){var avatar=document.createElement("div");avatar.appendChild(this.domNode.cloneNode(true));avatar.style.margin="-5px 0 0 10px";return avatar;},addTabDnDStyle:function addTabDnDStyle(){var labelNode=this.lbl.domNode;if(labelNode&&!this.isSelected){$CSS.addClass(labelNode,DRAG_TAB_CLASS);}},clearTabDnDStyle:function clearTabDnDStyle(){var labelNode=this.lbl.domNode;if(labelNode&&!this.isSelected){$CSS.removeClass(labelNode,DRAG_TAB_CLASS);}},allowDrop:function allowDrop(context){var srcWidget=context.src.widget;return srcWidget&&srcWidget.parent===this.parent;},dropTab:function dropTab(context){var src=context.src,srcData=src.data,srcWidget=src.widget;srcWidget.clearTabDnDStyle();this.parent.moveTab(srcData.idx,this.index,srcData.fromIdx);},ondragenter:function ondragenter(context){this._super(context);var srcData=context.src.data,srcWidget=context.src.widget,idx=this.index;this.parent.moveTab(srcData.idx,idx);srcData.idx=idx;},ondragover:function ondragover(context){var tgtNode=context.tgt.node,tgtData=context.tgtData,existingTgtNode=tgtData&&tgtData.node,srcWidget=context.src.widget;if(!tgtData||existingTgtNode!==tgtNode){context.tgtData={node:tgtNode};}if(srcWidget&&!srcWidget.isSelected){srcWidget.addTabDnDStyle();}},ondragleave:function ondragleave(context){this._super(context);var srcWidget=context.src.widget;if(srcWidget&&!srcWidget.isSelected){srcWidget.addTabDnDStyle();}},ondragend:function ondragend(context){this._super(context);$CSS.addClass(this.domNode,POST_DRAG_CLASS);this.dropTab(context);},getDragData:function getDragData(){var id=this.id,idx=this.index;return{setAvatarClass:function setAvatarClass(cls){var list=mstrmojo.all[id],avatar=list.avatar;if(avatar){var classes=[list.avatarCssClass,"hasOwnAvatar",cls];avatar.className=classes.join(" ");}},fromIdx:idx,idx:idx};},getDropAvatarIcon:function getDropAvatarIcon(){return"pivot";},isValidMode:function isValidMode(){return !((mstrApp.isAppStatePresentation&&mstrApp.isAppStatePresentation())||(mstrApp.isAppStateSelection&&mstrApp.isAppStateSelection())||(mstrApp.allowWebDashboardDesign&&!mstrApp.allowWebDashboardDesign()));},cleanUpAfterTarget:function cleanUpAfterTarget(context){this.clearTabDnDStyle();this._super(context);},onAppStateChange:function onAppStateChange(evt){var lblTitle=this.lbl,isValidMode=this.isValidMode(),isPreviewMode=mstrApp.isLayoutPreview(evt.value);lblTitle.set("isEditing",false);lblTitle.set("editOnDoubleClick",isValidMode);this.draggable=isValidMode&&!isPreviewMode;},onLayoutModeChange:function onLayoutModeChange(evt){var isValidMode=this.isValidMode(),isPreviewMode=mstrApp.isLayoutPreview(evt.value);this.draggable=isValidMode&&!isPreviewMode;},addNewTabMenuItem:function addNewTabMenuItem(menuCfg){this.throwAbstractMethodError("addNewTabMenuItem");},findSelectedTab:mstrmojo.emptyFn,tabSelected:mstrmojo.emptyFn,titleEdited:mstrmojo.emptyFn,tabMoved:mstrmojo.emptyFn,tabDeleted:mstrmojo.emptyFn,tabDuplicated:mstrmojo.emptyFn,showTabMenu:mstrmojo.emptyFn,updateMenuCfg:function updateMenuCfg(menuCfg){return menuCfg;}});mstrmojo.vi.ui.tabs.Tab.ACTIONS={NEW_TAB:ACT_NEW_TAB,RENAME:ACT_RENAME,MOVE:ACT_MOVE,DUPLICATE:ACT_DUPLICATE,DELETE:ACT_DELETE};}());