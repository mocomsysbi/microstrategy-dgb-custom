mstrPromptDefTabImplScript=true;mstrPromptDefTabImpl.prototype=new mstrTabImpl();mstrPromptDefTabImpl.prototype.promptType="";mstrPromptDefTabImpl.prototype.VPDateDefaultID="vp_default_date";mstrPromptDefTabImpl.prototype.VPNumDefaultID="vp_default_num";mstrPromptDefTabImpl.prototype.VPTextDefaultID="vp_default_text";mstrPromptDefTabImpl.prototype.VPBigDecDefaultID="vp_default_bigdec";mstrPromptDefTabImpl.prototype.VPDateMinMaxID="vp_minmax_date";mstrPromptDefTabImpl.prototype.VPNumMinMaxID="vp_minmax_num";mstrPromptDefTabImpl.prototype.VPTextMinMaxID="vp_minmax_text";mstrPromptDefTabImpl.prototype.VPBigDecMinMaxID="vp_minmax_bigdec";mstrPromptDefTabImpl.prototype.TitleID="p_title";mstrPromptDefTabImpl.prototype.DescID="p_desc";mstrPromptDefTabImpl.prototype.VPDate=14;mstrPromptDefTabImpl.prototype.VPText=8;mstrPromptDefTabImpl.prototype.VPNum=6;mstrPromptDefTabImpl.prototype.VPLong=22;mstrPromptDefTabImpl.prototype.VPBigDec=30;mstrPromptDefTabImpl.prototype.FIELDSEPARATOR="~";mstrPromptDefTabImpl.prototype.onload=function(){mstrTabImpl.prototype.onload.call(this);var setTab=function(fld){if(typeof (fld)=="string"){fld=getObj(fld);}if(fld){fld.setAttribute("tab","1");}};setTab("exp_org_name");setTab("exp_search_name");setTab("ep_filter_name");setTab("op_search_value");};mstrPromptDefTabImpl.prototype.initializeDisables=function(){var srcObjs=microstrategy.findChildrenWithAtt(this.elem,"input","disableObjs");if(srcObjs){for(var i=0;i<srcObjs.length;i++){var srcObj=srcObjs[i];if(!srcObj.getAttribute("isHidden")){this.checkDisabled(!srcObj.disabled&&srcObj.checked,srcObj);}}}};mstrPromptDefTabImpl.prototype.updateRadioButton=function(obj){try{var objs=document.getElementsByName(obj.name);for(var i=0;i<objs.length;i++){if(objs[i]!=null&&objs[i].value==obj.value){objs[i].checked=true;this.updateCheck(objs[i]);}else{objs[i].checked=false;this.clearCheck(objs[i]);}}this.updateCheck(obj);}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.updateCheck=function(obj,otherObj){try{if(obj==null){return ;}var cmdId=obj.getAttribute(microstrategy.HTMLATTR_CMD_ID);if(cmdId==null){return ;}var newValue="0";if(obj.checked){newValue="1";}obj.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,newValue);this.checkDisabled(obj.checked,obj);}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.updateCheckByName=function(checkName,checked){try{var obj=document.getElementsByName(checkName);if(obj){if(obj.length){if(obj.length>0){if(obj[0].checked!=checked){obj[0].checked=checked;this.updateCheck(obj[0]);}}}else{if(obj.checked!=checked){obj.checked=checked;this.updateCheck(obj[0]);}}}}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.clearCheck=function(obj){try{if(obj==null){return ;}obj.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,null);}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.updateList=function(obj){try{if(obj){obj.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,obj.value);}}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.onpostload=function(){try{mstrBoneImpl.prototype.onpostload.call(this);this.initSettings();this.initValues();this.updateTextFieldEventHandlerForFF();}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.updateTextFieldEventHandlerForFF=function(){if(bIsFirefox){var textFields=microstrategy.findChildrenWithAtt(this.elem,"input","type","text");if(textFields){for(var i=0;i<textFields.length;i++){if(textFields[i].onblur&&textFields[i].onblur!=""){textFields[i].onkeyup=textFields[i].onblur;}if(textFields[i].onchange&&textFields[i].onchange!=""){textFields[i].onkeyup=textFields[i].onchange;}}}}};mstrPromptDefTabImpl.prototype.initValues=function(){try{if(this.id=="tabPromptDispId"){this.updateDispStyle(document.getElementById("dispStyle"));if(this.isNewPrompt()){this.initNewTitleString();}}}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.initNewTitleString=function(){mstrPromptDefTabImpl.prototype.CONTANT_NEW_TITLE_NUM=microstrategy.descriptors.getDescriptor("3434");mstrPromptDefTabImpl.prototype.CONTANT_NEW_TITLE_TEXT=microstrategy.descriptors.getDescriptor("3544");mstrPromptDefTabImpl.prototype.CONTANT_NEW_TITLE_DATE=microstrategy.descriptors.getDescriptor("2052");mstrPromptDefTabImpl.prototype.CONTANT_NEW_TITLE_BIGDEC=microstrategy.descriptors.getDescriptor("5471");mstrPromptDefTabImpl.prototype.CONTANT_NEW_DESC_NUM=microstrategy.descriptors.getDescriptor("5325");mstrPromptDefTabImpl.prototype.CONTANT_NEW_DESC_TEXT=microstrategy.descriptors.getDescriptor("5326");mstrPromptDefTabImpl.prototype.CONTANT_NEW_DESC_DATE=microstrategy.descriptors.getDescriptor("5327");mstrPromptDefTabImpl.prototype.CONTANT_NEW_DESC_BIGDEC=microstrategy.descriptors.getDescriptor("5328");mstrPromptDefTabImpl.prototype.CONTANT_NEW_NAME_NUM=microstrategy.descriptors.getDescriptor("5473");mstrPromptDefTabImpl.prototype.CONTANT_NEW_NAME_TEXT=microstrategy.descriptors.getDescriptor("5474");mstrPromptDefTabImpl.prototype.CONTANT_NEW_NAME_DATE=microstrategy.descriptors.getDescriptor("5472");mstrPromptDefTabImpl.prototype.CONTANT_NEW_NAME_BIGDEC=microstrategy.descriptors.getDescriptor("5475");mstrPromptDefTabImpl.prototype.ELEMENT_NEW_DESC_ALL=microstrategy.descriptors.getDescriptor("5459");mstrPromptDefTabImpl.prototype.ELEMENT_NEW_DESC_LIST=microstrategy.descriptors.getDescriptor("5459");mstrPromptDefTabImpl.prototype.ELEMENT_NEW_DESC_FILTER=microstrategy.descriptors.getDescriptor("5459");mstrPromptDefTabImpl.prototype.ELEMENT_NEW_NAME_ALL=microstrategy.descriptors.getDescriptor("5464");mstrPromptDefTabImpl.prototype.ELEMENT_NEW_NAME_LIST=microstrategy.descriptors.getDescriptor("5465");mstrPromptDefTabImpl.prototype.ELEMENT_NEW_NAME_FILTER=microstrategy.descriptors.getDescriptor("5466");mstrPromptDefTabImpl.prototype.OBJECT_NEW_TITLE_LIST=microstrategy.descriptors.getDescriptor("5467");mstrPromptDefTabImpl.prototype.OBJECT_NEW_TITLE_SEARCH=microstrategy.descriptors.getDescriptor("5467");mstrPromptDefTabImpl.prototype.OBJECT_NEW_DESC_LIST=microstrategy.descriptors.getDescriptor("5468");mstrPromptDefTabImpl.prototype.OBJECT_NEW_DESC_SEARCH=microstrategy.descriptors.getDescriptor("5468");mstrPromptDefTabImpl.prototype.OBJECT_NEW_NAME_LIST=microstrategy.descriptors.getDescriptor("5469");mstrPromptDefTabImpl.prototype.OBJECT_NEW_NAME_SEARCH=microstrategy.descriptors.getDescriptor("5470");mstrPromptDefTabImpl.prototype.AQ_NEW_TITLE_ONE="";mstrPromptDefTabImpl.prototype.AQ_NEW_TITLE_LIST=microstrategy.descriptors.getDescriptor("5460");mstrPromptDefTabImpl.prototype.AQ_NEW_TITLE_SEARCH=microstrategy.descriptors.getDescriptor("5460");mstrPromptDefTabImpl.prototype.AQ_NEW_DESC_ONE=microstrategy.descriptors.getDescriptor("5453");mstrPromptDefTabImpl.prototype.AQ_NEW_DESC_LIST=microstrategy.descriptors.getDescriptor("5461");mstrPromptDefTabImpl.prototype.AQ_NEW_DESC_SEARCH=microstrategy.descriptors.getDescriptor("5461");mstrPromptDefTabImpl.prototype.AQ_NEW_NAME_ONE=microstrategy.descriptors.getDescriptor("5454");mstrPromptDefTabImpl.prototype.AQ_NEW_NAME_LIST=microstrategy.descriptors.getDescriptor("5462");mstrPromptDefTabImpl.prototype.AQ_NEW_NAME_SEARCH=microstrategy.descriptors.getDescriptor("5463");mstrPromptDefTabImpl.prototype.MQ_NEW_TITLE_ONE="";mstrPromptDefTabImpl.prototype.MQ_NEW_TITLE_LIST=microstrategy.descriptors.getDescriptor("5455");mstrPromptDefTabImpl.prototype.MQ_NEW_TITLE_SEARCH=microstrategy.descriptors.getDescriptor("5455");mstrPromptDefTabImpl.prototype.MQ_NEW_DESC_ONE=microstrategy.descriptors.getDescriptor("5453");mstrPromptDefTabImpl.prototype.MQ_NEW_DESC_LIST=microstrategy.descriptors.getDescriptor("5456");mstrPromptDefTabImpl.prototype.MQ_NEW_DESC_SEARCH=microstrategy.descriptors.getDescriptor("5456");mstrPromptDefTabImpl.prototype.MQ_NEW_NAME_ONE=microstrategy.descriptors.getDescriptor("5454");mstrPromptDefTabImpl.prototype.MQ_NEW_NAME_LIST=microstrategy.descriptors.getDescriptor("5457");mstrPromptDefTabImpl.prototype.MQ_NEW_NAME_SEARCH=microstrategy.descriptors.getDescriptor("5458");mstrPromptDefTabImpl.prototype.HQ_NEW_TITLE_ALL=microstrategy.descriptors.getDescriptor("3583");mstrPromptDefTabImpl.prototype.HQ_NEW_TITLE_ONE=microstrategy.descriptors.getDescriptor("3583");mstrPromptDefTabImpl.prototype.HQ_NEW_TITLE_LIST=microstrategy.descriptors.getDescriptor("3583");mstrPromptDefTabImpl.prototype.HQ_NEW_TITLE_SEARCH=microstrategy.descriptors.getDescriptor("3583");mstrPromptDefTabImpl.prototype.HQ_NEW_DESC_ALL=microstrategy.descriptors.getDescriptor("5447");mstrPromptDefTabImpl.prototype.HQ_NEW_DESC_ONE=microstrategy.descriptors.getDescriptor("5449");mstrPromptDefTabImpl.prototype.HQ_NEW_DESC_LIST=microstrategy.descriptors.getDescriptor("5447");mstrPromptDefTabImpl.prototype.HQ_NEW_DESC_SEARCH=microstrategy.descriptors.getDescriptor("5447");mstrPromptDefTabImpl.prototype.HQ_NEW_NAME_ALL=microstrategy.descriptors.getDescriptor("5448");mstrPromptDefTabImpl.prototype.HQ_NEW_NAME_ONE=microstrategy.descriptors.getDescriptor("5450");mstrPromptDefTabImpl.prototype.HQ_NEW_NAME_LIST=microstrategy.descriptors.getDescriptor("5451");mstrPromptDefTabImpl.prototype.HQ_NEW_NAME_SEARCH=microstrategy.descriptors.getDescriptor("5452");};mstrPromptDefTabImpl.prototype.updateDispStyle=function(dispStyle){try{}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.getSettings=function(props){var settings=new Array();for(var i=0;i<props.length;i++){var elem=document.getElementById(props[i]);if(elem){settings.push(elem);}}return settings;};mstrPromptDefTabImpl.prototype.applyPropertyChanges=function(propertiesArray){for(counter=0;counter<this.settings.length;counter++){var aSetting=this.settings[counter];var inputSettingType=this.getInputType(aSetting);var settingValue;if(inputSettingType=="radio"||inputSettingType=="checkbox"){settingValue=aSetting.checked?"1":"0";}else{settingValue=aSetting.getAttribute(microstrategy.HTMLATTR_CMD_VALUE);}if(aSetting.subSettings!=null){for(j=0;j<aSetting.subSettings.length;j++){var subSetting=aSetting.subSettings[j];if(subSetting.condition==null||settingValue==subSetting.condition){this.appendSettings(subSetting.settings);}}}}mstrTabImpl.prototype.applyPropertyChanges.call(this,propertiesArray);};mstrPromptDefTabImpl.prototype.getChanges=function(){for(counter=0;counter<this.settings.length;counter++){var aSetting=this.settings[counter];var settingValue=aSetting.getAttribute(microstrategy.HTMLATTR_CMD_VALUE);if(aSetting.subSettings!=null){for(j=0;j<aSetting.subSettings.length;j++){var subSetting=aSetting.subSettings[j];if(subSetting.condition==null||settingValue==subSetting.condition){this.appendSettings(subSetting.settings);}}}}mstrTabImpl.prototype.getChanges.call(this);};mstrPromptDefTabImpl.prototype.hasChanged=function(){for(var i=0;i<this.settings.length;i++){var aSetting=this.settings[i];if(aSetting.getAttribute(microstrategy.HTMLATTR_CMD_VALUE)!=null){return true;}else{if(aSetting.subSettings!=null){for(var j=0;j<aSetting.subSettings.length;j++){var subSetting=aSetting.subSettings[j];if(subSetting.settings){for(var k=0;k<subSetting.settings.length;k++){if(subSetting.settings[k].getAttribute(microstrategy.HTMLATTR_CMD_VALUE)!=null){return true;}}}}}}}return false;};mstrPromptDefTabImpl.prototype.appendSettings=function(subSetting){for(i=0;i<subSetting.length;i++){this.settings.push(subSetting[i]);}};mstrPromptDefTabImpl.prototype.switchVPDefaultSection=function(toDataType){var dateSection=document.getElementById(this.VPDateDefaultID);var numSection=document.getElementById(this.VPNumDefaultID);var textSection=document.getElementById(this.VPTextDefaultID);var bigdecSection=document.getElementById(this.VPBigDecDefaultID);switch(toDataType){case 14:if(dateSection.style.display=="block"){return ;}break;case 6:case 22:if(numSection.style.display=="block"){return ;}break;case 8:if(textSection.style.display=="block"){return ;}break;case 30:if(bigdecSection.style.display=="block"){return ;}break;}dateSection.style.display="none";numSection.style.display="none";textSection.style.display="none";bigdecSection.style.display="none";switch(toDataType){case 14:dateSection.style.display="block";break;case 6:case 22:numSection.style.display="block";break;case 8:textSection.style.display="block";break;case 30:bigdecSection.style.display="block";break;}};mstrPromptDefTabImpl.prototype.switchVPMinMaxSection=function(toDataType){var dateSection=document.getElementById(this.VPDateMinMaxID);var numSection=document.getElementById(this.VPNumMinMaxID);var textSection=document.getElementById(this.VPTextMinMaxID);var bigdecSection=document.getElementById(this.VPBigDecMinMaxID);switch(toDataType){case 14:if(dateSection.style.display=="block"){return ;}break;case 6:case 22:if(numSection.style.display=="block"){return ;}break;case 8:if(textSection.style.display=="block"){return ;}break;case 30:if(bigdecSection.style.display=="block"){return ;}break;}dateSection.style.display="none";numSection.style.display="none";textSection.style.display="none";bigdecSection.style.display="none";switch(toDataType){case 14:dateSection.style.display="block";break;case 6:case 22:numSection.style.display="block";break;case 8:textSection.style.display="block";break;case 30:bigdecSection.style.display="block";break;}};mstrPromptDefTabImpl.prototype.updateTitleAndDesc=function(){if(this.isNewPrompt()){var titleField=getObj("p_title");var descField=getObj("p_desc");var nameField=getObj("p_name");var promptType=this.getPromptType();switch(promptType){case mstrPromptDefImpl.CONSTANT_PROMPT:this.updateConstantPromptTitleAndDesc(titleField,descField,nameField);break;case mstrPromptDefImpl.ELEMENTS_PROMPT:this.updateElementsPromptTitleAndDesc(titleField,descField,nameField);break;case mstrPromptDefImpl.OBJECTS_PROMPT:this.updateObjectsPromptTitleAndDesc(titleField,descField,nameField);break;case mstrPromptDefImpl.EXPRESSION_PROMPT:this.updateExpressionPromptTitleAndDesc(titleField,descField,nameField);break;}if(titleField.value!=""){titleField.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,titleField.value);}if(descField.value!=""){descField.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,descField.value);}if(nameField.value!=""){nameField.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,nameField.value);}}};mstrPromptDefTabImpl.prototype.updateConstantPromptTitleAndDesc=function(titleField,descField,nameField){var dataType=this.getConstantPromptDataType();switch(dataType){case mstrPromptDefTabImpl.prototype.VPDate:if(this.isFieldUnInit(titleField)){titleField.value=this.CONTANT_NEW_TITLE_DATE;}if(this.isFieldUnInit(descField)){descField.value=this.CONTANT_NEW_DESC_DATE;}if(this.isFieldUnInit(nameField)){nameField.value=this.CONTANT_NEW_NAME_DATE;}break;case mstrPromptDefTabImpl.prototype.VPText:if(this.isFieldUnInit(titleField)){titleField.value=this.CONTANT_NEW_TITLE_TEXT;}if(this.isFieldUnInit(descField)){descField.value=this.CONTANT_NEW_DESC_TEXT;}if(this.isFieldUnInit(nameField)){nameField.value=this.CONTANT_NEW_NAME_TEXT;}break;case mstrPromptDefTabImpl.prototype.VPNum:case mstrPromptDefTabImpl.prototype.VPLong:if(this.isFieldUnInit(titleField)){titleField.value=this.CONTANT_NEW_TITLE_NUM;}if(this.isFieldUnInit(descField)){descField.value=this.CONTANT_NEW_DESC_NUM;}if(this.isFieldUnInit(nameField)){nameField.value=this.CONTANT_NEW_NAME_NUM;}break;case mstrPromptDefTabImpl.prototype.VPBigDec:if(this.isFieldUnInit(titleField)){titleField.value=this.CONTANT_NEW_TITLE_BIGDEC;}if(this.isFieldUnInit(descField)){descField.value=this.CONTANT_NEW_DESC_BIGDEC;}if(this.isFieldUnInit(nameField)){nameField.value=this.CONTANT_NEW_NAME_BIGDEC;}break;}};mstrPromptDefTabImpl.prototype.isFieldUnInit=function(field){if(field&&!field.modified){return true;}else{return false;}};mstrPromptDefTabImpl.prototype.updateElementsPromptTitleAndDesc=function(titleField,descField,nameField){var radioButton;var attrField=getObj("ep_att_name");var attName=attrField?attrField.value:"";if(attName==null||attName==""){return ;}radioButton=getObj("ep_elem_restriction_all");if(radioButton&&radioButton.checked){if(this.isFieldUnInit(titleField)){titleField.value=attName;}if(this.isFieldUnInit(descField)){descField.value=this.ELEMENT_NEW_DESC_ALL.replace("##",attName);}if(this.isFieldUnInit(nameField)){nameField.value=this.ELEMENT_NEW_NAME_ALL.replace("##",attName);}return ;}radioButton=getObj("ep_elem_restriction_pre");if(radioButton&&radioButton.checked){if(this.isFieldUnInit(titleField)){titleField.value=attName;}if(this.isFieldUnInit(descField)){descField.value=this.ELEMENT_NEW_DESC_LIST.replace("##",attName);}if(this.isFieldUnInit(nameField)){nameField.value=this.ELEMENT_NEW_NAME_LIST.replace("##",attName);}return ;}radioButton=getObj("ep_elem_restriction_filter");if(radioButton&&radioButton.checked){var filterField=getObj("ep_filter_name");if(filterField==null||filterField.value==""){return ;}var filterName=filterField.value;if(this.isFieldUnInit(titleField)){titleField.value=attName;}if(this.isFieldUnInit(descField)){descField.value=this.ELEMENT_NEW_DESC_FILTER.replace("##",attName);}if(this.isFieldUnInit(nameField)){nameField.value=this.ELEMENT_NEW_NAME_FILTER.replace("###",filterName).replace("##",attName);}return ;}};mstrPromptDefTabImpl.prototype.updateObjectsPromptTitleAndDesc=function(titleField,descField,nameField){var radioButton;radioButton=getObj("opPredefined");if(radioButton&&radioButton.checked){if(this.isFieldUnInit(titleField)){titleField.value=this.OBJECT_NEW_TITLE_LIST;}if(this.isFieldUnInit(descField)){descField.value=this.OBJECT_NEW_DESC_LIST;}if(this.isFieldUnInit(nameField)){nameField.value=this.OBJECT_NEW_NAME_LIST;}return ;}radioButton=getObj("opSearch");if(radioButton&&radioButton.checked){var searchField=getObj("op_search_value");if(searchField==null||searchField.value==""){return ;}var searchName=searchField.value;if(this.isFieldUnInit(titleField)){titleField.value=this.OBJECT_NEW_TITLE_SEARCH;}if(this.isFieldUnInit(descField)){descField.value=this.OBJECT_NEW_DESC_SEARCH;}if(this.isFieldUnInit(nameField)){nameField.value=this.OBJECT_NEW_NAME_SEARCH.replace("##",searchName);}return ;}};mstrPromptDefTabImpl.prototype.updateExpressionPromptTitleAndDesc=function(titleField,descField,nameField){var radioButton;radioButton=getObj("exp_type_all");if(radioButton&&radioButton.checked){if(this.isAQ()){if(this.isFieldUnInit(titleField)){titleField.value=this.AQ_NEW_TITLE_ALL;}if(this.isFieldUnInit(descField)){descField.value=this.AQ_NEW_DESC_ALL;}if(this.isFieldUnInit(nameField)){nameField.value=this.AQ_NEW_NAME_ALL;}}else{if(this.isMQ()){if(this.isFieldUnInit(titleField)){titleField.value=this.MQ_NEW_TITLE_ALL;}if(this.isFieldUnInit(descField)){descField.value=this.MQ_NEW_DESC_ALL;}if(this.isFieldUnInit(nameField)){nameField.value=this.MQ_NEW_NAME_ALL;}}else{if(this.isHQ()){if(this.isFieldUnInit(titleField)){titleField.value=this.HQ_NEW_TITLE_ALL;}if(this.isFieldUnInit(descField)){descField.value=this.HQ_NEW_DESC_ALL;}if(this.isFieldUnInit(nameField)){nameField.value=this.HQ_NEW_NAME_ALL;}}}}return ;}radioButton=getObj("exp_type_one");if(radioButton&&radioButton.checked){var objField=getObj("exp_org_name");if(objField==null||objField.value==""){return ;}var objName=objField.value;if(this.isAQ()){if(this.isFieldUnInit(titleField)){titleField.value=objName;}if(this.isFieldUnInit(descField)){descField.value=this.AQ_NEW_DESC_ONE.replace("##",objName);}if(this.isFieldUnInit(nameField)){nameField.value=this.AQ_NEW_NAME_ONE.replace("##",objName);}}else{if(this.isMQ()){if(this.isFieldUnInit(titleField)){titleField.value=objName;}if(this.isFieldUnInit(descField)){descField.value=this.MQ_NEW_DESC_ONE.replace("##",objName);}if(this.isFieldUnInit(nameField)){nameField.value=this.MQ_NEW_NAME_ONE.replace("##",objName);}}else{if(this.isHQ()){if(this.isFieldUnInit(titleField)){titleField.value=objName;}if(this.isFieldUnInit(descField)){descField.value=this.HQ_NEW_DESC_ONE.replace("##",objName);}if(this.isFieldUnInit(nameField)){nameField.value=this.HQ_NEW_NAME_ONE.replace("##",objName);}}}}return ;}radioButton=getObj("exp_type_pre");if(radioButton&&radioButton.checked){if(this.isAQ()){if(this.isFieldUnInit(titleField)){titleField.value=this.AQ_NEW_TITLE_LIST;}if(this.isFieldUnInit(descField)){descField.value=this.AQ_NEW_DESC_LIST;}if(this.isFieldUnInit(nameField)){nameField.value=this.AQ_NEW_NAME_LIST;}}else{if(this.isMQ()){if(this.isFieldUnInit(titleField)){titleField.value=this.MQ_NEW_TITLE_LIST;}if(this.isFieldUnInit(descField)){descField.value=this.MQ_NEW_DESC_LIST;}if(this.isFieldUnInit(nameField)){nameField.value=this.MQ_NEW_NAME_LIST;}}else{if(this.isHQ()){if(this.isFieldUnInit(titleField)){titleField.value=this.HQ_NEW_TITLE_LIST;}if(this.isFieldUnInit(descField)){descField.value=this.HQ_NEW_DESC_LIST;}if(this.isFieldUnInit(nameField)){nameField.value=this.HQ_NEW_NAME_LIST;}}}}return ;}radioButton=getObj("exp_type_search");if(radioButton&&radioButton.checked){var searchField=getObj("exp_search_name");if(searchField==null||searchField.value==""){return ;}var searchName=searchField.value;if(this.isAQ()){if(this.isFieldUnInit(titleField)){titleField.value=this.AQ_NEW_TITLE_SEARCH;}if(this.isFieldUnInit(descField)){descField.value=this.AQ_NEW_DESC_SEARCH.replace("##",searchName);}if(this.isFieldUnInit(nameField)){nameField.value=this.AQ_NEW_NAME_SEARCH.replace("##",searchName);}}else{if(this.isMQ()){if(this.isFieldUnInit(titleField)){titleField.value=this.MQ_NEW_TITLE_SEARCH;}if(this.isFieldUnInit(descField)){descField.value=this.MQ_NEW_DESC_SEARCH.replace("##",searchName);}if(this.isFieldUnInit(nameField)){nameField.value=this.MQ_NEW_NAME_SEARCH.replace("##",searchName);}}else{if(this.isHQ()){if(this.isFieldUnInit(titleField)){titleField.value=this.HQ_NEW_TITLE_SEARCH;}if(this.isFieldUnInit(descField)){descField.value=this.HQ_NEW_DESC_SEARCH.replace("##",searchName);}if(this.isFieldUnInit(nameField)){nameField.value=this.HQ_NEW_NAME_SEARCH.replace("##",searchName);}}}}return ;}};mstrPromptDefTabImpl.prototype.getInputType=function(field){var fType=field.nodeName;if(fType==null||fType==""){return null;}if(fType.toLowerCase()=="input"){return field.type.toLowerCase();}else{return null;}};mstrPromptDefTabImpl.prototype.removeItems=function(fromList){var cmdid=null;var sCount=0;if(fromList!=null){var fromListObj=getObj(fromList);for(i=fromListObj.options.length-1;i>=0;i--){if(fromListObj.options[i].selected){var option=fromListObj.options[i];fromListObj.options[i]=null;sCount++;}}}if(sCount>0){fromListObj.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,"1");}};mstrPromptDefTabImpl.prototype.removeAllItems=function(fromList){var cmdid=null;var sCount=0;if(fromList!=null){var fromListObj=getObj(fromList);for(i=fromListObj.options.length-1;i>=0;i--){var option=fromListObj.options[i];fromListObj.options[i]=null;sCount++;}}if(sCount>0){fromListObj.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,"1");}};mstrPromptDefTabImpl.prototype.moveUpItem=function(fromList){var fromListObj=null;if(fromList!=null){fromListObj=getObj(fromList);}if(fromListObj!=null&&fromListObj.selectedIndex>0){var selected=fromListObj.selectedIndex;this.swapOptions(fromListObj,selected,selected-1);fromListObj.selectedIndex=selected-1;fromListObj.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,"1");}};mstrPromptDefTabImpl.prototype.moveDownItem=function(fromList){var fromListObj=null;if(fromList!=null){fromListObj=getObj(fromList);}if(fromListObj!=null&&fromListObj.selectedIndex>=0&&fromListObj.selectedIndex<fromListObj.length-1){var selected=fromListObj.selectedIndex;this.swapOptions(fromListObj,selected,selected+1);fromListObj.selectedIndex=selected+1;fromListObj.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,"1");}};mstrPromptDefTabImpl.prototype.swapOptions=function(obj,i,j){var o=obj.options;var i_selected=o[i].selected;var j_selected=o[j].selected;var temp=new Option(o[i].text,o[i].value,o[i].defaultSelected,o[i].selected);var temp2=new Option(o[j].text,o[j].value,o[j].defaultSelected,o[j].selected);o[i]=temp2;o[j]=temp;o[i].selected=j_selected;o[j].selected=i_selected;};mstrPromptDefTabImpl.prototype.hasOptions=function(obj){if(obj!=null&&obj.options!=null){return true;}return false;};mstrPromptDefTabImpl.prototype.sortSelect=function(obj){var o=new Array();if(!this.hasOptions(obj)){return ;}for(var i=0;i<obj.options.length;i++){o[o.length]=new Option(obj.options[i].text,obj.options[i].value,obj.options[i].defaultSelected,obj.options[i].selected);}if(o.length==0){return ;}o=o.sort(function(a,b){if((a.text+"")<(b.text+"")){return -1;}if((a.text+"")>(b.text+"")){return 1;}return 0;});for(var i=0;i<o.length;i++){obj.options[i]=new Option(o[i].text,o[i].value,o[i].defaultSelected,o[i].selected);}};mstrPromptDefTabImpl.prototype.moveSelectedOptions=function(from,to,sortFrom,sortTo){if(!this.hasOptions(from)){return ;}for(var i=0;i<from.options.length;i++){var o=from.options[i];if(o.selected){if(!this.hasOptions(to)){var index=0;}else{var index=to.options.length;}to.options[index]=new Option(o.text,o.value,false,false);to.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,"1");}}for(var i=(from.options.length-1);i>=0;i--){var o=from.options[i];if(o.selected){from.options[i]=null;from.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,"1");}}if(sortFrom){this.sortSelect(from);}if(sortTo){this.sortSelect(to);}from.selectedIndex=from.options.length>0?0:-1;to.selectedIndex=-1;};mstrPromptDefTabImpl.prototype.selectAllOptions=function(obj){if(!this.hasOptions(obj)){return ;}for(var i=0;i<obj.options.length;i++){obj.options[i].selected=true;}};mstrPromptDefTabImpl.prototype.moveAllOptions=function(from,to,sortFrom,sortTo){this.selectAllOptions(from);this.moveSelectedOptions(from,to,sortFrom,sortTo);};mstrPromptDefTabImpl.prototype.execImmediately=function(obj){var at=this.getAppliesTo();var cmdid=obj.getAttribute(microstrategy.HTMLATTR_CMD_ID);if(cmdid!=null&&at!=null){at.commands.exec(cmdid);}};mstrPromptDefTabImpl.prototype.isNewPrompt=function(){try{var at=this.getAppliesTo();return at.isNew;}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.setSearchBased=function(based){try{var at=this.getAppliesTo();at.searchBased=based;}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.getPromptType=function(){try{var at=this.getAppliesTo();return at.webPromptType;}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.isAQ=function(){try{var at=this.getAppliesTo();var expType=at.expressionType;return at.webPromptType==mstrPromptDefImpl.EXPRESSION_PROMPT&&(expType==mstrPromptDefImpl.AQID||expType==mstrPromptDefImpl.AQDEC);}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.isMQ=function(){try{var at=this.getAppliesTo();var expType=at.expressionType;return at.webPromptType==mstrPromptDefImpl.EXPRESSION_PROMPT&&(expType==mstrPromptDefImpl.MQSingle||expType==mstrPromptDefImpl.MQExp);}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.isHQ=function(){try{var at=this.getAppliesTo();var expType=at.expressionType;return at.webPromptType==mstrPromptDefImpl.EXPRESSION_PROMPT&&expType==mstrPromptDefImpl.HQ;}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.isEL=function(){try{var at=this.getAppliesTo();return at.webPromptType==mstrPromptDefImpl.ELEMENTS_PROMPT;}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.getAllCustomStyles=function(){try{var at=this.getAppliesTo();return at.customStyles;}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.getCustomStyleNoneName=function(){try{var at=this.getAppliesTo();return at.customStyleNoneName;}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.searchBased=function(){try{var at=this.getAppliesTo();return at.searchBased;}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabImpl.prototype.getQuestionTabSelectionType=function(){try{var objs=document.getElementsByName("exp_type");for(var i=0;i<objs.length;i++){if(objs[i].checked){return objs[i].value;}}return"";}catch(err){microstrategy.errors.log(err);return"";}};mstrPromptDefTabImpl.prototype.getConstantPromptDataType=function(){var at=this.getAppliesTo();if((at.isNew&&!at.isInFilter)||at.constantPromptType<0){var dateVPCheck=getObj("vp_type_Date");if(dateVPCheck&&dateVPCheck.checked){return mstrPromptDefTabImpl.prototype.VPDate;}var numVPCheck=getObj("vp_type_Num");if(numVPCheck&&numVPCheck.checked){return mstrPromptDefTabImpl.prototype.VPNum;}var textVPCheck=getObj("vp_type_Text");if(textVPCheck&&textVPCheck.checked){return mstrPromptDefTabImpl.prototype.VPText;}var bigDecVPCheck=getObj("vp_type_BigDec");if(bigDecVPCheck&&bigDecVPCheck.checked){return mstrPromptDefTabImpl.prototype.VPBigDec;}}else{return at.constantPromptType;}};mstrPromptDefTabImpl.prototype.checkDisabled=function(enable,sourceObj){var disableObjs=sourceObj.getAttribute("disableObjs");if(disableObjs){var objs=disableObjs.split(",");for(var i=0;i<objs.length;i++){var targetObj=getObj(objs[i]);if(targetObj){targetObj.disabled=!enable;}if(targetObj.tagName.toLowerCase()=="img"&&targetObj.id.indexOf("calendar")>-1){targetObj.className=enable?"mstrCalendarPulldown":"mstrCalendarPulldownDisabled";}}}};mstrPromptDefTabImpl.prototype.openMultiSelector=function(preSelectedList,boneId,callback,contextId,singleSelect){var selector;var select=document.getElementById(preSelectedList);var options=select&&select.options;var items=new Array();if(options){for(var i=0;i<options.length;i++){items[i]={};items[i].desc=options[i].text;var values=options[i].value&&options[i].value.split(this.FIELDSEPARATOR);if(values.length>0){items[i].dssid=values[0];}if(values.length>1){items[i].tp=values[1];}if(values.length>2){items[i].n=values[2];}else{items[i].n=options[i].text;}if(values.length>3){items[i].stp=values[3];}items[i].icon=(this.CSSNAME[items[i].tp]&&this.CSSNAME[items[i].tp][items[i].stp])||this.CSSNAME[items[i].tp]||"";}}if(!singleSelect){selector=mstr.$obj("ObjectSelector1");if(!selector){alert("can not find the selector");}var select=document.getElementById(preSelectedList);var options=select&&select.options;var items=new Array();if(options){for(var i=0;i<options.length;i++){items[i]={};items[i].desc=options[i].text;var values=options[i].value&&options[i].value.split(this.FIELDSEPARATOR);if(values.length>0){items[i].dssid=values[0];}if(values.length>1){items[i].tp=values[1];}if(values.length>2){items[i].n=values[2];}else{items[i].n=options[i].text;}if(values.length>3){items[i].stp=values[3];}items[i].icon=(this.CSSNAME[items[i].tp]&&this.CSSNAME[items[i].tp][items[i].stp])||this.CSSNAME[items[i].tp]||"";}}var cartJson={scriptClass:"mstr.models.ListCart",keepAvailableItems:selectorsParams.keepAvailableItems,allowedItemFormName:selectorsParams[contextId].allowedItemFormName,allowedItemFormValues:selectorsParams[contextId].allowedItemFormValues,prohibitedItemFormValues:selectorsParams[contextId].prohibitedItemFormValues,available:{scriptClass:"mstr.models.ListModel",blockCount:selectorsParams.blockCount,valueForm:"dssid",hierarchical:true,keepFolders:true,allowedItemFormName:selectorsParams[contextId].allowedItemFormName,allowedItemFormValues:selectorsParams[contextId].allowedItemFormValues,objectType:selectorsParams[contextId].objectType||"",containerTree:mstr.$H.deepClone(selectorsParams[contextId].tree)},selected:{scriptClass:"mstr.models.ListModel",valueForm:"dssid",keepEntryPoints:true,items:items}};var cartModel=mstr.controllers.Factory.registerJSON(cartJson);cartModel.init();selector.set("visible",false);selector.setModel(cartModel);selector.getModel().get("available").execFetchData();var okButton=selector.get("cmdButtons")[0];okButton["CommandEnabled"+callback]=true;okButton.cmds=callback+"|parent/model/selected/getItems()|#"+boneId+";Unpop||parent";}else{selector=mstr.$obj("SingleObjectSelector1");if(!selector){alert("can not find the selector");}var listJson={scriptClass:"mstr.models.ListModel",blockCount:selectorsParams.blockCount,valueForm:"dssid",hierarchical:true,keepFolders:true,allowedItemFormName:selectorsParams[contextId].allowedItemFormName,allowedItemFormValues:selectorsParams[contextId].allowedItemFormValues,objectType:selectorsParams[contextId].objectType,containerTree:mstr.$H.deepClone(selectorsParams[contextId].tree)};var listModel=mstr.controllers.Factory.registerJSON(listJson);listModel.init();selector.set("visible",false);selector.setModel(listModel);selector.getModel().execFetchData();var okButton=selector.get("cmdButtons")[0];if(okButton.set){okButton.set(("CommandEnabled"+callback),true);okButton.set("cmdArray",null);okButton.set("cmds",callback+"|parent/model/getSelectedItems()|#"+boneId+";Unpop||parent");}else{okButton["CommandEnabled"+callback]=true;okButton.cmds=callback+"|parent/model/getSelectedItems()|#"+boneId+";Unpop||parent";}}selector.set("helpPath",selectorsParams.helpPath);selector.set("visible",true);selector.render();};mstrPromptDefTabImpl.prototype.CSSNAME={"12":"a","4":"m","8":"f","44":"sr","58":"sf","1":{"256":"fi","257":"cg"},"2":"t","3":{"772":"dm","776":"cb","775":"b","773":"g","774":"g","768":"g","769":"gp","777":"ir"},"14":"hi","10":"pr","39":"srch","34":{"8705":"ug","8704":"u"},"47":"co","13":"fa","15":"ta","11":"fun","43":{"11009":"trans"},"55":{"14081":"rw","14080":"d"}};mstrPromptDefTabImpl.prototype.queryCommandEnabled=function(cmdId){var __result=false;switch(cmdId){case"SET_OBJECTS_AVAILABLE_LIST":case"SET_OBJECTS_SEARCH":case"SET_EXP_ORG_ATTRIBUTE":case"SET_EXP_ORG_METRIC":case"SET_EXP_ORG_HIERARCHY":case"SET_EXP_SEARCH":case"SET_EXP_PRELIST":case"SET_EP_ATTR":case"SET_EP_GEO_LEVEL":case"SET_EP_FILTER":__result=true;break;}return __result;};mstrPromptDefTabImpl.prototype.execCommand=function(id,value){switch(id){case"SET_OBJECTS_AVAILABLE_LIST":var preList=document.getElementById("op_elem_pre_list");var options=preList.options;this.removeAllItems(preList);for(var i=0;i<value.length;i++){options[i]=new Option(value[i].n,value[i].dssid+this.FIELDSEPARATOR+value[i].tp+this.FIELDSEPARATOR+value[i].n+this.FIELDSEPARATOR+value[i].stp,false,false);}preList.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,"1");preList.onchange&&preList.onchange();var searchInput=document.getElementById("op_search_value");searchInput.value="";searchInput.removeAttribute(microstrategy.HTMLATTR_CMD_VALUE);this.setSearchBased(false);microstrategy.bone("tabPromptStyleId").adjustStyleListForOrigin(false);break;case"SET_OBJECTS_SEARCH":if(value==undefined||value.length==0){return ;}var searchInput=document.getElementById("op_search_value");searchInput.value=value[0].n;searchInput.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,value[0].dssid+this.FIELDSEPARATOR+value[0].tp+this.FIELDSEPARATOR+value[0].n+this.FIELDSEPARATOR+value[0].stp);var preList=document.getElementById("op_elem_pre_list");var options=preList.options;this.removeAllItems(preList);preList.removeAttribute(microstrategy.HTMLATTR_CMD_VALUE);this.setSearchBased(true);microstrategy.bone("tabPromptStyleId").adjustStyleListForOrigin(false);break;case"SET_EXP_ORG_METRIC":case"SET_EXP_ORG_HIERARCHY":case"SET_EXP_ORG_ATTRIBUTE":var orgInput=document.getElementById("exp_org_name");orgInput.value=value[0].n;orgInput.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,value[0].dssid+this.FIELDSEPARATOR+value[0].tp+this.FIELDSEPARATOR+value[0].n+this.FIELDSEPARATOR+value[0].stp);var preList=document.getElementById("exp_elem_pre_list");var options=preList.options;this.removeAllItems(preList);preList.removeAttribute(microstrategy.HTMLATTR_CMD_VALUE);var searchInput=document.getElementById("exp_search_name");searchInput.n="";searchInput.removeAttribute(microstrategy.HTMLATTR_CMD_VALUE);this.setSearchBased(false);microstrategy.bone("tabPromptStyleId").adjustStyleListForOrigin(false);if(id=="SET_EXP_ORG_ATTRIBUTE"){var customForms=document.getElementById("exp_custom_forms");if(customForms){customForms.options.length=0;customForms.removeAttribute(microstrategy.HTMLATTR_CMD_VALUE);}this.tabManager.applyPropertyChanges("processCommands",false);microstrategy.updateManager.useIframe=false;microstrategy.updateManager.flushAndSubmitChanges();}break;case"SET_EXP_SEARCH":if(value==undefined||value.length==0){return ;}var searchInput=document.getElementById("exp_search_name");searchInput.value=value[0].n;searchInput.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,value[0].dssid+this.FIELDSEPARATOR+value[0].tp+this.FIELDSEPARATOR+value[0].n+this.FIELDSEPARATOR+value[0].stp);var preList=document.getElementById("exp_elem_pre_list");var options=preList.options;this.removeAllItems(preList);preList.removeAttribute(microstrategy.HTMLATTR_CMD_VALUE);var orgInput=document.getElementById("exp_org_name");orgInput.value="";orgInput.removeAttribute(microstrategy.HTMLATTR_CMD_VALUE);this.setSearchBased(true);microstrategy.bone("tabPromptStyleId").adjustStyleListForOrigin(false);break;case"SET_EXP_PRELIST":var preList=document.getElementById("exp_elem_pre_list");var options=preList.options;this.removeAllItems(preList);for(var i=0;i<value.length;i++){options[i]=new Option(value[i].n,value[i].dssid+this.FIELDSEPARATOR+value[i].tp+this.FIELDSEPARATOR+value[i].n+this.FIELDSEPARATOR+value[i].stp,false,false);}preList.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,"1");if(preList.onchange){preList.onchange();}if(this.refreshEXPButtonStates){this.refreshEXPButtonStates();}var searchInput=document.getElementById("exp_search_name");searchInput.value="";searchInput.removeAttribute(microstrategy.HTMLATTR_CMD_VALUE);var orgInput=document.getElementById("exp_org_name");orgInput.value="";orgInput.removeAttribute(microstrategy.HTMLATTR_CMD_VALUE);this.setSearchBased(false);microstrategy.bone("tabPromptStyleId").adjustStyleListForOrigin(false);break;case"SET_EP_ATTR":var orgInput=document.getElementById("ep_att_name");var oldAttr=orgInput.value;orgInput.value=value[0].n;orgInput.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,value[0].dssid+this.FIELDSEPARATOR+value[0].tp+this.FIELDSEPARATOR+value[0].n+this.FIELDSEPARATOR+value[0].stp);var at=this.getAppliesTo();if(at){at.currentAttributeId=value[0].dssid;}if(orgInput.value&&this.refreshEPButtonStates){this.refreshEPButtonStates();}if(!oldAttr||oldAttr.length==0){return ;}var preList=document.getElementById("ep_elem_pre_list");var options=preList.options;this.removeAllItems(preList);preList.removeAttribute(microstrategy.HTMLATTR_CMD_VALUE);var searchInput=document.getElementById("ep_filter_name");searchInput.n="";searchInput.removeAttribute(microstrategy.HTMLATTR_CMD_VALUE);this.setSearchBased(false);microstrategy.bone("tabPromptStyleId").adjustStyleListForOrigin(false);break;case"SET_EP_GEO_LEVEL":var orgInput=document.getElementById("p_GeoLevel_name");var hiddenInput=document.getElementById("p_GeoLevel_dssid");orgInput.value=value[0].n;var attId=value[0].dssid;orgInput.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,attId);hiddenInput.value=attId;break;case"SET_EP_FILTER":if(value==undefined||value.length==0){return ;}var filterInput=document.getElementById("ep_filter_name");filterInput.value=value[0].n;filterInput.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,value[0].dssid+this.FIELDSEPARATOR+value[0].tp+this.FIELDSEPARATOR+value[0].n+this.FIELDSEPARATOR+value[0].stp);var preList=document.getElementById("ep_elem_pre_list");var options=preList.options;this.removeAllItems(preList);preList.removeAttribute(microstrategy.HTMLATTR_CMD_VALUE);this.setSearchBased(true);microstrategy.bone("tabPromptStyleId").adjustStyleListForOrigin(false);break;}};function mstrPromptDefTabImpl(id){this.inherits=mstrTabImpl;this.inherits(id);this.inherits=null;return this;}