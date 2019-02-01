(function(){mstrmojo.requiresClsP("mstrmojo.chart","GraphObjectManager","TrendLineObject","Rect2D","TripleId","TrendLineObject","ChartContext");mstrmojo.requiresClsP("mstrmojo.chart.enums","EnumValueAxis","EnumTrendLineIndex","EnumAnchorPoint","EnumCollectionType","EnumGraphMajorType","EnumFontRotation");mstrmojo.requiresClsP("mstrmojo.chart.model.enums","EnumDSSGraphMarkerShape","EnumDSSGraphType","EnumDSSGraphProperty","EnumDSSGraphDataTextPosition","EnumDSSGraphObject");var $C=mstrmojo.chart,$CHART_ENUMS=$C.enums,$CT=$CHART_ENUMS.EnumCollectionType,$GMT=$CHART_ENUMS.EnumGraphMajorType,$VA=$CHART_ENUMS.EnumValueAxis,$AP=$CHART_ENUMS.EnumAnchorPoint,$NULL_ID=$C.gNullTripleId,$NULL_OBJECT_ID=$C.gNullObjectId,$M=mstrmojo.chart.model,$MODEL_ENUMS=$M.enums,$GT=$MODEL_ENUMS.EnumDSSGraphType,$MS=$MODEL_ENUMS.EnumDSSGraphMarkerShape,$GP=$MODEL_ENUMS.EnumDSSGraphProperty,$DTP=$MODEL_ENUMS.EnumDSSGraphDataTextPosition,$GO=$MODEL_ENUMS.EnumDSSGraphObject;mstrmojo.chart.Plot=mstrmojo.declare(mstrmojo.chart.GraphObjectManager,null,{scriptClass:"mstrmojo.chart.Plot",mDatasetPtr:null,mLegendPtr:null,mSeriesId:null,mDataArea:null,mTrendLines:null,mPostTrendLineObjects:null,mHasSizeBy:false,mHasColorBy:false,mPartialRendering:false,mClippedElementSize:null,shownDataLabels:[],shownRefLabels:[],dataLabelManager:null,axisOriginLabels:[],DPCount:0,seriesDPCount:[],init:function init(props){this._super(props);this.mSeriesId=[];this.mTrendLines=[[],[]];this.mPostTrendLineObjects=[];var chartCtx=this.mChartContextPtr,gmCtx=chartCtx.GetGraphMatrixContext();this.mHasSizeBy=gmCtx.mHasSizeBy;this.mHasColorBy=gmCtx.mHasColorBy;this.mPartialRendering=chartCtx.mPartialRendering;this.mClippedElementSize={};this.shownDataLabels=[];this.shownRefLabels=[];this.dataLabelManager=null;this.axisOriginLabels=[];if(props.Area){this.mDataArea=new $C.Rect2D({Rect2D:props.Area});}this.DPCount=0;this.seriesDPCount=[];},Draw:function Draw(props){var skip=false;if(props&&props.Skip){props.Skip--;skip=true;}this._super();if(!skip){this.DrawTrendLinesAndEquationsInArea(this.mDataArea,false);this.DrawTrendLinesAndEquationsInArea(this.mDataArea,true);this.DrawPostTrendLineObjects();}},DrawTrendLinesAndEquations:function DrawTrendLinesAndEquations(){var dataArea=this.mDataArea;this.DrawTrendLinesAndEquationsInArea(dataArea,false);this.DrawTrendLinesAndEquationsInArea(dataArea,true);},OnRectangleSelection:function OnRectangleSelection(iRect,iSelectedObjects,type){type=type||0;return iSelectedObjects;},SetDataArea:function SetDataArea(iDataArea){if(this.mDataArea===null){this.mDataArea=new $C.Rect2D({Rect2D:iDataArea});}else{this.mDataArea.ResetRect(iDataArea);}},MoveLabel:function MoveLabel(iTextObject,iTopRight,iBottomLeft,iIsReverse,iIsVertical,iLabelLocation){var textRect,halfWidth,halfHeight,max,min,temp,sign,centerPoint;if(iTextObject===null){return ;}textRect=iTextObject.GetBoundingRect();halfWidth=textRect.width/2;halfHeight=textRect.height/2;max=iTopRight;min=iBottomLeft;if(iIsReverse){temp=max;max=min;min=temp;}centerPoint=max;if(iLabelLocation===$DTP.DssGraphDTPositionOutMin||iLabelLocation===$DTP.DssGraphDTPositionInMin){centerPoint=min;}sign=iIsReverse?-1:1;switch(iLabelLocation){case $DTP.DssGraphDTPositionCenter:centerPoint=max.MiddleTo(min);break;case $DTP.DssGraphDTPositionInMin:case $DTP.DssGraphDTPositionOutMax:if(iIsVertical){centerPoint.y-=halfHeight*sign;}else{centerPoint.x+=halfWidth*sign;}break;case $DTP.DssGraphDTPositionOutMin:case $DTP.DssGraphDTPositionInMax:if(iIsVertical){centerPoint.y+=halfHeight*sign;}else{centerPoint.x-=halfWidth*sign;}break;default:break;}iTextObject.MoveTo(centerPoint.x,centerPoint.y,$AP.CENTER);},AddLegendMarkerToCollection:function AddLegendMarkerToCollection(iSeriesId,iRiserCollection,iIsLineCollection,iIsShownMarker,iMarkerShape,iIsShownLine,iIsLineVertical){var chartCtx=this.mChartContextPtr,legendMarkerId,legendMarker,marker,graphType,graphMajorType;if(this.mLegendPtr===null||iRiserCollection===null){return ;}if(chartCtx.mIsGraphMatrix){return ;}iIsLineCollection=iIsLineCollection||false;iMarkerShape=iMarkerShape||$MS.DssGraphMarkerShapeRectangle;iIsLineVertical=iIsLineVertical||false;if(iIsShownMarker===undefined){iIsShownMarker=true;}if(iIsShownLine===undefined){iIsShownLine=true;}graphType=chartCtx.mGraphType;legendMarkerId=new $C.TripleId({ObjectId:$GO.DssGraphLegendMarker,SeriesId:iSeriesId});legendMarker=this.mLegendPtr.GetGraphObject(legendMarkerId);if(legendMarker){if(iIsLineCollection){marker=legendMarker;iRiserCollection.AddGraphObject(legendMarker,false);if(iIsShownLine&&graphType!==$GT.DssGraphTypePareto_Percent){legendMarkerId.mObjectId=$GO.DssGraphDataLine;this.mLegendPtr.SetFormatLineOfLegendMarkerLine(chartCtx.GetFormatLine(legendMarkerId,$CT.CT_LINE),iSeriesId,iIsLineVertical);}legendMarkerId.mObjectId=$GO.DssGraphRiser;marker.SetFormatLine(chartCtx.GetFormatLine(legendMarkerId,$CT.CT_NO_COLLECTION));marker.SetFormatFill(chartCtx.GetFormatFill(legendMarkerId,$CT.CT_DEPTH_LINE_OR_LINE_MARKER));marker.mIsShown=iIsShownMarker;if(iIsShownMarker){marker.SetMarkerShape(iMarkerShape);}}else{graphMajorType=chartCtx.GetGraphMajorType();iRiserCollection.AddGraphObject(legendMarker);if(graphMajorType===$GMT.GMT_BUBBLE){if(iIsShownLine){legendMarkerId.mObjectId=$GO.DssGraphDataLine;this.mLegendPtr.SetFormatLineOfLegendMarkerLine(chartCtx.GetFormatLine(legendMarkerId,$CT.CT_LINE),iSeriesId);}if(iIsShownMarker){marker=legendMarker;marker.SetMarkerShape(iMarkerShape);}}if(graphType===$GT.DssGraphTypePareto_Percent||graphMajorType===$GMT.GMT_GAUGE){if(iIsShownMarker){marker=legendMarker;marker.SetMarkerShape(iMarkerShape);}}if(graphMajorType===$GMT.GMT_STOCK){if(iIsShownLine){legendMarkerId.mObjectId=$GO.DssGraphRiser;this.mLegendPtr.SetFormatLineOfLegendMarkerLine(chartCtx.GetFormatLine(legendMarkerId,$CT.CT_LINE),iSeriesId,iIsLineVertical);}if(iIsShownMarker){marker=legendMarker;marker.SetMarkerShape(iMarkerShape);}}}}},CreateTrendLine:function CreateTrendLine(iX,iY,iTripleId,iManager,iParentObject,iXAxis,iYAxis,iTrendLineOptions,iDataArea,iIsVertical,iDepthOffset,iIsY2){},AdjustTrendLineEquation:function AdjustTrendLineEquation(iRect,iIndex){},DrawTrendLinesAndEquationsInArea:function DrawTrendLinesAndEquationsInArea(iClipRect,iIsY2){var chartCtx=this.mChartContextPtr,trendLine=iIsY2?this.mTrendLines[1]:this.mTrendLines[0],i;if(trendLine.length===0){return ;}chartCtx.saveState();chartCtx.DrawRectangle(iClipRect,true);chartCtx.Clip();for(i=0;i<trendLine.length;++i){trendLine[i].Draw();}chartCtx.RestoreState();for(i=0;i<trendLine.length;++i){var text=trendLine[i].mTextPtr;if(text!==null){text.Draw();}}},DrawPostTrendLineObjects:function DrawPostTrendLineObjects(){var postObjects=this.mPostTrendLineObjects,len=postObjects.length,i;for(i=0;i<len;++i){postObjects[i].Draw();}},LoadTrendLineProperties:function LoadTrendLineProperties(iSeriesId,iTrendLineOption){var chartCtx=this.mChartContextPtr;if(chartCtx.mIsGraphMatrix||!!iTrendLineOption){return ;}if(chartCtx.mIsGraphMatrix){var resultVal=this.mDatasetPtr.GetTrendLinePropertiesBySeries(iSeriesId);if(resultVal){iTrendLineOption.mRegressionType=resultVal.RegressionType||iTrendLineOption.mRegressionType;if(resultVal.Order!==null&&resultVal.Order!==undefined){iTrendLineOption.mOrder=resultVal.Order;}if(resultVal.Period!==null&&resultVal.Period!==undefined){iTrendLineOption.mPeriod=resultVal.Period;}iTrendLineOption.mShowCoefficients=resultVal.ShowCoefficients||iTrendLineOption.mShowCoefficients;iTrendLineOption.mShowEquation=resultVal.ShowEquation||iTrendLineOption.mShowEquation;iTrendLineOption.mUserSeriesGraphColor=resultVal.UserSeriesGraphColor||iTrendLineOption.mUserSeriesGraphColor;}}else{var value,tripleId=new $C.TripleId({ObjectId:$GO.DssGraphRiser,SeriesId:iSeriesId});value=chartCtx.GetProperty($GP.DssGraphSDRegressionType,tripleId);if(value){iTrendLineOption.mRegressionType=value;}value=chartCtx.GetProperty($GP.DssGraphSDPolyFactor,tripleId);if(value){iTrendLineOption.mOrder=value;}value=chartCtx.GetProperty($GP.DssGraphSDMOVAFactor,tripleId);if(value){iTrendLineOption.mPeriod=value;}value=chartCtx.GetProperty($GP.DssGraphShowSDLinrCorr,tripleId);if(value){iTrendLineOption.mShowCoefficients=value;}value=chartCtx.GetProperty($GP.DssGraphShowSDLinrFormula,tripleId);if(value){iTrendLineOption.mShowEquation=value;}tripleId.mObjectId=$NULL_OBJECT_ID;value=chartCtx.GetProperty($GP.DssGraphCurveColorAsSeries,tripleId);if(value){iTrendLineOption.mUserSeriesGraphColor=value;}}},LoadValueAxisInfo:function LoadValueAxisInfo(iSeriesIndex,iIsDualAxes){var chartCtx=this.mChartContextPtr,seriesId=this.mSeriesId,value,tripleId,valueAxis;if(iIsDualAxes){if(chartCtx.mIsGraphMatrix){valueAxis=this.mDatasetPtr.GetValueAxisBySeries(seriesId[iSeriesIndex]);}else{value=chartCtx.GetProperty($GP.DssGraph2DSplitYAutomatic,$NULL_ID);if(value===null||value===undefined){valueAxis=(iSeriesIndex%2===0)?$VA.VA_Y1:$VA.VA_Y2;}else{tripleId=new $C.TripleId({ObjectId:$GP.DssGraphRiser,SeriesId:seriesId[iSeriesIndex]});value=chartCtx.GetProperty($GP.DssGraph2DSDSplitY,tripleId);if(value){valueAxis=value?$VA.VA_Y2:$VA.VA_Y1;}}}}else{valueAxis=$VA.VA_Y1;}return valueAxis;},GetDataset:function GetDataset(){return this.mDatasetPtr;},SetDataset:function SetDataset(iDataSetPtr){this.mDatasetPtr=iDataSetPtr;},AddSeries:function AddSeries(iSeriesId){this.mSeriesId.push(iSeriesId);},GetMaxElementOffsetClippedByBoundary:function GetMaxElementOffsetClippedByBoundary(isX,isPrimary){var result={X1:{LowOffset:0,HighOffset:0},X2:{LowOffset:0,HighOffset:0},Y1:{LowOffset:0,HighOffset:0},Y2:{LowOffset:0,HighOffset:0}},chartCtx=this.mChartContextPtr;if(chartCtx.IsBarChart()||chartCtx.mGraphType===$GT.DssGraphTypeGridChart){return result;}if(chartCtx.IsLineChart()||chartCtx.IsAreaChart()){return result;}return result;}});}());