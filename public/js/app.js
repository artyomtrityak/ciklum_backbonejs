define(["ciklumers/list_view"], function(ciklumers) {
    return Backbone.Router.extend({
        routes: {
            "test/:id": "test"
        },

        initialize: function() {
            console.log('init router');
            this.ciklumers = new ciklumers();
        },

        test: function() {}

    });
});

