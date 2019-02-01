(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.string","mstrmojo.architect.EnumDragActions","mstrmojo.warehouse.EnumObjectTypes","mstrmojo.warehouse.ui.TablesTree","mstrmojo.warehouse.menu.AvailableTablesMenu");mstrmojo.requiresDescs(2901);var $A=mstrmojo.array,$H=mstrmojo.hash,$STR=mstrmojo.string,$CSS=mstrmojo.css,CLASS_LOADING="loading",CSS_MENU_CLASS="item-mn",CSS_NAME_CLASS="item-n",$DOM=mstrmojo.dom,$ENUM_DATA_CHANGE_EVENTS=mstrmojo.warehouse.EnumDataChangeEvents,$ENUM_DRAG_ACTIONS=mstrmojo.architect.EnumDragActions,$ENUM_TYPES=mstrmojo.warehouse.EnumObjectTypes,STR_LOADING=mstrmojo.desc(2901,"Loading..."),STR_WAITBOXTIP_ID="waitBoxTipForAvailableTablesTree",$AVAILABLE_TABLES_TREE;mstrmojo.warehouse.ui.AvailableTablesTree=mstrmojo.declare(mstrmojo.warehouse.ui.TablesTree,null,{scriptClass:"mstrmojo.architect.ui.AvailableTablesTree",cssClass:"mstrmojo-wh-AvailableTablesTree",tablesTreeHooks:{addItem:function(el,item){var rootController=mstrApp.getRootController();if(item.n){item.n=item.n.replace(/<strong>|<\/strong>/gi,"");if(!item.decoded){item.n=$STR.decodeHtmlString(item.n);item.decoded=true;}}rootController.addTables([].concat(item));},isTable:function isTable(itemData){return itemData&&itemData.tp===$ENUM_TYPES.TABLE;}},createAvatarFunc:undefined,positionAvatarFunc:undefined,useRichTooltip:true,showTooltip:function showTooltip(evt,win){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e);if(target.className&&(target.className.indexOf("item-n")>-1)){target=target.parentNode;}if(target.className.indexOf("item tp")>-1&&(target.scrollWidth>target.clientWidth)){var position=$DOM.position(target);this.richTooltip={posType:mstrmojo.tooltip.POS_TOPLEFT,cssClass:"vi-regular vi-tooltip-A",content:target.textContent,top:position.y+position.h+5,left:position.x};this._super(evt,win);}},init:function init(props){this._super(props);var evtConfig={},rootController=mstrApp.getRootController(),tablesTreeConfig=evtConfig[this.id]={};tablesTreeConfig[$ENUM_DATA_CHANGE_EVENTS.DBTABLES_CHANGED]=function onDBTablesChanged(evt){if(!((this.sourceInfo===evt.sourceInfo)||(evt.sourceInfo==="")||(evt.sourceInfo===undefined))){return ;}this.cleanUp();var selectedItems=evt.selectedItems||[],selectedIndices=this.selectedIndices={},keyword=evt.keyword,newItems=evt.items;newItems=$A.map(newItems,function(item){if(item.encoded===true){return item;}var itemName=item.n,reg=new RegExp(keyword,"gi"),result,lastIndex=0,itemEncodedName=[];while(!!keyword&&(result=reg.exec(itemName))){itemEncodedName.push($STR.encodeHtmlString(itemName.slice(lastIndex,result.index)));itemEncodedName.push("<strong>"+$STR.encodeHtmlString(itemName.slice(result.index,reg.lastIndex))+"</strong>");lastIndex=reg.lastIndex;}itemEncodedName.push($STR.encodeHtmlString(itemName.slice(lastIndex)));item.n=itemEncodedName.join("");item.encoded=true;return item;});$A.forEach(selectedItems,function(tableName){selectedIndices[$A.find(newItems,"n",tableName)]=true;});this.expandedIndices=evt.expandedIndices||{};this.set("items",newItems);if(this.domNode){this.domNode.onmousedown=function(e){$DOM.preventDefault(window,e);};}this.waitBoxTip&&this.waitBoxTip.closeWait();};tablesTreeConfig[$ENUM_DATA_CHANGE_EVENTS.DBTABLES_REQUESTED]=function onDBTablesRequested(evt){var controller=mstrApp.getRootController(),dataService=controller.dataService,isMdx=(dataService==mstrmojo.qb.mdx.DataService);if(!((this.sourceInfo===evt.sourceInfo)||(evt.sourceInfo===""))){return ;}this.cleanUp();var newItems=[],width=this.domNode.clientWidth||parseInt(this.width,10),height=this.domNode.clientHeight||parseInt(this.height,10);newItems.push({n:isMdx?STR_LOADING:"",tp:"0",isVisible:function isVisible(){return true;}});this.set("items",newItems);$CSS.toggleClass(this.getLeafNode(0),CLASS_LOADING,true);!isMdx&&this.waitBoxTip.showWait({showCancel:true,message:" ",cssClass:"mstrmojo-WaitBoxTip",cancelCallback:this.cancelTables,position:{left:($DOM.position(this.domNode).x+width/2-20)+"px",top:($DOM.position(this.domNode).y+height/2-12)+"px"},width:"40px"});};tablesTreeConfig[$ENUM_DATA_CHANGE_EVENTS.DBTABLE_UPDATED]=function onDBTablesUpdated(evt){$A.forEach(this.getItemWithPropName(this.items,"did",evt.item.did),function(item){this.updateChild(item._renderIdx,evt.item);},this);};tablesTreeConfig[$ENUM_DATA_CHANGE_EVENTS.TABLES_CANCELED]=function onDBTablesCanceled(evt){this.set("items",[]);};tablesTreeConfig.windowSizeChanged=function(){this.waitBoxTip&&this.waitBoxTip.adjustCorners.call(this);};tablesTreeConfig[$ENUM_DATA_CHANGE_EVENTS.DBTABLES_USED]=function onDBTablesUsed(evt){var selectedItems=evt.items||[],items=this.items;$H.forEach(this.selectedIndices,function(boolValue,index){this.toggleChildSelection(String(index),false);},this);$A.forEach(selectedItems,function(tableName){this.toggleChildSelection(String($A.find(items,"n",tableName)),true);},this);};rootController.attachDataChangeListeners(evtConfig);this.dataHelper={fetch:function fetch(item,callback){if(item.tp===$ENUM_TYPES.TABLE){rootController.getColumnsForDBTable({data:item,showCancel:false},callback);}else{callback.success({items:[]});}}};if(!mstrmojo.all[STR_WAITBOXTIP_ID]){var parentEl=this,parentDOM=parentEl.domNode?parentEl.domNode:undefined;mstrmojo.insert({scriptClass:"mstrmojo.warehouse.ui.WaitBoxTip",cssClass:"mstrmojo-WaitBoxTip",id:STR_WAITBOXTIP_ID,adjustCorners:function adjustCorners(){if(parentDOM||(this&&this.domNode)){var el=parentDOM?parentEl:this,width=el.domNode.clientWidth||parseInt(el.width,10),height=el.domNode.clientHeight||parseInt(el.height,10);var parentPosition=$DOM.position(el.domNode);this.set("position",{left:(parentPosition.x+width/2-20)+"px",top:(parentPosition.y+height/2-12)+"px"});}},postBuildRendering:function postBuildRendering(){mstrmojo.warehouse.ui.WaitBoxTip.prototype.postBuildRendering.call(this);var el=this.domNode.firstChild;$CSS.addClass(el,"noBgNBor");}});}this.waitBoxTip=mstrmojo.all[STR_WAITBOXTIP_ID];},createAvatar:function createAvatar(sourceNode){if(this.createAvatarFunc){return this.createAvatarFunc.call(this,sourceNode);}else{return this._super(sourceNode);}},positionAvatar:function positionAvatar(pos,context){if(this.positionAvatarFunc){this.positionAvatarFunc.call(this,pos,context);}else{this._super(pos,context);}},cancelTables:function cancelTables(){mstrApp.getRootController().cancelLoadTables();},cleanUp:function cleanUp(){this.expandedIndices={};this.selectedIndices={};this.userSelections={};},onitemsChange:function onitemsChange(evt){if(this._super){this._super(evt);}delete this._oldItems;},getItemProps:function getItemProps(item,level,index){var name=item.cube_caption?item.cube_caption:item.n;name=(name&&(name+""))||"";return{tag:"div",cls:"item "+(item.tp?("tp"+item.tp):""),n:name,idx:index};},getItemMarkup:function getItemMarkup(item,level,index){return'<div class="{@cls}" title="{@ttp}"><span class='+CSS_NAME_CLASS+' unselectable="on">{'+(level===1?"@en":"")+"@n}</span><span class="+CSS_MENU_CLASS+"></span></div>";},getMenuHelper:function getMenuHelper(){$AVAILABLE_TABLES_TREE.menuHelper=$AVAILABLE_TABLES_TREE.menuHelper||new mstrmojo.warehouse.menu.AvailableTablesMenu();return $AVAILABLE_TABLES_TREE.menuHelper;},getDragAction:function getDragAction(context){var nodeAttributes=this.getNodeAttributes(context.src.node),nodeData=nodeAttributes&&this.getTreeItem(nodeAttributes.index);if(nodeData&&nodeData.n){if(!!nodeData.decoded){nodeData.n=$STR.encodeHtmlString(nodeData.n);nodeData.decoded=false;}nodeData.n=nodeData.n.replace(/<strong>|<\/strong>/gi,"");}switch(nodeData&&nodeData.tp){case $ENUM_TYPES.TABLE:return $ENUM_DRAG_ACTIONS.ADD_TABLE;}}});$AVAILABLE_TABLES_TREE=mstrmojo.warehouse.ui.AvailableTablesTree;}());