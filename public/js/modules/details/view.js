define(['text!templates/ciklumer_details.html'], function(details) {

    return Backbone.View.extend({
        el: $('#ciklum-user-details'),
        template: _.template(details),

        initialize: function() {
        },

        render: function(model) {
            this.$el.html(this.template(model.toJSON()));
            return this;
        }
    });
});