(function(){mstrmojo.requiresCls("mstrmojo.vi.ui.TargetMask","mstrmojo.css","mstrmojo.desc");var maskAlias="targetMask";mstrmojo.vi.ui._HasTargets=mstrmojo.provide("mstrmojo.vi.ui._HasTargets",{_mixinName:"mstrmojo.vi.ui._HasTargets",init:function init(props){if(this._super){this._super(props);}this.addChildren([{scriptClass:"mstrmojo.vi.ui.TargetMask",alias:maskAlias,slot:"domNode",tooltipContent:this.maskTooltip,allowFilters:this.allowFilters}]);},setMaskClass:function(srcId){if(this[maskAlias].setMaskClass(srcId)){this._originalContextMenu=this.shouldShowCustomizeContextMenu;this.shouldShowCustomizeContextMenu=function(){return false;};this._originalIsDraggable=this.draggable;this.draggable=false;}},clearMaskClass:function(){this.shouldShowCustomizeContextMenu=this._originalContextMenu;delete this._originalContextMenu;this.draggable=this._originalIsDraggable;delete this._originalIsDraggable;this[maskAlias].clearMaskClass();}});}());