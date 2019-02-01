(function(){mstrmojo.requiresCls("mstrmojo.SaveAsEditor","mstrmojo.DI.DIConstants");mstrmojo.requiresDescs(1442,12376,12377,12908);var $ARR=mstrmojo.array,constants=mstrmojo.DI.DIConstants,$DESC=mstrmojo.desc;var ERR_OK=0,ERR_INVALID_NAME=-1,ERR_EXISTING_NAME=-2;mstrmojo.DI.ui.dialogs.DISaveAsDialog=mstrmojo.declare(mstrmojo.SaveAsEditor,null,{scriptClass:"mstrmojo.DI.ui.dialogs.DISaveAsDialog",cssClass:"mstrmojo-SaveAsEditor",typeDesc:"Cube",browsableTypes:"776,779,8",zIndex:1000,folderLinksContextId:28,onRender:function onRender(){this.ob.set("scrollableIncFetch",true);},validateInput:function(overwrite,callback){var controller=mstrApp.getRootController(),panel=this.contPanel,currentFolder=this.ob.currentFolder,currentName=panel.name.value,me=this,result=ERR_OK,params;this.name=panel.name.value;this.desc=panel.desc.value;this.folderID=currentFolder.did;this.saveAsOverwrite=!!overwrite;if(!this.name||constants.invalidObjectNameCharsRegex.test(this.name)){result=ERR_INVALID_NAME;callback(result);return ;}$ARR.forEach(currentFolder.items,function(item){if(item.t===3&&item.n.toUpperCase()===currentName.toUpperCase()){result=ERR_EXISTING_NAME;return false;}});if(result!==ERR_OK){callback(result);return ;}params={rootFolderID:currentFolder.did,searchPattern:currentName,objectType:me.browsableTypes,nameWildcards:0};if(this.ob.enableQuickSearch){params.quickSearch=this.ob.enableQuickSearch;}controller.dataService.searchFolderContents({success:function(res){if(res&&res.items){$ARR.forEach(res.items,function(item){if(item.t===3&&item.n.toUpperCase()===currentName.toUpperCase()){result=ERR_EXISTING_NAME;return false;}});}callback(result);},failure:function(res){controller.displayError(mstrmojo.desc(13071,"Error in saving the cube."),false,res.message);}},params);},saveCube:function saveCube(){var controller=mstrApp.getRootController(),model=controller.getModel();var params=this.saveParams||{};params.folderID=this.folderID;params.objDesc=this.desc||"";params.objName=this.name||"";params.saveAsOverwrite=this.saveAsOverwrite;var cb=this.saveAsCallback();cb.parent=this;var showProgress=model.isDirectDataAccess?true:false;mstrApp.serverRequest(params,cb,{showProgress:showProgress});this.close();var i,items=[],tables=model.importSources;for(i in tables){var name=tables[i].sourceInfo.name;tables[i].status="0";items.push({n:name,complete:false});}model.cubeName=this.name||"";if(!model.isDirectDataAccess){model.raiseEvent({name:"PublishStatusUpdate"});controller.showDialog(constants.dialogType.publishStatusDialog,{model:model,zIndex:mstrApp.getRootController().dialogController.getNextZIndex()});}controller.enableFinishButton(false);},saveAs:function(overwrite){var me=this;this.validateInput(overwrite,function(result){switch(result){case ERR_OK:me.saveCube();break;case ERR_INVALID_NAME:mstrmojo.alert($DESC(12376,"Please enter a valid cube name"));break;case ERR_EXISTING_NAME:var title=$DESC(12377,"Saving cube with the same name");mstrmojo.warn(mstrmojo.desc(12908,"The name #### already exists. Do you want to replace the existing one?").replace("####",this.name),{confirmBtn:{t:mstrmojo.desc(1442,"OK"),fn:function(){me.saveCube();},hot:true},cancelBtn:{t:mstrmojo.desc(221,"Cancel")}},{title:title});break;}});},close:function(){if(this._super){this._super();}},getObjectPath:function getObjectPath(){var folder=this.ob.currentFolder,objName=this.name,sep="\\",path="",items;if(folder){items=folder.anc&&folder.anc.items;while(items[0].n!==folder.n&&items[0].n!=="Shared Reports"&&items[0].n!=="My Reports"){items=items[0].items;}while(items){path=path+items[0].n+sep;items=items[0].items;}}path+=objName;return path;},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}this.buttonBox.cancel.onclick=function(){var rootController=mstrApp.getRootController(),model=rootController.getModel&&rootController.getModel()||rootController.model;if(model.isDirectDataAccessBeforeSave!==undefined&&model.isDirectDataAccess!==model.isDirectDataAccessBeforeSave){model.set("isDirectDataAccess",model.isDirectDataAccessBeforeSave);}this.parent.parent.close();};},});}());