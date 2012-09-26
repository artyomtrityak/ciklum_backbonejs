define(function() {
    "use strict";

    var BasicModel = Backbone.Model.extend({
        idAttribute: "id" //default, just for example
    });

    var UserModel = BasicModel.extend({
        defaults: {
            type: 'user',
            is_admin: false,
            can_vote: true
        },

        validate: function() {
            if (this.attributes.username === undefined) {
                return "User name is not defined";
            }
        }
    });

    var ArticleModel = BasicModel.extend({
        defaults: {
            type: 'article',
            is_important: false
        },

        validate: function() {
            if (this.attributes.topic === undefined) {
                return "Topic is not defined";
            }
        }
    });

    return {
        UserModel: UserModel,
        ArticleModel: ArticleModel
    }

});