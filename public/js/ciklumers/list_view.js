define(["./collection", "./view"], function(Collection, Ciklumer) {
    return Backbone.View.extend({

        el: $('#ciklumers-list-container'),

        /*not backbone vars*/
        page: 0,

        initialize: function() {
            this.collection = new Collection();
            this.get_next_page();
        },

        get_next_page: function() {
            this.collection.fetch({
                add: true,
                data: {page: this.page},
                success: _.bind(this.render, this)
            });
        },

        render: function() {
            var ciklumers_part = $('<div />');
            _.each(this.collection.where({rendered: false}), function(model) {
                ciklumers_part.append(new Ciklumer({model: model}).render().$el);
            },this);
            this.$el.append(ciklumers_part);
            this.page++;
        }
    });
});

