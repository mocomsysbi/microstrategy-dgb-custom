(function(){var $STR=mstrmojo.string;function filterList(pattern,items,itemField){var i,len,n,subItems=[],regPtn,matchTop;try{regPtn=new RegExp(mstrmojo.string.regEscape(pattern),"i");}catch(e){return subItems;}for(i=0,len=items.length;i<len;i++){n=items[i][itemField];regPtn.lastIndex=0;if(regPtn.test(n)){subItems.push(items[i]);}}return subItems;}function displayList(){if(this.searchEnabled){this.iconNode.style.display="none";this.inputBar.style.display="";if(this.autofocus){this.inputNode.focus();this.inputNode.select();}}else{this.hideInputNode();if(this.autofocus){if(mstrmojo.dom.isIE7||mstrmojo.dom.isIE8){var me=this;window.setTimeout(function(){try{me.iconNode.focus();}catch(ex){}},100);}else{this.iconNode.focus();}}}}var _KEYCODENAME={8:"BackSpace",9:"Tab",13:"Enter",27:"Esc",38:"ArrowUp",40:"ArrowDown"};mstrmojo.SearchableDropDownList=mstrmojo.declare(mstrmojo.Pulldown,null,{scriptClass:"mstrmojo.SearchableDropDownList",markupString:'<div id="{@id}" class="mstrmojo-SearchableDropDownList mstrmojo-DropDownButton {@cssClass} {@direction}" style="{@cssText}"><div class="mstrmojo-DropDownButton-boxNode {@cssClass}-boxNode" title="{@title}"><div class="mstrmojo-DropDownButton-iconNode {@cssClass}-iconNode" tabindex="0" mstrAttach:mousedown,keyup>{@text}</div><table class="mstrmojo-InputNodeBar"><colgroup><col class="inputCol"/><col class="iconCol"/></colgroup><tr><td><input class="mstrmojo-SearchableDropDownList-inputNode" value="{@text}" placeholder="{@placeholderText}" mstrAttach:keyup,blur,click/></td><td><div class="mstrmojo-DropDownButton-iconNode {@cssClass}-iconNode" mstrAttach:mousedown></div></td></tr></table></div><div class="mstrmojo-DropDownButton-popupNode {@cssClass}-popupNode"></div></div>',markupSlots:mstrmojo.hash.copy(mstrmojo.Pulldown.prototype.markupSlots,{inputBar:function(){return this.domNode.firstChild.lastChild;},inputNode:function(){return this.domNode.firstChild.lastChild.rows[0].cells[0].firstChild;}}),markupMethods:mstrmojo.hash.copy({ontextChange:function(){this.iconNode.innerHTML=$STR.decodeHtmlString(this.text);this.inputNode.value=this.text;},onheightChange:function(){var height=parseInt(this.height,10);if(height>=0){this.domNode.offsetHeight=height+"px";this.inputBar.offsetHeight=height+"px";}}},mstrmojo.hash.copy(mstrmojo.Pulldown.prototype.markupMethods)),popupToBody:true,searchEnabled:false,selectedIndex:-1,placeholderText:"",allItems:null,autofocus:true,focus:function(){displayList.call(this);},hideInputNode:function hideInputNode(){this.inputBar.style.display="none";this.iconNode.style.display="block";},postBuildRendering:function postBuildRendering(){if(!this.allItems){this.allItems=this.items;}this._super();displayList.call(this);},clickInput2pop:false,onclick:function onclick(evt){if(this.clickInput2pop){this.togglePopup();}},prekeyup:function prekeyup(evt){var ptn=this.getSearchPattern(),items=[],selected,inputNode=this.inputNode,e=evt.e,start,end,len=this.items.length;if(_KEYCODENAME[e.keyCode]==="Enter"){if(this.items.length>0){this.set("selectedIndex",this.selectedIndex===-1?0:this.selectedIndex);}this.onEnter&&this.onEnter();this.closePopup();return ;}else{if(_KEYCODENAME[e.keyCode]==="Esc"){this.onEsc&&this.onEsc();if(this.popupRef.visible){this.popupRef.close();}return ;}else{if(_KEYCODENAME[e.keyCode]==="ArrowDown"){if(!this.popupRef.visible){this.togglePopup();}this.set("selectedIndex",(this.selectedIndex+1)%len);}else{if(_KEYCODENAME[e.keyCode]==="ArrowUp"){if(this.popupRef.visible&&len>0){this.set("selectedIndex",(this.selectedIndex+len-1)%len);}}else{if(this.searchEnabled){if(ptn&&ptn.length>0&&ptn.indexOf(this.lastSearchPattern)>-1){items=filterList(ptn,this.items,this.itemField);}else{items=filterList(ptn,this.allItems,this.itemField);}this.set("selectedIndex",-1);this.set("items",items);len=items.length;if(len===0){this.closePopup();}else{if(!this.popupRef.visible){this.togglePopup();}}if(ptn&&ptn.length>0){this.set("selectedIndex",mstrmojo.array.find(items,this.itemField,inputNode.value));}}}}}}this.lastSearchPattern=ptn;},getSearchPattern:function getSearchPattern(){return $STR.trim(this.inputNode.value);}});}());