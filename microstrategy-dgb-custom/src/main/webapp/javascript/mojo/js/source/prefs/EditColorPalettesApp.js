(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo._IsWebApp","mstrmojo.prefs.ColorPalettesEditor");mstrmojo.prefs.EditColorPalettesApp=mstrmojo.declare(mstrmojo.Obj,[mstrmojo._IsWebApp],{palettesEditor:null,onSessionExpired:window.mstrAppOnSessionExpired||null,start:function start(paletteThemes){if(!this.palettesEditor){var me=this;this.palettesEditor=new mstrmojo.prefs.ColorPalettesEditor({serverRequest:function(params,callback,config){me.serverRequest(params,callback,config);},placeholder:this.placeholder});}var editor=this.palettesEditor;editor.initData(paletteThemes);if(paletteThemes.palettes.length){editor.render();}else{mstrmojo.alert(mstrmojo.desc(13716,"No color palettes available."));}}});}());