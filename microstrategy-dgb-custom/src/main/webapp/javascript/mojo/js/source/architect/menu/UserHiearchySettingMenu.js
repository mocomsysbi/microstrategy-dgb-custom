(function(){mstrmojo.requiresCls("mstrmojo.architect.menu.ArchitectMenu","mstrmojo._HasContextMenu");var $MNU_ACTIONS=mstrmojo.architect.menu.EnumMenuActions,ENUM_ACTION_DRILL=$MNU_ACTIONS.USE_AS_DRILL,ENUM_ACTION_BROWSE=$MNU_ACTIONS.USE_AS_BROWSE,STR_USEASDRILL=mstrmojo.desc(13293,"Use as drill"),STR_USEASBROWSE=mstrmojo.desc(13294,"Use as browse");mstrmojo.architect.menu.UserHiearchySettingMenu=mstrmojo.declare(mstrmojo.architect.menu.ArchitectMenu,null,{scriptClass:"mstrmojo.architect.menu.UserHiearchySettingMenu",cssClass:"mstrmojo-architect-TransformationSettingMenu",id:"UserHiearchySettingMenu",isSeparatorItem:function isSeparatorItem(item){return item[this.itemIdField]===-1;},cm:[{n:STR_USEASDRILL,did:ENUM_ACTION_DRILL,action:ENUM_ACTION_DRILL},{n:STR_USEASBROWSE,did:ENUM_ACTION_BROWSE,action:ENUM_ACTION_BROWSE}]});}());