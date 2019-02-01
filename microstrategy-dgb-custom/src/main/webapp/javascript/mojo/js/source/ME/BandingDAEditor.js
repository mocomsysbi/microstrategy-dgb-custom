(function(){mstrmojo.requiresCls("mstrmojo.ME.DerivedFunctionWizard","mstrmojo.ME.MetricDataService","mstrmojo.ME.AttributeEditBox","mstrmojo.expr","mstrmojo.array","mstrmojo.hash");var EDITOR;var MDS=mstrmojo.ME.MetricDataService,$H=mstrmojo.hash,$ARR=mstrmojo.array,_getTokenStreamXML=mstrmojo.ME.AttributeEditBox.getTokenStreamXML,$DTP=mstrmojo.expr.DTP,FAKE_DTP={SHOW_BAND_NAMES:-4,BANDON_UNITS:-6},BAND_DESC={START_END:'BandNames<ResidueName="All Others">(this@ID, "#s - #e")',BAND_NUM:'BandNames<ResidueName="All Others">(this@ID, "Band #b")',BAND_NUM_START_END:'BandNames<ResidueName="All Others">(this@ID, "Band #b: #s - #e")',NO:"No"},SHOW_BAND_NAMES_LIST=[{n:mstrmojo.desc(14145,"Start - End"),v:BAND_DESC.START_END},{n:mstrmojo.desc(14146,"Band #"),v:BAND_DESC.BAND_NUM},{n:mstrmojo.desc(14147,"Band #: Start - End"),v:BAND_DESC.BAND_NUM_START_END},{n:mstrmojo.desc(218,"No"),v:BAND_DESC.NO}],FUNC_DID={"8107C337DD9911D3B98100C04F2233EA":"BAND_SIZE","8107C338DD9911D3B98100C04F2233EA":"BAND_COUNT","8107C339DD9911D3B98100C04F2233EA":"BAND_POINTS"},DEFAULT_GET_TOKENS_FUNC=function(){return[];};function unify(s){return s.replace(/\s/g,"").toLowerCase();}function getDESCTokens(v){var tks=[{v:"BandNames",tp:279,lv:1,oi:{did:"ACA96B1F9F99412B867045747DD88575",n:"BandNames",st:2816,t:11}},{v:"<",tp:60,lv:1},{v:"ResidueName",tp:259,lv:1},{v:"=",tp:282,lv:1},{v:'"All Others"',tp:261,lv:1},{v:">",tp:62,lv:1},{v:"(",tp:40,lv:1},{lv:1,tp:275,v:"this@ID"},{v:",",tp:44,lv:1}];switch(v){case BAND_DESC.BAND_NUM:tks.push({v:'"Band #b"',tp:261,lv:1});break;case BAND_DESC.BAND_NUM_START_END:tks.push({v:'"Band #b: #s - #e"',tp:261,lv:1});break;case BAND_DESC.START_END:tks.push({v:'"#s - #e"',tp:261,lv:1});break;}tks.push({v:")",tp:41,lv:1});return tks;}function token2Str(tks){var str="";$ARR.forEach(tks.slice(1,-1),function(tk){str+=tk.v;});return str;}function getDisplayName(p){if(p.t===4){return"BandOn";}return p.n;}function getUIDtp(p){if(p.t===4){return FAKE_DTP.BANDON_UNITS;}return p.dtp;}var _getNewDefinition=function(fctOi,refOi){return{did:"",n:"New Attribute",forms:[{n:"ID",tks:{items:[]}}]};};function quotes(d,v){return d.dtp===8&&d.n==="Delimiter"?'"'+v+'"':v;}function getNamePrefix(n){var str=n.split(",")[0],prefix=str.replace(/\d$/,""),startAt=str.replace(prefix,"");return{prefix:prefix,startAt:parseInt(startAt,10)};}function getPullDown(items,getTokens){return{scriptClass:"mstrmojo.Pulldown",cssClass:"mstrmojo-ME-Pulldown",popupCssClass:"mstrmojo-ME-Pulldown-Popup",items:items,popupToBody:true,itemIdField:"v",postCreate:function(){var d=this.data;this.value=d.v||d.dfv;},getTokens:getTokens||DEFAULT_GET_TOKENS_FUNC,onvalueChange:function(){EDITOR.set("dirty",true);}};}function getInputWidget(editor,widgetName){var fn=function(w){return w.inputWidget&&w.inputWidget.widgetName===widgetName;},r=mstrmojo.array.filterOne(editor.argsGrid.ctxtBuilder.itemWidgets,fn);return r&&r.inputWidget;}var _DTPBuilder=function(d){var w=null;switch(d&&d.dtp){case FAKE_DTP.SHOW_BAND_NAMES:w=getPullDown(SHOW_BAND_NAMES_LIST);w.widgetName="bandNames";w.getDescTokens=function(){var selv=this.selectedItem&&this.selectedItem.v;return selv===BAND_DESC.NO?null:getDESCTokens(selv);};break;case FAKE_DTP.BANDON_UNITS:w=EDITOR.getParamWidget(d);w.widgetName="bandOn";break;case $DTP.DOUBLE:case $DTP.INTEGER:case $DTP.VARCHAR:w=EDITOR.getTextWidget(d);break;default:w=EDITOR.getParamWidget(d);w.onitemsChange=mstrmojo.emptyFn;break;}if(w){w.alias="inputWidget";}return w;};var _validateAndSave=function(oi,bandingTokens,descFm,saveFn){var attrid=oi.did,attrn=oi.n,dsid=oi.dsid,forms=oi.forms,idTks={items:bandingTokens},valcb=function(res){if(res.vs!==0){mstrmojo.alert(mstrmojo.desc(9826,"The metric definition has an error. Please correct before proceeding."),null,mstrmojo.desc(9571,"Syntax Error!"));return ;}var param,idf={n:"ID",formula:res.tokenXML};if(attrid){idf.did=forms[0].did;param={act:"updateDA",name:attrn,dsid:dsid,attrId:attrid,isTokenStream:true,update:[idf]};if(descFm){if(descFm.did&&!descFm.del){param.update.push(descFm);}else{if(descFm.did&&descFm.del){param.del=[{did:descFm.did}];}else{param.add=[descFm];}}}}else{param={act:"addDAToDataset",dsid:dsid,name:attrn,evFlags:1,isTokenStream:true,forms:[idf].concat(descFm?[descFm]:[])};}saveFn(param);};mstrmojo.ME.AttributeEditBox.validateSyntax(attrid,idTks,true,valcb);};var _showAsBandingEditor=function(oi){var forms=oi.forms,len=forms&&forms.length,form1=len&&forms[0],form2=len&&forms[1],isBanding=$ARR.some(form1&&form1.ftk,function(tk){return tk.oi&&FUNC_DID[tk.oi.did];});if(!isBanding){return false;}if(len===1){return true;}if(form2&&form2.ftk&&len===2){var result=false,formula=unify(token2Str(form2.ftk));$H.forEach(BAND_DESC,function(v){if(unify(v)===formula){result=true;return false;}});return result;}return false;};mstrmojo.ME.BandingDAEditor=mstrmojo.declare(mstrmojo.ME.DerivedFunctionWizard,null,{scriptClass:"mstrmojo.ME.BandingDAEditor",ide:null,insertMode:false,init:function init(props){this._super(props);EDITOR=this;},getDTPBuilder:function getDTPBuilder(){return _DTPBuilder;},getParamObjectTypes:function getParamObjectTypes(){return[mstrmojo.expr.TP.METRIC];},getTextWidget:function getTextWidget(data){var namePrefix=getNamePrefix(data.n).prefix;return{scriptClass:"mstrmojo.ValidationTextBox",emptyText:(data.dtp===$DTP.DOUBLE||data.dtp===$DTP.INTEGER)?mstrmojo.desc(14143,"Type a number"):"",postCreate:function(){this.value=(data.items&&data.items[0].v)||data.dfv;},oninput:function oninput(evt){EDITOR.set("dirty",true);this.createNextInputParamWidget();},constraints:{trigger:mstrmojo.validation.TRIGGER.ONKEYUP,min:1},dtp:data.dtp,getTokens:function(){var d=this.data;if(!mstrmojo.string.isEmpty(this.value)&&this.value!==d.dfv){return[{v:quotes(d,this.value)}];}return[];},createNextInputParamWidget:function createNextInputParamWidget(){var data=this.data,grid=this.dataGrid,lastRpIdx=EDITOR._lastRpIdx;if(!(data.isRepeated&&data.rpIdx===lastRpIdx)){return ;}var idx=lastRpIdx+1,name=namePrefix+idx,dataClone=mstrmojo.hash.copy({desc:name,n:name,items:null,dn:name,rpIdx:idx},mstrmojo.hash.copy(data));grid.items.add([dataClone],mstrmojo.array.indexOf(grid.items,data)+1);EDITOR._lastRpIdx=dataClone.rpIdx;if(EDITOR.updateScrollbars){EDITOR.updateScrollbars();}}};},onOpen:function onOpen(){EDITOR=this;this.oi.tks=this.oi.forms[0].tks||{items:this.oi.forms[0].ftk};this._super();if(this.updateScrollbars){this.updateScrollbars();}},insertOnFinish:function(){var attrBox=mstrmojo.all.mstrDAE.attrEditBox,inputBox=attrBox.inputBox,bandNameW=getInputWidget(this,"bandNames"),bandingToken=this.getTokens(),bandNameToken=bandNameW.getDescTokens();inputBox.insertTokens(bandingToken);if(bandNameToken){attrBox.tabstrip.addTab();inputBox.insertTokens(bandNameToken);}},validateAndSave:function validateAndSave(oi,fn){var me=this,act=me.ide.action,forms=oi.forms,bandNameW=getInputWidget(this,"bandNames"),bandNameToken=bandNameW.getDescTokens(),descFm=$H.copy(bandNameToken?{n:"DESC",formula:_getTokenStreamXML({items:bandNameToken})}:null,forms[1]?{did:forms[1].did}:null),saveFn=function(param){fn();me.ide.close();var actfn=oi.did?act.onupdate:act.oncreate;if(actfn){actfn(param);}};if(bandNameToken===null&&descFm){descFm.del=true;}_validateAndSave.call(me,me.oi,this.getTokens(),descFm,saveFn);},postProcessParamsFromToken:function(res){var ps=[],p,i,pars=res.pars,len=(pars&&pars.length)||0;for(i=0;i<len;i++){p=$H.copy(pars[i]);p.dtp=getUIDtp(p);p.n=getDisplayName(p);p.isParam=true;ps.push(p);}p=ps[ps.length-1];if(res.rpc>0){ps=ps.concat(this.postProcessRepeatParam(p));}return ps;},postProcessRepeatParam:function postProcessRepeatParam(param){var NP=getNamePrefix(param.n),namePrefix=NP.prefix,cnt=NP.startAt||1,rptps=[],p,i;param.isRepeated=true;param.rpIdx=this._lastRpIdx=cnt;param.n=namePrefix+(cnt++);var itms=param.items||[];if(itms.length>0){param.items=[itms[0]];for(i=1;i<=itms.length;i++){p=$H.copy(param);p.rpIdx=cnt;p.n=namePrefix+(cnt++);p.items=(i===itms.length?null:[itms[i]]);rptps.push(p);}this._lastRpIdx=p.rpIdx;}return rptps;},postProcessProsFromToken:function(res){var ps=[],p={dfv:BAND_DESC.START_END,n:"ShowBandNames",desc:mstrmojo.desc(14144,"Show band names"),dtp:FAKE_DTP.SHOW_BAND_NAMES};if(this.oi.forms.length>1){var formula=unify(token2Str(this.oi.forms[1].ftk));$H.forEach(BAND_DESC,function(v){if(unify(v)===formula){p.v=v;return false;}});}else{if(this.oi.did!==""){p.v=BAND_DESC.NO;}}ps.push(p);return ps;}});mstrmojo.ME.BandingDAEditor.getNewDefinition=_getNewDefinition;mstrmojo.ME.BandingDAEditor.showAsBandingEditor=_showAsBandingEditor;}());