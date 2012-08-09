define(['text!templates/ciklumer_details.html', 'text!templates/ciklumer_details_edit.html', 'lib/bootstrap'],
    function(details, details_edit) {
    "use strict";

    return Backbone.View.extend({
        el: $('#ciklum-user-details'),
        template: _.template(details),
        template_edit: _.template(details_edit),

        events: {
            "click .ciklumer-details-edit": "edit_user",
            "click .ciklumer-details-save": "save_user",
            "click .ciklumer-details-remove": "delete_user",
            "error": "show_error"
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
            return false;
        },

        save_user: function() {
            var new_fields = {};
            this.$('.ciklum-user-details-edit-input').each(_.bind(function(index, el) {
                var field = $(el).data('field');
                if (field === 'skills') {
                    var val = $(el).val().split(',');
                    if (val.length === 1 && val[0] === '') {
                        val = [];
                    }
                } else {
                    val = $(el).val();
                }
                new_fields[field] = val;
            }, this));
            this.model.set(new_fields, {silent: true});
            this.model.save({}, {
                wait:true,
                success: _.bind(function() {
                    this.render(this.model);
                }, this),
                error: _.bind(function(model, msg) {
                    this.show_error(msg);
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
        },

        show_error: function(msg) {
            var error_box = this.$('#ciklumer-error');
            error_box.alert().show();
            error_box.find('.ciklumer-error-msg').html(msg);
        }
    });
});