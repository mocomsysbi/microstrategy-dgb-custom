(function(){mstrmojo.requiresClsP("mstrmojo.chart","Rect2D","Plot","CategoryAxis");var $C=mstrmojo.chart;mstrmojo.chart.GridBasePlot=mstrmojo.declare(mstrmojo.chart.Plot,null,{scriptClass:"mstrmojo.chart.GridBasePlot",mHasXAxis:false,mHasYAxis:false,mMarkerShape:0,mXaxis:null,mYaxis:null,mDataArea:null,init:function init(props){this._super(props);this.mMarkerShape=4;this.mHasXAxis=true;this.mHasYAxis=true;this.mDataArea=new $C.Rect2D();},AssignSeries:function AssignSeries(series){},AssignAxis:function AssignAxis(categoryAxis,isY){if(isY){this.mYAxis=categoryAxis;}else{this.mXAxis=categoryAxis;}},AssignDataArea:function AssignDataArea(dataArea,isToY){this.mDataArea.ResetRect(dataArea);if(isToY){this.mYAxis.SetDeviceDataArea(dataArea);}else{this.mXAxis.SetDeviceDataArea(dataArea);}}});}());