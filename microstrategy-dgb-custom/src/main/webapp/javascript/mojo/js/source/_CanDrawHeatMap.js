(function(){mstrmojo.requiresCls("mstrmojo.array");var $MOJO=mstrmojo,$ARR=$MOJO.array;mstrmojo._CanDrawHeatMap=mstrmojo.provide("mstrmojo._CanDrawHeatMap",{_mixinName:"mstrmojo._CanDrawHeatMap",callback:null,canvas:null,latlngArr:null,originalzIndex:1,themeId:null,themeLoaded:false,themeData:null,bounds:null,xOffset:0,yOffset:0,radius:10,locationMap:null,presetThemeData:[[4,5,88,0,3,4,91,0,2,4,96,0,1,5,100,0,1,6,105,0,1,6,105,0,1,8,109,0,0,9,114,0,0,12,119,0,0,15,125,0,0,15,125,0,0,18,130,0,0,21,135,0,0,25,141,0,0,29,146,0,0,29,146,0,0,34,151,0,0,39,156,0,0,45,161,0,0,51,166,0,0,51,166,0,0,57,170,0,0,64,174,0,0,70,179,0,0,77,183,0,0,85,188,0,0,85,188,0,0,92,192,0,0,98,195,0,0,106,199,0,0,111,203,0,0,111,203,0,0,116,205,0,0,121,208,0,0,129,213,0,0,138,218,0,0,138,218,0,0,146,222,0,0,155,228,0,0,163,232,0,0,172,236,0,0,172,236,0,0,179,240,0,0,187,244,0,0,194,247,0,0,202,250,0,0,208,252,0,0,208,252,0,0,214,254,0,0,219,255,0,0,224,255,0,0,228,255,0,0,228,255,0,0,232,255,0,0,234,255,0,0,234,254,0,0,234,251,0,0,234,251,0,0,234,248,0,0,234,246,0,0,234,242,0,0,234,238,0,0,234,238,0,0,234,234,0,0,234,230,0,0,234,225,0,0,234,220,0,0,234,214,0,0,234,214,0,0,233,209,0,0,231,203,0,0,229,196,0,0,227,189,0,0,227,189,0,0,224,183,0,0,222,177,0,0,219,170,0,0,216,164,0,0,216,164,0,0,215,159,0,0,213,155,0,0,211,150,0,0,209,146,0,0,209,146,0,0,207,142,0,0,205,137,0,0,203,133,0,0,201,128,0,0,200,124,0,0,200,124,0,0,197,119,0,0,195,115,0,0,193,111,0,0,192,107,0,0,192,107,0,0,190,103,0,0,189,98,0,0,187,94,0,0,186,91,0,0,186,91,0,0,185,87,0,0,183,83,0,0,183,79,0,0,182,76,0,0,182,76,0,0,181,73,0,0,181,69,0,0,180,67,0,0,179,64,0,0,179,61,0,0,179,61,0,0,179,59,0,1,179,56,0,3,179,54,0,6,180,52,0,6,180,52,0,9,180,50,0,12,181,47,0,15,182,45,0,19,183,43,0,19,183,43,0,22,184,42,0,26,186,39,0,30,187,38,0,35,189,36,0,35,189,36,0,39,190,34,0,44,193,33,0,49,195,32,0,54,197,30,0,59,200,29,0,59,200,29,0,65,202,27,0,70,204,25,0,75,207,24,0,81,209,23,0,81,209,23,0,87,211,22,0,92,214,21,0,98,216,20,0,104,218,19,0,104,218,19,0,109,221,19,0,115,223,18,0,121,226,17,0,127,228,16,0,127,228,16,0,133,231,15,0,139,233,14,0,145,236,14,0,150,238,13,0,157,240,12,0,157,240,12,0,163,242,11,0,168,244,11,0,173,246,10,0,179,247,9,0,179,247,9,0,184,249,9,0,190,251,8,0,196,252,8,0,201,252,7,0,201,252,7,0,206,252,7,0,211,252,6,0,216,252,5,0,220,252,5,0,220,252,5,0,225,252,4,0,229,252,4,0,233,252,3,0,237,252,3,0,241,252,3,0,241,252,3,0,244,252,2,0,248,252,2,0,250,252,1,0,253,252,0,0,253,252,0,0,255,251,0,0,255,250,0,0,255,247,0,0,255,245,0,0,255,245,0,0,255,242,0,0,255,238,0,0,255,235,0,0,255,232,0,0,255,232,0,0,255,227,0,0,255,222,0,0,255,218,0,0,255,213,0,0,255,208,0,0,255,208,0,0,255,203,0,0,255,197,0,0,255,191,0,0,255,186,0,0,255,186,0,0,255,180,0,0,255,174,0,0,255,168,0,0,255,162,0,0,255,162,0,0,255,155,0,0,255,149,0,0,255,143,0,0,255,136,0,0,255,136,0,0,255,130,0,0,255,123,0,0,255,117,0,0,255,110,0,0,255,104,0,0,255,104,0,0,255,98,0,0,255,92,0,0,255,85,0,0,255,80,0,0,255,80,0,0,255,73,0,0,255,67,0,0,255,61,0,0,255,56,0,0,255,56,0,0,255,50,0,0,255,44,0,0,255,40,0,0,255,35,0,0,255,35,0,0,255,30,0,0,255,25,0,0,255,21,0,0,255,18,0,0,255,14,0,0,255,14,0,0,255,10,0,0,255,6,0,0,255,4,0,0,255,1,0,0,255,1,0,0,255,0,0,0,255,0,0,0,255,0,0,0,255,0,0,0,255,0,0,0,255,0,0,0,255,0,0,0,255,0,0,0,255,0,0,0,255,0,0,0,255,1,1,0,255,1,1,0,255,2,2,0,255,2,2,0],[159,159,159,0,158,158,158,0,157,157,157,0,156,156,156,0,155,155,155,0,155,155,155,0,154,154,154,0,153,153,153,0,152,152,152,0,151,151,151,0,151,151,151,0,150,150,150,0,149,149,149,0,148,148,148,0,147,147,147,0,147,147,147,0,146,146,146,0,144,144,144,0,143,143,143,0,142,142,142,0,142,142,142,0,141,141,141,0,140,140,140,0,139,139,139,0,138,138,138,0,137,137,137,0,137,137,137,0,135,135,135,0,134,134,134,0,133,133,133,0,132,132,132,0,132,132,132,0,131,131,131,0,131,130,130,0,130,128,128,0,129,127,127,0,129,127,127,0,130,126,126,0,130,125,125,0,129,123,123,0,129,122,122,0,129,122,122,0,129,121,121,0,129,120,120,0,128,118,118,0,129,117,117,0,129,116,116,0,129,116,116,0,129,115,115,0,129,113,113,0,129,112,112,0,130,111,111,0,130,111,111,0,131,110,110,0,130,108,108,0,131,107,107,0,132,106,106,0,132,106,106,0,132,104,104,0,133,103,103,0,134,102,102,0,134,100,100,0,134,100,100,0,135,99,99,0,137,98,98,0,138,97,97,0,139,95,95,0,140,94,94,0,140,94,94,0,141,93,93,0,141,91,91,0,143,90,90,0,145,89,89,0,145,89,89,0,146,88,88,0,148,87,87,0,149,86,86,0,152,86,86,0,152,86,86,0,153,85,85,0,155,84,84,0,157,84,84,0,159,83,83,0,159,83,83,0,161,82,82,0,164,82,82,0,165,81,81,0,168,81,81,0,169,80,80,0,169,80,80,0,172,79,79,0,174,79,79,0,176,78,78,0,178,77,77,0,178,77,77,0,180,77,77,0,182,76,76,0,185,75,75,0,187,75,75,0,187,75,75,0,189,74,74,0,191,73,73,0,193,73,73,0,195,72,72,0,195,72,72,0,199,72,72,0,200,71,71,0,203,70,70,0,205,70,70,0,207,69,69,0,207,69,69,0,209,68,68,0,211,68,68,0,213,67,67,0,216,66,66,0,216,66,66,0,218,66,66,0,219,65,65,0,222,65,65,0,224,64,64,0,224,64,64,0,226,63,63,0,228,63,63,0,229,62,62,0,232,61,61,0,232,61,61,0,234,61,61,0,235,60,60,0,238,60,60,0,239,59,59,0,240,58,58,0,240,58,58,0,242,58,58,0,244,57,57,0,246,56,56,0,247,56,56,0,247,56,56,0,248,55,55,0,250,55,55,0,251,54,54,0,253,53,53,0,253,53,53,0,253,53,53,0,255,52,52,0,255,54,52,0,255,54,51,0,255,54,51,0,255,56,50,0,255,58,50,0,255,59,49,0,255,62,49,0,255,64,48,0,255,64,48,0,255,66,47,0,255,69,47,0,255,71,46,0,255,75,46,0,255,75,46,0,255,78,45,0,255,80,44,0,255,84,44,0,255,88,43,0,255,88,43,0,255,91,43,0,255,94,42,0,255,98,41,0,255,102,41,0,255,102,41,0,255,106,40,0,255,110,40,0,255,114,39,0,255,118,39,0,255,123,38,0,255,123,38,0,255,127,38,0,255,131,37,0,255,135,36,0,255,140,36,0,255,140,36,0,255,144,35,0,255,149,35,0,255,153,34,0,255,158,34,0,255,158,34,0,255,162,33,0,255,167,33,0,255,171,32,0,255,175,31,0,255,175,31,0,255,181,31,0,255,185,30,0,255,189,30,0,255,193,29,0,255,199,29,0,255,199,29,0,255,203,28,0,255,207,28,0,255,210,27,0,255,215,27,0,255,215,27,0,255,218,26,0,255,222,26,0,255,226,25,0,255,229,25,0,255,229,25,0,255,232,24,0,255,236,24,0,255,239,23,0,255,242,23,0,255,242,23,0,255,245,22,0,255,247,22,0,255,250,21,0,255,251,21,0,255,254,22,0,255,254,22,0,255,255,24,0,255,255,25,0,255,255,28,0,255,255,30,0,255,255,30,0,255,255,33,0,255,255,37,0,255,255,38,0,255,255,42,0,255,255,42,0,255,255,45,0,255,255,49,0,255,255,52,0,255,255,56,0,255,255,56,0,255,255,60,0,255,255,64,0,255,255,69,0,255,255,73,0,255,255,77,0,255,255,77,0,255,255,81,0,255,255,86,0,255,255,90,0,255,255,96,0,255,255,96,0,255,255,101,0,255,255,105,0,255,255,110,0,255,255,115,0,255,255,115,0,255,255,120,0,255,255,125,0,255,255,131,0,255,255,135,0,255,255,135,0,255,255,141,0,255,255,146,0,255,255,151,0,255,255,156,0],[243,127,22,0,243,126,22,0,242,126,22,0,241,125,22,0,241,125,22,0,241,125,22,0,240,124,22,0,240,124,22,0,239,123,22,0,239,123,22,0,239,123,22,0,238,122,22,0,237,121,22,0,237,121,22,0,236,120,21,0,236,120,21,0,235,120,21,0,234,119,21,0,234,119,21,0,233,118,21,0,233,118,21,0,232,118,21,0,231,117,21,0,231,116,21,0,230,116,21,0,229,115,21,0,229,115,21,0,229,115,21,0,228,114,21,0,227,113,20,0,227,113,20,0,227,113,20,0,226,112,20,0,225,112,20,0,224,111,20,0,223,110,20,0,223,110,20,0,222,110,20,0,222,109,20,0,221,108,20,0,220,108,20,0,220,108,20,0,219,107,19,0,218,106,19,0,217,106,19,0,216,105,19,0,215,104,19,0,215,104,19,0,215,104,19,0,214,103,19,0,214,102,19,0,213,102,19,0,213,102,19,0,212,101,19,0,211,99,19,0,210,99,19,0,209,99,19,0,209,99,19,0,208,98,19,0,207,98,19,0,206,97,19,0,205,96,19,0,205,96,19,0,204,95,19,0,204,95,19,0,203,93,18,0,202,92,18,0,201,92,18,0,201,92,18,0,200,91,18,0,199,90,18,0,197,89,18,0,196,89,18,0,196,89,18,0,195,89,18,0,195,88,18,0,193,86,18,0,192,86,18,0,192,86,18,0,191,85,19,0,191,84,19,0,190,83,19,0,189,82,19,0,189,82,19,0,188,82,20,0,187,81,20,0,186,80,20,0,185,79,21,0,183,78,21,0,183,78,21,0,182,77,22,0,181,76,22,0,180,75,22,0,179,74,23,0,179,74,23,0,178,73,23,0,177,72,24,0,175,70,24,0,174,70,25,0,174,70,25,0,173,69,25,0,172,68,26,0,171,67,27,0,169,66,28,0,169,66,28,0,168,65,28,0,167,64,29,0,166,62,29,0,164,61,30,0,163,60,31,0,163,60,31,0,162,59,32,0,161,58,32,0,159,57,33,0,159,56,34,0,159,56,34,0,158,56,35,0,156,54,35,0,154,52,36,0,153,51,37,0,153,51,37,0,152,50,37,0,151,49,38,0,150,48,39,0,149,47,40,0,149,47,40,0,148,46,40,0,145,44,41,0,144,43,41,0,143,42,42,0,142,41,43,0,142,41,43,0,141,41,44,0,140,40,45,0,139,39,45,0,137,38,46,0,137,38,46,0,136,37,47,0,134,35,47,0,133,34,48,0,132,33,49,0,132,33,49,0,131,32,50,0,130,31,51,0,129,30,52,0,127,29,53,0,127,29,53,0,126,28,53,0,124,26,53,0,123,25,54,0,121,24,55,0,120,23,56,0,120,23,56,0,119,22,57,0,119,21,57,0,118,21,58,0,117,21,59,0,117,21,59,0,114,19,59,0,113,19,60,0,112,18,60,0,111,18,61,0,111,18,61,0,110,17,62,0,109,16,63,0,108,16,63,0,107,15,64,0,107,15,64,0,106,14,65,0,105,13,65,0,104,12,65,0,103,11,66,0,102,11,66,0,102,11,66,0,101,10,67,0,100,10,68,0,99,9,68,0,98,9,69,0,98,9,69,0,96,7,68,0,95,7,69,0,95,7,69,0,94,7,70,0,94,7,70,0,93,7,70,0,93,7,71,0,92,7,71,0,91,7,72,0,91,7,72,0,90,7,72,0,88,6,72,0,87,6,72,0,87,6,73,0,86,6,73,0,86,6,73,0,85,6,74,0,84,6,74,0,83,6,75,0,82,6,75,0,82,6,75,0,82,6,75,0,80,5,76,0,79,5,76,0,79,5,77,0,79,5,77,0,79,5,77,0,78,5,77,0,77,5,78,0,76,5,78,0,76,5,78,0,76,5,78,0,75,5,79,0,74,5,79,0,72,4,78,0,72,4,79,0,72,4,79,0,71,4,79,0,70,4,79,0,70,4,80,0,69,4,80,0,69,4,80,0,68,4,80,0,68,4,81,0,67,4,81,0,66,4,81,0,66,4,81,0,65,3,81,0,64,3,81,0,63,3,81,0,63,3,81,0,63,3,81,0,62,3,82,0,62,3,82,0,61,3,82,0,60,4,82,0,60,4,83,0,60,4,83,0,59,4,83,0,59,4,83,0,58,5,83,0,58,4,83,0,58,4,83,0,57,4,83,0,56,5,83,0,56,5,83,0,55,5,84,0,55,5,84,0,55,5,84,0,54,6,84,0,54,6,84,0,53,6,84,0,53,6,84,0,53,7,85,0,52,7,85,0,52,7,85,0,50,6,85,0],[57,62,47,0,58,63,47,0,58,64,47,0,58,64,46,0,59,65,46,0,59,65,46,0,60,66,46,0,61,66,46,0,62,67,46,0,63,68,46,0,63,68,46,0,63,68,45,0,64,70,45,0,65,70,45,0,66,71,45,0,66,71,45,0,67,72,45,0,68,73,45,0,69,73,44,0,70,74,44,0,70,74,44,0,70,74,44,0,72,75,44,0,73,77,44,0,74,77,43,0,74,78,43,0,74,78,43,0,76,79,43,0,77,79,43,0,79,81,43,0,79,81,42,0,79,81,42,0,80,82,42,0,82,83,42,0,83,84,42,0,84,85,42,0,84,85,42,0,85,85,41,0,86,86,41,0,88,88,41,0,89,89,41,0,89,89,41,0,91,89,41,0,91,90,40,0,93,91,40,0,95,92,40,0,96,93,40,0,96,93,40,0,98,95,40,0,98,95,39,0,100,95,39,0,101,97,39,0,101,97,39,0,103,98,39,0,105,99,39,0,106,100,38,0,107,101,38,0,107,101,38,0,109,102,38,0,111,103,38,0,112,103,37,0,114,104,37,0,114,104,37,0,115,106,37,0,117,107,37,0,119,108,37,0,120,109,36,0,121,110,36,0,121,110,36,0,123,111,36,0,125,112,36,0,126,112,35,0,128,114,35,0,128,114,35,0,129,115,35,0,131,116,35,0,133,117,35,0,134,118,34,0,134,118,34,0,136,119,34,0,138,120,34,0,139,121,34,0,140,122,33,0,140,122,33,0,142,123,33,0,144,125,33,0,146,126,33,0,147,126,32,0,149,128,32,0,149,128,32,0,150,129,32,0,152,130,32,0,153,131,31,0,156,132,31,0,156,132,31,0,158,133,31,0,160,134,31,0,161,135,30,0,163,136,30,0,163,136,30,0,164,137,30,0,166,138,30,0,168,139,29,0,169,140,29,0,169,140,29,0,171,141,29,0,173,143,29,0,174,143,28,0,176,145,28,0,178,146,28,0,178,146,28,0,180,147,28,0,181,148,27,0,183,149,27,0,185,150,27,0,185,150,27,0,186,151,27,0,188,152,26,0,189,153,26,0,191,154,26,0,191,154,26,0,192,156,26,0,194,156,25,0,196,157,25,0,197,158,25,0,197,158,25,0,200,160,25,0,202,160,24,0,203,161,25,0,204,162,25,0,206,164,25,0,206,164,25,0,208,165,25,0,209,165,24,0,211,166,24,0,212,168,25,0,212,168,25,0,214,169,25,0,215,169,24,0,217,170,24,0,219,171,25,0,219,171,25,0,220,172,25,0,221,174,24,0,222,175,24,0,224,175,25,0,224,175,25,0,226,176,25,0,227,177,24,0,228,178,24,0,229,179,25,0,230,180,25,0,230,180,25,0,232,180,24,0,233,181,24,0,235,182,25,0,236,183,25,0,236,183,25,0,236,184,24,0,238,185,24,0,239,186,24,0,240,186,24,0,240,186,24,0,241,187,24,0,243,188,24,0,244,189,25,0,245,190,25,0,245,190,25,0,246,191,24,0,247,191,25,0,248,192,25,0,248,193,25,0,249,194,25,0,249,194,25,0,250,194,25,0,251,195,26,0,252,196,26,0,253,197,26,0,253,197,26,0,254,199,26,0,254,199,27,0,255,199,27,0,255,201,28,0,255,201,28,0,255,202,28,0,255,204,29,0,255,205,31,0,255,206,32,0,255,206,32,0,255,208,32,0,255,208,33,0,255,209,35,0,255,211,36,0,255,212,38,0,255,212,38,0,255,213,38,0,255,214,40,0,255,215,41,0,255,216,42,0,255,216,42,0,255,218,43,0,255,219,45,0,255,220,46,0,255,221,48,0,255,221,48,0,255,222,50,0,255,222,51,0,255,223,53,0,255,224,55,0,255,224,55,0,255,225,57,0,255,225,59,0,255,226,60,0,255,227,62,0,255,228,64,0,255,228,64,0,255,229,66,0,255,230,68,0,255,230,69,0,255,231,71,0,255,231,71,0,255,232,73,0,255,233,76,0,255,233,78,0,255,234,79,0,255,234,79,0,255,235,81,0,255,235,83,0,255,236,86,0,255,237,88,0,255,237,88,0,255,236,89,0,255,237,91,0,255,237,94,0,255,238,96,0,255,238,98,0,255,238,98,0,255,239,99,0,255,239,101,0,255,240,104,0,255,240,106,0,255,240,106,0,255,241,108,0,255,241,110,0,255,242,111,0,255,242,113,0,255,242,113,0,255,243,116,0,255,243,118,0,255,244,120,0,255,244,122,0,255,244,122,0,255,245,124,0,255,245,126,0,255,245,128,0,255,246,129,0],[223,145,187,0,223,143,184,0,223,142,182,0,224,141,180,0,225,139,177,0,225,139,177,0,226,138,175,0,227,137,172,0,227,135,169,0,228,134,167,0,228,134,167,0,229,132,164,0,230,131,161,0,230,129,158,0,232,128,156,0,232,128,156,0,232,126,153,0,233,125,150,0,234,123,147,0,235,122,144,0,235,122,144,0,236,120,141,0,237,119,139,0,238,117,135,0,239,116,133,0,240,114,129,0,240,114,129,0,241,112,126,0,242,111,124,0,243,109,121,0,244,108,118,0,244,108,118,0,245,106,115,0,246,104,112,0,247,103,110,0,248,101,107,0,248,101,107,0,249,99,104,0,249,98,102,0,251,96,99,0,251,95,97,0,251,95,97,0,252,93,95,0,253,91,92,0,254,90,91,0,254,88,88,0,255,86,86,0,255,86,86,0,255,85,84,0,255,85,84,0,255,84,83,0,255,84,83,0,255,84,83,0,255,84,82,0,255,84,82,0,255,84,81,0,255,84,81,0,255,84,81,0,255,83,80,0,255,82,79,0,255,83,79,0,255,82,78,0,255,82,78,0,255,83,78,0,255,83,77,0,255,83,78,0,255,82,77,0,255,83,77,0,255,83,77,0,255,82,76,0,255,82,75,0,255,82,75,0,255,82,75,0,255,82,75,0,255,82,75,0,255,82,75,0,255,82,75,0,255,82,75,0,255,82,75,0,255,82,75,0,255,82,74,0,255,82,74,0,255,82,74,0,255,82,74,0,255,82,74,0,255,83,74,0,255,82,74,0,255,82,74,0,255,82,73,0,255,82,73,0,255,83,74,0,255,83,74,0,255,84,74,0,255,83,74,0,255,83,74,0,255,83,74,0,255,83,74,0,255,83,74,0,255,84,75,0,255,84,75,0,255,84,74,0,255,84,75,0,255,84,74,0,255,84,75,0,255,84,75,0,255,84,75,0,255,85,76,0,255,85,76,0,255,86,76,0,255,86,76,0,255,86,76,0,255,86,77,0,255,86,77,0,255,86,77,0,255,87,78,0,255,87,78,0,255,87,78,0,255,88,78,0,255,88,78,0,255,88,79,0,255,88,79,0,255,88,79,0,255,88,81,0,255,88,80,0,255,89,81,0,255,89,81,0,255,89,81,0,255,90,82,0,255,90,82,0,255,91,83,0,255,91,84,0,255,91,84,0,255,92,84,0,255,92,84,0,255,92,85,0,255,93,85,0,255,93,85,0,255,94,87,0,255,94,87,0,255,95,88,0,255,95,88,0,255,95,88,0,255,96,88,0,255,96,89,0,255,97,90,0,255,97,90,0,255,97,90,0,255,98,91,0,255,98,92,0,255,99,93,0,255,99,93,0,255,100,95,0,255,100,95,0,255,100,95,0,255,101,95,0,255,101,96,0,255,102,97,0,255,102,97,0,255,102,97,0,255,103,98,0,255,103,98,0,255,104,100,0,255,104,100,0,255,105,100,0,255,105,101,0,255,106,101,0,255,106,103,0,255,106,103,0,255,107,103,0,255,108,104,0,255,108,104,0,255,109,106,0,255,109,106,0,255,109,106,0,255,110,107,0,255,110,107,0,255,111,109,0,255,112,110,0,255,112,110,0,255,112,110,0,255,113,111,0,255,113,112,0,255,114,113,0,255,114,113,0,255,114,113,0,255,116,114,0,255,116,115,0,255,117,115,0,255,117,115,0,255,118,117,0,255,118,117,0,255,119,118,0,255,120,119,0,255,121,120,0,255,121,120,0,255,121,120,0,255,122,121,0,255,122,121,0,255,123,123,0,255,123,123,0,255,124,124,0,255,124,124,0,255,125,125,0,255,126,126,0,255,126,126,0,255,126,126,0,255,127,127,0,255,128,128,0,255,130,130,0,255,130,130,0,255,131,131,0,255,133,133,0,255,135,135,0,255,136,136,0,255,138,138,0,255,138,138,0,255,140,140,0,255,142,142,0,255,144,144,0,255,146,146,0,255,146,146,0,255,148,148,0,255,150,150,0,255,152,152,0,255,154,154,0,255,154,154,0,255,157,157,0,255,159,159,0,255,161,161,0,255,163,163,0,255,163,163,0,255,166,166,0,255,168,168,0,255,170,170,0,255,172,172,0,255,175,175,0,255,175,175,0,255,177,177,0,255,179,179,0,255,182,182,0,255,184,184,0,255,184,184,0,255,187,187,0,255,188,188,0,255,191,191,0,255,193,193,0,255,193,193,0,255,196,196,0,255,199,199,0,255,202,202,0,255,204,204,0,255,204,204,0,255,206,206,0,255,208,208,0,255,210,210,0,255,213,213,0]],drawDensity:function drawDensity(){if(!this.hasMapBoundsChanged()){return ;}this.clearDensity();this.cleanLocationMap();this.createDensity();},getThemeUrl:function getThemeUrl(){var theme;switch(this.themeId){case 5:theme=$MOJO.getStyleRoot()+"/images/heatmap5.png";break;case 4:theme=$MOJO.getStyleRoot()+"/images/heatmap4.png";break;case 3:theme=$MOJO.getStyleRoot()+"/images/heatmap3.png";break;case 2:theme=$MOJO.getStyleRoot()+"/images/heatmap2.png";break;default:theme=$MOJO.getStyleRoot()+"/images/heatmap1.png";}return theme;},getThemeFromPreset:function getThemeFromPreset(){switch(this.themeId){case 5:this.themeData=this.presetThemeData[4];break;case 4:this.themeData=this.presetThemeData[3];break;case 3:this.themeData=this.presetThemeData[2];break;case 2:this.themeData=this.presetThemeData[1];break;default:this.themeData=this.presetThemeData[0];}},createThemeColourGradient:function createThemeColourGradient(url){if(url){var that=this,img=new Image();img.onload=function(){that.drawTheme(this);img.onload=null;};img.src=url;}return null;},dumpThemeColor:function dumpThemeColor(){var s=""+this.themeId+":";if(this.themeData){var l=this.themeData.length;for(var p=0;p<l;p++){s+=this.themeData[p];if(p!=l-1){s+=",";}}}console.log(s);},drawTheme:function drawTheme(image){var can=document.createElement("canvas");var ctx=can.getContext("2d");can.width=image.width;can.height=image.height;ctx.drawImage(image,0,0,image.width,image.height);var rawData=ctx.getImageData(0,3,image.width,1).data;var themeData=ctx.getImageData(0,0,256,1).data,p;for(p=0;p<themeData.length;){var a=Math.floor(image.width*(0.1+0.8*p/1020))*4;themeData[p]=rawData[a];themeData[p+1]=rawData[a+1];themeData[p+2]=rawData[a+2];p+=4;}this.themeData=themeData;this.dumpThemeColor();this.cleanLocationMap();this.createDensity();},createColourGradient:function createColourGradient(){if(!this.themeData){this.getThemeFromPreset();}return this.themeData;},createDefaultColourGradient:function createDefaultColourGradient(){var ctx=document.createElement("canvas").getContext("2d");var grd=ctx.createLinearGradient(0,0,256,0);grd.addColorStop(0,"magenta");grd.addColorStop(0.25,"blue");grd.addColorStop(0.5,"green");grd.addColorStop(0.75,"yellow");grd.addColorStop(1,"red");ctx.fillStyle=grd;ctx.fillRect(0,0,256,1);return ctx.getImageData(0,0,256,1).data;},clearDensity:function clearDensity(){var canvas=this.canvas,context=canvas&&canvas.getContext("2d");if(context){context.clearRect(0,0,canvas.width,canvas.height);}},zeroLayer:function zeroLayer(origin){this.div_.style.left=Math.floor(origin.x)+"px";this.div_.style.top=Math.floor(origin.y)+"px";},cleanLocationMap:function cleanLocationMap(){this.locationMap={};},addToLocationMap:function addToLocationMap(attr,xraw,yraw){var x=Math.ceil(xraw);var y=Math.ceil(yraw);if(!this.locationMap[x]){this.locationMap[x]={};}if(!this.locationMap[x][y]){this.locationMap[x][y]=[];}this.locationMap[x][y].push(attr);},createDensity:function createDensity(){var canvas=this.canvas,context=this._initContextWithGradient(this.graphics);if(context){this._putGradientColourToContext(context);context.fillRect(0,0,canvas.width,canvas.height);}},_initContextWithGradient:function _initContextWithGradient(graphics){if(!graphics||graphics.length<1||!this.canvas){return ;}var context=this.canvas.getContext("2d"),radius=this.radius||10,diameter=2*radius,origin=this.getTopLeft();$ARR.forEach(graphics,function(attr){this._drawSinglePoint(attr,context,origin,diameter,radius);},this);return context;},_drawSinglePoint:function _drawSinglePoint(attr,context,origin,diameter,radius){var pixloc=attr&&this.getScreenPointForLocation(attr.getPositionInfo()),x,y,grd;if(!context||!origin||!pixloc||isNaN(pixloc.x)||isNaN(pixloc.y)){return false;}x=pixloc.x;y=pixloc.y;this.addToLocationMap(attr,x,y);x=this.zeroX(x,origin);y=this.zeroY(y,origin);grd=context.createRadialGradient(x,y,0,x,y,radius);grd.addColorStop(0,"rgba(0, 0, 0, 0.10)");grd.addColorStop(1,"transparent");context.fillStyle=grd;context.fillRect(x-radius,y-radius,diameter,diameter);},_putGradientColourToContext:function _putGradientColourToContext(context){var dat=this._getGradientDataForContext(context);if(dat){context.putImageData(dat,0,0);}},_getGradientDataForContext:function _getGradientDataForContext(context){var canvas=this.canvas,colourGradient=this.createColourGradient(),dat=context&&context.getImageData(0,0,canvas.width,canvas.height),pix=dat&&dat.data,a,p,pl;if(!colourGradient||!pix){return ;}for(p=0,pl=pix.length;p<pl;){a=pix[p+3]*4;pix[p]=colourGradient[a];pix[p+1]=colourGradient[a+1];pix[p+2]=colourGradient[a+2];pix[p+3]=Math.min(255,pix[p+3]*5);p+=4;}return dat;},getAttrsFromLocationMap:function getAttrFromLocationMap(xin,yin){var locationMap=this.locationMap;if(!locationMap){return[];}var x=xin-this.xOffset;var y=yin-this.yOffset;if(locationMap[x]&&locationMap[x][y]){return locationMap[x][y];}return[];},getAttrsFromLocationMapRange:function getAttrsFromLocationMapRange(x,y){var ret=[],range=this.radius||10;for(var i=x-range;i<x+range;i++){for(var j=y-range;j<y+range;j++){ret=ret.concat(this.getAttrsFromLocationMap(i,j));}}return ret;},setTransform:function setTransform(point){if(!!this.canvas&&!!point&&point.x!=undefined&&point.y!=undefined){this.canvas.style.left=parseInt(point.x)+"px";this.canvas.style.top=parseInt(point.y)+"px";}},getBounds:function getBounds(){return null;},getTopLeft:function getTopLeft(){return null;},getScreenPointForLocation:function getScreenPointForLocation(location){return null;},hasMapBoundsChanged:function hasMapBoundsChanged(){return true;},zeroX:function zeroX(x,origin){return x;},zeroY:function zeroY(y,origin){return y;},getDrawingLayerWidth:function getDrawingLayerWidth(){return this.width;}});})();