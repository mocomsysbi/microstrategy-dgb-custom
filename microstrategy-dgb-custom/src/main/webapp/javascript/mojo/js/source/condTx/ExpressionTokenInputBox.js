(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.css","mstrmojo.dom","mstrmojo.num","mstrmojo.expr","mstrmojo.range","mstrmojo.Widget","mstrmojo.WidgetList","mstrmojo.WidgetListMapper","mstrmojo._HasSuggestion","mstrmojo.LegacySuggestionList","mstrmojo.condTx.ExpressionToken","mstrmojo.condTx._CanBuildExpressionTree");mstrmojo.condTx.SpanListMapper=mstrmojo.provide("mstrmojo.condTx.SpanListMapper",mstrmojo.mixin({itemWrapperPrefix:function(w){return'<span class="'+this.getWrapperCss(w)+'">';},itemWrapperPrefill:"&nbsp;",itemWrapperSuffix:"</span>",createWrapperNode:function createWrapperNode(p){var d=p.ownerDocument,n=d.createElement("span");return n;},_iw2idx:function _iw2idx(w,p,node){var wns=this.wrapperNodes(p),idx=mstrmojo.array.indexOf(wns,node);return idx===-1?wns.length:idx;},itemOffsetLeft:function iofft(w,p,idx,node){if(!node){var ch=this.wrapperNodes(p);node=ch&&ch[idx];if(!node){return 0;}}var f=p.firstChild;if(!f||(f===node)){return 0;}return node.offsetLeft-f.offsetLeft;},whereDrop:function whdp(w,p,node,pos,off){var iw=this._nd2iw(w,p,node),idx,idxActual,l,h,wd;if(iw){idxActual=this._iw2idx(w,p,iw);idx=idxActual;l=this.itemOffsetLeft(w,p,null,iw);h=iw.offsetTop;wd=iw.offsetWidth;if(pos.x>off.left+l+wd/2){idx++;l+=wd;}}else{return w.dropCuePos;}return{left:l,top:h,idx:idx,idxActual:idxActual};}},mstrmojo.hash.copy(mstrmojo.WidgetListMapper)));var _D=mstrmojo.dom,_C=mstrmojo.css,_H=mstrmojo.hash,_N=mstrmojo.num,KEYS=mstrmojo.Enum_Keys,_R=mstrmojo.range,EDGE=_R.EDGE,isDelimiter=mstrmojo.condTx.ExpressionToken.isDelimiter,E=mstrmojo.expr,$ARR=mstrmojo.array,$CC=mstrmojo.condTx.CommonComponent,_NT=$CC.NODE_TYPE,AOP=$CC.ADV_OPERATION,SUGGESTION_DELAY=200;function getCharacter(e){var k=(_D.isIE&&!_D.isIE9)?e.keyCode:e.charCode;return(k>0)?String.fromCharCode(k):null;}function validateTokenItem(item,lastItem){if(item.isMstrObj){return true;}else{if(item.isDelimiter){switch(item.v){case"+":_H.copy(AOP.PLUS,item);break;case"-":_H.copy((!lastItem||lastItem.fn)?AOP.UNARYMINUS:AOP.MINUS,item);break;case"*":_H.copy(AOP.MULTI,item);break;case"/":_H.copy(AOP.DIVIDE,item);break;case"(":_H.copy(AOP.LEFTPARENTHESIS,item);break;case")":_H.copy(AOP.RIGHTPARENTHESIS,item);break;default:}return true;}}var idx=$ARR.find(this.suggestionCandidates,"dn",item.v);if(idx>=0){_H.copy(this.suggestionCandidates[idx],item);return true;}else{var isNum=_N.isNumeric(item.v);item.isNumeric=isNum;return isNum;}}mstrmojo.condTx.ExpressionTokenInputBox=mstrmojo.declare(mstrmojo.WidgetList,[mstrmojo._HasSuggestion,mstrmojo.condTx._CanBuildExpressionTree],{scriptClass:"mstrmojo.condTx.TokenInputBox",containerResizable:false,dropZone:true,itemField:"dn",allowDrop:function allowDrop(context){var dragData=context.src.data;return !!dragData;},ondrop:function(c){c.src.data={v:mstrmojo.condTx.ExpressionToken.brackets(c.src.data.item.n),oi:c.src.data.item,isNew:true};if(this.prepareDropItem){this.prepareDropItem(c);}this._super(c);},makeObservable:true,showDesc:true,showPath:true,markupString:'<div id={@id} class="mstrmojo-TokenInputBox {@cssClass}" style="{@cssText}"><div class="mstrmojo-TokenInputBox-edit" contenteditable="true" tabindex="1" spellcheck="false"ondragstart = "return false;" oncontextmenu = "document.oncontextmenu =  mstrmojo.all.{@id}.fnContextMenu;" onkeydown = "return mstrmojo.all.{@id}.handlekeydown(event);" onkeypress = "return mstrmojo.all.{@id}.handlekeypress(event);" onkeyup = "return mstrmojo.all.{@id}.handlekeyup(event);" onmouseup = "return mstrmojo.all.{@id}.handlemouseup(event);" >{@itemsHtml}</div><textarea class = "mstrmojo-TokenInputBox-clipboard" onkeyup = "return mstrmojo.all.{@id}.handlepaste(event);"></textarea><div class="mstrmojo-ListBase2-dropCue {@cssClass}"><div class="mstrmojo-ListBase2-dropCue-inner"></div></div></div>',markupSlots:{editNode:function(){return this.domNode.firstChild;},itemsContainerNode:function(){return this.domNode.firstChild;},clipboardNode:function(){return this.domNode.childNodes[1];},scrollboxNode:function(){return this.domNode.firstChild;},dropCueNode:function(){return this.domNode.lastChild;}},suggestionListClass:"mstrmojo.LegacySuggestionList",items:null,itemFunction:function itemFunction(item,idx,w){return new mstrmojo.condTx.ExpressionToken({data:item,parent:w});},listMapper:mstrmojo.condTx.SpanListMapper,isDelimiter:isDelimiter,postBuildRendering:function postBuildRendering(){if(this._super){this._super();}this._eros=false;if(_D.isFF){document.body.spellCheck=false;}},fnContextMenu:function fnContextMenu(evt){if(evt){evt.cancelBubble=true;evt.returnValue=false;}return false;},handlekeydown:function handlekeydown(e){e=e||window.event;var k=e.keyCode||e.charCode,noDefault=false,rInfo=_R.getRangeInfo();if(e.ctrlKey&&this.doubleByte){this.doubleByte=false;var pi=this.prev_rInfo,r=rInfo,s=r.startContainer.data.slice(pi.startOffset,rInfo.startOffset);this.widgetHandleImeInput(pi,s);return ;}switch(k){case KEYS.DELETE:if(!this.doubleByte){try{this.widgetHandleDelete(rInfo);this.startTokenSuggestion();this.raiseChangeEvent({type:"delete"});}catch(ex1){}noDefault=true;}break;case KEYS.BACKSPACE:if(!this.doubleByte){try{this.widgetHandleBackspace(rInfo);this.raiseChangeEvent({type:"backspace"});this.startTokenSuggestion();this.editNode.focus();}catch(ex2){}noDefault=true;}break;case KEYS.ENTER:case KEYS.TAB:this._startDebug=true;if(this.suggestionShown){this.handleSuggestionItemSelect(this.getSelected());}else{this.startTokenSuggestion();}noDefault=true;break;case KEYS.ESCAPE:this.endTokenSuggestion();noDefault=true;break;case 86:if(e.ctrlKey){this._saveRangeInfo=_R.getRangeInfo();this.clipboardNode.focus();noDefault=false;}break;case 229:if(!this.doubleByte){this.doubleByte=true;this.prev_rInfo=rInfo;this.prev_items=this.items;}break;case KEYS.LEFT_ARROW:case KEYS.RIGHT_ARROW:case KEYS.UP_ARROW:case KEYS.DOWN_ARROW:_D.stopPropogation(window,e);break;default:}if(noDefault){_D.stopPropogation(window,e);_D.preventDefault(window,e);return false;}return true;},handlekeypress:function handlekeypress(e){e=e||window.event;var c=getCharacter(e),k=e.keyCode||e.charCode,noDefault=false,ew;if(c&&!(c==="c"&&e.ctrlKey)){try{this.widgetHandleInput(_R.getRangeInfo(),c);this.raiseChangeEvent({type:"input",characeter:c});if(!this.isDelimiter(c)){if(this.useKeyDelay){var me=this;window.clearTimeout(this.tmr);this.tmr=window.setTimeout(function(){me.startTokenSuggestion();},SUGGESTION_DELAY);}else{this.startTokenSuggestion();}}else{this.endTokenSuggestion();}}catch(ex){}noDefault=true;}if(noDefault){_D.stopPropogation(window,e);_D.preventDefault(window,e);return false;}return true;},handlekeyup:function handlekeyup(e){var k=e.keyCode||e.charCode,ew;if(k===KEYS.LEFT_ARROW||k===KEYS.RIGHT_ARROW){ew=this.findObjectToken();if(ew&&ew===this._saveActiveToken){this.startTokenSuggestion(ew);}else{this.endTokenSuggestion();}}else{if(k===KEYS.UP_ARROW){this.preHighlight();}else{if(k===KEYS.DOWN_ARROW){this.nextHighlight();}}}this._saveRangeInfo=_R.getRangeInfo();},handlemouseup:function handlemouseup(e){var ew=this.findObjectToken();if(ew&&ew===this._saveActiveToken){this.startTokenSuggestion(ew);}else{this.endTokenSuggestion();}var rInfo=_R.getRangeInfo();if(this.doubleByte){var pi=this.prev_rInfo,r=this._saveRangeInfo,s=r.startContainer.data.slice(pi.startOffset,r.startOffset);if(s!==""){var w=this.widgetHandleImeInput(pi,s);this.prev_items=this.items;ew=_D.findWidget(rInfo.startContainer);if(ew){this._delaySetTextCaretPos(ew.domNode,rInfo.startOffset);}else{this._delaySetTextCaretPos(w.domNode,rInfo.startOffset-1);}}this.prev_rInfo=rInfo;}this._saveRangeInfo=rInfo;},handlepaste:function handlepaste(e){var v=this.clipboardNode.value;this.clipboardNode.value="";var ts=[],len=v&&v.length,i,t="",c;if(len>0){for(i=0;i<len;i++){c=v.charAt(i);if(this.isDelimiter(c)){if(!mstrmojo.string.isEmpty(t)){ts.push({v:t,isNew:true});t="";}ts.push({v:c,isDelimiter:true,isNew:true});}else{t=t+c;}}if(!mstrmojo.string.isEmpty(t)){ts.push({v:t,isNew:true});t="";}this.insertTokens(ts);}},raiseChangeEvent:function(params){params.name="tokensModify";this.raiseEvent(params);},getTokensAsString:function getTokensAsString(){var sa=[],its=this.items,i,len;for(i=0,len=its.length;i<len;i++){sa[i]=its[i].v;}return sa.join("| ");},replaceErrorToken:function replaceErrorToken(oi){var its=this.items,ei=mstrmojo.array.find(its,"sta",-1),nt={v:oi.n,oi:oi,isNew:true};if(ei>-1){this.remove(ei);this.add([nt],ei);}},widgetHandleDelete:function widgetHandleDelete(rInfo){if(rInfo.collapsed){var edge,ew,idx,so=rInfo.startOffset,itws=this.ctxtBuilder.itemWidgets;if(!_D.contains(this.editNode,rInfo.startContainer,false,document.body)){_R.collapseOnNode(this.editNode,false);return ;}edge=_R.getEdgeInfo(rInfo.startContainer,rInfo.startOffset);ew=_D.findWidget(rInfo.startContainer);idx=this.itemIndex(ew.data);if(edge===EDGE.EDGE_END){idx++;ew=itws[idx];so=0;}if(!ew){_R.collapseOnNode(this.editNode,false);return ;}if(ew.length()===1){this.remove(idx);ew=itws[idx];if(ew){_R.collapseOnNode(ew.domNode,true);}else{_R.collapseOnNode(this.editNode,false);}this.checkMergeTwoTokens(idx-1,idx);}else{ew.spliceContent(so,1);_R.collapseOnTextNode(ew.domNode,so);}}else{this.widgetDeleteTokens(rInfo);}},widgetHandleBackspace:function widgetHandleBackspace(rInfo){if(rInfo.collapsed){var edge,ew,idx,so=rInfo.startOffset,itws=this.ctxtBuilder.itemWidgets;if(!_D.contains(this.editNode,rInfo.startContainer,false,document.body)){if(rInfo.startOffset>0&&_D.isFF){ew=itws[this.items.length-1];_R.collapseOnNode(ew.domNode,false);rInfo=_R.getRangeInfo();edge=_R.getEdgeInfo(rInfo.startContainer,rInfo.startOffset);}else{_R.collapseOnNode(this.editNode,true);return ;}}edge=_R.getEdgeInfo(rInfo.startContainer,rInfo.startOffset);ew=_D.findWidget(rInfo.startContainer);idx=this.itemIndex(ew.data);if(edge===EDGE.EDGE_BEGIN){idx--;ew=itws[idx];so=ew.length();}if(!ew){_R.collapseOnNode(this.editNode,true);return ;}if(ew.length()===1){this.remove(idx);ew=itws[idx-1];if(ew){_R.collapseOnNode(ew.domNode,false);this.checkMergeTwoTokens(idx-1,idx);ew=itws[idx-1];}else{_R.collapseOnNode(this.editNode,true);}}else{ew.spliceContent(so-1,1);_R.collapseOnTextNode(ew.domNode,so-1);this.checkMergeTwoTokens(idx,idx+1);this.checkMergeTwoTokens(idx-1,idx);}}else{this.widgetDeleteTokens(rInfo);}},widgetHandleInput:function widgetHandleInput(rInfo,c){if(!rInfo.collapsed){this.widgetDeleteTokens(rInfo);rInfo=_R.getRangeInfo();}var edge,ew,idx,t,aw,so,itws=this.ctxtBuilder.itemWidgets;if(!_D.contains(this.editNode,rInfo.startContainer,false,document.body)){this.add([{v:c,isDelimiter:this.isDelimiter(c),isNew:true}],0);ew=itws[0];_R.collapseOnTextNode(ew.domNode,1);return ;}edge=_R.getEdgeInfo(rInfo.startContainer,rInfo.startOffset);ew=_D.findWidget(rInfo.startContainer);idx=this.itemIndex(ew.data);if(this.isDelimiter(c)){t={v:c,isDelimiter:true,isNew:true};if(edge===EDGE.EDGE_MIDDLE){var ts=ew.split2Tokens(rInfo.startOffset);this.remove(idx);this.add([ts[0],t,ts[1]],idx);idx=idx+1;}else{idx=(edge===EDGE.EDGE_BEGIN)?idx:idx+1;this.add([t],idx);}ew=itws[idx];_R.collapseOnNode(ew.domNode,false);}else{so=rInfo.startOffset;if(ew.isDelimiter()){aw=itws[(edge===EDGE.EDGE_BEGIN)?idx-1:idx+1];if(aw&&!aw.isDelimiter()){ew=aw;so=(edge===EDGE.EDGE_BEGIN)?ew.length():0;}}if(!ew.isDelimiter()){ew.spliceContent(so,0,c);_R.collapseOnTextNode(ew.domNode,so+1);}else{this.add([{v:c,isNew:true}],(edge===EDGE.EDGE_BEGIN)?idx:idx+1);ew=itws[(edge===EDGE.EDGE_BEGIN)?idx:idx+1];_R.collapseOnNode(ew.domNode,false);}}},widgetHandleImeInput:function widgetHandleInput(rInfo,c){if(!rInfo.collapsed){this.widgetDeleteTokens(rInfo);rInfo=_R.getRangeInfo();}var edge,ew,idx,t,aw,so,itws=this.ctxtBuilder.itemWidgets;if(!_D.contains(this.editNode,rInfo.startContainer,false,document.body)){this.clearTokens();this.add([{v:c,isDelimiter:this.isDelimiter(c),isNew:true}],0);itws=this.ctxtBuilder.itemWidgets;ew=itws[0];_R.collapseOnTextNode(ew.domNode,1);this._delaySetCaretPos(ew.domNode,false);return ;}edge=_R.getEdgeInfo(rInfo.startContainer,rInfo.startOffset);ew=_D.findWidget(rInfo.startContainer);idx=this.itemIndex(ew.data);so=rInfo.startOffset;if(ew.isDelimiter()){this.clearTokens();this.set("items",this.prev_items);itws=this.ctxtBuilder.itemWidgets;aw=itws[(edge===EDGE.EDGE_BEGIN)?idx-1:idx+1];if(aw&&!aw.isDelimiter()){ew=aw;so=(edge===EDGE.EDGE_BEGIN)?ew.length():0;}}if(!ew.isDelimiter()){ew.spliceContent(so,0,c);this._delaySetTextCaretPos(ew.domNode,so+c.length);}else{this.add([{v:c,isNew:true}],(edge===EDGE.EDGE_BEGIN)?idx:idx+1);ew=itws[(edge===EDGE.EDGE_BEGIN)?idx:idx+1];this._delaySetCaretPos(ew.domNode,false);}this.startTokenSuggestion();return ew;},findObjectToken:function findObjectToken(){var rInfo=_R.getRangeInfo(),ew=_D.findWidget(rInfo.startContainer);if(!_D.contains(this.editNode,rInfo.startContainer,false,document.body)){return null;}if(!ew||ew===this||!ew.isDelimiter){return null;}if(ew&&!ew.isDelimiter()){return ew;}var edge=_R.getEdgeInfo(rInfo.startContainer,rInfo.startOffset),itws=this.ctxtBuilder.itemWidgets,idx=this.itemIndex(ew.data);ew=itws[(edge===EDGE.EDGE_BEGIN)?idx-1:idx+1];if(ew&&!ew.isDelimiter()){return ew;}return null;},checkMergeTwoTokens:function checkMergeTwoTokens(idx1,idx2){var itws=this.ctxtBuilder.itemWidgets,w1=itws[idx1],w2=itws[idx2];if((w1&&!w1.isDelimiter()&&!w1.isMstrObj())&&(w2&&!w2.isDelimiter()&&!w2.isMstrObj())){this.remove([idx1,idx2]);this.add([w1.mergeTo(w2)],idx1);_R.collapseOnTextNode(itws[idx1].domNode,w1.length());}},insertTokens:function insertTokens(tokens){var rInfo=this._saveRangeInfo||_R.getRangeInfo(),ew,idx;if(!rInfo||!_D.contains(this.editNode,rInfo.startContainer,false,document.body)){this.add(tokens);this.raiseChangeEvent({type:"insert"});idx=this.items.length-1;ew=this.ctxtBuilder.itemWidgets[idx];this._delaySetCaretPos(ew.domNode,false);return idx;}var edge=_R.getEdgeInfo(rInfo.startContainer,rInfo.startOffset);ew=_D.findWidget(rInfo.startContainer);idx=this.itemIndex(ew.data);if(edge===EDGE.EDGE_MIDDLE){var ts=ew.split2Tokens(rInfo.startOffset);this.remove(idx);tokens.unshift(ts[0]);tokens.push(ts[1]);this.add(tokens,idx);}else{idx=(edge===EDGE.EDGE_BEGIN?idx:idx+1);this.add(tokens,idx);}idx=idx+tokens.length-1;ew=this.ctxtBuilder.itemWidgets[idx];this._delaySetCaretPos(ew.domNode,false);this.raiseChangeEvent({type:"insert"});var me=this;window.setTimeout(function(){me._saveRangeInfo=_R.getRangeInfo();},50);return idx;},clearTokens:function clearTokens(empty){this.set("items",empty||[]);this._saveRangeInfo=null;this._delaySetCaretPos(this.editNode,false);},focus:function focus(){var iws=this.ctxtBuilder.itemWidgets,len=iws.length;this._delaySetCaretPos(len>0?iws[len-1].domNode:this.editNode,false);},startTokenSuggestion:function startTokenSuggestion(w){this.endTokenSuggestion();if(!w){w=this.findObjectToken();}if(w&&!w.isDelimiter()){w.set("active",true);this._saveActiveToken=w;this.showSuggestion(this.getSearchPattern());}if(!w||this.getSearchPattern().length===0){this.hideSuggestion();}},browseItemVisible:false,folderLinksContextId:25,browsableTypes:[E.TP.FOLDER,E.TP.FACT,E.TP.ATTR,E.TP.FUNCTION,E.TP.FILTER,E.STP.PROMPT_OBJECTS,E.TP.ATTR,E.TP.DIM,E.TP.METRIC,E.TP.ROLE].join(","),getSearchPattern:function getSearchPattern(){var at=this._saveActiveToken,pattern=at&&at.data.v,len=pattern&&pattern.length;if(len>2){if(pattern.charAt(0)==="["){pattern=pattern.substring(1);}if(pattern.charAt(pattern.length-1)==="]"){pattern=pattern.substring(0,pattern.length-1);}}if(at&&at.data.ift){var v=at.data.v,pos=v&&v.indexOf("@");if(pos>=0){pattern=v.substring(pos);}}return pattern||"";},getSuggestionPos:function getSuggestionPos(){var at=this._saveActiveToken,sp=null,p;if(at){p=mstrmojo.dom.position(at.domNode,true);sp={left:Math.round(p.x)+"px",top:Math.round(p.y+p.h)+"px",zIndex:100};}return sp;},item2textCss:function item2textCss(data){return(this._super&&this._super(data))||{4:"m",11:"fx",12:"a",13:"fc",43:"tr",21:"afm","-99":"br"}[data.t]||"";},onBrowserOpen:function onBrowserOpen(){this.editNode.blur();},onSuggestionItemSelect:function onSuggestionItemSelect(it){var ow=this._saveActiveToken;this.endTokenSuggestion();if(ow){ow.setToken(it);this._delaySetCaretPos(ow.domNode,false);}this.closePopup();},_delaySetCaretPos:function _delaySetCaretPos(dn,toStart){var en=this.editNode,f=function(){en.focus();en.focus();_R.collapseOnNode(dn,toStart);};window.setTimeout(f,0);},_delaySetTextCaretPos:function _delaySetCaretPos(dn,offset){var en=this.editNode,me=this,f=function(){en.focus();en.focus();_R.collapseOnTextNode(dn,offset);me._saveRangeInfo=_R.getRangeInfo();};window.setTimeout(f,0);},getCandidatesThroughTaskCall:function getCandidatesThroughTaskCall(params,callbacks){callbacks.success({items:this.suggestionCandidates});},filterCandidates:function filterCandidates(its,t,max){var ow=this._saveActiveToken,fcs,tmpm={};if(ow&&ow.data.ift&&ow.data.oi){max=max||this.suggestCount;t=mstrmojo.string.regEscape(t);fcs=$ARR.filter(its,function(it){return it.t==21&&it.attid==ow.data.oi.did&&(new RegExp("^"+t,"i")).test("@"+it.n);},{max:max});}else{fcs=$ARR.filter(its,function(it){return it.t!=21;});fcs=this._super(fcs,t,max);}return fcs;},endTokenSuggestion:function endTokenSuggestion(){var ow=this._saveActiveToken;if(ow){ow.set("active",false);this._saveActiveToken=null;}},validate:function validate(){var items=this.items,i,len,w,lastData,data,invalid=false;widgets=this.ctxtBuilder.itemWidgets;for(i=0,len=items.length;i<len;i++){w=widgets[i];lastData=data;data=items[i];if(!validateTokenItem.call(this,data,lastData)){data.sta=-1;w.set("data",data);invalid=true;}}return !invalid;},widgetDeleteTokens:function widgetDeleteTokens(rInfo){var so=rInfo.startOffset,eo=rInfo.endOffset,sw=_D.findWidget(rInfo.startContainer),ew=_D.findWidget(rInfo.endContainer),si=this.itemIndex(sw.data),ei=this.itemIndex(ew.data),arr=[],sEdge=_R.getEdgeInfo(rInfo.startContainer,so),eEdge=_R.getEdgeInfo(rInfo.endContainer,eo),dStart=(sEdge===EDGE.EDGE_BEGIN?si:si+1),dEnd=(eEdge===EDGE.EDGE_END?ei:ei-1),i;if(sw===ew){if((sEdge===EDGE.EDGE_BEGIN)&&(eEdge===EDGE.EDGE_END)){this.remove(si);ew=this.ctxtBuilder.itemWidgets[si-1];if(ew){_R.collapseOnNode(ew.domNode,false);}else{_R.collapseOnNode(this.editNode,true);}}else{sw.spliceContent(so,eo-so);_R.collapseOnTextNode(ew.domNode,so);}}else{for(i=dStart;i<=dEnd;i++){arr.push(i);}this.remove(arr);if(sEdge===EDGE.EDGE_MIDDLE){sw.spliceContent(so);}if(eEdge===EDGE.EDGE_MIDDLE){ew.spliceContent(0,eo);}if(sEdge===EDGE.EDGE_BEGIN){sw=this.ctxtBuilder.itemWidgets[si-1];}if(sw){_R.collapseOnNode(sw.domNode,false);}else{_R.collapseOnNode(this.editNode,false);}si=(sEdge===EDGE.EDGE_BEGIN)?si-1:si;this.checkMergeTwoTokens(si,si+1);}this.editNode.focus();},buildExpressionTree:function buildExpressionTree(){if(this.validate()){return this._super();}else{throw"Invalid Token";}}});}());