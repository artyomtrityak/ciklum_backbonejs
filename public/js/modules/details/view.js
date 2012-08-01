define(['text!templates/ciklumer_details.html', 'text!templates/ciklumer_details_edit.html'],
    function(details, details_edit) {
    "use strict";

    return Backbone.View.extend({
        el: $('#ciklum-user-details'),
        template: _.template(details),
        template_edit: _.template(details_edit),

        events: {
            "click .ciklumer-details-edit": "edit_user",
            "click .ciklumer-details-save": "save_user",
            "click .ciklumer-details-remove": "delete_user"
        },

        initialize: function() {
        },

        render: function(model) {
            this.model = model;
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        render_edit: function(model) {
            this.model = model;
            this.$el.html(this.template_edit(this.model.toJSON()));
            return false;
        },

        edit_user: function() {
            this.render_edit(this.model);
        },

        save_user: function() {
            var new_fields = {};
            this.$el.find('.ciklum-user-details-edit-input').each(_.bind(function(index, el) {
                var field = $(el).data('field');
                var val = field == 'skills' ? $(el).val().split(',') : $(el).val();
                new_fields[field] = val;
            }, this));
            this.model.set(new_fields, {silent: true});
            this.model.save({}, {
                wait:true,
                success: _.bind(function() {
                    this.render(this.model);
                }, this),
                error: _.bind(function() {
                    this.trigger('error');
                    this.model.set(this.model.previousAttributes());
                }, this)
            });
            return false;
        },

        delete_user: function() {
            this.model.destroy({wait:true,
                success: _.bind(function() {
                    this.$el.html('');
                }, this)
            });
        }
    });
});