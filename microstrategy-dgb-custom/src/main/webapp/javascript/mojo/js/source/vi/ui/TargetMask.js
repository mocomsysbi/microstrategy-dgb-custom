(function(){mstrmojo.requiresCls("mstrmojo.css","mstrmojo.desc","mstrmojo.Widget");var $CSS=mstrmojo.css,$DOM=mstrmojo.dom;mstrmojo.vi.ui.TargetMask=mstrmojo.declare(mstrmojo.Widget,[],{scriptClass:"mstrmojo.vi.ui.TargetMask",markupString:'<div class="mstrmojo-hasTgt" mstrAttach:contextmenu><div class="tgt"><div></div>'+mstrmojo.desc(4787,"Target")+'</div><div class="src"><div></div>'+mstrmojo.desc(4283,"Source")+"</div></div>",useRichTooltip:true,isDynamicTooltip:true,tooltipContent:mstrmojo.desc(15275,"This container cannot be selected as target"),allowFilters:false,init:function init(props){if(this._super){this._super(props);}},setMaskClass:function(srcId){var parent=this.parent,isViz=parent instanceof mstrmojo.vi.ui.rw.VizBox,isFilter=parent instanceof mstrmojo.vi.ui.rw.FilterBox;if(this.domNode){if(parent.id===srcId){$CSS.addClass(this.domNode,"sourced");}else{if(!isViz&&!(isFilter&&this.allowFilters)){$CSS.addClass(this.domNode,"disabled");}else{$CSS.addClass(parent.domNode,"targeted");}}this.domNode.style.display="block";return true;}return false;},clearMaskClass:function(){var parent=this.parent;$CSS.removeClass(this.domNode,"sourced");$CSS.removeClass(this.domNode,"disabled");$CSS.removeClass(parent.domNode,"targeted");this.domNode.style.display="none";},moveTooltip:function moveTooltip(evt,win){this.richTooltip={posType:mstrmojo.tooltip.POS_TOPLEFT,cssClass:"vi-regular vi-tooltip-A tgt-tt",content:this.tooltipContent,top:evt.clientY+15,left:evt.clientX-15};this._super(evt,win);},oncontextmenu:function(e,hWin){$DOM.preventDefault(hWin,e);}});}());