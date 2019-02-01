(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.DI.DIRootView","mstrmojo.DI.DIExpressView","mstrmojo.DI.DIModel","mstrmojo.DI.DIRootController","mstrmojo.Editor","mstrmojo.DI.DIConstants","mstrmojo.ServerProxy","mstrmojo.XHRServerTransport","mstrmojo.form","mstrmojo._IsWebApp","mstrmojo.AS.ASDIRootController");mstrmojo.requiresDescs(12537,12538);var constants=mstrmojo.DI.DIConstants,$CSS=mstrmojo.css,$DOM=mstrmojo.dom,_beforeunloadEvtListener=null,$HELPER=mstrmojo.DI.DIHelpers;var PROGRESS_BAR_ID="progressBar",progressBarIEConfig={scriptClass:"mstrmojo.Editor",id:PROGRESS_BAR_ID,showTitle:false,help:null,zIndex:99,cssClass:"mstrmojo-di-progressBar",children:[{scriptClass:"mstrmojo.ProgressBar",alias:"progress",cssClass:"mstrmojo-di-progress stripes"}],onremoveChild:function(evt){var children=evt.value;for(var i=0;i<children.length;i++){children[i].destroy();}},postCreate:function(){this.counter=0;},updateProgress:function progressValue(value){this.progress.updateProgress(value);},progressTextValue:function progressTextValue(value){if(this.progress){this.progress.set("progressText",value);}},open:function open(opener,config){if((++this.counter>0&&!this.visible)||config.manually){mstrmojo.Editor.prototype.open.call(this,opener,config);}},close:function close(config){var counter=this.counter=Math.max(0,this.counter-1);if((counter<=0&&this.visible)||config.manually){if(!this.manually||config.manually){this.counter=0;this.manually=false;mstrmojo.Editor.prototype.close.call(this,config);this.updateProgress(0);}}}};mstrmojo.DI.DIApp=mstrmojo.declare(mstrmojo.Obj,[mstrmojo._IsWebApp],{isDI:true,enableWaitBox:true,getWaitBoxPosition:function(){var cfg={};if(!$HELPER.getEnvObj().isAppSchema()){var pos=mstrmojo.dom.position(this.rootController.rootView.headerNode,true);if(pos&&pos.h!==0&&pos.y!==0){cfg.top=pos.h+pos.y;}}else{var posHeader=mstrmojo.dom.position(this.rootController&&this.rootController.rootView&&this.rootController.rootView.headerNode),posFooter=mstrmojo.dom.position(this.rootController&&this.rootController.rootView&&this.rootController.rootView.footerNode),isCreated=posHeader&&posHeader.y!==0&&posFooter&&posFooter.h!==0&&posFooter.y!==0,WAIT_BOX_HEIGHT=48;if(isCreated){cfg.top=(posFooter.h+posFooter.y-posHeader.y-WAIT_BOX_HEIGHT)/2;}}return cfg;},start:function start(){$CSS.addClass(document.body,mstrApp.isSingleTier&&$DOM.getOSInfo().name.toLowerCase().indexOf("mac")>-1?"mac":"none-mac");if(mstrApp.isWorkstation||mstrApp.isFromVI){$CSS.addClass(document.body,"workstation");}else{if(!mstrApp.isSingleTier){this.addedWSClass=true;$CSS.addClass(document.body,"workstation");}}var view;if(mstrApp.diParams.StatusCode===undefined||mstrApp.diParams.StatusCode===constants.operationMode.edit||mstrApp.diParams.StatusCode===constants.operationMode.create||mstrApp.diParams.StatusCode===constants.statusCode.pickTable||mstrApp.diParams.StatusCode===constants.statusCode.hadoopPickTable||mstrApp.diParams.StatusCode===constants.statusCode.ffsql||mstrApp.diParams.StatusCode===constants.statusCode.hadoopFFsql){view=mstrApp.isCloudPro?new mstrmojo.DI.DIExpressView({placeholder:this.placeholder}):new mstrmojo.DI.DIRootView({placeholder:this.placeholder,cssClass:"mojo-theme-light"});}else{view=new mstrmojo.Box({placeholder:this.placeholder});}var config={model:new mstrmojo.DI.DIModel({id:"DIModel"}),rootView:view,scriptClass:this.rootControllerCls||"mstrmojo.DI.DIRootController"};var controller=this.rootController=mstrmojo.insert(config);this.addDisposable(controller);controller.start();_beforeunloadEvtListener=this.beforeUnload.bind(controller);$DOM.attachEvent(window,"beforeunload",_beforeunloadEvtListener);},destroy:function destroy(ignoreDom){if(_beforeunloadEvtListener){$DOM.detachEvent(window,"beforeunload",_beforeunloadEvtListener);_beforeunloadEvtListener=null;}this._super(ignoreDom);if(this.addedWSClass){$CSS.removeClass(document.body,"workstation");}this.cleanUpDIStyles();},beforeUnload:function(evt){var ctrl=this;return ctrl.beforeDIUnload(evt);},restart:function restart(config){var di=document.getElementById(this.rootController.rootView.id);var ph=document.createElement("div");ph.id=this.placeholder||"DIApp";mstrmojo.dom.replace(di,ph);this.rootController.destroy();if(mstrmojo.all[PROGRESS_BAR_ID]){mstrmojo.all[PROGRESS_BAR_ID].destroy();}mstrmojo.hash.copy(config,this.diParams);this.start();},getRootController:function getRootController(){return this.rootController;},applicationName:function applicationName(){var app=constants.application,name;if(this.diParams.CloudEdition===app.cloudProfessional){name=mstrmojo.desc(12538,"MicroStrategy Express");}else{if(this.diParams.CloudEdition===app.cloudPersonal){name=mstrmojo.desc(12538,"MicroStrategy Express");}else{name=mstrmojo.desc(12537,"Data Import");}}return name;},executeCommand:function executeCommand(cmdId,cmdValue){this.serverProxy.cancelRequests();if(typeof this[cmdId]==="function"){this[cmdId](cmdValue);}else{this.getRootController().executeCommand(cmdId,cmdValue);}},showProgress:function showProgress(config){if(!config){config={message:mstrmojo.desc(5720,"Waiting...")};}if(config.showCancel===undefined){config.showCancel=false;}if(config.showProgressText&&config.progressText){config.message=config.progressText;}this.showWait(config);},hideProgress:function hideWait(manually){this.hideWait(manually);},setProgressParams:function setProgressParams(complete,config){var progressBar=mstrmojo.all[PROGRESS_BAR_ID];if(progressBar){if(config&&config.showProgressText){progressBar.progressTextValue(config.progressText);progressBarIEConfig.progressTextValue(config.progressText);}if(complete){progressBar.updateProgress(complete);}}else{if(config&&config.showProgressText){progressBarIEConfig.progressTextValue(config.progressText);}if(complete){progressBarIEConfig.updateProgress(complete);}}},onFormWrapperClick:function onFormWrapperClick(){window.document.body.dispatchEvent(new Event("mousedown"));},serverResponse:function serverResponse(id,methodName,requestID,status,responseJSON){if(responseJSON===undefined){responseJSON={};}mstrmojo.all[id][methodName](requestID,!!status,responseJSON);},activeRequests:[],serverRequest:function serverRequest(params,callback,config,waitBoxCfg){var reqCfg={},app=this;if(config.hideFailureErr===undefined){reqCfg.hideFailureErr=true;}mstrmojo.hash.copy(config,reqCfg);reqCfg.silent=!config.showProgress;reqCfg.waitBoxCfg=waitBoxCfg||{showCancel:false};reqCfg.waitBoxCfg.position=app.getWaitBoxPosition();if(config.showProgress&&config.showProgressText){reqCfg.waitBoxCfg.message=config.progressText;}this.activeRequests.push(params);callback=mstrmojo.func.wrapMethods({complete:function(){app.activeRequests.splice(mstrmojo.array.indexOf(app.activeRequests,params),1);}},callback,{});this._super(params,callback,reqCfg);},serverRequestQueue:function serverRequestQueue(params,callback,taskQueue){if($HELPER.getEnvObj().isWS()){this.serverRequestParallelNative(params,callback,taskQueue);}else{this.serverRequestParallel(params,callback,taskQueue);}},serverRequestParallel:function serverRequestParallel(params,callback,XhrQueue){window.setTimeout(this.serverProxy.serverRequestParallel.bind(this.serverProxy,params,callback,XhrQueue),0);},redirectToPage:function redirectToPage(params){this.showProgress();mstrmojo.form.send(params,mstrApp.name,"POST",null,null,false);},updateSessionState:function updateSessionState(sessionState){this._super(sessionState);if(this.activeRequests){this.activeRequests.forEach(function(params){if(params.sessionState){params.sessionState=sessionState;}});}},oneTierOAuthHandler:function oneTierOAuthHandler(code){if(this.rootController.oAuthController){this.rootController.oAuthController.oneTierOAuthHandler(code);}},sdkConnectorOAuthHandler:function sdkConnectorOAuthHandler(code){mstrApp.getRootController().model.raiseEvent({name:"getConnectorParameter",data:code});},cleanUpDIStyles:function(){var links,dataImportCSS;if($HELPER.getEnvObj().isWeb()){links=document.querySelectorAll('link[rel=stylesheet][href*="/data-import"]');if(links.length>0){dataImportCSS=links[0];if(dataImportCSS.parentNode){dataImportCSS.parentNode.removeChild(dataImportCSS);if(window.microstrategy!==undefined&&microstrategy){var CSSLinkURI=microstrategy.resourceLoader.buildURI("data-import.css","css",true);if(microstrategy.resourceLoader.status){delete microstrategy.resourceLoader.status[CSSLinkURI];}}}}}}});window.$MAPF=function(){return false;};}());