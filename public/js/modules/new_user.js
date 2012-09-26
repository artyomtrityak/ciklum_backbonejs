define(['modules/ciklumers/model'], function(Model) {
    "use strict";

    return Backbone.View.extend({
        el: $('#ciklumers-add-new'),

        events: {
            'click': 'add_new'
        },

        add_new: function() {
            var model = new Model();
            model.on('change:id', this.add_new_ciklumer, this);
            this.trigger('add_new', model);
        },

        add_new_ciklumer: function(model) {
            //it is example of sucks name, it should be "ciklumer:new"
            this.trigger('add_new_ciklumer', model);
        }
    });
});
