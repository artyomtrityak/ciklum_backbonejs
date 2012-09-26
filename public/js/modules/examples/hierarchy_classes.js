define(['./models_mocks'], function(ModelsFactory) {
    "use strict";

    /*Example 1*/
    var Basic = Backbone.View.extend({
        initialize: function() {
            console.log(this.arg);
        }
    });
    var Extended = Basic.extend({
        arg: 'child var'
    });
    var basic_test = new Extended;




    /*Example 2*/
    var BasicCollection = Backbone.Collection.extend({
        url: '/static/json',

        parse: function(results) {
            _.each(results, function(result) {
                if (result.id === 1) {
                    result.id = 999;
                } else {
                    result.name = "Super Hero";
                }
                var id_prefix = result.type || "unknown";
                result.id = id_prefix + "_" + result.id;
            });
            return results;
        }
    });
    var collection_test = new BasicCollection;
    collection_test.fetch();
    console.log('Basic getter');
    console.log(collection_test);

    var AnotherUrlGetter = BasicCollection.extend({
        url: '/static/users',
        model: ModelsFactory.UserModel
    });
    var users = new AnotherUrlGetter;
    users.fetch();
    console.log('Users getter');
    console.log(users);




    /*Example 3*/
    var MultidataCollection = BasicCollection.extend({
        url: '/static/multidata',
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
    var totalColl = new MultidataCollection;
    totalColl.fetch();
    console.log("Multidata");
    console.log(totalColl);


});