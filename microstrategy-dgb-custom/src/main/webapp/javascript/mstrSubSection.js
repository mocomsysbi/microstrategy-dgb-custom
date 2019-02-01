mstrSubSection.prototype=new mstrBoneImpl();mstrSubSection.prototype.maxZindex=1;mstrSubSection.prototype.minZindex=1;mstrSubSection.prototype.path="";mstrSubSection.prototype.type=microstrategy.OBJTYPE_DOC_SUBSECTION;mstrSubSection.prototype.verifiedPath="";mstrSubSection.prototype.isDetails=false;mstrSubSection.prototype.sibs=null;mstrSubSection.prototype.doc=null;mstrSubSection.prototype.needToUpdateMaxContentHeight=true;mstrSubSection.prototype.subsectionType=0;mstrSubSection.prototype.oldHeight=null;mstrSubSection.prototype.gradientInfo=null;mstrSubSection.prototype.sibsWithGradients=null;mstrSubSection.TYPE_FIXED=0;mstrSubSection.TYPE_HORIZ=1;mstrSubSection.TYPE_PANEL=2;mstrSubSection.prototype.onload=function(){try{mstrBoneImpl.prototype.onload.call(this);this.verifiedPath=microstrategy.getEventHandlerString(this.path);this.sibs=document.getElementsByName(this.id);var viewerBone=microstrategy.getViewerBone();this.minZindex=1;if(viewerBone.isInteractiveViewModeEplus()){this.initGuideline();this.calcZIndexAndPositions();}this.doc=viewerBone.doc;if(viewerBone.gradientsOnSS){this.initGradients();}}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.getGradientInfo=function(){try{if(!this.gradientInfo){this.gradientInfo=[];}return this.gradientInfo;}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.setSibsWithGradients=function(objs){try{this.sibsWithGradients=[];if(objs){for(i=0;i<objs.length;i++){this.sibsWithGradients.push(objs[i]);}}}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.setGradientInfo=function(objs,gradientSettings){try{this.gradientInfo=[];if(gradientSettings){for(i=0;i<objs.length;i++){this.gradientInfo.push(gradientSettings);}}}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.getSibsWithGradients=function(){try{if(!this.sibsWithGradients){this.sibsWithGradients=[];}return this.sibsWithGradients;}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.initGradients=function(){try{for(var i=0;i<this.sibs.length;i++){var gradColor=this.sibs[i].getAttribute("gradientcolor");if(gradColor){this.getGradientInfo().push(gradColor.split(","));this.getSibsWithGradients().push(this.sibs[i]);}}}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.syncPosition=function(){try{this.applyGradient();}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.initGuideline=function(){try{if(microstrategy.getViewerBone().isEditableViewModeEplus()){this.guidelineEnabled=true;this.positionMap=this.positionMap||{};}}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.initPositionMap=function(){try{if(!this.guidelineEnabled||this.positionMapReady){return ;}for(var i=0,len=this.sibs.length;i<len;i++){var subsection=this.sibs[i];if(subsection!=null){if(!this.containsDocObject(subsection)){continue;}for(var j=0,len2=subsection.childNodes.length;j<len2;j++){var child=subsection.childNodes[j];if(child.nodeType==1&&child.getAttribute(microstrategy.HTMLATTR_OBJTYPE)==microstrategy.OBJTYPE_DOC_OBJECT){this.updatePositionMap(child);}}}this.positionMapReady=true;break;}}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.calcZIndexAndPositions=function(){try{var maxZin=1;microstrategy.formatType=microstrategy.FORMAT_TYPE_MAIN;var subsection=null;for(var i=0;i<this.sibs.length;i++){subsection=this.sibs[i];if(subsection!=null){if(!this.containsDocObject(subsection)){continue;}for(var j=0;j<subsection.childNodes.length;j++){var child=subsection.childNodes[j];if(child.nodeType==1){if(child.getAttribute(microstrategy.HTMLATTR_OBJTYPE)==microstrategy.OBJTYPE_DOC_OBJECT){var zIndex=parseInt(microstrategy.styleObj.getValue(child,"zIndex"));if(zIndex<0){maxZin++;child.style.zIndex=maxZin;}else{if(zIndex>maxZin){maxZin=zIndex;}}}}}break;}}this.maxZindex=++maxZin;}catch(err){microstrategy.errors.log(err);return false;}};mstrSubSection.prototype.containsDocObject=function(currentSib){for(var i=0,cnt=currentSib.childNodes.length;i<cnt;i++){var child=currentSib.childNodes[i];if(child.nodeType==1&&child.getAttribute(microstrategy.HTMLATTR_OBJTYPE)==microstrategy.OBJTYPE_DOC_OBJECT){if(document.defaultView&&document.defaultView.getComputedStyle&&document.defaultView.getComputedStyle(child,"").display=="none"){continue;}if(child.currentStyle&&child.currentStyle.display=="none"){continue;}return true;}}return false;};mstrSubSection.prototype.setNeedToUpdateMaxContentHeight=function(flag){try{this.needToUpdateMaxContentHeight=flag;}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.reduceObjZIndex=function(obj,ac){try{var z=microstrategy.styleObj.getValue(obj,"zIndex");for(var i=0;i<this.elem.childNodes.length;i++){var childObj=this.elem.childNodes[i];if(childObj.nodeType==1&&childObj.getAttribute(microstrategy.HTMLATTR_OBJTYPE)==microstrategy.OBJTYPE_DOC_OBJECT){var zIndex=microstrategy.styleObj.getValue(childObj,"zIndex");if(zIndex>z){zIndex--;ac=this.doc.formatItems(microstrategy.createAssociativeArray(childObj),"zIndex",zIndex,false,ac);}}}if(this.maxZindex>1){this.maxZindex--;}return ac;}catch(err){microstrategy.errors.log(err);return ac;}};mstrSubSection.prototype.ondrop=function(subsection,selections){try{var objTypes=","+selections.getDssTypes().toString()+",";if(objTypes.indexOf(","+microstrategy.DSSTYPE_HIERARCHY+",")!=-1){return ;}this.addUnits(subsection,selections,selections.shiftKey);}catch(err){microstrategy.errors.log(err);return false;}};mstrSubSection.prototype.addUnits=function(subsection,selections,shiftKey){try{var left=getObjSumLeft(subsection);var top=getObjSumTop(subsection);var x=Math.max(0,selections.dragX);var y=selections.dragY;var source=selections.parentBone;var um=microstrategy.updateManager;var ac=[];var hitServer=false;var notUseSnap=(selections.ctrlKey)?!microstrategy.SNAP_OFF:microstrategy.SNAP_OFF;var items=selections.getItems();if(this.isFilterPanel){showMessage({contents:microstrategy.descriptors.getDescriptor("9512"),elements:microstrategy.OK_BUTTON,type:mstrMsgBoxImpl.MSG_WARNING});return null;}var datasets=[];var units=[];var docSelections=this.doc.selections;for(var i=0;i<items.length;i++){if(items[i].getAttribute(microstrategy.HTMLATTR_DSS_TYPE)==microstrategy.DSSTYPE_RPT_DEFINITION){datasets.push(items[i]);}else{units.push(items[i]);}}if(shiftKey){if(datasets.length>0){var newItems=[];for(var i=0;i<datasets.length;i++){var templateInfo={dataSetID:datasets[i].getAttribute("id").substring(0,32),shiftKey:false,displayGrid:(microstrategy.DISPLAY_MODE==microstrategy.DESIGN_MODE),dataSetName:datasets[i].getAttribute(microstrategy.HTMLATTR_DISPLAY_NAME)};ac=this.doc.addCtrl(new Rect(y+top,null,null,x+left),subsection,ac,microstrategy.SUBOBJTYPE_DOC_TEMPLATE,null,templateInfo,notUseSnap);if(ac==null){return null;}hitServer=true;if(!hitServer){var tempAC=[];var grid=microstrategy.findBone(subsection.lastChild);var dsUnits=source.selections.getDatasetMembers(datasets[i]);if(dsUnits){var rowCount=colCount=1;for(var j=0;j<dsUnits.length;j++){if((dsUnits[j].getAttribute(microstrategy.HTMLATTR_DSS_TYPE)==microstrategy.DSSTYPE_METRIC)||(dsUnits[j].getAttribute(microstrategy.HTMLATTR_DSS_TYPE)==microstrategy.DSSTYPE_USER_METRIC)||(dsUnits[j].getAttribute(microstrategy.HTMLATTR_DSS_TYPE)==microstrategy.DSSTYPE_USER_SUMMARY_METRIC)){grid.commands.exec("addTemplateUnit",dsUnits[j],microstrategy.GRIDCELL_AXIS_COLUMNS,colCount,tempAC);colCount++;}else{if(dsUnits[j].getAttribute(microstrategy.HTMLATTR_DSS_TYPE)!=microstrategy.DSSTYPE_ATTRIBUTE_FORM){grid.commands.exec("addTemplateUnit",dsUnits[j],microstrategy.GRIDCELL_AXIS_ROWS,rowCount,tempAC);rowCount++;}}}}}x=x+getObjWidth(subsection.lastChild)+10;newItems.push(subsection.lastChild);}if(newItems.length>0){docSelections.finishAddAllObjs(newItems,ac,true);}}else{if(units.length>0){this.addObjsWithFormat(x,y,units,subsection,source,notUseSnap,ac,false);}}}else{if(datasets.length>0){this.addObjsWithFormat(x,y,datasets,subsection,source,notUseSnap,ac,false);}else{if(units.length>0){var newItems=[];for(var i=0;i<units.length;i++){this.doc.addObj(x,y,this,units[i],ac,notUseSnap);x=x+getObjWidth(subsection.lastChild)+10;newItems.push(subsection.lastChild);}if(newItems.length>0){docSelections.finishAddAllObjs(newItems,ac,true);}}}}if(ac&&ac.length>0){um.add(ac);if(hitServer){um.flushAndSubmitChanges();}}return ac;}catch(err){microstrategy.errors.log(err);return ac;}};mstrSubSection.prototype.findObjects=function(type){try{var subsection=null;var arr=[];for(var i=0,iLen=this.sibs.length;i<iLen;i++){subsection=this.sibs[i];var cn=subsection.childNodes;for(var j=0,jLen=cn.length;j<jLen;j++){if(cn[j].getAttribute("sty")==type){arr.push(cn[j]);}}}return arr;}catch(err){microstrategy.errors.log(err);return null;}};mstrSubSection.prototype.getTargets=function(exceptionObj){var targets=this.findObjects(microstrategy.SUBOBJTYPE_DOC_TEMPLATE);targets=targets.concat(this.findObjects(microstrategy.SUBOBJTYPE_DOC_PANEL_STACK));var kArr=[],grids=[],ps=[];var map={};for(var i=0,len=targets.length;i<len;i++){var tb=microstrategy.findBone(targets[i])||targets[i];if(!tb){continue;}var objId=(tb.objId||tb.id);if(exceptionObj&&exceptionObj.excludeTargets){if(mstr.utils.Arrays.find(exceptionObj.excludeTargets,objId)>-1){continue;}}if(map[objId]!=true){if(tb.type==microstrategy.OBJTYPE_GRID){grids.push(tb);}else{if(tb.type==microstrategy.OBJTYPE_PANEL_STACK){ps.push(tb);}}kArr.push(objId);map[objId]=true;}}if(exceptionObj&&exceptionObj.includeTargets){var t=exceptionObj.includeTargets;for(var i=0,len=t.length;i<len;i++){var g=microstrategy.bone("grid_"+t[i]+"_0");if(g){grids.push(g);}else{g=microstrategy.bone(t[i]);if(g){ps.push(g);}}}kArr=kArr.concat(exceptionObj.includeTargets);}var targets={};targets.keys=kArr;targets.grids=grids;targets.panels=ps;return targets;};mstrSubSection.prototype.recursiveWiring=function(ac,bp){var targets=this.getTargets();var ps=targets.panels;for(var i in ps){if(ps[i].panels){for(var j in ps[i].panels){ps[i].panels[j].recursiveWiring(ac,bp);}}}this.wireControllers(ac,bp,targets.keys,targets.grids,true);};mstrSubSection.prototype.wireControllers=function(ac,bp,kArr,grids,newTarget,exceptionObj){var ctls=this.findObjects(microstrategy.SUBOBJTYPE_DOC_SELECTOR_CONTROL);var um=microstrategy.updateManager;var cArr=[];for(var i=0,len=ctls.length;i<len;i++){var id=ctls[i].getAttribute("id");if(exceptionObj&&exceptionObj.excludeControls){if(mstr.utils.Arrays.find(exceptionObj.excludeControls,id)>-1){continue;}}cArr.push(id);}cArr=(!exceptionObj||!exceptionObj.includeControls)?cArr:cArr.concat(exceptionObj.includeControls);for(var i=0,len=cArr.length;i<len;i++){var cb=microstrategy.bone(cArr[i]+"_Ctl");if(cb.ctlType==mstrRWControlImpl.CTL_TYPE_PANEL_STACK){continue;}microstrategy.getViewerBone().doc.formattingAttributes[cb.RWUnitId]["dfm"]=-1;if(cb.targetKeys!=null&&kArr&&kArr.length>0){cb.targetKeys=kArr;ac.push(um.createActionObject(null,mstrUpdateManager.CTRL_SET_TARGETS,bp,["2048130","2048129","2048116"],[cb.ctlKey,"",kArr.join(CLIPBOARD_ITEM_SEPARATOR)]));this.doc.selections.flush=true;}}if(!newTarget){return ;}for(var i=0,len=grids.length;i<len;i++){var gb=grids[i];var gk=gb.objId;var cl=gb.controlLinks;if(cl){for(var unitKey in cl){if("1"==cl[unitKey].targetTy){continue;}var ty=(unitKey=="Metrics")?"":""+cl[unitKey].ty;var arr=[];for(var c in kArr){if(kArr[c]!=gk){arr.push(kArr[c]);}}cl[unitKey].targets=arr;ac.push(um.createActionObject(null,mstrUpdateManager.ADD_CONTROL_TO_GRID,bp,["2048007","2048130","2048001","2048009","2048129","2048116"],[gk,"",unitKey=="Metrics"?"":unitKey,ty,"",arr.join(CLIPBOARD_ITEM_SEPARATOR)],[],null));}}}};mstrSubSection.prototype.wireTargets=function(ac,bp,newTarget,exceptionObj){try{var targets=this.getTargets(exceptionObj);this.wireControllers(ac,bp,targets.keys,targets.grids,newTarget,exceptionObj);return ac;}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.addObjsWithFormat=function(x,y,items,subsection,source,notUseSnap,ac,addAsLinked){try{var datasets=[];var units=[];var um=this.doc.parentBone.updateManager;var docSelections=this.doc.selections;for(var i=0;i<items.length;i++){if(items[i].getAttribute(microstrategy.HTMLATTR_DSS_TYPE)==microstrategy.DSSTYPE_RPT_DEFINITION){datasets.push(items[i]);}else{units.push(items[i]);}}var left=getObjSumLeft(subsection);var top=getObjSumTop(subsection);var hitServer=false;if(ac==null){ac=[];}for(var i=0;i<datasets.length;i++){var viewMode=microstrategy.DISPLAY_MODE_GRID;var subtype=datasets[i].getAttribute(microstrategy.HTMLATTR_DSS_SUBTYPE);if(subtype){switch(subtype){case microstrategy.DSSTYPE_GRAPH:viewMode=microstrategy.DISPLAY_MODE_GRAPH;break;case microstrategy.DSSTYPE_GRID_AND_GRAPH:viewMode=microstrategy.DISPLAY_MODE_GRID_AND_GRAPH;break;}}var shiftKey=true;if(addAsLinked){shiftKey=false;}var templateInfo={dataSetID:datasets[i].getAttribute("id").substring(0,32),shiftKey:shiftKey,displayGrid:(microstrategy.DISPLAY_MODE==microstrategy.DESIGN_MODE),viewMode:viewMode,dssSubType:subtype,dataSetName:datasets[i].getAttribute(microstrategy.HTMLATTR_DISPLAY_NAME),addAsLinked:addAsLinked};ac=this.doc.addCtrl(new Rect(y+top,null,null,x+left),subsection,ac,microstrategy.SUBOBJTYPE_DOC_TEMPLATE,"",templateInfo,notUseSnap);if(ac==null){return null;}x=x+getObjWidth(subsection.lastChild)+10;hitServer=true;}if(microstrategy.DISPLAY_MODE==microstrategy.DESIGN_MODE||(source!=null&&source.type==microstrategy.OBJTYPE_OBJBROWSER&&source.isFeatureAvailable(microstrategy.FEATURE_MODIFY_GRID_LEVEL_IN_DOCUMENTS))){var datasetId="";var grid=null;var rowCount=colCount=null;for(var i=0;i<units.length;i++){var objInfo=new mstrObjectInfoImpl(units[i]);if(datasetId!=objInfo.dSetId){hitServer=(microstrategy.DISPLAY_MODE!=microstrategy.DESIGN_MODE);datasetId=objInfo.dSetId;rowCount=colCount=1;var templateInfo={dataSetID:null,shiftKey:false,displayGrid:true,dataSetName:null};ac=this.doc.addCtrl(new Rect(y+top,null,null,x+left),subsection,ac,microstrategy.SUBOBJTYPE_DOC_TEMPLATE,null,templateInfo,notUseSnap);if(ac==null){return null;}x=x+getObjWidth(subsection.lastChild)+10;grid=microstrategy.findBone(subsection.lastChild);}if((units[i].getAttribute(microstrategy.HTMLATTR_DSS_TYPE)==microstrategy.DSSTYPE_METRIC)||(units[i].getAttribute(microstrategy.HTMLATTR_DSS_TYPE)==microstrategy.DSSTYPE_USER_METRIC)||(units[i].getAttribute(microstrategy.HTMLATTR_DSS_TYPE)==microstrategy.DSSTYPE_USER_SUMMARY_METRIC)){ac=grid.commands.exec("addTemplateUnit",units[i],microstrategy.GRIDCELL_AXIS_COLUMNS,colCount,ac);colCount++;}else{ac=grid.commands.exec("addTemplateUnit",units[i],microstrategy.GRIDCELL_AXIS_ROWS,rowCount,ac);rowCount++;}}}ac=docSelections.finishAdd(subsection.lastChild,ac);if(hitServer){if(ac.length>0){um.add(ac);ac=null;}um.flushAndSubmitChanges();}return ac;}catch(err){microstrategy.errors.log(err);return ac;}};mstrSubSection.prototype.onmousedown=function(e){try{if(!e){e=window.event;}var src=getEventTarget(e);var tagName=src&&src.tagName.toLowerCase();if(tagName==="select"||tagName==="textarea"||tagName==="input"){return true;}var mstrSrc=microstrategy.eventManager.getSource(e);var docviewer=this.doc.parentBone;if(!docviewer.isInteractiveViewModeEplus(e)){if(this.doc.selections){this.doc.selections.clear(false);}microstrategy.hidePopups();e.cancelBubble=true;mstr.controllers.EventManager.notifyWindowListeners({name:"closeMenus"});return true;}if(mstrSrc&&mstrSrc.button==2&&(mstrSrc.type==microstrategy.OBJTYPE_DOC_SUBSECTION||mstrSrc.type==microstrategy.OBJTYPE_DOC_SECTION)){if(this.elem.getAttribute("cx")==null){microstrategy.getContextMenuManager("RWM").getMenu("rw_subsection_menu").registerTrigger(this.elem);this.parentBone.currentSubSection=this;this.doc.currentSection=this.parentBone;}if(src.getAttribute("cx")==null){microstrategy.getContextMenuManager("RWM").getMenu("rw_subsection_menu").registerTrigger(src);}var docSelections=this.doc.selections;docSelections.addSubSection(this.elem);microstrategy.hidePopups(null,e);e.cancelBubble=true;return false;}else{this.checkForResize(src);return(this.doc.selections.onmousedown)?this.doc.selections.onmousedown(e):false;}}catch(err){microstrategy.errors.log(err);return false;}};mstrSubSection.prototype.onclick=function(e){try{if(!e){e=window.event;}return(this.doc.selections.onclick)?this.doc.selections.onclick(e):false;}catch(err){microstrategy.errors.log(err);return false;}};mstrSubSection.prototype.ondblclick=function(e){try{if(!e){e=window.event;}var docviewer=this.doc.parentBone;if(!docviewer.isInteractiveViewModeEplus(e)){if(this.doc.selections){this.doc.selections.clear(false);}e.cancelBubble=true;return true;}var src=getEventTarget(e);try{if(!src||!src.tagName){return true;}}catch(err){alert("here");return true;}var type=src.getAttribute(microstrategy.HTMLATTR_OBJTYPE);switch(type){case microstrategy.OBJTYPE_DOC_OBJECT:this.doc.editObj(e,src);break;case microstrategy.OBJTYPE_DOC_SELECTION:if(src.src){this.doc.editObj(e,src.src);}break;}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrSubSection.prototype.changeSubHeight=function(newHeight,update,ac){return ac;};mstrSubSection.prototype.getSectionFormattingProps=function(){};mstrSubSection.prototype.checkForResize=function(src){};mstrSubSection.prototype.toggleSelected=function(){};mstrSubSection.prototype.toggleGrid=function(hide){};mstrSubSection.prototype.marqueeSelect=function(objs,marqueeRect,compareFunction){try{for(var i=0;i<this.sibs.length;i++){var sectionRect=this.getOuterRect(this.sibs[i]);if(microstrategy.doRectsIntersect(sectionRect,marqueeRect)){var node=this.sibs[i].firstChild;while(node){if(node.nodeType==1&&node.getAttribute(microstrategy.HTMLATTR_OBJTYPE)==microstrategy.OBJTYPE_DOC_OBJECT){if(compareFunction(this.getOuterRect(node),marqueeRect)){objs.push(node);}}node=node.nextSibling;}break;}}}catch(err){microstrategy.errors.log(err);}return objs;};mstrSubSection.prototype.getOuterRect=function(obj){try{var rect={};if(obj.getAttribute(microstrategy.HTMLATTR_OBJTYPE)==null){rect.left=getObjSumLeft(obj);rect.top=getObjSumTop(obj);}else{rect.left=getObjSumLeftScrolled(obj);rect.top=getObjSumTopScrolled(obj);}rect.right=Math.max(rect.left+getObjWidth(obj),rect.left+1);rect.bottom=Math.max(rect.top+getObjHeight(obj),rect.top+1);return rect;}catch(err){microstrategy.errors.log(err);return null;}};mstrSubSection.prototype.applyGradient=function(){try{if(!this.sibsWithGradients||this.hasConditionalFormatting){return ;}for(var i=0;i<this.sibsWithGradients.length;i++){if(!this.gradientInfo[i][gradientUtil.GRADIENT_START_COLOR_INDEX]||!this.gradientInfo[i][gradientUtil.GRADIENT_END_COLOR_INDEX]){continue;}if(!this.doc.parentBone.isEditableViewModeEplus()){gradientUtil.applyGradient(this.sibsWithGradients[i],this.gradientInfo[i][gradientUtil.GRADIENT_START_COLOR_INDEX],this.gradientInfo[i][gradientUtil.GRADIENT_END_COLOR_INDEX],this.gradientInfo[i][gradientUtil.GRADIENT_ANGLE_INDEX],this.gradientInfo[i][gradientUtil.GRADIENT_XOFFSET_INDEX],this.gradientInfo[i][gradientUtil.GRADIENT_YOFFSET_INDEX]);}else{var gradientBack;var gradientBackExists=false;if(!getObjOuterHeight(this.sibs[i])||!getObjOuterWidth(this.sibsWithGradients[i])){continue;}this.sibsWithGradients[i].setAttribute("gradientcolor",this.gradientInfo[i][gradientUtil.GRADIENT_START_COLOR_INDEX]+","+this.gradientInfo[i][gradientUtil.GRADIENT_END_COLOR_INDEX]+",14,"+this.gradientInfo[i][gradientUtil.GRADIENT_ANGLE_INDEX]+","+this.gradientInfo[i][gradientUtil.GRADIENT_XOFFSET_INDEX]+","+this.gradientInfo[i][gradientUtil.GRADIENT_YOFFSET_INDEX]);this.sibsWithGradients[i].setAttribute("bgstyle",2);if(this.sibsWithGradients[i].previousSibling&&this.sibsWithGradients[i].previousSibling.id&&this.sibsWithGradients[i].previousSibling.id==(this.sibsWithGradients[i].id+gradientUtil.GRADIENT_POSTFIX)){gradientBack=this.sibsWithGradients[i].previousSibling;gradientBackExists=true;}else{gradientBack=document.createElement("div");gradientBack.id=(this.sibsWithGradients[i].id+gradientUtil.GRADIENT_POSTFIX);gradientBack.style.position="absolute";}var height=getObjOuterHeight(this.sibsWithGradients[i]);var width=getObjOuterWidth(this.sibsWithGradients[i]);gradientBack.style.top="0px";gradientBack.style.left="0px";gradientBack.style.height=height+"px";gradientBack.style.width=width+"px";if(!gradientBackExists){this.sibsWithGradients[i].parentNode.insertBefore(gradientBack,this.sibsWithGradients[i]);}this.sibsWithGradients[i].style.backgroundColor="transparent";gradientUtil.applyGradient(gradientBack,this.gradientInfo[i][gradientUtil.GRADIENT_START_COLOR_INDEX],this.gradientInfo[i][gradientUtil.GRADIENT_END_COLOR_INDEX],this.gradientInfo[i][gradientUtil.GRADIENT_ANGLE_INDEX],this.gradientInfo[i][gradientUtil.GRADIENT_XOFFSET_INDEX],this.gradientInfo[i][gradientUtil.GRADIENT_YOFFSET_INDEX]);}}}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.getDocBone=function(){try{var vb=microstrategy.getViewerBone();return vb&&vb.doc;}catch(err){microstrategy.errors.log(err);return null;}};mstrSubSection.prototype.canShowGuideline=function(){try{var doc=this.getDocBone();return this.guidelineEnabled&&!(doc&&doc.selections.isMulti());}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.guidelineOffsetX=microstrategy.SNAP_SIZE;mstrSubSection.prototype.guidelineOffsetY=microstrategy.SNAP_SIZE;mstrSubSection.prototype.showGuidelines=function(hilitePos){try{var src=microstrategy.eventManager.source.elem;if(src&&src.id&&src.getAttribute(microstrategy.HTMLATTR_OBJTYPE)==microstrategy.OBJTYPE_DOC_OBJECT){srcPos=this.positionMap[src.id];if(srcPos){hilitePos.height=srcPos.height;hilitePos.width=srcPos.width;}}if(!this.guidelineEnabled||!this.canShowGuideline()){return ;}var doc=this.getDocBone();if(doc.prevGuidelineSubsec){doc.prevGuidelineSubsec.hideGuidelines();}doc.prevGuidelineSubsec=this;this.hideGuidelines();this.showDimension(hilitePos);this.neighbors=null;this.guidelineOffsetX=microstrategy.SNAP_SIZE;this.guidelineOffsetY=microstrategy.SNAP_SIZE;var fnGetOffset=function(old,newV){return Math.abs(old)>=Math.abs(newV)?newV:old;};var item=doc.selections.firstItem();if(!item){return ;}var itemId=item.id;var types=["center","hcenter","left","right","top","bottom","vcenter","top-bottom","bottom-top","left-right","right-left","distance-vertical","distance-horizontal","width","height"];for(var i=0,len=types.length;i<len;i++){var type=types[i];switch(type){case"center":var hiliteHCenter=Math.round(hilitePos.left+hilitePos.width/2),hiliteVCenter=Math.round(hilitePos.top+hilitePos.height/2);var sectionPos=this.getLocalPosition(this.elem)||{top:0,left:0,width:this.elem.offsetWidth,height:this.elem.offsetHeight},sectionHCenter=Math.round(sectionPos.left+sectionPos.width/2),sectionVCenter=Math.round(sectionPos.top+sectionPos.height/2);if(hiliteHCenter==sectionHCenter){this.renderGuidelines({top:sectionPos.top,left:hiliteHCenter,height:sectionPos.height,width:1,borderColor:"#008000"});}if(hiliteVCenter==sectionVCenter){this.renderGuidelines({top:hiliteVCenter,left:sectionPos.left,height:1,width:sectionPos.width,borderColor:"#008000"});}this.guidelineOffsetX=fnGetOffset(this.guidelineOffsetX,hiliteHCenter-sectionHCenter);this.guidelineOffsetY=fnGetOffset(this.guidelineOffsetY,hiliteVCenter-sectionVCenter);break;case"distance-vertical":var n1=this.getNeighbor(hilitePos,itemId,"top"),n2=this.getNeighbor(hilitePos,itemId,"bottom");if(!n1.id||!n2.id||n1.v!=n2.v){continue;}var n1Pos=n1.pos,n2Pos=n2.pos;var intersect1={top:hilitePos.top-n1.v,bottom:hilitePos.top,left:Math.max(n1Pos.left,hilitePos.left),right:Math.min(n1Pos.left+n1Pos.width,hilitePos.left+hilitePos.width)},intersect2={top:n2Pos.top-n1.v,bottom:n2Pos.top,left:Math.max(n2Pos.left,hilitePos.left),right:Math.min(n2Pos.left+n2Pos.width,hilitePos.left+hilitePos.width)};this.renderGuidelines({top:intersect1.top,left:intersect1.left+(intersect1.right-intersect1.left)/2,width:1,height:n1.v},true);this.renderGuidelines({top:intersect2.top,left:intersect2.left+(intersect2.right-intersect2.left)/2,width:1,height:n2.v},true);this.showDistance({top:intersect1.top,left:intersect1.left+(intersect1.right-intersect1.left)/2,idx:"t",v:n1.v});this.showDistance({top:intersect2.top,left:intersect2.left+(intersect2.right-intersect2.left)/2,idx:"b",v:n2.v});break;case"distance-horizontal":var n1=this.getNeighbor(hilitePos,itemId,"left"),n2=this.getNeighbor(hilitePos,itemId,"right");if(!n1.id||!n2.id||n1.v!=n2.v){continue;}var n1Pos=n1.pos,n2Pos=n2.pos;var intersect1={top:Math.max(n1Pos.top,hilitePos.top),bottom:Math.min(n1Pos.top+n1Pos.height,hilitePos.top+hilitePos.height),left:n1Pos.left+n1Pos.width,right:hilitePos.left},intersect2={top:Math.max(n2Pos.top,hilitePos.top),bottom:Math.min(n2Pos.top+n2Pos.height,hilitePos.top+hilitePos.height),left:hilitePos.left+hilitePos.width,right:n2Pos.left};this.renderGuidelines({top:intersect1.top+(intersect1.bottom-intersect1.top)/2,left:intersect1.left,width:n1.v,height:1},true);this.renderGuidelines({top:intersect2.top+(intersect2.bottom-intersect1.top)/2,left:intersect2.left,width:n2.v,height:1},true);this.showDistance({top:intersect1.top+(intersect1.bottom-intersect1.top)/2,left:intersect1.left,idx:"l",v:n1.v});this.showDistance({top:intersect2.top+(intersect2.bottom-intersect1.top)/2,left:intersect2.left,idx:"r",v:n2.v});break;default:var pm=this.positionMap;for(var key in pm){if(key==itemId){continue;}var pos=pm[key];pos=mstr.$H.clone(pos);pos.top=parseInt(pos.top);pos.left=parseInt(pos.left);var guidelinePos=null,p1=pos,p2=hilitePos,dimensionLineOffset=3;var fnSwap=function(p){if(p1[p]>hilitePos[p]){p1=hilitePos;p2=pos;}};switch(type){case"width":if(Math.round(p1.width)==Math.round(p2.width)){this.renderGuidelines({top:p1.top+p1.height+dimensionLineOffset,left:p1.left,width:p1.width,height:1},true);this.renderGuidelines({top:p2.top+p2.height+dimensionLineOffset,left:p2.left,width:p2.width,height:1},true);continue;}break;case"height":if(Math.round(p1.height)==Math.round(p2.height)){this.renderGuidelines({top:p1.top,left:p1.left+p1.width+dimensionLineOffset,width:1,height:p1.height},true);this.renderGuidelines({top:p2.top,left:p2.left+p2.width+dimensionLineOffset,width:1,height:p2.height},true);continue;}break;case"hcenter":var l1=Math.round(pos.left+pos.width/2),l2=Math.round(hilitePos.left+hilitePos.width/2);if(l1==l2){fnSwap("top");guidelinePos={top:p1.top+p1.height,left:l1,width:1,height:p2.top-(p1.top+p1.height)};}this.guidelineOffsetX=fnGetOffset(this.guidelineOffsetX,l2-l1);break;case"vcenter":var l1=Math.round(pos.top+pos.height/2),l2=Math.round(hilitePos.top+hilitePos.height/2);if(l1==l2){fnSwap("left");guidelinePos={top:l1,left:p1.left+p1.width,width:p2.left-p1.left-p1.width,height:1};}this.guidelineOffsetY=fnGetOffset(this.guidelineOffsetY,l2-l1);break;case"left":var l1=Math.round(pos.left),l2=Math.round(hilitePos.left);if(l1==l2){fnSwap("top");guidelinePos={top:p1.top+p1.height,left:l1,width:1,height:p2.top-(p1.top+p1.height)};}this.guidelineOffsetX=fnGetOffset(this.guidelineOffsetX,l2-l1);break;case"right":var l1=Math.round(pos.left+pos.width),l2=Math.round(hilitePos.left+hilitePos.width);if(l1==l2){fnSwap("top");guidelinePos={top:p1.top+p1.height,left:l1,width:1,height:p2.top-(p1.top+p1.height)};}this.guidelineOffsetX=fnGetOffset(this.guidelineOffsetX,l2-l1);break;case"top":var l1=Math.round(pos.top),l2=Math.round(hilitePos.top);if(l1==l2){fnSwap("left");guidelinePos={top:l1,left:p1.left+p1.width,width:p2.left-(p1.left+p1.width),height:1};}this.guidelineOffsetY=fnGetOffset(this.guidelineOffsetY,l2-l1);break;case"bottom":var l1=Math.round(pos.top+pos.height),l2=Math.round(hilitePos.top+hilitePos.height);if(l1==l2){fnSwap("left");guidelinePos={top:l1,left:p1.left+p1.width,width:p2.left-(p1.left+p1.width),height:1};}this.guidelineOffsetY=fnGetOffset(this.guidelineOffsetY,l2-l1);break;case"top-bottom":var l1=Math.round(pos.top+pos.height),l2=Math.round(hilitePos.top);if(l1==l2){fnSwap("left");guidelinePos={top:l1,left:p1.left+p1.width,width:p2.left-(p1.left+p1.width),height:1};}this.guidelineOffsetY=fnGetOffset(this.guidelineOffsetY,l2-l1);break;case"bottom-top":var l1=Math.round(pos.top),l2=Math.round(hilitePos.top+hilitePos.height);if(l1==l2){fnSwap("left");guidelinePos={top:l1,left:p1.left+p1.width,width:p2.left-(p1.left+p1.width),height:1};}this.guidelineOffsetY=fnGetOffset(this.guidelineOffsetY,l2-l1);break;case"left-right":var l1=Math.round(pos.left+pos.width),l2=Math.round(hilitePos.left);if(l1==l2){fnSwap("top");guidelinePos={top:p1.top+p1.height,left:l1,width:1,height:p2.top-(p1.top+p1.height)};}this.guidelineOffsetX=fnGetOffset(this.guidelineOffsetX,l2-l1);break;case"right-left":var l1=Math.round(pos.left),l2=Math.round(hilitePos.left+hilitePos.width);if(l1==l2){fnSwap("top");guidelinePos={top:p1.top+p1.height,left:l1,width:1,height:p2.top-(p1.top+p1.height)};}this.guidelineOffsetX=fnGetOffset(this.guidelineOffsetX,l2-l1);break;}guidelinePos&&this.renderGuidelines(guidelinePos,false);}break;}}if(this.positionMap[itemId]){this.positionMap[itemId]=hilitePos;}}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.getNeighbor=function(pos,srcId,which,notIntersect){try{var $M=mstr.utils.Math;var top=pos.top,left=pos.left,elem=this.elem,min_top=min_bottom=elem.offsetHeight,min_left=min_right=elem.offsetWidth,ni={top:{id:"",v:min_top},bottom:{id:"",v:min_bottom},left:{id:"",v:min_left},right:{id:"",v:min_right}},srcRange={h:{min:pos.left,max:pos.left+pos.width},v:{min:pos.top,max:pos.top+pos.height}};var tgts=this.elem.childNodes;for(var i=0,len=tgts.length;i<len;i++){var tgt=tgts[i],tgtId=tgt.id;if(tgtId&&tgtId!=srcId){if(!this.positionMap[tgtId]){if(tgt.nodeType==1&&tgt.getAttribute(microstrategy.HTMLATTR_OBJTYPE)==microstrategy.OBJTYPE_DOC_OBJECT){this.updatePositionMap(tgt);}else{continue;}}var p=this.positionMap[tgtId],t=p.top,b=t+p.height,l=p.left,r=l+p.width;for(var j=0;j<4;j++){var w=["top","bottom","left","right"][j];var d=-1,range1=null,range2=null;switch(w){case"top":case"bottom":d=w=="top"?top-b:t-(pos.top+pos.height);range1={min:l,max:r};range2=srcRange.h;break;case"left":case"right":d=w=="left"?left-r:l-(left+pos.width);range1={min:t,max:b};range2=srcRange.v;break;}if(d>0&&(notIntersect||!notIntersect&&$M.rangesIntersect(range1,range2))&&d<ni[w].v){ni[w].v=d;ni[w].id=tgtId;ni[w].pos=p;}}}}this.neighbors=ni;return which?ni[which]:ni;}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.getGuidelineSnapOffset=function(pos,srcId,dir,whichNeighbor){try{var offset=0;var n=this.getNeighbor(pos,srcId,whichNeighbor,true);if(n&&n.pos){var npos=n.pos;switch(whichNeighbor){case"top":offset=pos.top-(npos.top+npos.height);break;case"bottom":offset=npos.top-(pos.top+pos.height);break;case"left":offset=pos.left-(npos.left+npos.width);break;case"right":offset=npos.left-(pos.left+pos.width);break;}offset=offset<microstrategy.SNAP_SIZE?offset:0;}return dir*offset;return offset!=0?dir*(microstrategy.SNAP_SIZE-offset):0;}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.renderGuidelines=function(pos,showArrow){try{if(!this.cnt){this.cnt=0;}var lineCss=pos.height==1?"h":"v",tipCss=pos.height==1?"v":"h",line=document.createElement("div");line.setAttribute("cnt",this.cnt);line.setAttribute("ty","gl");line.className="mstrGuideline "+lineCss+(showArrow?" s":"");line.style.zIndex=this.maxZindex+1;for(var i in pos){line.style[i]=mstr.utils.LocaleParser.isNumeric(pos[i])?Math.max(pos[i],0)+"px":pos[i];}if(showArrow){line.innerHTML='<div class="mstrGuideline-tip '+tipCss+' tl" ></div><div class="mstrGuideline-tip '+tipCss+' rb" ></div>';}this.elem.appendChild(line);this.guidelines=this.guidelines||[];this.guidelines.push(line);}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.hideGuidelines=function(){try{this.hideDimension();this.hideDistance();if(!this.guidelines){return ;}for(var i=0,len=this.guidelines.length;i<len;i++){var line=this.guidelines[i];line.parentNode.removeChild(line);}this.guidelines=[];}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.showDimension=function(hilitePos){try{var elDim=this.elDim;if(!elDim){elDim=document.createElement("span");elDim.className="mstrGuideline-dim";this.elem.appendChild(elDim);this.elDim=elDim;}elDim.style.display="block";elDim.style.left=(hilitePos.left+hilitePos.width+10)+"px";elDim.style.top=(hilitePos.top)+"px";elDim.innerHTML="x:"+parseInt(hilitePos.left,10)+"px<br/>y:"+parseInt(hilitePos.top,10)+"px<br/>width:"+parseInt(hilitePos.width,10)+"px<br/>height:"+parseInt(hilitePos.height,10)+"px";}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.hideDimension=function(){try{if(this.elDim){this.elDim.style.display="none";}}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.showDistance=function(pos){try{var v=pos.v,idx=pos.idx,isHoriz=idx=="l"||idx=="r";var el=(this.elDis||(this.elDis={l:null,t:null,r:null,b:null}))[pos.idx];if(!el){el=document.createElement("span");el.className="mstrGuideline-dis";this.elem.appendChild(el);this.elDis[idx]=el;}el.innerHTML=pos.v+"px";el.style.left=(pos.left+(isHoriz?v/2-10:3))+"px";el.style.top=(pos.top+(isHoriz?-20:v/2-10))+"px";el.style.display="block";}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.hideDistance=function(){try{var els=this.elDis;if(els){for(var idx in els){var el=els[idx];if(el){el.style.display="none";}}}}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.readFormatPosition=function(el){return this.getLocalPosition(el);};mstrSubSection.prototype.getLocalPosition=function(els){try{var pos=[];var isArr=els.constructor===Array,els=isArr?els:[els];if(els&&els.length){var sectionPos=mstr.$BM.position(this.elem);for(var i in els){var elPos=mstr.$BM.position(els[i]);elPos.top=elPos.top-sectionPos.top;elPos.left=elPos.left-sectionPos.left;pos.push(elPos);}}return isArr?pos:(pos&&pos[0]);}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.updatePositionMap=function(el,remove){try{if(!this.guidelineEnabled){return ;}if(remove){delete this.positionMap[el.id];}else{this.positionMap[el.id]=this.readFormatPosition(el);}}catch(err){microstrategy.errors.log(err);}};mstrSubSection.prototype.syncPositionMap=function(items){try{if(!this.guidelineEnabled){return ;}items=mstr.$A.toArray(items);for(var id in items){this.updatePositionMap(items[id]);}}catch(err){microstrategy.errors.log(err);}};function mstrSubSection(id){this.inherits=mstrBoneImpl;this.inherits(id);delete this.inherits;return this;}