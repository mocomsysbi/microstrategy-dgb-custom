(function(){function getElementPropertyValue(name){var idx=this.h.idx;if(idx!==-1){return this.t.es[idx][name];}return"";}mstrmojo.models.template.Header=mstrmojo.declare(null,null,{init:function init(props){this.h=props.h;this.t=props.t;},getName:function getName(){return getElementPropertyValue.call(this,"n");},getElementId:function getElementId(){return getElementPropertyValue.call(this,"id");},getObjectId:function getId(){return getElementPropertyValue.call(this,"oid");},getElementIndex:function getElementIndex(){return this.h.idx;},getActionType:function getActionType(){return this.h.at;},isTotal:function isTotal(){return this.h.otr===1;},getFormIndex:function getFormIndex(){return this.h.fi;}});}());