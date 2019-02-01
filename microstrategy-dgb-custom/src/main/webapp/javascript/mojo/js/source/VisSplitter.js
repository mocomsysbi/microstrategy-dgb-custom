(function(){mstrmojo.requiresCls("mstrmojo.css","mstrmojo.dom","mstrmojo.Widget","mstrmojo.VisEnum","mstrmojo.VisUtility","mstrmojo._HasOwnAvatar");var $MOJO=mstrmojo,$DOM=$MOJO.dom,$CSS=$MOJO.css,$UTL=$MOJO.VisUtility,ENUM_DOCK_POS=$MOJO.gm.EnumDockPosition,CTRL_TYPE=$MOJO.VisEnum.ControlType,PADDING=3;mstrmojo.VisSplitter=mstrmojo.declare(mstrmojo.Widget,[mstrmojo._HasOwnAvatar],{scriptClass:"mstrmojo.VisSplitter",cssClass:"gm-matrix-line",bodyCssClass:"gm-matrix-line-body",ctnType:CTRL_TYPE.LINE_CONTAINER,dir:"h",draggable:true,markControlType:false,markupString:'<div id="{@id}" class="{@cssClass}" type={@ctnType} style="width:{@bodyWidth}px; height:{@bodyWidth}px;"><div class="{@bodyCssClass}" type={@type} style="width:{@width}px; height:{@height}px;"></div></div>',markupSlots:{domBody:function(){return this.domNode.firstChild;}},init:function(props){this._super(props);},preBuildRendering:function(){var dir=this.dir,styles=this.styles,draggable=this.draggable,cssClass=this.cssClass,bodyCssClass=this.bodyCssClass;cssClass+=" "+dir;cssClass+=(draggable?" draggable":"");this.cssClass=cssClass;bodyCssClass+=" "+dir;bodyCssClass+=(draggable?" draggable":"");this.bodyCssClass=bodyCssClass;this.bodyWidth=parseInt(styles.borderWidth,10)||1;},postBuildRendering:function(){this.domNode.identity=this.identity;this.domBody.identity=this.identity;$UTL.applyStyles2DomNode(this.domBody,this.styles);if(this.markControlType){this.domNode.setAttribute("ctrlType",this.context.type);this.domBody.setAttribute("ctrlType",this.context.type);}},hide:function(){this.domNode.style.display="none";},updateSize:function(obj){this.sizeInfo=obj;},updateStyle:function(style){var domStyle=this.domNode.style,borderWidth=parseInt(style.borderWidth,10)||1;this.styles=style;domStyle.width=borderWidth+"px";domStyle.height=borderWidth+"px";$UTL.applyStyles2DomNode(this.domBody,style);},updatePosition:function(pos){var left=pos.left,top=pos.top,width=pos.width,height=pos.height,dir=this.dir,domStyle=this.domNode.style,domBodyStyle=this.domBody.style;if(left!==undefined){if(dir==="v"){left-=PADDING;}domStyle.left=left+"px";}if(top!==undefined){if(dir==="h"){top-=PADDING;}domStyle.top=top+"px";}if(width!==undefined){domStyle.width=width+"px";domBodyStyle.width=width+"px";}if(height!==undefined){domStyle.height=height+"px";domBodyStyle.height=height+"px";}domStyle.display="block";},createAvatar:function(){var bodyNode=this.domBody,pos=$DOM.position(bodyNode),newNode=bodyNode.cloneNode(true),newStyle=newNode.style,borderColor=$CSS.getStyleValue(bodyNode,"borderColor");newStyle.top=pos.y+"px";newStyle.left=pos.x+"px";newStyle.borderColor=borderColor;return newNode;},isDragValid:function isDragValid(){return true;},ondragstart:function(evt){var lower,upper,pos=evt.src.pos,dockPos=this.context.dock,si=this.sizeInfo,spaceLHS=Math.max(si.size-si.min,0),spaceRHS=Math.max(si.max-si.size,0),posProp=(this.dir==="v"?"x":"y");if(dockPos===ENUM_DOCK_POS.RIGHT||dockPos===ENUM_DOCK_POS.BOTTOM){lower=pos[posProp]-spaceLHS;upper=pos[posProp]+spaceRHS;}else{lower=pos[posProp]-spaceRHS;upper=pos[posProp]+spaceLHS;}this.lower=lower;this.upper=upper;this.startPos=evt.src.pos;this._super(evt);},ondragend:function(evt){this._super(evt);var delta,dir=this.dir,startPos=this.startPos,endPos=evt.tgt.pos,lower=this.lower,upper=this.upper,x=endPos.x,y=endPos.y;if(dir==="v"){x=Math.max(x,lower);x=Math.min(x,upper);delta=x-startPos.x;}else{y=Math.max(y,lower);y=Math.min(y,upper);delta=y-startPos.y;}if(delta!==0){this.raiseEvent({name:"splitterMoved",position:delta,info:this.context});}},positionAvatar:function(pos){var avatar=this.avatar,avs=avatar.style,dir=this.dir,lower=this.lower,upper=this.upper,x=pos.x,y=pos.y;if(dir==="v"){x=Math.max(x,lower);x=Math.min(x,upper);avs.left=x+"px";}else{y=Math.max(y,lower);y=Math.min(y,upper);avs.top=y+"px";}}});}());