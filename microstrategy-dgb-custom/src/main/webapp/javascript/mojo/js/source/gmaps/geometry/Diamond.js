(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.gmaps.MapUtils","mstrmojo.gmaps.geometry.Point");var $MUTIL=mstrmojo.gmaps.MapUtils,DIAMOND_SIZE=16,PATH_TEMPLATE="M {x},{y-8} l 8,8 l -8,8 l -8,-8 Z";mstrmojo.gmaps.geometry.Diamond=mstrmojo.declare(mstrmojo.gmaps.geometry.Point,null,{scriptClass:"mstrmojo.gmaps.geometry.Diamond",nodeTag:"path",setPosition:function setPosition(props){this._super(props);if($MUTIL.checkVal(this.x)&&$MUTIL.checkVal(this.y)){$MUTIL.setNodeAttributes(this.node,{d:PATH_TEMPLATE.replace("{x}",this.x).replace("{y-8}",this.y-8)});}},getGeometrySize:function getGeometrySize(){return{width:DIAMOND_SIZE,height:DIAMOND_SIZE};}});}());