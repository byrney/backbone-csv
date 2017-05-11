
var CsvModel = Backbone.Model.extend({

});

var CsvCollection = Backbone.Collection.extend({
    model: CsvModel,
    url: 'data.csv',
    sync: function(method, model, options){
        d3.csv(this.url, (error, data) => {
            if(error){
                options.error(error);
            }
            options.success(data);
        });
    },
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


