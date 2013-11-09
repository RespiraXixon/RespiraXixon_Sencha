Ext.define('Ext.ux.RXUtils', {
    requires: [
    ],

    alias: 'plugin.rxutils',
	singleton	: true,
    config: {
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    init: function (component) {
    },

    hoge: function(){
    },
	
	consola: function(mensaje){
		console.log(mensaje);
	},
		
	distancia_estacion: function (map,layer,origen){
	                origenPoint = origen.geometry;
	                var distancia;
	                var i=0;
					var estacion;
	                for (var key in layer.features) {
	                	if (!distancia){
	                		distancia=origenPoint.distanceTo(layer.features[key].geometry);
	                		estacion=layer.features[key];
	                	}else{
	                		var distancia_aux =origenPoint.distanceTo(layer.features[key].geometry);
	                		if(distancia_aux<distancia){
	                			distancia=distancia_aux;
	                			estacion=layer.features[key];
	                		}
	                	}
	                    i++;
	                }
	                
	                return ({"distancia": distancia,"estacion": estacion});
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
			};
			features.push(feature);
		});
		var featuresCollection={
			"type":"FeatureCollection",
			"features":features
		};
		var reader= new OpenLayers.Format.GeoJSON();
		return reader.read(featuresCollection);
    },
	parseaOSMtoGeoJson:function(store){
    	var features =[];
    	var projorig = new OpenLayers.Projection("EPSG:4326");
    	var projdest = new OpenLayers.Projection("EPSG:3857");
		store.each(function(record){
			var datos = record.getData();
			var feature={
				"type":"Feature",
				"geometry": datos.geojson,
				"properties":datos
			};
			features.push(feature);
		});
		var featuresCollection={
			"type":"FeatureCollection",
			"features":features
		};
		var reader= new OpenLayers.Format.GeoJSON();
		var aux=reader.read(featuresCollection);
		for(var i=0; i < aux.length; i++){
			aux[i].geometry=aux[i].geometry.transform(projorig,projdest);
		};
		return aux;
    },
    indicesBarrio: function(barrios,estaciones){
		  for(var i=0; i < barrios.length; i++){
    	  	var distancia=null;
    	  	var estacion=null;
		  	for(var j=0; j < estaciones.length; j++){
		  		var centro=barrios[i].geometry.getCentroid();
		  		var distancia_aux =centro.distanceTo(estaciones[j].geometry);
		  		if (!distancia){
	                distancia=distancia_aux;
	                estacion= estaciones[j];
            	}else{
            		if(distancia_aux<distancia){
            			distancia=distancia_aux;
            			estacion= estaciones[j];
            		}
            	};
		  	};
		  	barrios[i].attributes["ind_global_rx_ayt_gijon"]=estacion.attributes["ind_global_rx_ayt_gijon"];
		  	barrios[i].attributes["ind_global_rx_legal"]=estacion.attributes["ind_global_rx_legal"];
		  	barrios[i].attributes["ind_global_rx_oms"]=estacion.attributes["ind_global_rx_oms"];
		};
    },
    estilo_indices:function(indicador){
    	var estilo_barrios = new OpenLayers.Style({
	        strokeColor: 'black',
	        strokeOpacity: 0.6
        });

		var indice0 = new OpenLayers.Rule({
		  filter: new OpenLayers.Filter.Comparison({
		      type: OpenLayers.Filter.Comparison.EQUAL_TO,
		      property: indicador,
		      value: 0
		  }),
		  symbolizer: {
	         			fillColor : "blue",	
                       	fillOpacity : 0.4
	        		  }
		});

		var indice1 = new OpenLayers.Rule({
		  filter: new OpenLayers.Filter.Comparison({
		      type: OpenLayers.Filter.Comparison.EQUAL_TO,
		      property: indicador,
		      value: 1
		  }),
		  symbolizer: {
	         			fillColor : "lime",	
                       	fillOpacity : 0.4
	        		  }
		});
		var indice2 = new OpenLayers.Rule({
		  filter: new OpenLayers.Filter.Comparison({
		      type: OpenLayers.Filter.Comparison.EQUAL_TO,
		      property: indicador,
		      value: 2
		  }),
		  symbolizer: {
	         			fillColor : "yellow",	
                       	fillOpacity : 0.4
	        		  }
		});
		
		var indice3 = new OpenLayers.Rule({
		  filter: new OpenLayers.Filter.Comparison({
		      type: OpenLayers.Filter.Comparison.EQUAL_TO,
		      property: indicador,
		      value: 3
		  }),
		  symbolizer: {
	         			fillColor : "red",	
                       	fillOpacity : 0.4
	        		  }
		});
		
		estilo_barrios.addRules([indice0,indice1,indice2,indice3]);
		return(estilo_barrios);
    }
});