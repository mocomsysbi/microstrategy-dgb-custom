(function(){mstrmojo.requiresCls("mstrmojo.FilterExpr","mstrmojo.threshold.AndOrNode","mstrmojo.threshold.ConditionNode","mstrmojo.expr");var $EXPR=mstrmojo.expr,ET=$EXPR.ET,_NODE=mstrmojo.mstr.EnumNodeProperties;mstrmojo.threshold.ThresholdExprTree=mstrmojo.declare(mstrmojo.FilterExpr,null,{scriptClass:"mstrmojo.threshold.ThresholdExprTree",cssClass:"mstrmojo-ThresholdExprTree",allowCopy:false,containerResizable:false,draggable:true,dropZone:true,editable:true,makeObservable:true,supportRelation:true,nodeClassMap:{14:mstrmojo.threshold.AndOrNode,"*":mstrmojo.threshold.ConditionNode},getItemIdentityProp:function(item){if(item.node&_NODE.CONDITION){return"*";}return this._super(item);},onConditionEdit:mstrmojo.emptyFn,editor:undefined,isEditable:function isEditable(item){if(!this.editable){return false;}if(item&&item.et===ET.XML){return !item.xml;}return true;},onNew:function onNew(inf){inf.data.isNew=true;this.editor.openConditionWalk(inf.data,inf.widget.ctxtBuilder.itemWidgets[inf.index]);},onnodeclick:function onnodeclick(evt){var part=evt.part;if(!evt||!part){return ;}var isAndOr=part==="andor",editor=this.tree.editor;if(!((isAndOr&&this.prefixedAndOrEditable)||(!isAndOr&&this.editable))){return ;}if(!this.editable){return ;}if(isAndOr){editor.openAndORPopup(this,evt.getTarget());return ;}else{if(part==="addCondition"){this.tree.newCondition({et:ET.AE});return ;}}editor.openConditionWalk(this.data,this);},allowDrop:function allowDrop(ctxt){var source=ctxt&&ctxt.src,data=source&&source.data,elementType=data&&data.et,tgtTree=this.tree,srcTree=source&&source.widget&&source.widget.tree;return elementType&&(this===tgtTree?(srcTree!==tgtTree):true);},remove:function remove(items){var idx=this._super(items);if(this.items.length===0&&items.et===ET.ANDOR&&items.nds.length===0&&this.parent.removeFromModel){this.parent.removeFromModel();}return idx;}});}());