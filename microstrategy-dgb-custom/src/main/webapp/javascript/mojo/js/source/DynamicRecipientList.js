(function(){mstrmojo.requiresCls("mstrmojo.VBox","mstrmojo.Table","mstrmojo._HasPopup","mstrmojo.HBox","mstrmojo.Label","mstrmojo.DataGrid","mstrmojo.DynamicRecipientListDataService","mstrmojo.DynamicRecipientEditor");var _DS=mstrmojo.DynamicRecipientListDataService,_S=mstrmojo.string,_B=mstrmojo.Button;mstrmojo.DynamicRecipientList=mstrmojo.declare(mstrmojo.Table,[mstrmojo._HasPopup],{scriptClass:"mstrmojo.DynamicRecipientList"});mstrmojo.prefDRL=mstrmojo.insert({scriptClass:"mstrmojo.DynamicRecipientList",id:"prefDRL",zIndex:10,placeholder:"preferenceDRL",cssClass:"mstrmojo-drl mstrPanelPortrait",layout:[{cssClass:"mstrPanelTitleBar",cells:[{}]},{cells:[{}]},{cells:[{}]}],refreshData:function(){var me=this;_DS.getDynamicRecipientLists(null,{success:function(res){me.set("model",(res&&res.ctl)?res.ctl:[{drlName:_S.htmlAngles("<"+mstrmojo.desc(9144)+">")}]);},failure:function(res){}});},postCreate:function(){this.refreshData();},children:[{slot:"0,0",scriptClass:"mstrmojo.HBox",children:[{scriptClass:"mstrmojo.Label",cssClass:"mstrPanelTitle",text:mstrmojo.desc(9079,"Dynamic Address Lists")}]},{slot:"1,0",scriptClass:"mstrmojo.DataGrid",alias:"rlst",bindings:{items:"this.parent.model"},columns:[{headerText:mstrmojo.desc(9080,"Address List Name"),dataField:"n",colCss:"adNm"},{headerText:mstrmojo.desc(5124,"Report Name"),dataField:"cntn",colCss:"rptNm"},{headerText:mstrmojo.desc(2930,"Project Name"),dataField:"pn",colCss:"pjtNm"},{headerText:mstrmojo.desc(3265,"Actions"),colCss:"acts",dataWidget:{scriptClass:"mstrmojo.HBox",children:[{scriptClass:"mstrmojo.Button",cssText:"margin: 0px 3px;text-decoration:underline",text:mstrmojo.desc(1088),onclick:function(){var data=this.parent.data,list=this.parent.dataGrid.parent;_DS.getDynamicRecipientList({did:data.did},{success:function(res){list.openPopup("drlEditorRef",{zIndex:list.zIndex+10,model:res});},failure:function(res){}});}},{scriptClass:"mstrmojo.Label",text:"/"},{scriptClass:"mstrmojo.Button",cssText:"margin: 0px 3px;text-decoration:underline",text:mstrmojo.desc(629),onclick:function(){var data=this.parent.data,list=this.parent.dataGrid.parent,msg=mstrmojo.desc(9240).replace("##",("<b>"+_S.htmlAngles(data.n)+"</b>"));_DS.getDRLRelatedSubscriptions({did:data.did},{success:function(res){if(res.count>0){msg=mstrmojo.desc(14732).replace("##",("<b>"+_S.htmlAngles(res.count)+"</b>")).replace("#","<b>").replace("#","</b>")+"<br>"+msg;}mstrmojo.confirm(msg,{confirmBtn:{fn:function(){_DS.deleteDynamicRecipientList({did:data.did},{success:function(res){list.refreshData();},failure:function(res){}});}}},{allowHTML:true});},failure:function(res){}});}}]}}]},{slot:"2,0",scriptClass:"mstrmojo.Button",cssText:"margin:0px 0px 20px 20px;font-weight:bold;text-decoration:underline",text:mstrmojo.desc(9081,"Add a new Dynamic Address List"),onclick:function(){this.parent.openPopup("drlEditorRef",{zIndex:this.parent.zIndex+10,model:null});}}],drlEditorRef:{scriptClass:"mstrmojo.DynamicRecipientEditor",alias:"drlEditor",locksHover:true,cssText:"width: 650px"}}).render();})();