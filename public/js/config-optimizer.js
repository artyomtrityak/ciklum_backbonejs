require.config({
    baseUrl: '.',
    mainConfigFile: './index.js',
    paths: {
        'text': 'lib/text',
        'jquery': 'lib/jquery-1.7.2',
        'backbone': 'lib/backbone-0.9.2',
        'underscore': 'lib/underscore-1.3.3'
    },
    shim: {
        'backbone': ['underscore', 'jquery'],
        'lib/bootstrap': ['jquery'],
        'app': ['backbone']
    }
});
