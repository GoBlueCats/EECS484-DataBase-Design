(function(g){var window=this;var P8=function(a,b){var c=a.getAttribute(b);if(null!=c)return(0,window.parseFloat)(c)},Q8=function(a){var b=1+.25*(a.Pg||0);
if(0==a.offset||2==a.offset)b*=.8;return b},R8=function(a){if(!ixa.test(a))throw Error("'"+a+"' is not a valid hex color");
4==a.length&&(a=a.replace(jxa,"#$1$1$2$2$3$3"));a=a.toLowerCase();return[(0,window.parseInt)(a.substr(1,2),16),(0,window.parseInt)(a.substr(3,2),16),(0,window.parseInt)(a.substr(5,2),16)]},S8=function(a,b){var c=a.getAttribute(b);
if(null!=c)return g.Ku.test(c),c},T8=function(a,b){var c=P8(a,b);
if(void 0!=c)return c},U8=function(a,b){var c={};
if(null!=b.Nd||b.background){var d=null!=b.Nd?b.Nd:a.g.Xa.Nd,e=R8(b.background?b.background:a.g.Xa.background);c.background="rgba("+e[0]+","+e[1]+","+e[2]+","+d+")";a.ha&&(c["box-decoration-break"]="clone",c["border-radius"]=a.Y/8+"px")}if(null!=b.Pg||null!=b.offset)c["font-size"]=a.ba*Q8(b)+"px";d=1;if(b.color||null!=b.Sf)e=R8(b.color||a.g.Xa.color),d=null==b.Sf?a.g.Xa.Sf:b.Sf,e="rgba("+e[0]+","+e[1]+","+e[2]+","+d+")",c.color=e,c.fill=e;if(null!=b.bf&&0!=b.bf){e="rgba(34, 34, 34, "+d+")";d="rgba(204, 204, 204, "+
d+")";b.xr&&(d=e=b.xr);var f;switch(b.bf){case 4:f="2px 2px 3px "+e+", 2px 2px 4px "+e+", 2px 2px 5px "+e;break;case 1:f="1px 1px "+e+", 2px 2px "+e+", 3px 3px "+e;break;case 2:f="1px 1px "+d+", 0 1px "+d+", -1px -1px "+e+", 0 -1px "+e;break;case 3:f="0 0 4px "+e+", 0 0 4px "+e+", 0 0 4px "+e+", 0 0 4px "+e}c["text-shadow"]=f}f="";switch(b.fontFamily){case 1:f='"Courier New", Courier, "Nimbus Mono L", "Cutive Mono", monospace';break;case 2:f='"Times New Roman", Times, Georgia, Cambria, "PT Serif Caption", serif';
break;case 3:f='"Deja Vu Sans Mono", "Lucida Console", Monaco, Consolas, "PT Mono", monospace';break;case 5:f='"Comic Sans MS", Impact, Handlee, fantasy';break;case 6:f='"Monotype Corsiva", "URW Chancery L", "Apple Chancery", "Dancing Script", cursive';break;case 7:f=g.Lh()?'"Carrois Gothic SC", sans-serif-smallcaps':'"Arial Unicode Ms", Arial, Helvetica, Verdana, "Marcellus SC", sans-serif';break;case 0:case 4:f='Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif'}f&&
(c["font-family"]=f);f=b.offset;null==f&&(f=a.g.Xa.offset);switch(f){case 0:c["vertical-align"]="sub";break;case 2:c["vertical-align"]="super"}7==b.fontFamily&&(c["font-variant"]="small-caps");b.bold&&(c["font-weight"]="bold");b.ao&&(c["font-style"]="italic");b.Lo&&(c["text-decoration"]="underline");b.xn&&(c.visibility="hidden");return c},V8=function(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;
for(c in b)if(!(c in a))return!1;return!0},W8=function(a,b){var c={},d=b.getAttribute("wp");
d&&g.va(c,a.gw[d]);d=T8(b,"ap");null!=d&&(c.hg=d);d=P8(b,"cc");null!=d&&(c.Er=d);d=P8(b,"ah");null!=d&&(c.kh=d);d=P8(b,"rc");null!=d&&(c.Ri=d);d=P8(b,"av");null!=d&&(c.Ch=d);return c},X8=function(a,b,c){var d={},e=c.getAttribute("ws");
g.va(d,e?b.hw[e]:a.o);a=T8(c,"mh");null!=a&&(d.co=a);a=T8(c,"ju");null!=a&&(d.textAlign=a);a=T8(c,"pd");null!=a&&(d.Bh=a);a=S8(c,"wfc");null!=a&&(d.windowColor=a);c=P8(c,"wfo");void 0!=c&&(d.Gh=c/255);return d},Y8=function(a,b,c,d,e,f,k,l){switch(f.tagName){case "b":k.bold=!0;
break;case "i":k.ao=!0;break;case "u":k.Lo=!0;break;case "font":var m=f.getAttribute("color");g.Ku.test(m);k.color=m}for(m=0;m<f.childNodes.length;m++){var n=f.childNodes[m];if(3==n.nodeType)l.push(new g.Cu(a,b,c,d,n.nodeValue,e||0<m,g.Ob(k)?void 0:k));else{var t={};g.va(t,k);Y8(a,b,c,d,e||0<m,n,t,l)}}},kxa=function(){this.o=[];
this.b=[];this.g=-1},Z8=function(a,b,c){a.G=a.G||!!c;
var d={};g.va(d,a.g.Xa);g.va(d,c||b.g);g.va(d,a.pa.Xa);var e=a.D[0],f;if(e&&d.background==e.background&&d.Nd==e.Nd&&!!d.xn==!!e.xn&&d.bf==e.bf){for(c=0;c<a.D.length;c++)if(V8(d,a.D[c])){f=a.F[c];break}if(!f){c={};for(var k in d)d[k]!=e[k]&&(c[k]=d[k]);f=g.Le("SPAN");g.ul(f,U8(a,c));a.F[0].appendChild(f);c=1}a.F.length=c;a.D.length=c}else a.F.length=0,a.D.length=0,f=g.Le("SPAN"),g.ul(f,U8(a,d)),a.A.appendChild(f);a.C&&a.C.parentNode!=f&&(g.Re(a.C),f.appendChild(a.C));e=(k=g.w(b.text))?b.text.split("\n"):
[b.text];for(c=0;c<e.length;c++){var l=e[c];if(0<c||0==a.B.length||!b.C){if(0<c||0!=a.B.length){var m=g.Le("BR");f.appendChild(m)}f.appendChild(g.Me("\u00a0"));a.C=g.Me("\u00a0");f.appendChild(a.C)}l&&(m=a.C,m.parentNode&&m.parentNode.insertBefore(k?g.Me(l):l,m))}a.D.push(d);a.F.push(f);a.B.push(b)},$8=function(a){if(a.g.captionTracks.length){var b=a.N.kj().rr;
if(2==b||3==b)return!0}return 1==a.W.pa||1==a.g.Sq||"alwayson"==a.g.De("yt:cc")?!0:2==a.W.pa&&(b=g.Nu(a,"module-enabled"),null!=b)?!!b:"on"==a.g.De("yt:cc")},a9=function(a){a=a.split(":");
for(var b=0,c=0;c<a.length;c++)b=60*b+(0,window.parseFloat)(a[c]);return 1E3*b},b9=function(a,b,c,d,e,f,k,l,m){switch(k.tagName){case "b":l.bold=!0;
break;case "i":l.ao=!0;break;case "u":l.Lo=!0}for(var n=0;n<k.childNodes.length;n++){var t=k.childNodes[n];if(3==t.nodeType)t=new g.Cu(b,c,d,e.id,t.nodeValue,f||0<n,g.Ob(l)?void 0:l),m.push(t),e!=a.o&&e.Vh.push(t);else{var u={};g.va(u,l);b9(a,b,c,d,e,!0,t,u,m)}}},c9=function(a,b,c,d){var e={};
g.va(e,W8(b,c));g.va(e,X8(a,b,c));d?(b="_"+g.Eu++,V8(e,a.o)&&(e=a.o)):b=c.getAttribute("id")||"0";a=P8(c,"t");c=P8(c,"d")||0x8000000000000;return new g.Du(a,c,0,b,e)},d9=function(a,b){var c=a.getAttribute(b);
if(null!=c)return"1"==c},e9=function(a,b,c){var d=a.getAttribute("t"),d=d?(0,window.parseInt)(d,10):1E3*(0,window.parseFloat)(a.getAttribute("start")||0),e=a.getAttribute("d"),e=e?(0,window.parseFloat)(e):1E3*(0,window.parseFloat)(a.getAttribute("dur")||0);
b=a.getAttribute("w")||b;var f=!!a.getAttribute("append"),k=f?6:5;a=g.$o("<html>"+(a.firstChild&&a.firstChild.nodeValue||"")+"</html>");Y8(d,e,k,b,f,a.firstChild,{},c)},f9=function(){this.g=[];
this.b=[]},g9=function(a){if(!a.H){var b=g.Le("SPAN");
g.ul(b,U8(a,a.g.Xa));a.A.appendChild(b);b.appendChild(g.Me("M"));var c=b.offsetHeight,d=g.Le("BR");b.appendChild(d);b.appendChild(g.Me("M"));a.H=b.offsetHeight-c;a.A.removeChild(b)}return a.H},h9=function(){this.ya=[]},i9=function(a){this.xt=!!a;
this.b=new kxa;this.B=[]},j9=function(a,b){g.Wa(b,(0,g.y)(a.H,a))||b.push(a)},k9=function(a){for(var b=1,c=0;c<a.length;c++){var d=a[c];
g.w(d.text)&&(b+=d.text.split("\n").length-1,d.C||0==c||b++)}return b},l9=function(a,b,c,d,e,f){this.B=[];
this.G=!1;this.o=a;this.D=[];this.F=[];this.xa=e;this.sa=f;this.C=null;this.O=.96*e;this.la=.96*f;this.g={};g.va(this.g,b);g.va(this.g,this.o.params);g.va(this.g,c);e={};g.va(e,b.Xa);this.o.params.Xa&&g.va(e,this.o.params.Xa);g.va(e,c.Xa);this.g.Xa=e;this.pa=c;g.R.call(this,{J:"div",Z:"caption-window",X:{id:"caption-window-"+a.id,dir:1==this.g.Bh?"rtl":"ltr",tabindex:0,"aria-live":"assertive",lang:this.g.lang},R:[{J:"span",Z:"captions-text"}]});this.A=this.ua["captions-text"];this.ha=null!=this.A.style["box-decoration-break"]||
null!=this.A.style["-webkit-box-decoration-break"];this.ba=d/360*16;this.type=0;this.Y=this.ba*Q8(e);a=new g.tu(this.element,!0);g.L(this,a);a.subscribe("dragstart",this.gL,this);a.subscribe("dragmove",this.fL,this);a.subscribe("dragend",this.eL,this);this.da=this.ca=0;a="";this.g.Gh&&(a=R8(this.g.windowColor),a="rgba("+a[0]+","+a[1]+","+a[2]+","+this.g.Gh+")");b={"background-color":a,display:!1===this.g.isVisible?"none":"","text-align":lxa[this.g.textAlign]};this.ha&&(b["border-radius"]=a?this.Y/
8+"px":"");g.ul(this.element,b);switch(this.g.hg){case 0:case 1:case 2:g.M(this.element,"ytp-caption-window-top");break;case 6:case 7:case 8:g.M(this.element,"ytp-caption-window-bottom")}},n9=function(a){return g.Gu(a)?!a.g.g:a.g.captionTracks.length&&a.N.kj().ck?!0:$8(a)},p9=function(a,b){f9.call(this);
this.o=g.Fu({co:0});this.b.push(this.o);for(var c=a.split(mxa),d=1;d<c.length;d++){var e=c[d],f=b;if(""!=e&&!nxa.test(e)){var k=g.d8.exec(e);if(k&&3<=k.length){var l=a9(k[1]),k=a9(k[2])-l,e=e.substring(g.d8.lastIndex);g.d8.lastIndex=0;var f=l+f,l=k,m=e,k={},n=this.o,e=5;if(0>m.indexOf("<"))this.g.push(new g.Cu(f,l,e,n.id,m,!1,g.Ob(k)?void 0:k));else{m=m.split(oxa);1!=m.length&&(e=6,n="_"+pxa++,n=new g.Du(f,l,e,n,{}),this.b.push(n));for(var t=f,u=0;u<m.length;u++){var x=m[u];if(0==u%2){var z=g.$o("<html>"+
x+"</html>"),B;z.getElementsByTagName("parsererror").length?(B=z.createElement("span"),B.appendChild(z.createTextNode(x))):B=z.firstChild;b9(this,t,l-(t-f),e,n,0<u,B,k,this.g)}else t=a9(x)}}}g.d8.lastIndex=0}}},q9=function(a,b){f9.call(this);
a.firstChild.getAttribute("format");this.o=b;for(var c={Qk:{},gw:{},hw:{}},d,e,f=a.firstChild.childNodes,k=0;k<f.length;k++){var l=f[k];switch(l.tagName){case "head":d=l;break;case "body":e=l}}if(d)for(d=d.childNodes,f=0;f<d.length;f++){var m=d[f];switch(m.tagName){case "pen":var l=m.getAttribute("id"),k=c.Qk,n=c,t=m,m={},u=t.getAttribute("p");u&&g.va(m,n.Qk[u]);n=d9(t,"b");null!=n&&(m.bold=n);n=d9(t,"i");null!=n&&(m.ao=n);n=d9(t,"u");null!=n&&(m.Lo=n);n=T8(t,"et");null!=n&&(m.bf=n);n=T8(t,"of");
null!=n&&(m.offset=n);n=S8(t,"bc");null!=n&&(m.background=n);n=S8(t,"ec");null!=n&&(m.xr=n);n=S8(t,"fc");null!=n&&(m.color=n);n=T8(t,"fs");void 0!=n&&0!=n&&(m.fontFamily=n);n=P8(t,"sz");void 0!=n&&(m.Pg=n/100-1);n=P8(t,"bo");void 0!=n&&(m.Nd=n/255);t=P8(t,"fo");void 0!=t&&(m.Sf=t/255);k[l]=m;break;case "ws":k=m.getAttribute("id");c.hw[k]=X8(this,c,m);break;case "wp":k=m.getAttribute("id"),c.gw[k]=W8(c,m)}}if(e)for(d={},e=e.childNodes,f=void 0,k=0;k<e.length;k++)switch(l=e[k],l.tagName){case "w":m=
c9(this,c,l);if(l=d[m.id])l.end=m.start;d[m.id]=m;this.b.push(m);break;case "p":var m=c,x=l,z=f,t=[],n=P8(x,"t")||0,u=P8(x,"d")||0,B=x.getAttribute("w")||"0",G=!!d9(x,"a");z&&"\n"==z.text&&!G&&(G=!0);for(var z=G?6:5,J=m.Qk[x.getAttribute("p")],x=x.childNodes,O=0;O<x.length;O++){var Qa=x[O];0<O&&(G=!0);if("s"==Qa.tagName)var bb=Qa,Qa=n,rb=u,Zc=B,bp=G,Os=z,Ps=bb.textContent?bb.textContent:"",Qs=m.Qk[bb.getAttribute("p")],bb=P8(bb,"t")||0,Qa=new g.Cu(Qa+bb,rb-bb,Os,Zc,Ps,bp,Qs);else Qa=new g.Cu(n,u,
z,B,Qa.textContent||"",G,J);t.push(Qa)}if(0<t.length)for(f=t[t.length-1],m=d[t[0].o],m||(m=c9(this,c,l,!0),this.b.push(m)),l=0;l<t.length;l++)n=t[l],t[l].o=m.id,m.Vh.push(n),this.g.push(n)}},r9=function(a){f9.call(this);
this.o={};var b=g.Fu();this.o[b.id]=b;this.b.push(b);for(a=a.firstChild.firstChild;a;){switch(a.tagName){case "window":var c=a,d=c.getAttribute("id");a:{var e=c,f=this.o[d];if(e.getAttribute("t")||e.getAttribute("start")){c=e.getAttribute("start")?1E3*(0,window.parseFloat)(e.getAttribute("start")):(0,window.parseInt)(e.getAttribute("t"),10);f&&(f.end>=c?f.end=c:f=null);switch(e.getAttribute("op")){case "kill":c=null;break a;case "define":f=null}f||(f=g.Fu());var k={};f&&(g.va(k,f.params),f=f.params.Xa)&&
(k.Xa={},g.va(k.Xa,f));e.getAttribute("rc")&&(k.Ri=(0,window.parseInt)(e.getAttribute("rc"),10));e.getAttribute("cc")&&(k.Er=(0,window.parseInt)(e.getAttribute("cc"),10));e.getAttribute("ap")&&(f=(0,window.parseInt)(e.getAttribute("ap"),10),k.hg=0>f||8<f?7:f);e.getAttribute("ah")&&(k.kh=(0,window.parseInt)(e.getAttribute("ah"),10));e.getAttribute("av")&&(k.Ch=(0,window.parseInt)(e.getAttribute("av"),10));e.getAttribute("vs")&&(k.isVisible=!!e.getAttribute("vs"));e.getAttribute("ju")&&(k.textAlign=
(0,window.parseInt)(e.getAttribute("ju"),10));e.getAttribute("pd")&&(k.Bh=1,0==(0,window.parseInt)(e.getAttribute("pd"),10)&&(k.Bh=0));e.getAttribute("bc")&&(k.Xa||(k.Xa={}),k.Xa.backgroundColor=e.getAttribute("bc"));e.getAttribute("bo")&&(k.Xa||(k.Xa={}),k.Xa.Nd=(0,window.parseInt)(e.getAttribute("bo"),10)/100);e.getAttribute("fc")&&(k.Xa||(k.Xa={}),k.Xa.color=e.getAttribute("fc"));e.getAttribute("sd")&&(k.MI=(0,window.parseInt)(e.getAttribute("sd"),10));f=(0,window.parseInt)(e.getAttribute("d"),
10)||1E3*(0,window.parseFloat)(e.getAttribute("dur"))||0x8000000000000;e=e.getAttribute("id")||"0";c=new g.Du(c,f,0,e,k)}else c=null}this.o[d]=c;this.b.push(c);break;case "text":for(d=this.g.length,e9(a,b.id,this.g);d<this.g.length;d++)c=this.g[d],(k=this.o[c.o])&&k.Vh.push(c)}a=a.nextSibling}0==this.b.length&&this.b.push(g.Fu())},s9=function(a,b){f9.call(this);
var c=g.Fu(b);this.b.push(c);for(var d=a.firstChild.childNodes,e=0,f=d.length;e<f;e++)e9(d[e],c.id,this.g)},t9=function(a,b,c,d){i9.call(this,d);
c||(c=g.zh(a).hl||"",c=c.split("_").join("-"));this.o=g.Bh(a,{hl:c});this.A=b;this.C={};this.g=null},u9=function(a,b,c,d,e,f){l9.call(this,a,b,c,d,e,f);
g.M(this.element,"ytp-caption-window-rollup");this.type=2;this.H=this.V=0;this.ga=window.NaN;this.L=null;this.K=new g.Dd(this.ra,433,this);g.L(this,this.K)},v9=function(a,b,c,d,e,f){l9.call(this,a,b,c,d,e,f);
this.type=1},w9=function(a,b){i9.call(this);
this.o=a;this.$=b;this.g=null},x9=function(a,b,c,d){g.K.call(this);
this.G=b;this.B=new h9;this.b=null;this.F=d;this.g=this.o=null;this.K=c;this.C=new g.Dd(this.D,1E3,this);g.L(this,this.C);b.addEventListener("seekto",this.A,this);this.A(b.getCurrentTime());this.D()},y9=function(a){i9.call(this,a.Qc);
this.g=null;this.A=void 0;this.o=null;this.B=a.captionTranslationLanguages},qxa=function(a,b){var c=g.Va(a.b,(0,g.y)(b.H,b));
-1!=c&&(a.g=c)},z9=function(a,b){switch(b.A){case "asr":j9(b,a.o);
break;default:if(b.isDefault||0>a.g)a.g=a.b.length;j9(b,a.b)}},A9=function(a){return a.b?a.b.languageCode:a.g},rxa=function(a){for(var b in a)delete a[b]},B9=function(a,b){return g.aa[a]=b},C9=function(a){g.hm.call(this,a);
g.qu();this.W=g.T(a);this.g=a.getVideoData();this.aa=g.Wt(a);this.$=a;var b=null,c=g.ui("yt-html5-player-modules::subtitlesModuleData");c&&(b=new g.vi(c));this.O=b;this.A={Xa:{}};this.B={Xa:{}};this.F=[];this.D={};this.K={};this.H=!1;this.da="1"==this.g.B.cc_auto_caps||"1"==this.W.G.cc_auto_caps;c=b=this.o=this.b=this.C=this.G=this.Y=null;g.Gu(this)||(b=new g.Dd(this.Uv,0,this),g.L(this,b),c=new g.Dd(this.iI,2E3,this),g.L(this,c));this.V=b;this.ba=c;this.L=new g.mm(this);g.L(this,this.L);g.Gu(this)||
this.L.U(a,"resize",this.No);this.L.U(a,"onPlaybackAudioChange",this.dE);this.L.U(a,"crn_captions",this.NK,this);this.L.U(a,"crx_captions",this.OK,this);g.Mu(this,g.Nu(this,"display-settings")||{});n9(this)&&this.load()},ixa=/^#(?:[0-9a-f]{3}){1,2}$/i,jxa=/#(.)(.)(.)/,lxa=["left",
"right","center"],oxa=/<((?:[\d]{2}:)?[\d]{2}:[\d]{2}\.[\d]{3})>/,mxa=/(?:\r\n|\r|\n){2,}/,nxa=/^NOTE/,pxa=0,sxa={xn:!0};h9.prototype.contains=function(a){a=g.qb(this.ya,a);return 0<=a||0>a&&1==(-a-1)%2};
h9.prototype.length=function(){return this.ya.length/2};
g.C(i9,g.K);i9.prototype.os=function(a){var b=this.b.g,c=g.xu(this.b,!0);a&&0>b&&0<c.length&&(b=0);return 0>b?null:c[b]};
i9.prototype.gk=function(){return null};
i9.prototype.S=function(){i9.M.S.call(this);this.ee()};
g.C(l9,g.R);g.h=l9.prototype;g.h.gL=function(a,b){var c=g.Il(this.element,this.element.parentElement);this.ca=a-c.x;this.da=b-c.y;g.M(this.element,"ytp-dragging")};
g.h.fL=function(a,b){var c=g.Ll(this.element),d=a-this.ca-.02*this.xa,e=b-this.da-.02*this.sa,f=(d+c.width/2)/this.O*3,f=Math.floor(g.ne(f,0,2)),k=(e+c.height/2)/this.la*3,k=Math.floor(g.ne(k,0,2)),l=f+3*k,d=(d+f/2*c.width)/this.O,d=100*g.ne(d,0,1),c=(e+k/2*c.height)/this.la,c=100*g.ne(c,0,1);this.o.params.hg=l;this.o.params.Ch=c;this.o.params.kh=d;this.g.hg=l;this.g.Ch=c;this.g.kh=d;this.yh(this.B)};
g.h.eL=function(){g.Kd(this.element,"ytp-dragging")};
g.h.Rb=function(){return this.type};
g.h.yh=function(a){var b=Math.min(this.rs(),this.O),c=this.qs();g.ul(this.element,{top:0,left:0,right:"",bottom:"",width:b?b+"px":"96%",height:c?c+"px":"96%",margin:"",transform:""});this.zm(a);a={transform:"",top:"",left:""};b||(a.width="");c||(a.height="");var d=.96*this.g.kh+2,e=this.g.hg;switch(e){case 0:case 3:case 6:a.left=d+"%";break;case 1:case 4:case 7:a.left=d+"%";d=this.A.offsetWidth;b||d?(b=b||d+1,a.width=b+"px",a["margin-left"]=b/-2+"px"):a.transform+=" translateX(-50%)";break;case 2:case 5:case 8:a.right=
100-d+"%"}b=.96*this.g.Ch+2;switch(e){case 0:case 1:case 2:a.top=b+"%";break;case 3:case 4:case 5:a.top=b+"%";(c=c||this.A.offsetHeight)?(a.height=c+"px",a["margin-top"]=c/-2+"px"):a.transform+=" translateY(-50%)";break;case 6:case 7:case 8:a.bottom=100-b+"%"}g.ul(this.element,a)};
g.h.zm=function(a){for(var b=0;b<a.length&&a[b]==this.B[b];b++);if(this.G||this.B.length>b)b=0,this.G=!1,this.B=[],this.D=[],this.F=[],this.C=null,g.Pe(this.A);for(;b<a.length;b++)Z8(this,a[b])};
g.h.rs=function(){return 0};
g.h.qs=function(){return 0};
g.h.toString=function(){return l9.M.toString.call(this)};
g.C(p9,f9);g.C(q9,f9);g.C(r9,f9);g.C(s9,f9);g.C(t9,i9);g.h=t9.prototype;g.h.lh=g.ba(3);g.h.mh=g.ba(9);g.h.Cf=g.ba(6);g.h.ee=function(){this.g&&this.g.abort()};
g.h.S=function(){this.ee();t9.M.S.call(this)};
g.C(u9,l9);u9.prototype.ra=function(){g.Kd(this.element,"ytp-rollup-mode");var a=this.L;this.L=null;this.yh(a)};
u9.prototype.rs=function(){var a=this.o.params.Er;if(!this.V&&a){var b=g.Le("SPAN");g.Ze(b,"\u00a0"+(0,g.Ga)("\u2014",a)+"\u00a0");g.ul(b,U8(this,this.g.Xa));this.A.appendChild(b);this.V=b.offsetWidth;this.A.removeChild(b)}return this.V};
u9.prototype.qs=function(){return this.o.params.Ri*g9(this)};
u9.prototype.yh=function(a){if(g9(this)){for(var b=0,c=0;b<this.B.length&&c<a.length;b++)this.B[b]==a[c]&&c++;var d=k9(a),e=!1,b=0;if(0<c&&c<a.length){var c=this.B.concat(a.slice(c)),f=k9(c)-d;0<f&&(this.L=a,a=c,b-=f,e=!0)}d<this.o.params.Ri&&(b+=this.o.params.Ri-d);e&&!this.K.isActive()&&(g.M(this.element,"ytp-rollup-mode"),this.K.start());b!=this.ga&&(d="",b&&(d="translateY("+Math.ceil(b*g9(this))+"px)"),g.ul(this.A,"transform",d),this.ga=b);u9.M.yh.call(this,a)}else u9.M.yh.call(this,a)};
g.C(v9,l9);v9.prototype.zm=function(a){var b=this.o.Vh;v9.M.zm.call(this,a);var c,d;for(a=a.length;a<b.length;a++){var e=b[a],f;d&&e.g==c?f=d:(f={},g.va(f,e.g),g.va(f,sxa),c=e.g,d=f);Z8(this,e,f)}};
g.C(w9,i9);g.h=w9.prototype;g.h.lh=g.ba(4);g.h.mh=g.ba(10);g.h.ee=function(){this.g&&(this.g.dispose(),this.g=null)};
g.h.Cf=g.ba(7);g.h.S=function(){this.ee();w9.M.S.call(this)};
g.C(x9,g.K);x9.prototype.S=function(){x9.M.S.call(this);this.G.removeEventListener("seekto",this.A,this);this.g&&this.g.abort()};
x9.prototype.A=function(a){this.b=g.Ua(this.K.ri(a).b)};
x9.prototype.D=function(){this.isDisposed();var a;if(a=null!==this.b)a=this.b,a=a.b.sp(a);if(a&&!this.g&&!(this.b&&30<this.b.startTime-this.G.getCurrentTime())){a=this.b;a=a.b.Fl(a);if(!this.B.contains(a.b[0].o)){var b=g.Jw(g.Sw(a));this.g=g.hi(b,{format:"RAW",Zc:(0,g.y)(this.H,this),withCredentials:!0});this.o=a;var b=this.B,c=this.o.b[0].o,d=g.qb(b.ya,c);0<=d||0>d&&1==(-d-1)%2||(d=-d-1,0<d&&1==c-b.ya[d-1]&&d<b.ya.length&&1==b.ya[d]-c?(g.db(b.ya,d),g.db(b.ya,d-1)):0<d&&1==c-b.ya[d-1]?b.ya[d-1]=c:
d<b.ya.length&&1==b.ya[d]-c?b.ya[d]=c:(g.lb(b.ya,d,0,c),g.lb(b.ya,d+1,0,c)))}this.b=g.Ua(a.b)}this.C.start()};
x9.prototype.H=function(a){this.isDisposed();null==a.responseText||400<=a.status||null===this.F||this.F(a.responseText,1E3*this.o.b[0].startTime);this.g=this.o=null};
g.C(y9,i9);g.h=y9.prototype;g.h.lh=g.ba(5);g.h.mh=g.ba(11);g.h.Cf=g.ba(8);g.h.gk=function(){return this.g?this.g.ck:null};
g.h.os=function(){return this.g?this.g.Pm:null};
g.h.ee=function(){this.o&&this.o.abort()};
g.h.S=function(){this.ee();y9.M.S.call(this)};
var txa=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;y9.prototype.mh=B9(11,function(a,b,c,d){this.A=c;if(this.g=d||null)for(b=0;b<this.g.captionTracks.length;b++)z9(this.b,this.g.captionTracks[b]);a()});
w9.prototype.mh=B9(10,function(a){z9(this.b,new g.An({format:1,languageCode:"en",languageName:"English",name:"",is_servable:!0,is_default:!0,is_translateable:!1}));a()});
t9.prototype.mh=B9(9,function(a,b,c){var d=this.o;b={type:"list",tlangs:1,v:this.A,fmts:Number(b||!1),vssids:1};this.xt&&(b.asrs=1);d=g.Bh(d,b);b=(0,g.y)(function(b){this.g=null;if((b=b.responseXML)&&b.firstChild){for(var d=this.b,e=b.getElementsByTagName("track"),l=e.length,m=0;m<l;m++){var n=e[m].getAttribute("formats"),t=c,u=e[m].getAttribute("lang_code"),x=e[m].getAttribute("lang_translated"),z=e[m].getAttribute("name"),B=e[m].getAttribute("kind"),G=e[m].getAttribute("id"),J="true"==e[m].getAttribute("lang_default"),
O="true"==e[m].getAttribute("cantran"),Qa=e[m].getAttribute("vss_id");z9(d,new g.An({formats:n,format:t,languageCode:u,languageName:x,name:z,kind:B,id:G,is_servable:!0,is_default:J,is_translateable:O,vss_id:Qa}))}b=b.getElementsByTagName("target");d=b.length;for(e=0;e<d;e++)l=b[e].getAttribute("lang_code"),m=b[e].getAttribute("lang_translated"),n=b[e].getAttribute("lang_original"),t=b[e].getAttribute("id"),u="true"==b[e].getAttribute("lang_default"),l={languageCode:l,languageName:m,languageOriginal:n,
id:t,is_default:u},this.C[l.languageCode]=l.languageName,this.B.push(new g.zn(l))}a()},this);
this.ee();this.g=g.hi(d,{format:"RAW",Bb:b,withCredentials:!0})});
y9.prototype.Cf=B9(8,function(a){var b=a.G,c={};if(this.A||a.o)c.fmt=this.A||"srv"+a.o;a.b&&(c.tlang=a.b.languageCode);return g.Bh(b,c)});
w9.prototype.Cf=B9(7,function(){return""});
t9.prototype.Cf=B9(6,function(a){var b=this.o,c={v:this.A,type:"track",lang:a.g,name:a.getName(),kind:a.A,fmt:a.o};a.b&&(c.tlang=A9(a));return b=g.Bh(b,c)});
y9.prototype.lh=B9(5,function(a,b){this.isDisposed();var c=this.Cf(a),d=(0,g.y)(function(c){this.o=null;b(c.responseText,a)},this);
this.ee();this.o=g.hi(c,{format:"RAW",Bb:d,withCredentials:!0});this.g&&this.g.ck!=a&&(this.g.Pm=a)});
w9.prototype.lh=B9(4,function(a,b){this.ee();var c=this.o.b[a.g];c&&(this.g=new x9(0,this.$,c,function(c,e){b(c,a,e)}))});
t9.prototype.lh=B9(3,function(a,b){this.isDisposed();var c=this.Cf(a),d=(0,g.y)(function(c){this.g=null;b(c.responseText,a)},this);
this.ee();this.g=g.hi(c,{format:"RAW",Bb:d,withCredentials:!0});qxa(this.b,a)});
g.Mn.prototype.Lj=B9(2,function(a){for(var b=0;b<a.length;b++)this.b.appendChild(a[b])});
g.k3.prototype.Lj=B9(1,function(){});
g.An.prototype.H=B9(0,function(a){return a?this.toString()==a.toString():!1});
g.C(C9,g.hm);g.h=C9.prototype;g.h.S=function(){g.Gu(this)||g.Su(this,!1);C9.M.S.call(this)};
g.h.load=function(a){C9.M.load.call(this);if(this.b||a)this.o?(a?this.Mu(a,this.o):3!=this.N.$a()&&this.b.lh(this.o,(0,g.y)(this.Mu,this)),this.N.Ca("captionschanged",g.Cn(this.o))):this.N.Ca("onCaptionsTrackListChanged");else{var b;this.g.g?b=new w9(this.g.b,this.N):(a=(a=this.g.Qq||this.W.sc||this.g.De("yt:cc_default_lang")||this.W.Na)&&a.split("_").join("-"),this.g.captionTracks.length?b=new y9(this.g):b=new t9(this.g.wd,this.g.videoId,a,this.g.Qc));this.b=b;b.mh((0,g.y)(this.jH,this),!0,g.Gu(this)?
"vtt":void 0,this.N.kj())}};
g.h.unload=function(){if(g.Gu(this))for(var a=g.Ae("track",void 0,this.aa.g),b=0;b<a.length;b++)g.Re(a[b]);else g.Fd(this.ba),g.Ai(this.N,"captions"),this.F=[],this.b&&this.b.ee(),this.C&&this.N.Eb(this.C),this.No();C9.M.unload.call(this);(a=g.kv(this.N.app))&&g.MV(a);this.N.Ca("captionschanged",{})};
g.h.jH=function(){var a;if(this.H||$8(this))a=g.Hu(this,this.H);if(g.Gu(this))for(var b=g.xu(this.b.b,!0),c=0;c<b.length;c++){var d=b[c],e={kind:"subtitles",label:g.Bn(d),srclang:A9(d),src:this.b.Cf(d)};d==a&&(e["default"]=1);this.$.app.C.Lj([g.N("TRACK",e)])}else!this.o&&a&&g.Iu(this,a),this.N.Ca("onCaptionsTrackListChanged")};
g.h.Mu=function(a,b,c){if(a){var d;d={};var e=A9(b);e&&(d.lang=e,txa.test(e)&&(d.Bh=1));d="WEBVTT"==a.substring(0,6)?new p9(a,c||0):(a=g.$o(a))&&a.firstChild?"timedtext"==a.firstChild.tagName?3==(0,window.parseInt)(a.firstChild.getAttribute("format"),10)?new q9(a,d):new r9(a):new s9(a,d):new f9;a={trackName:b.getName(),trackKind:b.A,trackLangCode:A9(b)};b.b&&(a.fromLangCode=b.g);g.or(this.N,"cc",a);this.o!=this.b.gk()&&(!this.H||g.Qo(this.W)||g.So(this.W)||(g.Fd(this.ba),b=g.Fu({hg:0,kh:5,Ch:5,Ri:2,
textAlign:0,Bh:0,lang:"zh-CN"}),this.G=[b],a=g.P("YTP_CLICK_FOR_SETTINGS").split("$GEAR_ICON"),this.Y||(c=new g.Kj(g.Kg()),g.L(this,c),this.Y=c.element),c=b.end-b.start,(e=g.Bn(this.o))&&this.G.push(new g.Cu(b.start,c,0,b.id,e)),this.G.push(new g.Cu(b.start,c,0,b.id,a[0]),new g.Cu(b.start,c,0,b.id,this.Y,!0),new g.Cu(b.start,c,0,b.id,a[1],!0)),this.N.Eb(this.G),this.ba.ae()),(this.H||g.Qo(this.W))&&g.Lu(this,"module-enabled",!0),(b=g.kv(this.N.app))&&g.MV(b));this.N.Eb(d.b.concat(d.g));this.H=!1}};
g.h.NK=function(a){this.F.push(a);this.V.ae()};
g.h.OK=function(a){g.eb(this.F,a);this.V.ae()};
g.h.ZH=function(a){if(a instanceof g.Du){var b=this.D[a.id];b&&b.o!=a&&(b.dispose(),delete this.D[a.id],b=null);if(!b){var b=this.D,c=a.id;a:{var d=this.aa.Sa(),e=g.Vt(this.aa,!0).height;switch(null!=a.params.co?a.params.co:a.params.MI?2:1<a.Vh.length?1:0){case 1:a=new v9(a,this.A,this.B,e,d.width,d.height);break a;case 2:a=new u9(a,this.A,this.B,e,d.width,d.height);break a;default:a=new l9(a,this.A,this.B,e,d.width,d.height)}}b[c]=a}}else b=a.o,this.K[b]||(this.K[b]=[]),this.K[b].push(a)};
g.h.iI=function(){g.Uu(this,this.G);this.G=null};
g.h.Uv=function(){this.V.stop();rxa(this.K);this.F.sort(g.xi);(0,g.H)(this.F,this.ZH,this);g.Db(this.D,function(a,b){!this.K[b]||this.C&&-1==this.C.indexOf(a.o)?(a.dispose(),delete this.D[b]):(a.element.parentNode||g.ts(this.N,a.element,5),a.yh(this.K[b]))},this)};
g.h.No=function(){!g.Gu(this)&&this.loaded&&(g.Db(this.D,function(a,b){a.dispose();delete this.D[b]},this),this.Uv())};
g.h.$f=function(){var a="reload fontSize track tracklist translationLanguages displaySettings sampleSubtitle".split(" ");this.W.ib&&a.push("stickyLoading","xmlTrack");return a};
g.h.dE=function(){this.g.captionTracks.length&&(this.loaded&&this.unload(),n9(this)&&this.load())};
window._exportCheck==g.wa&&g.ka("ytmod.player.captions",C9,void 0);})(_yt_player);
