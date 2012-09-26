define(['./model'], function(Model) {
    "use strict";

    return Backbone.Collection.extend({
        url: '/ciklumers',
        model: Model,
        loading: false,

        options: {
            page: 0,
            search: '',
            role: ''
        },

        is_loading: function() {
            return this.loading;
        },

        set_loading: function(status) {
            this.loading = status ? true : false;
        },

        set_options: function(options) {
            options || (options = {});
            this.options = _.extend({
                search: this.options.search,
                role: this.options.role,
                page: this.options.page
            }, options);
        },

        get_options: function() {
            return this.options;
        },

        incr_page: function() {
            this.options.page++;
        },

        reset_data: function() {
            this.options.page = 0;
            this.reset();
        }
    });
});

