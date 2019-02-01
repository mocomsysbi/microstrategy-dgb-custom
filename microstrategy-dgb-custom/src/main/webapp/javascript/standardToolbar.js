mstrStdToolbarImplScript=true;mstrStdToolbarImpl.ZOOM_BTN_TEXT=["Static","Fit Width","Fit Page"];mstrStdToolbarImpl.prototype=new mstrToolbarImpl();mstrStdToolbarImpl.prototype.zoomBtnInnerHTML="";mstrStdToolbarImpl.prototype.defaultExportFormat;mstrStdToolbarImpl.prototype.currentRWViewMode;mstrStdToolbarImpl.prototype.onload=function(){try{this.initToolbar();this.onselectionchange();this.onupdatemanagerchange();this.initZoom();this.initExportPicker();}catch(err){microstrategy.errors.log(err);return false;}};mstrStdToolbarImpl.prototype.onupdatemanagerchange=function(action){try{var btnUndo=this.getControlFromCmdId("undo");var btnRedo=this.getControlFromCmdId("redo");var btnApply=this.getControlFromCmdId("apply");var at=this.getAppliesTo();if(at){if(btnRedo){if(at.commands&&at.commands.queryEnabled("redoq")){btnRedo.className="mstrIcon-tb";btnRedo.disabled=null;}else{btnRedo.className="mstrIcon-tb disabled";btnRedo.disabled="true";}}if(btnUndo){if(at.commands&&at.commands.queryEnabled("undoq")){btnUndo.className="mstrIcon-tb";btnUndo.disabled=null;}else{btnUndo.className="mstrIcon-tb disabled";btnUndo.disabled="true";}}if(btnApply){if(at.commands&&at.commands.queryEnabled("doFlush")){btnApply.className="mstrIcon-tb";btnApply.disabled=null;}else{btnApply.className="mstrIcon-tb disabled";btnApply.disabled="true";}}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrStdToolbarImpl.prototype.onselectionchange=function(action){try{var btnCopy=this.getControlFromCmdId("copy");var btnCut=this.getControlFromCmdId("cut");var btnDelete=this.getControlFromCmdId("delete");var at=this.getAppliesTo();if(at){if(btnCopy){if(at.commands&&at.commands.queryEnabled("copyq")){btnCopy.className="mstrIcon-tb";btnCopy.disabled=null;}else{btnCopy.className="mstrIcon-tb disabled";btnCopy.disabled="true";}}if(btnCut){if(at.commands&&at.commands.queryEnabled("cutq")){btnCut.className="mstrIcon-tb";btnCut.disabled=null;}else{btnCut.className="mstrIcon-tb disabled";btnCut.disabled="true";}}if(btnDelete){if(at.commands&&at.commands.queryEnabled("deleteq")){btnDelete.className="mstrIcon-tb";btnDelete.disabled=null;}else{btnDelete.className="mstrIcon-tb disabled";btnDelete.disabled="true";}}this.adjustVisualization();}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrStdToolbarImpl.prototype.adjustVisualization=function(){try{mstrToolbarImpl.prototype.adjustVisualization.call(this,this.getControlFromCmdId("docSelectedVisualization"),this.getVisualizationAppliesTo(),this);this.displayVisModeButton("docVisualizationMode");var at=this.getAppliesTo();if(at&&at.commands.queryEnabled("docVisualizationMode")){var visMode=at.commands.queryState("docVisualizationMode");for(var ctrlId in this.controls){var ctrl=this.controls[ctrlId];if(visMode==parseInt(ctrl.getAttribute(microstrategy.HTMLATTR_CMD_VALUE))){ctrl.className="mstrIcon-tb selected";}}}}catch(err){microstrategy.errors.log(err);return false;}};mstrStdToolbarImpl.prototype.onaddtoclipboard=function(action){try{var btnPaste=this.getControlFromCmdId("paste");var at=this.getAppliesTo();if(at){if(btnPaste){btnPaste.className="";btnPaste.disabled=null;}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrStdToolbarImpl.prototype.exec=function(cmdId,cmdVal){try{var at=this.getAppliesTo();if(at){switch(cmdId){case"apply":if(at.commands){(microstrategy.DISPLAY_MODE==microstrategy.DESIGN_MODE)?at.commands.exec("doFlush",false):at.commands.exec("doFlush");}return true;case"rwCurrentViewMode":case"rwChangeDesignMode":if(at.commands){at.commands.exec(cmdId,cmdVal);}return true;case"undo":case"redo":case"copy":case"cut":case"paste":case"delete":if(at.commands){at.commands.exec(cmdId);}return true;case"docVisualizationMode":return this.getVisualizationAppliesTo().commands.exec(cmdId,cmdVal);case"export":var pkrOption=document.getElementById(this.defaultExportFormat);if(pkrOption){if(microstrategy.EXECUTION_SCOPE==microstrategy.RWD_EXECUTION){exportRW(pkrOption.getAttribute("execMode"),pkrOption.getAttribute("target"));}}return true;}return false;}}catch(err){microstrategy.errors.log(err);return false;}};mstrStdToolbarImpl.prototype.execPicker=function(picker,obj){try{var bClose=true;var cmdId=picker.commandId;switch(cmdId){case"docSelectedVisualization":var at=this.getVisualizationAppliesTo();if(at.commands.queryEnabled(cmdId)){var owner=findTarget(obj,"id");if(owner&&owner.tagName.toLowerCase()=="span"){var pickerCombo=this.getControlFromCmdId(cmdId);var currentValue=pickerCombo.getAttribute("value");var value=obj.getAttribute("id");if(currentValue!=value){bClose=at.commands.exec(cmdId,value);this.adjustVisualization();}else{bClose=true;}}else{bClose=false;}}break;case"zoom":var objValue=obj.getAttribute("id").slice(7);var newZoomType;var isZoomChanged;if(objValue=="Width"){newZoomType=microstrategy.ZOOM_FIT_WIDTH;}else{if(objValue=="Page"){newZoomType=microstrategy.ZOOM_FIT_PAGE;}else{newZoomType=microstrategy.ZOOM_STATIC;}}if(objValue!=microstrategy.ZOOM_FACTOR||newZoomType!=microstrategy.zoomType){this.getAppliesTo().commands.exec("ZoomType",newZoomType);var thisControl=this.getControlFromCmdId(cmdId);if(microstrategy.DISPLAY_MODE==microstrategy.VIEW_MODE&&this.currentRWViewMode==microstrategy.RW_VIEW_MODE_FLASH){var at=this.getAppliesTo();if(at){at.callFlashPlayerFn("changeZoomType",[objValue,newZoomType]);}if(microstrategy.zoomType==microstrategy.ZOOM_STATIC){if(thisControl){this.updatePulldownDisplayValue(thisControl,objValue+this.zoomBtnInnerHTML);}bClose=this.getAppliesTo().commands.exec(cmdId,objValue);}else{if(thisControl){this.updatePulldownDisplayValue(thisControl,mstrStdToolbarImpl.ZOOM_BTN_TEXT[microstrategy.zoomType]);}}}else{objValue=this.getNewZoomFactor(objValue,newZoomType);if(thisControl){this.updatePulldownDisplayValue(thisControl,objValue+this.zoomBtnInnerHTML);}bClose=this.getAppliesTo().commands.exec(cmdId,objValue);}}break;case"export":if(obj){if(obj.getAttribute("id")!=this.defaultExportFormat){this.defaultExportFormat=obj.getAttribute("id");microstrategy.updateManager.add([microstrategy.updateManager.createActionObject(this,mstrUpdateManager.SET_TOOLBAR_PROP,this.tbBeanPath,["75001","75002"],["defaultExportFormat",this.defaultExportFormat],[],null)],true);}this.markDefaultExportFormatOnPicker();this.exec(cmdId);}return true;}return bClose;}catch(err){microstrategy.errors.log(err);return true;}};mstrStdToolbarImpl.prototype.getNewZoomFactor=function(zoomFactor,zoomType){switch(zoomType){case microstrategy.ZOOM_STATIC:return zoomFactor;case microstrategy.ZOOM_FIT_WIDTH:return this.getWidthZoomFactor();case microstrategy.ZOOM_FIT_PAGE:return Math.min(this.getHeightZoomFactor(),this.getWidthZoomFactor());}};mstrStdToolbarImpl.prototype.markDefaultExportFormatOnPicker=function(){try{if(this.defaultExportFormat){var expPicker=document.getElementById("pkrExp0");if(expPicker){expPicker.className="mstrIcon-tb "+this.defaultExportFormat;}}}catch(err){microstrategy.errors.log(err);return true;}};mstrStdToolbarImpl.prototype.getWidthZoomFactor=function(){try{var docArea=document.getElementById("page");var viewer=document.getElementById("rwb_viewer");if(docArea&&viewer){var docWidthOffset=0;var vRulerWidth=0;if(docArea.style.borderLeftWidth&&(docArea.style.borderLeftWidth.indexOf("pt")>-1)){docWidthOffset+=parseInt(microstrategy.number.convertUnit(mstrNumber.UNIT_PT,mstrNumber.UNIT_PX,parseInt(docArea.style.borderLeftWidth)));}if(docArea.style.borderRightWidth&&(docArea.style.borderRightWidth.indexOf("pt")>-1)){docWidthOffset+=parseInt(microstrategy.number.convertUnit(mstrNumber.UNIT_PT,mstrNumber.UNIT_PX,parseInt(docArea.style.borderRightWidth)));}docWidthOffset+=getObjWidth(document.getElementById("docRszHandler"));if(document.getElementById("vRulerCol")){vRulerWidth=getObjWidth(document.getElementById("vRulerCol"));}var zoomFactor=((getObjWidth(viewer)-docWidthOffset-2*SCROLLBAR_SIZE)/(getObjWidth(docArea)+vRulerWidth-docWidthOffset)*microstrategy.ZOOM_FACTOR-0.5).toFixed(0);if(zoomFactor<0){return 1;}return zoomFactor;}}catch(err){microstrategy.errors.log(err);return false;}};mstrStdToolbarImpl.prototype.getHeightZoomFactor=function(){try{var docArea=document.getElementById("page");var viewer=document.getElementById("rwb_viewer");var rulerTable=document.getElementById("rwb_ruler_table");if(docArea&&viewer){var docHeightOffset=0;var hRulerHeight=0;if(docArea.style.borderTopWidth&&(docArea.style.borderTopWidth.indexOf("pt")>-1)){docHeightOffset+=parseInt(microstrategy.number.toLocalUnits(mstrNumber.UNIT_PX,microstrategy.number.convertToUSUnits(mstrNumber.UNIT_PT,parseInt(docArea.style.borderTopWidth),true),true));}if(docArea.style.borderBottomWidth&&(docArea.style.borderBottomWidth.indexOf("pt")>-1)){docHeightOffset+=parseInt(microstrategy.number.toLocalUnits(mstrNumber.UNIT_PX,microstrategy.number.convertToUSUnits(mstrNumber.UNIT_PT,parseInt(docArea.style.borderBottomWidth),true),true));}if(document.getElementById("hRulerRow")){hRulerHeight=getObjHeight(document.getElementById("hRulerRow"));}var titleHeight=0;var titles=microstrategy.objectListFind(docArea,"div","dsec");for(var i=0;i<titles.length;i++){var title=titles[i].firstChild;var isTitleDisplay=(title.style.display=="block"||title.style.display=="");if(title.getAttribute(microstrategy.HTMLATTR_SUBOBJTYPE)==microstrategy.SUBOBJTYPE_TITLEBAR&&isTitleDisplay){titleHeight+=getObjHeight(title);}}var zoomFactor=((getObjHeight(viewer)-docHeightOffset-2*SCROLLBAR_SIZE-titleHeight)/(getObjHeight(docArea)+hRulerHeight-titleHeight-docHeightOffset)*microstrategy.ZOOM_FACTOR-0.5).toFixed(0);if(zoomFactor<0){return 1;}return zoomFactor;}}catch(err){microstrategy.errors.log(err);return false;}};mstrStdToolbarImpl.prototype.selectPickerElement=function(picker){try{var cmdId=picker.commandId;var selected=null;switch(cmdId){case"zoom":selected="zoompkr"+microstrategy.ZOOM_FACTOR;var spans=picker.getElementsByTagName("span");for(var i=0,len=spans.length;i<len;i++){if(spans[i].id==selected){spans[i].className+=" selected";}else{spans[i].className=spans[i].className.replace(/\s*selected\b/,"");}}break;default:}}catch(err){microstrategy.errors.log(err);return false;}};mstrStdToolbarImpl.prototype.initZoom=function(){try{var at=this.getAppliesTo();if(at&&at.commands){this.currentRWViewMode=at.commands.queryState("rwCurrentViewMode");}var btn=this.getControlFromCmdId("zoom");if(btn&&btn.firstChild){if(!this.zoomBtnInnerHTML){this.zoomBtnInnerHTML=btn.firstChild.innerHTML;}if((microstrategy.DISPLAY_MODE==microstrategy.VIEW_MODE&&this.currentRWViewMode==microstrategy.RW_VIEW_MODE_FLASH)&&microstrategy.zoomType!=microstrategy.ZOOM_STATIC){this.updatePulldownDisplayValue(btn,mstrStdToolbarImpl.ZOOM_BTN_TEXT[microstrategy.zoomType]);}else{this.updatePulldownDisplayValue(btn,microstrategy.ZOOM_FACTOR+this.zoomBtnInnerHTML);}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrStdToolbarImpl.prototype.getVisualizationAppliesTo=function(){try{if(microstrategy.EXECUTION_SCOPE==microstrategy.RWD_EXECUTION&&!microstrategy.getViewerBone().commands.queryState("selectedGrid")){return microstrategy.getViewerBone();}return this.getAppliesTo();}catch(err){microstrategy.errors.log(err);return false;}};mstrStdToolbarImpl.prototype.initExportPicker=function(){try{var expPicker=document.getElementById("exportPicker");if(!expPicker){return ;}if(!(expPicker.childNodes&&expPicker.childNodes.length>0)&&document.getElementById("pkrExp")){document.getElementById("pkrExp").style.display="none";return ;}this.initDefaultExportFormat(expPicker);}catch(err){microstrategy.errors.log(err);return false;}};mstrStdToolbarImpl.prototype.initDefaultExportFormat=function(expPicker){try{if(microstrategy.EXECUTION_SCOPE==microstrategy.RWD_EXECUTION){if(!this.defaultExportFormat){for(var i=0;i<expPicker.childNodes.length;i++){if(expPicker.childNodes[i]&&expPicker.childNodes[i].getAttribute("default")=="true"){this.defaultExportFormat=expPicker.childNodes[i].getAttribute("id");break;}}}}if(!this.defaultExportFormat||!document.getElementById(this.defaultExportFormat)){if(expPicker.firstChild.childNodes&&expPicker.firstChild.childNodes[0]){this.defaultExportFormat=expPicker.firstChild.childNodes[0].getAttribute("id");}}this.markDefaultExportFormatOnPicker();}catch(err){microstrategy.errors.log(err);return false;}};function mstrStdToolbarImpl(id){this.inherits=mstrToolbarImpl;this.inherits(id);this.inherits=null;return this;}