(function(){mstrmojo.requiresCls("mstrmojo.Button","mstrmojo.HTMLButton","mstrmojo.Label","mstrmojo.TextBox","mstrmojo.TextArea","mstrmojo.Table","mstrmojo.HBox","mstrmojo.Editor");function serverRequest(params,callback){var me=this;if(mstrApp&&mstrApp.serverRequest){mstrApp.serverRequest(params,callback,{silent:true});}else{mstrmojo.xhr.request("POST",me.path,callback,params,undefined,me.XServer,me.baseParams);}}function createNewFolder(fid,n,d,cb){var me=this,params={taskId:"createFolder",taskContentType:"json",folderID:fid,name:n,description:d};serverRequest.call(me,params,cb);}function createFolder(name,desc,navigateAfter){if(!name){mstrmojo.alert(mstrmojo.desc(3380));return false;}var me=this,fid=me.fId,cb={success:function(res){me.contPanel.name.set("value","");me.contPanel.desc.set("value","");if(me.okFn){me.okFn(res,navigateAfter);}},failure:function(res){var errorMsg="";if(res.getResponseHeader){errorMsg=res.getResponseHeader("X-MSTR-TaskFailureMsg");}else{if(res.message){errorMsg=res.message;}}errorMsg&&mstrmojo.alert(errorMsg);}};if(mstrApp.isSingleTier&&this.dp){this.dp.newFolder(fid,name,desc,cb);}else{createNewFolder.call(me,fid,name,desc,cb);}}mstrmojo.NewFolderEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.NewFolderEditor",cssClass:"mstrmojo-NewFolderEditor",title:mstrmojo.desc(663,"Create Folder"),help:"Create_a_new_folder.htm",navigateAfter:false,okFn:mstrmojo.emptyFn,path:mstrConfig.taskURL,fId:null,children:[{scriptClass:"mstrmojo.Table",cssClass:"mstrmojo-Input-Panel",rows:2,cols:2,alias:"contPanel",children:[{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-Name-Label",slot:"0,0",text:mstrmojo.desc(2211,"Name:")},{scriptClass:"mstrmojo.TextBox",slot:"0,1",value:mstrmojo.desc(8116,"New Folder"),alias:"name",cssClass:"mstrmojo-SaveAsEditor-nameInput"},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-Desc-Label",slot:"1,0",text:mstrmojo.desc(1154,"Description:")},{scriptClass:"mstrmojo.TextArea",cssClass:"mstrmojo-SaveAsEditor-descInput",slot:"1,1",alias:"desc",rows:5}]},{scriptClass:"mstrmojo.HBox",alias:"btns",slot:"buttonNode",cssClass:"mstrmojo-Editor-buttonBar",children:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton hot",alias:"ok",text:mstrmojo.desc(1442,"OK"),onclick:function(){var e=this.parent.parent,o=e&&e.opener,name=e.contPanel.name.value,desc=e.contPanel.desc.value;if(!createFolder.call(e,name,desc,e.navigateAfter)){e.close();}}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",alias:"cancel",text:mstrmojo.desc(221,"Cancel"),onclick:function(){this.parent.parent.close();}}]}]});}());