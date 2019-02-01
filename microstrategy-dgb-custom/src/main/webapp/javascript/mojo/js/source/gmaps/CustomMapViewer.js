(function(){mstrmojo.requiresCls("mstrmojo.gmaps.MapEnums","mstrmojo.gmaps.MapViewer","mstrmojo.gmaps.MapToolbar","mstrmojo.gmaps._CustomMapInteractivity");var $GMAPS=mstrmojo.gmaps,$MUTIL=$GMAPS.MapUtils,$EnumPropertyType=$GMAPS.EnumPropertyType,$EnumPolygonSource=$GMAPS.EnumPolygonSource;mstrmojo.gmaps.CustomMapViewer=mstrmojo.declare(mstrmojo.gmaps.MapViewer,[mstrmojo.gmaps._CustomMapInteractivity],{scriptClass:"mstrmojo.gmaps.CustomMapViewer",graphicLayerDiv:null,cloudLayersMapping:null,cloudLayerInit:false,supportDensity:true,init:function init(props){this._super(props);this.cloudLayersMapping={};this.initGraphicLayerContainer();},initGraphicLayerContainer:function initGraphicLayerContainer(){var map=this.parent,graphicLayerDiv=this.graphicLayerDiv=this.graphicLayerDiv||document.createElement("div");if(!map){return ;}$MUTIL.setNodeAttributes(graphicLayerDiv,{id:map.id+"-graphicLayerDiv"});$MUTIL.setCssStyles(graphicLayerDiv,{position:"absolute",top:"0px",left:"0px"});$MUTIL.setCssStyles(graphicLayerDiv,{width:map.getWidth()+"px",height:map.getHeight()+"px"});this.addGraphicLayerContainer();},addGraphicLayerContainer:function addGraphicLayerContainer(){var map=this.parent,mapDiv=map&&map.mapDiv,graphicLayerDiv=this.graphicLayerDiv;if(!mapDiv.contains(graphicLayerDiv)){$MUTIL.appendNode(mapDiv,graphicLayerDiv);}},initAllLayers:function initAllLayers(){if(!this.baseLayer){this._super();this.initGraphicLayers();}else{this._super();}},initGraphicLayer:function initGraphicLayer(grid){var graphicLayer=this._super(grid);if(graphicLayer&&grid.polygonSource===$EnumPolygonSource.Cloud){this.cloudLayersMapping[grid.key]=graphicLayer;}},initMapToolbar:function initMapToolbar(){if(!this.parent){return ;}var map=this.parent,toolbar=this.toolbar=new mstrmojo.gmaps.MapToolbar({map:map,parent:this}),toolBarDiv=map.toolBarDiv,mapDiv=map.mapDiv;if(!!toolbar&&!!toolBarDiv&&!!mapDiv){toolbar.render();mapDiv.style.height=parseInt(this.height)-toolBarDiv.offsetHeight+"px";}},refreshCloudLayers:function refreshCloudLayers(){var cloudLayersMapping=this.cloudLayersMapping,cloudLayer,key;if(!cloudLayersMapping){return ;}for(key in cloudLayersMapping){if(cloudLayersMapping.hasOwnProperty(key)){cloudLayer=cloudLayersMapping[key];if(cloudLayer){cloudLayer.refresh();}}}},refreshMapBoxPolygonLayers:function refreshMapBoxPolygonLayers(){this.forEachGraphicLayer(function(graphicLayer){if(graphicLayer&&graphicLayer.scriptClass==="mstrmojo.gmaps.layer.MapBoxPolygonLayer"){graphicLayer.refresh();}});},loadExistingBaseLayer:function loadExistingBaseLayer(baseLayer){this._super(baseLayer);this.cloudLayerInit=true;},switchBaseMap:function switchBaseMap(baseMapType){var visMap=this.parent,baseLayerDiv=visMap&&visMap.baseLayerDiv;if(!baseLayerDiv||visMap&&visMap.excludeData){return ;}visMap.clearMapError();this.hasInit=false;this.cloudLayerInit=false;baseLayerDiv.innerHTML="";this.initBaseLayer(baseMapType);this.refreshMapBoxPolygonLayers();},restore:function restore(){this._super();this.addGraphicLayerContainer();},resizeGraphicLayers:function resizeGraphicLayers(width,height){var graphicLayerDiv=this.graphicLayerDiv;if(graphicLayerDiv&&$MUTIL.checkVal(width)&&$MUTIL.checkVal(height)){$MUTIL.setCssStyles(graphicLayerDiv,{height:height+"px",width:width+"px"});}this.forEachGraphicLayer(function(graphicLayer){graphicLayer.resize(width,height);},null,true);},updateCoordForAllGraphicLayers:function updateCoordForAllGraphicLayers(){$MUTIL.showWait();this.applyViewPort2Graphics(null);var timerid_handleGraphicsTransform=mstrmojo.PerformanceLogOutput.startTimer({functionName:"MapViewer.handleGraphicsTransform: ",purpose:"graphic transform"});this.parent.needUpdateGraphicLayersCnt=this.getVisibleGraphicLayerCount();this.forEachGraphicLayer(function(graphicLayer){graphicLayer.updateGraphics();});mstrmojo.PerformanceLogOutput.endTimer(timerid_handleGraphicsTransform);$MUTIL.hideWait();},applyViewPort2Graphics:function(fixture){var viewport=this.baseLayer&&this.baseLayer.getViewport()||fixture;var div=this.graphicLayerDiv;if(div){div.style.clip=viewport;div.style.width="100%";}},getBaseMapType:function getBaseMapType(){var props=this.getWidgetProps();return props&&props[$EnumPropertyType.baseMapType];},destroy:function destroy(ignoreDom,skipBaseMap){this.removeEventListeners();this._super(ignoreDom,skipBaseMap);}});}());