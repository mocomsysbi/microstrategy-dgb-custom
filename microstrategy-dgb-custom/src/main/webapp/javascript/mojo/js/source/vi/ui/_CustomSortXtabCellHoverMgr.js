(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.vi.ui._XtabCellHoverMgr");var $DOM=mstrmojo.dom;mstrmojo.vi.ui._CustomSortXtabCellHoverMgr=mstrmojo.declare(mstrmojo.vi.ui._XtabCellHoverMgr,null,{scriptClass:"mstrmojo.vi.ui._CustomSortXtabCellHoverMgr",cue:null,audibles:{"*":false,cueDisplay:true},oncontextmenu:function oncontextmenu(e,hWin,target){if(!this.parent.isSorting()){this._super(e,hWin,target);}else{$DOM.preventDefault(hWin,e);$DOM.stopPropogation(hWin,e);}},onhover:function onhover(e,hWin,target){var target=target||e.target,tgtRow=$DOM.findAncestorByName(target,"tr"),xtab=this.parent;if(!tgtRow){return ;}if(xtab.isSorting()){var td=$DOM.checkTagName(target,"td")?target:$DOM.findAncestorByName(target,"td");if(td&&xtab.validCustomSortTgtRow(tgtRow)){var pos=$DOM.position(tgtRow),cueStyle=this.getCue().style;cueStyle.width=Math.min(pos.w,$DOM.position(xtab.domNode).w)+"px";cueStyle.top=(pos.y+pos.h)+"px";cueStyle.left=pos.x+"px";this.toggleCueDisplay(true);}}else{if(tgtRow.rowIndex===0){this._super(e,hWin,target);}}},onunhover:function onunhover(){this.toggleCueDisplay(false);this._super();},getCue:function getCue(){if(!this.cue){var cue=document.createElement("div");cue.className="mstrmojo-vi-cs-cue";this.cue=document.body.appendChild(cue);}return this.cue;},removeCue:function removeCue(){if(this.cue){document.body.removeChild(this.cue);delete this.cue;}},toggleCueDisplay:function toggleCueDisplay(display){this.set("cueDisplay",display);},oncueDisplayChange:function oncueDisplayChange(){if(this.cue){this.cue.style.display=this.cueDisplay?"":"none";}}});}());