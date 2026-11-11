(function(){
'use strict';
var _h=location.hostname;
if(_h.indexOf('naurok')===-1&&_h.indexOf('vseosvita')===-1&&_h.indexOf('na-urok')===-1)return;

var _D={blockFullscreen:true,blockVisibility:true,blockFocus:true,blockBlur:true,stripCssBlur:true,restoreSelect:true,restoreScroll:true};

browser.storage.local.get(_D).then(function(s){
    _inj(Object.assign({},_D,s));
    browser.storage.onChanged.addListener(function(ch,area){
        if(area!=='local')return;
        var d={};for(var k in ch)d[k]=ch[k].newValue;
        window.dispatchEvent(new CustomEvent('__np_st',{detail:d}));
    });
}).catch(function(){_inj(_D);});

browser.runtime.onMessage.addListener(function(m){
    if(m&&m.type==='NAUROK_STATE')window.dispatchEvent(new CustomEvent('__np_st',{detail:m.state}));
    if(m&&m.type==='NAUROK_COPY')window.dispatchEvent(new CustomEvent('__np_cpy'));
});

function _inj(s){
    var sc=document.createElement('script');
    sc.textContent='('+_pw.toString()+')('+JSON.stringify(s)+')';
    (document.head||document.documentElement).appendChild(sc);
    sc.remove();
}

function _pw(ini){
'use strict';
var _st=Object.assign({blockFullscreen:true,blockVisibility:true,blockFocus:true,blockBlur:true,stripCssBlur:true,restoreSelect:true,restoreScroll:true},ini);
window.addEventListener('__np_st',function(e){Object.assign(_st,e.detail);_qa();});
window.addEventListener('__np_cpy',function(){_copyQ();});

var _rts=Function.prototype.toString;
var _nts=_rts.bind(Function.prototype.toString);
var _mf=new WeakSet();
var _tr=function toString(){if(_mf.has(this))return'function '+(this.name||'')+'() { [native code] }';return _nts.call(this);};
_mf.add(_tr);_mf.add(_nts);
Object.defineProperty(Function.prototype,'toString',{value:_tr,writable:true,configurable:true});
var _mk=function(f,n){try{Object.defineProperty(f,'name',{value:n,configurable:true});}catch(_){}  _mf.add(f);return f;};

try{
    var _dp=function(p,k,g){Object.defineProperty(p,k,{get:_mk(g,'get '+k),configurable:true});};
    _dp(Screen.prototype,'availHeight',function(){return window.innerHeight;});
    _dp(Screen.prototype,'availWidth',function(){return window.innerWidth;});
}catch(_){}

var _fe=null,_od=EventTarget.prototype.dispatchEvent;
var _ffc=function(t){
    try{_od.call(t||document.documentElement,new Event('fullscreenchange',{bubbles:true}));}catch(_){}
    try{_od.call(document,new Event('fullscreenchange'));}catch(_){}
};

try{
    var _dd=function(k,g){Object.defineProperty(Document.prototype,k,{get:_mk(g,'get '+k),configurable:true});};
    _dd('fullscreenElement',function(){return _st.blockFullscreen?_fe:null;});
    _dd('webkitFullscreenElement',function(){return _st.blockFullscreen?_fe:null;});
    _dd('mozFullScreenElement',function(){return _st.blockFullscreen?_fe:null;});
    _dd('fullscreenEnabled',function(){return true;});
    _dd('fullscreen',function(){return _st.blockFullscreen?_fe!==null:false;});
    _dd('webkitIsFullScreen',function(){return _st.blockFullscreen?_fe!==null:false;});
}catch(_){}

Element.prototype.requestFullscreen=_mk(function requestFullscreen(){if(_st.blockFullscreen){_fe=this;Promise.resolve().then(function(){_ffc(this);}.bind(this));_toast('fs');return Promise.resolve();}return Promise.resolve();},'requestFullscreen');
if('webkitRequestFullscreen' in Element.prototype)Element.prototype.webkitRequestFullscreen=_mk(function webkitRequestFullscreen(){if(_st.blockFullscreen){_fe=this;Promise.resolve().then(function(){_ffc(this);}.bind(this));}},'webkitRequestFullscreen');
if('mozRequestFullScreen' in Element.prototype)Element.prototype.mozRequestFullScreen=_mk(function mozRequestFullScreen(){if(_st.blockFullscreen){_fe=this;Promise.resolve().then(function(){_ffc(this);}.bind(this));}},'mozRequestFullScreen');
Document.prototype.exitFullscreen=_mk(function exitFullscreen(){var p=_fe;_fe=null;Promise.resolve().then(function(){_ffc(p);});return Promise.resolve();},'exitFullscreen');

try{
    var _dv=function(k,g){Object.defineProperty(Document.prototype,k,{get:_mk(g,'get '+k),configurable:true});};
    _dv('hidden',function(){return _st.blockVisibility?false:undefined;});
    _dv('webkitHidden',function(){return _st.blockVisibility?false:undefined;});
    _dv('visibilityState',function(){return _st.blockVisibility?'visible':'hidden';});
    _dv('webkitVisibilityState',function(){return _st.blockVisibility?'visible':'hidden';});
}catch(_){}
try{Document.prototype.hasFocus=_mk(function hasFocus(){return _st.blockFocus;},'hasFocus');}catch(_){}

EventTarget.prototype.dispatchEvent=_mk(function dispatchEvent(e){
    if(e){var t=e.type;
        if((t==='visibilitychange'||t==='webkitvisibilitychange')&&_st.blockVisibility){_toast('vis');return true;}
        if((t==='blur'||t==='focusout')&&_st.blockFocus)return true;
        if((t==='mouseleave'||t==='mouseout'||t==='pointerleave'||t==='pagehide')&&_st.blockBlur)return true;
    }
    return _od.call(this,e);
},'dispatchEvent');

var _rl=EventTarget.prototype.addEventListener;
_rl.call(window,'pagehide',_mk(function(e){if(_st.blockBlur)e.stopImmediatePropagation();},''),true);
_rl.call(window,'blur',_mk(function(e){if(_st.blockFocus)e.stopImmediatePropagation();},''),true);
_rl.call(window,'visibilitychange',_mk(function(e){if(_st.blockVisibility)e.stopImmediatePropagation();},''),true);
_rl.call(document,'visibilitychange',_mk(function(e){if(_st.blockVisibility)e.stopImmediatePropagation();},''),true);
_rl.call(document,'focusout',_mk(function(e){if(_st.blockFocus)e.stopImmediatePropagation();},''),true);

var _br=/blur\s*\(/i;
var _cn=function(n){
    if(n.nodeType!==1)return;var s=n.style;if(!s)return;
    if(_st.stripCssBlur){
        if(_br.test(s.filter)){s.setProperty('filter','none','important');_toast('blur');}
        var bd=s.backdropFilter||s.getPropertyValue('backdrop-filter');
        if(bd&&_br.test(bd)){s.setProperty('-webkit-backdrop-filter','none','important');s.setProperty('backdrop-filter','none','important');}
        if(s.pointerEvents==='none')s.setProperty('pointer-events','auto','important');
    }
    if(_st.restoreSelect&&s.userSelect==='none')s.setProperty('user-select','text','important');
    if(_st.restoreScroll&&s.overflow==='hidden'&&(n===document.body||n===document.documentElement))s.setProperty('overflow','auto','important');
};
var _wc=function(r){try{var i=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT),n;while((n=i.nextNode()))_cn(n);}catch(_){}};
var _obs=new MutationObserver(function(recs){for(var i=0;i<recs.length;i++){var r=recs[i];if(r.type==='attributes'&&r.attributeName==='style')_cn(r.target);for(var j=0;j<r.addedNodes.length;j++){var n=r.addedNodes[j];if(n.nodeType===1){_cn(n);_wc(n);}}}});
var _so=function(){_obs.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style']});_wc(document.documentElement);};
if(document.readyState==='loading')_rl.call(document,'DOMContentLoaded',_so,{once:true});
else _so();

var _sel=null;
var _bcs=function(){var c='';if(_st.restoreSelect)c+='*,*::before,*::after{-webkit-user-select:text!important;-moz-user-select:text!important;user-select:text!important;}';if(_st.stripCssBlur)c+='[style*="pointer-events: none"]{pointer-events:auto!important;}[style*="pointer-events:none"]{pointer-events:auto!important;}';return c;};
var _qa=function(){if(!_sel){_sel=document.createElement('style');_sel.id='__np_s';(document.head||document.documentElement).appendChild(_sel);}_sel.textContent=_bcs();_wc(document.documentElement);};
_qa();

var _tq=[],_ta=false;
var _tm={fs:['Fullscreen blocked','Повний екран заблоковано','Полный экран заблокирован'],vis:['Tab switch hidden','Перемикання приховано','Переключение скрыто'],blur:['Blur removed','Розмиття прибрано','Размытие убрано'],copy:['Copied!','Скопійовано!','Скопировано!']};
var _li=0;try{var _nl=(navigator.language||'en').toLowerCase();if(_nl.startsWith('uk'))_li=1;else if(_nl.startsWith('ru'))_li=2;}catch(_){}
var _toast=function(tp){var msgs=_tm[tp];if(!msgs)return;var msg=msgs[_li]||msgs[0];_tq.push(msg);if(!_ta)_rt();};
var _rt=function(){if(!_tq.length){_ta=false;return;}_ta=true;var msg=_tq.shift();var el=document.createElement('div');el.textContent=msg;el.style.cssText='position:fixed;bottom:18px;right:18px;z-index:2147483647;background:#111;color:#eee;font:12px/1.4 system-ui,sans-serif;padding:7px 13px;border-radius:6px;border:1px solid #2a2a2a;opacity:0;transition:opacity .18s;pointer-events:none;max-width:220px;';document.body.appendChild(el);requestAnimationFrame(function(){el.style.opacity='1';setTimeout(function(){el.style.opacity='0';setTimeout(function(){el.remove();_rt();},200);},1600);});};

var _sels={naurok:{question:['.tb-question__text','.question-text','.tb-q-text','[class*="question__text"]','[class*="questionText"]'],answers:['.tb-answer__text','.answer-text','[class*="answer__text"]','[class*="answerText"]','.tb-choice__text','[class*="choice__text"]']},vseosvita:{question:['.question-text','.quiz-question__text','[class*="question__title"]','[class*="questionTitle"]'],answers:['.answer-item__text','.quiz-answer__text','[class*="answer__text"]','[class*="answerText"]']}};
var _gs=function(){return location.hostname.indexOf('vseosvita')!==-1?'vseosvita':'naurok';};
var _fq=function(){
    var site=_gs(),sl=_sels[site],qt='',at=[];
    for(var i=0;i<sl.question.length;i++){var el=document.querySelector(sl.question[i]);if(el&&el.textContent.trim()){qt=el.textContent.trim();break;}}
    if(!qt){var app=document.getElementById('tb-app')||document.body,wk=document.createTreeWalker(app,NodeFilter.SHOW_ELEMENT),big=null,bl=0,n;while((n=wk.nextNode())){var cn=n.className||'';if(typeof cn!=='string')continue;if((cn.toLowerCase().indexOf('question')!==-1)&&n.children.length<4){var tx=n.textContent.trim();if(tx.length>bl&&tx.length<800){big=n;bl=tx.length;}}}if(big)qt=big.textContent.trim();}
    for(var j=0;j<sl.answers.length;j++){var els=document.querySelectorAll(sl.answers[j]);if(els.length>0){els.forEach(function(e){var t=e.textContent.trim();if(t)at.push(t);});break;}}
    if(!at.length){var app2=document.getElementById('tb-app')||document.body,wk2=document.createTreeWalker(app2,NodeFilter.SHOW_ELEMENT),n2;while((n2=wk2.nextNode())){var cn2=n2.className||'';if(typeof cn2!=='string')continue;if((cn2.toLowerCase().indexOf('answer')!==-1||cn2.toLowerCase().indexOf('choice')!==-1||cn2.toLowerCase().indexOf('variant')!==-1)&&n2.children.length<3){var tx2=n2.textContent.trim();if(tx2&&tx2.length<300&&at.indexOf(tx2)===-1)at.push(tx2);}}}
    return{q:qt,a:at};
};
var _copyQ=function(){
    var d=_fq();if(!d.q&&!d.a.length)return;
    var lines=[];if(d.q)lines.push(d.q);if(d.a.length){lines.push('');d.a.forEach(function(a,i){lines.push((i+1)+'. '+a);});}
    var text=lines.join('\n');
    try{navigator.clipboard.writeText(text).then(function(){_toast('copy');}).catch(function(){_fb(text);});}catch(_){_fb(text);}
};
var _fb=function(text){var ta=document.createElement('textarea');ta.value=text;ta.style.cssText='position:fixed;opacity:0;top:0;left:0;';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');_toast('copy');}catch(_){}ta.remove();};
window.__np_copy=_copyQ;
}

})();
