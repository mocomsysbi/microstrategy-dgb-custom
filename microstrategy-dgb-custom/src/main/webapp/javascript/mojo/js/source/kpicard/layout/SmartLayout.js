(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._HasLayout","mstrmojo.array","mstrmojo.hash","mstrmojo.kpicard.layout._LayoutCommon","mstrmojo.kpicard.KPICardEnum");var $ARRAY=mstrmojo.array,$HASH=mstrmojo.hash,$NEW_CARD_STYLE_MARGIN=mstrmojo.kpicard.NEW_STYLE_MARGIN;function getSizeValue(){return 1;}function copyRect(a){var b={};b.x=a.x;b.y=a.y;b.w=a.w;b.h=a.h;return b;}function getRectangleGap(e){var level=0,l=1,ret;switch(l){case 1:ret={v:$NEW_CARD_STYLE_MARGIN,h:$NEW_CARD_STYLE_MARGIN};break;case 2:switch(level){case 0:ret={v:1,h:3};break;default:ret={v:1,h:1};}break;case 3:switch(level){case 0:ret={v:1,h:6};break;case 1:ret={v:1,h:3};break;default:ret={v:1,h:1};}break;default:switch(level){case 0:ret={v:1,h:8};break;case 1:ret={v:1,h:4};break;case 2:ret={v:1,h:2};break;default:ret={v:1,h:1};}}return ret;}function rectIsValid(a){return a.w>0&&a.h>0;}function getValidRect(a){var ret=copyRect(a);if(!rectIsValid(a)){ret.w=0;ret.h=0;}return ret;}function swapRect(a){var temp=a.x;a.x=a.y;a.y=temp;temp=a.w;a.w=a.h;a.h=temp;return a;}function rectIntersection(a,b){var x=Math.max(a.x,b.x);var y=Math.max(a.y,b.y);var w=Math.min(a.x+a.w,b.x+b.w)-x;var h=Math.min(a.y+a.h,b.y+b.h)-y;if(w<0||h<0){return{x:NaN,y:NaN,w:NaN,h:NaN};}return{x:x,y:y,w:w,h:h};}function setSizeRect(e,size){var validSize=getValidRect(size);e.size=validSize;delete e.headerSize;delete e.contentSize;}function layoutRow(r,c,n,sum,swapped){var width,height,ch=r.r||[],l=ch.length,w,h,tmpc,localSwapped=false;if(l===0){return ;}if(n<c.h){w=n;h=c.h;tmpc=c;}else{w=c.h;h=n;tmpc=copyRect(c);swapRect(tmpc);localSwapped=true;}var x=tmpc.x,y=tmpc.y,bound={x:x,y:y,w:w,h:h};var gap=getRectangleGap.call(this,ch[0]),i,hm=this;var localGap={v:gap.v,h:gap.h};if((swapped===true&&localSwapped!==true)||(swapped===false&&localSwapped===true)){localGap={v:gap.h,h:gap.v};}var sortEntity=function sortEntity(s,t){var vs=getSizeValue(s,hm),vt=getSizeValue(t,hm),ret;if(isNaN(vs)){if(isNaN(vt)){ret=0;}else{ret=1;}}else{if(isNaN(vt)){ret=-1;}else{ret=vs<vt?1:-1;}}return ret;};var getHeight=function(e,hm,i){if(allOne){return 1;}var value=getSizeValue(e,hm),tmp=h*value/sum;var height=(sum<=0||e.deleted)?0:Math.ceil(tmp);if(height>0){carry+=height-tmp;}if(value<sum){if(i===0&&l>1){if(lv>1){if(height>(lv>>1)){height-=(lv>>1);}}else{if(height>1){height--;}}if(height+(l-1)*(lv+1)>=h){height=h-(l-1)*(lv+1);allOne=true;}}else{if(i<l-1){if(lv>1){if(height>(lv>>1)){height-=lv;}else{height=1;}}else{if(height>1){height--;}}if(carry>1&&height>1){height--;carry-=1;}}else{height=Math.max(h+tmpc.y-y,1);}}}return height;};var ll=0,e,j,lv=localGap.v,lll=Math.max(1,Math.floor((h+lv)/(1+lv)));if(l>lll){for(i=0;i<l;i++){e=ch[i];if(e.deleted){continue;}ll++;}}for(j=l-1,i=ll-lll;i>0;j--){e=ch[j];if(!e.deleted){sum-=getSizeValue(e,this);i--;}}var carry=0,allOne=false;for(j=0,i=0,ll=ch.length,l=Math.min(l,lll);i<ll;j++){var rect,minDim;e=ch[j];if(e.deleted){continue;}if(i>=l){height=0;}else{height=getHeight(e,this,i);}i++;width=w;var nc={x:x,y:y,w:width,h:height};rect=rectIntersection(nc,bound);if((swapped===true&&localSwapped!==true)||(swapped===false&&localSwapped===true)){swapRect(rect);}setSizeRect.call(this,e,rect);y+=height+lv;}}function setLayoutOrder(r,c,singleKPIModels){var sum=0,arr=r.r,l=arr.length;if(l===0){return ;}var ra,p=arr[0].kpiModels,ch=p,ll=ch.length;var i,e,v;for(i=0;i<l;i++){e=arr[i];v=getSizeValue(e,this);if(!e.deleted&&v>0){sum+=v;}}if(r.t===undefined){var t=0;for(i=0;i<ll;i++){e=ch[i];v=getSizeValue(e,this);if(!e.deleted&&v>0){t+=v;}}r.t=t;}e=arr[0];var gap=getRectangleGap.call(this,e),bound={x:0,y:0,w:0,h:0};if(e===singleKPIModels){ra=this.area.w*this.scaleFactor*this.area.h*this.scaleFactor;bound.w=this.area.w*this.scaleFactor;bound.h=this.area.h*this.scaleFactor;}else{if(p===singleKPIModels){ra=this.area.w*this.scaleFactor*this.area.h*this.scaleFactor;bound.w=this.area.w*this.scaleFactor;bound.h=this.area.h*this.scaleFactor;}else{var pSize=p.size;ra=pSize.w*pSize.h;bound=copyRect(pSize);}if(r.t===0){ra=0;}else{ra*=sum/r.t;}}var aw=c.w,ah=c.h,swapped=false;if(c.h>=c.w){swapped=true;swapRect(c);swapRect(bound);var temp=aw;aw=ah;ah=temp;gap={h:gap.v,v:gap.h};}if((bound.x<c.x)||(bound.x+bound.w>c.x+c.w)){if(gap.h>1){aw+=(gap.h>>1);}}if((bound.y<c.y)||(bound.y+bound.h>c.y+c.h)){if(gap.v>1){ah+=(gap.v>>1);}}var width=ah===0?0:Math.min(c.w,Math.ceil(ra/ah));if(sum<r.t&&sum>0){if(c.x+width<bound.x+bound.w){if(gap.h>1){if(width>gap.h>>1){width-=(gap.h>>1);}}else{if(width>1){width--;}}}}layoutRow.call(this,r,c,width,sum,swapped);var newX=c.x+width,newWidth=c.w-width;if(sum<r.t&&sum>0){if(c.x+width<bound.x+bound.w){if(gap.h>1){if(newWidth>gap.h){newX+=gap.h;newWidth-=gap.h;}}else{if(newWidth>1){newX++;newWidth--;}}}}c.x=newX;c.w=Math.max(0,newWidth);if(swapped){swapRect(c);}}function worstAspect(r,m,a){var worst,arr=r.r,l=arr.length;if(l>0&&a>0){var e=arr[0];var pval=0,_this=this,singleKPIModels=_this.singleKPIModels;if(r.t===undefined){$ARRAY.forEach(singleKPIModels,function(e){if(!e.deleted){pval+=getSizeValue(e,_this);}});r.t=pval;}else{pval=r.t;}if(isNaN(pval)||pval<=0){return -1;}var min,max,sum=0,val,inited=false,i;for(i=0;i<l;i++){e=arr[i];if(!e.deleted){val=getSizeValue(e,this);if(!isNaN(val)){if(inited===false){max=min=val;inited=true;}else{max=Math.max(val,max);min=Math.min(val,min);}sum+=val;}}}var suba=a*sum/pval,otherMin=suba/m,newMin=(m<otherMin)?m:otherMin;max=a*max/pval;min=a*min/pval;var e1=max/(newMin*newMin);var e2=min/(newMin*newMin);e1=(e1>1)?e1:(1/e1);e2=(e2>1)?e2:(1/e2);worst=Math.max(e1,e2);}else{worst=-1;}return worst;}function squarify(t,r,m,c,a){var params=[[this,t,r,m,c,a]],singleKPIModels=this.singleKPIModels;while(params.length){var param=params.pop();var _this=param.shift();t=param.shift();r=param.shift();m=param.shift();c=param.shift();a=param.shift();if(t.length===0){setLayoutOrder.call(_this,r,c,singleKPIModels);}else{var area=c.w*c.h;var cwa;if(a!==undefined){cwa=a;}else{cwa=worstAspect.call(_this,r,m,area);}var data=t[0],arr=r.r;arr.push(data);var fwa=worstAspect.call(_this,r,m,area);if(cwa>=fwa||cwa===-1){t.shift();params.push([_this,t,r,m,c,fwa]);}else{r.r.pop();setLayoutOrder.call(_this,r,c,singleKPIModels);m=Math.min(c.w,c.h);params.push([_this,t,{r:[],t:r.t},m,c]);}}}}mstrmojo.kpicard.layout.SmartLayout=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout,mstrmojo.kpicard.layout._LayoutCommon],{scriptClass:"mstrmojo.kpicard.layout.SmartLayout",cssClass:"smart-layout-kpi-container",layoutConfig:{w:{containerNode:"100%"},xt:true},markupString:'<div class="{@cssClass}" style="{@cssText}" ></div>',markupSlots:{containerNode:function(){return this.domNode;}},postBuildRendering:function postBuildRendering(){this._super();this.calculateLayout();this.createSingleKPIs();},updateSingleKPIProps:function updateSingleKPIProps(props){var size=props.dataModel.size;props.width=size.w+"px";props.height=size.h+"px";props.left=size.x+"px";props.top=size.y+"px";},calculateLayout:function calculateLayout(){var width=parseFloat(this.width),height=parseFloat(this.height),area={x:0,y:0,w:width,h:height},min=Math.min(area.w,area.h);this.area=area;this.scaleFactor=1;squarify.call(this,this.singleKPIModels.slice(0),{r:[]},min,copyRect(this.area));}});}());