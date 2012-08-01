define(["./collection", "./view"], function(Collection, Ciklumer) {
    "use strict";

    return Backbone.View.extend({
        el: $('#ciklumers-list-container'),
        list_el: $('#ciklumers-list-container-list'),

        options: {
            page: 0,
            search: '',
            role: ''
        },

        end_reached: false,

        events: {
            "scroll": "lazy_loader",
            "click #ciklumers-list-container-list-load-more > a": "manual_load_more"
        },

        initialize: function() {
            this.set_list_height();
            this.collection = new Collection();
        },

        manual_load_more: function() {
            this.get_next_page();
            return false;
        },

        get_next_page: function(options) {
            if (this.end_reached === true || this.collection.is_loading() === true) {
                return;
            }
            options = options || {};
            this.options = _.extend({
                search: this.options.search,
                role: this.options.role,
                page: this.options.page
            }, options);
            this.collection.set_loading();
            this.collection.fetch({
                add: true,
                wait: true,
                data: this.options,
                success: _.bind(this.render, this),
                error: _.bind(this.error, this)
            });
        },

        render: function(options) {
            options = _.extend({add_new: false}, options);
            this.collection.remove_loading();
            var ciklumers_part = $('<div />');
            var not_rendered = this.collection.where({rendered: false});
            if (not_rendered.length === 0) {
                this.end_reached = true;
                return;
            }
            _.each(not_rendered, function(model) {
                ciklumers_part.append(new Ciklumer({model: model, parent: this}).render().$el);
            },this);
            if (options.add_new === true) {
                this.list_el.prepend(ciklumers_part);
            } else {
                this.list_el.append(ciklumers_part);
                this.options.page++;
            }
        },

        reset: function() {
            this.end_reached = false;
            this.collection.reset();
            this.options.page = 0;
            this.list_el.html('');
        },

        error: function() {
            this.collection.remove_loading();
        },

        add_user: function(model) {
            this.collection.add(model);
            this.render({add_new:true});
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
            var height = $(window).height() - 160;
            this.$el.height(height);
        }
    });
});

