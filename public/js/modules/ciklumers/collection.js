define(['./model'], function(Model) {
    "use strict";

    return Backbone.Collection.extend({
        url: '/ciklumers',
        model: Model,
        loading: false,

        is_loading: function() {
            return this.loading;
        },
        set_loading: function(status) {
            this.loading = status ? true : false;
        }
    });
});

