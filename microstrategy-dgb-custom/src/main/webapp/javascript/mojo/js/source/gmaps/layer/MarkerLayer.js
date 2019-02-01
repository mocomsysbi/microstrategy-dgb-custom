(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.gmaps.MapUtils","mstrmojo.gmaps.layer.AbstractMarkerLayer","mstrmojo.gmaps.layer.GraphicLayerViewerFactory","mstrmojo.gmaps.layer.mapbox.ImageLayerViewer");var $MOJO=mstrmojo,$HASH=$MOJO.hash,$GMAPS=$MOJO.gmaps,$MUTIL=$GMAPS.MapUtils,$EnumPropertyType=$GMAPS.EnumPropertyType,$EnumClusterMode=$GMAPS.EnumClusterMode,$EnumMarkerType=$GMAPS.EnumMarkerType,$GraphicLayerViewerFactory=$GMAPS.layer.GraphicLayerViewerFactory;mstrmojo.gmaps.layer.MarkerLayer=mstrmojo.declare(mstrmojo.gmaps.layer.AbstractMarkerLayer,null,{scriptClass:"mstrmojo.gmaps.layer.MarkerLayer",isClustered:null,clusterMode:null,clusterRadius:50,clusterMaxZoom:22,secondaryModel:null,showOneMarkerForSameLocation:false,wpDisPlayAffinityLines:false,wpDrawArcsLines:null,wpMaxLineThickness:null,supportImgThreshold:true,setClusterMode:function setClusterMode(clusterMode){if($MUTIL.checkDefined(clusterMode)){this.clusterMode=clusterMode;switch(this.clusterMode){case $EnumClusterMode.ON:case $EnumClusterMode.PIE:case $EnumClusterMode.MOBILE_ON:this.isClustered=true;break;case $EnumClusterMode.OFF:case $EnumClusterMode.MOBILE_OFF:default:this.isClustered=false;break;}}if(this.wpDisPlayAffinityLines){this.isClustered=false;}},initAffinityLineDataModel:function initAffinityLineDataModel(layerProps){var tempKey=layerProps[$EnumPropertyType.affinityLineGrid],map=this.parent&&this.parent.parent,tempData=map&&map.getAffinityLineTemplate(tempKey);this.secondaryModel=this.addDisposable(new mstrmojo.models.template.DataInterface(tempData));},loadLayerProps:function loadLayerProps(layerProps){if(!layerProps){return ;}this._super(layerProps);if(layerProps[$EnumPropertyType.showAffinityLines]==="1"){this.wpDisPlayAffinityLines=true;this.wpDrawArcsLines=layerProps[$EnumPropertyType.showArcsLines];this.wpMaxLineThickness=parseFloat(layerProps[$EnumPropertyType.maxLineThickness]);this.initAffinityLineDataModel(layerProps);}if(layerProps[$EnumPropertyType.dm]==="1"){this.showOneMarkerForSameLocation=true;}this.setClusterMode(layerProps[$EnumPropertyType.clusterMode]);this.clusterRadius=parseInt(layerProps[$EnumPropertyType.clusterRadius],10)||this.clusterRadius;this.clusterMaxZoom=parseInt(layerProps[$EnumPropertyType.clusterMaxZoom],10)||this.clusterMaxZoom;if(layerProps[$EnumPropertyType.imageUrl]!==undefined){this.imageMarkerUrl=layerProps[$EnumPropertyType.imageUrl];}},switchClusterMode:function swithClusterMode(clusterMode){var _viewer=this._viewer;if(!_viewer){return ;}$MUTIL.showWait();this.setClusterMode(clusterMode);$GraphicLayerViewerFactory.callFnForViewer(_viewer,"setClusterMode",this.clusterMode,this.isClustered);_viewer.highlightGraphics(this.selectedGraphics);this.setVisibility(this.isVisible());$MUTIL.hideWait();},changeClusterProps:function changeClusterProps(props){var _viewer=this._viewer;if(!_viewer){return ;}$MUTIL.showWait();$GraphicLayerViewerFactory.callFnForViewer(_viewer,"changeClusterProps",props);_viewer.highlightGraphics(this.selectedGraphics);this.setVisibility(this.isVisible());$MUTIL.hideWait();},changeClusterRadius:function changeClusterRadius(clusterRadius){this.clusterRadius=clusterRadius;this.changeClusterProps({clusterRadius:clusterRadius});},changeClusterMaxZoom:function changeClusterMaxZoom(clusterMaxZoom){this.clusterMaxZoom=clusterMaxZoom;this.changeClusterProps({clusterMaxZoom:clusterMaxZoom});},switchMarkerType:function switchMarkerType(markerType){var _viewer=this._viewer,map=this.map,isMapbox=map.scriptClass==="mstrmojo.mapbox.VisMapbox",needRebuildViewer;if(!_viewer){return ;}$MUTIL.showWait();this.setVisibility(false);needRebuildViewer=isMapbox&&(_viewer instanceof mstrmojo.gmaps.layer.mapbox.ImageLayerViewer||markerType==$EnumMarkerType.Image||_viewer instanceof mstrmojo.gmaps.layer.mapbox.CircleLayerViewer||markerType==$EnumMarkerType.Circle);if(needRebuildViewer){this.buildViewer();}else{if($MUTIL.checkHasFunction(_viewer,"setMarkerType")){_viewer.setMarkerType(markerType);}_viewer.highlightGraphics(this.selectedGraphics);}map.refreshLegendColorByData(this.key);this.setVisibility(this.isVisible());$MUTIL.hideWait();},isMarkerMap:function(){return true;},getViewerProps:function getViewerProps(){return $HASH.copy({markerType:this.getMarkerType(),imageMarkerUrl:this.imageMarkerUrl,isCluster:!!this.isClustered,isPieBubble:!!this.isPieBubble,clusterMode:this.clusterMode,clusterRadius:this.clusterRadius,clusterMaxZoom:this.clusterMaxZoom},this._super());},sliceEnabled:function(){return this.clusterMode===$EnumClusterMode.PIE;}});}());