(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.array","mstrmojo.hash","mstrmojo.array","mstrmojo.Container","mstrmojo.TreeBrowserNode","mstrmojo.TreeBrowser","mstrmojo.TreeBrowserSelector","mstrmojo.DynamicClassFactory","mstrmojo._HasLayout","mstrmojo.ObjectBrowserDataProvider","mstrmojo.ui._HasScroller","mstrmojo.ui.SearchBox","mstrmojo.ui._HasUITheme","mstrmojo.vi.ui._IsDropTarget","mstrmojo.vi.ui._IsViPanel","mstrmojo.vi.ui.UnitList","mstrmojo.vi.ui._HasUnitListAvatar","mstrmojo.vi.ui.toolbars._HasToolbar","mstrmojo.vi.ui.CollapsibleTitleBar","mstrmojo.vi.ui.DatasetUnitMenuUtils","mstrmojo.vi.models.EnumDragSources","mstrmojo.vi.ui._CanDropFromSchema","mstrmojo.css","mstrmojo.vi.ui.theme");var $DCF=mstrmojo.DynamicClassFactory,$ARR=mstrmojo.array,$HASH=mstrmojo.hash,$DOM=mstrmojo.dom,$CSS=mstrmojo.css,$STR=mstrmojo.string,$THEME=mstrmojo.vi.ui.theme,$DU=mstrmojo.vi.ui.DatasetUnitMenuUtils,ALLOW_TYPES=[4,12,1,47];var NO_OBJ_ITEM={n:mstrmojo.desc(15348,"No applicable objects"),t:0},NO_SEARCH_RESULT_ITEM={n:mstrmojo.desc(15559,"No result matches your search."),t:0};function rangeSelect(idx){var adding=[],removing=[],rangeStartIndex=this._shiftStartIndex,selectedIndices=this.selectedIndices,startIdx=Math.min(rangeStartIndex,idx),endIdx=Math.max(rangeStartIndex,idx);$ARR.forEach(this.items,function(v,n){if(startIdx<=n&&n<=endIdx){if(!selectedIndices[n]){adding.push(n);}}else{if(selectedIndices[n]){removing.push(n);}}});this.addSelect(adding);this.removeSelect(removing);}function showDescAsTooltip(){return !mstrmojo.resolveFeature("hide-objects-description");}function isItemHasRightToShow(item){var accessRightFlag=mstrmojo.vi.enums.EnumDSSAccessRightFlags;return item.acg&&(item.acg&accessRightFlag.DssAccessRightUseFlag)&&(item.acg&accessRightFlag.DssAccessRightExecuteFlag);}function selectDragNode(itemList,context){var itemsContainerNode=itemList.itemsContainerNode,isMetaKey=$DOM.isMetaKey(context.src.hWin,context.src.e),target=$DOM.eventTarget(context.src.hWin,context.src.e),idx=-1;if(itemsContainerNode&&target){$ARR.forEach(itemsContainerNode.childNodes,function(v,n){if($DOM.contains(v,target,true,v)){idx=n;return false;}});}if(idx!==-1){var item=itemList.items[idx];if(!isMetaKey&&!itemList.selectedIndices[idx]){itemList.tree.clearTreeSelect();}if($ARR.indexOf(ALLOW_TYPES,item.t)>=0){itemList.addSelect(idx);}return true;}return false;}function callSelector(fn,evt){var s=this.listSelector;if(s){s[fn](this,this.itemsContainerNode,evt);}}function isTargetDirectParent(widget,target){var isUpperThanParent=false;if(widget.itemsContainerNode){$ARR.forEach(widget.ctxtBuilder.itemWidgets,function(itemWidget){if($DOM.contains(itemWidget.itemsContainerNode,target,itemWidget.domNode)){isUpperThanParent=true;}});}return isUpperThanParent;}mstrmojo.vi.ui.BrowserNodesAvatarContent=$DCF.newComponent(mstrmojo.vi.ui.UnitList,null,{getItemProps:function(item,idx){var props=this._super(item,idx);props.addCls("isAvatar");return props;}});mstrmojo.vi.ui.TreeBrowserSelector=$HASH.copy({premousedown:function(w,p,evt){w.tree._selectNode=$DOM.eventTarget(evt.hWin,evt.e);},premouseup:function pmu(w,p,evt){if($DOM.isPrimaryMouseBtn(evt.e)){var hWin=evt.hWin,e=evt.e,target=$DOM.eventTarget(hWin,e),isShiftKey=$DOM.shiftKey(evt.hWin,evt.e),rangeStartIndex=w._shiftStartIndex,isUpperThanParent=isTargetDirectParent(w,target),idx=w.listMapper.findIndex(w,p,target);if(idx>-1&&!isUpperThanParent&&w.tree._selectNode===target){var isItemValidForShift=$ARR.indexOf(ALLOW_TYPES,w.items[idx].t)!==-1;if(isShiftKey&&rangeStartIndex>-1&&isItemValidForShift){w.rangeSelect(idx);}else{w.toggleSelect(idx);if(w.selectedIndices[idx]&&isItemValidForShift){w._shiftStartIndex=idx;}}}}}},mstrmojo.TreeBrowserSelector);mstrmojo.vi.ui.TreeBrowser=$DCF.newComponent(mstrmojo.TreeBrowser,[mstrmojo.vi.ui._HasUnitListAvatar],{containerResizable:false,draggable:true,avatarCssClass:"mstrmojo-VIUnitList",rangeSelect:rangeSelect,_selectNode:null,_shiftStartIndex:-1,blockBegin:1,blockCount:50,getContent:function(w,blockBegin){w=w||this;var isRoot=(w===this),tree=this,success=function(res){if(isRoot){mstrmojo.css.removeClass(tree.domNode,["loading"]);}tree.updateTreeContent(w,res);},failure=function(err){w.contentRetrieved=true;w.set("items",[tree.failItemCreaterFunc()]);mstrmojo.err(err);},callbacks={success:success,failure:failure};if(isRoot){mstrmojo.css.addClass(tree.domNode,["loading"]);}if(mstrApp.objectsBlockCount){this.blockCount=parseInt(mstrApp.objectsBlockCount,10);}this.getContentThroughTaskCall({isRoot:isRoot,data:w.data,blockBegin:blockBegin||w.blockBegin,blockCount:parseInt(mstrApp.objectsBlockCount,10)||tree.blockCount},callbacks);},getDragData:function itemDragData(context){context.dragUnitHelper=new mstrmojo.vi.ui.VIDragUnit();var itemList=this,findList=function(tree){$ARR.forEach(tree.ctxtBuilder.itemWidgets,function(itemWidget){var targetNode=$DOM.eventTarget(context.src.hWin,context.src.e);if(targetNode&&$DOM.contains(itemWidget.itemsContainerNode,targetNode,true,itemWidget.itemsContainerNode)){itemList=itemWidget;findList(itemWidget);return false;}});};findList(this);var isTargetValid=selectDragNode(itemList,context);var items=isTargetValid?this.getSelectedItems().filter(function(item){return $ARR.indexOf(ALLOW_TYPES,item.t)!==-1;}):null;var id=this.id,_setAvatarClass=function _setAvatarClass(cls){var node=mstrmojo.all[id],avatar=node.avatar;if(avatar){var classes=[node.avatarCssClass,"hasOwnAvatar",cls];avatar.className=classes.join(" ");}};return{items:items,item:items&&items[0],src:mstrmojo.vi.models.EnumDragSources.ALL_OBJECT_LIST,setAvatarClass:function setAvatarClass(cls){_setAvatarClass(cls);},setInvalidAvatarClass:function setInvalidAvatarClass(){_setAvatarClass("icn clsx_sub");}};},getSelectedItems:function(){var ctxtBuilder=this.ctxtBuilder,items=[];if(ctxtBuilder){$ARR.forEach(ctxtBuilder.itemWidgets,function(itemWidget){if(itemWidget.state===1){items=items.concat(itemWidget.getSelectedItems());}});}items=(this._super()||[]).concat(items);return items;},createAvatar:function(target,context){var avatar=document.createElement("div");this.avatarContent=new mstrmojo.vi.ui.BrowserNodesAvatarContent({items:context.src.data.items});this.avatarContent.render();$CSS.addClass(this.avatarContent.domNode,[$THEME.getThemeClass.call(this)]);avatar.appendChild(this.avatarContent.domNode);return avatar;},ondragend:function(evt){this._super(evt);if(this.avatarContent&&this.avatarContent.destroy){this.avatarContent.destroy();}delete this.avatarContent;},isDragValid:function isDragValid(context){var items=context.src.data.items;return(items&&items.length)||this._super(context)||false;},contentRetrieved:false,onvisibleChange:function(){if(!this.contentRetrieved){this.getContent(this);}}});mstrmojo.vi.ui.TreeBrowserNode=$DCF.newComponent(mstrmojo.TreeBrowserNode,[{_mixinName:"newClass"}],{containerResizable:false,draggable:false,_shiftStartIndex:-1,rangeSelect:rangeSelect,premousedown:function(evt){this.tree._selectNode=$DOM.eventTarget(evt.hWin,evt.e);},premouseup:function(evt){if($DOM.isPrimaryMouseBtn(evt.e)){var isMetaKey=$DOM.isMetaKey(evt.hWin,evt.e),isShiftKey=$DOM.shiftKey(evt.hWin,evt.e),target=$DOM.eventTarget(evt.hWin,evt.e),isContainNode=$DOM.contains(this.itemsContainerNode,target,true,this.domNode),isUpperThanParent=isContainNode&&isTargetDirectParent(this,target),isLeaf=(this.state===2),selectFolder=!isLeaf&&(target!==this.stateNode&&target!==this.textNode)&&!isContainNode;if(isUpperThanParent||this.tree._selectNode!==target){return ;}if((!isMetaKey&&!isShiftKey)||this.tree.isSelectedFolder||selectFolder){this.tree.clearTreeSelect();}if(selectFolder){this.tree.isSelectedFolder=true;}else{if(!isContainNode){this.tree.isSelectedFolder=false;}}if(!isLeaf&&(target===this.stateNode||target===this.textNode)){this.toggleState();this.tree.updateScroller();$DOM.stopPropogation(evt.hWin,evt.e);}else{if(isContainNode){callSelector.call(this,"premouseup",evt);}else{this.handleNodeClicked();}}}},getSelectedItems:function(){var ctxtBuilder=this.ctxtBuilder,items=[];if(ctxtBuilder){$ARR.forEach(ctxtBuilder.itemWidgets,function(itemWidget){if(itemWidget.state===1){items=items.concat(itemWidget.getSelectedItems());}});}items=(this._super()||[]).concat(items);return items;}});function getTreeBrowserNode(cfg){var allObject=this;return $HASH.copy(cfg,{scriptClass:"mstrmojo.vi.ui.TreeBrowser",alias:"contents",slot:"containerNode",isSelectedFolder:false,browserNodeClass:mstrmojo.vi.ui.TreeBrowserNode,noCheckBox:true,itemIdField:"did",useRichTooltip:true,dataProvider:this.dataProvider,listSelector:mstrmojo.vi.ui.TreeBrowserSelector,showTooltip:function showTooltip(evt,win){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),widget=$DOM.findWidget(target),data=widget.data;if(data&&data.n){var labelNode=widget.domNode.firstChild;var content='<div class="name">'+$STR.encodeHtmlString(data.n,true)+"</div>"+(data.desc?'<div  class="dsc">'+$STR.encodeHtmlString(data.desc,true)+"</div>":"");var position=$DOM.position(labelNode);this.richTooltip={posType:mstrmojo.tooltip.POS_TOPLEFT,cssClass:"vi-regular vi-tooltip-C",content:content,top:position.y-4,left:position.x+position.w+6};this.constructor.prototype.showTooltip.call(this,evt,win);}},updateScroller:function(){allObject.updateScrollbars();},isBranch:function(data){return data.t===8;},items:null,bindings:{data:"this.parent.rootFolder"},setDimensions:mstrmojo.emptyFn,item2textCss:function item2textCss(data){var type2css={8:"folder",3:"report",12:"attribute",4:"metric",47:"consolidation",1:"custom-group",0:"no-obj"},css=mstrmojo.TreeBrowser.prototype.item2textCss(data)||type2css[data.t],highlightItems=this.parent&&this.parent.highlightItems;if(highlightItems&&highlightItems.indexOf(data.did)!==-1){css+=" highlight";}return css;},onnodechange:function onnodechange(evt){this.constructor.prototype.onnodechange.call(this,evt);this.parent.onSelectedItemsChange(evt);},getTotalSelections:function(){return[];},getContentThroughTaskCall:function getContentThroughTaskCall(params,callbacks){var objectBrowser=this.parent,item=params.data||{fty:objectBrowser.rootFolderType},isRoot=params.isRoot,folderList=objectBrowser.folderList,blockBegin=params.blockBegin,blockCount=params.blockCount;this.dataProvider.fetchFolderContents({sId:mstrApp.sessionState,browsableTypes:objectBrowser.getObjectSubTypes().join(","),includeObjectDesc:true,folderLinksContextId:objectBrowser.folderLinksContextId||29,blockCount:blockCount||50},{fid:item.did,fty:item.fty,blockBegin:blockBegin||1},{success:function(res){var items=res.items?res.items.filter(function(item){return item.t===8||isItemHasRightToShow(item);}):[];callbacks.success({items:items.length?items:[NO_OBJ_ITEM],sz:res.sz,bb:res.bb,bc:res.bc});if(isRoot&&!folderList.initialized){folderList.set("items",res.sc);var selected=$ARR.find(res.sc,"did",res.did);if(selected!==-1){folderList.set("selectedIndex",selected);}}folderList.initialized=true;allObject.updateScrollbars();},failure:callbacks.failure});}});}function highlightTreeNode(treeNode,highlightItems){if(treeNode.state===2){var data=treeNode.data;$CSS.toggleClass(treeNode.textNode,"highlight",data&&(highlightItems.indexOf(data.did)!==-1));}else{treeNode.ctxtBuilder.itemWidgets.forEach(function(child){highlightTreeNode(child,highlightItems);});}}mstrmojo.vi.ui.AllObjectsBrowser=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout,mstrmojo.vi.ui._IsDropTarget,mstrmojo.vi.ui._IsViPanel,mstrmojo.ui._HasScroller,mstrmojo.vi.ui.toolbars._HasToolbar,mstrmojo.ui._HasUITheme],{scriptClass:"mstrmojo.vi.ui.AllObjectsBrowser",markupString:'<div id="{@id}" class="mstrmojo-VIPanel mstrmojo-VIAllObjectsBrowser {@cssClass}" style="{@cssText}"><div class="mstrmojo-VIPanel-titlebar"></div><div class="filter"></div><div class="search-box"></div><div class="horizontal-line"></div><div class="mstrmojo-VIPanel-contentContainer"><div style="overflow:hidden;"><div class="mstrmojo-VIPanel-content"></div></div></div></div>',markupSlots:{titlebarNode:function titlebarNode(){return this.domNode.firstChild;},filterNode:function filterNode(){return this.domNode.childNodes[1];},searchBox:function searchBox(){return this.domNode.childNodes[2];},contentNode:function contentNode(){return this.domNode.childNodes[4].firstChild;},containerNode:function containerNode(){return this.domNode.childNodes[4].firstChild.firstChild;}},title:mstrmojo.desc(5679,"All Objects"),model:null,rootFolder:null,rootFolderType:null,highlightItems:null,getObjectSubTypes:function(){var types=[2048,3072,1024];if(!mstrApp.isSingleTier){types.push(12032);types.push(257);types.push(2560);}return types;},layoutConfig:{h:{titlebarNode:"30px",filterNode:"30px",searchBox:"33px",containerNode:"100%"},w:{titlebarNode:"100%",searchBox:"100%",containerNode:"100%"},xt:true},opened:false,dataProvider:null,onSelectedItemsChange:mstrmojo.emptyFn,onopenedChange:function(){if(!this.searchList&&this.opened){var folderList=this.folderList,selectedItem=folderList.getSelectedItem(),rootFoler=this.rootFolder;if(selectedItem&&rootFoler&&selectedItem.did!==rootFoler.did){folderList.initialized=false;}this.addChildren([getTreeBrowserNode.call(this,{ondataChange:function(){if(this.data){this.getContent(this);}},ondblclick:this.dblClickOnNodes.bind(this)}),getTreeBrowserNode.call(this,{alias:"searchList",visible:false,contentRetrieved:true,ondblclick:this.dblClickOnNodes.bind(this)})]);}},reset:function(){if(this.contents){this.removeChildren(this.contents);}if(this.searchList){this.removeChildren(this.searchList);}},dblClickOnNodes:function dblClickOnNodes(evt){var target=evt.getTarget(),item=$DOM.findWidget(target).data,model=this.model,viz=model.getSelectedViUnit();if(viz&&item&&$ARR.indexOf(ALLOW_TYPES,item.t)!==-1){this.dataProvider.loadObjects([item],{success:function(){var config=$DU.getCfgForAddUnitFromAllObject([item],model.datasets);if(viz){viz.getZonesModel().addUnitsFromDataSource([item],config.dsid,config.actions,model.getDatasetsUpdateCallback());}}},true);}},getSelectedItems:function getSelectedItems(){var contents=this.contents,allObjectList=contents.visible?contents:this.searchList;return allObjectList.getSelectedItems();},getLayoutOffsets:function(){return{w:18,h:0};},children:[{scriptClass:"mstrmojo.vi.ui.CollapsibleTitleBar",cssClass:"vi-allObjects-tb",slot:"titlebarNode",alias:"titleBar",editTitleOnDoubleClick:false,getLayoutOffsets:function(){return{w:0,h:5};},onclick:function click(){this.close();},close:function(){this.parent.close();},bindings:{title:"this.parent.title"}},{scriptClass:"mstrmojo.ui.Pulldown",slot:"filterNode",alias:"folderList",initialized:false,getLayoutOffsets:function(){return{w:0,h:9};},onitemSelected:function(item){if(this.initialized){this.parent.set("rootFolder",item);this.parent.obSearchBox.clearSearch(true);}}},{scriptClass:"mstrmojo.ui.SearchBox",slot:"searchBox",alias:"obSearchBox",getLayoutOffsets:function(){return{w:0,h:13};},searchTriggered:function searchTriggered(pattern){this.text=pattern;if(!pattern){this.clearSearch(true);return ;}var allObjects=this.parent,allObjectList=allObjects.contents.visible?allObjects.contents:allObjects.searchList,selectedItems=allObjectList.getSelectedItems(),folderList=allObjects.folderList,dataProvider=this.parent.dataProvider,fid=folderList.items[folderList.selectedIndex].did,me=this;selectedItems.forEach(function(item){if(item.t===8){fid=item.did;return false;}});$CSS.addClass(allObjectList.domNode,["loading"]);dataProvider.fetchFolderContents({browsableTypes:allObjects.getObjectSubTypes().join(","),includeObjectDesc:true,folderLinksContextId:allObjects.folderLinksContextId||29,blockCount:50,enableQuickSearch:!!(mstrApp.useQuickSearch&&mstrApp.useQuickSearch())},{fid:fid,searchPattern:pattern,recursive:1},{success:function(res){$CSS.removeClass(allObjectList.domNode,["loading"]);if(me.inputNode.value===pattern){allObjects.contents.set("visible",false);allObjects.searchList.set("visible",true);(allObjects.searchList||this).set("items",res.items||[NO_SEARCH_RESULT_ITEM]);allObjects.updateScrollbars();}}});},onkeyup:function onkeyup(evt){var hWin=evt.hWin,e=evt.e||hWin.event;if((mstrApp.useQuickSearch&&mstrApp.useQuickSearch())||((e.keyCode===13||e.keyCode===27||!this.inputNode.value))){this.constructor.prototype.onkeyup.call(this,evt);}},postClearSearch:function(){var browser=this.parent,contents=browser.contents,searchList=browser.searchList;if(contents){contents.set("visible",true);}if(searchList){searchList.set("visible",false);}}}],getDropAvatarIcon:function getDropAvatarIcon(context){return" ";},passToolbarCfg:function passToolbarCfg(cfg){this.titleBar.set("toolbarCfg",cfg);},updateToolbar:function updateToolbar(cfg){cfg.hasCloseButton=true;cfg.closeButtonText="";return cfg;},onhighlightItemsChange:function onhighlightItemsChange(){var highlightItems=this.highlightItems;if(highlightItems){highlightTreeNode(this.contents,highlightItems);highlightTreeNode(this.searchList,highlightItems);}},setupScrollNodes:function setupScrollNodes(){this.scrollNode=this.containerNode;},updateScrollbars:function(){this._super();if(this.scrollNode&&this.hasCustomScrollbar){var scrollNode=this.scrollNode,scrollbarWidth=$DOM.getComputedScrollbarWidth(scrollNode);scrollNode.style.marginRight=-scrollbarWidth+"px";scrollNode.style.paddingRight=scrollbarWidth+"px";}}});}());