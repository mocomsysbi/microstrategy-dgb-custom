function invokeTask(url,onRSChangeFn){if(window.XMLHttpRequest){req=new XMLHttpRequest();req.onreadystatechange=onRSChangeFn;req.open("POST",url,true);req.setRequestHeader("X-Requested-With","XMLHttpRequest");req.send(null);}else{if(window.ActiveXObject){req=new ActiveXObject("Microsoft.XMLHTTP");if(req){req.onreadystatechange=onRSChangeFn;req.open("POST",url,true);req.send();}}else{alert("Unable to create an instance of an XMLHttpRequest object.");}}}function processReadyStateChange(textAreaID,spanID){if(req.readyState==4){if(req.status==200){var taObj=document.getElementById(textAreaID);if(!taObj){alert("Unable to locate TEXTAREA with id="+textaAreaID);return ;}var divObj=taObj.parentNode;if(divObj){divObj.style.display="block";}var responseText=req.responseText;responseText=responseText.replace(/^[\s\n]+/,"");responseText=responseText.replace(/[\s\n]+$/,"");taObj.value=responseText;if(typeof (convertResponseTextToHTML)!="undefined"){var spanObj=document.getElementById(spanID);if(!spanObj){alert("Unable to locate SPAN with id="+spanID);return ;}spanObj.style.display="inline";}}else{alert("There was a problem retrieving data: "+req.statusText);}}}function createPopupViewerFromTextArea(taID){var taObj=document.getElementById(taID);if(!taObj){alert("Unable to find TEXTAREA with id="+taID);return ;}createPopupViewerFromString(taObj.value);}function createPopupViewerFromString(responseText){var w=window.open("","popupViewer","resizable,width=600,height=400");var d=w.document;d.writeln(convertResponseTextToHTML(responseText));d.close();}