(function(){mstrmojo.requiresCls("mstrmojo.ui.List");var $CSS=mstrmojo.css;mstrmojo.vi.ui.tutorial.BaseContent=mstrmojo.declare(mstrmojo.ui.List,[],{scriptClass:"mstrmojo.vi.ui.tutorial.BaseContent",cssClass:"mstrmojo-tutorial-basecontent",selectionPolicy:"reselect",icnCss:"cf",markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod},init:function init(props){this._super(props);this.items=this.parent.parent.samplesData;$CSS.addWidgetCssClass(this,this.cssClassName);},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx),itemDetails=mstrApp.viWelcomeData.samplesAdditionalDetails[item.n];props.addCls("ic "+(itemDetails?itemDetails.cls:""));return props;},getItemMarkup:function(){return'<div class="item " idx="{@idx}" ><div class="title">{@n}</div><div class="{@cls} " Style="{@style}"></div></div>';},onchange:function(evt){var selected=evt.added[0],item=this.items[selected];this.loadItem(item);}});}());