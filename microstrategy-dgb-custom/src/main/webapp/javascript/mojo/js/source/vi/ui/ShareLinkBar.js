(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.Box","mstrmojo.Label","mstrmojo.Button","mstrmojo.Widget","mstrmojo.vi.controllers.EnumEvents","mstrmojo.util.LibraryHelper");mstrmojo.requiresDescs(2102,15334,15417);var $DOM=mstrmojo.dom;var EVENTS=mstrmojo.vi.controllers.EnumEvents;var $LIB_HELPER=mstrmojo.util.LibraryHelper;var SHARE_LINKBAR_VISIBLE="mstr-vi-sharelinkbar-visible",MAX_CLOSED_TIMES=5;function _checkForDisableShareLinkBar(){return window.mstrConfig&&!!mstrConfig.disableShareLinkBar;}function getUserName(){var pathbar=mstrApp.getRootController().view.pathbar;return pathbar&&pathbar.pathExtraLinks?pathbar.pathExtraLinks.userName:"";}mstrmojo.vi.ui.ShareLinkBar=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.vi.ui.ShareLinkBar",markupString:'<div id="{@id}" class="mstrmojo-ShareLinkBar {@cssClass}" style="{@cssText}"><div class="indicate-content"></div><div class="button-panel"></div></div>',markupSlots:{contentNode:function(){return this.domNode.firstChild;},buttonNode:function(){return this.domNode.lastChild;}},markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod},docId:"",libraryDocUrl:"",init:function init(props){this._super(props);},children:[{scriptClass:"mstrmojo.Box",slot:"contentNode",alias:"content",cssClass:"share-link-bar-content",children:[{scriptClass:"mstrmojo.Label",cssClass:"share-link-bar-content-text",text:mstrmojo.desc(15568,"Experience the new MicroStrategy Library.  Share your dossier and take advantage of new collaboration tools.")}]},{scriptClass:"mstrmojo.Box",slot:"buttonNode",alias:"buttonBox",cssClass:"share-link-bar-button-box",children:[{scriptClass:"mstrmojo.Button",alias:"launchBtn",title:mstrmojo.desc(15334,"Launch"),cssClass:"share-link-bar-launch-button",text:mstrmojo.desc(15334,"Launch"),onclick:function onclick(){var linkBar=this.parent.parent;$LIB_HELPER.createTokenAndOpenLink(linkBar.libraryDocUrl);}},{scriptClass:"mstrmojo.Button",alias:"closeBtn",title:mstrmojo.desc(2102,"Close"),cssClass:"share-link-bar-close-button",onclick:function onclick(){var wls=window.localStorage;var userName=getUserName();var docId=this.parent.parent.docId;var visibleSet=JSON.parse(wls.getItem(SHARE_LINKBAR_VISIBLE))||(new Object());var userVisibleSet=visibleSet[userName]||(new Object());if(Object.keys(userVisibleSet).length<MAX_CLOSED_TIMES){userVisibleSet[docId]=true;visibleSet[userName]=userVisibleSet;wls.setItem(SHARE_LINKBAR_VISIBLE,JSON.stringify(visibleSet));}this.parent.parent.set("visible",false);mstrApp.getRootController().view.raiseEvent({name:EVENTS.DO_LAYOUT});}},]}],setDocId:function setObjectId(docId){this.docId=docId;},showLinkBar:function showLinkBar(isNew){var wls=window.localStorage;var userName=getUserName();var docId=this.docId;var visibleSet=JSON.parse(wls.getItem(SHARE_LINKBAR_VISIBLE));var userVisibleSet=visibleSet&&visibleSet[userName];var closed=userVisibleSet&&userVisibleSet[docId];var userClosedMaxTimes=userVisibleSet&&(Object.keys(userVisibleSet).length>=MAX_CLOSED_TIMES);var isVisible=!_checkForDisableShareLinkBar()&&$LIB_HELPER.isLibraryConfigured()&&!closed&&!isNew&&!mstrApp.isWorkstation&&!userClosedMaxTimes;if(isVisible){this.libraryDocUrl=$LIB_HELPER.constructLibraryUrl(docId);}this.set("visible",isVisible);}});}());