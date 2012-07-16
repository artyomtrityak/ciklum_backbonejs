require.config({
    baseUrl: '/static/js/',
    urlArgs: '?v0.1',
    waitSeconds: 20,
    //mainConfigFile: 'index.js',

    shim: {
       'lib/backbone': ['lib/underscore', 'lib/jquery'],
       'lib/bootstrap': ['lib/jquery']
    }
});

requirejs(['lib/backbone', 'app'], function(bb, App) {
    $(function() {
        new App();
        Backbone.history.start();
    });
});