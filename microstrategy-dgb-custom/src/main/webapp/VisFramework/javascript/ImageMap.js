var boneId=getURLParameter(window.location.href,"boneId");var microstrategy=window.parent.microstrategy;var gridBone;var attId;var curSelection;var imageMapName="imgmap";function makeSelection(value){if(isSelectable()){getGridBone().makeSelectionByName(value,attId);changeImgSrc(value);curSelection=value;}}function setDefaultSelection(){if(getGridBone()&&getGridBone().getSelectionData){curSelection=getSelectionName();changeImgSrc(curSelection);}}function getSelectionName(){var sd=getGridBone().getSelectionData(attId);if(sd&&sd.el&&sd.sel){for(var e in sd.el){if(sd.el[e].id==sd.sel[0]){return e;}}}return"";}function changeImgSrc(value){var imgElem=document.getElementById(imageMapName);if(imgElem&&value){imgElem.src=value+".png";}}function getGridBone(){if(!gridBone&&microstrategy){var gridBone=microstrategy.bone(boneId);}return gridBone;}function isSelectable(){return getGridBone()&&getGridBone().makeSelection&&getGridBone().getSelectionData&&(typeof (getGridBone().getSelectionData())!="undefined");}