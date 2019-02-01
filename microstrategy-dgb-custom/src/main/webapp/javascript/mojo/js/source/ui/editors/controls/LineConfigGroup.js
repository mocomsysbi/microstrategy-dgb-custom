(function(){mstrmojo.requiresCls("mstrmojo.ui.editors.controls.ControlGroup","mstrmojo.array","mstrmojo.hash","mstrmojo.ui.editors.controls.ColorPickerButton","mstrmojo.ui.editors.controls.LineStyleButton");var $EF=mstrmojo.emptyFn,$ARR=mstrmojo.array,$HASH=mstrmojo.hash,$ENUM_LINE_STYLE=mstrmojo.gm.EnumCombinedLineStyle;var ENUM_LINE_COMP_NAME={LINE_COLOR:"Clr",LINE_STYLE:"Style"},LINE_STYLE_ID_VALUE_MAP={"1pt solid":$ENUM_LINE_STYLE.THIN,"2pt solid":$ENUM_LINE_STYLE.THICK,"1pt dashed":$ENUM_LINE_STYLE.DASHED,"1pt dotted":$ENUM_LINE_STYLE.DOTTED,none:$ENUM_LINE_STYLE.NONE};function getLineColorCfg(slot,props){return $HASH.copy(props,{scriptClass:"mstrmojo.ui.editors.controls.ColorPickerButton",alias:"lineColor",slot:slot,selectedValue:"#000000",postselectedValueChange:function(evt){if(this.propName){this.parent.parent.raiseFormatValueChange(this.propName,evt.value,evt.valueWas);}},postclick:function(evt){this.parent.parent.postclick(evt);}});}function getLineStyleCfg(slot){return{scriptClass:"mstrmojo.ui.editors.controls.LineStyleButton",showThickOption:true,showNoneOption:true,hideDashOptions:false,defaultSelectedIndex:3,propName:undefined,alias:"lineStyle",slot:slot,postInit:function postInit(){var css=["mstrmojo-ui-LineStyle"];if(!this.showNoneOption){css.push("no-none");}if(this.hideDashOptions){css.push("no-dash");}mstrmojo.css.addWidgetCssClass(this,css);(this.list.items||[]).forEach(function(item){item.v=(LINE_STYLE_ID_VALUE_MAP[item.id]!==undefined?LINE_STYLE_ID_VALUE_MAP[item.id]:LINE_STYLE_ID_VALUE_MAP["not defined"]);});},onshowNoneOptionChange:function(evt){var css=["no-none"];if(!evt.value){mstrmojo.css.addWidgetCssClass(this,css);}else{mstrmojo.css.removeWidgetCssClass(this,css);}var hr=this.hasRendered;if(hr){this.refresh();}},postselectedValueChange:function(evt){this._super();var selectedIndex=$ARR.find(this.list.items,"id",evt.value);if(selectedIndex===-1){selectedIndex=this.defaultSelectedIndex;}var newValue=this.list.items[selectedIndex].v;if(this.propName){this.parent.parent.setChildEnable(ENUM_LINE_COMP_NAME.LINE_COLOR,newValue!==LINE_STYLE_ID_VALUE_MAP.none);this.parent.parent.raiseFormatValueChange(this.propName,newValue,LINE_STYLE_ID_VALUE_MAP[evt.valueWas]);}},postclick:function(evt){this.parent.parent.postclick(evt);}};}mstrmojo.ui.editors.controls.LineConfigGroup=mstrmojo.declare(mstrmojo.ui.editors.controls.ControlGroup,null,{scriptClass:"mstrmojo.ui.editors.controls.LineConfigGroup",propNames:undefined,postclick:$EF,hideColorControl:false,showGradient:false,showNoFillInColor:true,showAutomaticInColor:false,showNoneOption:true,lineColorAndStyle:undefined,lineTitle:undefined,init:function init(props){this._super(props);var controls=[],ctrlWidthConfig;controls.push(getLineStyleCfg("col1Node"));if(!this.hideColorControl){controls.push(getLineColorCfg("col2Node",{showGradient:this.showGradient,showNoFill:this.showNoFillInColor,showAutomatic:this.showAutomaticInColor}));}else{ctrlWidthConfig={col1Width:"100%",dividerWidth:"0",col2Width:"0"};}var groupControls=[];if(this.lineTitle&&this.lineTitle!==""){groupControls.push(new mstrmojo.Label({text:this.lineTitle}));}groupControls.push($HASH.copy(ctrlWidthConfig,{scriptClass:"mstrmojo.ui.editors.controls.TwoColumnContainer",alias:"lineColorAndStyle",children:controls}));this.addChildren(groupControls);},getChildComp:function getChildComp(propName){if(propName.indexOf(ENUM_LINE_COMP_NAME.LINE_COLOR)!==-1){return this.lineColorAndStyle.lineColor;}if(propName.indexOf(ENUM_LINE_COMP_NAME.LINE_STYLE)!==-1){return this.lineColorAndStyle.lineStyle;}return null;},iniChildrenComp:function iniChildrenComp(propNames){$ARR.forEach(propNames,function(propName){var comp=this.getChildComp(propName);if(comp!==undefined){comp.propName=propName;}},this);var lineStyleCtrl=this.lineColorAndStyle.lineStyle;lineStyleCtrl.showNoneOption=this.showNoneOption;lineStyleCtrl.hideDashOptions=this.hideDashOptions;lineStyleCtrl.postInit();},onshowNoneOptionChange:function(evt){this.lineColorAndStyle.lineStyle.set("showNoneOption",evt.value);},setChildValue:function setChildValue(propName,newValue){var comp=this.getChildComp(propName);if(comp===undefined){return false;}var newlySelectedIdx;switch(comp.alias){case"lineColor":if(newValue!==comp.selectedValue){comp.set("selectedValue",typeof newValue==="undefined"?"conflict":newValue);}break;case"lineStyle":if(typeof newValue==="undefined"){comp.list.clearSelect();this.syncControls(function(){comp.set("selectedValue","conflict");});}else{newlySelectedIdx=$ARR.find(comp.list.items,"v",newValue);if(newlySelectedIdx===-1){newlySelectedIdx=comp.defaultSelectedIndex;}var newlyValue=comp.list.items[newlySelectedIdx].id;if(newlyValue!==comp.selectedValue){comp.set("selectedValue",newlyValue);}}break;}},setChildEnable:function setChildEnable(propName,enable){var comp=this.getChildComp(propName);if(comp!==undefined){comp.set("enabled",enable);}},setChildrenValue:function setChildrenValue(propNamesAndValues){propNamesAndValues.forEach(function(item){this.setChildValue(item[0],item[1]);});}});}());