(function(){mstrmojo.vi.ui.theme=mstrmojo.provide("mstrmojo.vi.ui.theme",{getThemeClass:function getThemeClass(){var ancestor=this.parent||this.opener,result="",nextAncestor;while(ancestor){var themeClassName=ancestor.themeClassName;if(themeClassName){result=themeClassName;break;}nextAncestor=ancestor.parent||ancestor.opener;if(nextAncestor===ancestor){break;}ancestor=nextAncestor;}return result;}});}());