(function(g){var window=this;var D9=function(a,b){g.T(a).experiments.b("player_gel_logging")&&a.app.aa.T("onLogToGel",{payload_name:"thumbnailLoaded",payload:b})},E9=function(a,b,c,d){var e=b.Sb();
g.Md(a.element,"ytp-suggestion-set",!!e.videoId);var f=b.Hh();d=b.Yc(c,d?d:"mqdefault.jpg");var k=b instanceof g.gz?g.Sj(b.lengthSeconds):null,l=!!f,f=l&&"RD"==g.Dz(f).type;c={title:b.title,author:b.author,author_and_views:e.shortViewCount?b.author+" \u2022 "+e.shortViewCount:b.author,watch:g.P("YTP_WATCH_VIDEO_OR_PLAYLIST",{TITLE:b.title},b.title),duration:k,url:b.qk(c),is_list:l,is_mix:f,background:d?"background-image: url("+d+")":""};b instanceof g.Gz&&(c.playlist_length=b.A);a.update(c)},F9=function(a){var b=
g.T(a),c=b.experiments.b("video_wall_moving_thumbnails_hover"),c=b.experiments.b("video_wall_moving_thumbnails_autoplay")||c;
this.B=b.B&&!b.D;b={J:"img",Z:"ytp-videowall-moving-thumbnail",X:{src:"{{moving_thumbnail}}"}};g.R.call(this,{J:"a",Z:"ytp-videowall-still",X:{href:"{{url}}",target:this.B?"_blank":null,"aria-label":"{{watch}}","data-is-list":"{{is_list}}","data-is-mix":"{{is_mix}}"},R:[{J:"div",Z:"ytp-videowall-still-image",X:{style:"{{background}}"}},c?b:null,{J:"span",Z:"ytp-videowall-still-info",R:[{J:"span",Z:"ytp-videowall-still-info-bg",R:[{J:"span",Z:"ytp-videowall-still-info-content",X:g.Qh||g.kc?{style:"will-change: opacity"}:
null,R:[{J:"span",Z:"ytp-videowall-still-info-title",R:["{{title}}"]},{J:"span",Z:"ytp-videowall-still-info-author",R:["{{author_and_views}}"]},{J:"span",Z:"ytp-videowall-still-info-duration",R:["{{duration}}"]}]}]}]},{J:"span",ea:["ytp-videowall-still-listlabel-regular","ytp-videowall-still-listlabel"],R:[{J:"span",Z:"ytp-videowall-still-listlabel-icon"},g.P("YTP_PLAYLIST"),{J:"span",Z:"ytp-videowall-still-listlabel-length",R:[" (",{J:"span",R:["{{playlist_length}}"]},")"]}]},{J:"span",ea:["ytp-videowall-still-listlabel-mix",
"ytp-videowall-still-listlabel"],R:[{J:"span",Z:"ytp-videowall-still-listlabel-mix-icon"},g.P("YTP_MIX"),{J:"span",Z:"ytp-videowall-still-listlabel-length",R:[" (50+)"]}]}]});this.g=a;this.o=null;this.C=0;this.P("click",this.XK);this.P("keypress",this.YK);c&&this.U(this.ua["ytp-videowall-moving-thumbnail"],"load",this.$K);g.T(a).experiments.b("player_interaction_logging")&&(a=a.app.ca,g.cb(a.A,this),b=String(a.F++),this.element.setAttribute("data-visual-id",b),g.Ab(this,(0,g.y)(a.C,a,this)))},G9=
function(a){if(5E5<g.ew(a.g.app.la)){var b=a.o.jk();
b&&(a.C=(0,g.yj)(),a.update({moving_thumbnail:b}))}},H9=function(a){g.Pz.call(this,a,{J:"div",
ea:["ytp-thumbnail-overlay","ytp-channel-overlay"],R:[{J:"div",Z:"ytp-thumbnail-overlay-image",X:{style:"{{background}}"}},{J:"div",Z:"ytp-thumbnail-overlay-curtain"}]})},I9=function(a){var b=g.T(a).experiments.b("moving_thumbnails_autonav"),c={J:"img",
Z:"ytp-upnext-moving-thumbnail",X:{src:"{{moving_thumbnail}}"}},c={J:"div",Z:"ytp-upnext",X:{"aria-label":"{{watch}}"},R:[{J:"div",Z:"ytp-thumbnail-overlay-image",X:{style:"{{background}}"}},b?c:null,{J:"div",Z:"ytp-thumbnail-overlay-curtain"},{J:"span",Z:"ytp-upnext-top",R:[{J:"span",Z:"ytp-upnext-header",R:[g.P("YTP_PLAYLIST_UP_NEXT")]},{J:"span",Z:"ytp-upnext-title",R:["{{title}}"]},{J:"span",Z:"ytp-upnext-author",R:["{{author}}"]}]},{J:"a",Z:"ytp-upnext-autoplay-icon",X:{href:"{{url}}"},R:[{J:"svg",
X:{height:"100%",version:"1.1",viewBox:"0 0 98 98",width:"100%"},R:[{J:"circle",Z:"ytp-svg-autoplay-circle",X:{cx:"49",cy:"49",fill:"#000","fill-opacity":"0.8",r:"48"}},{J:"circle",Z:"ytp-svg-autoplay-ring",X:{cx:"-49",cy:"49","fill-opacity":"0",r:"46.5",stroke:"#FFFFFF","stroke-dasharray":"293","stroke-dashoffset":"-293","stroke-width":"4",transform:"rotate(-90)"}},{J:"polygon",Z:"ytp-svg-autoplay-triangle",X:{fill:"#fff",points:"32,27 72,49 32,71"}}]}]},{J:"span",Z:"ytp-upnext-bottom",R:[{J:"span",
Z:"ytp-upnext-cancel"},{J:"span",Z:"ytp-upnext-paused",R:[g.P("YTP_AUTOPLAY_PAUSED_2")]}]},{J:"span",Z:"ytp-upnext-close"}]};g.R.call(this,c);this.C=null;var d=this.ua["ytp-upnext-cancel"],c=this.ua["ytp-upnext-close"];this.C=new g.R({J:"button",ea:["ytp-upnext-cancel-button","ytp-button"],X:{tabindex:0,"aria-label":g.P("YTP_AUTOPLAY_CANCEL")},R:[g.P("YTP_CANCEL")]});g.L(this,this.C);this.C.P("click",this.cu,this);this.C.Da(d);d=new g.R({J:"button",ea:["ytp-upnext-close-button","ytp-button"]});g.L(this,
d);d.P("click",this.cu,this);d.Da(c);this.g=a;this.K=this.ua["ytp-svg-autoplay-ring"];this.D=this.B=this.o=this.A=null;this.F=new g.Dd(this.Wj,5E3,this);g.L(this,this.F);this.G=0;this.U(this.ua["ytp-upnext-autoplay-icon"],"click",this.dG);this.au();this.U(a,"autonavvisibility",this.au);this.U(a,"mdxnowautoplaying",this.uF);this.U(a,"mdxautoplaycanceled",this.vF);this.U(a,"mdxautoplayupnext",this.Yv);3==this.g.$a()&&(a=(a=g.Fi(this.g).O)?a.loaded?a.A.suggestion:null:null)&&this.Yv(a);b&&(this.H=0,
this.U(this.ua["ytp-upnext-moving-thumbnail"],"load",this.yM))},J9=function(a,b){a.A=b;
E9(a,b,g.T(a.g),"hqdefault.jpg");g.Kd(a.element,"ytp-moving-thumbnail-loaded");a.update({moving_thumbnail:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"});if(5E5<g.ew(a.g.app.la)){var c=a.A.jk();c&&(a.H=(0,g.yj)(),a.update({moving_thumbnail:c}))}},K9=function(a,b){a.o||(g.bi("a11y-announce",g.P("YTP_PLAYLIST_UP_NEXT")+" "+a.A.title),a.G=(0,g.yj)(),a.o=new g.Dd(a.wm,25,a),a.wm(b));
g.Kd(a.element,"ytp-upnext-autoplay-paused")},M9=function(a){L9(a);
a.G=(0,g.yj)();a.wm();g.M(a.element,"ytp-upnext-autoplay-paused")},L9=function(a){a.o&&(a.o.dispose(),a.o=null)},N9=function(a,b){g.Nz.call(this,{J:"div",
ea:["html5-endscreen","ytp-player-content",b||"base-endscreen"]});this.N=a;this.L=!1},O9=function(a){a=g.T(a);
return a.Jb&&!a.wa},P9=function(a,b){N9.call(this,a,"videowall-endscreen");
this.ba=a;this.Y=b;this.D=0;this.g=[];this.F=this.B=this.A=null;this.G=this.O=!1;this.C=new g.mm(this);g.L(this,this.C);this.H=new g.Dd(g.A(g.M,this.element,"ytp-show-tiles"),0);g.L(this,this.H);var c=new g.R({J:"button",ea:["ytp-button","ytp-endscreen-previous"],X:{"aria-label":g.P("YTP_PREVIOUS")},R:[g.xg()]});g.L(this,c);c.Da(this.element);c.P("click",this.VK,this);this.K=new g.Kj({J:"div",Z:"ytp-endscreen-content"});g.L(this,this.K);this.K.Da(this.element);c=new g.R({J:"button",ea:["ytp-button",
"ytp-endscreen-next"],X:{"aria-label":g.P("YTP_NEXT")},R:[g.yg()]});g.L(this,c);c.Da(this.element);c.P("click",this.UK,this);this.o=new I9(a);g.L(this,this.o);g.ts(this.N,this.o.element,5);this.oa()},Q9=function(a){return(0,g.S)(a.V,function(a){return g.Oz(a)})},R9=function(a,b,c){return 0==b&&a.A.length&&(b=c/P9.b,2<=c/P9.b&&2<=b&&g.T(a.N).experiments.b("video_wall_emphasize_first"))?2*P9.b:P9.b},S9=function(a){var b=a.Y.wp();
b!=a.O&&(a.O=b,a.N.T("autonavvisibility"))},T9=function(a){N9.call(this,a,"subscribecard-endscreen");
var b=a.getVideoData();this.g=new H9(a);g.L(this,this.g);g.ts(this.N,this.g.element,5);this.o=new g.R(["div","ytp-subscribe-card",["img","ytp-author-image",{src:b.profilePicture}],["div","ytp-subscribe-card-right",["div","ytp-author-name",b.author],["div","html5-subscribe-button-container"]]]);g.L(this,this.o);this.o.Da(this.element);this.A=new g.Ds(g.P("YTP_SUBSCRIBE"),g.P("YTP_UNSUBSCRIBE"),!0,b.Kq,b.subscribed,"trailer-endscreen",null,a);g.L(this,this.A);this.A.Da(this.o.ua["html5-subscribe-button-container"]);
this.oa()},U9=function(a){g.hm.call(this,a);
g.ch({});this.b=null;this.isAvailable=!0;this.g=new g.mm(this);g.L(this,this.g);this.o=g.T(a);O9(a)?this.b=new P9(this.N,this):this.o.wa?this.b=new T9(this.N):this.b=new N9(this.N);g.L(this,this.b);g.ts(this.N,this.b.element,5);this.dv();this.g.U(a,"videodatachange",this.dv,this);this.g.U(a,"crn_endscreen",this.GK,this);this.g.U(a,"crx_endscreen",this.HK,this)};
g.C(F9,g.R);g.h=F9.prototype;g.h.wh=function(){var a=this.o.Sb().videoId;g.p7(this.g.app,a,this.o.$c,this.o.Hh(),void 0,void 0)};
g.h.XK=function(a){g.Hv(this.g,this);g.Ok(a,this.g,!this.g.isFullscreen()&&this.B,this.o.$c)&&this.wh()};
g.h.ZK=function(){this.Aa(this.A);this.A=null;G9(this)};
g.h.YK=function(a){switch(a.keyCode){case 13:case 32:g.Wi(a)||(this.wh(),g.Vi(a))}};
g.h.$K=function(a){120<g.Ri(a).naturalWidth&&(g.M(this.element,"ytp-videowall-moving-thumbnail-loaded"),D9(this.g,{isMovingThumbnail:!0,durationLoadingMs:(0,g.yj)()-this.C,videoId:this.o.videoId}))};
g.C(H9,g.Pz);H9.prototype.zb=function(a){a?this.A.show():g.Pr(this.A)};
g.C(I9,g.R);g.h=I9.prototype;g.h.Wj=function(){this.B&&(this.F.stop(),this.Aa(this.D),this.D=null,this.B.close(),this.B=null)};
g.h.au=function(){this.zb(g.gv(this.g))};
g.h.UF=function(){window.focus();this.Wj()};
g.h.wm=function(a){a=a||g.T(this.g).experiments.g("autoplay_time")||1E4;var b=Math.min((0,g.yj)()-this.G,a);a=Math.min(b/a,1);this.K.setAttribute("stroke-dashoffset",-293*(a+1));1<=a?this.select(!0):this.o&&this.o.start()};
g.h.select=function(a){var b=g.T(this.g);if(b.experiments.b("autonav_notifications")&&a&&window.Notification&&window.document.hasFocus){var c=window.Notification.permission;g.or(this.g,"xwebnotifications",{permission:c});"default"==c?window.Notification.requestPermission():"granted"!=c||window.document.hasFocus()||(c=this.A.Sb(),this.Wj(),this.B=new window.Notification(g.P("YTP_PLAYLIST_UP_NEXT"),{body:c.title,icon:c.Yc(b)}),this.D=this.U(this.B,"click",this.UF),this.F.start())}L9(this);this.g.ij(!1,
a)};
g.h.dG=function(a){!g.Xe(this.C.element,g.Ri(a))&&g.Ok(a,this.g)&&this.select()};
g.h.cu=function(){g.uv(this.g,"autonavcancel");g.iv(this.g,!0)};
g.h.yM=function(a){120<g.Ri(a).naturalWidth&&(g.M(this.element,"ytp-moving-thumbnail-loaded"),D9(this.g,{isMovingThumbnail:!0,durationLoadingMs:(0,g.yj)()-this.H,videoId:this.A.Sb().videoId}))};
g.h.uF=function(a){this.show();K9(this,a)};
g.h.Yv=function(a){this.A&&this.A.Sb().videoId==a.Sb().videoId||J9(this,a)};
g.h.vF=function(){L9(this);this.oa()};
g.h.S=function(){L9(this);this.Wj();I9.M.S.call(this)};
g.C(N9,g.Nz);N9.prototype.create=function(){this.L=!0};
N9.prototype.destroy=function(){this.L=!1};
N9.prototype.Bm=function(){return!1};
g.C(P9,N9);P9.b=2;g.h=P9.prototype;g.h.create=function(){P9.M.create.call(this);var a=this.N.getVideoData();a&&(this.A=Q9(a),this.B=a);this.ag();this.C.U(this.N,"appresize",this.ag);this.C.U(this.N,"videodatachange",this.WK);this.C.U(this.N,"autonavchange",this.fx);this.C.U(this.N,"autonavcancel",this.TK);this.C.U(this.element,"transitionend",this.kH)};
g.h.destroy=function(){g.om(this.C);g.Cb(this.g);this.g=[];this.A=null;P9.M.destroy.call(this);g.Kd(this.element,"ytp-show-tiles");this.H.stop()};
g.h.Bm=function(){return 1!=this.B.autonavState};
g.h.Ti=function(){return g.Ev(this.N)&&this.Bm()&&!this.F};
g.h.show=function(){P9.M.show.call(this);g.Kd(this.element,"ytp-show-tiles");g.T(this.N).isMobile?g.Ed(this.H):this.H.start();(this.G||this.F&&this.F!=this.B.clientPlaybackNonce)&&g.iv(this.N,!1);var a=this.Ti();g.Ev(this.N)&&g.T(this.N).experiments.b("ui_logging")&&this.Y.log({cancelButtonShow:a?"1":"0",state:this.Bm()?"enabled":"disabled"});a?(S9(this),2==this.B.autonavState?g.T(this.N).experiments.b("fast_autonav_in_background")&&3==this.N.Nw()?this.o.select(!0):K9(this.o):3==this.B.autonavState&&
M9(this.o)):(g.iv(this.N,!0),S9(this))};
g.h.oa=function(){P9.M.oa.call(this);M9(this.o);S9(this)};
g.h.kH=function(a){g.Ri(a)==this.element&&this.ag()};
g.h.ag=function(){if(this.A&&this.A.length){var a=g.T(this.N).experiments.b("video_wall_moving_thumbnails_hover");g.M(this.element,"ytp-endscreen-paginate");var b=g.Ll(this.element),c=b.width/b.height,d=96/54,e=P9.b,f=P9.b,k=Math.max(b.width/96,2),l=Math.max(b.height/54,2),m=this.A.length,n=Math.pow(P9.b,2),t,u=R9(this,0,l),x=R9(this,1,l);t=m*n+(Math.pow(u,2)-n);t+=Math.pow(x,2)-n;for(t-=n;0<t&&(e<k||f<l);){var z=e/P9.b,B=f/P9.b,G=e<=k-P9.b&&t>=B*n,J=f<=l-P9.b&&t>=z*n;if((z+1)/B*d/c>c/(z/(B+1)*d)&&
J)t-=z*n,f+=P9.b;else if(G)t-=B*n,e+=P9.b;else if(J)t-=z*n,f+=P9.b;else break}d=!1;k=P9.b+u;t>=3*n&&6>=m*n-t&&(f>=k||e>=k)&&x<=P9.b&&(d=!0);t=96*e;n=54*f;c=t/n<c?b.height/n:b.width/t;c=Math.min(c,2);t*=c;n*=c;t*=g.ne(b.width/t||1,1,1.21);n*=g.ne(b.height/n||1,1,1.21);t=Math.floor(Math.min(b.width,t));n=Math.floor(Math.min(b.height,n));b=this.K.element;g.Kl(b,t,n);g.ul(b,{marginLeft:t/-2+"px",marginTop:n/-2+"px"});J9(this.o,this.A[0]);g.Md(this.element,"ytp-endscreen-takeover",this.Ti());S9(this);
c=t+4;t=n+4;n=0;k=!this.Ti();l=!1;for(z=0;z<e;z++)for(B=0;B<f;B++){var J=x>P9.b&&1<=n&&!l?n+1:n,O=0;d&&z>=e-P9.b&&B>=f-P9.b?O=1:0==B%P9.b&&0==z%P9.b&&(B<u&&z<u?0==B&&0==z&&(O=u):x>P9.b&&B>=f-x&&z>=e-x?B==f-x&&z==e-x&&(l=!0,J=1,O=x):O=P9.b);J=g.oe(J+this.D,m);if(0!=O){G=this.g[n];G||(G=new F9(this.N),this.g[n]=G,b.appendChild(G.element));var Qa=Math.floor(t*B/f),bb=Math.floor(c*z/e),rb=Math.floor(t*(B+O)/f)-Qa-4,Zc=Math.floor(c*(z+O)/e)-bb-4;g.Al(G.element,bb,Qa);g.Kl(G.element,Zc,rb);g.ul(G.element,
"transitionDelay",(B+z)/20+"s");g.Md(G.element,"ytp-videowall-still-mini",1==O);g.Md(G.element,"ytp-videowall-still-large",2<O);J=this.A[J];O=k&&!a;G.o=J;Qa=g.T(G.g);E9(G,J,Qa,g.Hd(G.element,"ytp-videowall-still-large")?"hqdefault.jpg":"mqdefault.jpg");g.Kd(G.element,"ytp-videowall-moving-thumbnail-loaded");G.update({moving_thumbnail:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"});O?(g.M(G.element,"ytp-videowall-active"),G9(G)):Qa.experiments.b("video_wall_moving_thumbnails_hover")&&
!G.A&&(G.A=G.P("mouseover",G.ZK));O=J.$c;J=G.g;g.T(J).experiments.b("player_interaction_logging")&&(J=J.app.ca,O=O&&O.itct,G=G.element.getAttribute("data-visual-id"),g.Fv(J,"onLogServerVeCreated",{id:G,tracking_params:O}));n++}}g.Md(this.element,"ytp-endscreen-paginate",n<m);for(a=this.g.length-1;a>=n;a--)G=this.g[a],g.Re(G.element),g.Bb(G);this.g.length=n}};
P9.o=2;P9.g=1.21;g.h=P9.prototype;g.h.WK=function(){var a=this.N.getVideoData();this.B!=a&&(this.D=0,this.A=Q9(a),this.B=a,this.ag())};
g.h.UK=function(){this.D+=this.g.length;this.ag()};
g.h.VK=function(){this.D-=this.g.length;this.ag()};
g.h.eD=function(){return!!this.o.o};
g.h.fx=function(a){1==a?(this.G=!1,this.F=this.B.clientPlaybackNonce,L9(this.o),this.b&&this.ag()):(this.G=!0,this.b&&this.Ti()&&(2==a?K9(this.o):3==a&&M9(this.o)))};
g.h.TK=function(a){if(a){for(a=0;a<this.g.length;a++)g.Iv(this.ba,this.g[a],!0);this.fx(1)}else this.F=null,this.G=!1;this.ag()};
g.C(T9,N9);T9.prototype.show=function(){T9.M.show.call(this);this.g.zb(!0)};
T9.prototype.oa=function(){T9.M.oa.call(this);this.g.zb(!1)};
g.C(U9,g.hm);g.h=U9.prototype;g.h.Zw=function(){var a=this.N.getVideoData(),b=!O9(this.N)||!(!a.V||!a.V.length),a=g.fm(a,"ypc_module"),c=g.V3(this.N.app);return(b||!1)&&!a&&!c};
g.h.wp=function(){return(this.b instanceof P9||!1)&&this.b.b&&this.b.Ti()};
g.h.cD=function(){return this.wp()?this.b.eD():!1};
g.h.S=function(){g.Ai(this.N,"endscreen");U9.M.S.call(this)};
g.h.load=function(){U9.M.load.call(this);this.b.show();g.T(this.N).wa&&.01>Math.random()&&this.log({trailerEndscreenShow:1})};
g.h.log=function(a){g.or(this.N,"end",a)};
g.h.unload=function(){U9.M.unload.call(this);this.b.oa();this.b.destroy();this.isAvailable=!1};
g.h.GK=function(a){this.Zw()&&(this.b.L||this.b.create(),"load"==a.getId()&&this.load())};
g.h.HK=function(a){"load"==a.getId()&&this.loaded&&this.unload()};
g.h.dv=function(){g.Ai(this.N,"endscreen");var a=Math.max(1E3*(this.N.getVideoData().lengthSeconds-10),0),a=new g.wi(a,0x8000000000000,{id:"preload",namespace:"endscreen"}),b=new g.wi(0x8000000000000,0x8000000000000,{id:"load",priority:6,namespace:"endscreen"});this.N.Eb([a,b])};
window._exportCheck==g.wa&&g.ka("ytmod.player.endscreen",U9,void 0);})(_yt_player);
