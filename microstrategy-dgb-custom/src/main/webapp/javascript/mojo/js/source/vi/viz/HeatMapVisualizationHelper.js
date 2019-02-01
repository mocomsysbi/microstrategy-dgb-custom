(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.vi.viz.DropZoneHelper","mstrmojo.XMLBuilder");var $HASH=mstrmojo.hash,$ARR=mstrmojo.array;function getAdditionalMetricsXmlValue(){var value,i,metrics=this.tooltipMetrics;if(metrics.length>0){value=metrics[0].did;for(i=1;i<metrics.length;i++){value=value+","+metrics[i].did;}}return value;}mstrmojo.vi.viz.HeatMapVisualizationHelper=mstrmojo.declare(mstrmojo.vi.viz.DropZoneHelper,null,{scriptClass:"mstrmojo.vi.viz.HeatMapVisualizationHelper",groupingObjects:null,colorBy:null,sizeByMetric:null,tooltipMetrics:null,init:function init(props){this._super(props);this.colorBy=[];this.groupingObjects=[];this.tooltipMetrics=[];},getAddDropZonesAction:function(){var h=this,r={act:"updateTemplate",keyContext:this.node.k,actions:[]};[{n:"groupingObjects",zone:"Grouping"},{n:"colorBy",zone:"ColorBy"},{n:"sizeByMetric",zone:"SizeBy",t:4},{n:"tooltipMetrics",zone:"AdditionalMetrics",t:4}].forEach(function(item){var objs=[].concat(h[item.n]||[]),id=mstrmojo.vi.viz.EnumDSSDropZones[item.zone];if(objs&&objs.length){objs.forEach(function(obj){r.actions.push({act:"addDropZoneUnit",zoneId:id,unitId:obj.did,unitType:obj.t});});}});return r;},setData:function setData(p){if(!p){return ;}var ths=this,fn=function(dz,dest){if(dz){var dst=ths[dest],arr=dz.TemplateUnit||dz.TemplateMetric;if(arr){arr.forEach(function(x){var item=$HASH.copy(x);if(!item.did){item.did=item.id;}if(dst instanceof Array){dst.push(item);}else{ths[dest]=item;}});}}};fn(p[$HM.PROP_GROUPING],"groupingObjects");fn(p[$HM.PROP_COLORBY],"colorBy");fn(p[$HM.PROP_SIZEBY],"sizeByMetric");fn(p[$HM.PROP_TOOLTIPMETRICS],"tooltipMetrics");},getXml:function getXml(){var xml=new mstrmojo.XMLBuilder(),mlValue,amValue,fnAddChildIfExists=function(nodeName,attrName,attrValue){if(attrValue){xml.addChild(nodeName);xml.addAttribute(attrName,attrValue);xml.closeElement();}};xml.addChild("props");xml.addChild("widgetProps");xml.addChild("fmt");var sizeByMetric=this.sizeByMetric,colorBy=this.colorBy[0];if(sizeByMetric&&colorBy){mlValue=sizeByMetric.did+","+colorBy.did;}else{if(sizeByMetric&&!colorBy){mlValue=sizeByMetric.did+","+sizeByMetric.did;}else{if(!sizeByMetric&&colorBy){mlValue=colorBy.did+","+colorBy.did;}}}fnAddChildIfExists("ml","value",mlValue);amValue=getAdditionalMetricsXmlValue.call(this);fnAddChildIfExists("am","value",amValue);xml.closeElement();xml.closeElement();xml.closeElement();return xml.toString();},getFirstColorByUnit:function getFirstColorByUnit(wantMetric){var cbUnits=this.colorBy,result;if(cbUnits.length){var cbUnit=cbUnits[0];if(wantMetric){if(this.isMetric(cbUnit)){result=cbUnit;}}else{result=cbUnit;}}return result;}});var $HM=mstrmojo.vi.viz.HeatMapVisualizationHelper;$HM.PROP_GROUPING="Grp";$HM.PROP_COLORBY="ColorBy";$HM.PROP_SIZEBY="SizeBy";$HM.PROP_TOOLTIPMETRICS="AdditionalMetrics";}());