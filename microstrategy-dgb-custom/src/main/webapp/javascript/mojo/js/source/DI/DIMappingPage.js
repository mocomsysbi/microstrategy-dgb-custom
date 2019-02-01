(function(){mstrmojo.requiresCls("mstrmojo.DI.DIMappingPanel","mstrmojo.ui.Splitter","mstrmojo.StackContainer","mstrmojo.DI.DITablePanel","mstrmojo.DI.DIPreview","mstrmojo.css","mstrmojo.hash");mstrmojo.requiresDescs(12668);var constants=mstrmojo.DI.DIConstants,$WIDGET=mstrmojo.Widget,$CSS=mstrmojo.css,$H=mstrmojo.hash;function getLength(sources){var len=0,i;for(i in sources){len++;}return len;}var setClassToCols=function(header,body,indexesOfHead,indexesOfBody,subIndexes,classNameToSet){var isL=true,subClass,i,j,k;for(j=0;j<indexesOfHead.length;j++){header[0].cells[indexesOfHead[j]].className=classNameToSet;}if(subIndexes){for(j=0;j<subIndexes.length;j++){subClass=classNameToSet?(classNameToSet+(isL?" L":" R")):classNameToSet;header[1].cells[subIndexes[j]].className=subClass;if(isL&&(subIndexes[j+1]-subIndexes[j]>1)){subClass=classNameToSet?(classNameToSet+" M"):classNameToSet;for(k=subIndexes[j]+1;k<subIndexes[j+1];k++){header[1].cells[k].className=subClass;}}isL=!isL;}}for(i=0;i<body.length;i++){for(j=0;j<indexesOfBody.length;j++){body[i].cells[indexesOfBody[j]].className=classNameToSet;}}};mstrmojo.DI.DIMappingPage=mstrmojo.declare(mstrmojo.ui.Splitter,null,{cssClass:"mstrmojo-di-mappingpage",markupMethods:{onvisibleChange:$WIDGET.visibleMarkupMethod,onheightChange:$WIDGET.heightMarkupMethod,onwidthChange:$WIDGET.widthMarkupMethod},orientation:mstrmojo.ui.Splitter.ENUM_OR.VERTICAL,isPreviewOn:true,isPreviewMaximized:false,prviewMaxHeight:undefined,config:{firstSplit:{v:"100%",min:"296px",max:undefined},secondSplit:{v:"161px",min:"166px",max:undefined},resizeHandle:{v:"5px"}},children:[{slot:"firstSplitNode",scriptClass:"mstrmojo.DI.DITablePanel",bindings:{model:"this.parent.model"}},{slot:"secondSplitNode",scriptClass:"mstrmojo.StackContainer",cssClass:"mappingpage-bottom",alias:"bottomStack",setDimensions:function setDimensions(h,w){var i;var height=parseInt(h,10);var width=parseInt(w,10);if(isNaN(height)||isNaN(width)){return ;}if(this._super){this._super(h,w);}this.set("height",h);this.set("width",w);if(!this.children){return ;}for(i=0;i<this.children.length;i++){if(this.children[i].setDimensions){this.children[i].setDimensions(h,w);}else{this.children[i].set("height",h);this.children[i].set("width",w);}}},onremoveChild:function(evt){var children=evt.value;for(var i=0;i<children.length;i++){children[i].destroy();}}}],togglePreview:function togglePreview(visible){mstrmojo.css.toggleClass(this.domNode,"toggling",true);this.toggleSecondItemVisibility(visible);this.draggable=visible;this.set("isPreviewOn",visible);var splitterNode=this.domNode;$CSS.toggleClass(splitterNode,"preview-collapse",!visible);setTimeout(function(){$CSS.removeClass(splitterNode,["toggling"]);},500);},togglePreviewMaximized:function togglePreviewMaximized(maximized){var me=this,domNode=this.domNode;mstrmojo.css.toggleClass(domNode,"toggling",true);if(maximized){this.layoutConfig.h={firstSplitNode:"296px",resizeHandle:"5px",secondSplitNode:"100%"};}else{this.layoutConfig.h={firstSplitNode:"100%",resizeHandle:"5px",secondSplitNode:"161px"};}this.doLayout();me.set("isPreviewMaximized",maximized);setTimeout(function(){$CSS.removeClass(domNode,["toggling"]);me.widgetResized();},500);},widgetResized:function widgetResized(){var isPreviewMaximized=this.isPreviewMaximized,cfg;if(this._super){this._super();}cfg=this.layoutConfig&&this.layoutConfig.h;if(cfg){isPreviewMaximized=cfg.firstSplitNode==="296px"&&cfg.secondSplitNode==="100%";}if(this.bottomStack.selected){this.bottomStack.selected.widgetResized();}this.set("isPreviewMaximized",isPreviewMaximized);},toggleSecondItemVisibility:function toggleSecondItemVisibility(show){if(show){this._super(show);}else{this.layoutConfig.h={firstSplitNode:"100%",resizeHandleNode:"0px",secondSplitNode:"40px"};}this.doLayout();},update:function(evt){if(evt&&evt.ignore){return ;}var m=this.model;var key=null;var previewPage=null;var source,hasPreview;if(m.currentSource===null){this.toggleSecondItemVisibility(this.isPreviewOn);}else{if(getLength(m.importSources)===1){key=m.getAllTableID()[0];}else{key=m.currentSource.key;}source=m.getImportSource(key);hasPreview=!!source.currentPreview||!!source.transformedPreview;if(source&&!hasPreview){mstrApp.getRootController().selectSourceTable(source.tableID);}if(this.layoutConfig&&this.layoutConfig.h.secondSplitNode==="0px"){this.toggleSecondItemVisibility(this.isPreviewOn);}previewPage=this.previewPageInstances[key];if(!previewPage||previewPage.destroyed){previewPage=this.bottomStack.addChildren([mstrmojo.insert({scriptClass:"mstrmojo.DI.DIPreview",model:m,sourceTableKey:key})])[0];this.previewPageInstances[key]=previewPage;if(previewPage.setDimensions){previewPage.setDimensions(this.bottomStack.height,this.bottomStack.width);}else{previewPage.set("height",this.bottomStack.height);previewPage.set("weight",this.bottomStack.width);}}this.bottomStack.set("selected",previewPage);}},updateFooterButtons:function(){var controller=mstrApp.getRootController(),m=this.model,dids=m.getAllTableID(),cnt=0,source,maps,writable=controller.model.writable;if(controller.dialogController.pageZIndex<=0){mstrmojo.array.forEach(dids,function(tableID){source=m.getImportSource(tableID);if(source){maps=source.getCurrentMappings(function(map){return map.selected;});if(maps&&maps.length){cnt+=maps.length;}}});controller.rootView.showFooter({next:{enabled:cnt>0&&(writable!==0||m.isManagedCube===true)}});controller.rootView.showFooter({save:{enabled:cnt>0&&(writable!==0||m.isManagedCube===true)}});}},getSelectedChild:function(){return this.bottomStack.selected;},preBuildRendering:function preBuildRendering(){this.setDimensions(parseInt(this.parent.layoutNode.offsetHeight,10),this.parent.layoutNode.offsetWidth);if(this._super){this._super();}this.update();},postCreate:function(){var m=this.model;this.previewPageInstances={};m.attachEventListener("CurrentSourceChanged",this.id,"update");m.attachEventListener("PreviewFetched",this.id,"update");m.attachEventListener("PreviewNotFetched",this.id,"update");m.attachEventListener("MappingsFetched",this.id,"updateFooterButtons");m.attachEventListener("removeSourceTable",this.id,"removeSourceTablePreview");this.attachEventListener("scrollPreviewToCurItem",this.id,"scrollPreviewToCurItem");this.attachEventListener("highlightColumns",this.id,"highlightColumns");},removeSourceTablePreview:function(evt){if(this.previewPageInstances[evt.tableID]){this.bottomStack.removeChildren(this.previewPageInstances[evt.tableID]);delete this.previewPageInstances[evt.tableID];}},highlightColumns:function highlightColumns(evt){var clearHighlight;return function(){var tableId=evt.tableId;var selectedPrv=this.getSelectedChild();if(!selectedPrv||selectedPrv.sourceTableKey!==tableId){return ;}var grid=selectedPrv.preGrid,cols=grid.columns,headerRows=grid.headerRows,bodyRows=grid.bodyRows,colLen=$H.walk("0.cells.length",headerRows),selectLen=evt.data.length,selectedItems=evt.data,indexesOfHeader=[],indexesOfBody=[],bodyOffsetByMFA=0,curMFATotSubColCnt=0,curMfaLen,indexesOfSubheader=[],i,j,k;if(cols.length===0){return ;}for(i=0;i<colLen;i++){if(headerRows[0].cells[i].className){indexesOfHeader.push(i);}}if(headerRows[1].cells.length>0){for(i=0;i<headerRows[1].cells.length;i++){if(headerRows[1].cells[i].className){indexesOfSubheader.push(i);}}}for(i=0;i<bodyRows[0].cells.length;i++){if(bodyRows[0].cells[i].className){indexesOfBody.push(i);}}if(indexesOfHeader.length>0){window.clearTimeout(this.clearHighlight);setClassToCols(headerRows,bodyRows,indexesOfHeader,indexesOfBody,indexesOfSubheader,"");indexesOfHeader=[];indexesOfBody=[];indexesOfSubheader=[];}for(i=0;i<colLen;i++){for(j=0;j<selectLen;j++){if(cols[i].headerWidget.name===selectedItems[j].n){indexesOfHeader.push(i);indexesOfBody.push(i+bodyOffsetByMFA);if(cols[i].headerWidget.data.subColumns&&cols[i].headerWidget.data.subColumns.length>1){curMfaLen=cols[i].headerWidget.data.subColumns.length;indexesOfSubheader.push(curMFATotSubColCnt);indexesOfSubheader.push(curMFATotSubColCnt+curMfaLen-1);for(k=1;k<curMfaLen;k++){indexesOfBody.push(i+bodyOffsetByMFA+k);}}break;}}if(cols[i].headerWidget.data.subColumns&&cols[i].headerWidget.data.subColumns.length>1){curMfaLen=cols[i].headerWidget.data.subColumns.length;bodyOffsetByMFA+=(curMfaLen-1);curMFATotSubColCnt+=curMfaLen;}}setClassToCols(headerRows,bodyRows,indexesOfHeader,indexesOfBody,indexesOfSubheader,"highlight");this.clearHighlight=window.setTimeout(function(){setClassToCols(headerRows,bodyRows,indexesOfHeader,indexesOfBody,indexesOfSubheader,"");},1000);}.call(this);},scrollPreviewToCurItem:function scrollPreviewToCurItem(evt){var tableId=evt.tableId;var pos;var selectedPrv=this.getSelectedChild();if(!selectedPrv||selectedPrv.sourceTableKey!==tableId){return ;}var grid=selectedPrv.preGrid;var columnCount=selectedPrv.preGrid.columns.length;if(!columnCount||columnCount<=0){return ;}pos=grid.getMappingColumnOffset(evt.data);var animateProps={};animateProps.scrollLeft={isStyle:false,start:grid.scrollNode.scrollLeft,stop:pos,ease:mstrmojo.ease.linear};(new mstrmojo.fx.AnimateProp({props:animateProps,duration:20,interval:10,target:grid.scrollNode})).play();},onNextButtonClick:function(){var panel=this.getSelectedChild();if(panel&&panel.scriptClass==="mstrmojo.DI.DIPreview"){panel.onNextButtonClick();}else{mstrApp.getRootController().saveAndPublish();}},onSaveButtonClick:function(){mstrApp.getRootController().save();},onCancelButtonClick:function(){var controller=mstrApp.getRootController(),isCubeSaved=controller.getModel().isCubeSaved;if(isCubeSaved){controller.wrapUpDataImport(false);}else{controller.cancelApplication();}return true;},onHelpButtonClick:function onHelpButtonClick(){return"Preview_page.htm";},onBackButtonClick:function(){var controller=mstrApp.getRootController();var m=controller.model;var type;var panel=this.getSelectedChild();if(m.currentSource){var tableID=m.currentSource.tableID;var prevSlot=controller.navigationController.getPreviousPageSlot(tableID,constants.pageType.emmaPreview);if(panel.onBackButtonClick&&!panel.onBackButtonClick()){if(prevSlot){var prevPage=prevSlot.get();if(prevPage){controller.showPage(prevPage.pageType,null,prevSlot);}else{var pageConfig=prevSlot.getConfig();if(pageConfig){controller.showPage(pageConfig.pageType,null,prevSlot);}}}else{type=m.currentSource.type;if(type===constants.sourceType.querybuilder){mstrApp.getRootController().showPage(constants.pageType.database,{sourceType:constants.sourceType.querybuilder,type:m.currentSource.xdaType,extParams:{tableID:m.currentSource.tableID}});}}}}}});}());