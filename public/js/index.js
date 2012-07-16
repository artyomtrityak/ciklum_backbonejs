require.config({
    baseUrl: '/static/js/',
    urlArgs: 'v0.1',
    waitSeconds: 20,
    //mainConfigFile: 'index.js',

    paths: {
       'text': 'lib/text'
    },

    shim: {
       'lib/backbone': ['lib/underscore', 'lib/jquery'],
       'lib/bootstrap': ['lib/jquery']
    }
});

requirejs(['lib/backbone', 'app', 'text!templates/ciklumer.html'], function(bb, App, html) {
    $(function() {
        new App();
        Backbone.history.start();

        console.log(html);
    });
});