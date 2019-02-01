(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.array","mstrmojo.VisTooltip","mstrmojo.NewVisTooltip","mstrmojo.VisUtility","mstrmojo.gmaps.MapEnums","mstrmojo.gmaps.MapUtils","mstrmojo.gmaps.MapLayerZone","mstrmojo.gmaps._AreaMapHelper","mstrmojo.gmaps._MapInteractivity","mstrmojo.gmaps.basemap.BaseLayerFactory","mstrmojo.gmaps.layer.GraphicLayerFactory");var $MOJO=mstrmojo,$ARR=$MOJO.array,VisTooltip=$MOJO.VisTooltip,NewVisTooltip=$MOJO.NewVisTooltip,$GMAPS=$MOJO.gmaps,$MUTIL=$GMAPS.MapUtils,$EnumGraphicType=$GMAPS.EnumGraphicType,$EnumPolygonSource=$GMAPS.EnumPolygonSource,$EnumZoomBehavior=$GMAPS.EnumZoomBehavior,$EnumPropertyType=$GMAPS.EnumPropertyType,$EnumDynamicZoomStatus=mstrmojo.gmaps.EnumDynamicZoomStatus,$EnumLanguageType=$GMAPS.EnumLanguageType,$AMHelper=$GMAPS._AreaMapHelper,$GraphicLayerFactory=$GMAPS.layer.GraphicLayerFactory,BaseLayerFactory=$GMAPS.basemap.BaseLayerFactory,AffinityLineColors=["#FF0000","#F98435","#EA0F87","#06CCC2"],DEFAULT_SHOW_MAP_LABELS=true,DEFAULT_MAP_LABELS_ON_TOP=false,GL_SUPPORTED;mstrmojo.gmaps.MapViewer=mstrmojo.declare(mstrmojo.Obj,[mstrmojo.gmaps._MapInteractivity],{scriptClass:"mstrmojo.gmaps.MapViewer",baseLayer:null,graphicLayerMapping:null,toolbar:null,toolbarInit:false,_graphics:null,gridsMapping:null,k:null,beanPath:null,useAttribute:false,hasInit:false,baseLayerFactory:null,tooltipWin:null,enablePopup:true,infoWindowVisible:true,affinityLineColorIndex:0,supportDensity:false,init:function init(props){this._super(props);var gridsMapping=this.gridsMapping;if(!gridsMapping){return ;}this._graphics=[];this.graphicLayerMapping={};this.baseLayerFactory=new BaseLayerFactory();this.initMapToolbar();this.initMapTooltip();},initMapTooltip:function initMapTooltip(){if(!this.tooltipWin){this.tooltipWin=this.addDisposable($MUTIL.isExpress()?new VisTooltip():new NewVisTooltip());this.tooltipWin.render();}},initMapToolbar:function initMapToolbar(){if(!this.parent){return ;}var toolbar=this.toolbar=new mstrmojo.gmaps.MapToolbarNew({map:this.parent,parent:this});toolbar.render();},updateMapToolbar:function updateMapToolbar(){var toolbar=this.toolbar;if(!toolbar){return ;}if(this.needMapToolbar()!==true){toolbar.setVisibility(false);}else{if(toolbar.update instanceof Function){toolbar.update();}}},initAllLayers:function initAllLayers(){var host=this.parent,baseMapType=this.getBaseMapType()||host.getDefaultBaseMapType(),baseLayer=this.baseLayer;this.gridsMapping=this.gridsMapping||{};if(baseLayer){this.loadExistingBaseLayer(baseLayer);this.initGraphicLayers();}else{this.initBaseLayer(baseMapType);}this.addEventListeners();},loadExistingBaseLayer:function loadExistingBaseLayer(baseLayer){baseLayer.parent=this;baseLayer.map=this.parent;this.restoreBaseLayerNode();this.resize();},initBaseLayer:function initBaseLayer(baseMapType){var map=this.parent,baseLayerDiv=map&&map.baseLayerDiv,baseLayer,baseMapConfig;GL_SUPPORTED=window.mapboxgl&&window.mapboxgl.supported();if(!GL_SUPPORTED&&map.constructor===$MOJO.mapbox.VisMapbox){map.displayError(mstrmojo.desc(15714,"Please upgrade your browser"));return ;}if(!baseLayerDiv||!baseMapType||!this.baseLayerFactory){this.updateMapExtent();return ;}baseMapConfig=this.getBaseMapConfig(baseMapType);baseLayer=this.baseLayer=this.baseLayerFactory.create(baseMapConfig);if(baseLayer){baseLayer.render();}else{console.log("initBaseLayer(): invalid node");this.updateMapExtent();}},initGraphicLayers:function initGraphicLayers(){var gridsMapping=this.gridsMapping,key;if(!gridsMapping){console.log("initGraphicLayers(): no grid data found");this.updateMapExtent();return ;}for(key in gridsMapping){if(gridsMapping.hasOwnProperty(key)){this.initGraphicLayer(gridsMapping[key]);}}this.highlightAllLayers();this.parent.refreshDzPropPanels();this.parent.raiseEvent({name:"regenerateToolbar"});},refreshCloudLayers:mstrmojo.emptyFn,refreshMapBoxPolygonLayers:mstrmojo.emptyFn,resizeGraphicLayers:mstrmojo.emptyFn,applyViewPort2Graphics:mstrmojo.emptyFn,initGraphicLayer:function initGraphicLayer(grid){var graphicLayerMapping=this.graphicLayerMapping=this.graphicLayerMapping||{},graphicLayer,key,data;grid=this._preprocessSingleGrid(grid);key=grid&&grid.key;if(key){graphicLayer=graphicLayerMapping[key];if(graphicLayer){graphicLayer.destroy();}graphicLayer=graphicLayerMapping[key]=$GraphicLayerFactory.create(grid);data=graphicLayer.data;if(!graphicLayer.isGridDataEmpty()){graphicLayer.initGraphics();}else{if(data&&data.eg!==undefined){console.log("eg in data: "+data.eg);}graphicLayer.updateMapExtent();}return graphicLayer;}},switchBaseMap:mstrmojo.emptyFn,addGraphicLayer:function addGraphicLayer(gridData){var key=gridData&&gridData.k;if(!key){return ;}this.initGraphicLayer({data:gridData});},removeGraphicLayer:function removeGraphicLayer(key){var graphicLayer;if(!key){return ;}if(!this.gridsMapping||!this.graphicLayerMapping){this.gridsMapping={};this.graphicLayerMapping={};}else{graphicLayer=this.graphicLayerMapping[key];if(graphicLayer&&graphicLayer.destroy instanceof Function){graphicLayer.destroy();}delete this.gridsMapping[key];if(this.cloudLayersMapping){delete this.cloudLayersMapping[key];}delete this.graphicLayerMapping[key];}this.updateMapToolbar();},updateGraphicLayer:function updateGraphicLayer(gridData,useRefresh){if(this.parent&&this.parent.excludeData){return ;}if(!!useRefresh){this.refreshGraphicLayer(gridData);}else{this.rebuildGraphicLayer(gridData);}},rebuildGraphicLayer:function rebuildGraphicLayer(gridData){var key=gridData&&gridData.k;if(!key){return ;}this.removeGraphicLayer(key);this.initGraphicLayer({data:gridData});this.highlightAllLayers();},refreshGraphicLayer:function refreshGraphicLayer(gridData){var key=gridData&&gridData.k,graphicLayer=this.graphicLayerMapping&&this.graphicLayerMapping[key],visMapBase=this.parent;if(!key||!graphicLayer){console.log("Fail to refresh graphic layer");return ;}if(!visMapBase.hasColorByOrSizeBy(key)&&graphicLayer.legend&&visMapBase.legendCon){graphicLayer.destroyLegend();visMapBase.legendCon.calculateLegendDockedPositions(visMapBase.getWidth(),visMapBase.getHeight());}graphicLayer.refresh(gridData);this.highlightAllLayers();},reorderGraphicLayers:function reorderGraphicLayers(layerKeyArr){var graphicLayerMapping=this.graphicLayerMapping,host=this.parent,key,i,il;layerKeyArr=layerKeyArr||(host&&host.layerIdxMappingArr);if(!layerKeyArr||!$ARR.isArray(layerKeyArr)||layerKeyArr.length<1||!graphicLayerMapping){return ;}for(i=0,il=layerKeyArr.length;i<il;i++){key=layerKeyArr[i];if(key&&!!graphicLayerMapping[key]){graphicLayerMapping[key].setLayerZIndex();}}},onSecondaryDataSliced:function onSecondaryDataSliced(key){this.forEachGraphicLayer(function(graphicLayer){if(graphicLayer.isAftLnTmptHit(key)){graphicLayer.initAffinityLineDataModel(graphicLayer.layerProps);graphicLayer.createAffinityLinesConfig();if(graphicLayer._viewer&&(typeof graphicLayer._viewer.reGenerateAffinityLineLayer==="function")){graphicLayer._viewer.reGenerateAffinityLineLayer();}}});},getWidgetProps:function getWidgetProps(){return this.parent&&this.parent.getProperties();},getBaseMapType:mstrmojo.emptyFn,getMapGeoExtent:function getMapGeoExtent(){var geoExtent;this.forEachGraphicLayer(function(graphicLayer){if(graphicLayer&&graphicLayer.getGeoExtent instanceof Function){if(!geoExtent){geoExtent=graphicLayer.getGeoExtent();}else{geoExtent.union(graphicLayer.getGeoExtent());}}});return geoExtent;},updateNeedUpdLayers:function updateNeedUpdLayers(map,layerKey){if(layerKey&&map.needUpdateLayers&&map.needUpdateLayers.length>0){var idx=map.needUpdateLayers.indexOf(layerKey);if(idx>=0){map.needUpdateLayers.splice(idx,1);}}},updateMapExtent:function updateMapExtent(layerKey){var map=this.parent;this.updateNeedUpdLayers(map,layerKey);if(map.needUpdateLayers.length>0){return ;}if(!this.baseLayer.isActive()){return ;}this.updateBaseMap();this.updateMapComponents(map);map.editorContentReady=true;map.updatePropEditor();if($MUTIL.checkHasFunction(map,"checkForMapReady")){map.checkForMapReady();}if(map.dynZoomStatus===$EnumDynamicZoomStatus.FIRST_ADD_GEO_ARR){map.dynZoomStatus=$EnumDynamicZoomStatus.FIRST_GEO_ADD_FINISHED;}},updateMapComponents:function updateMapComponentsAfterExtentChange(host){this.updateMapToolbar();host.toggleBaseMapLabels();this.reorderGraphicLayers();},updateBaseMap:function updateBaseMap(){var baseLayer=this.baseLayer;if(baseLayer.isSupport===true&&(this.hasInit!==true||this.isDynamicZoom()===true)&&(baseLayer.updateExtent instanceof Function)){this.hasInit=true;baseLayer.updateExtent(this.getMapGeoExtent());}},hasSelectedGraphics:function hasGraphicsSelected(){var hasSelected=false;this.forEachGraphicLayer(function(graphicLayer){hasSelected=graphicLayer&&graphicLayer.hasGraphicSelected();return !hasSelected;},null,true);return hasSelected;},clearAllSelectedGraphics:function clearAllSelectedGraphics(enableClearAll){this.forEachGraphicLayer(function(graphicLayer){graphicLayer.clearAllSelectedGraphics(enableClearAll);});},clearAllContextMenuSelection:function clearAllContextMenuSelection(){this.forEachGraphicLayer(function(graphicLayer){graphicLayer.clearAllContextMenuSelection();});},clearAllContextMenuSelectionHighLights:function clearAllContextMenuSelectionHighLights(){this.forEachGraphicLayer(function(graphicLayer){graphicLayer.clearAllContextMenuSelectionHighLights();});},updateCoordForAllGraphicLayers:mstrmojo.emptyFn,hideAllGraphicLayers:function hideAllGraphicLayers(){this.forEachGraphicLayer(function(graphicLayer){graphicLayer.setVisibility(false);});},destroyAllGraphicLayerViewers:function destroyAllGraphicLayerViewers(){this.forEachGraphicLayer(function(graphicLayer){graphicLayer.destroyViewer();},false,true);},buildAllGraphicLayerViewers:function buildAllGraphicLayerViewers(){this.forEachGraphicLayer(function(graphicLayer){graphicLayer.buildViewer();},false,true);},containsLayerInMap:function containsAnyLayerInMap(fnCall){var graphicLayerMapping=this.graphicLayerMapping,graphicLayer,layerKey;if(!graphicLayerMapping){return false;}for(layerKey in graphicLayerMapping){if(graphicLayerMapping.hasOwnProperty(layerKey)){graphicLayer=graphicLayerMapping[layerKey];if(graphicLayer&&graphicLayer.isVisible()&&graphicLayer[fnCall]&&graphicLayer[fnCall]()){return true;}}}return false;},isMapEnabledAffinityLine:function isMapEnabledAffinityLine(){return this.containsLayerInMap("isAffinityLineLayerEnabled");},isMapShownAffinityLine:function isMapDisplayAffinityLine(){return this.containsLayerInMap("isAffinityLineShown");},isMapHideAffinityLine:function isMapDisplayAffinityLine(){return this.containsLayerInMap("isAffinityLineHide");},showAllAffinityLinesLayer:function showAllAffinityLinesLayer(){this.forEachGraphicLayer(function(graphicLayer){graphicLayer.showAffinityLineLayer();});},hideAllAffinityLinesLayer:function hideAllAffinityLinesLayer(){this.forEachGraphicLayer(function(graphicLayer){graphicLayer.hideAffinityLineLayer();});},hideAffinityLinesLayer:function hideAffinityLinesLayer(graphics){var graphic=graphics&&graphics[0],layerKey=graphic&&graphic.getLayerKey(),graphicLayerMapping=this.graphicLayerMapping,graphicLayer=graphicLayerMapping&&graphicLayerMapping[layerKey];if(graphicLayer){graphicLayer.hideAffinityLineLayer();}},displayAffinityLinesLayer:function displayAffinityLinesLayer(graphics){var graphic=graphics&&graphics[0],layerKey=graphic&&graphic.getLayerKey(),graphicLayerMapping=this.graphicLayerMapping,graphicLayer=graphicLayerMapping&&graphicLayerMapping[layerKey];if(graphicLayer){graphicLayer.showAffinityLineLayer();}},forEachGraphicLayer:function forEachGraphicLayer(f,topToBottom,forceAll,scope){var map=this.parent,layerIdxMappingArr=map.layerIdxMappingArr,graphicLayerMapping=this.graphicLayerMapping,callFuncForGraphicLayer=function(graphicLayer,scope){if(scope){return f.call(scope,graphicLayer);}else{return f(graphicLayer);}},isVisible=function(graphicLayer){return graphicLayer&&(graphicLayer.isVisible instanceof Function)&&graphicLayer.isVisible();},graphicLayer,key,i,il;if(!graphicLayerMapping||Object.keys(graphicLayerMapping).length<1){return ;}if(!!topToBottom){if(!layerIdxMappingArr){return ;}for(i=0,il=layerIdxMappingArr.length;i<il;i++){key=layerIdxMappingArr[i];graphicLayer=graphicLayerMapping[key];if(!forceAll&&!isVisible(graphicLayer)){continue;}if(callFuncForGraphicLayer(graphicLayer,scope)===false){break;}}}else{for(key in graphicLayerMapping){if(graphicLayerMapping.hasOwnProperty(key)){graphicLayer=graphicLayerMapping[key];if(!forceAll&&!isVisible(graphicLayer)){continue;}if(callFuncForGraphicLayer(graphicLayer,scope)===false){break;}}}}},handleLassoDrawEnd:function handleLassoDrawEnd(selectionShape){var toolbar=this.toolbar;this.handleLassoSelection(selectionShape);if(toolbar&&(toolbar.resetSelectionState instanceof Function)){toolbar.resetSelectionState();}},handleLassoSelection:function handleLassoSelection(selectionShape){this.forEachGraphicLayer(function(graphicLayer){if(graphicLayer&&graphicLayer.handleLassoSelection instanceof Function){graphicLayer.handleLassoSelection(selectionShape);}});this.highlightAllLayers();var map=this.parent;map.endSelections();map.handleTemplateUnitSelections();},_preprocessSingleGrid:function _preprocessSingleGrid(grid){var parent=this.parent,data=grid&&grid.data,baseLayer=this.baseLayer,key,config,shapes,layers,props,rowHeaders,rowCount,xtab;if(!data||!data.k||!parent){return grid;}key=data.k;grid.key=key;grid.dropZones=parent.getDropZones(key);xtab=parent.fnGetWidget(key);grid.model=xtab&&xtab.model;grid.defn=xtab&&xtab.defn;props=data.vp||{};if(!props.sa&&!props[$EnumPropertyType.graphicType]&&!props.sm&&data.ghs){rowHeaders=data.ghs.rhs;rowCount=(!rowHeaders||!rowHeaders.items||!rowHeaders.items.length)?0:rowHeaders.items.length;props[$EnumPropertyType.graphicType]=(this.supportDensity&&rowCount>500)?$EnumGraphicType.Density:$EnumGraphicType.Marker;}grid.graphicType=this._getGraphicType(grid);if(!$MUTIL.checkDefined(props[$EnumPropertyType.layerName])){props[$EnumPropertyType.layerName]=parent.generateNewLayerName();}if(!$MUTIL.checkDefined(props[$EnumPropertyType.layerIdx])){props[$EnumPropertyType.layerIdx]=parent.generateNewLayerIdx();}grid.parent=this;if(grid.graphicType===$EnumGraphicType.Area){config=parent.getMapConfig()&&parent.getMapConfig().common;shapes=config&&config.shapes;layers=config&&config.layers;if(!!shapes){if(baseLayer&&baseLayer.isOnPremise){grid.polygonSource=$EnumPolygonSource.Cloud;}else{grid.polygonSource=$AMHelper.getPolygonSource(grid,shapes,layers,this.getBaseMapType());}}}this.gridsMapping[key]=grid;return grid;},getBaseMapConfig:function getBaseMapConfig(baseMapType){var widgetProps=this.getWidgetProps(),baseMapConfig={parent:this,baseMapType:baseMapType,GL_SUPPORTED:GL_SUPPORTED};if(!widgetProps){return baseMapConfig;}baseMapConfig.mvo=widgetProps.mvo;baseMapConfig.showZoomBtns=(widgetProps[$EnumPropertyType.showZoomBtns]!=="0");baseMapConfig.mapStyle=widgetProps[$EnumPropertyType.mapStyle];baseMapConfig.languageType=widgetProps[$EnumPropertyType.languageType]||$EnumLanguageType.English;this.loadZoomLevelAndPosition(widgetProps,baseMapConfig);this.loadMapboxLabelProps(widgetProps,baseMapConfig);return baseMapConfig;},loadZoomLevelAndPosition:function loadZoomLevelAndPosition(widgetProps,baseMapConfig){var enableSaving=widgetProps[$EnumPropertyType.zoomSetting]!==$EnumZoomBehavior.Automatic,isChecked=widgetProps[$EnumPropertyType.keepZoomAndPos]===true||widgetProps[$EnumPropertyType.keepZoomAndPos]==="true";if(enableSaving&&isChecked){try{baseMapConfig.originalZoom=parseFloat(widgetProps[$EnumPropertyType.zoomLevel]);baseMapConfig.originalLatLngCenter=JSON.parse(widgetProps[$EnumPropertyType.mapCenter]);baseMapConfig.originalBearing=parseFloat(widgetProps[$EnumPropertyType.mapBearing]);baseMapConfig.originalPitch=parseFloat(widgetProps[$EnumPropertyType.mapPitch]);}catch(e){$MUTIL.log("Parse Zoom Level and Center Point Error");}}},loadMapboxLabelProps:function loadMapboxLabelProps(widgetProps,baseMapConfig){var showlabels=widgetProps[$EnumPropertyType.showMapLable],labelsOnTop=widgetProps[$EnumPropertyType.mapLabelOnTop];if(showlabels!==undefined){baseMapConfig.showMapLabels=showlabels===true||showlabels==="true";}else{baseMapConfig.showMapLabels=DEFAULT_SHOW_MAP_LABELS;widgetProps[$EnumPropertyType.showMapLable]=DEFAULT_SHOW_MAP_LABELS;}if(labelsOnTop!==undefined){baseMapConfig.mapLabelsOnTop=labelsOnTop===true||labelsOnTop==="true";}else{baseMapConfig.mapLabelsOnTop=DEFAULT_MAP_LABELS_ON_TOP;widgetProps[$EnumPropertyType.mapLabelOnTop]=DEFAULT_MAP_LABELS_ON_TOP;}},getGraphicLayer:function getGraphicLayer(key){var graphicLayerMapping=this.graphicLayerMapping;if(key&&graphicLayerMapping){return graphicLayerMapping[key];}},getGraphicLayerByIdx:function getGraphicLayerByIdx(idx){idx=parseInt(idx);if(!isNaN(idx)){var firstLayerKey=this.parent&&this.parent.getGridKeyByIdx(0);return this.getGraphicLayer(firstLayerKey);}},getGraphicLayerCount:function getGraphicLayerCount(){return(!this.gridsMapping)?0:Object.keys(this.gridsMapping).length;},getLayerCount:function getLayerCount(){return this.getGraphicLayerCount()+1;},getActiveLayerCount:function getActiveLayerCount(){var count=0;this.forEachGraphicLayer(function(graphicLayer){if(graphicLayer&&graphicLayer.isActive()){count++;}},null,true);if(this.baseLayer&&this.baseLayer.isActive()){count++;}return count;},getVisibleGraphicLayerCount:function getVisibleGraphicLayerCount(){var count=0;this.forEachGraphicLayer(function(graphicLayer){if(graphicLayer){count++;}});return count;},getVisibleGraphicLayers:function getVisibleGraphicLayers(){var layers=[];this.forEachGraphicLayer(function(graphicLayer){if(graphicLayer){layers.push(graphicLayer.key);}});return layers;},needMapToolbar:function needMapToolbar(){var props=this.parent&&this.parent.getProperties();return !!props&&props[$EnumPropertyType.needMapToolbar]!=="0";},isDynamicZoom:function isDynamicZoom(){var widgetProps=this.getWidgetProps(),isDynamicZoomFlag=widgetProps&&(widgetProps.rosa===$EnumZoomBehavior.Automatic),map=this.parent;return isDynamicZoomFlag||map.dynZoomStatus===$EnumDynamicZoomStatus.FIRST_ADD_GEO_ARR;},_getGraphicType:function _getGraphicType(grid){var props=grid&&grid.data&&grid.data.vp,sa,graphicType;if(!props){return ;}graphicType=props[$EnumPropertyType.graphicType];if(!!graphicType&&(graphicType===$EnumGraphicType.Density)){if($MUTIL.isCanvasSupported()){graphicType=$EnumGraphicType.Density;}else{graphicType=$EnumGraphicType.Marker;mstrmojo.alert(mstrmojo.desc(9281,"Density Maps is not supported on this Browser version."));}}if(graphicType===$EnumGraphicType.Marker&&!(grid.dropZones.latitude&&grid.dropZones.longitude)&&!!sa&&sa==="1"){graphicType=$EnumGraphicType.Area;}return graphicType;},hideInfoWindow:function hideInfoWindow(){this.hideTooltip();},getNextDefaultAffinityLineColor:function getNextDefaultAffinityLineColor(){var colorIndex=this.affinityLineColorIndex++;return AffinityLineColors[colorIndex%(AffinityLineColors.length-1)];},getBaseLayerContainer:function getBaseLayerContainer(){var map=this.parent;if(map){return map.baseLayerDiv;}},restoreBaseLayerNode:function restoreBaseLayerNode(){var baseLayer=this.baseLayer,div_=baseLayer&&baseLayer.getNode(),baseLayerDiv=this.getBaseLayerContainer();if(baseLayerDiv&&div_){baseLayerDiv.appendChild(div_);}},restore:function restore(){if(!this.parent){return ;}var map=this.parent,lph=map.legendPlaceholder;this.restoreBaseLayerNode();if(lph&&lph.parentNode&&map.legendCon){lph.parentNode.replaceChild(map.legendCon.domNode,lph);}this._restoreToolbar(map.toolBarDiv);this.restoreToast();},_restoreToolbar:function _restoreToolbar(toolBarDiv){var toolbar=this.toolbar,contentDom=toolbar&&toolbar.domNode;if(toolBarDiv&&contentDom&&!toolBarDiv.contains(contentDom)){toolBarDiv.appendChild(toolbar.domNode);}},resize:function resize(){if(!this.parent){return ;}var map=this.parent,width=map.width,height=map.height,baseLayer=this.baseLayer,toolbar=this.toolbar;if(!baseLayer){return ;}if(map.needMapReadyEvent()){map.duringResize=true;baseLayer.isBaseMapReady=false;map.graphicsReady=false;}this.resizeGraphicLayers(width,height);if(toolbar){toolbar.resize();}baseLayer.resize(width,height);},getToastId:function getToastId(){return((this.parent&&this.parent.id)||this.id)+"-mojoMapToast";},showToast:function showToast(msg){var id=this.getToastId();this.destroyToast();mstrmojo.insert({id:id,scriptClass:"mstrmojo.Label",cssClass:"mapToastCss",text:msg}).render();this.restoreToast();},destroyToast:function destroyToast(){try{var id=this.getToastId(),toast=mstrmojo.all[id];if(toast){toast.destroy();}}catch(e){}},getToastNode:function getToastNode(){var id=this.getToastId(),toast=mstrmojo.all[id];return toast&&toast.domNode;},restoreToast:function restoreToast(){var id=this.getToastId(),mapDom=this.parent&&this.parent.domNode,toast=mstrmojo.all[id],toastDom=toast&&toast.domNode;if(mapDom&&toastDom){mapDom.appendChild(toastDom);}},hideTooltip:function hideTooltip(delay){if(this.tooltipWin){this.tooltipWin.hide(delay);}},preRefresh:function preRefresh(){var toolbar=this.toolbar;return toolbar&&toolbar.preRefresh();},unrender:function unrender(){if(this._super){this._super();}},destroyBaseLayer:function destroyBaseLayer(skipBaseMap){if(!skipBaseMap){$MUTIL.destroyObj(this.baseLayerFactory);}delete this.baseLayer;delete this.baseLayerFactory;},destroyGraphicLayers:function destroyGraphicLayers(){this.forEachGraphicLayer(function(graphicLayer){if(graphicLayer){graphicLayer.destroy();}},true,true);delete this.graphicLayerMapping;delete this.cloudLayersMapping;},destroyToolbar:function destroyToolbar(){$MUTIL.destroyObj(this.toolbar);delete this.toolbar;},destroy:function destroy(ignoreDom,skipBaseMap){this.destroyToolbar();delete this.tooltipWin;this.destroyGraphicLayers();this.destroyBaseLayer(skipBaseMap);delete this.gridsMapping;delete this.parent;this._super(ignoreDom);}});}());