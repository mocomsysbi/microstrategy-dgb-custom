(function(){mstrmojo.requiresCls("mstrmojo.Widget");var $WIDGET=mstrmojo.Widget;mstrmojo.ui._IsPulldown=mstrmojo.provide("mstrmojo.ui._IsPulldown",{scriptClass:"mstrmojo.ui._IsPulldown",markupString:'<div id="{@id}" style="{@cssText}" class="mstrmojo-ui-Pulldown {@cssClass}" mstrAttach:mousedown,click><div class="mstrmojo-ui-Pulldown-text {@cssTextClass}" title="{@title}" style="{@labelCssText}">{@value}</div><div class="container"></div></div>',markupSlots:{selectedNode:function selectedNode(){return this.domNode.firstChild;},containerNode:function containerNode(){return this.domNode.lastChild;}},markupMethods:{onvisibleChange:$WIDGET.visibleMarkupMethod,onheightChange:$WIDGET.heightMarkupMethod,onwidthChange:$WIDGET.widthMarkupMethod,onvalueChange:function onvalueChange(){this.selectedNode.innerHTML=this.value||"";},onenabledChange:mstrmojo.Widget.enabledMarkupMethod},getPopupList:mstrmojo.emptyFn,anchorSlot:"selectedNode",postBuildRendering:function postBuildRendering(){this._super();this.getPopupList().set("items",this.items);var selectedIndex=this.selectedIndex,selectedIndices=this.selectedIndices;if(selectedIndex!==undefined){this.set("selectedIndex",selectedIndex);}if(selectedIndices!==undefined){this.set("selectedIndices",mstrmojo.hash.copy(selectedIndices||{}));}},onitemsChange:function onitemsChange(){var list=this.getPopupList();if(list){list.set("items",this.items);}},onPopupWidgetOpened:function(){var list=this.getPopupList();if(list&&(!list.items||list.items.length===0)){list.close();}}});}());