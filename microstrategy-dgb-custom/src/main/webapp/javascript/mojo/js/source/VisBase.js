(function(){mstrmojo.requiresCls("mstrmojo.func","mstrmojo.array","mstrmojo.hash","mstrmojo.Container","mstrmojo._HasLayout","mstrmojo._Formattable","mstrmojo._IsDocumentTemplate","mstrmojo.Label","mstrmojo.VisUtility","mstrmojo.ui.menus.MenuConfig","mstrmojo.vi._MonitorsAppState","mstrmojo.vi.ui.rw._SupportViewFilterInVizBox","mstrmojo.util.FontLoader");mstrmojo.requiresClsP("mstrmojo.vi.viz","EnumVisualizationTemplates","EnumVizStyles","EnumWidgetTypes");var FMTS={top:"top",left:"left","z-index":"zIndex",width:"width",height:"height"};var BG_FMTS=["background-color","fx"],DIMEN_FMTS={width:"width",height:"height"},$ARR=mstrmojo.array,$HASH=mstrmojo.hash;mstrmojo.VisBase=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout,mstrmojo._Formattable,mstrmojo._IsDocumentTemplate,mstrmojo.vi.ui.rw._SupportViewFilterInVizBox,mstrmojo.vi._MonitorsAppState],{scriptClass:"mstrmojo.VisBase",updated:false,waitingForData:false,node:null,excludeData:false,skipReRender:false,updateFormatsOnUpdate:true,bgFormats:{},init:function init(props){this.excludeData=!!(mstrConfig.resolveOnly||mstrApp.isAppStatePause&&mstrApp.isAppStatePause());if(this._super){this._super(props);}},setModel:function setModel(model){this.set("model",model);},destroy:function destroy(){var model=this.model;if(model&&model.destroy){model.destroy();delete this.model;}this._super();},resize:function resize(){var f=this.getFormats();if(parseInt(f.height,10)===0||parseInt(f.width,10)===0){this.domNode.style.display="none";}else{this.setDimensions(f.height,f.width);this.domNode.style.display="";}},setDimensions:function setDimensions(h,w){var dimensionChanged=this._super(h,w);if(dimensionChanged&&this.hasRendered&&!this.skipReRender){this.reRender();}return dimensionChanged;},reRender:function reRender(){this.unrender();this.render();},getWidth:function getWidth(){return parseInt(this.width,10);},getHeight:function getHeight(){return parseInt(this.height,10);},getLeft:function getLeft(){return parseInt(this.left,10);},getTop:function getTop(){return parseInt(this.top,10);},getFonts:mstrmojo.emptyFn(),loadFonts:function loadFonts(fontConfigs,callback){if(mstrmojo.util.FontLoader.load(fontConfigs,callback)){callback.success();}},preBuildRendering:function preBuildRendering(){if(this.requirePreload){var callbackFn=function callbackFn(){this.requirePreload=false;this.render();};if(mstrmojo.util.FontLoader.load(this.getFonts(),{success:callbackFn.bind(this),failure:callbackFn.bind(this)})){return this._super();}else{return false;}}return this._super();},buildRendering:function bldRn(){this.height=this.getHeight();this.width=this.getWidth();this.left=this.getLeft();this.top=this.getTop();if(!this.updated){this.update();}this._super();},initFromVisProps:function initFromVisProps(){},postBuildRendering:function(){var isEmpty=this.isEmpty();this._super();this.raiseEvent({name:"toggleCtrlOverlay",visible:isEmpty||this.excludeData,controls:this.getVisEmptyMsgControls()});this.applyBackground();return !isEmpty;},applyBackground:function applyBackground(){var bgFormats=this.bgFormats,handler,formatProp,slot,index;if(mstrApp.isExpress&&!$HASH.isEmpty(bgFormats)){handler=this.formatHandlers=this.formatHandlers||{};slot=handler.domNode=handler.domNode||[];formatProp="BG";index=$ARR.indexOf(slot,formatProp);if(index<0){slot.push(formatProp);}this.applyCSSFormatToNode("domNode",bgFormats);}},parseBgFormats:function parseBgFormats(){var widgetId=this.id;return{success:function(res){var layoutIndex,layouts,layout,node,fmts,bgFormats,widget=mstrmojo.all[widgetId],docModel=widget&&widget.getDocModel();if(res.defn&&res.defn.layouts&&widget&&docModel){layouts=res.defn.layouts;layoutIndex=$ARR.find(layouts,"k",docModel.getCurrentLayoutKey());layout=layouts[layoutIndex];node=layout&&layout.units&&layout.units[widget.k];fmts=node&&node.fmts;if(fmts){bgFormats=widget.bgFormats={};$ARR.forEach(BG_FMTS,function(item){if(fmts[item]){bgFormats[item]=fmts[item];}});}}}};},onAppStateChange:function(evt){var isPauseMode=mstrApp.isAppStatePause&&mstrApp.isAppStatePause(),wasPauseMode=evt.valueWas&mstrmojo.vi.VisualInsightApp.APP_STATES.PAUSE;this.excludeData=!!(mstrConfig.resolveOnly||isPauseMode);if(this._super){this._super(evt);}if(isPauseMode&&!wasPauseMode||(!isPauseMode&&wasPauseMode&&!mstrApp.enableUpdate)){this.raiseEvent({name:"toggleCtrlOverlay",visible:this.excludeData||this.isEmpty(),controls:this.getVisEmptyMsgControls()});}},refresh:function refresh(postUnrender){if(this.excludeData){this.raiseEvent({name:"toggleCtrlOverlay",visible:true,controls:this.getVisEmptyMsgControls()});return ;}this._super(postUnrender);},update:function update(node){node=node||this.node;if(node){var nodeData=node.data;if(nodeData){this.model.set("data",nodeData);}this.waitingForData=!!nodeData.nsj;if(this.waitingForData){var iveStyleName="ServerJsonRWDStyle";var model=this.model,ds=model.getDataService(),taskReq={host:this,nodes:[this.k]},callback;if(nodeData.wid!==undefined){taskReq.slices=[nodeData.wid];}callback=mstrmojo.func.wrapMethods(this.parseBgFormats(),model.docModel.getUpdateColorMapCallback(),model.docModel.getUpdateThemePaletteCallback(true),model.controller._getXtabCallback(this,false));ds.retrieveServerJson(taskReq,callback,{preserveUndo:true,style:{name:iveStyleName,params:{treesToRender:3}},params:{styleName:iveStyleName}});this.updated=true;return false;}this.updateContentFormats(node);}if(this.model){var docModel=this.model&&this.model.docModel;this.initFromVisProps(this.model.vp);if(docModel&&docModel.getDocBuilder){var visName=docModel.getDocBuilder().getMojoVisName(node);if(visName){node.data.visName=visName;}}}this.updated=true;if(this._super){return this._super(node);}return true;},updateContentFormats:function updateContentFormats(node){var k,copyFmts,fmts,defn=node.defn,docBuilder=this.builder;if(this.updateFormatsOnUpdate&&defn){if(docBuilder&&docBuilder.isPortlet&&docBuilder.isPortlet(defn)){copyFmts=DIMEN_FMTS;}else{copyFmts=FMTS;}fmts=defn.fmts||defn.units[this.model.k].fmts;for(k in copyFmts){if(copyFmts.hasOwnProperty(k)&&fmts.hasOwnProperty(k)){this[copyFmts[k]]=fmts[k];}}}},isEmpty:function isEmpty(){return false;},getVisEmptyMsgControls:function getVisEmptyMsgControls(){return[{scriptClass:"mstrmojo.Label",cssClass:"dropMsg",text:mstrmojo.desc(11668,"Drag objects here.")}];},getModel:function getModel(){return this.model;},getData:function getData(){return this.model.data;},getRowsAndCols:function(){var gts=this.model.data.gts;return(gts.row||[]).concat(gts.col||[]);},getExp:function(){var data=this.model.data,exp=data&&data.sc&&data.sc.exp;return exp;},getDocModel:function getDocModel(){return this.model&&this.model.docModel;},getTitleRMCPopup:mstrmojo.emptyFn,getMenuHandler:function getMenuHandler(){return mstrmojo.emptyFn;},renderErrorMessage:function renderErrorMessage(msg){this.domNode.innerHTML='<div class="mstrmojo-message">'+msg+"</div>";},getMessageID:function getMessageID(){return this.model.docModel.mid||this.model.mid;},performAction:function performAction(actionObj){var model=this.model,isHeatMap=this.scriptClass==="mstrmojo.heatmap.vi.VisHeatMap",action=isHeatMap?model.getHMAction(actionObj):model.getAction(actionObj),handler=action&&action.h;if(handler&&this.controller[handler]){this.controller[handler](this,action.a);return true;}return false;},deleteSelectorControl:function deleteSelectorControl(){var data=this.getData(),sc=data.sc;if(sc&&parseInt(sc.ct,10)===6){delete data.sc;}},findSelectorControl:function findSelectorControl(){var data=this.getData(),v=data&&data.sc;if(v&&parseInt(v.ct,10)===6){this.selectorControl=v;this.isMultiSelect=true;}else{delete this.selectorControl;}return this.selectorControl;},displayVizBoxVisFilterIndicator:function displayVizBoxVisFilterIndicator(hasNewSelection,vizBox){if(hasNewSelection&&vizBox&&vizBox.displayVisFilterIndicator){vizBox.displayVisFilterIndicator();}}});})();