(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.Worksheet","mstrmojo.CheckBox","mstrmojo.Image","mstrmojo.DI.DIHelpers");mstrmojo.requiresDescs(13974);var constants=mstrmojo.DI.DIConstants,DIHelpers=mstrmojo.DI.DIHelpers,isOperationMode=mstrmojo.DI.DIHelpers.isOperationMode,$CSS=mstrmojo.css;mstrmojo.DI.DIClipboard=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.DI.DIClipboard",cssClass:"mstrmojo-di-clipboard",jsonp:"parent.mstrmojo.all.{@id}.uploadCallback(@R@)",_data:null,markupString:'<div id="{@id}" class="{@cssClass}" ><form target="{@id}_iframe" enctype="multipart/form-data" method="post" action="taskProc"><div id="{@id}" ></div><div id="{@id}" ></div></form><iframe id="{@id}_iframe" + name="{@id}_iframe" style="display:none;" src="about:blank"></iframe></div>',markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"table":"none";}},markupSlots:{formNode:function(){return this.domNode.children[0];},worksheet:function(){return this.domNode.children[0].children[0];},paramsNode:function(){return this.domNode.children[0].children[1];}},children:[{scriptClass:"mstrmojo.Worksheet",alias:"ws",slot:"worksheet",numOfRows:19,numOfcols:11,showRowHeaders:true,dragColumns:false,clearSheet:true,resizeColumns:false,postCreate:function(){this.attachEventListener("WorksheetContentChanged",this.id,"checkState");},checkState:function(evt){mstrApp.getRootController().sourceSelected(evt.data);}}],postBuildRendering:function postBuildRendering(){var msg=mstrmojo.desc(13974,"Copy-pasting data from Internet Explorer might not align properly. We recommend using Chrome, Firefox."),model=mstrApp.getRootController().model;if(this._super){this._super();}window.setTimeout(function checkIE(){if(DIHelpers.isIE()){mstrApp.getRootController().displayWarning(msg,null,mstrmojo.emptyFn,{showCancel:false});}},0);model.attachEventListener("windowSizeChanged",this.id,this.adjustSize);if(mstrmojo.dom.isEdge){this.domNode.setAttribute("x-ms-format-detection","none");}},adjustSize:function adjustSize(evt){var width=Math.ceil(parseInt(evt.size.w,10)),ws=this.ws;ws.tableContainer.style.width=(width-35)+"px";if(DIHelpers.isServerBasedWS()){var height=Math.ceil(parseInt(evt.size.h,10)),titleHeight=ws.parent.parent.virtualHeaderHeight,toolbarHeight=52,footerHeight=56;ws.tableContainer.style.height=(height-titleHeight-toolbarHeight-footerHeight)+"px";}ws.updateScrollbars();},onBackButtonClick:function onBackButtonClick(){var controller=mstrApp.getRootController();controller.showPage(constants.pageType.dataSelection);this.destroy();},onHelpButtonClick:function onHelpButtonClick(){return"Importing_custom_data_by_typing_or_pasting_values.htm";},onNextButtonClick:function onNextButtonClick(){var controller=mstrApp.getRootController();if(this.tableID){controller.refreshDataClipboard(this.tableID,this,constants.actions.refreshData);}else{controller.importClipboard(this,!controller.model.hasEMMAReportInstance(),constants.actions.importSource,this.id);}},onFinishButtonClick:function(){var controller=mstrApp.getRootController();if(this.tableID){controller.refreshDataClipboard(this.tableID,this);}else{controller.importClipboard(this,!controller.model.hasEMMAReportInstance(),constants.actions.savePublish,this.id);}},collectData:function(){this._data=this.ws.getData();},destroy:function(ignoreDom){this.collectData();this._super(ignoreDom);},submit:function(ps,callbacks,config){var array=[],data;data=this._data!==null?this._data:this.ws.getData();array.push(data);if(mstrApp.isSingleTier){mstrApp.showProgress(config);mstrApp.getRootController().oneTierImportFile(callbacks,mstrmojo.hash.copy(ps,{datasource:data,dict:constants.backendSourceSubtype.clipboard}));return ;}if(mstrmojo.dom.supports(mstrmojo.dom.htmlFeatures.FILE_READER)){var blob=new Blob(array);mstrApp.showProgress(config);ps.fileFieldName="myFile";mstrApp.upload(callbacks,ps,blob,config);}else{ps.jsonp=this.jsonp.replace("{@id}",this.id);ps.taskEnv="jsonp2";var h=[],p;for(p in ps){h.push('<input type="hidden" name="'+p+'" value="'+mstrmojo.string.encodeHtmlString(ps[p].toString())+'"/>');}h.push('<input type="hidden" name="data" value="'+data+'"/>');this.paramsNode.innerHTML=h.join("");if(callbacks){this.onSuccess=callbacks.success;this.onFailed=callbacks.failure;}this.formNode.submit();}},uploadCallback:function(d){var success=(d.status===200);if(success&&this.onSuccess){this.onSuccess(d);}if(!success&&this.onFailed){this.onFailed(d);}},getFilesCnt:function(){return 1;},getFileName:function(idx){return"";},getFileTableID:function(idx){return null;},getOperationMode:function(){var r=this.model.operationMode;if(isOperationMode(this.operationMode)){r=this.operationMode;}return r;},updatePageConfig:function(config){var page=this;if(config&&config.properties){mstrmojo.hash.forEach(config.properties,function(value,key){page.set(key,value);});}if(this.content){this.ws.setData(this.content);}}});}());