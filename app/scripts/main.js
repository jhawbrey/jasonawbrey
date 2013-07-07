require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        skrollr: '../bower_components/skrollr/src/skrollr'
    },
    shim: {
        skrollr: {
            exports: 'skrollr'
        }
    }
});

require(['app', 'skrollr', 'jquery'], function (app, skrollr, $) {
    // use app here

    console.log('Running jQuery %s', $().jquery);
});