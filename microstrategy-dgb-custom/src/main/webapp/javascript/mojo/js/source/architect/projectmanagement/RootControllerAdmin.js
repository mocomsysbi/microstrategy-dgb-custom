(function(){mstrmojo.requiresCls("mstrmojo.Button","mstrmojo.HTMLButton","mstrmojo.architect.projectmanagement.ProjectNameInput","mstrmojo.architect.ArchitectDataService");function submitRequest(callback,params,fn){mstrApp.getRootController().getDataService()[fn||"submitRequest"](callback,params);}function newButton(title,fn,iconClass){return mstrmojo.Button.newInteractiveButton(title,fn,null,{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",iconClass:iconClass});}mstrmojo.architect.projectmanagement.RootControllerAdmin=mstrmojo.declare(mstrmojo.warehouse.WHController,null,{dataService:undefined,start:function start(){this.dataService=new mstrmojo.architect.ArchitectDataService();this.toolbar.render();this.rootView.render();},getDataService:function getDataService(){if(!this.dataService){this.dataService=new mstrmojo.architect.ArchitectDataService();}return this.dataService;},getProjects:function getProjects(params,callback){params.skipSchemaIDCheck=true;params.dataFlag=1+2+4+8;params.server=mstrApp.serverName;this.model.getProjects(params,callback);},createProject:function createProject(){var $this=this;this.showProjectNameInput({title:mstrmojo.desc(6969,"new project"),projects:mstrApp.getRootController().rootView.projects,isNew:true,callback:{success:function success(){$this.rootView.populateProjects(1500);}},onOK:function onOK(info){submitRequest(this.callback,{name:info.name,desc:info.desc,skipSchemaIDCheck:true},"createProject");},onCancel:mstrmojo.emptyFn()});},deleteProject:function deleteProject(projectinfo){var $this=this;mstrmojo.confirm(mstrmojo.desc(6722,"are you sure?").replace("##",projectinfo.name),null,{buttons:[newButton(mstrmojo.desc(219,"yes"),function yes(){submitRequest({complete:function complete(){$this.rootView.populateProjects(1500);}},{projectid:projectinfo.id,skipSchemaIDCheck:true},"deleteProject");},"mstrmojo-Editor-button-Yes"),newButton(mstrmojo.desc(218,"no"),null,"mstrmojo-Editor-button-No")],title:mstrmojo.desc(3169,"Confirm Delete")});},renameProject:function renameProject(projectinfo){var $this=this,info={title:mstrmojo.desc(3371,"rename").replace("##",mstrmojo.desc(11,"project")).replace(":",""),projects:mstrApp.getRootController().rootView.projects,pname:projectinfo.name,pid:projectinfo.id,callback:{success:function success(){$this.rootView.populateProjects(1500);}},onOK:function onOK(pname){submitRequest(this.callback,{objectid:this.pid,objecttype:32,objectname:pname.name,skipSchemaIDCheck:true},"renameObject");},onCancel:mstrmojo.emptyFn()};mstrApp.getRootController().showProjectNameInput(info);},showProjectNameInput:function showProjectNameInput(info){var id="aaProjectNameInput",e=mstrmojo.all[id];if(!e){e=mstrmojo.insert({scriptClass:"mstrmojo.architect.projectmanagement.ProjectNameInput",id:id,model:new mstrmojo.Model()});}e.set("info",info);e.open();},cleanError:function cleanError(msg){msg=msg.replace("com.microstrategy.webapi.MSTRWebAPIException:","");msg=msg.replace("Internal Error:","");return mstrmojo.string.trim(msg);},validateName:function validateName(type,newName,oldName,list){return this.model.validateName(type,newName,oldName,list);}});}());