(function(){mstrmojo.requiresCls("mstrmojo.form");mstrmojo.vi.util.NavUtility=mstrmojo.provide("mstrmojo.vi.util.NavUtility",{checkSessionAndSendForm:function(params,action,method,target){var sm=mstrApp.sessionManager;if(sm&&sm.sessionTimedout){sm.openLoginEditor({success:function(){if(target!=="_blank"&&target!=="mstrExportWindow"){mstrApp.showWait();}mstrmojo.form.send(params,action,method,target);}});}else{if(target!=="_blank"&&target!=="mstrExportWindow"&&params.evt!==3198){mstrApp.showWait();}mstrmojo.form.send(params,action,method,target);}}});}());