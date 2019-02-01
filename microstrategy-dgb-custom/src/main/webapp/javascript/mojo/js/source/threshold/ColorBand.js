(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo._HasMarkup","mstrmojo.ui.menus._HasMenuPopup","mstrmojo.dom","mstrmojo.ui.editors.controls.ColorPickerButton","mstrmojo.css");var $CSS=mstrmojo.css,$DOM=mstrmojo.dom;mstrmojo.threshold.ColorBand=mstrmojo.declare(mstrmojo.ui.editors.controls.ColorPickerButton,[mstrmojo.ui.menus._HasMenuPopup],{scriptClass:"mstrmojo.threshold.ColorBand",hovered:false,selected:false,index:undefined,showGradient:false,showNoFill:false,markupString:'<div class = "color-band mstrmojo-ui-PreviewButton {@cssClass}" id="{@id}" style="{@cssText}" mstrAttach:click,keyup,contextmenu,mouseover,mouseout><div class="host mstrmojo-ui-PreviewButton"></div></div>',markupSlots:{previewNode:function(){return this.domNode;},btnNode:function(){return this.domNode;},clickableNode:function(){return this.domNode;},widgetHostNode:function(){return this.domNode.lastChild;}},select:function(){this.set("selected",true);},unselect:function(){this.set("selected",false);},onhoveredChange:function onhoveredChange(v){if(v.valueWas===false&&v.value===true){$CSS.toggleClass(this.domNode,"selected",true);this.parent.onBandHovered(this.index);}else{$CSS.toggleClass(this.domNode,"selected",false);this.parent.onBandUnhovered(this.index);}},onselectedChange:function onselectedChange(v){if(v.valueWas===false&&v.value===true){$CSS.toggleClass(this.domNode,"selected",true);this.parent.onBandSelected(this.index);}else{$CSS.toggleClass(this.domNode,"selected",false);this.parent.onBandUnselected(this.index);}this.parent.onBandUnhovered(this.index);},onmouseover:function onmouseover(){this.set("hovered",true);},onmouseout:function onmouseout(){this.set("hovered",false);},oncontextmenu:function oncontextmenu(evt){$DOM.preventDefault(window,evt.e);var colorBand=this,colorSlider=colorBand.parent.parent;var menuCfg=new mstrmojo.ui.menus.MenuConfig({position:$DOM.getMousePosition(evt.e,evt.hWin),isHostedWithin:false});menuCfg.addMenuItem(mstrmojo.desc(7604,"Change Color"),"",function(){colorBand.onclick(evt);});menuCfg.addMenuItem(mstrmojo.desc(13386,"Add Color Band"),"",function(){var markers=colorSlider.markers;var pos=$DOM.position(markers.containerNode),x=evt.e.clientX-pos.x;markers.addMarker(x);});menuCfg.addMenuItem(mstrmojo.desc(629,"Delete"),"",function(){colorBand.unselect();colorSlider.bands.remove(colorBand.index);colorSlider.update();});this.openPopup(menuCfg.newInstance());},postselectedValueChange:function(v){var slider=this.parent.parent,thresholdEditor=slider.parent,newPalette=slider.getPalette().concat();if(v){var value=v.value;if(slider.getReversedValue()){newPalette.reverse();}this.backgroundColor=newPalette[this.index]=value;thresholdEditor.switchToCustomScheme(undefined,newPalette);}}});mstrmojo._HasMarkup.addMarkupMethods(mstrmojo.threshold.ColorBand,{onwidthChange:mstrmojo.Widget.widthMarkupMethod,onleftChange:mstrmojo.Widget.leftMarkupMethod,onbackgroundColorChange:function onbackgroundColorChange(){this.selectedValue=this.backgroundColor;this.updatePreview();this.colorPicker.set("color",this.selectedValue);}});}());