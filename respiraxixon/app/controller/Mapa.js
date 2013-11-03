Ext.define('RespiraXixon.controller.Mapa', {
    extend: 'Ext.app.Controller',
    requires: ["Ext.ux.RXUtils"],
    /*
    estilo_origen:null,
    estilo_origen_style_map:null,
    */
    config: {
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
        
/*TODO:Intentar hacer el estilo del semaforo por reglas */  
/*   	
        this.estilo_origen = new OpenLayers.Style();

		var semaforo_verde = new OpenLayers.Rule({
		  filter: new OpenLayers.Filter.Comparison({
		      type: OpenLayers.Filter.Comparison.LIKE,
		      property: "ind_global_rx_ayt_gijon",
		      value: "0"
		  }),
		  symbolizer: {
		                	externalGraphic: "resources/icons/semaforo/semaforo_verde.jpg",
	            			graphicOpacity: 1.0,
	            			graphicWidth: 16,
	            			graphicHeight: 26,
	            			graphicYOffset: -26		                
	            	  }
		});

		var semaforo_ambar = new OpenLayers.Rule({
		  filter: new OpenLayers.Filter.Comparison({
		      type: OpenLayers.Filter.Comparison.LIKE,
		      property: "ind_global_rx_ayt_gijon",
		      value: "1"
		  }),
		  symbolizer: {
		                	externalGraphic: "resources/icons/semaforo/semaforo_ambar.jpg",
	            			graphicOpacity: 1.0,
	            			graphicWidth: 16,
	            			graphicHeight: 26,
	            			graphicYOffset: -26		                
	            	  }
		});
		var semaforo_rojo = new OpenLayers.Rule({
		  filter: new OpenLayers.Filter.Comparison({
		      type: OpenLayers.Filter.Comparison.LIKE,
		      property: "ind_global_rx_ayt_gijon",
		      value: "1"
		  }),
		  symbolizer: {
		                	externalGraphic: "resources/icons/semaforo/semaforo_rojo.jpg",
	            			graphicOpacity: 1.0,
	            			graphicWidth: 16,
	            			graphicHeight: 26,
	            			graphicYOffset: -26		                
	            	  }
		});

		this.estilo_origen.addRules([semaforo_verde, semaforo_ambar, semaforo_rojo]);

		this.estilo_origen_style_map = new OpenLayers.StyleMap(this.estilo_origen);
*/	
		this.control({
            'openlayersmap': {
                'beforerender': this.onMapRender
            }
        }, this);
    },

    onMapRender: function(mapPanel, options) {
        var me = this;
        var RXUtils= Ext.create("Ext.ux.RXUtils");
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
   					
		        var estacion=RXUtils.distancia_estacion(map,indiceGlobalLayer,punto);
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

		        map.zoomToExtent(vector.getDataExtent());
    	});
		
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
	    
	    var indiceGlobalLayer = new OpenLayers.Layer.Vector("Indice RX Global", {
	        styleMap: new OpenLayers.StyleMap({
	            externalGraphic: "src/OpenLayers/img/marker.png",
	            graphicOpacity: 1.0,
	            graphicWidth: 16,
	            graphicHeight: 26,
	            graphicYOffset: -26
	        })
	    });
	    RXUtils.calcula_medias();
		RXUtils.calcula_indices();
		
		indiceGlobalLayer.addFeatures(RXUtils.parseaGeoJson(Ext.getStore('Detalle_Estaciones')));
		//Inicializamos las capas que queremos poner en el mapa
		
        var layers = [
	            estacionesLayer,
	            indiceGlobalLayer,
	            vector
        ];
        //Creamos el layer de control
        
        var control = new OpenLayers.Control.SelectFeature([indiceGlobalLayer,vector],{hover:true, geometryTypes: ["OpenLayers.Geometry.Point"]});
		               		
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

		var map = mapPanel.getMap();


        map.addLayers(layers);
        map.addControls(controles);
     	geolocate.activate();        
       	control.activate();
    },

    onLaunch: function() {
        var me = this;

        // for dev purpose
        ctrl = this;
    }
});
