(function(){mstrmojo.requiresCls("mstrmojo.css","mstrmojo.dom");var $CSS=mstrmojo.css,$DOM=mstrmojo.dom,CSS_DZ_MASK="dzMask",CSS_MASK="mask",IDX_ATTR="idx";function cleanUpDropZones(dzNode){$CSS.toggleClass(this.domNode,CSS_MASK,false);$CSS.toggleClass(dzNode,CSS_DZ_MASK,false);}mstrmojo.architect.ui._HasTreeDropZone=mstrmojo.provide("mstrmojo.architect.ui._HasTreeDropZone",{_mixinName:"mstrmojo.architect.ui._HasTreeDropZone",ondragenter:function ondragenter(context){$CSS.toggleClass(this.domNode,CSS_MASK,true);if(this._super){this._super(context);}},ondragover:function ondragover(context){var contextSrc=context.src,targetSrcNode=context.tgt.node,dropZoneNode=context.dzNode;if(contextSrc&&contextSrc.data&&targetSrcNode!==dropZoneNode){$CSS.toggleClass(dropZoneNode,CSS_DZ_MASK,false);var item=$DOM.findAncestorByAttr(targetSrcNode,IDX_ATTR,true,this.domNode);if(item){var newDropZoneNode=item.node;context.dzNode=newDropZoneNode;$CSS.toggleClass(newDropZoneNode,CSS_DZ_MASK,true);}}if(this._super){this._super(context);}},ondragleave:function ondragleave(context){cleanUpDropZones.call(this,context.dzNode);if(this._super){this._super(context);}},ondrop:function ondrop(context){cleanUpDropZones.call(this,context.dzNode);if(this._super){this._super(context);}}});}());