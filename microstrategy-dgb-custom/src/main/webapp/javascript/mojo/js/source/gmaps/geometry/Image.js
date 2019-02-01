(function(){mstrmojo.requiresCls("mstrmojo.gmaps.MapUtils","mstrmojo.gmaps.geometry.Point");var $GMAPS=mstrmojo.gmaps,$MUTIL=$GMAPS.MapUtils,$AlignOption=mstrmojo.gmaps.MarkerAlignOption;mstrmojo.gmaps.geometry.Image=mstrmojo.declare(mstrmojo.gmaps.geometry.Point,null,{scriptClass:"mstrmojo.gmaps.geometry.Image",useSvg:false,nodeTag:"img",imgUrl:null,width:null,height:null,defaultWidth:19,defaultHeight:24,initNodeStyles:function initNodeStyles(){this._super();this.setImageUrl(this.imgUrl);$MUTIL.setCssStyles(this.node,{position:"absolute"});this.width=($MUTIL.checkVal(this.width))?this.width:this.defaultWidth;this.height=($MUTIL.checkVal(this.height))?this.height:this.defaultHeight;this.setDimension(this.width,this.height);},update:function update(props){this._super(props);this.setTopLeft(this.width,this.height);},loadProps:function loadProps(props){if(!!props){this._super(props);if($MUTIL.checkVal(props.width)&&$MUTIL.checkVal(props.height)){this.width=props.width;this.height=props.height;}}},setSelection:function setSelection(isSelected){this._setHighlight(isSelected);this.disableHover=isSelected;},setHover:function setHover(isHovered){if(!this.disableHover){this._setHighlight(isHovered);}},_setHighlight:function _setHighlight(isHighlight){var width,height;if(!$MUTIL.checkVal(this.width)||!$MUTIL.checkVal(this.height)){return ;}if(isHighlight){width=this.width+10;height=this.height+10;}else{width=this.width;height=this.height;}this.setDimension(width,height);this.setTopLeft(width,height);},setDimension:function setDimension(width,height){if($MUTIL.checkVal(width)&&$MUTIL.checkVal(height)){$MUTIL.setNodeAttributes(this.node,{width:width,height:height});}},setTopLeft:function setTopLeft(width,height){var centerX,centerY;if($MUTIL.checkVal(width)&&$MUTIL.checkVal(height)&&$MUTIL.checkVal(this.x)&&$MUTIL.checkVal(this.y)){centerX=this.x-width/2;centerY=this.y-height;$MUTIL.setCssStyles(this.node,{top:centerY+"px",left:centerX+"px"});}},setImageUrl:function setImageUrl(imgUrl){if(!!imgUrl){this.imgUrl=imgUrl;$MUTIL.setNodeAttributes(this.node,{src:this.imgUrl});}},setFillColor:function setFillColor(){return null;},getGeometryAlignOption:function getGeometryAlignOption(){return $AlignOption.BOTTOM;}});}());