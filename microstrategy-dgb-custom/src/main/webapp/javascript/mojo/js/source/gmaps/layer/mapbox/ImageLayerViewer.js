(function(){mstrmojo.requiresCls("mstrmojo.gmaps.layer.mapbox.GraphicLayerViewer");var emptyFn=mstrmojo.emptyFn,SCALE=1.5,HEIGHT=14,IMAGE_SIZE=0.7;mstrmojo.gmaps.layer.mapbox.ImageLayerViewer=mstrmojo.declare(mstrmojo.gmaps.layer.mapbox.GraphicLayerViewer,null,{scriptClass:"mstrmojo.gmaps.layer.mapbox.ImageLayerViewer",type:"symbol",markerType:null,shapeFmtNames:{fillOpacity:"icon-opacity"},imgId:null,imgUrl:"../images/balloonpp.png",getExtraSourceProps:function getExtraSourceProps(){return{buffer:30};},getLayout:function getLayout(){return{"icon-image":this.getIconImg(),"icon-size":IMAGE_SIZE,"icon-allow-overlap":true,"icon-offset":[0,-HEIGHT]};},getLayoutContextMenu:function getLayoutContextMenu(){return this.getLayoutSelection();},getLayoutHover:function getLayoutContextMenu(){return this.getLayoutSelection();},getLayoutSelection:function getLayoutSelection(){return{"icon-image":this.getIconImg(),"icon-size":IMAGE_SIZE*SCALE,"icon-allow-overlap":true,"icon-offset":[0,-HEIGHT]};},getFillOpacity:function getFillOpacity(){return this.getFillOpacityForZoomAnimation(1);},getPaintContextMenu:emptyFn,getIconImg:function getIconImg(){return this.execMethodOfParent("hasImgThreshold")?"{imgUrl}":this.getIconInStudio(this.imgUrl);},getLabelOffset:function getLabelOffset(){return[0,10];}});}());