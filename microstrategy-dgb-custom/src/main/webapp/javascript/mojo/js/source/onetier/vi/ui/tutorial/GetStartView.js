(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.Button","mstrmojo._HasLayout","mstrmojo.onetier.vi.ui.tutorial.GetStartContent","mstrmojo.ui.editors.controls.TwoColumnContainer","mstrmojo.onetier.vi.ui.tutorial.VideoContent","mstrmojo.css");mstrmojo.requiresDescs(14825,13407,14841);var $CSS=mstrmojo.css;mstrmojo.onetier.vi.ui.tutorial.GetStartView=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.onetier.vi.ui.tutorial.GetStartView",markupString:'<div id="{@id}" class="mstrmojo-vi-desktop-welcome {@cssClass}"><div class="vi-desktop-tutorial-header"></div><div><div class="vi-desktop-wel-content"></div><div class="vi-desktop-wel-navigation"></div></div><div class="vi-desktop-tutorial-footer"><label mstrAttach:click>'+mstrmojo.desc(13407,"Don't show this again")+"</label></div></div>",markupSlots:{headerNode:function headerNode(){return this.domNode.firstChild;},boxNode:function boxNode(){return this.domNode.childNodes[1];},contentNode:function contentNode(){return this.domNode.childNodes[1].firstChild;},navigationNode:function navigationNode(){return this.domNode.childNodes[1].childNodes[1];},footerNode:function footerNode(){return this.domNode.childNodes[2];}},markupMethods:{onheightChange:mstrmojo.Widget.heightMarkupMethod,onwidthChange:mstrmojo.Widget.widthMarkupMethod,onshowAtStartupChange:function(){$CSS.toggleClass(this.footerNode,"selected",!this.showAtStartup);}},layoutConfig:{h:{headerNode:"135px",boxNode:"100%",footerNode:"57px"},w:{headerNode:"100%",boxNode:"100%",footerNode:"all"},xt:true},showAtStartup:true,welcomeContent:undefined,samplesData:undefined,init:function(props){var userPreference=mstrApp.getShowVIWelcome();this._super(props);if(userPreference===2){this.set("showAtStartup",false);}else{this.showAtStartup=!!userPreference;}this.content.children[0].helpUrl=mstrApp.helpUrl;},onclick:function onclick(){this.set("showAtStartup",!this.showAtStartup);},children:[{scriptClass:"mstrmojo.Box",slot:"headerNode",children:[{scriptClass:"mstrmojo.Label",cssClass:"vi-desktop-tutorial-mstr",text:mstrmojo.desc(14841,"Welcome to ")},{scriptClass:"mstrmojo.Label",cssClass:"vi-desktop-tutorial-version",text:"10"},{scriptClass:"mstrmojo.Button",cssClass:"vi-desktop-tutorial-new",text:mstrmojo.desc(14825,"Create Dossier"),onclick:function onclick(){mstrApp.logGA&&mstrApp.logGA({evt:"Dossier",action:"New",label:"Blank"});window.FormWrapper.newBlankDashboard();}}]},{scriptClass:"mstrmojo.ui.editors.controls.TwoColumnContainer",slot:"boxNode",alias:"content",col1Width:"68%",dividerWidth:"20px",col2Width:"25%",children:[{scriptClass:"mstrmojo.onetier.vi.ui.tutorial.GetStartContent",slot:"col1Node"},{scriptClass:"mstrmojo.onetier.vi.ui.tutorial.VideoContent",slot:"col2Node"}]}],onshowAtStartupChange:function onshowAtStartupChange(){window.FormWrapper&&window.FormWrapper.setShowWelcome(this.showAtStartup);}});}());