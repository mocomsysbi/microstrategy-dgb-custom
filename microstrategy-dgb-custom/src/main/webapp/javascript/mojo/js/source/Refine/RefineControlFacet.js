(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.Label","mstrmojo.HBox","mstrmojo.RadioList","mstrmojo.Button","mstrmojo.Refine.RefineConstants");mstrmojo.requiresDescs(134);var constants=mstrmojo.Refine.RefineConstants;function addFacets(){var transformation,columns,index,columnName,transformationList,idx;transformation=this.parent;columns=transformation.columns;index=columns.selectedIndex;if(index===undefined){return ;}name=(columns.items[index].originalName);columnName=(columns.items[index]).name;transformationList=transformation.transformationList;idx=transformationList.subType%10;var type;var config={};config.originalName=name;config.name=columnName;config.columnName=columnName;if(idx===0){type="list";config.expression="value";}else{if(idx===1){type="range";config.expression="value";config.mode="range";}else{if(idx===2){type="timerange";config.expression="value";config.mode="range";}else{if(idx===3){type="text";config.caseSensitive=false;config.mode="text";}}}}this.controller.addFacets(type,config);}mstrmojo.Refine.RefineControlFacet=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.Refine.RefineControlFacet",markupString:'<div class="refine-controls"><div></div></div>',markupSlots:{optionsNode:function(){return this.domNode.children[0];}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";},onsubTypeChange:function(){if(this.subType!==-1){this.optionsBox.apply.onclick();}}},operations:null,bindings:{visible:function(){return(this.parentBox.transformationList.type===constants.transformationType.Facet);},subType:function(){return((this.parentBox.transformationList.type===constants.transformationType.Facet)?this.parentBox.transformationList.subType:-1);}},children:[{scriptClass:"mstrmojo.HBox",slot:"optionsNode",alias:"optionsBox",visible:false,children:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton hot",text:mstrmojo.desc(134,"Apply"),alias:"apply",onclick:function(){addFacets.call(this.parent.parent);}}]}]});}());