(function(){mstrmojo.gmaps.layer._LassoSelectHelper=mstrmojo.provide("mstrmojo.gmaps.layer._LassoSelectHelper",{_mixinName:"mstrmojo.gmaps.layer._LassoSelectHelper",handleLassoSelection:function handleLassoSelection(selectionShape){var selectedGraphics=this.searchGraphicsContained(selectionShape),i,il,map=this.map,vizBox=map&&map.parent;if(selectedGraphics&&selectedGraphics.length>0){for(i=0,il=selectedGraphics.length;i<il;i++){this.addToSelectedGraphics(selectedGraphics[i]);}map.displayVizBoxVisFilterIndicator(true,vizBox);}},searchGraphicsContained:function searchGraphicsContained(selectionShape){var _viewer=this._viewer,selectedGraphics=this.selectedGraphics||[],graphics;if(_viewer){graphics=_viewer.getGraphicsContained(selectionShape,selectedGraphics.length>0);if(graphics){_viewer.highlightGraphics(selectedGraphics.concat(graphics));}return graphics;}}});}());