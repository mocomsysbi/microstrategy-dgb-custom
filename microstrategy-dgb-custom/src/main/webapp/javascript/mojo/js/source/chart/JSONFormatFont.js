(function(){mstrmojo.requiresCls("mstrmojo.chart.JSONFormat","mstrmojo.chart.enums.EnumFormatType");var $HASH=mstrmojo.hash,$C=mstrmojo.chart,$CHART_ENUMS=$C.enums,$FMT=$CHART_ENUMS.EnumFormatType;mstrmojo.chart.JSONFormatFont=mstrmojo.declare(mstrmojo.chart.JSONFormat,null,{scriptClass:"mstrmojo.chart.JSONFormatFont",mFontAlignment:0,mFontStyle:0,mFontRotation:0,mFontBox:0,mFontColor:null,mFontAlpha:0,mFontName:0,mFontSize:0,init:function init(props){props.mFormatType=$FMT.FMT_FONT;this._super(props);$HASH.copyProps(["mFontAlignment","mFontStyle","mFontRotation","mFontBox","mFontColor","mFontAlpha","mFontName","mFontSize","id"],props,this);},AppendToJSONObject:function AppendToJSONObject(JSONObject){var fontColor=this.mFontColor;JSONObject.push({FormatType:this.mFormatType,Alignment:this.mFontAlignment,Style:this.mFontStyle,Rotation:this.mFontRotation,Box:this.mFontBox,Alpha:this.mFontAlpha,Name:this.mFontName,Size:this.mFontSize,Color:{R:fontColor.mR,G:fontColor.mG,B:fontColor.mB}});}});}());