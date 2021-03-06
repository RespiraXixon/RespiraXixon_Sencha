/*
 * File: app/model/Estacion.js
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

Ext.define('RespiraXixon.model.Estacion', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'id'
            },
            {
                name: 'titulo',
                type: 'string'
            },
            {
                name: 'latitud',
                type: 'string'
            },
            {
                name: 'longitud',
                type: 'string'
            },
            {
                name: 'direccion',
                type: 'string'
            },
            {
                name: 'poblacion',
                type: 'string'
            },
            {
                name: 'provincia',
                type: 'string'
            }
        ]
    }
});