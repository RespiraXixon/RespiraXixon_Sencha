Ext.define('RespiraXixon.view.Inicio', {
    extend: 'Ext.Panel',
	xtype: 'inicioView',
    config: {
        id: 'inicioView',
        layout: {
       				type: 'vbox',
       				align: 'center'
        },
        items: [
            {
                xtype: 'container',
                docked: 'top',
                height: '25%',
                id: 'cabecera',
                html:["<div>AHORA EN </div>"],
                flex: 1                
            },
            {
                xtype: 'container',
                height: '50%',
                id: 'cuerpo',
                layout: {
                			type:'vbox',
		          			align:'center'		          			
		                },
		        style: {
		        	"border-color": "white", 
					"border-width": "1px",
					"border-style": "solid",
					"border-radius": "5px"
		        },
                width: '75%',
                items: [
                	{
                		xtype: 'container',
                		layout: {
                			type:'hbox',
		          			align:'center'
		                },
                		id: 'riesgo',
                		html:["<div>RIESGO PARA LA SALUD</div>"],
                		items:[
                			{
                        		xtype: 'button',
		                        docked: 'bottom',
		                        height: '50%',
		                        id: 'riesgoIndicador'
                    		}
                		],
		                width: '60%',
		          		height: '100%'
            		}
                ],
                flex: 2                
            },
            {
                xtype: 'container',
                docked: 'bottom',
                height: '25%',
                id: 'pie',  
                layout: 'vbox',
                items: [
                	{
            			xtype: 'panel',
            			flex: 1,
            			html:"<div>&Iacute;NDICE GLOBAL</div>",
            			heigth:"40%"
        			},
                    {
                        xtype: 'image',
                        flex: 2,
                        docked: 'bottom',
                        id: 'imgpie',
                        src: 'resources/images/rx.png',
                        height:"60%"
                    }
                    
                ],
                flex: 3                
            }
        ]
    },
     initialize:function(){
    	this.fireEvent('inicializa', this);
    }
});