(function(){mstrmojo.requiresCls("mstrmojo.dom");var $D=mstrmojo.dom;function replaceImage(srcNode,imageSrc,newNode,callback){var xhr=new XMLHttpRequest();xhr.onload=function(){if(this.status===200){var uInt8Array=new Uint8Array(this.response);var i=uInt8Array.length;var binaryString=new Array(i);while(i--){binaryString[i]=String.fromCharCode(uInt8Array[i]);}var data=binaryString.join("");var base64=window.btoa(data);newNode.src="data:image/png;base64,"+base64;newNode.origNode=srcNode;srcNode.parentNode.replaceChild(newNode,srcNode);}if(callback){callback();}};xhr.onerror=xhr.onabort=xhr.ontimeout=function(){if(callback){callback();}};xhr.open("GET",imageSrc,true);xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.responseType="arraybuffer";xhr.send();}function fnReplaceMapTiles(callbackFn){var images=this.getRootDivForPDF().getElementsByTagName("img"),imageLen=images.length,fCnt=0,i,cb=function(){fCnt++;if(fCnt===imageLen){if(callbackFn){callbackFn();}}};for(i=0;i<imageLen;i++){var imageNode=images[i];replaceImage(imageNode,imageNode.src,imageNode.cloneNode(true),cb);}}function parseMatrix(match){if(match&&match[1]==="matrix"){return match[2].split(",").map(function(s){return parseFloat(s.trim());});}else{if(match&&match[1]==="matrix3d"){var matrix3d=match[2].split(",").map(function(s){return parseFloat(s.trim());});return[matrix3d[0],matrix3d[1],matrix3d[4],matrix3d[5],matrix3d[12],matrix3d[13]];}}}function substStyles(node){var CSS_TRANSFORM=this.getCssTransform?this.getCssTransform():$D.CSS3_TRANSFORM;function fnSubst(node){var transform=mstrmojo.css.getStyleValue(node,CSS_TRANSFORM);var matrix=transform?parseMatrix(transform.match(/(matrix|matrix3d)\((.+)\)/)):null;var transformMatrix=matrix||[1,0,0,1,0,0];if(transformMatrix.join(",")!=="1,0,0,1,0,0"){node.exportHack=mstrmojo.hash.copy({left:node.style.left,top:node.style.top,transform:transform},node.exportHack);node.style.left=((parseInt(node.style.left,10)||0)+transformMatrix[4])+"px";node.style.top=((parseInt(node.style.top,10)||0)+transformMatrix[5])+"px";node.style[CSS_TRANSFORM]="none";}if(node.style.clip.match(/^rect\(auto,? auto,? auto,? auto\)$/)){node.exportHack=mstrmojo.hash.copy({clip:node.style.clip},node.exportHack);node.style.clip="auto";}if(node.children){for(var i=0;i<node.children.length;i++){fnSubst(node.children[i]);}}}fnSubst(node);}function reviveStyles(node){var CSS_TRANSFORM=this.getCssTransform?this.getCssTransform():$D.CSS3_TRANSFORM;function fnRevive(node){if(node.exportHack){if(node.exportHack.transform){node.style.left=node.exportHack.left;node.style.top=node.exportHack.top;node.style[CSS_TRANSFORM]=node.exportHack.transform;}if(node.exportHack.clip){node.style.clip=node.exportHack.clip;}delete node.exportHack;}if(node.children){for(var i=0;i<node.children.length;i++){fnRevive(node.children[i]);}}}fnRevive(node);}function reviveImages(){var images=this.getRootDivForPDF().getElementsByTagName("img"),i;for(i=0;i<images.length;i++){var imgNode=images[i];if(imgNode.origNode){imgNode.parentNode.replaceChild(imgNode.origNode,imgNode);delete imgNode.origNode;}}}function createPDF(cvs){var pdf=new jsPDF("l","pt","letter"),margins={top:25,bottom:60,left:60},dim={w:792-2*margins.left,h:612-2*margins.top};var ratio=Math.min(dim.w/cvs.width,dim.h/cvs.height),gap={h:(dim.w-cvs.width*ratio)/2,v:(dim.h-cvs.height*ratio)/2},args=[cvs.toDataURL("image/png"),margins.left+gap.h,margins.top+gap.v,cvs.width*ratio,cvs.height*ratio,"JPEG",null,"SLOW"];pdf.addImage.apply(pdf,args);return pdf;}mstrmojo.gmaps._CanExportPDF=mstrmojo.provide("mstrmojo.gmaps._CanExportPDF",{isClientExport:true,getExtraNodeForPDF:function getExtraNodeForPDF(){return[];},getRootDivForPDF:function getRootDivForPDF(){return this.parent.domNode;},preExportHook:function preExportHook(callbackFn){if(callbackFn){callbackFn();}},postExportHook:mstrmojo.emptyFn,hideMapTools:mstrmojo.emptyFn,showMapTools:mstrmojo.emptyFn,replaceImage:replaceImage,replaceMapTiles:fnReplaceMapTiles,substituteStyles:substStyles,reviveStyles:reviveStyles,reviveImages:reviveImages,exportVisualization:function exportVisualization(type){if(type!=3){return ;}if(mstrApp.isSingleTier){var me=this;var toolbarDisplay=this.toolbar.domNode.style.display;this.hideMapTools();this.toolbar.domNode.style.display="none";setTimeout(function(){var bounds=me.getRootDivForPDF().getBoundingClientRect();var imageSrc=window.FormWrapper.getScreenCapture();imageSrc="data:image/png;base64,".concat(imageSrc);me.toolbar.domNode.style.display=toolbarDisplay;me.showMapTools();mstrApp.showWait({showCancel:true});if(mstrmojo.all.waitBox){var oldClick=mstrmojo.all.waitBox.cancelBtn.onclick;mstrmojo.all.waitBox.cancelBtn.onclick=function(){mstrApp.hideWait();mstrmojo.all.waitBox.cancelBtn.onclick=oldClick;};}var image=new Image();image.onload=function(){var canvas=document.createElement("canvas");canvas.width=bounds.width;canvas.height=bounds.height;var ctx=canvas.getContext("2d");var ratio;try{ratio=(image.width/document.body.getBoundingClientRect().width)||1;}catch(X){ratio=1;}ctx.drawImage(image,bounds.left*ratio,(bounds.top-30)*ratio,bounds.width*ratio,bounds.height*ratio,0,0,bounds.width,bounds.height);var pdf=createPDF(canvas);window.FormWrapper.saveToLocalDisk(btoa(pdf.output()),".pdf",me.parent.title||"visualization");mstrApp.hideWait();};image.src=imageSrc;},100);}else{mstrApp.showWait({showCancel:true});if(mstrmojo.all.waitBox){var oldClick=mstrmojo.all.waitBox.cancelBtn.onclick;mstrmojo.all.waitBox.cancelBtn.onclick=function(){mstrApp.hideWait();mstrmojo.all.waitBox.cancelBtn.onclick=oldClick;};}if(!window.jsPDF||!window.html2canvas||!window.canvg){this.loadScripts();}else{this.renderVis();}}},loadScripts:function(){var scriptsObjectArray=[];scriptsObjectArray.push({url:"../javascript/libraries/html2canvas.js"});scriptsObjectArray.push({url:"../javascript/libraries/html2canvas.svg.js"});scriptsObjectArray.push({url:"../javascript/libraries/jspdf.js"});scriptsObjectArray.push({url:"../javascript/libraries/canvg/rgbcolor.js"});scriptsObjectArray.push({url:"../javascript/libraries/canvg/StackBlur.js"});scriptsObjectArray.push({url:"../javascript/libraries/canvg/canvg.js"});var me=this;me.requiresExternalScripts(scriptsObjectArray,function(){me.renderVis();});},renderVis:function(){var me=this,options={useCORS:true,pagesplit:true,logging:false},toolbarDisplay=this.toolbar.domNode.style.display;this.toolbar.domNode.style.display="none";this.hideMapTools();function printImg(cvs){var pdf=createPDF(cvs);var alwaysSave=true,approach="dataurlnewwindow",argv=(me.parent.title||"visualization")+".pdf";if(alwaysSave){approach="save";}else{var max=2097152,str=pdf.output("dataurlstring");if(str.length*2>max){approach="save";}}pdf.output(approach,argv);mstrApp.hideWait();me.toolbar.domNode.style.display=toolbarDisplay;me.showMapTools();if(me.postExportHook){me.postExportHook();}}options.onrendered=function(cvs){var cnt=0,nodes=me.getExtraNodeForPDF();if(nodes.length>0){var paintNode=function(i){canvg(cvs,nodes[i].outerHTML,{ignoreClear:true,ignoreDimensions:true,renderCallback:function(){cnt++;if(cnt>=nodes.length){printImg(cvs);}else{paintNode(i+1);}}});};try{paintNode(0);}catch(e){printImg(cvs);}}else{printImg(cvs);}};if(this.preExportHook){this.preExportHook(function(){html2canvas(me.getRootDivForPDF(),options);});}}});}());