(function(){mstrmojo.requiresCls("mstrmojo.DI.DITreeNode","mstrmojo.WidgetTree","mstrmojo.DI.DIHelpers");var $HELPer=mstrmojo.DI.DIHelpers,$A=mstrmojo.array;mstrmojo.DI.DITree=mstrmojo.declare(mstrmojo.WidgetTree,null,{scriptClass:"mstrmojo.DI.DITree",renderOnScroll:false,itemFunction:function ifn(item,idx,w){var tree=w.tree||w,iw=new mstrmojo.DI.DITreeNode({edit:item.edit,data:item,state:0,parent:w,tree:tree,multiSelect:w.multiSelect,text:item[w.itemDisplayField],textCssClass:tree.item2textCss(item),items:item[w.itemChildrenField],itemIdField:w.itemIdField,itemDisplayField:w.itemDisplayField,itemIconField:w.itemIconField,itemChildrenField:w.itemChildrenField,itemFunction:w.itemFunction,listSelector:w.listSelector,iconFolderClosed:item.iconFolderClosed||"mstrmojo-di-tree-node-icon folder-closed",iconFolderOpen:item.iconFolderOpen||"mstrmojo-di-tree-node-icon folder-open"});item.node=iw;return iw;},postCreate:function(){if(this._super){this._super();}this.selectedNodes=[];this.selectedNode=null;},isMultiSelect:false,selectedNodes:[],selectedNode:null,selectNode:function selectNode(node,evt){if(!this.isMultiSelect){if(this.selectedNode!==null&&this.selectedNode!==node){this.selectedNode.deselect();}this.selectedNode=node;this.selectedNodes=[node];}else{if(!evt||(!$HELPer.isCtrlKey(evt.hWin,evt.e))){$A.forEach(this.selectedNodes,function(selectedNode){if(selectedNode!==null&&selectedNode!==node){selectedNode.deselect();}});this.selectedNode=node;this.selectedNodes=[node];}else{if(evt&&$HELPer.isCtrlKey(evt.hWin,evt.e)){var idx=mstrmojo.array.find(this.selectedNodes,"id",node.id);if(idx<0){this.selectedNodes.push(node);this.selectedNode=node;}else{node.deselect();this.selectedNodes.splice(idx,1);if(this.selectedNode===node){this.selectedNode=null;}}}}}}});}());