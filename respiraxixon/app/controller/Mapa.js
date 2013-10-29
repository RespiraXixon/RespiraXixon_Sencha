Ext.define('RespiraXixon.controller.Mapa', {
    extend: 'Ext.app.Controller',
    
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
        this.control({
            'openlayersmap': {
                'beforerender': this.onMapRender
            }
        }, this);
    },

    onMapRender: function(mapPanel, options) {
        var me = this;
        //Creo la capa de vector
    	var vector = new OpenLayers.Layer.Vector("Vector Layer", {});

	    var estacionesLayer = new OpenLayers.Layer.Vector("Estaciones", {
	        styleMap: new OpenLayers.StyleMap({
	            externalGraphic: "src/OpenLayers/img/marker.png",
	            graphicOpacity: 1.0,
	            graphicWidth: 16,
	            graphicHeight: 26,
	            graphicYOffset: -26
	        })
	    });
		estacionesLayer.addFeatures(this.parseaGeoJson(Ext.getStore('Estaciones')));
	    
	    var indiceGlobalLayer = new OpenLayers.Layer.Vector("Indice RX Global", {
	        styleMap: new OpenLayers.StyleMap({
	            externalGraphic: "src/Openlayers/img/marker.png",
	            graphicOpacity: 1.0,
	            graphicWidth: 16,
	            graphicHeight: 26,
	            graphicYOffset: -26
	        })
	    });
		this.calcula_medias();
		this.calcula_indices();
		console.log(this.parseaGeoJson(Ext.getStore('Detalle_Estaciones')));
		indiceGlobalLayer.addFeatures(this.parseaGeoJson(Ext.getStore('Detalle_Estaciones')));
        
		//Inicializamos las capas que queremos poner en el mapa

        var layers = [
	            estacionesLayer,
	            indiceGlobalLayer
        ];
        //Creamos el layer de control
        var control = new OpenLayers.Control.SelectFeature(estacionesLayer, {
	        autoActivate:true});
        var controles = [
        				new OpenLayers.Control.LayerSwitcher(),
            			new OpenLayers.Control.Attribution(),
            			new OpenLayers.Control.TouchNavigation({
                			dragPanOptions: {
                    			enableKinetic: true
                			}
            			}),
            			control
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
        

//this.parseaGeoJson(Ext.getStore('Contaminantes'));

		var map = mapPanel.getMap();
        //var style = new OpenLayers.Style(template, {context: context});
        map.addLayers(layers);
        map.addControls(controles);
        
    },

    onLaunch: function() {
        var me = this;

        // for dev purpose
        ctrl = this;
    },
    parseaGeoJson:function(store){
    	var features =[];
    	var projorig = new OpenLayers.Projection("EPSG:4326");
    	var projdest = new OpenLayers.Projection("EPSG:3857");
		store.each(function(record){
			var datos = record.getData();
			var punto = new OpenLayers.LonLat(datos.longitud,datos.latitud).transform(projorig, projdest);
			var geometry = {
				"type":"point",
				"coordinates":[punto.lon,punto.lat]
			};
			var feature={
				"type":"Feature",
				"geometry": geometry,
				"properties":datos
			}
			features.push(feature);
		});
		var featuresCollection={
			"type":"FeatureCollection",
			"features":features
		};
		var reader= new OpenLayers.Format.GeoJSON();
		return reader.read(featuresCollection);
    },
    calcula_indices: function(){
    	var organizacion="";
        var cont;
        Ext.getStore('Indices').each(function( indices ){
        	var indice=indices.getData();
        	organizacion=indice.organizacion;
        	cont=indice.contaminante;
    		var min = indice.min;
        	var max = indice.max;
        	Ext.getStore('Detalle_Estaciones').each(function( estaciones ){
        		estacion=estaciones.getData();
       			if (estacion[cont+"_med_24"]>min &&(estacion[cont+"_med_24"]<max||max==="Infinito")){
       						estaciones.set("calidad_"+organizacion+"_"+cont,indice["calidad"]);
                            if (estacion["ind_global_rx_"+organizacion]<indice["ind_calidad"]){
                            	estaciones.set("ind_global_rx_"+organizacion,indice["ind_calidad"]);
                            }            	
                };
        	});	
        });
    },
    calcula_medias: function (){
    	//TODO:sustituir con fecha y hora actuales cuando pase a produccion
		var fecha_actual=new Date("2013-10-16T09:00:00");

    	var indices;
    	var CO_sum_8=0.0,CO_sum_24=0.0,CO_num_8=0,CO_num_24=0;
    	var SO2_sum_8=0.0,SO2_sum_24=0.0,SO2_num_8=0,SO2_num_24=0;
    	var Pm10_sum_8=0.0,Pm10_sum_24=0.0,Pm10_num_8=0,Pm10_num_24=0;
    	var NO_sum_8=0.0,NO_sum_24=0.0,NO_num_8=0,NO_num_24=0;
    	var O3_sum_8=0.0,O3_sum_24=0.0,O3_num_8=0,O3_num_24=0;
    
    
    	var registro=null;
    	var CO_med,SO2_med,Pm10_med,NO_med,O3_med=0;
    	var i=0;
    	Ext.getStore('Contaminantes').each(function(record) {
    		var datos = record.getData();
            if (!indices){ 
                registro=datos;
                indices=[];
            }else{
                if ((datos.estacion!==registro.estacion)){
                    registro['co_med_8']= CO_sum_8/CO_num_8;
                    registro['co_med_24']= CO_sum_24/CO_num_24;
                    registro['so2_med_8']= SO2_sum_8/SO2_num_8;
                    registro['so2_med_24']= SO2_sum_24/SO2_num_24;
                    registro['pm10_med_8']= Pm10_sum_8/Pm10_num_8;
                    registro['pm10_med_24']= Pm10_sum_24/Pm10_num_24;
                    registro['no_med_8']= NO_sum_8/NO_num_8;
                    registro['no_med_24']= NO_sum_24/NO_num_24;
                    registro['o3_med_8']= O3_sum_8/O3_num_8;
                    registro['o3_med_24']= O3_sum_24/O3_num_24;
                    registro['ind_global_rx_ayt_gijon']=0;
                    registro['ind_global_rx_legal']=0;
                    registro['ind_global_rx_oms']=0;
                    indices.push(registro);
                    CO_sum_8=0.0,CO_sum_24=0.0,CO_num_8=0,CO_num_24=0;
                    SO2_sum_8=0.0,SO2_sum_24=0.0,SO2_num_8=0,SO2_num_24=0;
                    Pm10_sum_8=0.0,Pm10_sum_24=0.0,Pm10_num_8=0,Pm10_num_24=0;
                    NO_sum_8=0.0,NO_sum_24=0.0,NO_num_8=0,NO_num_24=0;
                    O3_sum_8=0.0,O3_sum_24=0.0,O3_num_8=0,O3_num_24=0;
                    registro=datos;
                }
            };
            
                    fecha= new Date(datos.fechasolar_utc_);
                    horas = (Math.abs(fecha_actual-fecha)/(1000*60*60));
					
                    if (horas<24){
                        CO_sum_24+= parseFloat(datos.co);
                        CO_num_24++;
                        SO2_sum_24+= parseFloat(datos.so2);
                        SO2_num_24++;
                        Pm10_sum_24+= parseFloat(datos.pm10);
                        Pm10_num_24++;
                        NO_sum_24+= parseFloat(datos.no);
                        NO_num_24++;
                        O3_sum_24+= parseFloat(datos.o3);
                        O3_num_24++;
                    };
                    if (horas<8){
                        CO_sum_8+=  parseFloat(datos.co);
                        CO_num_8++;
                        SO2_sum_8+=  parseFloat(datos.so2);
                        SO2_num_8++;
                        Pm10_sum_8+=  parseFloat(datos.pm10);
                        Pm10_num_8++;
                        NO_sum_8+=  parseFloat(datos.no);
                        NO_num_8++;
                        O3_sum_8+=  parseFloat(datos.o3);
                        O3_num_8++;
                        };
		             i++;
					if (i==Ext.getStore('Contaminantes').getCount()){
		             	registro['co_med_8']= CO_sum_8/CO_num_8;
	                    registro['co_med_24']= CO_sum_24/CO_num_24;
	                    registro['so2_med_8']= SO2_sum_8/SO2_num_8;
	                    registro['so2_med_24']= SO2_sum_24/SO2_num_24;
	                    registro['pm10_med_8']= Pm10_sum_8/Pm10_num_8;
	                    registro['pm10_med_24']= Pm10_sum_24/Pm10_num_24;
	                    registro['no_med_8']= NO_sum_8/NO_num_8;
	                    registro['no_med_24']= NO_sum_24/NO_num_24;
	                    registro['o3_med_8']= O3_sum_8/O3_num_8;
	                    registro['o3_med_24']= O3_sum_24/O3_num_24;
	                    registro['ind_global_rx_ayt_gijon']=0;
	                    registro['ind_global_rx_legal']=0;
	                    registro['ind_global_rx_oms']=0;
	                    indices.push(registro);
		             };
    });
    var store = Ext.create('Ext.data.Store', {
  			model: 'RespiraXixon.model.Detalle_Estacion',
  			data: indices
	});
	Ext.regStore("Detalle_Estaciones",store);
}
});
