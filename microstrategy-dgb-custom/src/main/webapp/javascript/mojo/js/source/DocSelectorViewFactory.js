(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.DynamicClassFactory","mstrmojo.ListDocSelector","mstrmojo.TextBoxDocSelector","mstrmojo.SearchBoxDocSelector","mstrmojo.MetricQualDocSelector","mstrmojo.MetricSliderDocSelector","mstrmojo.AttrQualDocSelector","mstrmojo.VisDocSelector","mstrmojo.DynamicListDocSelector","mstrmojo._DocActionSelector","mstrmojo._IsThresholdConditionTarget");var STYLE_CHECKBOX=4,TP_ATTRIBUTE=12,TP_CONSOLIDATION=47,STP_DERIVED_ELEMENT=12033,STP_RECURSIVE_ATTRIBUTE=3076;var $SELECTOR_CLASS_MAP={"default":"ListDocSelector",dynamic:"DynamicListDocSelector",7:"MetricSliderDocSelector",8:"MetricQualDocSelector",9:"SearchBoxDocSelector",10:"TextBoxDocSelector",11:"AttrQualDocSelector",12:"VisDocSelector"};function isRecursiveSelector(defn){return defn.srct===TP_ATTRIBUTE&&defn.srcst===STP_RECURSIVE_ATTRIBUTE||defn.srct===TP_CONSOLIDATION&&defn.srcst===STP_DERIVED_ELEMENT&&defn.ndetype===2;}mstrmojo.DocSelectorViewFactory=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.DocSelectorViewFactory",getDocSelectorClass:function getDocSelectorClass(model,node,config,buildConfig){var defn=node.defn,style=defn.style,cls=$SELECTOR_CLASS_MAP[style]||$SELECTOR_CLASS_MAP["default"];if(isRecursiveSelector(defn)&&style===STYLE_CHECKBOX&&defn.iifp){cls=$SELECTOR_CLASS_MAP.dynamic;}if(node.defn.ct==="4"){return(mstrmojo.DynamicClassFactory.newComponent(mstrmojo[cls],[mstrmojo._DocActionSelector,mstrmojo._IsThresholdConditionTarget],{scriptClass:"mstrmojo.DocActionXSelector"}));}return mstrmojo[cls];},newDocSelector:function newDocSelector(model,node,config,buildConfig){var Cls=this.getDocSelectorClass(model,node,config,buildConfig),props={id:node.id,node:node,model:model};return new Cls(props);}});mstrmojo.DocSelectorViewFactory.CLASS_MAP=$SELECTOR_CLASS_MAP;}());