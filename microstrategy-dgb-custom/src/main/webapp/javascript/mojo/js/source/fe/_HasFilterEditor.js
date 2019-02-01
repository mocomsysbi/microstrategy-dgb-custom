(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.expr","mstrmojo.Editor","mstrmojo.registry","mstrmojo.fe.FilterUtils","mstrmojo.fe.FilterEditor","mstrmojo.func");mstrmojo.requiresDescs(15544);var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,$GET_EXPR_XML=mstrmojo.fe.FilterUtils.getExprXml,$EXPR=mstrmojo.expr,$EXPR_TP=$EXPR.TP,$EXPR_STP=$EXPR.STP;mstrmojo.fe._HasFilterEditor=mstrmojo.provide("mstrmojo.fe._HasFilterEditor",{filterEditorScriptClass:"mstrmojo.fe.FilterEditor",limitMdxUnitIdsHashTable:{},getLimitMdxUnitIdsHashTable:function getLimitMdxUnitIds(model){var limitExpr=model&&model.limitExpr,nds=limitExpr&&limitExpr.nds||[],hashTb={};var helper=function(nodes){$ARR.forEach(nodes,function(node){if(node.mdxUnitId){hashTb[node.mdxUnitId]=true;}else{if(node.m&&node.m.did){hashTb[node.m.did]=true;}else{if(node.nds){helper(node.nds);}}}});};helper(nds);return hashTb;},onShowFilterEditor:function(view){var me=this,tm=this.model,ds=this.getDataService?this.getDataService():tm.getDataService(),ctrl=this._getXtabCallback?this:tm.controller,id="mfe",openedPhs={},nodeKeys=view.getNodeKeys?view.getNodeKeys():[view.k],fnExtractPlaceholders=function fnExtractPlaceholders(exprRoot,phs){var i,nds=exprRoot.nds;if(exprRoot.ph){phs[exprRoot.ph.idx]=true;}else{if(nds){for(i=0;i<nds.length;i++){fnExtractPlaceholders(nds[i],phs);}}}return phs;},fnOnSaveFilter=function fnOnSaveFilter(model){var currentLimitMdxUnitIdsHashTb=me.getLimitMdxUnitIdsHashTable(model),limitMdxUnitIdsToRemove=[];$HASH.forEach(me.limitMdxUnitIdsHashTable,function(item,key){if(!currentLimitMdxUnitIdsHashTb[key]){limitMdxUnitIdsToRemove=limitMdxUnitIdsToRemove.concat({did:key,t:4});}});ds.saveViewFilter({filterModel:model,limitExp:$GET_EXPR_XML(model.limitExpr),nodeKeys:nodeKeys,limitMdxToRemove:limitMdxUnitIdsToRemove},mstrmojo.func.wrapMethods(ctrl._getXtabCallback(view),{success:function(){var vis=view.boxContent;vis&&vis.raiseEvent&&vis.raiseEvent({name:"regenerateToolbar"});}}));},fnShowEditor=function(m){var w=id&&window.mstrmojo&&mstrmojo.all[id];if(!w){w=mstrmojo.insert({id:id,scriptClass:me.filterEditorScriptClass,onUpdateBrowseElementsParams:function(params,attribute){var mod=this.model;params.datasetID=mod.dsid;params.messageID=mod.messageID;params.templateNodeKey=view.k;}});}w.editorTitle=mstrmojo.desc(15544,"Advanced Filter Editor");w.set("vizTitle",view.title);m.targets=$ARR.filter(m.targets,function(item){switch(item.t){case $EXPR_TP.FILTER:return(item.st!==$EXPR_STP.CUSTOMGROUP);case $EXPR_TP.CONS:return item.st===$EXPR_STP.NDE;}return !item.olap;});me.limitMdxUnitIdsHashTable=me.getLimitMdxUnitIdsHashTable(m);w.set("onSave",fnOnSaveFilter);w.set("model",m);if(me.filterEditorScriptClass==="mstrmojo.vi.ui.editors.FilterEditor"){w.set("docModel",tm);}if(w.mainExpr.items.length>0){openedPhs=fnExtractPlaceholders(w.mainExpr.items[0],openedPhs);}w.open();},gvfParam={taskId:"getRWGridViewFilter",nodeKey:nodeKeys[0],rwb:tm.bs,msgID:tm.mid},gvfCb=tm.newCallback({success:function success(res){var m=mstrmojo.insert(res);fnShowEditor(m);},failure:function failure(details){mstrmojo.alert(details.code+": "+details.message);}});ds.getViewFilter(gvfParam,gvfCb);}});}());