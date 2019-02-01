(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._HasLayout","mstrmojo.kpicard.layout._LayoutCommon","mstrmojo.kpicard.KPICardEnum","mstrmojo.ui._HasScroller","mstrmojo.util.ui._LassoSelector","mstrmojo.VisEnum");var $KPI_PROPERTIES=mstrmojo.kpicard.KPI_PROPERTIES,$CTRL_TYPE=mstrmojo.VisEnum.ControlType,MIN_CARD_HEIGHT=90,$NEW_CARD_STYLE_MARGIN=mstrmojo.kpicard.NEW_STYLE_MARGIN;mstrmojo.kpicard.layout.GridLayout=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout,mstrmojo.kpicard.layout._LayoutCommon,mstrmojo.ui._HasScroller],{scriptClass:"mstrmojo.kpicard.layout.GridLayout",cssClass:"horizontal-kpi-container",layoutConfig:{w:{containerNode:"100%"},xt:true},init:function init(prop){this._super(prop);var maxHeight=Math.floor(parseFloat(this.height));this.scCssText=(this.scCssText||"")+";max-height:"+maxHeight+"px";},markupString:'<div class="{@cssClass}" style="{@cssText}" ><div class="scroll-container" style="{@scCssText}"><div class="me-content"></div></div></div>',markupSlots:{containerNode:function containerNode(){return this.domNode.firstChild.firstChild;},scrollNode:function(){return this.domNode.firstChild;},scrollbarHostNode:function(){return this.domNode;}},updateScrollbars:function updateScrollbars(){this._super();if(this.scrollNode&&this.scrollBarNodes){var verticalScrollBar=this.scrollBarNodes.v,horizontalScrollBar=this.scrollBarNodes.h;if(verticalScrollBar){verticalScrollBar.setAttribute("type",$CTRL_TYPE.KPI_V_SCROLLBAR);}if(horizontalScrollBar){horizontalScrollBar.setAttribute("type",$CTRL_TYPE.KPI_H_SCROLLBAR);}}},postBuildRendering:function postBuildRendering(){this._super();this.domNode.style.display="";this.createSingleKPIs();},render:function render(){this._super();this.updateScrollbars();},updateSingleKPIProps:function updateSingleKPIProps(props,singleKPICnt,singleKPIIndex){var columnCnt=this.parent.getFormatPropertyValue($KPI_PROPERTIES.GRID_COLUMN_COUNT);columnCnt=columnCnt>singleKPICnt?singleKPICnt:columnCnt;var isCardHeightFixed=this.parent.getFormatPropertyValue($KPI_PROPERTIES.FIX_CARD_HEIGHT),fixedCardHeight=this.parent.getFormatPropertyValue($KPI_PROPERTIES.CARD_HEIGHT),layoutWidth=parseFloat(this.width),layoutHeight=parseFloat(this.height),rowCnt=Math.ceil(singleKPICnt/columnCnt),hMarginSum=(columnCnt-1)*$NEW_CARD_STYLE_MARGIN,vMarginSum=(rowCnt-1)*$NEW_CARD_STYLE_MARGIN,calCardWidth=Math.floor((layoutWidth-hMarginSum)/columnCnt),calCardHeight=Math.floor((layoutHeight-vMarginSum)/rowCnt),wRem=layoutWidth-hMarginSum-calCardWidth*columnCnt,hRem=layoutHeight-vMarginSum-calCardHeight*rowCnt;props.width=((wRem>(singleKPIIndex%columnCnt)?1:0)+calCardWidth)+"px";if(isCardHeightFixed){props.height=fixedCardHeight+"px";}else{calCardHeight=((hRem>Math.floor(parseFloat(singleKPIIndex)/columnCnt)?1:0)+calCardHeight);if(calCardHeight<MIN_CARD_HEIGHT){calCardHeight=MIN_CARD_HEIGHT;}props.height=calCardHeight+"px";}this.updateSingleKPINewStyleProps(props,singleKPIIndex,columnCnt,$NEW_CARD_STYLE_MARGIN);},updateSingleKPINewStyleProps:function updateSingleKPINewStyleProps(props,singleKPIIndex,columnCnt,cardMargin){var hIdx=parseInt(singleKPIIndex%columnCnt,10),vIdx=parseInt(singleKPIIndex/columnCnt,10);if(hIdx>0){props.cardMarginLeft=cardMargin+"px";}if(vIdx>0){props.cardMarginTop=cardMargin+"px";}}});}());