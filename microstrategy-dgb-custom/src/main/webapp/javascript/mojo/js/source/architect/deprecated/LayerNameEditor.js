(function(){mstrmojo.requiresCls("mstrmojo.Label","mstrmojo.Editor","mstrmojo.Button","mstrmojo.TextBox","mstrmojo._CanAutoClose");function submitNewLayerName(){this.onOK(this.txtname.value);this.close();}mstrmojo.architect.ui.LayerNameEditor=mstrmojo.declare(mstrmojo.Editor,[mstrmojo._CanAutoClose],{scriptClass:"mstrmojo.architect.ui.LayerNameEditor",cssClass:"mstrmojo-ar-LayerNameEditor",showTitle:false,onOK:mstrmojo.emptyFn,onClose:function onClose(){this.txtname.set("value","");},nudge:function nudge(){var editorNodeStyle=this.editorNode.style;editorNodeStyle.top="";editorNodeStyle.left="";},children:[{scriptClass:"mstrmojo.TextBox",hint:mstrmojo.desc(11380,"Please enter new layer name..."),alias:"txtname",onEnter:function onEnter(){submitNewLayerName.call(this.parent);}},{scriptClass:"mstrmojo.Button",text:mstrmojo.desc(1442,"OK"),onclick:function(){submitNewLayerName.call(this.parent);}}]});mstrmojo.architect.ui.LayerNameEditor.prototype.markupMethods.onvisibleChange=function onvisibleChange(){this.editorNode.style.display=this.curtainNode.style.display=this.visible?"block":"none";};}());