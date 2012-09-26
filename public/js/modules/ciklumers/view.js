define(['text!templates/ciklumer.html', 'modules/examples/templates_cache'], function(ciklumer_tpl, TCacher) {
    "use strict";

    return Backbone.View.extend({

        tagName: 'div', //default

        /*Useful only if more than one view use same template*/
        template: TCacher('ciklumer_short', ciklumer_tpl),

        events: {
            "click .ciklumer-detail-show": "show_details"
        },

        initialize: function(options) {
            this.parent = options.parent;
            this.model.set({rendered: true}, {silent: true});
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
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

