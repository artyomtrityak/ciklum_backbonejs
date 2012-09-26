define(['modules/ciklumers/list_view', 'modules/navigation', 'modules/search/view', 'modules/details/view', 'modules/new_user'],
    function(Ciklumers, Navigation, Search, Details, NewUser) {
    "use strict";

    return Backbone.Router.extend({
        routes: {
            '': 'filter_role',
            'role/:role': 'filter_role',
            'project/:project': 'filter_project',
            'skill/:skill': 'filter_skill',
            '*url': 'filter_unknown'
        },

        initialize: function() {
            this.ciklumers = new Ciklumers();
            this.navigation = new Navigation();
            this.search = new Search();
            this.details =  new Details();
            this.new_user = new NewUser();
            this.bind();
        },

        bind: function() {
            this.search.on('search', this.filter_search, this);
            this.ciklumers.on('show_details', this.show_details, this);
            this.new_user.on('add_new', this.show_new_details, this);
            this.new_user.on('add_new_ciklumer', this.add_new_ciklumer, this);
        },

        filter_role: function(role) {
            role || (role = 'All');
            this.ciklumers.reset();
            this.ciklumers.get_next_page({role: role});
            this.navigation.activate(role);
        },

        filter_search: function(search) {
            this.ciklumers.reset();
            this.ciklumers.get_next_page({search: search});
        },

        filter_project: function(project) {
            this.search.make_search(project);
        },

        filter_skill: function(skill) {
            this.search.make_search(skill);
        },

        filter_unknown: function() {
            this.navigate('', {trigger: true});
        },

        show_details: function(model) {
            this.details.render(model);
        },

        show_new_details: function(model) {
            this.details.render_edit(model);
        },

        add_new_ciklumer: function(model) {
            this.ciklumers.add_user(model);
        }
    });
});

