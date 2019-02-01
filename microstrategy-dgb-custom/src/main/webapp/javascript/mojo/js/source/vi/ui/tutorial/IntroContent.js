(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.Label","mstrmojo.Button","mstrmojo.vi.ui.tutorial.WistiaVideoPlayer","mstrmojo.css","mstrmojo.func");var $CSS=mstrmojo.css,noInternetStr=mstrmojo.desc(14130,"You need internet connectivity to play this introductory video about MicroStrategy Desktop. You can configure an internet proxy through your computer's {settings}.").replace("{",'<span class="dyn-link">').replace("}","</span>");mstrmojo.vi.ui.tutorial.IntroContent=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.vi.ui.tutorial.IntroContent",markupString:'<div id="{@id}" class="mstrmojo-tutorial-introcontent {@cssClass}" style="{@cssText}"><div class="intro-info"><div class="intro-title"></div><div class="intro-desc">{@descStr}</div></div><div class="intro-video"></div></div>',markupSlots:{infoNode:function(){return this.domNode.firstChild;},videoNode:function(){return this.domNode.children[1];}},markupMethods:{onhasInternetChange:function onhasInternetChange(){var hasInternet=this.hasInternet;$CSS.toggleClass(this.domNode,"no-internet",!hasInternet);this.messageLabel.set("visible",!hasInternet);}},descStr:"",hasInternet:true,children:[{scriptClass:"mstrmojo.Label",slot:"infoNode",text:'<span class="dyn-link">'+mstrmojo.desc(13802,"See Video Tutorials")+"</span>",cssClass:"dyn-link",allowHTML:true,onclick:function onclick(){var url="https://www.youtube.com/playlist?list=PLu4_Ge2aZ8ooSOcYH8otxT-ZaW_TRd4Vf";mstrApp.openPage(url);}},mstrmojo.Button.newWebButton("Get Started",function(){if(mstrApp.isSingleTier){window.FormWrapper.skipWelcome();}else{var welcomeEditor=mstrmojo.all.mstrVIWelcome;if(welcomeEditor){welcomeEditor.close();}}},true,{slot:"infoNode"}),{scriptClass:"mstrmojo.vi.ui.tutorial.WistiaVideoPlayer",slot:"videoNode",videoID:"kt8e15unst",alias:"video"},{scriptClass:"mstrmojo.Label",slot:"videoNode",alias:"messageLabel",text:noInternetStr,cssClass:"video-mask",allowHTML:true,onclick:function onclick(evt){if(evt.getTarget()===this.domNode.getElementsByClassName("dyn-link")[0]&&mstrApp.isSingleTier){window.FormWrapper.showProxyEditor();}}}],init:function init(props){this._super(props);if(mstrApp.isSingleTier){this.descStr=mstrmojo.desc(14131,"MicroStrategy Desktop is for anyone who wants to visualize and analyze data in a few simple steps. You can now connect to any data source and even enrich your data to begin your analysis. With simple drag and drop interfaces, create interactive visualizations and discover intriguing insights, and share with your colleagues.");}else{this.descStr=mstrmojo.desc(15514,"Get started with dossiers to visualize and analyze data in a few simple steps. You can now connect to any data source and even enrich your data to begin your analysis. With simple drag and drop interfaces, create interactive visualizations and discover intriguing insights, and share with your colleagues on web and mobile.");}},postBuildRendering:function postBuildRendering(){if(mstrApp.isSingleTier){window.onload=mstrmojo.func.composite([window.onload||mstrmojo.emptyFn,function(){if(window.FormWrapper.testInternetConnection()!==0){this.set("hasInternet",false);}}.bind(this)]);}return this._super();}});}());