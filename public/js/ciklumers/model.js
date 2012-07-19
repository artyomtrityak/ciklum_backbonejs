define(function() {
    return Backbone.Model.extend({

        defaults: {
            name: '',
            project: '',
            skills: []
        },

        initialize: function() {
            console.log('init model');
        }
    });
});

