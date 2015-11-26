# Stencil Icon

A container for displaying SVG icons from a `<symbol>`-based SVG sprite.

**View demo (coming soon)**

## Requirements

- AdaptiveJS 2.1 or greater

## Installation

```shell
cd my/adaptive/project
grunt component:install:icon
```

## Usage

The Icon component ships with a default icon set, [Shoppicon](http://github.com/ry5n/shoppicon). Usage depends in whether you want to use the default set, or a custom set.

### Default icon set

1. In your adaptive project, open `app/global/base-view.js`, and add the following dependency:

    ```javascript
    define(['$', ..., 'text!bower_components/shoppicon/svg-sprite/shoppicon.svg'], function($, ..., icons) {...});
    ```

    Then, within the views’s returned context, add a key for the icon sprite:

    ```javascript
    return {
        preProcess: function(context) {...},
        postProcess: function(context) {...},
        context: {
            ...
            icons: icons,
        },
    };
    ```

    Finally, within `app/global/base.dust`, include the svg sprite *at the very top of the body tag*, like so:

    ```html
    {body|openTag|s}
        <div hidden>{icons|s}</div>
        
        {+bodyBlock}
        ...
        {/bodyBlock}
    </body>
    ```

2. Use the Icon component’s dust helper to render icons. For example, to show a hamburger icon:

    ```html
    {@c-icon set="shoppicon" name="menu" /}
    ```


### Custom icon set

1. To use a custom icon set, you’ll need to build the SVG sprite using a separate tool, such as (grunt-svgstore)[https://github.com/FWeinb/grunt-svgstore], or (grunt-iconpack)[https://github.com/ry5n/grunt-iconpack]. Preferably, build your sprite with ids that are prefixed with `icon-`.

2. Follow step 2 in “Default icon set” above, replacing the path to the shoppicon sprite with the path to your custom sprite.

3. Use the Icon component’s dust helper to render icons. If your prefix is set correctly, you don’t need the `set` parameter. For example, to show a hamburger icon:

    ```html
    {@c-icon name="menu" /}
    ```

### Changing the icon dynamically

To update the icon’s displayed symbol from script, you need to enable dynamic mode in the dust helper:

```html
{@c-icon name="menu" dynamic="true" /}
```

Then, you can update the name dynamically from script:

```javascript
// Get the name of the currently-displayed icon, without the prefix:
$('#something .c-icon').data('component').name();

// Set the icon
$('#something .c-icon').data('component').name('arrow-left');

// Get the icon’s prefix, minus the dash.
$('#something .c-icon').data('component').prefix;
// ← `icon`
```


## API

### Dust helper parameters

Param name | Type          | Description
:--------- | :------------ | :----------
class      | String        | Adds values to the `class` attribute of the root element
id         | String        | Sets the `id` attribute of the underlying select element
name       | String        | Name of the icon to display from the sprite. Consult your icon set of choice for a list of available icons
set        | String        | Value of the prefix used in the icon sprite, the dash
title      | String        | Text equivalent for screen readers. Only use this if there is no text label elsewhere in the UI.

### Dust helper bodies

_none_

### Sass configurable variables

Variable name     | Type      | Description
:---------------- | :-------- | :----------
$icon__size       | Length    | The width and height for the icon.

### UI options

_none_

### UI methods

The component’s UI script instance is available via `$('.c-icon').data('component')`.

Method name | Parameters | Description
:---------- | :--------- | :----------------
name        | [value]    | With no parameters, returns the name of the currently-displayed icon, without the prefix. With a string parameter, changes the displayed icon by setting the name to the new value.

### UI events

_none_

## Contributing

First, read the Adaptive component documentation, especially the pages on creating components and the Stencil authoring guide. Then, clone the repo:

- `git clone git@github.com:mobify/stencil-icon.git`
- `cd stencil-icon`
- `npm install && bower install`
- Create a branch for your changes and begin development.
- Run the test server during development to check your work (see below).

### Testing

Visual tests provide a way to describe the features of a component in a spec format and manually check functionality of a component. To run tests:

- `grunt serve`
- Note the local port on which the test server is running (defaults to 3000)
- Navigate to [localhost:{port}/tests/visual](http://localhost:3000/tests/visual)
