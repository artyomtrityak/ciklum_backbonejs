define(function() {
    return Backbone.Model.extend({

        defaults: {
            name: '',
            project: '',
            skills: [],
            rendered: false
        },

        initialize: function() {
            //Something init can be done here
        }
    });
});

