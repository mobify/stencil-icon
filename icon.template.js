/**
 * Loader for the component’s  Dust templates
 */
define(function(require) {
    var dust = require('dustjs-component');
    var text = require('text');
    var icon = require('text!./icon.dust');

    dust.loadSource(dust.compileComponent(icon, 'icon'));
});
