(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.mstr.EnumDSSXMLObjectTypes","mstrmojo.ME.MetricDataService","mstrmojo.ME.DerivedMetricOptions");mstrmojo.requiresDescs(2140);var ARR=mstrmojo.array;mstrmojo.ME._DerivedMetricEditorHelper=mstrmojo.provide("mstrmojo.ME._DerivedMetricEditorHelper",{isDME:true,noCache:false,closeLabel:mstrmojo.desc(2140,"Cancel"),saveAsEnabled:false,tbBrowsable:false,init:function init(props){this._super(props);},onApplyMetricCallback:mstrmojo.emptyFn,optionPopupRef:{scriptClass:"mstrmojo.ME.DerivedMetricOptions",title:mstrmojo.desc(13035,"Metric Options"),help:"create_derived_metric.htm",width:300},replaceAttributeWithForms:function replaceAttributeWithForms(its){var tmp=[];ARR.forEach(its,function(it){if(it.t===mstrmojo.mstr.EnumDSSXMLObjectTypes.Attribute&&it.fs){ARR.forEach(it.fs,function(frm){if(frm.obf||it.da){tmp.push({n:it.n+"@"+frm.fnm,did:it.did+"@"+frm.fid,fmdid:frm.fid,fnm:frm.fnm,t:frm.t,frm:frm,oi:it,path:it.path});}});}else{tmp.push(it);}});return tmp;}});}());