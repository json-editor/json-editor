JSON Editor
===========

[![Actions Status](https://github.com/json-editor/json-editor/actions/workflows/build.yml/badge.svg)](https://github.com/json-editor/json-editor/actions)

Fork of the inactive [jdorn/json-editor](https://github.com/jdorn/json-editor) using the updated fork [json-editor/json-editor](https://github.com/json-editor/json-editor).
Some pull requests added from the original repo.

![JSON Schema -> HTML Editor -> JSON](./docs/images/jsoneditor.png)

JSON Editor takes a JSON Schema and uses it to generate an HTML form.
It has full support for JSON Schema version 3 and 4 and can integrate with several popular CSS frameworks (bootstrap, spectre, tailwind).

Take a look at this [example](https://json-editor.github.io/json-editor/form-submission.html) for a simple form submission case study.
### Online Demo

Check out an interactive demo: https://json-editor.github.io/json-editor/

Or the JSON-Editor Interactive Playground: https://pmk65.github.io/jedemov2/dist/demo.html

Install
-----------------

Install package

    npm install @json-editor/json-editor

Using a CDN

    <script src="https://cdn.jsdelivr.net/npm/@json-editor/json-editor@latest/dist/jsoneditor.min.js"></script>

You can also access older releases from CDN, using the landing page: https://www.jsdelivr.com/package/npm/@json-editor/json-editor

For local usage download the [production version](https://cdn.jsdelivr.net/npm/@json-editor/json-editor@latest/dist/jsoneditor.js) or the [development version](https://cdn.jsdelivr.net/npm/@json-editor/json-editor@latest/dist/nonmin/jsoneditor.js)

Requirements
-----------------

JSON Editor has no dependencies. It only needs a modern browser (tested in Chrome and Firefox).

### Optional Requirements

The following are not required, but can improve the style and usability of JSON Editor when present.

*  A compatible JS template engine (Mustache, Underscore, Hogan, Handlebars, Lodash, Swig, Markup, or EJS)
*  A compatible CSS framework for styling (Spectre, Tailwind, Bootstrap4)
*  A compatible icon library (Spectre, jQueryUI, Font Awesome 3/4/5)
*  [SCEditor](http://www.sceditor.com/) for WYSIWYG editing of HTML or BBCode content
*  [SimpleMDE](https://simplemde.com/) for editing of Markdown content
*  [Ace Editor](http://ace.c9.io/) for editing code
*  [Jodit](https://xdsoft.net/jodit/) Open Source WYSIWYG editor
*  [Autocomplete](https://autocomplete.trevoreyre.com/#/javascript-component) Accessible autocomplete component
*  [Choices](https://github.com/jshjohnson/Choices) for nicer Select & Array boxes
*  [Select2](http://ivaynberg.github.io/select2/) for nicer Select boxes
*  [Selectize](https://selectize.github.io/selectize.js/) for nicer Select & Array boxes
*  [Flatpickr](https://flatpickr.js.org/) lightweight and powerful datetime picker
*  [Signature Pad](https://github.com/szimek/signature_pad) HTML5 canvas based smooth signature drawing
*  [Vanilla Picker](https://vanilla-picker.js.org/) A simple, easy to use vanilla JS color picker with alpha selection
*  [Cleave.js](https://github.com/nosir/cleave.js) for formatting your **&lt;input/&gt;** content while you are typing
*  [IMask.js](https://imask.js.org/) vanilla javascript input mask
*  [math.js](http://mathjs.org/) for more accurate floating point math (multipleOf, divisibleBy, etc.)
*  [DOMPurify](https://github.com/cure53/DOMPurify) DOM-only, super-fast, uber-tolerant XSS sanitizer. (If you want to use HTML format in titles/headers and descriptions.)

Usage
--------------

If you learn best by example, check these out:

*  Basic Usage Example - https://json-editor.github.io/json-editor/basic.html
*  ACE Editor Example - https://json-editor.github.io/json-editor/ace_editor.html
*  Advanced Usage Example - https://json-editor.github.io/json-editor/advanced.html
*  CSS Integration Example - https://json-editor.github.io/json-editor/css_integration.html
*  Base64 Editor Example (Muiltple Upload) - https://json-editor.github.io/json-editor/multiple_upload_base64.html
*  Choices Editor Example - https://json-editor.github.io/json-editor/choices.html
*  Cleave.js Editor Example - https://json-editor.github.io/json-editor/cleave.html
*  Colorpicker Editor Example - https://json-editor.github.io/json-editor/colorpicker.html
*  Datetime Editor Example - https://json-editor.github.io/json-editor/datetime.html
*  DescribedBy Hyperlink Editor Example - https://json-editor.github.io/json-editor/describedby.html
*  iMask.js Editor Example - https://json-editor.github.io/json-editor/imask.html
*  Radio Button JSON Editor Example - https://json-editor.github.io/json-editor/radio.html
*  Recursive JSON Editor Example - https://json-editor.github.io/json-editor/recursive.html
*  Select2 Editor Example - https://json-editor.github.io/json-editor/select2.html
*  Selectize Editor Example - https://json-editor.github.io/json-editor/selectize.html
*  Signature Pad Editor Example - https://json-editor.github.io/json-editor/signature.html
*  Star Rating Editor Example - https://json-editor.github.io/json-editor/starrating.html
*  Upload Editor Example - https://json-editor.github.io/json-editor/upload.html
*  WYSIWYG Editor Example - https://json-editor.github.io/json-editor/wysiwyg.html

More examples can be found at the [JSON-Editor Interactive Playground](https://pmk65.github.io/jedemov2/dist/demo.html)

The rest of this README contains detailed documentation about every aspect of JSON Editor.  For more [under-the-hood documentation](https://github.com/json-editor/json-editor/wiki), check the wiki.

### Initialize

```js
const element = document.getElementById('editor_holder');

const editor = new JSONEditor(element, options);
```

#### Options

Options can be set globally or on a per-instance basis during instantiation.

```js
// Set an option globally
JSONEditor.defaults.options.theme = 'bootstrap4';

// Set an option during instantiation
const editor = new JSONEditor(element, {
  //...
  theme: 'bootstrap4'
});
```

Here are all the available options:

<table>
  <thead>
  <tr>
    <th>Option</th>
    <th>Description</th>
    <th>Default Value</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>ajax</td>
    <td>If <code>true</code>, JSON Editor will load external URLs in <code>$ref</code> via ajax.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>ajaxBase</td>
    <td>Allows schema references to work either with or without cors; set to protocol://host:port when api is served by different host.</td>
    <td><code></code></td>
  </tr>
  <tr>
    <td>ajaxCredentials</td>
    <td>If <code>true</code>, JSON Editor will make ajax call with [credentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials).</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>ajax_cache_responses</td>
    <td>If <code>true</code>, JSON Editor will cache external URLs' schemas in <code>localStorage</code> to avoid subsequent ajax calls.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>ajax_cache_buster</td>
    <td>If <code>ajax_cache_responses</code> is enabled, use this string to invalidate stale caches. E.g., this value should be changed when schemas are updated.</td>
    <td>Current date in simplied ISO-8601 format (e.g., "2011-10-05" for October 5, 2011).</td>
  </tr>
  <tr>
    <td>compact</td>
    <td>If <code>true</code>, the label will not be displayed/added.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>disable_array_add</td>
    <td>If <code>true</code>, remove all "add row" buttons from arrays.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>disable_array_delete</td>
    <td>If <code>true</code>, remove all "delete row" buttons from arrays.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>disable_array_delete_all_rows</td>
    <td>If <code>true</code>, remove all "delete all rows" buttons from arrays.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>disable_array_delete_last_row</td>
    <td>If <code>true</code>, remove all "delete last row" buttons from arrays.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>disable_array_reorder</td>
    <td>If <code>true</code>, remove all "move up" and "move down" buttons from arrays.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>enable_array_copy</td>
    <td>If <code>true</code>, add copy buttons to arrays.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>disable_collapse</td>
    <td>If <code>true</code>, remove all collapse buttons from objects and arrays.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>disable_edit_json</td>
    <td>If <code>true</code>, remove all Edit JSON buttons from objects.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>disable_properties</td>
    <td>If <code>true</code>, remove all Edit Properties buttons from objects.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
  <tr>
    <td>array_controls_top</td>
    <td>If <code>true</code>, array controls (add, delete etc) will be displayed at top of list.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>form_name_root</td>
    <td>The first part of the `name` attribute of form inputs in the editor.  An full example name is `root[person][name]` where "root" is the form_name_root.</td>
    <td>root</td>
  </tr>
  <tr>
    <td>iconlib</td>
    <td>The icon library to use for the editor.  See the <strong>CSS Integration</strong> section below for more info.</td>
    <td><code>null</code></td>
  </tr>
  <tr>
      <td>remove_button_labels</td>
      <td>Display only icons in buttons. This works only if iconlib is set.</td>
      <td><code>false</code></td>
    </tr>
  <tr>
    <td>no_additional_properties</td>
    <td>If <code>true</code>, objects can only contain properties defined with the <code>properties</code> keyword unless the property <code>additionalProperties: true</code> is specified in the object schema</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>refs</td>
    <td>An object containing schema definitions for URLs.  Allows you to pre-define external schemas.</td>
    <td><code>{}</code></td>
  </tr>
  <tr>
    <td>required_by_default</td>
    <td>If <code>true</code>, all schemas that don't explicitly set the <code>required</code> property will be required.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>keep_oneof_values</td>
    <td>If <code>true</code>, makes oneOf copy properties over when switching.</td>
    <td><code>true</code></td>
  </tr>
  <tr>
      <td>keep_only_existing_values</td>
      <td>If <code>true</code>, copy only existing properties over when switching.</td>
      <td><code>false</code></td>
    </tr>
  <tr>
    <td>schema</td>
    <td>A valid JSON Schema to use for the editor.  Version 3 and Version 4 of the draft specification are supported.</td>
    <td><code>{}</code></td>
  </tr>
  <tr>
    <td>show_errors</td>
    <td>When to show validation errors in the UI.  Valid values are <code>interaction</code>, <code>change</code>, <code>always</code>, and <code>never</code>.</td>
    <td><code>"interaction"</code></td>
  </tr>
  <tr>
    <td>startval</td>
    <td>Seed the editor with an initial value.  This should be valid against the editor's schema.</td>
    <td><code>null</code></td>
  </tr>
  <tr>
    <td>template</td>
    <td>The JS template engine to use. See the <strong>Templates and Variables</strong> section below for more info.</td>
    <td><code>default</code></td>
  </tr>
  <tr>
    <td>theme</td>
    <td>The CSS theme to use.  See the <strong>CSS Integration</strong> section below for more info.</td>
    <td><code>html</code></td>
  </tr>
  <tr>
    <td>display_required_only</td>
    <td>If <code>true</code>, only required properties will be included by default.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
      <td>show_opt_in</td>
      <td>If <code>true</code>, NON required properties will have an extra toggable checkbox near the title that determines if the value must be included or not in the editor´s value</td>
      <td><code>false</code></td>
    </tr>
  <tr>
    <td>prompt_before_delete</td>
    <td>If <code>true</code>, displays a dialog box with a confirmation message before node deletion.</td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td>object_layout</td>
    <td>The default value of `format` for objects. If set to <code>table</code> for example, objects will use table layout if `format` is not specified.</td>
    <td><code>normal</code></td>
  </tr>
  <tr>
    <td>enum_source_value_auto_select</td>
    <td>Preserve value at Move Up or Down.(No value is selected automatically upon deletion.)</td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td>max_depth</td>
    <td>Max depth of the nested properties to be rendered of provided json schema. The missing of this option could cause "maximum call stack size exceeded" in case of object properties with circular references. <code>0</code> value means "render all".</td>
    <td><code>0</code></td>
  </tr>
  <tr>
    <td>use_default_values</td>
    <td>If true default values based on the "type" of the property will be used</td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td>urn_resolver</td>
    <td>A callback function to resolve an undefined Uniform Resource Name (URN) for <code>$ref</code>. The function receives a URN and callback to pass back a serialized JSON response. The function should return a boolean (true if the URN can be resolved; false otherwise).</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>use_name_attributes</td>
    <td>If <code>true</code>, control inputs <code>name</code> attributes will be set.</td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td>button_state_mode</td>
    <td>If <code>1</code>, inactive buttons are hidden. If <code>2</code>, inactive buttons are disabled.</td>
    <td><code>1</code></td>
  </tr>
  <tr>
    <td>case_sensitive_property_search</td>
    <td>This property controls whether property searches in an object editor are case-sensitive</td>
    <td><code>true</code></td>
  </tr>
  </tbody>
</table>

__*Note__ If the `ajax` property is `true` and JSON Editor needs to fetch an external url, the api methods won't be available immediately.
Listen for the `ready` event before calling them.

```js
editor.on('ready',() => {
  // Now the api methods will be available
  editor.validate();
});
```

### Get/Set Value

```js
editor.setValue({name: "John Smith"});

const value = editor.getValue();
console.log(value.name) // Will log "John Smith"
```

Instead of getting/setting the value of the entire editor, you can also work on individual parts of the schema:

```js
// Get a reference to a node within the editor
const name = editor.getEditor('root.name');

// `getEditor` will return null if the path is invalid
if (name) {
  name.setValue("John Smith");

  console.log(name.getValue());
}
```

### Validate

When feasible, JSON Editor won't let users enter invalid data.  This is done by
using input masks and intelligently enabling/disabling controls.

However, in some cases it is still possible to enter data that doesn't validate against the schema.

You can use the `validate` method to check if the data is valid or not.

```javascript
// Validate the editor's current value against the schema
const errors = editor.validate();

if (errors.length) {
  // errors is an array of objects, each with a `path`, `property`, and `message` parameter
  // `property` is the schema keyword that triggered the validation error (e.g. "minLength")
  // `path` is a dot separated path into the JSON object (e.g. "root.path.to.field")
  console.log(errors);
}
else {
  // It's valid!
}
```

By default, this will do the validation with the editor's current value.
If you want to use a different value, you can pass it in as a parameter.


```javascript
// Validate an arbitrary value against the editor's schema
const errors = editor.validate({
  value: {
    to: "test"
  }
});
```

### Listen for Changes

The `change` event is fired whenever the editor's value changes.

```javascript
editor.on('change',() => {
  // Do something
});

editor.off('change',function_reference);
```

You can also watch a specific field for changes:

```javascript
editor.watch('path.to.field',() => {
  // Do something
});

editor.unwatch('path.to.field',function_reference);
```

Or watch all fields (Similar to the "onchange" event, but tracks the field changed)

```javascript
const watcherCallback = function (path) {
  console.log(`field with path: [${path}] changed to [${JSON.stringify(this.getEditor(path).getValue())}]`);
  // Do something
}
for (let key in editor.editors) {
  if (editor.editors.hasOwnProperty(key) && key !== 'root') {
    editor.watch(key, watcherCallback.bind(editor, key));
  }
}
```

### Enable and Disable the Editor

This lets you disable editing for the entire form or part of the form.

```js
// Disable entire form
editor.disable();

// Disable part of the form
editor.getEditor('root.location').disable();

// Enable entire form
editor.enable();

// Enable part of the form
editor.getEditor('root.location').enable();

// Check if form is currently enabled
if(editor.isEnabled()) alert("It's editable!");

// Activate part of the form
editor.activate();

// Deactivate part of the form
editor.deactivate();
```

### Destroy

This removes the editor HTML from the DOM and frees up resources.

```javascript
editor.destroy();
```

CSS Integration
----------------
JSON Editor can integrate with several popular CSS frameworks out of the box.

The currently supported themes are:

*  barebones
*  html (the default)
*  bootstrap3
*  bootstrap4
*  bootstrap5 
*  spectre
*  tailwind

Note: The following themes have NOT been updated to 2.x format and will be removed in final version unless there's someone willing to update those.
Old 1.x themes displays the message **"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"** at the bottom of the form output.

*  bootstrap2
*  foundation3
*  foundation4
*  foundation5
*  foundation6
*  jqueryui
*  materialize

The default theme is `html`, which does not rely on an external framework.
This default can be changed by setting the `JSONEditor.defaults.options.theme` variable.

If you want to specify your own styles with CSS, you can use `barebones`, which includes almost no classes or inline styles.

```javascript
JSONEditor.defaults.options.theme = 'spectre';
```

You can override this default on a per-instance basis by passing a `theme` parameter in when initializing:

```js
const editor = new JSONEditor(element,{
  schema: schema,
  theme: 'tailwind'
});
```

### Icon Libraries

JSON Editor also supports several popular icon libraries.  The icon library must be set independently of the theme, even though there is some overlap.

The supported icon libs are:

*  jqueryui
*  fontawesome3
*  fontawesome4
*  fontawesome5
*  openiconic
*  spectre
*  bootstrap

By default, no icons are used. Just like the CSS theme, you can set the icon lib globally or when initializing:

```js
// Set the global default
JSONEditor.defaults.options.iconlib = "spectre";

// Set the icon lib during initialization
const editor = new JSONEditor(element,{
  schema: schema,
  iconlib: "fontawesome4"
});
```

It's possible to create your own custom themes and/or icon libs as well.  Look at any of the existing classes for examples.


JSON Schema Support
-----------------

JSON Editor fully supports version 3 and 4 of the JSON Schema [core][core] and [validation][validation] specifications.
Some of The [hyper-schema][hyper] specification is supported as well.

[core]: http://json-schema.org/latest/json-schema-core.html
[validation]: http://json-schema.org/latest/json-schema-validation.html
[hyper]: https://json-schema.org/draft-07/json-hyper-schema-release-notes

### $ref and definitions

JSON Editor supports schema references to external URLs and local definitions as well as JSON Pointers.  Here's an example:

```json
{
  "type": "object",
  "properties": {
    "name": {
      "title": "Full Name",
      "$ref": "#/definitions/name"
    },
    "location": {
      "$ref": "http://mydomain.com/geo.json"
    },
    "birthday": {
      "$ref": "http://mydomain.com/person.json#/definitions/birthdate"
    }
  },
  "definitions": {
    "name": {
      "type": "string",
      "minLength": 5
    }
  }
}
```

Local references must point to the `definitions` object of the root node of the schema.
So, `#/customkey/name` will throw an exception.

If loading an external url via Ajax, the url must either be on the same domain or return the correct HTTP cross domain headers.
If your URLs don't meet this requirement, you can pass in the references to JSON Editor during initialization (see Usage section above).

Self-referential $refs are supported.  Check out `examples/recursive.html` for usage examples.

### hyper-schema links

The `links` keyword from the hyper-schema specification can be used to add links to related documents.

JSON Editor will use the `mediaType` property of the links to determine how best to display them.
Image, audio, and video links will display the media inline as well as providing a text link.

Here are a couple examples:

Simple text link
```js+jinja
{
  "title": "Blog Post Id",
  "type": "integer",
  "links": [
    {
      "rel": "comments",
      "href": "/posts/{{self}}/comments/",
      // Optional - set CSS classes for the link
      "class": "comment-link open-in-modal primary-text"
    }
  ]
}
```

Make link download when clicked
```js+jinja
{
  "title": "Document filename",
  "type": "string",
  "links": [
    {
      "rel": "Download File",
      "href": "/documents/{{self}}",
      // Can also set `download` to a string as per the HTML5 spec
      "download": true
    }
  ]
}
```

Show a video preview (using HTML5 video)
```js+jinja
{
  "title": "Video filename",
  "type": "string",
  "links": [
    {
      "href": "/videos/{{self}}.mp4",
      "mediaType": "video/mp4"
    }
  ]
}
```

The `href` property is a template that gets re-evaluated every time the value changes.
The variable `self` is always available.  Look at the __Dependencies__ section below for how to include other fields or use a custom template engine.

### if-then-else
The if-then-else keywords are used to express conditional validation logic based on the evaluation of a specified condition. The if keyword defines a condition, and depending on whether it evaluates to true or false, the schema specified under either the then or else keywords will be applied.

```json
{
  "type": "object",
  "properties": {
    "street_address": {
      "type": "string"
    },
    "country": {
      "type": "string",
      "default": "United States of America",
      "enum": [
        "United States of America",
        "Canada"
      ]
    },
    "postal_code": {
      "type": "string"
    }
  },
  "if": {
    "properties": {
      "country": {
        "const": "United States of America"
      }
    }
  },
  "then": {
    "properties": {
      "postal_code": {
        "pattern": "[0-9]{5}(-[0-9]{4})?"
      }
    }
  },
  "else": {
    "properties": {
      "postal_code": {
        "pattern": "[A-Z][0-9][A-Z] [0-9][A-Z][0-9]"
      }
    }
  }
}
```

### Property Ordering

There is no way to specify property ordering in JSON Schema (although this may change in v5 of the spec).

JSON Editor introduces a new keyword `propertyOrder` for this purpose.  The default property order if unspecified is 1000.  Properties with the same order will use normal JSON key ordering.

```json
{
  "type": "object",
  "properties": {
    "prop1": {
      "type": "string"
    },
    "prop2": {
      "type": "string",
      "propertyOrder": 10
    },
    "prop3": {
      "type": "string",
      "propertyOrder": 1001
    },
    "prop4": {
      "type": "string",
      "propertyOrder": 1
    }
  }
}
```

In the above example schema, `prop1` does not have an order specified, so it will default to 1000.
So, the final order of properties in the form (and in returned JSON data) will be:

1.  prop4 (order 1)
2.  prop2 (order 10)
3.  prop1 (order 1000)
4.  prop3 (order 1001)

### Default Properties

The default behavior of JSON Editor is to include all object properties defined with the `properties` keyword.

To override this behaviour, you can use the keyword `defaultProperties` to set which ones are included:

```json
{
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "age": {"type": "integer"}
  },
  "defaultProperties": ["name"]
}
```

Now, only the `name` property above will be included by default.  You can use the "Object Properties" button
to add the "age" property back in.

### format

JSON Editor supports many different formats for schemas of type `string`.  They will work with schemas of type `integer` and `number` as well, but some formats may produce weird results.
If the `enum` property is specified, `format` will be ignored.

JSON Editor uses HTML5 input types, so some of these may render as basic text input in older browsers:

*  color
*  date
*  datetime-local
*  email
*  month
*  password
*  number
*  range
*  tel
*  text
*  textarea
*  time
*  url
*  week

Here is an example that will show a color picker in browsers that support it:

```json
{
  "type": "object",
  "properties": {
    "color": {
      "type": "string",
      "format": "color"
    }
  }
}
```

#### String Editors Input Attributes

You can set custom attributes such as **placeholder**, **class** and **data-** on the input field and on the editor container
using the special options keyword `inputAttributes` and `containerAttributes`.

Like this:

```json
{
  "type": "object",
  "properties": {
    "name": {
      "title": "Full Name",
      "options": {
        "inputAttributes": {
          "placeholder":  "your name here...",
          "class": "myclass"
        },
        "containerAttributes": {
          "data-container":  "my-container",
          "class": "my-container-class"
        }
      }
    }
  }
}
```

#### Specialized String Editors

In addition to the standard HTML input formats, JSON Editor can also integrate with several 3rd party specialized editors.  These libraries are not included in JSON Editor and you must load them on the page yourself.

__SCEditor__ provides WYSIWYG editing of HTML and BBCode.  To use it, set the format to `xhtml` or `bbcode` and set the `wysiwyg` option to `true`:

```json
{
  "type": "string",
  "format": "xhtml",
  "options": {
    "wysiwyg": true
  }
}
```


__SimpleMDE__ is a simple Markdown editor with live preview.  To use it, set the format to `markdown`:

```json
{
  "type": "string",
  "format": "markdown"
}
```

To customize the editor, add the [configuration](https://github.com/sparksuite/simplemde-markdown-editor#configuration) in the `simplemde` option:

```json
{
  "type": "string",
  "format": "markdown",
  "options": {
    "simplemde": {
      "toolbar": [
        "bold",
        "italic",
        "heading",
        "|",
        "link",
        "quote",
        "|",
        "preview",
        "fullscreen",
        "guide"
      ],
      "spellChecker": false
    }
  }
}
```
      

__Ace Editor__ is a syntax highlighting source code editor. You can use it by setting the format to any of the following:

*  actionscript
*  batchfile
*  c
*  c++
*  cpp (alias for c++)
*  coffee
*  csharp
*  css
*  dart
*  django
*  ejs
*  erlang
*  golang
*  groovy
*  handlebars
*  haskell
*  haxe
*  html
*  ini
*  jade
*  java
*  javascript
*  json
*  less
*  lisp
*  lua
*  makefile
*  markdown
*  matlab
*  mysql
*  objectivec
*  pascal
*  perl
*  pgsql
*  php
*  python
*  prql
*  r
*  ruby
*  rust
*  sass
*  scala
*  scss
*  smarty
*  sql
*  stylus
*  svg
*  typescript
*  twig
*  vbscript
*  xml
*  yaml
*  zig

```json
{
  "type": "string",
  "format": "yaml"
}
```

You can use the hyper-schema keyword `media` instead of `format` too if you prefer for formats with a mime type:

```json
{
  "type": "string",
  "media": {
    "type": "text/html"
  }
}
```


You can enable [Ace editor options](https://github.com/ajaxorg/ace/wiki/Configuring-Ace) individually by setting the `options.ace` in schema.

```json
{
  "type": "string",
  "format": "sql",
  "options": {
    "ace": {
      "theme": "ace/theme/vibrant_ink",
      "tabSize": 2,
      "useSoftTabs": true,
      "wrap": true
    }
  }
}
```

### Special editors

JSONEditor features specialized types of editors.

#### Button editor

Creates a button whose click callback can be defined in `JSONEditor.defaults.callbacks`. Options:

- `icon`: Renders an icon into the button. Must be supported by the iconLib used.
- `validated`: With `true` the button is disabled until the whole editor is valid.
- `action`: the name of the callback that will be invoked when the button is clicked.

> **Warning**
> For the form to render properly all callbacks used in `action`s must also be defined in `JSONEditor.defaults.callbacks`.

```js
  JSONEditor.defaults.callbacks = {
    "button" : {
      "myAction" : function (jseditor, e) {
        alert('Button action')
      }
    }
  }
```

```json
{
  "format": "button",
  "options": {
    "button": {
      "text": "Search",
      "icon": "search",
      "action": "myAction",
      "validated": true
    }
  }
}
```

#### Info editor

Displays a label and a description text. 

```json
{
  "format": "info",
  "title": "Important:",
  "description": "Lorem ipsum dolor"
}
```

#### Booleans

The default boolean editor is a select box with options "true" and "false".  To use a checkbox instead, set the format to `checkbox`.

```json
{
  "type": "boolean",
  "format": "checkbox"
}
```

#### Arrays

The default array editor takes up a lot of screen real estate.  The `table` and `tabs` formats provide more compact UIs for editing arrays.

The `table` format works great when every array element has the same schema and is not too complex.

The `tabs` format can handle any array, but only shows one array element at a time. It has tabs on the left for switching between items.

The `tabs-top` format place tabs on the top.

Here's an example of the `table` format:

```json
{
  "type": "array",
  "format": "table",
  "items": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      }
    }
  }
}
```

For arrays of enumerated strings, you can also use the `select` or `checkbox` format.  These formats require a very specific schema to work:

```json
{
  "type": "array",
  "uniqueItems": true,
  "items": {
    "type": "string",
    "enum": ["value1","value2"]
  }
}
```

By default, the `checkbox` editor (multiple checkboxes) will be used if there are fewer than 8 enum options.  Otherwise, the `select` editor (a multiselect box) will be used.

You can override this default by passing in a format:

```json
{
  "type": "array",
  "format": "select",
  "uniqueItems": true,
  "items": {
    "type": "string",
    "enum": ["value1","value2"]
  }
}
```

#### Array events

When an array item is added, removed, moved up, moved or removed the json editor will trigger a relative event.

```javascript
editor.on('moveRow', editor => {
  console.log('moveRow', editor)
});

editor.on('addRow', editor => {
  console.log('addRow', editor)
});

editor.on('deleteRow', deletedValue => {
  console.log('deleteRow', deletedValue)
});

editor.on('deleteAllRows', deletedValues => {
  console.log('deleteAllRows', deletedValues)
});
```

Drag and drop for array item is supported. 
For array editor with format=`tabs` or `tabs-top`, dragging the tab header is enabled by default.
But for the default editor or format=`table`, dragging is enabled once by double click on the array item panel. This design avoid side-effect of draggable panel.

#### Schema loader events

When schemas are loaded via a request, the `schemaLoaded` event is triggered individually for each schema after its loading.
Once the loading of all schemas is completed, the `allSchemasLoaded` event is triggered.

```javascript
editor.on('schemaLoaded', (payload) => {
  console.log('schemasLoaded', payload.schemaUrl)
  console.log('schemasLoaded', payload.schema)
})

editor.on('allSchemasLoaded', () => {
  console.log('allSchemasLoaded')
})
```


#### Objects

The default object layout is one child editor per row.  The `grid` format will instead put multiple child editors per row.
This can make the editor much more compact, but at a cost of not guaranteeing child editor order. This format will stretch
columns to fill gaps untill all the 12 columns are filled.

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" }
  },
  "format": "grid"
}
```

The `grid-strict` format instead will respect columns sizes (no stretching) and properties order.
It introduces the new `grid-break` property to breaks the current row leaving a 4 colums gap.

```json
{
  "type": "object",
  "format": "grid-strict",
  "properties": {
    "a": {
      "title": "a",
      "type": "string",
      "options": {
        "grid_columns": 4
      }
    },
    "b": {
      "title": "b",
      "type": "string",
      "options": {
        "grid_columns": 4,
        "grid_break": true
      }
    },
    "c": {
      "title": "c",
      "type": "string",
      "options": {
        "grid_columns": 6
      }
    },
    "d": {
      "title": "d",
      "type": "string",
      "options": {
        "grid_columns": 6
      }
    }
  }
}
```


The `categories` format groups properties in top-tabbed panels, one for each object or array property plus one that groups all added or other types of properties.
Panel tabs titles came from object or array titles and for the grouping panel it defaults to "Basic", unless  `basicCategoryTitle` is defined.

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" }
  },
  "format": "categories",
  "basicCategoryTitle": "Main"
}
```

Demo page will look like this:

![Categories format](./docs/images/categoriesDemo.png)

Editor Options
----------------

Editors can accept options which alter the behavior in some way.

* `titleHidden` - If set to true, the editor title will be visually hidden
* `collapsed` - If set to true, the editor will start collapsed (works for objects and arrays)
* `disable_array_add` - If set to true, the "add row" button will be hidden (works for arrays)
* `disable_array_delete` - If set to true, all of the "delete" buttons will be hidden (works for arrays)
* `disable_array_delete_all_rows` - If set to true, just the "delete all rows" button will be hidden (works for arrays)
* `disable_array_delete_last_row` - If set to true, just the "delete last row" buttons will be hidden (works for arrays)
* `disable_array_reorder` - If set to true, the "move up/down" buttons will be hidden (works for arrays)
* `disable_collapse` - If set to true, the collapse button will be hidden (works for objects and arrays)
* `disable_edit_json` - If set to true, the Edit JSON button will be hidden (works for objects)
* `disable_properties` - If set to true, the Edit Properties button will be hidden (works for objects)
* `array_controls_top` - If set to true, array controls (add, delete etc) will be displayed at top of list (works for arrays)
* `enum` - See [Enum options](#enum-options)
* `enum_titles` - An array of display values to use for select box options in the same order as defined with the `enum` keyword. Works with schema using enum values.
* `expand_height` - If set to true, the input will auto expand/contract to fit the content.  Works best with textareas.
* `grid_columns` - Explicitly set the number of grid columns (1-12) for the editor if it's within an object using a grid layout.
* `hidden` - If set to true, the editor will not appear in the UI (works for all types)
* `input_height` - Explicitly set the height of the input element. Should be a valid CSS width string (e.g. "100px").  Works best with textareas.
* `input_width` - Explicitly set the width of the input element. Should be a valid CSS width string (e.g. "100px").  Works for string, number, and integer data types.
* `remove_empty_properties` - If set to true for an object, empty object properties (i.e. those with falsy values) will not be returned by getValue().
* `has_placeholder_option` - If set to true, a placeholder option will be added to the select editor input.
* `placeholder_option_text` - Text displayed in select placeholder option.

```json
{
  "type": "object",
  "options": {
    "collapsed": true
  },
  "properties": {
    "name": {
      "type": "string"
    }
  }
}
```

You can globally set the default options too if you want:

```js
JSONEditor.defaults.editors.object.options.collapsed = true;
```
InfoText
------------------
Using the option `infoText`, will create a info button, displaying the text you set, on hovering.

```json
{
  "type": "string",
  "title": "Name",
  "options": {
    "infoText": "Your full name"
  }
}
```

Enum options
------------------

Using the option `enum`, it is possible to modify how enums with format `checkbox` (default) are displayed in the editor.
It is an array of objects (described below), which must be in the same order as defined with the `enum` keyword.

Currently, the following is supported:

* `title`: *Optional* Display value shown instead of the enum value
* `infoText`: *Optional* Creates an info button next to the title, displaying the text you set, on hovering.

It is possible also to set these options only for some enum values, to skip one enum value, define an empty object (`{}`).

```json
{
  "type": "array",
  "items": {
    "type": "string",
    "enum": ["1", "2", "3", "4"],
    "options": {
      "enum": [
        {},
        {
          "title": "Title 2"
        },
        { "infoText": "InfoText 3" },
        {
          "title": "Title 4",
          "infoText": "InfoText 4"
        }
      ]
    }
  }
}
```

If both options `enum_titles[x]` and `enum[x].title` are set for the enum value `x`, than the title set under `enum[x].title` will be used.

Dependencies
------------------
Sometimes, it's necessary to have one field's value depend on another's.

The dependency information is fetched from the dependencies field in the options field of the control. The `dependencies` field should be a map where the keys are the names of the fields depended on and the value is the expected value. The value may be an array to indicate multiple value possibilities. This uses the internal field value watch system to notify fields of changes in their dependencies.

Here's an example schema:

```json
{
  "title": "An object",
  "type": "object",
  "properties": {
    "fieldOne": {
      "title": "I should be changed to 'foo'",
      "type": "string",
      "enum": ["foo","bar"],
      "default": "bar"
    },
    "depender1": {
      "title": "I depend on fieldOne to be 'foo'",
      "type": "string",
      "enum": ["lorem","ipsum"],
      "options": {
        "dependencies": {
          "fieldOne": "foo"
        }
      }
    },
    "depender2": {
      "title": "I depend on fieldOne to be 'bar'",
      "type": "string",
      "enum": ["dolor", "sit"],
      "options": {
        "dependencies": {
          "fieldOne": "bar"
        }
      }
    }
  }
}
```

Keys can also be an absolute path like `root.property.nested_property` 
 
```json
{
    "title": "Person",
    "type": "object",
    "required": [
      "gender"
    ],
    "properties": {
      "gender": {
        "title": "Gender",
        "type": "string",
        "enum": [
          "female",
          "male"
        ]
      },
      "age": {
        "type": "object",
        "properties": {
          "maleSpecificAge": {
            "type": "string",
            "title": "Male specific age question?",
            "options": {
              "dependencies": {
                "root.gender": "male"
              }
            }
          },
          "femaleSpecificAge": {
            "type": "string",
            "title": "Female specific age question?",
            "options": {
              "dependencies": {
                "root.gender": "female"
              }
            }
          }
        }
      }
    }
  }
```

The `dependencies` keyword from the JSON Schema specification is not nearly flexible enough to handle most use cases,
so JSON Editor introduces a couple custom keywords that help in this regard.

The first step is to have a field "watch" other fields for changes.

```json
{
  "type": "object",
  "properties": {
    "first_name": {
      "type": "string"
    },
    "last_name": {
      "type": "string"
    },
    "full_name": {
      "type": "string",
      "watch": {
        "fname": "first_name",
        "lname": "last_name"
      }
    }
  }
}
```

The keyword `watch` tells JSON Editor which fields to watch for changes.

The keys (`fname` and `lname` in this example) are alphanumeric aliases for the fields.

The values (`first_name` and `last_name`) are paths to the fields.  To access nested properties of objects, use a dot for separation (e.g. "path.to.field").

By default paths are from the root of the schema, but you can make the paths relative to any ancestor node with a schema `id` defined as well.  This is especially useful within arrays.  Here's an example:

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "id": "arr_item",
    "properties": {
      "first_name": {
        "type": "string"
      },
      "last_name": {
        "type": "string"
      },
      "full_name": {
        "type": "string",
        "watch": {
          "fname": "arr_item.first_name",
          "lname": "arr_item.last_name"
        }
      }
    }
  }
}
```

Now, the `full_name` field in each array element will watch the `first_name` and `last_name` fields within the same array element.

### Templates

Watching fields by itself doesn't do anything.  For the example above, you need to tell JSON Editor that `full_name` should be `fname [space] lname`.
JSON Editor uses a javascript template engine to accomplish this.  A barebones template engine is included by default (simple `{{variable}}` replacement only), but many of the most popular template engines are also supported:

*  ejs
*  handlebars
*  hogan
*  markup
*  mustache
*  swig
*  underscore >=1.7 (since 1.4.0, see also [#332](https://github.com/json-editor/json-editor/pull/332))

You can change the default by setting `JSONEditor.defaults.options.template` to one of the supported template engines:

```javascript
JSONEditor.defaults.options.template = 'handlebars';
```

You can set the template engine on a per-instance basis as well:

```js
const editor = new JSONEditor(element,{
  schema: schema,
  template: 'hogan'
});
```

Here is the completed `full_name` example using the default barebones template engine:

```js+jinja
{
  "type": "object",
  "properties": {
    "first_name": {
      "type": "string"
    },
    "last_name": {
      "type": "string"
    },
    "full_name": {
      "type": "string",
      "template": "{{fname}} {{lname}}",
      "watch": {
        "fname": "first_name",
        "lname": "last_name"
      }
    }
  }
}
```

It is also possible to set the "template" property to a JavaScript callback function, defined under `window.JSONEditor.defaults.callbacks.template`. Inside the JavaScript callback, you have access to all the variables defined under the `watch` property + the current editor.


Example Schema:
```js+jinja
{
  "type": "object",
  "properties": {
    "first_name": {
      "type": "string"
    },
    "last_name": {
      "type": "string"
    },
    "full_name": {
      "type": "string",
      "template": "callbackFunction",
      "watch": {
        "fname": "first_name",
        "lname": "last_name"
      }
    }
  }
}
```
 Example Callback function:
```js+jinja
window.JSONEditor.defaults.callbacks.template = {
  "callbackFunction": (jseditor,e) => {
    return e.fname + " " + e.lname;
  }
};
```

### Enum Values

Another common dependency is a drop down menu whose possible values depend on other fields.  Here's an example:

```json
{
  "type": "object",
  "properties": {
    "possible_colors": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "primary_color": {
      "type": "string"
    }
  }
}
```

Let's say you want to force `primary_color` to be one of colors in the `possible_colors` array.  First, we must tell the `primary_color` field to watch the `possible_colors` array.

```json
{
  "primary_color": {
    "type": "string",
    "watch": {
      "colors": "possible_colors"
    }
  }
}
```

Then, we use the special keyword `enumSource` to tell JSON Editor that we want to use this field to populate a drop down.

```json
{
  "primary_color": {
    "type": "string",
    "watch": {
      "colors": "possible_colors"
    },
    "enumSource": "colors"
  }
}
```

Now, anytime the `possible_colors` array changes, the dropdown's values will be changed as well.

This is the most basic usage of `enumSource`.  The more verbose form of this property supports
filtering, pulling from multiple sources, constant values, etc..
Here's a more complex example (this uses the Swig template engine syntax to show some advanced features)

```js+jinja
{
  // An array of sources
  "enumSource": [
    // Constant values
    ["none"],
    {
      // A watched field source
      "source": "colors",
      // Use a subset of the array
      "slice": [2,5],
      // Filter items with a template (if this renders to an empty string, it won't be included)
      "filter": "{% if item !== 'black' %}1{% endif %}",
      // Specify the display text for the enum option
      "title": "{{item|upper}}",
      // Specify the value property for the enum option
      "value": "{{item|trim}}"
    },
    // Another constant value at the end of the list
    ["transparent"]
  ]
}
```

You can also specify a list of static items with a slightly different syntax:

```js+jinja
{
  "enumSource": [{
      // A watched field source
      "source": [
        {
          "value": 1,
          "title": "One"
        },
        {
          "value": 2,
          "title": "Two"
        }
      ],
      "title": "{{item.title}}",
      "value": "{{item.value}}"
    }]
  ]
}
```

The colors examples used an array of strings directly.  Using the verbose form, you can
also make it work with an array of objects.  Here's an example:

```js+jinja
{
  "type": "object",
  "properties": {
    "possible_colors": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "text": {
            "type": "string"
          }
        }
      }
    },
    "primary_color": {
      "type": "string",
      "watch": {
        "colors": "possible_colors"
      },
      "enumSource": [{
        "source": "colors",
        "value": "{{item.text}}"
      }]
    }
  }
}
```

All of the optional templates in the verbose form have the properties `item` and `i` passed into them. `item` refers to the array element.  `i` is the zero-based index.

#### JavaScript callbacks
It is also possible to use JavaScript callback functions instead of templates for the enumSource properties properties: `value`, `title` and `filter`.

**Example Schema:**
````json
{
  "type": "object",
  "properties": {
    "possible_colors": {
      "type": "array",
      "format": "table",
      "items": {
        "type": "object",
        "properties": {
          "text": {
            "type": "string"
          }
        }
      }
    },
    "primary_color": {
      "type": "string",
      "watch": {
        "colors": "possible_colors"
      },
      "enumSource": [{
        "source": "colors",
        "filter": "enumFilterCB",
        "title": "enumTitleCB",
        "value": "enumValueCB"
      }]
    }
  }
}
````

**Example JavaScript callbacks:**
````javascript
window.JSONEditor.defaults.callbacks.template = {
  "enumFilterCB": (jseditor, e) => {
    if (e.item.text.toLowerCase() == 'red') return ""; // "red" is not allowed
    return e.item.text;
  },
  "enumTitleCB": (jseditor, e) => e.item.text.toUpperCase(),
  "enumValueCB": (jseditor, e) => e.item.text.toLowerCase()
};
````

#### Sorting

To sort the dynamic EnumSource, you can set the EnumSource property `sort` to either `asc` or `desc`.


### Dynamic Headers

The `title` keyword of a schema is used to add user friendly headers to the editing UI.  Sometimes though, dynamic headers, which change based on other fields, are helpful.

Consider the example of an array of children.  Without dynamic headers, the UI for the array elements would show `Child 1`, `Child 2`, etc..
It would be much nicer if the headers could be dynamic and incorporate information about the children, such as `1 - John (age 9)`, `2 - Sarah (age 11)`.

To accomplish this, use the `headerTemplate` property.  All of the watched variables are passed into this template, along with the static title `title` (e.g. "Child"), the 0-based index `i0` (e.g. "0" and "1"), the 1-based index `i1`, extra child variable `properties.${PROPERTY_NAME}.enumTitle` and the field's value `self` (e.g. `{"name": "John", "age": 9}`).

```js+jinja
{
  "type": "array",
  "title": "Children",
  "items": {
    "type": "object",
    "title": "Child",
    "headerTemplate": "{{ i1 }} - {{ self.name }} (age {{ self.age }})  has a {{ properties.pet.enumTitle }}",
    "properties": {
      "name": { "type": "string" },
      "age": { "type": "integer" },
      "pet": {
          "title": "Pet",
          "type": "string",
          "enum": [ "pet_1", "pet_2" ],
          "options": {
            "enum_titles": [ "Dog", "Cat" ]
          }
        }
    }
  }
}
```

### Custom Template Engines

If one of the included template engines isn't sufficient,
you can use any custom template engine with a `compile` method.  For example:

```js
const myengine = {
  compile: template =>
    // Compile should return a render function
    vars => {
      // A real template engine would render the template here
      const result = template;
      return result;
    }
};

// Set globally
JSONEditor.defaults.options.template = myengine;

// Set on a per-instance basis
const editor = new JSONEditor(element,{
  schema: schema,
  template: myengine
});
```

Language and String Customization
-----------------

JSON Editor uses a translate function to generate strings in the UI.  A default `en` language mapping is provided.

You can easily override individual translations in the default language or create your own language mapping entirely.

```js+jinja
// Override a specific translation
JSONEditor.defaults.languages.en.error_minLength =
  "This better be at least {{0}} characters long or else!";


// Create your own language mapping
// Any keys not defined here will fall back to the "en" language
JSONEditor.defaults.languages.es = {
  error_notset: "propiedad debe existir"
};
```

By default, all instances of JSON Editor will use the `en` language.  To override this default, set the `JSONEditor.defaults.language` property.

```js
JSONEditor.defaults.language = "es";
```

You can also override translations per editor in the it's schema options.

````json
"error_const": {
  "type": "string",
  "title": "error_const",
  "const": "test",
  "default": "something else",
  "options": {
    "error_messages": {
      "en": {
        "error_const": "CUSTOM EN: Value must be the constant value"
      },
      "es": {
        "error_const": "CUSTOM ES: Value must be the constant value"
      }
    }
  }
}
````


Button Customization
-----------------

All buttons have classnames in the format `json-editor-btntype-*`. Using these classnames you can choose if the button should have icon or label hidden. The icon is wrapped in an `I` tag, the label is wrapped in a `SPAN` tag.

Examples:

Hide the icon on "Object Properties" button:
```css
.json-editor-btntype-properties i {
  display: none;
}
```

Hide the text on "Object Properties" button:
```css
.json-editor-btntype-properties span {
  display: none;
}
```

Custom Editor Interfaces
-----------------

JSON Editor contains editor interfaces for each of the primitive JSON types as well as a few other specialized ones.

You can add custom editors interfaces fairly easily.  Look at any of the existing ones for an example.

JSON Editor uses resolver functions to determine which editor interface to use for a particular schema or subschema.

Let's say you make a custom `location` editor for editing geo data.  You can add a resolver function to use this custom editor when appropriate. For example:

```js
// Add a resolver function to the beginning of the resolver list
// This will make it run before any other ones
JSONEditor.defaults.resolvers.unshift(schema => {
  if(schema.type === "object" && schema.format === "location") {
    return "location";
  }

  // If no valid editor is returned, the next resolver function will be used
});
```

The following schema will now use this custom editor for each of the array elements instead of the default `object` editor.

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "format": "location",
    "properties": {
      "longitude": {
        "type": "number"
      },
      "latitude": {
        "type": "number"
      }
    }
  }
}
```

If you create a custom editor interface that you think could be helpful to others, submit a pull request!

The possibilities are endless.  Some ideas:

*  A compact way to edit objects
*  Radio button version of the `select` editor
*  Autosuggest for strings (like enum, but not restricted to those values)
*  Better editor for arrays of strings (tag editor)
*  Canvas based image editor that produces Base64 data URLs

Custom Validation
----------------

JSON Editor provides a hook into the validation engine for adding your own custom validation.

Let's say you want to force all schemas with `format` set to `date` to match the pattern `YYYY-MM-DD`.

```js
// Custom validators must return an array of errors or an empty array if valid
JSONEditor.defaults.custom_validators.push((schema, value, path) => {
  const errors = [];
  if (schema.format==="date") {
    if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) {
      // Errors must be an object with `path`, `property`, and `message`
      errors.push({
        path: path,
        property: 'format',
        message: 'Dates must be in the format "YYYY-MM-DD"'
      });
    }
  }
  return errors;
});
```

Override Editors Methods
----------------

```js
// override class method
JSONEditor.defaults.editors.integer.prototype.sanitize = function(value) {
  return value
}; 
```

or

```js
// override object method
var path ="root.integerfield";
editor.getEditor(path).sanitize = function(value) {
  return value
};
```

Support Legacy Browser (not tested)
----------------------

JSON Editor can be used with browsers that support ES5, but in order to use it with older browsers such as IE, it is necessary to use "core-js" as a polyfill.

```
<script src="https://unpkg.com/core-js-bundle@latest/minified.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@json-editor/json-editor@latest/dist/jsoneditor.min.js"></script>
```
