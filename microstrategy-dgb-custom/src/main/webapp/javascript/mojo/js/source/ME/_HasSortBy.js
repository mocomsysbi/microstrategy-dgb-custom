(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.expr","mstrmojo.Button","mstrmojo.Editor","mstrmojo.ME.MetricDataService","mstrmojo.ME._MetricEditorHelper");mstrmojo.requiresDescs(12852);var E=mstrmojo.expr,ARR=mstrmojo.array,HASH=mstrmojo.hash,MEH=mstrmojo.ME._MetricEditorHelper,DYNAMIC_DIMTY=mstrmojo.ME.Enum.DYNAMIC_DIMTY,UI_DATA_TYPE=mstrmojo.ME.Enum.UI_DATA_TYPE,UI_OBJECT_TYPE=mstrmojo.ME.Enum.UI_OBJECT_TYPE,brackets=mstrmojo.ME.MetricToken.brackets;var EDITOR_ID;function setDirty(){var w=mstrmojo.all[EDITOR_ID];if(w&&w.onmetricModify){w.onmetricModify();}}function updateScrollBars(){var EDITOR=mstrmojo.all[EDITOR_ID];if(EDITOR&&EDITOR.updateScrollbars){EDITOR.updateScrollbars();}}mstrmojo.ME.SortByInputList=mstrmojo.declare(mstrmojo.WidgetList,null,{makeObservable:true,isNewDef:true,isDME:false,init:function init(props){this._super(props);mstrmojo.css.addWidgetCssClass(this,"mstrmojo-ME-sortby");},preBuildRendering:function(){var items=this.items||[];if(this.isNewDef&&this.isDME){items.push(DYNAMIC_DIMTY.getAutomaticDimtyObject());}items.push({n:""});this.items=items;if(this._super){this._super();}},getTokens:function(){var its=this.items,len=its.length-1,i,tks=[];if(len>0){tks.push({v:"SortBy"});tks.push({v:"=",isDelimiter:true});tks.push({v:"(",isDelimiter:true});for(i=0;i<len;i++){var it=its[i],sit=it.selFrm,tk,isDimty=false;if(MEH.isDimty(it.n)){tk={v:it.n};isDimty=true;}else{if(/^@/.test(it.did)){tk={v:it.did};isDimty=true;}else{tk={v:brackets(it.n),oi:it};}}if(sit&&(it.t===E.TP.ATTR||(it.t===E.TP.CONS&&it.st===E.STP.NDE))){HASH.copy({v:brackets(it.n)+"@"+brackets(sit.n),exv:sit.dssid,extp:8},tk);}tks.push(tk);if(!isDimty){if(!!it.asc){tks.push({v:"Desc",tp:259});}}if(i!==(len-1)){tks.push({v:",",isDelimiter:true});}}tks.push({v:")",isDelimiter:true});}return tks;},itemFunction:function(item,idx,w){return new mstrmojo.Box({cssClass:"mstrmojo-ME-sortby-item",alias:"sortByItem",parent:w,children:[{scriptClass:"mstrmojo.ME.ObjectInputBox",alias:"sortByInput",cssClass:"mstrmojo-ME-ObjectInputBox-sortby",emptyText:mstrmojo.desc(12179,"Search for #").replace("#",mstrmojo.desc(3377,"Object").toLowerCase()),isDME:w.isDME,dtp:UI_DATA_TYPE.Sortby,maxObjectCount:1,folderLinksContextId:16,browsableTypes:[E.TP.ATTR,E.TP.METRIC,E.TP.FOLDER].join(","),getCandidatesThroughTaskCall:function getCandidatesThroughTaskCall(params,callbacks){params.objectType=E.TP.ATTR+","+E.TP.METRIC;params.rootFolderType=39;params.blockCount=params.blockCount||this.blockCount;mstrmojo.ME.MetricDataService.getMetricComponents(params,callbacks);},obCfg:{folderLinksContextId:16,browsableTypes:[E.TP.ATTR,E.TP.METRIC,E.TP.FOLDER].join(",")},bindings:{candidates:"this.parent.parent.candidates"},postCreate:function(refresh){if(!refresh){this.set("items",item.did||item.dimty?[item]:null);}},onitemchange:function(){var selItm=this.getSelectedObjects()[0];if(!selItm||!selItm.did&&!selItm.n){return ;}item.selFrm=null;mstrmojo.hash.copy(selItm,item);var formsPulldown=this.parent.formsPulldown;if(formsPulldown){formsPulldown.updateForms(selItm);}var ascPulldown=this.parent.ascPulldown;if(ascPulldown){ascPulldown.set("visible",item.t===4||item.st===E.STP.NDE);}setDirty();},onadd:function onadd(){if(this.getSelectedObjects().length===0){return ;}if(this.parent===w.ctxtBuilder.itemWidgets[w.items.length-1]){w.add([{n:""}]);this.parent.del.set("visible",true);}},hidePulldownButton:function(){return !w.isDME;},hideDelButton:function(){return true;},hideItemWidgetBrowseButton:function(){return w.isDME;},getItemsToFilterOut:function(){return w.items;}},{scriptClass:"mstrmojo.Pulldown",alias:"formsPulldown",cssClass:"mstrmojo-ME-sortby-forms mstrmojo-ME-Pulldown",popupCssClass:"mstrmojo-ME-Pulldown-Popup",defaultSelection:-1,bindings:{visible:function(){return this.items&&this.items.length>0;}},popupToBody:true,popupZIndex:100,postCreate:function(){this.retrieveDssForms(item);},retrieveDssForms:function retrieveDssForms(oi){var me=this,retrieveAttNDEForms=function(){var setDssForms=function(dssforms){oi.dssforms=dssforms;me.set("items",oi.dssforms);me.selectedIndex=-1;me.selectedItem=null;me.value=null;me.set("value",oi.selFrm);};var candidates=me.parent.sortByInput.candidates,dsUnits=candidates&&candidates.items;if(oi.did&&dsUnits){var attIdx=ARR.find(dsUnits,"did",oi.did);if(attIdx>-1){var dfs=mstrmojo.hash.clone(dsUnits[attIdx].fs);if(dfs){ARR.forEach(dfs,function(df){df[me.itemIdField]=df.fid;df[me.itemField]=df.fnm;});setDssForms(dfs);return ;}}}var success=function(res){if(res){var ctr=res.container;if(ctr&&ctr.dssforms){oi.dssforms=ctr.dssforms;setDssForms(oi.dssforms);}}},failure=function(res){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));};mstrmojo.ME.MetricDataService.getAttributeForms({attributeID:oi.did,displayedForms:0},{success:success,failure:failure});};switch(oi.t){case E.TP.ATTR:retrieveAttNDEForms();break;case E.TP.CONS:if(oi.st===E.STP.NDE){me.set("visible",false);}break;case E.TP.METRIC:me.set("visible",false);break;case UI_OBJECT_TYPE.Dimty:me.set("visible",false);break;}},updateForms:function updateForms(oi){this.retrieveDssForms(oi);},onvalueChange:function onvalueChange(){if(this.selectedItem){item.selFrm=this.selectedItem;}if(this.hasRendered){setDirty();}}},{scriptClass:"mstrmojo.Pulldown",alias:"ascPulldown",cssClass:"mstrmojo-ME-sortby-asc mstrmojo-ME-Pulldown",popupCssClass:"mstrmojo-ME-Pulldown-Popup",items:[{n:"Ascending",v:0},{n:"Descending",v:1}],itemIdField:"v",popupToBody:true,popupZIndex:100,visible:false,bindings:{value:function(){return this.parent.parent.items[idx].asc;},visible:function(){var oi=this.parent.sortByInput.getSelectedObjects()[0];return this.parent.formsPulldown.visible&&this.parent.formsPulldown.value||oi.t===E.TP.METRIC||oi.st===E.STP.NDE;}},onvalueChange:function(evt){item.asc=this.value;if(this.hasRendered){setDirty();}}},{scriptClass:"mstrmojo.Button",alias:"del",cssClass:"mstrmojo-ACLEditor-delete",text:"&nbsp",title:mstrmojo.desc(629,"Delete"),bindings:{visible:function(){var idx=w.itemIndex(item);return this.parent.parent.items[idx].did;}},onclick:function(){w.remove(w.items[w.itemIndex(item)]);setDirty();}}]});},onadd:function onadd(){updateScrollBars();},onremove:function onremove(){updateScrollBars();}});mstrmojo.ME._HasSortBy=mstrmojo.provide("mstrmojo.ME._HasSortBy",{_mixinName:"mstrmojo.ME._HasSortBy",ios:false,oniosChange:function oniosChange(evt){this.sortByContainer.set("visible",evt.value);},onOpen:function(){if(this._super){this._super();}EDITOR_ID=this.id;var tks=this.oi.tks,isNewDef=!tks.met;var list=this.sortByContainer&&this.sortByContainer.sortByWidgetList;if(list){list.set("isNewDef",isNewDef);list.set("isDME",this.isDME);list.set("candidates",this.getCandidates4Sortby());list.set("items",this.getSortByDefFromTokens().items||[]);}},getCandidates4Sortby:function getCandidates4Sortby(){var cs=this.candidates,its;if(cs&&!this.noCache){its=ARR.filter(cs.items,function(item){return item.t===E.TP.ATTR||item.t===E.TP.METRIC||item.st===E.STP.NDE;});if(this.isDME){its=DYNAMIC_DIMTY.getItems("sortby").concat(its);}}return{items:its||[],isComplete:cs&&cs.isComplete};},getSortByWidget:function getSortByWidget(showLabel){var me=this,children=[{scriptClass:"mstrmojo.ME.SortByInputList",alias:"sortByWidgetList",cssClass:"sortBy mstrmojo-ME-sortby",cssDisplay:"table-cell"}],label={scriptClass:"mstrmojo.Label",alias:"sortByLabel",cssClass:"mstrmojo-ME-SortBy-label",cssDisplay:"table-cell",text:mstrmojo.desc(12852,"Sort By")};if(showLabel){children.unshift(label);}return{scriptClass:"mstrmojo.Box",alias:"sortByContainer",cssClass:"mstrmojo-ME-SortBy-Container",cssDisplay:"table-row",visible:me.ios,postCreate:function(){me.sortByContainer=this;this.editor=me;},getTokens:function(){return this.sortByWidgetList.getTokens();},children:children};},getSortByDefFromTokens:function getSortByDefFromTokens(){var tks=this.oi.tks.items,len=tks.length,tk,tp,sctt,i,sb={};for(i=0;i<len;i++){tk=tks[i];tp=tk.tp;sctt=tk.sctt;if(mstrmojo.ME.MetricToken.isDelimiter(tk.v)&&(tk.v!=="("&&tk.v!==")")||tk.v==="&gt;"||tk.v==="&lt;"){continue;}switch(sctt){case 131072:if(tp===302){tk=tks[++i];while(tk){if(tk.tp!==282){if(tk.oi){tk.oi.selFrm=tk.exv;var tkOrder=tks[i+1];if(tkOrder.v==="Desc"&&tkOrder.tp===259){tk.oi.asc=1;i++;}sb.items=sb.items||[];sb.items.push(tk.oi);}else{if(tk.tp===64){sb.items=sb.items||[];var dimtyCode=tk.v+tks[++i].v;tk=tks[i+1];if(tk.tp===43||tk.tp===45){dimtyCode+=tks[++i].v;dimtyCode+=tks[++i].v;}sb.items.push(DYNAMIC_DIMTY.getDimtyObject(dimtyCode,this.isDME));}}}if((tk=tks[++i])["v"]===")"){break;}}}}}return sb;},getSortByDefAsTokens:function getSortByDefAsTokens(){return this.sortByContainer.getTokens();}});}());