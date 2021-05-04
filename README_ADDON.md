## Base type editors

### Hidden
**Description**
Base editor class for hidden values.

**Trigger:** ``"type": "hidden"``<br>
**Supported Types:** N/A<br>
**Global options:** N/A<br>
**Schema options:** N/A<br>
**Options callback** N/A<br>
**Required options:**  none<br>
**Source:** src/editors/hidden.js
<br>

### Integer
**Description**
Base editor class for integer values.

**Trigger:** ``"type": "integer"``<br>
**Supported Types:** N/A<br>
**Global options:** N/A<br>
**Schema options:** N/A<br>
**Options callback** N/A<br>
**Required options:**  none<br>
**Source:** src/editors/integer.js
<br>

### Number
**Description**
Base editor class for numeric values.

**Trigger:** ``"type": "number"``<br>
**Supported Types:** N/A<br>
**Global options:** N/A<br>
**Schema options:** N/A<br>
**Options callback** N/A<br>
**Required options:**  none<br>
**Source:** src/editors/number.js
<br>

### String
**Description**
Base editor class for string values.

**Trigger:** ``"type": "string"``<br>
**Supported Types:** N/A<br>
**Global options:** N/A<br>
**Schema options:** N/A<br>
**Options callback** N/A<br>
**Required options:**  none<br>
**Source:** src/editors/string.js
<br>

## Special format editors

### ACE
**Description**
Ace is an embeddable code editor written in JavaScript. It matches the features and performance of native editors such as Sublime, Vim and TextMate.<br>
For configuration options, see the [ACE homepage](https://ace.c9.io/://).

**Triggers:** <details><summary>Click to expand!</summary>
``"format": "actionscript"``<br>
``"format": "batchfile"``<br>
``"format": "c"``<br>
``"format": "c++"``<br>
``"format": "cpp"``<br>
``"format": "coffee"``<br>
``"format": "csharp"``<br>
``"format": "css"``<br>
``"format": "dart"``<br>
``"format": "django"``<br>
``"format": "ejs"``<br>
``"format": "erlang"``<br>
``"format": "golang"``<br>
``"format": "groovy"``<br>
``"format": "handlebars"``<br>
``"format": "haskell"``<br>
``"format": "haxe"``<br>
``"format": "html"``<br>
``"format": "ini"``<br>
``"format": "jade"``<br>
``"format": "java"``<br>
``"format": "javascript"``<br>
``"format": "json"``<br>
``"format": "less"``<br>
``"format": "lisp"``<br>
``"format": "lua"``<br>
``"format": "makefile"``<br>
``"format": "matlab"``<br>
``"format": "mysql"``<br>
``"format": "objectivec"``<br>
``"format": "pascal"``<br>
``"format": "perl"``<br>
``"format": "pgsql"``<br>
``"format": "php"``<br>
``"format": "python"``<br>
``"format": "r"``<br>
``"format": "ruby"``<br>
``"format": "sass"``<br>
``"format": "scala"``<br>
``"format": "scss"``<br>
``"format": "smarty"``<br>
``"format": "sql"``<br>
``"format": "sqlserver"``<br>
``"format": "stylus"``<br>
``"format": "svg"``<br>
``"format": "twig"``<br>
``"format": "vbscript"``<br>
``"format": "xml"``<br>
``"format": "yaml"
</details>

**Supported Types:** string<br>
**Global options:** ``JSONEditor.defaults.options.ace``<br>
**Schema options:** ``options.ace``<br>
**Options callback** ``JSONEditor.defaults.callbacks.ace``<br>
**Required options:** none<br>
**Source:** src/editors/ace.js

*Note: if you use a CDN version of the ACE library, you need to set the ACE ``basePath`` variable to the path of the CDN library. You can do it like this. (Tested with jsdelivr.net)*
````javascript
var aceScript = document.querySelector('script[src*="ace-builds"]');
if (aceScript.src && window.ace) {
  window.ace.config.set('basePath', aceScript.src.replace(/(.*\/)[^\/]+$/g, "$1"));
}
````
<br>

### Autocomplete
**Description**
Accessible autocomplete component for vanilla JavaScript.<br>
For configuration options, see the [Autocomplete homepage](https://autocomplete.trevoreyre.com/#/javascript-component).

**Trigger:** ``"format": "autocomplete"``<br>
**Supported Types:** string<br>
**Global options:** ``JSONEditor.defaults.options.autocomplete``<br>
**Schema options:** ``options.autocomplete``<br>
**Options callback** ``JSONEditor.defaults.callbacks.autocomplete``<br>
**Required options:** ``search`` (callback)<br>
**Source:** src/editors/autocomplete.js
<br>

#### Example

Javascript

```
window.JSONEditor.defaults.callbacks = {
    "autocomplete": {
        // This is callback functions for the "autocomplete" editor
        // In the schema you refer to the callback function by key
        // Note: 1st parameter in callback is ALWAYS a reference to the current editor.
        // So you need to add a variable to the callback to hold this (like the
        // "jseditor_editor" variable in the examples below.)

        // Setup API calls
        "search_za": function search(jseditor_editor, input) {
            var url = '/eiao/api/json-object?filter[or][][data_json][LIKE]=' + encodeURI(input) +'&filter[or][][uuid][LIKE]=' + encodeURI(input);;

            return new Promise(function (resolve) {
                if (input.length < 2) {
                    return resolve([]);
                }

                fetch(url).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    resolve(data);
                });
            });
        },
        "renderResult_za": function(jseditor_editor, result, props) {
            return ['<li ' + props + '>',
                '<div class="eiao-object-title">' + result.data_json + '</div>',
                '<div class="eiao-object-snippet">' + result.uuid.substring(0,7) + ' <small>' + result.schema_uuid.substring(0,5) + '<small></div>',
                '</li>'].join('');
        },
        "getResultValue_za": function getResultValue(jseditor_editor, result) {
            return result.uuid;
        }
    }
};
```

JSON-schema

```json
{
    "items": {
        "title": "UUID",
        "type": "string",
        "description": "reference (autocomplete)",
        "format": "autocomplete",
        "options": {
            "autocomplete": {
                "search": "search_za",
                "getResultValue": "getResultValue_za",
                "renderResult": "renderResult_za",
                "autoSelect": true
            }
        }
    },
    "title": "Project references",
    "type": "array"
}
```

### Checkbox
**Description**
Checkbox format.

**Trigger:** ``"format": "checkbox"`` + enum<br>
**Supported Types:** string, integer, number, boolean<br>
**Global options:** N/A<br>
**Schema options:** N/A<br>
**Options callback** N/A<br>
**Required options:** none<br>
**Source:** src/editors/checkbox.js
<br>

### Cleave
**Description**
Format your &lt;input/&gt; content when you are typing.
* Credit card number formatting
* Phone number formatting
* Date formatting
* Numeral formatting
* Custom delimiter, prefix and blocks pattern

For configuration options, see the [Cleave homepage](https://nosir.github.io/cleave.js/).

**Trigger:** ``options.cleave``<br>
**Supported Types:** string, number, integer, boolean<br>
**Global options:** ``JSONEditor.defaults.options.cleave``<br>
**Schema options:** ``options.cleave``<br>
**Options callback** ``JSONEditor.defaults.callbacks.cleave``<br>
**Required options:** none<br>
**Source:** src/editors/string.js
<br>

### IMask
**Description**
Javascript input mask.

For configuration options, see the [IMask homepage](https://imask.js.org/).

**Trigger:** ``options.imask<br>
**Supported Types:** string, number, integer, boolean<br>
**Global options:** ``JSONEditor.defaults.options.imask``<br>
**Schema options:** ``options.imask``<br>
**Options callback** ``JSONEditor.defaults.callbacks.imask``<br>
**Required options:** none<br>
**Special options:** ``returnUnmasked`` when true, returns the unmasked value<br>
**Source:** src/editors/string.js

IMask configuration format is not "JSON friendly" as it is possible to set the mask to an object ("Date", "Number", "IMask.MaskedEnum" and "IMask.MaskedRange") or a regular expression. In order for those to work, you will have to enclose them in quotes. And for regular expressions, you will also have to prefix the quoted regular expression with the keyword "regex:"


Example of an iMask mask config:
````javascript
  mask: [
    {
      mask: 'RGB,RGB,RGB',
      blocks: {
        RGB: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 255
        }
      }
    },
    {
      mask: /^#[0-9a-f]{0,6}$/i
    }
  ]
````
The same config "converted" to JSON-Editor format:

````javascript
  "mask": [{
    "mask": "RGB,RGB,RGB",
    "blocks": {
      "RGB": {
        "mask": "IMask.MaskedRange",
        "from": 0,
        "to": 255
      }
    }
  },
    {
      "mask": "regex:/^#[0-9a-f]{0,6}$/i"
    }]
````


<br>

### Flatpickr
**Description**
Lightweight and powerful datetime picker.<br>
For configuration options, see the [Flatpickr homepage](https://flatpickr.js.org/).

**Trigger:** ``"format": "datetime-local"``, ``"format": "date"`` or ``"format": "time"``<br>
**Supported Types:** string, integer<br>
**Global options:** ``JSONEditor.defaults.options.flatpickr<br>
**Schema options:** ``options.flatpickr<br>
**Options callback** ``JSONEditor.defaults.callbacks.flatpickr<br>
**Required options:** none<br>
**Source:** src/editors/datetime.js
<br>

### Jodit
**Description**
An excellent WYSIWYG editor written in pure TypeScript without the use of additional libraries.<br>
For configuration options, see the [Jodit homepage](https://xdsoft.net/jodit/).

**Trigger:** ``"format": "jodit"``<br>
**Supported Types:** string<br>
**Global options:** ``JSONEditor.defaults.options.jodit``<br>
**Schema options:** ``options.jodit``<br>
**Options callback** ``JSONEditor.defaults.callbacks.jodit``<br>
**Required options:** none<br>
**Source:** src/editors/jodit.js
<br>

### SCEditor
**Description**
A lightweight, open source, WYSIWYG BBCode and (X)HTML editor.<br>
For configuration options, see the [SCEditor homepage](https://www.sceditor.com/).

**Triggers:** ``"format": "xhtml"`` or ``"format": "bbcode"``<br>
**Supported Types:** string<br>
**Global options:** ``JSONEditor.defaults.options.sceditor``<br>
**Schema options:** ``options.sceditor``<br>
**Options callback** ``JSONEditor.defaults.callbacks.sceditor``<br>
**Required options:**  none<br>
**Source:** src/editors/sceditor.js
<br>

### Select2
**Description**
Select2 gives you a customizable select box with support for searching, tagging, remote data sets, infinite scrolling, and many other highly used options.<br>
For configuration options, see the [Select2 homepage](https://select2.org/).

**Trigger:** ``"format": "select2"``<br>
**Supported Types:** string, number, integer, boolean (using enum)<br>
**Global options:** ``JSONEditor.defaults.options.select2``<br>
**Schema options:** ``options.select2``<br>
**Options callback** ``JSONEditor.defaults.callbacks.select2``<br>
**Required options:**  none<br>
**Source:** src/editors/select2.js and src/editors/array/select2.js
<br>

### Selectize
**Description**
Selectize is the hybrid of a textbox and &lt;select&gt; box. It's jQuery-based and it's useful for tagging, contact lists, country selectors, and so on..<br>
For configuration options, see the [Selectize homepage](https://selectize.github.io/selectize.js/).

**Trigger:** ``"format": "selectize"``<br>
**Supported Types:** string, number, integer, boolean (using enum)<br>
**Global options:** ``JSONEditor.defaults.options.selectize``<br>
**Schema options:** ``options.selectize``<br>
**Options callback** ``JSONEditor.defaults.callbacks.selectize``<br>
**Required options:**  none<br>
**Source:** src/editors/selectize.js and src/editors/array/selectize.js
<br>

### SimpleMDE
**Description**
SimpleMDE is a simple, embeddable, and beautiful JS markdown editor.<br>
For configuration options, see the [SimpleMDE homepage](https://simplemde.com/).

**Trigger:** ``"format": "markdown"``<br>
**Supported Types:** string<br>
**Global options:** ``JSONEditor.defaults.options.simplemde``<br>
**Schema options:** ``options.simplemde``<br>
**Options callback** ``JSONEditor.defaults.callbacks.simplemde``<br>
**Required options:**  none<br>
**Special options:** ``autorefresh`` when true, fixes problem with Chrome and editor inside Tabs<br>
**Source:** src/editors/simplemde.js
<br>

### Starrating
**Description**
Star based rating.

**Trigger:** ``"format": "rating"``<br>
**Supported Types:** string, integer<br>
**Global options:** ``JSONEditor.defaults.options.rating<br>
**Schema options:** ``options.rating<br>
**Options callback** N/A<br>
**Required options:**  none<br>
**Source:** src/editors/starrating.js
<br>

### Upload
**Description**
Upload files to server.

**Trigger:** ``"format": "upload"``<br>
**Supported Types:** string<br>
**Global options:** ``JSONEditor.defaults.options.upload<br>
**Schema options:** ``options.upload<br>
**Options callback** ``JSONEditor.defaults.callbacks.upload<br>
**Required options:**  ``upload_handler``<br>
**Source:** src/editors/upload.js
<br>


| Option          | Type | Description | Default value  |
|--|--|--|--|
| title            | string       | Title of the Browse button                                                         | "Browse"
| auto_upload      | boolean      | Trigger file upload button automatically                                           | false
| allow_reupload   | boolean      | Allow reupload of file (overrides the readonly state)                              | false
| hide_input       | boolean      | Hide the Browse button and name display (Only works if 'enable_drag_drop' is true) | false
| enable_drag_drop | boolean      | Enable Drag&Drop uploading.                                                        | false
| drop_zone_top    | boolean      | Position of dropzone. **true**=before button input, **false**=after button input   | false
| drop_zone_text   | string       | Text displayed in dropzone box                                                     | "Drag & Drop file here"
| alt_drop_zone    | string       | Alternate DropZone DOM Selector (Can be created inside another property)           |
| mime_type        | string/array | If set, restrict upload to mime type(s)                                            |
| max_upload_size  | integer      | Maximum file size allowed. 0 = no limit                                            | 0
| upload_handler   | function     | Callback function for handling uploads to server                                   |
<br>


### UUID
**Description**
UUID format with autogenerated uuid value. Value must be a valid [RFC 4122](https://www.ietf.org/rfc/rfc4122.txt) uuid (Universally Unique IDentifier). If field has no initial value (startval) then a random uuid will be autogenerated.

**Trigger:** ``"format": "uuid"``<br>
**Supported Types:** string<br>
**Global options:** N/A<br>
**Schema options:** N/A<br>
**Options callback** N/A<br>
**Required options:**  none<br>
**Source:** src/editors/uuid.js
<br>

### Picker
**Description**
Optional support for color format using vanilla JS color picker with alpha selection. 

**Trigger:** ``"format": "color"``<br>
**Supported Types:** string<br>
**Global options:** JSONEditor.defaults.options.colorpicker<br>
**Schema options:** options.colorpicker<br>
**Options callback** JSONEditor.defaults.callbacks.colorpicker<br>
**Required options:**  none<br>
**Source:** src/editors/colorpicker.js
<br>

## Non-Active editors (Editors that return no results)

### Button
**Description**
The Button editor is a special editor that doesn't return any results. It can be used to trigger various JavaScript features, such as a Submit button.

**Trigger:** ``"type": "button"``<br>
**Supported Types:** N/A<br>
**Global options:** N/A<br>
**Schema options:** text, action, icon, validated<br>
**Options callback** window.JSONEditor.defaults.callbacks.button<br>
**Required options:** action<br>
**Source:** src/editors/button.js
<br>

### Info
**Description**
The Info editor is a special editor that doesn't return any results. It can be used to insert textual blocks inside the form.
Only properties available are title and description (bodytext).

**Trigger:** ``"type": "info"``<br>
**Supported Types:** N/A<br>
**Global options:** N/A<br>
**Schema options:**  N/A<br>
**Options callback** N/A<br>
**Required options:**  none<br>
**Source:** src/editors/info.js
<br>


## Option callback functions
The JSON Schema format doesn't support function values, but some 3rd-Party libraries has callback functions as options.
To enable/use those type of options, you can create global callback functions and then refer to then by name in the schema options.

*Note: The 1st parameter passed to the callback function is ALWAYS the current edtor instance. So you need to modify the callback functions to accommodate this.*

### Example option callback for Cleave.js
<details><summary>Click to expand!</summary>
This example defines a callback function named "showCreditCardType" and shows how it is used inside the schema options.

**JavaScript:**
````javascript
// Add Cleave.js options namespace to Global callback list
window.JSONEditor.defaults.callbacks.cleave = {
  // 1st parameter in callback is ALWAYS a reference to current editor instance.
  "showCreditCardType": function(jseditor_editor, type) {
    var el = jseditor_editor.element.nextSibling;
    if (el) el.innerHTML = 'Card type: <strong>' + type + '</strong>';
  }
};
````
**Schema:**
````json
{
  "type": "object",
  "properties": {
    "creditcard": {
      "type": "string",
      "title": "Credit Card",
      "description": " ",
      "options": {
        "inputAttributes": {
          "placeholder": "enter credit card number"
        },
        "cleave": {
          "creditCard": true,
          "onCreditCardTypeChanged": "showCreditCardType"
        }
      }
    }
  }
}
````
</details>

<br>



# Themes

Themes have own options for changing various aspects of the display.

## Bootstrap 4

| Option           | Default | Description
| ------------- | ------ | -----
| `input_size`    | `normal` | Changes `input` size, can be `normal`, `small` or `large`
| `custom_forms`  | `false` | Apply Bootstrap custom forms
| `object_indent`  | `true` | Indent nested object elements (use nested `.card` layout)
| `object_background`  | `bg-light` | Bootstrap 4 card background [modifier class](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
| `object_text`  | `''` | Bootstrap 4 card text color modifier class [modifier class](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
| `table_border`  | `false` | Add border to array "table" row and cells
| `table_zebrastyle`  | `false` | Add "zebra style" to array "table" rows
| `tooltip`  | `bootstrap` | how to display tooltips (infoText). Can be `browser` for native `[title]`, `css` for simple CSS Styling, or `bootstrap` for TWBS/Popper.js handling

## Spectre

| Option           | Default | Description
| ------------- | ------ | -----
| `input_size`    | `normal` | Changes `input` size, can be `normal`, `small` or `large`
| `label_bold`  | `true` | Labels in bold
| `object_indent`  | `false` | Indent nested object elements
| `object_border`  | `false` |Add border around object elements
| `align_bottom`  | `false` | Align elements to bottom of flex container
| `table_border`  | `false` | Add border to array "table" row and cells
| `table_zebrastyle`  | `false` | Add "zebra style" to array "table" rows

## Tailwind

| Option           | Default | Description
| ------------- | ------ | -----
| `input_size`    | `normal` | Changes `input` size, can be `normal`, `small` or `large`
| `label_bold`  | `false` | Labels in bold
| `object_panel_default`    | `true` | Indicates whether to use rules as default or alternate style
| `object_indent`  | `false` | Indent nested object elements
| `object_border`  | `false` |Add border around object elements
| `align_bottom`  | `false` | Align elements to bottom of flex container
| `table_border`  | `false` | Add border to array "table" row and cells
| `table_hdiv`  | `false` | Add bottom-border to array "table" cells
| `table_zebrastyle`  | `false` | Add "zebra style" to array "table" rows
