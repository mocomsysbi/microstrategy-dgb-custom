(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.vi.viz.DropZoneHelper","mstrmojo.vi.viz.EnumDSSDropZones","mstrmojo.XMLBuilder");var $HASH=mstrmojo.hash,$EnumDSSDropZones=mstrmojo.vi.viz.EnumDSSDropZones;mstrmojo.vi.viz.KPICardVisualizationHelper=mstrmojo.declare(mstrmojo.vi.viz.DropZoneHelper,null,{scriptClass:"mstrmojo.vi.viz.KPICardVisualizationHelper",metric:null,breakByAttribute:null,trendAttribute:null,getAddDropZonesAction:function(){var h=this,r={act:"updateTemplate",keyContext:this.node.k,actions:[]};[{n:"metric",zone:"Metric",t:4},{n:"breakByAttribute",zone:"BreakBy"},{n:"trendAttribute",zone:"Trend"}].forEach(function(item){var objs=[].concat(h[item.n]||[]),id=$EnumDSSDropZones[item.zone];if(objs&&objs.length){objs.forEach(function(obj){r.actions.push({act:"addDropZoneUnit",zoneId:id,unitId:obj.did,unitType:obj.t});});}});return r;},getXml:function getXml(){var xml=new mstrmojo.XMLBuilder();xml.addChild("props");xml.addChild("widgetProps");xml.addChild("fmt");xml.closeElement();xml.closeElement();xml.closeElement();return xml.toString();}});var $KPIC=mstrmojo.vi.viz.KPICardVisualizationHelper;$KPIC.PROP_METRIC="metric";$KPIC.PROP_BREAKBY="BreakBy";$KPIC.PROP_TREND="trend";}());