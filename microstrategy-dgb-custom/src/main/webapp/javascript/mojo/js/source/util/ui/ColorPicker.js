(function(){mstrmojo.requiresDescs(5774,2266,2287,2496,2495,2493,2267,2498,2500,2279,2491,2476,2271,2478,2268,2492,2273,2280,2490,2488,2494,2487,2269,2477,2499,2292,2489,2281,2484,2483,2480,2497,2274,2485,2486,2282,2481,2479,2482,2290,2293);var basicColors=[{n:mstrmojo.desc(5774,"No Fill"),id:"transparent"},{n:mstrmojo.desc(2266,"Black"),id:"#000000"},{n:mstrmojo.desc(2287,"Brown"),id:"#993300"},{n:mstrmojo.desc(2496,"Olive Green"),id:"#333300"},{n:mstrmojo.desc(2495,"Dark Green"),id:"#003300"},{n:mstrmojo.desc(2493,"Dark Teal"),id:"#003366"},{n:mstrmojo.desc(2267,"Dark Blue"),id:"#000080"},{n:mstrmojo.desc(2498,"Indigo"),id:"#333399"},{n:mstrmojo.desc(2500,"Grey-80%"),id:"#333333"},{n:mstrmojo.desc(2279,"Dark Red"),id:"#800000"},{n:mstrmojo.desc(2491,"Orange"),id:"#ff6600"},{n:mstrmojo.desc(2476,"Dark Yellow"),id:"#808000"},{n:mstrmojo.desc(2271,"Green"),id:"#008000"},{n:mstrmojo.desc(2478,"Teal"),id:"#008080"},{n:mstrmojo.desc(2268,"Blue"),id:"#0000ff"},{n:mstrmojo.desc(2492,"Blue-Grey"),id:"#666699"},{n:mstrmojo.desc(2273,"Grey-50%"),id:"#808080"},{n:mstrmojo.desc(2280,"Red"),id:"#ff0000"},{n:mstrmojo.desc(2490,"Light Orange"),id:"#ff9900"},{n:mstrmojo.desc(2488,"Lime"),id:"#99cc00"},{n:mstrmojo.desc(2494,"Sea Green"),id:"#339966"},{n:mstrmojo.desc(2487,"Aqua"),id:"#33cccc"},{n:mstrmojo.desc(2269,"Light Blue"),id:"#3366ff"},{n:mstrmojo.desc(2477,"Violet"),id:"#800080"},{n:mstrmojo.desc(2499,"Grey-40%"),id:"#969696"},{n:mstrmojo.desc(2292,"Pink"),id:"#ff00ff"},{n:mstrmojo.desc(2489,"Gold"),id:"#ffcc00"},{n:mstrmojo.desc(2281,"Yellow"),id:"#ffff00"},{n:mstrmojo.desc(2484,"Bright Green"),id:"#00ff00"},{n:mstrmojo.desc(2483,"Turquoise"),id:"#00ffff"},{n:mstrmojo.desc(2480,"Sky Blue"),id:"#00ccff"},{n:mstrmojo.desc(2497,"Plum"),id:"#993366"},{n:mstrmojo.desc(2274,"Grey-25%"),id:"#c0c0c0"},{n:mstrmojo.desc(2485,"Rose"),id:"#ff99cc"},{n:mstrmojo.desc(2486,"Tan"),id:"#ffcc99"},{n:mstrmojo.desc(2282,"Light Yellow"),id:"#ffff99"},{n:mstrmojo.desc(2481,"Light Green"),id:"#ccffcc"},{n:mstrmojo.desc(2479,"Light Turquoise"),id:"#ccffff"},{n:mstrmojo.desc(2482,"Pale Blue"),id:"#99ccff"},{n:mstrmojo.desc(2290,"Lavender"),id:"#cc99ff"},{n:mstrmojo.desc(2293,"White"),id:"#ffffff"}];var customColors=[];mstrmojo.util.ui.ColorPicker={getBasicColors:function getBasicColors(){return basicColors.slice();},getCustomColors:function getCustomColors(){return customColors.slice();},addCustomColor:function addCustomColor(color){var fnFilter=function(colorItem){return colorItem.id===color;};if(!basicColors.filter(fnFilter)[0]&&!customColors.filter(fnFilter)[0]){customColors.push({n:color,id:color});if(customColors.length>8){customColors.shift();}}}};}());