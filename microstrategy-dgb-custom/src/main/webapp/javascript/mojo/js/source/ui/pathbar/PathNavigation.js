(function(){mstrmojo.requiresCls("mstrmojo.ui.pathbar.PathPopup","mstrmojo.dom","mstrmojo.ListBase","mstrmojo._IsList","mstrmojo.ui.pathbar._PreAppExit");var $DOM=mstrmojo.dom;function createPickerMenu(){this.addDisposable(this.pickerMenu=new mstrmojo.ui.pathbar.PathPopup({id:"mojoPathPickerMenu",cssClass:"mojoPathPicker",offsetLeft:-23,children:[{scriptClass:"mstrmojo.ui.pathbar.List",alias:"menuItems",preclick:function preclick(){this.parent.close();},items:null,getItemMarkup:function(){return'<a href="#" idx="{@idx}"><span>{@en@n}</span></a>';},getItemProps:function getItemProps(item,idx){return{n:item.n,idx:idx,href:item.href};}}]}));}mstrmojo.ui.pathbar.PathNavigation=mstrmojo.declare(mstrmojo.ListBase,[mstrmojo._IsList,mstrmojo.ui.pathbar._PreAppExit],{scriptClass:"mstrmojo.ui.pathbar.PathNavigation",icnCss:"pathNavigationRight",pickerMenu:null,init:function init(props){this._super(props);createPickerMenu.call(this);},onclick:function onclick(evt){var mPickerMenu=this.pickerMenu;if(!this._super(evt)){return false;}var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),item=$DOM.findAncestorByAttr(target,"idx",true,this.domNode),idx=item&&parseInt(item.value,10),selectedItem=this.items[idx];if(selectedItem&&selectedItem.en&&selectedItem.items){if(mPickerMenu.targetNode!==item.node){mPickerMenu.set("targetNode",item.node);mPickerMenu.menuItems.set("items",selectedItem.items);}if(!mPickerMenu.isOpen){mPickerMenu.open();}}},getItemMarkup:function(item){if(item.items){return'<span class="tb{@n} mstrComboDown" idx="{@idx}"><a class="tb{@n}0 mstrIcon-tb {@en}" title="{@desc}" href="#"></a><span class="tb{@n}1 mstrPullArrow {@en}" title="{@desc}" menu="true"></span></span>';}if(item.visible===false){return"";}return'<a href="#" idx="{@idx}"><span title="{@desc}" class="tb{@n} mstrIcon-tb {@en}"></span></a>';},getItemProps:function getItemProps(item,idx){return{n:item.n,idx:idx,href:item.href,desc:item.desc,en:item.en?"":"disabled"};}});}());