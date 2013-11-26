Ext.define('RespiraXixon.view.Inicio', {
    extend: 'Ext.Panel',
	xtype: 'inicioView',
    config: {
        id: 'inicioView',
        layout: {
       				type: 'vbox',
       				align: 'center',
       				pack:'center'
        },
        items: [
            {
                xtype: 'container',
                cls: 'cabecera',
                id: 'cabecera',
                height:'15%',
                html:["<div>AHORA EN </div>"]
            },
            {
                xtype: 'container',
                cls: 'contenido',
                id: 'cuerpo',
                width: '80%',
                height:'50%',
                layout: {
       				type: 'vbox',
       				align: 'center',
       				pack:'center'
        		},
                items: [
                	{
                		xtype: 'container',
                		id: 'riesgo',
                		html:["<div>EL RIESGO PARA TU SALUD ES</div>"],
                		items:[
                			{
                        		xtype: 'button',
		                        docked: 'bottom',
		                        height: '60%',
		                        id: 'riesgoIndicador'
                    		}
                		],
		                width: '90%',
		          		height: '100%'
            		}
                ]                
            },
            {
                xtype: 'container',
                id: 'pie',
                cls:'pie',
                height:'15%',
                items: [
                	{
            			xtype: 'panel',
            			id: 'pie_html',
            			html:"<div>SEG&Uacute;N EL &Iacute;NDICE RX GLOBAL</div>" 
        			},
                    {
                        xtype: 'image',
                        height:'60%',
                        id: 'imgpie',
                        src: 'resources/images/rx.png'
                    }
                    
                ]                
            }
        ]
    },
     initialize:function(){
    	this.fireEvent('inicializa', this);
   		//TODO SImulamos la fecha actual de la ultima medida
    	var d = new Date();
    	d.setMilliseconds(d.getMilliseconds()-3600000);
    	var pie_html=Ext.getCmp("pie_html");
		pie_html.setHtml(pie_html.getHtml()+"<div class='actualizacion'>Ultima Actualización: "+d.toLocaleDateString()+" "+d.toLocaleTimeString() +"</div>");
    }
});