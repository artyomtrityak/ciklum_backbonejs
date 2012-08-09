define(function() {
    "use strict";

    return Backbone.View.extend({
        el: $('#ciklumers-menu'),

        activate: function(name) {
            name = name.replace(/ /g, '').toLowerCase();
            this.$('.nav > li').removeClass('active');
            this.$('.nav > .nav-' + name).addClass('active');
        }
    });
});
