(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.VisUtility","mstrmojo.gmaps.MapEnums","mstrmojo.gmaps.MapUtils","mstrmojo.gmaps.geometry.Text");var $MOJO=mstrmojo,$ARR=$MOJO.array,VisUtil=$MOJO.VisUtility,$GMAPS=$MOJO.gmaps,$MUTIL=$GMAPS.MapUtils,$EnumDataLabelShowOption=$GMAPS.EnumDataLabelShowOption,$ALIGN_OPT=$GMAPS.MarkerAlignOption,GEOMETRY_TEXT=$GMAPS.geometry.Text,OVERLAP_GAP=2,GRID_INTERVAL=10,LABELS_MARKER_PADDING=4,MARKER_LABELS_POSITION=["bottom","top","left","right"];function rectOutsideView(left,top,width,height,xCoordsMin,xCoordsMax,screenHeight){return left>xCoordsMax||top>screenHeight||(left+width<xCoordsMin)||(top+height<0);}function rectInsideView(left,top,width,height,xCoordsMin,xCoordsMax,screenHeight){return left>=xCoordsMin&&(left+width<=xCoordsMax)&&top>=0&&(top+height<=screenHeight);}function getCellSpan(left,top,width,height){var cellSpan={};cellSpan.rowStart=Math.floor(top/GRID_INTERVAL);cellSpan.colStart=Math.floor(left/GRID_INTERVAL);cellSpan.rowEnd=Math.floor((top+height)/GRID_INTERVAL);cellSpan.colEnd=Math.floor((left+width)/GRID_INTERVAL);return cellSpan;}function checkRectsIntersection(rect1,rect2){var temp;if(rect2.x<rect1.x){temp=rect2;rect2=rect1;rect1=temp;}var left1=rect1.x,right1=left1+rect1.w,top1=rect1.y,bottom1=top1+rect1.h,left2=rect2.x,top2=rect2.y,bottom2=top2+rect2.h;return left2<=right1&&top2<=bottom1&&bottom2>=top1;}function _evaluateLabels(labels,globalConfig){var i,label,width,mergedSize={width:0},n=(labels&&labels.length)||0,effectLabels=[];for(i=0;i<n;i++){label=labels[i];if(label){width=VisUtil.measureTextWidth(label,globalConfig&&globalConfig.dlFontStyle);if(mergedSize.width<width){mergedSize.width=width;}effectLabels.push({label:label,width:width});}}mergedSize.height=effectLabels.length*(globalConfig&&globalConfig.dlFontHeight);return{labels:effectLabels,size:mergedSize};}mstrmojo.gmaps.layer.svg._DataLabelViewerWrapper=mstrmojo.provide("mstrmojo.gmaps.layer.svg._DataLabelViewerWrapper",{_mixinName:"mstrmojo.gmaps.layer.svg._DataLabelViewerWrapper",dataLabelsHostNode:null,dataLabelsGraphics:[],updateDataLabelLayer:function updateDataLabelLayer(){var i,n,k,labelsRectConfig,positions=this.isMarkerMapType?MARKER_LABELS_POSITION:["center"],posNums=positions.length,globalConfig=this.execMethodOfParent("getLabelConfig"),dlFontStyle=globalConfig&&globalConfig.dlFontStyle,labelsConfig;if(!this.needLabel()){this.removeDataLabelLayer();return ;}this.setGlobalOption();labelsConfig=this.createLabelsConfig();this.createDataLabelLayer();try{this.updateScreenPoint(labelsConfig);}catch(e){this.removeDataLabelLayer();return ;}if(this.isMarkerMapType){this._addMarkerRectange(labelsConfig,globalConfig);}for(i=0,n=labelsConfig&&labelsConfig.length;i<n;i++){if(!labelsConfig[i].disableLabel){for(k=0;k<posNums;k++){labelsRectConfig=this._getLabelsRectConfig(labelsConfig[i],positions[k],globalConfig);if(this._canBeShown(labelsRectConfig,globalConfig)){this._drawDataLabels(labelsRectConfig.labels,dlFontStyle);break;}}}}},setGlobalOption:function setGlobalOption(){this.cellMatrix={};this.rectPool={};},createLabelsConfig:function createLabelsConfig(){if(!this.execMethodOfParent("supportDataLabel")){return ;}var i,graphic,attributes,geometry,config,geoData,dataLabelsConfig=[],graphics=this.graphics,n=(graphics&&graphics.length)||0,isMarkerMapType=this.isMarkerMapType;for(i=0;i<n;i++){graphic=graphics[i];attributes=graphic.attributes;geoData=graphic.geoData;geometry=graphic.geometry;config={rowIndex:graphic.getDataRowIdx(),mapPoint:isMarkerMapType?{lat:geoData.lat,lng:geoData.lng}:{lat:graphic.lat,lng:graphic.lng}};if(isMarkerMapType){config.graphicSize=graphic.getGraphicSize();config.alignOption=geometry.getGeometryAlignOption();}if(graphic.isClusterGraphic()){config.disableLabel=true;}else{config.text=attributes.dataLabelText;}if(attributes.values){config.values=attributes.values;}dataLabelsConfig.push(config);}return dataLabelsConfig;},_addMarkerRectange:function _addMarkerRectange(labelConfig,globalConfig){var i,config,graphicSize,screenPoint,left,top,width,height,cellSpan,xCoordsMin,xCoordsMax,screenWidth,screenHeight,row,col,index,markerRect,cellMatrix=this.cellMatrix,rectPool=this.rectPool,showAllDataLabel=globalConfig&&globalConfig.showAllDataLabel,n=(labelConfig&&labelConfig.length)||0,visMap=this.getVisMap(),baseLayer=this.execMethodOfParent("getBaseLayer");if(!visMap||!baseLayer){return ;}screenWidth=visMap.getWidth();screenHeight=visMap.getHeight();xCoordsMin=baseLayer.xCoordsMinForG||0;xCoordsMax=baseLayer.xCoordsMaxForG||screenWidth;for(i=0;i<n;i++){config=labelConfig[i];index="marker#"+config.rowIndex;graphicSize=config.graphicSize;width=graphicSize.width;height=graphicSize.height;screenPoint=config.screenPoint;left=screenPoint.x-width/2;top=screenPoint.y-height/2;switch(config.alignOption){case $ALIGN_OPT.TOP:top=screenPoint.y;break;case $ALIGN_OPT.TOP_LEFT:left=screenPoint.x;top=screenPoint.y;break;case $ALIGN_OPT.TOP_RIGHT:left=screenPoint.x-width;top=screenPoint.y;break;case $ALIGN_OPT.LEFT:left=screenPoint.x;break;case $ALIGN_OPT.RIGHT:left=screenPoint.x-width;break;case $ALIGN_OPT.BOTTOM:top=screenPoint.y-height;break;case $ALIGN_OPT.BOTTOM_LEFT:left=screenPoint.x;top=screenPoint.y-height;break;case $ALIGN_OPT.BOTTOM_RIGHT:left=screenPoint.x-width;top=screenPoint.y-height;break;}markerRect={x:left,y:top,w:width,h:height};config.markerRect=markerRect;if(showAllDataLabel||rectOutsideView(left,top,width,height,xCoordsMin,xCoordsMax,screenHeight)){continue;}rectPool[index]=markerRect;cellSpan=getCellSpan(left,top,width,height);for(row=cellSpan.rowStart;row<=cellSpan.rowEnd;row++){for(col=cellSpan.colStart;col<=cellSpan.colEnd;col++){if(!cellMatrix[row]){cellMatrix[row]={};}if(!cellMatrix[row][col]){cellMatrix[row][col]={};}cellMatrix[row][col][index]=true;}}}},_drawDataLabels:function _drawDataLabels(labels,dlFontStyle){var k,label,textObj,dataLabelsHostNode=this.dataLabelsHostNode,dataLabelsGraphics=this.dataLabelsGraphics,props=dlFontStyle||{},m=labels.length;for(k=0;k<m;k++){label=labels[k];props.text=label.label;textObj=new GEOMETRY_TEXT(props);textObj.update(label.point);dataLabelsHostNode.appendChild(textObj.node);dataLabelsGraphics.push(textObj);}},_canBeShown:function _canBeShown(labelsRectConfig,globalConfig){if(!labelsRectConfig||!globalConfig){return false;}var cellSpan,row,col,cell,rect,l,t,w,h,pl,pt,pw,ph,key,index,xCoordsMin,xCoordsMax,screenWidth,screenHeight,cellMatrix=this.cellMatrix,rectPool=this.rectPool,visMap=this.getVisMap(),baseLayer=this.execMethodOfParent("getBaseLayer");if(!visMap||!baseLayer){return ;}index=labelsRectConfig.index;rect=labelsRectConfig.rect;l=rect.x;t=rect.y;w=rect.w;h=rect.h;pl=l-OVERLAP_GAP;pt=t-OVERLAP_GAP;pw=w+OVERLAP_GAP*2;ph=h+OVERLAP_GAP*2;screenWidth=visMap.getWidth();screenHeight=visMap.getHeight();xCoordsMin=baseLayer.xCoordsMinForG||0;xCoordsMax=baseLayer.xCoordsMaxForG||screenWidth;if(!rectInsideView(pl,pt,pw,ph,xCoordsMin,xCoordsMax,screenHeight)){return false;}if(globalConfig.showAllDataLabel){return true;}cellSpan=getCellSpan(pl,pt,pw,ph);for(row=cellSpan.rowStart;row<=cellSpan.rowEnd;row++){for(col=cellSpan.colStart;col<=cellSpan.colEnd;col++){if(cellMatrix[row]&&cellMatrix[row][col]){cell=cellMatrix[row][col];for(key in cell){if(cell.hasOwnProperty(key)&&checkRectsIntersection({x:pl,y:pt,w:pw,h:ph},rectPool[key])){return false;}}}}}rectPool[index]=rect;for(row=cellSpan.rowStart;row<=cellSpan.rowEnd;row++){for(col=cellSpan.colStart;col<=cellSpan.colEnd;col++){if(!cellMatrix[row]){cellMatrix[row]={};}if(!cellMatrix[row][col]){cellMatrix[row][col]={};}cellMatrix[row][col][index]=true;}}return true;},_getLabelsRectConfig:function _getLabelsRectConfig(config,position,globalConfig){var texts;switch(globalConfig&&globalConfig.dlShowOption){case $EnumDataLabelShowOption.SHOW_TEXT:texts=[config.text];break;case $EnumDataLabelShowOption.SHOW_VALUE:texts=config.values||[];break;case $EnumDataLabelShowOption.SHOW_BOTH:texts=[config.text].concat(config.values||[]);break;}return this._addLabelRect(config,texts,position,globalConfig);},_addLabelRect:function _addLabelRect(config,texts,position,globalConfig){var i,xPoint,yPoint,left,top,markerRect,markerCenterX,markerCenterY,halfMarkerRectWidth,halfMarkerRectHeight,labelsRectConfig,fontHeight=globalConfig&&globalConfig.dlFontHeight,isMarkerMap=this.isMarkerMapType,screenPoint=config.screenPoint,labelsSizeObj=_evaluateLabels(texts,globalConfig),labelsWidth=labelsSizeObj.size.width,labelsHeight=labelsSizeObj.size.height,halfLabelsWidth=labelsWidth/2,halfLabelsHeight=labelsHeight/2,labels=labelsSizeObj.labels,n=labels.length;if(n===0){return null;}labelsRectConfig={labels:[],index:"label#"+config.rowIndex};left=screenPoint.x-halfLabelsWidth;top=screenPoint.y-halfLabelsHeight;if(isMarkerMap){markerRect=config.markerRect;halfMarkerRectWidth=markerRect.w/2;halfMarkerRectHeight=markerRect.h/2;markerCenterX=markerRect.x+halfMarkerRectWidth;markerCenterY=markerRect.y+halfMarkerRectHeight;left=markerCenterX-halfLabelsWidth;top=markerCenterY-halfLabelsHeight;switch(position){case"left":left=markerCenterX-halfMarkerRectWidth-labelsWidth-LABELS_MARKER_PADDING;break;case"top":top=markerCenterY-halfMarkerRectHeight-labelsHeight-LABELS_MARKER_PADDING;break;case"right":left=markerCenterX+halfMarkerRectWidth+LABELS_MARKER_PADDING;break;case"bottom":top=markerCenterY+halfMarkerRectHeight+LABELS_MARKER_PADDING;break;}}labelsRectConfig.rect={x:left,y:top,w:labelsWidth,h:labelsHeight};xPoint=left+halfLabelsWidth;for(i=0;i<n;i++){yPoint=top+(i+0.5)*fontHeight;labelsRectConfig.labels.push({label:labels[i].label,point:{x:xPoint,y:yPoint}});}return labelsRectConfig;},createDataLabelLayer:function createDataLabelLayer(){this.removeDataLabelLayer();this.dataLabelsHostNode=$MUTIL.appendGNode(this.gNode);this.dataLabelsGraphics=[];},removeDataLabelLayer:function removeDataLabelLayer(){var i,graphics=this.dataLabelsGraphics,dataLabelsHostNode=this.dataLabelsHostNode,n=(graphics&&graphics.length)||0;for(i=0;i<n;i++){graphics[i].destroy();}this.dataLabelsGraphics=[];if(dataLabelsHostNode&&dataLabelsHostNode.parentNode){dataLabelsHostNode.parentNode.removeChild(dataLabelsHostNode);this.dataLabelsHostNode=null;}},isDataLabelShown:function isDataLabelShown(){return this.dataLabelsHostNode&&this.dataLabelsHostNode.style.display!=="none";},showDataLabelLayer:function showDataLabelLayer(){if(this.dataLabelsHostNode){this.dataLabelsHostNode.style.display="block";}},hideDataLabelLayer:function hideDataLabelLayer(){if(this.dataLabelsHostNode){this.dataLabelsHostNode.style.display="none";}},updateScreenPoint:function updateScreenPoint(labelConfig){var screenPoint,baseLayer=this.execMethodOfParent("getBaseLayer");if(!baseLayer){return ;}$ARR.forEach(labelConfig,function(config){if(config){screenPoint=baseLayer.getScreenPointInfo(config.mapPoint);if(!screenPoint){throw new Error("Projection didn't prepared!");}config.screenPoint=screenPoint;}});}});}());