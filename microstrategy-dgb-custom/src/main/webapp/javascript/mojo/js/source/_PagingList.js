(function(){mstrmojo.requiresCls("mstrmojo.registry");mstrmojo._PagingList=mstrmojo.provide("mstrmojo._PagingList",{usePaging:false,page:0,totalPages:1,_set_page:function(n,p){if(this.page!==p&&this.usePaging){if(p>=0&&p<this.totalPages){this.page=p;}return true;}return false;},_inScroll:false,_inPaging:false,onscroll:function(){if(this.usePaging&&!this._inPaging){this._inScroll=true;this.set("page",this.listMapper.whichPage(this));this._inScroll=false;}if(this._super){this._super();}}});}());