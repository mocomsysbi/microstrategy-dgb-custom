(function(){function printArray(array,log){}mstrmojo.requiresCls("mstrmojo.AndroidBaseImageLayout","mstrmojo.nativeandroid._VisSelectionAndLinkDrillHelper");mstrmojo.NativeAndroidBaseImageLayout=mstrmojo.declare(mstrmojo.AndroidBaseImageLayout,[mstrmojo.nativeandroid._VisSelectionAndLinkDrillHelper],{scriptClass:"mstrmojo.NativeAndroidBaseImageLayout",getMapAndDraw:function(){var me=this;if(!me.coords){if(me.CONSTANTS.DEBUG.LOG){console.log("\ndownload new coords");}if(me.CONSTANTS.DEBUG.PERFORMANCE){var beforeSvRqt=new Date();}if(typeof mstrApp!=="undefined"&&mstrApp.serverRequest){var xhrCfg={submission:function(){me.totalWidget.showLoadingIndicator();printArray(undefined,"NativeAndroidBaseImageLayout get map submitted");},complete:function(){printArray(undefined,"NativeAndroidBaseImageLayout get map completed");},success:function(res){printArray(undefined,"NativeAndroidBaseImageLayout get map succeeded");me.totalWidget.hideLoadingIndicator();if(!me.hasRendered){return ;}if(me.CONSTANTS.DEBUG.TOUCH_WHILE_LOADING){console.log("mapFileIndex: "+me.mapFileIndex+" receive success Time: "+getTime());}me.isMapLoadFailed=false;if(!res){return ;}if(me.CONSTANTS.DEBUG.PERFORMANCE){var afterSvRqt=new Date();console.log("\nSvRqt time: "+(afterSvRqt-beforeSvRqt));}var coords=res.coords;if(coords){me.totalWidget.prepareCoordsName(coords);me.totalWidget.mapFilePool[me.mapFileName]=coords;me.coords=coords;me.initDrawMapWithCoords();}else{me.isMapLoadFailed=true;var errorMessage="The Image Map / Shape file cannot be found.";var localeString=window.getLocaleString?window.getLocaleString("IMAGELAYOUT_HTML_FILE_NOT_FOUNDED","The Image Map / Shape file cannot be found."):mstrmojo.desc(9854,errorMessage);me.renderErrorMessage(localeString);}},failure:function(res){printArray(undefined,"NativeAndroidBaseImageLayout get map failed");me.totalWidget.hideLoadingIndicator();if(!me.hasRendered){return ;}if(me.CONSTANTS.DEBUG.TOUCH_WHILE_LOADING){console.log("mapFileIndex: "+me.mapFileIndex+" receive failure Time: "+getTime());}me.isMapLoadFailed=true;var errorMessage="The Image Map / Shape file cannot be found.";var localeString=window.getLocaleString?window.getLocaleString("IMAGELAYOUT_HTML_FILE_NOT_FOUNDED","The Image Map / Shape file cannot be found."):mstrmojo.desc(9854,errorMessage);me.renderErrorMessage(localeString);}};var params={taskId:"getMapCoordinates"};var vp=me.model.vp;if(me.totalWidget&&me.totalWidget.hasMultiAttr){params.coordinatesFile=me.totalWidget.getMapFilePath(me.mapFileIndex);}else{if(vp&&vp.mf){params.coordinatesFile=vp.mf;}}if(!!params.coordinatesFile&&params.coordinatesFile.charAt(0)!="/"){params.coordinatesFile="/"+params.coordinatesFile;}me.mapFileName=params.coordinatesFile;console.log("mapFileIndex: "+me.mapFileIndex+"  mapFileName: "+me.mapFileName);var config={src:"postBuildRendering",noErrorMessage:true,showProgress:true,hideProgress:true,progressStateText:["Loading Map File for Sub-ImageLayout"],silent:true,skipLogin:true};if(me.CONSTANTS.DEBUG.TOUCH_WHILE_LOADING){console.log("mapFileIndex: "+me.mapFileIndex+" send Request Time: "+getTime());}me.requestSend=new Date();var mapFileName=me.mapFileName,mapFilePool=me.totalWidget.mapFilePool,coords=mapFileName&&mapFilePool.hasOwnProperty(mapFileName);printArray([mapFileName],"mapFileName");printArray([coords],"coords");printArray([me.mapFileIndex],"mapFileIndex");printArray([me.totalWidget.firstSuccessLoadedMapFileIndex],"firstSuccessLoadedMapFileIndex");if(coords){printArray(undefined,"have coords already");me.coords=mapFilePool[mapFileName];me.initDrawMapWithCoords();}else{if(me.mapFileIndex>=me.totalWidget.firstSuccessLoadedMapFileIndex){printArray(undefined,"send server request");mstrApp.serverRequest(params,xhrCfg,config);}else{printArray(undefined,"render error message");me.isMapLoadFailed=true;var errorMessage="The Image Map / Shape file cannot be found.";var localeString=window.getLocaleString?window.getLocaleString("IMAGELAYOUT_HTML_FILE_NOT_FOUNDED","The Image Map / Shape file cannot be found."):mstrmojo.desc(9854,errorMessage);me.renderErrorMessage(localeString);}}}}else{console.log("mapFileIndex: "+me.mapFileIndex+"  mapFileName: "+me.mapFileName);me.drawMap();me.highlightPoint();}this.hasDrawnMap=true;}});})();