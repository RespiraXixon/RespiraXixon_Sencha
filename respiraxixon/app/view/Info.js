Ext.define('RespiraXixon.view.Info', {
    extend: 'Ext.Panel',
	xtype: 'infoView',
    config: {
        id: 'infoView',
        layout:{
        	type:"vbox",
        	pack:"center"
        },
        scrollable: true,
        items: [
        		{
        			xtype:'container',
        			id:'info1',
        			items:[
	                		{
	                			xtype: 'button',
	                    		text:"¿Que es Respira Xixón?",
	                    		id: 'button1info',
	                    		ui:'info',
	                    		handler: function() {
	                    			Ext.getCmp('panel1info').show();
	                    			Ext.getCmp('panel2info').hide();
	                    			Ext.getCmp('panel3info').hide();
	                    			Ext.getCmp('panel4info').hide();
	                    			Ext.getCmp('panel5info').hide();
	                			}
	
	                		},
	                		{
	                			xtype: 'panel',
	                			id:'panel1info',
	                			scrollable: true,
	                			hidden: true,
	                			height:'200px',
	                		    hideOnMaskTap: true,
	                			showAnimation: 
			                    {
			                        type: 'slideIn',
			                        duration: 1000,
			                        direction: 'left'
			                    },  
			                    /*hideAnimation: 
			                    {
			                        type: 'slideOut',
			                        duration: 1000,
			                        direction: 'up'
			                    },*/
			                    html: "<div>" +
			                    		"<p>Respira Xixón es un servicio de información personal de la calidad de aire de Gijón pensado y desarrollado por y para los ciudadanos de Gijón. Respira Xixón es el primer servicio ciudadano de información ambiental de Asturias.</p>" +
			                    		"<p>El proyecto RX tiene dos fases:	- Primero desarrollamos  esta aplicación que estás usando para informarte puntualmente del estado de la calidad de aire que respiramos en Gijón.	- A continuación vamos a promover el despliegue de una red de sensores ciudadanos de vigilancia de la calidad del aire en Gijón cuyos datos se publiquen en la aplicación, ampliando y complementando los datos actualmente disponibles.</p>"+
			                    		"<p>La App Respira Xixón es gratuita y siempre será gratuita, porque pensamos en los gijoneses. Además es multiplataforma para que la tecnología no sea una barrera.</p>"+
			                    		"<p>La App RX 1.0 distribuye los datos publicados por el Ayuntamiento de Gijón de su red de estaciones ambientales de medición. Estos datos son publicados por el Ayuntamiento de Gijón como opendata (datos abiertos).</p>"+
			                    		"</div>"
	                		}
                		]
        		},
        		{
        			xtype:'container',
        			id:'info2',
        			items:[
		                		{
		                			xtype: 'button',
		                			id: 'button2info',
		                			text:"Contribuye",
		                			ui:'info',
		                			handler: function() {        console.log("handler2");        
		                					Ext.getCmp('panel1info').hide();
	                    					Ext.getCmp('panel2info').show();
	                    					Ext.getCmp('panel3info').hide();
	                    					Ext.getCmp('panel4info').hide();
	                    					Ext.getCmp('panel5info').hide();
		                			}
		                		},
		                		{
		                			xtype: 'panel',
		                			id:'panel2info',
									scrollable: true,
		                			hidden: true,
		                		    hideOnMaskTap: true,
		                		    height:'200px',
		                			showAnimation: 
				                    {
				                        type: 'slideIn',
				                        duration: 1000,
				                        direction: 'left'
				                    },  
				                    /*hideAnimation: 
				                    {
				                        type: 'slideOut',
				                        duration: 1000,
				                        direction: 'up'
				                    },*/
				                    html: "<div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus libero ut mi porta tristique. Sed vel nulla metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris imperdiet lobortis sem at placerat. Phasellus vitae quam arcu, sit amet vehicula urna. Vivamus rutrum cursus tempor. Fusce ullamcorper dolor a dolor vestibulum vitae viverra purus sollicitudin. Cras elit augue, lacinia id placerat nec, eleifend eu justo. Aliquam pellentesque ante ut lacus pharetra facilisis. Praesent varius accumsan nibh imperdiet porta. Duis eget mauris urna. Sed dictum felis eu metus consectetur ultricies. Aliquam erat volutpat. Donec cursus mauris quis sapien luctus quis consectetur leo mattis. Etiam sed magna purus.</p><p>Maecenas adipiscing ligula in urna dignissim dapibus. Maecenas vehicula, nisi sit amet ultricies placerat, orci tellus euismod nisl, vehicula lacinia nulla lectus at magna. Sed id orci est. Phasellus eget ultrices mauris. Ut elementum semper facilisis. Cras fermentum, leo vel elementum ornare, mauris lorem vehicula elit, adipiscing mollis enim magna vel ipsum. Proin sagittis, sapien vitae dignissim sodales, metus turpis sodales lacus, eget scelerisque nunc magna auctor tortor. Sed sagittis mi sit amet risus pretium vulputate vel eget sapien.</p></div>"}
				                ]
				        },
		                {
		        			xtype:'container',
		        			id:'info3',
		        			items:[
			                		{
			                			xtype: 'button',
			                			id: 'button3info',
			                			text:"Red de sensores",
			                			ui:'info',
			                			handler: function() {                
			                				Ext.getCmp('panel1info').hide();
	                    					Ext.getCmp('panel2info').hide();
	                    					Ext.getCmp('panel3info').show();
	                    					Ext.getCmp('panel4info').hide();
	                    					Ext.getCmp('panel5info').hide();
			                			}
			                		},
			                		{
			                			xtype: 'panel',
			                			id:'panel3info',
										scrollable: true,
			                			hidden: true,
			                			height:'200px',
			                		    hideOnMaskTap: true,
			                			showAnimation: 
					                    {
					                        type: 'slideIn',
					                        duration: 1000,
					                        direction: 'left'
					                    },  
					                    /*hideAnimation: 
					                    {
					                        type: 'slideOut',
					                        duration: 1000,
					                        direction: 'up'
					                    },*/
					                    html: "<div><p>¿Cuántos puntos de medición hay en Gijón? ¿Están bien ubicados? ¿Son suficientes? ¿Son fiables? ¿Nos cuentan siempre la verdad? Estas cuestiones surgen cuando pensamos en que respiramos a diario. Pero… ¿y si los ciudadanos tuviéramos el poder de tomar nuestros propios datos?</p>"+
					                    	"<p>La red ciudadana de sensores es un punto clave de nuestro proyecto.</p>"+
					                    	"<p>Nuestra visión es un Gijón en el que existe una amplia red de sensores ciudadanos “Nariz” en manos de los ciudadanos porque los gijoneses, implicados y conscientes del problema de la calidad del aire que respiran, participan comprando e instalando esas Narices,  de bajo coste, asequibles para el ciudadano medio, con conectividad WiFi yo      con tecnología abierta y sencilla de usar y comprender.</p>"+
					                    	"<p>Y guiados por esa visión estamos trabajando para hacer de Gijón una “ciudad inteligente”.</p>"+
					                    	"<p>En el futuro, cuando esté desplegada la red de sensores “Nariz”, diseminada por la ciudad y descentralizada en manos de los ciudadanos, será la fuente primaria de las aplicaciones RX y un elemento de control ciudadano fundamental en materia de salud ambiental</p>"+
					                    	"</div>"
			                		}
			                		
 

 
 

 


			                ]
		                },
		                {
		        			xtype:'container',
		        			id:'info4',
					        			items:[
					                		{
					                			xtype: 'button',
					                			id: 'button4info',
					                			text:"Salud ambiental",
					                			ui:'info',
					                			handler: function() {                
					                				Ext.getCmp('panel1info').hide();
			                    					Ext.getCmp('panel2info').hide();
			                    					Ext.getCmp('panel3info').hide();
			                    					Ext.getCmp('panel4info').show();
			                    					Ext.getCmp('panel5info').hide();
					                			}
					                		},
					                		{
					                			xtype: 'panel',
					                			id:'panel4info',
					                			scrollable: true,
					                			hidden: true,
					                			height:'200px',
					                		    hideOnMaskTap: true,
					                			showAnimation: 
							                    {
							                        type: 'slideIn',
							                        duration: 1000,
							                        direction: 'left'
							                    },  
							                    /*hideAnimation: 
							                    {
							                        type: 'slideOut',
							                        duration: 1000,
							                        direction: 'up'
							                    },*/
							                    html: "<div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus libero ut mi porta tristique. Sed vel nulla metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris imperdiet lobortis sem at placerat. Phasellus vitae quam arcu, sit amet vehicula urna. Vivamus rutrum cursus tempor. Fusce ullamcorper dolor a dolor vestibulum vitae viverra purus sollicitudin. Cras elit augue, lacinia id placerat nec, eleifend eu justo. Aliquam pellentesque ante ut lacus pharetra facilisis. Praesent varius accumsan nibh imperdiet porta. Duis eget mauris urna. Sed dictum felis eu metus consectetur ultricies. Aliquam erat volutpat. Donec cursus mauris quis sapien luctus quis consectetur leo mattis. Etiam sed magna purus.</p><p>Maecenas adipiscing ligula in urna dignissim dapibus. Maecenas vehicula, nisi sit amet ultricies placerat, orci tellus euismod nisl, vehicula lacinia nulla lectus at magna. Sed id orci est. Phasellus eget ultrices mauris. Ut elementum semper facilisis. Cras fermentum, leo vel elementum ornare, mauris lorem vehicula elit, adipiscing mollis enim magna vel ipsum. Proin sagittis, sapien vitae dignissim sodales, metus turpis sodales lacus, eget scelerisque nunc magna auctor tortor. Sed sagittis mi sit amet risus pretium vulputate vel eget sapien.</p></div>"
					                		}
					                ]
					    },
                		{
		        			xtype:'container',
		        			id:'info5',
		        			items:[
					                		{
					                			xtype: 'button',
					                			id: 'button5info',
					                			text:"Comparte",
					                			ui:'info',
					                			handler: function() {                
						                			Ext.getCmp('panel1info').hide();
			                    					Ext.getCmp('panel2info').hide();
			                    					Ext.getCmp('panel3info').hide();
			                    					Ext.getCmp('panel4info').hide();
			                    					Ext.getCmp('panel5info').show();
					                			}
					                		},{
					                			xtype: 'panel',
					                			id:'panel5info',
					                			scrollable: true,
					                			hidden: true,
					                			height:'200px',
					                		    hideOnMaskTap: true,
					                			showAnimation: 
							                    {
							                        type: 'slideIn',
							                        duration: 1000,
							                        direction: 'left'
							                    },  
							                    /*hideAnimation: 
							                    {
							                        type: 'slideOut',
							                        duration: 1000,
							                        direction: 'up'
							                    },*/
							                    html: "<div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus libero ut mi porta tristique. Sed vel nulla metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris imperdiet lobortis sem at placerat. Phasellus vitae quam arcu, sit amet vehicula urna. Vivamus rutrum cursus tempor. Fusce ullamcorper dolor a dolor vestibulum vitae viverra purus sollicitudin. Cras elit augue, lacinia id placerat nec, eleifend eu justo. Aliquam pellentesque ante ut lacus pharetra facilisis. Praesent varius accumsan nibh imperdiet porta. Duis eget mauris urna. Sed dictum felis eu metus consectetur ultricies. Aliquam erat volutpat. Donec cursus mauris quis sapien luctus quis consectetur leo mattis. Etiam sed magna purus.</p><p>Maecenas adipiscing ligula in urna dignissim dapibus. Maecenas vehicula, nisi sit amet ultricies placerat, orci tellus euismod nisl, vehicula lacinia nulla lectus at magna. Sed id orci est. Phasellus eget ultrices mauris. Ut elementum semper facilisis. Cras fermentum, leo vel elementum ornare, mauris lorem vehicula elit, adipiscing mollis enim magna vel ipsum. Proin sagittis, sapien vitae dignissim sodales, metus turpis sodales lacus, eget scelerisque nunc magna auctor tortor. Sed sagittis mi sit amet risus pretium vulputate vel eget sapien.</p></div>"
					                			}
		                			]
		                }
                	]
      }      
});