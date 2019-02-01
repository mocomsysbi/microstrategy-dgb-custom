(function(){mstrmojo.requiresCls("mstrmojo.expr","mstrmojo.css","mstrmojo._IsExprNode","mstrmojo._HasPopup","mstrmojo.Widget","mstrmojo.fe.FilterUtils");var _D=mstrmojo.dom,_C=mstrmojo.css,UTILS=mstrmojo.fe.FilterUtils,getExprConditionNodeHtml=UTILS.getExprConditionNodeHtml,getExprNodeHtmlAndText=UTILS.getExprNodeHtmlAndText;function _fn(me){var d=me.data;return getExprConditionNodeHtml(d);}mstrmojo.ConditionNode=mstrmojo.declare(mstrmojo.Widget,[mstrmojo._IsExprNode,mstrmojo._HasPopup],{scriptClass:"mstrmojo.ConditionNode",data:null,editable:false,prefixedAndOrEditable:false,markupString:'<div id="{@id}" class="mstrmojo-cond mstrmojo-ConditionNode {@cssClass}" mstrAttach:mousedown><div class="mstrmojo-onhoverparent mstrmojo-cond-prefix {@cssClass}"><span class="mstrmojo-textset mstrmojo-cond-prefix-text" mstrAttach:click></span><span class="mstrmojo-onhover-in mstrmojo-andor-tools {@cssClass}">{@_prefixAndOrToolsMarkup}</span></div><div class="mstrmojo-onhoverparent mstrmojo-cond-contents {@cssClass}"><span class="mstrmojo-textset mstrmojo-cond-text {@cssClass}" mstrAttach:click></span><span class="mstrmojo-cond-text-postfix {@cssClass}"></span><span class="mstrmojo-rel mstrmojo-cond-popupNode {@cssClass}"></span><span class="mstrmojo-onhover-bl mstrmojo-abs mstrmojo-topright mstrmojo-cond-tools {@cssClass}"><img class="mstrmojo-del" src="../images/1ptrans.gif" tooltip="'+mstrmojo.desc(7931,"Delete condition")+'" onclick="mstrmojo.all[\'{@id}\'].del()" /></span></div></div>',markupSlots:{prefixHoverNode:function(){return this.domNode.firstChild;},prefixNode:function(){return this.domNode.firstChild.firstChild;},prefixAndOrToolsNode:function(){return this.domNode.firstChild.childNodes[1];},condNode:function(){return this.domNode.childNodes[1];},textNode:function(){return this.domNode.childNodes[1].firstChild;},textPostfixNode:function(){return this.domNode.childNodes[1].childNodes[1];},popupNode:function(){return this.domNode.childNodes[1].childNodes[2];}},markupMethods:{onprefixedAndOrEditableChange:function(){_C.toggleClass(this.prefixNode,["editable"],this.prefixedAndOrEditable);},oneditableChange:function(){_C.toggleClass(this.textNode,["editable"],this.editable);},onselectedChange:function(){_C.toggleClass(this.condNode,["selected"],this.selected);},ondataChange:function(){this.prefixNode.innerHTML=this.andOrTxt();var htmlAndText=getExprNodeHtmlAndText(this.data);this.textNode.innerHTML=htmlAndText.html;this.textNode.title=htmlAndText.text;this.textPostfixNode.innerHTML=this.getConditionTextPostfix();}},betweenText:mstrmojo.desc(308,"and"),atText:mstrmojo.desc(5923,"at"),emptyText:mstrmojo.desc(7930,"Empty condition"),init:function init(props){this._super(props);this.markupString=this.markupString.replace("{@_prefixAndOrToolsMarkup}",this.getPrefixAndOrToolsMarkup());},getConditionTextPostfix:function(){return"";},del:function del(){var p=this.parent;if(p&&p.remove&&this.data){p.remove(this.data);}},isEmpty:function(){var d=this.data,et=d&&d.et,tgt=et&&mstrmojo.expr.ET2TGT[et];return !(tgt&&d[tgt]);},isSelectableArea:function(el){return _D.contains(this.condNode,el,true);},preclick:function pc(evt){var p=null,t=_D.eventTarget(evt.hWin,evt.e);if(_D.contains(this.prefixNode,t,true)){p="andor";}else{if(_D.contains(this.textNode,t,true)){p="condition";}else{if(_D.contains(this.textPostfixNode,t,true)){_D.stopPropogation(evt.hWin,evt.e);return false;}}}evt.part=p;}});mstrmojo.ConditionNode.getFunctionNode=_fn;})();