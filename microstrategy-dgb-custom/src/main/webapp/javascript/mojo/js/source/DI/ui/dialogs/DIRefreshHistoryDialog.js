(function(){mstrmojo.requiresCls("mstrmojo.Editor","mstrmojo.Label","mstrmojo.Button","mstrmojo.DataGrid","mstrmojo.locales","mstrmojo.date","mstrmojo.string");mstrmojo.requiresDescs(96,187,1442,9620,10216,10290,11119,12907);mstrmojo.DI.ui.dialogs.DIRefreshHistoryDialog=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.DI.ui.dialogs.DIRefreshHistoryDialog",cssClass:"mstrmojo-di-refreshHistory",title:mstrmojo.desc(10216,"Refresh History"),zIndex:999,subsStatus:[],onOK:mstrmojo.emptyFn,onOpen:function(){this.grid.set("items",this.subsStatus||[]);this.set("detailMsg","");this.grid.set("selectedIndex",-1);this.grid.set("selectedIndex",0);},children:[{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-di-refreshHistory-title",text:mstrmojo.desc(12907,"Status for the last 5 scheduled refreshes:")},{alias:"grid",scriptClass:"mstrmojo.DataGrid",cssClass:"mstrmojo-di-refreshHistory-grid",onchange:function(){var msg="";var idx=this.selectedIndex;if(idx>=0&&this.items.length>0){msg=this.items[idx].en!==0?this.items[idx].emsg:mstrmojo.desc(11119,"The scheduled data refresh was successful.");}this.parent.set("detailMsg",msg);},columns:[{headerText:mstrmojo.desc(9620,"Timestamp"),headerCss:"grid-header timestamp",dataWidget:{scriptClass:"mstrmojo.Label",bindings:{text:function(){var $D=mstrmojo.date;var $L=mstrmojo.locales;var dateJson=$D.getDateJson(this.data.timestamp);var dateStr=$D.formatDateInfo(dateJson,$L.datetime.DATEDISPLAYFORMAT);var timeStr=$D.formatTimeInfo(dateJson,$L.datetime.TIMEDISPLAYFORMAT);return dateStr+" "+timeStr;},cssClass:function(){var cls="grid-col timestamp ";if(this.data.en!==0){cls+="error";}return cls;}}}},{headerText:mstrmojo.desc(187,"Status"),headerCss:"grid-header status",dataWidget:{scriptClass:"mstrmojo.Label",bindings:{cssClass:function(){var cls="grid-col status ";if(this.data.en!==0){cls+="error";}return cls;}}}}]},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-di-refreshHistory-detail",bindings:{text:"this.parent.detailMsg"}},{slot:"buttonNode",scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton",text:mstrmojo.desc(1442,"OK"),onclick:function(){var dialog=this.parent;if(typeof dialog.onOK==="function"){dialog.onOK();}dialog.close();}}]});}());