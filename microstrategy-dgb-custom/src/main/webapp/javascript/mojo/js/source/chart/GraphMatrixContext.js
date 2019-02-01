(function(){mstrmojo.requiresClsP("mstrmojo.chart.model.enums","EnumDSSGraphFillEffect","EnumDSSGraphMarkerShape","EnumDSSGraphType","EnumShapeType","EnumDSSExtraGraphProperty");mstrmojo.requiresClsP("mstrmojo.chart.enums","EnumFillType","EnumGraphMajorType","EnumGraphMatrixMarkerTypeInChart","EnumGraphMatrixElementSizeMode");mstrmojo.requiresCls("mstrmojo.Base");var $C=mstrmojo.chart,$K=$C.ChartConstants,$COMMON=$C.common,$M=$C.model,$MODEL_ENUM=$M.enums,$MS=$MODEL_ENUM.EnumDSSGraphMarkerShape,$GT=$MODEL_ENUM.EnumDSSGraphType,$SHP=$MODEL_ENUM.EnumShapeType,$CHART_ENUM=$C.enums,$GMT=$CHART_ENUM.EnumGraphMajorType,$GM_MarkerStyle=$CHART_ENUM.EnumGraphMatrixMarkerTypeInChart,$GM_ESM=$CHART_ENUM.EnumGraphMatrixElementSizeMode;function hGetMaxSizeRatioInAutomaic(markerStyle){var ratioToMaxRadius=0.9;switch(markerStyle){case $GM_MarkerStyle._MUTATION_IN_LINE:case $GM_MarkerStyle._ISODOT_IN_LINEAREA:ratioToMaxRadius=this.mHasSizeBy?0.9:0.5;break;case $GM_MarkerStyle._PIE:if(this.getPieShapeLayout()===$GMT.GMT_GRID){var enableDataLabels=this.parentContext&&this.parentContext.mDatasetPtr&&this.parentContext.mDatasetPtr.showPieDatalabels();ratioToMaxRadius=enableDataLabels?0.5:0.9;}break;case $GM_MarkerStyle._SHAPES_IN_BUBBLESCATTER:ratioToMaxRadius=this.mHasSizeBy?0.9:0.5;break;case $GM_MarkerStyle._TICK_CATEGORY:case $GM_MarkerStyle._TICK_VALUE:case $GM_MarkerStyle._TICK_GRID:ratioToMaxRadius=0.8;break;}return ratioToMaxRadius;}function hGetMaxElementSizeInAreaLineChart(isArea,isVertical,groupCount,isIsolatedDot,shape,forecastCount){isIsolatedDot=isIsolatedDot||false;if(shape!==0){shape=shape||this.mMarkerShape;}if(forecastCount===undefined||forecastCount===null){forecastCount=0;}var markerSize=0,isGenericShape=(shape===$MS.DssGraphMarkerShapeNone);if(isIsolatedDot){isGenericShape=isIsolatedDot;}var coreGroupCount=groupCount-forecastCount;if(this.mHasSizeBy||!isGenericShape||groupCount===1||coreGroupCount===1){var variantType=isGenericShape?$GM_MarkerStyle._LINE_IN_LINE:$GM_MarkerStyle._MUTATION_IN_LINE;if(isGenericShape){if(groupCount===1){variantType=$GM_MarkerStyle._DOTS_IN_LINE;if(!this.mHasSizeBy){return calMaxSizeIsoPoint(this.mElementsInfo.Max.Size,this.mEstGraphHeight,this.mEstGraphWidth);}}else{if(isIsolatedDot){variantType=$GM_MarkerStyle._DOTS_IN_LINE;}}}else{if(groupCount===1){variantType=$GM_MarkerStyle._ISODOT_IN_LINEAREA;}if(!this.mHasSizeBy){markerSize=(this.mEstGraphWidth/(groupCount+1)/2);markerSize=Math.min(markerSize,12);return markerSize;}}markerSize=this.GetMaxMarkerSize(variantType,isVertical,groupCount,this.mHasSizeBy);}else{if(isArea){if(isIsolatedDot){return calMaxSizeIsoPoint(this.mElementsInfo.Max.Size,this.mEstGraphHeight,this.mEstGraphWidth);}return 0;}else{if(isIsolatedDot){return calMaxSizeIsoPoint(this.mElementsInfo.Max.Size,this.mEstGraphHeight,this.mEstGraphWidth);}var chartCtx=this.parentContext;if(chartCtx&&chartCtx.mDatasetPtr){var formatLine=chartCtx.mDatasetPtr.getGenericLineFormat(0,0);markerSize=formatLine&&formatLine.mLineThickness;if(markerSize<=2){markerSize=3;}}}markerSize=Math.max(markerSize,this.mConstants.MinimalSize.Line);}return markerSize;}function calMaxSizeIsoPoint(maxSize,estGraphWidth,estGraphHeight){return maxSize*3.25+(Math.min(estGraphHeight,estGraphWidth)*0.00375);}mstrmojo.chart.GraphMatrixContext=mstrmojo.declare(mstrmojo.Base,null,{scriptClass:"mstrmojo.chart.GraphMatrixContext",mHasSizeBy:false,mMaxSizeVal:100000,mMinSizeVal:0,mCustomScaleForSizeBy:false,mHasColorBy:false,mEstGraphWidth:600,mEstGraphHeight:400,mMarkerShape:0,mGraphType:0,mClippedPaddings:null,mHasChartWithOnlyDataMarkers:false,mIsNeedRotateDataLabel:false,mIsNeedAdjustAxis:false,mShownValueTickSet:null,mIsolatedDots:null,mConstants:null,mInputs:null,mElementsInfo:null,parentContext:null,init:function init(props){this.mShownValueTickSet=[{},{}];this.mClippedPaddings={X1:{LowOffset:0,HighOffset:0},X2:{LowOffset:0,HighOffset:0},Y1:{LowOffset:0,HighOffset:0},Y2:{LowOffset:0,HighOffset:0}};if(props&&props.GraphType){this.mGraphType=props.GraphType;}this.mElementsInfo={Max:{Size:0.9,Mode:0},Min:{Size:0,Mode:0}};this.mConstants={FixedTickerSize:2,FixedDataMarkerSize:3,MinimalSize:{Bar:5,Pie:10,Band:10,Line:1,ProportionalMin:1,General:2},MaximalSize:{Bar:44,Band:100},CondenseLimit:{Percentage:10,Default:-1}};},GetAdjustThicknessValue:function GetAdjustThicknessValue(originValue){switch(originValue){case 1:case 2:case 3:case 4:originValue++;break;default:break;}return originValue;},AddToIsolatedDotList:function AddToIsolatedDotList(tripleId){if(this.mIsolatedDots===null){this.mIsolatedDots=new $COMMON.MapStructure();}this.mIsolatedDots.replaceByTripleId(tripleId,true);},IsIsolatedDot:function IsIsolatedDot(tripleId,isLine){if(this.mIsolatedDots===null){return false;}isLine=(isLine!==undefined)?isLine:false;if(isLine){if(this.mMarkerShape!==$MS.DssGraphMarkerShapeNone){return false;}}return(this.mIsolatedDots.findByTripleId(tripleId)!==undefined);},IsIsolatedDotInLine:function IsIsolatedDotInLine(tripleId){return this.IsIsolatedDot(tripleId,true);},GetMaxElementSizeInAreaChart:function GetMaxElementSizeInAreaChart(isVertical,groupCount,isIsolatedDot,forecastCount){return hGetMaxElementSizeInAreaLineChart.call(this,true,isVertical,groupCount,isIsolatedDot,null,forecastCount);},GetMaxElementSizeInLineChart:function GetMaxElementSizeInLineChart(isVertical,groupCount,isIsolatedDotInLine,shape){return hGetMaxElementSizeInAreaLineChart.call(this,false,isVertical,groupCount,isIsolatedDotInLine,shape);},GetValueAxisPadding:function GetValueAxisPadding(isX,highEnd,isPrimary){if(isPrimary===undefined){isPrimary=true;}var axisClippedKey=isX?(isPrimary?"X1":"X2"):(isPrimary?"Y1":"Y2");return highEnd?this.mClippedPaddings[axisClippedKey].HighOffset:this.mClippedPaddings[axisClippedKey].LowOffset;},UpdateValueAxisPadding:function UpdateValueAxisPadding(props){var i,isX,axisClippedKey,isPrimary,j;for(i=0;i<2;++i){for(j=0;j<2;++j){isX=i===0;isPrimary=j===0;axisClippedKey=isX?(isPrimary?"X1":"X2"):(isPrimary?"Y1":"Y2");if(props[axisClippedKey]!==undefined){this.mClippedPaddings[axisClippedKey].LowOffset=props[axisClippedKey].LowOffset;this.mClippedPaddings[axisClippedKey].HighOffset=props[axisClippedKey].HighOffset;}}}},GetMaxMarkerSize:function GetMaxMarkerSize(markerStyle,isVertical,unitCount,isBubbleChart){isBubbleChart=isBubbleChart===undefined?false:isBubbleChart;var elementsInfo=this.mElementsInfo,upperLimit=10000,maxBubble=24,maxScatter=12,categorySpace=isVertical?this.mEstGraphWidth:this.mEstGraphHeight,categorySpaceLimit=categorySpace/(unitCount*2)+0.5,ratioToMaxRadius=elementsInfo.Max.Size,inputLineWidth=elementsInfo.Max.Size;if(markerStyle===$GM_MarkerStyle._MUTATION_IN_LINE||markerStyle===$GM_MarkerStyle._ISODOT_IN_LINEAREA){ratioToMaxRadius=inputLineWidth;}if(elementsInfo.Max.Mode===$GM_ESM._AUTOMATIC){if(markerStyle!==$GM_MarkerStyle._LINE_IN_LINE){upperLimit=this.mHasSizeBy?24:12;}if(markerStyle!==$GM_MarkerStyle._LINE_IN_LINE&&markerStyle!==$GM_MarkerStyle._DOTS_IN_LINE){upperLimit=isBubbleChart?maxBubble:maxScatter;}ratioToMaxRadius=hGetMaxSizeRatioInAutomaic.call(this,markerStyle);}switch(markerStyle){case $GM_MarkerStyle._LINE_IN_LINE:case $GM_MarkerStyle._DOTS_IN_LINE:var chartSpace=isVertical?this.mEstGraphHeight:this.mEstGraphWidth,maxDiameter=chartSpace*0.15;maxDiameter=Math.min(maxDiameter,upperLimit*2);if(markerStyle===$GM_MarkerStyle._DOTS_IN_LINE){if(unitCount!==1){categorySpaceLimit=categorySpaceLimit*2;}maxDiameter=Math.min(maxDiameter,categorySpaceLimit);var lowerLimit=elementsInfo.Min.Size;if(elementsInfo.Min.Mode===$GM_ESM._MANUAL){lowerLimit=0;}maxDiameter=Math.max(maxDiameter/2,lowerLimit);}return maxDiameter;case $GM_MarkerStyle._MUTATION_IN_LINE:case $GM_MarkerStyle._ISODOT_IN_LINEAREA:case $GM_MarkerStyle._SHAPES_IN_BUBBLESCATTER:var maxRadius=1;maxRadius=Math.min(this.mEstGraphHeight,this.mEstGraphWidth)*0.15;maxRadius=Math.min(maxRadius*ratioToMaxRadius,upperLimit);if(markerStyle===$GM_MarkerStyle._MUTATION_IN_LINE||markerStyle===$GM_MarkerStyle._ISODOT_IN_LINEAREA){maxRadius=Math.min(maxRadius,categorySpaceLimit);maxRadius=Math.ceil(maxRadius);}return maxRadius;case $GM_MarkerStyle._PIE:var applyScaleFactor=true,kScaleFactor=0.2,pieLayout=this.getPieShapeLayout(),minWidthHeight=Math.min(this.mEstGraphWidth,this.mEstGraphHeight);if(pieLayout===$GMT.GMT_CATEGORY){var numericAxisLength=isVertical?this.mEstGraphHeight:this.mEstGraphWidth;if(minWidthHeight/numericAxisLength<0.15){applyScaleFactor=false;}}maxRadius=ratioToMaxRadius*minWidthHeight/2;if(pieLayout===$GMT.GMT_GRID||(pieLayout===$GMT.GMT_CATEGORY&&!applyScaleFactor)){if(elementsInfo.Max.Mode===$GM_ESM._AUTOMATIC){maxRadius=Math.min(maxRadius,250);}}else{maxRadius*=kScaleFactor;maxRadius=Math.min(maxRadius,minWidthHeight);if(elementsInfo.Max.Mode===$GM_ESM._AUTOMATIC){maxRadius=Math.min(maxRadius,50);}}if(pieLayout===$GMT.GMT_CATEGORY){maxRadius=Math.min(maxRadius,categorySpaceLimit);}maxRadius=Math.floor(Math.max(maxRadius,10));return maxRadius;case $GM_MarkerStyle._TICK_CATEGORY:case $GM_MarkerStyle._TICK_VALUE:case $GM_MarkerStyle._TICK_GRID:upperLimit=24;var baseSize=24;if(markerStyle===$GM_MarkerStyle._TICK_CATEGORY){baseSize=categorySpace/unitCount;}var variedDimSize=baseSize*ratioToMaxRadius;if(markerStyle===$GM_MarkerStyle._TICK_CATEGORY){variedDimSize=Math.min(variedDimSize,upperLimit);}return variedDimSize+0.5;default:return 0;}},GetScaledSize:function GetScaledSize(dataVal,maxSize,shape){if(!this.mHasSizeBy){return maxSize;}var minMode=this.mElementsInfo.Min.Mode,ratio=this.ToRatioEx(dataVal,(minMode===$GM_ESM._PROPORTIONAL));if(minMode===$GM_ESM._PROPORTIONAL&&shape!==null&&shape!==undefined){if(shape===$SHP._CIRCLE||shape===$SHP._PIE||shape===$SHP._PIESLICE||shape===$SHP._SQUARE){ratio=Math.sqrt(ratio);}}return this.GetScaledSizeWithRatio(ratio,maxSize);},GetScaledSizeWithRatio:function GetScaledSizeWithRatio(ratio,maxSize,minSize){var useSpecifiedMinSize=false,elementInfo=this.mElementsInfo,minElementMode=elementInfo.Min.Mode,minElementSize;if(!(isNaN(minSize)||minSize===null)){minElementSize=minSize;useSpecifiedMinSize=true;}else{minElementSize=elementInfo.Min.Size;}if(minElementMode===$GM_ESM._MANUAL){minElementSize=elementInfo.Min.Size*maxSize;if(minElementSize<0){minElementSize=0;}if(minElementSize>maxSize){minElementSize=maxSize;}}else{if(minElementMode===$GM_ESM._PROPORTIONAL){return Math.max(this.mConstants.MinimalSize.ProportionalMin,ratio*maxSize);}else{if(!useSpecifiedMinSize){minElementSize=this.mConstants.MinimalSize.General;}}}var range=Math.max((maxSize-minElementSize),0);var result=ratio*range+minElementSize;return Math.min(result,maxSize);},ToRatio:function ToRatio(data,max,min,useZeroAsBoundary){useZeroAsBoundary=useZeroAsBoundary||false;if(useZeroAsBoundary){if(min>0){min=0;}if(max<0){max=0;}}if(min===max){return 1;}if(data>max){data=max;}if(data<min){data=min;}return Math.min((data-min)/(max-min),1);},ToRatioEx:function ToRatioEx(data,useAbsValue){useAbsValue=useAbsValue||false;var max=this.mMaxSizeVal,min=this.mMinSizeVal;if(useAbsValue){data=Math.abs(data);max=Math.max(Math.abs(max),Math.abs(min));min=0;}else{data=Math.min(max,data);data=Math.max(min,data);}if(this.mCustomScaleForSizeBy){return this.ToRatio(data,max,min,false);}return this.ToRatio(data,max,min,useAbsValue);},getCondensedTextLimit:function getCondensedTextLimit(formatType){switch(formatType){case 4:return this.mConstants.CondenseLimit.Percentage;}return this.mConstants.CondenseLimit.Default;},GetRealTripleId:function GetRealTripleId(groupSubIndex,seriesSubIndex,baseId){var idSpan=800,tripleId=new $C.TripleId({TripleId:baseId});if(baseId.mSeriesId>=0){tripleId.mSeriesId+=seriesSubIndex*idSpan;}if(baseId.mGroupId>=0){tripleId.mGroupId+=groupSubIndex*idSpan;}return tripleId;},GetLogicalTripleId:function GetLogicalTripleId(realId){var tripleId=new $C.TripleId({TripleId:realId}),DssGraphPieSlice=341;if(realId.mObjectId===DssGraphPieSlice){tripleId.mSeriesId=this.hGetLogicalId(tripleId.mSeriesId);tripleId.mGroupId=this.hGetLogicalId(tripleId.mGroupId);}return tripleId;},hGetLogicalId:function hGetLogicalId(inputId){var idSpan=800;if(inputId<0){return inputId;}inputId%=idSpan;return inputId;},GetValueAxisZoomScale:function GetValueAxisZoomScale(valueAxisId){return 1;},checkPaddingBetweenLabels:function checkPaddingBetweenLabels(a,b,style,isX){if(style===undefined){return a.HasIntersection(b);}var checkCenter=0,checkBorder=1,checkExtra=5,distance,tolerance;if(isX){distance=Math.abs(a.x+a.width/2-b.x-b.width/2);}else{distance=Math.abs(a.y+a.height/2-b.y-b.height/2);}switch(style){case checkCenter:tolerance=this.getPadding($K.kBetweenLabelCenters);break;case checkExtra:distance-=0.5*(isX?a.width+b.width:a.height+b.height);tolerance=this.getPadding($K.kExtra);break;case checkBorder:if(isX){distance-=0.5*(a.width+b.width);}else{distance-=0.5*(a.height+b.height);}tolerance=this.getPadding($K.kBetweenLabels);break;default:return a.HasIntersection(b);}return distance<tolerance;},checkLabelPaddingToBorder:function checkLabelPaddingToBorder(rect,low,high,isX){var a,b,tolerance=this.getPadding($K.kLabelToChart);if(isX){a=rect.x;b=rect.x+rect.width;}else{a=rect.y;b=rect.y+rect.height;}return(a>=low+tolerance)&&(b+tolerance<=high);},getPadding:function getPadding(paddingType){switch(paddingType){case $K.kBetweenLabels:return 10;case $K.kBetweenLabelLines:return 5;case $K.kLabelToChart:return 5;case $K.kNumericLabelToTick:return 4;case $K.kExtra:return 2;case $K.kChartToChart:return 10;case $K.kEndTickToChart:return 10;case $K.kEndLabelToChart:return 5;case $K.kBetweenLabelCenters:return 20;case $K.kBandSide:var mode=this.mElementsInfo.Max.Mode;if(mode===$GM_ESM._AUTOMATIC){return 5;}return 0;case $K.kCategoricalLabelToTick:return 5;case $K.kDataLabel:return 5;case $K.kRefLabel:return 5;case $K.kAxisOriginLabel:return 5;default:return 0;}},getClippedOffset:function getClippedOffset(lowBoundary,highBoundary,radius,markerCenter,isXAxis,lowOffset,highOffset){var baseCoord=isXAxis?markerCenter.x:markerCenter.y;return{LowOffset:Math.max(lowOffset,radius-Math.abs(baseCoord-lowBoundary)),HighOffset:Math.max(highOffset,radius-Math.abs(highBoundary-baseCoord))};},getSizeByPieRadius:function getSizeByPieRadius(dataset,seriesId,groupId,maxSizeByVal,minSizeByVal,maxRadius){if(dataset===undefined||dataset===null){return -1;}var total=dataset.GetSizeByData(seriesId,groupId);if(total===undefined){return -1;}var result,minEleSizeMode=this.mElementsInfo.Min.Mode;var ratio=this.ToRatioEx(total,minEleSizeMode===$GM_ESM._PROPORTIONAL);if(minEleSizeMode===$GM_ESM._PROPORTIONAL){var range=Math.max(0,maxRadius-this.mConstants.MinimalSize.Pie);result=Math.round(range*ratio+this.mConstants.MinimalSize.Pie);}else{result=this.GetScaledSizeWithRatio(ratio,maxRadius,this.mConstants.MinimalSize.Pie);}return result;},updateGMGraphTypeWithMarkerShape:function updateGMGraphTypeWithMarkerShape(shapeType){if(shapeType){this.mMarkerShape=shapeType;}if(this.mMarkerShape!==202&&this.mMarkerShape!==201){return ;}switch(this.mGraphType){case $GT.DssGraphTypeGridChart:this.mGraphType=$GT.DssGraphTypeGrid_Pies;return ;case $GT.DssGraphTypeX_Y_Scatter:case $GT.DssGraphTypeDualAxis_X_Y_Scatter:case $GT.DssGraphTypeX_Y_Scatter_with_Labels:case $GT.DssGraphTypeDualAxis_X_Y_Scatter_with_Labels:this.mGraphType=$GT.DssGraphTypeScatter_Pies;return ;case $GT.DssGraphTypeBubble:case $GT.DssGraphTypeBubble_DualAxis:case $GT.DssGraphTypeBubble_With_Labels:case $GT.DssGraphTypeBubble_DualAxis_With_Labels:this.mGraphType=$GT.DssGraphTypeBubble_Pies;return ;case $GT.DssGraphTypeVertical_Area_Absolute:case $GT.DssGraphTypeVertical_Area_DualAxis_Absolute:case $GT.DssGraphTypeVertical_Area_BiPolar_Absolute:case $GT.DssGraphTypeVertical_Line_Absolute:case $GT.DssGraphTypeVertical_Line_BiPolar_Absolute:case $GT.DssGraphTypeVertical_Line_DualAxis_Absolute:case $GT.DssGraphTypeVertical_Bar_BiPolar_Absolute:case $GT.DssGraphTypeVertical_Bar_DualAxis_Absolute:case $GT.DssGraphTypeVertical_Bar_Absolute:case $GT.DssGraphTypeVertical_Bar_Side_by_Side:case $GT.DssGraphTypeVertical_Bar_DualAxis_Side_by_Side:case $GT.DssGraphTypeVertical_Bar_BiPolar_Side_by_Side:this.mGraphType=$GT.DssGraphTypeVertical_CategoryPies_Absolute;return ;case $GT.DssGraphTypeHorizontal_Bar_BiPolar_Absolute:case $GT.DssGraphTypeHorizontal_Bar_DualAxis_Absolute:case $GT.DssGraphTypeHorizontal_Bar_Absolute:case $GT.DssGraphTypeHorizontal_Area_Absolute:case $GT.DssGraphTypeHorizontal_Area_BiPolar_Absolute:case $GT.DssGraphTypeHorizontal_Area_DualAxis_Absolute:case $GT.DssGraphTypeHorizontal_Line_Absolute:case $GT.DssGraphTypeHorizontal_Line_BiPolar_Absolute:case $GT.DssGraphTypeHorizontal_Line_DualAxis_Absolute:case $GT.DssGraphTypeHorizontal_Bar_Side_by_Side:case $GT.DssGraphTypeHorizontal_Bar_DualAxis_Side_by_Side:case $GT.DssGraphTypeHorizontal_Bar_BiPolar_Side_by_Side:this.mGraphType=$GT.DssGraphTypeHorizontal_CategoryPies_Absolute;return ;case $GT.DssGraphTypeVertical_Bar_DualAxis_Stacked:case $GT.DssGraphTypeVertical_Bar_Stacked:case $GT.DssGraphTypeVertical_Bar_BiPolar_Stacked:case $GT.DssGraphTypeVertical_Area_BiPolar_Stacked:case $GT.DssGraphTypeVertical_Area_DualAxis_Stacked:case $GT.DssGraphTypeVertical_Area_Stacked:case $GT.DssGraphTypeVertical_Line_Stacked:case $GT.DssGraphTypeVertical_Line_BiPolar_Stacked:case $GT.DssGraphTypeVertical_Line_DualAxis_Stacked:this.mGraphType=$GT.DssGraphTypeVertical_CategoryPies_Stacked;return ;case $GT.DssGraphTypeHorizontal_Bar_Stacked:case $GT.DssGraphTypeHorizontal_Bar_DualAxis_Stacked:case $GT.DssGraphTypeHorizontal_Bar_BiPolar_Stacked:case $GT.DssGraphTypeHorizontal_Area_Stacked:case $GT.DssGraphTypeHorizontal_Area_BiPolar_Stacked:case $GT.DssGraphTypeHorizontal_Area_DualAxis_Stacked:case $GT.DssGraphTypeHorizontal_Line_Stacked:case $GT.DssGraphTypeHorizontal_Line_BiPolar_Stacked:case $GT.DssGraphTypeHorizontal_Line_DualAxis_Stacked:this.mGraphType=$GT.DssGraphTypeHorizontal_CategoryPies_Stacked;return ;case $GT.DssGraphTypeVertical_Bar_Percent:case $GT.DssGraphTypeVertical_Line_Percent:case $GT.DssGraphTypeVertical_Area_Percent:this.mGraphType=$GT.DssGraphTypeHorizontal_CategoryPies_Stacked;return ;case $GT.DssGraphTypeHorizontal_Bar_Percent:case $GT.DssGraphTypeHorizontal_Line_Percent:case $GT.DssGraphTypeHorizontal_Area_Percent:this.mGraphType=$GT.DssGraphTypeVertical_CategoryPies_Percent;return ;}},isCombinationChart:function isCombinationChart(){return this.mMarkerShape===$MS.DssGraphMarkerShapeCombined;},isPieOrRingShape:function isPieOrRingShape(){return this.mMarkerShape===$MS.DssGraphMarkerShape2DPie||this.mMarkerShape===$MS.DssGraphMarkerShape2DRingPie;},getPieShapeLayout:function getPieShapeLayout(){switch(this.mGraphType){case $GT.DssGraphTypeHorizontal_CategoryPies_Absolute:case $GT.DssGraphTypeHorizontal_CategoryPies_Stacked:case $GT.DssGraphTypeHorizontal_CategoryPies_Percent:case $GT.DssGraphTypeVertical_CategoryPies_Absolute:case $GT.DssGraphTypeVertical_CategoryPies_Stacked:case $GT.DssGraphTypeVertical_CategoryPies_Percent:return $GMT.GMT_CATEGORY;case $GT.DssGraphTypeScatter_Pies:return $GMT.GMT_SCATTER;case $GT.DssGraphTypeBubble_Pies:return $GMT.GMT_BUBBLE;case $GT.DssGraphTypeGrid_Pies:return $GMT.GMT_GRID;default:return $GMT.GMT_SPECTRAL;}},markerToShape:function markerToShape(markerType){switch(markerType){case $MS.DssGraphMarkerShapeCircle:return $SHP._CIRCLE;case $MS.DssGraphMarkerShapeRectangle:case $MS.DssGraphMarkerShapeSquare:return $SHP._SQUARE;case $MS.DssGraphMarkerShape2DPie:case $MS.DssGraphMarkerShape2DRingPie:return $SHP._PIE;case $MS.DssGraphMarkerShapeGMTick:return $SHP._TICKER;default:return $SHP._GENERIC;}}});}());