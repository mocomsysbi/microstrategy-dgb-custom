(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.array","mstrmojo.VisUtility","mstrmojo.css","mstrmojo.vi.viz.EnumDSSDropZones","mstrmojo.vi.util.TemplateUtils","mstrmojo.gmaps.layer.Layer","mstrmojo.gmaps.graphic.Graphic","mstrmojo.gmaps._MapDataLabel","mstrmojo.gmaps._MapAffinityLine","mstrmojo.gmaps.MapEnums","mstrmojo.gmaps.MapUtils","mstrmojo.vi.ui.rw._HasVisSelections","mstrmojo.vi.ui.rw._HasGraphicsSelections","mstrmojo.gmaps.layer._GraphicLayerDataHelper","mstrmojo.gmaps.layer._GraphicLayerDataSelectionHelper","mstrmojo.gmaps.layer._InfoWindowHelper","mstrmojo.gmaps.layer._LassoSelectHelper","mstrmojo.gmaps.layer.GraphicLayerViewerFactory","mstrmojo.gm.GMEnums","mstrmojo.gmaps.layer._LayerInteractivity","mstrmojo.models.template.DataInterface","mstrmojo.PerformanceLogOutput","mstrmojo.vi.viz.MapHelper","mstrmojo.gm.GMUtility","mstrmojo.gmaps.MapColorUtils");var $MOJO=mstrmojo,$ARR=$MOJO.array,$GM=$MOJO.gm,$GMAPS=$MOJO.gmaps,$MUTIL=$GMAPS.MapUtils,$HASH=$MOJO.hash,$EDZ=$MOJO.vi.viz.EnumDSSDropZones,$TEMPLATE_UTILS=mstrmojo.vi.util.TemplateUtils,$EnumPropertyType=$GMAPS.EnumPropertyType,$EnumDataLabel=$GMAPS.EnumDataLabel,$EnumBaseMapType=$GMAPS.EnumBaseMapType,$EnumDynamicZoomStatus=$GMAPS.EnumDynamicZoomStatus,$EnumRenderMethod=$GMAPS.EnumRenderMethod,$EnumShapeFormat=$GMAPS.EnumShapeFormatting,$ZoomAnimationDelta=$GMAPS.ZoomAnimationDelta,$GraphicLayerViewerFactory=$GMAPS.layer.GraphicLayerViewerFactory,Graphic=$GMAPS.graphic.Graphic,LAYER_INDEX_MAX=$GMAPS.LAYER_INDEX_MAX,$PerfLog=$MOJO.PerformanceLogOutput,$MH=$MOJO.vi.viz.MapHelper,$UTIL=$MOJO.VisUtility,$GMU=$GM.GMUtility,$MCU=$GMAPS.MapColorUtils;var DEFAULT_DATA_LABEL_PROPS=$GMAPS.DEFAULT_DATA_LABEL_PROPS,DEFAULT_DATA_LABEL_PROPS_MAPBOX=$MOJO.mapbox.DEFAULT_DATA_LABEL_PROPS_MAPBOX,DEFAULT_RENDER_METHOD=$EnumRenderMethod.svg,VAL_AUTOMATIC="automatic",REG_SPAN_TAG=/\<\/?span.*?\>/ig;function makeComb(tids,eids,tps){return eids.map(function(eid,idx){return{eid:eid,tid:tids[idx],tp:tps[idx]};});}mstrmojo.gmaps.layer.GraphicLayer=mstrmojo.declare(mstrmojo.gmaps.layer.Layer,[mstrmojo.gmaps._MapDataLabel,mstrmojo.gmaps._MapAffinityLine,mstrmojo.gmaps.layer._LassoSelectHelper,mstrmojo.vi.ui.rw._HasVisSelections,mstrmojo.vi.ui.rw._HasGraphicsSelections,mstrmojo.gmaps.layer._GraphicLayerDataHelper,mstrmojo.gmaps.layer._GraphicLayerDataSelectionHelper,mstrmojo.gmaps.layer._InfoWindowHelper,mstrmojo.gmaps.layer._LayerInteractivity],{scriptClass:"mstrmojo.gmaps.layer.GraphicLayer",graphicType:null,shapeInfoArr:null,graphics:null,_viewer:null,data:null,dropZones:null,layerProps:null,primaryModel:null,useSelectedMetric:false,selectedMetricIdx:0,colorMetricIdx:-1,colorAttrIdxs:null,colorAttrs:null,legendColorByElements:null,originColorMap:null,isColorByAttr:false,sizeMetricIdx:-1,angleMetricIdx:-1,sliceAttrIdxs:null,colorByLabelAttr:null,infoTemplate:null,defaultInfoTemplateHTML:null,customInfoTemplateHTML:null,infoTabDiv:null,useAttribute:false,applyThreshold:true,thresholdType:null,supportImgThreshold:null,isAggregate:null,wpAggregateAttributeForm:null,wpLookupAttId:null,selectedGraphics:null,contextMenuSelection:null,originSelectedGraphics:null,init:function init(props){if(!props){return ;}this._super(props);this.graphics=[];this.selectedGraphics=[];this.contextMenuSelection=[];this.originSelectedGraphics=[];this.initParams();if(this.initViSelectionFromScExp){this.initViSelectionFromScExp();}},initParams:function initParams(){var map=this.map,mapViewer=this.parent,geoAttr;if(!map){return ;}this.layerProps=this.getLayerProps();if(map.getDropZones instanceof Function){this.dropZones=map.getDropZones(this.key);}geoAttr=this.dropZones.geoAttribute;if(map.dynZoomStatus===$EnumDynamicZoomStatus.INIT){if(mapViewer.getGraphicLayerCount()===1&&geoAttr===null){map.dynZoomStatus=$EnumDynamicZoomStatus.NO_GEO_ATTR;}else{map.dynZoomStatus=$EnumDynamicZoomStatus.FIRST_GEO_ADD_FINISHED;}}if(map.dynZoomStatus===$EnumDynamicZoomStatus.NO_GEO_ATTR&&geoAttr!==null){map.dynZoomStatus=$EnumDynamicZoomStatus.FIRST_ADD_GEO_ARR;}this.primaryModel=this.addDisposable(new mstrmojo.models.template.DataInterface(this.data));this.initMetricIdxs();this.loadLayerProps(this.layerProps);},refresh:function refresh(data){if(!this.map||data===this.data){return ;}this.unrender();if(!!data&&data.k===this.key){this.data=data;}this.initParams();if(!this.isGridDataEmpty()){this.initGraphics();}},initGraphics:function initGraphics(){$MUTIL.showWait();},dataValidate:function dataValidate(){var rowTitles=this.getDataRows(),rowHeaders=this.getDataRowHeaders(),i,rowCells,rowTitleLength,rowHeaderLength;if(!rowTitles||!rowHeaders){return false;}rowTitleLength=rowTitles.length;rowHeaderLength=rowHeaders.length;for(i=0;i<rowHeaderLength;i+=1){rowCells=rowHeaders[i].items;if(rowCells.length>rowTitleLength){return false;}}return true;},getColorInfoBySingleAttr:function getColorInfoBySingleAttr(colorAttrId,colorElemId){var aIds=[],eIds=[],colorBy,colorInfo,opacity;aIds.push(colorAttrId);eIds.push(colorElemId);colorBy=this.model.docModel.getColorBy(aIds,eIds);opacity=this.getAttrColorByOpacity(aIds,eIds)/100;colorInfo={value:$GMU.decodeColor(colorBy.color),opacity:opacity};return colorInfo;},getColorAttrIdx:function getColorAttrIdx(){var colorAttrIdxs=this.colorAttrIdxs||[];return colorAttrIdxs.length===1?colorAttrIdxs[0]:-1;},getColorRHIdx:function getColorRHIdx(rowIndex,colorAttrIdx){var rhIdx=-1,rowHeaders=this.getDataRowHeaders(),rowHeaderElements,rowHeaderElement;rowHeaderElements=rowHeaders[rowIndex].items;if(colorAttrIdx<rowHeaderElements.length){rowHeaderElement=rowHeaderElements[colorAttrIdx];rhIdx=rowHeaderElement.idx;}return rhIdx;},getColorElemId:function getColorElemId(rhIdx,rowAttr){var colorElem,colorElemId=null;if(rhIdx>=0){colorElem=rowAttr.es[rhIdx];colorElemId=colorElem.id;}return colorElemId;},generateColorInfo:function generateColorInfo(shapeInfoAttributes,colorAttrIdx){var rowAttributes=this.getDataRows(),rowAttr,colorAttrId,colorType,rowIndices,rowIndex,rhIdx,colorElemId,colorInfo;rowAttr=rowAttributes[colorAttrIdx];colorAttrId=rowAttr.id;colorType=rowAttr.otp;rowIndices=shapeInfoAttributes.rowIndices;if(rowIndices.length>0){rowIndex=rowIndices[0];rhIdx=this.getColorRHIdx(rowIndex,colorAttrIdx);colorElemId=this.getColorElemId(rhIdx,rowAttr);colorInfo=this.getColorInfoBySingleAttr(colorAttrId,colorElemId);shapeInfoAttributes.colorByAttributeIds=[colorAttrId];shapeInfoAttributes.colorByElementIds=[colorElemId];shapeInfoAttributes.colorByTypes=[colorType];shapeInfoAttributes.color=colorInfo;}},generateColorMapElem:function generateColorMapElem(colorElemId,colorAttrId,colorType,rhIdx){var label;label=this.generateColorByLabel(rhIdx);this.originColorMap.push({elemId:colorElemId,attrId:colorAttrId,type:colorType,label:label});},generateColorMap:function generateColorMap(rowIndexArr,colorAttrIdx){var i,rowAttributes=this.getDataRows(),rowAttr,colorAttrId,colorType,rowIndex,rhIdx,colorElemId,processedColorElemIds=[],aIds,eIds,rowIndexArrLength=rowIndexArr.length;rowAttr=rowAttributes[colorAttrIdx];colorAttrId=rowAttr.id;colorType=rowAttr.otp;this.originColorMap=[];this.getColorByLabelAttr(colorAttrId);for(i=rowIndexArrLength-1;i>=0;i-=1){rowIndex=rowIndexArr[i];rhIdx=this.getColorRHIdx(rowIndex,colorAttrIdx);colorElemId=this.getColorElemId(rhIdx,rowAttr);if(processedColorElemIds.indexOf(colorElemId)<0){processedColorElemIds.push(colorElemId);aIds=[];eIds=[];aIds.push(colorAttrId);eIds.push(colorElemId);this.model.docModel.getColorBy(aIds,eIds);this.generateColorMapElem(colorElemId,colorAttrId,colorType,rhIdx);}}},getColorByLabelAttr:function getColorByLabelAttr(attrId){var rowAttributes=this.getDataRows(),selectedAttrs,selectedAttrLength,selectedAttr,i,showAll=true,colorByLabelAttr;colorByLabelAttr=this.colorByLabelAttr=[];selectedAttrs=rowAttributes.filter(function(rowAttribute){return attrId===rowAttribute.id;});selectedAttrLength=selectedAttrs.length;for(i=0;i<selectedAttrLength;i=i+1){selectedAttr=selectedAttrs[i];if($MH.isAxisAttribute(selectedAttr)===false){showAll=false;colorByLabelAttr.push(selectedAttr);}}if(showAll){for(i=0;i<selectedAttrLength;i=i+1){colorByLabelAttr.push(selectedAttrs[i]);}}},generateColorByLabel:function generateColorByLabel(rhIdx){var attrForms=this.colorByLabelAttr,attrFormLength=attrForms.length,attrForm,elem,text="",i;for(i=0;i<attrFormLength;i=i+1){attrForm=attrForms[i];elem=attrForm.es[rhIdx];text+=elem.n+" ";}text=text.substring(0,text.length-1);return text;},getAttrColorByOpacity:function getAttrColorByOpacity(tid,eid,customOpacities){var props=this.getLayerProps(),colorByOpacity=props.cbo,opacities=customOpacities===undefined?(colorByOpacity?JSON.parse(colorByOpacity):{}):customOpacities,strtid,streid,attr,opacity;tid=tid||[];eid=eid||[];strtid=tid.join("|");streid=eid.join("|");attr=opacities[strtid]||{};opacity=attr[streid];if(opacity===undefined){opacity=85;}return opacity;},getLegendColorByItemNameById:function getLegendColorByItemNameById(attrs,colorByAttr){var pn=$UTIL.isHierarchyObject(colorByAttr)?"hid":"id",cid=colorByAttr.id,itemName="";$ARR.forEach(attrs,function(item){if(item[pn]===cid){itemName+=(item.dn||item.n)+" ";}});return itemName;},processLegendColorByItemName:function processLegendColorByItemName(){var i,attrs=this.colorAttrs,map=this.map,colorByAttrs,colorByAttr,attributesLen,itemName="";colorByAttrs=map&&map.getColorByDzRawData(this.key);if(!colorByAttrs){return itemName;}attributesLen=colorByAttrs&&colorByAttrs.length;if(!attributesLen||attributesLen<=0){return itemName;}for(i=0;i<attributesLen;i+=1){colorByAttr=colorByAttrs[i];itemName+=this.getLegendColorByItemNameById(attrs,colorByAttr);}itemName=itemName.substring(0,itemName.length-1);return itemName;},processLegendColorByElements:function processLegendColorByElements(){var originColorMap=this.originColorMap,elementsLen,itm,text,elements,levels,types,colorByElement,colorByElementColor,colorAttrId,colorElemId,i,res=[];if(!originColorMap){return res;}elementsLen=originColorMap.length;for(i=0;i<elementsLen;i=i+1){itm={};text="";elements=[];levels=[];types=[];colorByElement=originColorMap[i];colorAttrId=colorByElement.attrId;colorElemId=colorByElement.elemId;colorByElementColor=this.getColorInfoBySingleAttr(colorAttrId,colorElemId);itm.color=colorByElementColor.value;itm.decodedColor=itm.color;itm.encodedColor=$GMU.encodeColor(itm.color);itm.opacity=colorByElementColor.opacity;itm.label=colorByElement.label;itm.isDefaultColor=!colorByElement.isManual;elements.push(colorElemId);levels.push(colorAttrId);types.push(colorByElement.type);itm.token={elements:elements,levels:levels,types:types};res.push(itm);}return res;},processLegendColorByInfo:function processLegendColorByInfo(){if(this.isColorByAttr){var itemName=this.processLegendColorByItemName(),elements=this.processLegendColorByElements();this.legendColorByElements={item:itemName,elements:elements};}},getFormatColorByElements:function getFormatColorByElements(){var lgdcb=this.legendColorByElements,elements,elementAll;if(!lgdcb){this.processLegendColorByInfo();lgdcb=this.legendColorByElements||{};}elements=(lgdcb.elements||[]).map(function(e){var token=e.token,eids=token.elements||[],tids=token.levels||[],tps=token.types||[];return{text:e.label,color:e.color,opacity:e.opacity*100,comb:makeComb(tids,eids,tps)};});elementAll=$MCU.getColorInfoForItemAll(elements);elements.unshift({text:mstrmojo.desc(2461,"All"),color:elementAll.color,opacity:elementAll.opacity,comb:[]});return elements;},getContextMenuColorBySelections:function getContextMenuColorBySelections(){var cmSelected=this.contextMenuSelection||[],elements=cmSelected.filter(function(element){var shapeAttr=element.attributes,tids=shapeAttr.colorByAttributeIds,eids=shapeAttr.colorByElementIds;return tids&&eids&&tids.length===eids.length;}).map(function(element){var shapeAttr=element.attributes,tids=shapeAttr.colorByAttributeIds,eids=shapeAttr.colorByElementIds,tps=shapeAttr.colorByTypes;return tids.map(function(tid,idx){return{tid:tid,eid:eids[idx],tp:tps[idx]};});});return $UTIL.arrayUnique(elements,function(x,y){x=$HASH.clone(x);y=$HASH.clone(y);return $GMU.isEqualComb(x,y);});},generateUpdatedOpacityPalette:function generateUpdatedOpacityPalette(comb,newVal){var props=this.getLayerProps(),colorByOpacity=props.cbo,opacities=colorByOpacity?JSON.parse(colorByOpacity):{};comb=[].concat(comb);newVal=[].concat(newVal);if(comb.length!==newVal.length){throw new Error("comb and opacity number not match");}comb.forEach(function(cb,idx){var tid=cb.map(function(e){return e.tid;}).join("|"),eid=cb.map(function(e){return e.eid;}).join("|"),attr=opacities[tid];if(attr===undefined){attr={};opacities={};}attr[eid]=newVal[idx];opacities[tid]=attr;});return opacities;},generateColorData:function generateColorData(graphics,colorData,cmSelColorData,hoverColorData,unSelectedData){var me=this;$ARR.forEach(graphics,function(graphic){var attributes=graphic.attributes,colorInfo=me.model.docModel.getColorBy(attributes.colorByAttributeIds,attributes.colorByElementIds),colorValue=$GMU.decodeColor(colorInfo.color);attributes.color.value=colorValue;colorData.push([graphic.id,colorValue]);cmSelColorData.push([graphic.id,$MUTIL.fillColorAjustForCMSelection(colorValue)]);hoverColorData.push([graphic.id,$MUTIL.fillColorAjustForHover(colorValue)]);unSelectedData.push([graphic.id,colorValue]);});},updateLayerColorByColor:function updateLayerColorByColor(){var graphics=this.graphics,colorData=[],cmSelColorData=[],hoverColorData=[],unSelectedData=[],map=this.map,layerViewer=this._viewer;if(!layerViewer){return ;}this.generateColorData(graphics,colorData,cmSelColorData,hoverColorData,unSelectedData);this.processLegendColorByInfo();layerViewer.handleColorByColorChange(colorData,cmSelColorData,hoverColorData,unSelectedData);map.resetLegendColorByData(this.key);},generateOpacityData:function generateOpacityData(graphics,opacities,opacityData){var me=this;$ARR.forEach(graphics,function(graphic){var attributes=graphic.attributes,opacity=me.getAttrColorByOpacity(attributes.colorByAttributeIds,attributes.colorByElementIds,opacities)/100;attributes.color.opacity=opacity;opacityData.push([graphic.id,opacity]);});},updateLayerColorByOpacity:function updateLayerColorByOpacity(comb,newVal){var opacityStr,map=this.map,opacities;opacities=this.generateUpdatedOpacityPalette(comb,newVal);opacityStr=JSON.stringify(opacities);map.writeProperties("cbo",opacityStr,this.key,true);},handleLayerColorByOpacity:function handleLayerColorByOpacity(opacityStr){var graphics=this.graphics,map=this.map,opacities,opacityData=[];opacities=!!opacityStr?JSON.parse(opacityStr):{};this.generateOpacityData(graphics,opacities,opacityData);this.processLegendColorByInfo();this._viewer.handleColorByOpacityChange(opacityData);map.resetLegendColorByData(this.key);map.raiseEvent({name:"colorByColorChange",type:"opacityFullUpdate"});},getLegendShowProperty:function getLegendShowProperty(){var props=this.map.getProperties(this.key);return !!(!!props.ls&&props.ls.toString()==="true");},buildGraphics:function buildGraphics(shapeInfoArr){$ARR.forEach(shapeInfoArr,function(shapeInfo){this.addGraphic(this.buildGraphic(shapeInfo));},this);this.createDataLabelsConfig();this.createAffinityLinesConfig();this.buildViewer();},createDataLabelsConfig:function createDataLabelsConfig(){if(this.supportDataLabel()){this.populateDataLabelMetricValues();}},populateDataLabelMetricValues:function populateDataLabelMetricValues(){var value,dlMtxIdx=this.colorMetricIdx,layerModel=this.getLayerModel(),metric,rowIndex,attributes;if(isNaN(dlMtxIdx)||dlMtxIdx<0||!layerModel){return ;}$ARR.forEach(this.graphics,function(graphic){attributes=graphic&&graphic.attributes;if(attributes&&!graphic.isClusterGraphic()){attributes.values=[];rowIndex=graphic.getDataRowIdx();metric=layerModel.getMetricValue(rowIndex,dlMtxIdx);value=metric&&metric.getValue();if(value){if(typeof value==="string"&&value.toLowerCase().indexOf("<span")>=0){value=value.replace(REG_SPAN_TAG,"");}attributes.values.push(value);}}});},buildGraphic:function buildGraphic(shapeInfo){return new Graphic($HASH.copy({parent:this},shapeInfo));},buildViewer:function buildViewer(){var mapViewer=this.parent,baseLayer=mapViewer&&mapViewer.baseLayer;if(!baseLayer){return ;}this.destroyViewer();this._viewer=$GraphicLayerViewerFactory.create($HASH.copy({key:this.key,graphics:this.graphics,parent:this,parentDom:mapViewer&&mapViewer.graphicLayerDiv},this.getViewerProps()),this.renderMethod||mapViewer.renderMethod||DEFAULT_RENDER_METHOD);this.setLayerZIndex();if(this.highlightFromViSelection&&this.highlightFromViSelection instanceof Function){this.highlightFromViSelection();}},getViewerProps:function getViewerProps(){return{graphicType:this.getLayerProp($EnumPropertyType.graphicType),applyThreshold:this.applyThreshold,minzoom:this.minzoom,maxzoom:this.maxzoom,hasConnectingLayer:this.hasConnectingLayer};},getLayerFmts:function getLayerFmts(){var layerProps=this.layerProps,map=this.map,fmts={};if(!layerProps||!map){return fmts;}if(layerProps[$EnumShapeFormat.SHAPE_FORMAT_FILL_COLOR]){fmts.fillColor=layerProps[$EnumShapeFormat.SHAPE_FORMAT_FILL_COLOR];}if(layerProps[$EnumShapeFormat.SHAPE_FORMAT_BORDER_COLOR]){fmts.strokeColor=layerProps[$EnumShapeFormat.SHAPE_FORMAT_BORDER_COLOR];}if(layerProps[$EnumShapeFormat.SHAPE_FORMAT_BORDER_STYLE]){map.convertLineStyle(layerProps[$EnumShapeFormat.SHAPE_FORMAT_BORDER_STYLE]);fmts.strokeDashArray=map.shapeBorderLineDash;fmts.strokeWidth=map.shapeBorderWidth;}if(layerProps[$EnumShapeFormat.SHAPE_FORMAT_FILL_OPACITY]){map.convertShapeFillOpacity(layerProps[$EnumShapeFormat.SHAPE_FORMAT_FILL_OPACITY]);fmts.fillOpacity=map.shapeFillOpacity;}return fmts;},getLayerProp:function getLayerProp(propName){var props=this.getLayerProps();if(props){return props[propName];}},getLayerProps:function getLayerProps(){return this.data&&this.data.vp;},getMarkerType:function getMarkerType(){return this.getLayerProp($EnumPropertyType.markerType);},getDropZones:function getDropZones(){return this.dropZones;},getLayerName:function getLayerName(){return this.layerProps&&this.layerProps[$EnumPropertyType.layerName];},getLayerIdx:function getLayerIdx(){var layerIdx=parseInt(this.layerProps&&this.layerProps[$EnumPropertyType.layerIdx]);return !$MUTIL.checkVal(layerIdx)?0:layerIdx;},_getLayerZIndex:function _getLayerZIndex(){var layerIdx=this.getLayerIdx();return $MUTIL.checkVal(layerIdx)&&(LAYER_INDEX_MAX-layerIdx-10);},setLayerZIndex:function setLayerZIndex(){var _viewer=this._viewer,nextLayerKey=this._getNextLayerKey();if($MUTIL.checkHasFunction(_viewer,"setLayerZIndex")){_viewer.setLayerZIndex(this._getLayerZIndex(),nextLayerKey);}this.updateBmpLabelsPos(nextLayerKey);},updateBmpLabelsPos:function updateBaseMapLabelsPos(nextLayerKey){var mapViewer=this.parent,baseLayer=mapViewer&&mapViewer.baseLayer,isLabelsOnTop=baseLayer&&baseLayer.isLabelGropOnTop();if(!nextLayerKey&&baseLayer&&isLabelsOnTop){baseLayer.toggleBaseMapLabelsPos();}},_getNextLayerKey:function _getNextLayerKey(){var map=this.map,key=this.key,layerIdxMappingArr=map&&map.layerIdxMappingArr,idx;if(!$ARR.isArray(layerIdxMappingArr)){return ;}idx=layerIdxMappingArr.indexOf(key);if(idx!==-1){return layerIdxMappingArr[idx-1];}},isAftLnTmptHit:function isAftLnTmptHit(key){var layerProps=this.layerProps;return(layerProps[$EnumPropertyType.showAffinityLines]==="1")&&(layerProps[$EnumPropertyType.affinityLineGrid]===key);},updateGraphics:function updateGraphics(){var baseLayer=this.getBaseLayer(),_viewer=this._viewer;if(!baseLayer||!_viewer||(baseLayer.isForPremium&&baseLayer.isForPremium())){return ;}$MUTIL.showWait();baseLayer.updateXCoordsRange();_viewer.desolveClustersIfZoomChanged();_viewer.updateGraphicsPositionInScreen(baseLayer);$MUTIL.hideWait();},getPropsForViewerUpdate:mstrmojo.emptyFn,callbackForUpdateGraphics:function callbackForUpdateGraphics(){var map=this.map,_viewer=this._viewer;if(!map||!_viewer){return ;}_viewer.update(this.getPropsForViewerUpdate());this.setVisibility(this.isVisible());map.needUpdateGraphicLayersCnt--;if(map.needUpdateGraphicLayersCnt===0){map.graphicsReady=true;if($MUTIL.checkHasFunction(map,"checkForMapReady")){map.checkForMapReady();}$PerfLog.endTimer("timerid_handleExtentChange");$PerfLog.endTimer("timerid_fromBuildtoEnd");$PerfLog.endTimer("timerid_fromResponsetoEnd");$PerfLog.endTimer("timerid_VisFilter_updateSelections");$PerfLog.endTimer("timerid_VisFilter_unsetFilter");$PerfLog.endTimer("timerid_Vis_keepOnly");$PerfLog.endTimer("timerid_Vis_drill");$PerfLog.endTimer("timerid_Vis_exclude");$PerfLog.visPrint("End All Graphic Layers");$PerfLog.recordJSHeapMemory("Memory usage at the end");}},toggleLegend:function toggleLegend(display){if(!$MUTIL.isVI()){return ;}var me=this,map=me.map,mapViewer=this.parent;display=display&&this.isVisible();map.switchLegend(display,this.key);if(mapViewer){mapViewer.updateMapToolbar();}},resize:function resize(width,height){var _viewer=this._viewer;if(_viewer){_viewer.resize(width,height);_viewer.stopUpdate();}},updateMapExtent:function updateMapExtent(){var mapViewer=this.parent,baseLayer=this.getBaseLayer(),map=this.map;if(!mapViewer||mapViewer.destroyed||!$MUTIL.checkHasFunction(mapViewer,"isDynamicZoom")){$MUTIL.hideWait();return ;}this._active=true;if(this.getLegendShowProperty()){map.createSingleLegend(this.key);}if(mapViewer.hasInit===true&&(mapViewer.isDynamicZoom()!==true||map.isKeepOnlyExclude)){this.updateGraphics();mapViewer.updateMapComponents(map);mapViewer.updateNeedUpdLayers(map,this.key);if(map.needUpdateLayers.length===0){map.isKeepOnlyExclude=false;}}else{if(baseLayer&&baseLayer.isProjectionReady()&&mapViewer.getBaseMapType()===$EnumBaseMapType.Google){this.updateGraphics();}this._super();}$MUTIL.hideWait();},getXtab:function getXtab(){var map=this.map;if(this.key){return map.fnGetWidget(this.key);}return null;},addGraphic:function addGraphic(graphic){var graphics=this.graphics;if(graphic&&$ARR.isArray(graphics)){graphics.push(graphic);}},appendGraphicNodeToBottom:function appendGraphicNodeToBottom(graphic){var _viewer=this._viewer;if(_viewer){_viewer.appendGraphicNodeToBottom(graphic);}},setVisibility:function setVisibility(isVisible){this._super(isVisible);this.setLayerZIndex();var _viewer=this._viewer;if(_viewer){_viewer.setVisibility(isVisible);}},clean:function clean(){var _viewer=this._viewer;if(_viewer){_viewer.clean();}},loadLayerProps:function loadLayerProps(props){var isVI=$MUTIL.isVI();if(!props){return ;}if($HASH.keyarray(props).length===0){props.sm="0";props.sa="1";}if(props[$EnumPropertyType.customInfoWinTpl]){this.customInfoTemplateHTML=this.parseCustomInfoWinTplHTML(unescape(props[$EnumPropertyType.customInfoWinTpl]));}if(props[$EnumPropertyType.useAttributeForm]&&parseInt(props[$EnumPropertyType.useAttributeForm],10)===0){this.useAttribute=true;}if(props.at){this.applyThreshold=(props.at==="1");}if($MUTIL.checkDefined(props.dm)){this.isAggregate=(props.dm==="1");}else{if(isVI){this.isAggregate=true;}}if($MUTIL.checkDefined(props.dmaf)){this.wpAggregateAttributeForm=(props.dmaf==="1");}else{if(isVI){this.wpAggregateAttributeForm=true;}}if($MUTIL.checkDefined(props.latt)){this.wpLookupAttId=props.latt;}if(props[$EnumShapeFormat.SHAPE_FORMAT_FILL_COLOR]===VAL_AUTOMATIC){delete props[$EnumShapeFormat.SHAPE_FORMAT_FILL_COLOR];}if(props[$EnumShapeFormat.SHAPE_FORMAT_BORDER_COLOR]===VAL_AUTOMATIC){delete props[$EnumShapeFormat.SHAPE_FORMAT_BORDER_COLOR];}this.parseDataLabelProperties(props);this.parseZoomThroughtLayerProps(props);},populateInfoTemplate:function populateInfoTemplate(skipIndices){var skipItems=!!skipIndices?skipIndices:[];return{content:(!this.customInfoTemplateHTML)?this.getDefaultInfoTplHTML(this.data,this.dropZones,skipItems):this.customInfoTemplateHTML};},isVisible:function isVisible(){return !!this.layerProps&&(this.layerProps[$EnumPropertyType.isHidden]!=="1");},parseDataLabelProperties:function parseDataLabelProperties(layerProps){var key,PROPS=this.isForPremium()?DEFAULT_DATA_LABEL_PROPS_MAPBOX:DEFAULT_DATA_LABEL_PROPS;for(key in PROPS){if(PROPS.hasOwnProperty(key)){if(!layerProps[key]){layerProps[key]=PROPS[key][0];}if(key===$EnumDataLabel.DATA_LABEL_FONT_COLOR&&!isNaN(layerProps[key])){layerProps[key]=parseInt(layerProps[key]);}else{if(key===$EnumDataLabel.DATA_LABEL_FONT_STYLE||key===$EnumDataLabel.DATA_LABEL_SHOW){layerProps[key]=parseInt(layerProps[key]);}else{if(key===$EnumDataLabel.DATA_LABEL_SHOW_ALL){layerProps[key]=layerProps[key]===true||layerProps[key]==="true";}}}}}},parseZoomThroughtLayerProps:function parseZoomThroughtLayerProps(layerProps){var baseLayer=this.getBaseLayer(),map=this.map,enableZoomThroughLayer=map.isZoomThroughLayerEnable&&map.isZoomThroughLayerEnable(),mapViewer=this.parent,key=this.key,minZoomRange=(enableZoomThroughLayer&&$MUTIL.checkDefined(layerProps[$EnumPropertyType.minLayerZoomLvl]))?parseFloat(layerProps[$EnumPropertyType.minLayerZoomLvl]):baseLayer.minZoom,maxZoomRange=(enableZoomThroughLayer&&$MUTIL.checkDefined(layerProps[$EnumPropertyType.maxLayerZoomLvl]))?parseFloat(layerProps[$EnumPropertyType.maxLayerZoomLvl]):baseLayer.maxZoom,hasConnectingLayer=false;mapViewer.forEachGraphicLayer(function(graphicLayer){var currKey=graphicLayer.key,currLayerProps=graphicLayer.getLayerProps(),currMinZoomRange=(enableZoomThroughLayer&&$MUTIL.checkDefined(currLayerProps[$EnumPropertyType.minLayerZoomLvl]))?parseFloat(currLayerProps[$EnumPropertyType.minLayerZoomLvl]):baseLayer.minZoom;if(key!==currKey&&maxZoomRange===currMinZoomRange){maxZoomRange=Math.min(maxZoomRange+$ZoomAnimationDelta,baseLayer.maxZoom);hasConnectingLayer=true;return false;}},null,true);this.minzoom=minZoomRange;this.maxzoom=maxZoomRange+0.0001;this.hasConnectingLayer=hasConnectingLayer;},isLayerInZoomRange:function isLayerInZoomRange(){var baseLayer=this.getBaseLayer(),zoomLevel=baseLayer&&baseLayer.getZoom();return baseLayer.supportLayerZoomRange===false||(this.minzoom<=zoomLevel&&zoomLevel<this.maxzoom);},isLayerInClusterRange:function isLayerInClusterRange(){if(!this.isClustered){return false;}var baseLayer=this.getBaseLayer(),zoomLevel=baseLayer&&baseLayer.getZoom();return zoomLevel<this.clusterMaxZoom;},getDropZonesItems:function getDropZonesItems(dzID){var zone=this.getZoneModelByZoneId(dzID);return zone&&zone.items;},getDropZonesItem:function getDropZonesItem(dzID){var map=this.map,dzItems=map&&map.getDropZoneItems(dzID,this.key),itemId=dzItems&&dzItems[0]&&dzItems[0].id;return $TEMPLATE_UTILS.findUnitsById(this.data.gsi,itemId)[0];},showDataLabelValues:function showDataLabelValues(){return !this.hasColorByAttribute()&&!!this.getDropZonesItem($EDZ.ColorBy);},showDataLabelText:function showDataLabelText(){return !!this.getDropZonesItem($EDZ.GeoAttribute);},enableMinSizeOption:function enableMinSizeOption(){return !!this.getDropZonesItem($EDZ.SizeBy);},hasSizeByMetric:function hasSizeByMetric(){var colCount=this.primaryModel.getTotalCols();return this.sizeMetricIdx>-1&&this.sizeMetricIdx<colCount;},hasColorByMetric:function hasColorByMetric(){var colCount=this.primaryModel.getTotalCols();return this.colorMetricIdx>-1&&this.colorMetricIdx<colCount;},hasColorByAttribute:function hasColorByAttribute(){return this.isColorByAttr;},canShowLegend:function canShowLegend(){return !this.isGridDataEmpty()&&(!!(this.hasSizeByMetric()||this.hasColorByMetric()||this.hasColorByAttribute()));},needShowLegend:function needShowLegend(){var val=this.getLayerProp($EnumPropertyType.legendSwitch)||"";return(val&&val.toString()==="true")?true:false;},hasImgThreshold:function hasImgThreshold(){var graphic=this.graphics&&this.graphics[0],attributes=graphic&&graphic.attributes,threshold=attributes&&attributes.threshold;return threshold&&threshold.url;},initMetricIdxs:function initMetricIdxs(){var dropZones=this.dropZones;if(!dropZones){return ;}this._initMetricIdxsFromDropZones();if(this.useSelectedMetric||(!$MUTIL.isVI()&&this.hasMetrics()&&!dropZones.colorBy&&!dropZones.sizeBy)){this.colorMetricIdx=this.sizeMetricIdx=this.selectedMetricIdx;this.useSelectedMetric=true;}},_initMetricIdxsFromDropZones:function _initMetricIdxsFromDropZones(){var me=this,dropZones=this.dropZones,cols=this.getDataCols(),rows=this.getDataRows(),rawColorAttrIdxs=[],rawColorAttrIdxsLength,selColorAttrIdx,selColorAttr,selAttrId,selAttrIds=[],tempColorAttrIdxs,tempColorAttrs,i;if(!dropZones){return ;}this.colorAttrIdxs=null;this.colorAttrs=null;this.isColorByAttr=false;if(dropZones.isColorByAttr===true){if(dropZones.colorBy){$ARR.forEach(dropZones.colorBy,function(colorAttrId){rawColorAttrIdxs=rawColorAttrIdxs.concat(me.findAttrIdxs(colorAttrId));});rawColorAttrIdxsLength=rawColorAttrIdxs.length;if(rawColorAttrIdxsLength>0){tempColorAttrIdxs=[];tempColorAttrs=[];for(i=0;i<rawColorAttrIdxsLength;i=i+1){selColorAttrIdx=rawColorAttrIdxs[i];selColorAttr=rows[selColorAttrIdx];selAttrId=selColorAttr.id;if(selAttrIds.indexOf(selAttrId)<0){tempColorAttrIdxs.push(selColorAttrIdx);tempColorAttrs.push(selColorAttr);selAttrIds.push(selAttrId);}}this.colorAttrIdxs=tempColorAttrIdxs;this.colorAttrs=tempColorAttrs;this.isColorByAttr=true;}}}else{this.colorMetricIdx=this.findMetricIdx(cols,this.justMetricId(dropZones.colorBy));}this.sizeMetricIdx=this.findMetricIdx(cols,this.justMetricId(dropZones.sizeBy));this.angleMetricIdx=this.findMetricIdx(cols,this.justMetricId(dropZones.angle));if(dropZones.sliceBy){this.sliceAttrIdxs=[];$ARR.forEach(dropZones.sliceBy,function(sliceAttrId){me.sliceAttrIdxs=me.sliceAttrIdxs.concat(me.findAttrIdxs(sliceAttrId));});}else{this.sliceAttrIdxs=null;}},getGeoColumnIndex:function getGeoColumnIndex(){return -1;},handleMetricSelectionChange:function handleMetricSelectionChange(metricIndex){this.colorMetricIdx=this.sizeMetricIdx=this.selectedMetricIdx=metricIndex;this.useSelectedMetric=true;this.refresh();},onLayerZoomRangeChange:function onLayerZoomRangeChange(){var _viewer=this._viewer,layerProps=this.getLayerProps();if(!_viewer){return ;}$MUTIL.showWait();this.parseZoomThroughtLayerProps(layerProps);this.buildViewer();$MUTIL.hideWait();},getSelectedMetricIdx:function getSelectedMetricIdx(){return this.colorMetricIdx;},filterElements:function filterElements(matchPattern,stopFun){var targetArr=[],stopLoop=false,v;$ARR.forEach(this.graphics,function(graphic){var results=graphic.matchLocationName(matchPattern);$ARR.forEach(results,function(graphic){if(graphic){v={n:graphic.getGeoName(),v:graphic};if(stopFun&&stopFun(v)){stopLoop=true;targetArr.push(v);return false;}else{targetArr.push(v);}}});});return targetArr;},processDrill:function processDrill(){this.performDrill(this.getGeoColumnIndex());},getBaseMapType:function getBaseMapType(){if(this.parent){return this.parent.getBaseMapType();}},isGeoDataLayer:function isGeoDataLayer(){var baseMapType=this.getBaseMapType();return baseMapType!==$EnumBaseMapType.Image;},supportDataLabel:function(){return true;},isMarkerMap:function(){return false;},destroyAllGraphics:function destroyAllGraphics(){$ARR.forEach(this.graphics,function(graphic){if(graphic){graphic.destroy();}});this.graphics=[];this.selectedGraphics=[];this.contextMenuSelection=[];this.originSelectedGraphics=[];this.destroyViewer();},destroyViewer:function destroyViewer(){var _viewer=this._viewer;if(_viewer){_viewer.destroy();}delete this._viewer;},unrender:function unrender(){this.originColorMap=null;this.colorAttrIdxs=null;this.colorAttrs=null;this.legendColorByElements=null;this.map.destroyLegend(this.key);this.destroyAllGraphics();this.primaryModel=null;this.infoTemplate=null;this._super();},destroy:function destroy(){delete this.infoTabDiv;delete this.shapeInfoArr;this._super();}});}());