(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.expr","mstrmojo.vi.models.editors.BaseEditorModel","mstrmojo.ui.editors.controls.LineConfigGroup","mstrmojo.ui.editors.controls.FillConfigGroup","mstrmojo.models.FormatModel","mstrmojo.VisEnum","mstrmojo.chart.enums.EnumFontStyle","mstrmojo.gm.GMUtility","mstrmojo.VisUtility","mstrmojo.models.FormatModel","mstrmojo._CanValidate","mstrmojo.num");mstrmojo.requiresClsP("mstrmojo.ui.editors.controls","CharacterGroup","ContainerGroup","TwoColumnContainer","ColorPickerButton","LineStyleButton");var $HASH=mstrmojo.hash,$ARR=mstrmojo.array,$GM_UTILITY=mstrmojo.gm.GMUtility,$VIS_UTILITY=mstrmojo.VisUtility,$NUM=mstrmojo.num,ENUM_PROPERTY_NAMES=mstrmojo.models.FormatModel.ENUM_PROPERTY_NAMES,ERROR_TYPE=mstrmojo.VisEnum.SERVER_JSON_ERROR_TYPE;var LEGEND_PROPERTY=mstrmojo.VisEnum.GMLegendFormatingPropertyTag,FORMAT_MODEL=mstrmojo.models.FormatModel,ENUM_FORMAT_PROPERTIES=FORMAT_MODEL.ENUM_PROPERTY_NAMES,ENUM_FONT_STYLE=mstrmojo.chart.enums.EnumFontStyle,LEGEND_BG_COLOR=LEGEND_PROPERTY.LEGEND_BG_COLOR,LEGEND_BG_TRANSPARENCY=LEGEND_PROPERTY.LEGEND_BG_FILL_TRANSPARENCY,LEGEND_FONT_SIZE=LEGEND_PROPERTY.LEGEND_FONT_SIZE,LEGEND_FONT_FAMILY=LEGEND_PROPERTY.LEGEND_FONT_FAMILY,LEGEND_FONT_COLOR=LEGEND_PROPERTY.LEGEND_FONT_COLOR,LEGEND_FONT_STYLE=LEGEND_PROPERTY.LEGEND_FONT_STYLE,NODE_MAX_SIZE_TYPE=mstrmojo.VisEnum.NETWORK_MAX_NODE_SIZE_TYPE,NODE_MIN_SIZE_TYPE=mstrmojo.VisEnum.NETWORK_MIN_NODE_SIZE_TYPE,DTP=mstrmojo.expr.DTP;var FONT_MAP={};FONT_MAP[ENUM_FORMAT_PROPERTIES.FONT_SIZE]=LEGEND_FONT_SIZE;FONT_MAP[ENUM_FORMAT_PROPERTIES.FONT_FAMILY]=LEGEND_FONT_FAMILY;FONT_MAP[ENUM_FORMAT_PROPERTIES.COLOR]=LEGEND_FONT_COLOR;var CAT_DATA_EXPLORATION="de",CAT_LEGEND="lgd";var LABEL_WIDTH="30%",CONTROL_WIDTH="70%";function getLegendPropertyValue(propName){var propKey=propName,defaultLegendProperties=this.getHost().defaultsLegendPop||{},val=this.getPropertyValue(propKey);return val!==undefined?val:defaultLegendProperties[propName];}function setViewValues(fnSetValues){this._doNotSave=true;fnSetValues.call(this);this._doNotSave=false;}function getItemSizeControls(){function getSizeControlRow(propName,label,types,config){var me=this,propPath="observableModel."+propName;function setOMValue(newValue){var host=me.getHost();var model=$VIS_UTILITY.getPropertyByPath(host,propPath);if(model){model.setValue(newValue);}}function onSizeTypeChanged(){var type=typeControl.getSelectedItem().v,size={type:type};var propInfo=me.getPropertyInfo();propInfo.unmarshal(propName,size);size=propInfo[propName];textbox.set("enabled",config.textboxEnabled(type));textbox.updateText($NUM.toLocaleString(size.ratio));setOMValue(size);var cb=config.onSizeChanged;if(cb instanceof Function){cb(size);}}var host=this.getHost();var model=$VIS_UTILITY.getPropertyByPath(host,propPath,{});var type=model.type.getValue();var ratio=model.ratio.getValue();var typeControl=this.getPulldown(types,onSizeTypeChanged,!isNaN(type)?(type-1):0);var textbox=new mstrmojo.ui.editors.controls.ValidationTextBox({required:true,dtp:DTP.FLOAT,constraints:$HASH.copy(config.valueRange,{min:0.01,max:1,trigger:mstrmojo.validation.TRIGGER.ALL}),validationDelay:1500,value:$NUM.toLocaleString(ratio),enabled:config.textboxEnabled(type),onValid:function(){var size={type:typeControl.getSelectedItem().v,ratio:$NUM.parseNumeric(this.value)};setOMValue(size);var cb=config.onSizeChanged;if(cb instanceof Function){cb(size);}},updateText:function(val){this.inputNode.value=val;this.value=val;}});return[new mstrmojo.Label({text:label}),getTwoColumnContainer([typeControl,textbox],{col1Width:"70%",col2Width:"30%"})];}var getMinSizeDescText=(function(){var MIN_SIZE_DESCRIPTION=["not used",mstrmojo.desc(13743,"The smallest element's size is proportional to its data element"),mstrmojo.desc(13744,"The smallest element's size is fixed, independent of its data value"),mstrmojo.desc(13740,"The smallest element's size is ## of the largest element's size")];return function(){var host=this.getHost();if(host.hasSizeByMetric()){var propInfo=host.propInfo;var minOption=propInfo.minNodeSize;var text=MIN_SIZE_DESCRIPTION[minOption.type];if(minOption.type===NODE_MIN_SIZE_TYPE.ADJUSTED_RANGE){text=text.replace("##",(minOption.ratio*100).toFixed(0)+"%");}return text;}}.bind(this);}.call(this));var maxSizeControls=getSizeControlRow.call(this,"maxNodeSize",mstrmojo.desc(14116,"Item Max Size (0.01 - 1)"),[{n:mstrmojo.desc(6019,"Automatic"),v:NODE_MAX_SIZE_TYPE.AUTOMATIC},{n:mstrmojo.desc(8262,"Manual"),v:NODE_MAX_SIZE_TYPE.MANUAL}],{textboxEnabled:function(type){return type===NODE_MAX_SIZE_TYPE.MANUAL;}});var minSizeControl=getSizeControlRow.call(this,"minNodeSize",mstrmojo.desc(14117,"Item Min Size (0.00 - 1)"),[{n:mstrmojo.desc(11990,"Proportional"),v:NODE_MIN_SIZE_TYPE.PROPORTIONAL},{n:mstrmojo.desc(13741,"Full Range"),v:NODE_MIN_SIZE_TYPE.FULL_RANGE},{n:mstrmojo.desc(14118,"Adjusted Range"),v:NODE_MIN_SIZE_TYPE.ADJUSTED_RANGE}],{valueRange:{min:0,max:1},textboxEnabled:function(type){return type===NODE_MIN_SIZE_TYPE.ADJUSTED_RANGE;},onSizeChanged:function(){minSizeDescControl.set("text",getMinSizeDescText());}});var minSizeDescControl;var controls=[].concat(maxSizeControls,minSizeControl);var host=this.getHost();if(!host.hasSizeByMetric()){minSizeControl.forEach(function(ctrl){ctrl.set("enabled",false);});}else{minSizeDescControl=new mstrmojo.Label({text:getMinSizeDescText(),cssText:"line-height: 115%;"});controls.push(minSizeDescControl);}return this.getEditorGroup(controls);}function getDataExplorationControls(dynamicCtrlGroup){var fnGetCheckbox=function(text,type,propertyName){return this.getCheckboxAndLabel(this.getPropertyValue(propertyName),text,getCallback.call(this,type));}.bind(this);var netPropSizeAggregation="nodeSizeAggregation",modelData=this.getHost().model.data,nodeSizeIndex=mstrmojo.VisEnum.NETWORK_AGGREGATION_METHOD[this.getPropertyValue("nodeSizeAggregation")];this.replaceChildControls(dynamicCtrlGroup,[this.getEditorGroup([fnGetCheckbox(mstrmojo.desc(12080,"Show Edge Direction"),"showEdgeDirection","showEdgeDirection"),fnGetCheckbox(mstrmojo.desc(12081,"Animate Layout Transition"),"showTransition","showTransition"),new mstrmojo.Label({text:mstrmojo.desc(12082,"Item Size Aggregation:")}),this.getPulldown([{n:mstrmojo.desc(2123,"Count"),v:"Count of"},{n:mstrmojo.desc(2131,"Sum"),v:"Sum of"},{n:mstrmojo.desc(2122,"Average"),v:"Average of"},{n:mstrmojo.desc(2127,"Minimum"),v:"Min of"},{n:mstrmojo.desc(2125,"Maximum"),v:"Max of"}],getCallback.call(this,netPropSizeAggregation),nodeSizeIndex===undefined?1:nodeSizeIndex)]),getItemSizeControls.call(this),this.getEditorGroup([this.getGroupTitle(mstrmojo.desc(13861,"Item Formatting"))].concat(getBubbleEditorControl.call(this))),getDataLabelEditorControlGroup.call(this),this.getEditorGroup([this.getEditorGroup([this.getMoreOptionsEditorLink((modelData&&modelData.gsi&&modelData.gsi.prop)||{})])],{isNested:true,showDivider:true,isContainer:true})]);}function getLegendControls(dynamicCtrlGroup){var legendFontControl=getLegendCharacterFormatControl.call(this,{controlName:"LegendTextFontGroup"}),txtFillGroup=new mstrmojo.Label({text:mstrmojo.desc(13601,"Fill:")}),legendFillControl=getLegendFillConfigControl.call(this,null,{controlName:"LegendBackgroundFillGroup"}),dependentControls=[legendFontControl,legendFillControl],host=this.getHost(),model=$VIS_UTILITY.getPropertyByPath(host,"observableModel.showLegend"),showLegend=!!(model&&model.getValue()),group=this.getEditorGroup([getShowLegendControl.call(this,model,dependentControls),legendFontControl,txtFillGroup,legendFillControl]);group.attachEventListener("renderComplete",group.id,function(){$VIS_UTILITY.toggleControlEnabled(dependentControls,showLegend);});this.replaceChildControls(dynamicCtrlGroup,[group]);}function getShapeItem(){var items=[{n:mstrmojo.desc(12100,"Circle"),v:"Circle"},{n:mstrmojo.desc(12101,"Square"),v:"Square"},{n:mstrmojo.desc(14433,"Diamond"),v:"Diamond"},{n:mstrmojo.desc(14434,"Hexagon"),v:"Hexagon"},{n:mstrmojo.desc(14435,"Triangle"),v:"Triangle"},{n:mstrmojo.desc(12103,"Ring"),v:"Ring"}];return items;}var getSharedValue=function(models,valueType){var ret="",isInited=false;$ARR.forEach(models,function(model){var value=valueType==="color"?model.color.opacity.getValue():model.shape.getValue();if(!isInited){ret=value;isInited=true;}else{if(ret!==value){ret="";}}});return ret;};var getitemFillitems=function(){var baseValues=[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1];return baseValues;};var getAllItemConfig=function(obj){mstrmojo.css.toggleClass(obj.previewNode,"conflict",true);obj.selectedValue="";if(!!obj.list){obj.setEmptyOption();}obj.previewNode.style.backgroundColor="white";};function findSelectedIndex(items,selectedValue){var ret;$ARR.forEach(items,function(item,i){if(item===selectedValue||item.v===selectedValue){ret=i;return false;}});return ret;}function getItemShapeControl(shapeValue,callback){var items=getShapeItem(),index=findSelectedIndex(getShapeItem(),shapeValue),pulldown=this.getPulldown(items,callback,index);pulldown.setEmptyOption=function(){pulldown.selectedNode.innerHTML="";pulldown.selectedIndex="";pulldown.list.selectedIndices="";pulldown.list.render();};return this.addDisposable(pulldown);}function getOpacityControl(opacityValue,callback){var baseValues=[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1];var pulldown=this.getPulldown(baseValues.map(function(value){return{v:value,n:(value*100)+"%"};}),callback,baseValues.indexOf(opacityValue),{getIndexOfValue:function(selectedValue){var stillSearching=true;return this.items.reduce(function(previousValue,currentItem,idx){if(!stillSearching){return previousValue;}var thisDelta=selectedValue-currentItem.v,lastDelta=selectedValue-previousValue.v;if(thisDelta*lastDelta<=0){stillSearching=false;return Math.abs(thisDelta)<Math.abs(lastDelta)?idx:idx-1;}return currentItem;});}});pulldown.setEmptyOption=function(){pulldown.selectedNode.innerHTML="";pulldown.selectedIndex="";pulldown.list.selectedIndices="";pulldown.list.render();};return this.addDisposable(pulldown);}function getSelectionChangeHandler(callback){return function(evt){var newValue=evt.value,oldValue=evt.valueWas;if(!$HASH.equals(newValue,oldValue)){callback(newValue,oldValue);}};}function getColorPickerControl(colorValue,callback,cfg){var colorPicker=this.addDisposable(new mstrmojo.ui.editors.controls.ColorPickerButton($HASH.copy(cfg,{selectedValue:colorValue})));colorPicker.postselectedValueChange=getSelectionChangeHandler(callback);colorPicker.setEmptyOption=function(){colorPicker.selectedValue="";colorPicker.list.selectedIndices="";colorPicker.list.render();};return colorPicker;}function getItemBorderLineStyleControl(selectedValue,callback){var lineStyleControl=this.addDisposable(new mstrmojo.ui.editors.controls.LineStyleButton());setViewValues.call(this,function(){lineStyleControl.set("selectedValue",selectedValue);});lineStyleControl.postselectedValueChange=getSelectionChangeHandler(callback);lineStyleControl.setEmptyOption=function(){lineStyleControl.selectedValue="";lineStyleControl.list.selectedIndices="";lineStyleControl.list.render();};return lineStyleControl;}function getDataLabelEditorControlGroup(){var me=this,host=this.getHost(),stage=host&&host.stage,labelStylePath="stage.observableModel.circleLabelStyle",showNodeLabelPath="stage.observableModel.circleStyle.showNodeLabel",callback=$VIS_UTILITY.getCharGroupValueChangeCb(function(){var host=me.getHost();return $VIS_UTILITY.getPropertyByPath(host,labelStylePath);}),fontControls=this.getCharacterGroup(callback,(stage&&stage.getDataLabelFormats())||{}),showNodeLabelModel=$VIS_UTILITY.getPropertyByPath(host,showNodeLabelPath),showNodeLabel=!!(showNodeLabelModel&&showNodeLabelModel.getValue()),showNodeLabelCheckBox=this.getCheckboxAndLabel(showNodeLabel,mstrmojo.desc(13596,"Show Data Labels"),function(newVal){var host=me.getHost(),m=$VIS_UTILITY.getPropertyByPath(host,showNodeLabelPath);if(m!==undefined){m.setValue(newVal);}fontControls.set("enabled",newVal===true);}),labelStyleModel=$VIS_UTILITY.getPropertyByPath(host,labelStylePath);fontControls.set("enabled",showNodeLabel);if(showNodeLabelModel!==undefined){showNodeLabelModel.attachEventListener("valueChanged",this.id,function(){showNodeLabelCheckBox.getCtrl().set("checked",showNodeLabelModel.getValue());});}if(labelStyleModel!==undefined){labelStyleModel.attachEventListener("valueChanged",this.id,function(){var host=this.getHost(),stg=host&&host.stage;fontControls.setFormatSource(stg.getDataLabelFormats());});}return this.getEditorGroup([this.getGroupTitle(mstrmojo.desc(11993,"Data Labels")),showNodeLabelCheckBox,fontControls]);}function getTwoColumnContainer(controls,config){controls.forEach(function(ctrl,idx){ctrl.slot="col"+(idx+1)+"Node";});config=$HASH.copy(config,{col1Width:"50%",col2Width:"50%",children:controls});return new mstrmojo.ui.editors.controls.TwoColumnContainer(config);}function getBubbleEditorControl(){var host=this.getHost(),stage=host&&host.stage,observableModel=stage&&stage.observableModel,model=observableModel&&observableModel.circleStyle,textSelectedIndex=host.textSelectedIndex||0;if(!model){return[];}var getModel=function(path){var ctrlModel=$VIS_UTILITY.getPropertyByPath(host,"stage.observableModel."+path);if(ctrlModel===undefined){throw new Error("invalid observable model");}return ctrlModel;},getBubbleControl=function(fnCtrl,path,cfg){var m=getModel(path);return fnCtrl.call(this,m.getValue(),function(newValue){var ctrlModel,setNewValueForNode=function(isFromNode,newValue,isSilent){path=path.replace(new RegExp(isFromNode?"fromNode":"toNode","g"),isFromNode?"toNode":"fromNode");ctrlModel=getModel(path);ctrlModel.setValue(newValue,isSilent);};if(host.textSelectedIndex===2){setNewValueForNode(true,newValue,false);}else{if(host.textSelectedIndex===1){setNewValueForNode(false,newValue,false);}else{ctrlModel=getModel(path);var beValue=ctrlModel.getValue(),hasFromNode=path.split(".").indexOf("fromNode")===-1;if(beValue!==newValue){setNewValueForNode(!hasFromNode,newValue,true);}else{setNewValueForNode(hasFromNode,newValue,true);hasFromNode=!hasFromNode;}setNewValueForNode(hasFromNode,newValue,false);}}},cfg);}.bind(this);var fromItemFillOpacity=getBubbleControl(getOpacityControl,"circleStyle.fromNode.color.opacity"),toItemFillOpacity=getBubbleControl(getOpacityControl,"circleStyle.toNode.color.opacity"),fromItemFillColor=getBubbleControl(getColorPickerControl,"circleStyle.fromNode.color.value",{showNoFill:false}),toItemFillColor=getBubbleControl(getColorPickerControl,"circleStyle.toNode.color.value",{showNoFill:false}),fromItemBorderColor=getBubbleControl(getColorPickerControl,"circleStyle.fromNode.border.color.value",{showNoFill:false,showGradient:false}),toItemBorderColor=getBubbleControl(getColorPickerControl,"circleStyle.toNode.border.color.value",{showNoFill:false,showGradient:false}),fromItemBorderStyle=getBubbleControl(getItemBorderLineStyleControl,"circleStyle.fromNode.border.style"),toItemBorderStyle=getBubbleControl(getItemBorderLineStyleControl,"circleStyle.toNode.border.style"),fromItemShape=getBubbleControl(getItemShapeControl,"circleStyle.fromNode.shape"),toItemShape=getBubbleControl(getItemShapeControl,"circleStyle.toNode.shape"),selectedModels=textSelectedIndex===1?[getModel("circleStyle.fromNode")]:[getModel("circleStyle.toNode")],srcShape,srcItemFillColor,srcItemFillOpacity,srcBorderColor,srcBorderStyle,shapeItems=getShapeItem();model.attachEventListener("valueChanged",this.id,function(){var selectedValue="selectedValue";if(host.textSelectedIndex===1){fromItemShape.set("selectedIndex",findSelectedIndex(shapeItems,model.fromNode.shape.getValue()));fromItemFillOpacity.set("selectedIndex",fromItemFillOpacity.getIndexOfValue(model.fromNode.color.opacity.getValue()));fromItemFillColor.set(selectedValue,model.fromNode.color.value.getValue());fromItemBorderColor.set(selectedValue,model.fromNode.border.color.value.getValue());fromItemBorderStyle.set(selectedValue,model.fromNode.border.style.getValue());}else{if(host.textSelectedIndex===2){toItemShape.set("selectedIndex",findSelectedIndex(shapeItems,model.toNode.shape.getValue()));toItemFillOpacity.set("selectedIndex",toItemFillOpacity.getIndexOfValue(model.toNode.color.opacity.getValue()));toItemFillColor.set(selectedValue,model.toNode.color.value.getValue());toItemBorderColor.set(selectedValue,model.toNode.border.color.value.getValue());toItemBorderStyle.set(selectedValue,model.toNode.border.style.getValue());}else{if(model.fromNode.shape.getValue()===model.toNode.shape.getValue()){fromItemShape.set("selectedIndex",findSelectedIndex(shapeItems,model.fromNode.shape.getValue()));toItemShape.set("selectedIndex",findSelectedIndex(shapeItems,model.toNode.shape.getValue()));}if(model.fromNode.color.opacity.getValue()===model.toNode.color.opacity.getValue()){fromItemFillOpacity.set("selectedIndex",fromItemFillOpacity.getIndexOfValue(model.fromNode.color.opacity.getValue()));toItemFillOpacity.set("selectedIndex",toItemFillOpacity.getIndexOfValue(model.toNode.color.opacity.getValue()));}if(model.fromNode.color.value.getValue()===model.toNode.color.value.getValue()){fromItemFillColor.set(selectedValue,model.fromNode.color.value.getValue());toItemFillColor.set(selectedValue,model.toNode.color.value.getValue());}if(model.fromNode.border.color.value.getValue()===model.toNode.border.color.value.getValue()){fromItemBorderColor.set(selectedValue,model.fromNode.border.color.value.getValue());toItemBorderColor.set(selectedValue,model.toNode.border.color.value.getValue());}if(model.fromNode.border.style.getValue()===model.toNode.border.style.getValue()){fromItemBorderStyle.set(selectedValue,model.fromNode.border.style.getValue());toItemBorderStyle.set(selectedValue,model.toNode.border.style.getValue());}}}});if(textSelectedIndex===0||host.textSelectedIndex===0){srcShape=fromItemShape;srcShape.selectedIndex=fromItemShape.selectedIndex===toItemShape.selectedIndex?fromItemShape.selectedIndex:-1;srcItemFillColor=fromItemFillColor;srcItemFillColor.selectedValue=fromItemFillColor.selectedValue===toItemFillColor.selectedValue?fromItemFillColor.selectedValue:"conflict";srcItemFillOpacity=fromItemFillOpacity;srcItemFillOpacity.selectedIndex=fromItemFillOpacity.selectedIndex===toItemFillOpacity.selectedIndex?fromItemFillOpacity.selectedIndex:"conflict";srcBorderColor=fromItemBorderColor;srcBorderColor.selectedValue=fromItemBorderColor.selectedValue===toItemBorderColor.selectedValue?fromItemBorderColor.selectedValue:"conflict";srcBorderStyle=fromItemBorderStyle;srcBorderStyle.selectedValue=fromItemBorderStyle.selectedValue===toItemBorderStyle.selectedValue?fromItemBorderStyle.selectedValue:"conflict";}else{var selIndex=textSelectedIndex===1||host.textSelectedIndex===1;srcShape=selIndex?fromItemShape:toItemShape;srcItemFillColor=selIndex?fromItemFillColor:toItemFillColor;srcItemFillOpacity=selIndex?fromItemFillOpacity:toItemFillOpacity;srcBorderColor=selIndex?fromItemBorderColor:toItemBorderColor;srcBorderStyle=selIndex?fromItemBorderStyle:toItemBorderStyle;}return[this.getPulldown([{n:mstrmojo.desc(14430,"From and To Items"),v:"AllItems"},{n:mstrmojo.desc(14431,"From Items"),v:"FromItems"},{n:mstrmojo.desc(14432,"To Items"),v:"ToItems"}],function(textSelectedIndex){if(textSelectedIndex==="FromItems"){host.textSelectedIndex=1;}else{if(textSelectedIndex==="ToItems"){host.textSelectedIndex=2;}else{host.textSelectedIndex=0;}}if(host.textSelectedIndex===0){selectedModels=[model.fromNode,model.toNode];if(model.fromNode.color.opacity.getValue()!==model.toNode.color.opacity.getValue()){srcItemFillOpacity.setEmptyOption();}if(model.fromNode.color.value.getValue()!==model.toNode.color.value.getValue()){getAllItemConfig(srcItemFillColor);}if(model.fromNode.border.color.value.getValue()!==model.toNode.border.color.value.getValue()){getAllItemConfig(srcBorderColor);}if(model.fromNode.border.style.getValue()!==model.toNode.border.style.getValue()){getAllItemConfig(srcBorderStyle);}if(model.fromNode.shape.getValue()!==model.toNode.shape.getValue()){srcShape.setEmptyOption();}}else{if(host.textSelectedIndex===1){selectedModels=[model.fromNode];}else{selectedModels=[model.toNode];}}var index=findSelectedIndex(getShapeItem(),getSharedValue(selectedModels,"shape")),colorindex=findSelectedIndex(getitemFillitems(),getSharedValue(selectedModels,"color"));if(index!==undefined&&host.textSelectedIndex!==0){var srcNode;if(host.textSelectedIndex===2){srcNode=model.toNode;}else{srcNode=model.fromNode;}srcShape.set("selectedIndex",index);srcItemFillColor.set("selectedValue",srcNode.color.value.getValue());srcItemFillOpacity.set("selectedIndex",colorindex);srcBorderColor.set("selectedValue",srcNode.border.color.value.getValue());srcBorderStyle.set("selectedValue",srcNode.border.style.getValue());}},textSelectedIndex),this.getLabelAndControl(mstrmojo.desc(9734,"Shape:"),srcShape,LABEL_WIDTH,CONTROL_WIDTH),this.getLabelAndControl(mstrmojo.desc(13601,"Fill:"),getTwoColumnContainer([srcItemFillColor,srcItemFillOpacity]),LABEL_WIDTH,CONTROL_WIDTH),this.getLabelAndControl(mstrmojo.desc(13598,"Border:"),getTwoColumnContainer([srcBorderColor,srcBorderStyle]),LABEL_WIDTH,CONTROL_WIDTH)];}function getShowLegendControl(model,dependentControls){var showValue=!!(model&&model.getValue()),control=this.getCheckboxAndLabel(showValue,mstrmojo.desc(13600,"Show legend"),function(newVal){$VIS_UTILITY.toggleControlEnabled(dependentControls,newVal);if(model){model.setValue(newVal);}}),checkbox=control.getCtrl();if(model){model.attachEventListener("valueChanged",this.id,function(evt){var newVal=evt.newValue;if(checkbox.checked!==newVal){checkbox.set("checked",newVal);}});}return control;}function initLegendCharacterGroupControl(control){var initControlValues=function(){var fontFamily=getLegendPropertyValue.call(this,LEGEND_FONT_FAMILY),fontSize=getLegendPropertyValue.call(this,LEGEND_FONT_SIZE),fontColor=$GM_UTILITY.decodeColor(getLegendPropertyValue.call(this,LEGEND_FONT_COLOR)),fontStyleValue=parseInt(getLegendPropertyValue.call(this,LEGEND_FONT_STYLE),10);var formats={"text-decoration":""};formats[ENUM_FORMAT_PROPERTIES.FONT_FAMILY]=fontFamily;formats[ENUM_FORMAT_PROPERTIES.FONT_SIZE]=parseInt(fontSize,10);formats[ENUM_FORMAT_PROPERTIES.COLOR]=fontColor;if((fontStyleValue&ENUM_FONT_STYLE.FS_BOLD)>0){formats[ENUM_FORMAT_PROPERTIES.FONT_WEIGHT]="bold";}if((fontStyleValue&ENUM_FONT_STYLE.FS_ITALIC)>0){formats[ENUM_FORMAT_PROPERTIES.FONT_STYLE]="italic";}if((fontStyleValue&ENUM_FONT_STYLE.FS_UNDERLINE)>0){formats[ENUM_FORMAT_PROPERTIES.UNDERLINE]="underline";}if((fontStyleValue&ENUM_FONT_STYLE.FS_STRIKETHROUGH)>0){formats[ENUM_FORMAT_PROPERTIES.LINE_THROUGH]="line-through";}setViewValues.call(this,function(){control.setFormatSource(formats);});}.bind(this);var host=this.getHost(),fontStyleValueMap={bold:ENUM_FONT_STYLE.FS_BOLD,italic:ENUM_FONT_STYLE.FS_ITALIC,underline:ENUM_FONT_STYLE.FS_UNDERLINE,strikeout:ENUM_FONT_STYLE.FS_STRIKETHROUGH};control.fontColor.showNoFill=false;var fsComponent=control.fontStyle;if(fsComponent){fsComponent.postselectionChange=function(evt){var added=evt.added,item=this.items[(added&&added[0]!==undefined)?added[0]:evt.removed[0]],isSelected=!!added,oldValue=host.readGlobalProperty(LEGEND_FONT_STYLE),newValue=(oldValue===undefined?0:oldValue);if(isSelected){newValue=newValue|fontStyleValueMap[item.css];}else{newValue=newValue&(~fontStyleValueMap[item.css]);}if(this.parent){this.parent.raiseFormatValueChange(LEGEND_FONT_STYLE,newValue,oldValue);}};}initControlValues();$VIS_UTILITY.addLegendFontChangeListeners(this,function(){if(control.eventFromEdtModel){return ;}initControlValues();});}function getCallback(propertyName,doNotRenderAgain){var id=this.id;return function(newValue){var editor=mstrmojo.all[id],host=editor.getHost(),model=host&&host.observableModel,key=propertyName;if(model&&model[key]){model[key].setValue(newValue,editor._doNotSave);}else{if(!editor._doNotSave){host.setProperty(propertyName,newValue,{suppressData:doNotRenderAgain});}}};}function getLegendCharacterFormatControl(props){var _this=this;var control=new mstrmojo.ui.editors.controls.CharacterGroup($HASH.copy({onGroupValueChange:function(name,newValue,oldValue){if(name!==LEGEND_FONT_STYLE){name=FONT_MAP[name];}if(name===LEGEND_FONT_COLOR){newValue=$GM_UTILITY.encodeColor(newValue);oldValue=$GM_UTILITY.encodeColor(oldValue);}control.eventFromEdtModel=true;(getCallback.call(_this,name))(newValue,oldValue);control.eventFromEdtModel=false;},onFmtPropsChangedDefault:function(){setViewValues.call(this,mstrmojo.emptyFn);}},props));setViewValues.call(this,function(){initLegendCharacterGroupControl.call(_this,control);});return control;}function getLegendFillConfigControl(label,props){var id=this.id,eventFromEdtModel,setControlValues=function(){setViewValues.call(this,function(){control.setChildrenValue([[LEGEND_BG_COLOR,$GM_UTILITY.decodeColor(getLegendPropertyValue.call(this,LEGEND_BG_COLOR))],[LEGEND_BG_TRANSPARENCY,getLegendPropertyValue.call(this,LEGEND_BG_TRANSPARENCY)]]);});}.bind(this),control=new mstrmojo.ui.editors.controls.FillConfigGroup($HASH.copy({onGroupValueChange:function(name,newValue,oldValue){if(name===LEGEND_BG_COLOR){newValue=$GM_UTILITY.encodeColor(newValue);oldValue=$GM_UTILITY.encodeColor(oldValue);}eventFromEdtModel=true;(getCallback.call(mstrmojo.all[id],name))(newValue,oldValue);eventFromEdtModel=false;},getChildComp:function getChildComp(propName){if(propName===LEGEND_BG_COLOR){return this.fillColorAndTrans.fillColor;}if(propName===LEGEND_BG_TRANSPARENCY){return this.fillColorAndTrans.fillAlpha.fillAlphaText;}return undefined;},setChildValue:function setChildValue(propName,newValue){var comp=this.getChildComp(propName);if(comp===undefined){return false;}switch(comp.alias){case"fillColor":if(newValue!==comp.selectedValue){comp.set("selectedValue",newValue);}break;case"fillAlphaText":if(newValue!==comp.value){comp.set("value",newValue);}break;}},setChildrenValue:function setChildrenValue(propNamesAndValues){var _this=this;propNamesAndValues.forEach(function(item){_this.setChildValue(item[0],item[1]);});},onFmtPropsChangedDefault:function(name,value){this.syncControl(function(){this.setChildValue(name,value);});}},props));control.fillColorAndTrans.fillColor.propName=LEGEND_BG_COLOR;control.fillColorAndTrans.fillAlpha.fillAlphaText.propName=LEGEND_BG_TRANSPARENCY;setControlValues();$VIS_UTILITY.addLegendBackgroundChangeListeners(this,function(){if(eventFromEdtModel){return ;}setControlValues();});return !!label?this.getLabelAndControl(label,control,LABEL_WIDTH,CONTROL_WIDTH):control;}mstrmojo.vi.models.editors.NetworkEditorModel=mstrmojo.declare(mstrmojo.vi.models.editors.BaseEditorModel,null,{scriptClass:"mstrmojo.vi.models.NetworkEditorModel",help:"format_panel_network.htm",init:function(props){this._super(props);},getPropertyInfo:function(){var host=this.getHost();return(host&&host.propInfo)||{};},getPropertyValue:function(propertyName){var ps=this.getPropertyInfo();return ps&&ps[propertyName];},getInitialTarget:function getInitialTarget(){return CAT_DATA_EXPLORATION;},getTargetPulldownItems:function getTargetPulldownItems(dynamicCtrlGroup){var host=this.getHost(),pulldownItems=this._super(dynamicCtrlGroup),fnGetHandler=function(fn){return fn.bind(this,dynamicCtrlGroup);}.bind(this);if(this.isNormalOrExcludeAllDataButNotInPauseMode(host)){pulldownItems.unshift({n:mstrmojo.desc(11974,"Data Exploration"),v:CAT_DATA_EXPLORATION,h:fnGetHandler(getDataExplorationControls)});if(host.hasSizebyOrColorby()){pulldownItems.push({n:mstrmojo.desc(2403,"Legend"),v:CAT_LEGEND,h:fnGetHandler(getLegendControls)});}}return pulldownItems;},onBEMFormatChange:function onBEMFormatChange(evt){if(!evt.isTitle&&evt.propertyName===ENUM_PROPERTY_NAMES.BACKGROUND_COLOR){var host=this.getHost()||{},stage=host.stage||{},om=stage.observableModel;if(om){om.background.value.setValue(evt.value);}}}});}());