(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.warehouse.EnumObjectTypes");var $M=mstrmojo,$H=$M.hash,$A=$M.array,$ENUM_OT=mstrmojo.warehouse.EnumObjectTypes;function sortElementsByType(items,type){var tempArray=[];$A.forEach(items,function(itm){if(itm.tp===type){tempArray.push(itm);}});return tempArray.sort(function(a,b){return(a.n<b.n)?-1:(a.n>b.n)?1:0;});}mstrmojo.warehouse.obj.TableData=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.architect.obj.TableData",init:function init(props){var model=props.model,visibleFn=function(data,item){return model.handleVisibleAction(data,item);},checkFn=function(data,item){return model.handleCheckAction(data,item);},enabledFn=function(data,item){return model.handleEnabledAction(data,item);};this.did=props.id;this.n=props.n;this.items=[];this.isVisible=visibleFn;this.isChecked=checkFn;this.isEnabled=enabledFn;this.tp=props.tp;this.model=model;this.multi=props.multi;this.isLeaf=props.isLeaf;this.bold=props.bold;this.dbrole=props.dbrole;this.ns=props.ns||"";this.isError=props.isError;this.ttp=props.ttp||"";this.sta=props.sta||0;this.isLocked=props.isLocked;this.size=props.size;this.dbtn=props.dbtn||props.n;this.isView=props.isView;this.icntp=props.icntp;},model:undefined,multi:false,did:undefined,n:undefined,items:undefined,isVisible:undefined,isEnabled:undefined,isChecked:undefined,isLocked:false,size:0,isLeaf:false,bold:false,dbrole:undefined,tp:undefined,x:undefined,y:undefined,w:undefined,h:undefined,isError:false,ttp:"",sta:0,dbtn:undefined,ns:"",italics:false,addItem:function addItem(id,name,type,bfIdx,tooltip,isLeaf,bold,unused){var tableData=this,item={pdid:tableData.did,did:id,n:name,tp:type,bfIdx:bfIdx,isVisible:tableData.isVisible,isChecked:tableData.isChecked,items:[],ttp:tooltip,isLeaf:isLeaf,bold:bold,unused:unused};tableData.items.push(item);return item;},addSubItem:function addSubItem(subItemId,id,name,type,bfIdx,fcatId,tooltip,isLeaf,bold){var tableData=this,item={pdid:tableData.did,did:id,sid:subItemId,n:name,tp:type,bfIdx:bfIdx,fcatId:fcatId,isVisible:tableData.isVisible,isChecked:tableData.isChecked,ttp:tooltip,isLeaf:isLeaf,bold:bold};$H.forEach(tableData.items,function(itm){if(itm.did===subItemId){itm.items.push(item);return false;}return true;});return item;},addSubItemItem:function addSubItemItem(attributeId,subItemId,id,name,type,bfIdx,fcatId,tooltip,isLeaf,bold){var tableData=this,item={pdid:tableData.did,did:id,sid:attributeId,n:name,tp:type,bfIdx:bfIdx,fcatId:fcatId,isVisible:tableData.isVisible,isChecked:tableData.isChecked,ttp:tooltip,isLeaf:isLeaf,bold:bold};$H.forEach(tableData.items,function(itm){if(itm.did===attributeId){$H.forEach(itm.items,function(itmItem){if(itmItem.did===subItemId){itmItem.items=itmItem.items||[];itmItem.items.push(item);return false;}return true;});return false;}return true;});return item;},sortElements:function sortElements(){var tableData=this,items=tableData.items,sortArray=[];tableData.items=sortArray.concat(sortElementsByType(items,$ENUM_OT.ATTRIBUTE),sortElementsByType(items,$ENUM_OT.FACT),sortElementsByType(items,$ENUM_OT.COLUMN));}});}());