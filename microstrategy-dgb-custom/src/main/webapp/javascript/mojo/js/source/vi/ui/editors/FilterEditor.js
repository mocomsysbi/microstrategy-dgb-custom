(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.css","mstrmojo.dom","mstrmojo.hash","mstrmojo.expr","mstrmojo.Box","mstrmojo.Button","mstrmojo.Editor","mstrmojo.Dial","mstrmojo.Label","mstrmojo.fe.CreateSetEditor","mstrmojo.fe.FilterEditor","mstrmojo.vi.ui.editors.fe.RWViewLimitExprTree","mstrmojo.mstr.EnumDSSXMLObjectTypes","mstrmojo.vi.ui.ConditionWalk","mstrmojo.vi.ui.ConditionEditor","mstrmojo.vi.ui.editors.fe.ConditionWalk","mstrmojo.vi.ui.editors.fe.RWViewFilterExprTree","mstrmojo.warehouse.EnumObjectTypes");mstrmojo.requiresDescs(118,2397,5758,14915,15540,15005,15014,15091);var $H=mstrmojo.hash,$ARR=mstrmojo.array,$CSS=mstrmojo.css,$DOM=mstrmojo.dom,$EXPR=mstrmojo.expr,$OBJECT_TYPE=mstrmojo.mstr.EnumDSSXMLObjectTypes,$ENUM_OUTPUT_LEVEL={TEMPLATE:0,DATASET:1},_ET=$EXPR.ET,_BF=$EXPR.BRANCH_FNS,$ENUM_OT=mstrmojo.warehouse.EnumObjectTypes,$NODE=mstrmojo.mstr.EnumNodeProperties,VFEMPTY_CSS="VFEmpty";var EMPTY_TREE_HEIGHT=10,MIN_HEIGHT_WITH_ONE_NODE=46,MIN_HEIGHT_WITH_MORE_NODES=116,TOTAL_HEIGHT_OF_TWO_TREES=286,HEIGHT_OF_TOTAL_CONTENT=369,TL_LABEL_HEIGHT=42;DL_LABEL_HEIGHT=26;function createNewCondition(editor){var newCondition={et:editor.defaultExpressionType};if(editor.disableElementsBrowsing&&editor.disableElementsBrowsing()){newCondition={et:_ET.AQ};}editor.mainExpr.newCondition(newCondition,true);}function getViewLimitExprTreeMinHeight(listHeight){var minHeight=EMPTY_TREE_HEIGHT;if(listHeight<EMPTY_TREE_HEIGHT){minHeight=EMPTY_TREE_HEIGHT;}else{if(listHeight<=MIN_HEIGHT_WITH_ONE_NODE){minHeight=MIN_HEIGHT_WITH_ONE_NODE;}else{minHeight=MIN_HEIGHT_WITH_MORE_NODES;}}return minHeight;}function calcExprTreeHeight(vfExpr,vlExpr){var upperDomNode=vfExpr&&vfExpr.domNode,lowerDomNode=vlExpr&&vlExpr.domNode,upperStyle=upperDomNode&&upperDomNode.style,lowerStyle=lowerDomNode&&lowerDomNode.style;var heightOfTotalContent=vfExpr.parent.domNode.offsetHeight;if(!vlExpr){upperStyle.height=heightOfTotalContent+"px";if(vfExpr.updateScrollbars){vfExpr.updateScrollbars();}return ;}if(upperDomNode&&lowerDomNode){var diffHeight=HEIGHT_OF_TOTAL_CONTENT-TOTAL_HEIGHT_OF_TWO_TREES;if(!vfExpr.editor.showLimits){diffHeight-=TL_LABEL_HEIGHT+DL_LABEL_HEIGHT;}var totalHeightOfTwoTrees=heightOfTotalContent-diffHeight;var upperListSize=$DOM.position(vfExpr.itemsContainerNode),lowerListSize=$DOM.position(vlExpr.itemsContainerNode),upperListHeight=upperListSize.h,lowerListHeight=lowerListSize.h;var minLowerlistHeight=getViewLimitExprTreeMinHeight(lowerListHeight),largestUpperlistHeight=totalHeightOfTwoTrees-minLowerlistHeight;var upperHeight=Math.min(EMPTY_TREE_HEIGHT+upperListHeight,largestUpperlistHeight);upperStyle.height=upperHeight+"px";lowerStyle.height=totalHeightOfTwoTrees-upperHeight+"px";if(vfExpr.updateScrollbars){vfExpr.updateScrollbars();}if(vlExpr.updateScrollbars){vlExpr.updateScrollbars();}}}function getConditionModel(data){var d=$H.clone(data);if(data&&data.et===_ET.ANDOR&&(data.node&$NODE.CONDITION)){var tgt=$H.valarray($EXPR.findTargets(data,"did"))[0],ret={et:_ET.ANDOR,data:d};switch(tgt&&tgt.t){case $OBJECT_TYPE.Attribute:ret.a=tgt;break;case $OBJECT_TYPE.Metric:ret.m=tgt;break;}return ret;}return d;}mstrmojo.vi.ui.editors.FilterEditor=mstrmojo.declare(mstrmojo.fe.FilterEditor,null,{scriptClass:"mstrmojo.vi.ui.editors.FilterEditor",titleMarkupString:'<div class="mstrmojo-Editor-title-container"><div class="mstrmojo-Editor-title"></div><div class="edt-title-btn mstrmojo-Editor-help" tooltip="'+mstrmojo.desc(1143,"help")+'"></div><div class="edt-title-btn mstrmojo-Editor-close" tooltip="'+mstrmojo.desc(2102,"Close")+'"></div></div><div class="mstrmojo-Editor-subtitle-container"></div><div class="mstrmojo-Editor-titleSpacer"></div>',markupSlots:$H.copy({subTitleNode:function subTitleNode(){return this.showTitle?this.domNode.firstChild.children[1]:null;},containerNode:function containerNode(){return this.domNode.firstChild.childNodes[3];},buttonNode:function buttonNode(){return this.domNode.firstChild.childNodes[4];},curtainNode:function curtainNode(){return this.domNode.lastChild;}},$H.copy(mstrmojo.fe.FilterEditor.prototype.markupSlots)),help:"view_filter_editor_for_dossiers.htm",cssClass:"mstrmojo-charcoalboxe mstrmojo-FE mstrmojo-vi-ui-FE",postCreate:function postCreate(){this.children=mstrmojo.hash.clone(this.children).concat([{scriptClass:"mstrmojo.Box",slot:"subTitleNode",children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(14915,"New Qualification"),cssDisplay:"inline-block",cssClass:"mstrmojo-relation-relateby-text",bindings:{text:function(){return this.editor.isNewCond?mstrmojo.desc(14915,"New Qualification"):mstrmojo.desc(15540,"Edit Qualification");},editor:"this.parent.parent",visible:function(){return !!this.editor.showCondWalk;}}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",alias:"newQualificationBtn",cssText:"float: left",cssDisplay:"inline-block",text:mstrmojo.desc(15005,"Add New Qualification"),onclick:function(){createNewCondition(this.editor);},bindings:{enabled:function(){return !this.editor.readOnly;},visible:function(){return !this.editor.showCondWalk;},editor:"this.parent.parent"}}]}]);if(this._super){this._super();}},editorTitle:mstrmojo.desc(5758,"Filter Editor"),defaultExpressionType:_ET.AE,onvizTitleChange:function(){this.set("title",this.editorTitle+" - "+this.vizTitle);},getExpressionContainerCfg:function(){var cfg=this._super();cfg.cssDisplay="flex";return cfg;},onOpen:function onOpen(){var vfExpr=this.mainExpr,vlExpr=this.limitExpr;if(vfExpr){calcExprTreeHeight(vfExpr,vlExpr);}if(!this.model.expr){createNewCondition(this);}},getExpressionContentsConfig:function(){return[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(15091,"Metric values are not aggregated."),cssClass:"mstrmojo-FE-expr-header dl",bindings:{visible:"this.parent.parent.parent.showLimits"}},{alias:"ve",scriptClass:"mstrmojo.vi.ui.editors.fe.RWViewFilterExprTree",level:$ENUM_OUTPUT_LEVEL.DATASET,bindings:{items:"this.editor.model.exprForest || []"},onBlankClick:function(evt){this.parent.clearSelect(evt);},supportRelation:true,postApplyProperties:function(){this.editor=this.parent.parent.parent;this.editor.set("mainExpr",this);},onNew:function(inf){inf.data.isNew=true;if(!inf.data.ph){this.editor.openWalk(inf.data,inf.widget.ctxtBuilder.itemWidgets[inf.index],"condition");}var vle=this.parent.vle;calcExprTreeHeight(this,vle);},onadd:function onadd(){$CSS.toggleClass(this.parent.domNode,VFEMPTY_CSS,this.items.length===0);var vle=this.parent.vle;calcExprTreeHeight(this,vle);},onremove:function onremove(){$CSS.toggleClass(this.parent.domNode,VFEMPTY_CSS,this.items.length===0);var vle=this.parent.vle;calcExprTreeHeight(this,vle);},onnodeadd:function onnodeadd(){var vle=this.tree.parent.vle;calcExprTreeHeight(this.tree,vle);},onnoderemove:function onnoderemove(){var vle=this.tree.parent.vle;calcExprTreeHeight(this.tree,vle);},onitemsChange:function onitemsChange(evt){var isEmpty=this.items.length===0,parentBox=this.parent;if(this.hasRendered){$CSS.toggleClass(parentBox.domNode,VFEMPTY_CSS,isEmpty);}else{if(isEmpty){$CSS.addWidgetCssClass(parentBox,VFEMPTY_CSS);}else{$CSS.removeWidgetCssClass(parentBox,VFEMPTY_CSS);}}}},{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(15014,"Metric values are aggregated based on the attributes in the visualization."),cssClass:"mstrmojo-FE-expr-header tl",bindings:{visible:"this.parent.parent.parent.showLimits"}},{alias:"vle",scriptClass:"mstrmojo.vi.ui.editors.fe.RWViewLimitExprTree",level:$ENUM_OUTPUT_LEVEL.TEMPLATE,validExprTypes:$ARR.hash([_ET.MQ,_ET.MC]),bindings:{visible:"this.editor.showLimits",items:"this.editor.model.limitExprForest || []"},onBlankClick:function(evt){this.parent.clearSelect(evt);},postApplyProperties:function(){this.editor=this.parent.parent.parent;this.editor.set("limitExpr",this);},onnodeadd:function onnodeadd(){var ve=this.tree.parent.ve;calcExprTreeHeight(ve,this.tree);},onnoderemove:function onnoderemove(){var ve=this.tree.parent.ve;calcExprTreeHeight(ve,this.tree);},onadd:function onadd(){var ve=this.parent.ve;calcExprTreeHeight(ve,this);},onremove:function onremove(){var ve=this.parent.ve;calcExprTreeHeight(ve,this);}}];},getConditionWalkConfig:function getConditionWalkConfig(){return undefined;},toggleOkButtonStatus:function disableOkButton(status){var okBtn=this.buttonBar.children[0].btnSave;okBtn.set("enabled",!!status);},andOrPopupRef:{scriptClass:"mstrmojo.Editor",cssClass:"mstrmojo-FE-andOrPopup mstrmojo-ConditionWalk",contentNodeCssClass:"mstrmojo-balloon",slot:"containerNode",modal:false,autoClose:true,showTitle:false,draggable:false,openEffect:null,closeEffect:null,onOpen:function(){var w=this.condition,not=w&&w.data&&w.data.not,p=w&&w.parent,pd=p&&p.data,fn=(pd&&pd.fn)+(not?21:0);this.list.opening=true;this.list.set("selectedItem",isNaN(fn)?null:{did:fn});this.list.opening=false;},children:[{scriptClass:"mstrmojo.Dial",cssClass:"mstrmojo-CGE-andOrDial",alias:"list",animate:false,itemMarkup:'<div class="dial-item {@css}">{@n}</div>',itemIdField:"did",renderOnScroll:false,items:[{did:19,n:_BF[19]},{did:20,n:_BF[20]},{did:19+21,n:_BF["19_21"]},{did:20+21,n:_BF["20_21"]}],onchange:function(){if(this.opening){return ;}var pop=this.parent,w=pop.condition,sel=this.selectedItem,did=sel&&sel.did,not=did>21?true:null,fn=did-(not?21:0);pop.close();var bq=w&&w.parent;if(bq&&bq.data&&bq.data.et===_ET.ANDOR){bq.edit(w,fn,not);}else{var d=w&&w.data;if(d&&(d.not!==not)){d.not=not;w.paint();}}}}]},createSetPopupRef:{scriptClass:"mstrmojo.fe.CreateSetEditor",contentNodeCssClass:"",cssClass:"VI-CreateSet-Editor",slot:"containerNode",autoClose:true,showTitle:false,isHostedWithin:false},conditionEditorPopupRef:{scriptClass:"mstrmojo.vi.ui.ConditionEditor",isHostedWithin:false,getIfDataSource:function getIfDataSource(){return this.editor.getIfDataSource();},getDatasets:function getDatasets(){return this.editor.getDatasets();},onUpdateBrowseElementsParams:function onUpdateBrowseElementsParams(params){this.editor.onUpdateBrowseElementsParams(params);}},docModel:null,targetMetrics:null,_set_model:function(n,v){var ret=this._super(n,v);if(ret){var targets=this.model.targets;this.targetMetrics=$ARR.filter(targets,function(item){item.title=item.n||"";return item.t===$OBJECT_TYPE.Metric;});}return ret;},openWalk:function(data,widget,type,evt){var editor=this,off=$DOM.delta(widget.domNode,editor.containerNode);off.y+=(type==="andor"?16:parseInt(widget.domNode.offsetHeight,10));var cfg={condition:widget,zIndex:editor.zIndex+10,left:off.x+"px",top:off.y+"px"},n;switch(type){case"andor":if(editor.skipAndOrPopup){return ;}n="andOrPopupRef";break;case"createSet":case"createSetOpt":if(mstrApp&&mstrApp.isWSStyling&&evt&&evt.e&&evt.e.target){var tgt=evt&&evt.e&&evt.e.target,offset=$DOM.delta(tgt,editor.containerNode);cfg.left=offset.x+"px";cfg.top=offset.y+parseInt(tgt.offsetHeight,10)+"px";}var targets=editor.model.targets;n="createSetPopupRef";cfg.type=type;cfg.model={attrs:$ARR.filter(targets,function(item){return item.t===$ENUM_OT.ATTRIBUTE;}),metrics:$ARR.filter(targets,function(item){return item.t===$ENUM_OT.METRIC;})};if(type==="createSetOpt"){cfg.condition=widget.parent;cfg.model.childIdx=widget.childIndex();}break;case"condition":var posTitle=$DOM.position(this.titleNode);cfg=$H.copy({editor:editor,objectBrowsingEnabled:editor.objectBrowsingEnabled,showLimits:editor.showLimits,targets:editor.model.targets,targetsLastMod:editor.modelLastSet,ets:widget.tree.validExprTypes||editor.validExprTypes,condition:widget,hasPrompt:editor.model.hasPrompt,disableElementsBrowsing:editor.disableElementsBrowsing,inRelation:widget.inRelation,model:getConditionModel(data),left:posTitle.x+50+"px",top:posTitle.y+20+"px",draggable:!editor.conditionEditorNotDraggable},cfg);if(!!data.isNew){cfg.title=mstrmojo.desc(14915,"New Qualification");}else{cfg.title=mstrmojo.desc(15540,"Edit Qualification");}n="conditionEditorPopupRef";}editor.openPopup(n,cfg);},getIfDataSource:function getIfDataSource(){if(this.docModel){return this.docModel.getDataService();}return null;},onUpdateBrowseElementsParams:mstrmojo.emptyFn,getDatasets:function getDatasets(){if(this.docModel){return this.docModel.datasets;}return null;},conditionEditorNotDraggable:false});}());