# Webpack

## Refactoring Issues

### Editors

#### JSONEditor.defaults

The base class editor had a dependency on the `translate` and `callbacks` properties of `JSONEditor.defaults`.

Aditionally, all  editors had a single dependency on `JSONEditor` via the `.defaults.options` property, accessed in the `build()` or `afterInputReady()` method. In each case, these options are merged with the user options using a virtually identical formula. Would it be worth looking at creating a base class helper method for this merge, to keep things DRY?.

For now I have passed in `JSONEditor.defaults` as `defaults`.



#### MultipleEditor validator
Aditionally, MultipleEditor needs to create an instance of the Validator class (not sure why only that editor)

## TODO

## Source Files

```javascript
{
          // License & version info, start the containing closure
          'src/intro.js',  // Remove

          // Simple inheritance
          'src/class.js',   // Done

          // IE9 polyfills
          'src/ie9.js',     // Need to check this one

          // Utils like extend, each, and trigger
          'src/utilities.js',   // Done

          // The main JSONEditor class
          'src/core.js',    // Done

          // JSON Schema validator
          'src/validators/*.js',    // Done
          'src/validator.js',       // Done

          // All the editors
          'src/editor.js', // Done          
          'src/editors/null.js', // Done
          'src/editors/string.js', // Done
          'src/editors/hidden.js', // Done
          'src/editors/number.js', // Done
          'src/editors/integer.js', // Done
          'src/editors/rating.js', // Done
          'src/editors/object.js', // Done
          'src/editors/array.js', // Done
          'src/editors/table.js', // Done
          'src/editors/multiple.js', // Done
          'src/editors/enum.js', // Done
          'src/editors/select.js', // Done
          'src/editors/choices.js', // Done
          'src/editors/selectize.js', // Done
          'src/editors/multiselect.js', // Done
          'src/editors/base64.js', // Done
          'src/editors/upload.js', // Done
          'src/editors/checkbox.js', // Done
          'src/editors/array/choices.js', // Done
          'src/editors/array/select2.js', // Done
          'src/editors/array/selectize.js', // Done
          'src/editors/starrating.js', // Done
          'src/editors/datetime.js', // Done
          'src/editors/signature.js', // Done
          'src/editors/radio.js', // Done
          'src/editors/describedby.js', // Done
          'src/editors/uuid.js', // Done
          'src/editors/jodit.js', // Done
          'src/editors/ace.js', // Done
          'src/editors/simplemde.js', // Done
          'src/editors/autocomplete.js', // Done
          'src/editors/button.js', // Done
          'src/editors/sceditor.js', // Done
          'src/editors/select2.js', // Done
          'src/editors/ip.js', // Done
          'src/editors/info.js', // Done 

          // All the themes and iconlibs
          'src/theme.js',           // Done
          'src/themes/*.js',        // Done
          'src/iconlib.js',
          'src/iconlibs/*.js',

          // The JS templating engines
          'src/templates/*.js',

          // Set the defaults
          'src/defaults.js',    // Done

          // Wrapper for $.fn style initialization
          'src/jquery.js',      

          // End the closure
          'src/outro.js'        // Remove
}
```