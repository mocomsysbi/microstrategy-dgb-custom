(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.array","mstrmojo.qb._hasQBModel","mstrmojo.warehouse.WHModel","mstrmojo.DI.DIConstants","mstrmojo.DI.DIHelpers","mstrmojo.warehouse.EnumObjectTypes","mstrmojo.XMLParser","mstrmojo.warehouse.EnumDataChangeEvents");mstrmojo.requiresDescs(14098,9945,9946);var $ENUM_DATA_CHANGE_EVENTS=mstrmojo.warehouse.EnumDataChangeEvents,$DECODEHTML=mstrmojo.string.decodeHtmlString,$H=mstrmojo.hash,$ARRAY=mstrmojo.array,$DI_CONSTANTS=mstrmojo.DI.DIConstants,$EOT=mstrmojo.warehouse.EnumObjectTypes,SAP_HANA_DBTYPE=4000,$TWIP_PER_PIXEL=15,DEFAULT_HEIGHT=200,DEFAULT_WIDTH=200,DEFAULT_POSITION_TOP=0,DEFAULT_POSITION_LEFT=0,NO_PROJECT_MSG=mstrmojo.desc(14098,"There is no project ## in ###.");var $DESC=mstrmojo.desc;function decodeString(input){return input.replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,'"').replace(/&amp;apos;/g,'"').replace(/&apos;/g,"'").replace(/^\n+|\n+$/g,"").replace(/\t/g," ").replace(/&amp;/g,"&");}function decodeHTMLString(input){return $DECODEHTML(input).replace(/&apos;/g,"'");}function raiseDataPreviewEvent(model){model.raiseEvent({name:"dataPreview",mappings:model.FFSQLMode?model.sourceTableColumns:model.mappings,dataset:model.dataset,selectedColumns:model.selectedClns,isRefined:model.isRefined});}function loadFFSQLDefinition(data){var dataPreview=data.datap,mappings=dataPreview.maps,sourceInfo=dataPreview.srce,sql=sourceInfo.csl,controller=mstrApp.getRootController(),model=this,selectedProject=sourceInfo.gbqp,selectDBRres;if(this.firstTimeLoading){this.orimaps=mappings;}model.usingCookieNamespace=true;if(sourceInfo.xt===304){model.prevDBRoleID=sourceInfo.dbrid;selectDBRres=controller.selectDBRole(sourceInfo.dbrid);}else{if(model.getProject(selectedProject)===null){mstrmojo.alert(NO_PROJECT_MSG.replace("##",selectedProject).replace("###",mstrApp.userEmail));}}if(!model.isBigQuery&&!selectDBRres){model.fetchAndAppendSingleDBR(sourceInfo.dbrid);}sql=decodeString(sql);this.SQLstmt=sql;mstrApp.getRootController().raiseEvent({name:"reportModeChange",mode:2,value:sql,keepFormat:true});this.populateFFSQLMapping(mappings);if(this.firstTimeLoading){raiseDataPreviewEvent(this);this.firstTimeLoading=false;}}function findSelectedColumns(roo,cols){var chn=roo.chn;if(!chn){if(roo.col&&roo.stbid){cols.push({cid:roo.col,tid:roo.stbid});}return cols;}$ARRAY.forEach(chn,function(node){cols=findSelectedColumns(node,cols);});return cols;}function encodeExpression(input){return input.replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,'"').replace(/&amp;apos;/g,'"').replace(/&apos;/g,"'").replace(/^\n+|\n+$/g,"").replace(/\t/g," ").replace(/&amp;/g,"&");}function getOperator(expression){var operators={">=":2,"<>":5,"<=":4,"<":3,">":1},op;for(op in operators){if(expression.indexOf(op)>-1){return operators[op];}}return 0;}function getColumnWidgetIDs(model,columns){var ids=[],wid;$ARRAY.forEach(columns,function(col){wid=model.uiids[col.tid+col.cid];if(wid){ids.push(wid);}});return ids;}function getJoinPairs(roo,exp,arr){if(!exp.ftype){arr.push({lcid:roo.chn[0].col,rcid:roo.chn[1].col,exp:exp.exp});return exp.exp;}var exp1,exp2,expressionText;switch(exp.ftype){case 19:case 20:exp1=getJoinPairs(roo.chn[0],exp.children[0],arr);exp2=getJoinPairs(roo.chn[1],exp.children[1],arr);expressionText=exp1+((exp.ftype===19)?" AND ":" OR ")+exp2;break;case 21:expressionText=" NOT "+getJoinPairs(roo.chn[0],exp.children[0],arr);break;default:break;}return expressionText;}function loadConditions(model,roo,arr,whe,sqltp,sysprompt){if(!roo.ftype){var exp=encodeExpression(roo.exp);if(exp.indexOf("? aptqbr_prompt")>-1){sysprompt.push({n:exp,cid:whe.chn[0].cmid});return ;}var wids=getColumnWidgetIDs(model,findSelectedColumns(whe,[])),rowWidget,cols=[];$ARRAY.forEach(wids,function(wid){rowWidget=mstrmojo.all[wid];if(rowWidget&&rowWidget.updateState){rowWidget.updateState(2);}cols.push({t:rowWidget.srcTable,col:rowWidget.text});});return arr.push({et:"*",n:exp,expr:[{v:exp}],sqltp:sqltp,cols:cols});}switch(roo.ftype){case 19:case 20:case 21:var tmp=[];$ARRAY.forEach(roo.children,function(node,index){loadConditions(model,node,tmp,whe.chn[index],sqltp,sysprompt);});if(!tmp.length){return ;}if(tmp.length<roo.children.length&&tmp.length===1){arr.push(tmp[0]);}else{arr.push({et:14,fn:roo.ftype,nds:tmp,not:(roo.ftype===21),sqltp:sqltp});}break;default:break;}}function loadQBDefinition(data){var dataPreview=data.datap||[],maps=dataPreview.maps,model=this,xdatype,selectedProject,controller=mstrApp.getRootController();if(model.firstTimeLoading){model.orimaps=maps;}var def,dbrid,dbtables={},clns={},namespace,hasSameNameSpace=true,objectProcessing={53:function handleDBTable(obj){if(obj.ext_type===352||obj.ext_type===341){def=obj.def.sqs.c_c[0];dbrid=obj.def.dbr.did;xdatype=obj.ext_type;selectedProject=obj.def.sqs.big;}else{dbtables[obj.did]={cs:obj.def.cs.cs,tbn:decodeHTMLString(obj.n),did:obj.did,ns:obj.def.ns};if(namespace===undefined){namespace=obj.def.ns;}hasSameNameSpace=hasSameNameSpace&&(namespace===obj.def.ns);if(obj.ext_type===288){dbtables[obj.did].alias=decodeHTMLString(obj.n);}}},26:function handleColumn(obj){clns[obj.did]={did:obj.did,cln:decodeHTMLString(obj.def.cln),dt:obj.def.dt};}};$ARRAY.forEach(data.btb,function(obj){obj=obj.oi;if(objectProcessing[obj.tp]){objectProcessing[obj.tp](obj);}});model.usingCookieNamespace=true;if(xdatype===341){controller.selectDBRole(selectedProject);if(model.getProject(selectedProject)===null){mstrmojo.alert(NO_PROJECT_MSG.replace("##",selectedProject).replace("###",mstrApp.userEmail));}}else{controller.selectDBRole(dbrid);}model.prevDBRoleID=dbrid;if(!def){return ;}var selected=def.sqcs.c_c,whe=def.whe,cds=def.w_cond,he=def.he,hds=def.h_cond;model.selectedClns=[];model.dbtables=[];model.joins=[];model.joinsInfo={};model.uiids={};model.tables={};var selclns=model.selectedClns,mps={},cols,wids,exp,cid,tid;$ARRAY.forEach(selected,function(columnMapping){if(!(columnMapping.der&2147483648)){cols=findSelectedColumns(columnMapping.exp.roo,[]);exp=decodeHTMLString(columnMapping.exp.exp);wids=[];$ARRAY.forEach(cols,function(column){cid=column.cid;tid=column.tid;mps[tid]=mps[tid]||{};mps[tid][cid]=mps[tid][cid]||{};mps[tid][cid].state=1;mps[tid][cid].count=!mps[tid][cid].count?1:mps[tid][cid].count+1;wids.push(tid+cid);});selclns.push({wid:wids,expr:[{v:exp}],existing:true,ix:columnMapping.ix});}});model.tbns={};var pos_hash=model.pos_hash,tbns=model.tbns,tables=[],dbtid,tf,dbcolumns,ncs,alias,obj,tableObject;$ARRAY.forEach(def.stbs.c_c,function(table,index){tableObject={};tid=table.id;dbtid=table.dbt.did;alias=table.als?decodeHTMLString(table.als):(dbtables[dbtid].alias||dbtables[dbtid].tbn);dbcolumns=dbtables[dbtid].cs;if(pos_hash&&pos_hash[alias]){tableObject.pos={w:pos_hash[alias].w||DEFAULT_WIDTH,h:pos_hash[alias].h||DEFAULT_HEIGHT,t:pos_hash[alias].t||DEFAULT_POSITION_TOP,l:pos_hash[alias].l||DEFAULT_POSITION_LEFT};}else{tf=table.sqltf;if(tf&&tf.length){tableObject.pos={w:(tf[0]&&tf[0].pdv)/$TWIP_PER_PIXEL||DEFAULT_WIDTH,h:(tf[1]&&tf[1].pdv)/$TWIP_PER_PIXEL||DEFAULT_HEIGHT,t:(tf[2]&&tf[2].pdv)/$TWIP_PER_PIXEL||DEFAULT_POSITION_TOP,l:(tf[3]&&tf[3].pdv)/$TWIP_PER_PIXEL||DEFAULT_POSITION_LEFT};}}ncs=[];$ARRAY.forEach(dbcolumns,function(column){cid=column.did;obj=$H.copy(clns[cid]);if(mps[tid]&&mps[tid][cid]){obj.state=1;obj.count=mps[tid][cid].count;}ncs.push(obj);});tableObject.did=tid;tableObject.cs=ncs;tableObject.tbn=alias;tableObject.ns=dbtables[dbtid].ns;tableObject.dbtbn=dbtables[dbtid].tbn;tables[index]=tableObject;tbns[alias]=alias;});if(model.firstTimeLoading&&!model.isNew){model.orits=model.orits||tables.slice(0);}var originalTables=model.orits;$ARRAY.forEach(tables,function(table){if($ARRAY.find(originalTables,"did",table.did)>-1){table.existing=true;table.readOnly=mstrApp.isCloudPro;}});model.raiseEvent({name:"BindingTableLoaded",value:tables});$ARRAY.forEach(selclns,function(selectedColumn){wids=selectedColumn.wid;$ARRAY.forEach(wids,function(wid,index){wids[index]=model.uiids[wid];});});if(maps){model.populateMappings(maps);}if(dataPreview.data){model.populateDataset(dataPreview.data);}if(this.firstTimeLoading){raiseDataPreviewEvent(model);}var leftTableID,leftUITable,rightTableID,rightUITable,leftRowID,rightRowID,joinType,joinIndex,root,lcid,rcid,joinID,joinPairs,joinInfo;$ARRAY.forEach(def.sjs.c_c,function(join){leftTableID=join.ltid;rightTableID=join.rtid;joinType=join.jt;joinIndex=join.ix;root=join.cdn.roo;joinPairs=[];joinID=model.uiids[leftTableID]+model.uiids[rightTableID];model.joins.push(joinID);joinInfo={jt:joinType+"",exp:decodeHTMLString(getJoinPairs(root,join.exp_bo,joinPairs)),srctID:model.uiids[leftTableID],tgttID:model.uiids[rightTableID],links:{}};leftUITable=model.tables[model.uiids[leftTableID]];rightUITable=model.tables[model.uiids[rightTableID]];leftUITable.njoins=(leftUITable.njoins||0)+1;rightUITable.njoins=(rightUITable.njoins||0)+1;$ARRAY.forEach(joinPairs,function(joinPair){lcid=joinPair.lcid;rcid=joinPair.rcid;exp=decodeHTMLString(joinPair.exp);leftRowID=model.uiids[leftTableID+lcid];rightRowID=model.uiids[rightTableID+rcid];joinInfo.links[leftRowID+rightRowID]={srcw:mstrmojo.all[leftRowID],tgtw:mstrmojo.all[rightRowID],coords:[],exp:exp,jid:joinID,op:getOperator(exp)};joinInfo.nlinks=(joinInfo.nlinks||0)+1;model.addJoinColInfo(leftRowID,rightRowID);});model.joinsInfo[joinID]=joinInfo;});model.raiseEvent({name:"JoinsLoaded"});var arr=[],sysprompt=[];if(whe.exp!==""){loadConditions(model,cds,arr,whe.roo,0,sysprompt);if(arr.length){model.conditions.where=arr[0];}if(sysprompt.length&&!model.isCubeReport){model.pattrs={};var amps=maps.amps,attribute;$ARRAY.forEach(amps,function(item){if($ARRAY.find(sysprompt,"cid",item.afmps[0].sqc.id)>=0){attribute=item.aimp;model.pattrs[attribute.atid]={n:attribute.atnm,tp:12};}});}}if(he.exp!==""){arr=[];loadConditions(model,hds,arr,he.roo,1);if(arr.length){model.conditions.having=arr[0];}}model.firstTimeLoading=false;}function validateParams(callbacks){var model=this;if(!model.FFSQLMode){if(model.getColumnsCount()===0){mstrmojo.alert(mstrmojo.desc(9945,"Please add at least one column and try again."));if(callbacks&&callbacks.failure){callbacks.failure();}return false;}if(model.getTablesCount()===0){mstrmojo.alert(mstrmojo.desc(9946,"Please add at least one table and try again."));if(callbacks&&callbacks.failure){callbacks.failure();}return false;}}return true;}function getPreviewFlag(model){var previewData=$DI_CONSTANTS.ERDF.ENUM_LOAD_REPORT_PREVIEW_FLAG_DataInfo;if(model.isRefined){previewData=$DI_CONSTANTS.ERDF.ENUM_LOAD_REPORT_PREVIEW_FLAG_InnerDataInfo;}if(!model.isFFSQL&&model.FFSQLMode){previewData=$DI_CONSTANTS.ERDF.ENUM_LOAD_REPORT_PREVIEW_FLAG_DataInfo;}return $DI_CONSTANTS.ERDF.ENUM_LOAD_REPORT_PREVIEW_FLAG_MappingInfo+previewData;}mstrmojo.qb.EmmaModel=mstrmojo.declare(mstrmojo.warehouse.WHModel,[mstrmojo.qb._hasQBModel],{scriptClass:"mstrmojo.qb.EmmaModel",originalMsgID:undefined,dbRolesVersionExcludeFilter:[223],isDataImport:true,init:function init(props){if(this._super){this._super(props);}if(props.dbIds){this.dbRoleEditorCfg.dbIdFilter=props.dbIds;}if(props.dbTypes!==undefined){this.specifyDBTypes=true;this.dbRolesTypeFilter=props.dbTypes;this.dbmsTypeFilter=this.dbRolesTypeFilter;}if(props.dbVersions){this.dbRolesVersionFilter=props.dbVersions;this.dbmsVersionFilter=props.dbVersions;}if(props.dbObjects!==undefined){this.dbObjects=props.dbObjects;}if(props.isHadoopQB){this.dbObjectsDisplayOptions=16;this.specifyDBTypes=true;this.dbRolesTypeFilter=$DI_CONSTANTS.hadoopDbTypes.slice(0);this.dbmsTypeFilter=this.dbRolesTypeFilter.slice(0);this.dbRolesVersionExcludeFilter=$DI_CONSTANTS.ibmDb2Versions.concat(this.dbRolesVersionExcludeFilter?this.dbRolesVersionExcludeFilter:[]);}this.dbRoleEditorCfg.dbIdExcludeFilter=!mstrApp.isFFSQL?[41,15]:[41];this.dbRoleEditorCfg.cfgDbmsTypeExcludeFilter=!mstrApp.isFFSQL?[3000]:[];},dbRoleEditorCfg:{hideShareConnection:true,dbIdExcludeFilter:[41]},createReportInstance:function createReportInstance(xdatype,connectorType){var model=this,isNew=model.isNew=!mstrApp.tableID;model.supportTimeGeo=true;model.analysisID=mstrApp.analysisID;model.tableID=mstrApp.tableID;var dataService=mstrApp.getRootController().getDataService(),isFFSQL=mstrApp.isFFSQL,createEmmaTable=function createEmmaTable(xdatype,connectorType){dataService.createEmmaTable({success:function success(res){model.tableID=res.tbid;mstrApp.msgid=res.msgid;}},{xt:xdatype,dict:connectorType});};mstrApp.msgid=mstrApp.msgID;if(isNew){if(mstrApp.msgid){model.originalMsgID=mstrApp.msgid;dataService.removeOrDuplicateRI({success:function(res){mstrApp.msgid=res.msgid;createEmmaTable(xdatype,connectorType);}},{messageID:mstrApp.msgid});}else{dataService.createEmmaInstance({success:function success(res){mstrApp.msgid=res.msgid;createEmmaTable(xdatype,connectorType);}});}}else{model.originalMsgID=mstrApp.msgid;dataService.removeOrDuplicateRI({success:function(res){mstrApp.msgid=res.msgid;model.firstTimeLoading=true;var loadFlag=$DI_CONSTANTS.ERDF.ENUM_LOAD_REPORT_BROWSE_TYPE_BINDINGTABLE+$DI_CONSTANTS.ERDF.ENUM_LOAD_REPORT_BROWSE_TYPE_DATAPREVIEW;model.loadReport(loadFlag,$DI_CONSTANTS.ERDF.ENUM_LOAD_REPORT_BINDING_FLAG_ALL,$DI_CONSTANTS.ERDF.ENUM_LOAD_REPORT_PREVIEW_FLAG_MappingInfo+$DI_CONSTANTS.ERDF.ENUM_LOAD_REPORT_PREVIEW_FLAG_SourceInfo,null,{success:function success(res){if(isFFSQL){model.populateFFSQLSrcTblClnInfo();loadFFSQLDefinition.call(model,res);}else{var managedDBRoleID=!model.isBigQuery&&model.findManagedDBR();if(managedDBRoleID){model.fetchAndAppendSingleDBR(managedDBRoleID);}loadQBDefinition.call(model,res);}if(mstrApp.isCloud){mstrApp.getRootController().getDataService().autoClosePrompt({success:function success(res){mstrApp.msgid=res.msgid;}});}}});}},{messageID:mstrApp.msgid});}if(mstrApp.isFFSQL){model.set("isFFSQL",true);model.set("FFSQLMode",true);mstrApp.isFFSQLMode=true;}},loadDefinition:function loadDefinition(data){loadQBDefinition.call(this,data);},remap:function remap(data,callbacks){mstrApp.getRootController().getDataService().changeMapping({success:function success(res){if(callbacks&&callbacks.success){callbacks.success(res);}}},{tbid:this.tableID,mpcs:JSON.stringify([data]),docid:mstrApp.docID||""});},loadEmmaReport:function loadEmmaReport(callbacks,silent,previewOnly,loadBindingTables){var model=this,browseType=!loadBindingTables?$DI_CONSTANTS.ERDF.ENUM_LOAD_REPORT_BROWSE_TYPE_DATAPREVIEW:$DI_CONSTANTS.ERDF.ENUM_LOAD_REPORT_BROWSE_TYPE_BINDINGTABLE+$DI_CONSTANTS.ERDF.ENUM_LOAD_REPORT_BROWSE_TYPE_DATAPREVIEW,previewFlag=getPreviewFlag(model);if(!validateParams.call(model,callbacks)){return ;}model.loadReport(browseType,$DI_CONSTANTS.ERDF.ENUM_LOAD_REPORT_BINDING_FLAG_ALL,previewFlag,null,{success:function success(res){model.isDirty=false;if(!silent){var datap=res.datap,maps=datap.maps,dataset=datap.data;if(model.FFSQLMode){model.populateFFSQLMapping(maps);model.populateFFSQLSrcTblClnInfo();model.populateDataset(dataset);}else{model.populatePreview(maps,dataset);}raiseDataPreviewEvent(model);}if(callbacks&&callbacks.success){callbacks.success(res);}}});},autoMap:function autoMap(callbacks,silent,previewOnly,loadBindingTables){var dataService=mstrApp.getRootController().getDataService(),model=this,params;if(!validateParams.call(model,callbacks)){return ;}params={tbid:model.tableID,isDB:true,taskId:"DIAutoMappingEMMASourceTable"};if(!model.isNew&&(mstrApp.isFFSQL||!model.FFSQLMode)){params.behaviorFlags=16;}if(!model.isDirty&&model.isNew){model.loadEmmaReport(callbacks,silent,previewOnly,loadBindingTables);return ;}var doAutoMap=function(){model.submitRequest({success:function success(){model.loadEmmaReport(callbacks,silent,previewOnly,loadBindingTables);},failure:function failure(res){if(callbacks&&callbacks.failure){callbacks.failure(res);}}},params);};model.processEmmaTable({success:function success(){doAutoMap();},canceled:function(reqId,result){var cb={success:function(){if(callbacks&&callbacks.canceled){callbacks.canceled();}},failure:function(){if(callbacks&&callbacks.canceled){callbacks.canceled();}}};if(result&&(result.tid||result.jid)){dataService.killJob(cb,{threadId:result.tid,jobid:result.jid});}else{cb.success();}}},{tables:model.tableID});},processEmmaTable:function(callback,params){var dataService=mstrApp.getRootController().getDataService();dataService.clearDataCache({success:function(res){dataService.prepareData(callback,params,1,1,$DESC(9130,"Execute SQL"));},failure:function(res){dataService.prepareData(callback,params,1,1,$DESC(9130,"Execute SQL"));}},params);},buildRelations:function buildRelations(callbacks){mstrApp.getRootController().getDataService().buildRelations({success:function success(res){if(callbacks&&callbacks.success){callbacks.success(res);}}},{did:this.tableID});},loadDBTypeFilters:function loadDBTypeFilters(callback){var $this=this;$this.dbObjects.populateDBProperties(mstrmojo.func.wrapMethods({success:function success(){var filterTypes=[],disp=$this.dbObjectsDisplayOptions;$H.forEach($this.dbObjects.dbTypes,function(dbType){if((dbType.disp&disp)===disp){filterTypes.push(dbType.v);}});$this.dbmsTypeFilter=filterTypes;$this.dbRolesTypeFilter=filterTypes;}},callback));},cleanDuplicateRI:function cleanDuplicateRI(cancel){var messageID;if(this.originalMsgID&&this.originalMsgID!==mstrApp.msgid){if(cancel){messageID=mstrApp.msgid;mstrApp.msgid=this.originalMsgID;}else{messageID=this.originalMsgID;}mstrApp.getRootController().getDataService().removeOrDuplicateRI({success:mstrmojo.emptyFn},{add:false,messageID:messageID,showWait:false});delete this.originalMsgID;}},submitRequest:function submitRequest(callback,params,fn){if(params.showWait===undefined){params.showWait=true;}mstrApp.getRootController().getDataService()[fn||"submitRequest"](callback,params);},getHelpTopic:function getHelpTopic(){return this.FFSQLMode?"Importing_data_from_a_database_by_typing_a_query.htm":"Importing_data_from_a_database_by_building_a_SQL_q.htm";}});}());