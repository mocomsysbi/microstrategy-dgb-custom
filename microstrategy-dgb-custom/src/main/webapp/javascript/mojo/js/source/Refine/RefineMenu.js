(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.Refine.RefineHelpers","mstrmojo.Refine.RefineConstants");mstrmojo.requiresDescs(1388,629,14539,14540);var constants=mstrmojo.Refine.RefineConstants;var RefineHelpers=mstrmojo.Refine.RefineHelpers;var menuItems=constants.menuItems;var $A=mstrmojo.array;mstrmojo.Refine.RefineMenu=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.Refine.RefineMenu",dynamicUpdate:true,type:null,cm:[{n:mstrmojo.desc(1388,"Rename"),did:menuItems.REFINE_RENAME},{did:menuItems.SEPARATOR},{n:mstrmojo.desc(12575,"Delete Column"),did:menuItems.REFINE_DELETE},{n:mstrmojo.desc(14274,"Duplicate Column"),did:menuItems.REFINE_DUPLICATE},{did:menuItems.SEPARATOR},{n:mstrmojo.desc(12341,"Fill Down"),did:menuItems.REFINE_FILL_DOWN},{did:menuItems.SEPARATOR},{n:mstrmojo.desc(14539,"Text Selector"),did:menuItems.REFINE_TEXT_FACET},{n:mstrmojo.desc(14540,"Numeric Selector"),did:menuItems.REFINE_NUMERIC_FACET},{did:menuItems.SEPARATOR},{n:mstrmojo.desc(14268,"To Title Case"),did:menuItems.REFINE_TITLE_CASE},{n:mstrmojo.desc(14269,"To Uppercase"),did:menuItems.REFINE_UPPERCASE},{n:mstrmojo.desc(14270,"To Lowercase"),did:menuItems.REFINE_LOWERCASE}],queryEnabled:function queryEnabled(){return true;},queryVisible:function queryVisible(item){var visible=true;switch(item.did){case menuItems.REFINE_TEXT_FACET:case menuItems.REFINE_NUMERIC_FACET:visible=!mstrApp.getRootController().refineApp.isBDE;break;default:visible=true;break;}return visible;},queryChecked:function queryChecked(){return false;},executeCommand:function(item){var config={},type;var operations,operation,columnName=this.target.text;var controller=this.target.preview.controller;var model=controller.model;var curColumns=model.columns.columns;var params;switch(item.did){case menuItems.REFINE_RENAME:this.target.inlineEdit.ondblclick();break;case menuItems.REFINE_DELETE:this.target.inlineEdit.handleDelete();break;case menuItems.REFINE_DUPLICATE:operations=[];var newColumnName,targetColumn,unique,i=1,j;var columns=this.target.preview.columns;while(true){newColumnName=columnName+" "+i;unique=true;for(j=0;j<columns.length;j++){if(newColumnName===(columns[j]).name){unique=false;break;}}i++;if(unique){targetColumn=newColumnName;break;}}operation=JSON.parse(JSON.stringify(model.transformations.Other.duplicate));operation.description=operation.description.replace("[new column name]",targetColumn);operation.description=operation.description.replace("[column name]",columnName);operation.columnInsertIndex=this.target.columnIndex+1;operation.newColumnName=operation.newColumnName.replace("[column name]",targetColumn);operation.baseColumnName=operation.baseColumnName.replace("[column name]",columnName);operation.engineConfig=JSON.parse(model.engine);operations.push(operation);controller.applyOperations({operations:JSON.stringify(operations),engine:JSON.stringify({facets:[],mode:"row-based"})});break;case menuItems.REFINE_FILL_DOWN:operations=[];operation=JSON.parse(JSON.stringify(model.transformations.TransformCell.fillDown));operation.columnName=columnName;operation.description=operation.description.replace("[column name]",columnName);operation.engineConfig=JSON.parse(model.engine);operations.push(operation);params={operations:JSON.stringify(operations),engine:JSON.stringify({facets:[],mode:"row-based"})};if(model.hasAddSample()){RefineHelpers.confirmFilldownOrBlankdown(function(){controller.applyOperations(params);});}else{controller.applyOperations(params);}break;case menuItems.REFINE_TEXT_FACET:config.name=this.target.text;config.columnName=this.target.text;config.columnIndex=this.target.columnIndex;if(curColumns[this.target.columnIndex]===undefined){config.originalName=null;}else{config.originalName=curColumns[this.target.columnIndex].originalName;}type="list";config.expression="value";this.target.preview.controller.addFacets(type,config);break;case menuItems.REFINE_NUMERIC_FACET:config.name=this.target.text;config.columnName=this.target.text;if(curColumns[this.target.columnIndex]===undefined){config.originalName=null;}else{config.originalName=curColumns[this.target.columnIndex].originalName;}type="range";config.expression="value";config.mode="range";this.target.preview.controller.addFacets(type,config);break;case menuItems.REFINE_TITLE_CASE:operations=[];operation=JSON.parse(JSON.stringify(model.transformations.TransformCell.titlecase));operation.columnName=columnName;operation.description=operation.description.replace("[column name]",columnName);operation.engineConfig=JSON.parse(model.engine);operations.push(operation);controller.applyOperations({operations:JSON.stringify(operations),engine:JSON.stringify({facets:[],mode:"row-based"})});break;case menuItems.REFINE_UPPERCASE:operations=[];operation=JSON.parse(JSON.stringify(model.transformations.TransformCell.uppercase));operation.columnName=columnName;operation.description=operation.description.replace("[column name]",columnName);operation.engineConfig=JSON.parse(model.engine);operations.push(operation);controller.applyOperations({operations:JSON.stringify(operations),engine:JSON.stringify({facets:[],mode:"row-based"})});break;case menuItems.REFINE_LOWERCASE:operations=[];operation=JSON.parse(JSON.stringify(model.transformations.TransformCell.lowercase));operation.columnName=columnName;operation.description=operation.description.replace("[column name]",columnName);operation.engineConfig=JSON.parse(model.engine);operations.push(operation);controller.applyOperations({operations:JSON.stringify(operations),engine:JSON.stringify({facets:[],mode:"row-based"})});break;default:return false;}return true;},getMenuConfig:function getMenuConfig(menuItems){var menuCfg=new mstrmojo.ui.menus.MenuConfig({menuCssClass:"mstrmojo-di-mapping-menu",useTooltip:true}),id=this.id,isSeparator,isSeparatorPending=false,firstNonSepItem=null,allAvailableMenuItems=menuItems||this.cm;$A.forEach(allAvailableMenuItems,function(menuItem){isSeparator=(menuItem.did===constants.menuItems.SEPARATOR);if(this.queryVisible(menuItem)){if(isSeparator){if(null!==firstNonSepItem){isSeparatorPending=true;}}else{if(null===firstNonSepItem){firstNonSepItem=menuItem;}else{if(isSeparatorPending){menuCfg.addSeparator();isSeparatorPending=false;}}var cssClasses=[menuItem.icn||""],execFn=function execFn(){this.executeCommand(menuItem);};if(this.queryEnabled(menuItem)===false){menuCfg.addDisabledMenuItem(menuItem.n,cssClasses.join(" "));if(menuItem.title){menuCfg.menus[menuCfg.menus.length-1].title=menuItem.title;}}else{if(menuItem.items){menuCfg.addSubMenuItem(menuItem.n,"",id,menuItem.buildSubMenuConfig||this.getMenuConfig,menuItem.items);}else{if(menuItem.hasEdt){menuCfg.addEditorMenuItem(menuItem.n,id,menuItem.buildSubMenuConfig);}else{menuCfg.addToggleMenuItem(menuItem.n||"",cssClasses.join(" "),execFn,execFn,id,this.queryChecked(menuItem));}}}}}},this);return menuCfg;}});}());