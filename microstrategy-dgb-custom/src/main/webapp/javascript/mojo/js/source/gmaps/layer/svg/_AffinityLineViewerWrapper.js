(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.array","mstrmojo.gmaps.MapEnums","mstrmojo.gmaps.MapUtils","mstrmojo.gmaps.graphic.Graphic","mstrmojo.gmaps.geometry.Polygon");var $MOJO=mstrmojo,$ARR=$MOJO.array,$GMAPS=$MOJO.gmaps,$MUTIL=$GMAPS.MapUtils,Polygon=$GMAPS.geometry.Polygon,Graphic=$GMAPS.graphic.Graphic,SVG_NAME_SPACE="http://www.w3.org/2000/svg",ARROW_POINTS=10,ARROW_POS={S:1,C:2,E:3};function getNextPointIndex(pointArr,index,backward){var len=pointArr.length,nextIndex=backward?index-1:index+1;while(nextIndex<len&&nextIndex>=0){if(Math.pow(pointArr[nextIndex].x-pointArr[index].x,2)+Math.pow(pointArr[nextIndex].y-pointArr[index].y,2)>100){return nextIndex;}nextIndex=backward?nextIndex-1:nextIndex+1;}return -1;}mstrmojo.gmaps.layer.svg._AffinityLineViewerWrapper=mstrmojo.provide("mstrmojo.gmaps.layer.svg._AffinityLineViewerWrapper",{_mixinName:"mstrmojo.gmaps.layer.svg._AffinityLineViewerWrapper",affinityLinesHostNode:null,affinityLinesGraphics:undefined,affinityLinesArrows:undefined,createAffinityLineLayer:function createAffinityLineLayer(){if(!this.parent.wpDisPlayAffinityLines){return ;}this.removeAffinityLineLayer();this.affinityLinesHostNode=$MUTIL.appendGNode(this.gNode);this.affinityLinesGraphics=[];this.affinityLinesArrows=[];var line,graphicsConfig=this.parent.affinityLineGraphicsConfig||[],affinityLinesHostNode=this.affinityLinesHostNode,affinityLinesGraphics=this.affinityLinesGraphics;$ARR.forEach(graphicsConfig,function(config){line=new Polygon({sourceLocation:config.sourceLocation,destLocation:config.destLocation,fillOpacity:"0",strokeColor:config.strokeColor,strokeOpacity:"1",strokeWidth:config.strokeWidth});affinityLinesGraphics.push(new Graphic({type:"Polygon",geometry:line}));affinityLinesHostNode.appendChild(line.node);});},reGenerateAffinityLineLayer:function reGenerateAffinityLineLayer(){this.createAffinityLineLayer();this.updateAffinityLineLayer();},removeAffinityLineLayer:function removeAffinityLineLayer(){var i,graphics=this.affinityLinesGraphics,affinityLinesHostNode=this.affinityLinesHostNode,n=(graphics&&graphics.length)||0;for(i=0;i<n;i++){graphics[i].destroy();}this.affinityLinesGraphics=[];this.removeAffinityLineArrows();if(affinityLinesHostNode&&affinityLinesHostNode.parentNode){affinityLinesHostNode.parentNode.removeChild(affinityLinesHostNode);this.affinityLinesHostNode=null;}},removeAffinityLineArrows:function(){var i,arrow,arrows=this.affinityLinesArrows,n=(arrows&&arrows.length)||0;for(i=0;i<n;i++){arrow=arrows[i];if(arrow.parentNode){arrow.parentNode.removeChild(arrow);}}this.affinityLinesArrows=[];},isAffinityLineShown:function isAffinityLineShown(){return this.affinityLinesHostNode&&this.affinityLinesHostNode.style.display!=="none";},isAffinityLineHide:function isAffinityLineHide(){return this.affinityLinesHostNode&&this.affinityLinesHostNode.style.display!=="block";},showAffinityLineLayer:function showAffinityLineLayer(){if(this.affinityLinesHostNode){this.affinityLinesHostNode.style.display="block";}},hideAffinityLineLayer:function hideAffinityLineLayer(){if(this.affinityLinesHostNode){this.affinityLinesHostNode.style.display="none";}},getNumOfPoints:function getNumOfPoints(from,to,zoomLevel){var lngInterval=Math.abs(from.lng-to.lng),factor;lngInterval=lngInterval===180?0:lngInterval;lngInterval=lngInterval>180?360-lngInterval:lngInterval;if(lngInterval<=90){factor=0.5;}else{factor=Math.pow(lngInterval/90,3);}lngInterval=lngInterval*factor*zoomLevel/4;return Math.max(10,Math.ceil(lngInterval));},updateAffinityLineLayer:function updateAffinityLineLayer(){if(!this.parent.wpDisPlayAffinityLines){return ;}var me=this,isArcLine=this.parent.wpDrawArcsLines==="Arcs",affinityLinesGraphics=this.affinityLinesGraphics,baseLayer=this.parent.getBaseLayer(),zoomLevel=(baseLayer&&baseLayer.getZoom())||4;this.removeAffinityLineArrows();$ARR.forEach(affinityLinesGraphics,function(graphic){var geometry=graphic.geometry;if(geometry.zoomLevel===undefined||geometry.zoomLevel!==zoomLevel){var sourceLocation=geometry.sourceLocation,destLocation=geometry.destLocation,numOfPnt,points;if(isArcLine){numOfPnt=me.getNumOfPoints(sourceLocation,destLocation,zoomLevel);points=me.findPointsOnArc(sourceLocation,destLocation,numOfPnt);geometry.geoPolylineArr=[points];}else{geometry.geoPolylineArr=[[sourceLocation,destLocation]];}geometry.zoomLevel=zoomLevel;}graphic.geoData=geometry.geoPolylineArr;geometry.update(baseLayer.getScreenPositionInfo(graphic));var arrowConfig;if(isArcLine){arrowConfig=me.generateArrowConfigsForArcLine(geometry);}else{arrowConfig=me.generateArrowConfigsForStraightLine(geometry);}me.drawDirectedArrows(arrowConfig,geometry.strokeColor);});},drawDirectedArrows:function drawDirectedArrows(arrowConfig,color){var i,arrow,n=arrowConfig.length,affinityLinesHostNode=this.affinityLinesHostNode,affinityLinesArrows=this.affinityLinesArrows;for(i=0;i<n;i++){arrow=document.createElementNS(SVG_NAME_SPACE,"path");arrow.setAttribute("fill",color);arrow.setAttribute("stroke",color);arrow.setAttribute("stroke-width","1");arrow.setAttribute("d",arrowConfig[i].arrowStr);arrow.setAttribute("transform",arrowConfig[i].rotate);affinityLinesHostNode.appendChild(arrow);affinityLinesArrows.push(arrow);}},generateArrowConfigsForArcLine:function generateArrowConfigsForArcLine(geometry){var i,coordArr,cntArrLen,pos,nextPos,geoPolyline=geometry.geoPolylineArr&&geometry.geoPolylineArr[0],screenPolylineArr=geometry.screenPolylineArr,nPoints=(geoPolyline&&geoPolyline.length)||10,arrowConfig=[],n=(screenPolylineArr&&screenPolylineArr.length)||0,step=Math.round(nPoints/ARROW_POINTS),j=step,totalPoints=0;for(i=0;i<n;i++){coordArr=screenPolylineArr[i];cntArrLen=coordArr.length;if(cntArrLen<2){continue;}if(i===0){nextPos=getNextPointIndex(coordArr,0);if(nextPos<0){continue;}arrowConfig.push(this.getArrowConfigOfLine(coordArr[0],coordArr[nextPos],ARROW_POS.S));}while((j-totalPoints)<cntArrLen){pos=Math.max(Math.floor(j-totalPoints),0);nextPos=getNextPointIndex(coordArr,pos);if(nextPos<0){break;}arrowConfig.push(this.getArrowConfigOfLine(coordArr[pos],coordArr[nextPos],ARROW_POS.S));j=Math.max(j+step,nextPos+totalPoints);}if(i===n-1){nextPos=getNextPointIndex(coordArr,cntArrLen-1,true);if(nextPos<0){break;}arrowConfig.push(this.getArrowConfigOfLine(coordArr[nextPos],coordArr[cntArrLen-1],ARROW_POS.E));}totalPoints+=cntArrLen;}return arrowConfig;},generateArrowConfigsForStraightLine:function generateArrowConfigsForStraightLine(geometry){var i,j,coordArr,cntArrLen,nextPos,geoPolyline=geometry.geoPolylineArr&&geometry.geoPolylineArr[0],screenPolylineArr=geometry.screenPolylineArr,n=(screenPolylineArr&&screenPolylineArr.length)||0,arrowConfig=[],xCoordsRanges=[],numPoints=[],totalRange=0;if(!geoPolyline||geoPolyline.length<2||n<1){return arrowConfig;}for(i=0;i<n;i++){coordArr=screenPolylineArr[i];if(coordArr.length<2){return arrowConfig;}xCoordsRanges[i]=Math.abs(coordArr[1].x-coordArr[0].x);totalRange+=xCoordsRanges[i];}if(totalRange===0||geoPolyline[0].lng===geoPolyline[1].lng){numPoints[0]=ARROW_POINTS;}else{for(i=0;i<n;i++){numPoints[i]=Math.max(Math.floor(xCoordsRanges[i]/totalRange*ARROW_POINTS),1);}}n=numPoints.length;for(i=0;i<n;i++){coordArr=screenPolylineArr[i];coordArr=this.findPointsOnLine(coordArr[0],coordArr[1],numPoints[i]);cntArrLen=coordArr.length;j=1;if(i===0){nextPos=getNextPointIndex(coordArr,0);if(nextPos<0){continue;}j=nextPos;arrowConfig.push(this.getArrowConfigOfLine(coordArr[0],coordArr[nextPos],ARROW_POS.S));}while(j<cntArrLen-1){nextPos=getNextPointIndex(coordArr,j);if(nextPos<0){break;}arrowConfig.push(this.getArrowConfigOfLine(coordArr[j],coordArr[nextPos],ARROW_POS.S));j=nextPos;}if(i===n-1){nextPos=getNextPointIndex(coordArr,cntArrLen-1,true);if(nextPos<0){break;}arrowConfig.push(this.getArrowConfigOfLine(coordArr[nextPos],coordArr[cntArrLen-1],ARROW_POS.E));}}return arrowConfig;},findPointsOnArc:function findPointsOnArc(from,to,nPoints){var i,a,b,f,x,y,z,rLat,rLng,coords=[],radToDeg=180/Math.PI,lat1=from.lat/radToDeg,lng1=from.lng/radToDeg,lat2=to.lat/radToDeg,lng2=to.lng/radToDeg,degree=2*Math.asin(Math.sqrt(Math.pow((Math.sin(lat1-lat2)/2),2)+Math.cos(lat1)*Math.cos(lat2)*Math.pow((Math.sin(lng1-lng2)/2),2)));for(i=0;i<=nPoints;i++){f=Number(i/nPoints);a=Math.sin((1-f)*degree)/Math.sin(degree);b=Math.sin(f*degree)/Math.sin(degree);x=a*Math.cos(lat1)*Math.cos(lng1)+b*Math.cos(lat2)*Math.cos(lng2);y=a*Math.cos(lat1)*Math.sin(lng1)+b*Math.cos(lat2)*Math.sin(lng2);z=a*Math.sin(lat1)+b*Math.sin(lat2);rLat=Math.atan2(z,Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));rLng=Math.atan2(y,x);coords.push({lat:rLat*radToDeg,lng:rLng*radToDeg});}return coords;},findPointsOnLine:function findPointsOnLine(from,to,nPoints){var x,y,i,interval,c,m=Infinity,pts=[];if(to.x-from.x!==0){m=(to.y-from.y)/(to.x-from.x);c=from.y-m*from.x;interval=(to.x-from.x)/nPoints;}else{interval=(to.y-from.y)/nPoints;}for(i=0;i<=nPoints;i++){if(m===Infinity){x=from.x;y=from.y+interval*i;}else{x=from.x+interval*i;y=m*x+c;}pts.push({x:x,y:y});}return pts;},getArrowConfigOfLine:function getArrowConfigOfLine(point1,point2,type){var degree=Math.atan2(point2.y-point1.y,point2.x-point1.x)/Math.PI*180,fnGetConfig=function(x,y){return{arrowStr:"M"+x+" "+y+" L"+(x-10)+" "+(y-4)+" L"+(x-8)+" "+y+" L"+(x-10)+" "+(y+4)+"Z",rotate:"rotate("+degree+" "+x+" "+y+")"};};if(type===ARROW_POS.S){return fnGetConfig(point1.x,point1.y);}else{if(type===ARROW_POS.E){return fnGetConfig(point2.x,point2.y);}else{return fnGetConfig((point1.x+point2.x)/2,(point1.y+point2.y)/2);}}}});}());