(function(){mstrmojo.requiresCls("mstrmojo.DocLayout","mstrmojo.DocLayoutHoriz","mstrmojo.DocSectionHoriz","mstrmojo.DocSection","mstrmojo.DocSubsection","mstrmojo.DocPanelStack","mstrmojo.DocPanel","mstrmojo.DocTextfield","mstrmojo._CanSupportTransaction","mstrmojo._IsEditableTextfield","mstrmojo._HasDocLink","mstrmojo.DocImage","mstrmojo.DocLine","mstrmojo.DocRectangle","mstrmojo.DocRoundRectangle","mstrmojo.EnumRWUnitType","mstrmojo.DynamicClassFactory","mstrmojo.Button","mstrmojo.ToolBar","mstrmojo.DocSelector","mstrmojo.FilterPanelMenu","mstrmojo.DocPortlet","mstrmojo.DocResizablePortlet","mstrmojo.DocXtabGraph","mstrmojo.DocGridGraph","mstrmojo.DocVisualization","mstrmojo.DocXtabModel","mstrmojo.hash","mstrmojo.dom");var $HASH=mstrmojo.hash,$DOM=mstrmojo.dom,$UNIT_TYPES=mstrmojo.EnumRWUnitType,$CFC=mstrmojo.DynamicClassFactory.newComponent,$ELEMENT_HELPER=mstrmojo.elementHelper,$NIB=mstrmojo.Button.newIconButton,linkClsMap={};function getPortletButtonHandler(action){return function(){return this.parent.parent["on"+action]();};}var fnMaximizePortlet=getPortletButtonHandler("maximize"),fnRestorePortlet=getPortletButtonHandler("restore"),fnMinimizePortlet=getPortletButtonHandler("minimize");function createResizeButton(t,c,fn,bds,cds){return $NIB(t,c,fn,null,{ds:bds,visible:(cds!==bds)});}function getLinkDrillingClass(clazz,type,useHover){var className=this.classMap[type].n+(useHover?"Hover":""),constructor=linkClsMap[className];if(!constructor){constructor=linkClsMap[className]=$CFC(clazz,[mstrmojo._HasDocLink].concat(this.getLinkDrillMixins(useHover)));}return constructor;}function newImageOrTextField(model,node,config){var constructor=$HASH.walk(config.scriptClass,window),nodeDefn=node&&node.defn,nodeData=node&&node.data,type=(nodeDefn&&nodeDefn.t),isDocButton=(type===$UNIT_TYPES.TEXTFIELD&&((nodeDefn&&nodeDefn.dpst)));if(type===$UNIT_TYPES.TEXTFIELD||type===$UNIT_TYPES.IMAGE){var dataDlRef=nodeData.dl,defnDlRef=nodeDefn.dl,hasLinks=(dataDlRef&&dataDlRef.items&&dataDlRef.items.length)||(defnDlRef&&defnDlRef.items&&defnDlRef.items.length>0);if(hasLinks||nodeData.url||nodeDefn.url||nodeDefn.ifw){constructor=getLinkDrillingClass.call(this,constructor,type+(isDocButton?"B":""),hasLinks);}else{if((type===$UNIT_TYPES.TEXTFIELD)&&nodeDefn.txi){constructor=$CFC(constructor,[mstrmojo._CanSupportTransaction,mstrmojo._IsEditableTextfield]);}else{if(type===$UNIT_TYPES.TEXTFIELD&&node.defn.iifs){constructor=mstrmojo.DocSummaryTextfield;}}}}return this.newRWUnitInstance(model,node,constructor);}mstrmojo.rw._IsReportServicesDocBuilder=mstrmojo.provide("mstrmojo.rw._IsReportServicesDocBuilder",{_mixinName:"mstrmojo.rw._IsReportServicesDocBuilder",createClassMap:function createClassMap(){var clsMap=this._super();clsMap[$UNIT_TYPES.LAYOUT]={n:"Layout"};clsMap[$UNIT_TYPES.SUBSECTION]={scriptClass:"mstrmojo.DocSubsection"};clsMap[$UNIT_TYPES.PANELSTACK]={n:"PanelStack",scriptClass:"mstrmojo.DocPanelStack"};clsMap[$UNIT_TYPES.PANEL]={n:"Panel",scriptClass:"mstrmojo.DocPanel"};clsMap[$UNIT_TYPES.TEXTFIELD]={n:"Textfield",scriptClass:"mstrmojo.DocTextfield"};clsMap[$UNIT_TYPES.IMAGE]={n:"Image",scriptClass:"mstrmojo.DocImage"};clsMap[$UNIT_TYPES.LINE]={n:"Line",scriptClass:"mstrmojo.DocLine"};clsMap[$UNIT_TYPES.RECTANGLE]={n:"Rectangle",scriptClass:"mstrmojo.DocRectangle"};clsMap[$UNIT_TYPES.ROUNDEDRECTANGLE]={n:"RoundedRectangle"};clsMap[$UNIT_TYPES.GRAPH]={n:"XtabGraph",scriptClass:"mstrmojo.DocXtabGraph"};clsMap[$UNIT_TYPES.GRIDGRAPH]={n:"GridGraph",scriptClass:"mstrmojo.DocGridGraph"};clsMap[$UNIT_TYPES.VISUALIZATION]={n:"Visualization",scriptClass:"mstrmojo.DocVisualization"};return clsMap;},getLayoutViewerClass:function getLayoutViewerClass(node){this.throwAbstractMethodError("getLayoutViewerClass");},newLayout:function newLayout(model,node){var children=[],nodeData=node.data,nodeDefn=node.defn,LayoutViewerCls=this.getLayoutViewerClass(node),docLayoutViewer=new LayoutViewerCls({n:nodeDefn.title,model:model,node:node,controller:this.parent.controller,tbc:nodeDefn.tbc,slot:"containerNode",visible:false,ifs:nodeData.ifs,gb:nodeData.gbys});var defn=docLayoutViewer.defn=$HASH.copy(nodeDefn);defn.fmts=$HASH.copy(nodeDefn.fmts);function getHeaders(headers,slot){var cnt=headers.length;if(cnt){for(var h=0;h<cnt;h++){var f=this.build([headers[h]],model)[0];f.slot=slot;children.push(f);}}}getHeaders.call(this,model.getFixedHeaders(node),"fixedHeaderNode");var LayoutCls=nodeDefn.horiz?mstrmojo.DocLayoutHoriz:mstrmojo.DocLayout;children.push(new LayoutCls({slot:"layout",id:node.id,k:node.k,minHeight:nodeData.mh,formatResolver:model.formatResolver,rules:nodeDefn.rules,builder:this,node:node,defn:nodeDefn,model:model}));getHeaders.call(this,model.getFixedFooters(node),"fixedFooterNode");docLayoutViewer.addChildren(children);return docLayoutViewer;},newSection:function newSection(model,node){return this.newRWUnitInstance(model,node,(node.defn.horiz&&node.data.subsections.length>1)?mstrmojo.DocSectionHoriz:mstrmojo.DocSection);},newPanelStack:function newPanelStack(model,node,config){return this.newRWUnitInstance(model,node,config.cls||$HASH.walk(config.scriptClass,window));},newTextfield:newImageOrTextField,newImage:newImageOrTextField,newButton:newImageOrTextField,newRoundedRectangle:function newRoundedRectangle(model,node){return this.newRWUnitInstance(model,node,$DOM.supports($DOM.cssFeatures.ROUND_CORNERS)?mstrmojo.DocRectangle:mstrmojo.DocRoundRectangle);},getPortletExportGridToolbar:mstrmojo.emptyFn,createPortlet:function createPortlet(t,node,w){var defn=node.defn,ds=defn.ds,resizable=(defn.iifp||!(t===$UNIT_TYPES.PANELSTACK||(defn.ttl===undefined&&defn.qsm)||t===$UNIT_TYPES.SELECTOR)),hasGraph=(t===$UNIT_TYPES.GRAPH||t===$UNIT_TYPES.GRIDGRAPH),children=[],leftToolbarNodeCssClass="",toolbarNodeCssClass="",buttonBarNodeClass="",isExportGrid=(t===$UNIT_TYPES.GRID||hasGraph||t===$UNIT_TYPES.VISUALIZATION||t===$UNIT_TYPES.MOJOVISUALIZATION)&&parseInt(defn.eo,10)!==2,toolbarNode=[],tbCssClass="mstrmojo-oivmSprite ",hasTitleBarMenuButton=false,tb;if(defn.qsm){leftToolbarNodeCssClass="qks";var fnQuickSwitchBtn=function(title,css,qsm){return $NIB(title,tbCssClass+css,function(){return this.parent.parent.content.quickSwitch();},{visible:"this.parent.parent.defn.qsm !== this.qsm"},{qsm:qsm});};children.push({scriptClass:"mstrmojo.ToolBar",slot:"leftToolbarNode",alias:"leftToolbar",cssClass:(!resizable)?"grouped":"",children:[fnQuickSwitchBtn(mstrmojo.desc(3547,"View: Grid"),"tbGrid",1),fnQuickSwitchBtn(mstrmojo.desc(3548,"View: Graph"),"tbGraph",2)]});}if(isExportGrid){tb=this.getPortletExportGridToolbar(w);if(tb){toolbarNodeCssClass=tb.css;toolbarNode=tb.node;children.push(toolbarNode);}}if(resizable){if(defn.iifp){leftToolbarNodeCssClass="wrap";children.push({scriptClass:"mstrmojo.ToolBar",slot:"leftToolbarNode",alias:"leftToolbar",children:[createResizeButton(mstrmojo.desc(8973,"Collapse"),"co",null,1,ds),createResizeButton(mstrmojo.desc(8972,"Expand"),"ex",null,0,ds)]});}else{var btns=[createResizeButton(mstrmojo.desc(4539,"Minimize"),"mn",fnMinimizePortlet,1,ds),createResizeButton(mstrmojo.desc(4540,"Restore"),"rs",fnRestorePortlet,0,ds),createResizeButton(mstrmojo.desc(4541,"Maximize"),"mx",fnMaximizePortlet,2,ds)];if(isExportGrid&&tb){toolbarNode.children=(toolbarNode.children||[]).concat(btns);}else{toolbarNodeCssClass="resize";children.push({scriptClass:"mstrmojo.ToolBar",slot:"toolbarNode",alias:"rightToolbar",children:btns});}}}w.slot="contentNode";w.alias="content";w.title=defn.ttl||"";if(defn.sec){var es=node.data.elms,ces=node.data.ces,unset=node.data.unset,ccount=(ces&&ces.length)||0,ecount=(es&&es.length)||0,i;if(defn.sos){w.contentClass="fpsb";for(i=ccount-1;i>=0;i--){if(ces[i]._did_){ccount--;}}w.count=$ELEMENT_HELPER.buildElemsCountStrByNum(ccount,ecount);}if(ces&&es&&es.length&&defn.style!==mstrmojo.DocSelector.STYLES.SCROLLER){if(defn.multi){if(unset){w.count=$ELEMENT_HELPER.buildElemsCountStr(es,es);}else{w.count=$ELEMENT_HELPER.buildElemsCountStr(ces,es,!defn.include);}}else{w.count=$ELEMENT_HELPER.buildElemsCountStr(es,es);}}}children.push(w);if(t===$UNIT_TYPES.PANELSTACK){var fnNewNavButton=function(title,css,binding,dir){return $NIB(title,tbCssClass+css,function(){return this.parent.parent.content.switchToPanel(dir);},{enabled:"this.parent.parent."+binding});},rTb=[],lTb=[],hasPanelNav=!!node.sw,isInfoWindow=!!defn.ifw,isFilterPanel=!!defn.ifp;if(hasPanelNav){lTb.push(fnNewNavButton(mstrmojo.desc(1058,"Previous"),"tbPrev","prevEnabled",-1));rTb.push(fnNewNavButton(mstrmojo.desc(2917,"Next"),"tbNext","nextEnabled",1));}if(isInfoWindow){rTb.push($NIB(mstrmojo.desc(2102,"Close"),tbCssClass+"mstrmojo-DocInfoWindow-close",function(){this.parent.parent.parent.close();}));}if(isFilterPanel){buttonBarNodeClass="ifp";var btnTextAlias=mstrmojo.desc(2164,"Apply");children.push({scriptClass:"mstrmojo.HBox",slot:"buttonbarNode",alias:"buttonbar",cssClass:"buttonBox",children:[{scriptClass:"mstrmojo.Button",alias:"resetBtn",title:mstrmojo.desc(8329,"Unset"),text:mstrmojo.desc(8329,"Unset"),cssClass:"mstrmojo-FilterPanel-Btn apply",bindings:{visible:function(){return !defn.cas;},enabled:function(){return this.parent.parent.clearEnabled;}},onclick:function onclick(){if(w&&w.clearBuffSlices){w.clearBuffSlices();w.clearAllFilter();w.applyBufferedSlices();}}},{scriptClass:"mstrmojo.Button",alias:"applyNow",title:btnTextAlias,text:btnTextAlias,cssClass:"mstrmojo-FilterPanel-Btn apply",bindings:{visible:function(){return !defn.cas;},enabled:function(){return this.parent.parent.applyEnabled;}},onclick:function onclick(){if(w&&w.applyBufferedSlices){w.applyBufferedSlices();}}}]});rTb.push({scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-oivmSprite tbDown",alias:"btnMenu",onclick:function onclick(){this.openPopupMenu();},openPopupMenu:function(){var dl=mstrmojo.findAncestor(this,"openPopupMenu");if(dl){dl.openPopupMenu("mstrmojo.FilterPanelMenu",{openerButton:this,fps:w,cmPos:this.cmPos,lockIW:w});}}});hasTitleBarMenuButton=true;}if(isInfoWindow||isFilterPanel){var boxCss=[];if(hasPanelNav){boxCss[0]="pst-l";}if(isFilterPanel){boxCss.push("ifp");}lTb.push({scriptClass:"mstrmojo.Box",cssClass:boxCss.join(" ")});}if(isInfoWindow||hasPanelNav||isFilterPanel){var ifwCss=isInfoWindow?"ifw ":"",ifpCss=isFilterPanel?"ifp ":"",casCss=!defn.cas?"cas ":"";toolbarNodeCssClass=(hasPanelNav?"pst-r ":"")+ifwCss+ifpCss+casCss;leftToolbarNodeCssClass=(hasPanelNav?"pst-l ":"")+ifwCss+ifpCss+casCss;children.push({scriptClass:"mstrmojo.ToolBar",slot:"leftToolbarNode",alias:"leftToolbar",children:lTb});children.push({scriptClass:"mstrmojo.ToolBar",slot:"toolbarNode",alias:"rightToolbar",children:rTb});}}if(t===$UNIT_TYPES.SELECTOR&&w.spm){toolbarNodeCssClass="spm";children.push({scriptClass:"mstrmojo.ToolBar",slot:"toolbarNode",alias:"rightToolbar",children:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-oivmSprite tbDown",alias:"btnMenu",onclick:function onclick(evt){evt.cancel();this.openPopupMenu();},openPopupMenu:function(){var dl=mstrmojo.findAncestor(this,"openPopupMenu");if(dl){dl.openPopupMenu("mstrmojo.SelectorMenu",{openerButton:this,selector:w,cmPos:this.cmPos});}}}]});hasTitleBarMenuButton=true;}var Clazz=resizable?mstrmojo.DocResizablePortlet:mstrmojo.DocPortlet,props={k:w.k,defn:w.defn,model:w.model,children:children,title:w.title,count:w.count,floatingTitle:(defn.ttl===undefined&&defn.qsm),leftToolbarNodeClass:leftToolbarNodeCssClass,loadDataOnResize:hasGraph,toolbarNodeClass:toolbarNodeCssClass,buttonbarNodeClass:buttonBarNodeClass,attachContextMenuEvent:hasTitleBarMenuButton};if(t===$UNIT_TYPES.PANELSTACK){props.bindings={title:"this.children[0].title"};if(node.sw){props.bindings.prevEnabled=function(){return this.children[0].hasPreviousPanel;};props.bindings.nextEnabled=function(){return this.children[0].hasNextPanel;};}if(defn.ifp){props.bindings.applyEnabled=function(){return this.children[0].applyEnabled;};props.bindings.clearEnabled=function(){return this.children[0].clearEnabled;};}}if(defn.iifp){props.onclicktitle=function(){if(w.defn.ds===1){w.parent.onexpand();}else{w.parent.oncollapse();}};}return new Clazz(props);},newXtabModel:function newXtabModel(params){return new mstrmojo.DocXtabModel(params);}});}());