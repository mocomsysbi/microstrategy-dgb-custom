(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.css","mstrmojo.hash","mstrmojo._HasEditableText","mstrmojo.ui.Pulldown","mstrmojo.ui.SearchablePulldown","mstrmojo.DI.DIHelpers","mstrmojo.DI.DIConstants");var $CSS=mstrmojo.css,$ARR=mstrmojo.array,$H=mstrmojo.DI.DIHelpers,$CONST=mstrmojo.DI.DIConstants.DSSSubType,KEY_ENTER=13;function setAttributePath(items){$ARR.forEach(items,function(item){var anc=item.anc.items;item.title="";if(anc){$ARR.forEach(anc,function(a){item.title+=a.n+"/";});}});}function onsearch(){var input=this.selectedNode&&mstrmojo.string.trim(this.selectedNode.innerText||this.selectedNode.innerHTML),me=this,isQuickSearch,callback,taskParams,currentInput;if(!input||!me.isEditing){me.getPopupList()._oldItems=null;me.getPopupList().set("items",[]);me.getPopupList().set("visible",false);return ;}input=input.toString();input=input.replace(/<BR>/,"").replace(/<br>/,"").replace("\u00A0","\u0020");callback={success:function success(res){currentInput=mstrmojo.string.trim(me.selectedNode.innerText||me.selectedNode.innerHTML);currentInput=currentInput.toString();currentInput=currentInput.replace(/<BR>/,"").replace(/<br>/,"").replace("\u00A0","\u0020");var pulldownList=me.getPopupList(),result=me.isMap2ProjAttr?$ARR.filter(res.items,function(item){return item.st!==$CONST.DSSSUBTYPEATTRIBUTETRANSFORMATION;}):res.items,open=false;if(currentInput===input){setAttributePath(result);pulldownList._spft=(input||"").toUpperCase();me.set("items",result);pulldownList.set("items",result);if(!result||result.length===0){me.closePopup();}else{open=true;}}else{pulldownList._oldItems=null;me.set("items",[]);me.closePopup();}var oldItems=pulldownList._oldItems||pulldownList.items;if(open){me.openPopup(pulldownList);}delete pulldownList._spft;pulldownList._oldItems=oldItems;},failure:function failure(res){if(me.showTaskError){mstrmojo.alert(mstrmojo.desc(8117,"Data request failed:")+" \n"+res.getResponseHeader("X-MSTR-TaskFailureMsg").replace(/com\.microstrategy\.(.*): \((.*)\)/,"$2"));}},complete:function complete(){me.set("isEditing",true);$CSS.removeClass(me.domNode,"wait");}};if(typeof microstrategy!=="undefined"&&microstrategy.useQuickSearch){isQuickSearch=microstrategy.useQuickSearch();}else{if(mstrApp&&mstrApp.isWorkstation){isQuickSearch=true;}else{isQuickSearch=false;}}taskParams={styleName:"MojoFolderStyle",nameWildcards:isQuickSearch?16:1,blockBegin:this.blockBegin||1,blockCount:this.blockCount,recursive:true,includeAncestorInfo:true,objectType:"12",quickSearch:isQuickSearch};taskParams.searchPattern=isQuickSearch?input:input+"*";mstrApp.getRootController().getDataService().searchMetadata(callback,taskParams);}mstrmojo.DI.DISearchablePulldown=mstrmojo.declare(mstrmojo.ui.SearchablePulldown,null,{scriptClass:"mstrmojo.DI.DISearchablePulldown",onPopupWidgetClosed:mstrmojo.emptyFn,onkeyup:function onkeyup(event){var evt=window.event||event.e,popupList=this.getPopupList(),newText=this.selectedNode.innerText||this.selectedNode.textContent,text=newText.replace(/\n/g,""),hasText;if(evt.keyCode===KEY_ENTER){if(this.selectedNode.innerText){this.selectedNode.innerText=text;}else{this.selectedNode.textContent=text;}this.selectedNode.blur();this.set("isEditing",true);popupList._oldItems=null;if(this.items&&this.items.length){this.set("items",[]);}$CSS.addClass(this.domNode,"wait");if(typeof microstrategy!=="undefined"&&microstrategy.enableQuickSearch){if(this._autoSearchTimer){self.clearTimeout(this._autoSearchTimer);}var searchAutoCompleteDelay=1000,me=this;if(searchAutoCompleteDelay){this._autoSearchTimer=self.setTimeout(function(){onsearch.call(me);},searchAutoCompleteDelay);}}else{onsearch.call(this);}}else{hasText=(text||"").length>0;$CSS.toggleClass(this.selectedNode,"clear",hasText);if(popupList._oldItems){popupList._oldItems=null;}if(this.items&&this.items.length){this.set("items",[]);}this.closePopup();}},onkeydown:function(event){var evt=window.event||event.e;if(evt.keyCode===KEY_ENTER){evt.preventDefault();return false;}},onclick:function onclick(evt){var target=evt.getTarget(),selectedNode=this.selectedNode,isIcon=evt.e.offsetX>=(selectedNode.offsetWidth-19),listWidget=this.getPopupList();if(target===this.selectedNode&&!isIcon){this.set("isEditing",true);if(!listWidget.visible&&this.items&&this.items.length>0){this.openPopup(listWidget);}else{this.closePopup();}}if(isIcon&&this.selectedNode.className.indexOf("clear")>=0){this.set("text","");this.set("isEditing",true);$CSS.toggleClass(this.selectedNode,"clear",false);this.set("selectedIndex",-1);this.set("items",[]);listWidget._oldItems=null;this.closePopup();}evt.cancel();},_set_items:function _set_items(n,v){var previousItems=this.items,popupList=this.getPopupList(),changed;if(this.isEditing){delete this.selectedIndex;this.items=v;popupList.set("items",v);changed=(previousItems!==v);}else{changed=this._super(n,v);}return changed;},onselectedIndexChange:function(){var v=this.selectedIndex;if(this._super){this._super();}if(v>=0){$CSS.toggleClass(this.selectedNode,"clear",true);}}});}());