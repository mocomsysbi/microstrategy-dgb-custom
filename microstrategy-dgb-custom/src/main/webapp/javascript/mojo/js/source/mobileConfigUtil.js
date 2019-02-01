(function(){mstrmojo.requiresCls("mstrmojo._CanValidate","mstrmojo.Label","mstrmojo.Obj","mstrmojo.string","mstrmojo.color","mstrmojo.css","mstrmojo.locales");mstrmojo.locales.validation.requiredFieldError=mstrmojo.desc(6078);mstrmojo.locales.validation.invalidCharError=mstrmojo.desc(7899);mstrmojo.locales.validation.integerDataType=mstrmojo.desc(6076);mstrApp.onSessionExpired=function(){loginBox.lastProject=null;loginBox.lastSession=null;lwrLoginBox.lastProject=null;lwrLoginBox.lastSession=null;mobileConfigPopup.set("mode",POPUP_LOGIN);lightWeightReconcilePopup.set("mode",POPUP_LOGIN);};var _S=mstrmojo.string,_CLR=mstrmojo.color,_H=mstrmojo.hash,_D=mstrmojo.dom;function isLoginRequired(authMode){return(authMode!=mstrmojo.mobileConfigUtil.PRJ_AUTHEN_WIN)&&(authMode!=mstrmojo.mobileConfigUtil.PRJ_AUTHEN_TRUSTED)&&(authMode!=mstrmojo.mobileConfigUtil.PRJ_AUTHEN_INTEGRATED);}var POPUP_CLOSED=0,POPUP_LOGIN=1,POPUP_OBJECTBROWSER=2,POPUP_TRIGGERLIST=3;function _loginBox(props){return _H.copy(props||{},{scriptClass:"mstrmojo.Table",alias:"loginBox",cssClass:"mobileConfig-loginBox",cellPadding:2,cols:2,rows:5,onwaitChange:function(){this.waitIcon.set("visible",this.wait);mstrmojo.css.toggleClass(this.domNode,["disabled"],this.wait);},restoreSession:function(){var last=this.lastProject,curr=this.selectedProject,flag=last&&(last.v==curr.v)&&(last.iServer==curr.iServer)&&(last.authMode==curr.authMode);if(flag){this.sessionID=this.lastSession;}return flag;},closeSession:function(){if(this.sessionID!=null){if(this.parent.opener.reuseSession){this.lastSession=this.sessionID;this.lastProject=this.selectedProject;}else{mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:function(res){},failure:function(){}},{taskId:"closeSessions",sessionStates:this.sessionID},false,this.selectedProject.webServer);}this.sessionID=null;}},children:[{scriptClass:"mstrmojo.Label",cssText:"width: 80px; margin:0px",text:mstrmojo.desc(4446),slot:"0,0"},{scriptClass:"mstrmojo.SelectBox",alias:"projects",cssText:"width:230px; margin:0px",showItemTooltip:true,size:1,bindings:{visible:"!this.items || this.items.length != 1"},onitemsChange:function(){if(this.items&&this.items.length>0){this.set("selectedIndex",0);}},onchange:function(){if(this.selectedItem){var needLogin=isLoginRequired(this.selectedItem.authMode);this.parent.set("selectedProject",this.selectedItem);this.parent.uid.set("enabled",needLogin);this.parent.password.set("enabled",needLogin);}},slot:"0,1"},{scriptClass:"mstrmojo.Label",cssClass:"mobileConfig-loginBox-projectLabel",bindings:{visible:"!this.parent.projects.visible",text:"this.parent.projects.items[0].n"},slot:"0,1"},{scriptClass:"mstrmojo.Label",cssText:"width: 80px; margin:0px",text:mstrmojo.desc(1161),slot:"1,0"},{scriptClass:"mstrmojo.TextBox",cssText:"width:220px; margin:0px",alias:"uid",onkeyup:function(evt){var hWin=evt.hWin,e=evt.e||hWin.event;if(e.keyCode===13){this.parent.loginButton.onclick();}},slot:"1,1"},{scriptClass:"mstrmojo.Label",cssText:"width: 80px; margin:0px",text:mstrmojo.desc(1162),slot:"2,0"},{slot:"2,1",scriptClass:"mstrmojo.TextBox",cssText:"width:220px; margin:0px",type:"password",alias:"password",onkeyup:function(evt){var hWin=evt.hWin,e=evt.e||hWin.event;if(e.keyCode===13){this.parent.loginButton.onclick();}}},{slot:"3,0",scriptClass:"mstrmojo.Label",bindings:{visible:"(this.parent.projects.selectedItem.authMode === mstrmojo.mobileConfigUtil.PRJ_AUTHEN_STD || this.parent.projects.selectedItem.authMode === mstrmojo.mobileConfigUtil.PRJ_AUTHEN_LDAP) && this.parent.selectedProject.tfa"},text:mstrmojo.desc(16216)},{slot:"3,1",scriptClass:"mstrmojo.TextBox",alias:"tsvCode",bindings:{visible:"(this.parent.projects.selectedItem.authMode === mstrmojo.mobileConfigUtil.PRJ_AUTHEN_STD || this.parent.projects.selectedItem.authMode === mstrmojo.mobileConfigUtil.PRJ_AUTHEN_LDAP) && this.parent.selectedProject.tfa"},onkeyup:function(evt){var hWin=evt.hWin,e=evt.e||hWin.event;if(e.keyCode===13){this.parent.loginButton.onclick();}}},{slot:"4,1",scriptClass:"mstrmojo.HTMLButton",alias:"loginButton",text:mstrmojo.desc(4020),cssText:"margin-left: 20px;",cssClass:"mstrButton",bindings:{enabled:"this.parent.projects.items.length > 0"},onclick:function(){var needLogin=isLoginRequired(this.parent.selectedProject.authMode),me=this;mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:function(res){if(res!=null){me.parent.sessionID=res.sessionState;me.parent.parent.set("mode",me.parent.parent.targetMode);}},failure:function(res){mstrmojo.mobileConfigUtil.showErrorMsgBox(mstrmojo.desc(422));me.parent.parent.close();},complete:function(){me.parent.set("wait",false);}},{taskId:"login",server:me.parent.selectedProject.iServer,project:me.parent.selectedProject.project,userid:(needLogin)?me.parent.uid.value:"",password:(needLogin)?me.parent.password.value:"",authMode:me.parent.selectedProject.authMode,tsvCode:(needLogin)?loginBox.tsvCode.value:""},false,me.parent.selectedProject.webServer);me.parent.set("wait",true);}},{slot:"4,1",scriptClass:"mstrmojo.HTMLButton",cssText:"margin-left: 35px;",cssClass:"mstrButton",text:mstrmojo.desc(221),onclick:function(){this.parent.parent.close();}},{slot:"5,0",scriptClass:"mstrmojo.WaitIcon",alias:"waitIcon",cssClass:"mobileConfig-waitIcon"}]});}var objectBrowserBox=mstrmojo.insert({id:"objectBrowserBox",alias:"objectBrowserBox",scriptClass:"mstrmojo.VBox",callbackOnSelect:function(item){var currentFolder=this.objectBrowser.currentFolder,anc=currentFolder.anc.items[0],path=anc.n,temp=anc.items&&anc.items[0],me=this;while(temp){path+="\\"+temp.n;temp=temp.items&&temp.items[0];}if(currentFolder!=item){path+="\\"+item.n;}var objInfo={oi:{did:item.did,pt:path,pid:this.parent.loginBox.selectedProject.v,t:item.t,st:item.st,n:item.n,psu:me.parent.loginBox.selectedProject.webServer,fid:item.pf||currentFolder.did}};if(mobileConfigPopup.opener.allowCheckSubscription){objInfo.csp=true;}mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:function(res){if(res!==null){objInfo.oi.ab=res.objects[0].ab;objInfo.oi.dsc=res.objects[0].desc;objInfo.oi.avm=res.objects[0].avm;}else{objInfo.oi.dsc="";objInfo.oi.avm=0;}var dropdown=mobileConfigPopup.opener,target=dropdown.target,targetType=dropdown.targetType,targetObj=target[targetType];if(!targetObj){target.set(targetType,new mstrmojo.Obj(objInfo));}else{targetObj.set("oi",objInfo.oi);targetObj.set("csp",objInfo.csp);}},failure:function(){objInfo.oi.dsc="";objInfo.oi.avm=0;},complete:function(){mobileConfigPopup.close();}},{taskId:"getObjectInfo",objectIDs:item.did,objectTypes:item.t,sessionState:me.parent.loginBox.sessionID},false,me.parent.loginBox.selectedProject.webServer);},onvisibleChange:function(){if(this.visible){var objectBrowser=this.objectBrowser;objBrowserDP=objectBrowser.dataProvider,objBrowserSearch=objectBrowser.searchUpBar.obSearchBox,config={method:"POST",path:mstrConfig.taskURL,XServer:this.parent.loginBox.selectedProject.webServer};_H.copy(config,objBrowserDP);_H.copy(config,objBrowserSearch);_H.copy({onSelectCB:[objectBrowserBox,"callbackOnSelect"],onCloseCB:[mobileConfigPopup,"close"],browsableTypes:mobileConfigPopup.opener.browsableTypes},objectBrowser);objectBrowser.sId=objBrowserSearch.sessionState=this.parent.loginBox.sessionID;objBrowserSearch.searchCache={};objBrowserSearch.objectTypes=mobileConfigPopup.opener.browsableTypes;objectBrowser.browse();}this.objectBrowser.set("visible",this.visible);this.choose.set("visible",this.visible&&(this.objectBrowser.browsableTypes=="8,17153"||this.objectBrowser.browsableTypes=="8"));this.switcher.set("visible",this.visible);},children:[{id:"objectBrowser",scriptClass:"mstrmojo.ObjectBrowser",alias:"objectBrowser",folderLinksContextId:14,upButtonVisible:true,closeOnSelect:false,useAnimate:false,closeable:false},{scriptClass:"mstrmojo.HTMLButton",alias:"choose",text:mstrmojo.desc(549),cssClass:"mstrButton",cssText:"width:100px",onclick:function(){this.parent.callbackOnSelect(this.parent.objectBrowser.currentFolder);}},{scriptClass:"mstrmojo.HTMLButton",alias:"switcher",text:mstrmojo.desc(221),cssClass:"mstrButton",cssText:"width:80px",onclick:function(){mobileConfigPopup.close();}}]});var triggerSelectorBox=mstrmojo.insert({scriptClass:"mstrmojo.Table",id:"triggerSelectorBox",alias:"triggerSelectorBox",cssClass:"triggerSelectorBox",rows:3,cols:1,onvisibleChange:function(){var me=this;if(this.visible){mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:function(res){var triggerList=triggerSelectorBox.triggerList;if(res.objList){var notEmty=res.objList.length>0;triggerList.set("items",notEmty?res.objList:[]);triggerList.set("selectedIndex",notEmty?0:-1);}},failure:function(){}},{taskId:"getSchedules",sessionState:me.parent.loginBox.sessionID},false,me.parent.loginBox.selectedProject.webServer);}else{this.set("items",null);}},children:[{slot:"0,0",scriptClass:"mstrmojo.Label",cssClass:"triggerListTitle",text:mstrmojo.desc(1090,"Choose a schedule:")},{slot:"1,0",scriptClass:"mstrmojo.SelectBox",alias:"triggerList",cssClass:"triggerList",size:1,showItemTooltip:true,itemDisplayField:"n",itemIdField:"id"},{slot:"2,0",scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrButton",cssText:"margin-left:10px; width:60px;",text:mstrmojo.desc(1442,"OK"),onclick:function(){var item=this.parent.triggerList.selectedItem;if(item){var dropdown=mobileConfigPopup.opener;dropdown.target.set(dropdown.targetType,{oi:{did:item.id,t:item.t,n:item.n}});}mobileConfigPopup.close();}},{slot:"2,0",scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrButton",cssText:"margin-left:10px; width:80px",text:mstrmojo.desc(221,"Cancel"),onclick:function(){mobileConfigPopup.close();}}]});var lwrDocumentBrowserBox=mstrmojo.insert({scriptClass:"mstrmojo.Table",cssClass:"mstrmojo-LwrDocumentBrowserBox",id:"lwrDocumentBrowserBox",alias:"lwrDocumentBrowserBox",visible:false,layout:[{cells:[{},{}]},{cells:[{colSpan:2}]},{cells:[{},{}]}],onvisibleChange:function(){if(this.visible){var me=this;if(!this.parent.opener.lwr){this.parent.opener.set("lwr",{ois:[]});}this.set("selectedItems",this.parent.opener.lwr.ois);this.lwrSelect.set("items",[{n:this.parent.opener.folder.oi.n,v:0},{n:"Current Selections",v:1}]);mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:function(res){_H.forEach(res.items,function(item){item.pid=me.parent.loginBox.selectedProject.v;item.fid=me.parent.opener.folder.oi.did;item.did=item.did||item.dssid;item.t=item.t||item.tp;item.st=item.st||item.stp;item.dsc=(item.desc==undefined)?"":item.desc;item.avm=(item.avm==undefined)?0:item.avm,item.psu=me.parent.loginBox.xServer;});me.list.set("selects",me.list.selectedItems);me.set("items",res.items);},failure:function(){mstrmojo.mobileConfigUtil.showErrorMsgBox(mstrmojo.desc(422));me.parent.onClose();}},{taskID:"searchMetadata",sessionState:me.parent.loginBox.sessionID,rootFolderID:me.parent.opener.folder.oi.did,objectType:"3,55",includeAncestorInfo:true,includeObjectDesc:true,showObjectTags:true},undefined,me.parent.loginBox.xServer);}},children:[{slot:"0,0",alias:"lwrSelect",scriptClass:"mstrmojo.SelectBox",cssClass:"mstrmojo-IphoneSettingAction-SelectBox",showItemTooltip:true,size:1,onselectionChange:function(){this.parent.list.set("selects",[]);for(var i in this.parent.list.selectedIndices){this.parent.list.selects.push(this.parent.list.items[i]);}if(this.selectedItem&&this.selectedItem.v==0){this.parent.list.set("items",this.parent.items);}else{if(this.selectedItem&&this.selectedItem.v==1){this.parent.list.set("items",this.parent.list.selects);}}}},{slot:"0,1",scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrButton",cssText:"width:45px",text:"clear",onclick:function(){this.parent.list.clearSelect();}},{slot:"1,0",scriptClass:"mstrmojo.List",cssClass:"",alias:"list",id:"lwrList",selectionPolicy:"toggle",allowUnlistedValues:false,cssClass:"mstrmojo-IphoneSettingAction-List",multiSelect:true,itemIdField:"did",itemField:"n",selects:[],itemMarkupFunction:function(item,idx,w){return'<div class="mstrmojo-IphoneSettingAction-ListItem"><div class="mstrmojo-checkBox-Container"><div class="mstrmojo-checkBox'+(item[w.itemCss]||"")+'"></div></div><div class="mstrmojo-text '+(item[w.itemCss]||"")+'" title="'+item[w.itemField]+'">'+(item[w.itemField]||"&nbsp;")+"</div></div>";},renderOnScroll:true,bindings:{selectedItems:"this.parent.selectedItems",items:"this.parent.items"},onitemsChange:function(){this.set("selectedIndices",[]);if(this.items&&this.selects){this.setSelectedItems(this.selects);}},onOK:function(){var items=this.items,opener=this.parent.parent.opener;this.set("selects",[]);for(var i in this.selectedIndices){this.selects.push(items[i]);}this.selectedItems=this.selects;if(opener){opener.set("lwr",{ois:this.selectedItems});opener.closePopup();}},onCancle:function(){var popup=this.parent.parent;if(popup){popup.onClose();}}},{slot:"2,0",scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrButton",cssText:"width: 80px",text:"OK",onclick:function(){this.parent.list.onOK();}},{slot:"2,1",scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrButton",cssText:"width: 80px; margin-left: -30px",text:"Cancel",onclick:function(){this.parent.list.onCancle();}}]});var loginBox=mstrmojo.insert(_loginBox({id:"loginBox"})),lwrLoginBox=mstrmojo.insert(_loginBox({id:"lwrLoginBox"}));var lightWeightReconcilePopup=mstrmojo.insert({scriptClass:"mstrmojo.Popup",id:"lwrPopup",cssClass:"mobileConfigPopup",slot:"popupNode",locksHover:true,mode:POPUP_CLOSED,children:[lwrLoginBox,lwrDocumentBrowserBox],onOpen:function(){this.lastOpener=this.lastOpener||this.opener;if(this.opener!==this.lastOpener){this.opener.popupNode.appendChild(this.lastOpener.popupRef.domNode);this.lastOpener=this.opener;}this.loginBox.projects.set("items",mstrmojo.all.mobileConfig.getProjects(this.opener.target.pid,this.opener.target.sn));this.targetMode=this.opener.mode;this.set("mode",(this.opener.reuseSession&&this.loginBox.restoreSession())?this.targetMode:POPUP_LOGIN);},onmodeChange:function(){this.lwrDocumentBrowserBox.set("visible",this.mode===POPUP_OBJECTBROWSER);this.loginBox.set("visible",this.mode===POPUP_LOGIN);},onClose:function(evt){this.loginBox.closeSession();this.lwrDocumentBrowserBox.list.clearSelect();this.set("mode",POPUP_CLOSED);},destroy:function(){document.body.appendChild(this.domNode);this.lastOpener={popupRef:{domNode:this.domNode}};},unrender:function(){}});var mobileConfigPopup=mstrmojo.insert({scriptClass:"mstrmojo.Popup",id:"mobileConfigPopup",cssClass:"mobileConfigPopup",slot:"popupNode",locksHover:true,mode:POPUP_CLOSED,children:[loginBox,objectBrowserBox,triggerSelectorBox],onOpen:function(){this.lastOpener=this.lastOpener||this.opener;if(this.opener!==this.lastOpener){this.opener.popupNode.appendChild(this.lastOpener.popupRef.domNode);this.lastOpener=this.opener;}this.loginBox.projects.set("items",mstrmojo.all.mobileConfig.getProjects(this.opener.target.pid,this.opener.target.sn));this.targetMode=this.opener.mode;this.set("mode",(this.opener.reuseSession&&this.loginBox.restoreSession())?this.targetMode:POPUP_LOGIN);},onmodeChange:function(){this.set("left",this.mode===POPUP_LOGIN?"-305px":"-175px");this.set("top",(this.mode!==POPUP_LOGIN&&mstrmojo.dom.isWK)?"-35px":"0px");this.objectBrowserBox.set("visible",this.mode===POPUP_OBJECTBROWSER);this.loginBox.set("visible",this.mode===POPUP_LOGIN);this.triggerSelectorBox.set("visible",this.mode===POPUP_TRIGGERLIST);},onClose:function(evt){this.loginBox.closeSession();this.set("mode",POPUP_CLOSED);},destroy:function(){document.body.appendChild(this.domNode);this.lastOpener={popupRef:{domNode:this.domNode}};},unrender:function(){}});var createDropDown=function(prop,targetMode){return _H.copy(prop,{scriptClass:"mstrmojo.DropDownButton",cssClass:"mobileConfig-popupButton",text:"   ",title:"",mode:targetMode,popupRef:mobileConfigPopup});};mstrmojo.mobileConfigUtil=mstrmojo.provide("mstrmojo.mobileConfigUtil",{DEVICE_IPHONE:1,DEVICE_IPAD:2,DEVICE_PHONE_UNIVERSAL:3,DEVICE_TABLET_UNIVERSAL:4,DEVICE_BLACKBERRY:5,DEVICE_IOS:6,DEVICE_ANDROID:7,DEVICE_ALL:8,DEFAULT_WEBSERVER:1,DEFAULT_PROJECT:2,DEFAULT_IPHONE_HOMESCREEN_BUTTON:3,DEFAULT_IPHONE_CUSTOM_HOMESCREEN:4,DEFAULT_IPAD_HOMESCREEN_BUTTON:5,DEFAULT_IPAD_CUSTOM_HOMESCREEN:6,DEFAULT_PHONE_UNIVERSAL_CUSTOM_HOMESCREEN:7,DEFAULT_TABLET_UNIVERSAL_CUSTOM_HOMESCREEN:8,DEFAULT_IPAD_PRECACHE_BUTTON:9999,HOMESCREEN_DEFAULT:1,HOMESCREEN_CUSTOM:2,HOMESCREEN_RD:3,HOMESCREEN_FOLDER:4,ACT_BROWSEFOLDER:1,ACT_RUNREPORT:2,ACT_FAVOURITES:3,ACT_SETTINGS:4,ACT_SHAREDLIBRARY:5,ACT_HELP:6,ACT_CLOUD:7,STYLE_GLASS:3,STYLE_FLAT:2,STYLE_NONE:1,FILL_SOLID:0,FILL_TRANSPARENT:1,FILL_GRADIENT:2,BACKGROUND_FILL:1,BACKGROUND_IMAGE:2,TITLEBAR_REGULAR:1,TITLEBAR_IMAGE:2,ICON_DEFAULT:1,ICON_IMAGE:2,ACT_HELP_DEFAULT:1,ACT_HELP_DOCUMENT:2,LOGGING_LEVEL_WARNING:12,LOGGING_LEVEL_ERROR:14,LOGGING_LEVEL_MESSAGES:10,LOGGING_LEVEL_ALL:0,LOGGING_LEVEL_OFF:16,MEM_UNIT_MB:1,MEM_UNIT_GB:2,TIME_UNIT_DAYS:1,TIME_UNIT_HOURS:2,TIME_UNIT_MINUTES:3,AUTHEN_ANONY:1,AUTHEN_BASIC:2,AUTHEN_WIN:3,AUTHEN_INTEGRATED:4,AUTHEN_USHER:5,PRJ_AUTHEN_STD:1,PRJ_AUTHEN_WIN:2,PRJ_AUTHEN_LDAP:16,PRJ_AUTHEN_DB:32,PRJ_AUTHEN_TRUSTED:64,PRJ_AUTHEN_INTEGRATED:128,SRV_ASP:1,SRV_J2EE:0,REQ_HTTP:0,REQ_HTTPS:1,CACHE_PRELOAD_AUTO:1,CACHE_PRELOAD_OFF:2,CACHE_CLEAR_AUTO:1,CACHE_CLEAR_ONCLOSE:2,PUSH_NOTIFICATION_ON:1,PUSH_NOTIFICATION_OFF:2,OUTPUT_TYPE_ALL:1,OUTPUT_TYPE_MOBILE_CLIENT:2,getLightWeightReconcilePopup:function(){return lightWeightReconcilePopup;},createObjBrowserDropdown:function(prop){return createDropDown(prop,POPUP_OBJECTBROWSER);},createTriggerListDropdown:function(prop){return createDropDown(prop,POPUP_TRIGGERLIST);},makeButtonHashable:function(button){this.makeHashable(button);this.makeHashable(button,["cap","dsc","act","icn"]);this.makeHashable(button.act,["hlp","rs","fd"]);this.makeHashable(button.act.rs,["pcf"]);this.makeHashable(button.icn,["img"]);return button;},makeCSTHomescreenHashable:function(homescreenSetting){this.makeHashable(homescreenSetting);this.makeHashable(homescreenSetting,["rs","fd"]);if(homescreenSetting.cst){var formatSetting=homescreenSetting.cst.fmt;this.makeHashable(formatSetting);this.makeHashable(formatSetting,["btn","bkg","ttl","vw"]);this.makeHashable(formatSetting.bkg,["fll","img"]);this.makeHashable(formatSetting.ttl,["cap","img"]);this.makeHashable(formatSetting.btn,["fnt","brd","fll"]);for(var i=0,len=homescreenSetting.cst.btns.length;i<len;i++){this.makeButtonHashable(homescreenSetting.cst.btns[i]);}}else{if(homescreenSetting.rs){if(homescreenSetting.rs.sobs){var supportObjs=homescreenSetting.rs.sobs;for(var i=0,len=supportObjs.length;i<len;i++){this.makeHashable(supportObjs[i]);this.makeHashable(supportObjs[i],["fd","rs"]);if(supportObjs[i].rs){this.makeHashable(supportObjs[i].rs,["pcf"]);}}}if(homescreenSetting.rs.pb){this.makeHashable(homescreenSetting.rs,["pb"]);}}}},makeHashable:function(jsonObj,properties){if(!jsonObj){return ;}else{if(properties===undefined){_H.make(jsonObj,mstrmojo.Obj);}else{for(var i=0,len=properties.length;i<len;i++){var p=properties[i];if(p in jsonObj){_H.make(jsonObj[p],mstrmojo.Obj);}}}}},transformGradient:function(gradient){if(typeof gradient==="object"){var css=mstrmojo.css.buildGradient(0,_CLR.decodeColor(gradient.sclr),_CLR.decodeColor(gradient.eclr));return css.n+":"+css.v;}else{if(typeof gradient=="string"){var colors=gradient.match(/#\w{6}/g);if(colors!==null&&colors.length==2){return{sclr:_CLR.encodeColor(colors[0]),eclr:_CLR.encodeColor(colors[1])};}}}return"";},getTransferAuth:function getTransferAuth(webSvr){var am=(webSvr.udc===true)?mstrmojo.all.mobileConfig.data.cty.wsdc.am:webSvr.wsc.am;return(am===this.AUTHEN_BASIC)?{transferAuthHeader:"1"}:null;},showErrorMsgBox:function showErrorMsgBox(err){if(!err){return ;}var msgBox=mstrmojo.all.mobileConfigTaskError;if(msgBox){var orgTxt=msgBox.children[0].text;if(orgTxt!=err){msgBox.children[0].set("text",orgTxt+err);}}else{mstrmojo.insert({scriptClass:"mstrmojo.Dialog",id:"mobileConfigTaskError",title:mstrmojo.desc(3610),width:"475px",btnAlignment:"right",cssText:"border:1px solid #AAAAAA;",buttons:[{scriptClass:"mstrmojo.HTMLButton",cssText:"margin-bottom:2px",text:mstrmojo.desc(1442),preBuildRendering:function(){this.cssClass="mobileconfig-Button";},postBuildRendering:function(){this.domNode.focus();},onkeyup:function(evt){var hWin=evt.hWin,e=evt.e||hWin.event;if(e.keyCode===13){this.onclick();}},onclick:function(evt){mstrmojo.all.mobileConfigTaskError.destroy();}}],children:[{scriptClass:"mstrmojo.Label",text:err}]}).render();}},isASP:function isASP(){return(window.location.pathname.indexOf("/asp/")>0)?true:false;},getWebSrvUrl:function getWebSrvUrl(item){return((parseInt(item.rt,10)===0)?"http":"https")+"://"+item.nm+":"+item.po+"/"+item.pt+((parseInt(item.ty,10)===0)?"/servlet/taskProc":"/asp/taskProc.aspx");},setValidValue:function setValidValue(modelProp,n,v,raiseEvent){if(!modelProp){return ;}v=(v!=null)?_S.trim(v):"";if(raiseEvent&&modelProp.set){modelProp.set(n,v);}else{modelProp[n]=v;}},validatePort:function validatePort(v){v=parseInt(v,10);if(v<0||v>65535){return false;}},generalValidator:function generalValidator(v,type,custom_expr,invalid_msg){var r={id:this.id,code:mstrmojo.validation.STATUSCODE.VALID,msg:""};if(type===mstrmojo.expr.DTP.INTEGER){v=parseInt(v,10);}if(custom_expr&&custom_expr(v)===false){r.code=mstrmojo.validation.STATUSCODE.INVALID_VALIDATOR;r.msg=invalid_msg;}return r;},propertyName:function propertyName(text,slot,cssText,bindings){return{scriptClass:"mstrmojo.Label",text:text,cssText:cssText,slot:slot,bindings:bindings};},obj2Xml:function obj2Xml(v,root,hasStatement,isSkipNull,removedProp,getName){var r=hasStatement?'<?xml version="1.0" encoding="UTF-8"?>':"",removed=removedProp?removedProp:{_meta_usesSuper:false,_super:false,audibles:false,dead:false,defaultButton:false,defaultPrj:false,defaultSrv:false,disposables:false,id:false,pdn:false,scriptClass:false,validFlag:false},config={getArrItemName:getName?getName:function(n,v,i){return n.substr(0,n.length-1);},isSerializable:function(nodeName,jsons,index){return(removed[nodeName]===false)?false:true;},skipNull:isSkipNull,convertBoolean:false,skipFunctions:true};r+=_S.json2xml(root,v,config);return r;}});})();