(function(){mstrmojo.requiresCls("mstrmojo.ConditionModel","mstrmojo.expr","mstrmojo.hash","mstrmojo.mstr.EnumNodeDimty");var $EXPR=mstrmojo.expr,$H=mstrmojo.hash,FN=$EXPR.FN,TP=$EXPR.TP,ET=$EXPR.ET,ET2TGT=$EXPR.ET2TGT,MTP=mstrmojo.meta.TP,DMT=mstrmojo.mstr.EnumNodeDimty;var GENERIC_COND=["tx","tx2","fn","fnt","exp","exp2","cs","st","isGridObject"];function IsV(v){return null!==v&&undefined!==v;}var _completed=function(me){if(!me){return false;}var _c=true;_c=_c&&(IsV(me.exp)||IsV(me.tx));_c=_c&&IsV(me.fn);if(me.fn===FN.BETWEEN||me.fn===FN.NOT_BETWEEN){var cs=me.cs;_c=_c&&cs&&IsV(cs[0])&&IsV(cs[1]);}else{if(me.fn===FN.IS_NULL||me.fn===FN.IS_NOT_NULL){return _c;}else{_c=_c&&(IsV(me.tx2)||IsV(me.cs&&me.cs[0])||IsV(me.exp2));}}return _c;};var _getFn=function(v){var did=(v&&v.did)?v.did.split($EXPR.FN_SEP):null;return did&&parseInt(did[1],10);};var fnBetweenOrNotBetween=function(v){var fn=_getFn(v);return(fn===FN.BETWEEN)||(fn===FN.NOT_BETWEEN);};var fnNullOrNotNull=function(v){var fn=_getFn(v);return(fn===FN.IS_NULL)||(fn===FN.IS_NOT_NULL);};mstrmojo.condTx.ConditionModel=mstrmojo.declare(mstrmojo.ConditionModel,null,{scriptClass:"mstrmojo.condTx.ConditionModel",edit:function(n,v){var vWas=this[n];switch(n){case"fo":if(v&&(TP.ATTR===v[MTP]||TP.METRIC===v[MTP])){var et=this.et;switch(v[MTP]){case TP.ATTR:vWas=this.a;if(et!==ET.AQ&&et!=ET.AE){this.et=ET.AQ;this.m=null;this.m2=null;this.m3=null;}if(et!==ET.AE){this.fn=null;this.fnt=null;}this.fm=null;this.fm2=null;this.fm3=null;this.cs=null;break;case TP.METRIC:vWas=this.m;if(et!==ET.MQ&&et!==ET.MC){this.et=ET.MQ;this.fm=null;this.fm2=null;this.fm3=null;this.fn=null;this.fnt=null;this.a=null;this.a2=null;this.a3=null;this.cs=null;this.dmt=DMT.NodeDimtyUnspecified;}break;}this.es=null;this[ET2TGT[this.et]]=v;}else{this.a=null;this.et=ET.XML;this.m=null;}if(v&&v.fn&&v.fnt){this.exp={nd:v};this.tx=null;}else{if(v){this.tx=(v.nk&&v.fk)?v:null;this.exp=null;}}break;case"s1":if(v&&v.fn&&v.fnt){this.exp2={nd:v};this.tx2=null;this.cs=null;}else{if(v){if(v.nk&&v.fk){this.tx2=v;this.cs=null;}else{if(!v.did){this.cs=[v];this.tx2=null;}}this.exp2=null;}}break;case"fn":if(fnBetweenOrNotBetween(v)){this.tx2=null;}else{if(fnNullOrNotNull(v)){this.cs=null;this.tx2=null;}else{this.cs=null;}}break;}this._super&&this._super(n,v);},_updateCompleted:function(){if(this.et===ET.XML){this.set("completed",_completed(this));}else{this._super();}},get:function get(){var data=this._super();if(this.et===ET.XML){$H.copyProps(GENERIC_COND,this,data);}return data;}});}());