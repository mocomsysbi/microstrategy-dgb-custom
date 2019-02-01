mstrNumber.UNIT_CM="1";mstrNumber.UNIT_IN="2";mstrNumber.UNIT_MM="3";mstrNumber.UNIT_PT="4";mstrNumber.UNIT_PC="5";mstrNumber.UNIT_PX="6";mstrNumber.UNIT_EM="7";mstrNumber.prototype=new Object;mstrNumber.prototype.locale="1033";mstrNumber.prototype.units=mstrNumber.UNIT_IN;mstrNumber.prototype.unitsLabel="";mstrNumber.prototype.thousandSeparatorRegex=null;mstrNumber.prototype.toLocaleString=function(value){try{return(value+"").replace(".",mstr.Settings.Locale.DECIMALSEP);}catch(err){microstrategy.errors.log(err);return value;}};mstrNumber.prototype.toString=function(value,removeThousandsSeparator){try{if(removeThousandsSeparator==true){var regex=this.getThousandSepRegex();if(regex){value=String(value).replace(regex,"");}}value=String(value).replace(mstr.Settings.Locale.DECIMALSEP,".");return value;}catch(err){microstrategy.errors.log(err);return value;}};mstrNumber.prototype.toUserUnits=function(value,doNotLocalize){try{return this.toLocalUnits(this.units,value,doNotLocalize);}catch(err){microstrategy.errors.log(err);}};mstrNumber.prototype.toLocalUnits=function(unit,value,doNotLocalize){try{var __result;switch(unit){case mstrNumber.UNIT_CM:__result=(parseFloat(this.toString(value))*2.54).toFixed(4)+"";break;case mstrNumber.UNIT_MM:__result=(parseFloat(this.toString(value))*25.4).toFixed(4)+"";break;case mstrNumber.UNIT_PT:__result=(parseFloat(this.toString(value))*72).toFixed(4)+"";break;case mstrNumber.UNIT_PC:__result=(parseFloat(this.toString(value))*6).toFixed(4)+"";break;case mstrNumber.UNIT_PX:__result=(parseFloat(this.toString(value))*microstrategy.DPI_CONVERSION)+"";break;case mstrNumber.UNIT_EM:__result=(parseFloat(this.toString(value))*10.6666).toFixed(4)+"";break;default:__result=parseFloat(this.toString(value)).toFixed(4)+"";}if(doNotLocalize){return __result;}else{return this.toLocaleString(__result);}}catch(err){microstrategy.errors.log(err);}};mstrNumber.prototype.toUSUnits=function(value,doNotLocalize){try{return this.convertToUSUnits(this.units,value,doNotLocalize);}catch(err){microstrategy.errors.log(err);}};mstrNumber.prototype.convertToUSUnits=function(unit,value,doNotLocalize){try{var __result=value;switch(unit){case mstrNumber.UNIT_CM:__result=parseFloat(this.toString(value))/2.54+"";break;case mstrNumber.UNIT_MM:__result=parseFloat(this.toString(value))/25.4+"";break;case mstrNumber.UNIT_PT:__result=parseFloat(this.toString(value))/72+"";break;case mstrNumber.UNIT_PC:__result=parseFloat(this.toString(value))/6+"";break;case mstrNumber.UNIT_PX:__result=parseFloat(this.toString(value))/microstrategy.DPI_CONVERSION+"";break;case mstrNumber.UNIT_EM:__result=(parseFloat(this.toString(value))/10.6666)+"";break;}if(doNotLocalize){return __result;}else{return this.toLocaleString(__result);}}catch(err){microstrategy.errors.log(err);}};mstrNumber.prototype.convertUnit=function(unitFrom,unitTo,value){return this.toLocalUnits(unitTo,this.convertToUSUnits(unitFrom,value,true),true);};mstrNumber.prototype.getThousandSepRegex=function(){if(this.thousandSeparatorRegex==null){var sep=mstr.Settings.Locale.THOUSANDSEP;sep=sep.replace(/(\W){1}/g,"\\$1");this.thousandSeparatorRegex=new RegExp(sep,"g");}return this.thousandSeparatorRegex;};function mstrNumber(){return this;}microstrategy.number=new mstrNumber();