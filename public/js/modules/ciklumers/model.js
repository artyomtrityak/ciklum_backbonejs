define(function() {
    "use strict";

    return Backbone.Model.extend({

        defaults: {
            name: '',
            project: '',
            mobile: '',
            city: '',
            skype: 'art.trityak',
            skills: [],
            rendered: false
        },

        initialize: function() {
            //Something init can be done here
        }
    });
});

