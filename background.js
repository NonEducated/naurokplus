'use strict';
var _def={blockFullscreen:true,blockVisibility:true,blockFocus:true,blockBlur:true,stripCssBlur:true,restoreSelect:true,restoreScroll:true,language:'auto'};
browser.runtime.onInstalled.addListener(function(){
    browser.storage.local.get(Object.keys(_def)).then(function(s){
        var w={};for(var k in _def){if(s[k]===undefined)w[k]=_def[k];}
        if(Object.keys(w).length)browser.storage.local.set(w);
    });
});
browser.storage.onChanged.addListener(function(ch,area){
    if(area!=='local')return;
    var d={};for(var k in ch)d[k]=ch[k].newValue;
    browser.tabs.query({}).then(function(tabs){
        for(var i=0;i<tabs.length;i++){
            var t=tabs[i];
            if(!t.id||!t.url)continue;
            if(t.url.startsWith('about:')||t.url.startsWith('moz-extension://'))continue;
            browser.tabs.sendMessage(t.id,{type:'NAUROK_STATE',state:d}).catch(function(){});
        }
    });
});
