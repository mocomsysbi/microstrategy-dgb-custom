(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.hash");var CLASS_NAME="SubscriptionsDataService";mstrmojo.SubscriptionsDataService=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.SubscriptionsDataService",getSubscriptions:function getSubscriptions(callback,noWait){$MAPF(true,CLASS_NAME);try{mstrApp.serverRequest({taskId:"getSubscriptions"},callback,{src:CLASS_NAME+"::getSubscriptions",override:true,showWait:!noWait,hideWait:!noWait,delay:false,skipLogin:true,noTaskURL:true});return false;}finally{$MAPF(false,CLASS_NAME);}}});}());