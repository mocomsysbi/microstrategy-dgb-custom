(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.vi.ui.rw._HasVisSelections","mstrmojo.gmaps.MapUtils");var SELECTION_TYPE=mstrmojo.vi.ui.rw.SelectionType,$MAPUTIL=mstrmojo.gmaps.MapUtils,$ARR=mstrmojo.array;mstrmojo.gmaps._SupportMapBrushesAndHighlights=mstrmojo.provide("mstrmojo.gmaps._SupportMapBrushesAndHighlights",{_mixinName:"mstrmojo.gmaps._SupportMapBrushesAndHighlights",mapSelectionType:SELECTION_TYPE.METRICS,init:function init(props){if(this._super){this._super(props);}},highlight:function highlight(selTy,data,fromExpression){if(this._super){this._super.apply(this,arguments);}this.clearSelections();var mapViewer=this.mapViewer,graphicLayerMapping=mapViewer&&mapViewer.graphicLayerMapping,key;if(!graphicLayerMapping||Object.keys(graphicLayerMapping).length<1){return ;}for(key in graphicLayerMapping){var graphicLayer=graphicLayerMapping[key];if(selTy==="allLayers"){var value=data[graphicLayer.key];if(value){graphicLayer.highlight(value.selType,value.selHash,fromExpression);}}else{graphicLayer.highlight(selTy,data,fromExpression);}}if(mapViewer){mapViewer.highlightAllLayers();}},clearSelections:function clearSelections(enableClearAll){if(this._super){this._super();}var mapViewer=this.mapViewer;if($MAPUTIL.checkHasFunction(mapViewer,"clearAllSelectedGraphics")){mapViewer.clearAllSelectedGraphics(enableClearAll);}},clearCxtMnuSelection:function clearCxtMnuSelection(){if(this._super){this._super();}var mapViewer=this.mapViewer;if($MAPUTIL.checkHasFunction(mapViewer,"clearAllContextMenuSelection")){mapViewer.clearAllContextMenuSelection();}},clearContextMenuSelectionHighLights:function clearContextMenuSelectionHighLights(){var mapViewer=this.mapViewer;if($MAPUTIL.checkHasFunction(mapViewer,"clearAllContextMenuSelectionHighLights")){mapViewer.clearAllContextMenuSelectionHighLights();}}});}());