(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.css","mstrmojo.TextBox");var STR_LOCK=mstrmojo.desc(2970,"Lock"),STR_LIMIT=mstrmojo.desc(527,"Value");mstrmojo.architect.ui.editors.LogicalSizeEditor=mstrmojo.declare(mstrmojo.Box,null,{scriptClass:"mstrmojo.architect.ui.editors.LogicalSizeEditor",inputText:undefined,unLockInactive:false,markupString:'<div class="mstrmojo-ar-lse"><span class="mstrmojo-ar-lse-lock" mstrAttach:keypress></span><span class="mstrmojo-ar-lse-size"></span></div>',markupSlots:{containerNode:function containerNode(){return this.domNode;},lockNode:function lockNode(){return this.domNode.firstChild;},inputNode:function inputNode(){return this.domNode.lastChild;}},init:function init(props){this._super(props);if(this.isLocked||(this.unLockInactive&&this.logicalSize)){this.checkBox.set("checked",true);}else{this.checkBox.set("checked",false);}this.inputText.set("value",this.logicalSize);this.updateInputNode(this.checkBox.checked);},updateInputNode:function updateInputNode(checked){var $this=this;if($this.unLockInactive){if(!checked){$this.inputText.set("value",0);}$this.inputText.set("cssClass",(checked?"active":"inactive"));$this.inputText.set("readOnly",!checked);}},getEditorData:function getEditorData(){var checked=this.checkBox.checked;if(this.unLockInactive){if(checked&&(this.inputText.value===0||this.inputText.value==="0")){this.isLocked=true;}else{this.isLocked=false;}}else{this.isLocked=checked;}return{locked:this.isLocked,size:this.inputText.value};},onkeypress:function onkeypress(evt){var hWin=evt.hWin,e=evt.e||hWin.event,keyCode=e.keyCode;if(keyCode===13){e.preventDefault();}},children:[{scriptClass:"mstrmojo.ImageCheckBox",cssClass:"mstrmojo-ar-lse",alias:"checkBox",slot:"lockNode",checked:false,oncheckedChange:function oncheckedChange(){this._super();this.parent.updateInputNode(this.checked);},label:STR_LOCK},{scriptClass:"mstrmojo.architect.ui.TextBoxWithLabel",label:STR_LIMIT,alias:"inputText",slot:"inputNode",type:"number",size:"5",min:"0",isInt:true,onclick:function(){this.inputNode.select();},onkeyup:function onkeyup(evt){var hWin=evt.hWin,e=evt.e||hWin.event,keyCode=e.keyCode;if(keyCode===110||keyCode===190){this.set("value",this.value.slice(0,-1));}},onkeypress:function onkeypress(evt){var hWin=evt.hWin,e=evt.e||hWin.event,keyCode=e.keyCode;if(keyCode===13&&this.isInt){this.parent.submitData();}},onvalueChange:function onvalueChange(){var lse=this.parent,editor=lse.parent;this.isInt=/^\d+$/.test(this.value);if(lse.unLockInactive){if(editor.buttonBox){editor.buttonBox.okButton.set("enabled",this.isInt);}}else{if(editor){editor.popupConfig.set("okEnabled",this.isInt);}}}}]});}());