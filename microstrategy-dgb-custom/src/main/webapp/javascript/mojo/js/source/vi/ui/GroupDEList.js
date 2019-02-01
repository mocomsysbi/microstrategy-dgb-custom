(function(){mstrmojo.requiresCls("mstrmojo.ui.ScrollableList","mstrmojo._HasOwnAvatar","mstrmojo.dom","mstrmojo.css","mstrmojo.string","mstrmojo.vi.enums.EnumDerivedElementType");var $DOM=mstrmojo.dom,$CSS=mstrmojo.css,$DET=mstrmojo.vi.enums.EnumDerivedElementType,$STR=mstrmojo.string,ENUM_EDGE_TOP="top",ENUM_EDGE_BOTTOM="bottom",itemMarkup;function getIndexByMousePosition(y,dragData){return Math.min(Math.max(Math.floor((y-dragData.y0)/dragData.h),0),this.items.length-1);}function getTargetEdge(y,dragData){var edge=ENUM_EDGE_TOP,pos=(Math.floor(y-dragData.y0)%dragData.h)/dragData.h,idx=getIndexByMousePosition.call(this,y,dragData);if(idx===this.items.length-1){if(pos>0.5||Math.floor((y-dragData.y0)/dragData.h)>idx){edge=ENUM_EDGE_BOTTOM;}}else{if(pos>0.5){if(idx<this.items.length-1){idx+=1;}}}return{edge:edge,idx:idx};}function clearTimer(){if(this.tmr){window.clearInterval(this.tmr);delete this.tmr;}}function isOnItem(context){return !context.src.data.isScrollBar&&!isNaN(context.src.data.index);}mstrmojo.vi.ui.GroupDEList=mstrmojo.declare(mstrmojo.ui.ScrollableList,[mstrmojo._HasOwnAvatar],{scriptClass:"mstrmojo.vi.ui.GroupDEList",draggable:true,avatarCssClass:"group-DE-drag-avatar",editOnDoubleClick:true,clickCount:0,timer:null,useRichTooltip:true,init:function init(props){this._super(props);mstrmojo.css.addWidgetCssClass(this,"mstrmojo-VIGroupDEList");},getItemMarkup:function getItemMarkup(item){if(!itemMarkup){itemMarkup=this._super(item).replace(">{@en@n}",'><div><div class="group-column"><div class="draggable-icon"></div><div class="name" mstrAttach:click>{@en@n}</div></div><div class="mstrmojo-group-list">{@prev}</div><div class="mstrmojo-group-delete" mstrAttach:click></div><div style="clear:both;float:none;"></div></div>');}return itemMarkup;},onscroll:function onscroll(evt){this.parent.renameDE.set("visible",false);this._super(evt);},onclick:function onClick(evt){var tg=evt.getTarget(),row=$DOM.findAncestorByAttr(tg,"idx",true,this.domNode),idx,me=this,w=me.parent;w.renameDE.set("visible",false);if(row&&tg.className&&tg.className.indexOf("group-delete")>0){idx=parseInt(row.node.getAttribute("idx"),10);this.parent.model.deleted.push(this.items[idx]);this.items.splice(idx,1);this.parent.initExcludeList();this.parent.enableOkBtn();this.refresh();}if(row&&tg.className&&tg.className.indexOf("name")>=0){idx=parseInt(row.node.getAttribute("idx"),10);this.clickCount++;if(this.clickCount===1){this.singleSelect(idx);this.timer=window.setTimeout(function(){me.clickCount=0;if(row.node.className.indexOf("list")>0||(row.node.className.indexOf("calculation")>0&&w.model&&w.model.isRA)){me.parent.toggleEdit(true,false,me.items[idx]);}},400);}else{if(this.clickCount===2){window.clearTimeout(this.timer);this.clickCount=0;if(idx===this.selectedIndex){w=me.parent;w.renameDE.set("visible",true);w.renameDE.set("text",this.selectedItem.n);w.renameDE.domNode.style.left=($DOM.position(tg).x-$DOM.position(this.domNode.parentNode).x)+"px";w.renameDE.domNode.style.top=($DOM.position(tg).y-$DOM.position(this.domNode.parentNode).y)+"px";}}}}},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx);props.cls="mstrmojo-VIGroupDERow "+((item.t===$DET.RESIDUE)?"others":(item.t===$DET.CALCULATION)?("calculation"+(this.parent.model&&this.parent.model.isRA?" ra":"")):"list");props.prev=item.prev;return props;},deleteItem:mstrmojo.emptyFn,setupScrollNodes:function setupScrollNodes(){this.scrollNode=this.scrollboxNode;},getDragData:function getDragData(context){if(this._super){var ret=this._super(context);if(ret&&ret.isScrollBar===true){return ret;}}var sourceNode=context.src.node,id=this.id,itemNodeObj=$DOM.findAncestorByAttr(sourceNode,"idx",true,this.domNode),node,idx;node=context.src.node=itemNodeObj?itemNodeObj.node:sourceNode;idx=parseInt(node.getAttribute("idx"),10);return{item:this.items[idx],index:idx,node:node,setAvatarClass:function setAvatarClass(cls){var list=mstrmojo.all[id],avatar=list.avatar;if(avatar){var classes=[list.avatarCssClass,"hasOwnAvatar",cls];avatar.className=classes.join(" ");}}};},createAvatar:function createAvatar(node,context){var avatar=null;if(isOnItem(context)){avatar=node.cloneNode(true);}return avatar;},positionAvatar:function positionAvatar(pos,context){if(!this.avatar){return ;}pos.x=context.src.data.left+10;this._super(pos,context);},isDragValid:function isDragValid(context){return isOnItem(context)||this._super(context)||false;},ondragstart:function ondragstart(context){if(isOnItem(context)){var dragData=context.src.data,node=dragData.node;dragData.y0=$DOM.position(this.domNode).y;dragData.h=$DOM.position(node).h;dragData.left=$DOM.position(node).x;dragData.th=this.scrollNode.offsetHeight;dragData.sh=this.scrollNode.scrollHeight;this.items.splice(dragData.index,1);this.itemsContainerNode.removeChild(node);}this._super(context);},ondragmove:function ondragmove(context){if(isOnItem(context)){var dragData=context.src.data,y=context.last.y,lastIdx=dragData.tgtIdx,lastEdge=dragData.tgtEdge,totalHeight=dragData.th,scrollHeight=dragData.sh,outofTop=(y-dragData.y0)<0,outofBottom=(y-dragData.y0)>totalHeight,target,curIdx,curEdge,me=this;if(outofTop||outofBottom){if(lastIdx||lastEdge){if(lastIdx!==undefined){$CSS.removeClass(this.itemsContainerNode.children[lastIdx],lastEdge);}delete dragData.tgtIdx;delete dragData.tgtEdge;}if(outofBottom){if(this.scrollNode.scrollTop<scrollHeight&&!this.tmr){this.tmr=window.setInterval(function(){if(me.scrollNode.scrollTop+5>scrollHeight){me.scrollNode.scrollTop=scrollHeight;clearTimer.apply(this);}else{me.scrollNode.scrollTop+=5;}},200);}else{if(this.scrollNode.scrollTop>=scrollHeight){clearTimer.apply(this);}}}if(outofTop){if(this.scrollNode.scrollTop>0&&!this.tmr){this.tmr=window.setInterval(function(){if(me.scrollNode.scrollTop-5<0){me.scrollNode.scrollTop=0;clearTimer.apply(this);}else{me.scrollNode.scrollTop-=5;}},200);}else{if(this.scrollNode.scrollTop<=0){clearTimer.apply(this);}}}}else{clearTimer.apply(this);target=getTargetEdge.call(this,y+this.scrollNode.scrollTop,dragData);curIdx=target.idx;curEdge=target.edge;if(lastIdx!==curIdx||lastEdge!==curEdge){if(lastIdx!==undefined){$CSS.removeClass(this.itemsContainerNode.children[lastIdx],lastEdge);}$CSS.addClass(this.itemsContainerNode.children[curIdx],curEdge);dragData.tgtIdx=curIdx;dragData.tgtEdge=curEdge;}}}return this._super(context);},ondragend:function ondragend(context){if(isOnItem(context)){var dragData=context.src.data,node=dragData.node,i=dragData.tgtIdx;clearTimer.apply(this);if(i!==undefined){$CSS.removeClass(this.itemsContainerNode.children[i],dragData.tgtEdge);}if(dragData.tgtEdge===ENUM_EDGE_BOTTOM){i++;}if(i===undefined){i=dragData.index;}this.items.splice(i,0,dragData.item);if(i===dragData.index){node.setAttribute("idx",i);this.itemsContainerNode.insertBefore(node,(i<(this.items.length-2))?this.itemsContainerNode.children[i]:null);}else{this.refresh();this.parent.enableOkBtn();}}return this._super(context);},showTooltip:function showTooltip(evt,win){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),item=this.getItemFromTarget(target),itemNode=null,position=null,nameNode=null,listNode=null;if(item&&item.n){itemNode=this.getItemNodeFromTarget(target);position=$DOM.position(target);nameNode=itemNode.getElementsByClassName("name")[0];listNode=itemNode.getElementsByClassName("mstrmojo-group-list")[0];if((nameNode===target&&nameNode.scrollWidth>nameNode.clientWidth)||(listNode===target&&listNode.scrollWidth>listNode.clientWidth)){this.richTooltip={areaId:item._renderIdx,cssClass:"vi-regular vi-tooltip-V",posType:mstrmojo.tooltip.POS_BOTTOMLEFT,content:$STR.encodeHtmlString(target.textContent),top:position.y,left:nameNode===target?position.x+130:position.x+70};}else{this.richTooltip=null;}if(this.richTooltip){this._super(evt,win);}}}});}());