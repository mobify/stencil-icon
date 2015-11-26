require.config({
    paths: {
        'dust-full': '../../node_modules/dustjs-linkedin/dist/dust-full',
        'adaptivejs': '../../node_modules/adaptivejs',
        '$': '../../node_modules/jquery/dist/jquery',
        'text': '../../node_modules/requirejs-text/text',
    },
    shim: {
        'dust-full': {
            'exports': 'dust'
        },
        '$': {
            'exports': 'jQuery'
        }
    },
});

define(function(require) {
    var dust = require('dust-full');
    var componentHelper = require('adaptivejs/lib/dust-component-helper');
    var componentSugar = require('adaptivejs/lib/dust-component-sugar');
    var ui = require('../../icon-ui');
    var templates = require('../../tmp/templates');
    var icons = require('text!../../bower_components/shoppicon/svg-sprite/shoppicon.svg');
    var $ = require('$');
    var context;

    // Register helpers for precompiled component templates.
    dust = componentHelper(dust);
    templates.forEach(function(name) {
        dust.helpers[name] = componentSugar.makeHelper(name);
    });

    // Define any context required for the tests:
    var context = {
        repo: 'https://github.com/mobify/stencil-icon',
        icons: icons,
    };

    // Render
    dust.render('tests', context, function(err, out) {
        if (!err) {
            document.querySelector('body').innerHTML = out;

            $('[data-adaptivejs-component="stencil-icon"]').each(function(i, el) {
                var $component = $(el);

                // Initialize
                ui.init($component);
                $component.attr('data-adaptivejs-component-processed', '');
            });

            // Test dynamic icons
            var $cycler = $('#cycler');
            var $inputter = $('#inputter');
            var icons = ['arrow-up', 'arrow-right', 'arrow-down', 'arrow-left'];
            var cycleCount = 0;

            window.setInterval(function() {
                // debugger;
                cycleCount = cycleCount >= 3 ? 0 : cycleCount + 1;
                $cycler.data('component').name('shoppicon-' + icons[cycleCount]);
            }, 1000);

            $('#inputter-input').on('keydown', function(e) {
                if (e.which === 13) {
                    $('#inputter-button').trigger('click');
                    this.setSelectionRange(0, this.value.length);
                }
            });

            $('#inputter-button').on('click', function() {
                $inputter.data('component').name($.trim($('#inputter-input').val()));
            });
        } else {
            console.log(err);
        }
    });
});
