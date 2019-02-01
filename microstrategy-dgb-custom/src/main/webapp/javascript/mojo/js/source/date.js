(function(){mstrmojo.requiresCls("mstrmojo.locales");var _DT=function(){return mstrmojo.locales.datetime;},$S=mstrmojo.string;mstrmojo.date=mstrmojo.provide("mstrmojo.date",{monthNumbers:{Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12},REGEXPS:{DATES:{},TIMES:{}},CACHE:{PARSEDATE:{CONTAINS:{},EQUALS:{}},PARSETIME:{CONTAINS:{},EQUALS:{}}},now:Date.now||function now(){return new Date().getTime();},isDate:function isDate(s,bFormat,bContains){var dateInfo=this.parseDate(s,bContains);var isValid=!!(dateInfo&&this.doesDateExist(dateInfo.month,dateInfo.day,dateInfo.year));if(bFormat){if(isValid){var formatted=this.formatDateInfo(dateInfo,_DT().DATEOUTPUTFORMAT);if(bContains){return{match:dateInfo.match,formatted:formatted};}return formatted;}return null;}return !!isValid;},formatDateInfo:function formatDateInfo(dateInfo,format){if(!format){return"";}var day=dateInfo.day,month=dateInfo.month,year=dateInfo.year;var s=format.replace(/dd/g,this.formatInteger(day,2)).replace(/d/g,Number(day)).replace(/yyyy/g,Number(year)).replace(/yy/g,this.formatInteger(Number(year)%100,2)).replace(/MMM/g,"~~~~").replace(/MM/g,"@@").replace(/M/g,"^").replace(/MMMM/g,_DT().MONTHNAME_FULL[Number(month)-1]).replace(/\~\~\~\~/g,_DT().MONTHNAME_SHORT[Number(month)-1]).replace(/\@\@/g,this.formatInteger(month,2)).replace(/\^/g,Number(dateInfo.month));return s;},parseDate:function parseDate(s,bContains,format){if(s==null){return false;}if(typeof s!=="string"){s=String(s);}s=$S.trim(s);var cache=this.CACHE.PARSEDATE[bContains?"CONTAINS":"EQUALS"],cachedResult=cache[s];if(cachedResult||(cachedResult===null)){return cachedResult;}var parseResult=null;var formats;if(format){formats=[format];}else{formats=[].concat(_DT().DATEINPUTFORMATS);formats.unshift(_DT().DATEOUTPUTFORMAT);}var i,len;for(i=0,len=formats.length;i<len;i++){var reInfo=this._buildRegExp4DateFormat(formats[i]),result=reInfo&&s.match(bContains?reInfo.reContains:reInfo.reEquals);if(result){parseResult={match:result[0],year:reInfo.yearIndex&&this.fourDigitYear(result[reInfo.yearIndex]),day:reInfo.dayIndex&&parseInt(Number(result[reInfo.dayIndex]),10),month:reInfo.monthIndex&&this.numericMonth(result[reInfo.monthIndex])};break;}}cache[s]=parseResult;return parseResult;},isTime:function isTime(s,bFormat,bContains){var timeInfo=this.parseTime(s,bContains);var isValid=!!(timeInfo&&this.doesTimeExist(timeInfo.hour,timeInfo.min,timeInfo.sec));if(bFormat){if(isValid){var formatted=this.formatTimeInfo(timeInfo,_DT().TIMEOUTPUTFORMAT);if(bContains){return{match:timeInfo.match,formatted:formatted};}return formatted;}return null;}return !!isValid;},parseTime:function parseTime(s,bContains,format){if(s==null){return false;}if(typeof s!=="string"){s=String(s);}s=$S.trim(s);var cache=this.CACHE.PARSETIME[bContains?"CONTAINS":"EQUALS"],cachedResult=cache[s];if(cachedResult||(cachedResult===null)){return cachedResult;}var parseResult=null;var formats;if(format){formats=[format];}else{formats=[].concat(_DT().TIMEINPUTFORMATS);formats.unshift(_DT().TIMEOUTPUTFORMAT);}var i,len;for(i=0,len=formats.length;i<len;i++){var reInfo=this._buildRegExp4TimeFormat(formats[i]),result=reInfo&&s.match(bContains?reInfo.reContains:reInfo.reEquals);if(result){var ampm=reInfo.ampmIndex&&result[reInfo.ampmIndex];parseResult={match:result[0],hour:reInfo.hourIndex&&this.capitalHour(result[reInfo.hourIndex],ampm),min:reInfo.minIndex&&parseInt(Number(result[reInfo.minIndex]),10),sec:reInfo.secIndex&&parseInt(Number(result[reInfo.secIndex]),10)};break;}}cache[s]=parseResult;return parseResult;},formatTimeInfo:function formatTimeInfo(timeInfo,format){if(!format){return"";}var twelveHour=!(Number(timeInfo.hour)%12)?12:(Number(timeInfo.hour)%12),s=format.replace(/HH/g,this.formatInteger(timeInfo.hour,2)).replace(/H/g,Number(timeInfo.hour)).replace(/hh/g,this.formatInteger(twelveHour,2)).replace(/h/g,twelveHour).replace(/mm/g,this.formatInteger(Number(timeInfo.min)||0,2)).replace(/m/g,Number(timeInfo.min)||0).replace(/ss/g,this.formatInteger(Number(timeInfo.sec)||0,2)).replace(/s/g,Number(timeInfo.sec)||0).replace(/a/g,(Number(timeInfo.hour)<12)?_DT().AM_NAME:_DT().PM_NAME).replace(/tt/g,(Number(timeInfo.hour)<12)?_DT().AM_NAME:_DT().PM_NAME).replace(/AM\/PM/g,(Number(timeInfo.hour)<12)?_DT().AM_NAME:_DT().PM_NAME);return s;},doesTimeExist:function doesTimeExst(capitalHour,min,sec){var h=parseInt(capitalHour,10);if(h>=0&&h<=23){var m=parseInt(min,10);if(m>=0&&m<=59){if(!sec){return true;}var s=parseInt(sec,10);if(s>=0&&s<=59){return true;}}}return false;},capitalHour:function capitalHour(hour,ampm){hour=parseInt(Number(hour),10);if(ampm&&(ampm.match(_DT().AM_NAME)||ampm.match(/AM/i))){return hour%12;}if(ampm&&(ampm.match(_DT().PM_NAME)||ampm.match(/PM/i))){return 12+(hour%12);}return hour;},getTimeStamp:function getTimeStamp(){var now=new Date();var date=[now.getMonth()+1,now.getDate(),now.getFullYear()];var time=[now.getHours(),now.getMinutes(),now.getSeconds()];var suffix=(time[0]<12)?"AM":"PM";time[0]=(time[0]<12)?time[0]:time[0]-12;time[0]=time[0]||12;for(var i=1;i<3;i++){if(time[i]<10){time[i]="0"+time[i];}}return date.join("-")+" "+time.join("")+" "+suffix;},isDateAndOrTime:function isDateAndOrTime(s,bFormat){return this.isDateTime(s,bFormat)||this.isDate(s,bFormat)||this.isTime(s,bFormat);},isDateTime:function isDateTime(s,bFormat){var dateTimeInfo=this.parseDateAndOrTime(s),dateInfo=dateTimeInfo&&dateTimeInfo.date,timeInfo=dateTimeInfo&&dateTimeInfo.time,isValid=!!dateInfo&&!!timeInfo&&this.doesDateExist(dateInfo.month,dateInfo.day,dateInfo.year)&&this.doesTimeExist(timeInfo.hour,timeInfo.min,timeInfo.sec);if(bFormat){if(isValid){var formattedDate=this.formatDateInfo(dateInfo,_DT().DATEOUTPUTFORMAT),formattedTime=this.formatTimeInfo(timeInfo,_DT().TIMEOUTPUTFORMAT),dateIndex=s.indexOf(dateInfo.match),timeIndex=s.indexOf(timeInfo.match);return(timeIndex<dateIndex)?formattedTime+" "+formattedDate:formattedDate+" "+formattedTime;}return null;}return !!isValid;},parseDateAndOrTime:function parseDateAndOrTime(s,dateFormat,timeFormat){var dateInfo=this.parseDate(s,true,dateFormat);var sWithoutDate=$S.trim((dateInfo&&dateInfo.match)?s.replace(dateInfo.match,""):s),timeInfo=this.parseTime(sWithoutDate,false,timeFormat);if(!dateInfo&&!timeInfo){return null;}return{date:dateInfo,time:timeInfo};},inDateTimeRange:function inDateTimeRange(val,min,max){var valInfo=this.parseDateAndOrTime(val),valDateInfo=valInfo&&valInfo.date,valTimeInfo=valInfo&&valInfo.time;if(!valDateInfo&&!valTimeInfo){return 0;}if(min!=null){var minInfo=this.parseDateAndOrTime(min);if(valDateInfo&&minInfo&&minInfo.date){var minDiff=this.compareDate(valDateInfo,minInfo.date);if(minDiff<0){return -1;}if(minDiff==0){if(valTimeInfo&&minInfo.time&&(this.compareTime(valTimeInfo,minInfo.time)<0)){return -1;}}}}if(max!=null){var maxInfo=this.parseDateAndOrTime(max);if(valDateInfo&&maxInfo&&maxInfo.date){var maxDiff=this.compareDate(valDateInfo,maxInfo.date);if(maxDiff>0){return 1;}if(maxDiff==0){if(valTimeInfo&&maxInfo.time&&(this.compareTime(valTimeInfo,maxInfo.time)>0)){return 1;}}}}return 0;},compareDate:function compareDate(val1,val2){if(val1===val2){return 0;}var date1=typeof val1==="string"?this.parseDate(val1):val1,date2=typeof val2==="string"?this.parseDate(val2):val2;if(!date1){return -1;}if(!date2){return 1;}return(date1.year-date2.year)||(date1.month-date2.month)||(date1.day-date2.day)||0;},compareTime:function compareTime(val1,val2){if(val1===val2){return 0;}var time1=typeof val1==="string"?this.parseTime(val1):val1,time2=typeof val2==="string"?this.parseTime(val2):val2;if(!time1){return -1;}if(!time2){return 1;}return(time1.hour-time2.hour)||(time1.min-time2.min)||(time1.sec-time2.sec)||0;},compareDateTime:function compareDateTime(val1,val2){return this.compareDate(val1,val2)||this.compareTime(val1,val2);},compareDateAndOrTime:function compareDateAndOrTime(val1,val2){if(val1===val2){return 0;}var dt1=typeof val1==="string"?this.parseDateAndOrTime(val1):val1,dt2=typeof val2==="string"?this.parseDateAndOrTime(val2):val2;if(!dt1){return -1;}if(!dt2){return 1;}var d1=dt1.date,d2=dt2.date,t1=dt1.time,t2=dt2.time;return this.compareDate(d1,d2)||this.compareTime(t1,t2);},_buildRegExp4DateFormat:function re4DateFmt(formatStr){if(!formatStr){return null;}var reInfo=this.REGEXPS.DATES[formatStr];if(!reInfo){if(!this.REGEXPS.MONTHNAME_FULL){this.REGEXPS.MONTHNAME_FULL=_DT().MONTHNAME_FULL.join("|");this.REGEXPS.MONTHNAME_SHORT=_DT().MONTHNAME_SHORT.join("|");}reInfo=this.REGEXPS.DATES[formatStr]={};reInfo.formatStr=formatStr;var reStr=reInfo.reStr=formatStr.replace(/([^M|d|y|\s])/g,"\\$1").replace(/dd/g,"~~~~").replace(/d/g,"(\\d{1,2})").replace(/\~\~\~\~/g,"(\\d\\d)").replace(/yyyy/g,"(\\d\\d\\d\\d)").replace(/yy/g,"(\\d\\d)").replace(/MMMM/g,"@@@@").replace(/MMM/g,"@@@").replace(/MM/g,"(\\d\\d)").replace(/M/g,"(\\d{1,2})").replace("@@@@","("+this.REGEXPS.MONTHNAME_FULL+")").replace("@@@","("+this.REGEXPS.MONTHNAME_SHORT+")");reInfo.reEquals=new RegExp("^"+reStr+"$");reInfo.reContains=new RegExp("^"+reStr+"\\b");var indices=[{key:"monthIndex",index:formatStr.indexOf("M")},{key:"dayIndex",index:formatStr.indexOf("d")},{key:"yearIndex",index:formatStr.indexOf("y")}];indices.sort(function(a,b){return a.index-b.index;});var counter=1,i;for(i=0;i<3;i++){reInfo[indices[i].key]=indices[i].index>-1?counter++:null;}}return reInfo;},_buildRegExp4TimeFormat:function re4TimeFmt(formatStr){if(!formatStr){return null;}var reInfo=this.REGEXPS.TIMES[formatStr];if(!reInfo){if(!this.REGEXPSTR_AMPM){this.REGEXPSTR_AMPM=[_DT().AM_NAME,_DT().PM_NAME,String(_DT().AM_NAME).toLowerCase(),String(_DT().PM_NAME).toLowerCase()].join("|");}reInfo=this.REGEXPS.TIMES[formatStr]={};reInfo.formatStr=formatStr;var reStr=formatStr.replace(/\'\'/g,'"');var literals=reStr.match(/\'(.+?)\'/g);reStr.replace(/\'(.+?)\'/g,"*");reStr=reStr.replace(/([^H|h|m|s|z|Z|a|t|\s|A|P|M|\/])/g,"\\$1").replace(/HH|hh/g,"(\\d\\d)").replace(/H|h/g,"(\\d{1,2})").replace(/mm/g,"(\\d\\d)").replace(/m/g,"(\\d{1,2})").replace(/ss/g,"(\\d\\d)").replace(/s/g,"(\\d{1,2})").replace(/a/g,"("+this.REGEXPSTR_AMPM+")").replace(/AM\/PM/,"("+this.REGEXPSTR_AMPM+")").replace(/tt/g,"("+this.REGEXPSTR_AMPM+")").replace(/z|Z/g,"(.+?)");var i,len;for(i=1,len=(literals&&literals.length)||0;i<len;i++){reStr=reStr.replace(/\*/,literals[i]);}reStr=reStr.replace(/\"/g,"'");reInfo.reEquals=new RegExp("^"+reStr+"$");reInfo.reContains=new RegExp(reStr);var indices=[{key:"hourIndex",index:formatStr.search(/h|H/)},{key:"minIndex",index:formatStr.indexOf("m")},{key:"secIndex",index:formatStr.indexOf("s")},{key:"ampmIndex",index:formatStr.search(/tt|a|AM\/PM/)},{key:"zoneIndex",index:formatStr.search(/z|Z/)}];indices.sort(function(a,b){return a.index-b.index;});var counter=1;for(i=0;i<5;i++){reInfo[indices[i].key]=indices[i].index>-1?counter++:null;}}return reInfo;},doesDateExist:function doesDateExist(month,day,year){var dt=new Date(year,month-1,day);return year==dt.getFullYear()&&month==dt.getMonth()+1&&day==dt.getDate();},fourDigitYear:function fourDigitYear(year){year=parseInt(Number(year),10);if(!isNaN(year)){var twoDigitStart=(_DT().TWODIGITYEARSTART%100)||0;if(year>=0&&year<=twoDigitStart){year=2000+year;}else{if(year>twoDigitStart&&year<100){year=1900+year;}}}return year;},numericMonth:function numMonth(month){var monthInt=parseInt(Number(month),10),_A=mstrmojo.array;if(!isNaN(monthInt)){return monthInt;}var len=(month&&month.length)||0,index=-1;if(len){if(len<=3){index=_A.indexOf(_DT().MONTHNAME_SHORT,month);}if(index===-1){index=_A.indexOf(_DT().MONTHNAME_FULL,month);}}return index+1;},formatInteger:function fmtInt(num,minLen){var s=String(num),missing=Math.max(minLen-s.length,0);if(missing>0){var arr=[s],i;for(i=1;i<=missing;i++){arr.push("0");}s=arr.reverse().join("");}return s;},getFirstDateOfMonth:function(y,m){return new Date(y,m-1,1);},getDateObject:function(y,m,d,hh,mm,ss){y=y||0;m=m||1;d=d||1;hh=hh||0;mm=mm||0;ss=ss||0;return new Date(y,m-1,d,hh,mm,ss);},getDateFromDateInfo:function(dateInfo){return this.getDateObject(dateInfo.date&&dateInfo.date.year,dateInfo.date&&dateInfo.date.month,dateInfo.date&&dateInfo.date.day,dateInfo.time&&dateInfo.time.hour,dateInfo.time&&dateInfo.time.min,dateInfo.time&&dateInfo.time.sec);},getDateJson:function(date){return{year:date.getFullYear(),month:date.getMonth()+1,day:date.getDate(),hour:date.getHours(),min:date.getMinutes(),sec:date.getSeconds()};},isLeapYear:function(y){return !(y%400)||(!(y%4)&&!!(y%100));},getDaysOfMonth:function(y,m){var days=[31,28,31,30,31,30,31,31,30,31,30,31];if(m==2&&this.isLeapYear(y)){return 29;}return days[m-1];},getPreMonth:function(y,m){if(m===1){return{y:y-1,m:12};}return{y:y,m:m-1};},getNextMonth:function(y,m){if(m===12){return{y:y+1,m:1};}return{y:y,m:m+1};}});}());