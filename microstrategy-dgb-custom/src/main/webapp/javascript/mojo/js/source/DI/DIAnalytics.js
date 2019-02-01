(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.DI.DIConstants","mstrmojo.List","mstrmojo.DI.DITree","mstrmojo.DI.DIGATreeNode","mstrmojo._HasLayout","mstrmojo.Label","mstrmojo.DropDownList","mstrmojo.TextArea","mstrmojo.RadioList","mstrmojo.Widget","mstrmojo.DateTextBox","mstrmojo.DI.DIDateTextBox");mstrmojo.requiresDescs(146,147,1088,1995,12551,12552,12553,12554,12555,12556,12557,12558,12559,12560,12561,12562,12566,12567,12568,12671,12672,12673,12674,12675,13128,13129,13130);var sourceType=mstrmojo.DI.DIConstants.sourceType;var labelCss="mstrmojo-di-ga-label";var dropDownListCss="mstrmojo-di-ga-dropDownList";var acceptedDateInput=["MM/DD/YYYY","today","yesterday"],regDaysAgo=/^\d+daysAgo$/;var seperator="###";var OBJECT_BROWSER_HEIGHT=["308","200","100"];var queryExplorerUrl=mstrmojo.DI.DIConstants.googleAnalyticsUrl.queryExplorer;var $CSS=mstrmojo.css;var $DATE=mstrmojo.date;function setHeight(){var t=this.parent;var count=0,height;if(!this.optionNode){return ;}if(this.optionNode.style.display==="block"){count++;}if(this.dateOptionNode.style.display==="block"){count++;}height=OBJECT_BROWSER_HEIGHT[count];t.browser.domNode.style.height=height+"px";t.textarea.domNode.style.height=(height-10)+"px";t.browser.domNode.parentNode.style.height="";}function expand(node){var isDisplayed=(node.style.display==="none")?false:true;if(!isDisplayed){node.style.display="block";this.set("text",mstrmojo.desc(1995,"Hide"));}else{node.style.display="none";this.set("text",mstrmojo.desc(1088,"Edit"));}setHeight.call(this.parent);}function getParam(query,paramName){var start=query.indexOf(paramName);if(start===-1){return"";}var end=query.indexOf("&",start+paramName.length)===-1?query.length:query.indexOf("&",start+paramName.length);return query.substring(start,end);}function calculateDates(date){var dateStr,localeDateTime=mstrmojo.locales.datetime;if(date.toUpperCase()==="MM/DD/YYYY"){dateStr="YYYY-MM-DD";}else{if(mstrmojo.array.indexOf(acceptedDateInput,date)!==-1||regDaysAgo.test(date)){dateStr=date;}else{var dateObj=$DATE.parseDate(date,false,localeDateTime.DATEOUTPUTFORMAT);if(dateObj.day.toString()!=="NaN"){dateStr=$DATE.formatDateInfo(dateObj,"yyyy-MM-dd");}else{var datePlaceHolder=localeDateTime.DATEOUTPUTFORMAT.toUpperCase();mstrApp.getRootController().displayError(mstrmojo.desc(13128,"Requests can only specify a date formatted as ###, ").replace("###",datePlaceHolder)+mstrmojo.desc(13129,"or as a relative date (e.g., today, yesterday, or NdaysAgo where N is a positive integer). ")+mstrmojo.desc(13130,"Please change your input into any of the aforementioned formats."),false);}}}return dateStr;}function getDateQuery(analytics){var dateQuery="",dateTable=analytics.dateTable;if(dateTable.dates.selectedIndex===0){dateQuery="&start-date="+calculateDates(dateTable.fromDate.value)+"&end-date="+calculateDates(dateTable.toDate.value);}else{if(dateTable.dates.selectedIndex!==0){dateQuery="&dynamic-date={"+dateTable.dates.items[dateTable.dates.selectedIndex].qn+"}";}}return dateQuery;}function generateDefaultQuery(analytics){var dateQuery,query;dateQuery=getDateQuery(analytics);query="ids=ga:"+analytics.selectedProfile.id+"&dimensions=ga:source&metrics=ga:visits&segment=gaid::-11";if(dateQuery){query+=dateQuery;}return query;}mstrmojo.DI.DIAnalytics=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.DI.DIAnalytics",cssClass:"mstrmojo-di-ga",markupString:'<div id="{@id}" class="{@cssClass}" style="{@cssText}"><div class="cf sf-options"></div><div style="display:none;" class="mstrmojo-di-ga-options sf-options"></div><div class="cf sf-options"></div><div style="display:block;"class="mstrmojo-di-ga-options"></div><div class="cf sf-options"></div><div style="display:none;"></div><div></div></div>',markupSlots:{firstNode:function(){return this.domNode.children[0];},optionNode:function(){return this.domNode.children[1];},secondNode:function(){return this.domNode.children[2];},dateOptionNode:function(){return this.domNode.children[3];},thirdNode:function(){return this.domNode.children[4];},listHeaderNode:function(){return this.domNode.children[5];},listNode:function(){return this.domNode.children[6];}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},account:undefined,webproperty:undefined,analyticsList:undefined,ultp:undefined,textarea:undefined,username:undefined,showPrv:undefined,fromDate:undefined,toDate:undefined,expand:false,selectedAccount:undefined,selectedWebProperty:undefined,fixObjectBrowserHeight:function(){setHeight.call(this);},postCreate:function(){this.selectedAccount=null;this.selectedWebProperty=null;},children:[{slot:"firstNode",scriptClass:"mstrmojo.Label",cssClass:labelCss,text:mstrmojo.desc(12549,"Select your Account, Web Property and Profile")},{scriptClass:"mstrmojo.Label",slot:"firstNode",alias:"edit",text:mstrmojo.desc(1088,"Edit"),cssClass:"mstrmojo-di-ga-collapsed",onclick:function(){expand.call(this,this.parent.optionNode);}},{scriptClass:"mstrmojo.Table",alias:"accountTable",slot:"optionNode",rows:1,cols:6,children:[{scriptClass:"mstrmojo.Label",slot:"0,0",cssClass:"mstrmojo-di-ga-account-label",text:mstrmojo.desc(12566,"Account:")},{slot:"0,1",scriptClass:"mstrmojo.ui.Pulldown",cssClass:dropDownListCss,isHostedWithin:false,allowHTML:false,alias:"account",postselectedIndexChange:function(evt){var parent=this.parent.parent,model=parent.model.externalSources[sourceType.googleAnalytics];if(this.selectedIndex===undefined||this.selectedIndex<0){return ;}parent.selectedAccount=model.accounts[this.selectedIndex];mstrApp.getRootController().getAnalyticsWebProperties(model.accounts[this.selectedIndex].id);}},{scriptClass:"mstrmojo.Label",slot:"0,2",cssClass:"mstrmojo-di-ga-webproperty-label",text:mstrmojo.desc(12567,"Web Property:")},{slot:"0,3",scriptClass:"mstrmojo.ui.Pulldown",cssClass:dropDownListCss,isHostedWithin:false,allowHTML:false,alias:"webproperty",postselectedIndexChange:function(evt){var parent=this.parent.parent;if(this.selectedIndex===undefined||this.selectedIndex<0){return ;}parent.selectedWebProperty=parent.selectedAccount.webProperties[this.selectedIndex];mstrApp.getRootController().getAnalyticsProfiles(parent.selectedAccount.id,parent.selectedAccount.webProperties[this.selectedIndex].id);}},{scriptClass:"mstrmojo.Label",slot:"0,4",text:mstrmojo.desc(12568,"Profile:")},{slot:"0,5",scriptClass:"mstrmojo.ui.Pulldown",cssClass:dropDownListCss,isHostedWithin:false,alias:"profiles",postselectedIndexChange:function(evt){var parent=this.parent.parent;if(this.selectedIndex===undefined||this.selectedIndex<0){return ;}if(this.selectedIndex!==-1){parent.selectedProfile=parent.selectedWebProperty.profiles[this.selectedIndex];}}}]},{slot:"secondNode",scriptClass:"mstrmojo.Label",cssClass:labelCss,text:mstrmojo.desc(12550,"Select Date Range: ")},{scriptClass:"mstrmojo.Label",slot:"secondNode",alias:"edit",text:mstrmojo.desc(1995,"Hide"),cssClass:"mstrmojo-di-ga-collapsed",onclick:function(){expand.call(this,this.parent.dateOptionNode);}},{slot:"dateOptionNode",scriptClass:"mstrmojo.Table",alias:"dateTable",rows:1,cols:6,children:[{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-di-ga-date-label",slot:"0,0",text:mstrmojo.desc(12551,"Date Range: ")},{scriptClass:"mstrmojo.ui.Pulldown",slot:"0,1",alias:"dates",cssClass:"di-analytics-pulldown",selectCssClass:"mstrmojo-di-ga-dropDownList-select",items:[{n:mstrmojo.desc(12552,"Custom range"),qn:"Custom range",v:0},{n:mstrmojo.desc(12553,"Last 7 days"),qn:"Last 7 days",v:1},{n:mstrmojo.desc(12554,"This month"),qn:"This month",v:2},{n:mstrmojo.desc(12555,"Last month"),qn:"Last month",v:3},{n:mstrmojo.desc(12556,"Last 3 months"),qn:"Last 3 months",v:4},{n:mstrmojo.desc(12557,"Last 6 months"),qn:"Last 6 months",v:5},{n:mstrmojo.desc(12558,"Last 12 months"),qn:"Last 12 months",v:6},{n:mstrmojo.desc(12559,"This year"),qn:"This year",v:7},{n:mstrmojo.desc(12560,"Last year"),qn:"Last year",v:8}],selectedIndex:3,onSelectedItemChange:function(){switch(this.selectedIndex){case 0:this.parent.fromDate.set("disabled",false);this.parent.toDate.set("disabled",false);$CSS.toggleClass(this.parent.fromDateLabel.domNode,"disabled",false);$CSS.toggleClass(this.parent.toDateLabel.domNode,"disabled",false);break;default:this.parent.fromDate.set("disabled",true);this.parent.toDate.set("disabled",true);this.parent.fromDateLabel.set("disabled",true);this.parent.toDateLabel.set("disabled",true);$CSS.toggleClass(this.parent.fromDateLabel.domNode,"disabled",true);$CSS.toggleClass(this.parent.toDateLabel.domNode,"disabled",true);}}},{scriptClass:"mstrmojo.Label",slot:"0,2",alias:"fromDateLabel",enabled:false,text:mstrmojo.desc(146,"From:")},{scriptClass:"mstrmojo.DI.DIDateTextBox",alias:"fromDate",cssDisplay:"inline-block",cssClass:"mstrmjo-di-DateTextBox fromDate",value:"MM/DD/YYYY",disabled:true,slot:"0,3",bindings:{toDate:function(){return this.parent.toDate.value;}},preBuildRendering:function(){this._super&&this._super();var localeDateTime=mstrmojo.locales.datetime,datePlaceHolder=localeDateTime.DATEOUTPUTFORMAT.toUpperCase();this.set("value",datePlaceHolder);}},{scriptClass:"mstrmojo.Label",slot:"0,4",alias:"toDateLabel",enabled:false,text:mstrmojo.desc(147,"To: ")},{scriptClass:"mstrmojo.DI.DIDateTextBox",alias:"toDate",cssDisplay:"inline-block",cssClass:"mstrmjo-di-DateTextBox toDate",value:"MM/DD/YYYY",disabled:true,slot:"0,5",bindings:{fromDate:function(){return this.parent.fromDate.value;}},preBuildRendering:function(){this._super&&this._super();var localeDateTime=mstrmojo.locales.datetime,datePlaceHolder=localeDateTime.DATEOUTPUTFORMAT.toUpperCase();this.set("value",datePlaceHolder);}}]},{slot:"thirdNode",scriptClass:"mstrmojo.RadioListHoriz",cssClass:"upload-options",itemCssClass:"mstrojo-di-ga-upload-options-item",alias:"ultp",selectedIndex:0,onchange:function(){var controller=mstrApp.getRootController();if(this.selectedIndex===0){if(this.parent.parent.browser.fileTree.selectedItem!==null){controller.sourceSelected(true);}else{controller.sourceSelected(false);}}else{if(this.selectedIndex===1){if(!this.parent.parent.textarea.value||this.parent.parent.textarea.value===""){var query=generateDefaultQuery.call(this,this.parent);this.parent.parent.textarea.set("value",query);this.parent.parent.textarea.domNode.style.display="block";this.parent.parent.textarea.domNode.focus();}controller.sourceSelected(true);}}},postBuildRendering:function(){if(this._super){this._super();}var controller=mstrApp.getRootController();var model=controller.model;var url=null,address=null,idx;var source=null;var me=this;if(this.parent.tableID){source=model.getImportSource(this.parent.tableID);}if(this.parent.currentSource){source=this.parent.currentSource;}if(source&&source.sourceInfo){url=source.sourceInfo.dbTableName;address=source.sourceInfo.url.substr("SQL=".length);idx=address.indexOf(seperator);if(idx>-1){address=address.substr(0,idx);}if(url.indexOf("CustomQuery")>-1||url.indexOf("Google Analytics Query")>-1||source.sourceInfo.url.indexOf("folderName:")<0){address=mstrmojo.string.decodeHtmlString(address);this.parent.parent.textarea.set("value",address);this.set("selectedIndex",1);window.setTimeout(function(){me.parent.parent.textarea.domNode.focus();},0);}else{mstrApp.getRootController().sourceSelected(false);}}else{mstrApp.getRootController().sourceSelected(false);}},items:[{did:"0",n:mstrmojo.desc(12561,"Pick a report")},{did:"1",n:mstrmojo.desc(12562,"Write your own query")}]},{slot:"thirdNode",scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-di-ga-label link",text:mstrmojo.desc(12674,"Update Query"),onclick:function(){var widget=this.parent.parent,query=widget.textarea.value,scrollTop=widget.domNode.scrollTop;var queryAccountNumber=getParam(query,"ids=ga:");var newAccountNumber="ids=ga:"+widget.analyticsComponent.selectedProfile.id.toString();var queryDateRange=query.indexOf("&dynamic-date={")!==-1?getParam(query,"&dynamic-date={"):getParam(query,"&start-date=")+getParam(query,"&end-date=");var newDateRange=getDateQuery(widget.analyticsComponent);var start,end;widget.textarea.domNode.blur();if(queryAccountNumber!==newAccountNumber){query=newAccountNumber+query.substr(query.indexOf("&"));widget.textarea.set("value",query);}if(queryDateRange!==newDateRange&&newDateRange!==""){if(query.indexOf("&dynamic-date={")!==-1){start=query.indexOf(queryDateRange);query=query.substring(0,start)+newDateRange+query.substr(start+queryDateRange.length);}else{if(query.indexOf("&start-date=")!==-1){start=query.indexOf("&start-date=");end=query.indexOf("&",start+"&start-date=".length)===-1?query.length:query.indexOf("&",start+"&start-date=".length);query=query.substring(0,start)+query.substr(end);}if(query.indexOf("&end-date=")!==-1){start=query.indexOf("&end-date=");end=query.indexOf("&",start+"&end-date=".length)===-1?query.length:query.indexOf("&",start+"&end-date=".length);query=query.substring(0,start)+query.substr(end);}query=query.trim()+newDateRange;}widget.textarea.set("value",query);}widget.textarea.domNode.focus();widget.domNode.scrollTop=scrollTop;},bindings:{visible:function(){return this.parent.ultp.selectedIndex===1;}}},{slot:"thirdNode",scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-di-ga-label link",text:mstrmojo.desc(12675,"Help: Query Explorer"),onclick:function(){if(mstrApp.isSingleTier){window.FormWrapper.openPage(queryExplorerUrl);}else{mstrApp.openPage(queryExplorerUrl);}},bindings:{visible:function(){return this.parent.ultp.selectedIndex===1;}}}]});}());