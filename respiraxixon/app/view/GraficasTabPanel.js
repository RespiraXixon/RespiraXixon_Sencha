/*
 * File: app/view/FicherosTabPanel.js
 *
 * This file was generated by Sencha Architect version 2.2.3.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('RespiraXixon.view.GraficasTabPanel', {
    extend: 'Ext.tab.Panel',
	xtype : 'graficastabpanel',
	requires: ['RespiraXixon.store.Contaminantes',"Ext.ux.RXUtils","Ext.chart.series.Gauge","Ext.chart.series.sprite.PieSlice"],
    config: {
        items: [
            {
                xtype: 'container',
                title: 'Gráficas',
                ui: '',
                layout: {
                    type: 'fit'
                },                
            	items: [
                    {
                        xtype: 'list',
                        id:"lista1",
                        ui: 'round',
                        itemTpl: [
                        	'<div>Estación: {estacion} - {titulo}',
                        	'<div>Indice Global RX Ayuntamiento Gijón: {ind_global_rx_ayt_gijon}		Indice Global RX Legal: {ind_global_rx_legal}		Indice Global RX OMS: {ind_global_rx_oms}</div>',
							'</div>'
                        ]                    
                	},
                	{
	                    xtype: 'spacefilling',
	                    flex: 1,
	                    insetPadding: 25,
	                    axes: [],
	                    series: [{
				        	type: 'gauge',
	                    	minimum: 0,
				        	maximum: 4,
					        value: 1/2,
					        donut: 30,
					        needle: true,
					        sectors: [
					        		 {
								         end: 1,
								         label: 'Muy Buena',
								         color: 'lime'
								     },
								     {
								         end: 2,
								         label: 'Buena',
								         color: 'limegreen',
								         style: { strokeStyle:'black', strokeOpacity:1, lineWidth:1 }
								     },
  								     {
								         end: 3,
								         label: 'Mala',
								         color: 'yellow',
								         style: { strokeStyle:'black', strokeOpacity:1, lineWidth:1 }
								     },
								     {
								         label: 'Muy Mala',
								         color: 'tomato'
								     }]
    					}]
                	}
                ]
            },
            {
                xtype: 'container',
                title: 'Datos',
                ui: '',
                layout: {
                    type: 'card'
                },
                items: [
                    {
                        xtype: 'list',
                        id:"lista2",
                        ui: 'round',
                        itemTpl: [
                        	'<div>Estación: {estacion} - {titulo}',
                        	'<div>Indice Global RX Ayuntamiento Gijón: {ind_global_rx_ayt_gijon}		Indice Global RX Legal: {ind_global_rx_legal}		Indice Global RX OMS: {ind_global_rx_oms}</div>',
                            '<div>Indice Ayuntamiento Gijón ----> CO: {calidad_ayt_gijon_co} NO: {calidad_ayt_gijon_no} O3: {calidad_ayt_gijon_o3} SO2: {calidad_ayt_gijon_o2} pm10: {calidad_ayt_gijon_pm10}</div>',
                            '<div>Indice Legal ----> CO: {calidad_legal_co} NO: {calidad_legal_no} O3: {calidad_legal_o3} SO2: {calidad_legal_o2} pm10: {calidad_legal_pm10}</div>',
							'<div>Indice OMS ----> CO: {calidad_oms_co} NO: {calidad_oms_no} O3: {calidad_oms_o3} SO2: {calidad_oms_o2} pm10: {calidad_oms_pm10}</div>',
							'</div>'
                        ]                    
                	}
                ]
            }
        ]
    },
	initialize: function()
	{
		/*
		var lista=Ext.getCmp("lista2");
		Ext.ux.RXUtils.calcula_medias();
		Ext.ux.RXUtils.calcula_indices();
		lista.setStore("Detalle_Estaciones");
		lista.refresh();
		this.callParent(arguments);
		*/
	}
});