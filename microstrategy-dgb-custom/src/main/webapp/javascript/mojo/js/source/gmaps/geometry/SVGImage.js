(function(){mstrmojo.requiresCls("mstrmojo.gmaps.MapUtils","mstrmojo.gmaps.geometry.Point");var $MOJO=mstrmojo,$GMAPS=$MOJO.gmaps,$MUTIL=$GMAPS.MapUtils,$AlignOption=$GMAPS.MarkerAlignOption;mstrmojo.gmaps.geometry.SVGImage=mstrmojo.declare(mstrmojo.gmaps.geometry.Point,null,{scriptClass:"mstrmojo.gmaps.geometry.SVGImage",nodeTag:"image",imgUrl:null,width:null,height:null,actualWidth:null,actualHeight:null,defaultWidth:19,defaultHeight:24,opacity:1,initNodeStyles:function initNodeStyles(){this.width=($MUTIL.checkVal(this.width))?this.width:this.defaultWidth;this.height=($MUTIL.checkVal(this.height))?this.height:this.defaultHeight;this.setDimension(this.width,this.height);this.setImageUrl($MUTIL.convertImageUrl(this.imgUrl));},loadProps:function loadProps(props){if(!!props){this._super(props);if($MUTIL.checkVal(props.actualWidth)&&$MUTIL.checkVal(props.actualHeight)){this.actualWidth=props.actualWidth;this.actualHeight=props.actualHeight;}}},setPosition:function setPosition(props){this._super(props);if($MUTIL.checkVal(this.x)&&$MUTIL.checkVal(this.y)&&$MUTIL.checkVal(this.actualWidth)&&$MUTIL.checkVal(this.actualHeight)){$MUTIL.setNodeAttributes(this.node,{x:this.x-this.actualWidth/2,y:this.y-this.actualHeight});}},setDimension:function setDimension(width,height){if(!$MUTIL.checkVal(width)||!$MUTIL.checkVal(height)){return ;}$MUTIL.setNodeAttributes(this.node,{width:width,height:height});this.actualWidth=width;this.actualHeight=height;},setFillColor:function setFillColor(){return null;},setSelection:function setSelection(isSelected){this.opacity=1;this._setHighlight(isSelected);this.disableHover=isSelected;},setUnSelection:function setUnSelection(){this.opacity=0.5;this._setHighlight(false);},setHover:function setHover(isHovered){if(!this.disableHover){this._setHighlight(isHovered);}},setImageUrl:function setImageUrl(imgUrl){if(this.node&&imgUrl){this.node.setAttributeNS("http://www.w3.org/1999/xlink","href",imgUrl);}},_setHighlight:function _setHighlight(isHighlight){if($MUTIL.checkVal(this.width)&&$MUTIL.checkVal(this.height)){if(isHighlight){this.setDimension(this.width+10,this.height+10);}else{this.setDimension(this.width,this.height);}}this.setPosition();if($MUTIL.checkVal(this.opacity)){$MUTIL.setNodeAttributes(this.node,{opacity:this.opacity});}},getGeometryAlignOption:function getGeometryAlignOption(){return $AlignOption.BOTTOM;}});}());