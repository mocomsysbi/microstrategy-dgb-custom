(function(){mstrmojo.requiresCls("mstrmojo.warehouse.TableTree","mstrmojo.architect.ui.NameEditor","mstrmojo.array","mstrmojo.dom");mstrmojo.requiresDescs(9142,773,9143);var $A=mstrmojo.array,$D=mstrmojo.dom,$DND=mstrmojo.dnd,MENU_ITEMS_CONFIG=[{did:"Delete",n:"Delete"},{did:"Rename",n:"Rename"},{did:"Automap",n:"AutoMapping"},{did:"UpStruct",n:"Update Structure"},{did:"AddAttr",n:"Add as Attribute"},{did:"AddFact",n:"Add as Metric"},{did:"-1",n:"-"},{did:"CreateAL",n:"Create Alias"},{did:"PSource",n:"Primary Source",fns:[{did:"",n:"1"}],onContextMenuOpen:function(){var row=this.wgt;if(row){var d=row.data,pdbrs=[d.pdbr].concat(d.secdbrs);if(this._subMenu){var sm=this._subMenu;sm.set("items",pdbrs);}}}},{did:"2Source",n:"Secondary Source",fns:[{did:"1",n:"1"}],onContextMenuOpen:function(){var row=this.wgt;if(row){var sdbrs=row.data.secdbrs;if(this._subMenu){var sm=this._subMenu;sm.set("items",sdbrs);}}}},{did:"-1",n:"-"},{did:"sample",n:"Sample Data"}];function findTable(tree,tid){var i,j,len=tree.items.length;for(i=0;i<len;i++){var ts=tree.items[i].items,treeItemsLength=ts.length;for(j=0;j<treeItemsLength;j++){var t=ts[j];if(tid===t.did){return{w:tree.ctxtBuilder.itemWidgets[i].ctxtBuilder.itemWidgets[j],it:t};}}}}function remove(w){var p=w.parent,its=p.items,d=w.data,dbr=d.t===29,idx=mstrmojo.array.find(its,dbr?"prid":"did",dbr?d.prid:d.did);its.splice(idx,1);if(its.length===0&&!dbr){remove(p);}else{p.render();}}function openCxtMenu(domSrc,wgt){var id="mstr-arch-tableCM",e=mstrmojo.all[id];if(!e){e=new mstrmojo.MenuButton({id:id,cmCssClass:"mstrmojo-CXM",zIndex:999,cm:MENU_ITEMS_CONFIG,domSrc:domSrc,data:wgt.data,wgt:wgt,dynamicUpdate:true,getMenuPosition:function getMenuPosition(){var pos=mstrmojo.dom.position(this.domSrc,true);return{x:Math.round(pos.x),y:Math.round(pos.y+pos.h)};},queryChecked:function queryChecked(item){if(this.data.pdbr){return item.did===this.data.pdbr.did;}},queryVisible:function(item){var d=this.data;switch(item.did){case"Delete":case"Rename":case"Automap":case"UpStruct":case"CreateAL":case"PSource":case"2Source":case"sample":return d.t===15;case"AddAttr":case"AddFact":return d.t===26;default:return true;}},executeCommand:function(item){var model=mstrmojo.all.ArchModel,row=this.wgt;this.cssText="position:relative;visibility:hidden;";this.render();switch(item.did){case"Delete":var cb={success:function(res){remove(row);var model=mstrmojo.all.ArchModel,d=row.data,pdbr=d.pdbr,dbts=model.dbtbls;if(dbts[pdbr.did]){dbts[pdbr.did][pdbr.dbt.did]=pdbr.dbt;}}};model.deleteObject(15,row.data.did,cb);break;case"Automap":model.autoRecog(row.data.did);break;case"AddAttr":mstrApp.getRootController().createAttribute(row.data,row.parent.data.did);break;case"AddFact":mstrApp.getRootController().createFact(row.data,row.parent.data.did);break;case"Rename":var _tnEditor=new mstrmojo.architect.ui.NameEditor({title:"Rename Project Table",onOpen:function(){if(this.txtbox.domNode){this.txtbox.value=row.text;this.txtbox.domNode.focus();this.txtbox.domNode.select();}},onOK:function(){var n=mstrmojo.string.trim(this.txtbox.value),me=this,tid=row.data.did;if(n===row.text){this.close();return ;}var cb={success:function(res){row.data.n=n;row.set("text",n);model.pts[row.data.prid][tid].n=n;if(tid===model.SelTableID){mstrmojo.all.tableTitle.set("text",n);}me.close();},failure:function(res){me.error.set("text",res.getResponseHeader("X-MSTR-TaskFailureMsg"));}};model.renameObject(tid,15,n,false,cb);}});_tnEditor.open();break;case"sample":mstrApp.getRootController().showSampleData(row.data);break;default:break;}}});e.render();}else{e.set("domSrc",domSrc);e.set("data",wgt.data);e.set("wgt",wgt);}e.showContextMenu();}mstrmojo.architect.ProjectTableTree=mstrmojo.declare(mstrmojo.warehouse.TableTree,null,{scriptClass:"mstrmojo.architect.ProjectTableTree",multiSelect:false,draggable:true,dropZone:true,noCheckBox:false,selectionAcrossBranch:true,tp:1,init:function init(props){this._super(props);var evtConfig={},$this=this;evtConfig[this.id]={projectTablesLoaded:function(evt){var items=$this.p_tables=evt.items;$this.set("items",items);}};mstrApp.getRootController().attachDataChangeListeners(evtConfig);},itemFunction:function ifn(item,idx,w){var tree=w.tree||w,iw=new mstrmojo.TreeBrowserNode({markupString:'<li id="{@id}" class="mstrmojo-TreeNode {@cssClass}" style="{@cssText}" mstrAttach:mousedown,click,dblclick><div class="mstrmojo-TreeNode-div {@tp}"><img class="mstrmojo-TreeNode-state" src="../images/1ptrans.gif" /><img class="mstrmojo-TreeNode-checkBox" src="../images/1ptrans.gif" /><span class="mstrmojo-TreeNode-text {@textCssClass}"></span><span class="mstrmojo-Architect-tabletree-cxtmenu"></span></div><ul class="mstrmojo-TreeNode-itemsContainer">{@itemsHtml}</ul></li>',markupSlots:{checkBoxNode:function(){return this.domNode.firstChild.childNodes[1];},stateNode:function(){return this.domNode.firstChild.firstChild;},textNode:function(){return this.domNode.firstChild.childNodes[2];},itemsContainerNode:function(){return this.domNode.lastChild;}},tp:"Proj t"+item.t,data:item,parent:w,tree:tree,draggable:true,text:item[w.itemDisplayField],multiSelect:true,selectionPolicy:"toggle",textCssClass:tree.item2textCss(item),items:item[w.itemChildrenField],itemDisplayField:w.itemDisplayField,itemChildrenField:w.itemChildrenField,itemFunction:w.itemFunction,isSpecialNode:function(){return item.t!==15&&item.t!==30;},getDragData:function(c){var w=c.src.widget;if(w&&w.data&&w.data.t===26){w.data.html='<span class="mstrmojo-ArchitectListIcon t'+26+'" style="width:80px;background-color:white;padding:2px 0px 0px 20px;">'+w.data.n+"</span>";return w.data;}},onmousedown:function omd(evt){if(this.selectedIndex>-1){$DND.startDragCheck(evt.hWin,evt.e);}},dropZone:true,allowDrop:function allowDrop(context){return{AddTable:true,DeleteRelation:true,MapElement:true}[context.event];},ondrop:function ondrop(context){var event=context.event;if(event==="AddTable"){mstrApp.getRootController().addTables(context.src.data);}else{if(event==="DeleteRelation"){mstrmojo.all.ArchModel.handleDropfromRelation(context);}else{if(event==="MapElement"){if(item.t===26){context.tgt.data=item;mstrApp.getRootController().createMapping(context);}}}}},ondragenter:function(c){var w=c.tgt.widget;w.domNode.style["background-color"]="#d4e7f9";},ondragover:function(c){},ondragleave:function(c){this.domNode.style["background-color"]="white";},predblclick:function predblclick(evt){var w=evt.src;if(w.data&&w.data.t===26&&w.parent.data.did===mstrmojo.all.ArchModel.SelTableID){mstrmojo.all.aflist.processAction({name:"AddAttribute",cln:w.data.cln,cmid:w.data.cmid});}$D.stopPropogation(evt.hWin,evt.e);$D.clearBrowserHighlights(evt.hWin);return false;},toggleState:function toggleState(){if(this.state!==2){this.set("state",this.state===1?0:1);w.items[idx].state=this.state;}},onRender:function(){if(item.t===29||item.state===1){this.set("state",1);}},preclick:function(evt){var target=mstrmojo.dom.eventTarget(window,evt.e);if(target){var className=target.className;if(className.indexOf("mstrmojo-Architect-tabletree-cxtmenu")>=0&&tree&&tree.oncxtmenuPopup){tree.oncxtmenuPopup(target,this);}else{if(className.indexOf("mstrmojo-TreeNode-text")>=0&&className.indexOf("t15")>0){var model=mstrmojo.all.ArchModel;model.set("PrjTblDbr",this.data.prid);model.raiseEvent({name:"SelTableIDChange",tbl:model.getTable(this.data.did),toAdd:target.parentNode.className.indexOf("selected")>=0});}}}mstrmojo.TreeNode.prototype.preclick(evt);}});return iw;},getContentThroughTaskCall:function getContentThroughTaskCall(params,callbacks){var me=this,d=params.data;if(params.isRoot){callbacks.success(me.items);}else{if(d.items&&d.t===29){callbacks.success(d);}else{mstrApp.getRootController().loadTableContents(d,me.viewtp,callbacks);}}},item2textCss:function item2textCss(data){if(data.tp==="-2"){return"mstrmojo-ArchitectListIcon refreshOption";}return"mstrmojo-ArchitectListIcon t"+data.t+" st"+data.st;},allowDrop:function allowDrop(context){return{addTable:true,deleteRelation:true}[context.event];},ondrop:function ondrop(context){var event=context.event;if(event==="addTable"){mstrApp.getRootController().addTables(context.src.data);}else{if(event==="deleteRelation"){mstrmojo.all.ArchModel.handleDropfromRelation(context);}}},onviewtpChange:function(){var items=this.items,ws=this.ctxtBuilder.itemWidgets,i,j,len=items.length;for(i=0;i<len;i++){var it=items[i];if(it.t===29){var its=it.items,len2=its.length;for(j=0;j<len2;j++){var w=ws[i].ctxtBuilder.itemWidgets[j];if(w.contentRetrieved){its=[];w.contentRetrieved=false;w.set("state",0);}}}else{if(it.t===15&&ws[i].contentRetrieved){it.items=[];ws[i].contentRetrieved=false;ws[i].set("state",0);}}}},displayMenu:function(w){if(w.data){return w.data.t===15||w.data.t===30||(w.data.t===26&&w.parent.data.did===mstrmojo.all.ArchModel.SelTableID);}},tableChange:function tableChange(evt){var tables=evt.tbls,model=mstrmojo.all.ArchModel,rid=model.PrjTblDbr,isPrm=(rid==="00000000000000000000000000000000"),itemWidgets=this.ctxtBuilder.itemWidgets,rIdx=-1,iw;$A.forEach(itemWidgets,function(item,idx){if(item.data.prid===rid){iw=item;rIdx=idx;return false;}});if(!iw){var dbr=tables[0].pdbr;var d={n:dbr.n+(isPrm?"(Primary)":""),prid:rid,st:dbr.stp,t:dbr.tp,items:tables,isPrm:isPrm,dbr:dbr};this.add([d]);}else{iw.add(tables,-1);iw.parent.items[rIdx].items=iw.items;}model.p_tables=this.items;},attrfctChange:function(evt){if(this.viewtp===0){return ;}var n=evt.value,id=evt.did,tp=evt.tp,toRefresh=false,items=this.items,i,j,k;for(i=0;i<items.length;i++){var tbls=items[i].items;for(j=0;j<tbls.length;j++){var af=tbls[j].items;for(k=0;k<af.length;k++){var obj=af[k];if(obj.t===tp&&obj.did===id){if(n===null){delete af[k];}else{af[k].name=n;af[k].n=n;}toRefresh=true;break;}}if(toRefresh){toRefresh=false;var w=this.ctxtBuilder.itemWidgets[i].ctxtBuilder.itemWidgets[j];w.set("items",[]);w.set("items",af);break;}}}},tableNameChange:function(evt){var n=evt.value,tid=evt.did,items=this.items,i,j;for(i=0;i<items.length;i++){var ts=items[i].items;for(j=0;j<ts.length;j++){var t=ts[j];if(tid===t.did){if(n===null){delete ts[j];this.ctxtBuilder.itemWidgets[i].set("items",ts);}else{t.n=n;var w=this.ctxtBuilder.itemWidgets[i].ctxtBuilder.itemWidgets[j];w.set("text",n);}}}}},refreshTable:function(evt){if(this.viewtp===0){return ;}var me=this,tid=evt.did,cb={success:function(res){var tbl=findTable(me,tid);tbl.it.items=res.items;tbl.w.set("items",[]);tbl.w.set("items",res.items);}};mstrmojo.all.ArchModel.getAttributesFactsInTable(evt,me.viewtp,cb);},msChange:function(evt){var tbl=findTable(this,evt.tid),w=tbl.w;w.data.t=30;w.tp="Proj t30";w.data.secdbrs.push(evt.dbr);w.textCssClass="mstrmojo-ArchitectListIcon t30";w.render();},layerChange:function(){var itemWidgets=this.ctxtBuilder.itemWidgets,model=mstrmojo.all.ArchModel,layerTables=model.getLayer(model.currentlayerID).tables,selected;this.clearTreeSelect();$A.forEach(itemWidgets,function(dbrTables){selected=[];$A.forEach(dbrTables.items,function(table,idx){if(layerTables[table.did]){selected.push(idx);}});dbrTables.select(selected);});},oncxtmenuPopup:function(srcDom,row){openCxtMenu(srcDom,row);}});}());