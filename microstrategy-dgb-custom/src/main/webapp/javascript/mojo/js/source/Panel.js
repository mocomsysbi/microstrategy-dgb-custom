(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.css");var _C=mstrmojo.css;mstrmojo.Panel=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.Panel",state:1,showTitlebar:false,markupString:'<div id="{@id}" class="mstrmojo-Panel {@cssClass}" style="position: relative;{@cssText}"><div class="mstrmojo-Panel-titlebar {@cssClass}"><img class="mstrmojo-Panel-state" src="../images/1ptrans.gif" align="absmiddle" onclick="var w = mstrmojo.all[\'{@id}\']; w.set(\'state\', w.state === 0 ? 1 : 0)" /><span class="mstrmojo-Panel-text" style="{@ttlTxtCssText}"></span><input type="button" class="mstrmojo-Panel-del" value="{@delText}" onclick="mstrmojo.all[\'{@id}\'].del()"/><div class="mstrmojo-clearMe"></div></div><div class="mstrmojo-Panel-container"></div></div>',markupSlots:{stateNode:function(){return this.domNode.firstChild.firstChild;},titlebarNode:function(){return this.domNode.firstChild;},titleNode:function(){return this.domNode.firstChild.childNodes[1];},containerNode:function(){return this.domNode.lastChild;}},markupMethods:{ontitleChange:function(){var tn=this.titleNode;if(tn){var t=this.title;tn.innerHTML=(t!==null)?t:"";}},onstateChange:function(){var cls=(this.state===0);for(var n in {stateNode:1,titleNode:1,containerNode:1}){if(this[n]){_C.toggleClass(this[n],["closed"],cls);}}},onshowTitlebarChange:function(){_C.toggleClass(this.titlebarNode,["closed"],(this.showTitlebar===false));}},del:function del(){var p=this.parent;if(p&&p.remove){p.remove(this.item);}if(this.customDel){this.customDel();}}});})();