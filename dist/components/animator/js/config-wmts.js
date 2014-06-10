// See config.js for more detailed comments about configuration files.

"use strict";

var fi = fi || {};
fi.fmi = fi.fmi || {};
fi.fmi.metoclient = fi.fmi.metoclient || {};
fi.fmi.metoclient.ui = fi.fmi.metoclient.ui || {};
fi.fmi.metoclient.ui.animator = fi.fmi.metoclient.ui.animator || {};

fi.fmi.metoclient.ui.animator.Config = {

    map : {
        className : "OpenLayers.Map",
        args : [{
            allOverlays : true,
            projection : 'EPSG:3067',
            units : "m",
            numOfZoomLevels : 8,
            resolutions : [8192, 4096, 2048, 1024, 512, 256, 128, 64],
            maxExtent : [-4537345.568, 3840856.936, 2889342.313, 8254755.58],
            restrictedExtent : [-118331.366408356, 6335621.16701424, 875567.731906565, 7907751.53726352]
        }]
    },

    layers : [{
        className : "OpenLayers.Layer.WMTS",
        args : [{
            name : "Map",
            url : "http://wms.fmi.fi/fmi-apikey/insert-your-apikey-here/geoserver/gwc/service/wmts",
            format : "image/png",
            layer : "KAP:Europe_basic_EurefFIN",
            style : "",
            matrixSet : "ETRS-TM35FIN",
            matrixIds : [{
                identifier : "ETRS-TM35FIN:0"
            }, {
                identifier : "ETRS-TM35FIN:1"
            }, {
                identifier : "ETRS-TM35FIN:2"
            }, {
                identifier : "ETRS-TM35FIN:3"
            }, {
                identifier : "ETRS-TM35FIN:4"
            }, {
                identifier : "ETRS-TM35FIN:5"
            }, {
                identifier : "ETRS-TM35FIN:6"
            }, {
                identifier : "ETRS-TM35FIN:7"
            }]
        }]
    }, {
        capabilities : {
            url : "http://data.fmi.fi/fmi-apikey/insert-your-apikey-here/wfs",
            storedQueryId : "fmi::radar::composite::rr",
            layer : "Radar:suomi_rr_eureffin"
        },
        className : "OpenLayers.Layer.Animation.Wmts",
        args : [{
            name : "Precipitation",
            url : "http://wms.fmi.fi/fmi-apikey/insert-your-apikey-here/geoserver/gwc/service/wmts",
            layer : "Radar:suomi_rr_eureffin",
            style : "",
            maxExtent : [-118331.366408356, 6335621.16701424, 875567.731906565, 7907751.53726352],
            matrixSet : "ETRS-TM35FIN-FINLAND",
            matrixIds : [{
                identifier : "ETRS-TM35FIN-FINLAND:0"
            }, {
                identifier : "ETRS-TM35FIN-FINLAND:1"
            }, {
                identifier : "ETRS-TM35FIN-FINLAND:2"
            }, {
                identifier : "ETRS-TM35FIN-FINLAND:3"
            }, {
                identifier : "ETRS-TM35FIN-FINLAND:4"
            }, {
                identifier : "ETRS-TM35FIN-FINLAND:5"
            }, {
                identifier : "ETRS-TM35FIN-FINLAND:6"
            }, {
                identifier : "ETRS-TM35FIN-FINLAND:7"
            }],
            animation : {
                layers : [{
                    layer : "Radar:suomi_tuliset_rr_eureffin",
                    storedQueryId : "fmi::forecast::tuliset::rr",
                    beginTime : "join",
                    name : "Precipitation forecast",
                    isForecast : true
                }],
                autoLoad : true,
                maxAsyncLoadCount : 4,
                name : "Precipitation"
            }
        }]
    }],

    defaultZoomLevel : 2,
    animationRefreshInterval : 15 * 60 * 1000,
    animationFrameRate : 500,
    animationResolutionTime : 15 * 60 * 1000,
    animationDeltaToBeginTime : 12 * 15 * 60 * 1000,
    animationDeltaToEndTime : 4 * 15 * 60 * 1000

};
