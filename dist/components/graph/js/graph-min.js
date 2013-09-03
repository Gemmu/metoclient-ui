"use strict";if("undefined"==typeof jQuery||!jQuery)throw"ERROR: jQuery is required for fi.fmi.metoclient.ui.graph.Timer!";var fi=fi||{};if(fi.fmi=fi.fmi||{},fi.fmi.metoclient=fi.fmi.metoclient||{},fi.fmi.metoclient.ui=fi.fmi.metoclient.ui||{},fi.fmi.metoclient.ui.graph=fi.fmi.metoclient.ui.graph||{},fi.fmi.metoclient.ui.graph.Timer=function(){function a(a){if(v=a,j()){var b=a-A;(0>b||b>C)&&(A=v,q("time_changed",v))}else q("time_changed",v)}function b(){return v}function c(a){y=a}function d(a){z=a}function e(a){w=a}function f(){return w}function g(a){x=a}function h(){return x}function i(a){D=a,A=v}function j(){return D}function k(b){var e=new Date;if(void 0!==b)i(!0),c(b),d(e.getTime()),a(b);else{if(!j())return;var f=x-w,g=(f*B*(e.getTime()-z)+y-w)%f+w;a(g)}setTimeout(function(){k()},10)}function l(){D=!1}function m(a){B=a}function n(){return B}function o(a){C=a}function p(){return C}function q(a,b){return t[a]?(setTimeout(function(){for(var c=t[a],d=c?c.length:0;d--;)c[d].func(a,b)},0),!0):!1}function r(a,b){t[a]||(t[a]=[]);var c=(++u).toString();return t[a].push({token:c,func:b}),c}function s(a){for(var b in t)if(t.hasOwnProperty(b)&&t[b])for(var c=0,d=t[b].length;d>c;c++)if(t[b][c].token===a)return t[b].splice(c,1),a;return!1}var t={},u=-1,v=null,w=null,x=null,y=null,z=null,A=null,B=1/3e4,C=1,D=!1;return{setSelectedTime:a,getSelectedTime:b,setStartTime:e,getStartTime:f,setEndTime:g,getEndTime:h,setPlaying:i,isPlaying:j,play:k,pause:l,setAnimationSpeed:m,getAnimationSpeed:n,setAnimationTimeStep:o,getAnimationTimeStep:p,publish:q,subscribe:r,unsubscribe:s}}(),"undefined"==typeof jQuery||!jQuery)throw"ERROR: jQuery is required for fi.fmi.metoclient.ui.graph.Controller!";var fi=fi||{};if(fi.fmi=fi.fmi||{},fi.fmi.metoclient=fi.fmi.metoclient||{},fi.fmi.metoclient.ui=fi.fmi.metoclient.ui||{},fi.fmi.metoclient.ui.graph=fi.fmi.metoclient.ui.graph||{},!fi.fmi.metoclient.metolib)throw"ERROR: fi.fmi.metoclient.metolib is required for fi.fmi.metoclient.ui.graph.Controller!";if(!fi.fmi.metoclient.metolib.WfsConnection)throw"ERROR: fi.fmi.metoclient.metolib.WfsConnection is required for fi.fmi.metoclient.ui.graph.Controller!";if(!fi.fmi.metoclient.metolib.WfsConnection)throw"ERROR: fi.fmi.metoclient.metolib.WfsParser is required for fi.fmi.metoclient.ui.graph.Controller!";if(fi.fmi.metoclient.ui.graph.Controller=function(){function a(a){var b=[];if(a?(i=a.baseUrl,i||b.push("ERROR: Controller options baseUrl not correct!"),j=a.storedQueryId,j||b.push("ERROR: Controller options storedQueryId not correct!"),k=a.sites,k||b.push("ERROR: Controller options sites not correct!"),l=a.parameterInfo,l&&l.length||b.push("ERROR: Controller options parameterInfo not correct!"),p.start=a.begin,void 0===p.start&&b.push("ERROR: Controller options begin not correct!"),p.end=a.end,void 0===p.end&&b.push("ERROR: Controller options end not correct!"),p.request=l&&l.length?l[0].code:void 0,p.request||b.push("ERROR: Controller options requestParameter not correct!")):b.push("ERROR: Controller options not correct!"),b.length){if("undefined"!=typeof console&&console)for(var c=0;c<b.length;++c)console.error(b[c]);throw b}if(a.useCache&&(m=new fi.fmi.metoclient.metolib.WfsConnection,!m.connect(i,j)))throw"ERROR: Controller could not set up conneciton!"}function b(a){void 0!==a&&(p=a);var b=36e5,d=36e5,e=24*d;p.start-=p.start%d;var f=(p.end+b-p.start)/e;b=1>f?null:7>f?d:30>f?3*d:365>f?e:7*e,p.end+=b,m?m.getData({requestParameter:p.request,begin:p.start,end:p.end,timestep:b,sites:k,callback:function(a){c("data_refreshed",a)}}):fi.fmi.metoclient.metolib.WfsRequestParser.getData({url:i,storedQueryId:j,requestParameter:p.request,begin:p.start,end:p.end,timestep:b,sites:k,callback:function(a){c("data_refreshed",a)}})}function c(a,b){return n[a]?(setTimeout(function(){for(var c=n[a],d=c?c.length:0;d--;)c[d].func(a,b)},0),!0):!1}function d(a,b){n[a]||(n[a]=[]);var c=(++o).toString();return n[a].push({token:c,func:b}),c}function e(a){for(var b in n)if(n.hasOwnProperty(b)&&n[b])for(var c=0,d=n[b].length;d>c;c++)if(n[b][c].token===a)return n[b].splice(c,1),a;return!1}function f(){return l}function g(){return p}function h(a){p=a}var i,j,k,l,m,n={},o=-1,p={start:void 0,end:void 0,request:void 0};return{init:a,refreshData:b,publish:c,subscribe:d,unsubscribe:e,getParameterInfo:f,getView:g,setView:h}},"undefined"==typeof jQuery||!jQuery)throw"ERROR: jQuery is required for fi.fmi.metoclient.ui.graph.Graph!";var fi=fi||{};if(fi.fmi=fi.fmi||{},fi.fmi.metoclient=fi.fmi.metoclient||{},fi.fmi.metoclient.ui=fi.fmi.metoclient.ui||{},fi.fmi.metoclient.ui.graph=fi.fmi.metoclient.ui.graph||{},"undefined"==typeof fi.fmi.metoclient.ui.graph.Timer||!fi.fmi.metoclient.ui.graph.Timer)throw"ERROR: fi.fmi.metoclient.ui.graph.Timer is required for fi.fmi.metoclient.ui.graph.Graph!";if("undefined"==typeof fi.fmi.metoclient.ui.graph.Controller||!fi.fmi.metoclient.ui.graph.Controller)throw"ERROR: fi.fmi.metoclient.ui.graph.Controller is required for fi.fmi.metoclient.ui.graph.Graph!";fi.fmi.metoclient.ui.graph.Graph=function(){function a(a){var b=["#9B4F19","#D81E05","#FCD116","#007A3D","#F6A5BE","#919693","#8E0554","#000000","#1C3F94","#00A3DD","#7AD1B5"];return b[a%b.length]}function b(b){if(!b||!b.graphContainerId){var k="ERROR: Graph options or container ID is not correct!";throw"undefined"!=typeof console&&console&&console.error(k),k}var m=fi.fmi.metoclient.ui.graph.Controller();m.init(b.config);var n=fi.fmi.metoclient.ui.graph.Timer,o=m.getParameterInfo(),p={},q=jQuery("#"+b.graphContainerId),r=jQuery('<div class="graphComponent"></div>');q.append(r);var s=jQuery("<div/>",{id:"divParameterSelectImg","class":"divParameterSelectImg divMaximize"});r.append(s);var t=jQuery('<div class="selectionContainer" id="selectionContainer"></div>'),u=jQuery('<ol class="selectable" id="selectable"></ol>');t.append(u),r.append(t);for(var v=0;v<o.length;v++){var w=o[v].code||"",x="ui-widget-content";w&&(x+=" "+w,p[w]=a(v),jQuery.rule(".selectable ."+w+".ui-selected { background-color: "+p[w]+";}").appendTo("style")),u.append(jQuery("<li/>",{id:w,"class":x,text:o[v].label}))}var y=jQuery("<div/>",{id:"graphPlaceholder","class":"graphPlaceholder"});r.append(y);var z=jQuery("<div/>",{id:c,"class":c});y.append(z);var A=jQuery("<div/>",{id:"graphFooter","class":"graphFooter"});y.append(A),A.append("Show: Time labels"),A.append(jQuery("<input/>",{id:h,"class":h,type:"checkbox",checked:!0})),A.append("Y label"),A.append(jQuery("<input/>",{id:i,"class":i,type:"checkbox",checked:!0})),A.append("Values"),A.append(jQuery("<input/>",{id:j,"class":j,type:"checkbox",checked:!0})),A.append(jQuery("<br/>")),A.append(jQuery("<button/>",{id:f,"class":f,text:"Zoom in"})),A.append(jQuery("<button/>",{id:g,"class":g,text:"Zoom out"})),A.append(jQuery("<button/>",{id:d,"class":d,text:"Play"})),A.append(jQuery("<button/>",{id:e,"class":e,text:"Pause"})),u.css({width:u.width()+"px",height:u.height()+"px"});var B=t.width(),C=t.outerWidth(),D=t.height();t.width(0);var E=D;E>s.height()&&(E=s.height(),t.height(E));var F=function(){var a=r.width()-s.outerWidth()-C-1;y.height(r.height()-1),y.width(a),z.width(a),z.height(y.height()-A.outerHeight())};F(),r.resize(function(){F()});var G=new l;G.init(m,n,p),s.click(function(){t.width()?(t.animate({width:0,height:E+"px"},{queue:!1,duration:400}),s.removeClass("divMinimize").addClass("divMaximize")):(t.animate({width:B+"px",height:D+"px"},{queue:!1,duration:400}),s.removeClass("divMaximize").addClass("divMinimize"))}),jQuery("body").click(function(a){var b=a.target.id;"divParameterSelectImg"!==b&&t.width()===B&&(t.animate({width:0,height:E+"px"},{queue:!1,duration:400}),s.removeClass("divMinimize").addClass("divMaximize"))});var H=!1;u.selectable({selected:function(){H=!1;var a,b,c,d=G.getGraphParameters(),e=G.getSelectedParameters();if(e.length>G.getMaxNumSelectedParameters())for(b=0;b<e.length;b++){for(a=!1,c=0;c<d.length;c++)if(e[b]===d[c]){a=!0;break}if(!a)return e.splice(b,1),G.setSelectedParameters(e),void 0}G.setSelectedParameters(e)},unselected:function(a,b){if(!H){var c=G.getGraphParameters();1===c.length?o[c[0]].code===b.unselected.id&&G.setSelectedParameters(c):G.updateGraphParameters()}H=!1},selecting:function(){H=!0}})}var c="flotGraph",d="graphPlay",e="graphPause",f="graphZoomIn",g="graphZoomOut",h="showTimeLabel",i="showYLabels",j="showValues",k="selectable",l=function(){function b(){var a=[],b="#selectable li";return jQuery(".ui-selected","#selectable").each(function(){var c=jQuery(b).index(this);a.push(c)}),a}function l(a){for(var c=[],d=[],e=P.getParameterInfo(),f=0;f<a.length;f++)c[f]=e[a[f]].code,d[f]="#"+c[f];var g=d.join(",");jQuery(".ui-selected","#"+k).not(g).removeClass("ui-selected").addClass("ui-unselected"),jQuery(g).not(".ui-selected").addClass("ui-selected");var h=b();ib.toString()!==h.toString()&&(ib=h,null===$||-1===$.getAxes().xaxis.min&&1===$.getAxes().xaxis.max||(ab.start=$.getAxes().xaxis.min,ab.end=$.getAxes().xaxis.max),ab.request=c.join(","),void 0===Y&&(Y=setTimeout(function(){Y=void 0,P.refreshData(ab),$=null},0)))}function m(){l(b())}function n(){return ib}function o(){return jb}function p(){var a;for(a=0;a<eb.length;a++)eb[a].remove();for(eb=[],a=0;a<kb.length;a++)eb[a]=jQuery("<div />").attr("id","valuelabel"+a),eb[a].appendTo("body").hide().css({position:"absolute",display:"none",border:"1px solid #000000","background-color":"#ffffcc",opacity:0,"z-index":"40000",padding:"0.0em 0.3em","border-radius":"0.5em","font-size":"0.8em","pointer-events":"none"}),eb[a].html("0.00").css({left:0,top:0}).show()}function q(){var a;for(a=0;a<db.length;a++)db[a].remove();for(db=[],a=0;a<kb.length;a++)db[a]=jQuery("<div />").attr("id","ylabel"+a),db[a].appendTo("body").hide().css({position:"absolute",display:"none",border:"1px solid #000000","background-color":"#ffffcc",opacity:0,"z-index":"20000",padding:"0.0em 0.3em","border-radius":"0.5em","font-size":"0.8em","pointer-events":"none"}),db[a].html("0.00").css({left:0,top:0}).show()}function r(a,b,c){var d,e=_.find(a,function(a){return a!==b&&a&&b&&a.measureUnit===b.measureUnit});if(e)d=e.yaxis;else{var f=new ob;f.axisLabel=b.measureUnit,f.position=0===c.length%2?"left":"right",c.push(f),d=c.length}b.yaxis=d}function s(b,c){kb=[],mb.yaxes=[];var d,e=-1;c&&c.locations&&c.locations.length>0?d=c.locations[0].data:"undefined"!=typeof console&&console&&console.error("ERROR: No data from controller to show in graph!");for(var f in d)if(d.hasOwnProperty(f)){var g=d[f];if(g){var h=g.timeValuePairs,i=g.property;if(h&&i){++e;var j=i.unit;j&&0===j.indexOf("deg")&&(j=j.replace("deg","&deg;"));var k=new nb;k.label=i.label,k.measureUnit=j,k.color=void 0!==lb[f]?lb[f]:a(ib[e]);for(var l=0;l<h.length;l++){var m=h[l];k.data[l]=[m.time,m.value],m.value<k.minValue&&(k.minValue=m.value),m.value>k.maxValue&&(k.maxValue=m.value)}kb[e]=k,r(kb,k,mb.yaxes)}}}J(),L();var n=$.getAxes();Q.setSelectedTime(n.xaxis.min),Q.setStartTime(n.xaxis.min),Q.setEndTime(n.xaxis.max),p(),q(),null===cb&&(cb={x:n.xaxis.min,y:n.yaxis.min}),setTimeout(O,100),W||(W=setTimeout(G,10))}function t(a,b){Q.isPlaying()&&I(b)}function u(){Q.pause(),jQuery("#"+e).attr("disabled",!0),jQuery("#"+d).attr("disabled",!1)}function v(){if($&&eb)for(var a=$.getData(),b=0;b<kb.length;b++){eb[b]&&eb[b].hide().html("");var c=a[b];c.highlighted>=0&&($.unhighlight(b,c.highlighted),c.highlighted=-1)}}function w(){if(T&&T.hide().html(""),db)for(var a=0;a<db.length;a++)db[a]&&db[a].hide().html("");v()}function x(a){if("undefined"==typeof $)return!1;var b=$.getAxes();return null===a.y?y(a.x):a.x>b.xaxis.min&&a.x<b.xaxis.max&&a.y>b.yaxis.min&&a.y<b.yaxis.max}function y(a){if("undefined"==typeof $)return!1;var b=$.getAxes();return a>b.xaxis.min&&a<b.xaxis.max}function z(a,b,c){return a>=c[0][0]&&a<=c[1][0]&&b>=c[0][1]&&b<=c[1][1]}function A(a){function b(a,b,c,d){a[b]=function(){return c[d].apply(c,arguments)}}var c={date:a};void 0!==a.strftime&&b(c,"strftime",a,"strftime"),b(c,"getTime",a,"getTime"),b(c,"setTime",a,"setTime");for(var d=["Date","Day","FullYear","Hours","Milliseconds","Minutes","Month","Seconds"],e=0;e<d.length;e++)b(c,"get"+d[e],a,"getUTC"+d[e]),b(c,"set"+d[e],a,"setUTC"+d[e]);return c}function B(a,b){if("browser"===b.timezone)return new Date(a);if(b.timezone&&"utc"!==b.timezone){if("undefined"!=typeof timezoneJS&&"undefined"!=typeof timezoneJS.Date){var c=new timezoneJS.Date;return c.setTimezone(b.timezone),c.setTime(a),c}return A(new Date(a))}return A(new Date(a))}function C(a,b){return a=""+a,b=""+(null===b||void 0===b?"0":b),1===a.length?b+a:a}function D(a,b){if("function"==typeof a.strftime)return a.strftime(b);var c,d=[],e=!1,f=a.getHours(),g=12>f;c=f>12?f-12:0===f?12:f;for(var h=0;h<b.length;++h){var i=b.charAt(h);if(e){switch(i){case"a":i=""+gb[a.getDay()];break;case"b":i=""+fb[a.getMonth()];break;case"d":i=C(a.getDate());break;case"e":i=C(a.getDate()," ");break;case"H":i=C(f);break;case"I":i=C(c);break;case"l":i=C(c," ");break;case"m":i=C(a.getMonth()+1);break;case"M":i=C(a.getMinutes());break;case"S":i=C(a.getSeconds());break;case"y":i=C(a.getFullYear()%100);break;case"Y":i=""+a.getFullYear();break;case"p":i=g?"am":"pm";break;case"P":i=g?"AM":"PM";break;case"w":i=""+a.getDay()}d.push(i),e=!1}else"%"===i?e=!0:d.push(i)}return d.join("")}function E(a,b){var c=$.getAxes().xaxis,d=c.options,e=B(a,c.options),f="%Y";if(void 0!==c.tickSize){var g="undefined"!=typeof b?b:!1,h={second:1e3,minute:6e4,hour:36e5,day:864e5,month:2592e6,year:1e3*525949.2*60},i=c.tickSize[0]*h[c.tickSize[1]],j=c.max-c.min,k=d.twelveHourClock?" %p":"",l=d.twelveHourClock?"%I":"%H";i<h.minute&&!g?f=l+":%M:%S"+k:i<h.day||g?f=j<2*h.day&&!g?l+":%M"+k:"%b %d "+l+":%M"+k:i<h.month?f="%b %d":i<h.year&&(f=j<h.year?"%b":"%b %Y")}return D(e,f)}function F(a,b){return void 0!==_.find(a,function(a){return b!==a&&b&&a&&b.measureUnit===a.measureUnit})}function G(){if($){if(R=jQuery("#"+c).offset(),Q.isPlaying()||$.unlockCrosshair(),W=null,!S&&!Q.isPlaying())return w(),void 0;var a=$.getAxes().xaxis;$.getYAxes();var b={x:null,y:null};if(Q.isPlaying()?b.x=Q.getSelectedTime():b=cb,b.x>a.min&&b.x<a.max)for(var d=$.getData(),e=0;e<d.length;++e){var f=d[e],g=f.yaxis;if(!Q.isPlaying()&&jQuery("#"+i).is(":checked")&&x(b)&&!F(d.slice(0,e),f)){var k=g.c2p(bb.y);db[e].html(k.toFixed(1)).css({left:0,top:0,opacity:0}).show();var l,m=db[e].outerHeight(),n=40;l="left"===g.position?$.getPlotOffset().left+R.left-45-20*e:$.getPlotOffset().left+R.left+$.width()-15+20*e;var o=$.getAxes().yaxis.p2c(b.y)+$.getPlotOffset().top+R.top-m/2;db[e].css({left:l,top:o,"text-align":"center"}).outerWidth(n).show(),db[e].css("opacity",1)}else db[e].hide().html("");var p;for(p=0;p<f.data.length&&!(f.data[p][0]>b.x);++p);var q=Math.max(0,p-1);f.highlighted>=0&&$.unhighlight(e,f.highlighted),$.highlight(e,q),f.highlighted=q;var r=jQuery("#xlabel");if(jQuery("#"+h).is(":checked")&&x(b)){var s=E(new Date(f.data[q][0]));T.html(s).css({left:0,top:0,opacity:0}).show(),r.outerHeight();var t=r.outerWidth(),u=$.getAxes().xaxis.p2c(f.data[q][0])+$.getPlotOffset().left+R.left-t/2,y=R.top+5;T.css({left:u,top:y}).show(),r.css("opacity",1)}else T.hide().html("");if(b.x<f.data[0][0]||b.x>f.data[f.data.length-1][0])eb[e]&&eb[e].hide().html("");else if(eb[e]){var z=f.data[p-1],A=f.data[p],B=H(b.x,z,A);if(B>g.min&&B<g.max){eb[e].html(B.toFixed(f.numDecimals)+" "+f.measureUnit).css({left:0,top:0,opacity:0}).show();var C=jQuery("#valuelabel"+e).outerHeight(),D=a.p2c(b.x)+$.getPlotOffset().left+R.left,G=g.p2c(B)+$.getPlotOffset().top+R.top-C/2;eb[e].css({left:D+15,top:G}).show(),eb[e].css("opacity",.8)}else eb[e].hide().html("")}}else v();jQuery("#"+j).is(":checked")||v()}}function H(a,b,c){var d;return d=K(b[0])?K(c[0])?b[1]+(c[1]-b[1])*(a-b[0])/(c[0]-b[0]):b[1]:c[1]}function I(a,b){if(null!==$){var c=$.getAxes(),d="undefined"!=typeof a?a:c.xaxis.min,e="undefined"!=typeof b?b:null;$.lockCrosshair({x:d,y:e}),G();var f=$.getAxes().xaxis.c2p(1)-$.getAxes().xaxis.c2p(0);0>=f&&(f=1),Q.setAnimationTimeStep(f),Q.setStartTime(c.xaxis.min),Q.setEndTime(c.xaxis.max)}}function J(){for(var a,b,c,d,e=0;e<kb.length;e++){a=[],b=null;for(var f=0;f<kb[e].data.length;f++)if(K(kb[e].data[f][1])){for(c=0;c<a.length;c++){d=a[c];var g=kb[e].data[f];if(null!==b){var h=kb[e].data[b],i=kb[e].data[d][0];kb[e].data[d][1]=H(i,h,g)}else kb[e].data[d][1]=g[1]}b=f,a.length>0&&(a=[])}else kb[e].NaNs.push(f),a.push(f);for(c=0;c<a.length;c++)d=a[c],kb[e].data[d][1]=null!==b?kb[e].data[b][1]:0}}function K(a){return!isNaN(parseFloat(a))&&isFinite(a)}function L(){null===$?(jQuery("#"+c).empty(),$=jQuery.plot(jQuery("#"+c),kb,mb)):($.unhighlight(),$.setData(kb),$.draw()),M()}function M(){var a=$.getXAxes()[0];if("undefined"!=typeof a.ticks){var b,c=a.ticks[0].label,d=!0;if(c.indexOf(":")>=0){for(b=0;b<fb.length;b++)if(c.indexOf(fb[b])>=0){d=!1;break}}else d=!1;if(d){var e=[],f=!1;for(b=0;b<a.ticks.length;b++)if(!(a.ticks[b].v<a.min||a.ticks[b].v>a.max))if(f){var g=a.ticks[b-1].label.indexOf(":"),h=a.ticks[b].label.indexOf(":");parseInt(a.ticks[b-1].label.substring(g-2,g),10)>parseInt(a.ticks[b].label.substring(h-2,h),10)&&e.push(b)}else e.push(b),f=!0;var i=$.getOptions();V=0,i.xaxes[0].tickFormatter=function(a){null!==hb&&hb>a&&(V=0);for(var b=!1,c=0;c<e.length;c++)if(V===e[c]){b=!0;break}return V++,hb=a,E(a,b)},$.setupGrid(),$.draw()}}}function N(a,b){for(var c={value:0,upSign:void 0,downSign:void 0,yAxisMax:void 0,yAxisMin:void 0,yMax:void 0,yMin:void 0},d=0;d<b.length;++d){var e=b[d];e.yaxis-1===a&&((void 0===c.yMax||c.yMax<e.maxValue)&&(c.yMax=e.maxValue),(void 0===c.yMin||c.yMin>e.minValue)&&(c.yMin=e.minValue))}if(void 0!==c.yMax&&void 0!==c.yMin){var f=.05*(c.yMax-c.yMin);c.yAxisMin=c.yMin-f,c.yAxisMax=c.yMax+f,c.value=(c.yMax-c.yMin)/100}return c}function O(a){if($&&(!a||a===U)){var b=[];U=b;for(var c=!0,d=$.getOptions(),e=0;e<d.yaxes.length;e++){b[e]=void 0!==a?a[e]:N(e,kb);var f=b[e];void 0===f.upSign&&(d.yaxes[e].max=$.getYAxes()[e].max,f.upSign=$.getYAxes()[e].max>f.yAxisMax?1:-1),f.value&&f.upSign*d.yaxes[e].max>f.upSign*f.yAxisMax?(d.yaxes[e].max-=f.upSign*f.value,c=!1):(f.upSign=0,d.yaxes[e].max=f.yAxisMax),void 0===f.downSign&&(d.yaxes[e].min=$.getYAxes()[e].min,f.downSign=$.getYAxes()[e].min>f.yAxisMin?1:-1),f.value&&f.downSign*d.yaxes[e].min>f.downSign*f.yAxisMin?(d.yaxes[e].min-=f.downSign*f.value,c=!1):(f.downSign=0,d.yaxes[e].min=f.yAxisMin)}$.setupGrid(),$.draw(),c||setTimeout(function(){O(b)},10)}}var P,Q,R,S,T,U,V,W,X,Y,Z=function(a,b){var c,d,e,f,g,h,i,j=a.getData(),k=a.getAxes().xaxis,l=a.getPlotOffset();b.lineWidth=3,b.strokeStyle="rgba(100,100,100,1.0)";for(var m=0;m<j.length;m++){c=j[m].yaxis;for(var n=j[m],o=0;o<n.data.length;o++)if(!(jQuery.inArray(o,n.NaNs)<0)){var p=n.data[o];d=l.left+k.p2c(p[0]),e=l.top+c.p2c(p[1]);var q=[[l.left,l.top],[l.left+k.p2c(k.max),l.top+c.p2c(c.min)]],r=n.data[o-1];void 0!==r&&jQuery.inArray(o-1,n.NaNs)&&(f=l.left+k.p2c(r[0]),g=l.top+c.p2c(r[1]),b.dashedLine(f,g,d,e,q,2));var s=n.data[o+1];"undefined"!=typeof s&&(h=l.left+k.p2c(s[0]),i=l.top+c.p2c(s[1]),b.dashedLine(d,e,h,i,q,2))}}},$=null,ab={},bb={x:null,y:null},cb=null,db=[],eb=[],fb=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],gb=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],hb=null,ib=[],jb=4,kb=[],lb={},mb={xaxis:{mode:"time"},yaxes:[],zoom:{interactive:!0},pan:{interactive:!0,cursor:"move"},crosshair:{mode:"xy",color:"rgba(120, 120, 120, 0.50)",lineWidth:1},grid:{hoverable:!0,clickable:!0,autoHighlight:!1,backgroundColor:{colors:["#ffffff","#f4f4f4"]},labelMargin:8,margin:30},legend:{show:!0,position:"ne",backgroundColor:"rgba(255, 255, 255, 0.90)"},hooks:{draw:[Z]}},nb=function(a,b,c,d){this.data=a||[],this.label=b||"",this.measureUnit=c||"",this.numDecimals=d||0,this.yaxis=1,this.highlighted=-1,this.NaNs=[],this.maxValue=Number.NEGATIVE_INFINITY,this.minValue=Number.POSITIVE_INFINITY},ob=function(){this.show=!0,this.position="left",this.ticks=10,this.zoomRange=!1,this.min=null,this.max=null,this.autoscaleMargin=.02},pb=function(a,b,k){P=a,Q=b,ab=P.getView(),lb=k||{},R=jQuery("#"+c).offset(),T=jQuery("<div />").attr("id","xlabel"),T.appendTo("body").hide().css({position:"absolute",display:"none",border:"1px solid #000000","background-color":"#ffffcc",opacity:0,"z-index":"30000",padding:"0.0em 0.3em","border-radius":"0.5em","font-size":"0.8em","pointer-events":"none"}),T.html("").css({left:0,top:0}).show(),P.subscribe("data_refreshed",this.dataRefreshed),Q.subscribe("time_changed",this.timeChanged),l([0]),Q.setPlaying(!1),jQuery("#"+d).attr("disabled",!1),jQuery("#"+e).attr("disabled",!0),jQuery("#"+c).bind("plothover",function(a,b){if(S=!0,null!==$){cb=b;var c=$.getAxes();bb.x=c.xaxis.p2c(cb.x),bb.y=c.yaxis.p2c(cb.y),Q.isPlaying()||(x(cb)?Q.setSelectedTime(b.x):Q.setSelectedTime($.getAxes().xaxis.min)),W||(W=setTimeout(G,10))}}),jQuery("#"+c).bind("mouseleave",function(){S=!1,null!==$&&(Q.isPlaying()||Q.setSelectedTime($.getAxes().xaxis.min),w())}),jQuery("#"+c).bind("plotpan",function(){X&&clearTimeout(X),X=setTimeout(function(){X=null,(ab.start!==$.getAxes().xaxis.min||ab.end!==$.getAxes().xaxis.max)&&(ab.start=$.getAxes().xaxis.min,ab.end=$.getAxes().xaxis.max,P.refreshData(ab))},200),W||(W=setTimeout(G,0))}),jQuery("#"+c).bind("plotzoom",function(){S=!0;var a=$.getAxes();cb.x=a.xaxis.c2p(bb.x),cb.y=a.yaxis.c2p(bb.y);var b=Q.getSelectedTime();Q.isPlaying()&&(Q.pause(),y(b)?Q.play(b):Q.play(a.xaxis.min)),W||(W=setTimeout(G,10)),ab.start=a.xaxis.min,ab.end=a.xaxis.max,P.refreshData(ab)}),jQuery("#"+c).bind("plotclick",function(a,b){Q.isPlaying()&&(u(),cb=b,Q.setSelectedTime(b.x),I(b.x,b.y),W||(W=setTimeout(G,10)))}),jQuery("#"+d).click(function(){jQuery("#"+d).attr("disabled",!0),jQuery("#"+e).attr("disabled",!1),Q.setPlaying(!0),Q.play(Q.getSelectedTime())}),jQuery("#"+e).click(function(){u()}),jQuery("#"+f).click(function(){$.zoom()}),jQuery("#"+g).click(function(){$.zoomOut()}),jQuery(document).on("change","#"+h,function(){G()}),jQuery(document).on("change","#"+i,function(){G()}),jQuery(document).on("change","#"+j,function(){G()})};return CanvasRenderingContext2D.prototype.dashedLine=function(a,b,c,d,e,f){(void 0===f||0>=f)&&(f=2),this.beginPath(),this.moveTo(a,b);for(var g,h,i=c-a,j=d-b,k=Math.floor(Math.sqrt(i*i+j*j)/f),l=i/k,m=j/k,n=0;n++<k;)g=a,h=b,a+=l,b+=m,0!==n%2&&z(g,h,e)&&z(a,b,e)?this.lineTo(a,b):this.moveTo(a,b);0!==n%2&&z(a,b,e)&&z(c,d,e)?this.lineTo(c,d):this.moveTo(c,d),this.stroke(),this.closePath()},{init:pb,dataRefreshed:s,timeChanged:t,getGraphParameters:n,getSelectedParameters:b,setSelectedParameters:l,getMaxNumSelectedParameters:o,updateGraphParameters:m}};return{insertGraph:b}}();