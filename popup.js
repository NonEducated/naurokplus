'use strict';
var _K=['blockFullscreen','blockVisibility','blockFocus','blockBlur','stripCssBlur','restoreSelect','restoreScroll'];
var _D={blockFullscreen:true,blockVisibility:true,blockFocus:true,blockBlur:true,stripCssBlur:true,restoreSelect:true,restoreScroll:true,language:'auto'};
var _L='en',_l=getLang('en');
var _inp={},_ae=true;
var _sd=document.getElementById('sd'),_st=document.getElementById('st'),_bA=document.getElementById('btnAll'),_ls=document.getElementById('langSel'),_bR=document.getElementById('btnRst'),_bC=document.getElementById('btnCopy');
_K.forEach(function(k){_inp[k]=document.querySelector('[data-key="'+k+'"]');});
function _al(c){_L=c;_l=getLang(c);document.querySelectorAll('[data-i18n]').forEach(function(e){var k=e.dataset.i18n;if(typeof _l[k]==='string')e.textContent=_l[k];});document.getElementById('tabMain').textContent=_l.tMain;document.getElementById('tabSettings').textContent=_l.tSet;browser.storage.local.get(_K).then(_us);}
setTimeout(function(){document.getElementById('intro').classList.add('done');},650);
document.querySelectorAll('.tab').forEach(function(b){b.addEventListener('click',function(){document.querySelectorAll('.tab').forEach(function(x){x.classList.remove('a');});document.querySelectorAll('.pnl').forEach(function(x){x.classList.remove('a');});b.classList.add('a');var id='panel'+b.dataset.tab.charAt(0).toUpperCase()+b.dataset.tab.slice(1);document.getElementById(id).classList.add('a');});});
browser.storage.local.get(_D).then(function(s){var sv=s.language,rv=(!sv||sv==='auto')?detectLang():sv;_ls.value=sv||'auto';_al(rv);_K.forEach(function(k){if(_inp[k])_inp[k].checked=s[k]!==false;});_us(s);});
_K.forEach(function(k){var e=_inp[k];if(!e)return;e.addEventListener('change',function(){browser.storage.local.set({[k]:e.checked});browser.storage.local.get(_K).then(_us);});});
_bA.addEventListener('click',function(){_ae=!_ae;var u={};_K.forEach(function(k){u[k]=_ae;if(_inp[k])_inp[k].checked=_ae;});browser.storage.local.set(u);_us(u);});
_ls.addEventListener('change',function(){var v=_ls.value;browser.storage.local.set({language:v});_al(v==='auto'?detectLang():v);});
_bR.addEventListener('click',function(){browser.storage.local.set(Object.assign({},_D)).then(function(){_K.forEach(function(k){if(_inp[k])_inp[k].checked=_D[k];});_ls.value='auto';_al(detectLang());_us(_D);_bR.textContent=_l.sRstD;setTimeout(function(){_bR.textContent=_l.sRstB;},1200);});});
_bC.addEventListener('click',function(){browser.tabs.query({active:true,currentWindow:true}).then(function(tabs){if(!tabs[0])return;browser.tabs.sendMessage(tabs[0].id,{type:'NAUROK_COPY'}).catch(function(){});});});
function _us(s){var n=_K.filter(function(k){return s[k]!==false;}).length,t=_K.length;_sd.className='sd'+(n===0?'':' on');_st.textContent=n===0?_l.sI:n===t?_l.sA:typeof _l.sP==='function'?_l.sP(n,t):n+' / '+t;_ae=n>0;_bA.textContent=_ae?_l.bDis:_l.bEn;}
