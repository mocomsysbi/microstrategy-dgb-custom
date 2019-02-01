(function(){mstrmojo.requiresCls("mstrmojo.models.FormatModel","mstrmojo.vi.models.editors.BaseEditorModel","mstrmojo.ui.editors.controls.CharacterGroup","mstrmojo.DocSelector");var TARGET_SELECTOR=3;var $CG_FLAGS=mstrmojo.ui.editors.controls.CharacterGroup.CTRL_FLAGS,$FORMAT_MODEL=mstrmojo.models.FormatModel,$GET_FORMAT_OBJ=$FORMAT_MODEL.getFormatUpdate,$ENUM_FORMAT_PROPERTIES=$FORMAT_MODEL.ENUM_PROPERTY_NAMES,DEFAULT_BG_SELECTED="#DBDBDC";function getLabelAndPulldown(text,items,fnChange,selectedIndex){return this.getLabelAndControl(text,this.getPulldown(items,fnChange,selectedIndex||0));}function getRebuildUnitCallback(unitContainer){var unitKey=unitContainer.k,panel=unitContainer.parent;return{success:function(){var rebuildUnit=panel.getUnitByKey(unitKey);panel.selectVIUnit(panel.rebuildChild(rebuildUnit),true);}};}function getSelectorControls(dynamicCtrlGroup){var me=this,hostSelector=this.getHost(),hostUnitContainer=hostSelector.parent,model=hostSelector.model,selectorDefn=hostSelector.defn,controls=[],styleItems=hostSelector.getSelectorStyleList(),selectionColor=selectorDefn.ssc,defaultSelectionColor;if(!hostSelector.isRecursiveAttributeSelector()){controls.push(getLabelAndPulldown.call(this,mstrmojo.desc(3059,"Style:"),styleItems,function(newStyle){model.changeFilterStyle(hostSelector,newStyle);},styleItems.map(function(item){return item.v;}).indexOf(selectorDefn.style)));}controls.push(this.getCharacterGroup(this.getChangeGroupPropertyFn(1),this.getHost().getFormats()||{},$CG_FLAGS.FONT_FAMILY+$CG_FLAGS.FONT_SIZE_AND_COLOR+$CG_FLAGS.FONT_STYLE_NO_STRIKEOUT));if(hostSelector.supportSelectionColor()){if(hostSelector.content&&hostSelector.content.getPropertyDefaultValue){defaultSelectionColor=hostSelector.content.getPropertyDefaultValue($ENUM_FORMAT_PROPERTIES.SELECTOR_SELECTION_COLOR);}if(!defaultSelectionColor){defaultSelectionColor=DEFAULT_BG_SELECTED;}controls.push(this.getLabelAndControl(mstrmojo.desc(14057,"Selection:"),new mstrmojo.ui.editors.controls.ColorPickerButton({showGradient:false,showNoFill:true,selectedValue:selectionColor!==undefined?$FORMAT_MODEL.decodeValue($ENUM_FORMAT_PROPERTIES.SELECTOR_SELECTION_COLOR,selectionColor):defaultSelectionColor,postselectedValueChange:function(evt){model.changeUnitFormatProperty(hostUnitContainer,[{formatType:1,propertyName:$ENUM_FORMAT_PROPERTIES.SELECTOR_SELECTION_COLOR,newValue:evt.value,oldValue:evt.valueWas}]);}})));}if(hostSelector.allowsOrientationChange()){controls.push(this.getButtonBar([{n:mstrmojo.desc(4604,"Auto"),v:-1},{n:mstrmojo.desc(12286,"Horizontal"),v:1},{n:mstrmojo.desc(12285,"Vertical"),v:0}],selectorDefn.ob?(selectorDefn.horiz?1:2):0,function(newItem){var value=newItem.v,domNode=hostUnitContainer.domNode,isAuto=value===-1,isHorizontal=(isAuto?(domNode.offsetWidth>domNode.offsetHeight):value)?1:0;hostUnitContainer.set("orientation",isHorizontal?"h":"v");selectorDefn.ob=isAuto?0:1;var formatObj=$GET_FORMAT_OBJ($ENUM_FORMAT_PROPERTIES.CONTROL_ORIENTATION_BEHAVIOR,isAuto?0:1);$GET_FORMAT_OBJ($ENUM_FORMAT_PROPERTIES.CONTROL_ORIENTATION,isHorizontal?1:0,formatObj);model.submitUndoRedoFormatChange(hostUnitContainer,{1:formatObj},null,null,mstrmojo.DocDataService.REQUEST_ONLY_DEFINITION);},{showIcon:false}));}if(hostSelector.supportsInclude()){controls.push(getLabelAndPulldown.call(this,mstrmojo.desc(2707,"Mode:"),[{n:mstrmojo.desc(3945,"Include"),v:true},{n:mstrmojo.desc(3946,"Exclude"),v:false}],function(newValue){hostSelector.set("include",newValue);},hostSelector.include?0:1));}if(hostSelector.allowsTogglingMultiSelect()){controls.push(this.getCheckboxAndLabel(hostSelector.multi,mstrmojo.desc(4742,"Allow multiple selections"),function(newValue,oldValue){model.submitUndoRedoFormatChange(hostUnitContainer,{1:$GET_FORMAT_OBJ($ENUM_FORMAT_PROPERTIES.CONTROL_MULTISELECT,newValue)},null,{success:function(){var defn=model.getUnitDefinitions(hostSelector.k)[hostSelector.k];defn.multi=newValue;var rebuildUnit=mstrmojo.all[hostUnitContainer.id];hostUnitContainer.parent.selectVIUnit(hostUnitContainer.parent.rebuildChild(rebuildUnit),true);}},mstrmojo.DocDataService.SUPPRESS_DATA);}));}if(hostSelector.allowsTogglingAutoSearch()){controls.push(this.getCheckboxAndLabel(hostSelector.iase,mstrmojo.desc(15913,"Allow Instant Search"),function(newValue,oldValue){model.submitUndoRedoFormatChange(hostUnitContainer,{1:$GET_FORMAT_OBJ($ENUM_FORMAT_PROPERTIES.CONTROL_AUTOSEARCH,newValue)},null,{success:function(){var defn=model.getUnitDefinitions(hostSelector.k)[hostSelector.k];defn.iase=newValue;var rebuildUnit=mstrmojo.all[hostUnitContainer.id];hostUnitContainer.parent.selectVIUnit(hostUnitContainer.parent.rebuildChild(rebuildUnit),true);}},mstrmojo.DocDataService.SUPPRESS_DATA);}));}if(hostSelector.allowsSameSizeItems()){var ctrl=this.getCheckboxAndLabel(selectorDefn.iwm===0,mstrmojo.desc(4782,"Make all items the same width"),function(newValue){model.submitUndoRedoFormatChange(hostUnitContainer,{1:$GET_FORMAT_OBJ($ENUM_FORMAT_PROPERTIES.CONTROL_ITEM_WIDTH_MODE,newValue?0:1)},null,{success:function(){var defn=model.getUnitDefinitions(hostSelector.k)[hostSelector.k];defn.iwm=newValue?0:1;model.itemsFitContent=defn.iwm;var rebuildUnit=mstrmojo.all[hostUnitContainer.id];hostUnitContainer.parent.selectVIUnit(hostUnitContainer.parent.rebuildChild(rebuildUnit),true);}},mstrmojo.DocDataService.SUPPRESS_DATA);});model.itemsFitContent=!ctrl.children[0].checked;controls.push(ctrl);}if(hostSelector.supportsShowAllToggle()&&!hostSelector.isAttrQualSelector()&&!hostSelector.isRecursiveAttributeSelector()&&!hostSelector.isSearchBox()&&hostSelector.include){var hasAllItem=selectorDefn.showall;controls.push(this.getCheckboxAndLabel(hasAllItem,mstrmojo.desc(4741,"Show option for all"),function(newValue){model.submitSelectorPropsChange(hostUnitContainer,{showAll:!!newValue},getRebuildUnitCallback(hostUnitContainer));}));if(hasAllItem){var aliasControl=this.getLabelAndControl(mstrmojo.desc(4851,"Alias:"),new mstrmojo.TextBox({value:selectorDefn.allStr||"",valueChangeDelay:500,onvalueChange:function(){selectorDefn.allStr=this.value;model.submitSelectorPropsChange(hostUnitContainer,{allAlias:this.value},getRebuildUnitCallback(hostUnitContainer));}}),"53px","100%");aliasControl.getLabel().cssText="text-align:right;";controls.push(aliasControl);}}this.replaceChildControls(dynamicCtrlGroup,[this.getEditorGroup(controls,{showDivider:false})]);}mstrmojo.vi.models.editors.FilterEditorModel=mstrmojo.declare(mstrmojo.vi.models.editors.BaseEditorModel,null,{scriptClass:"mstrmojo.vi.models.editors.FilterEditorModel",help:"format_panel_filter.htm",getInitialTarget:function getInitialTarget(target){return[mstrmojo.vi.models.editors.BaseEditorModel.TITLE_CONTAINER_VALUE,TARGET_SELECTOR].indexOf(target)>-1?target:mstrmojo.vi.models.editors.BaseEditorModel.TITLE_CONTAINER_VALUE;},getTargetPulldownItems:function getTargetPulldownItems(dynamicCtrlGroup){var pulldownItems=this._super(dynamicCtrlGroup),docSelector=this.getHost();if(!(docSelector&&docSelector.isInvalid)){pulldownItems.push({n:mstrmojo.desc(6189,"Filter"),v:TARGET_SELECTOR,h:getSelectorControls.bind(this,dynamicCtrlGroup)});pulldownItems.reverse();}return pulldownItems;},getTitleFormatCode:function getTitleFormatCode(){return 5;},getEditorContents:function getEditorContents(postUpdateFn){return mstrApp.allowWebDashboardDesign()?this._super(postUpdateFn):[];}});mstrmojo.vi.models.editors.FilterEditorModel.SELECTOR_VALUE=TARGET_SELECTOR;}());