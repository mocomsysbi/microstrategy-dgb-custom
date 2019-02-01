(function(){mstrmojo.requiresCls("mstrmojo.vi.ui.UnitList","mstrmojo.vi.ui._HasUnitListAvatar","mstrmojo.ui.menus._HasMenuPopup","mstrmojo.vi.ui.DatasetUnitMenuUtils","mstrmojo.dom","mstrmojo.css","mstrmojo.string","mstrmojo._CanHandleTwoClicks");mstrmojo.requiresDescs(629,6424);var $DESC=mstrmojo.desc,$DOM=mstrmojo.dom,$HASH=mstrmojo.hash,$STR=mstrmojo.string,CLS_MENU="mnu",CLS_DELETE="clsx",CLS_MENU_SUB="icn "+CLS_MENU+"_sub",CLS_DELETE_SUB="icn "+CLS_DELETE+"_sub",itemMarkup;function getMenuHandler(isOpen,el,fn){return function(){el.style.overflow=isOpen?"visible":"hidden";if(fn){fn();}};}mstrmojo.vi.ui.InteractiveUnitList=mstrmojo.declare(mstrmojo.vi.ui.UnitList,[mstrmojo.vi.ui._HasUnitListAvatar,mstrmojo.ui.menus._HasMenuPopup,mstrmojo._CanHandleTwoClicks],{scriptClass:"mstrmojo.vi.ui.InteractiveUnitList",draggable:true,panelId:"",useRichTooltip:true,hasTooltipContent:function(item,itemNode){var labelNode=this.getLabelNode(itemNode);return labelNode.scrollWidth>labelNode.clientWidth;},getItemTooltip:function(item,itemNode,target){var labelNode=this.getLabelNode(itemNode);if(this.hasTooltipContent(item,itemNode)){var position=$DOM.position(labelNode),desc=item.desc?item.desc:item.dsc,docModel=(this.zonesModel||{}).docModel,dsName,content='<div class="name">'+$STR.encodeHtmlString(item.n,true)+"</div>"+(item.objectNameinDataset?('<div class="dsc">'+$STR.encodeHtmlString(mstrmojo.desc(15112,"Name in Dataset:")+" "+item.objectNameinDataset,true)+"</div>"):"");if(item.dsName){dsName=item.dsName;}else{if(item.datasetId){dsName=docModel&&docModel.datasets&&docModel.datasets[item.datasetId].name;}else{if(item.id){var objectInfo=docModel&&docModel.getObjectInfo(item.id),datasetId=objectInfo&&docModel.findDatasetIdFromUnit(objectInfo.did);dsName=docModel&&docModel.datasets&&datasetId&&docModel.datasets[datasetId].name;}}}content+=(dsName?'<div class="dataset">'+$STR.encodeHtmlString(mstrmojo.desc(8502,"Dataset")+": "+dsName,true)+"</div>":"")+(desc?'<div  class="dsc">'+$STR.encodeHtmlString(desc,true)+"</div>":"");var richTooltip={areaId:item._renderIdx+"text",cssClass:"vi-regular vi-tooltip-V",contentNodeCssClass:"regular-unitlist-tooltips",posType:mstrmojo.tooltip.POS_BOTTOMLEFT,content:content,top:position.y-6,left:position.x,enableHover:true};return richTooltip;}return null;},showTooltip:function showTooltip(evt,win){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),item=this.getItemFromTarget(target);if(item&&item.n){var itemNode=this.getItemNodeFromTarget(target);this.richTooltip=this.getItemTooltip(item,itemNode,target);if(this.richTooltip){this._super(evt,win);}}},getItemMarkup:function getItemMarkup(item){if(!itemMarkup){itemMarkup=this._super(item).replace(">{@en@n}",'><span class="txt" unselectable="on">{@en@n}</span><div class="'+CLS_MENU+'"><div title="'+$DESC(6424,"Menu")+'" class="'+CLS_MENU_SUB+'"></div></div><div class="'+CLS_DELETE+'"><div class="'+CLS_DELETE_SUB+'"></div></div>').replace("<{@tag}",'<{@tag} unselectable="on" ');}return itemMarkup;},getLabelNode:function getLabelNode(itemNode){return itemNode.getElementsByClassName("txt")[0];},ondblclick:function ondblclick(evt){var target=evt.getTarget(),itemNode=this.getItemNodeFromTarget(target),item=($DOM.findWidget(itemNode)===this)&&this.getItemFromTarget(target);if(!!item){evt.cancel();this.doubleClickItem(item);}},onItemContextMenu:function onItemContextMenu(item,evt){var target=evt.getTarget();if(item){this.closePopup();var panel=mstrmojo.all[this.panelId],items=panel&&panel.getPanelSelectedItems&&panel.getPanelSelectedItems(),multi=items&&items.length>1;this[multi?"showMultiSelectionMenu":"showItemMenu"](multi?items:item,this.getItemNodeFromTarget(target),$DOM.getMousePosition(evt.e,evt.hWin));return true;}},configurePopup:function configurePopup(config,itemBtn,fnOpen,fnClose){mstrmojo.all[this.panelId].addPopupHandlers(config);var listElement=itemBtn.parentNode;config.addPopupHandlers("iulMenuOverflow",getMenuHandler(true,listElement,fnOpen),getMenuHandler(false,listElement,fnClose));config.hostId=this.id;config.isHostedWithin=false;config.hostElement=itemBtn;},showItemMenu:mstrmojo.emptyFn,showMultiSelectionMenu:mstrmojo.emptyFn,deleteItem:mstrmojo.emptyFn,doubleClickItem:mstrmojo.emptyFn,twoClicksItem:mstrmojo.emptyFn,onTwoClicks:function(evt){if(evt.firstTarget==evt.secondTarget){var item=this.getItemFromTarget(evt.secondTarget);evt.cancel();if(!!item){this.twoClicksItem(item,evt);}}},isDragValid:function isDragValid(context){return !isNaN(parseInt(context.src.node.getAttribute("idx"),10))||this._super(context)||false;},getSelectedItems:function getSelectedItems(){var list=this,items=this.items,item=null,r=[];$HASH.forEach(this.selectedIndices,function(v,k){item=items[k];if(v&&item){item=$HASH.copy(item);item.ulist=list;item.itemNode=list._getItemNode(item._renderIdx);r.push(item);}});return r;}});mstrmojo.vi.ui.InteractiveUnitList.CLS_HAS_MENU="has-m";mstrmojo.vi.ui.InteractiveUnitList.CLS_HAS_X="has-x";}());