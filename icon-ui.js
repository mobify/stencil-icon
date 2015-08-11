define(function(require) {
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
            // If already initialized, return the instance; otherwise, create it
            // and expose it through jQuery’s data store.
            return $el.data('component') || $el.data('component', new Icon($el, options));
        }
    };
});
