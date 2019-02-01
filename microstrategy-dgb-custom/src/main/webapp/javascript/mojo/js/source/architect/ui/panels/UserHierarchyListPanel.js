(function(){mstrmojo.requiresCls("mstrmojo.architect.EnumDataChangeEvents","mstrmojo.architect.ui.UnitList","mstrmojo.architect.ui.panels.BaseListPanel");var $A=mstrmojo.array,$ENUM_DATA_CHANGE_EVENTS=mstrmojo.architect.EnumDataChangeEvents,STR_USER_HIERARCHIES=mstrmojo.desc(12216,"User hierarchies"),STR_ADD_HIERARCHY=mstrmojo.desc(12241,"Add user hierarchy"),STR_HIDE_HIERARCHIES=mstrmojo.desc(12237,"Hide user hierarchies"),STR_HIERARCHY="user hierarchy",STR_DELETE_CONFIRM="Are you sure you want to delete $$ '##'?";function onHierarchiesLoaded(evt){this.contentWidget.set("items",evt.hierarchies||[]);}function onHierarchyRenamed(evt){var index=$A.find(this.contentWidget.items,"did",evt.itemID),cw=this.contentWidget;if(index>=0){cw.items[index].n=evt.itemName;cw.refresh();}}mstrmojo.architect.ui.panels.UserHierarchyListPanel=mstrmojo.declare(mstrmojo.architect.ui.panels.BaseListPanel,null,{scriptClass:"mstrmojo.architect.ui.panels.UserHierarchyListPanel",title:STR_USER_HIERARCHIES,addTitle:STR_ADD_HIERARCHY,hierarchyId:"",init:function init(props){props.showListBtnTitle=STR_HIDE_HIERARCHIES;this._super(props);this.attributes={};var evtConfig={},panelConfig=evtConfig[this.id]={};panelConfig[$ENUM_DATA_CHANGE_EVENTS.USER_HIERARCHY_LOADED]=onHierarchiesLoaded;panelConfig[$ENUM_DATA_CHANGE_EVENTS.USER_HIERARCHY_CHANGED]=function onHierarchyChanged(evt){this.hierarchyId=evt.value;};panelConfig[$ENUM_DATA_CHANGE_EVENTS.VIEW_ITEM_RENAMED]=onHierarchyRenamed;mstrApp.getRootController().attachDataChangeListeners(evtConfig);},getContentWidget:function getContentWidget(){var rootController=mstrApp.getRootController(),$this=this;return{scriptClass:"mstrmojo.architect.ui.UnitList",onItemDeleted:function onItemDeleted(listItem){mstrmojo.confirm(STR_DELETE_CONFIRM.replace("##",listItem.n).replace("$$",STR_HIERARCHY),{confirmBtn:{fn:function(){if(rootController.model.currentHierarchyID===listItem.did){rootController.closeViewObject();}rootController.deleteObject(listItem);}}});},singleSelect:function singleSelect(idx){var id=this.items[idx].did;if($this.hierarchyId!==id){rootController.switchUserHierarchy(id);}},onItemRenamed:function onItemRenamed(listItem,newName){var id=listItem.did;rootController.renameUserHierarchy(id,newName,{success:function success(){rootController.updateViewListItem(id,newName);}});}};},onItemAdd:function onItemAdd(){mstrApp.getRootController().addUserHierarchy();}});}());