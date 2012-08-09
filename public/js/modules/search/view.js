define(['./model'], function(Model) {
    "use strict";

    return Backbone.View.extend({
        el: $('#ciklumers-search'),

        search_timer: false,

        events: {
            "keyup": "search"
        },

        initialize: function() {
            this.model = new Model();
        },

        search: function() {
            if (this.timer_search) {
                clearTimeout(this.timer_search);
            }
            this.timer_search = setTimeout(_.bind(function() {
                this.timer_search = false;
                var search_val = this.$el.val();
                if (this.model.get('search') != search_val) {
                    this.model.set({search: search_val});
                    //TODO: listen change event
                    this.trigger('search', search_val);
                }
            }, this), 500);
        },

        make_search: function(search) {
            this.$el.val(search);
            this.search();
        }
    });
});