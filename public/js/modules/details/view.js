define(['text!templates/ciklumer_details.html', 'text!templates/ciklumer_details_edit.html'],
    function(details, details_edit) {
    "use strict";

    return Backbone.View.extend({
        el: $('#ciklum-user-details'),
        template: _.template(details),
        template_edit: _.template(details_edit),

        events: {
            "click .ciklumer-details-edit": "render_edit",
            "click .ciklumer-details-save": "save"
        },

        initialize: function() {
        },

        render: function(model) {
            this.model = model;
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        render_edit: function() {
            this.$el.html(this.template_edit(this.model.toJSON()));
            return false;
        },

        save: function() {
            this.$el.find('.ciklum-user-details-edit-input').each(_.bind(function(index, el) {
                var field = $(el).data('field');
                var val = field == 'skills' ? $(el).val().split(', ') : $(el).val();
                this.model.set(field, val);
            }, this));
            this.model.save({wait:true}, {
                success: _.bind(function() {
                    this.render(this.model);
                }, this),
                error: _.bind(function() {
                    this.trigger('error');
                }, this)
            });
            return false;
        }
    });
});