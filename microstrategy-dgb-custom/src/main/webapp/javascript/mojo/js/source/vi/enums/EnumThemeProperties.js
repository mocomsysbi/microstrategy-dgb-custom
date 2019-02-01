mstrmojo.requiresCls("mstrmojo.gm.GMEnums");var $GM=mstrmojo.gm,CHART_TYPE=$GM.EnumGraphType,PRP_DATA_LABELS=$GM.EnumDataLabels,PRP_LEGEND=$GM.EnumLegend,PRP_MIN_SIZE_TYPE=$GM.EnumMinSizeType,PRP_FIT_TO=$GM.EnumFitTo,ENUM_FIT_MODES=$GM.EnumContainerFitModes,NGM_GRID_LINE=$GM.EnumNGMGridLines;var ARIAL="Arial",OPEN_SANCE="Open Sans",ALL="ALL";var ENUM_LAYOUT_THEME={DEFAULT:"spatial",CLASSIC:"classic"};var classicProps={THEME_STYLE:ENUM_LAYOUT_THEME.CLASSIC,LAYOUT:{allFF:ARIAL,titleFF:ARIAL,dlvPadding:2,dlvMargin:4,dlvLOH_Compensation:1,ucTBLOHeight:1,drpChildPadding:4,drpLOHW_Compensation:0,cueBottomOffset:1},GRID:{paddingSize:5,mRatio:2,lRatio:3,gridTemplateVisible:false},HEATMAP:{smallGap:2,middleGap:4,largeGap:6,largerGap:8},NGM:{GENERAL_PROPS:(function(){var obj={};obj[ALL]={dataLabels:PRP_DATA_LABELS.HIDE};return obj;}()),DEFAULT_PROPS:(function(){var obj={};obj[ALL]={cntrFitMode:ENUM_FIT_MODES.AUTOMATIC};return obj;}())},OGM:{GENERAL_PROPS:(function(){var obj={};obj[ALL]={dataLabels:PRP_DATA_LABELS.HIDE,minRowHeight:20,fitTo:PRP_FIT_TO.AUTOMATIC};return obj;}()),DEFAULT_PROPS:(function(){var obj={};obj[ALL]={};obj[CHART_TYPE.BAR]={shpBdrThk:1,shpBdrStyle:0};obj[CHART_TYPE.PIE]={shpBdrThk:1,shpBdrStyle:0};obj[CHART_TYPE.GRID]={shpFillTrans:70};return obj;}())},KPI:{fontFamily:ARIAL,defaultFontClr:{1:"#444649",2:"#FFFFFF",3:"#FFFFFF",4:"#FFFFFF"}}},defaultProps={THEME_STYLE:ENUM_LAYOUT_THEME.DEFAULT,LAYOUT:{allFF:OPEN_SANCE,titleFF:OPEN_SANCE,dlvPadding:0,dlvMargin:0,dlvLOH_Compensation:0,ucTBLOHeight:0,drpChildPadding:12,drpLOHW_Compensation:12,cueBottomOffset:-2},GRID:{paddingSize:4.52,mRatio:1050/452,lRatio:1205/452,gridTemplateVisible:true},HEATMAP:{smallGap:1,middleGap:3,largeGap:5,largerGap:5,cellTextSize:11,fontFamily:"Open Sans SemiBold",leftPadding:10,topPadding:8,lineHeightTime:1.3,marginTop:"3px"},NGM:{GENERAL_PROPS:(function(){var obj={};obj[ALL]={dataLabels:PRP_DATA_LABELS.HIDE};obj[CHART_TYPE.WATERFALL]={dataLabels:PRP_DATA_LABELS.HIDE};return obj;}()),DEFAULT_PROPS:(function(){var obj={};obj[ALL]={cntrFitMode:ENUM_FIT_MODES.FIT_TO_CONTENT,dlFntFml:OPEN_SANCE,rfLnFntFml:OPEN_SANCE,lgdFntFml:OPEN_SANCE,xAxTtFntFml:OPEN_SANCE,xAxLbFntFml:OPEN_SANCE,yAxTtFntFml:OPEN_SANCE,yAxLbFntFml:OPEN_SANCE,allTxtFntFml:OPEN_SANCE,rwHdrTxtFntFml:OPEN_SANCE,colHdrTxtFntFml:OPEN_SANCE,rwVlTxtFntFml:OPEN_SANCE,colVlTxtFntFml:OPEN_SANCE,ttlFntFml:OPEN_SANCE,dlFntSz:"9pt",rfLnFntSz:"9pt",lgdFntSz:"9pt",xAxTtFntSz:"9pt",xAxLbFntSz:"9pt",yAxTtFntSz:"9pt",yAxLbFntSz:"9pt",allTxtFntSz:"9pt",rwHdrTxtFntSz:"9pt",colHdrTxtFntSz:"9pt",rwVlTxtFntSz:"9pt",colVlTxtFntSz:"9pt",ttlFntSz:"9pt"};obj[CHART_TYPE.WATERFALL]={yGridLnShw:NGM_GRID_LINE.AUTO,xGridLnShw:NGM_GRID_LINE.AUTO};return obj;}())},OGM:{GENERAL_PROPS:(function(){var obj={};obj[ALL]={dataLabels:PRP_DATA_LABELS.HIDE,minRowHeight:20,fitTo:PRP_FIT_TO.NONE};obj[CHART_TYPE.PIE]={legend:PRP_LEGEND.HIDE,legendShow:false,dataLabels:PRP_DATA_LABELS.SHOW_TEXT_ONLY};obj[CHART_TYPE.SCATTER]={minSizeType:PRP_MIN_SIZE_TYPE.AUTO};return obj;}()),DEFAULT_PROPS:(function(){var obj={};obj[ALL]={rwHdrShw:false,colHdrShw:false,dlFntFml:OPEN_SANCE,rfLnFntFml:OPEN_SANCE,lgdFntFml:OPEN_SANCE,xAxTtFntFml:OPEN_SANCE,xAxLbFntFml:OPEN_SANCE,yAxTtFntFml:OPEN_SANCE,yAxLbFntFml:OPEN_SANCE,allTxtFntFml:OPEN_SANCE,rwHdrTxtFntFml:OPEN_SANCE,colHdrTxtFntFml:OPEN_SANCE,rwVlTxtFntFml:OPEN_SANCE,colVlTxtFntFml:OPEN_SANCE,ttlFntFml:OPEN_SANCE,dlFntClr:3815477,rfLnFntClr:3815477,lgdFntClr:3815477,xAxTtFntClr:3815477,xAxLbFntClr:3815477,yAxTtFntClr:3815477,yAxLbFntClr:3815477,allTxtFntClr:3815477,rwHdrTxtFntClr:3815477,colHdrTxtFntClr:3815477,rwVlTxtFntClr:3815477,colVlTxtFntClr:3815477,ttlFntClr:3815477,yAxTtFntStyle:1,xAxTtFntStyle:1,rwHdrTxtFntStyle:1,colHdrTxtFntStyle:1,dlFntSz:"9pt",rfLnFntSz:"9pt",lgdFntSz:"9pt",xAxTtFntSz:"9pt",xAxLbFntSz:"9pt",yAxTtFntSz:"9pt",yAxLbFntSz:"9pt",allTxtFntSz:"9pt",rwHdrTxtFntSz:"9pt",colHdrTxtFntSz:"9pt",rwVlTxtFntSz:"9pt",colVlTxtFntSz:"9pt",ttlFntSz:"9pt"};obj[CHART_TYPE.AREA]={shpBdrThk:1,shpFillTrans:100,shpBdrClr:15461355};obj[CHART_TYPE.BAR]={shpBdrClr:15461355,shpBdrStyle:0,shpBdrThk:1,shpFillTrans:100};obj[CHART_TYPE.LINE]={shpFillTrans:100};obj[CHART_TYPE.PIE]={shpBdrThk:1,shpBdrStyle:0,shpFillTrans:100,shpBdrClr:15461355};obj[CHART_TYPE.SCATTER]={shpBdrStyle:99,shpFillTrans:40};obj[CHART_TYPE.BUBBLE]={shpBdrStyle:99,shpFillTrans:40};obj[CHART_TYPE.GRID]={shpBdrThk:1,shpFillTrans:100};return obj;}())},KPI:{fontFamily:OPEN_SANCE,defaultFontClr:{1:"#35383A",2:"#FFFFFF",3:"#FFFFFF",4:"#FFFFFF"}}};mstrmojo.vi.enums.EnumThemeProperties={CLASSIC_THEME_PROPS:classicProps,DEFAULT_THEME_PROPS:defaultProps};mstrmojo.vi.enums.EnumThemeProperties.SUBTYPE={GRID:"GRID",LAYOUT:"LAYOUT",HEATMAP:"HEATMAP"};mstrmojo.vi.enums.EnumThemeProperties.ENUM_LAYOUT_THEME=ENUM_LAYOUT_THEME;mstrmojo.vi.enums.EnumThemeProperties.ENUM_LAYOUT_STYLE={DEFAULT:0,CARD:1,FLAT:2};