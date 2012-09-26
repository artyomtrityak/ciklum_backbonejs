define(['./models_mocks'], function(ModelsFactory) {
    "use strict";

    var methodMap = {
        'create': 'POST',
        'update': 'PUT',
        'delete': 'DELETE',
        'read':   'GET'
    };

    /*Override only for basic collection*/
    var XmlCollection = Backbone.Collection.extend({
        sync: function(method, model, options) {
            var self = this;
            var type = methodMap[method];

            // Default options, unless specified.
            options || (options = {});

            //XML HOOK 1!!!
            var params = {type: type, dataType: 'xml'};

            // Ensure that we have a URL.
            if (!options.url) {
                params.url = _.result(model, 'url');
            }

            params.contentType = 'application/x-www-form-urlencoded';
            params.data = params.data ? {model: params.data} : {};

            /*... cut POST / DELETE etc ...*/

            var success = options.success;
            options.success = function(resp, status, xhr) {
                //XML HOOK 2!!!
                resp = self.parse_xml(resp);

                if (success) success(resp, status, xhr);
                model.trigger('sync', model, resp, options);
            };

            var error = options.error;
            options.error = function(xhr, status, thrown) {
                if (error) error(model, xhr, options);
                model.trigger('error', model, xhr, options);
            };

            // Make the request, allowing the user to override any Ajax options.
            return $.ajax(_.extend(params, options));
        },

        parse_xml: function(xml) {
            var json_result = [];
            $(xml).find("root > users > user").each(function (index, user) {
                json_result.push({
                    id: $(user).find('id').text(),
                    username: $(user).find('username').text(),
                    type: $(user).find('type').text()
                });
            });
            $(xml).find("root > articles > article").each(function (index, article) {
                json_result.push({
                    id: $(article).find('id').text(),
                    topic: $(article).find('topic').text(),
                    type: $(article).find('type').text()
                });
            });
            return json_result;
        }
    });

    var SomeCollection = XmlCollection.extend({
        url: '/static/test.xml',
        model: function(attrs, options) {
            switch(attrs.type) {
                case 'user':
                    return new ModelsFactory.UserModel(attrs, options);
                case 'article':
                    return new ModelsFactory.ArticleModel(attrs, options);
                default:
                    throw "Unknown model";
            }
        }
    });

    var collection = new SomeCollection();
    collection.fetch();
    console.log('XML collection');
    console.log(collection);

});