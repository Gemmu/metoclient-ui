!function(a){function b(b){function c(a){o.active&&(j(a),b.getPlaceholder().trigger("plotselecting",[f()]))}function d(b){1==b.which&&(document.body.focus(),void 0!==document.onselectstart&&null==p.onselectstart&&(p.onselectstart=document.onselectstart,document.onselectstart=function(){return!1}),void 0!==document.ondrag&&null==p.ondrag&&(p.ondrag=document.ondrag,document.ondrag=function(){return!1}),i(o.first,b),o.active=!0,q=function(a){e(a)},a(document).one("mouseup",q))}function e(a){return q=null,void 0!==document.onselectstart&&(document.onselectstart=p.onselectstart),void 0!==document.ondrag&&(document.ondrag=p.ondrag),o.active=!1,j(a),n()?g():(b.getPlaceholder().trigger("plotunselected",[]),b.getPlaceholder().trigger("plotselecting",[null])),!1}function f(){if(!n())return null;if(!o.show)return null;var c={},d=o.first,e=o.second;return a.each(b.getAxes(),function(a,b){if(b.used){var f=b.c2p(d[b.direction]),g=b.c2p(e[b.direction]);c[a]={from:Math.min(f,g),to:Math.max(f,g)}}}),c}function g(){var a=f();b.getPlaceholder().trigger("plotselected",[a]),a.xaxis&&a.yaxis&&b.getPlaceholder().trigger("selected",[{x1:a.xaxis.from,y1:a.yaxis.from,x2:a.xaxis.to,y2:a.yaxis.to}])}function h(a,b,c){return a>b?a:b>c?c:b}function i(a,c){var d=b.getOptions(),e=b.getPlaceholder().offset(),f=b.getPlotOffset();a.x=h(0,c.pageX-e.left-f.left,b.width()),a.y=h(0,c.pageY-e.top-f.top,b.height()),"y"==d.selection.mode&&(a.x=a==o.first?0:b.width()),"x"==d.selection.mode&&(a.y=a==o.first?0:b.height())}function j(a){null!=a.pageX&&(i(o.second,a),n()?(o.show=!0,b.triggerRedrawOverlay()):k(!0))}function k(a){o.show&&(o.show=!1,b.triggerRedrawOverlay(),a||b.getPlaceholder().trigger("plotunselected",[]))}function l(a,c){var d,e,f,g,h=b.getAxes();for(var i in h)if(d=h[i],d.direction==c&&(g=c+d.n+"axis",a[g]||1!=d.n||(g=c+"axis"),a[g])){e=a[g].from,f=a[g].to;break}if(a[g]||(d="x"==c?b.getXAxes()[0]:b.getYAxes()[0],e=a[c+"1"],f=a[c+"2"]),null!=e&&null!=f&&e>f){var j=e;e=f,f=j}return{from:e,to:f,axis:d}}function m(a,c){var d,e=b.getOptions();"y"==e.selection.mode?(o.first.x=0,o.second.x=b.width()):(d=l(a,"x"),o.first.x=d.axis.p2c(d.from),o.second.x=d.axis.p2c(d.to)),"x"==e.selection.mode?(o.first.y=0,o.second.y=b.height()):(d=l(a,"y"),o.first.y=d.axis.p2c(d.from),o.second.y=d.axis.p2c(d.to)),o.show=!0,b.triggerRedrawOverlay(),!c&&n()&&g()}function n(){var a=b.getOptions().selection.minSize;return Math.abs(o.second.x-o.first.x)>=a&&Math.abs(o.second.y-o.first.y)>=a}var o={first:{x:-1,y:-1},second:{x:-1,y:-1},show:!1,active:!1},p={},q=null;b.clearSelection=k,b.setSelection=m,b.getSelection=f,b.hooks.bindEvents.push(function(a,b){var e=a.getOptions();null!=e.selection.mode&&(b.mousemove(c),b.mousedown(d))}),b.hooks.drawOverlay.push(function(b,c){if(o.show&&n()){var d=b.getPlotOffset(),e=b.getOptions();c.save(),c.translate(d.left,d.top);var f=a.color.parse(e.selection.color);c.strokeStyle=f.scale("a",.8).toString(),c.lineWidth=1,c.lineJoin=e.selection.shape,c.fillStyle=f.scale("a",.4).toString();var g=Math.min(o.first.x,o.second.x)+.5,h=Math.min(o.first.y,o.second.y)+.5,i=Math.abs(o.second.x-o.first.x)-1,j=Math.abs(o.second.y-o.first.y)-1;c.fillRect(g,h,i,j),c.strokeRect(g,h,i,j),c.restore()}}),b.hooks.shutdown.push(function(b,e){e.unbind("mousemove",c),e.unbind("mousedown",d),q&&a(document).unbind("mouseup",q)})}a.plot.plugins.push({init:b,options:{selection:{mode:null,color:"#e8cfac",shape:"round",minSize:5}},name:"selection",version:"1.1"})}(jQuery);