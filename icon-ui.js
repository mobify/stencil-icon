define(['$'], function($) {
    /**
     * Constructor
     */
    var Icon = function($el, options) {
        // Component instance properties.
        this.$el = $el;
        this.$use = this.$el.find('use').eq(0);
    };

    Icon.prototype.name = function(newName) {
        if (newName === undefined) {
            return this.$use.attr('xlink:href').replace(/^#/, '');
        } else {
            this.$use.attr('xlink:href', '#' + newName);
        }
    };

    /**
     * Export the init method required by AdaptiveJS.
     */
    return {
        init: function($el, options) {
            // Recreate jQuery object with correct selector
            //
            // TODO: This shouldn’t be needed but is, for Adaptive, even after
            // this change: https://github.com/mobify/adaptivejs/commit/dcb71b4738c2d59aa79f8e21a978a5a24bc03756
            //
            $el = $($el);

            // If already initialized, return the instance; otherwise, create it
            // and expose it through jQuery’s data store.
            return $el.data('component') || $el.data('component', new Icon($el, options));
        }
    };
});
