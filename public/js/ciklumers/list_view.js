define(["./collection", "./view"], function(Collection, Ciklumer) {
    return Backbone.View.extend({
        el: $('#ciklumers-list-container'),

        page: 0,

        events: {
            'scroll': "lazy_loader"
        },

        initialize: function() {
            this.set_list_height();
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
        },

        /**
         * Data lazy loader. It checks container height and offset scroll bar and
         * makes request to server
         */
        lazy_loader: function() {
            var current_scroll_position = this.$el.get(0).scrollHeight - this.$el.scrollTop();
            if (current_scroll_position < this.$el.height() + 400) {
                this.get_next_page();
            }
        },

        /**
         * Set init element heights depends on window height
         * Also check window resize and reset height is needed
         */
        set_list_height: function() {
            var height = $(window).height() - 140;
            this.$el.height(height);
        }
    });
});

