(function(){mstrmojo.requiresCls("mstrmojo.ListBase","mstrmojo._IsList");mstrmojo.ui.List=mstrmojo.declare(mstrmojo.ListBase,[mstrmojo._IsList],{scriptClass:"mstrmojo.ui.List",postselectionChange:function postselectionChange(evt){var added=evt.added||[],addedCnt=added.length,removed=evt.removed||[],removedCnt=removed.length;if(removedCnt){this.selectionRemoved({added:added,removed:removed,isReselect:false});}if(addedCnt){var fnGetSortedString=function(values){return[].concat(values).sort().join(",");};this.selectionAdded({added:added,removed:removed,isReselect:fnGetSortedString(added)===fnGetSortedString(removed)});}},selectionAdded:function selectionAdded(evt){},selectionRemoved:function selectionRemoved(evt){}});mstrmojo.ui.List.SelectionChangeEvtType=null;}());