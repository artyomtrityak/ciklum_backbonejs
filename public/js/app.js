define(["modules/ciklumers/list_view", 'modules/navigation', 'modules/search/view'],
    function(ciklumers, Navigation, Search) {

    return Backbone.Router.extend({
        routes: {
            "role/:role": "filter_role"
        },

        initialize: function() {
            this.ciklumers = new ciklumers();
            this.navigation = new Navigation();
            this.search = new Search();

            this.bind();
        },

        bind: function() {
            this.search.on('search', this.filter_search, this);
        },

        filter_role: function(role) {
            this.ciklumers.reset();
            this.ciklumers.get_next_page({role: role});
            this.navigation.activate(role);
        },

        filter_search: function(search) {
            this.ciklumers.reset();
            this.ciklumers.get_next_page({search: search});
        }
    });
});

