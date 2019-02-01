(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.dom","mstrmojo.css","mstrmojo.Editor","mstrmojo.tooltip","mstrmojo.SearchWidget","mstrmojo.ME._MetricEditorHelper","mstrmojo.ME.BandingDAEditor","mstrmojo.ME.Enum","mstrmojo.ME.FunctionInfo");mstrmojo.requiresDescs(13141,9590,4561,9591,3273,9592,9579,9593,3324,9594,11656,11657,4565,9595,9925,1088,13141,9563,9597,221);var $H=mstrmojo.hash,DOM=mstrmojo.dom,CSS=mstrmojo.css,SHORTCUT_FUNCTIONS=mstrmojo.ME.Enum.SHORTCUT_FUNCTIONS;var _SI={n:mstrmojo.desc(9590,"Search Result"),did:-1,fns:[]},_ALL={n:mstrmojo.desc(4561,"All Functions"),did:-2,fns:[]},_TEMPLATES={n:mstrmojo.desc(9591,"Metric Templates"),did:-3,fns:[{n:mstrmojo.desc(3273,"Level"),did:SHORTCUT_FUNCTIONS.Level,desc:mstrmojo.desc(9592,"Create a level metric."),h:"standard_functions_Level"},{n:mstrmojo.desc(9579,"Condition"),did:SHORTCUT_FUNCTIONS.Condition,desc:mstrmojo.desc(9593,"Create a conditional metric."),h:"standard_functions_condition"},{n:mstrmojo.desc(3324,"Transformation"),did:SHORTCUT_FUNCTIONS.Transformation,desc:mstrmojo.desc(9594,"Create a transformation metric."),h:"standard_functions_transformation"},{n:mstrmojo.desc(11656,"Row Count"),desc:mstrmojo.desc(11657,"Row Count calculates the total number of rows in the dataset."),did:SHORTCUT_FUNCTIONS.Row_Count,tks:{items:[{v:"Count",tp:280,oi:{n:"Count",did:"8107C31CDD9911D3B98100C04F2233EA",t:11,st:2816}},{v:"<",tp:60},{v:"Null",tp:259},{v:"=",tp:282},{v:"True",tp:299},{v:",",tp:44},{v:"UseLookupForAttributes",tp:259},{v:"=",tp:282},{v:"False",tp:300},{v:">",tp:62},{v:"(",tp:40},{v:'"*"',tp:261},{v:")",tp:41},{v:"{",tp:123},{v:"~",tp:126},{v:"}",tp:125}]}}]},_SC={n:mstrmojo.desc(4565,"Select a category:"),did:-4,fns:[]},_openWizard=function(w,opener){var fl=w.functionList;w.openWizard(fl.items[fl.selectedIndex],opener);},newMetricDef=function(){return mstrmojo.hash.copy(mstrmojo.ME.ENUM.NEW_METRIC_DEFINITION);};var toggleTooltipCssClass=function(add){var tipCssClass="mstrmojo-ME-fct-tip",tdn=this.tooltip&&this.tooltip.domNode;if(tdn){CSS.toggleClass(tdn,tipCssClass,add);}};mstrmojo.ME.FunctionSelector=mstrmojo.declare(mstrmojo.Editor,[],{scriptClass:"mstrmojo.ME.FunctionSelector",title:mstrmojo.desc(9595,"Select a function or template"),help:"Select_a_Function_dialog_box.htm",isDME:false,functions:null,includeFakeFuncs:true,functionItems:null,selectedCategory:1,selectedIndex:-1,init:function init(props){this._super(props);CSS.addWidgetCssClass(this,"mstrmojo-FunctionSelector");},getFunctionSyntax:function getFunctionSyntax(sc,si){var fcts=this.functionItems;if(!fcts){return"";}var f=fcts[sc].fns[si];if(f.did<0){return f.n;}var pars=f.pars,pros=f.pros,sa=[],i,len;sa.push(f.n);pros=mstrmojo.hash.clone(pros)||[];if(f.ios){pros.push({n:"SortBy"});}if(f.sqt===5){pros.push({n:"BreakBy"});}if(this.showFullSyntax){if(pros.length>0){sa.push("<");for(i=0,len=pros.length;i<len;i++){sa.push(pros[i].n);sa.push(", ");}sa.pop();sa.push(">");}}sa.push("(");for(i=0,len=pars.length;i<len;i++){sa.push(pars[i].n);if(i!==(len-1)){sa.push(", ");}}sa.push(")");return sa.join("");},getFunctionDesc:function getFunctionDesc(sc,si){var fcts=this.functionItems;if(!fcts){return"";}var f=fcts[sc].fns[si];return mstrmojo.ME.FunctionInfo.getDescAndExample(f).desc;},getFunctionHelpTopic:function getFunctionHelpTopic(sc,si){var fcts=this.functionItems;if(!fcts){return"";}var f=fcts[sc].fns[si];if(f.did===SHORTCUT_FUNCTIONS.Row_Count){return"";}return mstrmojo.ME.MetricDataService.getFunctionHelpTopic(f.h);},getMetricDefAsTokens:function getMetricDefAsTokens(){return this.getTokens();},getTokens:function getTokens(){var fl=this.functionList,fctOi=fl.items[fl.selectedIndex],tks=[];if(fctOi){if(fctOi.did<-1){switch(fctOi.did){case -7:tks=fctOi.tks.items;break;case -4:case -5:case -6:break;}}else{tks.push({v:fctOi.n,oi:fctOi,isNew:true});}}return tks;},onfunctionsChange:function postBuildRendering(){if(!this.functions){return ;}this.selectedCategory=0;this.set("selectedCategory",1);this.set("selectedIndex",-1);var fcts=mstrmojo.hash.clone(this.functions),len=fcts.length;if(!fcts.add){fcts=$H.make(fcts,mstrmojo.Arr);}if(len>=1&&this.includeFakeFuncs){var fct=fcts[mstrmojo.ME.MetricDataService.getBasicCategoryIndex(fcts)];fct.fns.push(_TEMPLATES.fns[0]);if(!this.isDME){fct.fns.push(_TEMPLATES.fns[1]);fct.fns.push(_TEMPLATES.fns[2]);}else{fct.fns.push(_TEMPLATES.fns[3]);}}this.set("functionItems",fcts);},onPreClose:function onPreClose(){this.cleanup();return true;},cleanup:function cleanup(){this.searchWidget.clearSearch();this.set("selectedIndex",-1);},handleCloseAction:function handleCloseAction(){this.close();},clearSearchResult:function clearSearchResult(reset){var fcp=this.fcHBox.fcPulldown,fcts=this.functionItems,li=fcts.length-1;if(li>-1&&fcts[li]===_SI){if(this.selectedCategory===li){if(reset!==false){this.set("selectedCategory",1);this.set("selectedIndex",-1);}}fcts.remove(li);fcp.refresh();}},clearSearchPattern:function clearSearchPattern(){var sw=this.searchWidget;if(sw&&sw.hasRendered){sw.reset();this.clearSearchResult(false);}},openWizard:function openWizard(item,opener){var me=this,cfg;if(mstrmojo.ME.MetricDataService.isBasicAggMap(item.did)||item.did<-1){cfg={zIndex:me.zIndex+10,did:item.did,oi:newMetricDef};cfg.insertMode=false;cfg.id="mstrSME";}else{cfg={functions:mstrmojo.ME.MetricDataService.getFunctionCatList(),fctOi:item,zIndex:me.zIndex+10,oi:newMetricDef};cfg.id="mstrFE";}cfg.insertMode=this.insertMode;if(cfg.insertMode){cfg.insertOnFinish=this.insertOnFinish;}me.switch2Editor(cfg.id,cfg);},handleSelectedFunction:function(isDblClick){_openWizard(this);},onshowFullSyntaxChange:function onshowFullSyntaxChange(){this.functionList.onchange();},children:[{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-FunctionSelector-label",text:mstrmojo.desc(9925,"Functions")},{scriptClass:"mstrmojo.SearchWidget",alias:"searchWidget",cssClass:"mstrmojo-FunctionSelector-search",width:"65px",quickSearch:true,placeholderText:"",onsearch:function(t){var p=this.parent,fcp=p.fcHBox.fcPulldown,fcts=p.functionItems,itemDisplayField=p.functionList.itemDisplayField,filteredItems=[],filter=function(item){var itemCopy=mstrmojo.hash.copy(item),itemName=itemCopy.n,filterRegExp;try{filterRegExp=new RegExp(t,"ig");}catch(e){filterRegExp=new RegExp(mstrmojo.string.regEscape(t),"ig");}if(filterRegExp.test(itemName)){itemCopy[itemDisplayField]=itemName.replace(filterRegExp,function(match){return"<em>"+mstrmojo.string.encodeHtmlString(match)+"</em>";});filteredItems.push(itemCopy);}},i,len;for(i=0,len=fcts.length;i<len;i++){if(fcts[i]===_SI||fcts[i].did===_ALL.did){continue;}if(t){mstrmojo.array.forEach(fcts[i].fns,filter);}}_SI.fns=filteredItems;if(fcts[fcts.length-1]!==_SI){fcts.add([_SI]);}fcp.refresh();p.selectedCategory=0;p.set("selectedCategory",fcts.length-1);p.set("selectedIndex",-1);},onclear:function(t){if(t){this.parent.clearSearchResult();}}},{scriptClass:"mstrmojo.HBox",alias:"fcHBox",cssClass:"mstrmojo-FunctionSelector-fctBox",children:[{scriptClass:"mstrmojo.Pulldown",cssClass:"mstrmojo-ME-Pulldown",popupCssClass:"mstrmojo-ME-Pulldown-Popup",alias:"fcPulldown",itemIdField:"did",itemField:"n",items:[],bindings:{items:function(){var fncts=this.parent.parent.functionItems,allFncts=[];if(!fncts){return fncts;}allFncts=mstrmojo.ME.MetricDataService.sortFunctions(fncts);if(fncts[0].did!==_ALL.did){var allObj=_ALL;allObj.fns=allFncts;fncts.unshift(allObj);}return fncts;},selectedIndex:"this.parent.parent.selectedCategory",value:function(){var sc=this.parent.parent.selectedCategory;return this.items[sc][this.itemIdField];}},onvalueChange:function(evt){var fe=this.parent.parent;fe.set("selectedCategory",this.selectedIndex);fe.set("selectedIndex",-1);if(evt.valueWas===_SI.did&&this.selectedItem.did!==_SI.did){this.parent.parent.clearSearchPattern();}}}]},{scriptClass:"mstrmojo.ME.FunctionList",alias:"functionList",itemIdField:"dssid",itemField:"n",itemDisplayField:"dn",items:[{n:"",cls:"wait"}],cssClass:"mstrmojo-FE-functionList mstrmojo-suggest-list",renderOnScroll:false,itemMarkupFunction:function(data,idx,w){var cls="mstrmojo-Button mstrmojo-Editor-button mstrmojo-WebButton tbFunction";if(!mstrApp.isWSStyling){cls+=" hot";}return'<div class="mstrmojo-suggest-text '+(data.cls||"fn")+'" idx="'+idx+'"'+(data.did<0?'did="'+data.did+'"':"")+" onmouseover=\"mstrmojo.all['"+w.id+"'].onmouseover(this, event)\" onmouseout=\"mstrmojo.all['"+w.id+"'].onmouseout(this, event)\">"+((w.itemDisplayField&&data[w.itemDisplayField])||data[w.itemField])+'<div class="'+cls+'" t="edt"><div class="mstrmojo-Button-text" t="edt">'+mstrmojo.desc(1088,"Edit")+"</div></div></div>";},bindings:{items:function(){var fcts=this.parent.functionItems,sc=this.parent.selectedCategory;return(fcts&&fcts[sc].fns)||this.items;},selectedIndex:"this.parent.selectedIndex"},buffer:"",onkeypress:function(evt){var me=this,e=evt.e,k=e.keyCode||e.charCode,KEYS=mstrmojo.Enum_Keys,getCharacter=function(e){var k=(DOM.isIE&&!DOM.isIE9)?e.keyCode:e.charCode;return(k>0)?String.fromCharCode(k):"";},items=this.items,len=items.length,selIdx=this.selectedIndex,scrollIntoView=function(idx){me.scrollTo(idx);};switch(k){case KEYS.UP_ARROW:this.set("selectedIndex",(selIdx+len-1)%len);break;case KEYS.DOWN_ARROW:this.set("selectedIndex",(selIdx+1)%len);break;default:var buffer=(this.buffer+=getCharacter(e));if(len>0&&buffer.length>0){mstrmojo.array.forEach(items,function(itm,idx,arr){var regex=new RegExp("^"+buffer,"i");if(regex.test(itm[me.itemField])){if(idx>-1){this.selectedIndex=-1;this.set("selectedIndex",idx);}return false;}},this);}}if(this.selectedIndex>-1){scrollIntoView(this.selectedIndex);}window.clearTimeout(this.tmr);this.tmr=window.setTimeout(function(){me.buffer="";},300);mstrmojo.dom.stopPropogation(evt.hWin,e);return false;},onkeyup:function(evt){this.onkeypress(evt);},onchange:function(evt){var editor=this.parent;if(this.selectedIndex!==editor.selectedIndex){editor.set("selectedIndex",this.selectedIndex);}var sc=editor.selectedCategory,si=editor.selectedIndex,valid=sc>-1&&si>-1;editor.set("funcSyntax",valid?editor.getFunctionSyntax(sc,si):"");editor.set("funcDesc",valid?editor.getFunctionDesc(sc,si)+"  "+editor.getFunctionHelpTopic(sc,si):"");if(this.changeByMouse){if(editor.selectedCategory>-1&&editor.selectedIndex>-1){editor.handleSelectedFunction(false);}this.changeByMouse=false;}},onmouseup:function(evt){var tgt=evt.getTarget(),t=tgt.getAttribute("t");if(t==="edt"){mstrmojo.dom.stopPropogation(evt.hWin,evt.e);mstrmojo.dom.preventDefault(evt.hWin,evt.e);this.openFunctionEditor();return false;}},openFunctionEditor:function(){var ide=this.parent.parent.parent,tib=ide.getTokenInputBox(),cfg={zIndex:ide.zIndex+1,insertMode:true,oi:mstrmojo.ME.ENUM.getNewDefinition(),insertOnFinish:function(tks){tib.insertTokens(tks);}},item=this.parent.functionList.selectedItem;if(ide.isBanding&&ide.isBanding(item.did)){cfg={zIndex:ide.zIndex+1,insertMode:true,fctOi:item,id:"mstrBDAE_1",oi:mstrmojo.ME.BandingDAEditor.getNewDefinition(),ide:ide};}else{if(mstrmojo.ME.MetricDataService.isBasicAggMap(item.did)||item.did<-1){cfg.candidates=tib.candidates;cfg.did=item.did;cfg.id="mstrSME_1";cfg.useGUIDefault=true;}else{cfg.fctOi=item;cfg.id="mstrFE_1";cfg.paramItemsPath=ide.feParamItemsPath;}}cfg.modal=true;ide.getModalEditor(cfg).open(ide);},ondblclick:function(evt){var itemNode=this.getItemNodeFromTarget(evt.getTarget());if(itemNode){var editor=this.parent;if(editor.selectedCategory>-1&&editor.selectedIndex>-1){editor.handleSelectedFunction(true);}}},useRichTooltip:false,onmouseover:function(el,e){var me=this,p=this.parent,sc=p.selectedCategory,si=el.getAttribute("idx"),tgt=DOM.eventTarget(window,e),insideEditBtn=tgt.getAttribute("t")==="edt";if((!isNaN(si)&&si>-1)||insideEditBtn){window.clearTimeout(me.hideTmr);var content='<dl class="fct-info"><dt class="fct-syntax">'+p.getFunctionSyntax(sc,si)+'</dt><dd class="fct-desc">'+(p.getFunctionDesc(sc,si)+"  "+p.getFunctionHelpTopic(sc,si))+"</dd></dl>";var pos=mstrmojo.dom.position(el,true),getTootipCfg=function(){var threshold=(me.tooltip&&me.tooltip.domNode.offsetWidth+15)||200,x=pos.x,y=pos.y-el.offsetHeight/2,arrow_css=x<threshold?"left":"right",posType=x<threshold?mstrmojo.tooltip.POS_TOPLEFT:mstrmojo.tooltip.POS_TOPRIGHT;x=x<threshold?pos.x+pos.w+8:x-10;return{arrow_css:arrow_css,contentNodeCssClass:"me-tooltip-content "+arrow_css,posType:posType,left:x,top:y};},cfg=getTootipCfg(),hidden_css="hidden";me.richTooltip=insideEditBtn?me.getEditBtnTooltip(tgt,si,cfg):{cssClass:hidden_css,contentNodeCssClass:"me-tooltip-content "+cfg.arrow_css,posType:cfg.posType,left:cfg.left,top:cfg.top,content:content,areaId:si};me.useRichTooltip=true;me.hasOpenTooltip=false;me.showTooltip();window.clearInterval(me.posTmr);var interval_cnt=0;if(!me.posTmr){me.posTmr=window.setInterval(function(){if(me.tooltip){var domNode=me.tooltip.domNode,cnNode=domNode.childNodes[1].firstChild,posTypeWas=cfg.posType;cfg=getTootipCfg();if(cfg.posType!==posTypeWas){domNode.style.left=cfg.left+"px";CSS.addClass(cnNode,[cfg.arrow_css]);}window.setTimeout(function(){CSS.removeClass(domNode,hidden_css);},10);window.clearInterval(me.posTmr);delete me.posTmr;}else{if(interval_cnt++>10){window.clearInterval(me.posTmr);}}},200);}toggleTooltipCssClass.call(this,!insideEditBtn);}},getEditBtnTooltip:function(refNode,refNodeIdx,cfg){if(cfg){return{posType:mstrmojo.tooltip.POS_TOPLEFT,content:mstrmojo.desc(13141,"Edit function parameters"),top:cfg.top+50,left:cfg.left+200,cssClass:"vi-regular vi-tooltip-A"};}return{posType:mstrmojo.tooltip.POS_TOPRIGHT,contentNodeCssClass:"me-tooltip-content regular up tbFunction",top:28,left:67,refNode:refNode,content:mstrmojo.desc(13141,"Edit function parameters"),areaId:refNodeIdx};},onmouseout:function(){var me=this;this.hideTmr=window.setTimeout(function(){toggleTooltipCssClass.call(me);me.hideTooltip();me.useRichTooltip=false;},500);}},$H.copy({slot:"buttonNode",cssText:"text-align: center; float:left;",text:mstrmojo.desc(9563,"Switch to Formula Editor"),title:mstrmojo.desc(9597,"Build a metric formula using metrics, facts, attributes and functions."),closeAfterSwitch:false,getEditor:function(){return this.parent;},postclick:function(){this.getEditor().buttonNode.style.visibility="hidden";},bindings:{visible:function(){return !this.parent.insertMode;}}},$H.copy(mstrmojo.ME._MetricEditorHelper.switchRef)),{scriptClass:"mstrmojo.HBox",alias:"buttonBar",slot:"buttonNode",cssClass:"mstrmojo-ME-buttonBox",cellCssClass:"subBox",children:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-Editor-button mstrmojo-WebButton",text:mstrmojo.desc(221,"Cancel"),onclick:function(){this.parent.parent.handleCloseAction();}}]}]});}());(function(){mstrmojo.requiresCls("mstrmojo.List","mstrmojo.ui._HasScroller");var DOM=mstrmojo.dom;mstrmojo.ME.FunctionList=mstrmojo.declare(mstrmojo.List,[mstrmojo.ui._HasScroller],{scriptClass:"mstrmojo.ME.FunctionList",setupScrollNodes:function setupScrollNodes(){this.scrollNode=this.itemsContainerNode;this.scrollNode.style.height=this.scrollboxNode.offsetHeight+"px";this.scrollboxNode=this.itemsContainerNode;},getItemNodeFromTarget:function getItemNodeFromTarget(target){var node=mstrmojo.dom.findAncestorByAttr(target,"idx",true,this.domNode);return(node&&node.node)||null;},premousedown:function premousedown(evt){this.changeByMouse=false;if(DOM.isPrimaryMouseBtn(evt.e)){var itemNode=this.getItemNodeFromTarget(evt.getTarget()),idx=itemNode&&parseInt(itemNode.getAttribute("idx"),10);if(idx!==null&&!isNaN(idx)&&idx!==this.selectedIndex){this.domNode.tabIndex=0;this.domNode.focus();this.changeByMouse=true;}this._super(evt);}},getDragData:function getDragData(context){return{item:this._super(context)};},premouseup:function premouseup(evt){if(DOM.getButton(evt.hWin,evt.e)===DOM.MOUSE_BUTTON.LEFT){this._super(evt);return true;}mstrmojo.dom.stopPropogation(evt.hWin,evt.e);mstrmojo.dom.preventDefault(evt.hWin,evt.e);return false;}});}());