define(function() {
    "use strict";

    return Backbone.Model.extend({
        urlRoot: '/ciklumers',

        defaults: {
            name: '',
            avatar: '/static/img/140x120.gif',
            project: '',
            mobile: '',
            city: '',
            position: '',
            email: '',
            skype: 'art.trityak',
            skills: [],
            rendered: false
        }
    });
});

