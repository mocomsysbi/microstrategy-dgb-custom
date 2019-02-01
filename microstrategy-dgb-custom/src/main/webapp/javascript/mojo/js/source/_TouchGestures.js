(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.hash");mstrmojo.touchManager=new mstrmojo.Obj({notify:function(srcId,touch){return this.raiseEvent({name:"touchesBegin",srcId:srcId,touch:touch});}});var $D=mstrmojo.dom,$DAE=$D.attachEvent,$DDE=$D.detachEvent,$MATH=Math,$C=window.mstrConfig,debug=false,activeWinListener=null,defaultTouchConfiguration=$C&&$C.allowDefaultTouches;var SWIPE_THRESHOLD=10,TAP_TIMEOUT=250,SELECT_DURATION=400,MIN_DELTA_BETWEEN_MOVE_EVENTS=100;var EVT_BEGIN="Begin",EVT_END="End",EVT_MOVE="Move",EVT_CANCEL="Cancel";var ACTION_SELECT=1,ACTION_SWIPE=2,ACTION_MULTI=3,ACTION_TAP=4;var actionMethodMap={};actionMethodMap[ACTION_SELECT]="Select";actionMethodMap[ACTION_SWIPE]="Swipe";actionMethodMap[ACTION_MULTI]="Multi";actionMethodMap[ACTION_TAP]="Tap";$DAE(document.body,"touchmove",function(evt){if(!$C||!$C.allowDefaultTouches){if(evt.preventDefault){evt.preventDefault();return false;}}return true;});function getEvtIdentifier(evt){var id=evt.identifier;return(id===undefined)?1:id;}function debugLog(cmd,msg,widget,evt){if(debug){var touchId=evt?getEvtIdentifier(evt)+" ":"";window.console.log(cmd+":"+(widget?" "+widget.scriptClass+" "+widget.id:"")+" "+touchId+(msg||""));}}function isActive(widget){return(activeWinListener===widget);}function detachWinEvts(widget){if(!isActive(widget)){return ;}debugLog("detachWinEvts","",widget);$DDE(window,$D.TOUCHMOVE,widget._tmCallback,true);$DDE(window,$D.TOUCHEND,widget._teCallback,true);$DDE(window,$D.TOUCHCANCEL,widget._teCallback,true);activeWinListener=null;}function attachWinEvts(widget){if(isActive(widget)){return ;}var activeWidget=activeWinListener;if(activeWidget){debugLog("forced deactivation","",activeWidget);detachWinEvts(activeWidget);}debugLog("attachWinEvts","",widget);$DAE(window,$D.TOUCHMOVE,widget._tmCallback,true);$DAE(window,$D.TOUCHEND,widget._teCallback,true);$DAE(window,$D.TOUCHCANCEL,widget._teCallback,true);activeWinListener=widget;}function getWidgetHandlerMethodName(evtName,action){return"touch"+((action&&actionMethodMap[action])||"")+(evtName||"");}function getWidgetHandler(widget,evtName,action){var methodName=getWidgetHandlerMethodName(evtName,action);return(widget[methodName]!==undefined)?methodName:"";}function fireWidgetHandler(widget,evtName,touch,action,gesture){gesture=gesture||widget.gestures[touch.id];var target=(gesture&&gesture.bubbleTarget)||widget,methodName=getWidgetHandler(target,evtName,action);if(methodName){debugLog("fire",methodName,target);touch.methodName=methodName;return target[methodName](touch);}debugLog("no handler",getWidgetHandlerMethodName(evtName,action),target);return true;}function createTouchObject(e,startTouch,changedTouch,lastTouch){var pageX=changedTouch.pageX,pageY=changedTouch.pageY,timeStamp=e.timeStamp,id=getEvtIdentifier(changedTouch),delta={x:$MATH.round(pageX-startTouch.pageX),y:$MATH.round(pageY-startTouch.pageY)};var evt={id:id,evt:e,pageX:pageX,pageY:pageY,clientX:changedTouch.clientX,clientY:changedTouch.clientY,target:changedTouch.target,delta:delta,date:timeStamp,stop:function(){debugLog("event stopped",id);e.stopPropagation();e.cancelBubble=true;}};if(lastTouch){var timeDelta=timeStamp-lastTouch.date,lastDelta=lastTouch.delta,accelDelta={x:$MATH.abs(delta.x-lastDelta.x),y:$MATH.abs(delta.y-lastDelta.y)};evt.velocity={x:accelDelta.x/timeDelta,y:accelDelta.y/timeDelta};evt.isVertical=(accelDelta.y>accelDelta.x);evt.accelDelta=accelDelta;var direction=evt.direction={};if(pageX!==lastTouch.pageX){direction.x=(pageX<lastTouch.pageX);}else{if(pageX!==startTouch.pageX){direction.x=(pageX<startTouch.pageX);}}if(pageY!==lastTouch.pageY){direction.y=(pageY<lastTouch.pageY);}else{if(pageX!==startTouch.pageX){direction.y=(pageY<startTouch.pageY);}}}return evt;}function createGestureObject(touch,previousOneTouch,previousTwoTouch,evt){return{s:touch,p1:previousOneTouch,p2:previousTwoTouch,evt:evt,target:evt.target};}function deleteBubbleTargetGesture(target,touchId){if(target){target.gestures[touchId]=null;}}function cancelTouch(widget,touchObject){detachWinEvts(widget);fireWidgetHandler(widget,EVT_END,touchObject);}function cancelSelect(widget){if(widget._selectHandle){window.clearTimeout(widget._selectHandle);delete widget._selectHandle;debugLog("cancelSelect","",widget);}}function touchesBegin(widget,e){var which=e.which;if(which&&which===3){debugLog("ignore","right mouse click",widget);return ;}var gestures=widget.gestures,touches=e.touches||[e],changedTouch=(e.changedTouches&&e.changedTouches[0])||e,isWidgetActive=isActive(widget),touchObject=createTouchObject(e,changedTouch,changedTouch),gesture=createGestureObject(touchObject,touchObject,touchObject,e);debugLog("touchBegin","",widget,changedTouch);if(touches.length>1){if(!isWidgetActive){touchObject.stop();debugLog("ignore","cross widget multitouch",widget,changedTouch);var activeWidget=activeWinListener;if(activeWidget&&activeWidget.onCrossWidgetMultitouch!==undefined){debugLog("call onCrossWidgetMultitouch for","",activeWidget);activeWidget.onCrossWidgetMultitouch();}return false;}}else{if(isWidgetActive){debugLog("forced deactivation","",widget,changedTouch);detachWinEvts(widget);isWidgetActive=false;}}if(widget.singleNode&&changedTouch.target!==widget._tn){debugLog("ignore","target is not touch node",widget,changedTouch);return ;}if(mstrmojo.touchManager.notify(widget.id,touchObject).ignore){touchObject.stop();return ;}if(!isWidgetActive){var tagName=touchObject.target.tagName;tagName=tagName&&tagName.toLowerCase();if(tagName==="select"||tagName==="input"){debugLog("ignore","target is input or select",widget,changedTouch);if(widget.monitorInputs){fireWidgetHandler(widget,null,touchObject,ACTION_TAP);}return ;}}gestures[touchObject.id]=gesture;if(isWidgetActive){if(!widget.multiTouch){cancelSelect(widget);var prevTouch=touches[touches.length-2],prevGesture=gestures[getEvtIdentifier(prevTouch)];fireWidgetHandler(widget,EVT_CANCEL,prevTouch,prevGesture.action,prevGesture);}else{gesture.action=ACTION_MULTI;if(widget._singleTouch){cancelSelect(widget);widget._singleTouch.action=ACTION_MULTI;delete widget._singleTouch.bubbleTarget;delete widget._singleTouch;fireWidgetHandler(widget,EVT_BEGIN,touchObject,ACTION_MULTI);}}touchObject.stop();return ;}if(!$D.contains(widget._tn,e.target,true,widget.domNode)){delete gestures[touchObject.id];return ;}widget._singleTouch=gesture;if(fireWidgetHandler(widget,EVT_BEGIN,touchObject)===false){return ;}touchObject.stop();if(getWidgetHandler(widget,EVT_BEGIN,ACTION_SELECT)){widget._selectHandle=window.setTimeout(function(){gesture.action=ACTION_SELECT;if(fireWidgetHandler(widget,EVT_BEGIN,touchObject,ACTION_SELECT)===false){cancelTouch(widget,touchObject);}delete widget._selectHandle;},SELECT_DURATION);}attachWinEvts(widget);}function touchesMoved(widget,e){var changedTouch=(e.changedTouches&&e.changedTouches[0])||e,gesture=widget.gestures[getEvtIdentifier(changedTouch)];if(!gesture){return ;}var touchObject=createTouchObject(e,gesture.s,changedTouch,gesture.p2),action=gesture.action;gesture.p2=gesture.p1;gesture.p1=touchObject;if(!action&&($MATH.abs(touchObject.delta.x)>SWIPE_THRESHOLD||$MATH.abs(touchObject.delta.y)>SWIPE_THRESHOLD)){action=gesture.action=ACTION_SWIPE;cancelSelect(widget);if(!getWidgetHandler(widget,EVT_BEGIN,action)&&!getWidgetHandler(widget,EVT_MOVE,action)){touchObject.methodName=getWidgetHandlerMethodName(EVT_BEGIN,action);return widget.bubbleTouchEvent(touchObject);}if(fireWidgetHandler(widget,EVT_BEGIN,touchObject,action)===false){cancelTouch(widget,touchObject);return ;}}if(action){var lastMove=gesture.lastMove||gesture.s.date,delta=touchObject.date-lastMove;if(!mstrApp.isTouchApp()||delta>=MIN_DELTA_BETWEEN_MOVE_EVENTS){gesture.lastMove=touchObject.date;fireWidgetHandler(widget,EVT_MOVE,touchObject,action);}}}function touchesEnd(widget,e){var changedTouch=(e.changedTouches&&e.changedTouches[0])||e,touchCount=(e.touches&&e.touches.length)||0,gestures=widget.gestures,touchId=getEvtIdentifier(changedTouch),gesture=gestures[touchId];if(!gesture){debugLog("No gesture",touchId,widget,changedTouch);return ;}var action=gesture.action,touchObject=createTouchObject(e,gesture.s,changedTouch,gesture.p2);if(!action){cancelSelect(widget);if(!gesture.wasMulti){action=ACTION_TAP;}}if(touchCount===0){detachWinEvts(widget);widget.gestures=[];debugLog("gestures","clear all",widget,changedTouch);}else{gestures[touchId]=null;debugLog("gestures","clear single",widget,changedTouch);}deleteBubbleTargetGesture(gesture.bubbleTarget,touchId);switch(action){case ACTION_SWIPE:case ACTION_SELECT:touchObject.stop();fireWidgetHandler(widget,EVT_END,touchObject,action,gesture);break;case ACTION_MULTI:if(touchCount<2){fireWidgetHandler(widget,EVT_END,touchObject,action,gesture);if(touchCount===1){var remainingTouch=e.touches[0],rebasedTouch=createTouchObject(e,remainingTouch,remainingTouch),newGesture=createGestureObject(rebasedTouch,rebasedTouch,rebasedTouch,e);newGesture.wasMulti=true;gestures[getEvtIdentifier(remainingTouch)]=newGesture;widget._singleTouch=newGesture;}}if(touchCount>0){return ;}break;case ACTION_TAP:if(!getWidgetHandler(widget,null,action)){break;}var tapHandler=widget._tapHandler;if(tapHandler){window.clearTimeout(tapHandler.h);}if(touchObject.date-gesture.s.date<SELECT_DURATION){if(fireWidgetHandler(widget,"Before",touchObject,action,gesture)===false){break;}if(!widget.multiTap){touchObject.count=1;fireWidgetHandler(widget,null,touchObject,action,gesture);}else{if(tapHandler){tapHandler.count++;}else{tapHandler=widget._tapHandler={count:1};}tapHandler.h=window.setTimeout(function(){touchObject.count=tapHandler.count;fireWidgetHandler(widget,null,touchObject,action,gesture);delete widget._tapHandler;},TAP_TIMEOUT);}}else{delete widget._tapHandler;}break;}fireWidgetHandler(widget,EVT_END,touchObject,undefined,gesture);}function attachTouchEvents(widget){var touchNode=widget._tn;if(!touchNode){return ;}if(!widget._tmCallback){widget._tsCallback=function(e){touchesBegin(widget,e);};widget._tmCallback=function(e){touchesMoved(widget,e);};widget._teCallback=function(e){touchesEnd(widget,e);};}$DAE(touchNode,$D.TOUCHSTART,widget._tsCallback);}mstrmojo._TouchGestures=mstrmojo.provide("mstrmojo._TouchGestures",{_mixinName:"mstrmojo._TouchGestures",singleNode:false,multiTouch:false,touchNode:null,multiTap:false,monitorInputs:false,postBuildRendering:function postBuildRendering(){if(this._super){this._super();}this._tn=this.touchNode||this.domNode;this.gestures=[];attachTouchEvents(this);},bubbleTouchEvent:function bubbleTouchEvent(touch){var evtName=touch.methodName,touchId=touch.id,gesture=this.gestures[touchId],p=this.parent;while(p){var targetMethod=p[evtName],touchBegin=p.touchBegin;if(targetMethod&&(!touchBegin||fireWidgetHandler(p,EVT_BEGIN,touch)!==false)){touch.methodName=evtName;deleteBubbleTargetGesture(gesture.bubbleTarget,touchId);gesture.bubbleTarget=p;p.gestures[touchId]=gesture;debugLog("bubble",((this.k)?" "+this.k:"")+"] bubbled "+evtName+" to ["+p.scriptClass+((p.k)?" "+p.k:"")+"]",this,touch);return targetMethod.call(p,touch);}p=p.parent;}return false;},unrender:function unrender(ignoreDom){if(isActive(this)){detachWinEvts(this);}var touchNode=this._tn;if(touchNode){$D.detachEvent(touchNode,$D.TOUCHSTART,this._tsCallback);}this._super(ignoreDom);},restoreDefaultTouches:function restoreDefaultTouches(resetFlag){if($C){$C.allowDefaultTouches=resetFlag&&defaultTouchConfiguration;}}});}());