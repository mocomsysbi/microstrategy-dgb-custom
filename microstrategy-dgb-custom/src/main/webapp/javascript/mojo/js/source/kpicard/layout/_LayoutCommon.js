(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.array","mstrmojo.kpicard.SingleKPICard");var $HASH=mstrmojo.hash,$ARR=mstrmojo.array,$SingleKPICard=mstrmojo.kpicard.SingleKPICard;mstrmojo.kpicard.layout._LayoutCommon=mstrmojo.provide("mstrmojo.kpicard.layout._LayoutCommon",{_mixinName:"mstrmojo.kpicard.layout._LayoutCommon",init:function init(props){this._super(props);},render:function render(){this.cssText="";this._super();},updateSingleKPIProps:function updateSingleKPIProps(props){var width=this.width,height=this.height;props.width=parseInt(width)+"px";props.height=parseInt(height)+"px";},createSingleKPIs:function createSingleKPIs(){var singleKPIModels=this.singleKPIModels,singleKPICnt=singleKPIModels.length,containerNode=this.containerNode,div,children=[],child,props,me=this;singleKPIModels.forEach(function(singleKPIModel,index){div=document.createElement("div");containerNode.appendChild(div);props={placeholder:div,parent:me,widgetId:me.widgetId,dataModel:singleKPIModel};me.updateSingleKPIProps(props,singleKPICnt,index);child=new $SingleKPICard(props);child.render();children.push(child);});this.children=children;},forEachChild:function forEachChild(callback){$ARR.forEach(this.children,function(child,idx){if(child){return callback(child,idx);}});},getChildByIndex:function getChildByIndex(index){return this.children&&this.children[index];},findCardElemIdByIdx:function findCardElemIdByIdx(cardIdx){var kpiCard,kpiCardDataModel;kpiCard=this.getChildByIndex(cardIdx);kpiCardDataModel=kpiCard&&kpiCard.dataModel;return kpiCardDataModel&&kpiCardDataModel.elemId;},findCardIdxByElemId:function findCardIdxByElemId(elemId){var cardIdx=0,kpiCards=this.children,kpiCard,kpiCardsLength,kpiCardDataModel;if(!elemId||!kpiCards){return cardIdx;}kpiCardsLength=(kpiCards&&kpiCards.length)||0;for(cardIdx=0;cardIdx<kpiCardsLength;cardIdx+=1){kpiCard=kpiCards[cardIdx];kpiCardDataModel=kpiCard&&kpiCard.dataModel;if(kpiCardDataModel&&kpiCardDataModel.elemId===elemId){break;}}return cardIdx<kpiCardsLength?cardIdx:0;}});}());