(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.Widget","mstrmojo.Button","mstrmojo.ui.menus.Menu","mstrmojo._HasPopup","mstrmojo.ui.menus._HasMenuPopup","mstrmojo.Refine.RefineFacetMenu","mstrmojo.Refine.HistogramWidget","mstrmojo.Refine.SliderWidget");mstrmojo.requiresDescs(487,12354,2797,96,1905,8445);var _D=mstrmojo.dom;function convertToCurrentTimezone(timestamp){var now=new Date(),offset=window.Date.prototype.getTimezoneOffset.call(now),currentTimestamp=timestamp-offset*60*1000;return new Date(currentTimestamp);}var choiceNode={scriptClass:"mstrmojo.Widget",count:null,label:null,checked:null,markupString:'<div class="facet-range-item" mstrAttach:click><input type="checkbox" id="{@id}"><label for="{@id}"><span class="facet-range-choice-label">{@label}</span><div class="facet-range-choice-count">({@count})</div></label></div>',markupSlots:{inputNode:function(){return this.domNode.children[0];}},onclick:function(evt){var e=evt.e,t=_D.eventTarget(evt.hWin,e);if(t===this.inputNode){if(this.label===mstrmojo.desc(487,"Time")){this.parent.selectTime=!this.checked;this.parent.parent.updateEngine(true);}else{if(this.label===mstrmojo.desc(12354,"Non-Time")){this.parent.selectNonTime=!this.checked;this.parent.parent.updateEngine(true);}else{if(this.label===mstrmojo.desc(2797,"Blank")){this.parent.selectBlank=!this.checked;this.parent.parent.updateEngine(true);}else{if(this.label===mstrmojo.desc(96,"Error")){this.parent.selectError=!this.checked;this.parent.parent.updateEngine(true);}}}}}},postBuildRendering:function(){if(this.checked){this.inputNode.setAttribute("checked","checked");}}};mstrmojo.Refine.TimeRangeFacet=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasPopup,mstrmojo.ui.menus._HasMenuPopup],{scriptClass:"mstrmojo.Refine.TimeRangeFacet",config:null,options:null,from:null,to:null,step:null,selectTime:true,selectNonTime:true,selectBlank:true,selectError:true,markupString:'<li class="facet-container" id="{@id}" mstrAttach:click><div class="facet-title"><div class="facet-text"><a class="facet-choice-link" >'+mstrmojo.desc(1905,"reset")+'</a><div class="facet-column-name"></div></div><div class="facet-menu"></div></div><div class="facet-range-body"><div class="facet-range-message">'+mstrmojo.desc(8445,"Loading")+'...</div><div class="facet-range-slider slider-widget"><div class="facet-range-histogram"></div></div><div class="facet-range-status"></div><div class="facet-range-other-choices"><div class="facet-range-choices time"></div></div></div></li>',markupSlots:{menuNode:function(){return this.domNode.children[0].children[1];},resetNode:function(){return this.domNode.children[0].children[0].children[0];},titleNode:function(){return this.domNode.children[0].children[0].children[1];},messageNode:function(){return this.domNode.children[1].children[0];},statusNode:function(){return this.domNode.children[1].children[2];},otherChoicesNode:function(){return this.domNode.children[1].children[3];},choicesNode:function(){return this.domNode.children[1].children[3].children[0];},sliderNode:function(){return this.domNode.children[1].children[1];},histogramNode:function(){return this.domNode.children[1].children[1].children[0];}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},children:[{slot:"menuNode",alias:"menu",iconClass:"refine",scriptClass:"mstrmojo.Button",onclick:function(){var src=this.parent;var $MAPPINGTABLE=mstrmojo.Refine.RangeFacet;var menuHelper=$MAPPINGTABLE.menuHelper=$MAPPINGTABLE.menuHelper||new mstrmojo.Refine.RefineFacetMenu();menuHelper.target=src;menuHelper.type=0;var cfg=menuHelper.getMenuConfig();cfg.hostId=src.id;cfg.hostElement=this.domNode;cfg.isHostedWithin=false;cfg.position=_D.position(this.domNode,true);src.openPopup(new mstrmojo.ui.menus.Menu({popupConfig:cfg}));}}],onclick:function(evt){var e=evt.e,t=_D.eventTarget(evt.hWin,e);if(t===this.removeNode){this.remove();}else{if(t===this.resetNode){this.reset();this.parent.updateEngine(true);}}},reset:function(){this.from=null;this.to=null;this.sliderWidget.update(this.config.min,this.config.max,this.config.step,this.from,this.to);this.selectTime=true;this.selectNonTime=true;this.selectBlank=true;this.selectError=true;this.setRangeIndicators();},setRangeIndicators:function(){if(!this.from||!this.to){return ;}var fromDate=convertToCurrentTimezone(this.from);var toDate=convertToCurrentTimezone(this.to);var dateFormat="yyyyMMdd";var timeFormat="HH:mm:ss";if(this.config.step>2629746000){this.statusNode.innerHTML=(fromDate.getFullYear()+" &mdash; "+toDate.getFullYear());}else{if(this.config.step>3600000){this.statusNode.innerHTML=(fromDate.toString(dateFormat)+" &mdash; "+toDate.toString(dateFormat));}else{this.statusNode.innerHTML=(fromDate.toString(dateFormat)+" "+fromDate.toString(timeFormat)+" &mdash; "+toDate.toString(dateFormat)+" "+toDate.toString(timeFormat));}}},remove:function(){this.parent.removeFacet(this);this.config=null;this.data=null;},hasSelection:function(){if(!this.selectTime||!this.selectNonTime||!this.selectBlank||!this.selectError){return true;}return(this.from!==null&&(!this.initializedUI||this.from>this.config.min))||(this.to!==null&&(!this.initializedUI||this.to<this.config.max));},getRequirementDiscription:function(){var res='{cells in "'+this.config.name+'" are';var res2="";if(this.selectTime&&this.timeCount>0){res2+=" "+this.statusNode.innerHTML;}if(this.selectNonTime&&this.nonTimeCount>0){if(res2){res2+=" /";}res2+=" (Non-Time)";}if(this.selectBlank&&this.blankCount){if(res2){res2+=" /";}res2+=" (blank)";}res2+="}";return res+res2;},postBuildRendering:function(){if(this._super){this._super();}this.titleNode.innerHTML=this.config.name;this.titleNode.title=this.config.name;},updateState:function(data){if(data.hasOwnProperty("min")&&data.hasOwnProperty("max")&&data.baseTimeCount!==0){this.error=false;this.config.min=data.min;this.config.max=data.max;this.config.step=data.step;this.baseBins=data.baseBins;this.bins=data.bins;switch(this.config.mode){case"min":this.from=Math.max(data.from,this.config.min);break;case"max":this.to=Math.min(data.to,this.config.max);break;default:this.from=Math.max(data.from,this.config.min);if(data.to){this.to=Math.min(data.to,this.config.max);}else{this.to=data.max;}}this.baseTimeCount=data.baseTimeCount;this.baseNonTimeCount=data.baseNonTimeCount;this.baseBlankCount=data.baseBlankCount;this.baseErrorCount=data.baseErrorCount;this.timeCount=data.timeCount;this.nonTimeCount=data.nonTimeCount;this.blankCount=data.blankCount;this.errorCount=data.errorCount;}else{if(data.baseTimeCount===0){this.error=true;this.errorMessage="No date value present.";}else{this.error=true;this.errorMessage=data.hasOwnProperty("error")?data.error:"Unknown error.";}}this._render();},initializeUI:function(){this.histogram=new mstrmojo.Refine.HistogramWidget({slot:"histogramNode",options:{binColors:["#dad8d8","#67c0f0"],binBorderColors:["cbcbcb","4bafe5"]}});this.addChildren([this.histogram]);this.sliderWidget=new mstrmojo.Refine.SliderWidget({sliderNode:this.sliderNode});this.addChildren([this.sliderWidget]);this.attachEventListener("slide",this.id,this.handleSlide);this.attachEventListener("stop",this.id,this.handleStop);},handleSlide:function(evt){this.from=evt.from;this.to=evt.to;this.setRangeIndicators();},handleStop:function(evt){this.from=evt.from;this.to=evt.to;this.selectTime=true;this.parent.updateEngine(true);},_render:function(){if(!this.initializedUI){this.initializeUI();this.initializedUI=true;}if(this.error){this.messageNode.innerHTML=this.errorMessage;this.messageNode.style.display="block";this.sliderNode.style.display="none";this.histogramNode.style.display="none";this.statusNode.style.display="none";this.otherChoicesNode.style.display="none";return ;}this.messageNode.style.display="none";this.sliderNode.style.display="block";this.histogramNode.style.display="block";this.statusNode.style.display="block";this.otherChoicesNode.style.display="block";this.sliderWidget.update(this.config.min,this.config.max,this.config.step,this.from,this.to);this.histogram.update(this.config.min,this.config.max,this.config.step,[this.baseBins,this.bins]);this.setRangeIndicators();this.renderOtherChoices();},hasOtherChoices:function(){if(this.baseNonTimeCount===0&&this.baseBlankCount===0&&this.baseErrorCount===0){return false;}return true;},renderOtherChoices:function(){while(this.otherChoicesNode.hasChildNodes()){this.otherChoicesNode.removeChild(this.otherChoicesNode.lastChild);}if(this.baseNonTimeCount===0&&this.baseBlankCount===0&&this.baseErrorCount===0){return ;}this.choicesNode=document.createElement("div");this.choicesNode.className="facet-range-choices";this.otherChoicesNode.appendChild(this.choicesNode);var childrenNodes=[];choiceNode.slot="choicesNode";choiceNode.label=mstrmojo.desc(487,"Time");choiceNode.count=this.timeCount;choiceNode.checked=(this.selectTime&&this.baseTimeCount!==0);childrenNodes.push(new mstrmojo.Widget(choiceNode));choiceNode.slot="choicesNode";choiceNode.label=mstrmojo.desc(12354,"Non-Time");choiceNode.count=this.nonTimeCount;choiceNode.checked=(this.selectNonTime&&this.baseNonTimeCount!==0);childrenNodes.push(new mstrmojo.Widget(choiceNode));choiceNode.slot="choicesNode";choiceNode.label=mstrmojo.desc(2797,"Blank");choiceNode.count=this.blankCount;choiceNode.checked=(this.selectBlank&&this.baseBlankCount!==0);childrenNodes.push(new mstrmojo.Widget(choiceNode));choiceNode.slot="choicesNode";choiceNode.label=mstrmojo.desc(96,"Error");choiceNode.count=this.errorCount;choiceNode.checked=(this.selectError&&this.baseErrorCount!==0);childrenNodes.push(new mstrmojo.Widget(choiceNode));this.addChildren(childrenNodes);},getJSON:function(){var idx;var model=mstrApp.rootController.refineApp.rootController.model;var curColumn=model.columns.columns;var findOriginColName=false;if(this.config.originalName!==undefined){findOriginColName=true;for(idx=0;idx<curColumn.length;idx++){if(curColumn[idx].originalName===this.config.originalName){break;}}if(idx===curColumn.length){findOriginColName=false;}}var o={type:"timerange",name:findOriginColName?curColumn[idx].name:this.config.name,columnName:findOriginColName?curColumn[idx].name:this.config.columnName,expression:this.config.expression,selectTime:this.selectTime,selectNonTime:this.selectNonTime,selectBlank:this.selectBlank,selectError:this.selectError};if(this.from!==null){o.from=this.from;}if(this.to!==null){o.to=this.to;}return o;}});}());