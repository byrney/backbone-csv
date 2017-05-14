var _ = require('lodash');
var Model = require('ampersand-model');
var View = require('ampersand-view');
var Collection = require('ampersand-rest-collection');
var d3 = require('d3');

var CsvModel = Model.extend({
    props: {
        x: 'string',
        y: 'number'
    }
});

var CsvCollection = Collection.extend({
    model: CsvModel,
    url: 'data.csv',
    // parse: function(response){
    //     console.log('parse');
    //     return d3.csv.parse(response);
    // },
    // fetch: function(options){
    //     console.log('fetch');
    //     options = options || {};
    //     debugger;
    //     //options.dataType = 'text';
    //     options.url = this.url;
    //     return this.sync('read', this, options);
    // }
    fetch: function(options){
        var model = this;
        req = d3.csv(model.url);
        req.row(row => { row.y = +row.y; return row; });
        req.get((err, data) => {
            console.log(data);
            model.reset(data);
        });
        return this;
    }
});

var CsvView = View.extend({
    initialize: function(options){
        console.log('view init', options);
        this.listenTo(options.collection, 'all', this.eventLog);
        this.listenTo(options.collection, 'reset add change remove', this.render);
    },
    eventLog: function(e){
        console.log('event:', e);
    },
    render: function(){
        console.log('render');
        var text = JSON.stringify(this.collection.toJSON());
        this.el.innerHTML = text;
    }
});

function main(){
    console.log('main');
    var collection = new CsvCollection();
    var view = new CsvView({el: document.getElementById('models'), collection: collection});
    collection.fetch();
    window.collection = collection;
}

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

console.log('not ready');
ready(main);
