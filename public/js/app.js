define(["lib/backbone", "ciklumers/list_view"], function(bb, ciklumers) {
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

