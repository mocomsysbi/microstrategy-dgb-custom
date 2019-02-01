(function(){var VIS_LIST={NetworkVisualizationStyle:{b:"vi-network.js",s:"VisualizationServerJsonDataStyle",c:"netviz.VisNetwork",oivmb:"oivm-network.js",vib:"vi-network.js"},ReportTimelineAjaxVisualizationStyle:{s:"TimelineMojoVisualizationDataStyle",c:"VisTimeline"},visAjaxDatePicker:{s:"AjaxDatePickerReportStyle",c:"VisDateSelection"},SurveyVisualizationStyle:{s:"VisualizationDataStyle",c:"SurveyVis"},VIHeatMapVisualizationStyle:{b:"vi-heatmap.js",s:"VisualizationServerJsonDataStyle",c:"heatmap.vi.VisHeatMap",oivmb:"oivm-heatmap.js",vib:"vi-heatmap.js"},KPICardVisualizationStyle:{b:"vi-kpi.js",s:"VisualizationServerJsonDataStyle",c:"kpicard.VisKPICard",lib:'[["libraries/echarts.common.min.js"],["libraries/slick/slick.min.js"]]'},GraphMatrixVisualizationStyle:{b:"vi-gm.js",s:"VisualizationServerJsonDataStyle",c:"gm.VisGraphMatrix",oivmb:"oivm-gm.js",vib:"vi-gm.js"},ESRIMapVisualizationStyle:{b:"mojo-map.js",s:"MojoXtabMapStyle",c:"VisMapBase"},MapboxVisualizationStyle:{b:"mojo-map.js",s:"MojoXtabMapStyle",c:"mapbox.VisMapbox",lib:'[["libraries/mapbox/mapbox-gl.js"],["libraries/mapbox/supercluster.min.js"],["libraries/mapbox/turf.min.4.7.3.js"]]'},NewGraphMatrixVisualizationStyle:{b:"vi-ngm.js",s:"VisualizationServerJsonDataStyle",c:"ngm.VisNewGraphMatrix",lib:'[["../VisFramework/ngm/dist/bundle/ngm.js"]]',oivmb:"oivm-ngm.js",vib:"vi-ngm.js"},GoogleMapVisualizationStyle:{b:"mojo-map.js",s:"MojoXtabMapStyle",c:"VisMapBase"}};var WIDGET_VIS_MAP={"com.microstrategy.web.vf.viewer.EsriMapApplicationViewer":"ESRIMapVisualizationStyle","com.microstrategy.web.vf.viewer.HeatMapApplicationViewer":"VIHeatMapVisualizationStyle","com.microstrategy.flex.viewer.GraphMatrixViewer":"GraphMatrixVisualizationStyle","com.microstrategy.flex.viewer.NewGraphMatrixViewer":"NewGraphMatrixVisualizationStyle","com.microstrategy.web.vf.viewer.DatePickerApplicationViewer":"visAjaxDatePicker","com.microstrategy.flex.viewer.NetViz":"NetworkVisualizationStyle"};mstrmojo.ExpressVisList=mstrmojo.provide("mstrmojo.ExpressVisList",{getVis:function getVis(styleName){return VIS_LIST[styleName]||(mstrConfig&&mstrConfig.pluginsVisList&&mstrConfig.pluginsVisList[styleName])||null;},findVisName:function(widgetName){return WIDGET_VIS_MAP[widgetName]||(mstrConfig&&mstrConfig.pluginsWidgetVisMap[widgetName])||null;},findWidgetName:function findWidgetName(visName){var wn;for(var i in WIDGET_VIS_MAP){if(WIDGET_VIS_MAP.hasOwnProperty(i)&&WIDGET_VIS_MAP[i]===visName){wn=i;break;}}if(!wn&&mstrConfig&&mstrConfig.pluginsWidgetVisMap){for(var i in mstrConfig.pluginsWidgetVisMap){if(mstrConfig.pluginsWidgetVisMap.hasOwnProperty(i)&&mstrConfig.pluginsWidgetVisMap[i]===visName){wn=i;break;}}}return wn;},getVisClass:function getVisClass(cls,defn){if(defn.txi&&defn.t===115){cls=mstrmojo.DynamicClassFactory.newComponent(cls,[mstrmojo._CanSupportTransaction,mstrmojo._IsEditableXtab]);}return cls;}});}());