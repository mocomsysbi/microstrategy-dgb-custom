(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.Table","mstrmojo.array","mstrmojo.txEditor.CSIClausePanel","mstrmojo.txEditor.CommonComponent");var $H=mstrmojo.hash,$A=mstrmojo.array,_TC=mstrmojo.txEditor.CommonComponent,_ST=_TC.STATEMENT_TYPE,_CSIKT=_TC.CSI_KEYWORD_TYPE;mstrmojo.txEditor.CSIDeleteStatementPanel=mstrmojo.declare(mstrmojo.Table,null,{scriptClass:"mstrmojo.txEditor.CSIDeleteStatementPanel",cssClass:"mstrmojo-TransactionEditor-CSIDeleteStatementPanel",markupMethods:$H.copy({onheightChange:function(){if(this.height){this.deClause.set("height",this.height/2);}}},$H.copy(mstrmojo.Table.prototype.markupMethods)),onvisibleChange:function(){if(!this.visible){this.deClause&&this.deClause.clearInputs();}},layout:[{cells:[{}]}],children:[{scriptClass:"mstrmojo.txEditor.CSIClausePanel",slot:"0,0",alias:"deClause",labelPrefix:"Delete from",labelSuffix:"where",getPrefixItems:function(){var items=[],tgtDs=mstrmojo.all.offModel.tgtDs;items.push({v:"DELETE",tp:_CSIKT.DELETE,isMstrObj:true});items.push({v:"FROM",tp:_CSIKT.FROM,isMstrObj:true});if(tgtDs&&tgtDs.n){items.push({v:tgtDs.n,oi:{did:tgtDs.did,t:tgtDs.tp,n:tgtDs.n},isMstrObj:true});}items.push({v:"WHERE",tp:_CSIKT.WHERE,isMstrObj:true});return items;},_preprocessTokenStream:function(its){var items=[];rmBeginTps={37:true,315:true,319:true,269:true,316:true,"-1":true};$A.forEach(its,function(item){if(!rmBeginTps[item.tp]){items.push(item);}});return items;},st:_ST.STATEMENT_DELETE,bindings:{dsName:"mstrmojo.all.offModel.tgtDs.n",clause:function(){var its=mstrmojo.all.offModel.offTxs.tknstrm.clauses[0]||[];if(this.isActive()){this.clInput.set("items",this._preprocessTokenStream(its));}return its;}}}]});}());