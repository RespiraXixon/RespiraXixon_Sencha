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
            openLayersMap: '#openlayersmap',
            inicioView:'#iniciotab'
        },
        control: {
        	openLayersMap: {
				maprender: 'onMapRender'
				//render: 'onMapRender'
			},
			inicioView:{
				inicializa:'geolocaliza'
			}
			
        }
    },

    init: function() {
    	var me = this;
    },

    onMapRender: function(mapPanel) {
    	console.log("render");
    	var map = this.map=mapPanel.getMap();

    	var me = this;
		
        //Añadimos el layer de los barrios
		map.addLayer(this.layers["barriosLayer"]);
		
		//Añadimos el layer con los datos de las estaciones
		map.addLayer(this.layers["indiceGlobalLayer"]);

		//Añadimos el layer de la localización
		map.addLayer(this.layers["geolocalizacion"]);
		
		//Añadimos el control de geolocalización
		map.addControl(this.controles["geolocalizacionControl"]);
		        
        //Creamos el layer de control
        
		var controles = [
	        				//new OpenLayers.Control.LayerSwitcher(),
	            			new OpenLayers.Control.Attribution(),
	            			new OpenLayers.Control.TouchNavigation({
	                			dragPanOptions: {
	                    			enableKinetic: true
	                			}
	            			})
        ];
        
        map.addControls(controles);

        if (this.layers["indiceGlobalLayer"]&&this.layers["geolocalizacion"]){
        		var control = new OpenLayers.Control.SelectFeature([this.layers["barriosLayer"],/*this.layers["indiceGlobalLayer"],*/this.layers["geolocalizacion"]]);
				map.addControl(control);
				control.activate();
				this.controles["geolocalizacionControl"].activate();
        }
    },

    launch: function() {
        var me = this;
        
        var contaminantes = Ext.getStore('Contaminantes');
            contaminantes.on({
                load: 'onContaminantesLoad',
                scope: this
            });
        //contaminantes.load();
   		var OSMStore = Ext.getStore('OSMStore');
            OSMStore.on({
                load: 'onOSMStoreLoad',
                scope: this
            });
        
        // for dev purpose
        ctrl = this;
    },
    
	geolocaliza: function(){
		console.log("geolocaliza");
		//Creo la capa de geolocalizacion
    	var vector = new OpenLayers.Layer.Vector("Geolocalizacion", {});
    	        
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
            			this.map.addPopup(popup);
                },
                "featureunselected": function(e) {
                	   	feature=e.feature;
            			this.map.removePopup(feature.popup);
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
		        var estacion=Ext.ux.RXUtils.distancia_estacion(this.layers["indiceGlobalLayer"],punto);
		        punto.data=estacion.estacion.data;
		        punto.attributes={
		        					"distancia":estacion.distancia,
		        					"estacion":estacion.estacion
		        				};
		        
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
		        vector.addFeatures(punto);
    	});
		
		this.layers["geolocalizacion"]=vector;
				
		this.controles["geolocalizacionControl"]= geolocate;
		
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
		/*TODO:Activar para ver las estaciones
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
            			this.map.addPopup(popup);
                },
                "featureunselected": function(e) {
                	   	feature=e.feature;
            			this.map.removePopup(feature.popup);
            			feature.popup.destroy();
            			feature.popup = null;
                }
            });*/
		this.layers["indiceGlobalLayer"]=indiceGlobalLayer;
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
		
		barriosLayer.events.on({
                "featureselected": function(e) {
                		feature=e.feature;
            			selectedFeature = feature;
            			var html="<div style='font-size:.8em'>";
            			/* Muestra todos los datos del barrio en el pop-up
            			for(var key in feature.attributes) {
								html=html + key + ": "+feature.attributes[key]+"<br>";
						};*/
            			html = html + "Distrito: " + feature.attributes["display_name"] +"<br>";
            			html = html + "Estaci&oacute;n: " + feature.attributes["titulo"] +"<br>";
            			html = html + "Latitud: " + feature.attributes["estacion_lat"] +"<br>";
            			html = html + "Longitud: " + feature.attributes["estacion_long"] +"<br>";
            			html = html + "Indice Ayuntamiento: " + feature.attributes["ind_global_rx_ayt_gijon"] +"<br>";
            			html = html + "Indice Legal: " + feature.attributes["ind_global_rx_legal"] +"<br>";
            			html = html + "Indice OMS: " + feature.attributes["ind_global_rx_oms"] +"<br>";
            			html = html + "Indice Global RX: " + 
            					Math.max(feature.attributes["ind_global_rx_ayt_gijon"],feature.attributes["ind_global_rx_legal"],feature.attributes["ind_global_rx_oms"]);  
            			html=html+"</div>";
            			popup = new OpenLayers.Popup.FramedCloud("chicken", 
                                     feature.geometry.getBounds().getCenterLonLat(),
                                     null,
                                     html.toString(),
                                     null, true);
            			feature.popup = popup;
            			this.map.addPopup(popup);
                },
                "featureunselected": function(e) {
                	   	feature=e.feature;
            			this.map.removePopup(feature.popup);
            			feature.popup.destroy();
            			feature.popup = null;
                }
            });

		this.layers["barriosLayer"]=barriosLayer;
		//Incluyo el distrito en el que está
		var geo = Ext.create('Ext.util.Geolocation', {
    					autoUpdate: false
    	});
    	
        geo.on({
            locationupdate: 'onLocationUpdate',
            locationerror: 'onLocationError',
            scope: this
        });
        
		geo.updateLocation();
	},
	
	onLocationUpdate: function(geo) {
		
		var distrito=Ext.ux.RXUtils.distrito(this.layers["barriosLayer"],geo);
		
		var cabecera=Ext.getCmp("cabecera");
		cabecera.setHtml(cabecera.getHtml()+"<div class='distrito'>"+distrito["nombre"]+"</div>");
		
		var riesgo=Ext.ux.RXUtils.botonRiesgo(distrito["ind_global_rx"]);
		var boton_riesgo=Ext.getCmp("riesgoIndicador");
   		boton_riesgo.setText(riesgo["text"]);
   		boton_riesgo.setUi(riesgo["ui"]);
	},
	
	onLocationError:function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
					            if(bTimeout){
					                alert('Error de TimeOut.');
					            } else {
					            	var cabecera=Ext.getCmp("cabecera");
									cabecera.setHtml(cabecera.getHtml()+"<div class='distrito'>DESCONOCIDO</div>");
									var boton_riesgo=Ext.getCmp("riesgoIndicador");
   									boton_riesgo.setText("DESCONOCIDO");
					                alert('La ubicación es desconocida.');
					            }
   }
	
});
