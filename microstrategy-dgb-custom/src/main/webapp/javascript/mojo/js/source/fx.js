(function(){mstrmojo.requiresCls("mstrmojo.dom");mstrmojo.fx={enabled:true};var $DOM=mstrmojo.dom;mstrmojo.fx._Effect=mstrmojo.declare(null,null,{scriptClass:"mstrmojo.fx._Effect",duration:500,interval:50,delay:null,target:null,getTarget:null,widget:null,slot:null,preStart:null,postStart:null,onCancel:null,onEnd:null,revertOnCancel:true,isPlaying:false,started:false,init:function init(props){mstrmojo.hash.copy(props,this);},play:function ply(){this.isPlaying=true;this.started=false;if(this.delay){var me=this;this.delayTimer=window.setTimeout(function(){me._start();me=null;},this.delay);}else{this._start();}},pause:function pause(){if(this.delayTimer){window.clearTimeout(this.delayTimer);delete this.delayTimer;}if(this.timer){window.clearInterval(this.timer);delete this.timer;}this.isPlaying=false;},cancel:function cnl(){this.pause();if(this.started){if(this.revertOnCancel){this.counter=0;this.exec();}if(this.onCancel){this.onCancel();}this.started=false;}},_start:function start(){this.started=true;this._doTarget();this.steps=Math.max(Math.ceil(this.duration/this.interval),1);var ea=this.ease;if(typeof ea==="string"){this.ease=mstrmojo.registry.ref(ea);}if(this._doPreStart()===false){this.started=false;this.isPlaying=false;return ;}this.counter=0;this.exec();this.counter++;this._doPostStart();if(this.counter>=this.steps){this._end();}else{var me=this;if(this.timer){window.clearInterval(this.timer);}this.timer=window.setInterval(function fxIntvl(){if(me){me.exec();me.counter++;if(me.counter>=me.steps){me._end();me=null;}}},this.interval);}},exec:null,_end:function end(){this.pause();this.started=false;if(this.onEnd){this.onEnd();}},_doTarget:function tgt(){if(this.getTarget){this.target=this.getTarget();}else{if(this.widget){this.target=this.widget[this.slot||"domNode"];}else{if(this.target){var t=this.target;if(t&&this.slot&&t.scriptClass){var node=t[this.slot];if(node){this.widget=t;this.target=node;}}}}}if(!this.target){var w=this;while(w=w.parent){if(!w||w.domNode){break;}}if(w){this.widget=w;this.target=w[this.slot||"domNode"];}}},_doPreStart:function pre(){if(this.preStart){return this.preStart();}},_doPostStart:function post(){if(this.postStart){this.postStart();}}});function _callChildren(me,fName){var arr=me.children,len=(arr&&arr.length)||0,i;for(i=0;i<len;i++){arr[i][fName]();}}mstrmojo.fx.Parallel=mstrmojo.declare(mstrmojo.fx._Effect,null,{scriptClass:"mstrmojo.fx.Parallel",init:function init(props){this._super(props);var ch=this.children;mstrmojo.registry.refArray(ch);var len=(ch&&ch.length)||0,i;for(i=0;i<len;i++){ch[i].parent=this;}},_start:function start(){this.started=true;if(this.preStart){this.preStart();}_callChildren(this,"play");if(this.postStart){this.postStart();}},pause:function pause(){_callChildren(this,"pause");},cancel:function cnl(){_callChildren(this,"cancel");}});mstrmojo.fx.AnimateProp=mstrmojo.declare(mstrmojo.fx._Effect,null,{scriptClass:"mstrmojo.fx.AnimateProp",props:null,_start:function st(){var ps=this.props,n;for(n in ps){var p=ps[n],ea=p.ease;if(typeof ea==="string"){p.ease=mstrmojo.registry.ref(ea,{dontInst:true});}}this._super();},exec:function exec(){var ps=this.props,n;for(n in ps){var p=ps[n],v=(p.ease||mstrmojo.ease.sin)(this.counter,p.start,p.stop-p.start,this.steps-1);if(p.fn){v=p.fn(v);}if(p.suffix){v+=p.suffix;}var o=p.isStyle===false?this.target:this.target.style;o[n]=v;}}});mstrmojo.fx.Typewriter=mstrmojo.declare(mstrmojo.fx._Effect,null,{scriptClass:"mstrmojo.fx.Typewriter",charGroupSize:1,srcProp:"text",_doPreStart:function(){this._super();this._dynStop=false;if(this.stop==null){var sp=this.srcProp,st;if(sp){var w=this.widget||this.parent;st=w&&w[sp];if((st!=null)&&(typeof (st)!=="string")){st=String(st);}}this.stop=st;this._dynStop=true;}if(this.stop==null){this.stop="";}var t=this.target,ttn=null,cgs=1;if(t){t.innerHTML="";ttn=document.createTextNode("");t.appendChild(ttn);cgs=Math.max(Math.floor(this.stop.length/this.steps),1);}this.targetTextNode=ttn;this.charGroupSize=cgs;},exec:function(){var ttn=this.targetTextNode;if(!ttn){return ;}var v;if(this.counter>=this.steps-1){v=this.stop;}else{if(this.counter===0){v="";}else{v=this.stop.substring(0,this.charGroupSize*this.counter)+"_";}}ttn.nodeValue=v;},_end:function end(){this._super();if(this._dynStop){this.stop=null;delete this._dynStop;}},cancel:function cnl(){if(this._dynStop){this.stop=null;delete this._dynStop;}}});mstrmojo.requiresCls("mstrmojo.dom");mstrmojo.fx.Fade=mstrmojo.declare(mstrmojo.fx._Effect,null,{scriptClass:"mstrmojo.fx.Fade",start:null,stop:null,ease:null,suffix:null,exec:function exec(v){if(v==null){v=(this.ease||mstrmojo.ease.sin)(this.counter,this.start,this.stop-this.start,this.steps-1);}if($DOM.isIE&&!$DOM.isWinPhone){this.target.style.filter="alpha(opacity="+parseInt(v*100,10)+")";}else{this.target.style.opacity=v;}}});mstrmojo.fx.FadeOut=mstrmojo.declare(mstrmojo.fx.Fade,null,{scriptClass:"mstrmojo.fx.FadeOut",start:1,stop:0,revertOnCancel:true,cssDisplay:"block",_end:function end(){if(this.cssDisplay){this.target.style.display="none";this.exec(this.start);}this._super();},cancel:function cnl(){if(this.started&&this.cssDisplay){this.target.style.display=this.cssDisplay;}this._super();}});mstrmojo.fx.FadeIn=mstrmojo.declare(mstrmojo.fx.Fade,null,{scriptClass:"mstrmojo.fx.FadeIn",start:0,stop:1,revertOnCancel:true,cssDisplay:"block",_doPostStart:function postS(){if(this.cssDisplay){this.target.style.display=this.cssDisplay;}this._super();},cancel:function(){if(this.started&&this.revertOnCancel&&this.cssDisplay){this.target.style.display="none";}this._super();}});function fraction(num,dem,digits){var x=Math.pow(10,digits||2);if(dem){return parseInt(x*num/dem,10)/x;}return parseInt(x*num,10)/x;}mstrmojo.ease={linear:function ln(t,b,c,d){if(t===d){return b+c;}if(t===0){return b;}return b+c*fraction(t,d);},sin:function sin(t,b,c,d){return b+c*Math.sin((Math.PI/2)*t/d);},cos:function cos(t,b,c,d){return b+c*Math.cos((Math.PI/2)*(1-t/d));},sincos:function sincos(t,b,c,d){if(t>d/2){return b+c*Math.cos((Math.PI/2)*(1-t/d));}return b+c*Math.sin((Math.PI/2)*t/d);},cossin:function cossin(t,b,c,d){if(t>d/2){return b+c*Math.sin((Math.PI/2)*t/d);}return b+c*Math.cos((Math.PI/2)*(1-t/d));},bounce:function bounce(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b;}if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b;}return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b;},shake:function shake(t,b,c,d){if(t<d/2){return b+c*fraction(Math.sin(2*Math.PI*t/8),null,2)*2*t/d;}return b+c*fraction(Math.sin(2*Math.PI*t/8),null,2)*2*(1-t/d);}};}());