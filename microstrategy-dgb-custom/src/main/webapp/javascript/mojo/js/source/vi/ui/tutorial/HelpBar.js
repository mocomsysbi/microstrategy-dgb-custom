(function(){mstrmojo.requiresCls("mstrmojo.ui.List","mstrmojo._IsWebApp");mstrmojo.vi.ui.tutorial.HelpBar=mstrmojo.declare(mstrmojo.ui.List,null,{scriptClass:"mstrmojo.vi.ui.tutorial.HelpBar",cssClass:"mstrmojo-tutorial-helpbar",selectionPolicy:"reselect",init:function init(props){this._super(props);this.items=mstrApp.viWelcomeData.helpitems;},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx);props.addCls("ic"+idx);return props;},getItemMarkup:function(){return'<div class="item" idx="{@idx}">{@n}</div>';},showHelpTopic:function showHelpTopic(topic){return mstrmojo._IsWebApp.showHelpTopic(topic);},onchange:function(evt){var selected=evt.added[0],item=this.items[selected],url=item.url;if(url&&mstrApp.isSingleTier){if(url==="feedback"){window.FormWrapper.sendFeedback();}else{window.FormWrapper.openPage(url);}}else{this.showHelpTopic(item.topic);}}});}());