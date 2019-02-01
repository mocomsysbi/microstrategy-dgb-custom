(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.css","mstrmojo._HasOwnAvatar","mstrmojo.TreeNode");mstrmojo.requiresDescs(70);var $DOM=mstrmojo.dom,$Controller;var urlObjectConfig={scriptClass:"mstrmojo.Container",slot:"tableNode",markupString:"<div class='mstrmojo-url-list-dnd' title='{@title}' mstrAttach:click ><div></div><div></div></div>",markupSlots:{containerNode:function(){return this.domNode;},imageNode:function(){return this.domNode.children[0];},contentNode:function(){return this.domNode.children[1];}},markupMethods:{onisFolderChange:function(){if(this.isFolder){mstrmojo.css.addClass(this.imageNode.firstChild,"drop-zone-folder");}else{mstrmojo.css.addClass(this.imageNode.firstChild,"drop-zone-file");}}},text:"",isFolder:"",children:[{slot:"contentNode",alias:"text",cssClass:"item-content",scriptClass:"mstrmojo.Label",bindings:{text:"this.parent.text"}},{slot:"imageNode",alias:"image",cssClass:"item-image",scriptClass:"mstrmojo.Label"}]};mstrmojo.DI.DITreeNodeDnD=mstrmojo.declare(mstrmojo.TreeNode,[mstrmojo._HasOwnAvatar],{scriptClass:"mstrmojo.DI.DITreeNodeDnD",title:"",cssClass:"mstrmojo-di-tree-node-dnd-list",markupString:'<div id="{@id}" class="{@cssClass} mstrmojo-di-tree-node-list" style="{@cssText}" title="{@title}" mstrAttach:click,mouseover,dblclick><div class="mstrmojo-di-tree-node"><img border="0" class="mstrmojo-di-tree-node-icon folder-closed" src="../images/1ptrans.gif"/><div class="mstrmojo-di-tree-node-text {@textCssClass}"></div><span class="mstrmojo-di-ga-tree-node-edit-icon"></span><div class="empty-indicator">'+mstrmojo.desc(70,"This Folder is empty.")+'</div></div><ul class="mstrmojo-di-tree-node-itemsContainer">{@itemsHtml}</ul></div>',markupSlots:{listNode:function(){return this.domNode.firstChild;},iconNode:function(){return this.domNode.firstChild.firstChild;},textNode:function(){return this.domNode.firstChild.children[1];},editIconNode:function(){return this.domNode.firstChild.children[2];},emptyIndicatorNode:function(){return this.domNode.firstChild.lastChild;},itemsContainerNode:function(){return this.domNode.lastChild;}},markupMethods:{onstateChange:function(){var open=this.state===1;this.iconNode.className=open?this.iconFolderOpen:this.iconFolderClosed;this.itemsContainerNode.style.display=open?"block":"none";mstrmojo.css.toggleClass(this.domNode,"expanded",open);},ontextChange:function(){this.textNode.innerHTML=mstrmojo.string.encodeHtmlString(this.text);},ontitleChange:function(){this.domNode.title=this.title;},postitemsChange:function(){mstrmojo.css.toggleClass(this.domNode,"empty",(!this.items||!this.items.length)&&this.data.fetched);}},clickHandler:null,dblClickHandler:mstrmojo.emptyFn,editHandler:null,deselect:function deselect(){if(this.listNode){if(this.data.isFolder){this.listNode.className="mstrmojo-di-tree-node-folder";}else{this.listNode.className="mstrmojo-di-tree-node-file";}}},fetched:false,iconEntity:"",iconFolderClosed:"mstrmojo-di-tree-node-icon folder-closed",iconFolderOpen:"mstrmojo-di-tree-node-icon folder-open",supportFolderDrag:true,totalSize:undefined,draggable:true,createAvatar:function createAvatar(sourceNode){if(!this.supportFolderDrag&&this.data.isFolder){return document.createElement("div");}if(sourceNode.className.indexOf("mstrmojo-di-tree-node-text")>-1){sourceNode=sourceNode.parentNode;}var css=sourceNode.className;urlObjectConfig.text=sourceNode.innerText;var div=mstrmojo.insert(urlObjectConfig);div.render();var isFolder=(css.indexOf("mstrmojo-di-tree-node-folder")>-1)?div.set("isFolder",true):div.set("isFolder",false);return div.domNode;},getDragData:function getDragData(ctxt){var address=[],i,selectedNodes;if(!this.supportFolderDrag&&this.data.isFolder){return address;}var target=ctxt.target||$DOM.eventTarget(ctxt.src.hWin,ctxt.src.e);var cssClass=target.className;var parentCssClass=target.parentNode.className;var isTargetSelected=(cssClass.indexOf("selected")>-1||parentCssClass.indexOf("selected")>-1);if(isTargetSelected){selectedNodes=this.data.browser.fileTree.selectedNodes;for(i=0;i<selectedNodes.length;i++){address.push(selectedNodes[i]);}}else{address.push(this);}return address;},isDragValid:function isDragValid(){return !this.data.isFolder||this.supportFolderDrag;},ondragstart:function ondragstart(evt){this._super(evt);var selectedNodes=evt.src.data;if(selectedNodes&&selectedNodes.length>1){if(this.avatar&&this.avatar.getElementsByClassName){this.avatar.getElementsByClassName("item-content")[0].innerHTML=selectedNodes.length;}}},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}var indent=0;var node=this;while(node&&node.parent&&node.parent.data){indent++;node=node.parent;}this.iconNode.style.marginLeft=indent*18+"px";this.emptyIndicatorNode.style.marginLeft=indent*18+"px";if(this.data.isFolder){this.iconNode.className=(this.state===1)?this.iconFolderOpen:this.iconFolderClosed;this.listNode.className="mstrmojo-di-tree-node-folder";this.editIconNode.style.display="none";}else{this.iconNode.className=this.data.iconEntity;this.listNode.className="mstrmojo-di-tree-node-file";}if(!this.data.edit){this.editIconNode.style.display="none";}this.set("richTooltip",{cssClass:"vi-regular vi-tooltip-V",refNode:this.textNode,posType:mstrmojo.tooltip.POS_BOTTOMLEFT,top:-5,content:this.tooltipContent});},selectThisNode:function(evt){if(this.data.isFolder){this.listNode.className="mstrmojo-di-tree-node-folder selected";}else{this.listNode.className="mstrmojo-di-tree-node-file selected";}var node=this;while(node&&node.parent&&node.parent.data){node=node.parent;}if(node&&node.tree&&node.tree.scriptClass==="mstrmojo.DI.DITreeDnD"){node.tree.selectNode(this,evt);}this.data.clickHandler.call(this,this);},selectThisNodeForDblClick:function(evt){if(this.data.isFolder){this.listNode.className="mstrmojo-di-tree-node-folder selected";}else{this.listNode.className="mstrmojo-di-tree-node-file selected";}var node=this;while(node&&node.parent&&node.parent.data){node=node.parent;}if(node&&node.tree&&node.tree.scriptClass==="mstrmojo.DI.DITreeDnD"){node.tree.selectNode(this,evt);}this.data.dblClickHandler.call(this,this);},onmouseover:function onmouseover(evt){if(!($Controller)){$Controller=mstrApp.getRootController();}if(!this.parent.sizeTooltip||!this.parent.folderSizeTooltip){return ;}if(!this.data.isMouseOver&&this.data.isFolder&&(this.totalSize===undefined)){this.data.isMouseOver=true;$Controller.hadoopController.browseHadoopForFolderSize(evt.src.data.address,this);}},onclick:function pmd(evt){var t=mstrmojo.dom.eventTarget(evt.hWin,evt.e);mstrmojo.dom.stopPropogation(evt.hWin,evt.e);if(t!==this.editIconNode){if(this.data.isFolder){if(this.state===0){if(this.data.fetched){this.set("state",1);}else{this.data.clickHandler.call(this,this);this.data.fetched=true;this.set("state",1);}}else{if(this.state===1){this.set("state",0);}}}else{this.selectThisNode(evt);}}else{this.data.editHandler(this);}},ondblclick:function pmd(evt){var t=mstrmojo.dom.eventTarget(evt.hWin,evt.e);mstrmojo.dom.stopPropogation(evt.hWin,evt.e);if(t!==this.editIconNode){if(this.data.isFolder){if(this.state===0){if(this.data.fetched){this.set("state",1);}else{this.data.clickHandler.call(this,this);this.data.fetched=true;this.set("state",1);}}else{if(this.state===1){this.set("state",0);}}}this.selectThisNodeForDblClick(evt);}}});}());