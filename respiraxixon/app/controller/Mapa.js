Ext.define('RespiraXixon.controller.Mapa', {
    extend: 'Ext.app.Controller',
    requires: ["Ext.ux.RXUtils","RespiraXixon.store.OSMStore"],
    layers:{
    		"indiceGlobalLayer":null,
    		"barriosLayer":null,
    		"geolocalizacion":null
    },
    controles:{
    		"geolocalizacionControl":null
    },
    config: {
    	stores: ['Estaciones','Contaminantes','Indices','OSMStore'],
        refs: {
            openLayersMap: '#openlayersmap'
        },
        control: {
        	openLayersMap: {
				maprender: 'onLoad',
				render: 'onMapRender'
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

    onMapRender: function(mapPanel) {
    	console.log("render");
    	var map = mapPanel.getMap();
        var me = this;
		//Creamos el layer de control
        
        console.log(this.layers);
		console.log(this.controles);
        //map.addLayers([this.layers["geolocalizacion"],this.layers["indiceGlobalLayer"],this.layers["barriosLayer"]]);
        //map.addControls([this.controles["vectorControl"],this.controles["indiceGlobalControl"],this.controles["geolocalizacionControl"]]);
		/*
        if(this.layers["geolocalizacion"]){
        	map.addLayers(this.layers["geolocalizacion"]);
        }
        if(this.layers["indiceGlobalLayer"]){
        	map.addLayers(this.layers["indiceGlobalLayer"]);
        }
        if(this.layers["barriosLayer"]){
        	map.addLayers(this.layers["barriosLayer"]);
        }
		*/
		var controles = [
	        				new OpenLayers.Control.LayerSwitcher(),
	            			new OpenLayers.Control.Attribution(),
	            			new OpenLayers.Control.TouchNavigation({
	                			dragPanOptions: {
	                    			enableKinetic: true
	                			}
	            			})
        ];
        
        map.addControls(controles);

        if (this.layers["indiceGlobalLayer"]&&this.layers["geolocalizacion"]){
        		var control = new OpenLayers.Control.SelectFeature([this.layers["indiceGlobalLayer"],this.layers["geolocalizacion"]],{geometryTypes: ["OpenLayers.Geometry.Point"]});
				map.addControl(control);
				control.activate();
        }
    },

    launch: function() {
        var me = this;
        
        // for dev purpose
        ctrl = this;
    },
	geolocaliza: function(map){
		console.log("geolocaliza");
		//Creo la capa de geolocalizacion
    	var vector = new OpenLayers.Layer.Vector("Geolocalizacion", {});
    	
    	var style = {
	        fillOpacity: 0.1,
	        fillColor: '#000',
	        strokeColor: '#f00',
	        strokeOpacity: 0.6
	    };
        
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
      	
      	var geolocate = new OpenLayers.Control.Geolocate({
	        id: 'locate-control',
	        geolocationOptions: {
	            enableHighAccuracy: true,
	            maximumAge: 0,
	            timeout: 7000
	        }
    	});
      	
      	geolocate.events.register("locationupdated", this, function(e) {
		        vector.removeAllFeatures();
		        
		        var punto = new OpenLayers.Feature.Vector(
		                e.point,
		                {}
		            );
		        var estacion=Ext.ux.RXUtils.distancia_estacion(map,this.layers["indiceGlobalLayer"],punto);
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
				                    0),
				        			{},
				        			style
				        ),
				        punto
        		]);
        		
    	});
		this.layers["geolocalizacion"]=vector;
		map.addLayer(vector);
		this.controles["geolocalizacionControl"]= geolocate;
		map.addControl(geolocate);
		geolocate.activate();
	},
    
    onLoad: function(mapPanel){
    	console.log("load");
    	
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
        var openlayermap=Ext.getCmp("openlayersmap");
        var map=openlayermap.getMap();
		this.layers["indiceGlobalLayer"]=indiceGlobalLayer;
		map.addLayer(indiceGlobalLayer);
		/*
			var control = new OpenLayers.Control.SelectFeature([indiceGlobalLayer],{geometryTypes: ["OpenLayers.Geometry.Point"]});
			this.controles["indiceGlobalControl"]=control;
			map.addControl(control);
			control.activate();
		*/
    },
    
    onOSMStoreLoad: function() {
    	console.log("OSM load");
        indices_style_map = new OpenLayers.StyleMap({"default": Ext.ux.RXUtils.estilo_indices("ind_global_rx_ayt_gijon")});		
		var barriosLayer = new OpenLayers.Layer.Vector("Barrios", {
	        styleMap: indices_style_map
	    });
	    var barrios=Ext.ux.RXUtils.parseaOSMtoGeoJson(Ext.getStore('OSMStore'));
	    var estaciones=Ext.ux.RXUtils.parseaGeoJson(Ext.getStore('Detalle_Estaciones'));
	    Ext.ux.RXUtils.indicesBarrio(barrios,estaciones);
		barriosLayer.addFeatures(barrios);
		
		var openlayermap=Ext.getCmp("openlayersmap");

		this.layers["barriosLayer"]=barriosLayer;
		
		var map =openlayermap.getMap();
		map.addLayer(barriosLayer);
		this.geolocaliza(map);
		openlayermap.fireEvent('render', openlayermap);
	}
	
});
