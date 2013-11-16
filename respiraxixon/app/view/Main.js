
Ext.define('RespiraXixon.view.Main', {
    extend: 'Ext.tab.Panel',
    requires: ["Ext.ux.OpenLayersMap","RespiraXixon.view.Inicio","Ext.ux.RXUtils"],
	
    config: {
        tabBar: {
            docked: 'bottom'
        },	
        items: [
        	{
                xtype:'inicioView',
                title: 'Inicio',
                iconCls: 'home',
                id: 'iniciotab',
                itemId: 'InicioTab',
		        style:{
		        	"text-align":"center"
		        } 
            },
            {
                xtype:'panel',
                title: 'Mapa',
                iconCls: 'maps',
                layout: 'fit',
                id: 'mapatab',
                itemId: 'InicioTab',
                layoutOnTabChange: true,
                items: [
                        {
                            // Ext.ux.OpenLayersMap Component
                            xtype: 'openlayersmap',
                            id: 'openlayersmap',
                            useCurrentLocation: false,
                            autoMapCenter: false,
                            mapOptions: {
                                zoom: 12,
                                center: {longitude:-5.6626443, latitude:43.5450394},
                                //TODO:Compilar hoja de estilos style.mobile.css
                                theme: 'src/OpenLayers/theme/default/style.mobile.css'
                        	}
                        }
             		]
            },
            {
                xtype: 'container',
                title: '+Info',
                layout: 'fit',
                iconCls: 'info',
                items:[
		                {
		                	xtype: 'infoView'		
		                }
                ]
            }
        ]
    }
});