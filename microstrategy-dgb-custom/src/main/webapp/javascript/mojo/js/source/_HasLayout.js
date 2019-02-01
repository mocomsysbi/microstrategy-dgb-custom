mstrmojo.DPIManager={classes:[],registerClass:function registerClass(clz,dimension,slot,dpiValues){this.classes.push({c:clz,d:dimension,s:slot,v:dpiValues});},setDPI:function(){var dpi=mstrMobileApp.getDeviceDPI();mstrmojo.array.forEach(this.classes,function(clz){clz.c.prototype.layoutConfig[clz.d][clz.s]=clz.v[dpi]+"px";});this.classes=[];}};(function(){document.msCSSOMElementFloatMetrics=true;mstrmojo.requiresCls("mstrmojo.hash");var $HASH=mstrmojo.hash,defaultSlot="containerNode",auto="auto",px="px";var autoBlock={v:auto,c:undefined,sv:auto};function calcChildDimension(child,dimension,onlyPercentageSlots){var dim=this._layoutWidgets[dimension],slot=child.slot||defaultSlot,fixedSlots=dim.f,percentageSlots=dim.p,isFixed=(fixedSlots&&fixedSlots[slot]!==undefined),isPercent=(percentageSlots&&percentageSlots[slot]!==undefined);if(slot&&((!onlyPercentageSlots&&isFixed)||isPercent)){return isFixed?fixedSlots[slot]:(dim.x*parseInt(percentageSlots[slot],10)/100)+px;}return child[(dimension==="h")?"height":"width"];}function applyChildDimensions(child,h,w){if(child.ignoreLayout){return ;}var hAuto=(h===auto)||h==="NaNpx",wAuto=(w===auto)||w==="NaNpx";var offsets=child.getLayoutOffsets&&child.getLayoutOffsets();if(offsets){if(!hAuto){h=(parseInt(h,10)-offsets.h)+px;}if(!wAuto){w=(parseInt(w,10)-offsets.w)+px;}}if(child.setDimensions){child.setDimensions(h,w);}else{if(child.set){if(!hAuto){child.set("height",h);}if(!wAuto){child.set("width",w);}}}}function applyDimensionsFromChildren(onlyPercentageSlots){var ch=this.children,i,len;for(i=0,len=(ch&&ch.length)||0;i<len;i++){var child=ch[i],slot=child.slot||defaultSlot;if(slot){var h=calcChildDimension.call(this,child,"h",onlyPercentageSlots),w=calcChildDimension.call(this,child,"w",onlyPercentageSlots);this.setSlotDimensions(slot,h,w);applyChildDimensions(child,h,w);var zh=calcChildDimension.call(this,child,"h",onlyPercentageSlots),zw=calcChildDimension.call(this,child,"w",onlyPercentageSlots);if(zh!==h||zw!==w){applyChildDimensions(child,zh,zw);}this.setSlotDimensions(slot,zh,zw);}}this.afterLayout();}function applyDimensionsFromSlots(){var children=this.children,layoutWidgets=this._layoutWidgets;$HASH.forEach(this.slotNames,function(isRendered,slot){if(!isRendered||this.skipsSlotLayout(slot)){return ;}var h=(layoutWidgets.h&&layoutWidgets.h.getSlotSizeInfo(slot,children))||autoBlock,w=(layoutWidgets.w&&layoutWidgets.w.getSlotSizeInfo(slot,children))||autoBlock,slotChildren=h.c||w.c;mstrmojo.array.forEach(slotChildren,function(slotChild){applyChildDimensions(slotChild,h.v,w.v);});this.setSlotDimensions(slot,h.sv,w.sv);},this);this.afterLayout();}function applyDimensions(onlyPercentageSlots){var fn=this.layoutConfig.xt?applyDimensionsFromSlots:applyDimensionsFromChildren;fn.call(this,onlyPercentageSlots);}function adjustDimension(child,lw,d){var slot=child.slot||defaultSlot,autoSlots=lw&&lw.a;if(!autoSlots||autoSlots[slot]===undefined){return ;}var x=this[slot]["offset"+d],size=autoSlots[slot];if(x===size){return ;}lw.x-=(x-size);autoSlots[slot]=x;}function adjustLayout(evt){this.beforeLayout();var lw=this._layoutWidgets,child=evt.src;adjustDimension.call(this,child,lw.h,"Height");adjustDimension.call(this,child,lw.w,"Width");applyDimensions.call(this,true);}function calculateDimension(dimensionConfig,dimension){if(!dimensionConfig){return null;}var ch=this.children,lcDimension=dimension.toLowerCase(),widgetDimensionValue=parseInt(this[lcDimension],10),widgetRawValue=widgetDimensionValue,fixedSlots={},percentageSlots={},autoSlots={},autoSlotValues={},allSlots={},i,len,child,v,slot;for(slot in dimensionConfig){if(!dimensionConfig.hasOwnProperty(slot)){continue;}v=dimensionConfig[slot];if(v.match(/px$/)){widgetDimensionValue-=parseInt(v,10);fixedSlots[slot]=v;}else{if(v.match(/%$/)){percentageSlots[slot]=v;}else{if(v.match(/all/)){allSlots[slot]=widgetRawValue;}else{autoSlots[slot]=v;}}}}if(!$HASH.isEmpty(autoSlots)&&!$HASH.isEmpty(percentageSlots)){for(i=0,len=(ch&&ch.length)||0;i<len;i++){child=ch[i];slot=child.slot||defaultSlot;if(slot&&autoSlots[slot]&&!child.ignoreLayout){if(child.hasRendered){var elem=this[slot];autoSlotValues[slot]=elem.getBoundingClientRect?Math.round(elem.getBoundingClientRect()[dimension.toLowerCase()]):elem["offset"+dimension];widgetDimensionValue-=autoSlotValues[slot];}else{autoSlotValues[slot]=0;child.attachEventListener((child instanceof mstrmojo.Container)?"childrenRendered":"renderComplete",this.id,adjustLayout);}}}}return{f:$HASH.isEmpty(fixedSlots)?undefined:fixedSlots,p:$HASH.isEmpty(percentageSlots)?undefined:percentageSlots,a:$HASH.isEmpty(autoSlotValues)?undefined:autoSlotValues,n:$HASH.isEmpty(allSlots)?undefined:allSlots,x:widgetDimensionValue,getSlotSizeInfo:function(slot,children){if(!dimensionConfig[slot]){return autoBlock;}var slotChildren=mstrmojo.array.filter(children,function(child){var childSlot=child.slot;return childSlot===slot||(slot===defaultSlot&&!childSlot);}),slotValue,value;var fixedValue=fixedSlots[slot];if(fixedValue){value=fixedValue;}var percentValue=percentageSlots[slot];if(percentValue){value=(this.x*parseInt(percentValue,10)/100)+px;}if(autoSlots[slot]){value=autoSlotValues[slot];if(value){value+=px;}else{value=auto;}slotValue=auto;}var allSlotValue=allSlots[slot];if(allSlotValue){value=slotValue=allSlotValue+px;}value=value||"0px";return{v:value,c:slotChildren,sv:slotValue||value};}};}function handleDimensionChange(dimension){var dn=this.domNode;if(!dn||!this.layoutConfig){return ;}dn.style[dimension]=this[dimension];this.doLayout();}mstrmojo._HasLayout=mstrmojo.provide("mstrmojo._HasLayout",{_mixinName:"mstrmojo._HasLayout",height:"auto",width:"auto",ignoreLayout:false,beforeLayout:mstrmojo.emptyFn,afterLayout:mstrmojo.emptyFn,forceLayout:false,layoutConfig:null,init:function init(props){this._super(props);this.layoutConfig=$HASH.clone(this.layoutConfig);},preBuildRendering:function preBuildRendering(){var cssText=this.cssText||"";var height=this.height;if(height&&height!==auto){cssText+="height:"+this.height+";";}var width=this.width;if(width&&width!==auto){cssText+="width:"+this.width+";";}this.cssText=cssText;return(this._super)?this._super():true;},postBuildRendering:function postBuildRendering(){this.doLayout();return this._super();},modifyLayoutConfig:function modifyLayoutConfig(hConfig,vConfig){var cfg=this.layoutConfig=this.layoutConfig||{};cfg.h=$HASH.copy(hConfig,cfg.h);cfg.w=$HASH.copy(vConfig,cfg.w);this.doLayout();},getLayoutOffsets:mstrmojo.emptyFn,set:function set(n,v){var ret=this._super(n,v);if(n==="visible"&&this._pendingLayoutOnVisible){delete this._pendingLayoutOnVisible;this.doLayout();}return ret;},doLayout:function doLayout(){var lc=this.layoutConfig;if(!lc||(this.height===auto&&this.width===auto)){return ;}if(lc.xt){if(!this.visible){this._pendingLayoutOnVisible=true;return ;}}this.beforeLayout();this._layoutWidgets={h:calculateDimension.call(this,lc.h,"Height"),w:calculateDimension.call(this,lc.w,"Width")};applyDimensions.call(this,false);this.widgetResized();},browserResized:function browserResized(size){this.setDimensions(size.h,size.w);return true;},onwidthChange:function onwidthChange(){handleDimensionChange.call(this,"width");},onheightChange:function onheightChange(){handleDimensionChange.call(this,"height");},skipsSlotLayout:function(slotName){return false;},adjustParentDimensions:function adjustParentDimensions(){var p=this.parent,lw=p&&p._layoutWidgets;if(lw){adjustDimension.call(p,this,lw.h,"Height");adjustDimension.call(p,this,lw.w,"Width");}},setDimensions:function setDimensions(h,w){var hAuto=(h===auto)||h==="NaNpx",wAuto=(w===auto)||w==="NaNpx";if((!hAuto&&parseInt(this.height,10)!==parseInt(h,10))||(!wAuto&&parseInt(this.width,10)!==parseInt(w,10))||this.forceLayout){if(!hAuto){this.height=h;}if(!wAuto){this.width=w;}var dn=this.domNode,dnStyle=dn&&dn.style;if(dnStyle){if(!hAuto){dnStyle.height=h;}if(!wAuto){dnStyle.width=w;}this.doLayout();}return true;}return false;},setSlotDimensions:function setSlotDimensions(slot,h,w){var sl=this[slot]&&this[slot].style;if(!sl){return ;}if(h!==auto&&h!==undefined&&h!=="NaNpx"&&sl.height!==h&&parseInt(h)>=0){sl.height=h;}if(w!==auto&&w!==undefined&&w!=="NaNpx"&&sl.width!==w&&parseInt(w)>=0){sl.width=w;}}});mstrmojo._HasLayout.getSlotSize=function getSlotSize(constructor,slot){var layoutCfg=constructor&&constructor.prototype.layoutConfig;if(layoutCfg){var h=layoutCfg.h,w=layoutCfg.w;return{h:(h&&h[slot])||undefined,w:(w&&w[slot])||undefined};}return null;};}());