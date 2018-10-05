(function(g){var window=this;var U8=function(a,b,c,d){var e=b.Jb();g.we(a.element,"ytp-suggestion-set",!!e.videoId);var f=b.dh();d=b.Gc(c,d?d:"mqdefault.jpg");var k=b instanceof g.eA?g.Zk(b.lengthSeconds):null,l=!!f,f=l&&"RD"==g.BA(f).type;c={title:b.title,author:b.author,author_and_views:e.shortViewCount?b.author+" \u2022 "+e.shortViewCount:b.author,watch:g.N("YTP_WATCH_VIDEO_OR_PLAYLIST",{TITLE:b.title},b.title),duration:k,url:b.Dj(c),is_list:l,is_mix:f,background:d?"background-image: url("+d+")":""};b instanceof g.EA&&(c.playlist_length=
b.A);a.update(c)},V8=function(a){var b=g.T(a),c=b.experiments.$("video_wall_moving_thumbnails_autoplay"),d=b.experiments.$("video_wall_moving_thumbnails_hover"),c=c||d;
this.B=b.B&&!b.D;b={J:"img",Z:"ytp-videowall-moving-thumbnail",X:{src:"{{moving_thumbnail}}"}};g.R.call(this,{J:"a",Z:"ytp-videowall-still",X:{href:"{{url}}",target:this.B?"_blank":null,"aria-label":"{{watch}}","data-is-list":"{{is_list}}","data-is-mix":"{{is_mix}}"},U:[{J:"div",Z:"ytp-videowall-still-image",X:{style:"{{background}}"}},c?b:null,{J:"span",Z:"ytp-videowall-still-info",U:[{J:"span",Z:"ytp-videowall-still-info-bg",U:[{J:"span",Z:"ytp-videowall-still-info-content",X:g.Xi||g.Lc?{style:"will-change: opacity"}:
null,U:[{J:"span",Z:"ytp-videowall-still-info-title",U:["{{title}}"]},{J:"span",Z:"ytp-videowall-still-info-author",U:["{{author_and_views}}"]},{J:"span",Z:"ytp-videowall-still-info-duration",U:["{{duration}}"]}]}]}]},{J:"span",ga:["ytp-videowall-still-listlabel-regular","ytp-videowall-still-listlabel"],U:[{J:"span",Z:"ytp-videowall-still-listlabel-icon"},g.N("YTP_PLAYLIST"),{J:"span",Z:"ytp-videowall-still-listlabel-length",U:[" (",{J:"span",U:["{{playlist_length}}"]},")"]}]},{J:"span",ga:["ytp-videowall-still-listlabel-mix",
"ytp-videowall-still-listlabel"],U:[{J:"span",Z:"ytp-videowall-still-listlabel-mix-icon"},g.N("YTP_MIX"),{J:"span",Z:"ytp-videowall-still-listlabel-length",U:[" (50+)"]}]}]});this.g=a;this.o=null;this.R("click",this.VJ);this.R("keypress",this.WJ);c&&this.T(this.wa["ytp-videowall-moving-thumbnail"],"load",this.YJ);g.T(a).experiments.$("player_interaction_logging")&&(a=a.app.ca,g.xb(a.B,this),b=String(a.F++),this.element.setAttribute("data-visual-id",b),g.Ub(this,(0,g.y)(a.D,a,this)))},W8=function(a){if(5E5<
g.ax(a.g.app.la)){var b=a.o.wj();
b&&a.update({moving_thumbnail:b})}},X8=function(a){g.NA.call(this,a,{J:"div",
ga:["ytp-thumbnail-overlay","ytp-channel-overlay"],U:[{J:"div",Z:"ytp-thumbnail-overlay-image",X:{style:"{{background}}"}},{J:"div",Z:"ytp-thumbnail-overlay-curtain"}]})},Y8=function(a){var b=g.T(a).experiments.$("moving_thumbnails_autonav"),c={J:"img",
Z:"ytp-upnext-moving-thumbnail",X:{src:"{{moving_thumbnail}}"}},c={J:"div",Z:"ytp-upnext",X:{"aria-label":"{{watch}}"},U:[{J:"div",Z:"ytp-thumbnail-overlay-image",X:{style:"{{background}}"}},b?c:null,{J:"div",Z:"ytp-thumbnail-overlay-curtain"},{J:"span",Z:"ytp-upnext-top",U:[{J:"span",Z:"ytp-upnext-header",U:[g.N("YTP_PLAYLIST_UP_NEXT")]},{J:"span",Z:"ytp-upnext-title",U:["{{title}}"]},{J:"span",Z:"ytp-upnext-author",U:["{{author}}"]}]},{J:"a",Z:"ytp-upnext-autoplay-icon",X:{href:"{{url}}"},U:[{J:"svg",
X:{height:"100%",version:"1.1",viewBox:"0 0 98 98",width:"100%"},U:[{J:"circle",Z:"ytp-svg-autoplay-circle",X:{cx:"49",cy:"49",fill:"#000","fill-opacity":"0.8",r:"48"}},{J:"circle",Z:"ytp-svg-autoplay-ring",X:{cx:"-49",cy:"49","fill-opacity":"0",r:"46.5",stroke:"#FFFFFF","stroke-dasharray":"293","stroke-dashoffset":"-293","stroke-width":"4",transform:"rotate(-90)"}},{J:"polygon",Z:"ytp-svg-autoplay-triangle",X:{fill:"#fff",points:"32,27 72,49 32,71"}}]}]},{J:"span",Z:"ytp-upnext-bottom",U:[{J:"span",
Z:"ytp-upnext-cancel"},{J:"span",Z:"ytp-upnext-paused",U:[g.N("YTP_AUTOPLAY_PAUSED_2")]}]},{J:"span",Z:"ytp-upnext-close"}]};g.R.call(this,c);this.C=null;var d=this.wa["ytp-upnext-cancel"],c=this.wa["ytp-upnext-close"];this.C=new g.R({J:"button",ga:["ytp-upnext-cancel-button","ytp-button"],X:{tabindex:0,"aria-label":g.N("YTP_AUTOPLAY_CANCEL")},U:[g.N("YTP_CANCEL")]});g.I(this,this.C);this.C.R("click",this.Js,this);this.C.Ea(d);d=new g.R({J:"button",ga:["ytp-upnext-close-button","ytp-button"]});g.I(this,
d);d.R("click",this.Js,this);d.Ea(c);this.g=a;this.H=this.wa["ytp-svg-autoplay-ring"];this.D=this.B=this.o=this.A=null;this.F=new g.ne(this.kj,5E3,this);g.I(this,this.F);this.G=0;this.T(this.wa["ytp-upnext-autoplay-icon"],"click",this.bF);this.Hs();this.T(a,"autonavvisibility",this.Hs);this.T(a,"mdxnowautoplaying",this.sE);this.T(a,"mdxautoplaycanceled",this.tE);this.T(a,"mdxautoplayupnext",this.VH);b&&this.T(this.wa["ytp-upnext-moving-thumbnail"],"load",this.zL)},Z8=function(a,b){a.A=b;
U8(a,b,g.T(a.g),"hqdefault.jpg");g.ue(a.element,"ytp-moving-thumbnail-loaded");a.update({moving_thumbnail:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"});if(5E5<g.ax(a.g.app.la)){var c=a.A.wj();c&&a.update({moving_thumbnail:c})}},$8=function(a,b){a.o||(g.kj("a11y-announce",g.N("YTP_PLAYLIST_UP_NEXT")+" "+a.A.title),a.G=(0,g.Gk)(),a.o=new g.ne(a.zl,25,a),a.zl(b));
g.ue(a.element,"ytp-upnext-autoplay-paused")},b9=function(a){a9(a);
a.G=(0,g.Gk)();a.zl();g.L(a.element,"ytp-upnext-autoplay-paused")},a9=function(a){a.o&&(a.o.dispose(),a.o=null)},c9=function(a,b){g.LA.call(this,{J:"div",
ga:["html5-endscreen","ytp-player-content",b||"base-endscreen"]});this.O=a;this.L=!1},d9=function(a){a=g.T(a);
return a.Td&&!a.oa},e9=function(a,b){c9.call(this,a,"videowall-endscreen");
this.aa=a;this.S=b;this.D=0;this.g=[];this.F=this.B=this.A=null;this.G=this.M=!1;this.C=new g.cn(this);g.I(this,this.C);this.H=new g.ne(g.z(g.L,this.element,"ytp-show-tiles"),0);g.I(this,this.H);var c=new g.R({J:"button",ga:["ytp-button","ytp-endscreen-previous"],X:{"aria-label":g.N("YTP_PREVIOUS")},U:[{J:"svg",X:{height:"100%",version:"1.1",viewBox:"0 0 32 32",width:"100%"},U:[{J:"path",X:{d:"M 19.41,20.09 14.83,15.5 19.41,10.91 18,9.5 l -6,6 6,6 z",fill:"#fff"}}]}]});g.I(this,c);c.Ea(this.element);
c.R("click",this.TJ,this);this.K=new g.Rk({J:"div",Z:"ytp-endscreen-content"});g.I(this,this.K);this.K.Ea(this.element);c=new g.R({J:"button",ga:["ytp-button","ytp-endscreen-next"],X:{"aria-label":g.N("YTP_NEXT")},U:[{J:"svg",X:{height:"100%",version:"1.1",viewBox:"0 0 32 32",width:"100%"},U:[{J:"path",X:{d:"m 12.59,20.34 4.58,-4.59 -4.58,-4.59 1.41,-1.41 6,6 -6,6 z",fill:"#fff"}}]}]});g.I(this,c);c.Ea(this.element);c.R("click",this.SJ,this);this.o=new Y8(a);g.I(this,this.o);g.es(this.O,this.o.element,
4);this.ua()},f9=function(a){return(0,g.S)(a.L,function(a){return g.MA(a)})},g9=function(a,b,c){return 0==b&&a.A.length&&(b=c/e9.b,2<=c/e9.b&&2<=b&&g.T(a.O).experiments.$("video_wall_emphasize_first"))?2*e9.b:e9.b},h9=function(a){var b=a.S.yo();
b!=a.M&&(a.M=b,a.O.W("autonavvisibility"))},i9=function(a){c9.call(this,a,"subscribecard-endscreen");
var b=a.getVideoData();this.g=new X8(a);g.I(this,this.g);g.es(this.O,this.g.element,4);this.o=new g.R(["div","ytp-subscribe-card",["img","ytp-author-image",{src:b.profilePicture}],["div","ytp-subscribe-card-right",["div","ytp-author-name",b.author],["div","html5-subscribe-button-container"]]]);g.I(this,this.o);this.o.Ea(this.element);this.A=new g.vs(g.N("YTP_SUBSCRIBE"),g.N("YTP_UNSUBSCRIBE"),!0,b.vp,b.subscribed,"trailer-endscreen",a);g.I(this,this.A);this.A.Ea(this.o.wa["html5-subscribe-button-container"]);
this.ua()},j9=function(a){g.ym.call(this,a);
g.wi({});this.b=null;this.isAvailable=!0;this.g=new g.cn(this);g.I(this,this.g);this.o=g.T(a);d9(a)?this.b=new e9(this.O,this):this.o.oa?this.b=new i9(this.O):this.b=new c9(this.O);g.I(this,this.b);g.es(this.O,this.b.element,4);this.Ut();this.g.T(a,"videodatachange",this.Ut,this);this.g.T(a,"crn_endscreen",this.EJ,this);this.g.T(a,"crx_endscreen",this.FJ,this)};
g.A(V8,g.R);g.h=V8.prototype;g.h.rf=function(){var a=this.o.Jb().videoId;g.z7(this.g.app,a,this.o.Vc,this.o.dh(),void 0,void 0)};
g.h.VJ=function(a){g.Fw(this.g,this);g.Ll(a,this.g,!this.g.isFullscreen()&&this.B,this.o.Vc)&&this.rf()};
g.h.XJ=function(){this.Ba(this.A);this.A=null;W8(this)};
g.h.WJ=function(a){switch(a.keyCode){case 13:case 32:g.ek(a)||(this.rf(),g.dk(a))}};
g.h.YJ=function(a){120<g.Zj(a).naturalWidth&&g.L(this.element,"ytp-videowall-moving-thumbnail-loaded")};
g.A(X8,g.NA);X8.prototype.ub=function(a){a?this.A.show():g.Br(this.A)};
g.A(Y8,g.R);g.h=Y8.prototype;g.h.kj=function(){this.B&&(this.F.stop(),this.Ba(this.D),this.D=null,this.B.close(),this.B=null)};
g.h.Hs=function(){this.ub(g.fw(this.g))};
g.h.SE=function(){window.focus();this.kj()};
g.h.zl=function(a){a=a||g.T(this.g).experiments.b("autoplay_time")||1E4;var b=Math.min((0,g.Gk)()-this.G,a);a=Math.min(b/a,1);this.H.setAttribute("stroke-dashoffset",-293*(a+1));1<=a?this.select(!0):this.o&&this.o.start()};
g.h.select=function(a){var b=g.T(this.g);if(b.experiments.$("autonav_notifications")&&a&&window.Notification&&window.document.hasFocus){var c=window.Notification.permission;g.vr(this.g,"xwebnotifications",{permission:c});"default"==c?window.Notification.requestPermission():"granted"!=c||window.document.hasFocus()||(c=this.A.Jb(),this.kj(),this.B=new window.Notification(g.N("YTP_PLAYLIST_UP_NEXT"),{body:c.title,icon:c.Gc(b)}),this.D=this.T(this.B,"click",this.SE),this.F.start())}a9(this);this.g.Ai(!1,
a)};
g.h.bF=function(a){!g.ag(this.C.element,g.Zj(a))&&g.Ll(a,this.g)&&this.select()};
g.h.Js=function(){g.qw(this.g,"autonavcancel");g.hw(this.g,!0)};
g.h.zL=function(a){120<g.Zj(a).naturalWidth&&g.L(this.element,"ytp-moving-thumbnail-loaded")};
g.h.sE=function(a){this.g.getPresentingPlayerType();this.show();$8(this,a)};
g.h.VH=function(a){this.g.getPresentingPlayerType();this.A&&this.A.Jb().videoId==a.Jb().videoId||Z8(this,a)};
g.h.tE=function(){this.g.getPresentingPlayerType();a9(this);this.ua()};
g.h.V=function(){a9(this);this.kj();Y8.N.V.call(this)};
g.A(c9,g.LA);c9.prototype.create=function(){this.L=!0};
c9.prototype.destroy=function(){this.L=!1};
c9.prototype.El=function(){return!1};
g.A(e9,c9);e9.b=2;g.h=e9.prototype;g.h.create=function(){e9.N.create.call(this);var a=this.O.getVideoData();a&&(this.A=f9(a),this.B=a);this.Cf();this.C.T(this.O,"appresize",this.Cf);this.C.T(this.O,"videodatachange",this.UJ);this.C.T(this.O,"autonavchange",this.Kv);this.C.T(this.O,"autonavcancel",this.RJ);this.C.T(this.element,"transitionend",this.jG)};
g.h.destroy=function(){g.en(this.C);g.Wb(this.g);this.g=[];this.A=null;e9.N.destroy.call(this);g.ue(this.element,"ytp-show-tiles");this.H.stop()};
g.h.El=function(){return 1!=this.B.autonavState};
g.h.gi=function(){return g.Cw(this.O)&&this.El()&&!this.F};
g.h.show=function(){e9.N.show.call(this);g.ue(this.element,"ytp-show-tiles");g.T(this.O).isMobile?g.oe(this.H):this.H.start();(this.G||this.F&&this.F!=this.B.clientPlaybackNonce)&&g.hw(this.O,!1);var a=this.gi();g.Cw(this.O)&&g.T(this.O).experiments.$("ui_logging")&&this.S.log({cancelButtonShow:a?"1":"0",state:this.El()?"enabled":"disabled"});a?(h9(this),2==this.B.autonavState?g.T(this.O).experiments.$("fast_autonav_in_background")&&3==this.O.wv()?this.o.select(!0):$8(this.o):3==this.B.autonavState&&
b9(this.o)):(g.hw(this.O,!0),h9(this))};
g.h.ua=function(){e9.N.ua.call(this);b9(this.o);h9(this)};
g.h.jG=function(a){g.Zj(a)==this.element&&this.Cf()};
g.h.Cf=function(){if(this.A&&this.A.length){var a=g.T(this.O).experiments.$("video_wall_moving_thumbnails_hover");g.L(this.element,"ytp-endscreen-paginate");for(var b=g.Um(this.element),c=b.width/b.height,d=96/54,e=e9.b,f=e9.b,k=Math.max(b.width/96,2),l=Math.max(b.height/54,2),m=this.A.length,n=Math.pow(e9.b,2),r=m*n,u=g9(this,0,l),x=g9(this,1,l),r=r+(Math.pow(u,2)-n),r=r+(Math.pow(x,2)-n),r=r-n;0<r&&(e<k||f<l);){var B=e/e9.b,F=f/e9.b,J=e<=k-e9.b&&r>=F*n,Q=f<=l-e9.b&&r>=B*n;if((B+1)/F*d/c>c/(B/(F+
1)*d)&&Q)r-=B*n,f+=e9.b;else if(J)r-=F*n,e+=e9.b;else if(Q)r-=B*n,f+=e9.b;else break}d=!1;k=e9.b+u;r>=3*n&&6>=m*n-r&&(f>=k||e>=k)&&x<=e9.b&&(d=!0);r=96*e;n=54*f;c=r/n<c?b.height/n:b.width/r;c=Math.min(c,2);r*=c;n*=c;r*=g.lf(b.width/r||1,1,1.21);n*=g.lf(b.height/n||1,1,1.21);r=Math.floor(Math.min(b.width,r));n=Math.floor(Math.min(b.height,n));b=this.K.element;g.Tm(b,r,n);g.Cm(b,{marginLeft:r/-2+"px",marginTop:n/-2+"px"});Z8(this.o,this.A[0]);g.we(this.element,"ytp-endscreen-takeover",this.gi());h9(this);
c=r+4;r=n+4;n=0;k=!this.gi();l=!1;for(B=0;B<e;B++)for(F=0;F<f;F++)if(J=x>e9.b&&1<=n&&!l?n+1:n,Q=0,d&&B>=e-e9.b&&F>=f-e9.b?Q=1:0==F%e9.b&&0==B%e9.b&&(F<u&&B<u?0==F&&0==B&&(Q=u):x>e9.b&&F>=f-x&&B>=e-x?F==f-x&&B==e-x&&(l=!0,J=1,Q=x):Q=e9.b),J=(J+this.D)%m,J=0>J*m?J+m:J,0!=Q){var P=this.g[n];P||(P=new V8(this.O),this.g[n]=P,b.appendChild(P.element));var Va=Math.floor(r*F/f),eb=Math.floor(c*B/e),jb=Math.floor(r*(F+Q)/f)-Va-4,rd=Math.floor(c*(B+Q)/e)-eb-4;g.Jm(P.element,eb,Va);g.Tm(P.element,rd,jb);g.Cm(P.element,
"transitionDelay",(F+B)/20+"s");g.we(P.element,"ytp-videowall-still-mini",1==Q);g.we(P.element,"ytp-videowall-still-large",2<Q);Q=P;J=this.A[J];P=k&&!a;Q.o=J;Va=g.T(Q.g);U8(Q,J,Va,g.re(Q.element,"ytp-videowall-still-large")?"hqdefault.jpg":"mqdefault.jpg");g.ue(Q.element,"ytp-videowall-moving-thumbnail-loaded");Q.update({moving_thumbnail:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"});P?(g.L(Q.element,"ytp-videowall-active"),W8(Q)):Va.experiments.$("video_wall_moving_thumbnails_hover")&&
!Q.A&&(Q.A=Q.R("mouseover",Q.XJ));Va=J.Vc;P=Q.g;J=Q;Va=Va&&Va.itct;g.T(P).experiments.$("player_interaction_logging")&&(Q=P.app.ca,P=Va,J=J.element.getAttribute("data-visual-id"),g.Dw(Q,"onLogServerVeCreated",{id:J,tracking_params:P}));n++}g.we(this.element,"ytp-endscreen-paginate",n<m);for(a=this.g.length-1;a>=n;a--)P=this.g[a],g.Tf(P.element),g.Vb(P);this.g.length=n}};
e9.o=2;e9.g=1.21;g.h=e9.prototype;g.h.UJ=function(){var a=this.O.getVideoData();this.B!=a&&(this.D=0,this.A=f9(a),this.B=a,this.Cf())};
g.h.SJ=function(){this.D+=this.g.length;this.Cf()};
g.h.TJ=function(){this.D-=this.g.length;this.Cf()};
g.h.eC=function(){return!!this.o.o};
g.h.Kv=function(a){1==a?(this.G=!1,this.F=this.B.clientPlaybackNonce,a9(this.o),this.b&&this.Cf()):(this.G=!0,this.b&&this.gi()&&(2==a?$8(this.o):3==a&&b9(this.o)))};
g.h.RJ=function(a){if(a){for(a=0;a<this.g.length;a++)g.Gw(this.aa,this.g[a],!0);this.Kv(1)}else this.F=null,this.G=!1;this.Cf()};
g.A(i9,c9);i9.prototype.show=function(){i9.N.show.call(this);this.g.ub(!0)};
i9.prototype.ua=function(){i9.N.ua.call(this);this.g.ub(!1)};
g.A(j9,g.ym);g.h=j9.prototype;g.h.Iv=function(){var a=this.O.getVideoData(),b=!d9(this.O)||!(!a.L||!a.L.length),a=g.wm(a,"ypc_module"),c=g.i4(this.O.app);return(b||!1)&&!a&&!c};
g.h.yo=function(){return(this.b instanceof e9||!1)&&this.b.b&&this.b.gi()};
g.h.cC=function(){return this.yo()?this.b.eC():!1};
g.h.V=function(){g.Hj(this.O,"endscreen");j9.N.V.call(this)};
g.h.load=function(){j9.N.load.call(this);this.b.show();g.T(this.O).oa&&.01>Math.random()&&this.log({trailerEndscreenShow:1})};
g.h.log=function(a){g.vr(this.O,"end",a)};
g.h.unload=function(){j9.N.unload.call(this);this.b.ua();this.b.destroy();this.isAvailable=!1};
g.h.EJ=function(a){this.Iv()&&(this.b.L||this.b.create(),"load"==a.getId()&&this.load())};
g.h.FJ=function(a){"load"==a.getId()&&this.loaded&&this.unload()};
g.h.Ut=function(){g.Hj(this.O,"endscreen");var a=Math.max(1E3*(this.O.getVideoData().lengthSeconds-10),0),a=new g.Dj(a,0x8000000000000,{id:"preload",namespace:"endscreen"}),b=new g.Dj(0x8000000000000,0x8000000000000,{id:"load",priority:6,namespace:"endscreen"});this.O.yb([a,b])};
window._exportCheck==g.Aa&&g.la("ytmod.player.endscreen",j9,void 0);})(_yt_player);
