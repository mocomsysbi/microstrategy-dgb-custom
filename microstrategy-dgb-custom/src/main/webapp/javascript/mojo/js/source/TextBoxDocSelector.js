(function(){mstrmojo.requiresCls("mstrmojo.DocSelector","mstrmojo.array","mstrmojo.elementHelper");var $ARR=mstrmojo.array,ELEM_ALL_ID=mstrmojo.DocSelector.ELEM_ALL_ID,_EH=mstrmojo.elementHelper;var NO_SEL_AS_EMPTY=0,NO_SEL_AS_UNSET=1,NO_SEL_AS_ALL=2;var UNIT_CONDITION=1,SUBTOTAL=3;function _adjustItems(items){$ARR.forEach(items,function(item){item.n=item.v;});return items;}mstrmojo.TextBoxDocSelector=mstrmojo.declare(mstrmojo.DocSelector,null,{scriptClass:"mstrmojo.TextBoxDocSelector",_ieformatHandlers:{domNode:["font","text-align","vertical-align","line-height","z-index","top","left"],contentNode:["width","B","P"],filterNode:["height","width","B","P","fx","background-color"],item:["color","font","text-decoration","text-align","line-height"]},formatHandlers:{domNode:["font","text-align","vertical-align","line-height","z-index","top","left"],contentNode:["height","width","B","P","fx","background-color"],item:["color","font","text-decoration","text-align","line-height"]},_fetchOnInit4UCOnDS:function _fetchOnInt(){},_getSelectionCount:function _getSelectionCount(widget){var items=widget.items;return items?items.length:0;},_buildEvent:function _buildEvent(rEvt,widget){var elementIDs=[],defn=this.defn;$ARR.forEach(widget.items,function(item){elementIDs.push(item.v);});if(elementIDs.length>0||defn.nsb===NO_SEL_AS_EMPTY){rEvt.eid=elementIDs.join(mstrmojo.elementHelper.ELEM_SEPARATOR);}else{rEvt.eid="";}if(defn.sec){this.parent.set("count",_EH.buildElemsCountStrByNum(elementIDs.length,0));}},updateWidget:function updateWidget(selectorContainer){var selectorWidget=this._super(selectorContainer),node=selectorContainer.node,data=node.data;selectorWidget.items=data.vs?_adjustItems(data.vs.concat()):[];return selectorWidget;},getWidgetConfig:function getWidgetConfig(selectorContainer,selectorStyle,defn,elements){var fmts=selectorContainer.getFormats(),data=selectorContainer.node.data,cfg=this._super(selectorContainer,selectorStyle,defn,elements);cfg={scriptClass:cfg.scriptClass,cssText:fmts.height?"height: "+fmts.height:"",emptyText:mstrmojo.desc(4325,"Search")+" "+(defn.ttl||""),items:data.vs?_adjustItems(data.vs.concat()):[],srcid:defn.srcid||"",dsrc:defn.dsrc||"",onitemsChange:function(){if(!selectorContainer._inSyncPhase){selectorContainer.selectorControlChange(this);}}};if(!defn.multi){cfg.maxObjectCount=1;}return cfg;}});}());