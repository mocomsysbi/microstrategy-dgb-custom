(function(){mstrmojo.requiresCls("mstrmojo.Base");mstrmojo.requiresClsP("mstrmojo.chart","Point2D","Rect2D","PolyLineObject","PolygonObject","FormatFont");mstrmojo.requiresClsP("mstrmojo.chart.model.enums","EnumDSSGraphFontRotation","EnumShapeType","EnumDSSGraphObject");mstrmojo.requiresCls("mstrmojo.chart.enums.EnumGraphMatrixDataLabelPosition");var $C=mstrmojo.chart,$M=mstrmojo.chart.model,$MODEL_ENUMS=$M.enums,$CHART_ENUMS=$C.enums,$FR=$MODEL_ENUMS.EnumDSSGraphFontRotation,$GO=$MODEL_ENUMS.EnumDSSGraphObject,$SHP=$MODEL_ENUMS.EnumShapeType,$GMDLP=$CHART_ENUMS.EnumGraphMatrixDataLabelPosition,kOffset=[[0,0],[0,1],[1,0],[1,1]],kGridGeneric=1,kGridOccupy=2,kGridObject=4,kGridCircle=8,k_MaxCount=10000000;function hPointToIndex(point,isUseFloorValue){var x=point.x-this.Origin.x,y=point.y-this.Origin.y,xIndex,yIndex;if(isUseFloorValue===undefined){isUseFloorValue=true;}if(isUseFloorValue){xIndex=Math.floor(x/this.XUnit);yIndex=Math.floor(y/this.YUnit);}else{xIndex=Math.ceil(x/this.XUnit);yIndex=Math.ceil(y/this.YUnit);}return{flag:!(xIndex<0||yIndex<0),col:xIndex,row:yIndex};}function hGetRectPosition(rect,adjustValue){var x,y,xCover,yCover,temp,result;temp=hPointToIndex.call(this,rect.GetTopLeft());x=temp.col;y=temp.row;temp=hPointToIndex.call(this,rect.GetBottomRight(),false);xCover=temp.col;yCover=temp.row;xCover-=x;yCover-=y;if(x<0||y<0||xCover>this.XCount||yCover>this.YCount||x+xCover>this.XCount||y+yCover>this.YCount){if(!adjustValue){result=null;}else{result={x:Math.max(0,x),y:Math.max(0,y),xRange:Math.min(xCover,this.XCount),yRange:Math.min(yCover,this.YCount)};}}else{result={x:x,y:y,xRange:xCover,yRange:yCover};}return result;}function hIndexToPoint(x,y,point){if(point){point.x=this.Origin.x+x*this.XUnit;point.y=this.Origin.y+y*this.YUnit;return point;}return new $C.Point2D({x:this.Origin.x+x*this.XUnit,y:this.Origin.y+y*this.YUnit});}function hIsOccupiedByHostMarkerRect(hostMarker,x,y){var lX,lY,lXRange,lYRange,lRetVal;lRetVal=hGetRectPosition.call(this,hostMarker,true);lX=lRetVal.x;lY=lRetVal.y;lXRange=lRetVal.xRange;lYRange=lRetVal.yRange;return(x>=lX&&x<=lX+lXRange&&y>=lY&&lY<=lY+lYRange);}function hIsOccupiedByHostMarkerCircle(center,radius,x,y){var i,xIndex,yIndex,point=new $C.Point2D();for(i=0;i<4;++i){xIndex=x+kOffset[i][0];yIndex=y+kOffset[i][1];point=hIndexToPoint.call(this,xIndex,yIndex,point);if(point.Distance(center)<radius){return true;}}return false;}function hGetApproximateCenterFromTopLeft(topLeftPoint,xOffset,yOffset){var point=new $C.Point2D({Point2D:topLeftPoint});point.x+=Math.ceil((0.5*xOffset)*this.XUnit);point.y+=Math.ceil((0.5*yOffset)*this.YUnit);return point;}function hCountOverlapsInRect(startX,startY,xCover,yCover,point,limit){var count=0,i,j,matrix=this.Matrix,tempPoint;for(j=0;j<yCover;++j){for(i=0;i<xCover;++i){count+=matrix[startY+j][startX+i];if(count>limit){return count;}}}tempPoint=hIndexToPoint.call(this,startX,startY);point.x=tempPoint.x;point.y=tempPoint.y;return count;}function hTreatTiltOccupation(occupy,isAdd,is45){return true;}function hGetRectRange(rect){var x,y,xCover,yCover,temp;temp=hPointToIndex.call(this,rect.GetTopLeft());x=temp.col;y=temp.row;temp=hPointToIndex.call(this,rect.GetBottomRight(),false);xCover=temp.col;yCover=temp.row;xCover-=x;yCover-=y;return{xRange:xCover,yRange:yCover};}function hDirection(point1,point2,point3){var dir1,dir2;dir1=new $C.Vector2D({StartPoint:point1,EndPoint:point3});dir2=new $C.Vector2D({StartPoint:point1,EndPoint:point2});return dir1.CrossProduct(dir2);}function hOnSegment(point1,point2,point3){var xMax,xMin,yMax,yMin;if(point1.x<point2.x){xMin=point1.x;xMax=point2.x;}else{xMin=point2.x;xMax=point1.x;}if(point1.y<point2.y){yMin=point1.y;yMax=point2.y;}else{yMin=point2.y;yMax=point1.y;}return !(point3.x<xMin||point3.x>xMax||point3.y<yMin||point3.y>yMax);}function hSegmentsIntersection(point1,point2,point3,point4){var d1=hDirection.call(this,point3,point4,point1),d2=hDirection.call(this,point3,point4,point2),d3=hDirection.call(this,point1,point2,point3),d4=hDirection.call(this,point1,point2,point4);if(d1*d2<0&&d3*d4<0){return true;}if(d1===0&&hOnSegment.call(this,point3,point4,point1)){return true;}if(d2===0&&hOnSegment.call(this,point3,point4,point2)){return true;}if(d3===0&&hOnSegment.call(this,point1,point2,point3)){return true;}if(d4===0&&hOnSegment.call(this,point1,point2,point4)){return true;}return false;}function hSearchAlongAxes(point,markerCenter,originIndex,xyOffset,rectCover,alreadyHasOnePlacement,isYFirst){var position=new $C.Point2D(),limit=1,outerStart,innerStart,outerRange,innerRange,outerOffset,innerOffset,outerCover,innerCover,needCheckForFullAccommodation,i,j,startX,startY,tempPoint1,tempPoint2,distSqr1,distSqr2,result=null;if(isYFirst===undefined){isYFirst=true;}outerStart=isYFirst?originIndex.x:originIndex.y;innerStart=originIndex.x+originIndex.y-outerStart;outerRange=isYFirst?this.XCount:this.YCount;innerRange=this.XCount+this.YCount-outerRange;outerOffset=isYFirst?xyOffset.x:xyOffset.y;innerOffset=xyOffset.x+xyOffset.y-outerOffset;outerCover=isYFirst?rectCover.x:rectCover.y;innerCover=rectCover.x+rectCover.y-outerCover;needCheckForFullAccommodation=(xyOffset.x===-1);for(i=outerStart;
/*lIsFound && */
(i>=0&&i<outerRange);i+=outerOffset){if(i+outerCover>outerRange||i+outerCover<0){continue;}for(j=innerStart;
/*lIsFound &&*/
(j>=0&&j<innerRange);j+=innerOffset){if(j+innerCover>innerRange||j+innerCover<0){continue;}startX=isYFirst?i:j;startY=i+j-startX;if(startX<0||startY<0){continue;}if(hCountOverlapsInRect.call(this,startX,startY,rectCover.x,rectCover.y,position,limit)<=limit){if(alreadyHasOnePlacement){tempPoint1=hGetApproximateCenterFromTopLeft.call(this,point,rectCover.x,rectCover.y);distSqr1=tempPoint1.DistanceSquared(markerCenter);tempPoint2=hGetApproximateCenterFromTopLeft.call(this,position,rectCover.x,rectCover.y);distSqr2=tempPoint2.DistanceSquared(markerCenter);if(distSqr1>distSqr2){result=position;}}else{result=position;alreadyHasOnePlacement=true;}if(!needCheckForFullAccommodation||(isYFirst&&needCheckForFullAccommodation&&(startX+rectCover.x)<=originIndex.x)){return result;}if(isYFirst){i=originIndex.x-rectCover.x;j=innerStart;}}}}return result;}function hSearchInAreas(position,markerCenter,originX,originY,width,height){var atLeastOneFound=false,eachArea,addX,addY,offset,originIndex,xyOffset,rectCover;for(eachArea=0;eachArea<4;++eachArea){addX=(eachArea===0||eachArea===1)?-1:1;addY=(eachArea===1||eachArea===2)?-1:1;offset=(eachArea===0||eachArea===1)?0:1;originIndex=new $C.Point2D({x:originX+offset,y:originY});xyOffset=new $C.Point2D({x:addX,y:addY});rectCover=new $C.Point2D({x:width,y:height});atLeastOneFound=(hSearchAlongAxes.call(this,position,markerCenter,originIndex,xyOffset,rectCover,atLeastOneFound)!==null);}return atLeastOneFound;}function hAreTwoRectsFitPadding(rectDataLabel,rect,padding){return((rectDataLabel.x+rectDataLabel.width+padding<=rect.x)||(rectDataLabel.x>=rect.x+rect.width+padding)||(rectDataLabel.y+rectDataLabel.height+padding<=rect.y)||(rectDataLabel.y>=rect.y+rect.height+padding));}function hAreTwoObjectsFitPadding(center,radius,rectDataLabel,padding){return !((center.Distance(rectDataLabel.GetTopLeft())<radius+padding)||(center.Distance(rectDataLabel.GetBottomLeft())<radius+padding)||(center.Distance(rectDataLabel.GetTopRight())<radius+padding)||(center.Distance(rectDataLabel.GetBottomRight())<radius+padding));}function hPopulateOneColumn(columnObject,columnElementCount,defaultValue){var oneColumnVector=[];for(var i=0;i<columnElementCount;i++){oneColumnVector[i]=defaultValue===0?0:[];}columnObject.push(oneColumnVector);}function hPopulateGrid(props){var propRect,propUnit,propRectWidth,propRectHeight,propUnitWidth,propUnitHeight,i=0,j=0,matrixType,gridOccupyCircleVector;props.MatrixType=props.MatrixType||15;this.Matrix=[];this.MatrixOccupy=[];this.MatrixOccupyObject=[];this.MatrixOccupyCircleObject=[];if(props&&props.Rect&&props.Unit){propRect=props.Rect;propUnit=props.Unit;propRectWidth=propRect.width;propRectHeight=propRect.height;propUnitWidth=propUnit.width;propUnitHeight=propUnit.height;matrixType=props.MatrixType;this.IsValid=((propRectWidth*propRectHeight>propUnitWidth*propUnitHeight)&&(propRectWidth>=propUnitWidth)&&(propRectHeight>=propUnitHeight));if(!this.IsValid){return false;}this.Origin=propRect.GetTopLeft();this.XCount=Math.ceil(propRectWidth/propUnitWidth);this.YCount=Math.ceil(propRectHeight/propUnitHeight);this.XUnit=propUnitWidth;this.YUnit=propUnitHeight;for(i=0;i<this.YCount;++i){if(matrixType&kGridGeneric){hPopulateOneColumn.call(this,this.Matrix,this.XCount,0);}if(matrixType&kGridOccupy){hPopulateOneColumn.call(this,this.MatrixOccupy,this.XCount,1);}if(matrixType&kGridObject){hPopulateOneColumn.call(this,this.MatrixOccupyObject,this.XCount,1);}if(matrixType&kGridCircle){hPopulateOneColumn.call(this,this.MatrixOccupyCircleObject,this.XCount,1);}}return true;}return false;}mstrmojo.chart.GridMap=mstrmojo.declare(mstrmojo.Base,null,{scriptClass:"mstrmojo.chart.GridMap",IsValid:false,Metric:0,XUnit:0,YUnit:0,XCount:0,YCount:0,Origin:null,Matrix:null,MatrixOccupy:null,MatrixOccupyObject:null,MatrixOccupyCircleObject:null,dataLabelPadding:5,initialized:false,init:function init(props){this.initialized=hPopulateGrid.call(this,props);},populate:function populate(props){this.initialized=this.initialized||hPopulateGrid.call(this,props);},destroy:function destroy(){this.initialized=this.IsValid=false;this.Matrix=[];this.MatrixOccupy=[];this.MatrixOccupyObject=[];this.MatrixOccupyCircleObject=[];},ToMetric:function ToMetric(){var i,j,count=0,xCount=this.XCount,yCount=this.YCount;for(i=0;i<yCount;++i){for(j=0;j<xCount;++j){if(this.Matrix[i][j]>=2){++count;}}}return count;},ToInspectedMetric:function ToInspectedMetric(shapeInfo){var density={Max:-100,Min:10000000000,Occupied:0,Total:0},rect=shapeInfo.BoundingBox,range=hGetRectPosition.call(this,rect,true),isPie=shapeInfo.Shape===$SHP._PIE,position=shapeInfo.Position,isCircle=isPie||(shapeInfo.Shape===$SHP._CIRCLE),inspectPoint=new $C.Point2D(),x=range.x,y=range.y,i,j,k,radius=shapeInfo.Size,restrictRadius=0,xRange=range.xRange,yRange=range.yRange;if(isPie&&shapeInfo.ExclusiveRect){restrictRadius=0.5*shapeInfo.ExclusiveRect.width;}for(i=0;i<range.xRange;++i){for(j=0;j<range.yRange;++j){x=range.x+i;y=range.y+j;if(x>=this.XCount||y>=this.YCount){continue;}var shouldCount=false;if(isCircle){for(k=0;k<4;++k){var distance,tempIndexY=y+kOffset[k][0],tempIndexX=x+kOffset[k][1];if(tempIndexX>=this.XCount||tempIndexY>=this.YCount){continue;}inspectPoint=hIndexToPoint.call(this,tempIndexX,tempIndexY,inspectPoint);distance=inspectPoint.Distance(position);if(distance<radius&&distance>=restrictRadius){shouldCount=true;break;}}}else{shouldCount=true;}if(shouldCount){var metric=this.Matrix[y][x];density.Max=Math.max(metric,density.Max);density.Min=Math.min(metric,density.Min);density.Occupied+=metric;}}}density.Total=range.xRange*range.yRange;return density;},veryDense:function veryDense(){return false;},UpdateMatrixCircle:function UpdateMatrixCircle(center,radius,isAdd){var x,y,xRange,yRange,occupyArea=new $C.Rect2D({x:center.x-radius,y:center.y-radius,height:radius*2,width:radius*2}),returnVal,delta=isAdd?1:-1,i,j,gridCellIndexPie,xIndex,yIndex,k,addMetric=0,matrix=this.Matrix,tempIndexX,tempIndexY,point=new $C.Point2D();returnVal=hGetRectPosition.call(this,occupyArea,true);x=returnVal.x;y=returnVal.y;xRange=returnVal.xRange;yRange=returnVal.yRange;for(i=0;i<yRange;++i){for(j=0;j<xRange;++j){gridCellIndexPie=false;xIndex=x+i;yIndex=y+j;if(xIndex>=this.XCount||yIndex>=this.YCount){continue;}for(k=0;k<4;++k){tempIndexY=y+i+kOffset[k][0];tempIndexX=x+j+kOffset[k][1];if(tempIndexX>=this.XCount||tempIndexY>=this.YCount){continue;}point=hIndexToPoint.call(this,tempIndexX,tempIndexY,point);if(point.Distance(center)<radius){gridCellIndexPie=true;break;}}if(gridCellIndexPie){matrix[yIndex][xIndex]+=delta;if(matrix[yIndex][xIndex]===1){++addMetric;}}}}this.Metric+=addMetric;return true;},UpdateMatrixDataLabelMarker:function UpdateMatrixDataLabelMarker(isDataLabel,occupy){var x,y,xRange,yRange,i,j,xIndex,yIndex,matrix=this.Matrix,addMetric=0,returnVal;returnVal=hGetRectPosition.call(this,occupy,true);x=returnVal.x;y=returnVal.y;xRange=returnVal.xRange;yRange=returnVal.yRange;for(i=0;i<yRange;++i){for(j=0;j<xRange;++j){yIndex=y+i;xIndex=x+j;if(matrix[yIndex]&&matrix[yIndex][xIndex]!==undefined){matrix[yIndex][xIndex]+=k_MaxCount;if(matrix[yIndex][xIndex]===k_MaxCount){addMetric++;}}}}this.Metric+=addMetric;return true;},UpdateMatrixPolyLine:function UpdateMatrixPolyLine(occupy,isAdd){var linePoints,i,numberOfLinePoints;if(isAdd===undefined){isAdd=true;}if(occupy===null||occupy===undefined){return false;}linePoints=occupy.mLinePoints;numberOfLinePoints=linePoints.length;for(i=0;i<numberOfLinePoints-1;++i){this.UpdateMatrixLineSegment(linePoints[i],linePoints[i+1],isAdd);}return true;},UpdateMatrixLineSegment:function UpdateMatrixLineSegment(segmentStart,segmentEnd,isAdd){var startPoint=new $C.Point2D({Point2D:segmentStart}),endPoint=new $C.Point2D({Point2D:segmentEnd}),tempPoint,startX,startY,endX,endY,deltaX,deltaY,ratio,temp,interEnd,tempStartY,tempEndX,tempEndY,i,j,matrix=this.Matrix,addMetric=0,subtractMetric=0,yOffset,yExchanged,xIndex,yIndex,delta;if(segmentStart.x>segmentEnd.x){tempPoint=startPoint;startPoint=endPoint;endPoint=tempPoint;}temp=hPointToIndex.call(this,startPoint);startX=temp.col;startY=temp.row;temp=hPointToIndex.call(this,endPoint);endX=temp.col;endY=temp.row;if(startPoint.x!==endPoint.x){deltaX=endPoint.x-startPoint.x;deltaY=endPoint.y-startPoint.y;ratio=deltaY/deltaX;interEnd=new $C.Point2D({Point2D:endPoint});tempStartY=startY;for(i=startX;i<=endX;++i){if(i<0||i>=this.XCount){continue;}deltaX=(i+1)*this.XUnit-startPoint.x;if(i===endX){deltaX=endPoint.x-startPoint.x;}yOffset=deltaX*ratio;interEnd.x=(i+1)*this.XUnit;interEnd.y=startPoint.y+yOffset;temp=hPointToIndex.call(this,interEnd);tempEndX=temp.col;tempEndY=temp.row;yExchanged=false;if(tempStartY>tempEndY){temp=tempStartY;tempStartY=tempEndY;tempEndY=temp;yExchanged=true;}for(j=tempStartY;j<=tempEndY;++j){if(j<0||j>=this.YCount){continue;}xIndex=i;yIndex=j;delta=isAdd?1:-1;matrix[yIndex][xIndex]+=delta;if(isAdd&&matrix[yIndex][xIndex]===1){++addMetric;}if(!isAdd&&matrix[yIndex][xIndex]===0){++subtractMetric;}}if(!yExchanged){tempStartY=tempEndY;}}}else{if(startY>endY){temp=startY;startY=endY;endY=temp;}for(i=startY;i<=endY;++i){if(i<0||i>=this.YCount){continue;}if(startX<0||startX>=this.XCount){break;}xIndex=startX;yIndex=i;delta=isAdd?1:-1;matrix[yIndex][xIndex]+=delta;if(isAdd&&matrix[yIndex][xIndex]===1){++addMetric;}if(!isAdd&&matrix[yIndex][xIndex]===0){++subtractMetric;}}}this.Metric+=addMetric;this.Metric-=subtractMetric;return true;},UpdateMatrixPolygon:function UpdateMatrixPolygon(occupy,isAdd){var polygonPoints,boundRect,x,y,matrix=this.Matrix,xRange,yRange,vertex,addMetric=0,subtractMetric=0,i,j,k,l,xIndex,yIndex,occupied,val,currentUnit,len,delta;if(occupy===null||occupy===undefined){return false;}if(isAdd===undefined){isAdd=true;}polygonPoints=occupy.mDevicePolygon;boundRect=occupy.GetBoundingRect();if(boundRect.width<=0||boundRect.height<=0){return false;}val=hGetRectPosition.call(this,boundRect,true);x=val.x;y=val.y;xRange=val.xRange;yRange=val.yRange;for(j=0;j<yRange;++j){for(i=0;i<xRange;++i){occupied=false;xIndex=x+i;yIndex=y+j;for(k=0;k<4;++k){vertex=hIndexToPoint.call(this,xIndex+kOffset[k][0],yIndex+kOffset[k][1]);if(occupy.PointInObject(vertex)){occupied=true;break;}}if(!occupied){vertex=hIndexToPoint.call(this,xIndex,yIndex);currentUnit=new $C.Rect2D({x:vertex.x,y:vertex.y,width:this.XUnit,height:this.YUnit});for(k=0;k<polygonPoints.length;++k){if(currentUnit.PointInRectangle(polygonPoints[k])){occupied=true;break;}}}if(!occupied){len=polygonPoints.length;for(k=0;k<4;++k){occupied=false;for(l=0;l<len;++l){var lP1,lP2,lP3,lP4;lP1=hIndexToPoint.call(this,xIndex+kOffset[k][0],yIndex+kOffset[k][1]);lP2=hIndexToPoint.call(this,xIndex+kOffset[(k+1)%4][0],yIndex+kOffset[(k+1)%4][1]);lP3=polygonPoints[l];lP4=polygonPoints[(l+1)%len];occupied=hSegmentsIntersection.call(this,lP1,lP2,lP3,lP4);if(occupied){break;}}if(occupied){break;}}}if(occupied){if(yIndex<0||yIndex>=this.YCount){continue;}if(xIndex<0||xIndex>=this.XCount){continue;}delta=isAdd?1:-1;matrix[yIndex][xIndex]+=delta;if(isAdd&&matrix[yIndex][xIndex]===1){++addMetric;}if(!isAdd&&matrix[yIndex][xIndex]===0){++subtractMetric;}}}}this.Metric+=addMetric;this.Metric-=subtractMetric;return true;},UpdateMatrixPolygonWithCanvas:function UpdateMatrixPolygonWithCanvas(occupy,canvas,isAdd){var polygonPoints,boundRect,x,y,matrix=this.Matrix,xRange,yRange,vertex,addMetric=0,subtractMetric=0,i,j,k,l,xIndex,yIndex,occupied,val,currentUnit,len,delta;if(occupy===null||occupy===undefined){return false;}if(isAdd===undefined){isAdd=true;}polygonPoints=occupy.mDevicePolygon;boundRect=occupy.GetBoundingRect();if(boundRect.width<=0||boundRect.height<=0){return false;}var ctx=canvas.getContext("2d");ctx.globalAlpha=0.01;ctx.beginPath();ctx.moveTo(polygonPoints[0].x,polygonPoints[0].y);for(i=1;i<polygonPoints.length;i++){ctx.lineTo(polygonPoints[i].x,polygonPoints[i].y);}ctx.closePath();ctx.fill();var imagedata=ctx.getImageData(0,0,canvas.width,canvas.height);var data=imagedata.data;function getAlpha(x,y){var i=((y*canvas.width)+x)*4;var a=data[i+3];return a/2;}val=hGetRectPosition.call(this,boundRect,true);x=val.x;y=val.y;xRange=val.xRange;yRange=val.yRange;for(j=0;j<yRange;++j){for(i=0;i<xRange;++i){occupied=false;xIndex=x+i;yIndex=y+j;for(k=0;k<4;++k){vertex=hIndexToPoint.call(this,xIndex+kOffset[k][0],yIndex+kOffset[k][1]);var alpha=getAlpha(vertex.x,vertex.y);if(alpha>0){occupied=true;break;}}if(occupied){if(yIndex<0||yIndex>=this.YCount){continue;}if(xIndex<0||xIndex>=this.XCount){continue;}delta=isAdd?1:-1;matrix[yIndex][xIndex]+=delta;if(isAdd&&matrix[yIndex][xIndex]===1){++addMetric;}if(!isAdd&&matrix[yIndex][xIndex]===0){++subtractMetric;}}}}this.Metric+=addMetric;this.Metric-=subtractMetric;return true;},UpdateMatrixRect:function UpdateMatrixRect(occupy,isAdd,rotation){var isTilt,delta,x,y,xRange,yRange,lVal,i,j,addMetric=0,subtractMetric=0,matrix=this.Matrix,indexX,indexY;if(isAdd===undefined){isAdd=true;}rotation=rotation||$FR.Normal;isTilt=(rotation===$FR.Rotate45||rotation===$FR.Rotate315);if(isTilt){return hTreatTiltOccupation.call(this,occupy,(rotation===$FR.Rotate45));}delta=isAdd?1:-1;lVal=hGetRectPosition.call(this,occupy,true);x=lVal.x;y=lVal.y;xRange=lVal.xRange;yRange=lVal.yRange;for(i=0;i<yRange;++i){for(j=0;j<xRange;++j){indexY=y+i;indexX=x+j;matrix[indexY][indexX]+=delta;if(isAdd&&matrix[indexY][indexX]===2){addMetric++;}if(!isAdd&&matrix[indexY][indexX]===0){subtractMetric++;}}}this.Metric+=addMetric;this.Metric-=subtractMetric;return true;},UpdateMatrixOccupyCircleObject:function UpdateMatrixOccupyCircleObject(occupy,center,radius){var x,y,xRange,yRange,i,j,xIndex,yIndex,circleOccupied={},returnVal,circleMatrix=this.MatrixOccupyCircleObject;returnVal=hGetRectPosition.call(this,occupy,true);x=returnVal.x;y=returnVal.y;xRange=returnVal.xRange;yRange=returnVal.yRange;for(i=0;i<yRange;++i){for(j=0;j<xRange;++j){yIndex=y+i;xIndex=x+j;if(hIsOccupiedByHostMarkerCircle.call(this,center,radius,xIndex,yIndex)){if((yIndex<circleMatrix.length)&&(xIndex<circleMatrix[yIndex].length)){circleOccupied.c=center;circleOccupied.r=radius;circleMatrix[yIndex][xIndex].push(circleOccupied);}}}}return true;},UpdateMatrixOccupyObject:function UpdateMatrixOccupyObject(occupy,occupiedObject){var x,y,xRange,yRange,xIndex,yIndex,returnVal,i,j,rectMatrix=this.MatrixOccupyObject;returnVal=hGetRectPosition.call(this,occupy);x=returnVal.x;y=returnVal.y;xRange=returnVal.xRange;yRange=returnVal.yRange;for(i=0;i<yRange;++i){for(j=0;j<xRange;++j){yIndex=y+i;xIndex=x+j;rectMatrix[yIndex][xIndex].push(occupiedObject);}}return true;},UpdateMatrixOccupy:function UpdateMatrixOccupy(isDataLabel,occupy,dataLabelIndex){var x,y,xRange,yRange,returnVal,i,j,occupyMatrix=this.MatrixOccupy,xIndex,yIndex;returnVal=hGetRectPosition.call(this,occupy,true);x=returnVal.x;y=returnVal.y;xRange=returnVal.xRange;yRange=returnVal.yRange;for(i=0;i<yRange;++i){for(j=0;j<xRange;++j){yIndex=y+i;xIndex=x+j;if(isDataLabel){occupyMatrix[yIndex][xIndex].push({index:dataLabelIndex,type:1});}else{occupyMatrix[yIndex][xIndex].push({index:dataLabelIndex,type:0});}}}},IsFitPaddingWithBorder:function IsFitPaddingWithBorder(occupy,frame){var dataLabelPadding=this.dataLabelPadding;if(occupy.x<frame.x+dataLabelPadding||occupy.x+occupy.width+dataLabelPadding>frame.x+frame.width){return false;}if(occupy.y<frame.y+dataLabelPadding||occupy.y+occupy.height+dataLabelPadding>frame.y+frame.height){return false;}return true;},IsAccomdatableConsiderRotation:function IsAccomdatableConsiderRotation(hostMarker,occupy,position,rotation){var isFound,xCover,yCover,returnVal,markerPosition,col,row,rowColInfo;if(rotation===undefined){rotation=$FR.Normal;}returnVal=hGetRectRange.call(this,occupy);xCover=returnVal.xRange;yCover=returnVal.yRange;if((xCover>this.XCount)||(yCover>this.YCount)){return false;}markerPosition=hostMarker.GetCenter();rowColInfo=hPointToIndex.call(this,markerPosition);if(!rowColInfo.flag){return false;}row=rowColInfo.row;col=rowColInfo.col;isFound=hSearchInAreas.call(this,position,markerPosition,col,row,xCover,yCover);return isFound;},IsAccomdatableDataLabel:function IsAccomdatableDataLabel(hostMarker,occupy){var x,y,xRange,yRange,returnVal,count,i,j;returnVal=hGetRectPosition.call(this,occupy,false);if(returnVal===null){return false;}x=returnVal.x;y=returnVal.y;xRange=returnVal.xRange;yRange=returnVal.yRange;for(i=-1;i<=yRange;++i){for(j=-1;j<xRange;++j){count=this.Matrix[y+i][x+j];if(count>=2){return false;}if(count===1){if(!hIsOccupiedByHostMarkerRect.call(this,hostMarker,x+j,y+i)){return false;}}}}return true;},IsAccomdatableConsiderLocation:function IsAccomdatableConsiderLocation(occupy,location){var x,y,xRange,yRange,returnVal,count,i,j;returnVal=hGetRectPosition.call(this,occupy,false);if(returnVal===null){return false;}x=returnVal.x;y=returnVal.y;xRange=returnVal.xRange;yRange=returnVal.yRange;for(i=-1;i<=yRange;++i){for(j=-1;j<=xRange;++j){switch(location){case $GMDLP._TOP:if(i===yRange){continue;}break;case $GMDLP._BOTTOM:if(i===-1){continue;}break;case $GMDLP._LEFT:if(j===xRange){continue;}break;case $GMDLP._RIGHT:if(j===-1){continue;}break;default:}count=this.Matrix[y+i][x+j];if(count>=1){return false;}}}return true;},IsAccomdatableConsiderLabelPaddingOnly:function IsAccomdatableConsiderLabelPaddingOnly(occupy,isExceptDataLabel){var returnVal,x,y,xRange,yRange,xIndex,yIndex,count,i;if(isExceptDataLabel){returnVal=this.IsAccomdatableNoPadding(occupy);if(!returnVal){return false;}returnVal=hGetRectPosition.call(this,occupy,false);if(returnVal===null){return false;}x=returnVal.x;y=returnVal.y;xRange=returnVal.xRange;yRange=returnVal.yRange;for(i=-1;i<=yRange;++i){xIndex=x-1;yIndex=y+i;count=this.Matrix[yIndex][xIndex];if(count>=k_MaxCount){return false;}}for(i=-1;i<=yRange;++i){xIndex=x+xRange;yIndex=y+i;count=this.Matrix[yIndex][xIndex];if(count>=k_MaxCount){return false;}}for(i=-1;i<=xRange;++i){xIndex=x+i;yIndex=y-1;count=this.Matrix[yIndex][xIndex];if(count>=k_MaxCount){return false;}}for(i=-1;i<=xRange;++i){xIndex=x+i;yIndex=y+yRange;count=this.Matrix[yIndex][xIndex];if(count>=k_MaxCount){return false;}}return true;}return this.IsAccomdatableNoPadding(occupy);},IsAccomdatableNoPadding:function IsAccomdatableNoPadding(occupy){var x,y,xRange,yRange,returnVal,count,i,j;returnVal=hGetRectPosition.call(this,occupy,false);if(returnVal===null){return false;}x=returnVal.x;y=returnVal.y;xRange=returnVal.xRange;yRange=returnVal.yRange;for(i=0;i<yRange;++i){for(j=0;j<xRange;++j){count=this.Matrix[y+i][x+j];if(count>=1){return false;}}}return true;},IsAccomdatableCircle:function IsAccomdatableCircle(center,radius,occupy){var lX,lY,lXRange,lYRange,lVal,lCount,i,j;lVal=hGetRectPosition.call(this,occupy,false);if(lVal===null){return false;}lX=lVal.x;lY=lVal.y;lXRange=lVal.xRange;lYRange=lVal.yRange;for(i=0;i<lYRange;++i){for(j=0;j<lXRange;++j){lCount=this.Matrix[lY+i][lX+j];if(lCount>=2){return false;}if(lCount===1){if(!hIsOccupiedByHostMarkerCircle.call(this,center,radius,lX+j,lY+i)){return false;}}}}return true;},IsAccomdatableConsiderAccuDistPaddingCircle:function IsAccomdatableConsiderAccuDistPaddingCircle(center,radius,occupy){var x,y,xRange,yRange,returnVal,count,xIndex,yIndex,objects,i,j,dataLabelPadding=this.dataLabelPadding;if(!this.IsAccomdatableCircle(center,radius,occupy)){return false;}returnVal=hGetRectPosition.call(this,occupy,false);if(returnVal===null){return false;}x=returnVal.x;y=returnVal.y;xRange=returnVal.xRange;yRange=returnVal.yRange;for(i=-1;i<=yRange;++i){xIndex=x-1;yIndex=y+i;count=this.Matrix[yIndex][xIndex];if(count>=1){if(count===1&&hIsOccupiedByHostMarkerCircle.call(this,center,radius,xIndex,yIndex)){continue;}objects=this.MatrixOccupyObject[yIndex][xIndex];for(j=0;j<objects.length;++j){if(!hAreTwoRectsFitPadding.call(this,occupy,objects[j],dataLabelPadding)){return false;}}objects=this.MatrixOccupyCircleObject[yIndex][xIndex];for(j=0;j<objects.length;++j){if(!hAreTwoObjectsFitPadding.call(this,objects[j].c,objects[j].r,occupy,dataLabelPadding)){return false;}}}}for(i=-1;i<=yRange;++i){xIndex=x+xRange;yIndex=y+i;count=this.Matrix[yIndex][xIndex];if(count>=1){if(count===1&&hIsOccupiedByHostMarkerCircle.call(this,center,radius,xIndex,yIndex)){continue;}objects=this.MatrixOccupyObject[yIndex][xIndex];for(j=0;j<objects.length;++j){if(!hAreTwoRectsFitPadding.call(this,occupy,objects[j],dataLabelPadding)){return false;}}objects=this.MatrixOccupyCircleObject[yIndex][xIndex];for(j=0;j<objects.length;++j){if(!hAreTwoObjectsFitPadding.call(this,objects[j].c,objects[j].r,occupy,dataLabelPadding)){return false;}}}}for(i=-1;i<=xRange;++i){xIndex=x+i;yIndex=y-1;count=this.Matrix[yIndex][xIndex];if(count>=1){if(count===1&&hIsOccupiedByHostMarkerCircle.call(this,center,radius,xIndex,yIndex)){continue;}objects=this.MatrixOccupyObject[yIndex][xIndex];for(j=0;j<objects.length;++j){if(!hAreTwoRectsFitPadding.call(this,occupy,objects[j],dataLabelPadding)){return false;}}objects=this.MatrixOccupyCircleObject[yIndex][xIndex];for(j=0;j<objects.length;++j){if(!hAreTwoObjectsFitPadding.call(this,objects[j].c,objects[j].r,occupy,dataLabelPadding)){return false;}}}}for(i=-1;i<=yRange;++i){xIndex=x+i;yIndex=y+yRange;count=this.Matrix[yIndex][xIndex];if(count>=1){if(count===1&&hIsOccupiedByHostMarkerCircle.call(this,center,radius,xIndex,yIndex)){continue;}objects=this.MatrixOccupyObject[yIndex][xIndex];for(j=0;j<objects.length;++j){if(!hAreTwoRectsFitPadding.call(this,occupy,objects[j],dataLabelPadding)){return false;}}objects=this.MatrixOccupyCircleObject[yIndex][xIndex];for(j=0;j<objects.length;++j){if(!hAreTwoObjectsFitPadding.call(this,objects[j].c,objects[j].r,occupy,dataLabelPadding)){return false;}}}}return true;},IsAccomdatableConsiderAccuDistPaddingRect:function IsAccomdatableConsiderAccuDistPaddingRect(occupy){var x,y,xRange,yRange,returnVal,count,xIndex,yIndex,i,j,objects,dataLabelPadding=this.dataLabelPadding;if(!this.IsAccomdatableNoPadding(occupy)){return false;}returnVal=hGetRectPosition.call(this,occupy,false);if(returnVal===null){return false;}x=returnVal.x;y=returnVal.y;xRange=returnVal.xRange;yRange=returnVal.yRange;for(i=-1;i<=yRange;++i){xIndex=x-1;yIndex=y+i;count=this.Matrix[yIndex][xIndex];if(count>=1){objects=this.MatrixOccupyObject[yIndex][xIndex];for(j=0;j<objects.length;++j){if(!hAreTwoRectsFitPadding.call(this,occupy,objects[j],dataLabelPadding)){return false;}}}}for(i=-1;i<=yRange;++i){xIndex=x+xRange;yIndex=y+i;count=this.Matrix[yIndex][xIndex];if(count>=1){objects=this.MatrixOccupyObject[yIndex][xIndex];for(j=0;j<objects.length;++j){if(!hAreTwoRectsFitPadding.call(this,occupy,objects[j],dataLabelPadding)){return false;}}}}for(i=-1;i<=xRange;++i){xIndex=x+i;yIndex=y-1;count=this.Matrix[yIndex][xIndex];if(count>=1){objects=this.MatrixOccupyObject[yIndex][xIndex];for(j=0;j<objects.length;++j){if(!hAreTwoRectsFitPadding.call(this,occupy,objects[j],dataLabelPadding)){return false;}}}}for(i=-1;i<=xRange;++i){xIndex=x+i;yIndex=y+yRange;count=this.Matrix[yIndex][xIndex];if(count>=1){objects=this.MatrixOccupyObject[yIndex][xIndex];for(j=0;j<objects.length;++j){if(!hAreTwoRectsFitPadding.call(this,occupy,objects[j],dataLabelPadding)){return false;}}}}return true;},ToDraw:function ToDraw(graphObjManager){var xCount=this.XCount,yCount=this.YCount,matrix=this.Matrix,gridCellOccupied=[],i,j,k,gridPoints,point,tripleId,gridCell,formatLine;for(i=0;i<xCount;++i){for(j=0;j<yCount;++j){if(matrix[i][j]>=1){gridPoints=[];for(k=0;k<5;++k){point=hIndexToPoint.call(this,j+kOffset[k%4][0],i+kOffset[k%4][1]);gridPoints.push(point);}tripleId=new $C.TripleId({ObjectId:$GO.DssGraphDataLine});gridCell=new $C.PolyLineObject({TripleId:tripleId,GraphObjectManager:graphObjManager,PolyLine:gridPoints});formatLine=gridCell.mFormatLinePtr;formatLine.mLineColor=65280;formatLine.mLineThickness=1;gridCellOccupied.push(gridCell);}}}return gridCellOccupied;}});}());