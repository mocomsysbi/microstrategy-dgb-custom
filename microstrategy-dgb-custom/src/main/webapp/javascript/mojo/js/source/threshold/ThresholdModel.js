(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.color","mstrmojo.hash","mstrmojo.num","mstrmojo.array","mstrmojo.date");mstrmojo.requiresClsP("mstrmojo.mstr");var TYPE_LOWEST_PERCENT=1,TYPE_HIGHEST_PERCENT=2,TYPE_BETWEEN_PERCENT=3,TYPE_LOWEST=4,TYPE_HIGHEST=5,TYPE_BETWEEN=6,TYPE_VALUE=7,TYPE_COMPLEX=-1,TYPE_NONE=-2,$COLOR=mstrmojo.color,$HASH=mstrmojo.hash,$ARR=mstrmojo.array,$NUM=mstrmojo.num,$DATE=mstrmojo.date,DEFAULT_COLORS,DEFAULT_IMAGES,$EOBT=mstrmojo.mstr.EnumDSSXMLObjectTypes;function isTrueForAll(thresholds,fn){return thresholds.every(function(threshold){return fn(threshold);});}function isTypeMatchForAll(thresholds,type1,type2){return isTrueForAll(thresholds,function(threshold){return threshold.ttp===type1||threshold.ttp===type2;});}function toFixed(value){var fixedVal=value.toFixed(2);return parseFloat(fixedVal);}function raiseModelEditEvent(props){this.raiseEvent($HASH.copy(props,{name:"modelEdit"}));}function raiseSelectedThresholdsChangeEvent(props){this.raiseEvent($HASH.copy(props,{name:"selectedThresholdsChange"}));}function getMetricInfo(){var metricId=this.basedOnId||this.metricId;return $ARR.filterOne(this.data.gsi.mx,function(metric){return metric.did===metricId;});}function isSimpleExpression(threshold){var nodes=threshold.expr.nds,length=nodes.length;if(length!==1){return false;}var node=nodes[0],constants=node.cs;if(!node.m||!constants){return false;}var fnt=node.fnt,fn=node.fn,constant0=constants[0],constant1=constants[1],constantValue0=constant0&&constant0.v,constantValue1=constant1&&constant1.v,v0=$NUM.parseNumeric(constantValue0)||parseFloat(constantValue0),v1=$NUM.parseNumeric(constantValue1)||parseFloat(constantValue1);switch(fnt){case 2:case 3:switch(fn){case 1:case 2:threshold.flr=fnt===2?-Infinity:0;threshold.ceil=v0;threshold.ttp=fnt===2?(fn===1?TYPE_HIGHEST:TYPE_LOWEST):(fn===1?TYPE_HIGHEST_PERCENT:TYPE_LOWEST_PERCENT);break;case 3:case 4:case 5:case 13:threshold.flr=v0;threshold.ceil=isNaN(v1)?(fnt===2?Infinity:100):v1;threshold.ttp=fnt===2?(fn===4?TYPE_HIGHEST:(fn===5?TYPE_LOWEST:TYPE_BETWEEN)):(fn===4?TYPE_HIGHEST_PERCENT:(fn===5?TYPE_LOWEST_PERCENT:TYPE_BETWEEN_PERCENT));break;default:return false;}break;default:switch(fn){case 11:threshold.flr=-Infinity;threshold.ceil=v0;threshold.ttp=TYPE_VALUE;break;case 17:case 10:threshold.flr=v0;threshold.ceil=isNaN(v1)?Infinity:v1;threshold.ttp=TYPE_VALUE;break;default:return false;}}return true;}mstrmojo.threshold.MetricThresholdData=null;mstrmojo.threshold.ThresholdModel=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.threshold.ThresholdModel",data:undefined,thresholds:undefined,orgThresholds:undefined,selectedThresholds:[],metricId:undefined,basedOnId:undefined,editorMode:0,init:function init(props){this._super(props);var customThresholds=mstrApp.customization.getCustomThresholds();DEFAULT_COLORS=DEFAULT_COLORS||customThresholds.color;DEFAULT_IMAGES=DEFAULT_IMAGES||customThresholds.image;},ondataChange:function ondataChange(){this.thresholds=this.data.gsi.thresholds;this.saveOriginalData();},isAdvanced:function isAdvanced(metricId){var thresholds=this.thresholds;if(thresholds){var metricThresholds=thresholds[metricId]||[],hasBgFill=false,basedOnMetricId,exprMetricId,UNSUPPORTED_THRESHOLD_ERROR="The expression is not supported by the Simple Threshold Exception Parser.";if(metricThresholds.length===0){return false;}if(metricThresholds.some(function(thresholdData){if(thresholdData.ttp===TYPE_COMPLEX){return true;}try{if(!isSimpleExpression(thresholdData)){throw UNSUPPORTED_THRESHOLD_ERROR;}exprMetricId=thresholdData.expr.nds[0].m.did;}catch(e){return true;}if(basedOnMetricId&&basedOnMetricId!==exprMetricId){return true;}basedOnMetricId=exprMetricId;var replaceType=thresholdData.rtp;if(replaceType===3||replaceType===10){return true;}var scope=thresholdData.scope;if(scope&&scope!==1){return true;}var format=thresholdData.fmt||{};for(var f in format){if(f!=="bc"&&f!=="bgs"){return true;}else{hasBgFill=true;}}return false;})){return true;}if(hasBgFill&&!isTrueForAll(metricThresholds,function(threshold){return threshold.fmt&&(threshold.fmt.bc||threshold.fmt.bgs);})){return true;}this.basedOnId=basedOnMetricId;var isIncontinuous=false,thresholdType=this.getSimpleThresholdType(metricId),length=metricThresholds.length;if(length>0&&thresholdType!==TYPE_NONE){var i,threshold_i,threshold_ip1;for(i=0;i<length-1;i++){threshold_i=metricThresholds[i];threshold_ip1=metricThresholds[i+1];if(threshold_i.ceil!==threshold_ip1.flr&&threshold_i.flr!==threshold_ip1.ceil){isIncontinuous=true;break;}}if(!isIncontinuous){var thresholdFirst=metricThresholds[0],thresholdsLast=metricThresholds[length-1],firstFlr=thresholdFirst.flr,lastCeil=thresholdsLast.ceil,firstCeil=thresholdFirst.ceil,lastFlr=thresholdsLast.flr,count=this.getMetricsCount(),minValue=this.getMetricsMinValue(),maxValue=this.getMetricsMaxValue();switch(thresholdType){case TYPE_HIGHEST:case TYPE_LOWEST:isIncontinuous=!(((firstFlr===0||firstFlr===-Infinity)&&(lastCeil===count||lastCeil===Infinity))||((firstCeil===count||firstCeil===Infinity)&&(lastFlr===0||lastFlr===-Infinity)));break;case TYPE_HIGHEST_PERCENT:case TYPE_LOWEST_PERCENT:isIncontinuous=!((parseInt(firstFlr,10)===0&&parseInt(lastCeil,10)===100)||(parseInt(firstCeil,10)===100&&parseInt(lastFlr,10)===0));break;case TYPE_VALUE:isIncontinuous=!(((firstFlr===minValue||firstFlr===-Infinity)&&(lastCeil===maxValue||lastCeil===Infinity))||((firstCeil===maxValue||firstCeil===Infinity)&&(lastFlr===minValue||lastFlr===-Infinity)));break;}}return isIncontinuous;}else{return true;}}return false;},getSimpleThresholdType:function(metricId){var thresholds=this.thresholds&&this.thresholds[metricId],type=TYPE_NONE;if(thresholds){if(isTypeMatchForAll(thresholds,TYPE_BETWEEN_PERCENT,TYPE_HIGHEST_PERCENT)){type=TYPE_HIGHEST_PERCENT;}else{if(isTypeMatchForAll(thresholds,TYPE_BETWEEN_PERCENT,TYPE_LOWEST_PERCENT)){type=TYPE_LOWEST_PERCENT;}else{if(isTypeMatchForAll(thresholds,TYPE_BETWEEN,TYPE_LOWEST)){type=TYPE_LOWEST;}else{if(isTypeMatchForAll(thresholds,TYPE_BETWEEN,TYPE_HIGHEST)){type=TYPE_HIGHEST;}else{if(isTypeMatchForAll(thresholds,TYPE_VALUE)){type=TYPE_VALUE;}}}}}}return type;},isImageBasedType:function isImagebasedType(metricId){var thresholds=this.thresholds&&this.thresholds[metricId];return thresholds&&!thresholds.some(function(thresholdData){return thresholdData.rtp!==4;});},getMetricsMaxValue:function(){var max=getMetricInfo.call(this).max;return(max===undefined)?3000000:max;},getMetricsMinValue:function(){var min=getMetricInfo.call(this).min;return(min===undefined)?-3000000:min;},getMetricsCount:function(){var count=getMetricInfo.call(this).cnt;return count===undefined?100:count;},getServerThresholdValues:function getServerThresholdValues(){var metricId=this.basedOnId||this.metricId,thresholds=this.thresholds&&metricId in this.thresholds&&this.thresholds[metricId];if($ARR.isArray(thresholds)&&thresholds.length>0&&thresholds[0].ttp===TYPE_VALUE){thresholds.sort(function(t1,t2){return t1.flr-t2.flr;});return{min:thresholds[0].ceil,max:thresholds[thresholds.length-1].flr};}return{min:undefined,max:undefined};},getFormatString:function(){var nfArr=this.data.nf,model=this,formatValue=$ARR.filterOne(nfArr,function(nf){return nf.id===model.basedOnId;})||{};return formatValue.nfs||"";},getDefaultColors:function getDefaultColors(){return DEFAULT_COLORS;},getDefaultImages:function getDefaultImages(){return DEFAULT_IMAGES;},getNormalizedValue:function(value,type,sliderMin,sliderMax){var v=null;if(type===TYPE_BETWEEN_PERCENT||type===TYPE_HIGHEST_PERCENT||type===TYPE_LOWEST_PERCENT){v=value/100;}else{if(type===TYPE_BETWEEN||type===TYPE_HIGHEST||type===TYPE_LOWEST){v=value/(this.getMetricsCount());}else{if(type===TYPE_VALUE){var bounds=this.globalMinMax(sliderMin,sliderMax),globalMin=bounds.min,globalMax=bounds.max;if(sliderMax!==undefined&&sliderMax<globalMax){globalMax=Math.max(sliderMax,this.getMetricsMaxValue());}if(sliderMin!==undefined&&sliderMin>globalMin){globalMin=Math.min(sliderMin,this.getMetricsMinValue());}if(globalMax===globalMin){return 1;}v=(value-globalMin)/(globalMax-globalMin);}}}if(v<0){v=0;}if(v>1){v=1;}return v;},getRealValue:function(value,type,sliderMin,sliderMax){if(type===TYPE_BETWEEN_PERCENT||type===TYPE_HIGHEST_PERCENT||type===TYPE_LOWEST_PERCENT){return toFixed(value*100);}if(type===TYPE_BETWEEN||type===TYPE_HIGHEST||type===TYPE_LOWEST){return toFixed(value*this.getMetricsCount());}if(type===TYPE_VALUE){var bounds=this.globalMinMax(sliderMin,sliderMax),globalMin=bounds.min,globalMax=bounds.max;if(sliderMax!==undefined&&sliderMax<globalMax){globalMax=Math.max(sliderMax,this.getMetricsMaxValue());}if(sliderMin!==undefined&&sliderMin>globalMin){globalMin=Math.min(sliderMin,this.getMetricsMinValue());}return globalMin+value*(globalMax-globalMin);}return null;},globalMinMax:function globalMinMax(sliderMin,sliderMax){var globalMin=(sliderMin!==undefined&&sliderMin!==-Infinity)?sliderMin:Infinity,globalMax=(sliderMax!==undefined&&sliderMax!==Infinity)?sliderMax:-Infinity,serverThresholds=this.getServerThresholdValues(),minThresholdCeil=serverThresholds.min,maxThresholdFlr=serverThresholds.max;minThresholdCeil=(minThresholdCeil===undefined)?Infinity:minThresholdCeil;maxThresholdFlr=(maxThresholdFlr===undefined)?-Infinity:maxThresholdFlr;return{min:Math.min(globalMin,this.getMetricsMinValue(),minThresholdCeil),max:Math.max(globalMax,this.getMetricsMaxValue(),maxThresholdFlr)};},getColorScheme:function(palette){var schemeName="custom",color,length,bands;DEFAULT_COLORS.forEach(function(colorScheme){bands=colorScheme.bands;length=palette.length;if(length!==bands.length){return ;}for(var i=0;i<length;i++){color=mstrmojo.color.fixFullHexValue(palette[i]);if(bands[i].bc!==color&&bands[length-i-1].bc!==color){return ;}}schemeName=colorScheme.id;});return schemeName;},getImageSetName:function getImageSetName(imageSet){var resultName=DEFAULT_IMAGES[0].id,defaultImage,fnCompareURL=function(imageURL){return imageURL===defaultImage.bands[0].url;};for(var i=0;i<DEFAULT_IMAGES.length;i++){defaultImage=DEFAULT_IMAGES[i];if(imageSet.some(fnCompareURL)){resultName=defaultImage.id;break;}}return resultName;},getGridValueFormat:function getGridValueFormat(){return this.data.gsi.fmts.va;},isMapReversed:function isMapReversed(name,palette,isImageBased){var defaultMap=(isImageBased?DEFAULT_IMAGES:DEFAULT_COLORS).filter(function(imageSet){return imageSet.id===name;})[0],firstPalette=palette[0];if(!isImageBased){firstPalette=$COLOR.fixFullHexValue(firstPalette);}return defaultMap&&defaultMap.bands[0][isImageBased?"url":"bc"]!==firstPalette;},setConditionData:function setConditionData(conditionNode,newData){var data=conditionNode.data,isNew=data.isNew;$HASH.copy(newData,$HASH.clear(data));delete data.isNew;conditionNode.paint();conditionNode.tree.onConditionEdit(conditionNode,isNew);},hasSelectedThresholds:function hasSelectedThresholds(){return this.selectedThresholds.length>0;},isThresholdSelected:function isThresholdSelected(threshold){return this.selectedThresholds.indexOf(threshold)!==-1;},toggleThresholdSelected:function toggleThresholdSelected(threshold,selected){var selectedThresholds=this.selectedThresholds,selectedIdx=selectedThresholds.indexOf(threshold),isSelected=selectedIdx!==-1,thresholds=this.thresholds[this.metricId],isValid=thresholds.indexOf(threshold)!==-1;if(isValid){if(selected&&!isSelected){selectedThresholds.push(threshold);}else{if(!selected&&isSelected){selectedThresholds.splice(selectedIdx,1);}}raiseSelectedThresholdsChangeEvent.call(this);}},addThresholds:function addThresholds(newThresholds){var thresholds=this.thresholds[this.metricId];this.thresholds[this.metricId]=(thresholds||[]).concat(newThresholds);raiseModelEditEvent.call(this);},duplicateThreshold:function duplicateThreshold(idx){var thresholds=this.thresholds[this.metricId],threshold=thresholds[idx],newThreshold=$HASH.clone(threshold);thresholds.push(newThreshold);if(this.isThresholdSelected(threshold)){this.toggleThresholdSelected(newThreshold,true);}raiseModelEditEvent.call(this);},deleteThreshold:function deleteThreshold(threshold){var thresholds=this.thresholds[this.metricId];var thresholdIdx=thresholds.indexOf(threshold);if(thresholdIdx!==-1){this.toggleThresholdSelected(threshold,false);thresholds.splice(thresholdIdx,1);}raiseModelEditEvent.call(this);},moveThreshold:function moveThreshold(scrIdx,dstIdx){var thresholds=this.thresholds[this.metricId],threshold=thresholds.splice(scrIdx,1);this.thresholds[this.metricId]=thresholds.slice(0,dstIdx).concat(threshold,thresholds.slice(dstIdx,thresholds.length));raiseModelEditEvent.call(this);},cleanUp:function cleanUp(){this.selectedThresholds=[];this.editorMode=mstrmojo.threshold.ThresholdModel.EDITOR_TYPES.AUTO;},clearData:function clearData(){var thresholds=this.thresholds;if(thresholds){thresholds[this.metricId]=undefined;}},saveOriginalData:function saveOriginalData(){this.orgThresholds=$HASH.clone(this.thresholds);},setAttIdToNDE:function setAttIdToNDE(exprJsons){if(!(exprJsons instanceof Array)){exprJsons=[exprJsons];}var i,n,fn,json,prop,fnFindAttr=function(dataset){dataset.att.forEach(function(attribute){if(attribute.did===prop.did){prop.attId=attribute.attId;}});},fnSetConId=function(e){e.conid=prop.did;};for(i=0;i<exprJsons.length;i++){json=exprJsons[i];for(n in json){prop=json[n];if(typeof prop==="function"||!(prop instanceof Object)){continue;}else{if(n==="a"){if(prop.t===47&&prop.st===12033){$HASH.forEach(this.controller.datasets,fnFindAttr);fn=json.fn;if(fn===22||fn===57){(json.es||[]).forEach(fnSetConId);}}}else{this.setAttIdToNDE(json[n]);}}}}},showNumberFormat:function showNumberFormat(){var metricInfo=getMetricInfo.call(this),min=metricInfo&&metricInfo.min,max=metricInfo&&metricInfo.max;return(typeof (min)==="number"||typeof (max)==="number")||($DATE.isDate(min)||$DATE.isDate(max));}});mstrmojo.threshold.ThresholdModel.SLIDER_MODE={COLOR_BASED:0,IMAGE_BASED:1};mstrmojo.threshold.ThresholdModel.REPLACE_SYMBOL=[{n:"&#9679;",v:"1"},{n:"&#9632;",v:"2"},{n:"&#9830;",v:"3"},{n:"&#9670;",v:"4"},{n:"&#10070;",v:"5"},{n:"&#9784;",v:"6"},{n:"&#10047;",v:"7"},{n:"&#8984;",v:"8"},{n:"&#8680;",v:"29"},{n:"&#8679;",v:"30"},{n:"&#8681;",v:"31"}];mstrmojo.threshold.ThresholdModel.FEATURES={SHOW_ADVANCED_EDITOR:1,SHOW_BASED_ON:2,SHOW_IMAGE:3,SHOW_VALUE_ITEM:4};mstrmojo.threshold.ThresholdModel.EDITOR_TYPES={AUTO:0,ADVANCED_EDITOR:1,SIMPLE_EDITOR:2};mstrmojo.threshold.ThresholdModel.BASED_ON_TYPES={LOWEST_PERCENT:TYPE_LOWEST_PERCENT,HIGHEST_PERCENT:TYPE_HIGHEST_PERCENT,BETWEEN_PERCENT:TYPE_BETWEEN_PERCENT,LOWEST:TYPE_LOWEST,HIGHEST:TYPE_HIGHEST,BETWEEN:TYPE_BETWEEN,VALUE:TYPE_VALUE,COMPLEX:TYPE_COMPLEX,NONE:TYPE_NONE};}());