(function(){mstrmojo.requiresCls("mstrmojo.Stepper","mstrmojo._TouchGestures");mstrmojo.ui.MobileStepper=mstrmojo.declare(mstrmojo.Stepper,[mstrmojo._TouchGestures],{scriptClass:"mstrmojo.ui.MobileStepper",onclick:function onclick(evt){if(!mstrApp.isTouchApp()){this._super(evt);}return false;},onmousedown:function onmousedown(evt){if(!mstrApp.isTouchApp()){this._super(evt);}return false;},onmouseup:function onmouseup(evt){if(!mstrApp.isTouchApp()){this._super(evt);}return false;},touchSelectBegin:function touchSelectBegin(touch){this.startStepperInterval(touch,"touchTap");},touchSelectEnd:function touchSelectEnd(touch){this.stopStepperInterval();},touchTap:function touchTap(touch){this.processEvent(touch.target);},touchBegin:function touchBegin(touch){var dom=touch.target;if(dom===this.nextNode||dom===this.prevNode){mstrmojo.css.addClass(dom,"glow");}},touchEnd:function touchEnd(touch){var dom=touch.target;if(dom===this.nextNode||dom===this.prevNode){mstrmojo.css.removeClass(dom,"glow");}}});mstrmojo.ui.MobileStepper.prototype.markupString=mstrmojo.ui.MobileStepper.prototype.markupString.replace(",mousedown,mouseup","");}());