(function(){mstrmojo.requiresCls("mstrmojo.boxmodel","mstrmojo.DocDataService");mstrmojo.vi.models.PanelFormatSaver=mstrmojo.provide("mstrmojo.vi.models.PanelFormatSaver",{getPanelSaver:function getPanelSaver(model,propertyMap,unit){return{saveProperty:function saveProperty(propertyName,value){var prop=propertyMap[propertyName];if(prop){if(prop.convert){value=mstrmojo.boxmodel.px2Inches(model.getZoomProps(),value);}var format={},pSet=format[prop.set]={};pSet[prop.name]=value;model.updateUnitFormat(unit||model.getRootNode(),1,format,undefined,mstrmojo.DocDataService.RAPID_EXEC);}}};}});}());