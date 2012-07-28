define(function() {
    "use strict";

    return Backbone.View.extend({
        el: $('#ciklumers-menu'),

        activate: function(name) {
            name = name.replace(/ /g, '');
            name = name.toLowerCase();

            console.log(name);

            this.$el.find('.nav > li').removeClass('active');
            this.$el.find('.nav > .nav-' + name).addClass('active');
        }
    });
});
