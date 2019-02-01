(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.css","mstrmojo._HasPopup","mstrmojo.Popup","mstrmojo.hash","mstrmojo.expr","mstrmojo.Container","mstrmojo.ConditionModel","mstrmojo.Widget","mstrmojo.Button","mstrmojo.ui.ColumnWalk","mstrmojo.rw.ConditionWalk","mstrmojo.mstr.EnumNodeDimty","mstrmojo.vi.ui.ConditionWalkProvider","mstrmojo.vi.ui.AllObjectsBrowser");var WIDGET=mstrmojo.Widget,$ARR=mstrmojo.array,$DOM=mstrmojo.dom,$HASH=mstrmojo.hash,$CSS=mstrmojo.css,$NWB=mstrmojo.Button.newWebButton,EXPR=mstrmojo.expr,EXPRTYPE=EXPR.ET,DMT=mstrmojo.mstr.EnumNodeDimty,DEFAULT_DIMTY_TYPES=$ARR.hash([DMT.NodeDimtyOutputLevel]);var getAttForms=mstrmojo.rw.ConditionWalk.getAttForms,isMdxDM=mstrmojo.rw.ConditionWalk.isMdxDM;function attachModel(){var model=this.model;if(model){if(!model.attachEventListener){$HASH.make(model,mstrmojo.ConditionModel,{defaultETAttr:model.defaultETAttr,data:model.data});}model.attachEventListener("edit",this.id,"onmodeledit");}}function detachModel(me,m){if(m&&m.detachEventListener){m.detachEventListener("edit",me.id,"onmodeledit");}}mstrmojo.vi.ui.ConditionWalk=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasPopup],{scriptClass:"mstrmojo.vi.ui.ConditionWalk",markupString:'<div id="{@id}" class="mstrmojo-vi-ui-ConditionWalk" mstrAttach:click><div class="walk"></div></div>',markupSlots:{walkNode:function(){return this.domNode.firstChild;}},markupMethods:{onvisibleChange:WIDGET.visibleMarkupMethod,onheightChange:WIDGET.heightMarkupMethod,onwidthChange:WIDGET.widthMarkupMethod},layoutConfig:{h:{walkNode:"100%"},xt:true},editor:undefined,columnWalk:undefined,walkProvider:null,objectBrowsingEnabled:false,children:[{scriptClass:"mstrmojo.ui.ColumnWalk",alias:"columnWalk",slot:"walkNode",height:"370px",width:"600px"}],postCreate:function postCreate(){if(this._super){this._super();}if(!this.walkProvider){this.walkProvider=this.addDisposable(mstrmojo.insert(mstrmojo.vi.ui.ConditionWalkProvider));}},initWalk:function initWalk(){var columnWalk=this.columnWalk,walkProvider=this.walkProvider;columnWalk.removeTrailingContainer(-1);columnWalk.addNextColumn(walkProvider.getTargetNodeProps());columnWalk.target.updateColumnContainer();this.updateOkBtn();},ob:{scriptClass:"mstrmojo.Popup",cssClass:"mstrmojo-vi-ui-ConditionWalk ObjectBrowserPopup mojo-theme-light",children:[{scriptClass:"mstrmojo.vi.ui.AllObjectsBrowser",alias:"browser",title:mstrmojo.desc(5298,"Select an Object"),layoutConfig:null,onSelectedItemsChange:function onSelectedItemsChange(){var items=this.getSelectedItems(),item=items&&items[0],itemType=item&&item.t;this.parent.buttons.selectBtn.set("enabled",itemType&&itemType!==EXPR.TP.FOLDER);},browse:function browse(config){$HASH.copy(config,this);},getObjectSubTypes:function(){var browsableTypes=this.browsableTypes;if(browsableTypes){return browsableTypes.split(",");}return this.constructor.prototype.browsableTypes();},dblClickOnNodes:function dblClickOnNodes(evt){var callback=this.onSelectCB,target=evt.getTarget(),item=$DOM.findWidget(target).data;callback[0][callback[1]](item);}},{scriptClass:"mstrmojo.Box",alias:"buttons",cssClass:"buttons",children:[$NWB(mstrmojo.desc(221,"Cancel"),function(){this.parent.parent.opener.closePopup();}),$NWB(mstrmojo.desc(547,"Select"),function(){var ob=this.parent.parent,browser=ob.browser,callback=browser.onSelectCB,items=browser.getSelectedItems(),conditionWalk=this.parent.parent.opener;if(items&&items.length>0){callback[0][callback[1]](items[0]);}else{conditionWalk.closePopup();}},true,{alias:"selectBtn",enabled:false})]}],onOpen:function onOpen(){var curtainNode=this.shadowNode,body=document.body,docElement=document.documentElement,cs=curtainNode.style,domNode=this.domNode;this.browser.obSearchBox.clearSearch(true);cs.width=Math.max(body.clientWidth,docElement.scrollWidth)+"px";cs.height=Math.max(body.clientHeight,docElement.scrollHeight)+"px";window.setTimeout(function(){$CSS.addClass(domNode,"open");},1);},onClose:function onClose(){$CSS.removeClass(this.domNode,"open");var browser=this.browser;browser.opened=false;browser.reset();}},_set_model:function _set_model(n,v){var vWas=this.model,chg=(v!==vWas);if(chg){detachModel.call(this,vWas);v.dimtyTypes=this.dimtyTypes||DEFAULT_DIMTY_TYPES;this.model=v;attachModel.call(this,v);this.initWalk();}return chg;},onmodeledit:function onmodeledit(evt){var columnToUpdate=this.columnWalk[evt.prop==="c1"?"c0":evt.prop];if(evt.prop==="fm"){columnToUpdate=this.columnWalk.target;}if(columnToUpdate){columnToUpdate.updateColumnContainer();}this.updateOkBtn();this.postmodeledit(evt);},postmodeledit:mstrmojo.emptyFn,updateOkBtn:function updateOkBtn(){var valid=true,model=this.model,i,count=model&&EXPR.fnCstCount(model.fn,model.fnt);if(!model){return ;}switch(model.et){case EXPRTYPE.AQ:case EXPRTYPE.AL:case EXPRTYPE.MQ:for(i=0;i<count;i++){valid=valid&&!this["invalid"+i];}break;}valid=valid&&!!model.completed;this.delegateUpdateOkBtn(valid);},delegateUpdateOkBtn:mstrmojo.emptyFn,browse:function bws(childWidget){var prn=this.parent.editorNode,pos=function(el,pr){var pl=$DOM.position(el,true),pt=$DOM.position(pr,true);return{x:pl.x+pl.w,y:pt.y};},columnWalk=this.columnWalk,walkProvider=this.walkProvider;switch(childWidget&&childWidget.alias){case"target":case"dmy":walkProvider.browseObjs(this,childWidget);break;case"c0":case"c1":walkProvider.browseObjs(this,childWidget);break;case"es":walkProvider.browseEs(this,childWidget,pos(columnWalk.es.domNode,prn));break;}},onOBSelect:function(item){var itemType=item.t;if(itemType===EXPR.TP.FOLDER||itemType===0||itemType===undefined){return ;}var ob=this.ob.browser,op=ob.target;this.closePopup();if(op.alias==="c0"){op=op.attMxPd;}var targets=this.targets,f=op.itemIdField,ts=targets||[],idx=$ARR.find(targets,f,item[f]);if(idx===-1){ts.push(item);this.targets=ts;this.targetsLastMod=new Date();this.raiseEvent({name:"updateTargets",targets:this.targets});}op.list.set("selectedIndex",$ARR.find(op.items,"did",item.did));if(op.onObjBrowsed){op.onObjBrowsed(item);}},getDatasets:mstrmojo.emptyFn,getAttributeForms:function getAttributeForms(did){var editor=this.editor;if(editor&&editor.getAttributeForms){return editor.getAttributeForms(did);}var datasets=this.getDatasets();return getAttForms(did,datasets);},getAttributeInfo:function getAttributeInfo(objectId){var objectInfo,editor=this.editor;if(editor&&editor.model&&editor.model.targets){$ARR.forEach(editor.model.targets,function(att){if(att.did===objectId){objectInfo=$HASH.clone(att);return false;}});}else{var datasets=this.getDatasets();$HASH.forEach(datasets,function(dataset){objectInfo=$HASH.clone(dataset.att.filter(function(att){return att.did===objectId;})[0]);if(objectInfo){return false;}});}if(objectInfo){objectInfo.fs=this.getAttributeForms(objectId);}return objectInfo?objectInfo:{};},isMDXDM:function isMDXDM(did){return isMdxDM(did,this.getDatasets());},getIfDataSource:mstrmojo.emptyFn,onUpdateBrowseElementsParams:mstrmojo.emptyFn});}());