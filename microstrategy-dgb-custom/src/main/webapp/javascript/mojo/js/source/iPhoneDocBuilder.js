(function(){mstrmojo.requiresCls("mstrmojo.MobileDocBuilder");mstrmojo.iPhoneDocBuilder=mstrmojo.declare(mstrmojo.MobileDocBuilder,null,{scriptClass:"mstrmojo.iPhoneDocBuilder",newLayout:function newLayout(model,node){var LayoutCls=mstrmojo["DocLayout"+((node.defn.horiz)?"Horiz":"")];return new LayoutCls({slot:"containerNode",id:node.k,k:node.k,minHeight:node.data.mh,rules:node.defn.rules,builder:this,node:node,defn:node.defn,model:model});}});})();