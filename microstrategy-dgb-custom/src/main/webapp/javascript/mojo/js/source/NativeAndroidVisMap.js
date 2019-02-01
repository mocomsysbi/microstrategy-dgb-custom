(function(){mstrmojo.requiresCls("mstrmojo.AndroidVisMap","mstrmojo.NativeAndroidBaseImageLayout","mstrmojo.nativeandroid._VisSelectionAndLinkDrillHelper","mstrmojo.dom");var $DOM=mstrmojo.dom;function createSingleXhrCfg(widget,xhrCfgs,i){return{success:function(res){console.log("i: "+i);console.log("server request received success of map index: "+widget.firstSuccessLoadedMapFileIndex);if(!res){return ;}if(i>widget.firstSuccessLoadedMapFileIndex){return ;}var coords=res.coords;if(coords){widget.prepareCoordsName(coords);widget.mapFilePool[widget.requestParams.coordinatesFile]=coords;}widget.drawMultiLayouts(coords);},failure:function(res){alert(res.message);console.log("i: "+i);console.log("server request received failed of map index: "+widget.firstSuccessLoadedMapFileIndex);widget.firstSuccessLoadedMapFileIndex+=1;if(widget.firstSuccessLoadedMapFileIndex<widget.totalSubWidgetCount){widget.xhrCfg=xhrCfgs[widget.firstSuccessLoadedMapFileIndex];widget.requestParams.coordinatesFile=widget.getMapFilePath(widget.firstSuccessLoadedMapFileIndex);mstrApp.serverRequest(widget.requestParams,widget.xhrCfg,widget.requestConfig);console.log("server request send of map index: "+widget.firstSuccessLoadedMapFileIndex);}else{widget.aspectRatio=1;widget.drawMultiLayoutsWithAspectRatio();}}};}function createXhrCfgs(widget){var xhrCfgs=[],N=widget.totalSubWidgetCount,i;for(i=0;i<N;i++){xhrCfgs.push(null);}for(i=0;i<N;i++){xhrCfgs[i]=createSingleXhrCfg(widget,xhrCfgs,i);}return xhrCfgs;}function createAutoTestHandler(){var me=this;var getCenterForAutoTest=function(row,col,name){var row=parseInt(row,10),col=parseInt(col,10);var position={x:-10000,y:-10000};var miniChart=me.getMiniChart(row,col);if(miniChart){var centers=miniChart.polygonCenters||miniChart.coords;if(centers){var center=centers[name][0],centerObj={x:center[0],y:center[1]};var mapOffsetObj={x:miniChart.leftOffset,y:miniChart.topOffset};var imageLayoutTable=me.imageLayoutTable,curChartH=imageLayoutTable.chartH*imageLayoutTable.manager.heightScale,curChartW=imageLayoutTable.chartW*imageLayoutTable.manager.widthScale,miniChartOffsetObj={x:curChartW*col,y:curChartH*row+me.subTitleHeight};var scrollOrigin=imageLayoutTable._scroller.origin,scrollOffsetObj={x:scrollOrigin.x,y:scrollOrigin.y};var widgetOffset=$DOM.position(me.domNode,true);position={x:parseInt(centerObj.x+mapOffsetObj.x+miniChartOffsetObj.x-scrollOffsetObj.x+widgetOffset.x,10),y:parseInt(centerObj.y+mapOffsetObj.y+miniChartOffsetObj.y-scrollOffsetObj.y+widgetOffset.y,10)};}else{}}if(ImageLayoutJSInterface&&ImageLayoutJSInterface.autoTest_setResult){ImageLayoutJSInterface.autoTest_setResult(position.x,position.y);}return position;};window.getCenterForAutoTest=getCenterForAutoTest;this.getCenterForAutoTest=getCenterForAutoTest;}mstrmojo.NativeAndroidVisMap=mstrmojo.declare(mstrmojo.AndroidVisMap,[mstrmojo.nativeandroid._VisSelectionAndLinkDrillHelper],{scriptClass:"mstrmojo.NativeAndroidVisMap",forAutoTest:false,render:function rnd(){mstrMobileTransport.beforeRenderStart();if(this._super){this._super();}createAutoTestHandler.call(this);},initImageLayoutTable:function initImageLayoutTable(props){if(this._super){this._super(props);}mstrMobileTransport.onRenderComplete();},layoutSubwidgets:function layoutSubwidgets(){var me=this;if(!me.manager){me.manager=new mstrmojo.WidgetMatrixManagerForAndroid();}if(me.hasMultiAttr){if(mstrApp!==undefined&&mstrApp.serverRequest){me.xhrCfgs=createXhrCfgs(me);me.xhrCfg=me.xhrCfgs[0];me.firstSuccessLoadedMapFileIndex=0;me.requestParams={taskId:"getMapCoordinates",coordinatesFile:me.getMapFilePath(me.firstSuccessLoadedMapFileIndex)};me.requestConfig={src:"postBuildRendering",noErrorMessage:true,showProgress:false,hideProgress:false,progressStateText:["Loading Map File for Aspect Ratio"],silent:true,skipLogin:true};var coords=me.mapFilePool[me.requestParams.coordinatesFile];if(coords){me.drawMultiLayouts(coords);}else{mstrApp.serverRequest(me.requestParams,me.xhrCfg,me.requestConfig);console.log("server request send of map index: "+me.firstSuccessLoadedMapFileIndex);}}}else{me.finalRowCnt=1;me.finalColCnt=1;me.cellWidth=me.getWidth();me.cellHeight=me.getHeight();me.resizeCellFromStoration();var props=me.createPropsForImageLayoutTable();me.initImageLayoutTable(props);}},createBaseImageLayout:function createBaseImageLayout(props){return new mstrmojo.NativeAndroidBaseImageLayout(props);}});})();