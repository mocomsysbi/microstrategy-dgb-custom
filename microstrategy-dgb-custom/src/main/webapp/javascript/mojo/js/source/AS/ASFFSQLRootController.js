(function(){mstrmojo.requiresCls("mstrmojo.DI.DIConstants");var $DI_CONSTANTS=mstrmojo.DI.DIConstants;mstrmojo.AS.ASFFSQLRootController=mstrmojo.provide("mstrmojo.AS.ASFFSQLRootController",{onFinishButtonClick:function onFinishButtonClick(result){if(window.mstrAppSchema){window.mstrAppSchema.callbacks.freeformSQLCallback(result);}mstrApp.getRootController().exitApplication();},autoMapFFSQL:function autoMapFFSQL(formData){var controller=mstrApp.getRootController(),model=controller.model;var param={path:"/ffsql/results",form:JSON.stringify(formData),method:"POST"};var callback={success:function(res){try{var data=res.body;if(res.httpStatus===500&&data.message){mstrmojo.alert(data.message);return ;}model.mappings=[];for(var rowIdx=0;rowIdx<data.rows.length;rowIdx++){for(var colIdx=0;colIdx<data.rows[rowIdx].length;colIdx++){if(data.rows[rowIdx][colIdx]===null){data.rows[rowIdx][colIdx]="";}}}model.dataset=data.rows;data.headers.forEach(function(header){model.mappings.push({n:header.name,ix:header.index,dtp:$DI_CONSTANTS.columnDataTypes[header.datatype]});});model.raiseEvent({name:"dataPreview",mappings:model.mappings,dataset:model.dataset,selectedColumns:model.selectedClns,isRefined:model.isRefined});}catch(e){mstrmojo.alert("Error! Data from spark is unexpected.");}}};controller.dataService.archSpark(callback,param,{showCancel:true});}});}());