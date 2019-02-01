(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.css","mstrmojo.dom","mstrmojo.boxmodel","mstrmojo.Widget");var $HASH=mstrmojo.hash,$CSS=mstrmojo.css,$DOM=mstrmojo.dom,CSS_ANIMATE="animate",PX="px";function getBoxCfg(scriptClass){return $HASH.copy(((!!mstrApp.isWSStyling)?$HASH.walk(scriptClass,window).boxConfigurationWS:undefined)||$HASH.walk(scriptClass,window).boxConfiguration||mstrmojo.vi.ui._IsBoxLayoutChild.boxConfiguration);}function verifyBoxPosition(context){var boxCache=context.boxCache,boxPosition=boxCache&&boxCache[this.id],boxAnimating=false;if(!boxPosition){boxAnimating=this.domNode.className.indexOf(CSS_ANIMATE)>-1;this.cacheCtxtBoxPosition(context);}context.boxAnimating=boxAnimating;}mstrmojo.vi.ui._IsBoxLayoutChild=mstrmojo.provide("mstrmojo.vi.ui._IsBoxLayoutChild",{_mixinName:"mstrmojo.vi.ui._IsBoxLayoutChild",markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod,ontopChange:mstrmojo.Widget.topMarkupMethod,onleftChange:mstrmojo.Widget.leftMarkupMethod,onzIndexChange:function(){this.domNode.style.zIndex=this.zIndex||1;}},id:null,left:"0px",top:"0px",zIndex:1,draggable:false,dropZone:false,getBoxConfiguration:function getBoxConfiguration(){return getBoxCfg(this.scriptClass);},getBoxBorderWidth:function getBoxBorderWidth(){return 0;},getMinBoxSize:function getMinBoxSize(orientation){return mstrmojo.vi.ui._IsBoxLayoutChild.getBoxMinimums(this.scriptClass)[orientation];},getIdentifier:function getIdentifier(){return this.id;},updateLayout:function updateLayout(layout,animate){if($HASH.equals(layout,this._currentLayout)){return ;}var domNode=this.domNode,modernizr=window.Modernizr,totalEdgeBorderWidth=this.getBoxBorderWidth();if(domNode&&animate&&modernizr.testProp("transition")){$CSS.addClass(domNode,CSS_ANIMATE);$CSS.onTransitionEnd(domNode,function(){$CSS.removeClass(domNode,CSS_ANIMATE);});}this._currentLayout=layout;this.applyBoxSize(Math.max((parseInt(layout.height,10)-totalEdgeBorderWidth),0)+PX,Math.max((parseInt(layout.width,10)-totalEdgeBorderWidth),0)+PX,layout.top,layout.left);if(this.hasRendered&&this.doLayout){this.doLayout();}this.postUpdateLayout();},postUpdateLayout:function postUpdateLayout(){},applyBoxSize:function applyBoxSize(height,width,top,left){this.height=height;this.width=width;this.top=top;this.left=left;var domNode=this.domNode;if(domNode){var domNodeStyle=this.domNode.style;domNodeStyle.top=top;domNodeStyle.left=left;domNodeStyle.height=height;domNodeStyle.width=width;if(parseInt(height,10)<=0||parseInt(width,10)<=0){domNodeStyle.borderWidth="0";}}},createAvatar:function createAvatar(){return this.offsetAvatar(this.domNode);},offsetAvatar:function offsetAvatar(node){node.style.margin="20px 0 0 20px";return node;},setMaskVisibility:function setMaskVisibility(isVisible){var maskStyle=this.maskNode.style;maskStyle.display=isVisible?"block":"none";if(!isVisible){this.resetMask();}},isDragValid:function isDragValid(context){return true;},initializeDrag:function initializeDrag(context){},ondragstart:function ondragstart(context){this.initializeDrag(context);delete this._currentLayout;this.parent.beginBoxMove(context,this);this._super(context);},ondragend:function ondragend(context){this._super(context);this.parent.endBoxMove(context,this);if(!context.dropSuccessful){this.parent.cancelBoxMove(context);}var domNode=this.domNode;domNode.style.margin="0";},allowDrop:function allowDrop(context){var dragSrc=context.src,widget=dragSrc&&dragSrc.widget;return(widget&&widget.parent===this.parent);},wasDropped:function wasDropped(context){},cancelBoxMove:function cancelBoxMove(context){return false;},ondragenter:function ondragenter(context){this.setMaskVisibility(true);},ondragover:function ondragover(context){verifyBoxPosition.call(this,context);this.highlightMask(this.parent.getPanelTargetEdge(context)||this.getTargetDropZone(context),context);if(context.boxAnimating){delete context.boxCache[this.id];}},cacheCtxtBoxPosition:function cacheCtxtBoxPosition(context){var boxCache=context.boxCache=context.boxCache||{};boxCache[this.id]=$DOM.position(this.domNode);},ondrop:function ondrop(context){verifyBoxPosition.call(this,context);var srcWidget=context.src.widget;if(srcWidget.wasDropped){srcWidget.wasDropped(context);}var parent=this.parent;if(srcWidget.parent===parent){parent.dropBox(context,this,this.maskNode.zone,true);}this.setMaskVisibility(false);},ondragleave:function ondragleave(){this.setMaskVisibility(false);},highlightMask:function highlightMask(dropZone,context){var mask=this.maskNode,isBoxAnimating=context.boxAnimating;if(dropZone!==mask.zone||isBoxAnimating||mask.isAnimating!==isBoxAnimating){mask.zone=dropZone;mask.isAnimating=isBoxAnimating;this.parent.updateDropCue(dropZone,context,context.boxCache[this.id]);}},getTargetDropZone:function getTargetDropZone(context){return mstrmojo.boxmodel.getEdgeQuadrantByPoint(context.boxCache[this.id],context.tgt.pos);},resetMask:function resetMask(){this.parent.updateDropCue("");var mask=this.maskNode;delete mask.zone;delete mask.isAnimating;},getBoxDimension:mstrmojo.emptyFn,postDropBox:mstrmojo.emptyFn});mstrmojo.vi.ui._IsBoxLayoutChild.boxConfiguration={addToEnd:true};mstrmojo.vi.ui._IsBoxLayoutChild.getBoxMinimums=function(scriptClass){var boxCfg=getBoxCfg(scriptClass);return $HASH.copy(boxCfg.minSize||boxCfg.f||{h:75,v:75});};mstrmojo.vi.ui._IsBoxLayoutChild.BoxConfigurationType=null;}());