(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.vi.viz");mstrmojo.requiresClsP("mstrmojo.vi.viz","KPICardVisualizationHelper","KnownVisualizations");var $MOJO=mstrmojo,$HASH=$MOJO.hash,$VIZ=$MOJO.vi.viz,$GRID="Grid",$KNOWN_VIZ=$VIZ.KnownVisualizations;function getTemplateInfo(node){var gsi=$HASH.copy(node.data.gsi),whichMetricsAxis=gsi.tma===1?"rows":"cols",metricsAxis=gsi[whichMetricsAxis],mx=gsi.mx;gsi[whichMetricsAxis]=metricsAxis.filter(function(unit){return unit.t!==-1&&unit.did!=="-1";});if(mx){mx.forEach(function(m){m.t=4;});}return gsi;}function combineDropZoneActions(node,kpicardHelper,actions,templateActions){var dzActions=kpicardHelper.getAddDropZonesAction();if(dzActions.actions.length){actions.push(dzActions);}return kpicardHelper.getXml();}function transitionToKPICard(actions,vis,visId){var templateActions=[];var kpicardHelper=new $VIZ.KPICardVisualizationHelper({node:vis.node});var gsi=getTemplateInfo(visId===$KNOWN_VIZ.MAPBOX?vis.getTopLayerHost().node:vis.node);var rows=gsi.rows;var cols=gsi.cols;var metrics=gsi.mx;var attrs=rows.concat(cols);if(attrs.length>0){kpicardHelper.breakByAttribute=attrs[0];if(attrs.length>1){for(var i=1;i<attrs.length;i++){if(attrs[i].did!==attrs[0].did){kpicardHelper.trendAttribute=attrs[i];break;}}}}if(metrics.length>0){kpicardHelper.metric=metrics[0];}return combineDropZoneActions.call(this,vis.node,kpicardHelper,actions,templateActions);}mstrmojo.vi.viz.KPICardVisualizationTransition=mstrmojo.declare(mstrmojo.vi.viz.VisualizationTransition,null,{scriptClass:"mstrmojo.vi.viz.KPICardVisualizationTransition",transitionDropZones:function transitionDropZones(actions,vt){var newWidgetProp="";var vis=this.vis,data=vis.node.data,curVisName=data.visName?data.visName:$GRID,curVisId=$KNOWN_VIZ.getDefinition(curVisName).id;if(curVisId!==$KNOWN_VIZ.KPICARD){newWidgetProp=transitionToKPICard.call(this,actions,this.vis,curVisId);}return{wp:newWidgetProp,handled:false};}});}());