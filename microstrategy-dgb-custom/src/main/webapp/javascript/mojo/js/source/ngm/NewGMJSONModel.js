(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.gm.GMUtility","mstrmojo.ngm.NewGMEnums","mstrmojo.mstr.EnumDSSXMLObjectTypes","mstrmojo.VisEnum");var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,$GMUTIL=mstrmojo.gm.GMUtility,$VISUTIL=mstrmojo.VisUtility,MXNAME_POS=mstrmojo.ngm.EnumMetricNamesPosition,OBJECT_TYPE=mstrmojo.mstr.EnumDSSXMLObjectTypes,ERROR_TYPE=mstrmojo.VisEnum.SERVER_JSON_ERROR_TYPE;function debugPrint(){if(window.ngmDebug){console.log.apply(console.log,arguments);}}function debugTimer(name){if(window.ngmDebug||window.ngmTimer){console.time(name);}}function debugTimerEnd(name){if(window.ngmDebug||window.ngmTimer){console.timeEnd(name);}}function deepFreeze(o){Object.freeze(o);Object.getOwnPropertyNames(o).forEach(function(prop){if(o.hasOwnProperty(prop)&&o[prop]!==null&&(typeof o[prop]==="object"||typeof o[prop]==="function")&&!Object.isFrozen(o[prop])){deepFreeze(o[prop]);}});return o;}function getFormsOfAttr(att,isRowAttribute,tui,ttlDisTp){if(!att.fs){att.fs=att.es;}var forms=[],i,len=att.fs&&att.fs.length||0,singleForm;for(i=0;i<len;i++){singleForm=$HASH.clone(att);singleForm.tui=tui;singleForm.isRowAttribute=isRowAttribute;if(att.otp===OBJECT_TYPE.Attribute){singleForm.fid=singleForm.fs[i].id;singleForm.n=getFormName(att,ttlDisTp,i,len);}else{singleForm.fid=att.fid!==undefined?att.fid:att.id;singleForm.n=i===0?att.n:"";}forms.push(singleForm);}return forms;}function getAttributeFormCnt(attr){var formCount;if((attr.fcnt===undefined||attr.fcnt===null)&&attr.fs){attr.fcnt=attr.fs.length||1;}if(attr.fcnt!==undefined&&attr.fcnt!==null){formCount=attr.fcnt;}else{if(attr.t===47){formCount=1;}else{formCount=attr.cs!==undefined?attr.cs:attr.rs;}}return formCount;}function filterInt(value){if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value)){return Number(value);}return NaN;}var cacheText={};function decodeHTMLText(encodedText){if(cacheText[encodedText]===undefined){cacheText[encodedText]=$GMUTIL.restoreSpecialChars(encodedText);}return cacheText[encodedText];}function encodeString(string){string=$GMUTIL.restoreSpecialChars(string);string=mstrmojo.string.decodeHtmlString(string).trim();return string;}function fetchHeaderProps(header,props){var obj={};if(header===undefined){return obj;}if(props.length>0){$ARR.forEach(props,function(p){var pValue=header[p];if(typeof pValue==="string"){pValue=decodeHTMLText(header[p]);}obj[p]=pValue;});return obj;}return header;}function translateLowestHeaderInfo(unitsOnAxis,headerObjList,props){var res=[],ho,unit,header,i,obj,eleAllEmpty=true;for(i=0;i<headerObjList.length;i++){ho=headerObjList[i];unit=unitsOnAxis[ho.ui];header=unit.es[ho.idx];obj=header;if(!$HASH.isEmpty(obj)){res.push(obj);eleAllEmpty=false;}}if(eleAllEmpty){for(i=0;i<headerObjList.length;i++){ho=headerObjList[i];unit=unitsOnAxis[ho.ui];res.push(fetchHeaderProps(unit,props));}}return res;}var INVALID_METRIC_IDX=-20;function getMetricIndexFromID(oid,gsi){var mx=gsi&&gsi.mx,mcnt,i;if(mx){mcnt=mx.length;for(i=0;i<mcnt;i++){if(mx[i].did===oid){return i;}}}return INVALID_METRIC_IDX;}function getMetricNamesPosition(dz){var dzNms={XAxis:MXNAME_POS.ByXAxis,YAxis:MXNAME_POS.ByYAxis,BreakBy:MXNAME_POS.ByBreakBy,Rows:MXNAME_POS.ByRow,Columns:MXNAME_POS.ByColumn,SliceBy:MXNAME_POS.BySlice},res=MXNAME_POS.ByNone;Object.keys(dzNms).forEach(function(n){if(dz[n].hasOwnProperty("MetricNames")){if(res!==MXNAME_POS.ByNone){$VISUTIL.visPrint("wrong position for metric names");}else{res=dzNms[n];}}});return res;}function getMetricsOnDropZone(modelJSON,name,isSimpleQuery){var dz=modelJSON.dz[name],mx,res=[];if(dz&&dz.TemplateMetric){mx=dz.TemplateMetric;if(isSimpleQuery){res=mx;}else{for(var i=0;i<mx.length;i++){res.push(getMetricIndexFromID(mx[i].id,modelJSON.gsi));}}}return res;}function createPhsRef(pHds,chHds,fieldSpan){var pHdsIdxes=Object.keys(pHds),pIdx=0,pHdFirstForm,chHdFirstForm;for(var i in chHds){var chHd=chHds[i];if(chHd.forms){chHdFirstForm=chHd.forms[0];while(true){if(pIdx>=pHdsIdxes.length){break;}var pHd=pHds[pHdsIdxes[pIdx]];if(pHds.isCustomGroupWithBanding){pHdFirstForm=pHd.forms[1];}else{pHdFirstForm=pHd.forms[0];}var pSpan=pHdFirstForm[fieldSpan]||1;var chSpan=chHdFirstForm[fieldSpan]||1;pHd.children=pHd.children||[];if(pHdFirstForm.o<=chHdFirstForm.o&&(pHdFirstForm.o+pSpan)>=(chHdFirstForm.o+chSpan)){pHd.children.push(chHd);chHd.pHd=pHd;chHd.pHdIdx=pHdsIdxes[pIdx];break;}else{pIdx++;}}}}}function getFormName(unit,disTp,formIdx,formCount){var unitName=unit.n,formName=unit.fs&&unit.fs[formIdx].n,resolvedTitle="";var TT_DT=mstrmojo.gm.FormNameType;if(formName===undefined){formName=" ";}if(disTp===TT_DT.OFF){if(formIdx===0){resolvedTitle=unitName;}else{resolvedTitle="";}}else{if(disTp===TT_DT.ON){resolvedTitle=unitName+" "+formName;}else{if(disTp===TT_DT.FORM_NAME_ONLY){resolvedTitle=formName;}else{if(disTp===TT_DT.SHOW_ATT_NAME_ONCE){if(formIdx===0){resolvedTitle=unitName+" "+formName;}else{resolvedTitle=formName;}}else{if(disTp===TT_DT.AUTO){if(formCount===1){resolvedTitle=unitName;}else{resolvedTitle=unitName+" "+formName;}}}}}}return resolvedTitle;}function mergeCGForm(data,axis){var mxIdx=data.mxIdx,i=0,j,o,attr=axis==="r"?"rs":"cs",step,item,span;while(i<=mxIdx){item=data[i];if(!item){i+=1;continue;}o=item.forms[0].o;span=item.forms[0][attr]||1;if(span>1){j=i+(item.forms[1][attr]||1);while(j<span+o){if(data[j]){step=data[j].forms[0][attr]||1;data[j].forms.splice(0,0,item.forms[0]);j+=step;}else{j+=1;}}}i+=span;}}function getDepthAndFormFromColOrRow(unitsOnAxis,idx,isRow){var i,tot=0,att,len;if(unitsOnAxis&&unitsOnAxis.length>0){len=unitsOnAxis.length;for(i=0;i<len;i++){att=unitsOnAxis[i];if(!att.fcnt){att.fcnt=isRow?att.cs:att.rs;if(att.otp===-1){att.fcnt=1;}att.fcnt=att.fcnt||1;}if(tot+att.fcnt>idx){return{depth:i,formIndex:idx-tot};}tot+=att.fcnt;}}return -1;}function reducerHeaderText(acc,curValue,curIndex){return acc+(curIndex?" ":"")+curValue.headerText;}function getUnitInDataSet(docModel,unitId){var fnFilter=function fnFilter(unit){return unit.did===unitId;},atts=docModel&&docModel.getDatasetUnits(["att"],fnFilter);if(atts&&atts[0]){return atts[0];}return undefined;}mstrmojo.ngm.NewGMJSONModel=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.ngm.NewGMJSONModel",modelRhs:[],modelChs:[],init:function(props){this._super(props);this._iNode=props&&props.node||{};this.modelRhs=[];this.modelChs=[];this.ttlDispTp=this._iNode.lnm;this.docModel=props.docModel;this._prepareData();},_prepareData:function(){debugTimer("prepare data");this._parseDropZoneCfg();this._generatePlottingMetricsIndex();if(!this.getData().egt||this.getData().egt!==ERROR_TYPE.AE_ERROR){this._createHash();}if(!(mstrApp.isAppStatePause&&mstrApp.isAppStatePause()||mstrConfig.resolveOnly)&&!this.getData().eg){this._createModelRhs();this._createModelChs();this._splitGVS();}debugTimerEnd("prepare data");},_createHash:function(){var data=this.getData(),gts=data.gts,gsi=data.gsi,list=[].concat([gts.row]).concat([gts.col]),hashAttr=this._hashAttr={},hashAttrElem=this._hashAttrElem={},mapAttrElem=this._mapAttrElem={},docModel=this.docModel,cbOrder={},cbUnits=data.dz.ColorBy.TemplateUnit||[],cbMetricNamesIndex=data.dz.ColorBy.MetricNames;cbUnits.forEach(function(u){list.forEach(function(sublist){for(i=0;i<sublist.length;i++){if(sublist[i].hid===u.id||sublist[i].id===u.id){cbOrder[sublist[i].id]=u.idx;break;}}});});list.forEach(function(sublist,idx){sublist.forEach(function(unit,dpt){if(unit.otp!==-1){var newUnit=$HASH.clone(unit);hashAttr[unit.id]=newUnit;newUnit.axis=idx+1;newUnit.dpt=dpt+1;(newUnit.es||[]).forEach(function(elem){mapAttrElem[elem.id]=unit.id;if(hashAttrElem[elem.id]){hashAttrElem[elem.id].n+=" "+encodeString(elem.n);}else{hashAttrElem[elem.id]=$HASH.clone(elem);hashAttrElem[elem.id].n=encodeString(elem.n);}hashAttrElem[elem.id].headerText=hashAttrElem[elem.id].n;hashAttrElem[elem.id].tid=unit.id;hashAttrElem[elem.id].cbai=cbOrder[unit.id];hashAttrElem[elem.id].axis=newUnit.axis;});(newUnit.fs||[]).forEach(function(form){if(form.id===newUnit.fid){newUnit.bftp=form.bftp;}});var dsUnit=getUnitInDataSet(docModel,unit.hid||unit.id);newUnit.fs=$HASH.mergeHashes(dsUnit&&dsUnit.fs,newUnit.fs);}});});list=[].concat(gsi.rows).concat(gsi.cols);list.forEach(function(unit){if(unit.did!=="-1"){if(!hashAttr[unit.did]){hashAttr[unit.did]={oid:unit.did,otp:unit.t,n:unit.n};}hashAttr[unit.did]=$HASH.copy(unit,hashAttr[unit.did]);}});var hashMetric=this._hashMetric={},mapMetIdx=this._mapMetIdx={};list=[].concat(gsi.mx);list.forEach(function(met){hashMetric[met.did]=$HASH.clone(met);});list=(gts.col[gts.col.length-1]||{}).es||[];list.forEach(function(met,mIdx){hashMetric[met.oid]=$HASH.copy($HASH.clone(met),hashMetric[met.oid]);hashMetric[met.oid].headerText=hashMetric[met.oid].n;hashMetric[met.oid].mIdx=mIdx;hashMetric[met.oid].cbai=cbMetricNamesIndex;mapMetIdx[mIdx]=met.oid;});list=data.nf||[];list.forEach(function(unit){hashMetric[unit.id]=hashMetric[unit.id]||{};hashMetric[unit.id].nf=unit.nfs;});var dz=this.getData().dz;$HASH.forEach(dz,function(name){var zone=dz[name];(zone&&zone.TemplateMetric||[]).forEach(function(unit){hashMetric[unit.id]=hashMetric[unit.id]||{};hashMetric[unit.id].cds=unit.cds;hashMetric[unit.id].axSide=unit.ax;});});deepFreeze(hashAttr);deepFreeze(hashAttrElem);deepFreeze(hashMetric);},_duplicateHashObj:function(obj,props){obj=obj||{};if(props){if(props.length){return $HASH.copyProps(props,obj);}return JSON.parse(JSON.stringify(obj));}return obj;},queryAttribute:function(query,props){var obj={};if(query.aid){if(this._hashAttr){obj=this._hashAttr[query.aid];}else{obj=getUnitInDataSet(this.docModel,query.aid);}}return this._duplicateHashObj(obj,props);},queryAttrElem:function(query,props){var obj={};if(query.eid){obj=this._hashAttrElem[query.eid];}return this._duplicateHashObj(obj,props);},queryMetric:function(query,props){var obj={};if(query.mix!==undefined){obj=this._hashMetric[this._mapMetIdx[query.mix]];}if(query.id){obj=this._hashMetric[query.id];}return this._duplicateHashObj(obj,props);},queryByIdentity:function(idt,props){if(idt.mix!==undefined){return this.queryMetric({mix:idt.mix},props);}else{var xhs=idt.axis===1?this.modelRhs:this.modelChs,unit=xhs[idt.dpt-1][idt.o],gts=this.getData().gts,formSrc=idt.axis===1?gts.row:gts.col,u=unit.forms[0],eid=formSrc[u.ui].es[u.idx].id;if(props){return $HASH.copy(unit.forms[0],this.queryAttrElem({eid:eid},props));}return this.queryAttrElem({eid:eid},props);}},_generatePlottingMetricsIndex:function(){var data=this.getData(),mOnX=getMetricsOnDropZone(data,"XAxis"),mOnY=getMetricsOnDropZone(data,"YAxis"),mxToSplit,i,j;this.plottingMetricsIndex=[];if(this.chartType===mstrmojo.ngm.EnumGraphType.SCATTER){for(i=0;i<mOnY.length;i++){this.plottingMetricsIndex[i]=[];for(j=0;j<mOnX.length;j++){this.plottingMetricsIndex[i][j]=[[mOnX[j],mOnY[i]]];}}}else{if(this.chartType===mstrmojo.ngm.EnumGraphType.NORMAL){mxToSplit=this.NormalChartDirection===mstrmojo.ngm.EnumGraphDirection.VERTICAL?mOnY:mOnX;}else{if(this.chartType===mstrmojo.ngm.EnumGraphType.GRID){if(this.shapeType==="Pie"&&this.isSplitPlottingMetrics){mxToSplit=getMetricsOnDropZone(data,"Angle");}else{mxToSplit=[0];}}else{mxToSplit=[0];}}if(this.metricBy===MXNAME_POS.ByRow){for(i=0;i<mxToSplit.length;i++){this.plottingMetricsIndex.push([[[mxToSplit[i]]]]);}}else{if(this.metricBy===MXNAME_POS.ByColumn){this.plottingMetricsIndex.push(mxToSplit.map(function(m){return[[m]];}));}else{if(mxToSplit.length>1){this.plottingMetricsIndex.push([mxToSplit.map(function(m){return[m];})]);}else{this.plottingMetricsIndex.push([[mxToSplit]]);}}}}},_parseDropZoneCfg:function(){var data=this.getData(),dz=data.dz;this._initChartType();this.metricBy=getMetricNamesPosition(dz);this.shapeType=dz.visProp.fmt.Shape;this._initIsSplitPlottingMetrics();this._initDropZoneCache();},_isMetricsSplitByRow:function(){return this.metricBy===MXNAME_POS.ByRow;},_isMetricsSplitByColumn:function(){return this.metricBy===MXNAME_POS.ByColumn;},_initChartType:function(){var data=this.getData(),dz=data.dz,xAxis=dz.XAxis,yAxis=dz.YAxis;if(this.chartType===undefined){if(xAxis.TemplateMetric&&yAxis.TemplateMetric){this.chartType=mstrmojo.ngm.EnumGraphType.SCATTER;}else{if(!xAxis.TemplateMetric&&!yAxis.TemplateMetric){this.chartType=mstrmojo.ngm.EnumGraphType.GRID;}else{this.chartType=mstrmojo.ngm.EnumGraphType.NORMAL;}}}if(this.chartType===mstrmojo.ngm.EnumGraphType.NORMAL){this.NormalChartDirection=yAxis.TemplateMetric?mstrmojo.ngm.EnumGraphDirection.VERTICAL:mstrmojo.ngm.EnumGraphDirection.HORIZONTAL;}},_initDropZoneCache:function(){this._dropZoneCache={};function cacheDropZone(name,units,idCache){var len=(units||[]).length;for(var i=0;i<len;i++){var unit=units[i];idCache[unit.id]=idCache[unit.id]||[];idCache[unit.id].push(name);}}var data=this.getData(),dz=data.dz;for(var name in dz){if(dz[name]){var zone=dz[name];cacheDropZone(name,zone.TemplateUnit,this._dropZoneCache);if(name!=="ColorBy"){cacheDropZone(name,zone.TemplateMetric,this._dropZoneCache);}}}var me=this;function addExtraIdentity(dzName){var mOnX=getMetricsOnDropZone(data,"XAxis"),mOnY=getMetricsOnDropZone(data,"YAxis"),allMetrics=me._getMetrics(),iter=mOnX.length>1?mOnX:(mOnY.length>1?mOnY:[]);iter.forEach(function(mIdx){me._dropZoneCache[allMetrics[mIdx].oid].push(dzName);});}if(me.metricBy===MXNAME_POS.ByBreakBy){addExtraIdentity("BreakBy");}if(dz.ColorBy.hasOwnProperty("MetricNames")){addExtraIdentity("ColorBy");}this._identityCache={};for(var idd in this._dropZoneCache){if(this._dropZoneCache[idd]!==undefined){this._identityCache[idd]=this._dropZoneCache[idd].filter(function(z){return z!=="Rows"&&z!=="Columns";});}}},_initIsSplitPlottingMetrics:function(){var data=this.getData();if(this.chartType===mstrmojo.ngm.EnumGraphType.GRID){this.isSplitPlottingMetrics=false;if(this.shapeType==="Pie"&&getMetricsOnDropZone(data,"Angle").length>0){this.isSplitPlottingMetrics=this._isMetricsSplitByRow()||this._isMetricsSplitByColumn();}}else{this.isSplitPlottingMetrics=this._isMetricsSplitByRow()||this._isMetricsSplitByColumn();}},getChartType:function(){return this.chartType;},getData:function(){return this._iNode;},_getInChartLayout:function(){return{r:this.plottingMetricsIndex.length||1,c:this.plottingMetricsIndex[0].length||1};},_getMetrics:function(){var data=this.getData(),gts=data.gts,unit=gts.col[gts.col.length-1];if(mstrApp.isAppStatePause&&mstrApp.isAppStatePause()||mstrConfig.resolveOnly){var gsi=data.gsi,mx=gsi&&gsi.mx;$ARR.forEach(mx,function(m){if(m.did&&!m.oid){m.oid=m.did;}});return mx;}return unit&&unit.otp===-1&&unit.es||[];},getMetricCount:function(){return this._getMetrics().length;},_getMetricIndexOfSubChart:function _getMetricIndexOfSubChart(r,c){return this.plottingMetricsIndex[r][c];},_getSizeByMetricIndex:function _getSizeByMetricIndex(){return this._getXZoneMetricIndex("SizeBy");},_getColorByMetricIndex:function _getColorByMetricIndex(){return this._getXZoneMetricIndex("ColorBy");},_getXZoneMetricIndex:function _getXZoneMetricIndex(zn,isMultiple){var data=this.getData(),gsi=data.gsi,dz=data.dz,tm=dz[zn].TemplateMetric;if(tm){if(isMultiple){return $ARR.map(tm,function(m){return getMetricIndexFromID(m.id,gsi);});}return getMetricIndexFromID(tm[0].id,gsi);}return undefined;},_getTooltipMetricIndexes:function _getTooltipMetricIndexes(){return this._getXZoneMetricIndex("AdditionalMetrics",true);},_splitGVS:function _splitGVS(){debugTimer("_splitGVS");var me=this,allMetrics=me._getMetrics(),data=this.getData(),dz=data.dz,gsi=data.gsi,gvs=data.gvs,dim=data.dm,ptt=data.ptt,nRow=dim.cic||1,nCol=dim.cir||1,rct=dim.rct,cct=dim.cct,colPartition=ptt.col.concat([cct]),rowPartition=ptt.row.concat([rct]),colStep=this.getMetricCount()||1,vls=[],rIdx,cIdx,thresholds;var vl={data:[],identity:[]},sbIdx=this._getSizeByMetricIndex(),cbIdx=this._getColorByMetricIndex(),tpIdxes=this._getTooltipMetricIndexes();if(cbIdx!==undefined){thresholds=gsi.thresholds&&gsi.thresholds[gsi.mx[cbIdx].did];}var isH=true;if(this.hasBreakBy()){isH=!!(dz.XAxis.TemplateMetric&&dz.XAxis.TemplateMetric.length>0);}var nSubRow=this._getInChartLayout().r;var nSubCol=this._getInChartLayout().c;for(var i=0;i<nRow;i++){for(var j=0;j<nCol;j++){var wd=(colPartition[j+1]-colPartition[j])||1;var ht=(rowPartition[i+1]-rowPartition[i])||1;for(var scri=0;scri<nSubRow;scri++){rIdx=nSubRow*i+scri;vls[rIdx]=vls[rIdx]||[];for(var scci=0;scci<nSubCol;scci++){cIdx=nSubCol*j+scci;if(vls[rIdx][cIdx]){debugPrint("metrics("+rIdx+","+cIdx+") has already generated");}vls[rIdx][cIdx]=[];var l,k;for(isH?l=rowPartition[i]:k=colPartition[j];isH?l<rowPartition[i]+ht:k<colPartition[j]+wd;isH?l++:k+=colStep){for(isH?k=colPartition[j]:l=rowPartition[i];isH?k<colPartition[j]+wd:l<rowPartition[i]+ht;isH?k+=colStep:l++){var dpsMxs=this._getMetricIndexOfSubChart(scri,scci),c,r;for(var dpi=0;dpi<dpsMxs.length;dpi++){vl={values:[],id:[]};for(var m=0;m<dpsMxs[dpi].length;m++){r=l;c=k+dpsMxs[dpi][m];var vv;try{vv=gvs.items[r].items[c].rv;}catch(e){vv=null;}vl.values.push(vv);for(var axis=0;axis<2;axis++){var modelGhs=axis===0?me.modelRhs:me.modelChs,formSrc=axis===0?data.gts.row:data.gts.col,mxOffset=axis===0?r:c,isOnlyMetric=m>0;if(modelGhs.length>0){var leafObj=modelGhs[modelGhs.length-1][mxOffset];while(leafObj){var form=leafObj.forms[0];if(isOnlyMetric&&form.mix===undefined){break;}var headerText=form.headerText;if(leafObj.forms.length>1){headerText=leafObj.forms.reduce(reducerHeaderText,"");}var identity;if(form.mix!==undefined){identity={mix:form.mix,o:form.o,dropzones:me._identityCache[allMetrics[form.mix].oid]};}else{identity={axis:axis+1,o:form.o,dpt:form.dpt,dropzones:me._identityCache[formSrc[form.ui].hid]||me._identityCache[formSrc[form.ui].id]||[]};}vl.id.push(identity);leafObj=leafObj.pHd;}}}}if(vl.values.length>0){var exIdx;if(sbIdx!==undefined){exIdx=dpsMxs.indexOf(sbIdx);if(exIdx>=0){vl.sbi=exIdx;id;}else{vl.values.push(gvs.items[r].items[k+sbIdx].rv);vl.sbi=vl.values.length-1;}}if(cbIdx!==undefined){exIdx=dpsMxs.indexOf(cbIdx);if(exIdx>=0){vl.cbi=exIdx;}else{vl.values.push(gvs.items[r].items[k+cbIdx].rv);vl.cbi=vl.values.length-1;}if(gvs.items[r].items[k+cbIdx].ti){vl.color=thresholds[parseInt(gvs.items[r].items[k+cbIdx].ti,10)-1].fmt.bc;}}if(tpIdxes!==undefined){vl.ttm={};(tpIdxes||[]).forEach(function(tpIdx){var exIdx=dpsMxs.indexOf(tpIdx),ttpIdx;if(exIdx>=0){ttpIdx=exIdx;}else{vl.values.push(gvs.items[r].items[k+tpIdx].rv);ttpIdx=vl.values.length-1;}vl.ttm[gsi.mx[tpIdx].did]={val:vl.values[ttpIdx],n:gsi.mx[tpIdx].n};});}vls[rIdx][cIdx].push(vl);}}}}}}}}this.cellGvs=vls;debugTimerEnd("_splitGVS");},fetchGVS:function fetchGVS(rIdx,cIdx){return this.cellGvs&&this.cellGvs[rIdx][cIdx];},mapChartToTemplatePartition:function mapChartToTemplatePartition(rIdx,cIdx){var inChartLayout=this._getInChartLayout(),row=Math.floor(rIdx/inChartLayout.r),col=Math.floor(cIdx/inChartLayout.c);var data=this.getData(),ptt=data.ptt;return{r:ptt.row[row],c:ptt.col[col]};},_headerInfoToProp:function _headerInfoToProp(axis,hdObj,props){var gts=this.getData().gts;return translateLowestHeaderInfo(axis===0?gts.row:gts.col,[hdObj],props)[0];},_createModelRhs:function _createModelRhs(){debugTimer("create ModelRhs");var modelRhs=this.modelRhs,data=this.getData(),dz=data.dz,ghs=data.ghs,rhs=ghs.rhs,items=rhs.items,gtsRow=data.gts.row,rowLen=gtsRow.length,tui,props;if(!items){return ;}for(var ii=0;ii<rowLen;ii++){this.modelRhs.push({});}var rowCnt=items.length;if(rowCnt===1){var attrOnRows=dz.Rows.TemplateUnit&&dz.Rows.TemplateUnit.length||0,attrOnYAxis=dz.YAxis.TemplateUnit&&dz.YAxis.TemplateUnit.length||0;if(this.eg||(rowLen===0&&(attrOnRows+attrOnYAxis===0))){rowCnt=0;}}for(var i=0;i<rowCnt;i++){var hds=items[i].items,lastIdx=hds.length;while(lastIdx--){var lastHd=$HASH.copy(hds[lastIdx]);lastHd.headerID=lastHd.idx;tui=lastHd.tui;if(lastHd.stt){lastHd.headerText="Subtotal";lastHd.headerID=-1;}else{if(lastHd.idx>=0){props=this._headerInfoToProp(0,lastHd,["n","bftp","id"]);lastHd.headerText=encodeString(props.n);lastHd.bftp=props.bftp;lastHd.id=props.id;if(lastHd.cet){var selInfo=this.cetSelectors=this.cetSelectors||{attrs:[],metrics:[]},unit=gtsRow[tui],elem=unit.es[lastHd.idx];selInfo.attrs.push({tid:lastHd.cet,id:elem.id,n:elem.n});}}else{lastHd.headerText="";}}if(lastHd.dpt===undefined){lastHd.dpt=tui+1;}var hdsInLevel=modelRhs[tui];if(!hdsInLevel[lastHd.o]){hdsInLevel[lastHd.o]={forms:[]};hdsInLevel.length=hdsInLevel.length===undefined?1:hdsInLevel.length++;}hdsInLevel[lastHd.o].forms.unshift(lastHd);}}for(i=1;i<data.gts.row.length;i++){createPhsRef(modelRhs[i-1],modelRhs[i],"rs");}debugTimerEnd("create ModelRhs");},_createModelChs:function _createModelChs(){debugTimer("create ModelChs");var i,j,modelChsLvl,modelChs=this.modelChs,data=this.getData(),ghs=data.ghs,chs=ghs.chs,items=chs.items,gts=data.gts,gtsCol=gts.col,depthinfo,tui,hdsInLvl,chsInLvlLen,maxColDepth,unit,props;if(!items){return ;}for(j=0;j<gtsCol.length;j++){this.modelChs.push({});}var ucC=items.length;for(i=0;i<ucC;i++){depthinfo=getDepthAndFormFromColOrRow(gtsCol,i,false);tui=depthinfo.depth;unit=gtsCol[tui];maxColDepth=tui;modelChsLvl=modelChs[tui];hdsInLvl=items[i].items;chsInLvlLen=hdsInLvl.length;for(j=0;j<chsInLvlLen;j++){var hd=hdsInLvl[j];if(!modelChsLvl[hd.o]){modelChsLvl[hd.o]={forms:[]};}modelChsLvl[hd.o].forms.push(hd);if(hd.rs!==undefined&&hd.rs>1){var rs=hd.rs;for(var tt=0;tt<rs-1;tt++){var hdCpy=$HASH.copy(hd);hdCpy.rs=1;hdCpy.headerText="";modelChsLvl[hd.o].forms.push(hdCpy);}}hd.headerID=hd.idx;if(hd.idx>=0){props=this._headerInfoToProp(1,hd,["n","bftp","id"]);hd.headerText=encodeString(props.n);hd.bftp=props.bftp;hd.id=props.id;if(hd.cet){var selInfo=this.cetSelectors=this.cetSelectors||{attrs:[],metrics:[]},elem=unit.es[hd.idx];if(elem){selInfo.attrs.push({tid:hd.cet,id:elem.id,n:elem.n});}}}else{hd.headerText="";}if(hd.fi!==undefined){if(gtsCol[tui].otp===12){hd.fid=gtsCol[tui].fs[hd.fi].id;}else{if(gtsCol[tui].otp>=0){hd.fid=gtsCol[tui].id;}}}if(hd.stt){hd.headerID=-1;hd.cs=hd.cs||hd.rs;}if(hd.dpt===undefined){hd.dpt=tui+1;}}}var col,len;for(i=0,len=gtsCol.length;i<len;i++){col=gtsCol[i];if(typeof col.t==="number"&&col.t===1){if(!col.rs||col.rs<=1){continue;}modelChsLvl=modelChs[i];modelChsLvl.isCustomGroupWithBanding=true;mergeCGForm(modelChsLvl,"c");}}for(i=1;i<=maxColDepth;i++){createPhsRef(modelChs[i-1],modelChs[i],"cs");}debugTimerEnd("create ModelChs");},getRowHeaderTree:function getRowHeaderTree(){return this._getHeaderTree(this.modelRhs,"Rows");},getColHeaderTree:function getColHeaderTree(){return this._getHeaderTree(this.modelChs,"Columns");},getRowHeaderTitles:function getRowHeaderTitles(){return this._getMatrixHeaderTitles("Rows");},getColumnHeaderTitles:function getColumnHeaderTitles(){return this._getMatrixHeaderTitles("Columns");},getXAxisHeaderTitles:function getXAxisHeaderTitles(rIdx,cIdx){return this._getAxisHeaderTitles("XAxis",rIdx,cIdx);},getYAxisHeaderTitles:function getYAxisHeaderTitles(rIdx,cIdx){return this._getAxisHeaderTitles("YAxis",rIdx,cIdx);},getBreakByHeaderTitles:function getBreakByHeaderTitles(rIdx,cIdx){return this._getAxisHeaderTitles("BreakBy",rIdx,cIdx);},getXAxisHeaders:function getXAxisHeaders(rIdx,cIdx){return this._getAxisHeaders("XAxis",rIdx,cIdx);},getYAxisHeaders:function getYAxisHeaders(rIdx,cIdx){return this._getAxisHeaders("YAxis",rIdx,cIdx);},getBreakByHeaders:function getBreakByAxisHeaders(rIdx,cIdx){return this._getAxisHeaders("BreakBy",rIdx,cIdx);},hasSizeBy:function hasSizeBy(){var szBy=this.getData().dz.SizeBy.TemplateMetric;return !!szBy&&szBy.length>0;},hasBreakBy:function hasBreakBy(){var bb=this.getData().dz.BreakBy;return bb.TemplateUnit&&bb.TemplateUnit.length>0||bb.hasOwnProperty("MetricNames");},hasColorBy:function hasColorBy(){var dz=this.getData().dz.ColorBy;return dz.TemplateUnit&&dz.TemplateUnit.length>0||dz.TemplateMetric&&dz.TemplateMetric.length>0||dz.hasOwnProperty("MetricNames");},hasAttributesInDropzone:function(zone){var dz=this.getData().dz,tu=dz[zone].TemplateUnit;return(tu&&tu.length>0);},getSizeByMetrics:function(){return this._getSizeByMetricIndex();},_getMatrixHeaderTitles:function _getMatrixHeaderTitles(zone){if(zone!=="Rows"&&zone!=="Columns"){return[];}var data=this.getData(),gsi=data.gsi,list=gsi[zone==="Rows"?"rows":"cols"],units=data.dz[zone].TemplateUnit;return(units||[]).map(function(unit){var el=$ARR.filterOne(list,function(u){return u.did===unit.id;});return el&&el.n;});},_getAxisHeaders:function _getAxisHeaders(zone,rIdx,cIdx){var data=this.getData(),gsi=data.gsi,list=gsi.rows.concat(gsi.cols),tu=data.dz[zone].TemplateUnit,tm=data.dz[zone].TemplateMetric,res=[];if(tu){res=(tu||[]).map(function(unit){var el=$ARR.filterOne(list,function(u){return u.did===unit.id;});return{n:el&&el.n,id:unit.id,t:unit.t};});}else{if(tm){var r=rIdx%this.plottingMetricsIndex.length,c=cIdx%this.plottingMetricsIndex[0].length,mxs=this.plottingMetricsIndex[r][c];mxs.forEach(function(shape){shape.forEach(function(mxIdx){if($ARR.find(tm,"id",gsi.mx[mxIdx].did)>=0){res.push({n:gsi.mx[mxIdx].n,id:gsi.mx[mxIdx].did,mIdx:mxIdx});}});});}}return res;},_getAxisHeaderTitles:function _getAxisHeaderTitles(zone,rIdx,cIdx){var data=this.getData(),gsi=data.gsi,list=gsi.rows.concat(gsi.cols),tu=data.dz[zone].TemplateUnit,tm=data.dz[zone].TemplateMetric,res=[];if(tu){res=(tu||[]).map(function(unit){var el=$ARR.filterOne(list,function(u){return u.did===unit.id;});return el&&el.n;});}else{if(tm){var r=rIdx%this.plottingMetricsIndex.length,c=cIdx%this.plottingMetricsIndex[0].length,mxs=this.plottingMetricsIndex[r][c];mxs.forEach(function(dps){dps.forEach(function(mxIdx){if($ARR.find(tm,"id",gsi.mx[mxIdx].did)>=0){res.push(gsi.mx[mxIdx].n);}});});}}return res;},_getTitleDepth:function(titles,dz){var depth=-1,len=(dz.TemplateUnit||[]).length;for(var i=0;i<titles.length;i++){var title=titles[i];for(var j=0;j<len;j++){var unit=dz.TemplateUnit[j];if(title.id===unit.id){depth=i;}}}return depth;},getHeaderPath:function(rIdx,cIdx){if(cIdx<0||cIdx>=this.getMatrixDimension().c){throw"cIdx out of range";}if(rIdx<0||rIdx>=this.getMatrixDimension().r){throw"rIdx out of range";}var modelRhs=this.modelRhs,modelChs=this.modelChs,data=this.getData(),dz=data.dz,gts=data.gts,row=gts.row,col=gts.col,rowDpt=this._getTitleDepth(row,dz.Rows),colDpt=this._getTitleDepth(col,dz.Columns),rStep=this._getInChartLayout().r,cStep=this._getInChartLayout().c,path=[];var generatePath=function(xDpt,modelXhs,xIdx,path){if(xDpt<0||xDpt>=modelXhs.length||xIdx>=Object.keys(modelXhs[xDpt]).length){return path;}var idx,dpt,hd;for(dpt=xDpt,idx=Object.keys(modelXhs[dpt])[xIdx];dpt>=0&&idx>=0;dpt--,idx=hd&&hd.pHd?hd.pHdIdx:-1){hd=modelXhs[dpt][idx];path.splice(0,0,hd);}};generatePath(colDpt,modelChs,Math.floor(cIdx/cStep),path);generatePath(rowDpt,modelRhs,Math.floor(rIdx/rStep),path);return path;},_isAttrInZone:function(attrId,zoneName){var data=this.getData(),dz=data.dz,tu=dz[zoneName].TemplateUnit;return $ARR.find(tu,"id",attrId)>=0;},getAxisLabels:function(rIdx,cIdx){this._cacheLabels=this._cacheLabels||[];this._cacheLabels[rIdx]=this._cacheLabels[rIdx]||[];if(!this._cacheLabels[rIdx][cIdx]){var me=this,data=this.getData(),gts=data.gts,ptt=data.ptt,cct=data.dm.cct,rct=data.dm.rct,colPtt=ptt.col.concat([cct]),rowPtt=ptt.row.concat([rct]),inChartLayout=this._getInChartLayout();function calcLabels(list,listPtt,xIdx,modelXhs,zone){var lvStart=-1,lvEnd=-1,res=[];list.forEach(function(unit,idx){var unitid=unit.hid||unit.id;if(unitid){if(me._isAttrInZone(unitid,zone)){lvStart=lvStart>=0?lvStart:idx;lvEnd=idx>lvEnd?idx:lvEnd;}}});if(lvStart>=0&&lvEnd>=lvStart){for(var i=listPtt[xIdx];i<listPtt[xIdx+1];i++){var lv=lvEnd,p=modelXhs[lv][i],lb="",id="";if(!p){continue;}while(lv>=lvStart){if(p.forms&&p.forms[0]){if(p.forms[0].mix===undefined){lb=me._hashAttrElem[p.forms[0].id].headerText+(lv===lvEnd?"":"|")+lb;id=p.forms[0].id+(lv===lvEnd?"":";")+id;}}p=p.pHd;lv--;}res.push({id:id,text:lb});}}return res;}this._cacheLabels[rIdx][cIdx]={x:calcLabels(gts.col,colPtt,Math.floor(cIdx/inChartLayout.c),this.modelChs,"XAxis"),y:calcLabels(gts.row,rowPtt,Math.floor(rIdx/inChartLayout.r),this.modelRhs,"YAxis")};}return this._cacheLabels[rIdx][cIdx];},_getHeaderTree:function _getHeaderTree(modelXhs,dzName){var me=this,data=this.getData(),dz=data.dz,hdDpt=dz[dzName].TemplateUnit&&dz[dzName].TemplateUnit.length||0,headerTree=[],i;function generateXHT(ndModelXhs,depth){var ndHT;if(depth<hdDpt){var form=ndModelXhs.forms[0],did=dzName==="Rows"?data.gsi.rows[form.ui].did:data.gsi.cols[form.ui].did,headerText=form.headerText;if(ndModelXhs.forms.length>1){headerText=ndModelXhs.forms.reduce(reducerHeaderText,"");}ndHT={tui:form.tui,ui:form.ui,fi:form.idx,at:form.at,dei:form.dei,eid:form.id,tid:did,t:form.mix!==undefined?OBJECT_TYPE.Metric:OBJECT_TYPE.Attribute,headerText:headerText,dropzones:me._dropZoneCache[did]};if(form.mix!==undefined){ndHT.mix=form.mix;}if(ndModelXhs.children){ndModelXhs.children.forEach(function(nd){var chd=generateXHT(nd,depth+1);if(chd){ndHT.children=ndHT.children||[];ndHT.children.push(chd);}});}headerTree[depth]=headerTree[depth]||[];headerTree[depth].push(ndHT);}return ndHT;}var mx=[],pushMetric=function(m,idx){if(m.length){mx.push(m[idx||0]);}else{mx.push(m);}},mm;if(dzName==="Rows"){for(i=0;i<this.plottingMetricsIndex.length;i++){mm=this.plottingMetricsIndex[i][0];pushMetric((mm[0]||mm),(mm[0]||mm).length-1);}}else{for(i=0;i<this.plottingMetricsIndex[0].length;i++){mm=this.plottingMetricsIndex[0][i];pushMetric((mm[0]||mm));}}var arrMetrics=me._getMetrics();function addMetrics(colHd,dpt){mx.forEach(function(mIdx){var chd={t:OBJECT_TYPE.Metric,idx:mIdx,headerText:arrMetrics[mIdx].n,dropzones:me._dropZoneCache[arrMetrics[mIdx].oid]};if(colHd){colHd.children=colHd.children||[];colHd.children.push(chd);}headerTree[dpt]=headerTree[dpt]||[];headerTree[dpt].push(chd);});}if(hdDpt>0){for(i in modelXhs[0]){if(modelXhs[0].hasOwnProperty(i)&&!isNaN(filterInt(i))){generateXHT(modelXhs[0][i],0);}}}if(dzName==="Rows"?me.hasMetricNamesInYHeader():me.hasMetricNamesInXHeader()){var len=headerTree.length;if(len>0){var leaves=headerTree[len-1],leafLen=leaves.length;for(i=0;i<leafLen;i++){var colHd=leaves[i];addMetrics(colHd,len);}}else{addMetrics(null,len);}}debugPrint(dzName+" header tree");debugPrint(headerTree);return headerTree;},hasMetricNamesInXHeader:function(){var data=this.getData();return this._isMetricsSplitByColumn()&&getMetricsOnDropZone(data,"XAxis",true).length<1;},hasMetricNamesInYHeader:function(){var data=this.getData();return this._isMetricsSplitByRow()&&getMetricsOnDropZone(data,"YAxis",true).length<1;},getMatrixDimension:function getMatrixDimension(){var data=this.getData(),dim=data.dm||{},cic=dim.cic||0,cir=dim.cir||0,inChartLayout=this._getInChartLayout();return{r:cic*inChartLayout.r||1,c:cir*inChartLayout.c||1};},_isAttrInAxis:function _isAttrInAxis(name){var data=this.getData(),dz=data.dz,axis=dz[name];return axis.TemplateUnit&&axis.TemplateUnit.length>0;},isAttrInXAxis:function isAttrInXAxis(){return this._isAttrInAxis("XAxis");},isAttrInYAxis:function isAttrInYAxis(){return this._isAttrInAxis("YAxis");},_isMetricInAxis:function _isMetricInAxis(name){var data=this.getData(),dz=data.dz,axis=dz[name];return axis.TemplateMetric&&axis.TemplateMetric.length>0;},isMetricInXAxis:function isMetricInXAxis(){return this._isMetricInAxis("XAxis");},isMetricInYAxis:function isMetricInYAxis(){return this._isMetricInAxis("YAxis");},isUnitInTooltip:function isUnitInTooltip(id){var data=this.getData(),dz=data.dz,ttp=dz.AdditionalMetrics,tu=ttp.TemplateUnit||[],tm=ttp.TemplateMetric||[],res=[];(tu.concat(tm)||[]).forEach(function(u){if(u.id===id){res.push(u);}});return res.length>0;},getTooltipItems:function getTooltipItems(){var data=this.getData(),dz=data.dz,ttp=dz.AdditionalMetrics,tu=ttp.TemplateUnit||[],tm=ttp.TemplateMetric||[];return tu.concat(tm);},getRowHeaderObj:function getRowHeaderObj(rowIndex,colIdx){var modelRhs=this.modelRhs,depthAndFormIndex=getDepthAndFormFromColOrRow(this.getData().gts.row,colIdx,true),depth=depthAndFormIndex.depth,formIndex=depthAndFormIndex.formIndex,aColOfRhs=modelRhs[depth],idx=rowIndex;while(aColOfRhs[idx]===undefined&&idx>=0){idx--;}if(idx>=0){var o=aColOfRhs[idx].forms[formIndex];if(!o.rs){o.rs=1;}if(o.o<=rowIndex&&(o.o+o.rs)>rowIndex){return o;}}},getColHeaderObj:function(colIndex,rowIdx){var modelChs=this.modelChs,depthAndFormIndex=getDepthAndFormFromColOrRow(this.getData().gts.col,rowIdx,false),depth=depthAndFormIndex.depth,formIndex=depthAndFormIndex.formIndex,aRowOfChs=modelChs[depth],idx=colIndex;while(aRowOfChs[idx]===undefined&&idx>=0){idx--;}if(idx>=0){var o=aRowOfChs[idx].forms[formIndex];if(!o.cs){o.cs=1;}if(o.o<=colIndex&&(o.o+o.cs)>colIndex){return o;}}},getUnitAttributesCountOnRow:function(containAttrForm){var data=this.getData(),dz=data.dz,rows=data.gts.row,gtsRowUnitCont=rows.length,attrOnRowsCnt,attrOnYAxisCnt,attrOnBreakByCnt,result=0;if(gtsRowUnitCont!==1){if(containAttrForm){$ARR.forEach(rows,function(attr){result+=getAttributeFormCnt(attr);});}else{result=gtsRowUnitCont;}return result;}attrOnRowsCnt=dz.Rows.TemplateUnit?dz.Rows.TemplateUnit.length:0;attrOnYAxisCnt=dz.YAxis.TemplateUnit?dz.YAxis.TemplateUnit.length:0;attrOnBreakByCnt=dz.BreakBy.TemplateUnit?dz.BreakBy.TemplateUnit.length:0;if(this.chartType===mstrmojo.ngm.EnumGraphType.NORMAL&&this.NormalChartDirection===mstrmojo.ngm.EnumGraphDirection.HORIZONTAL){return attrOnRowsCnt+attrOnYAxisCnt;}return attrOnRowsCnt+attrOnBreakByCnt+attrOnYAxisCnt;},getUnitAttributesCountOnCol:function(containAttrForm){var i,cols=this.getData().gts.col,ucC=cols.length,attrCnt=ucC;var lastUntOnCol=cols[ucC-1];if(lastUntOnCol&&lastUntOnCol.otp===-1){attrCnt=ucC-1;}if(containAttrForm){var attrFormCnt=0;for(i=0;i<attrCnt;i++){attrFormCnt+=getAttributeFormCnt(cols[i]);}return attrFormCnt;}else{return attrCnt;}},getMetricProp:function(prop){var res=[],i,cnt,es=this._getMetrics();cnt=es.length;for(i=0;i<cnt;i++){var m=es[i];if(prop){res.push(m[prop]);}else{res.push(m);}}return res;},getRowTitleInfo:function(){if(!this.rwTtInfo){var gts=this.getData().gts,row=gts.row,lbs=[],cnt=row.length,i;for(i=0;i<cnt;i++){lbs=lbs.concat(getFormsOfAttr(row[i],true,i,this.ttlDispTp));}this.rwTtInfo=lbs;}return this.rwTtInfo;},getColTitleInfo:function(){if(!this.colTtInfo){var gts=this.getData().gts,col=gts.col,lbs=[],cnt=col.length,i;for(i=0;i<cnt;i++){lbs=lbs.concat(getFormsOfAttr(col[i],false,i,this.ttlDispTp));}this.colTtInfo=lbs;}return this.colTtInfo;},getSorts:function(){return this.getData().gsi.sorts;},getMetricIDsFromIndex:function(idxArr){var mxArr=this._getMetrics()||[],res=[];idxArr.forEach(function(mxIdx){if(mxArr[mxIdx]){res.push(mxArr[mxIdx].oid);}});return res;}});mstrmojo.ngm.NewGMJSONModel.UnitTest_API={filterInt:filterInt,decodeHTMLText:decodeHTMLText,fetchHeaderProps:fetchHeaderProps,getMetricIndexFromID:getMetricIndexFromID,getMetricNamesPosition:getMetricNamesPosition};}());