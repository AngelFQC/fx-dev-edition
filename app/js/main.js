require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'libs/jquery/jquery.min',
        underscore: 'libs/underscore.js/underscore',
        backbone: 'libs/backbone.js/backbone-min',
        text: 'libs/require-text/text',
        template: '../templates'
    }
});

document.addEventListener('DOMContentLoaded', function () {
    require([
        'app'
    ], function (App) {
        App.initialize();
    });
});
