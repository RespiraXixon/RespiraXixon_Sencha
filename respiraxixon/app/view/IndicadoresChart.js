Ext.define('RespiraXixon.view.IndicadoresChart', {
extend:'Ext.Panel',
alias:'widget.indicadoreschart',
config: {
			layout: 'fit'
},
constructor: function (config) {
/*
this.store = Ext.getStore('EntryStore');
Ext.apply(this, config);
this.callParent([config]);
var configRecord = Ext.ModelManager.getModel('WeightWeight.
model.Config');
configRecord.load(1, {
scope:this,
success: this.createChart
});*/
},

createChart: function(config) {
/*
this.configRecord = config;
var goalStore = Ext.create('Ext.data.Store',{ fields: [
'entryDate',
{name: Ext.String.capitalize(this.dataField), type:'int'},
{name: 'goal', type: 'int'}
]
}
);
this.store.each(function(record) {
if (record.get(this.dataField)) {
var values = {
entryDate: Ext.Date.format(dt,'m-d-Y'),
goal: this.configRecord.get(this.goalField)
};
values[Ext.String.capitalize(this.dataField)] = record.get(this.
dataField);
goalStore.add(values);
}
}, this);*/
}
});