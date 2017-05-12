
var CsvModel = Backbone.Model.extend({

});

var CsvCollection = Backbone.Collection.extend({
    model: CsvModel,
    url: 'data.csv',
    parse: function(response){
        return d3.csv.parse(response);
    },
    fetch: function(options){
        options = options || {};
        options.dataType = 'text';
       return Backbone.Collection.prototype.fetch.call(this, options);
    }
});

var CsvView = Backbone.View.extend({
    initialize: function(options){
        this.listenTo(options.model, 'sync', this.render);
    },
    render: function(){
        this.$el.text(JSON.stringify(this.model.toJSON()));
    }

});

function main(){
    var collection = new CsvCollection();
    var view = new CsvView({el: document.getElementById('models'), model: collection});
    collection.fetch({sync: true});
}

$(document).ready(main);


