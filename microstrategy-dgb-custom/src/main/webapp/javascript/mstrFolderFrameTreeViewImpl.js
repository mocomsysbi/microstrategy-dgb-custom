mstrFolderFrameTreeViewImplScript=true;mstrFolderFrameTreeViewImpl.prototype=new mstrFolderTreeViewImpl();mstrFolderFrameTreeViewImpl.prototype.differentiateExpandSelect=false;mstrFolderFrameTreeViewImpl.prototype.cacheOnSelect=false;mstrFolderFrameTreeViewImpl.prototype.beanPath;mstrFolderFrameTreeViewImpl.prototype.anchorTarget;mstrFolderFrameTreeViewImpl.prototype.onload=function(){try{this.initFolderTree();}catch(err){microstrategy.errors.log(err);return false;}};mstrFolderFrameTreeViewImpl.prototype.onpostload=function(){try{var div=getObj(this.DIV_TREE_WAIT_ID);if(div){this.emptyDivTreeWaitNode(div);}this.resize();}catch(err){microstrategy.errors.log(err);return false;}};mstrFolderFrameTreeViewImpl.prototype.initFolderTree=function(){try{this.initTree();if(this.treeDiv){this.treeDiv.ondblclick=null;this.treeDiv.oncontextmenu=new Function("e","microstrategy.bone('"+this.id+"').onContextMenu(e); return false;");microstrategy.disableTextSelection(this.treeDiv);}}catch(err){microstrategy.errors.log(err);return false;}};mstrFolderFrameTreeViewImpl.prototype.onreload=function(){try{mstrTreeViewImpl.prototype.onreload.call(this);var waitDiv=this.createDummyDivTreeWaitNode();if(waitDiv){this.elem.insertAdjacentElement("afterEnd",waitDiv);}}catch(err){microstrategy.errors.log(err);return false;}};mstrFolderFrameTreeViewImpl.prototype.onContextMenu=function(e){mstrTreeViewImpl.prototype.onContextMenu.apply(this,[e]);var curCMNode=microstrategy.findAncestorWithTag(this.currentContextMenuNode,"LI"),curSelNode=microstrategy.findAncestorWithTag(this.currentlySelectedNode,"LI");if(curCMNode!==curSelNode){this.onClickTree(e);}};mstrFolderFrameTreeViewImpl.prototype.onClickTree=function(e){try{if(!e){e=window.event;}if(this.treeProcessing){e.returnValue=false;return ;}var oTarget=getEventTarget(e);if(!oTarget){return ;}var isSelect=false;var shouldProcessNode=false;this.hideTreeWaitMessage();if((oTarget.tagName=="SPAN"&&oTarget.getAttribute("type"))){oTarget=oTarget.parentNode;}if(oTarget.tagName=="LI"){shouldProcessNode=true;if(!this.differentiateExpandSelect){this.util_unselectNodes(oTarget,this.elem);this.util_markNodeAsSelected(oTarget);}}else{if(oTarget.tagName=="A"||oTarget.tagName=="SPAN"){isSelect=true;oTarget=oTarget.parentNode.parentNode;this.util_markNodeAsSelected(oTarget);var did=oTarget.getAttribute("did")?oTarget.getAttribute("did"):oTarget.parentNode.getAttribute("did");if(oTarget.getAttribute("did")=="incrementalFetch"){this.util_unselectNodes(oTarget,this.elem);this.util_markNodeAsSelected(oTarget);shouldProcessNode=true;}else{if(did!="none"){if(e.ctrlKey){if(oTarget.getAttribute("sel")=="1"){this.util_markNodeAsUnselected(oTarget);}else{this.util_checkSelectedNodes(oTarget,this.elem);this.util_markNodeAsSelected(oTarget);}}else{if(this.util_getNodeState(oTarget)==this.NODE_STATE_LEAF||oTarget.getAttribute("sel")=="1"){shouldProcessNode=true;}this.util_unselectNodes(oTarget,this.elem);this.util_markNodeAsSelected(oTarget);}}}}}if(shouldProcessNode){e.returnValue=this.util_processNode(oTarget,this,isSelect);}else{e.returnValue=false;}return ;}catch(err){microstrategy.errors.log(err);return false;}};mstrFolderFrameTreeViewImpl.prototype.getPreviousSibling=function(element){var myPrevSib=element.previousSibling;while(myPrevSib&&myPrevSib.nodeType!=1){myPrevSib=myPrevSib.previousSibling;}return myPrevSib;};mstrFolderFrameTreeViewImpl.prototype.getNextSibling=function(element){var myNextSib=element.nextSibling;while(myNextSib&&myNextSib.nodeType!=1){myNextSib=myNextSib.nextSibling;}return myNextSib;};mstrFolderFrameTreeViewImpl.prototype.util_processNode=function(oTarget,oTree,isSelectAction){try{var oDIV=this.util_findTargetTag(oTarget,"DIV");if(!oDIV){return true;}if(oTarget.getAttribute("did")=="none"){var iState=this.util_getNodeState(oTarget);switch(iState){case (this.NODE_STATE_OPEN):this.util_setTreeTargetState(oDIV,this.NODE_STATE_CLOSED);break;case (this.NODE_STATE_CLOSED):this.util_setTreeTargetState(oDIV,this.NODE_STATE_OPEN);break;}return false;}if(this.differentiateExpandSelect&&isSelectAction){var ns=this.getNextSibling(oDIV);if((this.util_getNodeState(oDIV)==this.NODE_STATE_LEAF)||(ns&&ns.tagName.toLowerCase()=="ul")){this.cacheOnSelect=false;}else{this.cacheOnSelect=true;}var oAnchor=this.util_getAnchor(oTarget);if(oAnchor){this.util_preProcessAnchor(oTarget,oAnchor);if(oTarget.getAttribute("isLink")){this.util_submitForm(oAnchor);}else{this.util_submitFormWithSelectEvent(oAnchor);}}return false;}if(oTarget.getAttribute("did")=="incrementalFetch"){var oUL=oDIV.parentNode;var oParentNode=this.getPreviousSibling(oUL);oTree.scrollTop=oParentNode.offsetTop;oUL.parentNode.removeChild(oUL);this.showTreeWaitMessage(oParentNode,"afterEnd");var oAnchor=util_getAnchor(oTarget);if(oAnchor){this.util_preProcessAnchor(oTarget,oAnchor);if(oTarget.getAttribute("isLink")){this.util_submitForm(oAnchor);}else{this.util_submitFormWithSelectEvent(oAnchor);}}}else{var iState=this.util_getNodeState(oTarget);switch(iState){case (this.NODE_STATE_LEAF):var oAnchor=this.util_getAnchor(oTarget);this.util_preProcessAnchor(oTarget,oAnchor);if(oTarget.getAttribute("isLink")){this.util_submitForm(oAnchor);}if(oAnchor.getAttribute("dum")){return false;}else{return true;}break;case (this.NODE_STATE_OPEN):this.util_setTreeTargetState(oDIV,this.NODE_STATE_CLOSED);if(this.isNodeAncestorOfCurrentlySelected(oDIV)){this.util_markNodeAsSelected(oTarget);var oAnchor=this.util_getAnchor(oTarget);if(oAnchor){this.cacheOnSelect=false;this.util_submitFormWithSelectEvent(oAnchor);return false;}}break;case (this.NODE_STATE_CLOSED):var ns=this.getNextSibling(oDIV);if(ns&&ns.tagName=="UL"){this.util_setTreeTargetState(oDIV,this.NODE_STATE_OPEN);}else{microstrategy.showWaitPopup=false;if(this.differentiateExpandSelect){this.showTreeWaitMessage(oDIV,"afterEnd");this.cacheOnSelect=false;this.util_submitFormWithExpandEvent(oTarget);}else{this.showTreeWaitMessage(oDIV,"afterEnd");this.util_setTreeTargetState(oDIV,this.NODE_STATE_OPEN);var oAnchor=this.util_getAnchor(oTarget);if(oAnchor){this.cacheOnSelect=true;this.util_submitFormWithSelectEvent(oAnchor);}}}break;}}return false;}catch(err){microstrategy.errors.log(err);return false;}};mstrFolderFrameTreeViewImpl.prototype.util_submitFormWithExpandEvent=function(oTarget){try{var updateManager=microstrategy.updateManager;var actionCollection=new Array();var folderId=oTarget.getAttribute("did");actionCollection.push(updateManager.createActionObject(oTarget,mstrUpdateManager.EXPAND_NODE,this.beanPath,mstrUpdateManager.actions[mstrUpdateManager.EXPAND_NODE].paramID,[folderId]));updateManager.add(actionCollection);updateManager.useIframe=true;updateManager.flushAndSubmitChanges();updateManager.acknowledgeRequest();}catch(err){microstrategy.errors.log(err);return false;}};mstrFolderFrameTreeViewImpl.prototype.util_submitFormWithSelectEvent=function(oTarget){try{var updateManager=microstrategy.updateManager;var actionCollection=new Array();var oAnchor=this.util_getAnchor(oTarget);var folderId=oTarget.parentNode.parentNode.getAttribute("did");actionCollection.push(updateManager.createActionObject(oTarget,mstrUpdateManager.SELECT_NODE,this.beanPath,mstrUpdateManager.actions[mstrUpdateManager.SELECT_NODE].paramID,[folderId,this.cacheOnSelect]));updateManager.add(actionCollection);var href=null;if(oAnchor){href=oAnchor.getAttribute("href");}if(href&&href.indexOf("iframe=true")>=0){updateManager.useIframe=true;}else{updateManager.useIframe=false;}updateManager.flushAndSubmitChanges();updateManager.acknowledgeRequest();}catch(err){microstrategy.errors.log(err);return false;}};mstrFolderFrameTreeViewImpl.prototype.showTreeWaitMessage=function(oTarget,location){try{if(!oTarget){return ;}this.treeProcessing=true;var div=getObj(this.DIV_TREE_WAIT_ID);if(div){div.parentNode.removeChild(div);}div=document.createElement("DIV");div.setAttribute("IFRAME","true");div.id=this.DIV_TREE_WAIT_ID;div.className=this.CSS_TREE_WAIT;div.noWrap=true;if((typeof (aDescriptor)!="undefined")&&(aDescriptor[38]!=null)){div.innerHTML=aDescriptor[38];}else{div.innerHTML=microstrategy.descriptors.getDescriptor("5674");}oTarget.insertAdjacentElement(location,div);return ;}catch(err){microstrategy.errors.log(err);return false;}};mstrFolderFrameTreeViewImpl.prototype.createDummyDivTreeWaitNode=function(){try{var divWait=getObj(this.DIV_TREE_WAIT_ID);if(!divWait){var div=document.createElement("DIV");div.setAttribute("IFRAME","true");div.id=this.DIV_TREE_WAIT_ID;div.noWrap=true;return div;}return null;}catch(err){microstrategy.errors.log(err);return false;}};mstrFolderFrameTreeViewImpl.prototype.hideTreeWaitMessage=function(){try{var div=getObj(this.DIV_TREE_WAIT_ID);if(div){if(this.getPreviousSibling(div)){if(!this.differentiateExpandSelect&&div.className&&div.className=="mstrTransform"){this.getPreviousSibling(div).insertAdjacentElement("afterEnd",div.childNodes[0]);}}else{div.parentNode.appendChild(div.childNodes[0]);}if(!this.differentiateExpandSelect&&div.className&&div.className=="mstrTransform"){div.parentNode.removeChild(div);}}return ;}catch(err){microstrategy.errors.log(err);return false;}};mstrFolderFrameTreeViewImpl.prototype.expandTreeNode=function(targetFolderId,selectRequestedNode){try{var div=getObj(this.DIV_TREE_WAIT_ID);if(div){var aLITags=document.getElementsByTagName("LI");for(i=0;i<aLITags.length;i++){if(aLITags[i].getAttribute("did")==targetFolderId){if(selectRequestedNode){this.util_markNodeAsSelected(aLITags[i]);mstr.utils.BoxModel.scrollToElement(this.elem,aLITags[i]);}var nodeState=this.util_getNodeState(aLITags[i]);if(nodeState==this.NODE_STATE_CLOSED){var ulTag=this.util_getChildNode(div,"UL");if(!ulTag){this.util_setTreeTargetState(aLITags[i].parentNode,this.NODE_STATE_LEAF);}else{aLITags[i].parentNode.insertAdjacentElement("afterEnd",ulTag);if(!this.cacheOnSelect){this.util_setTreeTargetState(aLITags[i].parentNode,this.NODE_STATE_OPEN);}else{this.util_setTreeTargetState(aLITags[i].parentNode,this.NODE_STATE_CLOSED);}}if(!this.cacheOnSelect){this.cascadeOpenFolderUp(aLITags[i].parentNode);}}this.cacheOnSelect=false;return ;}}}this.cacheOnSelect=false;return ;}catch(err){microstrategy.errors.log(err);this.cacheOnSelect=false;return false;}};mstrFolderFrameTreeViewImpl.prototype.emptyDivTreeWaitNode=function(div){try{if(div.childNodes){while(div.childNodes.length){div.removeChild(div.firstChild);}div.style.display="none";}}catch(err){microstrategy.errors.log(err);return false;}};mstrFolderFrameTreeViewImpl.prototype.cascadeOpenFolderUp=function(oTarget){var node=oTarget.parentNode;var fn=function(n){var chs=n.childNodes;for(var i=0,cnt=chs.length;i<cnt;i++){if(chs[i].nodeType==1){return chs[i];}}return null;};prevSib=this.getPreviousSibling(node);while(prevSib&&prevSib.tagName.toLowerCase()=="div"){var firstChild=fn(prevSib);if(firstChild&&firstChild.tagName.toLowerCase()=="li"){firstChild.className=this.CSS_CLASS_OPEN;node.style.display="block";}node=node.parentNode;prevSib=this.getPreviousSibling(node);}};mstrFolderFrameTreeViewImpl.prototype.resize=function(){if(this.elem&&this.elem.style){var newHeight=microstrategy.contentHeight-31;if(newHeight>=0){this.elem.style.height=newHeight+"px";microstrategy.updateBrowserSetting("ltH",newHeight);}else{this.elem.style.height=0+"px";}var newWidth=getObjWidth(this.elem.parentNode);if(newWidth>=0){this.elem.style.width=newWidth+"px";}else{this.elem.style.width=0+"px";}}};mstrFolderFrameTreeViewImpl.prototype.ondialogresize=function(){this.onwinresize();};mstrFolderFrameTreeViewImpl.prototype.onwinresize=function(){try{if(this.elem&&getObjWidth(this.elem.parentNode)&&getObjHeight(this.elem.parentNode)){this.resize();}}catch(err){microstrategy.errors.log(err);return false;}};function mstrFolderFrameTreeViewImpl(id){this.inherits=mstrFolderTreeViewImpl;this.inherits(id);delete this.inherits;return this;}