Ext.define('RespiraXixon.controller.Mapa', {
    extend: 'Ext.app.Controller',
    requires: ["Ext.ux.RXUtils","RespiraXixon.store.OSMStore"],
    layers:[],
    indices_style_map:null,
    config: {
    	stores: ['Estaciones','Contaminantes','Indices','OSMStore'],
        refs: {
            openLayersMap: '#openlayersmap'
        },
        control: {
        	openLayersMap: {
				maprender: 'onMapRender'
			}
        }
    },

    init: function() {
    	var me = this;
    	/*
		this.control({
            'openlayersmap': {
                'beforerender': this.onMapRender
            }
        }, this);*/
    },

    onMapRender: function(mapPanel, options) {
    	console.log("render");
        var me = this;
        
        map = mapPanel.getMap();
        
        //Creo la capa de vector
    	var vector = new OpenLayers.Layer.Vector("Geolocalizacion", {});

    	
    	var geolocate = new OpenLayers.Control.Geolocate({
	        id: 'locate-control',
	        geolocationOptions: {
	            enableHighAccuracy: true,
	            maximumAge: 0,
	            timeout: 7000
	        }
    	});
    	var style = {
	        fillOpacity: 0.1,
	        fillColor: '#000',
	        strokeColor: '#f00',
	        strokeOpacity: 0.6
	    };
    	geolocate.events.register("locationupdated", this, function(e) {
		        vector.removeAllFeatures();
		        var punto = new OpenLayers.Feature.Vector(
		                e.point,
		                {}
		            );
		        var estacion=Ext.ux.RXUtils.distancia_estacion(map,this.layers[0],punto);
		        punto.data=estacion.estacion.data;
		        punto.attributes={"distancia":estacion.distancia};
		        
		        if (punto.data.ind_global_rx_ayt_gijon==0){
		        	punto.style={
		                	externalGraphic: "resources/icons/semaforo/semaforo_verde.jpg",
	            			graphicOpacity: 1.0,
	            			graphicWidth: 16,
	            			graphicHeight: 26,
	            			graphicYOffset: -26		                
	            	  };		        	
		        }
		        else 
		        	if (punto.data.ind_global_rx_ayt_gijon==1){
		        		punto.style = {
		                	externalGraphic: "resources/icons/semaforo/semaforo_ambar.jpg",
	            			graphicOpacity: 1.0,
	            			graphicWidth: 16,
	            			graphicHeight: 26,
	            			graphicYOffset: -26		                
	            	  };
		        	}else{
		        		punto.style = {
		                	externalGraphic: "resources/icons/semaforo/semaforo_rojo.jpg",
	            			graphicOpacity: 1.0,
	            			graphicWidth: 16,
	            			graphicHeight: 26,
	            			graphicYOffset: -26		                
	            	  };
		        }
		        vector.addFeatures([
		            new OpenLayers.Feature.Vector(
		                OpenLayers.Geometry.Polygon.createRegularPolygon(
		                    new OpenLayers.Geometry.Point(e.point.x, e.point.y),
		                    e.position.coords.accuracy / 2,
		                    50,
		                    0
		                ),
		                {},
		                style
		            ),
		            punto
		        ]);
    	});
/*		
	    var estacionesLayer = new OpenLayers.Layer.Vector("Estaciones", {
	        styleMap: new OpenLayers.StyleMap({
	            externalGraphic: "src/OpenLayers/img/marker-gold.png",
	            graphicOpacity: 1.0,
	            graphicWidth: 16,
	            graphicHeight: 26,
	            graphicYOffset: -26
	        })
	    });
		estacionesLayer.addFeatures(RXUtils.parseaGeoJson(Ext.getStore('Estaciones')));
	    */
	    
		this.layers.push(vector);
    
		//Creamos el layer de control
        
        var control = new OpenLayers.Control.SelectFeature([this.layers[0],vector],{geometryTypes: ["OpenLayers.Geometry.Point"]});        
        
        vector.events.on({
                "featureselected": function(e) {
                		feature=e.feature;
            			selectedFeature = feature;
            			var html="<div style='font-size:.8em'>Coordenadas: " + feature.geometry.toShortString()+ "<br>";
            			for(var key in feature.data) {
								html=html + key + ": "+feature.data[key]+"<br>";
						};
            			html=html+"</div>";
            			popup = new OpenLayers.Popup.FramedCloud("chicken", 
                                     feature.geometry.getBounds().getCenterLonLat(),
                                     null,
                                     html.toString(),
                                     null, true);
            			feature.popup = popup;
            			map.addPopup(popup);
                },
                "featureunselected": function(e) {
                	   	feature=e.feature;
            			map.removePopup(feature.popup);
            			feature.popup.destroy();
            			feature.popup = null;
                }
            });
            
        var controles = [
        				new OpenLayers.Control.LayerSwitcher(),
            			new OpenLayers.Control.Attribution(),
            			new OpenLayers.Control.TouchNavigation({
                			dragPanOptions: {
                    			enableKinetic: true
                			}
            			}),
            			control,
            			geolocate
        ];

        map.addLayers(this.layers);
        map.addControls(controles);
     	geolocate.activate();        
       	control.activate();
    },

    launch: function() {
        var me = this;
        
        var contaminantes = Ext.getStore('Contaminantes');
            contaminantes.on({
                load: 'onContaminantesLoad',
                scope: this
            });
        contaminantes.load();
        
        var OSMStore = Ext.getStore('OSMStore');
            OSMStore.on({
                load: 'onOSMStoreLoad',
                scope: this
            });
        OSMStore.load();
        // for dev purpose
        ctrl = this;
    },
    
    onContaminantesLoad: function() {
    	console.log("indices");
    	var indiceGlobalLayer = new OpenLayers.Layer.Vector("Indice RX Global", {
	        styleMap: new OpenLayers.StyleMap({
	            externalGraphic: "src/OpenLayers/img/marker.png",
	            graphicOpacity: 1.0,
	            graphicWidth: 16,
	            graphicHeight: 26,
	            graphicYOffset: -26
	        })
	    });
	    Ext.ux.RXUtils.calcula_medias();
		Ext.ux.RXUtils.calcula_indices();
		var estaciones = Ext.ux.RXUtils.parseaGeoJson(Ext.getStore('Detalle_Estaciones'));
		indiceGlobalLayer.addFeatures(estaciones);
		
		indiceGlobalLayer.events.on({
                "featureselected": function(e) {
                		feature=e.feature;
            			selectedFeature = feature;
            			var html="<div style='font-size:.8em'>Coordenadas: " + feature.geometry.toShortString()+ "<br>";
            			for(var key in feature.data) {
								html=html + key + ": "+feature.data[key]+"<br>";
						};
            			html=html+"</div>";
            			popup = new OpenLayers.Popup.FramedCloud("chicken", 
                                     feature.geometry.getBounds().getCenterLonLat(),
                                     null,
                                     html.toString(),
                                     null, true);
            			feature.popup = popup;
            			map.addPopup(popup);
                },
                "featureunselected": function(e) {
                	   	feature=e.feature;
            			map.removePopup(feature.popup);
            			feature.popup.destroy();
            			feature.popup = null;
                }
            });
		this.layers.push(indiceGlobalLayer);
    },
    
    onOSMStoreLoad: function() {
    	console.log("OSM load");
        var indices_style_map = new OpenLayers.StyleMap({"default": Ext.ux.RXUtils.estilo_indices("ind_global_rx_ayt_gijon")});		
		var barriosLayer = new OpenLayers.Layer.Vector("Barrios", {
	        styleMap: indices_style_map
	    });
	    var barrios=Ext.ux.RXUtils.parseaOSMtoGeoJson(Ext.getStore('OSMStore'));
	    var estaciones=Ext.ux.RXUtils.parseaGeoJson(Ext.getStore('Detalle_Estaciones'));
	    Ext.ux.RXUtils.indicesBarrio(barrios,estaciones);
		barriosLayer.addFeatures(barrios);
		//this.layers.push(barriosLayer);
		
		var openlayermap=Ext.getCmp("openlayersmap");
		//Esto lo hago para forzar el renderizado
		openlayermap.setMapCenter({longitude:-5.6626443, latitude:43.5450394});
		if (map){
			map.addLayer(barriosLayer);
			map.zoomToExtent(barriosLayer.getDataExtent());
		}else{
			this.layers.push(barriosLayer);
		}
		
		
   }
});
