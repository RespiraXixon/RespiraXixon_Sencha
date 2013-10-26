Ext.define('RespiraXixon.controller.Mapa', {
    extend: 'Ext.app.Controller',

    models: ['Contaminante','Estacion','Indices'],
    stores: ['Contaminantes','Estaciones','Indices'],
/*
    refs: [
        {ref: 'contaminacionChart', selector: 'contaminacionchart'},
        {ref: 'contaminacionGrid', selector: 'contaminaciongrid'}
    ],
*/
    init: function() {
        var me = this;
		Ext.getStore('Estaciones');
		Ext.getStore('Indices');
		Ext.getStore('Contaminantes');
        this.control({
            'cf_mappanel': {
                'beforerender': this.onMapPanelBeforeRender
            }
        }, this);
    },

    onMapPanelBeforeRender: function(mapPanel, options) {
        var me = this;

        var layers = [];

        // OpenLayers object creating
         // Se crea el objeto de Open Layer
        var wms = new OpenLayers.Layer.OSM("Mapa Base");
        /*
        var wms = new OpenLayers.Layer.WMS(
            "OpenLayers WMS",
            "http://vmap0.tiles.osgeo.org/wms/vmap0?",
            {layers: 'basic'}
        );*/
        layers.push(wms);

        // create vector layer
        var context = {
            getColor: function(feature) {
                if (feature.attributes.elevation < 2000) {
                    return 'green';
                }
                if (feature.attributes.elevation < 2300) {
                    return 'orange';
                }
                return 'red';
            }
        };
        var template = {
            cursor: "pointer",
            fillOpacity: 0.5,
            fillColor: "${getColor}",
            pointRadius: 5,
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeColor: "${getColor}",
            graphicName: "triangle"
        };
        
function parseaGeoJson (){
        console.log("Parseando");

console.log(me.getEstacionesStore());            
}        

parseaGeoJson();

//console.log(me.getContaminacionesStore());
        var style = new OpenLayers.Style(template, {context: context});
/*        
        var vecLayer = new OpenLayers.Layer.Vector("vector", {
            styleMap: new OpenLayers.StyleMap({
                'default': style
            }),
            protocol: new OpenLayers.Protocol.HTTP({
                url: "../../data/calidadaire.json",
                format: new OpenLayers.Format.GeoJSON()
            }),
            strategies: [new OpenLayers.Strategy.Fixed()]
        });
*/

        var vecLayer = new OpenLayers.Layer.Vector("vector", {
            styleMap: new OpenLayers.StyleMap({
                'default': style
            }),
            protocol: new OpenLayers.Protocol.HTTP({
                url: "../../data/estaciones.json",
                format: new OpenLayers.Format.GeoJSON()
            }),
            strategies: [new OpenLayers.Strategy.Fixed()]
        });
//console.log(vecLayer);
        layers.push(vecLayer);

        // manually bind store to layer
       // me.getContaminacionesStore().bind(vecLayer);
//console.log(me.getContaminacionesStore());
        mapPanel.map.addLayers(layers);
//console.log(mapPanel.map);
        // some more controls
        mapPanel.map.addControls([new OpenLayers.Control.DragFeature(vecLayer, {
            autoActivate: true,
            onComplete: function(feature, px) {
                var store = me.getContaminacionesStore();
                store.fireEvent('update', store, store.getByFeature(feature));
            }
        })]);

        // for dev purpose
        map = mapPanel.map;
        mapPanel = mapPanel;
    },

    onLaunch: function() {
        var me = this;

        // for dev purpose
        ctrl = this;
    }
});
