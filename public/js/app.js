define(["ciklumers/list_view", 'navigation'], function(ciklumers, Navigation) {
    return Backbone.Router.extend({
        routes: {
            "role/:role": "filter_role"
        },

        initialize: function() {
            this.ciklumers = new ciklumers();
            this.navigation = new Navigation();
        },

        filter_role: function(role) {
            this.ciklumers.reset();
            this.ciklumers.get_next_page({role: role});
            this.navigation.activate(role);
        }
    });
});

