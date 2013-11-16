Ext.define('RespiraXixon.view.Info', {
    extend: 'Ext.Panel',
	xtype: 'infoView',
    config: {
        id: 'infoView',
        scrollable: true,
        items: [
                		{
                			xtype: 'button',
                    		text:"¿Que es Respira Xixón?",
                    		id: 'button1info',
                    		ui:'info',
                    		handler: function() {console.log("handler1");
                    			Ext.getCmp('panel1info').show();
                			}

                		},
                		{
                			xtype: 'panel',
                			id:'panel1info',
                			scrollable: true,
                			hidden: true,
                			heigth:'50%',
                		    hideOnMaskTap: true,
                		    style:{
                		    	'font-size':'10px'
                		    },
                			showAnimation: 
		                    {
		                        type: 'slideIn',
		                        duration: 1000,
		                        direction: 'down'
		                    },  
		                    hideAnimation: 
		                    {
		                        type: 'slideOut',
		                        duration: 1000,
		                        direction: 'up'
		                    },
		                    html: "<div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus libero ut mi porta tristique. Sed vel nulla metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris imperdiet lobortis sem at placerat. Phasellus vitae quam arcu, sit amet vehicula urna. Vivamus rutrum cursus tempor. Fusce ullamcorper dolor a dolor vestibulum vitae viverra purus sollicitudin. Cras elit augue, lacinia id placerat nec, eleifend eu justo. Aliquam pellentesque ante ut lacus pharetra facilisis. Praesent varius accumsan nibh imperdiet porta. Duis eget mauris urna. Sed dictum felis eu metus consectetur ultricies. Aliquam erat volutpat. Donec cursus mauris quis sapien luctus quis consectetur leo mattis. Etiam sed magna purus.</p><p>Maecenas adipiscing ligula in urna dignissim dapibus. Maecenas vehicula, nisi sit amet ultricies placerat, orci tellus euismod nisl, vehicula lacinia nulla lectus at magna. Sed id orci est. Phasellus eget ultrices mauris. Ut elementum semper facilisis. Cras fermentum, leo vel elementum ornare, mauris lorem vehicula elit, adipiscing mollis enim magna vel ipsum. Proin sagittis, sapien vitae dignissim sodales, metus turpis sodales lacus, eget scelerisque nunc magna auctor tortor. Sed sagittis mi sit amet risus pretium vulputate vel eget sapien.</p></div>"
                		},
                		{
                			xtype: 'button',
                			id: 'button2info',
                			text:"Contribuye",
                			ui:'info',
                			handler: function() {        console.log("handler2");        
                					Ext.getCmp('panel2info').show();
                			}
                		},
                		{
                			xtype: 'panel',
                			id:'panel2info',
							scrollable: true,
                			hidden: true,
                			heigth:'50%',
                		    hideOnMaskTap: true,
                		    style:{
                		    	'font-size':'10px'
                		    },
                			showAnimation: 
		                    {
		                        type: 'slideIn',
		                        duration: 1000,
		                        direction: 'down'
		                    },  
		                    hideAnimation: 
		                    {
		                        type: 'slideOut',
		                        duration: 1000,
		                        direction: 'up'
		                    },
		                    html: "<div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus libero ut mi porta tristique. Sed vel nulla metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris imperdiet lobortis sem at placerat. Phasellus vitae quam arcu, sit amet vehicula urna. Vivamus rutrum cursus tempor. Fusce ullamcorper dolor a dolor vestibulum vitae viverra purus sollicitudin. Cras elit augue, lacinia id placerat nec, eleifend eu justo. Aliquam pellentesque ante ut lacus pharetra facilisis. Praesent varius accumsan nibh imperdiet porta. Duis eget mauris urna. Sed dictum felis eu metus consectetur ultricies. Aliquam erat volutpat. Donec cursus mauris quis sapien luctus quis consectetur leo mattis. Etiam sed magna purus.</p><p>Maecenas adipiscing ligula in urna dignissim dapibus. Maecenas vehicula, nisi sit amet ultricies placerat, orci tellus euismod nisl, vehicula lacinia nulla lectus at magna. Sed id orci est. Phasellus eget ultrices mauris. Ut elementum semper facilisis. Cras fermentum, leo vel elementum ornare, mauris lorem vehicula elit, adipiscing mollis enim magna vel ipsum. Proin sagittis, sapien vitae dignissim sodales, metus turpis sodales lacus, eget scelerisque nunc magna auctor tortor. Sed sagittis mi sit amet risus pretium vulputate vel eget sapien.</p></div>"                		},
                		{
                			xtype: 'button',
                			id: 'button3info',
                			text:"Red de sensores",
                			ui:'info',
                			handler: function() {                
                				Ext.getCmp('panel3info').show();
                			}
                		},
                		{
                			xtype: 'panel',
                			id:'panel3info',
							scrollable: true,
                			hidden: true,
                			heigth:'50%',
                		    hideOnMaskTap: true,
                		    style:{
                		    	'font-size':'10px'
                		    },
                			showAnimation: 
		                    {
		                        type: 'slideIn',
		                        duration: 1000,
		                        direction: 'down'
		                    },  
		                    hideAnimation: 
		                    {
		                        type: 'slideOut',
		                        duration: 1000,
		                        direction: 'up'
		                    },
		                    html: "<div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus libero ut mi porta tristique. Sed vel nulla metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris imperdiet lobortis sem at placerat. Phasellus vitae quam arcu, sit amet vehicula urna. Vivamus rutrum cursus tempor. Fusce ullamcorper dolor a dolor vestibulum vitae viverra purus sollicitudin. Cras elit augue, lacinia id placerat nec, eleifend eu justo. Aliquam pellentesque ante ut lacus pharetra facilisis. Praesent varius accumsan nibh imperdiet porta. Duis eget mauris urna. Sed dictum felis eu metus consectetur ultricies. Aliquam erat volutpat. Donec cursus mauris quis sapien luctus quis consectetur leo mattis. Etiam sed magna purus.</p><p>Maecenas adipiscing ligula in urna dignissim dapibus. Maecenas vehicula, nisi sit amet ultricies placerat, orci tellus euismod nisl, vehicula lacinia nulla lectus at magna. Sed id orci est. Phasellus eget ultrices mauris. Ut elementum semper facilisis. Cras fermentum, leo vel elementum ornare, mauris lorem vehicula elit, adipiscing mollis enim magna vel ipsum. Proin sagittis, sapien vitae dignissim sodales, metus turpis sodales lacus, eget scelerisque nunc magna auctor tortor. Sed sagittis mi sit amet risus pretium vulputate vel eget sapien.</p></div>"
                		},
                		{
                			xtype: 'button',
                			id: 'button4info',
                			text:"Salud ambiental",
                			ui:'info',
                			handler: function() {                
                				Ext.getCmp('panel4info').show();
                			}
                		},
                		{
                			xtype: 'panel',
                			id:'panel4info',
                			scrollable: true,
                			hidden: true,
                			heigth:'50%',
                		    hideOnMaskTap: true,
                		    style:{
                		    	'font-size':'10px'
                		    },
                			showAnimation: 
		                    {
		                        type: 'slideIn',
		                        duration: 1000,
		                        direction: 'down'
		                    },  
		                    hideAnimation: 
		                    {
		                        type: 'slideOut',
		                        duration: 1000,
		                        direction: 'up'
		                    },
		                    html: "<div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus libero ut mi porta tristique. Sed vel nulla metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris imperdiet lobortis sem at placerat. Phasellus vitae quam arcu, sit amet vehicula urna. Vivamus rutrum cursus tempor. Fusce ullamcorper dolor a dolor vestibulum vitae viverra purus sollicitudin. Cras elit augue, lacinia id placerat nec, eleifend eu justo. Aliquam pellentesque ante ut lacus pharetra facilisis. Praesent varius accumsan nibh imperdiet porta. Duis eget mauris urna. Sed dictum felis eu metus consectetur ultricies. Aliquam erat volutpat. Donec cursus mauris quis sapien luctus quis consectetur leo mattis. Etiam sed magna purus.</p><p>Maecenas adipiscing ligula in urna dignissim dapibus. Maecenas vehicula, nisi sit amet ultricies placerat, orci tellus euismod nisl, vehicula lacinia nulla lectus at magna. Sed id orci est. Phasellus eget ultrices mauris. Ut elementum semper facilisis. Cras fermentum, leo vel elementum ornare, mauris lorem vehicula elit, adipiscing mollis enim magna vel ipsum. Proin sagittis, sapien vitae dignissim sodales, metus turpis sodales lacus, eget scelerisque nunc magna auctor tortor. Sed sagittis mi sit amet risus pretium vulputate vel eget sapien.</p></div>"
                		},
                		{
                			xtype: 'button',
                			id: 'button5info',
                			text:"Comparte",
                			ui:'info',
                			handler: function() {                
	                			Ext.getCmp('panel5info').show();
                			}
                		},{
                			xtype: 'panel',
                			id:'panel5info',
                			scrollable: true,
                			hidden: true,
                			heigth:'50%',
                		    hideOnMaskTap: true,
                		    style:{
                		    	'font-size':'10px'
                		    },
                			showAnimation: 
		                    {
		                        type: 'slideIn',
		                        duration: 1000,
		                        direction: 'down'
		                    },  
		                    hideAnimation: 
		                    {
		                        type: 'slideOut',
		                        duration: 1000,
		                        direction: 'up'
		                    },
		                    html: "<div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus libero ut mi porta tristique. Sed vel nulla metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris imperdiet lobortis sem at placerat. Phasellus vitae quam arcu, sit amet vehicula urna. Vivamus rutrum cursus tempor. Fusce ullamcorper dolor a dolor vestibulum vitae viverra purus sollicitudin. Cras elit augue, lacinia id placerat nec, eleifend eu justo. Aliquam pellentesque ante ut lacus pharetra facilisis. Praesent varius accumsan nibh imperdiet porta. Duis eget mauris urna. Sed dictum felis eu metus consectetur ultricies. Aliquam erat volutpat. Donec cursus mauris quis sapien luctus quis consectetur leo mattis. Etiam sed magna purus.</p><p>Maecenas adipiscing ligula in urna dignissim dapibus. Maecenas vehicula, nisi sit amet ultricies placerat, orci tellus euismod nisl, vehicula lacinia nulla lectus at magna. Sed id orci est. Phasellus eget ultrices mauris. Ut elementum semper facilisis. Cras fermentum, leo vel elementum ornare, mauris lorem vehicula elit, adipiscing mollis enim magna vel ipsum. Proin sagittis, sapien vitae dignissim sodales, metus turpis sodales lacus, eget scelerisque nunc magna auctor tortor. Sed sagittis mi sit amet risus pretium vulputate vel eget sapien.</p></div>"
                		}
                		
                	]
      }      
});