define(['text!templates/ciklumer.html'], function(ciklumer_tpl) {
    "use strict";

    return Backbone.View.extend({

        tagName: 'div', //default

        template: _.template(ciklumer_tpl),

        events: {
            "click .ciklumer-detail-show": "show_details"
        },

        initialize: function(options) {
            this.parent = options.parent;
            this.model.set({rendered: true}, {silent: true});
            this.model.on('change', this.render, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        show_details: function() {
            this.parent.trigger("show_details", this.model);
            return false;
        }
    });
});

