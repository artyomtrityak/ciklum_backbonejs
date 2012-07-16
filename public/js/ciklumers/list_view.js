define(["./collection", "./view"], function(Collection, Ciklumer) {
    return Backbone.View.extend({

        el: $('#ciklumers-list-container'),

        initialize: function() {
            console.log('init list v');
            this.collection = new Collection();
            this.bind();
        },

        bind: function() {
            this.collection.on('add', this.render, this);
        },

        render: function() {
            console.log(arguments);
        }
    });
});

