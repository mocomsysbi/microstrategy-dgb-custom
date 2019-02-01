(function(){mstrmojo.requiresCls("mstrmojo.Vis","mstrmojo.url","mstrmojo._TouchGestures","mstrmojo.HBox","mstrmojo.Label","mstrmojo.Image","mstrmojo._HasTouchScroller");var $M=Math,$CSS=mstrmojo.css,$DOM=mstrmojo.dom,BORDER_WIDTH=30,MARGIN_BOTTOM=50,DOT_INTERVAL=32;function getDimension(dimension){var n="container"+dimension;if(!this[n]){var domNode=this.domNode,x=parseInt(this[dimension.toLowerCase()],10);this[n]=(isNaN(x))?domNode["client"+dimension]:x;}return this[n];}function getColGroupHTML(len){var i,cols="";if(len>0){for(i=0;i<len;i++){cols+='<col style="width:'+(100/len)+'%" />';}}return"<colgroup>"+cols+"</colgroup>";}function getImagePath(n){return mstrmojo.url.getAbsoluteURL(n,mstrApp.getConfiguration().getCurrentProjectWebServerUrl());}function transitTo(domNode,xpos){domNode.style[$DOM.CSS3_TRANSITION_DURATION]="500ms";$DOM.translate(domNode,xpos,0,0,"",true);}function resizeImage(n,w,h){if(!n){return ;}var iw=n.clientWidth,ih=n.clientHeight,rw,rh,resized=false;if(w<iw||h<ih){resized=true;rw=w/iw;rh=h/ih;if(rw<rh){n.width=w;}else{n.height=h;}}return resized;}function getHeadersByColumn(dp){var cols=[],r,c,col,rhs,hds,rc=dp.getTotalRows(),cc=rc>0?dp.getRowTitles().size():0;for(r=0;r<rc;r++){rhs=dp.getRowHeaders(r);for(c=0;c<cc;c++){if(!cols[c]){cols[c]=[];}hds=rhs.getHeader(c);cols[c].push({n:hds.getName()});}}return cols;}mstrmojo.ImageCarousel=mstrmojo.declare(mstrmojo.Vis,[mstrmojo._TouchGestures,mstrmojo._HasTouchScroller],{scriptClass:"mstrmojo.ImageCarousel",markupString:'<div class="mstrmojo-ImageCarousel {@cssClass}" style="overflow:hidden;{@cssText}"><div class="imageViewer" mstrAttach:click>{@noImageMsg}</div><div class="imageTitle"></div><div class="statusBar" style="overflow:hidden"></div></div>',markupSlots:{viewerNode:function(){return this.domNode.firstChild;},textNode:function(){return this.domNode.childNodes[1];},statusBarNode:function(){return this.domNode.lastChild;}},formatHandlers:{domNode:["RW"]},scrollerConfig:{friction:0.0087,bounces:false,vScroll:false,hScroll:true},selected:-1,children:[{scriptClass:"mstrmojo.HBox",slot:"viewerNode",alias:"viewer",onitemsChange:function(){var v,i,len,c=[],vp=this.parent.vp,bdcss;v=this.items;if(!this.hasRendered){var p=this.parent,cw=getDimension.call(p,"Width"),ch=getDimension.call(p,"Height");if(this.children){this.removeChildren();}len=v.length;this.colHTML=getColGroupHTML(len);this.cssText="width:"+(cw*len)+"px;height:"+(ch-MARGIN_BOTTOM)+"px";bdcss=(vp&&vp.bw)?("border:"+vp.bw+"px solid #"+(vp.bc||"FFF")):"";for(i=0;i<len;i++){c.push({scriptClass:"mstrmojo.Image",cssText:bdcss,cssDisplay:"inline-block",src:getImagePath(v[i].n||v[i].v),onload:function(){resizeImage(this.imgNode,cw-BORDER_WIDTH,ch-MARGIN_BOTTOM);}});}this.addChildren(c);}}},{scriptClass:"mstrmojo.Label",slot:"textNode",alias:"description"},{scriptClass:"mstrmojo.HBox",slot:"statusBarNode",alias:"sb",onitemsChange:function(){var v=this.items,c=[],i,len;if(this.children){this.removeChildren();delete this.numVisibleDots;this.lastSelected=-1;}for(i=0,len=v.length;i<len;i++){c.push({scriptClass:"mstrmojo.Label"});}this.addChildren(c);},lastSelected:0,select:function(idx){var lstPg,curPg,dn=this.domNode,dts=this.numVisibleDots;if(this.selectedNode){$CSS.removeClass(this.selectedNode.domNode,"selected");}if(this.items.length>0){this.selectedNode=this.children[idx];$CSS.addClass(this.selectedNode.domNode,"selected");if(!dts){dts=this.numVisibleDots=$M.floor(getDimension.call(this.parent,"Width")/DOT_INTERVAL);if(this.items.length<dts){$CSS.addClass(dn,"center");}else{$CSS.removeClass(dn,"center");}}lstPg=$M.floor(this.lastSelected/this.numVisibleDots);curPg=$M.floor(idx/this.numVisibleDots);if(lstPg!==curPg){transitTo(dn,-curPg*dts*DOT_INTERVAL);}this.lastSelected=idx;}}}],updateScrollerConfig:function updateScrollerConfig(){var len=this.viewer.items.length;mstrmojo.hash.copy({scrollEl:this.viewerNode,origin:{x:0,y:0},offset:{x:{start:0,end:((len>0)?(len-1):0)*getDimension.call(this,"Width")}}},this.scrollerConfig);return this._super();},touchSwipeEnd:function touchSwipeEnd(touch){var delta=touch.delta,len=this.viewer.items.length;if(delta&&delta.x>0){this.set("selected",Math.max(0,this.selected-1));}else{if(delta&&delta.x<0){this.set("selected",Math.min(this.selected+1,len));}}},onclick:function(e){var dlgCfg;if(mstrApp.getScreenDimensions&&this.selectedImage){dlgCfg={cssClass:"image-FullScreen",onclick:function(){this.close();},resizeDialog:function(){var d=mstrApp.getScreenDimensions(),dm=this.domNode,ds=dm&&dm.style;if(d&&ds){ds.width=d.w+"px";ds.height=d.h+"px";}},children:[{scriptClass:"mstrmojo.Image",src:this.selectedImage,onload:function(){var d=mstrApp.getScreenDimensions();if(d){resizeImage(this.imgNode,d.w,d.h);this.parent.positionDialog();}}}]};mstrApp.showDialog(dlgCfg);}},touchTap:function(e){this.onclick(e);},preBuildRendering:function preBuildRendering(){var dp=this.getDataParser(),headers=getHeadersByColumn(dp),imgs,desc;if(!this.vp){this.vp=this.model.vp;}imgs=headers[0]||[];desc=headers[1]||[];this.viewer.set("items",imgs);this.sb.set("items",desc);this.selected=-1;if(imgs.length>0){this.cssClass=this.cssClass?"":this.cssClass.replace(/noImage/,"");this.noImageMsg="";}else{this.cssClass+=this.cssClass?"":" noImage";this.noImageMsg="No Photo Found";}if(this.vp&&this.vp.bgc){this.cssText="background-color:#"+this.vp.bgc+";";}this._super();},postBuildRendering:function postBuildRendering(){this._super();this.set("selected",0);},onselectedChange:function onselectedChange(){var idx=this.selected,s=this.sb,img=this.viewer.items[idx],desc=s.items[idx];if(img){this._scroller.scrollTo(idx*getDimension.call(this,"Width"),0,500);this.selectedImage=getImagePath((img&&img.n)||"");s.select(idx);this.description.set("text",(desc&&desc.n)||"");}}});}());