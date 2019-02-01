(function(){mstrmojo.requiresCls("mstrmojo.Box","mstrmojo.hash","mstrmojo.array","mstrmojo.dom","mstrmojo.string","mstrmojo.Editor","mstrmojo.warehouse.WHModel","mstrmojo.warehouse.dbroles.DBRoleHelper","mstrmojo.DI.DIHelpers");mstrmojo.requiresDescs(8538,8513,2523,2399,13708,1162,11134,15858);var $HASH=mstrmojo.hash,$ARR=mstrmojo.array,$DOM=mstrmojo.dom,$S=mstrmojo.string,$DCFLAGS=mstrmojo.warehouse.WHModel.DssCatalogFlags,$DBRHLP=mstrmojo.warehouse.dbroles.DBRoleHelper,$DIHLP=mstrmojo.DI.DIHelpers;function getWaitBoxCfg(){var config={position:{}};var pos=$DOM.position(this.titleContainerNode,true);config.position.top=pos.h+pos.y;return config;}function getDBPObj(dbp,params){var TYPE_LIST="list";var ret={field:dbp.field,fieldV:params[dbp.field]||dbp.defaultValue,IDS:dbp.IDS,tp:dbp.tp,req:dbp.req};if(dbp.tp===TYPE_LIST){ret.options=dbp.options;}return ret;}function populateDataFromDBProperties(fbDBID){var dbRole=this.data.dbRole,dbInfo=dbRole.dbmsObj.DBInfo,connstr=dbRole.connstr,dbID=fbDBID||dbRole.ab,dbv,connections=null,dbp=[];if(dbRole.def){dbRole.db_ver=dbRole.def.dbv;}dbv=dbRole.db_ver;var dbObj=this.DBInfo.DBS[$ARR.find(this.DBInfo.DBS,"id",dbID)];if(dbObj){var dbvObj=dbObj.dbVersions[$ARR.find(dbObj.dbVersions,"v",dbv)];if(dbvObj){connections=dbvObj.connections.concat(dbvObj.altconnections);var params=$DBRHLP.extractParams(connections,connstr);if(params.noDriverMatched){if(!fbDBID){var fbDB=$DBRHLP.getFallbackDB(dbID,this.DBInfo.dbIDs);if(fbDB&&fbDB.dbID){populateDataFromDBProperties.call(this,fbDB.dbID);return ;}}}else{this.connectionTemplate=connections[params.matchIndex].str;var selectedDBP=$DBRHLP.getSelectedDBPSection(dbvObj.DBPS,params).DBP;$ARR.forEach(selectedDBP,function(e){dbp.push(getDBPObj(e,params));});}}dbInfo.n=dbObj.n;}dbInfo.DBS=[{dbVersions:[{DBPS:[{DBP:dbp}]}]}];}function updateConnectionString(field,valueWas,value){if(!updateConnectionString.cache){updateConnectionString.cache={};}var connstrWas=this.connectionStringBox.connectionStringArea.value;var cache=updateConnectionString.cache;if(!cache[field]){var keyPattern=new RegExp("[;,]([^;,=]+)=\\s*@"+$S.regEscape(field));var matched=keyPattern.exec(this.connectionTemplate);if(matched){cache[field]=matched[1].trim().toUpperCase();}else{return connstrWas;}}var key=cache[field];var replacePattern=new RegExp("("+$S.regEscape(key)+")\\s*=\\s*"+$S.regEscape(valueWas),"i");var str="$1="+value;return connstrWas.replace(replacePattern,str);}function populateControls(){var container=this.dbInfoBox,dsnlessBox=this.dsnlessBox,dbRole=this.data.dbRole,DBS,dbmsObj=dbRole.dbmsObj,buildControl=function buildControl(prop){var setting,caption=mstrmojo.desc(prop.IDS,prop.n),value=prop.fieldV;if(caption&&caption[caption.length-1]!==":"){caption+=":";}switch(prop.tp){case"token":setting=new mstrmojo.warehouse.dbroles.DBRoleSetting({caption:caption,value:"",isRequired:prop.req,onvalueChange:function(evt){var editor=this.parent.parent;var connstr=updateConnectionString.call(editor,prop.field,evt.valueWas,evt.value);editor.connectionStringBox.connectionStringArea.set("value",connstr);}});break;case"text":case"number":setting=new mstrmojo.warehouse.dbroles.DBRoleSetting({caption:caption,value:value});setting.set("text",value);break;case"list":setting=new mstrmojo.warehouse.dbroles.DBRoleSettingPulldown({caption:caption,itemIdField:"v",itemField:"v"});setting.render();setting.set("items",prop.options);setting.set("selectedID",value);break;case"boolean":setting=new mstrmojo.warehouse.dbroles.DBRoleSettingCheckbox({label:caption,driverMode:1});setting.render();setting.setValue(value);break;}if(prop.tp!=="token"){setting.set("enabled",false);}return setting;};DBS=dbmsObj.DBInfo.DBS[0]&&dbmsObj.DBInfo.DBS[0].dbVersions[0].DBPS[0].DBP;if(DBS){mstrmojo.array.forEach(DBS,function(property){container.addChildren([buildControl(property)]);});}var dbName=dbmsObj.DBInfo.n;var dbVer=$HASH.walk("def.dbmsv",dbmsObj);dsnlessBox.database.set("enabled",false);dsnlessBox.database.list.set("value",dbName);dsnlessBox.version.set("enabled",false);dsnlessBox.version.list.set("value",dbVer?dbVer:dbmsObj.n);this.txtlogin.set("text",dbRole.ln||"");this.txtpwd.set("text",dbRole.password||"");this.txtname.set("text",dbRole.n);this.txtname.set("enabled",false);this.connectionStringBox.connectionStringArea.set("value",dbRole.connstr);}mstrmojo.onetier.vi.ui.DBCredentialEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.onetier.vi.ui.DBCredentialEditor",title:"Data Source",data:undefined,DBInfo:null,connectionTemplate:null,cssClass:"mstrmojo-DBCredentialEditor",children:[{alias:"dsnlessBox",scriptClass:"mstrmojo.Box",children:[{scriptClass:"mstrmojo.warehouse.dbroles.DBRoleSettingPulldown",alias:"database",caption:mstrmojo.desc(8538,"Database:")},{scriptClass:"mstrmojo.warehouse.dbroles.DBRoleSettingPulldown",alias:"version",caption:mstrmojo.desc(2523,"Version:")}]},{alias:"dsnBox",scriptClass:"mstrmojo.Box",visible:false,children:[{scriptClass:"mstrmojo.warehouse.dbroles.DBRoleSettingPulldown",alias:"dsn",caption:"dsn:"},{scriptClass:"mstrmojo.warehouse.dbroles.DBRoleSettingPulldown",alias:"version",caption:mstrmojo.desc(2523,"Version:")}]},{alias:"dbInfoBox",scriptClass:"mstrmojo.Box",visible:true,isValid:function(){var ret={val:true,msg:""};$ARR.forEach(this.children,function(e){ret=e.isValid();return ret.val;});return ret;}},{scriptClass:"mstrmojo.warehouse.dbroles.DBRoleSetting",alias:"txtlogin",isRequired:true,caption:mstrmojo.desc(8513,"login:")},{scriptClass:"mstrmojo.warehouse.dbroles.DBRoleSetting",alias:"txtpwd",isPassword:true,isRequired:true,caption:mstrmojo.desc(1162,"password:")},{scriptClass:"mstrmojo.warehouse.dbroles.DBRoleSetting",alias:"txtname",caption:mstrmojo.desc(11134,"ds name:")},{scriptClass:"mstrmojo.Box",alias:"connectionStringBox",cssClass:"mstrmojo-DBCredentialEditor-connectionBox",children:[{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-wh-DBRoleSetting-Label",text:mstrmojo.desc(14928,"Connection String")+":",enabled:false},{scriptClass:"mstrmojo.TextArea",cssClass:"mstrmojo-wh-DBRoleConnection-ConnectionString mstrmojo-DBCredentialEditor-connectionBox-textArea",value:"",alias:"connectionStringArea",maxLength:1024,enabled:false}]},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-buttonBar",alias:"buttonBar",slot:"buttonNode",children:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton hot",alias:"OK",text:mstrmojo.desc(13708,"Test & Save Changes"),onclick:function(){var editor=this.parent.parent,data=editor.data,dbInfoBox=editor.dbInfoBox,txtlogin=editor.txtlogin,txtpwd=editor.txtpwd,connstr=editor.connectionStringBox.connectionStringArea.value,result,waitBoxCfg,onFailure=function(){mstrmojo.error({shortDesc:mstrmojo.desc(15858,"The connection to the database failed. Please check the connectivity information and try again.")},mstrmojo.emptyFn,{enableContactStr:false});},onSuccess=function(res){if(res.dbr||!(mstrApp.isSingleTier&&!(mstrApp.getWSLiveMode&&mstrApp.getWSLiveMode()))){data.set("credentialsFetched",true);data.dbRole.ln=txtlogin.getValue();data.dbRole.password=txtpwd.getValue();editor.close();}else{onFailure();}};result=dbInfoBox.isValid();if(!result.val){mstrmojo.alert(result.msg);return ;}result=txtlogin.isValid();if(!result.val){mstrmojo.alert(result.msg);return ;}result=txtpwd.isValid();if(!result.val){mstrmojo.alert(result.msg);return ;}waitBoxCfg=getWaitBoxCfg.call(editor);if(mstrApp.isSingleTier&&!(mstrApp.getWSLiveMode&&mstrApp.getWSLiveMode())){mstrApp.serverRequest({taskId:"setDBCredentials",dbroleinfo:JSON.stringify($HASH.copy({ln:txtlogin.getValue(),password:txtpwd.getValue(),connstr:connstr},$HASH.copy(data.dbRole)))},{success:function success(res){onSuccess(res);}},{doNotHold:true,showProgress:true},waitBoxCfg);}else{mstrApp.serverRequest({taskId:"arch.saveDBRole",dbroleinfo:JSON.stringify($HASH.copy({ln:txtlogin.getValue(),password:txtpwd.getValue(),connstr:connstr},$HASH.copy(data.dbRole)))},{success:function success(res){var docModelData=mstrApp.docModelData||(mstrApp.launchingApp&&mstrApp.launchingApp.docModelData),messageId=docModelData&&docModelData.mid;mstrApp.serverRequest({taskId:"arch.catalogAction",dbrid:res.dbr.did,flags:$DCFLAGS.DssCatalogApplyConnectionMapping|$DCFLAGS.DssCatalogGetNamespaces,msgid:messageId,sessionState:mstrApp.sessionState,styleName:"RWDocumentMojoStyle"},{success:function(res){onSuccess(res);},failure:function(res){onFailure();}},{doNotHold:true,silent:true});},failure:function failure(res){onFailure();}},{doNotHold:true,waitBoxCfg:waitBoxCfg});}}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",alias:"cancel",text:mstrmojo.desc(2399,"Cancel"),onclick:function(){var editor=this.parent.parent;editor.close();editor.destroy();}}]}],postBuildRendering:function postBuildRendering(props){this._super(props);var self=this;var waitBoxCfg=getWaitBoxCfg.call(this);mstrApp.serverRequest({taskId:"arch.getDBObjects",flags:8},{success:function(res){self.DBInfo=$DIHLP.applyDriverSuffix(res.DBInfo);populateDataFromDBProperties.call(self);populateControls.call(self);self.positionDialog();}},{showProgress:true,hideFailureErr:false,waitBoxCfg:waitBoxCfg},waitBoxCfg);}});}());