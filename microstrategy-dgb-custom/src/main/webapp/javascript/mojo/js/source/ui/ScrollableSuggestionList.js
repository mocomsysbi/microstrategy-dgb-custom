(function(){mstrmojo.requiresCls("mstrmojo.LegacySuggestionList","mstrmojo.ui._HasScroller");var $DOM=mstrmojo.dom;mstrmojo.ui.ScrollableSuggestionList=mstrmojo.declare(mstrmojo.LegacySuggestionList,[mstrmojo.ui._HasScroller],{scriptClass:"mstrmojo.ui.ScrollableSuggestionList",markupString:'<div id="{@id}" class="mstrmojo-ListBase mstrmojo-scrollable-suggestlist {@cssClass}" style="{@cssText}" mstrAttach:click,dblclick,mouseover,mouseout,contextmenu><div class="list-content"><div class="items-container {@icnCss}" style="{@icnCssText}">{@itemsHtml}</div></div></div>',markupSlots:{itemsContainerNode:function itemsContainerNode(){return this.domNode.firstChild.firstChild;},scrollboxNode:function scrollboxNode(){return this.domNode.firstChild;},scrollNode:function scrollnode(){return this.domNode.firstChild;}},onclick:function onclick(evt){var itm=this.getItemFromTarget(evt.getTarget());if(itm){this._super(evt);}},onitemsChange:function onitemsChange(){var me=this;window.setTimeout(function(){me.hideTooltip();me.updateScrollbars();},0);},updateScrollbars:function updateScrollbars(){this._super();var me=this,sn=me.scrollNode,snw=sn.clientWidth,icn=me.itemsContainerNode,icnw=icn.clientWidth;icn.style.width="auto";window.setTimeout(function(){if(snw>icnw){icn.style.width=icnw+(snw-icnw)+"px";}},10);},useRichTooltip:true,getItemTooltip:function(item,itemNode){var position=$DOM.position(itemNode),content=itemNode.ttp;var richTooltip={areaId:item._renderIdx+"text",cssClass:"vi-regular vi-tooltip-C",contentNodeCssClass:"regular-unitlist-tooltips",posType:"",content:content,top:position.y,left:position.x+position.w+6,enableHover:false};return richTooltip;},showTooltip:function showTooltip(evt,win){var target=this.targetEl,item=this.targetItem;if(target&&target.ttp){this.richTooltip=this.getItemTooltip(item,target);if(this.richTooltip){this._super(evt,win);}}}});}());