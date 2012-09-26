require.config({
    baseUrl: '/static/js/',
    urlArgs: 'v1.0',
    waitSeconds: 20,

    paths: {
       'text': 'lib/text',
       'jquery': 'lib/jquery-1.7.2',
       'backbone': 'lib/backbone-0.9.2',
       'underscore': 'lib/underscore-1.3.3',
       'facebooklib': '//connect.facebook.net/en_US/all'
    },

    shim: {
       'backbone': ['underscore', 'jquery'],
       'lib/bootstrap': ['jquery'],
       'app': ['backbone']
    }
});

requirejs(['app'], function(App) {
    $(function() {
        new App();
        Backbone.history.start();

        //EXAMPLES
        requirejs(['examples']);
    });
});
