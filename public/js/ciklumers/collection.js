define(['./model'], function(Model) {
    return Backbone.Collection.extend({
        url: '/ciklumers',
        model: Model,

        initialize: function() {
            console.log('init collection');
        }
    });
});

