(function(){mstrmojo.requiresCls("mstrmojo.Button","mstrmojo.AndroidXtabZone","mstrmojo.AndroidDICFactory","mstrmojo.DynamicClassFactory");var MARKROW=102,ROW_HEADER_MERGED=1,TX_MARK=2,$C=mstrmojo.css,$D=mstrmojo.dom,$H=mstrmojo.hash,$CFC=mstrmojo.DynamicClassFactory.newComponent,CP_TITLE=1,CP_COL_HEADERS=2,CP_ROW_HEADERS=4,COL_AXIS=2,TX_ELEM_ATT_FORM=1,TX_ELEM_METRIC=2,MARK_ROW=1,CHANGE_DATA=2,MR_MANIPULATION_UNSET=1,MR_MANIPULATION_SELECT=2,DATA_DRIVEN_CONTROL=2,XTAB=1,getGroupIdx=function(cell){if(cell){return cell.tui>=0?("h_"+cell.tui+"_"+cell.fi+"_"+cell.axis):("m_"+cell.mix);}return"";};function applyChange(c,k,vo){var t=this.nm[k],v=vo.v,dv=vo.dv;c.rv=v;c.v=dv;c.mdf=1;if(c._src){c._src.rv=v;c._src.v=dv;c._src.mdf=1;}var dicWidget=this.dicGroupMap[getGroupIdx(c)].widgetsMap[c._ei];if(!dicWidget.showByDefault){if(dicWidget.hasPreview){dicWidget.renderPreview();}else{if($D.isIE7&&mstrmojo.string.isEmpty(v)){v=" ";}t[t.innerText!==undefined?"innerText":"textContent"]=v;}}return t;}function onTotalRow(cp,o,rs){if(rs[o]===0){return true;}if(cp&&rs[o]===undefined){try{var cells=cp.getRowCells(o),c=cells&&cells[0];if(c&&c.o===o){if(c.sst){rs[o]=0;}return !!c.stt;}if(c&&c.o){return onTotalRow(cp,o+o-c.o,rs);}return false;}catch(ex){return false;}}else{return false;}}function updateSelectedRows(marked,rs){mstrmojo.array.forEach(marked,function(m){rs[m.o]=1;});}function clearMergedHeaderMarks(gd){if(gd.mgh&&(gd.mgh&ROW_HEADER_MERGED)){this.mghMarks={};}}function clearSelectedRowsForBlock(selections,block){var begin=block.bb-1,end=Math.min(begin+block.bc,block.tc),row;$H.forEach(selections,function(v,idx){row=Number(idx);if(row!==NaN&&row>=begin&&row<end){delete selections[idx];}});}function markDirtyRows(c,rowIdx){var rs=this.editing?1:(c.rs||1),i;for(i=0;i<rs;i++){this.dirtyRows[rowIdx+i]=1;}}function isDataDrivenDIC(di){return di&&parseInt(di.ipt,10)===DATA_DRIVEN_CONTROL;}function getRowIndex(cell){var _BR=this.zones._BR,_BL=this.zones._BL;if(!_BL){return _BR.getRowIdxByCell(cell);}else{if(_BR.posMap&&_BR.posMap[cell._ei]){return _BR.getRowIdxByCell(cell);}else{return _BL.getRowIdxByCell(cell);}}}mstrmojo._IsEditableGridCP={_mixinName:"mstrmojo._IsEditableGridCP",initContent:function initContent(startIndexInContainer){this._super(startIndexInContainer);var gd=this.gridData,vp=gd&&gd.vp,i,j,fm,size,cg,cl,cws,rt;if(((this.type===CP_TITLE)||(this.type===CP_ROW_HEADERS))&&vp&&vp.cols&&!vp._adjusted){cg=vp.cols.cg;cws=vp.cols.cws;if(cg&&cg.cgc>0){for(i=cg.cgc;i>0;i--){cg[i]=$H.copy(cg[i-1],{});cl=cg[i];var fms=cl.attForms;if(fms){for(j=0,size=fms.length;j<size;j++){fm=fms[j];fm.idx+=1;}}}cg[0]={tg:false,cc:0,cl:1,attForms:[{n:"",idx:0}]};cg.cgc+=1;}if(cws){cws.splice(0,0,{w:"60px",xc:true});}if(vp.dafIdx!==undefined){vp.dafIdx+=1;}rt=gd.gts.row;for(i=0,size=rt.length;i<size;i++){rt[i].ci=i+1;}vp._adjusted=true;}this.colWidths=[{w:""}].concat(this.colWidths);this.unmergedCells=[];},getUnmergedCells:function getUnmergedCells(){return null;},getRowCells:function getRowCells(ri){var cells=this._super(ri),cell=cells[0],o=(cell&&cell.o)||0,isTtl=(this.tp===CP_TITLE),ics=this.interactiveCellsArray,fc={css:"",v:""},umc=[],ncs=[],i,len;if(!isTtl){var rows=this.base.items,lb=this.lookupBase,cssBase=this.gridData.css,pi=cell&&cell.pi,r=pi&&pi.ri,c=pi&&pi.ci,otr=cell.stt>0;while(pi&&r>-1&&c>-1){cell=cell._p||rows[r].items[c];var _c=$H.copy(cell,{});_c._src=cell;if(!_c.css){_c.css=cssBase[_c.cni].n;}var unit=lb[cell.tui],e=unit&&unit.es[cell.idx];if(e){_c.v=cell.v||e.n;_c._e=e;}_c.rs=1;if(otr){_c.at&=~32;}if(o>-1){_c.o=o;}if(!_c.axis&&this.axis){_c.axis=this.axis;}_c._ei=ics.push(_c)-1;umc.splice(0,0,_c);pi=cell&&cell.pi;r=pi&&pi.ri;c=pi&&pi.ci;}for(i=0,len=cells.length;i<len;i++){var nc=cells[i];if(nc.rs>1){var tc=$H.copy(nc,{});tc.rs=1;nc=tc;}ncs.push(nc);}}else{ncs=cells;if(ri>0){return cells;}}if(ncs[0]){fc=$H.copy(ncs[0],{});fc.rv=fc.v="";if(this.tp===CP_TITLE){fc.n=fc.v="";fc.markAll=true;}else{fc.n="";}fc._ei=ics.push(fc)-1;fc.at=32;fc.cs=1;fc.mark=true;fc.mix="x";fc.css=(umc[0]&&umc[0].css)||fc.css;delete fc.ui;delete fc.tui;delete fc.fs;delete fc.mdf;}return[fc].concat(umc.concat(ncs));}};mstrmojo._IsAndroidEditableXtab={_mixinName:"mstrmojo._IsAndroidEditableXtab",update:function update(node){var marks,gd=node.data;if(this._super){this._super(node);}this.kc={};this.rs={};this.rsDelta={};clearMergedHeaderMarks.call(this,gd);if(gd.eg!==undefined){return ;}marks=node.data.marked;if(marks){updateSelectedRows(marks,this.rs);}if(!gd.rw){var rc=gd.gvs.items.length;gd.rw={row:{bb:1,bc:rc,tc:rc},col:{bb:-1,bc:-1,tc:0}};}},initCP:function initCP(gd,interactiveCellsArray,tp,base,lkpBase,ax,cp){var props={gridData:gd,type:tp,interactiveCellsArray:interactiveCellsArray};props.base=base||props.base;props.lookupBase=lkpBase||props.lookupBase;props.axis=ax||props.axis;props.dataSource=this;if(!cp){if(this.tca===TX_MARK&&this.editing){if(tp===CP_TITLE){mstrmojo.EditableXtabTitlesCP=$CFC(mstrmojo.XtabTitlesCP,[mstrmojo._IsEditableGridCP],{scriptClass:"mstrmojo.EditableXtabTitlesCP",tp:CP_TITLE});cp=new mstrmojo.EditableXtabTitlesCP(props);}else{if(tp===CP_ROW_HEADERS){mstrmojo.EditableXtabCP=$CFC(mstrmojo.XtabCP,[mstrmojo._IsEditableGridCP],{scriptClass:"mstrmojo.EditableXtabCP"});cp=new mstrmojo.EditableXtabCP(props);}else{cp=new mstrmojo.XtabCP(props);}}}else{if(tp===CP_TITLE){cp=new mstrmojo.XtabTitlesCP(props);}else{cp=new mstrmojo.XtabCP(props);}}}else{$H.copy(props,cp);}return cp;},createOnDemandCP:function createOnDemandCP(blockNum,rc,zone){var cp;if(this.tca===TX_MARK&&this.editing&&zone===CP_ROW_HEADERS){mstrmojo.EditableXtabOnDemandCP=$CFC(mstrmojo.XtabOnDemandCP,[mstrmojo._IsEditableGridCP],{scriptClass:"mstrmojo.EditableXtabOnDemandCP"});cp=new mstrmojo.EditableXtabOnDemandCP();}else{cp=new mstrmojo.XtabOnDemandCP();}cp.dataSource=this;cp.blockNum=blockNum;cp.rc=rc;return cp;},preBuildRendering:function preBuildRendering(){var txi=this.defn.txi;if(this._super){this._super();}this.txar=txi.txar;this.sci=txi.sci;this.tca=txi.tca;if(this.tca!==TX_MARK){this.editing=false;}else{if(mstrApp.isMobile){this.editing=this.alwaysEditing=true;}}this.nm={};this.ko={};this.dirtyRows={};this.requiredCellsMap={};this.dicGroupMap={};this.lastIndex=0;this.lastHeaderIndex=0;this.columnNames={};},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}if(this.tca===TX_MARK&&this.gridData.eg===undefined){var t=Math.max(-16,-this.domNode.offsetTop),me=this;if(!this.alwaysEditing){var localeString=window.getLocaleString?window.getLocaleString("MARK_ROWS","Mark rows"):mstrmojo.desc(8324,"Mark rows");var dn=mstrmojo.Button.newIconButton(localeString,"mstrmojo-EditButton",function(){if(!me.recalculating){me.editing=!me.editing;me.refresh();}}),btn=new mstrmojo.Button(mstrmojo.hash.copy({cssText:"top:"+t+"px;"},dn));btn.render();this.domNode.appendChild(btn.domNode);if(this.editing){this.domNode.style.zIndex=1000;$C.addClass(btn.domNode,"close");}else{$C.removeClass(btn.domNode,"close");}}}},dataDownloadErr:function dataDownloadErr(){if(this.txar&&this.recalculating){var z=this.zones;if(z._BL){z._BL.isDownloading=false;}z._BR.isDownloading=false;this.rhsCP.initContent();this.valuesCP.initContent();$C.removeClass(this.maskNode,"wait");this.recalculating=false;}},dataDownloaded:function dataDownloaded(node,memo){var gd=node.data;if(this.txar){var idx=memo.blockNum,zn=this.zones,ica;if(this.recalculating){memo.recalculating=true;this.interactiveCellsArray=[];this.requiredCellsMap={};this.dirtyRows={};this.lastIndex=0;this.lastHeaderIndex=0;this.kc={};this.nm={};this.updatedCellsMap={};this.recalculating=false;this.destroyDICs();}else{memo.recalculating=false;}if(idx===0){this.gridData=gd;}if(gd.eg){this.refresh();return ;}ica=this.interactiveCellsArray;this.initCP(gd,ica,CP_TITLE,null,null,null,this.titlesCP);this.initCP(gd,ica,CP_COL_HEADERS,gd.ghs.chs,gd.gts.col,COL_AXIS,this.chsCP);this.titlesCP.initContent();this.chsCP.initContent();if(ica&&ica.length===0){if(zn._TR){zn._TR.refresh();}if(zn._TL){zn._TL.refresh();}}}if(this._super){this._super(node,memo);}clearMergedHeaderMarks.call(this,gd);clearSelectedRowsForBlock(this.rs,gd.rw.row);if(gd.marked){updateSelectedRows(gd.marked,this.rs);this.rsDelta={};}},closeDownloadStatus:function closeDownloadStatus(){if(this._super){this._super();}mstrmojo.css.removeClass(this._STATUS,"recalculate");},kc:null,ko:null,nm:null,rs:null,dicGroupMap:null,lastIndex:0,lastHeaderIndex:0,columnNames:null,getDataInputInfo:function getDataInputInfo(cell,widx){var k=cell._ei,o,defn=this.node.defn,data=this.gridData;if(cell.mark){o=cell.o;if(cell.stt){this.rs[o]=0;return ;}this.ko[o]=k;cell.rv=cell.v=this.rs[o]||-1;this.kc[k]={rowop:true};return{key:k,t:MARKROW,vls:[{v:-1},{v:1}],wm:1,w:22,hm:1,h:16,dm:1};}var titleInfo=this.model.getCellTitleInfo(cell,this.dataBlocks[cell._gd]),title=titleInfo&&titleInfo.title,es=title&&title.es,mti=(cell.mti!==undefined)?cell.mti:cell.mix,isMtx=(cell.mix!==undefined),dic=defn.txi.dic,di;di=!isMtx?dic.att&&title&&dic.att[title.id]&&dic.att[title.id][title.fs[cell.fi].id]:dic.mtx&&dic.mtx[es[mti].oid];if(!di){return null;}if(this.columnNames[widx]===undefined){this.columnNames[widx]=!isMtx?title.n:es[mti].n;}if(isDataDrivenDIC(di)){di.vls=(data.dcv&&data.dcv[di.k])||[];}if(k>=0&&!this.kc[k]){var isMv=!cell.axis,t={isMv:isMv};if(isMv){var pi=cell.pi,tp=pi&&pi.top;t.co=(tp&&tp.ci)||0;t.metric_id=es[mti].oid;cell.o=t.o=(cell._lp&&cell._lp.o)||0;t.tp=TX_ELEM_METRIC;}else{t.ax=cell.axis;t.atid=title.id;t.form_id=title.fs[cell.fi].id;t.o=cell.o;t.tp=TX_ELEM_ATT_FORM;t.fi=cell.fi;t.ui=cell.ui;t.tui=cell.tui;t.rs=cell.rs;}t.dt=di.dt;t.t=di.t;if(isDataDrivenDIC(di)){t.vls=di.vls;t.k=di.k;}this.kc[k]=t;}di.key=k;if(di.dm){di.dm=parseInt(di.dm,10);}return di;},isEditableHeader:function isEditableHeader(cell){var defn=this.node.defn,dic=defn.txi.dic;if(cell.sst||!dic){return false;}if(cell.id!==undefined&&dic.att){return !!(dic.att[cell.id]&&(cell.fix?dic.att[cell.id][cell.fid]:dic.att[cell.id]));}if(cell.tui!==undefined&&cell.mix!==undefined&&dic.mtx){return !!(dic.mtx[cell._e.oid]);}return false;},dataChanged:function dataChanged(k,r,v,d){if(!this.recalculating){if(d){this.nm[k]=d;}if(this._super){this._super(k,r,v,d);}}},updateValue:function updateValue(k,vo){if(this._super){this._super(k,vo);}var c=this.interactiveCellsArray[k],v=vo.v,t,rowIdx=getRowIndex.call(this,c);this.lmr=null;t=applyChange.call(this,c,k,vo);if(c.r!==v){if(!c.mark){c.mdf=1;mstrmojo.css.removeClass(t,"required");markDirtyRows.apply(this,[c,rowIdx]);this.flagDirtyUnit(t);}}else{this.clearDirtyUnit(t);}if(this.tca===TX_MARK){if(c.mark){var ordinal=c.markAll?-1:c.o,rsDelta=this.rsDelta;this.rs[ordinal]=v;this.lmr={r:ordinal,v:v};if(c.markAll){rsDelta=this.rsDelta={};rsDelta[ordinal]=v;this.mghMarks={};}else{if(rsDelta[ordinal]&&rsDelta[ordinal]!==v){delete rsDelta[ordinal];}else{if(rsDelta[-1]!==v){rsDelta[ordinal]=v;}}}}else{if(this.rs[c.o]!==0){this.rs[c.o]=1;}if(!this.editing&&this.mghMarks&&(c.mix===undefined)){if(!this.mghMarks[c.o]||this.mghMarks[c.o].rs<c.rs){this.mghMarks[c.o]={o:c.o,rs:c.rs,k:k};}var sro,sco,me=this;$H.forEach(this.rsDelta,function(mv,ro){sro=parseInt(ro,10);sco=parseInt(c.o,10);if(sro>=sco&&sro<=(sco+c.rs)){delete me.rsDelta[ro];}});}else{this.rsDelta[c.o]=1;}if(!this.editing&&c.rs>1){var o=c.o+1;while(o-c.o<c.rs){if(!onTotalRow(this.rhsCP,o,this.rs)){this.rs[o]=1;}o+=1;}}if(this.editing){var w=this.dicGroupMap.m_x.widgetsMap[this.ko[c.o]];if(w){w.set("checked",true);}}}}if(this.txar&&!c.mark){return true;}return false;},autoRefresh:function autoRefresh(){var z=this.zones;if(z._BL){z._BL.invalidAllPages();}z._BR.invalidAllPages();this.rhsCP.invalid();this.valuesCP.invalid();$C.addClass(this._STATUS,"recalculate");z._BR.onscroll(true);this.recalculating=true;},getKeyContext:function getKeyContext(key){return this.kc[key];},getUpdateObject:function getUpdateObject(){var cs=[],j,udvs,udv,lmr=this.lmr,v,ddicObj={};if(lmr){this.lmr=null;return{manipulation:MARK_ROW,actionType:(lmr.v===-1)?MR_MANIPULATION_UNSET:MR_MANIPULATION_SELECT,rowOrdinal:lmr.r,nodeKey:this.k,sliceId:this.sid};}udvs=this.getUpdatedValues();for(j=0;j<(udvs&&udvs.length);j++){if(!udvs[j].rowop){udv=udvs[j];break;}}if(udv){v=mstrmojo.string.encodeXMLAttribute(String(udv.v));if(udv.k!==undefined&&udv.vls){ddicObj={controlKey:udv.k,elementId:udv.vls[mstrmojo.array.find(udv.vls,"v",udv.v)].eid};}if(!!udv.isMv){cs.push($H.copy(ddicObj,{rowOrdinal:udv.o,colOrdinal:udv.co,newValue:v,dataType:udv.dt,transactionType:udv.t}));}else{cs.push($H.copy(ddicObj,{rowOrdinal:udv.o,attId:udv.atid,formId:udv.form_id,unitIndex:udv.tui||udv.ui,newValue:v,dataType:udv.dt,transactionType:udv.t}));}}return{manipulation:CHANGE_DATA,nodeKey:this.k,sliceId:this.sid,cells:cs,autoRefresh:this.txar};},getUpdates:function getUpdates(){var w=this,j,udv,udvs=w.getUpdatedValues(),srs=this.rsDelta,eg=[],gd=[],udt=false,k="";eg.push('<gr rw_tree_type="'+w.treeType+'" rw_node_key="'+w.k+'" slice_id="'+w.sid+'">');for(j in udvs){if(udvs.hasOwnProperty(j)){udv=udvs[j];if(!udv.rowop){var v=mstrmojo.string.encodeXMLAttribute(String(udv.v));if(udv.k&&udv.vls){var m=mstrmojo.array.find(udv.vls,"v",udv.v);k='rw_control_key="'+udv.k+'" element_id="'+udv.vls[m].eid+'" ';}if(!!udv.isMv){gd.push('<cli cordinal="'+udv.co+'" metric_id="'+udv.metric_id+'"><updt types="'+udv.tp+'" rordinal="'+udv.o+'" '+k+'value="'+v+'" dt="'+udv.dt+'"/></cli>');}else{gd.push('<cli ax="'+udv.ax+'" attribute_id="'+udv.atid+'" form_id="'+udv.form_id+'"><updt types="'+udv.tp+'" ordinal="'+udv.o+'" '+k+'value="'+v+'" dt="'+udv.dt+'"'+(this.mghMarks?' flags="1"':"")+"/></cli>");}udt=true;}}}if(!$H.isEmpty(this.mghMarks)){var me=this;$H.forEach(this.mghMarks,function(v,ro){k=me.getKeyContext(v.k);gd.push('<mark rordinal="'+ro+'" types="4" flags="1" attribute_id="'+k.atid+'" form_id="'+k.form_id+'"/>');});}if(srs&&!$H.isEmpty(srs)){udt=true;$H.forEach(srs,function(v,o){if(v===1){gd.push('<mark rordinal="'+o+'" types="4"/>');}else{gd.push('<mark rordinal="'+o+'" types="5"/>');}});}eg.push(gd.join(""));eg.push("</gr>");if(!udt){eg=[];}return eg.join("");},flagDirtyUnit:function flgDtUnt(t){if(t&&this.sci){if(this._super){this._super(t);return ;}var v=document.createElement("div"),df,tf=false,trans3d=$C.getStyleValue(this.domNode,$D.CSS3_TRANSFORM),isTDRelative;v.className="flag-container";v.innerHTML='<div class="dirty-cell"/>';if(t.insertBefore){t.insertBefore(v,t.firstChild);isTDRelative=(v.offsetParent===t);}tf=mstrmojo.string.isEmpty(trans3d)||trans3d==="none";df=v.firstChild;df.style.top=((!tf||isTDRelative)?(-v.offsetTop):(t.offsetTop-v.offsetTop))+"px";df.style.left=(t.clientWidth+((!tf||isTDRelative)?(-v.offsetLeft):(t.offsetLeft-v.offsetLeft))-8)+"px";}},clearDirtyUnit:function clrDtUnt(t){if(this._super){this._super(t);return ;}var c=t.firstChild;if(t){if(c&&c.className&&c.className==="flag-container"){t.removeChild(c);}}},onvisibleChange:function onvisChg(){if(this.visible===true){var me=this;setTimeout(function(){me.configureActions();},10);}},configureActions:function cfgAct(){if(this.visible===false){return ;}var zone="_BR",grid=this.zones[zone],rowLocked=!!this.zones._BL,posMap=grid.posMap,thPosMap=grid.thPosMap,ics=this.interactiveCellsArray,dicGroupMap=this.dicGroupMap,dirtyNodes=[],ei,len,i,k,cell,pos,node,widx,rowIdx,currentRow,config,dicGroup,me=this,flagDirtyNodes=function(dns){var jLen=dns.length,j;for(j=0;j<jLen;j++){me.flagDirtyUnit(dns[j]);}};for(ei=this.lastIndex,len=ics.length;ics[ei]&&ei<len;ei++){cell=ics[ei];pos=posMap&&posMap[ei];if(!pos&&rowLocked){zone=(zone==="_BR")?"_BL":"_BR";grid=this.zones[zone];posMap=grid&&grid.posMap;thPosMap=grid&&grid.thPosMap;pos=posMap&&posMap[ei];}if(pos&&((cell.at&32)>0)){node=grid.getNodeByPosition(pos);cell.at=32;if(cell.rv==null){cell.rv=isNaN(cell.mix)?cell._e.n:cell.v;}widx=getGroupIdx(cell);config=this.getDataInputInfo(cell,widx);dicGroup=this.dicGroupMap[widx];if(config){if(!dicGroup){dicGroup=dicGroupMap[widx]=mstrmojo.AndroidDICFactory.createDICGroup({gk:widx,dic:config,owner:this,openerType:XTAB});}var dicProps={value:(cell.rv===undefined)?(cell.v||cell.n):(typeof cell.rv==="string"?mstrmojo.string.decodeHtmlString(cell.rv):cell.rv),dv:cell.v||cell.n,ts:cell.ts,markAll:cell.markAll,openerNode:node,k:cell._ei,ownerCell:cell,popupTitle:this.columnNames[widx]},stackedRh=grid.cp.stackedRh;if(stackedRh&&cell.singleStack&&(mstrmojo.DICConfig.showDICByDefault(config,1)||mstrmojo.DICConfig.hasDICPreview(config,1))){var tdHeight=node.offsetHeight;node.className+=" igDIC";node.style.cssText="height:"+tdHeight+"px;";if(dicGroup.showByDefault){node.className+=" sbd";}mstrmojo.hash.copy({inlineExtraCssText:"position:absolute;top:"+parseInt(stackedRh/2-tdHeight/2+1,10)+"px;"},dicProps);}dicGroup.addDIC(cell._ei,dicProps);rowIdx=pos.page*grid.rowsPerPage+pos.row;if(config.req){for(k=0;k<(this.editing?1:(cell.rs||1));k++){currentRow=this.requiredCellsMap[rowIdx+k];if(!currentRow){this.requiredCellsMap[rowIdx+k]=currentRow=[];}currentRow.push(cell);}}if(cell.mdf){dirtyNodes.push(node);markDirtyRows.apply(this,[cell,rowIdx]);}}}}this.lastIndex=ei;for(widx in dicGroupMap){dicGroupMap[widx].render();}setTimeout(function(){flagDirtyNodes(dirtyNodes);},25);for(i=this.lastHeaderIndex,len=thPosMap.length;i<len;i++){pos=thPosMap[i];node=grid.getNodeByPosition(pos);cell=pos.obj;if(this.isEditableHeader(cell)){node.innerHTML='<div class="editable-column">'+node.innerHTML+"</div>";}}this.lastHeaderIndex=i;this.registerTxWidget();if(this._super){this._super();}},showPopupDIC:function showPopupDIC(target){var tn=target&&$D.findAncestorByAttr(target,"ei",true,this.viewport);if(tn){var td=tn.node,cell=this.getCellForNode(td),group=this.dicGroupMap[getGroupIdx(cell)];if(group){group.showPopupDIC(cell._ei);return true;}}return false;},onclick:function onclick(e){var target=mstrmojo.dom.eventTarget(window,e.e);if(!this.showPopupDIC(target)&&this._super){this._super(e);}},unrender:function unrender(){if(this._super){this._super();}this.destroyDICs();},destroyDICs:function destroyDICs(){var dicGroupMap=this.dicGroupMap;this.dicGroupMap={};setTimeout(function(){var i;for(i in dicGroupMap){dicGroupMap[i].destroy();}},10);},checkRequiredObjects:function checkRequiredObjects(){if(this.hasRendered&&!(this.isInteractiveGrid&&this.isInteractiveGrid())&&!this.gridData.eg){var grid=this.zones._BR,posMap=grid.posMap,row,me=this,rowSelections=this.rs,validFlag=true,processRow=function(r,hilite){var valid=true,cells=me.requiredCellsMap[r],len=(cells&&cells.length)||0,i;for(i=0;i<len;i++){if(!cells[i].mdf){$C.toggleClass(grid.getNodeByPosition(posMap[cells[i]._ei]),"required",hilite);valid=!hilite;}}return valid;};if(this.tca===TX_MARK){for(row in rowSelections){validFlag=processRow(parseInt(row,10)+1,rowSelections[row]>0)&&validFlag;}}else{for(row in this.dirtyRows){validFlag=processRow(row,true)&&validFlag;}}return validFlag;}return true;},editNext:function editNext(k){if(this.recalculating){return false;}var ics=this.interactiveCellsArray,len=ics.length,i=k+1,nextCell,dicWidget;do{if(i>=len){i%=len;}if(i===k){return false;}nextCell=ics[i];var group=this.dicGroupMap[getGroupIdx(nextCell)];if(group){if(mstrmojo.DICConfig.isKeyNavigable(group.dic)){if(!group.showByDefault){group.showPopupDIC(i);}else{dicWidget=group.widgetsMap[i];dicWidget.focus();}return true;}}i++;}while(true);}};}());