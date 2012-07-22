define(['text!templates/ciklumer.html'], function(ciklumer_tpl) {
    return Backbone.View.extend({

        tagName: 'div', //default

        template: _.template(ciklumer_tpl),

        initialize: function() {
            this.model.set({rendered: true}, {silent: true});
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});

