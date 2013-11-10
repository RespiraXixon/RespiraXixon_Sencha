
Ext.application({
    name: 'RespiraXixon',

    requires: [
        'Ext.MessageBox'
    ],
     models: [
        'Estacion',
        'Contaminante',
        'Indices',
        'Detalle_Estacion',
        'OSMModel'
    ],
    stores: [
        'Estaciones',
        'Contaminantes',
        'Indices',
        'OSMStore'
    ],
    views: [
        'InicioTabPanel'
    ],
    controllers :[
    	'Mapa'
    ],        
    
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        //Incializamos el path con las imagenes que usa OpenLayers
        
        OpenLayers.ImgPath = "src/OpenLayers/img/";
        OpenLayers.Lang.setCode('es');
        
        // Initialize the main view
        Ext.getStore("Estaciones").load();
		Ext.getStore("Indices").load();
		
		Ext.Viewport.add(Ext.create('RespiraXixon.view.InicioTabPanel', {fullscreen: true}));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Actualización de la aplicación",
            "Esta aplicación ha sido actualizada. Desea recargar ahora?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }    
});
