(function(){mstrmojo.requiresCls("mstrmojo.HBox","mstrmojo.VBox","mstrmojo.Label","mstrmojo.SearchWidget","mstrmojo.List","mstrmojo.hash","mstrmojo.array","mstrmojo.ui._HasScroller","mstrmojo.condTx.CommonComponent","mstrmojo.condTx.ExpressionToken","mstrmojo.condTx.ExpressionTokenInputBox");mstrmojo.requiresDescs(513,1763,4449,6769);var $H=mstrmojo.hash,$A=mstrmojo.array,$CC=mstrmojo.condTx.CommonComponent,_AOP=$CC.ADV_OPERATION,_FON=$CC.FN_OPTNAMES,_AT=$CC.ACTION_TYPE,_NT=$CC.NODE_TYPE,$ET=mstrmojo.condTx.ExpressionToken,$DOM=mstrmojo.dom;mstrmojo.condTx.ObjectList=mstrmojo.declare(mstrmojo.List,[mstrmojo.ui._HasScroller],{scriptClass:"mstrmojo.condTx.ObjectList",setupScrollNodes:function setupScrollNodes(){this.scrollNode=this.itemsContainerNode;}});function hideAdvancedExpressionPanel(){var advExp=this.parent.parent.parent,editor=advExp.parent.parent;editor.closeAdvEditor();}function wrapTokenItems(items,listItems){$A.forEach(items,function(it){if(it.did){it.isMstrObj=true;var listItem=$A.filterOne(listItems,function(lit){return lit.did===it.did;});$H.copy(listItem,it);it.v=it.v||("("+(it.dn||it.n)+")");}else{if(it.fn){$H.copy(_AOP[_FON[it.fn]],it);it.isDelimiter=true;}else{if(it.nk&&it.fk){it.isMstrObj=true;it.v=it.v||it.n;}}}});return items;}mstrmojo.condTx.AdvancedExpression=mstrmojo.declare(mstrmojo.HBox,null,{scriptClass:"mstrmojo.condTx.AdvancedExpression",cssClass:"AdvancedExpression",alias:"AdvExp",model:null,host:null,_set_model:function(n,v){if(v){this.model=$H.make(v,mstrmojo.Obj);}return true;},children:[{scriptClass:"mstrmojo.VBox",cssClass:"left",alias:"objBox",children:[{scriptClass:"mstrmojo.Label",cssClass:"AdvancedExpression-label",text:mstrmojo.desc(513,"Available")},{scriptClass:"mstrmojo.condTx.ObjectList",alias:"objList",itemIdField:"dssid",itemField:"n",itemDisplayField:"dn",titleDisplayField:"tn",bindings:{items:"this.parent.parent.model.items"},cssClass:"AdvancedExpression-ObjList",renderOnScroll:false,itemMarkupFunction:function(data,idx,w){return'<div class="mstrmojo-suggest-text '+(data.cls||"fn")+'" idx="'+idx+'"'+(data.did<0?'did="'+data.did+'"':"")+' title="'+(data[w.titleDisplayField]||"")+'">'+((w.itemDisplayField&&data[w.itemDisplayField])||data[w.itemField])+"</div>";},ondblclick:function(evt){var hWin=evt.hWin,e=evt.e,el=mstrmojo.dom.eventTarget(hWin,e),idx=el.getAttribute("idx")||-1,textBox=this.parent.parent.ExprBox.textBox;this.set("selectedIndex",idx);var symbol=this.selectedItem;textBox.insertTokens($ET.convertTokens($H.copy(symbol,{v:symbol.n,isMstrObj:true,isDelimiter:false})));}}]},{scriptClass:"mstrmojo.VBox",cssClass:"right",alias:"ExprBox",children:[{scriptClass:"mstrmojo.Label",cssClass:"AdvancedExpression-Label",text:mstrmojo.desc(4449,"Expression")},{scriptClass:"mstrmojo.List",cssClass:"AdvancedExpression-ops",items:[$H.copy(_AOP.PLUS,{t:1,cls:"plus",isDelimiter:true}),$H.copy(_AOP.MINUS,{t:1,cls:"minus",isDelimiter:true}),$H.copy(_AOP.MULTI,{t:1,cls:"multi",isDelimiter:true}),$H.copy(_AOP.DIVIDE,{t:1,cls:"divide",isDelimiter:true}),{t:3,v:"V",cls:"clear right",n:mstrmojo.desc(1763,"Clear all")}],itemMarkupFunction:function(item,index){if(item.t===1){return'<div class="mstrmojo-item '+item.cls+'" idx='+index+' title="'+(item.n||"")+'">'+(item.n||"")+"</div>";}return'<div class="mstrmojo-Button mstrmojo-WebButton bare-button '+item.cls+"\"  onmousedown=\"this.className+=' hot'\" onmouseup=\"this.className=this.className.replace(' hot','')\" onmouseout=\"this.className+=' bare-button'\" onmouseover=\"this.className=this.className.replace(' bare-button','')\"><div class=\"mstrmojo-Button-text\" idx="+index+">"+(item.n||"")+"</div></div>";},onmouseup:function(evt){var hWin=evt.hWin,e=evt.e,el=mstrmojo.dom.eventTarget(hWin,e),idx=el.getAttribute("idx")||-1,me=this.parent,textBox=me.textBox;this.set("selectedIndex",idx);if(idx>-1){var symbol=this.selectedItem,tokens=[];if($DOM.getButton(hWin,e)===1){switch(symbol.t){case 1:tokens.push($H.clone(symbol));var lastTokenIdx=textBox.insertTokens(tokens);break;case 3:textBox.clearTokens([]);textBox.raiseChangeEvent({type:"clear"});break;}}}}},{scriptClass:"mstrmojo.condTx.ExpressionTokenInputBox",alias:"textBox",cssClass:"AdvancedExpression-textBox",bindings:{suggestionCandidates:"this.parent.parent.model.items",items:function(){var expr=this.parent.parent.model.expr,its=this.serializeExpressionTree(expr);return wrapTokenItems(its,this.parent.parent.model.items);},isVectorCase:function(){var host=this.parent.parent.host;return host.actionType===_AT.DISABLE&&host.target.nodeType===_NT.TEMPLATE_UNIT_CONTROL;}}},{scriptClass:"mstrmojo.HBox",alias:"buttonBox",cssClass:"AdvancedExpression-buttonBox",children:[{scriptClass:"mstrmojo.Button",alias:"okBtn",cssClass:"okBtn",onclick:function(){var advExpr=this.parent.parent.parent,textBox=advExpr.ExprBox.textBox,host=advExpr.host,hostModel=host.model,model=advExpr.model,expTree;try{expTree=textBox.buildExpressionTree();hostModel.edit(model.prop,expTree);textBox.clearTokens([]);hideAdvancedExpressionPanel.call(this);}catch(ex){mstrmojo.alert(ex);}}},{scriptClass:"mstrmojo.Button",alias:"cancelBtn",cssClass:"cancelBtn",onclick:function(){var advExpr=this.parent.parent.parent,textBox=advExpr.ExprBox.textBox;textBox.clearTokens([]);hideAdvancedExpressionPanel.call(this);}}]}]}]});}());