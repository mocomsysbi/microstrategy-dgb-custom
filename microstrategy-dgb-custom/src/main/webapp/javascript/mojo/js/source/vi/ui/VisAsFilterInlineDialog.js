(function(){mstrmojo.requiresCls("mstrmojo.vi.ui._MonitorsTocPage","mstrmojo.vi.ui.LinkTargetSelector","mstrmojo.vi.ui.InlineDialogBase");mstrmojo.vi.ui.VisAsFilterInlineDialog=mstrmojo.declare(mstrmojo.vi.ui.InlineDialogBase,[mstrmojo.vi.ui._MonitorsTocPage],{scriptClass:"mstrmojo.vi.ui.VisAsFilterInlineDialog",_createTargetSelector:function _createTargetSelector(){return new mstrmojo.vi.ui.LinkTargetSelector({alias:"targetSelector",orientation:"h",hostId:this.id,srcId:this.vis.id});},_setTargetsFunc:function _setTargetsFunc(){var vis=this.vis,visModel=vis.model;visModel.setVisAsFilter(vis,this.changes);},_tocNavWarn:function _tocNavWarn(evt){var me=this,model=me.vis.model;mstrmojo.warn(mstrmojo.desc(15094,"Selecting targets on another page will discard all the selected targets on the current page."),{confirmBtn:{t:mstrmojo.desc(212,"Continue"),fn:function(){var tgtSelector=model.getVizContentPanel()._tgtSelections;tgtSelector&&tgtSelector.clear();me.goToPage(evt);},hot:true},cancelBtn:{t:mstrmojo.desc(221,"Cancel")}},{title:mstrmojo.desc(15093,"Do you want to target visualizations on another page?")});}});}());