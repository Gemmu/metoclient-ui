!function(a){function b(a,b,c,d){var e="categories"==b.xaxis.options.mode,f="categories"==b.yaxis.options.mode;if(e||f){var g=d.format;if(!g){var h=b;if(g=[],g.push({x:!0,number:!0,required:!0}),g.push({y:!0,number:!0,required:!0}),h.bars.show||h.lines.show&&h.lines.fill){var i=!!(h.bars.show&&h.bars.zero||h.lines.show&&h.lines.zero);g.push({y:!0,number:!0,required:!1,defaultValue:0,autoscale:i}),h.bars.horizontal&&(delete g[g.length-1].y,g[g.length-1].x=!0)}d.format=g}for(var j=0;j<g.length;++j)g[j].x&&e&&(g[j].number=!1),g[j].y&&f&&(g[j].number=!1)}}function c(a){var b=-1;for(var c in a)a[c]>b&&(b=a[c]);return b+1}function d(a){var b=[];for(var c in a.categories){var d=a.categories[c];d>=a.min&&d<=a.max&&b.push([d,c])}return b.sort(function(a,b){return a[0]-b[0]}),b}function e(b,c,e){if("categories"==b[c].options.mode){if(!b[c].categories){var g={},h=b[c].options.categories||{};if(a.isArray(h))for(var i=0;i<h.length;++i)g[h[i]]=i;else for(var j in h)g[j]=h[j];b[c].categories=g}b[c].options.ticks||(b[c].options.ticks=d),f(e,c,b[c].categories)}}function f(a,b,d){for(var e=a.points,f=a.pointsize,g=a.format,h=b.charAt(0),i=c(d),j=0;j<e.length;j+=f)if(null!=e[j])for(var k=0;f>k;++k){var l=e[j+k];null!=l&&g[k][h]&&(l in d||(d[l]=i,++i),e[j+k]=d[l])}}function g(a,b,c){e(b,"xaxis",c),e(b,"yaxis",c)}function h(a){a.hooks.processRawData.push(b),a.hooks.processDatapoints.push(g)}var i={xaxis:{categories:null},yaxis:{categories:null}};a.plot.plugins.push({init:h,options:i,name:"categories",version:"1.0"})}(jQuery);