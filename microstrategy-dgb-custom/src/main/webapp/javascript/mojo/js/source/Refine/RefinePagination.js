(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo.HBox","mstrmojo.TextBox","mstrmojo.Label","mstrmojo.dom");mstrmojo.requiresDescs(162,5961,3012,163);function handleGo(){var rCtrl=mstrApp.getRootController().refineApp.rootController,model=rCtrl.model,v=parseInt(this.parent.currentPage.value,10);if(!v){return ;}model.set("start",(v-1)*model.limit);}mstrmojo.Refine.RefinePagination=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.Refine.RefinePagination",markupString:'<div class="mstrmojo-Refine-RefinePagination refine-viewpanel-paging" mstrAttach:click><div class="refine-viewpanel-paging-currentRows"></div><div class="refine-viewpanel-paging-of"></div><div class="refine-viewpanel-paging-totalRows"></div><div class="refine-viewpanel-paging-pages"></div></div>',markupSlots:{currentRows:function(){return this.domNode.children[0];},ofNode:function(){return this.domNode.children[1];},totalRows:function(){return this.domNode.children[2];},pageNode:function(){return this.domNode.children[3];}},totalPages:null,children:[{scriptClass:"mstrmojo.Label",alias:"currentRows",slot:"currentRows",text:"",},{scriptClass:"mstrmojo.Label",slot:"ofNode",text:"",},{scriptClass:"mstrmojo.Label",alias:"totalRows",slot:"totalRows",text:"",},{scriptClass:"mstrmojo.HBox",alias:"right",slot:"pageNode",cssClass:"",children:[{scriptClass:"mstrmojo.Button",alias:"firstNode",text:"",cssClass:"pagination-firstNode",useRichTooltip:true,updateTooltipConfig:function(){this.set("richTooltip",{cssClass:"vi-regular vi-tooltip-V",refNode:this.domNode,posType:"BL",top:"-2px",left:"-8px",content:mstrmojo.desc(162,"First page")});},onclick:function(){var rCtrl=mstrApp.getRootController().refineApp.rootController,model=rCtrl.model;model.set("start",0);}},{scriptClass:"mstrmojo.Button",alias:"previousNode",text:"",cssClass:"pagination-previousNode",useRichTooltip:true,updateTooltipConfig:function(){this.set("richTooltip",{cssClass:"vi-regular vi-tooltip-V",refNode:this.domNode,posType:"BL",top:"-2px",left:"-8px",content:mstrmojo.desc(5961,"Previous page")});},onclick:function(){var rCtrl=mstrApp.getRootController().refineApp.rootController,model=rCtrl.model;if(model.start===0){return ;}model.set("start",model.start-model.limit);}},{scriptClass:"mstrmojo.TextBox",alias:"currentPage",cssClass:"pagination-currentPage",width:"40px",onvalueChange:function(evt){var value=evt.value.toString();if(!value){return ;}value=value.replace(/[^0-9,]/g,"");value=parseInt(value)>parseInt(this.parent.parent.totalPages)?this.parent.parent.totalPages:value;value=parseInt(value)===0?1:value;this.set("value",value);},onEnter:handleGo,onblur:handleGo},{scriptClass:"mstrmojo.Label",alias:"totalPages",text:"",cssClass:"pagination-totalPages"},{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(3687,"Page"),cssClass:"pagination-Page"},{scriptClass:"mstrmojo.Button",alias:"nextNode",text:"",cssClass:"pagination-nextNode",useRichTooltip:true,updateTooltipConfig:function(){this.set("richTooltip",{cssClass:"vi-regular vi-tooltip-V",refNode:this.domNode,posType:"BL",top:"-2px",left:"-8px",content:mstrmojo.desc(3012,"Next page")});},onclick:function(){var rCtrl=mstrApp.getRootController().refineApp.rootController,model=rCtrl.model;if(model.start===(model.data.filtered-1)-((model.data.filtered-1)%model.limit)){return ;}model.set("start",model.start+model.limit);}},{scriptClass:"mstrmojo.Button",alias:"lastNode",text:"",cssClass:"pagination-lastNode",useRichTooltip:true,updateTooltipConfig:function(){this.set("richTooltip",{cssClass:"vi-regular vi-tooltip-V",refNode:this.domNode,posType:"BL",top:"-2px",left:"-8px",content:mstrmojo.desc(163,"Last page")});},onclick:function(){var rCtrl=mstrApp.getRootController().refineApp.rootController,model=rCtrl.model;model.set("start",(model.data.filtered-1)-((model.data.filtered-1)%model.limit));}}]}]});})();