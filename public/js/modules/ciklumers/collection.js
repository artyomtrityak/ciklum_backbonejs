define(['./model'], function(Model) {
    "use strict";

    return Backbone.Collection.extend({
        url: '/ciklumers',
        model: Model,

        loading: false,

        initialize: function() {
            console.log('init collection');
        },

        is_loading: function() {
            return this.loading;
        },
        set_loading: function() {
            this.loading = true;
        },
        remove_loading: function() {
            this.loading = false;
        }
    });
});

