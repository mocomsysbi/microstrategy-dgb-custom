(function(){mstrmojo.requiresCls("mstrmojo.DocDataService","mstrmojo._ResultSetXt");var docObjType={objectType:55};var $C=mstrmojo.hash.copy;mstrmojo.DocDataServiceXt=mstrmojo.declare(mstrmojo.DocDataService,[mstrmojo._ResultSetXt],{scriptClass:"mstrmojo.DocDataServiceXt",execute:function execute(params,callback,resParams){var request=mstrmojo.hash.copy(params,{});request.taskId="RWExecute";if(!request.objectID){request.objectID=(params&&params.dssId)||this.dssId;}this.dssId=request.objectID;this._super(request,callback,resParams);},getResults:function getResults(params,callback){params=params||{};params.taskId=params.taskId||"androidRWExecute";params.styleName=params.styleName||"RWDocumentMobileStyle";params.useTerseElementId=params.useTerseElementId||1;var dim=this.model.controller.getContentDimensions();params.availableWidth=dim.w;params.availableHeight=dim.h;params.executionOrientation=mstrMobileApp.getOrientation();this._super(params,this.wrapCallback(callback));},answerPrompts:function answerPrompts(prompts,callback){this._super(prompts,this.wrapCallback(callback),$C(docObjType));},loadPrompts:function loadPrompts(callback,request){this._super(this.wrapCallback(callback),$C(docObjType,request));}});}());