(function(){mstrmojo.requiresCls("mstrmojo.DocBuilder","mstrmojo.vi.ui.rw.selectors.DocSelectorViewFactory","mstrmojo.ui.BuilderBox","mstrmojo.ExpressVisList","mstrmojo.hash","mstrmojo.array","mstrmojo.string","mstrmojo.DynamicClassFactory","mstrmojo.EnumRWUnitType","mstrmojo.vi.ui.ScrollableDocTextfield","mstrmojo.DocHTMLContainer","mstrmojo.vi.viz.EnumVizStyles","mstrmojo.vi.ui.rw.DocQuillTextField");mstrmojo.requiresClsP("mstrmojo.vi.models","DocXtabModel","DocVisModel","EnumPanelTypes","XtabDropZones","GMDropZones","MapDropZones","MapboxDropZones","ImageLayoutDropZones","CombineDropZonesModel","PanelFormatSaver","VIComponentMap","GraphDropZones","BaseVisDropZones","HeatMapDropZones","NetworkDropZones","KPICardDropZones");mstrmojo.requiresClsP("mstrmojo.vi.models.editors","TextEditorModel","ImageEditorModel","HtmlContainerEditorModel","HeatMapEditorModel","ImageLayoutEditorModel","NetworkEditorModel","BaseEditorModel","XtabEditorModel","MapEditorModel","MapboxEditorModel","GMEditorModel","KPICardEditorModel");mstrmojo.requiresClsP("mstrmojo.vi.ui.rw","DocLayoutViewer","DocLayout","DocSection","DocSubsection","Xtab","CustomSortXtab","ImageBox","FilterPanelStack","FilterPanel","FilterPortlet","DocVIPanelStack","DocVIMainPanel","DocVIVisualizationsPanelStack","DocRelativePanel","VizBox","DocTextfield","DocQuillTextField","DocImage","TextBox","FilterBox","ImageBox","HtmlBox","_IsViewDataGrid");var $HASH=mstrmojo.hash,$ARR=mstrmojo.array,$CFC=mstrmojo.DynamicClassFactory.newComponent,$EDITORS=mstrmojo.vi.models.editors,$VI_TYPES=mstrmojo.vi.models.VIComponentMap.TYPES,$PS_TYPES=mstrmojo.vi.models.EnumPanelTypes,PS_TYPE_FILTERS=$PS_TYPES.FILTERS,PS_TYPE_PAGE_BY=$PS_TYPES.PAGEBY,PORTLET_CLS={},ENUM_VIZ_STYLES=mstrmojo.vi.viz.EnumVizStyles,$EH=mstrmojo.elementHelper,$UNIT_TYPES=mstrmojo.EnumRWUnitType,$STYLES=mstrmojo.DocSelector.STYLES,escapeInvalidXML=mstrmojo.string.escapeIllegalXML;PORTLET_CLS[$UNIT_TYPES.IMAGE]="mstrmojo.vi.ui.rw.ImageBox";PORTLET_CLS[$UNIT_TYPES.TEXTFIELD]="mstrmojo.vi.ui.rw.TextBox";PORTLET_CLS[$UNIT_TYPES.HTMLCONTAINER]="mstrmojo.vi.ui.rw.HtmlBox";PORTLET_CLS[$UNIT_TYPES.SELECTOR]="mstrmojo.vi.ui.rw.FilterBox";var defaultSlot="containerNode";var fnPageByUnitChange=function PageByUnitChange(){this.parent.set("unit",this.unit);};function getPanelStackType(node){var type=node.defn.psType;if(!type){return 0;}return parseInt(type,10);}function getSelectorElemCount(node,w){var defn=node.defn,es=node.data.elms,ces=node.data.ces||[],unset=node.data.unset,isExcluded=w.isSelectionExcluded&&w.isSelectionExcluded(),isDynamicSelector=w.isDynamicAttributeSelector&&w.isDynamicAttributeSelector(),res="";if(!defn.sec||isDynamicSelector){return"";}if(defn.style===$STYLES.SEARCH_BOX){if(!defn.sos&&($ARR.find(ces,"v",$EH.ELEM_ALL_ID)>-1||ces.length===0||unset)){return"";}res=$EH.buildElemsCountStr(ces,[]);}else{if(defn.style!==$STYLES.SCROLLER){if(defn.multi){if(unset&&(!ces||ces.length===0)){res=$EH.buildElemsCountStr(es,es);}else{var elmsIndices={};$ARR.forEach(es,function(item){elmsIndices[escapeInvalidXML(item.v)]=true;});var cesInElems=$ARR.filter(ces,function(item){return elmsIndices[escapeInvalidXML(item.v)];});res=$EH.buildElemsCountStr(cesInElems,es,isExcluded);}}else{res=$EH.buildElemsCountStr(es,es);}}}return res;}function newField(model,node,config,EditorModelCls){var Cls=$HASH.walk(config.scriptClass,window),editModel=new EditorModelCls({docModel:model}),field=new Cls({id:node.id,node:node,controller:this.parent.controller,model:model,edtModel:editModel});field.addDisposable(editModel);field.edtModel.hostId=field.id;return field;}mstrmojo.vi.ui.DocBuilder=mstrmojo.declare(mstrmojo.DocBuilder,null,{scriptClass:"mstrmojo.vi.ui.DocBuilder",viMap:null,defaultSlot:defaultSlot,visList:mstrmojo.ExpressVisList,init:function init(props){if(this._super){this._super(props);}this.viMap={};},createSelectorFactory:function createSelectorFactory(){return new mstrmojo.vi.ui.rw.selectors.DocSelectorViewFactory({docBuilder:this});},createClassMap:function createClassMap(){var clsMap=this._super();clsMap[$UNIT_TYPES.LAYOUT]={n:"Layout"};clsMap[$UNIT_TYPES.SUBSECTION]={n:"DocSubsection"};clsMap[$UNIT_TYPES.PANELSTACK]={n:"PanelStack"};clsMap[$UNIT_TYPES.PANEL]={n:"Panel"};clsMap[$UNIT_TYPES.IMAGE]={n:"Image",scriptClass:"mstrmojo.vi.ui.rw.DocImage"};clsMap[$UNIT_TYPES.TEXTFIELD]={n:"Textfield",scriptClass:"mstrmojo.vi.ui.rw.DocQuillTextField"};return clsMap;},isPortlet:function isPortlet(nodeDefn){var nodeType=nodeDefn.t;return !!((nodeDefn.httl||this._super(nodeDefn))||nodeType===$UNIT_TYPES.TEXTFIELD||nodeType===$UNIT_TYPES.IMAGE||nodeType===$UNIT_TYPES.SELECTOR||nodeType===$UNIT_TYPES.HTMLCONTAINER);},extractWidget:function extractWidget(widget,node){return this._super(widget,node)||getPanelStackType(node)===PS_TYPE_PAGE_BY;},getPortletClass:function getPortletClass(nodeDefn){return(nodeDefn&&PORTLET_CLS[nodeDefn.t])||"mstrmojo.vi.ui.rw.VizBox";},createPortlet:function createPortlet(t,node,w,buildConfig){var psType=getPanelStackType(node);if(psType){if(psType===PS_TYPE_FILTERS){return null;}return w;}var defn=node.defn,viMap=this.getLayoutVIMap(defn._lkz);if(defn.iifp){w.alias="selector";return new mstrmojo.vi.ui.rw.FilterPortlet({title:defn.ttl||"",children:[w],panelId:viMap.getComponent($VI_TYPES.FILTER_STACK).id,k:w.k,isCollapsed:parseInt(defn.ds,10)===1,count:getSelectorElemCount(node,w),srcId:w.defn.srcid,height:defn.fmts.height});}var parentKey=buildConfig&&buildConfig.pk;if(parentKey){if(viMap.getComponentKey($VI_TYPES.PAGEBY_PANEL)===parentKey){return w;}if(viMap.isRelativePanel(parentKey)){var fmts=defn.fmts,left=fmts.left,top=fmts.top,Cls=$HASH.walk(this.getPortletClass(defn),window);fmts.left=0;fmts.top=0;w.slot="containerNode";w.alias="boxContent";return new Cls({title:defn.ttl||"",children:[w],k:w.k,defn:defn,model:this.model,height:fmts.height,width:fmts.width,top:top,left:left,nk:defn.fgk||buildConfig.fgk});}}},newLayout:function newLayout(model,node){var nodeData=node.data,nodeDefn=node.defn,dlv,defn,layoutViewerProps={alias:"layoutViewer",n:nodeDefn.title||mstrmojo.desc(3437,"Layout")+" 1",numDupl:nodeDefn.numDupl||0,model:model,node:node,controller:this.parent.controller,tbc:nodeDefn.tbc,slot:defaultSlot,ifs:nodeData.ifs,gb:nodeData.gbys};dlv=new mstrmojo.vi.ui.rw.DocLayoutViewer(layoutViewerProps);defn=dlv.defn=$HASH.copy(nodeDefn);defn.fmts=$HASH.copy(nodeDefn.fmts);this.viMap[node.k]=this.addDisposable(new mstrmojo.vi.models.VIComponentMap());var layout=new mstrmojo.vi.ui.rw.DocLayout({cssClass:"mstrmojo-VILayout",slot:"containerNode",id:node.id,k:node.k,rules:nodeDefn.rules,builder:this,node:node,defn:nodeDefn,model:model});dlv.addChildren([layout]);return dlv;},removeVIMapRef:function removeVIMapRef(key){var viCompMap=this.viMap[key];$ARR.removeItem(this.disposables,viCompMap);viCompMap.destroy();delete this.viMap[key];},newSection:function newSection(model,node){return this.newRWUnitInstance(model,node,mstrmojo.vi.ui.rw.DocSection,{slot:defaultSlot});},newDocSubsection:function newDocSubsection(model,node){return this.newRWUnitInstance(model,node,mstrmojo.vi.ui.rw.DocSubsection,{slot:defaultSlot});},newTextfield:function newTextField(model,node,config){var nodeData=node&&node.data,fieldValue=nodeData&&nodeData.v,containSeparator=!!(fieldValue&&fieldValue.indexOf("\u00df")>=0),isQuillFeatureEnabled=!!(mstrApp.isQuillFlag),useQuill=isQuillFeatureEnabled?(containSeparator||!fieldValue):containSeparator;config.scriptClass=useQuill&&isQuillFeatureEnabled?"mstrmojo.vi.ui.rw.DocQuillTextField":"mstrmojo.vi.ui.rw.DocTextfield";return newField.call(this,model,node,config,$EDITORS.TextEditorModel);},newImage:function newImage(model,node,config){return newField.call(this,model,node,config,$EDITORS.ImageEditorModel);},newHTMLContainer:function newHTMLContainer(model,node,config){var htmlContainer=this.newRWUnitInstance(model,node,(node.defn.ht===1)?mstrmojo.vi.ui.ScrollableDocTextfield:mstrmojo.DocHTMLContainer,{formatHandlers:{domNode:["D"]}});htmlContainer.edtModel=new $EDITORS.HtmlContainerEditorModel({hostId:htmlContainer.id,docModel:model});return htmlContainer;},newPanelStack:function newPanelStack(model,node){var defn=node.defn,typeField=0,props={id:node.id,node:node,k:node.k,controller:this.parent.controller,model:model,builder:this},Cls;switch(getPanelStackType(node)){case PS_TYPE_FILTERS:typeField=$VI_TYPES.FILTER_STACK;Cls=mstrmojo.vi.ui.rw.FilterPanelStack;props.cssClass="mstrmojo-VIFilterStack";props.title=model.getCurrentLayoutDef().title;break;case $PS_TYPES.VIS_CONTENT:typeField=$VI_TYPES.MAIN_CONTENT;Cls=mstrmojo.vi.ui.rw.DocVIPanelStack;props.cssClass="mstrmojo-VIMainVizPanel";props.slot=defaultSlot;break;case PS_TYPE_PAGE_BY:if(defn.empty===true){return ;}typeField=$VI_TYPES.PAGEBY_STACK;Cls=mstrmojo.ui.BuilderBox;props.height="45px";props.slot=defaultSlot;props.onunitChange=fnPageByUnitChange;break;case $PS_TYPES.VISUALIZATION:typeField=$VI_TYPES.VIZ_CONTENT;Cls=mstrmojo.vi.ui.rw.DocVIVisualizationsPanelStack;props.slot=defaultSlot;props.title=defn.n;break;}if(Cls){return this.getLayoutVIMap(defn._lkz).createComponent(typeField,Cls,props);}},newPanel:function newPanel(model,node,config,buildConfig){var key=node.k,Cls=mstrmojo.DocPanel,viMap=this.getLayoutVIMap(node.defn._lkz),parentKey=buildConfig.pk,props={id:node.id,node:node,numDupl:0,model:model,builder:this,controller:model.controller},viType=0;if(viMap.isComponent($VI_TYPES.FILTER_STACK,parentKey)){Cls=mstrmojo.vi.ui.rw.FilterPanel;props.alias="contents";props.cssClass="mstrmojo-VIFilterPanel";props.slot=defaultSlot;viType=$VI_TYPES.FILTER_PANEL;}else{if(viMap.isComponent($VI_TYPES.VIZ_CONTENT,parentKey)){Cls=mstrmojo.vi.ui.rw.DocRelativePanel;props.slot=defaultSlot;viMap.addRelativePanel(key);}else{if(viMap.isComponent($VI_TYPES.MAIN_CONTENT,parentKey)){Cls=mstrmojo.vi.ui.rw.DocVIMainPanel;props.slot=defaultSlot;}else{if(viMap.isComponent($VI_TYPES.PAGEBY_STACK,parentKey)){Cls=mstrmojo.ui.BuilderBox;props.slot=defaultSlot;props.onunitChange=fnPageByUnitChange;props.preBuildRendering=function(){this.set("unit",null);return mstrmojo.ui.BuilderBox.prototype.preBuildRendering.call(this);};viType=$VI_TYPES.PAGEBY_PANEL;}}}}var panel;if(viType){panel=viMap.createComponent(viType,Cls,props);}else{panel=new Cls(props);}return panel;},getDefaultXtab:function getDefaultXtab(buildConfig){if(buildConfig&&!!buildConfig.isViewDataGrid){if(!mstrmojo.VDXtab){mstrmojo.VDXtab=$CFC(mstrmojo.vi.ui.rw.Xtab,[mstrmojo.vi.ui.rw._IsViewDataGrid],{scriptClass:"mstrmojo.VDXtab"});}return mstrmojo.VDXtab;}return mstrmojo.vi.ui.rw.Xtab;},getCustomSortXtab:function getCustomSortXtab(){return mstrmojo.vi.ui.rw.CustomSortXtab;},newXtab:function newXtab(model,node,config,buildConfig){var xtab=this._super(model,node,config,buildConfig);xtab.zonesModel=xtab.addDisposable(new mstrmojo.vi.models.XtabDropZones({hostId:xtab.id,docModel:model}));xtab.set("edtModel",new mstrmojo.vi.models.editors.XtabEditorModel({hostId:xtab.id,docModel:model}));return xtab;},getDefaultMojoVisModel:function getDefaultMojoVisModel(){return mstrmojo.vi.models.DocVisModel;},newXtabModel:function newXtabModel(params){return new mstrmojo.vi.models.DocXtabModel(params);},newMojoVisualization:function newMojoVisualization(model,node){var mojoViz=this._super(model,node),visName=node.data.visName,visInstanceProps,ZoneModelClass,EdtModelClass;if(!!mojoViz){visInstanceProps={hostId:mojoViz.id,docModel:model};}if(mojoViz instanceof mstrmojo.Xtab){return mojoViz;}if(visName===ENUM_VIZ_STYLES.GRAPH_MATRIX||visName===ENUM_VIZ_STYLES.NEW_GRAPH_MATRIX){mojoViz.zonesModel=mojoViz.addDisposable(new mstrmojo.vi.models.CombineDropZonesModel({hostId:mojoViz.id,docModel:model,gmZones:mojoViz.addDisposable(new mstrmojo.vi.models.GMDropZones(visInstanceProps))}));mojoViz.edtModel=mojoViz.addDisposable(new mstrmojo.vi.models.editors.GMEditorModel({hostId:mojoViz.id,docModel:model}));}else{if(visName===ENUM_VIZ_STYLES.GOOGLE_MAP||visName===ENUM_VIZ_STYLES.ESRI_MAP){ZoneModelClass="MapDropZones";EdtModelClass="MapEditorModel";}else{if(visName===ENUM_VIZ_STYLES.MAPBOX){ZoneModelClass="MapboxDropZones";EdtModelClass="MapboxEditorModel";}else{if(visName===ENUM_VIZ_STYLES.IMAGE_LAYOUT){ZoneModelClass="ImageLayoutDropZones";EdtModelClass="ImageLayoutEditorModel";}else{if(visName===ENUM_VIZ_STYLES.HEAT_MAP){ZoneModelClass="HeatMapDropZones";EdtModelClass="HeatMapEditorModel";}else{if(visName===ENUM_VIZ_STYLES.NETWORK){ZoneModelClass="NetworkDropZones";EdtModelClass="NetworkEditorModel";}else{if(visName===ENUM_VIZ_STYLES.KPICARD){ZoneModelClass="KPICardDropZones";EdtModelClass="KPICardEditorModel";}else{if(mstrConfig.pluginsVisList[visName]){var customVis=mstrConfig.pluginsVisList[visName],dropZones=customVis.dz,editorModel=customVis.em;if(dropZones){mstrmojo.requiresCls("mstrmojo."+dropZones);var ViewClass=$HASH.walk(dropZones,mstrmojo);mojoViz.zonesModel=mojoViz.addDisposable(new ViewClass({hostId:mojoViz.id,docModel:model,visModel:mojoViz.model}));}else{mojoViz.zonesModel=mojoViz.addDisposable(new mstrmojo.vi.models.BaseVisDropZones({hostId:mojoViz.id,docModel:model,visModel:mojoViz.model}));}if(editorModel){mstrmojo.requiresCls("mstrmojo."+editorModel);var ModelClass=$HASH.walk(editorModel,mstrmojo);mojoViz.edtModel=mojoViz.addDisposable(new ModelClass(visInstanceProps));}else{EdtModelClass="BaseEditorModel";}}}}}}}}}if(ZoneModelClass){mojoViz.zonesModel=mojoViz.addDisposable(new mstrmojo.vi.models[ZoneModelClass](visInstanceProps));}if(EdtModelClass){mojoViz.edtModel=mojoViz.addDisposable(new $EDITORS[EdtModelClass](visInstanceProps));}if(mojoViz){mojoViz.updateFormatsOnUpdate=false;}return mojoViz;},getLayoutVIMap:function getLayoutVIMap(key){return this.viMap[key];}});}());